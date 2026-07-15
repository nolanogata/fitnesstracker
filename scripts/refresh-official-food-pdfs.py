#!/usr/bin/env python3
"""Convert current official nutrition PDFs into deterministic seed JSON files.

Requires pdfplumber. PDFs are supplied explicitly so downloading and parsing stay
separate and a source document can be archived/reviewed before replacing data.
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "src/data/seeds/foods/chains"


def number(value):
    try:
        return float(str(value).replace(",", ""))
    except (TypeError, ValueError):
        return None


def clean_number(value):
    return int(value) if float(value).is_integer() else round(float(value), 2)


def clean_name(value: str) -> str:
    value = value.replace("\u3000", " ").replace("⽉", "月").replace("⽇", "日")
    value = re.sub(r"^【[^】]+】\s*", "", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def category_for(name: str) -> str:
    if re.search(r"バーガー|ドッグ|ツイスター|サンド|マフィン|トースト", name):
        return "メイン"
    if re.search(r"コーヒー|ティー|ラテ|ソーダ|シェイク|ジュース|ドリンク|エール|スムージー|チャイ", name):
        return "ドリンク"
    if re.search(r"ケーキ|パイ|アイス|デザート|ドーナツ|ビスケット|ヨーグルト|スイーツ", name):
        return "スイーツ"
    if re.search(r"チキン|ナゲット|ポテト|サラダ|ソース|ディップ|スープ|フライ|ハラペーニョ", name):
        return "サイド"
    if re.search(r"パスタ|ライス|カレー", name):
        return "メイン"
    return "その他"


def parse_standard(path: Path, brand: str, source_url: str, fetched_at: str, page_limit=None):
    rows = []
    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            if page_limit is not None and page_index >= page_limit:
                continue
            for table in page.extract_tables():
                for row in table:
                    if len(row) < 21 or not row[0]:
                        continue
                    values = [number(row[index]) for index in (1, 2, 3, 4, 5, 20)]
                    if any(value is None for value in values):
                        continue
                    weight, calories, protein, fat, carbs, salt = values
                    name = clean_name(row[0])
                    rows.append({
                        "brand": brand,
                        "name": name,
                        "calories": clean_number(calories),
                        "protein_g": clean_number(protein),
                        "fat_g": clean_number(fat),
                        "carbs_g": clean_number(carbs),
                        "salt_g": clean_number(salt),
                        "serving_label": f"1品（{clean_number(weight)}g）",
                        "weight_g": clean_number(weight),
                        "tag": category_for(name),
                        "source_url": source_url,
                        "fetched_at": fetched_at,
                    })
    return dedupe(rows)


def japanese_title(value: str):
    lines = [clean_name(line) for line in value.splitlines() if line.strip()]
    japanese = [line for line in lines if re.search(r"[ぁ-んァ-ヶ一-龠々ー]", line)]
    return japanese[0] if japanese else None


def parse_tullys_food(path: Path, source_url: str, fetched_at: str):
    rows = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                for row in table:
                    if len(row) < 39 or not row[0]:
                        continue
                    values = [number(row[index]) for index in (34, 35, 36, 37, 38)]
                    if any(value is None for value in values):
                        continue
                    name = japanese_title(row[0])
                    if not name:
                        continue
                    calories, protein, fat, carbs, salt = values
                    rows.append({
                        "brand": "タリーズ",
                        "name": name,
                        "calories": clean_number(calories),
                        "protein_g": clean_number(protein),
                        "fat_g": clean_number(fat),
                        "carbs_g": clean_number(carbs),
                        "salt_g": clean_number(salt),
                        "serving_label": "1品",
                        "tag": category_for(name),
                        "source_url": source_url,
                        "fetched_at": fetched_at,
                    })
    return dedupe(rows)


def parse_tullys_drink(path: Path, source_url: str, fetched_at: str):
    rows = []
    size_labels = ("S", "T", "G")
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                if not table or len(table[0]) < 51:
                    continue
                for row in table:
                    if len(row) < 51 or not row[0]:
                        continue
                    name = japanese_title(row[0])
                    if not name:
                        continue
                    temperature = str(row[1] or "").upper()
                    variant = clean_name(str(row[2] or ""))
                    for offset, size in enumerate(size_labels):
                        values = [number(row[index + offset]) for index in (34, 37, 40, 43, 46)]
                        if any(value is None for value in values):
                            continue
                        calories, protein, fat, carbs, salt = values
                        suffix = []
                        if temperature in {"HOT", "ICED"}:
                            suffix.append(temperature)
                        if variant and variant not in {"ー", "-"}:
                            suffix.append(variant)
                        suffix.append(size)
                        full_name = f"{name}（{'・'.join(suffix)}）"
                        rows.append({
                            "brand": "タリーズ",
                            "name": full_name,
                            "calories": clean_number(calories),
                            "protein_g": clean_number(protein),
                            "fat_g": clean_number(fat),
                            "carbs_g": clean_number(carbs),
                            "salt_g": clean_number(salt),
                            "serving_label": f"1杯（{size}）",
                            "tag": "ドリンク",
                            "source_url": source_url,
                            "fetched_at": fetched_at,
                        })
    return dedupe(rows)


def dedupe(rows):
    result = []
    seen = set()
    for row in rows:
        key = (row["brand"], row["name"], row["serving_label"])
        if key in seen:
            continue
        seen.add(key)
        result.append(row)
    return result


def write(name: str, rows):
    path = OUTPUT_DIR / name
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{path.relative_to(ROOT)}: {len(rows)} rows")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mos", type=Path, required=True)
    parser.add_argument("--kfc", type=Path, required=True)
    parser.add_argument("--tullys-food", type=Path, required=True)
    parser.add_argument("--tullys-drink", type=Path, required=True)
    parser.add_argument(
        "--fetched-at",
        default=datetime.now(timezone.utc).date().isoformat(),
        help="UTC verification date written to every generated row (YYYY-MM-DD)",
    )
    args = parser.parse_args()
    fetched_at = f"{args.fetched_at}T00:00:00.000Z"

    write("mosOfficialData.json", parse_standard(
        args.mos, "モスバーガー", "https://www.mos.jp/menu/pdf/nutrition.pdf", fetched_at
    ))
    write("kfcOfficialData.json", parse_standard(
        args.kfc, "ケンタッキー", "https://assets.ctfassets.net/jax7ylg56usf/3xrOrhWkprGIAcDoalSrz3/80d29bedc34d33787b58be9536dfdb13/a93f8e8a-bfdd-4a72-a5d7-dd67244d26c4.pdf", fetched_at, page_limit=4
    ))
    food_url = "https://www.tullys.co.jp/menu/pdf/food.pdf"
    drink_url = "https://www.tullys.co.jp/menu/pdf/drink.pdf"
    write("tullysOfficialFoodData.json", parse_tullys_food(args.tullys_food, food_url, fetched_at))
    write("tullysOfficialDrinkData.json", parse_tullys_drink(args.tullys_drink, drink_url, fetched_at))


if __name__ == "__main__":
    main()

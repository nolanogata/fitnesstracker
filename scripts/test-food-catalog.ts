import assert from "node:assert/strict";
import { foodCatalogRegistry } from "../src/data/seeds/foods/catalogRegistry.ts";
import { foodSeeds, isStaleSeasonalFood } from "../src/data/seeds/foods/index.ts";

const counts = new Map<string, number>();
for (const food of foodSeeds) counts.set(food.brand ?? "", (counts.get(food.brand ?? "") ?? 0) + 1);

assert.equal(new Set(foodCatalogRegistry.map((item) => item.brand)).size, foodCatalogRegistry.length);
for (const catalog of foodCatalogRegistry) {
  assert.ok((counts.get(catalog.brand) ?? 0) >= catalog.minimumItems, `${catalog.brand}: catalog below ${catalog.minimumItems} items`);
  if (catalog.coverage === "official_full" || catalog.coverage === "official_core") {
    assert.ok(catalog.sourceUrl?.startsWith("https://"), `${catalog.brand}: missing official source`);
    assert.match(catalog.verifiedAt ?? "", /^\d{4}-\d{2}-\d{2}$/, `${catalog.brand}: missing verified date`);
    const ageDays = (Date.now() - new Date(`${catalog.verifiedAt}T00:00:00Z`).getTime()) / 86_400_000;
    assert.ok(ageDays <= catalog.refreshDays, `${catalog.brand}: catalog review is stale (${Math.floor(ageDays)} days)`);
  }
}

const convenienceBrands = new Set(["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"]);
const convenience = foodSeeds.filter((food) => convenienceBrands.has(food.brand ?? ""));
assert.ok(convenience.length >= 20);
assert.ok(convenience.every((food) => food.data_source === "official" && food.source_url?.startsWith("https://")));
assert.ok(convenience.some((food) => food.name === "ななチキ" && food.calories === 174));
assert.ok(convenience.some((food) => food.name === "Xフライドポテト" && food.calories === 326));
assert.ok(!convenience.some((food) => /^(幕の内弁当|プロテインドリンク|冷し中華)$/.test(food.name)));

const mos = foodSeeds.filter((food) => food.brand === "モスバーガー");
assert.ok(mos.some((food) => food.name === "モスタコスバーガー"));
assert.ok(!mos.some((food) => food.name.includes("アボカド海老カツバーガー")));
assert.ok(mos.every((food) => food.data_source === "official"));

const kfc = foodSeeds.filter((food) => food.brand === "ケンタッキー");
assert.ok(kfc.some((food) => food.name === "レッドホットチキン"));
assert.ok(kfc.some((food) => food.name === "柑橘 鶏竜田バーガー"));
assert.ok(!kfc.some((food) => food.name === "ケンタの鶏竜田バーガー"));

const ringerHut = foodSeeds.filter((food) => food.brand === "リンガーハット");
assert.ok(ringerHut.length >= 85);
assert.ok(ringerHut.every((food) => food.data_source === "official"));
assert.ok(ringerHut.every((food) => food.source_url === "https://www.ringerhut.jp/quality/allergy-nutrition_value/"));
assert.ok(ringerHut.some((food) => food.name === "長崎ちゃんぽん 麺増量2倍" && food.calories === 943));
assert.ok(ringerHut.some((food) => food.name === "低糖質麺 野菜たっぷりちゃんぽん" && food.calories === 750));
assert.ok(ringerHut.some((food) => food.name === "焼き太めん皿うどん" && food.calories === 774));
assert.ok(ringerHut.some((food) => food.name === "にんにく竹炭ぎょうざ15個定食" && food.calories === 1164));
assert.ok(ringerHut.some((food) => food.name === "ちびっこナポリタンセット" && food.calories === 563));
assert.ok(ringerHut.some((food) => food.name === "豚しゃぶの冷やしちゃんぽん" && food.tags.includes("期間限定")));
assert.ok(ringerHut.some((food) => food.name === "ピリカラ味噌（1辛・10g）" && food.calories === 28));
assert.equal(new Set(ringerHut.map((food) => `${food.name}|${food.serving_label ?? ""}`)).size, ringerHut.length);

const tullys = foodSeeds.filter((food) => food.brand === "タリーズ");
assert.ok(tullys.length >= 120);
assert.ok(tullys.some((food) => food.name.includes("キャラメルフォームアメリカーノ")));
assert.ok(tullys.every((food) => food.data_source === "official"));

const supermarketPastaBrands = new Set(["キユーピー", "S&B", "マ・マー", "青の洞窟", "バリラ", "ディ・チェコ"]);
const supermarketPasta = foodSeeds.filter((food) => supermarketPastaBrands.has(food.brand ?? "") && (food.tags.includes("パスタソース") || food.tags.includes("乾麺")));
assert.equal(supermarketPasta.length, 32);
assert.equal(new Set(supermarketPasta.map((food) => `${food.brand}|${food.name}|${food.serving_label ?? ""}`)).size, supermarketPasta.length);
assert.ok(supermarketPasta.every((food) => food.source_url?.startsWith("https://")));
assert.ok(supermarketPasta.some((food) => food.brand === "キユーピー" && food.name.includes("ペペロンチーノ") && food.calories === 130));
assert.ok(supermarketPasta.some((food) => food.brand === "S&B" && food.name.includes("生風味たらこ") && food.calories === 107 && food.tags.includes("メーカー糖質表示")));
assert.ok(supermarketPasta.some((food) => food.brand === "青の洞窟" && food.name === "ボロネーゼ" && food.calories === 260));
assert.ok(supermarketPasta.some((food) => food.brand === "マ・マー" && food.name === "スパゲティ 1.6mm" && food.serving_label === "乾麺100g" && food.calories === 350));
assert.ok(supermarketPasta.some((food) => food.brand === "バリラ" && food.name.includes("No.5") && food.calories === 359));
assert.ok(supermarketPasta.some((food) => food.brand === "ディ・チェコ" && food.name.includes("No.11") && food.protein_g === 14));

const packagedSnacks = foodSeeds.filter((food) => food.tags.includes("定番お菓子"));
assert.equal(packagedSnacks.length, 29);
assert.equal(new Set(packagedSnacks.map((food) => `${food.brand}|${food.name}|${food.serving_label ?? ""}`)).size, packagedSnacks.length);
assert.ok(packagedSnacks.every((food) => food.data_source === "official" && food.source_url?.startsWith("https://")));
assert.ok(packagedSnacks.every((food) => food.default_meal_type === "snack"));
assert.ok(packagedSnacks.some((food) => food.brand === "カルビー" && food.name === "ポテトチップス コンソメパンチ" && food.calories === 306));
assert.ok(packagedSnacks.some((food) => food.brand === "湖池屋" && food.name === "カラムーチョチップス ホットチリ味" && food.tags.includes("ポテチ")));
assert.ok(packagedSnacks.some((food) => food.brand === "明治" && food.name === "チョコレート効果 カカオ72%" && food.serving_label === "1枚 5g"));
assert.ok(packagedSnacks.some((food) => food.brand === "森永製菓" && food.name === "DARS ミルク" && food.serving_label === "1粒 3.9g"));
assert.ok(packagedSnacks.some((food) => food.brand === "ブルボン" && food.name === "ルマンド" && food.serving_label === "1本 7.4g"));
assert.ok(packagedSnacks.some((food) => food.brand === "有楽製菓" && food.name === "ブラックサンダー" && food.calories === 111));

assert.equal(isStaleSeasonalFood({
  name: "過去の期間限定メニュー",
  fetched_at: "2026-01-01T00:00:00.000Z",
}), true);
assert.equal(isStaleSeasonalFood({
  name: "現在の期間限定メニュー",
  fetched_at: new Date().toISOString(),
}), false);
assert.ok(!foodSeeds.some(isStaleSeasonalFood), "stale seasonal foods must not remain in the public catalog");

process.stdout.write(`food catalog tests passed: ${foodCatalogRegistry.length} brands / ${foodSeeds.length} foods\n`);

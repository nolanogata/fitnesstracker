import { readFileSync } from "node:fs";

const files = [
  "src/data/seeds/foods/chains/officialChainNutritionData.json",
  "src/data/seeds/foods/chains/marugameOfficialData.json",
  "src/data/seeds/foods/chains/oliveNoOkaOfficialData.json",
  "src/data/seeds/foods/chains/tondenOfficialData.json",
];

const rows = files.flatMap((file) => JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), "utf8")));
const seen = new Set();
const counts = new Map();

for (const row of rows) {
  const numbers = [row.calories, row.protein_g, row.fat_g, row.carbs_g, row.salt_g];
  if (!row.brand || !row.name || !row.source_url || !row.fetched_at) throw new Error(`Missing provenance: ${JSON.stringify(row)}`);
  if (numbers.some((value) => !Number.isFinite(value) || value < 0)) throw new Error(`Invalid nutrition: ${row.brand} ${row.name}`);
  if (
    /〃|テイクアウト\s+テイクアウト|(?:う な ぎ|か き 氷|そ ば の 日|そ ば ・ う ど ん|と り あ|ド リ ン ク|ハ レ の 日|ミ ニ 丼|周 年 祭|夏 の 味 覚|柚 子 そ ば|生 姜 焼 き|選 べ る ミ ニ 丼|リキ ニャ)|(?:ざるそ|・いな|天ぷらセ)$/.test(row.name)
  ) throw new Error(`Broken PDF name: ${row.brand} ${row.name}`);
  const key = [row.brand, row.name, row.serving_label].map((value) => value.toLowerCase().replace(/\s/g, "")).join("|");
  if (seen.has(key)) throw new Error(`Duplicate official row: ${key}`);
  seen.add(key);
  counts.set(row.brand, (counts.get(row.brand) ?? 0) + 1);
}

const minimumCoverage = {
  "びっくりドンキー": 300,
  "ポポラマーマ": 190,
  "ジョイフル": 250,
  "デニーズ": 350,
  "ロイヤルホスト": 300,
  "丸亀製麺": 120,
  "オリーブの丘": 180,
  "とんでん": 300,
};

for (const [brand, minimum] of Object.entries(minimumCoverage)) {
  const count = counts.get(brand) ?? 0;
  if (count < minimum) throw new Error(`${brand}: expected at least ${minimum} official rows, found ${count}`);
}

console.log(`Official food seed audit passed: ${rows.length} rows across ${counts.size} brands.`);

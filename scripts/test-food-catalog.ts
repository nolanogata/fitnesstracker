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

const tullys = foodSeeds.filter((food) => food.brand === "タリーズ");
assert.ok(tullys.length >= 120);
assert.ok(tullys.some((food) => food.name.includes("キャラメルフォームアメリカーノ")));
assert.ok(tullys.every((food) => food.data_source === "official"));

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

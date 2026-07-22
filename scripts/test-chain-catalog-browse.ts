import assert from "node:assert/strict";
import { chainCategories } from "../src/data/seeds/foods/catalogRegistry.ts";
import { getChainBrandReading, getChainBrandsForKana, getChainCategoryForBrand, getChainKanaGroup } from "../src/lib/chainCatalogBrowse.ts";

assert.equal(getChainKanaGroup("藍屋"), "あ");
assert.equal(getChainKanaGroup("餃子の王将"), "か");
assert.equal(getChainKanaGroup("三田製麺所"), "ま");
assert.equal(getChainKanaGroup("ロイヤルホスト"), "ら");

const saBrands = getChainBrandsForKana(chainCategories, "さ");
assert.ok(saBrands.includes("サイゼリヤ"));
assert.ok(saBrands.includes("舎鈴"));
assert.ok(!saBrands.includes("松屋"));
assert.deepEqual(saBrands, [...saBrands].sort((a, b) => getChainBrandReading(a).localeCompare(getChainBrandReading(b), "ja-JP")));

assert.equal(getChainCategoryForBrand(chainCategories, "丸亀製麺"), "うどん・そば");
const allBrands = getChainBrandsForKana(chainCategories, "all");
assert.equal(allBrands.length, new Set(Object.values(chainCategories).flat()).size);
assert.deepEqual(allBrands.filter((brand) => getChainKanaGroup(brand) === "その他"), []);

process.stdout.write("chain catalog browse tests passed\n");

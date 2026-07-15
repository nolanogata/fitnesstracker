import assert from "node:assert/strict";
import { gyudonTeishokuOfficialCoverageFoods } from "../src/data/seeds/foods/chains/gyudonTeishokuOfficialCoverage.ts";
import { sukiyaOfficialFoods } from "../src/data/seeds/foods/chains/sukiyaOfficial.ts";

assert.equal(sukiyaOfficialFoods.length, 484);
assert.equal(new Set(sukiyaOfficialFoods.map((item) => item.id)).size, 484);
assert.equal(new Set(sukiyaOfficialFoods.map((item) => item.name)).size, 191);
assert.ok(sukiyaOfficialFoods.every((item) => item.brand === "すき家" && item.data_source === "official"));
assert.ok(gyudonTeishokuOfficialCoverageFoods.every((item) => item.brand !== "すき家"));

function find(name: string, servingLabel: string) {
  return sukiyaOfficialFoods.find((item) => item.name === name && item.serving_label === servingLabel);
}

assert.deepEqual(
  find("牛丼", "並盛") && [find("牛丼", "並盛")?.calories, find("牛丼", "並盛")?.protein_g, find("牛丼", "並盛")?.fat_g, find("牛丼", "並盛")?.carbs_g],
  [695, 21.7, 23.4, 99.8],
);
assert.equal(find("かつぶしオクラ牛丼ライト", "大盛")?.calories, 509);
assert.equal(find("とん汁", "1品")?.calories, 114);
assert.equal(find("Sukiシェイク ラムネ", "L")?.calories, 410);
assert.ok(find("ビビンバ牛丼", "並盛"));
assert.ok(find("牛カルビ焼肉丼", "特盛"));
assert.ok(find("塩さばたまかけ朝食", "並盛"));

process.stdout.write("sukiya official tests passed\n");

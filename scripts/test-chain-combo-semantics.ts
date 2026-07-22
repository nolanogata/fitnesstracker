import assert from "node:assert/strict";
import {
  getChainComboMenuProfile,
  getChainComboSemanticAdjustment,
  isPlausibleChainCombo,
  isSemanticChainComboMain,
  isSemanticChainComboSide,
} from "../src/lib/chainComboSemantics.ts";
import type { MenuItem } from "../src/types.ts";

const ramen = menu("ramen", "醤油ラーメン", 620);
const wontonNoodle = menu("wonton", "ワンタン麺", 680);
const gyoza = menu("gyoza", "焼き餃子（6個）", 310, ["サイド"]);
const friedRice = menu("fried-rice", "チャーハン", 520);
const burger = menu("burger", "チーズバーガー", 460);
const burgerSet = menu("burger-set", "チーズバーガーセット", 780);
const potatoDrinkSet = menu("potato-set", "ポテトS・ドリンクMセット", 340, ["サイド"]);
const shareNuggets = menu("nuggets-15", "チキンナゲット 15ピース", 786, ["サイド"]);
const gyudon = menu("gyudon", "牛丼（並盛）", 730);
const secondDon = menu("second-don", "ねぎとろ丼", 610);
const cheese = menu("cheese", "チーズトッピング", 180, ["トッピング"]);

assert.equal(getChainComboMenuProfile(wontonNoodle).mainFamily, "noodle");
assert.equal(isSemanticChainComboMain(ramen), true);
assert.equal(isSemanticChainComboSide(wontonNoodle), false);
assert.equal(isSemanticChainComboSide(gyoza), true);
assert.equal(isSemanticChainComboSide(friedRice), true);
assert.equal(getChainComboMenuProfile(burgerSet).completeSet, true);

const ramenGyoza = combo(ramen, gyoza);
const ramenRice = combo(ramen, friedRice);
assert.equal(isPlausibleChainCombo(ramenGyoza), true);
assert.equal(isPlausibleChainCombo(combo(ramen, wontonNoodle)), false);
assert.ok(getChainComboSemanticAdjustment(ramenGyoza) < getChainComboSemanticAdjustment(ramenRice));

assert.equal(isPlausibleChainCombo(combo(burger, potatoDrinkSet)), true);
assert.equal(isPlausibleChainCombo(combo(burger, shareNuggets)), false);
assert.ok(getChainComboSemanticAdjustment(combo(burger, potatoDrinkSet)) < getChainComboSemanticAdjustment([{ item: burger, role: "main" }]));
assert.ok(getChainComboSemanticAdjustment([{ item: burgerSet, role: "main" }]) < getChainComboSemanticAdjustment([{ item: burger, role: "main" }]));

assert.equal(isPlausibleChainCombo(combo(gyudon, secondDon)), false);
assert.equal(isPlausibleChainCombo(combo(gyudon, cheese)), true);

process.stdout.write("chain combo semantics tests passed\n");

function combo(main: MenuItem, side: MenuItem) {
  return [{ item: main, role: "main" as const }, { item: side, role: "side" as const }];
}

function menu(id: string, name: string, calories: number, tags: string[] = []): MenuItem {
  return {
    id,
    name,
    brand: "テスト店",
    category: "チェーン店",
    tags,
    calories,
    protein_g: 20,
    fat_g: 15,
    carbs_g: 60,
    data_source: "official",
    confidence: "high",
    is_public_preset: true,
    is_user_created: false,
    is_favorite: false,
    created_at: "2026-07-22T00:00:00.000Z",
    updated_at: "2026-07-22T00:00:00.000Z",
  };
}

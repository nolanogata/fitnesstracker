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
const salad = menu("salad", "サイドサラダ", 20, ["サイド", "サラダ"]);
const dressedSalad = menu("dressed-salad", "シーザーサラダ（ドレッシングあり）", 111, ["サイド", "サラダ"]);
const dressing = menu("dressing", "焙煎胡麻ドレッシング", 27, ["ドレッシング", "サラダ"]);
const nuggetSauce = menu("nugget-sauce", "バーベキューソース", 26, ["ソース"]);
const nuggets = menu("nuggets", "チキンナゲット 5ピース", 262, ["サイド"]);
const gumSyrup = menu("gum-syrup", "ガムシロップ", 25, ["その他"]);

assert.equal(getChainComboMenuProfile(wontonNoodle).mainFamily, "noodle");
assert.equal(isSemanticChainComboMain(ramen), true);
assert.equal(isSemanticChainComboSide(wontonNoodle), false);
assert.equal(isSemanticChainComboSide(gyoza), true);
assert.equal(isSemanticChainComboSide(friedRice), true);
assert.equal(getChainComboMenuProfile(burgerSet).completeSet, true);
assert.equal(getChainComboMenuProfile(dressing).companionRequirement, "salad");
assert.equal(getChainComboMenuProfile(nuggetSauce).companionRequirement, "fried_side");
assert.equal(getChainComboMenuProfile(gumSyrup).recommendationBlocked, true);

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
assert.equal(isPlausibleChainCombo(combo(burger, dressing)), false);
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: salad, role: "side" }, { item: dressing, role: "side" }]), true);
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: dressedSalad, role: "side" }, { item: dressing, role: "side" }]), false);
assert.equal(isPlausibleChainCombo(combo(burger, nuggetSauce)), false);
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: nuggets, role: "side" }, { item: nuggetSauce, role: "side" }]), true);
assert.equal(isSemanticChainComboSide(gumSyrup), false);

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

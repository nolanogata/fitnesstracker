import assert from "node:assert/strict";
import { foodSeeds } from "../src/data/seeds/foods";
import { getChainComboMealRestriction, isChainComboItemAvailable } from "../src/lib/chainComboAvailability";
import { getChainComboMenuProfile, isPlausibleChainCombo, isSemanticChainComboMain, isSemanticChainComboSide } from "../src/lib/chainComboSemantics";

const expectedCoverage = [
  { brand: "マクドナルド", mains: 8, sides: 4 },
  { brand: "すき家", mains: 20, sides: 5 },
  { brand: "CoCo壱番屋", mains: 20, sides: 8 },
  { brand: "丸亀製麺", mains: 15, sides: 8 },
  { brand: "バーミヤン", mains: 4, sides: 3 },
];

expectedCoverage.forEach(({ brand, mains, sides }) => {
  const items = foodSeeds.filter((item) => item.brand === brand);
  const mainCount = items.filter(isSemanticChainComboMain).length;
  const sideCount = items.filter(isSemanticChainComboSide).length;
  assert.ok(mainCount >= mains, `${brand}: main ${mainCount} < ${mains}`);
  assert.ok(sideCount >= sides, `${brand}: side ${sideCount} < ${sides}`);
});

const mcdonalds = foodSeeds.filter((item) => item.brand === "マクドナルド");
const hashBrown = mcdonalds.find((item) => item.name === "ハッシュポテト");
const burger = mcdonalds.find((item) => item.name === "ビッグマック");
const salad = mcdonalds.find((item) => item.name === "サイドサラダ");
const dressing = mcdonalds.find((item) => item.name.includes("焙煎胡麻ドレッシング"));
assert.ok(hashBrown && burger && salad && dressing);
assert.equal(getChainComboMealRestriction(hashBrown), "breakfast");
assert.equal(isChainComboItemAvailable(hashBrown, { serviceMode: "dine_in", mealPeriod: "lunch" }), false);
assert.equal(getChainComboMealRestriction(burger), "regular");
assert.equal(isChainComboItemAvailable(burger, { serviceMode: "dine_in", mealPeriod: "breakfast" }), false);
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: dressing, role: "side" }]), false);
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: salad, role: "side" }, { item: dressing, role: "side" }]), true);

const burgerKing = foodSeeds.filter((item) => item.brand === "バーガーキング");
const bkBurger = burgerKing.find((item) => item.name === "ワッパー");
const bkPlainSalad = burgerKing.find((item) => item.name.includes("シーザーサラダ（ドレッシングなし）"));
const bkDressing = burgerKing.find((item) => item.name.includes("別添") && item.name.includes("ドレッシング"));
const bkNuggets = burgerKing.find((item) => item.name === "チキンナゲット 5ピース");
const bkSauce = burgerKing.find((item) => item.name === "バーベキューソース");
assert.ok(bkBurger && bkPlainSalad && bkDressing && bkNuggets && bkSauce);
assert.equal(getChainComboMenuProfile(bkPlainSalad).mainFamily, undefined);
assert.equal(isPlausibleChainCombo([{ item: bkBurger, role: "main" }, { item: bkDressing, role: "side" }]), false);
assert.equal(isPlausibleChainCombo([{ item: bkBurger, role: "main" }, { item: bkPlainSalad, role: "side" }, { item: bkDressing, role: "side" }]), true);
assert.equal(isPlausibleChainCombo([{ item: bkBurger, role: "main" }, { item: bkNuggets, role: "side" }, { item: bkSauce, role: "side" }]), true);

const coco = foodSeeds.filter((item) => item.brand === "CoCo壱番屋");
const cocoCurry = coco.find((item) => item.name === "ポークカレー");
const cocoSalad = coco.find((item) => item.name === "ヤサイサラダ");
const cocoDressing = coco.find((item) => item.name.startsWith("オリジナルドレッシング"));
const cocoSyrup = coco.find((item) => item.name === "ガムシロップ");
assert.ok(cocoCurry && cocoSalad && cocoDressing && cocoSyrup);
assert.equal(isPlausibleChainCombo([{ item: cocoCurry, role: "main" }, { item: cocoDressing, role: "side" }]), false);
assert.equal(isPlausibleChainCombo([{ item: cocoCurry, role: "main" }, { item: cocoSalad, role: "side" }, { item: cocoDressing, role: "side" }]), true);
assert.equal(getChainComboMenuProfile(cocoSyrup).recommendationBlocked, true);
assert.equal(isSemanticChainComboSide(cocoSyrup), false);

const mammaSalad = foodSeeds.find((item) => item.brand === "マンマパスタ" && item.name === "シーザーサラダ");
const ikinariSoup = foodSeeds.find((item) => item.brand === "いきなりステーキ" && item.name === "特製スープ");
assert.ok(mammaSalad && ikinariSoup);
assert.equal(getChainComboMenuProfile(mammaSalad).mainFamily, undefined);
assert.equal(getChainComboMenuProfile(mammaSalad).sideKind, "salad");
assert.equal(getChainComboMenuProfile(ikinariSoup).mainFamily, undefined);
assert.equal(getChainComboMenuProfile(ikinariSoup).sideKind, "soup");

const ringerHut = foodSeeds.filter((item) => item.brand === "リンガーハット");
const champon = ringerHut.find((item) => item.name === "長崎ちゃんぽん");
const champonDressing = ringerHut.find((item) => item.name.startsWith("ちゃんぽんドレッシング"));
assert.ok(champon && champonDressing);
assert.equal(getChainComboMenuProfile(champonDressing).companionRequirement, "noodle");
assert.equal(isPlausibleChainCombo([{ item: burger, role: "main" }, { item: champonDressing, role: "side" }]), false);
assert.equal(isPlausibleChainCombo([{ item: champon, role: "main" }, { item: champonDressing, role: "side" }]), true);

process.stdout.write("chain combo catalog tests passed\n");

import assert from "node:assert/strict";
import {
  getChainComboMealRestriction,
  getChainComboServiceRestriction,
  getDefaultChainComboMealPeriod,
  getDefaultChainComboServiceMode,
  isChainComboItemAvailable,
} from "../src/lib/chainComboAvailability.ts";
import type { MenuItem } from "../src/types.ts";

function menu(overrides: Partial<MenuItem>): MenuItem {
  return {
    id: "test-menu",
    name: "通常メニュー",
    brand: "テスト店",
    category: "メイン",
    tags: [],
    calories: 500,
    protein_g: 25,
    fat_g: 18,
    carbs_g: 60,
    data_source: "official",
    confidence: "high",
    is_public_preset: true,
    is_user_created: false,
    is_favorite: false,
    created_at: "2026-07-14T00:00:00.000Z",
    updated_at: "2026-07-14T00:00:00.000Z",
    ...overrides,
  };
}

const breakfast = menu({ id: "breakfast", name: "モーニングセット" });
const takeout = menu({ id: "takeout", name: "テイクアウト ピッツァ" });
const dineIn = menu({ id: "dine-in", name: "和風粥（イートイン）" });
const lunch = menu({ id: "lunch", tags: ["ランチ限定"] });
const regular = menu({ id: "regular" });

assert.equal(getChainComboMealRestriction(breakfast), "breakfast");
assert.equal(getChainComboMealRestriction(lunch), "lunch");
assert.equal(getChainComboServiceRestriction(takeout), "takeout_only");
assert.equal(getChainComboServiceRestriction(dineIn), "dine_in_only");

assert.equal(isChainComboItemAvailable(breakfast, { serviceMode: "dine_in", mealPeriod: "lunch" }), false);
assert.equal(isChainComboItemAvailable(takeout, { serviceMode: "dine_in", mealPeriod: "lunch" }), false);
assert.equal(isChainComboItemAvailable(dineIn, { serviceMode: "takeout", mealPeriod: "lunch" }), false);
assert.equal(isChainComboItemAvailable(regular, { serviceMode: "dine_in", mealPeriod: "dinner" }), true);
assert.equal(isChainComboItemAvailable(breakfast, { serviceMode: "dine_in", mealPeriod: "breakfast" }), true);

assert.equal(getDefaultChainComboServiceMode(takeout), "takeout");
assert.equal(getDefaultChainComboServiceMode(regular), "dine_in");
assert.equal(getDefaultChainComboMealPeriod(breakfast, 14), "breakfast");
assert.equal(getDefaultChainComboMealPeriod(regular, 8), "breakfast");
assert.equal(getDefaultChainComboMealPeriod(regular, 13), "lunch");
assert.equal(getDefaultChainComboMealPeriod(regular, 20), "dinner");

process.stdout.write("chain combo availability tests passed\n");

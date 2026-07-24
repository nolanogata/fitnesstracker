import assert from "node:assert/strict";
import { buildChainComboFoodEntries } from "../src/lib/chainComboLogging.ts";
import type { MenuItem } from "../src/types.ts";

const main = menu("main", "チキン定食", 600, 30, 18, 72);
const side = menu("side", "サイドサラダ", 80, 4, 2, 10);
side.nutrition_meta = {
  origin: "manual_estimate",
  estimation_policy: "estimated",
  uncertainty: { calories: 20, protein_g: 2, fat_g: 1, carbs_g: 3 },
};

let idIndex = 0;
const entries = buildChainComboFoodEntries({
  suggestion: {
    id: "main|side:half",
    title: "チキン定食 + サイドサラダ（ハーフ）",
    items: [
      {
        item: main,
        role: "main",
        portionMultiplier: 1,
        nutrition: { calories: 600, protein_g: 30, fat_g: 18, carbs_g: 72 },
      },
      {
        item: side,
        role: "side",
        portionLabel: "ハーフ",
        portionMultiplier: 0.5,
        nutrition: { calories: 40, protein_g: 2, fat_g: 1, carbs_g: 5 },
      },
    ],
  },
  appDate: "2026-07-24",
  timestamp: "2026-07-24T12:00:00.000Z",
  mealPeriod: "dinner",
  serviceMode: "takeout",
  idFactory: () => `food_${++idIndex}`,
});

assert.equal(entries.length, 2);
assert.deepEqual(entries.map((entry) => entry.id), ["food_1", "food_2"]);
assert.ok(entries.every((entry) => entry.app_date === "2026-07-24"));
assert.ok(entries.every((entry) => entry.meal_type === "dinner"));
assert.ok(entries.every((entry) => entry.note?.includes("おすすめ組み合わせ / 持ち帰り / 夕食")));
assert.equal(entries[0].menu_item_id, "main");
assert.equal(entries[0].name, "チキン定食");
assert.equal(entries[1].menu_item_id, "side");
assert.equal(entries[1].name, "サイドサラダ（ハーフ）");
assert.equal(entries[1].portion_multiplier, 0.5);
assert.equal(entries[1].calories, 40);
assert.equal(entries[1].nutrition_meta?.uncertainty?.calories, 10);
assert.equal(entries[1].nutrition_meta?.uncertainty?.protein_g, 1);
assert.deepEqual(
  entries.reduce((total, entry) => ({
    calories: total.calories + entry.calories,
    protein: total.protein + entry.protein_g,
    fat: total.fat + entry.fat_g,
    carbs: total.carbs + entry.carbs_g,
  }), { calories: 0, protein: 0, fat: 0, carbs: 0 }),
  { calories: 640, protein: 32, fat: 19, carbs: 77 },
);

process.stdout.write("chain combo bulk logging tests passed\n");

function menu(id: string, name: string, calories: number, protein: number, fat: number, carbs: number): MenuItem {
  return {
    id,
    name,
    brand: "テスト食堂",
    category: "チェーン店",
    tags: [],
    calories,
    protein_g: protein,
    fat_g: fat,
    carbs_g: carbs,
    data_source: "official",
    confidence: "high",
    is_public_preset: true,
    is_user_created: false,
    is_favorite: false,
    created_at: "2026-07-24T00:00:00.000Z",
    updated_at: "2026-07-24T00:00:00.000Z",
  };
}

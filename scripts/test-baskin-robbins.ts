import assert from "node:assert/strict";
import { baskinRobbinsOfficialFoods } from "../src/data/seeds/foods/chains/baskinRobbinsOfficial.ts";
import {
  addBaskinRobbinsContainerMeta,
  addBaskinRobbinsContainerNutrition,
  baskinRobbinsContainerOptions,
  isBaskinRobbinsFlavor,
} from "../src/lib/baskinRobbins.ts";

assert.equal(baskinRobbinsOfficialFoods.length, 93);
assert.equal(new Set(baskinRobbinsOfficialFoods.map((item) => item.id)).size, 93);
assert.ok(baskinRobbinsOfficialFoods.every(isBaskinRobbinsFlavor));

const poppingSmall = baskinRobbinsOfficialFoods.find((item) => item.name === "ポッピングシャワー" && item.serving_label === "キッズ／スモール");
const poppingRegular = baskinRobbinsOfficialFoods.find((item) => item.name === "ポッピングシャワー" && item.serving_label === "レギュラー");
const poppingPop = baskinRobbinsOfficialFoods.find((item) => item.name === "ポッピングシャワー" && item.serving_label === "ポップ");
assert.deepEqual(poppingSmall && [poppingSmall.calories, poppingSmall.protein_g, poppingSmall.fat_g, poppingSmall.carbs_g], [165, 2, 7, 20]);
assert.deepEqual(poppingRegular && [poppingRegular.calories, poppingRegular.protein_g, poppingRegular.fat_g, poppingRegular.carbs_g], [259, 3, 12, 31]);
assert.deepEqual(poppingPop && [poppingPop.calories, poppingPop.protein_g, poppingPop.fat_g, poppingPop.carbs_g], [118, 1, 5, 14]);

const sugarCone = baskinRobbinsContainerOptions.find((option) => option.id === "sugar_cone");
const waffleCone = baskinRobbinsContainerOptions.find((option) => option.id === "waffle_cone");
assert.ok(sugarCone && waffleCone && poppingRegular?.nutrition_meta);
assert.deepEqual(addBaskinRobbinsContainerNutrition({ calories: 259, protein_g: 3, fat_g: 12, carbs_g: 31 }, sugarCone), {
  calories: 309,
  protein_g: 4,
  fat_g: 12.5,
  carbs_g: 41.4,
  salt_g: 0.1,
});
assert.equal(addBaskinRobbinsContainerNutrition({ calories: 518, protein_g: 6, fat_g: 24, carbs_g: 62 }, waffleCone).calories, 619, "two scoops still use one cone");
const coneMeta = addBaskinRobbinsContainerMeta(poppingRegular.nutrition_meta, waffleCone);
assert.equal(coneMeta?.nutrient_evidence?.calories?.estimation_policy, "exact");
assert.equal(coneMeta?.nutrient_evidence?.fat_g?.estimation_policy, "estimated");
assert.equal(coneMeta?.estimation_policy, "calories_exact_macros_estimated");

process.stdout.write("baskin robbins tests passed\n");

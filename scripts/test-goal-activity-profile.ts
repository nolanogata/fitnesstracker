import { strict as assert } from "node:assert";
import { build } from "esbuild";
import type { Goal, Profile } from "../src/types.ts";

const bundledCalculator = await build({
  entryPoints: [new URL("../src/lib/goalCalculator.ts", import.meta.url).pathname],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const calculatorModuleUrl = `data:text/javascript;base64,${Buffer.from(bundledCalculator.outputFiles[0].text).toString("base64")}`;
const { calculateActivityProfileGoalReference } = await import(calculatorModuleUrl) as typeof import("../src/lib/goalCalculator.ts");

const profile: Profile = {
  id: "profile_test",
  name: "Test",
  height_cm: 170,
  birth_year: 1990,
  sex: "male",
  current_weight_kg: 70,
  body_fat_percentage: 20,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

function goal(overrides: Partial<Goal> = {}): Goal {
  return {
    id: "goal_test",
    phase: "maintenance",
    age: 36,
    activity_level: "moderate",
    target_calories: 2249,
    target_protein_g: 126,
    target_fat_g: 67,
    target_carbs_g: 285,
    target_workouts_per_week: 3,
    target_cardio_sessions_per_week: 2,
    start_date: "2026-01-01",
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const highReference = calculateActivityProfileGoalReference({ profile, goal: goal(), activity_level: "high" });
assert.equal(highReference.targets.tdee > 2249, true, "高めの活動区分は普通より高い消費基準になる");
assert.equal(highReference.hasCustomTargets, false, "自動目標は適用可能");
assert.equal(highReference.matchesCurrent, false, "活動区分が異なれば未反映");

const customReference = calculateActivityProfileGoalReference({
  profile,
  goal: goal({ manual_target_calories: 2500, target_calories: 2500 }),
  activity_level: "high",
});
assert.equal(customReference.hasCustomTargets, true, "カスタム目標は自動適用しない");
assert.notEqual(customReference.targets.target_calories, 2500, "参考値はカスタムkcalを混ぜずに計算する");

const moderateTargets = calculateActivityProfileGoalReference({ profile, goal: goal(), activity_level: "moderate" }).targets;
const exactReference = calculateActivityProfileGoalReference({
  profile,
  goal: goal({
    activity_level: "moderate",
    target_calories: moderateTargets.target_calories,
    target_protein_g: moderateTargets.target_protein_g,
    target_fat_g: moderateTargets.target_fat_g,
    target_carbs_g: moderateTargets.target_carbs_g,
  }),
  activity_level: "moderate",
});
assert.equal(exactReference.matchesCurrent, true, "同じ自動計算値は反映済みと判定する");

console.log("Activity profile goal tests passed: 3");

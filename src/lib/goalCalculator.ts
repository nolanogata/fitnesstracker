import type { ActivityLevel, Goal, Phase, Profile, Sex } from "../types";
import { makeId } from "./ids";
import { nowIso, todayAppDate } from "./date";

const activityFactors: Record<ActivityLevel, number> = {
  low: 1.35,
  moderate: 1.55,
  high: 1.75,
  very_high: 1.95,
};

const phaseAdjustments: Record<Phase, number> = {
  weight_loss: -500,
  slow_cut: -250,
  maintenance: 0,
  recomposition: 0,
  lean_bulk: 150,
  strength_focus: 250,
  custom: 0,
};

export const phaseLabels: Record<Phase, string> = {
  weight_loss: "減量",
  slow_cut: "ゆる減量",
  maintenance: "維持",
  lean_bulk: "リーンバルク",
  recomposition: "リコンプ",
  strength_focus: "筋力重視",
  custom: "カスタム",
};

export const activityLabels: Record<ActivityLevel, string> = {
  low: "低め",
  moderate: "普通",
  high: "高め",
  very_high: "かなり高い",
};

export function calculateTargets(input: {
  profile: Pick<Profile, "height_cm" | "current_weight_kg" | "body_fat_percentage">;
  age: number;
  sex: Sex;
  activity_level: ActivityLevel;
  phase: Phase;
  manual_target_calories?: number;
  manual_protein_g?: number;
}) {
  const weight = input.profile.current_weight_kg;
  const hasBodyFat = typeof input.profile.body_fat_percentage === "number";
  const bmr = hasBodyFat
    ? 370 + 21.6 * (weight * (1 - (input.profile.body_fat_percentage ?? 0) / 100))
    : 10 * weight +
      6.25 * input.profile.height_cm -
      5 * input.age +
      (input.sex === "male" ? 5 : input.sex === "female" ? -161 : -78);
  const tdee = bmr * activityFactors[input.activity_level];
  const targetCalories =
    input.manual_target_calories ?? Math.round(tdee + phaseAdjustments[input.phase]);
  const protein = input.manual_protein_g ?? Math.round(Math.max(weight * 1.6, weight * 2.0));
  const fatBase = input.phase === "weight_loss" || input.phase === "slow_cut" ? 0.7 : 0.8;
  const fat = Math.round(Math.max(weight * 0.6, weight * fatBase));
  const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4);
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target_calories: targetCalories,
    target_protein_g: protein,
    target_fat_g: fat,
    target_carbs_g: carbs,
    carbs_warning: carbs < 0,
  };
}

export function buildGoal(input: {
  profile: Profile;
  phase: Phase;
  activity_level: ActivityLevel;
  age: number;
  target_weight_kg?: number;
  manual_target_calories?: number;
  manual_protein_g?: number;
  target_workouts_per_week?: number;
  target_cardio_sessions_per_week?: number;
}): Goal {
  const sex = input.profile.sex;
  const recalculated = calculateTargets({ ...input, sex });
  const timestamp = nowIso();
  return {
    id: makeId("goal"),
    phase: input.phase,
    activity_level: input.activity_level,
    age: input.age,
    target_weight_kg: input.target_weight_kg,
    target_calories: recalculated.target_calories,
    target_protein_g: recalculated.target_protein_g,
    target_fat_g: recalculated.target_fat_g,
    target_carbs_g: recalculated.target_carbs_g,
    target_workouts_per_week: input.target_workouts_per_week,
    target_cardio_sessions_per_week: input.target_cardio_sessions_per_week,
    start_date: todayAppDate(),
    is_active: true,
    created_at: timestamp,
    updated_at: timestamp,
  };
}

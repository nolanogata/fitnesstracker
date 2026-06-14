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

const kcalPerKg = 7700;

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
  target_weight_kg?: number;
  target_date?: string;
  manual_target_calories?: number;
  manual_protein_g?: number;
  manual_fat_g?: number;
  manual_carbs_g?: number;
}) {
  const weight = input.profile.current_weight_kg;
  const macroWeight = input.target_weight_kg && input.target_weight_kg > 0 ? input.target_weight_kg : weight;
  const periodAdjustment = calculateTargetPeriodAdjustment(weight, input.target_weight_kg, input.target_date);
  const hasBodyFat = typeof input.profile.body_fat_percentage === "number";
  const bmr = hasBodyFat
    ? 370 + 21.6 * (weight * (1 - (input.profile.body_fat_percentage ?? 0) / 100))
    : 10 * weight +
      6.25 * input.profile.height_cm -
      5 * input.age +
      (input.sex === "male" ? 5 : input.sex === "female" ? -161 : -78);
  const tdee = bmr * activityFactors[input.activity_level];
  const targetCalories =
    input.manual_target_calories ?? Math.round(tdee + (periodAdjustment?.dailyCalories ?? phaseAdjustments[input.phase]));
  const protein = input.manual_protein_g ?? calculateProteinTarget(macroWeight, input.phase, input.activity_level, input.age);
  const fat = input.manual_fat_g ?? calculateFatTarget(targetCalories, macroWeight, input.phase);
  const carbs = input.manual_carbs_g ?? Math.round((targetCalories - protein * 4 - fat * 9) / 4);
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target_calories: targetCalories,
    target_protein_g: protein,
    target_fat_g: fat,
    target_carbs_g: carbs,
    target_daily_calorie_adjustment: periodAdjustment?.dailyCalories,
    target_weight_change_per_week_kg: periodAdjustment?.weeklyWeightChange,
    carbs_warning: carbs < 0,
  };
}

export function buildGoal(input: {
  profile: Profile;
  phase: Phase;
  activity_level: ActivityLevel;
  age: number;
  target_weight_kg?: number;
  target_date?: string;
  manual_target_calories?: number;
  manual_protein_g?: number;
  manual_fat_g?: number;
  manual_carbs_g?: number;
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
    target_date: input.target_date,
    target_calories: recalculated.target_calories,
    target_protein_g: recalculated.target_protein_g,
    target_fat_g: recalculated.target_fat_g,
    target_carbs_g: recalculated.target_carbs_g,
    manual_target_calories: input.manual_target_calories,
    manual_protein_g: input.manual_protein_g,
    manual_fat_g: input.manual_fat_g,
    manual_carbs_g: input.manual_carbs_g,
    target_workouts_per_week: input.target_workouts_per_week,
    target_cardio_sessions_per_week: input.target_cardio_sessions_per_week,
    target_daily_calorie_adjustment: recalculated.target_daily_calorie_adjustment,
    target_weight_change_per_week_kg: recalculated.target_weight_change_per_week_kg,
    start_date: todayAppDate(),
    is_active: true,
    created_at: timestamp,
    updated_at: timestamp,
  };
}

function calculateTargetPeriodAdjustment(currentWeightKg: number, targetWeightKg?: number, targetDate?: string) {
  if (!targetWeightKg || targetWeightKg <= 0 || !targetDate) return undefined;
  const today = todayAppDate();
  const days = daysBetween(today, targetDate);
  if (days <= 0) return undefined;
  const totalWeightDelta = targetWeightKg - currentWeightKg;
  return {
    dailyCalories: Math.round((totalWeightDelta * kcalPerKg) / days),
    weeklyWeightChange: Number(((totalWeightDelta / days) * 7).toFixed(2)),
  };
}

function daysBetween(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00`).getTime();
  const end = new Date(`${endDate}T12:00:00`).getTime();
  return Math.round((end - start) / 86_400_000);
}

function calculateProteinTarget(weightKg: number, phase: Phase, activityLevel: ActivityLevel, age: number) {
  const baseByPhase: Record<Phase, number> = {
    weight_loss: 2.1,
    slow_cut: 2.0,
    maintenance: 1.8,
    recomposition: 2.0,
    lean_bulk: 1.8,
    strength_focus: 2.0,
    custom: 1.8,
  };
  const activityBump: Record<ActivityLevel, number> = {
    low: 0,
    moderate: 0,
    high: 0.1,
    very_high: 0.15,
  };
  const ageBump = age >= 50 ? 0.1 : 0;
  return Math.round(weightKg * (baseByPhase[phase] + activityBump[activityLevel] + ageBump));
}

function calculateFatTarget(targetCalories: number, weightKg: number, phase: Phase) {
  const calorieRatioByPhase: Record<Phase, number> = {
    weight_loss: 0.24,
    slow_cut: 0.24,
    maintenance: 0.27,
    recomposition: 0.25,
    lean_bulk: 0.25,
    strength_focus: 0.26,
    custom: 0.25,
  };
  const calorieBased = Math.round((targetCalories * calorieRatioByPhase[phase]) / 9);
  const minimum = Math.round(weightKg * 0.6);
  return Math.max(minimum, calorieBased);
}

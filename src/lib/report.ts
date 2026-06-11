import type { FoodEntry, Goal, Profile, WeightLog, WorkoutExercise, WorkoutSession, WorkoutSet } from "../types";
import { dateRange } from "./date";
import { phaseLabels } from "./goalCalculator";
import { formatWeeklyWorkoutStatus, type WeeklyWorkoutStatus } from "./workoutStatus";

export function generateMarkdownReport(input: {
  profile?: Profile;
  goal?: Goal;
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus?: WeeklyWorkoutStatus;
  periodStart: string;
  periodEnd: string;
  question: string;
}) {
  const dates = dateRange(input.periodStart, input.periodEnd);
  const foodDays = new Set(input.foodEntries.map((entry) => entry.app_date));
  const missingDays = dates.filter((date) => !foodDays.has(date));
  const totals = input.foodEntries.reduce(
    (sum, entry) => ({
      calories: sum.calories + entry.calories,
      protein: sum.protein + entry.protein_g,
      fat: sum.fat + entry.fat_g,
      carbs: sum.carbs + entry.carbs_g,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );
  const divisor = Math.max(foodDays.size, 1);
  const latestWeight = input.weightLogs.at(-1);
  const firstWeight = input.weightLogs[0];
  const eatingOut = input.foodEntries.filter((entry) => entry.entry_source !== "user" && entry.brand).length;
  const sweets = input.foodEntries.filter((entry) => /スイーツ|ケーキ|アイス|チョコ|プリン/.test(entry.name)).length;
  const drinking = input.foodEntries.filter((entry) => /飲み会|ビール|アルコール/.test(`${entry.name} ${entry.note ?? ""}`)).length;
  const sessionIds = new Set(input.workoutSessions.map((session) => session.id));
  const scopedExercises = input.workoutExercises.filter((exercise) => sessionIds.has(exercise.session_id));
  const isDaily = input.periodStart === input.periodEnd;
  const average = {
    calories: Math.round(totals.calories / divisor),
    protein: Math.round(totals.protein / divisor),
    fat: Math.round(totals.fat / divisor),
    carbs: Math.round(totals.carbs / divisor),
  };
  const macroDiffs = input.goal
    ? {
        calories: average.calories - input.goal.target_calories,
        protein: average.protein - input.goal.target_protein_g,
        fat: average.fat - input.goal.target_fat_g,
        carbs: average.carbs - input.goal.target_carbs_g,
      }
    : undefined;
  const fcWarnings = macroDiffs
    ? [
        macroDiffs.fat > 0 ? `脂質 +${macroDiffs.fat}g` : "",
        macroDiffs.carbs > 0 ? `炭水化物 +${macroDiffs.carbs}g` : "",
      ].filter(Boolean)
    : [];

  const foodLines = input.foodEntries.map((entry) => {
    const brand = entry.brand ? `${entry.brand} / ` : "";
    const note = entry.note ? ` / ${entry.note}` : "";
    return `- ${entry.app_date} ${entry.meal_type}: ${brand}${entry.name} ${entry.calories}kcal / P${entry.protein_g} F${entry.fat_g} C${entry.carbs_g}${note}`;
  });

  const exerciseLines = scopedExercises.map((exercise) => {
    const sets = input.workoutSets.filter((set) => set.workout_exercise_id === exercise.id);
    const activeCalories = sets.reduce((sum, set) => sum + (set.active_calories ?? 0), 0);
    const best = sets
      .filter((set) => set.weight_kg || set.reps)
      .sort((a, b) => (b.weight_kg ?? 0) * (b.reps ?? 1) - (a.weight_kg ?? 0) * (a.reps ?? 1))[0];
    const cardio = activeCalories ? ` / active ${activeCalories}kcal` : "";
    return `- ${exercise.exercise_name}: ${sets.length} set${best ? ` / best ${best.weight_kg ?? "-"}kg x ${best.reps ?? "-"}` : ""}${cardio}`;
  });

  return `# ゴールトラッカー AI相談レポート

${isDaily ? `対象日: ${input.periodStart}` : `期間: ${input.periodStart} - ${input.periodEnd}`}

## 現在のゴール

- フェーズ: ${input.goal ? phaseLabels[input.goal.phase] : "未設定"}
- 目標 kcal: ${input.goal?.target_calories ?? "-"}
- 目標 P/F/C: ${input.goal?.target_protein_g ?? "-"}g / ${input.goal?.target_fat_g ?? "-"}g / ${input.goal?.target_carbs_g ?? "-"}g
- 週の運動目標: 筋トレ ${input.goal?.target_workouts_per_week ?? "-"}回 / 有酸素 ${input.goal?.target_cardio_sessions_per_week ?? "-"}回

## プロフィール

- 名前: ${input.profile?.name ?? "-"}
- 身長: ${input.profile?.height_cm ?? "-"}cm
- 現在体重: ${latestWeight?.weight_kg ?? input.profile?.current_weight_kg ?? "-"}kg
- 体脂肪率: ${latestWeight?.body_fat_percentage ?? input.profile?.body_fat_percentage ?? "-"}%

## 体重トレンド

- 初回: ${firstWeight?.weight_kg ?? "-"}kg
- 最新: ${latestWeight?.weight_kg ?? "-"}kg
- 記録回数: ${input.weightLogs.length}

## 食事平均

- 記録あり日数: ${foodDays.size}
- 未記録日: ${missingDays.length}日 (${missingDays.join(", ") || "なし"})
- 平均 kcal: ${average.calories}
- 平均 P/F/C: ${average.protein}g / ${average.fat}g / ${average.carbs}g
- 外食・チェーン系ログ: ${eatingOut}件
- スイーツ系ログ: ${sweets}件
- 飲酒・飲み会ログ: ${drinking}件
- 推定ログ比率: ${
    Math.round((input.foodEntries.filter((entry) => entry.confidence !== "high").length / Math.max(input.foodEntries.length, 1)) * 100)
  }%

## 目標との差分

- kcal: ${macroDiffs ? formatDiff(macroDiffs.calories, "kcal") : "目標未設定"}
- P: ${macroDiffs ? formatDiff(macroDiffs.protein, "g") : "目標未設定"}
- F: ${macroDiffs ? formatDiff(macroDiffs.fat, "g") : "目標未設定"}
- C: ${macroDiffs ? formatDiff(macroDiffs.carbs, "g") : "目標未設定"}
- F/C超過: ${fcWarnings.join(" / ") || "なし"}

## 食事ログ

${foodLines.join("\n") || "- 記録なし"}

## ワークアウト

- セッション数: ${input.workoutSessions.length}
- 種目数: ${scopedExercises.length}
- 今週の達成状況: ${input.weeklyWorkoutStatus ? formatWeeklyWorkoutStatus(input.weeklyWorkoutStatus) : "未計算"}
- 今週の対象期間: ${input.weeklyWorkoutStatus ? `${input.weeklyWorkoutStatus.start} - ${input.weeklyWorkoutStatus.end}` : "-"}

${exerciseLines.join("\n") || "- 記録なし"}

## 相談したいこと

${input.question || "ここに質問を追記してください。"}
`;
}

function formatDiff(value: number, unit: string) {
  if (value > 0) return `+${value}${unit}超過`;
  if (value < 0) return `${Math.abs(value)}${unit}不足`;
  return "目標どおり";
}

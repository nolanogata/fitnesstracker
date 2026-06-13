import type { FoodEntry, Goal, Profile, WeightLog, WorkoutExercise, WorkoutSession, WorkoutSet } from "../types";
import { dateRange } from "./date";
import { phaseLabels } from "./goalCalculator";
import { formatWeeklyWorkoutStatus, type WeeklyWorkoutStatus } from "./workoutStatus";

type WorkoutGrouping = "day" | "week" | "month";

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
  generatedAt: string;
  currentAppDate: string;
  cheatDayDates?: string[];
  workoutGrouping?: WorkoutGrouping;
  question: string;
}) {
  const dates = dateRange(input.periodStart, input.periodEnd);
  const cheatDayDates = dates.filter((date) => input.cheatDayDates?.includes(date));
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
  const estimatedFoodEntries = input.foodEntries.filter(isEstimatedFoodEntry);
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
    return `- ${entry.app_date} ${entry.meal_type}: ${brand}${entry.name} ${entry.calories}kcal / P${entry.protein_g} F${entry.fat_g} C${entry.carbs_g}${formatFoodEntrySourceNote(entry)}${note}`;
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
  const workoutSummaryLines = buildWorkoutSummaryLines({
    grouping: input.workoutGrouping ?? "day",
    sessions: input.workoutSessions,
    exercises: scopedExercises,
    sets: input.workoutSets,
  });
  const dailyWorkoutDetailLines = buildDailyWorkoutDetailLines({
    sessions: input.workoutSessions,
    exercises: scopedExercises,
    sets: input.workoutSets,
  });
  const isCurrentDailySnapshot = isDaily && input.periodEnd === input.currentAppDate;
  const estimatedFoodRequestLine = estimatedFoodEntries.length
    ? "- 食事ログに推定値が含まれています。可能ならAI側で公式サイト・商品ページ・信頼できる栄養データから正しい kcal / P / F / C の取得を試み、推定値との差分が大きいものを明記してください。"
    : "";
  const cheatDayRequestLine = cheatDayDates.length
    ? "- 対象範囲にチートデーがあります。該当日は通常の目標超過として厳しく評価しすぎず、週/月の平均や翌日以降の調整方針として扱ってください。"
    : "";

  return `# ゴールトラッカー AI相談レポート

${isDaily ? `対象日: ${input.periodStart}` : `期間: ${input.periodStart} - ${input.periodEnd}`}

## レポート情報

- 生成日時: ${formatReportDateTime(input.generatedAt)}
- 対象範囲の状態: ${isCurrentDailySnapshot ? "当日途中の記録である可能性があります" : "対象期間終了後または過去期間の記録です"}
- チートデー: ${cheatDayDates.length ? `あり (${cheatDayDates.join(", ")})` : "なし"}
${isCurrentDailySnapshot ? "- 注意: このレポートは1日の途中経過として扱い、最終的な摂取量・運動量とは限らない前提で判断してください。" : ""}

## AIへの依頼

- このレポート、これまでの会話、AI側で把握している追加情報を踏まえて、現在の目標に対する適正な目標カロリーとP/F/Cを算定してください。
- 対象範囲の状態が当日途中の場合は、途中経過であることを明記し、その時点までの傾向として評価してください。
- チートデーがある場合は、該当日をチートデーとして明記したうえで、通常日と分けて評価してください。
- 体重、体脂肪率、活動量、トレーニング頻度、生活リズムなどについて、AI側にこのレポートより詳細または新しい情報がある場合は、その情報を優先して判断してください。
- AI側で判断した適正値が、現在トラッカーに設定されている kcal / P / F / C と違う場合は、トラッカー側の値を編集する前提で修正後の数値を明示してください。
- 体重・体脂肪率・運動強度・フェーズ・週の運動目標など、PFC以外にもトラッカー側で直した方がよい項目があれば併せて示してください。
${estimatedFoodRequestLine}
${cheatDayRequestLine}
- 修正が不要な場合も、その理由と次に見るべき記録指標を簡潔に教えてください。
- トラッカー側で変更する値がある場合は、「トラッカー修正案」として、そのまま入力しやすい形でまとめてください。

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
- チートデー: ${cheatDayDates.length ? `${cheatDayDates.length}日 (${cheatDayDates.join(", ")})` : "なし"}
- 推定値を含む食事ログ: ${estimatedFoodEntries.length}件${estimatedFoodEntries.length ? "（該当ログは食事詳細に明記）" : ""}
- 推定ログ比率: ${
    Math.round((input.foodEntries.filter((entry) => entry.confidence !== "high").length / Math.max(input.foodEntries.length, 1)) * 100)
  }%

## 目標との差分

- kcal: ${macroDiffs ? formatDiff(macroDiffs.calories, "kcal") : "目標未設定"}
- P: ${macroDiffs ? formatDiff(macroDiffs.protein, "g") : "目標未設定"}
- F: ${macroDiffs ? formatDiff(macroDiffs.fat, "g") : "目標未設定"}
- C: ${macroDiffs ? formatDiff(macroDiffs.carbs, "g") : "目標未設定"}
- F/C超過: ${fcWarnings.join(" / ") || "なし"}

${isDaily ? "## その日の食事詳細" : "## 食事ログ"}

${foodLines.join("\n") || "- 記録なし"}

${isDaily ? `## その日のワークアウト詳細

- セッション数: ${input.workoutSessions.length}
- 種目数: ${scopedExercises.length}
- セット数: ${dailyWorkoutDetailLines.setCount}

${dailyWorkoutDetailLines.lines.join("\n") || "- 記録なし"}` : `## ワークアウト

- セッション数: ${input.workoutSessions.length}
- 種目数: ${scopedExercises.length}
- 今週の達成状況: ${input.weeklyWorkoutStatus ? formatWeeklyWorkoutStatus(input.weeklyWorkoutStatus) : "未計算"}
- 今週の対象期間: ${input.weeklyWorkoutStatus ? `${input.weeklyWorkoutStatus.start} - ${input.weeklyWorkoutStatus.end}` : "-"}
- 履歴粒度: ${groupingLabel(input.workoutGrouping ?? "day")}

### ワークアウト要約

${workoutSummaryLines.join("\n") || "- 記録なし"}

### 種目詳細

${exerciseLines.join("\n") || "- 記録なし"}`}

## 相談したいこと

${input.question || "ここに質問を追記してください。"}
`;
}

function isEstimatedFoodEntry(entry: FoodEntry) {
  return entry.entry_source === "estimated" || entry.entry_source === "quick_estimate" || entry.confidence !== "high";
}

function formatFoodEntrySourceNote(entry: FoodEntry) {
  if (entry.entry_source === "official" && entry.confidence === "high") return " / データ: 公式値";
  if (entry.entry_source === "user") {
    return ` / データ: ユーザー入力${entry.confidence !== "high" ? "（未確認・要確認）" : ""}`;
  }
  if (entry.entry_source === "unofficial") return " / データ: 非公式値（要確認）";
  if (entry.entry_source === "quick_estimate") return " / データ: クイック見積（推定値・要確認）";
  if (entry.entry_source === "estimated") return " / データ: 推定値（要確認）";
  return entry.confidence === "high" ? "" : " / データ: 要確認";
}

function buildWorkoutSummaryLines(input: {
  grouping: WorkoutGrouping;
  sessions: WorkoutSession[];
  exercises: WorkoutExercise[];
  sets: WorkoutSet[];
}) {
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  input.exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.sets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });

  const groups = new Map<string, WorkoutSession[]>();
  input.sessions.forEach((session) => {
    const key = input.grouping === "day" ? session.app_date : input.grouping === "week" ? startOfWeek(session.app_date) : session.app_date.slice(0, 7);
    groups.set(key, [...(groups.get(key) ?? []), session]);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, sessions]) => {
      const exerciseCount = sessions.reduce((sum, session) => sum + (exercisesBySession.get(session.id)?.length ?? 0), 0);
      const setCount = sessions.reduce((sum, session) => {
        const sessionExercises = exercisesBySession.get(session.id) ?? [];
        return sum + sessionExercises.reduce((setSum, exercise) => setSum + (setsByExercise.get(exercise.id)?.length ?? 0), 0);
      }, 0);
      const titles = sessions.map((session) => session.title).join(" / ");
      return `- ${formatGroupingKey(key, input.grouping)}: ${sessions.length}回 / ${exerciseCount}種目 / ${setCount}セット (${titles})`;
    });
}

function buildDailyWorkoutDetailLines(input: {
  sessions: WorkoutSession[];
  exercises: WorkoutExercise[];
  sets: WorkoutSet[];
}) {
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  input.exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.sets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });

  let setCount = 0;
  const lines = [...input.sessions]
    .sort((a, b) => a.logged_at.localeCompare(b.logged_at))
    .flatMap((session) => {
      const sessionExercises = [...(exercisesBySession.get(session.id) ?? [])].sort((a, b) => a.order - b.order);
      const sessionLines = [
        `- セッション: ${session.title} (${session.body_parts.join(" / ") || session.workout_type}${session.note ? ` / ${session.note}` : ""})`,
      ];
      if (!sessionExercises.length) {
        sessionLines.push("  - 種目なし");
        return sessionLines;
      }
      sessionExercises.forEach((exercise) => {
        const exerciseSets = [...(setsByExercise.get(exercise.id) ?? [])].sort((a, b) => a.set_order - b.set_order);
        setCount += exerciseSets.length;
        sessionLines.push(`  - ${exercise.exercise_name}: ${exercise.body_part} / ${exercise.equipment_type}${exercise.note ? ` / ${exercise.note}` : ""}`);
        if (!exerciseSets.length) {
          sessionLines.push("    - セット記録なし");
          return;
        }
        exerciseSets.forEach((set) => {
          sessionLines.push(`    - ${set.set_order}セット目: ${formatWorkoutSetDetail(set)}`);
        });
      });
      return sessionLines;
    });

  return { lines, setCount };
}

function formatWorkoutSetDetail(set: WorkoutSet) {
  const parts: string[] = [];
  if (typeof set.duration_min === "number") parts.push(`${set.duration_min}分`);
  if (typeof set.weight_kg === "number" || typeof set.reps === "number") {
    parts.push(`${typeof set.weight_kg === "number" ? `${set.weight_kg}kg` : "重量未記録"} x ${typeof set.reps === "number" ? `${set.reps}回` : "回数未記録"}`);
  }
  if (typeof set.active_calories === "number") parts.push(`${set.active_calories}kcal`);
  if (set.intensity) parts.push(`強度:${set.intensity}`);
  if (set.is_warmup) parts.push("ウォームアップ");
  if (set.note) parts.push(set.note);
  return parts.join(" / ") || "内容未記録";
}

function groupingLabel(grouping: WorkoutGrouping) {
  if (grouping === "week") return "週別";
  if (grouping === "month") return "月別";
  return "日別";
}

function formatReportDateTime(isoString: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}

function startOfWeek(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date.toISOString().slice(0, 10);
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatGroupingKey(key: string, grouping: WorkoutGrouping) {
  if (grouping === "week") return `${key} - ${addDays(key, 6)}`;
  if (grouping === "month") return key;
  return key;
}

function formatDiff(value: number, unit: string) {
  if (value > 0) return `+${value}${unit}超過`;
  if (value < 0) return `${Math.abs(value)}${unit}不足`;
  return "目標どおり";
}

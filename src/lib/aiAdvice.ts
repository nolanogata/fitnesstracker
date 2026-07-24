import type {
  AiAdviceMemory,
  AiAdviceMemoryItem,
  AiAdviceResponse,
  AiConsultation,
  FoodEntry,
  WeightLog,
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
} from "../types";
import { addDays, dateRange } from "./date";
import { makeId } from "./ids";

export const workersAiAdviceConsentVersion = "2026-07-24-v1";

export type AiAdviceUsage = {
  usage_date: string;
  advice: { used: number; per_user_limit: number };
  photo: { used: number; per_user_limit: number };
};

export type AiAdviceTopic = "daily_review" | "food" | "remaining" | "workout" | "goal" | "custom";

export const aiAdviceTopicOrder: AiAdviceTopic[] = ["daily_review", "food", "remaining", "workout", "goal", "custom"];

export const aiAdviceTopicPresets: Record<AiAdviceTopic, {
  label: string;
  description: string;
  mode: "day" | "week" | "month";
  contentScope: "food" | "workout" | "both";
  prompt: string;
}> = {
  daily_review: {
    label: "今日1日の評価",
    description: "今日の食事と、必要ならトレーニングもまとめて見る",
    mode: "day",
    contentScope: "both",
    prompt: "今日の記録を評価してください。",
  },
  food: {
    label: "食事内容について",
    description: "食事の傾向、良い点、改善できる点を見る",
    mode: "week",
    contentScope: "food",
    prompt: "食事内容を振り返り、記録から見える良い点と改善点、次に試す具体策を教えてください。",
  },
  remaining: {
    label: "残りで何を食べられるか",
    description: "今日の残りカロリーとPFCから候補を考える",
    mode: "day",
    contentScope: "food",
    prompt: "今日の目標と現在の摂取量、残りカロリーとPFCを踏まえ、残りで食べられる具体的な食事候補を複数教えてください。未記録や不明な値は推測で埋めないでください。",
  },
  workout: {
    label: "ワークアウト内容について",
    description: "頻度、部位、ボリューム、次のトレーニングを見る",
    mode: "week",
    contentScope: "workout",
    prompt: "ワークアウト内容を振り返り、頻度、部位、ボリュームの良い点と改善点、次に行う具体的なトレーニング案を教えてください。",
  },
  goal: {
    label: "ゴール設定について",
    description: "体重推移と記録から、今の目標が現実的かを見る",
    mode: "month",
    contentScope: "both",
    prompt: "現在の体重推移、食事、運動、設定中のゴールを踏まえ、目標と期間が現実的か、必要ならどこを調整すべきか教えてください。",
  },
  custom: {
    label: "自分で入力",
    description: "相談したい内容を自由に入力する",
    mode: "week",
    contentScope: "both",
    prompt: "",
  },
};

export function buildAiAdviceQuestion(topic: AiAdviceTopic, detail: string) {
  const supplement = detail.trim();
  if (topic === "custom") return supplement;
  return supplement
    ? `${aiAdviceTopicPresets[topic].prompt}\n\n補足: ${supplement}`
    : aiAdviceTopicPresets[topic].prompt;
}

export function buildDailyReviewQuestion(input: {
  coverage: "partial" | "completed";
  includeWorkout: boolean;
  hasWorkoutToday: boolean;
  detail: string;
}) {
  const timingInstruction = input.coverage === "partial"
    ? "今日はまだ途中経過です。未摂取分を不足と断定せず、この後の食事で調整できる点を示してください。"
    : "今日は1日分の記録が完了しています。1日全体として評価してください。";
  const workoutInstruction = !input.includeWorkout
    ? "今回は食事だけを評価してください。"
    : input.hasWorkoutToday
      ? "今日のトレーニング内容も含め、食事との組み合わせと次回への短い助言を加えてください。"
      : "今日はトレーニング記録がないため、直前4日間の記録を参照し、回復や部位の重なりを考慮して次に何を行うとよいか提案してください。休養日が不適切だとは決めつけないでください。";
  const base = [
    "今日の食事を、目標カロリーとP/F/Cの達成状況だけでなく、実際の食品・料理の組み合わせ、主食・主菜・副菜など食事全体の構成から評価してください。",
    "記録だけでは分からない野菜・果物・食物繊維・微量栄養素などは、摂れていないと断定せず、確認または補足候補として扱ってください。",
    timingInstruction,
    workoutInstruction,
  ].join("\n");
  return input.detail.trim() ? `${base}\n\n補足: ${input.detail.trim()}` : base;
}

export type AiAdviceError = Error & {
  code?: string;
  fallbackAvailable?: boolean;
};

export function buildAnonymousAdviceContext(input: {
  fullReport: string;
  appDate: string;
  topic: AiAdviceTopic;
  contentScope: "food" | "workout" | "both";
  topicLabel: string;
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  memory?: AiAdviceMemory;
  previousConsultation?: AiConsultation;
}) {
  const includeFoodComparison = input.contentScope !== "workout"
    && input.topic !== "remaining"
    && input.topic !== "daily_review";
  const includeWorkoutComparison = input.contentScope !== "food" && input.topic !== "daily_review";
  const trends = [
    ...(includeFoodComparison ? buildFoodComparison(input) : []),
    ...(includeWorkoutComparison ? buildWorkoutComparison(input) : []),
  ];
  const dailyReviewContext = input.topic === "daily_review"
    ? buildDailyReviewContext(input)
    : [];
  const memoryLines = (input.memory?.items ?? [])
    .filter((item) => item.active && !isInvalidWorkoutUniformityAdvice(item.text))
    .slice(-20)
    .map((item) => `- [${item.category}] ${sanitizeFreeText(item.text, 240)}`);
  const previous = input.previousConsultation
    ? [
        `- 前回の要約: ${sanitizeFreeText(input.previousConsultation.response.summary, 500)}`,
        ...input.previousConsultation.response.actions
          .filter((action) => !isInvalidWorkoutUniformityAdvice(action))
          .slice(0, 4)
          .map((action) => `- 前回の行動案: ${sanitizeFreeText(action, 240)}`),
      ]
    : [];
  const report = sanitizeAdviceReport(input.fullReport);
  return [
    "# 匿名化された相談コンテキスト",
    "",
    "## 今回の相談テーマ",
    `- ${sanitizeFreeText(input.topicLabel, 80)}`,
    `- 参照対象: ${input.contentScope === "food" ? "食事" : input.contentScope === "workout" ? "ワークアウト" : "食事とワークアウト"}`,
    "",
    "## 長期集計",
    ...(trends.length ? trends : ["- 今回は日別評価のため長期比較なし"]),
    ...(dailyReviewContext.length ? ["", ...dailyReviewContext] : []),
    "",
    "## 引継ぎメモ",
    ...(memoryLines.length ? memoryLines : ["- なし"]),
    "",
    "## 同じテーマの直前回答",
    ...(previous.length ? previous : ["- なし"]),
    "",
    "## 今回選択した期間のレポート",
    report,
  ].join("\n").slice(0, 24_000);
}

function buildDailyReviewContext(input: {
  appDate: string;
  contentScope: "food" | "workout" | "both";
  foodEntries: FoodEntry[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
}) {
  const rows = ["## 今日1日の評価用データ"];
  if (input.contentScope !== "workout") {
    const foods = input.foodEntries.filter((entry) => entry.app_date === input.appDate);
    const mealCounts = new Map<string, number>();
    foods.forEach((entry) => {
      mealCounts.set(entry.meal_type, (mealCounts.get(entry.meal_type) ?? 0) + 1);
    });
    rows.push(`- 今日の食事記録: ${foods.length}件${mealCounts.size ? ` / ${[...mealCounts.entries()].map(([meal, count]) => `${meal} ${count}件`).join(" / ")}` : ""}`);
  }
  if (input.contentScope === "food") return rows;

  const todaySessions = input.workoutSessions.filter((session) => session.app_date === input.appDate);
  if (todaySessions.length) {
    rows.push(`- 今日のトレーニング記録: ${todaySessions.length}セッション`);
    rows.push(...todaySessions.map((session) => formatDailyReviewWorkoutSession(session, input)));
    return rows;
  }

  const fallbackStart = addDays(input.appDate, -4);
  const fallbackEnd = addDays(input.appDate, -1);
  const fallbackSessions = input.workoutSessions
    .filter((session) => session.app_date >= fallbackStart && session.app_date <= fallbackEnd)
    .sort((a, b) => b.app_date.localeCompare(a.app_date) || b.logged_at.localeCompare(a.logged_at));
  rows.push(`- 今日のトレーニング記録: なし`);
  rows.push(`- 次回提案用の参照期間: ${fallbackStart}〜${fallbackEnd}（直前4日間）`);
  rows.push(...(fallbackSessions.length
    ? fallbackSessions.map((session) => formatDailyReviewWorkoutSession(session, input))
    : ["- 直前4日間のトレーニング記録もなし"]));
  return rows;
}

function formatDailyReviewWorkoutSession(
  session: WorkoutSession,
  input: {
    workoutExercises: WorkoutExercise[];
    workoutSets: WorkoutSet[];
  },
) {
  const exercises = input.workoutExercises.filter((exercise) => exercise.session_id === session.id);
  const exerciseIds = new Set(exercises.map((exercise) => exercise.id));
  const workingSets = input.workoutSets.filter((set) => exerciseIds.has(set.workout_exercise_id) && !set.is_warmup);
  const exerciseSummary = exercises.map((exercise) => {
    const sets = workingSets.filter((set) => set.workout_exercise_id === exercise.id);
    return `${exercise.exercise_name} ${sets.length}セット`;
  }).join(" / ");
  const parts = session.body_parts.length ? session.body_parts.join("・") : "部位未設定";
  return `- ${session.app_date} ${sanitizeFreeText(session.title, 80) || "ワークアウト"}: ${parts} / ${exerciseSummary || "種目詳細なし"}`;
}

function sanitizeAdviceReport(report: string) {
  const excludedSections = new Set(["AIへの依頼", "相談したいこと"]);
  let excludeCurrentSection = false;
  return report
    .split("\n")
    .filter((line) => {
      const heading = line.match(/^\s*##\s+(.+?)\s*$/);
      if (heading) {
        excludeCurrentSection = excludedSections.has(heading[1]);
        return !excludeCurrentSection;
      }
      if (excludeCurrentSection) return false;
      return !/^- (名前|メール|ユーザーID|生年月日):/.test(line.trim());
    })
    .join("\n")
    .trim();
}

function buildFoodComparison(input: {
  appDate: string;
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
}) {
  const recent = summarizeFoodWindow(input, addDays(input.appDate, -6), input.appDate);
  const previous = summarizeFoodWindow(input, addDays(input.appDate, -13), addDays(input.appDate, -7));
  const baseline = summarizeFoodWindow(input, addDays(input.appDate, -27), input.appDate);
  return [
    "### 食事比較",
    formatFoodWindow("直近7日", recent),
    formatFoodWindow("直前7日（直近7日と重複なし）", previous),
    formatFoodWindow("直近28日の参考平均（直近7日を含むため独立した増減比較には使わない）", baseline),
  ];
}

function summarizeFoodWindow(
  input: {
    foodEntries: FoodEntry[];
    weightLogs: WeightLog[];
  },
  start: string,
  end: string,
) {
  const dates = new Set(dateRange(start, end));
  const foods = input.foodEntries.filter((entry) => dates.has(entry.app_date));
  const weights = input.weightLogs.filter((entry) => dates.has(entry.app_date));
  const foodDays = new Set(foods.map((entry) => entry.app_date)).size;
  const totals = foods.reduce((sum, entry) => ({
    calories: sum.calories + entry.calories,
    protein: sum.protein + entry.protein_g,
    fat: sum.fat + entry.fat_g,
    carbs: sum.carbs + entry.carbs_g,
  }), { calories: 0, protein: 0, fat: 0, carbs: 0 });
  const firstWeight = [...weights].sort((a, b) => a.app_date.localeCompare(b.app_date))[0]?.weight_kg;
  const lastWeight = [...weights].sort((a, b) => b.app_date.localeCompare(a.app_date))[0]?.weight_kg;
  const divisor = Math.max(foodDays, 1);
  return {
    start,
    end,
    totalDays: dates.size,
    foodDays,
    average: {
      calories: Math.round(totals.calories / divisor),
      protein: round1(totals.protein / divisor),
      fat: round1(totals.fat / divisor),
      carbs: round1(totals.carbs / divisor),
    },
    weightCount: weights.length,
    weightChange: firstWeight !== undefined && lastWeight !== undefined ? round1(lastWeight - firstWeight) : undefined,
  };
}

function formatFoodWindow(
  label: string,
  summary: ReturnType<typeof summarizeFoodWindow>,
) {
  const nutrition = summary.foodDays
    ? `${summary.average.calories}kcal / P${summary.average.protein}g F${summary.average.fat}g C${summary.average.carbs}g`
    : "算出不可";
  const weight = summary.weightCount
    ? `${summary.weightCount}件${summary.weightChange !== undefined ? ` / 期間変化 ${signed(summary.weightChange)}kg` : ""}`
    : "記録なし";
  return `- ${label} (${summary.start}〜${summary.end}): 食事記録 ${summary.foodDays}/${summary.totalDays}日 / 記録日の平均 ${nutrition} / 体重 ${weight}`;
}

function buildWorkoutComparison(input: {
  appDate: string;
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
}) {
  const recentStart = addDays(input.appDate, -6);
  const previousEnd = addDays(input.appDate, -7);
  const previousStart = addDays(input.appDate, -13);
  const monthStart = addDays(input.appDate, -27);
  const recent = summarizeWorkoutWindow(input, recentStart, input.appDate);
  const previous = summarizeWorkoutWindow(input, previousStart, previousEnd);
  const month = summarizeWorkoutWindow(input, monthStart, input.appDate);
  const comparisons = buildSameExerciseComparisons(input, monthStart, input.appDate);
  return [
    "### ワークアウト比較",
    formatWorkoutWindow("直近7日", recent),
    formatWorkoutWindow("直前7日（直近7日と重複なし）", previous),
    `- 直近28日の週平均: 実施日 ${round1(month.activeDays / 4)}日 / セッション ${round1(month.sessions / 4)}回 / 種目実施 ${round1(month.exercises / 4)}件 / 本セット ${round1(month.workingSets / 4)}セット`,
    `- 直近7日の部位別本セット: ${formatBodyPartSets(recent.bodyPartSets)}`,
    `- 直前7日の部位別本セット: ${formatBodyPartSets(previous.bodyPartSets)}`,
    "",
    "### 同一種目の直近比較",
    ...(comparisons.length ? comparisons : ["- 同じ種目の比較可能な記録なし"]),
  ];
}

function summarizeWorkoutWindow(
  input: {
    workoutSessions: WorkoutSession[];
    workoutExercises: WorkoutExercise[];
    workoutSets: WorkoutSet[];
  },
  start: string,
  end: string,
) {
  const sessions = input.workoutSessions.filter((session) => session.app_date >= start && session.app_date <= end);
  const sessionIds = new Set(sessions.map((session) => session.id));
  const exercises = input.workoutExercises.filter((exercise) => sessionIds.has(exercise.session_id));
  const exerciseIds = new Set(exercises.map((exercise) => exercise.id));
  const workingSets = input.workoutSets.filter((set) => exerciseIds.has(set.workout_exercise_id) && !set.is_warmup);
  const bodyPartByExercise = new Map(exercises.map((exercise) => [exercise.id, exercise.body_part]));
  const bodyPartSets = new Map<string, number>();
  workingSets.forEach((set) => {
    const bodyPart = bodyPartByExercise.get(set.workout_exercise_id) || "未分類";
    bodyPartSets.set(bodyPart, (bodyPartSets.get(bodyPart) ?? 0) + 1);
  });
  return {
    start,
    end,
    activeDays: new Set(sessions.map((session) => session.app_date)).size,
    sessions: sessions.length,
    exercises: exercises.length,
    workingSets: workingSets.length,
    bodyPartSets,
  };
}

function formatWorkoutWindow(
  label: string,
  summary: ReturnType<typeof summarizeWorkoutWindow>,
) {
  return `- ${label} (${summary.start}〜${summary.end}): 実施日 ${summary.activeDays}日 / セッション ${summary.sessions}回 / 種目実施 ${summary.exercises}件 / 本セット ${summary.workingSets}セット`;
}

function formatBodyPartSets(bodyPartSets: Map<string, number>) {
  const rows = [...bodyPartSets.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([bodyPart, sets]) => `${bodyPart} ${sets}セット`);
  return rows.length ? rows.join(" / ") : "記録なし";
}

function buildSameExerciseComparisons(
  input: {
    workoutSessions: WorkoutSession[];
    workoutExercises: WorkoutExercise[];
    workoutSets: WorkoutSet[];
  },
  start: string,
  end: string,
) {
  const sessions = input.workoutSessions.filter((session) => session.app_date >= start && session.app_date <= end);
  const sessionById = new Map(sessions.map((session) => [session.id, session]));
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.workoutSets.filter((set) => !set.is_warmup).forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });
  const occurrences = new Map<string, Array<{
    date: string;
    name: string;
    sets: WorkoutSet[];
  }>>();
  input.workoutExercises.forEach((exercise) => {
    const session = sessionById.get(exercise.session_id);
    if (!session) return;
    const sets = setsByExercise.get(exercise.id) ?? [];
    if (!sets.length) return;
    const key = exercise.exercise_id || `${exercise.exercise_name.trim().toLowerCase()}|${exercise.equipment_type}`;
    occurrences.set(key, [...(occurrences.get(key) ?? []), {
      date: session.app_date,
      name: exercise.exercise_name,
      sets,
    }]);
  });
  return [...occurrences.values()]
    .filter((rows) => rows.length >= 2)
    .map((rows) => rows.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2))
    .sort((a, b) => b[0].date.localeCompare(a[0].date))
    .slice(0, 8)
    .map(([latest, previous]) => `- ${latest.name}: ${previous.date} ${formatWorkoutOccurrence(previous.sets)} → ${latest.date} ${formatWorkoutOccurrence(latest.sets)}`);
}

function formatWorkoutOccurrence(sets: WorkoutSet[]) {
  const best = [...sets].sort((a, b) => workoutSetComparisonScore(b) - workoutSetComparisonScore(a))[0];
  const load = best.load_type === "bodyweight"
    ? "自重"
    : best.load_type === "weighted"
      ? `+${best.weight_kg ?? 0}kg`
      : best.load_type === "assisted"
        ? `補助${best.weight_kg ?? 0}kg`
        : typeof best.weight_kg === "number"
          ? `${best.weight_kg}kg`
          : "重量未記録";
  return `${sets.length}セット / best ${load}×${best.reps ?? "回数未記録"}`;
}

function workoutSetComparisonScore(set: WorkoutSet) {
  const weight = set.weight_kg ?? 0;
  const reps = set.reps ?? 0;
  if (set.load_type === "assisted") return reps - weight / 10;
  return weight ? weight * (1 + reps / 30) : reps;
}

function isInvalidWorkoutUniformityAdvice(value: string) {
  const normalized = value.replace(/\s+/g, "");
  return /(種目ごと|異なる種目).{0,20}重量.{0,12}(均一|揃え|一定)/
    .test(normalized)
    || /セット数.{0,12}(均一|揃え|一定)/.test(normalized)
    || /部位.{0,20}ボリューム.{0,12}(均一|揃え|一定)/.test(normalized);
}

export async function requestAiAdvice(input: {
  requestId: string;
  threadId: string;
  turnIndex: number;
  topic: AiAdviceTopic;
  periodStart: string;
  periodEnd: string;
  contentScope: "food" | "workout" | "both";
  question: string;
  context: string;
}) {
  const response = await fetch("/api/ai/advice", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      request_id: input.requestId,
      thread_id: input.threadId,
      turn_index: input.turnIndex,
      topic: input.topic,
      period_start: input.periodStart,
      period_end: input.periodEnd,
      content_scope: input.contentScope,
      question: input.question,
      context: input.context,
      presentation_style: "neutral",
    }),
  });
  const data = await response.json().catch(() => ({})) as {
    error?: string;
    message?: string;
    result?: AiAdviceResponse;
    model?: string;
    cached?: boolean;
  };
  if (!response.ok || !data.result || !data.model) {
    const error = new Error(data.message || `アプリ内AI相談に失敗しました。（HTTP ${response.status}）`) as AiAdviceError;
    error.code = data.error;
    error.fallbackAvailable = response.status === 429 || response.status >= 500;
    throw error;
  }
  return { result: data.result, model: data.model, cached: Boolean(data.cached) };
}

export async function fetchAiAdviceUsage(): Promise<AiAdviceUsage | undefined> {
  const response = await fetch("/api/ai/usage", { headers: { accept: "application/json" } });
  if (!response.ok) return undefined;
  return response.json() as Promise<AiAdviceUsage>;
}

export function applyAdviceMemoryUpdates(memory: AiAdviceMemory | undefined, response: AiAdviceResponse, timestamp: string): AiAdviceMemory {
  const existing = memory?.items ?? [];
  const additions: AiAdviceMemoryItem[] = response.memory_updates
    .map((update) => ({ category: update.category, text: sanitizeFreeText(update.text, 240) }))
    .filter((update) => update.text && !existing.some((item) => item.active && item.category === update.category && item.text === update.text))
    .slice(0, 6)
    .map((update) => ({
      id: makeId("memory"),
      category: update.category,
      text: update.text,
      source: "ai",
      active: true,
      created_at: timestamp,
      updated_at: timestamp,
    }));
  const userItems = existing.filter((item) => item.source === "user");
  const aiItems = [...existing.filter((item) => item.source === "ai"), ...additions]
    .slice(-Math.max(0, 40 - userItems.length));
  return {
    id: memory?.id ?? "default",
    items: [...userItems, ...aiItems],
    created_at: memory?.created_at ?? timestamp,
    updated_at: timestamp,
  };
}

export function parseExternalAiHandoff(text: string): AiAdviceResponse | undefined {
  const fenced = text.match(/```phase_log_handoff_v1\s*([\s\S]*?)```/i)
    ?? text.match(/```json\s*([\s\S]*?"type"\s*:\s*"phase_log_handoff_v1"[\s\S]*?)```/i);
  if (!fenced) return undefined;
  try {
    const parsed = JSON.parse(fenced[1]) as Partial<AiAdviceResponse> & { type?: string };
    if (parsed.type !== "phase_log_handoff_v1") return undefined;
    return normalizeAdviceResponse(parsed);
  } catch {
    return undefined;
  }
}

export function appendExternalAiHandoffInstruction(report: string) {
  return `${report}

## アプリへ引き継ぐための出力形式

回答の最後に、次の形式の短いJSONを必ず付けてください。本文の要点だけを入れ、個人を特定する情報は含めないでください。

\`\`\`phase_log_handoff_v1
{"type":"phase_log_handoff_v1","headline":"短い見出し","summary":"今回の結論","observations":[],"evidence":[],"actions":[],"cautions":[],"memory_updates":[{"category":"focus","text":"次回へ残す短い要点"}]}
\`\`\``;
}

function normalizeAdviceResponse(value: Partial<AiAdviceResponse>): AiAdviceResponse {
  return {
    headline: sanitizeFreeText(value.headline, 100) || "AI相談",
    summary: sanitizeFreeText(value.summary, 800),
    observations: normalizeStrings(value.observations, 6, 300),
    evidence: Array.isArray(value.evidence) ? value.evidence.slice(0, 8).map((item) => ({
      label: sanitizeFreeText(item?.label, 80),
      value: sanitizeFreeText(item?.value, 120),
      period: sanitizeFreeText(item?.period, 80) || undefined,
    })).filter((item) => item.label && item.value) : [],
    actions: normalizeStrings(value.actions, 5, 300),
    cautions: normalizeStrings(value.cautions, 5, 300),
    follow_up_question: sanitizeFreeText(value.follow_up_question, 240) || undefined,
    memory_updates: Array.isArray(value.memory_updates) ? value.memory_updates.slice(0, 6).flatMap((item) => (
      ["constraint", "focus", "experiment", "pattern", "unresolved"].includes(item?.category)
        ? [{ category: item.category, text: sanitizeFreeText(item.text, 240) } as AiAdviceResponse["memory_updates"][number]]
        : []
    )).filter((item) => item.text) : [],
  };
}

function normalizeStrings(value: unknown, maxItems: number, maxLength: number) {
  return Array.isArray(value)
    ? value.slice(0, maxItems).map((item) => sanitizeFreeText(item, maxLength)).filter(Boolean)
    : [];
}

function sanitizeFreeText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function signed(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

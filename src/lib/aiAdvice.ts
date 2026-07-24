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

export type AiAdviceError = Error & {
  code?: string;
  fallbackAvailable?: boolean;
};

export function buildAnonymousAdviceContext(input: {
  fullReport: string;
  appDate: string;
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  memory?: AiAdviceMemory;
  previousConsultation?: AiConsultation;
}) {
  const trends = [7, 28, 90].map((days) => buildTrendWindow(input, days));
  const memoryLines = (input.memory?.items ?? [])
    .filter((item) => item.active)
    .slice(-20)
    .map((item) => `- [${item.category}] ${sanitizeFreeText(item.text, 240)}`);
  const previous = input.previousConsultation
    ? [
        `- 前回の要約: ${sanitizeFreeText(input.previousConsultation.response.summary, 500)}`,
        ...input.previousConsultation.response.actions.slice(0, 4).map((action) => `- 前回の行動案: ${sanitizeFreeText(action, 240)}`),
      ]
    : [];
  const report = input.fullReport
    .split("\n")
    .filter((line) => !/^- (名前|メール|ユーザーID|生年月日):/.test(line.trim()))
    .join("\n");
  return [
    "# 匿名化された相談コンテキスト",
    "",
    "## 長期傾向",
    ...trends,
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

function buildTrendWindow(input: {
  appDate: string;
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
}, days: number) {
  const dates = new Set(dateRange(addDays(input.appDate, -(days - 1)), input.appDate));
  const foods = input.foodEntries.filter((entry) => dates.has(entry.app_date));
  const weights = input.weightLogs.filter((entry) => dates.has(entry.app_date));
  const sessions = input.workoutSessions.filter((entry) => dates.has(entry.app_date));
  const sessionIds = new Set(sessions.map((entry) => entry.id));
  const exercises = input.workoutExercises.filter((entry) => sessionIds.has(entry.session_id));
  const exerciseIds = new Set(exercises.map((entry) => entry.id));
  const sets = input.workoutSets.filter((entry) => exerciseIds.has(entry.workout_exercise_id) && !entry.is_warmup);
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
  return [
    `### 直近${days}日`,
    `- 食事記録日: ${foodDays}/${days}日`,
    `- 記録日の平均: ${Math.round(totals.calories / divisor)} kcal / P ${round1(totals.protein / divisor)}g / F ${round1(totals.fat / divisor)}g / C ${round1(totals.carbs / divisor)}g`,
    `- 体重記録: ${weights.length}件${firstWeight !== undefined && lastWeight !== undefined ? ` / 期間変化 ${signed(round1(lastWeight - firstWeight))}kg` : ""}`,
    `- ワークアウト: ${sessions.length}回 / 種目 ${exercises.length}件 / 本セット ${sets.length}件`,
  ].join("\n");
}

export async function requestAiAdvice(input: {
  requestId: string;
  threadId: string;
  turnIndex: number;
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

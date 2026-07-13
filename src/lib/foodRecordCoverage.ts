import type { FoodEntry, FoodRecordContext, IntakeRelativeLevel, MealRecordStatus } from "../types";

export type FoodCoverageDay = {
  date: string;
  foodEntryCount: number;
  calories: number;
  isCheatDay: boolean;
  isPauseDay: boolean;
  status: "recorded" | MealRecordStatus;
  context?: FoodRecordContext;
};

export const intakeRelativeLevelLabels: Record<IntakeRelativeLevel, string> = {
  none: "食べなかった／ほぼ食べなかった",
  much_less: "普段よりかなり少なかった",
  less: "普段より少なかった",
  normal: "いつも通りだった",
  more: "普段より多く食べた",
  much_more: "普段よりかなり多く食べた",
  consumed_unknown: "食べたが量は分からない",
  unknown: "不明のまま",
};

export function buildFoodCoverageDays(input: {
  dates: string[];
  foodEntries: FoodEntry[];
  contexts?: FoodRecordContext[];
  cheatDayDates?: string[];
  pauseDayDates?: string[];
  currentAppDate: string;
  dailyReportCoverage?: "partial" | "completed";
}) {
  const entriesByDate = new Map<string, FoodEntry[]>();
  input.foodEntries.forEach((entry) => entriesByDate.set(entry.app_date, [...(entriesByDate.get(entry.app_date) ?? []), entry]));
  const contextsByDate = new Map((input.contexts ?? []).map((context) => [context.date, context]));
  const cheatDays = new Set(input.cheatDayDates ?? []);
  const pauseDays = new Set(input.pauseDayDates ?? []);
  const isDaily = input.dates.length === 1;

  return input.dates.map((date): FoodCoverageDay => {
    const entries = entriesByDate.get(date) ?? [];
    const context = contextsByDate.get(date);
    const isPauseDay = pauseDays.has(date);
    const isCurrentPartial = date === input.currentAppDate && (!isDaily || input.dailyReportCoverage === "partial");
    const status = entries.length
      ? "recorded"
      : isPauseDay
        ? "excluded"
        : context?.meal_record_status ?? (isCurrentPartial ? "partial" : "unrecorded");
    return {
      date,
      foodEntryCount: entries.length,
      calories: entries.reduce((sum, entry) => sum + entry.calories, 0),
      isCheatDay: cheatDays.has(date),
      isPauseDay,
      status,
      context,
    };
  });
}

export function getFoodCoverageReviewDays(days: FoodCoverageDay[]) {
  return days.filter((day) => day.status === "unrecorded" && !day.context);
}

export function foodRecordContextFromSelection(input: {
  date: string;
  relativeLevel: IntakeRelativeLevel;
  estimatedCalories?: number;
  estimatedProtein?: number;
  estimatedFat?: number;
  estimatedCarbs?: number;
  memo?: string;
  confidence?: "low" | "medium" | "high";
  mealRecordStatus?: MealRecordStatus;
  confirmedAt: string;
}): FoodRecordContext {
  const hasEstimate = [input.estimatedCalories, input.estimatedProtein, input.estimatedFat, input.estimatedCarbs].some((value) => typeof value === "number");
  const status: MealRecordStatus = input.mealRecordStatus ?? (input.relativeLevel === "none"
    ? "declared_no_food"
    : input.relativeLevel === "unknown"
      ? "unrecorded"
      : "estimated_only");
  return {
    date: input.date,
    meal_record_status: status,
    intake_relative_level: input.relativeLevel,
    estimated_calories: input.estimatedCalories,
    estimated_protein_g: input.estimatedProtein,
    estimated_fat_g: input.estimatedFat,
    estimated_carbs_g: input.estimatedCarbs,
    intake_memo: input.memo?.trim() || undefined,
    intake_estimate_confidence: hasEstimate ? input.confidence ?? "low" : undefined,
    confirmation_source: "report_generation_prompt",
    confirmed_at: input.confirmedAt,
  };
}

export function getFoodCoverageConfidence(days: FoodCoverageDay[]) {
  const missing = days.filter((day) => day.status === "unrecorded");
  const partial = days.filter((day) => day.status === "partial");
  const qualitative = days.filter((day) => day.status === "estimated_only" && day.context?.estimated_calories === undefined);
  const estimated = days.filter((day) => day.status === "estimated_only" && day.context?.estimated_calories !== undefined);
  if (missing.length || partial.length || days.some((day) => day.isCheatDay && day.status !== "recorded")) return "低";
  if (qualitative.length || estimated.length || days.some((day) => day.status === "declared_no_food")) return "中";
  return "高";
}

import type { Confidence, FoodEntry, Goal, MenuItem, NutritionMeta, NutritionUncertainty } from "../types";

export type NutritionTotals = { calories: number; protein: number; fat: number; carbs: number };

export type DailyNutritionEstimate = {
  adoptedRemaining: NutritionTotals;
  safeRemaining: NutritionTotals;
  uncertainty: NutritionTotals;
  estimatedEntryCount: number;
  estimatedCalories: number;
  estimatedCalorieShare: number;
  inferredEntryCount: number;
  entries: Array<{ entry: FoodEntry; meta: NutritionMeta; uncertainty: NutritionUncertainty; inferred: boolean }>;
};

const fallbackPercentByConfidence: Record<Confidence, { calories: number; fat: number }> = {
  high: { calories: 0.08, fat: 0.15 },
  medium: { calories: 0.15, fat: 0.25 },
  low: { calories: 0.25, fat: 0.35 },
};

export function getEntryNutritionMeta(entry: FoodEntry, menuItem?: MenuItem): { meta: NutritionMeta; inferred: boolean } {
  if (entry.nutrition_meta) return { meta: entry.nutrition_meta, inferred: false };
  if (menuItem?.nutrition_meta) return { meta: menuItem.nutrition_meta, inferred: true };
  const text = `${entry.note ?? ""} ${menuItem?.tags.join(" ") ?? ""}`;
  if (/AI写真|AI推定/.test(text)) {
    return { meta: inferredMeta("ai_photo_estimate", entry.confidence, "旧AI写真ログから復元"), inferred: true };
  }
  if (entry.entry_source === "estimated" || entry.entry_source === "quick_estimate") {
    return { meta: inferredMeta(entry.entry_source === "quick_estimate" ? "manual_estimate" : "derived_calculation", entry.confidence), inferred: true };
  }
  if (entry.entry_source === "official" && entry.confidence === "high") {
    return { meta: { origin: "official_website", estimation_policy: "exact", uncertainty: zeroUncertainty() }, inferred: true };
  }
  if (entry.entry_source === "user") {
    return { meta: { origin: "user_entered", estimation_policy: "exact", uncertainty: zeroUncertainty() }, inferred: true };
  }
  return entry.confidence === "high"
    ? { meta: { origin: "unknown", estimation_policy: "exact", uncertainty: zeroUncertainty() }, inferred: true }
    : { meta: inferredMeta("unknown", entry.confidence), inferred: true };
}

export function getDailyNutritionEstimate(entries: FoodEntry[], totals: NutritionTotals, goal?: Goal, menuItems: MenuItem[] = []): DailyNutritionEstimate {
  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const estimatedEntries: DailyNutritionEstimate["entries"] = [];
  let uncertainty = { calories: 0, protein: 0, fat: 0, carbs: 0 };
  let estimatedCalories = 0;
  let inferredEntryCount = 0;

  entries.forEach((entry) => {
    const resolved = getEntryNutritionMeta(entry, entry.menu_item_id ? menuById.get(entry.menu_item_id) : undefined);
    if (!isEstimatedNutritionMeta(resolved.meta, entry.entry_source)) return;
    const entryUncertainty = resolveEntryUncertainty(entry, resolved.meta);
    uncertainty = {
      calories: uncertainty.calories + (entryUncertainty.calories ?? 0),
      protein: uncertainty.protein + (entryUncertainty.protein_g ?? 0),
      fat: uncertainty.fat + (entryUncertainty.fat_g ?? 0),
      carbs: uncertainty.carbs + (entryUncertainty.carbs_g ?? 0),
    };
    estimatedCalories += entry.calories;
    if (resolved.inferred) inferredEntryCount += 1;
    estimatedEntries.push({ entry, meta: resolved.meta, uncertainty: entryUncertainty, inferred: resolved.inferred });
  });

  const roundedUncertainty = {
    calories: Math.round(uncertainty.calories),
    protein: round1(uncertainty.protein),
    fat: round1(uncertainty.fat),
    carbs: round1(uncertainty.carbs),
  };
  const adoptedRemaining = getSignedRemaining(totals, goal);
  return {
    adoptedRemaining,
    safeRemaining: {
      calories: adoptedRemaining.calories - roundedUncertainty.calories,
      protein: adoptedRemaining.protein,
      fat: adoptedRemaining.fat - roundedUncertainty.fat,
      carbs: adoptedRemaining.carbs,
    },
    uncertainty: roundedUncertainty,
    estimatedEntryCount: estimatedEntries.length,
    estimatedCalories,
    estimatedCalorieShare: totals.calories > 0 ? Math.min(100, Math.round((estimatedCalories / totals.calories) * 100)) : 0,
    inferredEntryCount,
    entries: estimatedEntries,
  };
}

export function isEstimatedNutritionMeta(meta: NutritionMeta, dataSource?: FoodEntry["entry_source"]) {
  if (dataSource === "estimated" || dataSource === "quick_estimate" || dataSource === "unofficial") return true;
  return !["official_website", "package_label", "user_measured", "user_entered"].includes(meta.origin) || meta.estimation_policy !== "exact";
}

function resolveEntryUncertainty(entry: FoodEntry, meta: NutritionMeta): NutritionUncertainty {
  if (meta.uncertainty && meta.explicit_uncertainty) return sanitizeUncertainty(meta.uncertainty);
  if (!isEstimatedNutritionMeta(meta, entry.entry_source)) return zeroUncertainty();
  const fallback = fallbackPercentByConfidence[entry.confidence];
  return {
    calories: Math.round(entry.calories * fallback.calories),
    protein_g: meta.uncertainty?.protein_g,
    fat_g: round1(entry.fat_g * fallback.fat),
    carbs_g: meta.uncertainty?.carbs_g,
  };
}

function inferredMeta(origin: NutritionMeta["origin"], confidence: Confidence, evidenceNote?: string): NutritionMeta {
  return {
    origin,
    estimation_policy: "neutral",
    uncertainty: {
      calories: fallbackPercentByConfidence[confidence].calories,
      fat_g: fallbackPercentByConfidence[confidence].fat,
    },
    evidence_note: evidenceNote,
    explicit_uncertainty: false,
  };
}

function getSignedRemaining(totals: NutritionTotals, goal?: Goal): NutritionTotals {
  return {
    calories: (goal?.target_calories ?? 0) - totals.calories,
    protein: (goal?.target_protein_g ?? 0) - totals.protein,
    fat: (goal?.target_fat_g ?? 0) - totals.fat,
    carbs: (goal?.target_carbs_g ?? 0) - totals.carbs,
  };
}

function sanitizeUncertainty(value: NutritionUncertainty): NutritionUncertainty {
  return {
    calories: safeNumber(value.calories, 10_000, true),
    protein_g: safeNumber(value.protein_g, 1_000),
    fat_g: safeNumber(value.fat_g, 1_000),
    carbs_g: safeNumber(value.carbs_g, 1_500),
  };
}

function safeNumber(value: number | undefined, max: number, integer = false) {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const bounded = Math.min(max, Math.max(0, value));
  return integer ? Math.round(bounded) : round1(bounded);
}

function zeroUncertainty(): NutritionUncertainty {
  return { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 };
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

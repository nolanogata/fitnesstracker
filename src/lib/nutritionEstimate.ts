import type { Confidence, FoodEntry, Goal, MenuItem, NutritionFieldEvidence, NutritionFieldKey, NutritionMeta, NutritionUncertainty } from "../types";

export type NutritionTotals = { calories: number; protein: number; fat: number; carbs: number };
export type EstimatedNutritionEntry = {
  entry: FoodEntry;
  meta: NutritionMeta;
  uncertainty: NutritionUncertainty;
  inferred: boolean;
  estimatedFields: NutritionFieldKey[];
  calorieEstimated: boolean;
  macroEstimated: boolean;
  pfcOnlyEstimated: boolean;
  quantityEstimated: boolean;
  compositionEstimated: boolean;
};

export type DailyNutritionEstimate = {
  /** Remaining amount from the nutrition values the user adopted in the log. */
  adoptedRemaining: NutritionTotals;
  /** Planning allowance: kcal/F/C are conservative; P is the conservative amount still needed. */
  safeRemaining: NutritionTotals;
  uncertainty: NutritionTotals;
  estimatedEntryCount: number;
  estimatedCalorieEntryCount: number;
  pfcOnlyEstimatedEntryCount: number;
  macroEstimatedEntryCount: number;
  quantityEstimatedEntryCount: number;
  compositionEstimatedEntryCount: number;
  zeroCalorieEstimatedEntryCount: number;
  estimatedCalories: number;
  estimatedCalorieShare: number;
  inferredEntryCount: number;
  adoptedTotals: NutritionTotals;
  safeProteinLowerBound: number;
  safeProteinTargetGap: number;
  entries: EstimatedNutritionEntry[];
};

const nutrientFields: Array<{ key: NutritionFieldKey; totalKey: keyof NutritionTotals; entryKey: keyof Pick<FoodEntry, "calories" | "protein_g" | "fat_g" | "carbs_g">; uncertaintyKey: keyof NutritionUncertainty }> = [
  { key: "calories", totalKey: "calories", entryKey: "calories", uncertaintyKey: "calories" },
  { key: "protein_g", totalKey: "protein", entryKey: "protein_g", uncertaintyKey: "protein_g" },
  { key: "fat_g", totalKey: "fat", entryKey: "fat_g", uncertaintyKey: "fat_g" },
  { key: "carbs_g", totalKey: "carbs", entryKey: "carbs_g", uncertaintyKey: "carbs_g" },
];

const fallbackPercentByConfidence: Record<Confidence, Record<NutritionFieldKey, number>> = {
  high: { calories: 0.08, protein_g: 0.12, fat_g: 0.15, carbs_g: 0.1 },
  medium: { calories: 0.15, protein_g: 0.2, fat_g: 0.25, carbs_g: 0.18 },
  low: { calories: 0.25, protein_g: 0.3, fat_g: 0.35, carbs_g: 0.28 },
};

const exactOrigins = new Set<NutritionMeta["origin"]>([
  "official_website",
  "package_label",
  "user_measured",
  "user_entered",
  "derived_calculation",
]);

export function getEntryNutritionMeta(entry: FoodEntry, menuItem?: MenuItem): { meta: NutritionMeta; inferred: boolean } {
  if (entry.nutrition_meta) {
    // Existing entries retain their adopted numbers, while newer menu evidence can safely describe their source.
    const meta = !entry.nutrition_meta.nutrient_evidence && menuItem?.nutrition_meta?.nutrient_evidence
      ? { ...entry.nutrition_meta, nutrient_evidence: menuItem.nutrition_meta.nutrient_evidence }
      : entry.nutrition_meta;
    const enriched = enrichLegacyEstimateMeta(entry, meta);
    return { meta: enriched.meta, inferred: enriched.inferred || meta !== entry.nutrition_meta };
  }
  if (menuItem?.nutrition_meta) {
    const enriched = enrichLegacyEstimateMeta(entry, menuItem.nutrition_meta);
    return { meta: enriched.meta, inferred: true };
  }
  const text = `${entry.note ?? ""} ${menuItem?.tags.join(" ") ?? ""}`;
  if (/AI写真|AI推定/.test(text)) {
    return { meta: enrichLegacyEstimateMeta(entry, inferredMeta("ai_photo_estimate", entry.confidence, "旧AI写真ログから復元")).meta, inferred: true };
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

function enrichLegacyEstimateMeta(entry: FoodEntry, meta: NutritionMeta) {
  const quantityAlreadyEstimated = meta.quantity_meta?.estimated === true || meta.estimation_policy === "quantity_estimated";
  const compositionAlreadyEstimated = meta.composition_meta?.estimated === true;
  const aiQuantity = extractAiEstimatedQuantity(entry.note);
  const quantityEstimated = quantityAlreadyEstimated || aiQuantity.isTotalEstimated;
  const compositionEstimated = compositionAlreadyEstimated || aiQuantity.isCompositionEstimated || hasEstimatedComponents(meta);
  if (!quantityEstimated && !compositionEstimated) return { meta, inferred: false };
  return {
    meta: {
      ...meta,
      quantity_meta: meta.quantity_meta ?? (quantityEstimated ? {
        estimated: true,
        estimated_amount: aiQuantity.estimatedAmount,
        unit: aiQuantity.unit,
        evidence_note: "旧AI写真ログの推定量から復元",
      } : undefined),
      composition_meta: meta.composition_meta ?? (compositionEstimated ? {
        estimated: true,
        evidence_note: "旧AI写真ログの材料内訳から復元",
      } : undefined),
    },
    inferred: true,
  };
}

function extractAiEstimatedQuantity(note?: string) {
  const text = note ?? "";
  const match = text.match(/AI推定量\s*[:：]\s*([^/]+)/);
  const quantity = match?.[1]?.trim() ?? "";
  const isCompositionEstimated = /(?:ご飯|白米|米|肉|牛|豚|鶏|ソース|たれ|卵|玉子|麺|具材|トッピング).{0,14}(?:約|推定|想定)/.test(quantity);
  const isFixedServing = /^(?:1杯|一杯|1人前|一人前|1食|一食)/.test(quantity);
  const isTotalEstimated = /約|推定|想定|1口|一口|半分|[0-9一二三四五六七八九]割|一部|少量/.test(quantity) && !(isCompositionEstimated && isFixedServing);
  const amountMatch = quantity.match(/(?:約\s*)?(\d+(?:\.\d+)?)\s*g/i);
  return {
    isTotalEstimated,
    isCompositionEstimated,
    estimatedAmount: amountMatch ? Number(amountMatch[1]) : undefined,
    unit: amountMatch ? "g" : undefined,
  };
}

function hasEstimatedComponents(meta: NutritionMeta) {
  return meta.components?.some((component) => {
    const componentMeta = component.nutrition_meta;
    if (!componentMeta) return false;
    if (componentMeta.estimation_policy !== "exact") return true;
    return Object.values(componentMeta.nutrient_evidence ?? {}).some((evidence) => evidence?.estimation_policy !== "exact");
  }) ?? false;
}

export function getDailyNutritionEstimate(entries: FoodEntry[], totals: NutritionTotals, goal?: Goal, menuItems: MenuItem[] = []): DailyNutritionEstimate {
  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const estimatedEntries: EstimatedNutritionEntry[] = [];
  let uncertainty = { calories: 0, protein: 0, fat: 0, carbs: 0 };
  let estimatedCalories = 0;
  let estimatedCalorieEntryCount = 0;
  let pfcOnlyEstimatedEntryCount = 0;
  let macroEstimatedEntryCount = 0;
  let quantityEstimatedEntryCount = 0;
  let compositionEstimatedEntryCount = 0;
  let zeroCalorieEstimatedEntryCount = 0;
  let inferredEntryCount = 0;

  entries.forEach((entry) => {
    const resolved = getEntryNutritionMeta(entry, entry.menu_item_id ? menuById.get(entry.menu_item_id) : undefined);
    const estimatedFields = nutrientFields
      .filter(({ key }) => isNutritionFieldEstimated(resolved.meta, key, entry.entry_source))
      .map(({ key }) => key);
    const calorieFieldEstimated = estimatedFields.includes("calories");
    const macroFieldEstimated = estimatedFields.some((key) => key !== "calories") && hasMeaningfulMacroEstimate(entry, resolved.meta);
    const quantityEstimated = resolved.meta.quantity_meta?.estimated === true || resolved.meta.estimation_policy === "quantity_estimated";
    const compositionEstimated = resolved.meta.composition_meta?.estimated === true || hasEstimatedComponents(resolved.meta);
    // A scaled product label has a certain per-unit label, but its logged kcal/PFC are still uncertain because consumed quantity is estimated.
    const calorieEstimated = calorieFieldEstimated || (quantityEstimated && entry.calories > 0);
    const macroEstimated = macroFieldEstimated || (quantityEstimated && hasMeaningfulMacros(entry));
    const pfcOnlyEstimated = macroFieldEstimated && !calorieFieldEstimated && !quantityEstimated && !compositionEstimated;
    if (!estimatedFields.length && !quantityEstimated && !compositionEstimated) return;

    const entryUncertainty = resolveEntryUncertainty(entry, resolved.meta);
    uncertainty = {
      calories: uncertainty.calories + (entryUncertainty.calories ?? 0),
      protein: uncertainty.protein + (entryUncertainty.protein_g ?? 0),
      fat: uncertainty.fat + (entryUncertainty.fat_g ?? 0),
      carbs: uncertainty.carbs + (entryUncertainty.carbs_g ?? 0),
    };
    if (calorieEstimated && entry.calories > 0) {
      estimatedCalories += entry.calories;
      estimatedCalorieEntryCount += 1;
    } else if (calorieFieldEstimated) {
      zeroCalorieEstimatedEntryCount += 1;
    }
    if (macroEstimated) macroEstimatedEntryCount += 1;
    if (pfcOnlyEstimated) pfcOnlyEstimatedEntryCount += 1;
    if (quantityEstimated) quantityEstimatedEntryCount += 1;
    if (compositionEstimated) compositionEstimatedEntryCount += 1;
    if (resolved.inferred) inferredEntryCount += 1;
    estimatedEntries.push({ entry, meta: resolved.meta, uncertainty: entryUncertainty, inferred: resolved.inferred, estimatedFields, calorieEstimated, macroEstimated, pfcOnlyEstimated, quantityEstimated, compositionEstimated });
  });

  const roundedUncertainty = {
    calories: Math.round(uncertainty.calories),
    protein: round1(uncertainty.protein),
    fat: round1(uncertainty.fat),
    carbs: round1(uncertainty.carbs),
  };
  const adoptedRemaining = getSignedRemaining(totals, goal);
  const safeProteinLowerBound = round1(Math.max(0, totals.protein - roundedUncertainty.protein));
  const safeProteinTargetGap = round1(Math.max(0, (goal?.target_protein_g ?? 0) - safeProteinLowerBound));
  return {
    adoptedRemaining,
    safeRemaining: {
      calories: adoptedRemaining.calories - roundedUncertainty.calories,
      // Protein uncertainty can mean the recorded amount is lower than expected, so this is the conservative amount still needed.
      protein: adoptedRemaining.protein + roundedUncertainty.protein,
      fat: adoptedRemaining.fat - roundedUncertainty.fat,
      carbs: adoptedRemaining.carbs - roundedUncertainty.carbs,
    },
    uncertainty: roundedUncertainty,
    estimatedEntryCount: estimatedEntries.length,
    estimatedCalorieEntryCount,
    pfcOnlyEstimatedEntryCount,
    macroEstimatedEntryCount,
    quantityEstimatedEntryCount,
    compositionEstimatedEntryCount,
    zeroCalorieEstimatedEntryCount,
    estimatedCalories,
    estimatedCalorieShare: totals.calories > 0 ? Math.min(100, Math.round((estimatedCalories / totals.calories) * 100)) : 0,
    inferredEntryCount,
    adoptedTotals: totals,
    safeProteinLowerBound,
    safeProteinTargetGap,
    entries: estimatedEntries,
  };
}

export function isEstimatedNutritionMeta(meta: NutritionMeta, dataSource?: FoodEntry["entry_source"]) {
  return nutrientFields.some(({ key }) => isNutritionFieldEstimated(meta, key, dataSource))
    || meta.quantity_meta?.estimated === true
    || meta.estimation_policy === "quantity_estimated"
    || meta.composition_meta?.estimated === true
    || hasEstimatedComponents(meta);
}

export function isNutritionFieldEstimated(meta: NutritionMeta, field: NutritionFieldKey, dataSource?: FoodEntry["entry_source"]) {
  const evidence = meta.nutrient_evidence?.[field];
  if (evidence) return !isExactEvidence(evidence, meta);
  if (meta.origin || meta.estimation_policy) return !isExactEvidence(meta, meta);
  return dataSource === "estimated" || dataSource === "quick_estimate" || dataSource === "unofficial";
}

function hasMeaningfulMacros(entry: FoodEntry) {
  return entry.protein_g !== 0 || entry.fat_g !== 0 || entry.carbs_g !== 0;
}

function hasMeaningfulMacroEstimate(entry: FoodEntry, meta: NutritionMeta) {
  if (hasMeaningfulMacros(entry)) return true;
  return ["protein_g", "fat_g", "carbs_g"].some((field) => {
    const uncertainty = meta.nutrient_evidence?.[field as NutritionFieldKey]?.uncertainty?.plus ?? meta.uncertainty?.[field as keyof NutritionUncertainty];
    return typeof uncertainty === "number" && uncertainty > 0;
  });
}

function isExactEvidence(evidence: Pick<NutritionFieldEvidence, "origin" | "estimation_policy">, meta: NutritionMeta) {
  if (evidence.estimation_policy !== "exact") return false;
  if (evidence.origin !== "derived_calculation") return exactOrigins.has(evidence.origin);
  return Boolean(meta.components?.length) && meta.components!.every((component) => {
    const componentMeta = component.nutrition_meta;
    return componentMeta?.estimation_policy === "exact" && componentMeta.origin !== "derived_calculation" && exactOrigins.has(componentMeta.origin);
  });
}

function resolveEntryUncertainty(entry: FoodEntry, meta: NutritionMeta): NutritionUncertainty {
  const result: NutritionUncertainty = {};
  nutrientFields.forEach(({ key, entryKey, uncertaintyKey }) => {
    if (!isNutritionFieldEstimated(meta, key, entry.entry_source) && !meta.quantity_meta?.estimated) {
      result[uncertaintyKey] = 0;
      return;
    }
    const fieldEvidence = meta.nutrient_evidence?.[key];
    const explicitValue = fieldEvidence?.uncertainty?.plus ?? meta.uncertainty?.[uncertaintyKey];
    const quantityValue = explicitValue === undefined ? getQuantityUncertainty(entry[entryKey], meta) : undefined;
    const fallbackValue = explicitValue === undefined && quantityValue === undefined && (isNutritionFieldEstimated(meta, key, entry.entry_source) || meta.quantity_meta?.estimated === true)
      ? entry[entryKey] * fallbackPercentByConfidence[fieldEvidence?.confidence ?? entry.confidence][key]
      : 0;
    result[uncertaintyKey] = sanitizeNumber(explicitValue ?? quantityValue ?? fallbackValue, key === "calories" ? 10_000 : key === "carbs_g" ? 1_500 : 1_000, key === "calories");
  });
  return result;
}

function getQuantityUncertainty(value: number, meta: NutritionMeta) {
  const quantity = meta.quantity_meta;
  if (!quantity?.estimated || !quantity.estimated_amount || !quantity.uncertainty_amount || quantity.estimated_amount <= 0) return undefined;
  return Math.abs(value) * (quantity.uncertainty_amount / quantity.estimated_amount);
}

function inferredMeta(origin: NutritionMeta["origin"], confidence: Confidence, evidenceNote?: string): NutritionMeta {
  return {
    origin,
    estimation_policy: "neutral",
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

function sanitizeNumber(value: number | undefined, max: number, integer = false) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  const bounded = Math.min(max, Math.max(0, value));
  return integer ? Math.round(bounded) : round1(bounded);
}

function zeroUncertainty(): NutritionUncertainty {
  return { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 };
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

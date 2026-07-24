import type { FoodEntry, MealType, MenuItem, NutritionMeta } from "../types";
import type { ChainComboMealPeriod, ChainComboServiceMode } from "./chainComboAvailability";
import { makeId } from "./ids.ts";

type ChainComboNutrition = {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
};

export type ChainComboLogCandidate = {
  item: MenuItem;
  role: "main" | "side";
  portionLabel?: string;
  portionMultiplier: number;
  staplePortionMultipliers?: object;
  nutrition: ChainComboNutrition;
};

export type ChainComboLogSuggestion = {
  id: string;
  title: string;
  items: ChainComboLogCandidate[];
};

export const chainComboMealTypeByPeriod: Record<ChainComboMealPeriod, MealType> = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
};

export const chainComboMealPeriodLabels: Record<ChainComboMealPeriod, string> = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
};

export const chainComboServiceModeLabels: Record<ChainComboServiceMode, string> = {
  dine_in: "店内",
  takeout: "持ち帰り",
};

export function buildChainComboFoodEntries({
  suggestion,
  appDate,
  timestamp,
  mealPeriod,
  serviceMode,
  idFactory = makeId,
}: {
  suggestion: ChainComboLogSuggestion;
  appDate: string;
  timestamp: string;
  mealPeriod: ChainComboMealPeriod;
  serviceMode: ChainComboServiceMode;
  idFactory?: (prefix: string) => string;
}): FoodEntry[] {
  const mealType = chainComboMealTypeByPeriod[mealPeriod];
  const contextNote = `おすすめ組み合わせ / ${chainComboServiceModeLabels[serviceMode]} / ${chainComboMealPeriodLabels[mealPeriod]}`;

  return suggestion.items.map((candidate) => {
    const label = candidate.portionLabel?.trim();
    const portionMultiplier = candidate.staplePortionMultipliers
      ? 1
      : Math.max(0, candidate.portionMultiplier);
    const nutritionScale = candidate.item.calories > 0
      ? candidate.nutrition.calories / candidate.item.calories
      : portionMultiplier;
    const notes = [
      contextNote,
      label ? `記録量: ${label}` : undefined,
    ].filter((note): note is string => Boolean(note));

    return {
      id: idFactory("food"),
      app_date: appDate,
      logged_at: timestamp,
      meal_type: mealType,
      name: formatChainComboLoggedName(candidate.item.name, label),
      brand: candidate.item.brand,
      calories: candidate.nutrition.calories,
      protein_g: candidate.nutrition.protein_g,
      fat_g: candidate.nutrition.fat_g,
      carbs_g: candidate.nutrition.carbs_g,
      salt_g: candidate.nutrition.salt_g,
      portion_multiplier: portionMultiplier,
      entry_source: candidate.item.data_source,
      confidence: candidate.item.confidence,
      nutrition_meta: scaleChainComboNutritionMeta(candidate.item.nutrition_meta, nutritionScale),
      menu_item_id: candidate.item.id,
      note: notes.join(" / "),
      created_at: timestamp,
      updated_at: timestamp,
    };
  });
}

function formatChainComboLoggedName(name: string, portionLabel?: string) {
  const label = portionLabel?.trim();
  if (!label || name.includes(label)) return name;
  return `${name}（${label}）`;
}

function scaleChainComboNutritionMeta(meta: NutritionMeta | undefined, multiplier: number): NutritionMeta | undefined {
  if (!meta || !Number.isFinite(multiplier) || multiplier === 1) return meta;
  const scale = Math.max(0, multiplier);
  const round1 = (value: number) => Math.round(value * 10) / 10;
  return {
    ...meta,
    uncertainty: meta.uncertainty && {
      calories: meta.uncertainty.calories === undefined ? undefined : Math.round(meta.uncertainty.calories * scale),
      protein_g: meta.uncertainty.protein_g === undefined ? undefined : round1(meta.uncertainty.protein_g * scale),
      fat_g: meta.uncertainty.fat_g === undefined ? undefined : round1(meta.uncertainty.fat_g * scale),
      carbs_g: meta.uncertainty.carbs_g === undefined ? undefined : round1(meta.uncertainty.carbs_g * scale),
    },
    nutrient_evidence: meta.nutrient_evidence && Object.fromEntries(Object.entries(meta.nutrient_evidence).map(([key, evidence]) => [key, evidence && {
      ...evidence,
      uncertainty: evidence.uncertainty && {
        minus: evidence.uncertainty.minus === undefined ? undefined : round1(evidence.uncertainty.minus * scale),
        plus: evidence.uncertainty.plus === undefined ? undefined : round1(evidence.uncertainty.plus * scale),
      },
    }])),
    quantity_meta: meta.quantity_meta && {
      ...meta.quantity_meta,
      estimated_amount: meta.quantity_meta.estimated_amount === undefined ? undefined : round1(meta.quantity_meta.estimated_amount * scale),
      uncertainty_amount: meta.quantity_meta.uncertainty_amount === undefined ? undefined : round1(meta.quantity_meta.uncertainty_amount * scale),
    },
    components: meta.components?.map((component) => ({
      ...component,
      calories: component.calories === undefined ? undefined : Math.round(component.calories * scale),
      protein_g: component.protein_g === undefined ? undefined : round1(component.protein_g * scale),
      fat_g: component.fat_g === undefined ? undefined : round1(component.fat_g * scale),
      carbs_g: component.carbs_g === undefined ? undefined : round1(component.carbs_g * scale),
    })),
    nutrition_candidate: meta.nutrition_candidate && {
      ...meta.nutrition_candidate,
      calories: Math.round(meta.nutrition_candidate.calories * scale),
      protein_g: round1(meta.nutrition_candidate.protein_g * scale),
      fat_g: round1(meta.nutrition_candidate.fat_g * scale),
      carbs_g: round1(meta.nutrition_candidate.carbs_g * scale),
      salt_g: meta.nutrition_candidate.salt_g === undefined ? undefined : round1(meta.nutrition_candidate.salt_g * scale),
    },
  };
}

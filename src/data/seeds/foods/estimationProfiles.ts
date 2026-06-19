import type { MealType } from "../../../types";
import { estimated } from "./helpers";

type MacroRatio = {
  protein: number;
  fat: number;
  carbs: number;
};

export type NutritionEstimateProfile =
  | "pepperRice"
  | "steakPlate"
  | "hamburgerPlate"
  | "curryRice"
  | "tsukemen"
  | "ramen"
  | "proteinTopping"
  | "gyoza"
  | "friedSide"
  | "burger"
  | "fries"
  | "bread"
  | "friedRice"
  | "riceBowl"
  | "sushiRiceBowl"
  | "sobaNoodle"
  | "pasta"
  | "creamPasta"
  | "oilPasta"
  | "pizza"
  | "thinPizza"
  | "salad"
  | "riceSetMeal"
  | "fishSetMeal"
  | "meatSetMeal"
  | "dessert"
  | "soup"
  | "onigiri"
  | "konamono"
  | "drink";

type ProfileDefinition = {
  label: string;
  ratio: MacroRatio;
  tolerancePct: number;
};

export const nutritionEstimateProfiles: Record<NutritionEstimateProfile, ProfileDefinition> = {
  pepperRice: { label: "鉄板ペッパーライス", ratio: { protein: 0.16, fat: 0.32, carbs: 0.52 }, tolerancePct: 8 },
  steakPlate: { label: "ステーキ単品/鉄板", ratio: { protein: 0.28, fat: 0.65, carbs: 0.07 }, tolerancePct: 10 },
  hamburgerPlate: { label: "ハンバーグ鉄板", ratio: { protein: 0.18, fat: 0.55, carbs: 0.27 }, tolerancePct: 10 },
  curryRice: { label: "カレーライス", ratio: { protein: 0.12, fat: 0.32, carbs: 0.56 }, tolerancePct: 8 },
  tsukemen: { label: "つけ麺", ratio: { protein: 0.14, fat: 0.2, carbs: 0.66 }, tolerancePct: 8 },
  ramen: { label: "ラーメン", ratio: { protein: 0.15, fat: 0.28, carbs: 0.57 }, tolerancePct: 8 },
  proteinTopping: { label: "肉/卵系トッピング", ratio: { protein: 0.3, fat: 0.6, carbs: 0.1 }, tolerancePct: 10 },
  gyoza: { label: "餃子", ratio: { protein: 0.14, fat: 0.42, carbs: 0.44 }, tolerancePct: 8 },
  friedSide: { label: "揚げ物サイド", ratio: { protein: 0.23, fat: 0.55, carbs: 0.22 }, tolerancePct: 10 },
  burger: { label: "バーガー", ratio: { protein: 0.18, fat: 0.42, carbs: 0.4 }, tolerancePct: 10 },
  fries: { label: "フライドポテト", ratio: { protein: 0.05, fat: 0.44, carbs: 0.51 }, tolerancePct: 10 },
  bread: { label: "パン/サンド", ratio: { protein: 0.14, fat: 0.34, carbs: 0.52 }, tolerancePct: 10 },
  friedRice: { label: "チャーハン", ratio: { protein: 0.1, fat: 0.3, carbs: 0.6 }, tolerancePct: 8 },
  riceBowl: { label: "丼/ごはんもの", ratio: { protein: 0.18, fat: 0.28, carbs: 0.54 }, tolerancePct: 10 },
  sushiRiceBowl: { label: "寿司/海鮮丼", ratio: { protein: 0.22, fat: 0.18, carbs: 0.6 }, tolerancePct: 10 },
  sobaNoodle: { label: "そば/和風麺", ratio: { protein: 0.14, fat: 0.12, carbs: 0.74 }, tolerancePct: 10 },
  pasta: { label: "パスタ", ratio: { protein: 0.14, fat: 0.3, carbs: 0.56 }, tolerancePct: 8 },
  creamPasta: { label: "クリームパスタ", ratio: { protein: 0.14, fat: 0.38, carbs: 0.48 }, tolerancePct: 8 },
  oilPasta: { label: "オイルパスタ", ratio: { protein: 0.13, fat: 0.35, carbs: 0.52 }, tolerancePct: 8 },
  pizza: { label: "ピザ", ratio: { protein: 0.17, fat: 0.36, carbs: 0.47 }, tolerancePct: 8 },
  thinPizza: { label: "薄焼きピザ", ratio: { protein: 0.17, fat: 0.38, carbs: 0.45 }, tolerancePct: 8 },
  salad: { label: "外食サラダ", ratio: { protein: 0.12, fat: 0.48, carbs: 0.4 }, tolerancePct: 10 },
  riceSetMeal: { label: "定食", ratio: { protein: 0.18, fat: 0.28, carbs: 0.54 }, tolerancePct: 10 },
  fishSetMeal: { label: "魚定食", ratio: { protein: 0.23, fat: 0.32, carbs: 0.45 }, tolerancePct: 10 },
  meatSetMeal: { label: "肉定食", ratio: { protein: 0.2, fat: 0.42, carbs: 0.38 }, tolerancePct: 10 },
  dessert: { label: "デザート", ratio: { protein: 0.08, fat: 0.3, carbs: 0.62 }, tolerancePct: 12 },
  soup: { label: "スープ", ratio: { protein: 0.18, fat: 0.28, carbs: 0.54 }, tolerancePct: 12 },
  onigiri: { label: "おむすび", ratio: { protein: 0.1, fat: 0.16, carbs: 0.74 }, tolerancePct: 10 },
  konamono: { label: "粉物", ratio: { protein: 0.16, fat: 0.36, carbs: 0.48 }, tolerancePct: 10 },
  drink: { label: "ドリンク", ratio: { protein: 0.08, fat: 0.18, carbs: 0.74 }, tolerancePct: 15 },
};

type ProfiledEstimateInput = {
  brand?: string;
  name: string;
  category: string;
  tags: string[];
  calories: number;
  salt_g?: number;
  serving_label?: string;
  default_meal_type?: MealType;
  source_url?: string;
  fetched_at?: string;
  profile: NutritionEstimateProfile;
};

type ManualProfiledEstimateInput = ProfiledEstimateInput & {
  protein_g: number;
  fat_g: number;
  carbs_g: number;
};

const roundMacro = (value: number) => Math.round(value * 10) / 10;

export const caloriesFromMacros = (protein_g: number, fat_g: number, carbs_g: number) =>
  protein_g * 4 + fat_g * 9 + carbs_g * 4;

export const estimateMacrosFromCalories = (calories: number, profile: NutritionEstimateProfile) => {
  const ratio = nutritionEstimateProfiles[profile].ratio;
  return {
    protein_g: roundMacro((calories * ratio.protein) / 4),
    fat_g: roundMacro((calories * ratio.fat) / 9),
    carbs_g: roundMacro((calories * ratio.carbs) / 4),
  };
};

export const macroCalorieDeltaPct = (calories: number, protein_g: number, fat_g: number, carbs_g: number) => {
  if (!Number.isFinite(calories) || calories <= 0) return 0;
  return Math.round(((caloriesFromMacros(protein_g, fat_g, carbs_g) - calories) / calories) * 1000) / 10;
};

export const estimateProfileTags = (profile: NutritionEstimateProfile, calories: number, macros: ReturnType<typeof estimateMacrosFromCalories>) => {
  const definition = nutritionEstimateProfiles[profile];
  const deltaPct = macroCalorieDeltaPct(calories, macros.protein_g, macros.fat_g, macros.carbs_g);
  return [`推定方式:${definition.label}`, `PFC比率推定`, `kcal整合:${deltaPct}%`];
};

export const manualEstimateProfileTags = (profile: NutritionEstimateProfile, calories: number, protein_g: number, fat_g: number, carbs_g: number) => {
  const definition = nutritionEstimateProfiles[profile];
  const deltaPct = macroCalorieDeltaPct(calories, protein_g, fat_g, carbs_g);
  return [`推定方式:${definition.label}`, `手動PFC推定`, `kcal整合:${deltaPct}%`];
};

export const isWithinProfileTolerance = (profile: NutritionEstimateProfile, calories: number, macros: ReturnType<typeof estimateMacrosFromCalories>) => {
  const deltaPct = Math.abs(macroCalorieDeltaPct(calories, macros.protein_g, macros.fat_g, macros.carbs_g));
  return deltaPct <= nutritionEstimateProfiles[profile].tolerancePct;
};

export const profiledEstimated = (input: ProfiledEstimateInput) => {
  const macros = estimateMacrosFromCalories(input.calories, input.profile);
  return estimated({
    brand: input.brand,
    name: input.name,
    category: input.category,
    tags: [...input.tags, ...estimateProfileTags(input.profile, input.calories, macros)],
    calories: input.calories,
    ...macros,
    salt_g: input.salt_g,
    serving_label: input.serving_label,
    default_meal_type: input.default_meal_type,
    source_url: input.source_url,
    fetched_at: input.fetched_at,
  });
};

export const estimatedWithProfileTags = (input: ManualProfiledEstimateInput) =>
  estimated({
    brand: input.brand,
    name: input.name,
    category: input.category,
    tags: [...input.tags, ...manualEstimateProfileTags(input.profile, input.calories, input.protein_g, input.fat_g, input.carbs_g)],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label,
    default_meal_type: input.default_meal_type,
    source_url: input.source_url,
    fetched_at: input.fetched_at,
  });

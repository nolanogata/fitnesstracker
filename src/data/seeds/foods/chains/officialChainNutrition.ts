import type { MealType } from "../../../../types";
import { official } from "../helpers";
import officialRows from "./officialChainNutritionData.json";
import marugameRows from "./marugameOfficialData.json";
import oliveNoOkaRows from "./oliveNoOkaOfficialData.json";
import tondenRows from "./tondenOfficialData.json";

type OfficialChainNutritionRow = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  tags: string[];
  source_url: string;
  fetched_at: string;
};

function inferMealType(row: OfficialChainNutritionRow): MealType {
  const text = `${row.name} ${row.tags.join(" ")}`;
  if (/モーニング|朝食|朝ごはん/.test(text)) return "breakfast";
  if (/デザート|スイーツ|ケーキ|パフェ|アイス|ドリンク|トッピング|サイド/.test(text)) return "snack";
  return "lunch";
}

export const officialChainNutritionFoods = ([...officialRows, ...marugameRows, ...oliveNoOkaRows, ...tondenRows] as OfficialChainNutritionRow[]).map((row) => official({
  brand: row.brand,
  name: row.name,
  category: "チェーン店",
  tags: [row.brand, "公式メニュー確認", ...row.tags],
  calories: row.calories,
  protein_g: row.protein_g,
  fat_g: row.fat_g,
  carbs_g: row.carbs_g,
  salt_g: row.salt_g,
  serving_label: row.serving_label,
  default_meal_type: inferMealType(row),
  source_url: row.source_url,
  fetched_at: row.fetched_at,
}));

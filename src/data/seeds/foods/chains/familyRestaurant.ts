import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const brands = ["サイゼリヤ", "ガスト", "デニーズ", "ジョイフル", "ロイヤルホスト"];
const items = [
  ["ハンバーグ", 620, 28, 34, 48],
  ["チキンステーキ", 580, 38, 32, 30],
  ["パスタ", 720, 24, 28, 95],
  ["ドリア", 650, 22, 26, 88],
  ["サラダ", 180, 7, 11, 14],
  ["スープ", 120, 5, 5, 14],
  ["デザート", 320, 6, 18, 34],
] as const;

const inferProfile = (name: string): NutritionEstimateProfile => {
  if (name.includes("ハンバーグ") || name.includes("チキン")) return "meatSetMeal";
  if (name.includes("パスタ")) return "pasta";
  if (name.includes("ドリア")) return "riceSetMeal";
  if (name.includes("サラダ")) return "salad";
  if (name.includes("スープ")) return "soup";
  if (name.includes("デザート")) return "dessert";
  return "riceSetMeal";
};

export const familyRestaurantFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimatedWithProfileTags({
      brand,
      name,
      category: "チェーン店",
      tags: ["ファミレス", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1品",
      profile: inferProfile(name),
    }),
  ),
);

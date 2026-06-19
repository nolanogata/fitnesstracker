import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const brands = ["やよい軒"];
const items = [
  ["焼き魚定食", 760, 36, 22, 102],
  ["さば定食", 820, 38, 32, 92],
  ["鮭定食", 740, 36, 20, 100],
  ["ほっけ定食", 780, 42, 18, 105],
  ["唐揚げ定食", 980, 42, 42, 110],
  ["チキン南蛮定食", 1050, 40, 48, 112],
  ["生姜焼き定食", 890, 36, 34, 108],
  ["ハンバーグ定食", 920, 38, 38, 112],
  ["肉野菜炒め定食", 820, 32, 28, 110],
  ["納豆朝食", 560, 24, 16, 82],
] as const;

const inferProfile = (name: string): NutritionEstimateProfile => {
  if (name.includes("魚") || name.includes("さば") || name.includes("鮭") || name.includes("ほっけ")) {
    return "fishSetMeal";
  }
  if (name.includes("唐揚げ") || name.includes("チキン") || name.includes("生姜焼き") || name.includes("ハンバーグ") || name.includes("肉")) {
    return "meatSetMeal";
  }
  return "riceSetMeal";
};

export const teishokuFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimatedWithProfileTags({
      brand,
      name,
      category: "チェーン店",
      tags: ["定食", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1食",
      profile: inferProfile(name),
    }),
  ),
);

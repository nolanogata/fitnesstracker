import { estimated } from "../helpers";

const brands = ["大戸屋", "やよい軒", "しんぱち食堂"];
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

export const teishokuFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["定食", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1食",
    }),
  ),
);

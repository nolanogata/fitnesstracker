import { estimated } from "../helpers";

const source = "https://shinpachi-shokudo.com/";
const fetchedAt = "2026-06-12T00:00:00.000Z";
const tags = ["定食", "しんぱち食堂", "魚定食", "公式メニュー確認", "栄養推定"];

const items = [
  ["3羽いわし定食", 650, 34, 20, 88],
  ["殿様いわし定食", 760, 42, 26, 90],
  ["ほっけ定食 半身", 730, 40, 18, 100],
  ["ほっけ定食 一尾", 930, 55, 26, 108],
  ["あじ開き定食", 690, 36, 20, 92],
  ["さんま塩焼定食", 760, 34, 30, 92],
  ["サーモンハラス干し定食", 870, 38, 42, 90],
  ["銀鮭塩焼き定食", 720, 36, 24, 94],
  ["厚切り銀鮭塩焼き定食", 830, 45, 29, 96],
  ["さば文化干し定食", 820, 39, 34, 92],
  ["さばみりん干し定食", 850, 40, 35, 96],
  ["さば味噌煮定食", 870, 38, 31, 108],
  ["本さわら西京漬け定食", 760, 37, 23, 100],
  ["あかうお干物定食", 710, 39, 18, 100],
] as const;

export const shinpachiMenuFoods = items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
  estimated({
    brand: "しんぱち食堂",
    name,
    category: "チェーン店",
    tags,
    calories,
    protein_g,
    fat_g,
    carbs_g,
    serving_label: "1食",
    default_meal_type: "lunch",
    source_url: source,
    fetched_at: fetchedAt,
  }),
);

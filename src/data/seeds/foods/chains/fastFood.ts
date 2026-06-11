import { estimated } from "../helpers";

const brands = ["マクドナルド", "モスバーガー", "ケンタッキー", "バーガーキング", "サブウェイ"];
const brandAliases: Record<string, string[]> = {
  ケンタッキー: ["KFC", "ケンタ", "Kentucky Fried Chicken"],
  マクドナルド: ["マック", "マクド", "McDonald's"],
};
const items = [
  ["代表バーガー", 430, 18, 20, 45],
  ["ポテト", 410, 5, 20, 52],
  ["ナゲット", 280, 15, 18, 15],
  ["チキン", 260, 20, 17, 8],
  ["サイドサラダ", 35, 2, 1, 6],
  ["カフェラテ", 140, 7, 7, 12],
  ["セット普通 estimate", 920, 30, 40, 110],
] as const;

export const fastFoodFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["ファストフード", brand, ...(brandAliases[brand] ?? [])],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1食",
    }),
  ),
);

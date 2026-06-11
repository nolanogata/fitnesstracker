import { estimated } from "../helpers";

const brands = ["スターバックス", "ドトール", "タリーズ", "コメダ珈琲"];
const items = [
  ["ドリップコーヒー", 15, 1, 0, 2],
  ["カフェラテ", 180, 9, 9, 15],
  ["サンドイッチ", 420, 18, 18, 48],
  ["トースト", 360, 10, 14, 50],
  ["ケーキ", 390, 6, 22, 42],
  ["軽食セット", 620, 22, 28, 70],
] as const;

export const cafeFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["カフェ", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1品",
    }),
  ),
);

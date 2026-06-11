import { estimated } from "../helpers";

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

export const familyRestaurantFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["ファミレス", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1品",
    }),
  ),
);

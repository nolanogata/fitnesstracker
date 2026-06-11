import { estimated } from "../helpers";

const brands = ["丸亀製麺", "はなまるうどん", "ウエスト", "資さんうどん"];
const brandAliases: Record<string, string[]> = {
  ウエスト: ["ウェスト", "WEST"],
  資さんうどん: ["資さん", "すけさん"],
};
const items = [
  ["かけうどん", 330, 10, 2, 68],
  ["釜揚げうどん", 340, 10, 2, 70],
  ["ぶっかけうどん", 360, 11, 2, 73],
  ["ざるうどん", 350, 10, 2, 72],
  ["肉うどん", 610, 22, 18, 87],
  ["きつねうどん", 520, 17, 12, 86],
  ["カレーうどん", 620, 18, 16, 100],
  ["かしわ天", 170, 11, 9, 11],
  ["ちくわ天", 150, 5, 7, 18],
  ["えび天", 120, 6, 6, 11],
  ["いなり", 120, 3, 3, 22],
  ["おにぎり", 180, 4, 2, 37],
  ["うどん + 丼セット", 900, 28, 25, 135],
] as const;

export const udonFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["うどん・そば", brand, "麺類", ...(brandAliases[brand] ?? [])],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1食",
    }),
  ),
);

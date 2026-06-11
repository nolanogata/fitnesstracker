import { estimated } from "../helpers";

const brands = ["松屋", "すき家", "吉野家", "なか卯"];
const common = [
  ["牛丼/牛めし 並", 720, 23, 25, 98],
  ["牛丼/牛めし 大盛", 950, 30, 32, 132],
  ["チーズ牛丼", 910, 34, 42, 100],
  ["カレー", 780, 20, 25, 120],
  ["味噌汁", 45, 3, 1, 6],
  ["サラダ", 85, 2, 4, 10],
  ["卵", 80, 7, 6, 0],
  ["豚汁", 190, 8, 11, 15],
] as const;

export const gyudonFoods = brands.flatMap((brand) =>
  common.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "チェーン店",
      tags: ["牛丼・丼", brand, name],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1食",
      default_meal_type: "lunch",
    }),
  ),
).concat([
  estimated({ brand: "なか卯", name: "親子丼", category: "チェーン店", tags: ["牛丼・丼", "丼"], calories: 690, protein_g: 30, fat_g: 18, carbs_g: 100, serving_label: "並" }),
  estimated({ brand: "なか卯", name: "カツ丼", category: "チェーン店", tags: ["牛丼・丼", "丼"], calories: 900, protein_g: 32, fat_g: 35, carbs_g: 112, serving_label: "並" }),
]);

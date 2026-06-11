import { estimated } from "../helpers";

const brands = ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"];
const items = [
  ["おにぎり 鮭", 190, 5, 3, 36],
  ["おにぎり 梅", 170, 4, 1, 36],
  ["おにぎり ツナマヨ", 230, 5, 8, 36],
  ["サラダチキン", 120, 24, 2, 2],
  ["ゆで卵", 75, 6, 5, 0],
  ["サンドイッチ", 330, 13, 15, 36],
  ["コンビニ弁当 普通", 720, 25, 22, 105],
  ["コンビニ弁当 重め", 980, 32, 38, 125],
  ["カップ麺", 420, 10, 17, 58],
  ["カップ焼きそば", 720, 14, 32, 94],
  ["ヨーグルト", 120, 6, 3, 18],
  ["バナナ", 90, 1, 0, 23],
  ["プロテインバー", 200, 15, 8, 18],
  ["プロテインドリンク", 140, 20, 2, 10],
  ["スイーツ 普通", 340, 5, 18, 40],
] as const;

export const convenienceFoods = brands.flatMap((brand) =>
  items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
    estimated({
      brand,
      name,
      category: "コンビニ",
      tags: ["コンビニ", brand],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      serving_label: "1品",
    }),
  ),
);

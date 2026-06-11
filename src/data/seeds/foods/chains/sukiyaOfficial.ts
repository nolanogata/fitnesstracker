import { official } from "../helpers";

const sourceUrl = "https://images.zensho.co.jp/materials/sukiya/allergen/nutrition.pdf";
const fetchedAt = "2026-06-12T00:00:00.000Z";

type NutritionRow = readonly [
  serving_label: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
];

const sukiya = (name: string, rows: readonly NutritionRow[], tags: string[] = []) =>
  rows.map(([serving_label, calories, protein_g, fat_g, carbs_g, salt_g]) =>
    official({
      brand: "すき家",
      name,
      category: "チェーン店",
      tags: ["牛丼・丼", "すき家", "公式", name, serving_label, ...tags],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      salt_g,
      serving_label,
      default_meal_type: "lunch",
      source_url: sourceUrl,
      fetched_at: fetchedAt,
    }),
  );

const sizes = ["ミニ", "並盛", "中盛", "大盛", "特盛", "メガ"] as const;
const rows = (values: readonly (readonly [number, number, number, number, number])[]): NutritionRow[] =>
  values.map((value, index) => [sizes[index], ...value]);

export const sukiyaOfficialFoods = [
  ...sukiya("牛丼", rows([
    [464, 14.8, 16.0, 65.7, 1.7],
    [695, 21.7, 23.4, 99.8, 2.4],
    [752, 26.6, 33.4, 86.5, 2.8],
    [908, 28.4, 30.7, 130.1, 3.1],
    [1100, 37.8, 45.6, 134.9, 4.2],
    [1365, 50.8, 66.3, 141.6, 5.6],
  ])),
  ...sukiya("おろしポン酢牛丼", rows([
    [488, 15.8, 16.1, 69.8, 2.8],
    [719, 22.7, 23.5, 103.9, 3.5],
    [776, 27.6, 33.5, 90.6, 3.9],
    [932, 29.4, 30.8, 134.2, 4.2],
    [1124, 38.8, 45.7, 139.0, 5.3],
    [1389, 51.8, 66.4, 145.7, 6.8],
  ]), ["おろし", "ポン酢"]),
  ...sukiya("ねぎ玉牛丼", rows([
    [571, 22.5, 22.5, 70.7, 2.5],
    [802, 29.4, 29.9, 104.8, 3.2],
    [864, 34.3, 39.9, 91.5, 3.6],
    [1015, 36.1, 37.2, 135.1, 3.9],
    [1207, 45.5, 52.1, 139.9, 5.0],
    [1472, 58.5, 72.8, 146.6, 6.5],
  ]), ["ねぎ", "卵"]),
  ...sukiya("とろ～り3種のチーズ牛丼", rows([
    [640, 26.0, 29.3, 68.7, 2.7],
    [871, 32.9, 36.7, 102.8, 3.5],
    [928, 37.8, 46.7, 89.5, 3.8],
    [1084, 39.6, 44.0, 133.1, 4.2],
    [1276, 49.0, 58.9, 137.9, 5.3],
    [1541, 62.0, 79.6, 144.6, 6.7],
  ]), ["チーズ"]),
  ...sukiya("わさび山かけ牛丼", rows([
    [517, 16.3, 16.1, 77.0, 1.9],
    [748, 23.2, 23.5, 111.1, 2.6],
    [804, 28.1, 33.5, 97.9, 3.0],
    [961, 29.9, 30.8, 141.4, 3.3],
    [1153, 39.3, 45.7, 146.2, 4.4],
    [1418, 52.3, 66.4, 152.9, 5.9],
  ]), ["わさび", "山かけ"]),
  ...sukiya("かつぶしオクラ牛丼", rows([
    [485, 16.6, 16.1, 69.4, 2.6],
    [716, 23.5, 23.5, 103.5, 3.3],
    [773, 28.4, 33.5, 90.2, 3.7],
    [929, 30.2, 30.8, 133.8, 4.0],
    [1121, 39.6, 45.7, 138.6, 5.1],
    [1386, 52.6, 66.4, 145.3, 6.6],
  ]), ["オクラ", "かつぶし"]),
  ...sukiya("高菜明太マヨ牛丼", rows([
    [564, 16.4, 24.1, 70.0, 4.1],
    [795, 23.3, 31.5, 104.1, 4.9],
    [852, 28.2, 41.5, 90.8, 5.3],
    [1008, 30.0, 38.8, 134.4, 5.6],
    [1200, 39.4, 53.7, 139.2, 6.7],
    [1465, 52.4, 74.4, 145.9, 8.1],
  ]), ["高菜", "明太", "マヨ"]),
];

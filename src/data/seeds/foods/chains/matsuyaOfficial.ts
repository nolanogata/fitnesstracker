import { official } from "../helpers";

const fetchedAt = "2026-06-09T00:00:00.000Z";

const matsuya = (
  name: string,
  serving_label: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
  source_url: string,
) =>
  official({
    brand: "松屋",
    name,
    category: "チェーン店",
    tags: ["牛丼・丼", "松屋", "公式", name, serving_label],
    calories,
    protein_g,
    fat_g,
    carbs_g,
    salt_g,
    serving_label,
    default_meal_type: "lunch",
    source_url,
    fetched_at: fetchedAt,
  });

const gyumeshiSource = "https://www.matsuyafoods.co.jp/matsuya/menu/gyumeshi/gyumeshi_hp_250422.html";
const cheeseSource = "https://www.matsuyafoods.co.jp/matsuya/menu/gyumeshi/gyu_cheese_hp_250422.html";

export const matsuyaOfficialFoods = [
  matsuya("牛めし", "小盛", 507, 13.1, 22.8, 59.6, 2.6, gyumeshiSource),
  matsuya("牛めし", "並盛", 687, 17.1, 28.9, 85.5, 3.0, gyumeshiSource),
  matsuya("牛めし", "あたま大盛", 765, 19.8, 35.6, 87.2, 3.5, gyumeshiSource),
  matsuya("牛めし", "大盛", 933, 22.3, 35.9, 124.3, 3.5, gyumeshiSource),
  matsuya("牛めし", "特盛", 1237, 31.0, 56.3, 145.1, 4.5, gyumeshiSource),
  matsuya("チーズ牛めし", "小盛", 667, 21.3, 36.1, 61.2, 3.5, cheeseSource),
  matsuya("チーズ牛めし", "並盛", 846, 25.3, 42.3, 87.1, 3.9, cheeseSource),
  matsuya("チーズ牛めし", "あたま大盛", 924, 28.0, 49.0, 88.8, 4.4, cheeseSource),
  matsuya("チーズ牛めし", "大盛", 1092, 30.5, 49.3, 125.9, 4.4, cheeseSource),
  matsuya("チーズ牛めし", "特盛", 1397, 39.2, 69.7, 146.7, 5.4, cheeseSource),
];

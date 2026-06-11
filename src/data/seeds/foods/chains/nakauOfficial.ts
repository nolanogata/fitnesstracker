import { official } from "../helpers";

const sourceUrl = "https://images.zensho.co.jp/materials/nakau/allergen/nutrition.pdf";
const fetchedAt = "2026-06-10T00:00:00.000Z";

const nakau = (
  name: string,
  serving_label: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
  tags: string[] = [],
) =>
  official({
    brand: "なか卯",
    name,
    category: "チェーン店",
    tags: ["牛丼・丼", "うどん・そば", "なか卯", "公式", ...tags],
    calories,
    protein_g,
    fat_g,
    carbs_g,
    salt_g,
    serving_label,
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const nakauOfficialFoods = [
  nakau("親子丼", "小盛", 535, 28.6, 17.3, 64.8, 2.2, ["親子丼"]),
  nakau("親子丼", "並盛", 673, 31.5, 17.8, 99.7, 3.1, ["親子丼"]),
  nakau("親子丼", "大盛", 812, 33.5, 18.2, 127.1, 3.1, ["親子丼"]),
  nakau("とろたま親子丼", "並盛", 754, 38.2, 23.3, 99.9, 3.3, ["親子丼"]),
  nakau("チーズ親子丼", "並盛", 795, 39.7, 27.4, 100.7, 3.7, ["親子丼", "チーズ"]),
  nakau("牛すき丼", "並盛", 630, 15.7, 17.2, 105.7, 2.9, ["牛すき丼"]),
  nakau("牛すき丼", "大盛", 769, 17.7, 17.6, 133.0, 2.9, ["牛すき丼"]),
  nakau("牛すき丼", "特盛", 990, 25.9, 33.4, 142.7, 4.7, ["牛すき丼"]),
  nakau("カツ丼", "並盛", 991, 32.8, 40.9, 123.8, 3.7, ["カツ丼"]),
  nakau("鶏から丼", "並盛", 971, 32.8, 36.2, 130.1, 4.0, ["鶏から丼", "唐揚げ"]),
  nakau("はいからうどん", "並", 321, 7.1, 6.4, 58.6, 4.6, ["うどん"]),
  nakau("月見うどん", "並", 402, 13.7, 11.9, 58.8, 4.8, ["うどん"]),
  nakau("きつねうどん", "並", 482, 17.9, 17.2, 63.6, 5.6, ["うどん"]),
  nakau("和風カレーうどん", "並", 476, 11.2, 17.6, 68.0, 4.2, ["うどん", "カレー"]),
  nakau("ざるうどん", "並", 248, 7.2, 0.8, 50.8, 4.4, ["うどん"]),
];

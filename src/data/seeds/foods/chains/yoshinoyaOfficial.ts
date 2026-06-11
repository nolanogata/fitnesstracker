import { official } from "../helpers";

const sourceUrl = "https://www.yoshinoya.com/pdf/allergy/";
const fetchedAt = "2026-06-04T00:00:00.000Z";

const gyudon = (
  serving_label: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
) =>
  official({
    brand: "吉野家",
    name: "牛丼",
    category: "チェーン店",
    tags: ["牛丼・丼", "吉野家", "公式", "牛丼", serving_label],
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

export const yoshinoyaOfficialFoods = [
  gyudon("小盛", 474, 15.4, 19.6, 60.9, 1.9),
  gyudon("並盛", 633, 19.6, 23.6, 88.2, 2.5),
  gyudon("アタマの大盛", 725, 23.0, 28.8, 96.6, 2.8),
  gyudon("大盛", 823, 24.8, 29.0, 119.5, 3.1),
  gyudon("特盛", 1006, 33.5, 44.2, 122.3, 4.0),
  gyudon("超特盛", 1159, 40.8, 56.9, 124.6, 4.7),
];

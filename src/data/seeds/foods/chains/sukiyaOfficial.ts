import { official } from "../helpers.ts";
import { sukiyaOfficialData } from "./sukiyaOfficialData.ts";

const sourceUrl = "https://images.zensho.co.jp/materials/sukiya/allergen/nutrition.pdf";
const fetchedAt = "2026-07-15T00:00:00.000Z";

function inferSukiyaTags(name: string) {
  if (/朝食/.test(name)) return ["朝食"];
  if (/定食/.test(name)) return ["定食"];
  if (/カレー|カレールー/.test(name)) return ["カレー"];
  if (/サラダ/.test(name)) return ["サラダ"];
  if (/牛丼ライト/.test(name)) return ["牛丼ライト", "低糖質"];
  if (/牛丼|牛皿|カルビ|うな|まぐろ|とりそぼろ|丼/.test(name)) return ["牛丼・丼"];
  if (/シェイク|ぷりん|ショコラ|カットりんご/.test(name)) return ["スイーツ"];
  if (/ジュース|コーラ|ファンタ|カルピス|茶|コーヒー|レモネード|ビール/.test(name)) return ["ドリンク"];
  if (/セット/.test(name)) return ["セット", "サイド"];
  return ["サイド"];
}

function inferSukiyaMealType(name: string, page: number) {
  if (/朝食/.test(name)) return "breakfast" as const;
  if (page === 9 || /シェイク|ぷりん|ショコラ|カットりんご|ジュース|コーラ|ファンタ|カルピス|茶|コーヒー|レモネード/.test(name)) {
    return "snack" as const;
  }
  return "lunch" as const;
}

export const sukiyaOfficialFoods = sukiyaOfficialData.map((row) => official({
  brand: "すき家",
  name: row.name,
  category: "チェーン店",
  tags: ["すき家", "公式", ...inferSukiyaTags(row.name), row.name, row.serving_label],
  calories: row.calories,
  protein_g: row.protein_g,
  fat_g: row.fat_g,
  carbs_g: row.carbs_g,
  salt_g: row.salt_g,
  serving_label: row.serving_label,
  default_meal_type: inferSukiyaMealType(row.name, row.page),
  source_url: sourceUrl,
  fetched_at: fetchedAt,
}));

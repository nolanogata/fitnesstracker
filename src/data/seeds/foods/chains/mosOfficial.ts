import { official } from "../helpers";

const sourceUrl = "https://www.mos.jp/menu/pdf/nutrition.pdf";
const fetchedAt = "2026-06-12T00:00:00.000Z";

const baseTags = ["ファストフード", "モスバーガー", "MOS", "公式栄養"];

type MosProduct = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  weight_g: number;
  default_meal_type: "lunch" | "snack";
  tag: string;
};

const products = [
  {"name": "とびきりチーズ～北海道チーズ～","calories": 478,"protein_g": 21.9,"fat_g": 24.7,"carbs_g": 42.2,"salt_g": 3.0,"serving_label": "1品（223.9g）","weight_g": 223.9,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルとびきりチーズ ～北海道チーズ～","calories": 706,"protein_g": 35.6,"fat_g": 40.2,"carbs_g": 50.4,"salt_g": 4.3,"serving_label": "1品（307.9g）","weight_g": 307.9,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "アボカド海老カツバーガー ～国産バジルマヨ～","calories": 457,"protein_g": 14.4,"fat_g": 24.9,"carbs_g": 45.6,"salt_g": 2.0,"serving_label": "1品（205.8g）","weight_g": 205.8,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "モスの匠味 海老エビフライバーガー ～くし切りレモン添え～","calories": 473,"protein_g": 17.1,"fat_g": 24.5,"carbs_g": 46.9,"salt_g": 3.0,"serving_label": "1品（196.2g）","weight_g": 196.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "モスバーガー","calories": 372,"protein_g": 15.2,"fat_g": 17.0,"carbs_g": 40.0,"salt_g": 2.3,"serving_label": "1品（211.2g）","weight_g": 211.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "テリヤキバーガー","calories": 385,"protein_g": 14.3,"fat_g": 18.2,"carbs_g": 41.2,"salt_g": 2.6,"serving_label": "1品（170.2g）","weight_g": 170.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "テリヤキチキンバーガー","calories": 303,"protein_g": 20.1,"fat_g": 10.3,"carbs_g": 32.4,"salt_g": 2.2,"serving_label": "1品（148.9g）","weight_g": 148.9,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "モスチーズバーガー","calories": 425,"protein_g": 18.2,"fat_g": 21.4,"carbs_g": 40.4,"salt_g": 2.8,"serving_label": "1品（226.2g）","weight_g": 226.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "モス野菜バーガー","calories": 363,"protein_g": 14.1,"fat_g": 18.6,"carbs_g": 35.4,"salt_g": 1.8,"serving_label": "1品（192.2g）","weight_g": 192.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "海老カツバーガー","calories": 397,"protein_g": 14.5,"fat_g": 19.3,"carbs_g": 42.2,"salt_g": 2.1,"serving_label": "1品（160.8g）","weight_g": 160.8,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ロースカツバーガー","calories": 410,"protein_g": 16.6,"fat_g": 16.3,"carbs_g": 49.7,"salt_g": 2.3,"serving_label": "1品（174.4g）","weight_g": 174.4,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "フィッシュバーガー","calories": 381,"protein_g": 16.2,"fat_g": 18.8,"carbs_g": 37.0,"salt_g": 1.9,"serving_label": "1品（143.9g）","weight_g": 143.9,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "チキンバーガー","calories": 386,"protein_g": 15.0,"fat_g": 18.5,"carbs_g": 40.0,"salt_g": 1.5,"serving_label": "1品（151.9g）","weight_g": 151.9,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "ハンバーガー","calories": 314,"protein_g": 13.7,"fat_g": 13.2,"carbs_g": 35.2,"salt_g": 1.8,"serving_label": "1品（128.7g）","weight_g": 128.7,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "チーズバーガー","calories": 367,"protein_g": 16.7,"fat_g": 17.6,"carbs_g": 35.6,"salt_g": 2.3,"serving_label": "1品（143.7g）","weight_g": 143.7,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルモスバーガー","calories": 532,"protein_g": 23.7,"fat_g": 28.4,"carbs_g": 45.7,"salt_g": 3.4,"serving_label": "1品（276.5g）","weight_g": 276.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルモスチーズバーガー","calories": 585,"protein_g": 26.7,"fat_g": 32.8,"carbs_g": 46.1,"salt_g": 3.9,"serving_label": "1品（291.5g）","weight_g": 291.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルテリヤキバーガー","calories": 560,"protein_g": 22.8,"fat_g": 29.3,"carbs_g": 51.4,"salt_g": 4.0,"serving_label": "1品（237.5g）","weight_g": 237.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルモス野菜バーガー","calories": 511,"protein_g": 22.2,"fat_g": 29.5,"carbs_g": 39.7,"salt_g": 2.7,"serving_label": "1品（247.5g）","weight_g": 247.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルハンバーガー","calories": 462,"protein_g": 21.8,"fat_g": 24.1,"carbs_g": 39.5,"salt_g": 2.7,"serving_label": "1品（184g）","weight_g": 184,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ダブルチーズバーガー","calories": 515,"protein_g": 24.8,"fat_g": 28.5,"carbs_g": 39.9,"salt_g": 3.2,"serving_label": "1品（199g）","weight_g": 199,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "スパイシーモスバーガー","calories": 375,"protein_g": 15.3,"fat_g": 17.1,"carbs_g": 40.4,"salt_g": 2.5,"serving_label": "1品（219.2g）","weight_g": 219.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "スパイシーモスチーズバーガー","calories": 428,"protein_g": 18.3,"fat_g": 21.5,"carbs_g": 40.8,"salt_g": 3.0,"serving_label": "1品（234.2g）","weight_g": 234.2,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "スパイシーダブルモスバーガー","calories": 535,"protein_g": 23.8,"fat_g": 28.5,"carbs_g": 46.1,"salt_g": 3.6,"serving_label": "1品（284.5g）","weight_g": 284.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "スパイシーダブルモスチーズバーガー","calories": 588,"protein_g": 26.8,"fat_g": 32.9,"carbs_g": 46.5,"salt_g": 4.1,"serving_label": "1品（299.5g）","weight_g": 299.5,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "米粉入りバンズのアボカドバジルバーガー","calories": 401,"protein_g": 11.0,"fat_g": 21.2,"carbs_g": 43.4,"salt_g": 2.5,"serving_label": "1品（195.9g）","weight_g": 195.9,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "米粉入りバンズのアボカドバジルバーガー（ソース含まず）","calories": 326,"protein_g": 10.8,"fat_g": 14.7,"carbs_g": 39.7,"salt_g": 1.7,"serving_label": "1品（177.9g）","weight_g": 177.9,"default_meal_type": "snack","tag": "ソース"},
  {"name": "プラントベースタルタルソース（国産バジル）","calories": 75,"protein_g": 0.2,"fat_g": 6.5,"carbs_g": 3.7,"salt_g": 0.8,"serving_label": "1品（18g）","weight_g": 18,"default_meal_type": "snack","tag": "ソース"},
  {"name": "あとがけソース（プラントベースタルタルソース（国産バジル））","calories": 75,"protein_g": 0.2,"fat_g": 6.5,"carbs_g": 3.7,"salt_g": 0.8,"serving_label": "1品（18g）","weight_g": 18,"default_meal_type": "snack","tag": "ソース"},
  {"name": "モスの菜摘モス野菜","calories": 223,"protein_g": 9.1,"fat_g": 16.5,"carbs_g": 10.4,"salt_g": 1.3,"serving_label": "1品（190.3g）","weight_g": 190.3,"default_meal_type": "lunch","tag": "菜摘"},
  {"name": "モスの菜摘テリヤキチキン","calories": 186,"protein_g": 15.1,"fat_g": 10.7,"carbs_g": 7.7,"salt_g": 1.9,"serving_label": "1品（140g）","weight_g": 140,"default_meal_type": "snack","tag": "菜摘"},
  {"name": "モスの菜摘フィッシュ","calories": 238,"protein_g": 11.1,"fat_g": 16.5,"carbs_g": 11.5,"salt_g": 1.3,"serving_label": "1品（130.5g）","weight_g": 130.5,"default_meal_type": "lunch","tag": "菜摘"},
  {"name": "モスの菜摘海老カツ","calories": 254,"protein_g": 9.4,"fat_g": 17.0,"carbs_g": 16.7,"salt_g": 1.5,"serving_label": "1品（147.4g）","weight_g": 147.4,"default_meal_type": "lunch","tag": "菜摘"},
  {"name": "モスの菜摘ロースカツ","calories": 265,"protein_g": 11.3,"fat_g": 14.0,"carbs_g": 23.6,"salt_g": 1.7,"serving_label": "1品（151g）","weight_g": 151,"default_meal_type": "lunch","tag": "菜摘"},
  {"name": "モスの菜摘チキン","calories": 243,"protein_g": 9.9,"fat_g": 16.3,"carbs_g": 14.6,"salt_g": 1.0,"serving_label": "1品（139g）","weight_g": 139,"default_meal_type": "snack","tag": "菜摘"},
  {"name": "モスの菜摘ソイモス野菜","calories": 217,"protein_g": 7.0,"fat_g": 13.3,"carbs_g": 18.4,"salt_g": 1.6,"serving_label": "1品（195.9g）","weight_g": 195.9,"default_meal_type": "lunch","tag": "菜摘"},
  {"name": "ソイモスバーガー","calories": 366,"protein_g": 13.1,"fat_g": 13.8,"carbs_g": 48.0,"salt_g": 2.6,"serving_label": "1品（216.8g）","weight_g": 216.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイスパイシーモスバーガー","calories": 369,"protein_g": 13.2,"fat_g": 13.9,"carbs_g": 48.4,"salt_g": 2.8,"serving_label": "1品（224.8g）","weight_g": 224.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイモスチーズバーガー","calories": 419,"protein_g": 16.1,"fat_g": 18.2,"carbs_g": 48.4,"salt_g": 3.1,"serving_label": "1品（231.8g）","weight_g": 231.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイスパイシーモスチーズバーガー","calories": 422,"protein_g": 16.2,"fat_g": 18.3,"carbs_g": 48.8,"salt_g": 3.3,"serving_label": "1品（239.8g）","weight_g": 239.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイテリヤキバーガー","calories": 379,"protein_g": 12.2,"fat_g": 15.0,"carbs_g": 49.2,"salt_g": 2.9,"serving_label": "1品（175.8g）","weight_g": 175.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイモス野菜バーガー","calories": 357,"protein_g": 12.0,"fat_g": 15.4,"carbs_g": 43.4,"salt_g": 2.1,"serving_label": "1品（197.8g）","weight_g": 197.8,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイハンバーガー","calories": 308,"protein_g": 11.6,"fat_g": 10.0,"carbs_g": 43.2,"salt_g": 2.1,"serving_label": "1品（134.3g）","weight_g": 134.3,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "ソイチーズバーガー","calories": 361,"protein_g": 14.6,"fat_g": 14.4,"carbs_g": 43.6,"salt_g": 2.6,"serving_label": "1品（149.3g）","weight_g": 149.3,"default_meal_type": "lunch","tag": "ソイ"},
  {"name": "モスライスバーガー海鮮かきあげ （塩だれ）","calories": 372,"protein_g": 8.5,"fat_g": 10.5,"carbs_g": 61.3,"salt_g": 1.9,"serving_label": "1品（183g）","weight_g": 183,"default_meal_type": "lunch","tag": "ライスバーガー"},
  {"name": "モスライスバーガー焼肉","calories": 353,"protein_g": 9.5,"fat_g": 11.6,"carbs_g": 52.8,"salt_g": 1.1,"serving_label": "1品（170g）","weight_g": 170,"default_meal_type": "lunch","tag": "ライスバーガー"},
  {"name": "ホットドッグ","calories": 358,"protein_g": 11.6,"fat_g": 23.4,"carbs_g": 25.4,"salt_g": 2.1,"serving_label": "1品（125.3g）","weight_g": 125.3,"default_meal_type": "lunch","tag": "ホットドッグ"},
  {"name": "チリドッグ","calories": 373,"protein_g": 13.0,"fat_g": 24.0,"carbs_g": 26.5,"salt_g": 2.6,"serving_label": "1品（134.3g）","weight_g": 134.3,"default_meal_type": "lunch","tag": "ホットドッグ"},
  {"name": "スパイシーチリドッグ","calories": 374,"protein_g": 13.1,"fat_g": 24.0,"carbs_g": 26.6,"salt_g": 2.7,"serving_label": "1品（138.3g）","weight_g": 138.3,"default_meal_type": "lunch","tag": "ホットドッグ"},
] satisfies MosProduct[];

export const mosOfficialFoods = products.map((product) =>
  official({
    brand: "モスバーガー",
    name: product.name,
    category: "チェーン店",
    tags: [...baseTags, product.tag],
    calories: product.calories,
    protein_g: product.protein_g,
    fat_g: product.fat_g,
    carbs_g: product.carbs_g,
    salt_g: product.salt_g,
    serving_label: product.serving_label,
    weight_g: product.weight_g,
    default_meal_type: product.default_meal_type,
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  }),
);

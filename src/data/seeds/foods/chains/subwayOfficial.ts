import { official } from "../helpers";

const source = "https://www.subway.co.jp/menu/pdf/eiyo.pdf";
const fetchedAt = "2026-06-10T00:00:00.000Z";

const sandwichTags = ["ファストフード", "サブウェイ", "SUBWAY", "公式", "サンドイッチ"];

const sandwiches = [
  ["ツナ", 350, 14.6, 15.7, 38.9, 1.9],
  ["生ハム＆マスカルポーネ", 326, 15.5, 11.2, 42.3, 2.5],
  ["えびアボカド", 319, 11.9, 12.2, 41.1, 1.7],
  ["BLT", 335, 11.3, 14.2, 41.9, 1.9],
  ["ローストビーフ", 263, 15.4, 5.0, 40.9, 1.9],
  ["てり焼きチキン", 346, 19.7, 9.9, 45.5, 2.7],
  ["たまご", 318, 11.7, 13.0, 39.6, 2.5],
  ["アボカドベジー", 295, 8.4, 9.8, 44.8, 1.6],
  ["ベジーデライト", 215, 7.2, 4.4, 38.0, 1.5],
  ["チリチキン", 273, 20.5, 4.1, 39.7, 2.6],
  ["チーズサラダチキン", 331, 22.7, 8.8, 41.8, 2.3],
  ["贅沢てりたまチキン", 449, 24.1, 19.5, 45.5, 3.2],
  ["スパイシークラブハウス", 396, 25.4, 12.6, 46.6, 3.5],
  ["アボカドチキン", 373, 21.7, 12.6, 44.3, 2.3],
] as const;

const sides = [
  ["コロコロポテト オリジナル S", 158, 2.3, 5.9, 23.7, 0.6],
  ["コロコロポテト オリジナル M", 280, 4.2, 10.6, 42.1, 1.1],
  ["コロコロポテト ハーブソルト S", 161, 2.4, 6.0, 24.4, 1.2],
  ["コロコロポテト ハーブソルト M", 287, 4.4, 10.6, 43.4, 2.3],
  ["コロコロポテト トリプルチーズ S", 164, 2.6, 6.3, 24.2, 0.9],
  ["コロコロポテト トリプルチーズ M", 293, 4.8, 11.2, 43.1, 1.6],
] as const;

export const subwayOfficialFoods = [
  ...sandwiches.map(([name, calories, protein_g, fat_g, carbs_g, salt_g]) =>
    official({
      brand: "サブウェイ",
      name,
      category: "チェーン店",
      tags: sandwichTags,
      calories,
      protein_g,
      fat_g,
      carbs_g,
      salt_g,
      serving_label: "レギュラー 1個",
      default_meal_type: "lunch",
      source_url: source,
      fetched_at: fetchedAt,
    }),
  ),
  ...sides.map(([name, calories, protein_g, fat_g, carbs_g, salt_g]) =>
    official({
      brand: "サブウェイ",
      name,
      category: "チェーン店",
      tags: ["ファストフード", "サブウェイ", "SUBWAY", "公式", "ポテト", "サイド"],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      salt_g,
      serving_label: "1個",
      default_meal_type: "snack",
      source_url: source,
      fetched_at: fetchedAt,
    }),
  ),
];

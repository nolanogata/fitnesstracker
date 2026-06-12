import { official } from "../helpers";

const sourceUrl =
  "https://www.burgerking.co.jp/images/org/pdf/2026/01/08/af889feb-3500-412c-abee-a7ce17e65986.pdf";
const fetchedAt = "2026-06-12T00:00:00.000Z";

const tags = ["ファストフード", "バーガーキング", "Burger King", "公式"];

const products = [
  ["ワッパー", 672, 28.2, 39.9, 50.8, 3.0, "1個", "ワッパー"],
  ["ワッパーチーズ", 750, 32.7, 46.3, 51.4, 3.7, "1個", "ワッパー"],
  ["ダブルワッパーチーズ", 985, 51.2, 64.1, 51.5, 3.9, "1個", "ワッパー"],
  ["テリヤキワッパー", 684, 28.2, 40.0, 53.4, 3.0, "1個", "ワッパー"],
  ["スモーキーBBQワッパー", 674, 28.1, 39.9, 51.3, 2.9, "1個", "ワッパー"],
  ["アボカドワッパー", 732, 28.7, 45.1, 54.5, 3.0, "1個", "ワッパー"],
  ["チーズバーガー", 291, 15.9, 13.3, 27.3, 1.6, "1個", "バーガー"],
  ["ダブルチーズバーガー", 425, 26.7, 23.2, 27.6, 2.1, "1個", "バーガー"],
  ["チキンナゲット 5ピース", 228, 11.2, 14.5, 15.2, 1.2, "5ピース", "ナゲット"],
  ["フレンチフライ", 306, 4.3, 13.9, 41.1, 1.3, "M", "ポテト"],
  ["オニオンリング", 218, 2.5, 10.9, 27.5, 1.5, "1個", "サイド"],
  ["アップルパイ", 203, 1.9, 10.7, 24.4, 0.3, "1個", "デザート"],
] as const;

export const burgerKingMenuFoods = products.map(
  ([name, calories, protein_g, fat_g, carbs_g, salt_g, serving_label, tag]) =>
    official({
      brand: "バーガーキング",
      name,
      category: "チェーン店",
      tags: [...tags, tag],
      calories,
      protein_g,
      fat_g,
      carbs_g,
      salt_g,
      serving_label,
      default_meal_type: tag === "ポテト" || tag === "ナゲット" || tag === "サイド" || tag === "デザート" ? "snack" : "lunch",
      source_url: sourceUrl,
      fetched_at: fetchedAt,
    }),
);

import { estimated } from "../helpers";

const sourceUrl = "https://www.burgerking.co.jp/menu";
const fetchedAt = "2026-06-12T00:00:00.000Z";

type BurgerKingMenuInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  tags: string[];
  serving_label?: string;
};

const burgerKing = (input: BurgerKingMenuInput) =>
  estimated({
    brand: "バーガーキング",
    name: input.name,
    category: "チェーン店",
    tags: ["ファストフード", "バーガーキング", "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const burgerKingMenuFoods = [
  burgerKing({ name: "ワッパー", calories: 670, protein_g: 29, fat_g: 40, carbs_g: 49, tags: ["ワッパー", "バーガー"] }),
  burgerKing({ name: "ワッパーチーズ", calories: 760, protein_g: 34, fat_g: 47, carbs_g: 50, tags: ["ワッパー", "バーガー", "チーズ"] }),
  burgerKing({ name: "ダブルワッパーチーズ", calories: 1060, protein_g: 58, fat_g: 72, carbs_g: 51, tags: ["ワッパー", "バーガー", "チーズ", "ダブル"] }),
  burgerKing({ name: "テリヤキワッパー", calories: 720, protein_g: 29, fat_g: 40, carbs_g: 61, tags: ["ワッパー", "バーガー", "テリヤキ"] }),
  burgerKing({ name: "スモーキーBBQワッパー", calories: 720, protein_g: 30, fat_g: 42, carbs_g: 56, tags: ["ワッパー", "バーガー", "BBQ"] }),
  burgerKing({ name: "アボカドワッパー", calories: 780, protein_g: 31, fat_g: 50, carbs_g: 53, tags: ["ワッパー", "バーガー", "アボカド"] }),
  burgerKing({ name: "チーズバーガー", calories: 360, protein_g: 17, fat_g: 18, carbs_g: 33, tags: ["バーガー", "チーズ"] }),
  burgerKing({ name: "ダブルチーズバーガー", calories: 540, protein_g: 31, fat_g: 32, carbs_g: 34, tags: ["バーガー", "チーズ", "ダブル"] }),
  burgerKing({ name: "チキンナゲット 5ピース", calories: 260, protein_g: 14, fat_g: 16, carbs_g: 16, tags: ["チキン", "ナゲット", "サイド"], serving_label: "5ピース" }),
  burgerKing({ name: "フレンチフライ", calories: 340, protein_g: 4, fat_g: 16, carbs_g: 44, tags: ["ポテト", "サイド"], serving_label: "M" }),
  burgerKing({ name: "オニオンリング", calories: 300, protein_g: 5, fat_g: 15, carbs_g: 38, tags: ["サイド"], serving_label: "M" }),
  burgerKing({ name: "アップルパイ", calories: 220, protein_g: 2, fat_g: 10, carbs_g: 31, tags: ["デザート"] }),
];

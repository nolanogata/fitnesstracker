import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const sourceUrl = "https://www.ricetomeatyou.com/";
const fetchedAt = "2026-07-05T00:00:00.000Z";

type KandoMenuInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label?: string;
  profile?: NutritionEstimateProfile;
  tags?: string[];
};

const kandoItem = (input: KandoMenuInput) =>
  estimatedWithProfileTags({
    brand: "感動の肉と米",
    name: input.name,
    category: "チェーン店",
    tags: [
      "感動の肉と米",
      "ステーキ",
      "公式メニュー確認",
      "公式サイズ確認",
      "公式サイズのみ",
      "栄養推定",
      ...(input.tags ?? []),
    ],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "レギュラー",
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
    profile: input.profile ?? "meatSetMeal",
  });

export const kandoNikuKomeMenuFoods = [
  kandoItem({ name: "ロースステーキセット", serving_label: "レギュラー", calories: 778, protein_g: 45, fat_g: 34, carbs_g: 73, salt_g: 3.0, tags: ["ロース", "レギュラー"] }),
  kandoItem({ name: "ロースステーキセット", serving_label: "プラスハーフ", calories: 1015, protein_g: 64, fat_g: 50, carbs_g: 78, salt_g: 3.3, tags: ["ロース", "プラスハーフ"] }),
  kandoItem({ name: "ロースステーキセット", serving_label: "ダブル", calories: 1269, protein_g: 84, fat_g: 68, carbs_g: 74, salt_g: 3.7, tags: ["ロース", "ダブル"] }),

  kandoItem({ name: "ハラミステーキセット", serving_label: "レギュラー", calories: 718, protein_g: 48, fat_g: 26, carbs_g: 73, salt_g: 3.0, tags: ["ハラミ", "レギュラー"] }),
  kandoItem({ name: "ハラミステーキセット", serving_label: "プラスハーフ", calories: 958, protein_g: 69, fat_g: 39, carbs_g: 72, salt_g: 3.3, tags: ["ハラミ", "プラスハーフ"] }),
  kandoItem({ name: "ハラミステーキセット", serving_label: "ダブル", calories: 1192, protein_g: 90, fat_g: 52, carbs_g: 70, salt_g: 3.7, tags: ["ハラミ", "ダブル"] }),

  kandoItem({ name: "ハンバーグセット", serving_label: "レギュラー", calories: 814, protein_g: 36, fat_g: 42, carbs_g: 82, salt_g: 3.4, profile: "hamburgerPlate", tags: ["ハンバーグ", "レギュラー"] }),
  kandoItem({ name: "ハンバーグセット", serving_label: "ダブル", calories: 1240, protein_g: 65, fat_g: 76, carbs_g: 73, salt_g: 4.2, profile: "hamburgerPlate", tags: ["ハンバーグ", "ダブル"] }),

  kandoItem({ name: "赤身カットステーキセット", serving_label: "レギュラー", calories: 656, protein_g: 49, fat_g: 18, carbs_g: 69, salt_g: 3.0, tags: ["赤身", "カットステーキ", "レギュラー"] }),
  kandoItem({ name: "赤身カットステーキセット", serving_label: "プラスハーフ", calories: 831, protein_g: 70, fat_g: 27, carbs_g: 58, salt_g: 3.3, tags: ["赤身", "カットステーキ", "プラスハーフ"] }),

  kandoItem({ name: "ヴォルケーノカルビセット", serving_label: "レギュラー", calories: 872, protein_g: 39, fat_g: 45, carbs_g: 78, salt_g: 3.4, tags: ["カルビ", "ヴォルケーノ", "レギュラー"] }),
  kandoItem({ name: "ヴォルケーノカルビセット", serving_label: "プラスハーフ", calories: 1116, protein_g: 56, fat_g: 68, carbs_g: 64, salt_g: 3.8, tags: ["カルビ", "ヴォルケーノ", "プラスハーフ"] }),

  kandoItem({ name: "チキンステーキセット", serving_label: "レギュラー", calories: 680, protein_g: 58, fat_g: 16, carbs_g: 77, salt_g: 3.0, profile: "meatSetMeal", tags: ["チキン", "レギュラー"] }),
  kandoItem({ name: "チキンステーキセット", serving_label: "ダブル", calories: 935, protein_g: 110, fat_g: 31, carbs_g: 29, salt_g: 3.4, profile: "meatSetMeal", tags: ["チキン", "ダブル"] }),

  kandoItem({ name: "すたみなブタミンステーキ", serving_label: "レギュラー", calories: 762, protein_g: 48, fat_g: 34, carbs_g: 66, salt_g: 3.3, tags: ["ポーク", "ブタミン", "レギュラー"] }),

  kandoItem({ name: "中落ちステーキセット", serving_label: "レギュラー", calories: 850, protein_g: 42, fat_g: 44, carbs_g: 77, salt_g: 3.2, tags: ["中落ち", "中部限定", "レギュラー"] }),
  kandoItem({ name: "中落ちステーキセット", serving_label: "プラスハーフ", calories: 1100, protein_g: 60, fat_g: 66, carbs_g: 63, salt_g: 3.6, tags: ["中落ち", "中部限定", "プラスハーフ"] }),
  kandoItem({ name: "中落ちステーキセット", serving_label: "ダブル", calories: 1362, protein_g: 78, fat_g: 88, carbs_g: 53, salt_g: 4.0, tags: ["中落ち", "中部限定", "ダブル"] }),

  kandoItem({ name: "ワイルドカルビステーキセット", serving_label: "レギュラー", calories: 904, protein_g: 44, fat_g: 50, carbs_g: 70, salt_g: 3.3, tags: ["カルビ", "関東限定", "レギュラー"] }),
  kandoItem({ name: "ワイルドカルビステーキセット", serving_label: "プラスハーフ", calories: 1176, protein_g: 64, fat_g: 76, carbs_g: 56, salt_g: 3.8, tags: ["カルビ", "関東限定", "プラスハーフ"] }),
  kandoItem({ name: "ワイルドカルビステーキセット", serving_label: "ダブル", calories: 1450, protein_g: 84, fat_g: 102, carbs_g: 40, salt_g: 4.2, tags: ["カルビ", "関東限定", "ダブル"] }),

  kandoItem({ name: "ロースコンボセット", calories: 1178, protein_g: 70, fat_g: 62, carbs_g: 73, salt_g: 4.0, tags: ["ロース", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "ハラミコンボセット", calories: 1120, protein_g: 73, fat_g: 54, carbs_g: 73, salt_g: 4.0, tags: ["ハラミ", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "赤身カットコンボセット", calories: 1056, protein_g: 74, fat_g: 46, carbs_g: 69, salt_g: 4.0, tags: ["赤身", "カットステーキ", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "ヴォルケーノカルビコンボセット", calories: 1272, protein_g: 64, fat_g: 73, carbs_g: 76, salt_g: 4.3, tags: ["カルビ", "ヴォルケーノ", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "ブタミンコンボセット", calories: 1162, protein_g: 73, fat_g: 62, carbs_g: 66, salt_g: 4.2, tags: ["ポーク", "ブタミン", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "チキンコンボセット", calories: 1080, protein_g: 83, fat_g: 44, carbs_g: 75, salt_g: 4.0, tags: ["チキン", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "ワイルドハラミコンボセット", calories: 1120, protein_g: 73, fat_g: 54, carbs_g: 73, salt_g: 4.0, tags: ["ハラミ", "コンボ", "ハンバーグ"] }),
  kandoItem({ name: "中落ちコンボセット", calories: 1250, protein_g: 67, fat_g: 72, carbs_g: 66, salt_g: 4.2, tags: ["中落ち", "中部限定", "コンボ", "ハンバーグ"] }),
];

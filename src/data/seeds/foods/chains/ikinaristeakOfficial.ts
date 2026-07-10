import type { MealType } from "../../../../types";
import { official } from "../helpers";

const sourceUrl = "https://ikinaristeak.com/wp-content/uploads/nutritioninfo.pdf?ver=1780273820";
const fetchedAt = "2026-06-19T00:00:00.000Z";

type IkinariSteakInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  tags: string[];
  default_meal_type?: MealType;
};

const item = (input: IkinariSteakInput) =>
  official({
    brand: "いきなりステーキ",
    name: input.name,
    category: "チェーン店",
    tags: ["いきなりステーキ", "公式栄養", "公式メニュー確認", "公式サイズのみ", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label,
    default_meal_type: input.default_meal_type ?? "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const ikinariSteakOfficialFoods = [
  item({ name: "ワイルドステーキ", serving_label: "肉130g", calories: 395, protein_g: 24.8, fat_g: 30, carbs_g: 7.1, salt_g: 1.4, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉150g", calories: 448, protein_g: 28.4, fat_g: 34.3, carbs_g: 7.1, salt_g: 1.6, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉180g", calories: 528, protein_g: 33.8, fat_g: 40.8, carbs_g: 7.2, salt_g: 1.9, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉200g", calories: 595, protein_g: 37.4, fat_g: 46.5, carbs_g: 7.4, salt_g: 2.1, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉230g", calories: 675, protein_g: 42.7, fat_g: 53, carbs_g: 7.5, salt_g: 2.3, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉280g", calories: 794, protein_g: 51.6, fat_g: 62.4, carbs_g: 7.4, salt_g: 2.7, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉300g", calories: 861, protein_g: 55.2, fat_g: 68.1, carbs_g: 7.6, salt_g: 3, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉430g", calories: 1207, protein_g: 78.4, fat_g: 96.2, carbs_g: 7.9, salt_g: 4.1, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ワイルドステーキ", serving_label: "肉450g", calories: 1260, protein_g: 81.9, fat_g: 100.5, carbs_g: 8, salt_g: 4.3, tags: ["ステーキ", "牛肉"] }),

  item({ name: "赤身！肩ロースステーキ", serving_label: "肉130g", calories: 324, protein_g: 28.1, fat_g: 19.2, carbs_g: 7.1, salt_g: 1.5, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉150g", calories: 366, protein_g: 32.2, fat_g: 21.9, carbs_g: 7.1, salt_g: 1.6, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉180g", calories: 429, protein_g: 38.3, fat_g: 25.8, carbs_g: 7.2, salt_g: 1.9, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉200g", calories: 485, protein_g: 42.4, fat_g: 29.9, carbs_g: 7.4, salt_g: 2.2, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉230g", calories: 548, protein_g: 48.5, fat_g: 33.9, carbs_g: 7.5, salt_g: 2.4, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉280g", calories: 654, protein_g: 58.6, fat_g: 40.6, carbs_g: 7.6, salt_g: 2.9, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉300g", calories: 696, protein_g: 62.7, fat_g: 43.2, carbs_g: 7.6, salt_g: 3.1, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉430g", calories: 970, protein_g: 89.1, fat_g: 60.5, carbs_g: 7.9, salt_g: 4.3, tags: ["ステーキ", "牛肉", "赤身"] }),
  item({ name: "赤身！肩ロースステーキ", serving_label: "肉450g", calories: 1012, protein_g: 93.2, fat_g: 63.2, carbs_g: 8, salt_g: 4.5, tags: ["ステーキ", "牛肉", "赤身"] }),

  item({ name: "ブレードミートステーキ", serving_label: "肉150g", calories: 376, protein_g: 33.2, fat_g: 25.6, carbs_g: 7.1, salt_g: 1.6, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ブレードミートステーキ", serving_label: "肉200g", calories: 499, protein_g: 43.8, fat_g: 34.9, carbs_g: 7.4, salt_g: 2.1, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ブレードミートステーキ", serving_label: "肉300g", calories: 717, protein_g: 64.8, fat_g: 50.7, carbs_g: 7.6, salt_g: 3, tags: ["ステーキ", "牛肉"] }),
  item({ name: "ブレードミートステーキ", serving_label: "肉450g", calories: 1044, protein_g: 96.3, fat_g: 74.4, carbs_g: 8, salt_g: 4.3, tags: ["ステーキ", "牛肉"] }),

  item({ name: "リブロースステーキ", serving_label: "肉150g", calories: 393, protein_g: 32.8, fat_g: 22.6, carbs_g: 11.7, salt_g: 1.6, tags: ["ステーキ", "牛肉", "リブロース"] }),
  item({ name: "リブロースステーキ", serving_label: "肉200g", calories: 514, protein_g: 42.9, fat_g: 30.8, carbs_g: 12, salt_g: 2.1, tags: ["ステーキ", "牛肉", "リブロース"] }),
  item({ name: "リブロースステーキ", serving_label: "肉300g", calories: 729, protein_g: 63.2, fat_g: 44.6, carbs_g: 12.2, salt_g: 3, tags: ["ステーキ", "牛肉", "リブロース"] }),
  item({ name: "リブロースステーキ", serving_label: "肉400g", calories: 944, protein_g: 83.4, fat_g: 58.3, carbs_g: 12.5, salt_g: 3.9, tags: ["ステーキ", "牛肉", "リブロース"] }),

  item({ name: "特選ヒレステーキ", serving_label: "肉100g", calories: 235, protein_g: 23.5, fat_g: 10, carbs_g: 11.6, salt_g: 1.2, tags: ["ステーキ", "牛肉", "ヒレ"] }),
  item({ name: "特選ヒレステーキ", serving_label: "肉150g", calories: 317, protein_g: 34, fat_g: 14, carbs_g: 11.7, salt_g: 1.6, tags: ["ステーキ", "牛肉", "ヒレ"] }),
  item({ name: "特選ヒレステーキ", serving_label: "肉200g", calories: 412, protein_g: 44.5, fat_g: 19.4, carbs_g: 12, salt_g: 2.1, tags: ["ステーキ", "牛肉", "ヒレ"] }),
  item({ name: "特選ヒレステーキ", serving_label: "肉250g", calories: 494, protein_g: 55.1, fat_g: 23.5, carbs_g: 12.1, salt_g: 2.6, tags: ["ステーキ", "牛肉", "ヒレ"] }),
  item({ name: "特選ヒレステーキ", serving_label: "肉300g", calories: 576, protein_g: 65.6, fat_g: 27.5, carbs_g: 12.2, salt_g: 3, tags: ["ステーキ", "牛肉", "ヒレ"] }),

  item({ name: "ヒレカットステーキ", serving_label: "肉100g", calories: 235, protein_g: 23.5, fat_g: 10, carbs_g: 11.6, salt_g: 1.2, tags: ["ステーキ", "牛肉", "ヒレ"] }),
  item({ name: "ヒレカットステーキ", serving_label: "肉150g", calories: 317, protein_g: 34, fat_g: 14, carbs_g: 11.7, salt_g: 1.6, tags: ["ステーキ", "牛肉", "ヒレ"] }),

  item({ name: "乱切りカットステーキ", serving_label: "肉120g", calories: 327, protein_g: 26.3, fat_g: 19, carbs_g: 11.7, salt_g: 1.3, tags: ["ステーキ", "牛肉", "カットステーキ"] }),
  item({ name: "乱切りカットステーキ", serving_label: "肉160g", calories: 413, protein_g: 34.2, fat_g: 24.7, carbs_g: 11.8, salt_g: 1.7, tags: ["ステーキ", "牛肉", "カットステーキ"] }),
  item({ name: "乱切りカットステーキ", serving_label: "肉200g", calories: 512, protein_g: 42.2, fat_g: 31.7, carbs_g: 12, salt_g: 2.1, tags: ["ステーキ", "牛肉", "カットステーキ"] }),
  item({ name: "乱切りカットステーキ", serving_label: "肉240g", calories: 598, protein_g: 50.1, fat_g: 37.4, carbs_g: 12.1, salt_g: 2.5, tags: ["ステーキ", "牛肉", "カットステーキ"] }),

  item({ name: "ワイルドハンバーグ", serving_label: "ハンバーグ150g", calories: 504, protein_g: 22.3, fat_g: 39.6, carbs_g: 15.1, salt_g: 1.9, tags: ["ハンバーグ"] }),
  item({ name: "ワイルドハンバーグ", serving_label: "ハンバーグ200g", calories: 669, protein_g: 29.2, fat_g: 53.5, carbs_g: 18, salt_g: 2.5, tags: ["ハンバーグ"] }),
  item({ name: "ワイルドハンバーグ", serving_label: "ハンバーグ300g", calories: 972, protein_g: 42.9, fat_g: 78.6, carbs_g: 23.5, salt_g: 3.6, tags: ["ハンバーグ"] }),

  item({ name: "ワイルドコンボ", serving_label: "肉180g(ステーキ80g＋ハンバーグ100g)", calories: 579, protein_g: 29.7, fat_g: 45.7, carbs_g: 12.6, salt_g: 2.1, tags: ["ステーキ", "ハンバーグ", "コンボ"] }),
  item({ name: "ワイルドコンボ", serving_label: "肉250g(ステーキ100g＋ハンバーグ150g)", calories: 783, protein_g: 40.1, fat_g: 62.6, carbs_g: 15.5, salt_g: 2.8, tags: ["ステーキ", "ハンバーグ", "コンボ"] }),
  item({ name: "ワイルドコンボ", serving_label: "肉300g(ステーキ150g＋ハンバーグ150g)", calories: 916, protein_g: 49, fat_g: 73.4, carbs_g: 15.6, salt_g: 3.3, tags: ["ステーキ", "ハンバーグ", "コンボ"] }),
  item({ name: "ワイルドコンボ", serving_label: "肉450g(ステーキ300g＋ハンバーグ150g)", calories: 1329, protein_g: 75.8, fat_g: 107.2, carbs_g: 16.1, salt_g: 4.7, tags: ["ステーキ", "ハンバーグ", "コンボ"] }),

  item({ name: "グリルチキンステーキ", serving_label: "チキン220g", calories: 397, protein_g: 36.5, fat_g: 22.7, carbs_g: 12.3, salt_g: 4, tags: ["チキン", "ステーキ"] }),
  item({ name: "グリルチキンステーキ", serving_label: "チキン440g", calories: 758, protein_g: 71.4, fat_g: 44.9, carbs_g: 18, salt_g: 7.8, tags: ["チキン", "ステーキ"] }),

  item({ name: "ステーキ重", serving_label: "肉150g＋ご飯", calories: 781, protein_g: 34, fat_g: 33.6, carbs_g: 88.6, salt_g: 2.7, tags: ["ステーキ", "牛肉", "重", "ご飯"] }),
  item({ name: "ヒレステーキ重", serving_label: "肉100g＋ご飯", calories: 544, protein_g: 28.2, fat_g: 9.2, carbs_g: 88.2, salt_g: 2.2, tags: ["ステーキ", "牛肉", "ヒレ", "重", "ご飯"] }),
  item({ name: "赤身ステーキプレート", serving_label: "ライス普通盛", calories: 516, protein_g: 26.4, fat_g: 15.8, carbs_g: 67.5, salt_g: 1.2, tags: ["ステーキ", "牛肉", "プレート", "ご飯"] }),
  item({ name: "赤身ステーキプレート", serving_label: "ライス大盛", calories: 657, protein_g: 28.6, fat_g: 16, carbs_g: 100.8, salt_g: 1.2, tags: ["ステーキ", "牛肉", "プレート", "ご飯"] }),

  item({ name: "いきなりセット", serving_label: "ライス・サラダ・スープ", calories: 414, protein_g: 7.6, fat_g: 1.6, carbs_g: 96, salt_g: 1.2, tags: ["セット", "ライス", "サラダ", "スープ"] }),
  item({ name: "ライス・サラダセット", serving_label: "1セット", calories: 397, protein_g: 6.6, fat_g: 0.8, carbs_g: 94.6, salt_g: 0, tags: ["セット", "ライス", "サラダ"] }),
  item({ name: "ライス・スープセット", serving_label: "1セット", calories: 407, protein_g: 7.3, fat_g: 1.6, carbs_g: 94.1, salt_g: 1.2, tags: ["セット", "ライス", "スープ"] }),
  item({ name: "ライス", serving_label: "少なめ", calories: 109, protein_g: 1.8, fat_g: 0.2, carbs_g: 26, salt_g: 0, tags: ["ライス", "ご飯"] }),
  item({ name: "ライス", serving_label: "普通盛", calories: 250, protein_g: 4, fat_g: 0.5, carbs_g: 59.4, salt_g: 0, tags: ["ライス", "ご飯"] }),
  item({ name: "ライス", serving_label: "大盛", calories: 390, protein_g: 6.3, fat_g: 0.8, carbs_g: 92.8, salt_g: 0, tags: ["ライス", "ご飯"] }),
  item({ name: "特製スープ", serving_label: "1杯", calories: 17, protein_g: 1, fat_g: 0.8, carbs_g: 1.3, salt_g: 1.2, tags: ["スープ"], default_meal_type: "snack" }),
  item({ name: "ハンバーグ トッピング", serving_label: "ハンバーグ100g", calories: 316, protein_g: 13.8, fat_g: 26.5, carbs_g: 5.7, salt_g: 1.1, tags: ["ハンバーグ", "トッピング"], default_meal_type: "snack" }),
  item({ name: "ハンバーグ トッピング", serving_label: "ハンバーグ150g", calories: 468, protein_g: 20.6, fat_g: 39.1, carbs_g: 8.5, salt_g: 1.7, tags: ["ハンバーグ", "トッピング"], default_meal_type: "snack" }),
];

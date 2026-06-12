import { official } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";
const sourceUrl = "https://www.hanamaruudon.com/assets/pdf/allergy.pdf";

type HanamaruInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  tags: string[];
  serving_label?: string;
  default_meal_type?: "breakfast" | "lunch" | "dinner" | "snack";
};

const hanamaru = (input: HanamaruInput) =>
  official({
    brand: "はなまるうどん",
    name: input.name,
    category: "チェーン店",
    tags: ["うどん・そば", "はなまるうどん", "公式栄養", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: input.default_meal_type ?? "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const hanamaruOfficialFoods = [
  hanamaru({ name: "定番うどん弁当", calories: 553, protein_g: 9.5, fat_g: 17.4, carbs_g: 90.1, salt_g: 4.2, tags: ["うどん弁当", "テイクアウト"], serving_label: "1食" }),
  hanamaru({ name: "大海老うどん弁当", calories: 716, protein_g: 14.6, fat_g: 25.2, carbs_g: 107.9, salt_g: 4.4, tags: ["うどん弁当", "天ぷら", "海老"], serving_label: "1食" }),
  hanamaru({ name: "よくばりうどん弁当", calories: 862, protein_g: 25.3, fat_g: 32.6, carbs_g: 118.0, salt_g: 5.5, tags: ["うどん弁当", "テイクアウト"], serving_label: "1食" }),
  hanamaru({ name: "にこはなセット（かけ）", calories: 388, protein_g: 8.4, fat_g: 4.4, carbs_g: 79.6, salt_g: 4.6, tags: ["セット", "かけ"], serving_label: "1食" }),
  hanamaru({ name: "にこはなセット（ぶっかけ）", calories: 404, protein_g: 8.3, fat_g: 4.4, carbs_g: 83.6, salt_g: 4.2, tags: ["セット", "ぶっかけ"], serving_label: "1食" }),
  hanamaru({ name: "ごまいなり", calories: 113, protein_g: 3.2, fat_g: 2.7, carbs_g: 19.4, salt_g: 0.6, tags: ["ご飯物", "いなり"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "辛子明太子おにぎり", calories: 166, protein_g: 3.3, fat_g: 0.7, carbs_g: 38.2, salt_g: 1.4, tags: ["ご飯物", "おにぎり", "明太子"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "鮭おにぎり", calories: 175, protein_g: 5.0, fat_g: 1.3, carbs_g: 37.5, salt_g: 1.6, tags: ["ご飯物", "おにぎり", "鮭"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "ミニ牛肉ごはん", calories: 455, protein_g: 12.4, fat_g: 17.5, carbs_g: 66.6, salt_g: 1.1, tags: ["ご飯物", "牛肉"], serving_label: "1杯" }),
  hanamaru({ name: "ミニ塩豚丼", calories: 567, protein_g: 14.3, fat_g: 31.3, carbs_g: 63.7, salt_g: 0.8, tags: ["ご飯物", "豚肉"], serving_label: "1杯" }),
  hanamaru({ name: "ライス 小", calories: 316, protein_g: 5.0, fat_g: 1.1, carbs_g: 74.0, salt_g: 0.0, tags: ["ご飯物", "ライス"], serving_label: "小" }),
  hanamaru({ name: "ライス 大", calories: 395, protein_g: 6.2, fat_g: 1.4, carbs_g: 92.5, salt_g: 0.0, tags: ["ご飯物", "ライス"], serving_label: "大" }),
  hanamaru({ name: "カレーライス（店内仕込み）小", calories: 625, protein_g: 11.7, fat_g: 23.3, carbs_g: 94.6, salt_g: 3.1, tags: ["ご飯物", "カレー"], serving_label: "小" }),
  hanamaru({ name: "カレーライス（店内仕込み）大", calories: 781, protein_g: 14.6, fat_g: 29.1, carbs_g: 118.1, salt_g: 3.9, tags: ["ご飯物", "カレー"], serving_label: "大" }),
  hanamaru({ name: "大海老天", calories: 162, protein_g: 5.1, fat_g: 7.8, carbs_g: 17.7, salt_g: 0.3, tags: ["天ぷら", "海老"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "野菜かき揚げ", calories: 188, protein_g: 1.6, fat_g: 13.6, carbs_g: 14.9, salt_g: 0.1, tags: ["天ぷら", "野菜"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "ちくわ磯辺揚げ", calories: 142, protein_g: 4.8, fat_g: 6.4, carbs_g: 16.3, salt_g: 0.9, tags: ["天ぷら", "ちくわ"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "とり天", calories: 142, protein_g: 10.5, fat_g: 7.4, carbs_g: 8.9, salt_g: 1.1, tags: ["天ぷら", "チキン"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "はなまる唐揚げ", calories: 193, protein_g: 9.2, fat_g: 14.0, carbs_g: 6.3, salt_g: 0.7, tags: ["唐揚げ", "チキン"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "北海道男爵のコロッケ", calories: 231, protein_g: 3.6, fat_g: 12.5, carbs_g: 26.2, salt_g: 0.7, tags: ["揚げ物", "コロッケ"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "半熟たまご", calories: 76, protein_g: 6.2, fat_g: 5.2, carbs_g: 0.2, salt_g: 0.2, tags: ["トッピング", "卵"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "生たまご", calories: 76, protein_g: 6.2, fat_g: 5.2, carbs_g: 0.2, salt_g: 0.2, tags: ["トッピング", "卵"], serving_label: "1個", default_meal_type: "snack" }),
  hanamaru({ name: "牛肉トッピング 70g", calories: 206, protein_g: 8.6, fat_g: 17.1, carbs_g: 7.3, salt_g: 1.1, tags: ["トッピング", "牛肉"], serving_label: "70g" }),
  hanamaru({ name: "塩豚トッピング 70g", calories: 309, protein_g: 12.5, fat_g: 31.1, carbs_g: 0.1, salt_g: 0.1, tags: ["トッピング", "豚肉"], serving_label: "70g" }),
  hanamaru({ name: "野菜サラダ（焙煎ごまドレッシング含む）", calories: 94, protein_g: 2.5, fat_g: 6.6, carbs_g: 7.2, salt_g: 0.6, tags: ["サラダ", "野菜"], serving_label: "1品", default_meal_type: "snack" }),
];

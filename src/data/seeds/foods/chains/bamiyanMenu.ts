import { estimated } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";
const sourceUrl = "https://www.skylark.co.jp/bamiyan/menu/";

type BamiyanInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
  default_meal_type?: "breakfast" | "lunch" | "dinner" | "snack";
};

const bamiyan = (input: BamiyanInput) =>
  estimated({
    brand: "バーミヤン",
    name: input.name,
    category: "チェーン店",
    tags: ["中華", "バーミヤン", "公式メニュー確認", "栄養推定", ...input.tags],
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

export const bamiyanMenuFoods = [
  bamiyan({ name: "バーミヤンラーメン", calories: 590, protein_g: 23, fat_g: 18, carbs_g: 82, salt_g: 6.8, tags: ["ラーメン", "麺類"] }),
  bamiyan({ name: "味玉バーミヤンラーメン", calories: 670, protein_g: 30, fat_g: 24, carbs_g: 83, salt_g: 7.0, tags: ["ラーメン", "麺類", "卵"] }),
  bamiyan({ name: "チャーシュー麺", calories: 760, protein_g: 39, fat_g: 33, carbs_g: 78, salt_g: 7.2, tags: ["ラーメン", "麺類", "チャーシュー"] }),
  bamiyan({ name: "ワンタンメン", calories: 710, protein_g: 30, fat_g: 24, carbs_g: 94, salt_g: 7.5, tags: ["ラーメン", "麺類", "ワンタン"] }),
  bamiyan({ name: "本格焼餃子（6コ）", calories: 330, protein_g: 12, fat_g: 18, carbs_g: 31, salt_g: 1.7, tags: ["餃子", "サイド"], serving_label: "6個" }),
  bamiyan({ name: "からあげ（4コ）", calories: 410, protein_g: 24, fat_g: 25, carbs_g: 22, salt_g: 2.0, tags: ["唐揚げ", "チキン", "サイド"], serving_label: "4個" }),
  bamiyan({ name: "小龍包（3コ）", calories: 220, protein_g: 8, fat_g: 10, carbs_g: 25, salt_g: 1.2, tags: ["小籠包", "サイド"], serving_label: "3個" }),
  bamiyan({ name: "肉シュウマイ（5コ）", calories: 360, protein_g: 17, fat_g: 20, carbs_g: 28, salt_g: 1.8, tags: ["焼売", "サイド"], serving_label: "5個" }),
  bamiyan({ name: "海老餃子とシュウマイ", calories: 310, protein_g: 16, fat_g: 14, carbs_g: 30, salt_g: 1.7, tags: ["点心", "海老", "サイド"] }),
  bamiyan({ name: "海老のチリソース（小皿）", calories: 290, protein_g: 18, fat_g: 15, carbs_g: 22, salt_g: 2.2, tags: ["海老", "チリソース", "小皿"] }),
  bamiyan({ name: "黒酢の酢豚（小皿）", calories: 340, protein_g: 15, fat_g: 20, carbs_g: 29, salt_g: 2.0, tags: ["酢豚", "豚肉", "小皿"] }),
  bamiyan({ name: "海老マヨネーズ", calories: 510, protein_g: 20, fat_g: 34, carbs_g: 30, salt_g: 1.7, tags: ["海老", "マヨネーズ"] }),
  bamiyan({ name: "蒸し鶏の胡麻ソース", calories: 230, protein_g: 24, fat_g: 13, carbs_g: 5, salt_g: 1.4, tags: ["チキン", "小皿"] }),
  bamiyan({ name: "おつまみ焼ビーフン", calories: 360, protein_g: 9, fat_g: 15, carbs_g: 48, salt_g: 2.2, tags: ["ビーフン", "小皿"] }),
  bamiyan({ name: "ホイコーロウ定食", calories: 890, protein_g: 31, fat_g: 34, carbs_g: 112, salt_g: 4.8, tags: ["定食", "豚肉", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "油淋鶏定食", calories: 980, protein_g: 41, fat_g: 39, carbs_g: 118, salt_g: 4.9, tags: ["定食", "チキン", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "肉野菜炒め定食", calories: 820, protein_g: 29, fat_g: 30, carbs_g: 105, salt_g: 4.5, tags: ["定食", "野菜", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "黒酢の酢豚定食", calories: 920, protein_g: 31, fat_g: 32, carbs_g: 124, salt_g: 4.6, tags: ["定食", "豚肉", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "武蔵野麻婆定食", calories: 850, protein_g: 27, fat_g: 33, carbs_g: 110, salt_g: 5.1, tags: ["定食", "麻婆豆腐", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "本格四川麻婆豆腐定食", calories: 900, protein_g: 30, fat_g: 38, carbs_g: 108, salt_g: 5.4, tags: ["定食", "麻婆豆腐", "ご飯"], serving_label: "1食" }),
  bamiyan({ name: "半チャーハン", calories: 360, protein_g: 10, fat_g: 14, carbs_g: 49, salt_g: 2.0, tags: ["チャーハン", "ご飯", "サイド"] }),
  bamiyan({ name: "RGC定食", calories: 1120, protein_g: 42, fat_g: 45, carbs_g: 134, salt_g: 8.8, tags: ["定食", "ラーメン", "餃子", "チャーハン"], serving_label: "1食" }),
  bamiyan({ name: "海鮮焼ビーフン", calories: 650, protein_g: 27, fat_g: 24, carbs_g: 82, salt_g: 4.5, tags: ["台湾展", "ビーフン", "海鮮"] }),
  bamiyan({ name: "豚の角煮", calories: 720, protein_g: 32, fat_g: 52, carbs_g: 28, salt_g: 3.0, tags: ["台湾展", "豚肉"] }),
  bamiyan({ name: "オアチェン（牡蠣オムレツ）", calories: 430, protein_g: 20, fat_g: 27, carbs_g: 28, salt_g: 2.6, tags: ["台湾展", "牡蠣", "卵"] }),
  bamiyan({ name: "鱈の唐揚げ野菜甘酢あんかけ", calories: 410, protein_g: 24, fat_g: 18, carbs_g: 38, salt_g: 2.5, tags: ["台湾展", "魚", "唐揚げ"] }),
  bamiyan({ name: "大根餅", calories: 260, protein_g: 5, fat_g: 10, carbs_g: 38, salt_g: 1.4, tags: ["台湾展", "サイド"] }),
  bamiyan({ name: "白桃杏仁ミルク", calories: 320, protein_g: 6, fat_g: 12, carbs_g: 48, salt_g: 0.2, tags: ["台湾展", "デザート"], default_meal_type: "snack" }),
];

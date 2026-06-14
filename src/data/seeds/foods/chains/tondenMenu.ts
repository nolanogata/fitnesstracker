import { estimated } from "../helpers";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const sources = {
  menuBook: "https://eu.tonden.co.jp/v1/gen/hp/menu-book?area_type=2",
  grand: "https://assets.tonden.co.jp/1/menu_pdf_m/pdf_file/9c4761de-921b-4ced-a598-6973ada0f889.pdf",
  lunch: "https://assets.tonden.co.jp/1/menu_pdf_m/pdf_file/12697ec7-9fb0-4222-add6-2e4444f13866.pdf",
};

type TondenFoodInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
  default_meal_type?: "breakfast" | "lunch" | "dinner" | "snack";
  source_url?: string;
};

const tonden = (item: TondenFoodInput) =>
  estimated({
    brand: "とんでん",
    name: item.name,
    category: "チェーン店",
    tags: ["和食", "ファミレス", "公式メニュー確認", "栄養推定", ...item.tags],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label ?? "1食",
    default_meal_type: item.default_meal_type ?? "lunch",
    source_url: item.source_url ?? sources.grand,
    fetched_at: fetchedAt,
  });

export const tondenMenuFoods = [
  tonden({ name: "とんでん御膳", calories: 980, protein_g: 42, fat_g: 35, carbs_g: 118, salt_g: 5.4, tags: ["御膳", "天ぷら", "寿司", "そば"] }),
  tonden({ name: "北海道ぶた丼", calories: 820, protein_g: 31, fat_g: 28, carbs_g: 112, salt_g: 4.1, tags: ["丼", "豚肉"] }),
  tonden({ name: "北海道ぶた丼 そばセット", calories: 1120, protein_g: 42, fat_g: 34, carbs_g: 166, salt_g: 7.0, tags: ["丼", "豚肉", "そば"] }),
  tonden({ name: "ジャンボ茶わんむし", calories: 210, protein_g: 16, fat_g: 9, carbs_g: 14, salt_g: 2.1, tags: ["茶わんむし", "卵"], serving_label: "1品" }),
  tonden({ name: "いわし巴膳", calories: 860, protein_g: 37, fat_g: 29, carbs_g: 106, salt_g: 5.0, tags: ["御膳", "いわし", "魚"] }),
  tonden({ name: "いわし鮨", calories: 510, protein_g: 22, fat_g: 12, carbs_g: 78, salt_g: 3.0, tags: ["寿司", "いわし", "魚"], serving_label: "1皿" }),
  tonden({ name: "刺身天ぷら膳", calories: 930, protein_g: 45, fat_g: 31, carbs_g: 110, salt_g: 5.1, tags: ["御膳", "刺身", "天ぷら"] }),
  tonden({ name: "寿司天ぷら膳", calories: 890, protein_g: 36, fat_g: 29, carbs_g: 120, salt_g: 5.3, tags: ["御膳", "寿司", "天ぷら"] }),
  tonden({ name: "天丼", calories: 820, protein_g: 25, fat_g: 28, carbs_g: 119, salt_g: 4.4, tags: ["丼", "天ぷら"] }),
  tonden({ name: "天ぷらそば", calories: 690, protein_g: 24, fat_g: 24, carbs_g: 92, salt_g: 5.8, tags: ["そば", "天ぷら", "麺類"] }),
  tonden({ name: "ざるそば", calories: 430, protein_g: 16, fat_g: 4, carbs_g: 82, salt_g: 3.2, tags: ["そば", "麺類"] }),
  tonden({ name: "うな重", calories: 930, protein_g: 38, fat_g: 34, carbs_g: 116, salt_g: 4.0, tags: ["うなぎ", "重"] }),
  tonden({ name: "かつ丼", calories: 910, protein_g: 34, fat_g: 35, carbs_g: 112, salt_g: 4.5, tags: ["丼", "カツ", "豚肉"] }),
  tonden({ name: "ねぎとろ丼", calories: 690, protein_g: 29, fat_g: 18, carbs_g: 101, salt_g: 3.4, tags: ["丼", "まぐろ", "海鮮"] }),
  tonden({ name: "海鮮丼", calories: 720, protein_g: 36, fat_g: 14, carbs_g: 108, salt_g: 4.0, tags: ["丼", "海鮮", "刺身"] }),
  tonden({ name: "ほっけ焼き定食", calories: 780, protein_g: 46, fat_g: 22, carbs_g: 100, salt_g: 4.6, tags: ["定食", "魚", "焼き魚"] }),
  tonden({ name: "若鶏の半身揚げ", calories: 760, protein_g: 48, fat_g: 52, carbs_g: 18, salt_g: 3.1, tags: ["鶏肉", "揚げ物"], serving_label: "1品" }),
  tonden({ name: "ランチにぎり鮨・そば", calories: 780, protein_g: 33, fat_g: 18, carbs_g: 122, salt_g: 5.6, tags: ["ランチ", "寿司", "そば"], source_url: sources.lunch }),
  tonden({ name: "ランチ天丼・そば", calories: 880, protein_g: 30, fat_g: 28, carbs_g: 128, salt_g: 6.2, tags: ["ランチ", "天丼", "そば"], source_url: sources.lunch }),
  tonden({ name: "お子さまランチ", calories: 560, protein_g: 20, fat_g: 22, carbs_g: 72, salt_g: 3.0, tags: ["キッズ"], serving_label: "1食" }),
  tonden({ name: "北海道ミルクソフト", calories: 240, protein_g: 6, fat_g: 9, carbs_g: 34, salt_g: 0.2, tags: ["デザート", "ソフトクリーム"], serving_label: "1個", default_meal_type: "snack" }),
  tonden({ name: "あんみつ", calories: 330, protein_g: 6, fat_g: 6, carbs_g: 66, salt_g: 0.3, tags: ["デザート", "甘味"], serving_label: "1品", default_meal_type: "snack" }),
];


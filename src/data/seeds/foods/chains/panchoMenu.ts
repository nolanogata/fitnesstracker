import { estimated } from "../helpers";

const fetchedAt = "2026-06-17T00:00:00.000Z";
const sourceUrl = "https://order.naporitanpancho.com/takeout/stores/1e8322d0-eb97-4b9a-bbd2-75fc80238231/menus";

type PanchoMenuInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  tags: string[];
};

const item = (input: PanchoMenuInput) =>
  estimated({
    brand: "パンチョ",
    name: input.name,
    category: "チェーン店",
    tags: ["イタリアン", "パンチョ", "パスタ", "スパゲティ", "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: "1品",
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const panchoMenuFoods = [
  item({ name: "ナポリタン(小盛り)", calories: 620, protein_g: 19, fat_g: 21, carbs_g: 90, salt_g: 3.2, tags: ["ナポリタン", "小盛り"] }),
  item({ name: "ナポリタン(並盛り)", calories: 820, protein_g: 25, fat_g: 28, carbs_g: 118, salt_g: 4.2, tags: ["ナポリタン", "並盛り"] }),
  item({ name: "ナポリタン(大盛り)", calories: 1030, protein_g: 32, fat_g: 35, carbs_g: 148, salt_g: 5.3, tags: ["ナポリタン", "大盛り"] }),
  item({ name: "ナポリタン(メガ盛り)", calories: 1230, protein_g: 38, fat_g: 42, carbs_g: 177, salt_g: 6.3, tags: ["ナポリタン", "メガ盛り"] }),

  item({ name: "ミートソース(小盛り)", calories: 700, protein_g: 24, fat_g: 24, carbs_g: 96, salt_g: 3.4, tags: ["ミートソース", "小盛り"] }),
  item({ name: "ミートソース(並盛り)", calories: 900, protein_g: 31, fat_g: 31, carbs_g: 123, salt_g: 4.4, tags: ["ミートソース", "並盛り"] }),
  item({ name: "ミートソース(大盛り)", calories: 1120, protein_g: 39, fat_g: 39, carbs_g: 153, salt_g: 5.5, tags: ["ミートソース", "大盛り"] }),
  item({ name: "ミートソース(メガ盛り)", calories: 1340, protein_g: 47, fat_g: 47, carbs_g: 184, salt_g: 6.6, tags: ["ミートソース", "メガ盛り"] }),

  item({ name: "旨辛ナポ(小盛り)", calories: 710, protein_g: 23, fat_g: 27, carbs_g: 94, salt_g: 3.8, tags: ["ナポリタン", "旨辛", "小盛り"] }),
  item({ name: "旨辛ナポ(並盛り)", calories: 910, protein_g: 29, fat_g: 34, carbs_g: 122, salt_g: 4.8, tags: ["ナポリタン", "旨辛", "並盛り"] }),
  item({ name: "旨辛ナポ(大盛り)", calories: 1130, protein_g: 36, fat_g: 42, carbs_g: 152, salt_g: 6.0, tags: ["ナポリタン", "旨辛", "大盛り"] }),
  item({ name: "旨辛ナポ(メガ盛り)", calories: 1350, protein_g: 43, fat_g: 50, carbs_g: 182, salt_g: 7.2, tags: ["ナポリタン", "旨辛", "メガ盛り"] }),

  item({ name: "白ナポ(小盛り)", calories: 780, protein_g: 25, fat_g: 34, carbs_g: 91, salt_g: 3.7, tags: ["白ナポ", "小盛り"] }),
  item({ name: "白ナポ(並盛り)", calories: 980, protein_g: 31, fat_g: 42, carbs_g: 119, salt_g: 4.7, tags: ["白ナポ", "並盛り"] }),
  item({ name: "白ナポ(大盛り)", calories: 1210, protein_g: 39, fat_g: 52, carbs_g: 148, salt_g: 5.9, tags: ["白ナポ", "大盛り"] }),
  item({ name: "白ナポ(メガ盛り)", calories: 1450, protein_g: 47, fat_g: 62, carbs_g: 178, salt_g: 7.1, tags: ["白ナポ", "メガ盛り"] }),

  item({ name: "オムナポ(小盛り)", calories: 790, protein_g: 27, fat_g: 34, carbs_g: 94, salt_g: 3.7, tags: ["ナポリタン", "オムナポ", "卵", "小盛り"] }),
  item({ name: "オムナポ(並盛り)", calories: 990, protein_g: 33, fat_g: 41, carbs_g: 122, salt_g: 4.7, tags: ["ナポリタン", "オムナポ", "卵", "並盛り"] }),
  item({ name: "オムナポ(大盛り)", calories: 1220, protein_g: 41, fat_g: 51, carbs_g: 152, salt_g: 5.9, tags: ["ナポリタン", "オムナポ", "卵", "大盛り"] }),
  item({ name: "オムナポ(メガ盛り)", calories: 1460, protein_g: 49, fat_g: 61, carbs_g: 182, salt_g: 7.1, tags: ["ナポリタン", "オムナポ", "卵", "メガ盛り"] }),

  item({ name: "ぶっかけミートナポ(小盛り)", calories: 820, protein_g: 29, fat_g: 34, carbs_g: 98, salt_g: 4.0, tags: ["ナポリタン", "ミートソース", "小盛り"] }),
  item({ name: "ぶっかけミートナポ(並盛り)", calories: 1050, protein_g: 36, fat_g: 43, carbs_g: 128, salt_g: 5.1, tags: ["ナポリタン", "ミートソース", "並盛り"] }),
  item({ name: "ぶっかけミートナポ(大盛り)", calories: 1290, protein_g: 45, fat_g: 53, carbs_g: 158, salt_g: 6.3, tags: ["ナポリタン", "ミートソース", "大盛り"] }),
  item({ name: "ぶっかけミートナポ(メガ盛り)", calories: 1540, protein_g: 54, fat_g: 64, carbs_g: 190, salt_g: 7.6, tags: ["ナポリタン", "ミートソース", "メガ盛り"] }),

  item({ name: "海鮮ナポ(小盛り)", calories: 760, protein_g: 31, fat_g: 28, carbs_g: 95, salt_g: 4.0, tags: ["ナポリタン", "海鮮", "小盛り"] }),
  item({ name: "海鮮ナポ(並盛り)", calories: 960, protein_g: 38, fat_g: 35, carbs_g: 124, salt_g: 5.0, tags: ["ナポリタン", "海鮮", "並盛り"] }),
  item({ name: "海鮮ナポ(大盛り)", calories: 1190, protein_g: 47, fat_g: 44, carbs_g: 154, salt_g: 6.2, tags: ["ナポリタン", "海鮮", "大盛り"] }),
  item({ name: "海鮮ナポ(メガ盛り)", calories: 1420, protein_g: 56, fat_g: 52, carbs_g: 185, salt_g: 7.5, tags: ["ナポリタン", "海鮮", "メガ盛り"] }),
];

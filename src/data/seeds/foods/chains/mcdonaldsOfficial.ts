import { official } from "../helpers";

const bigMacSource = "https://www.mcdonalds.co.jp/products/1210/";
const fetchedAt = "2026-06-12T00:00:00.000Z";

export const mcdonaldsOfficialFoods = [
  official({
    brand: "マクドナルド",
    name: "ビッグマック",
    category: "チェーン店",
    tags: ["ファストフード", "マクドナルド", "マック", "マクド", "McDonald's", "公式", "バーガー"],
    calories: 525,
    protein_g: 26.1,
    fat_g: 28.0,
    carbs_g: 42.1,
    salt_g: 2.7,
    serving_label: "1個",
    default_meal_type: "lunch",
    source_url: bigMacSource,
    fetched_at: fetchedAt,
  }),
];

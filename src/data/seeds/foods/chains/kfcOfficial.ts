import { official } from "../helpers";
import products from "./kfcOfficialData.json";

export const kfcOfficialFoods = products.map((product) =>
  official({
    brand: product.brand,
    name: product.name,
    category: "チェーン店",
    tags: ["ファストフード", "KFC", "ケンタ", "公式栄養", product.tag],
    calories: product.calories,
    protein_g: product.protein_g,
    fat_g: product.fat_g,
    carbs_g: product.carbs_g,
    salt_g: product.salt_g,
    serving_label: product.serving_label,
    weight_g: product.weight_g,
    default_meal_type: product.tag === "ドリンク" || product.tag === "スイーツ" || product.tag === "サイド" ? "snack" : "lunch",
    source_url: product.source_url,
    fetched_at: product.fetched_at,
  }),
);

import { official } from "../helpers";
import drinks from "./tullysOfficialDrinkData.json";
import foods from "./tullysOfficialFoodData.json";

const products = [...foods, ...drinks];

export const tullysOfficialFoods = products.map((product) =>
  official({
    brand: product.brand,
    name: product.name,
    category: "チェーン店",
    tags: ["カフェ", "タリーズ", "公式栄養", product.tag],
    calories: product.calories,
    protein_g: product.protein_g,
    fat_g: product.fat_g,
    carbs_g: product.carbs_g,
    salt_g: product.salt_g,
    serving_label: product.serving_label,
    default_meal_type: product.tag === "メイン" ? "lunch" : "snack",
    source_url: product.source_url,
    fetched_at: product.fetched_at,
  }),
);

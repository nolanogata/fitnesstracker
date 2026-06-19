import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const japanMenuSourceUrl = "https://www.foodandwine.com/costco-japan-food-court-11808570";
const foodCourtSourceUrl = "https://en.wikipedia.org/wiki/Costco#Food_service";
const hotDogSourceUrl = "https://en.wikipedia.org/wiki/Costco_hot_dog";
const fetchedAt = "2026-06-14T00:00:00.000Z";

type CostcoFoodCourtSeed = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  default_meal_type: "lunch" | "dinner" | "snack";
  tags: string[];
  source_url: string;
};

const inferProfile = (food: CostcoFoodCourtSeed): NutritionEstimateProfile => {
  const text = `${food.name} ${food.tags.join(" ")}`;
  if (text.includes("ピザ")) return "pizza";
  if (text.includes("ポテト")) return "fries";
  if (text.includes("チキン")) return "friedSide";
  if (text.includes("スープ") || text.includes("チャウダー")) return "soup";
  if (text.includes("ソフトクリーム") || text.includes("サンデー")) return "dessert";
  if (text.includes("スムージー") || text.includes("ラテ") || text.includes("ドリンク")) return "drink";
  if (text.includes("ホットドッグ") || text.includes("ベイク") || text.includes("カルツォーネ") || text.includes("ロール")) return "bread";
  return "riceSetMeal";
};

const foods: CostcoFoodCourtSeed[] = [
  {
    name: "ホットドッグ",
    calories: 560,
    protein_g: 23,
    fat_g: 30,
    carbs_g: 49,
    salt_g: 4.2,
    serving_label: "1本",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "ホットドッグ", "推定栄養"],
    source_url: hotDogSourceUrl,
  },
  {
    name: "チーズピザ",
    calories: 710,
    protein_g: 44,
    fat_g: 27,
    carbs_g: 78,
    salt_g: 4.5,
    serving_label: "1スライス",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "ピザ", "チーズ", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "ペパロニピザ",
    calories: 650,
    protein_g: 34,
    fat_g: 24,
    carbs_g: 75,
    salt_g: 4.4,
    serving_label: "1スライス",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "ピザ", "ペパロニ", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "コンボピザ",
    calories: 680,
    protein_g: 36,
    fat_g: 29,
    carbs_g: 72,
    salt_g: 4.7,
    serving_label: "1スライス",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "ピザ", "コンボ", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "プルコギベイク",
    calories: 890,
    protein_g: 35,
    fat_g: 34,
    carbs_g: 111,
    salt_g: 4.7,
    serving_label: "1本",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "プルコギ", "ベイク", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "カルツォーネ",
    calories: 760,
    protein_g: 30,
    fat_g: 32,
    carbs_g: 88,
    salt_g: 4.3,
    serving_label: "1個",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "カルツォーネ", "ソーセージ", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "チキンベイク",
    calories: 770,
    protein_g: 46,
    fat_g: 25,
    carbs_g: 81,
    salt_g: 5.9,
    serving_label: "1本",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "チキン", "ベイク", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "クラムチャウダー",
    calories: 490,
    protein_g: 14,
    fat_g: 22,
    carbs_g: 61,
    salt_g: 4.4,
    serving_label: "1杯",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "スープ", "クラムチャウダー", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "サーモンポキロール",
    calories: 620,
    protein_g: 26,
    fat_g: 19,
    carbs_g: 86,
    salt_g: 3.1,
    serving_label: "1本",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "サーモン", "ポキ", "ロール", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "チキンスティック＆ポテト",
    calories: 780,
    protein_g: 30,
    fat_g: 41,
    carbs_g: 72,
    salt_g: 3.8,
    serving_label: "1皿",
    default_meal_type: "lunch",
    tags: ["コストコ", "フードコート", "チキン", "ポテト", "サイド", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "北海道ソフトクリーム",
    calories: 550,
    protein_g: 10,
    fat_g: 31,
    carbs_g: 58,
    salt_g: 0.3,
    serving_label: "1カップ",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "ソフトクリーム", "北海道", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "宇治抹茶ソフトクリーム",
    calories: 520,
    protein_g: 10,
    fat_g: 28,
    carbs_g: 59,
    salt_g: 0.3,
    serving_label: "1カップ",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "ソフトクリーム", "抹茶", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "ソフトクリーム ミックス",
    calories: 535,
    protein_g: 10,
    fat_g: 30,
    carbs_g: 59,
    salt_g: 0.3,
    serving_label: "1カップ",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "ソフトクリーム", "北海道", "抹茶", "推定栄養"],
    source_url: japanMenuSourceUrl,
  },
  {
    name: "サンデー",
    calories: 650,
    protein_g: 11,
    fat_g: 32,
    carbs_g: 82,
    salt_g: 0.4,
    serving_label: "1カップ",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "サンデー", "ソフトクリーム", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "スムージー",
    calories: 290,
    protein_g: 0,
    fat_g: 0,
    carbs_g: 72,
    salt_g: 0.1,
    serving_label: "1杯",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "スムージー", "ドリンク", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "ラテフリーズ",
    calories: 190,
    protein_g: 5,
    fat_g: 3,
    carbs_g: 36,
    salt_g: 0.2,
    serving_label: "1杯",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "ラテ", "フリーズ", "ドリンク", "推定栄養"],
    source_url: foodCourtSourceUrl,
  },
  {
    name: "ドリンクバー",
    calories: 0,
    protein_g: 0,
    fat_g: 0,
    carbs_g: 0,
    salt_g: 0,
    serving_label: "ゼロカロリー飲料1杯",
    default_meal_type: "snack",
    tags: ["コストコ", "フードコート", "ドリンク", "ゼロカロリー", "推定栄養"],
    source_url: hotDogSourceUrl,
  },
];

export const costcoFoodCourtFoods = foods.map((food) =>
  estimatedWithProfileTags({
    brand: "コストコ",
    name: food.name,
    category: "チェーン店",
    tags: food.tags,
    calories: food.calories,
    protein_g: food.protein_g,
    fat_g: food.fat_g,
    carbs_g: food.carbs_g,
    salt_g: food.salt_g,
    serving_label: food.serving_label,
    default_meal_type: food.default_meal_type,
    source_url: food.source_url,
    fetched_at: fetchedAt,
    profile: inferProfile(food),
  }),
);

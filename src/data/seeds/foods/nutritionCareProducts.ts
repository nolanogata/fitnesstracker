import { official } from "./helpers";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const sources = {
  miniMilk: "https://www.meiji.co.jp/meiji-eiyoucare/products/nutritionfood/meibalance_mini/detail.html",
  miniSoup: "https://www.meiji.co.jp/meiji-eiyoucare/products/nutritionfood/meibalance_mini_soup/index.html",
  miniYogurt: "https://www.meiji.co.jp/meiji-eiyoucare/products/nutritionfood/meibalance_mini_yogurt/detail.html",
  gyuttoMini: "https://www.meiji.co.jp/meiji-nutrition-info/products/carefood/meibalance_gyuttomini/",
  softJelly: "https://www.meiji.co.jp/meiji-eiyoucare/products/nutritionfood/softjelly/",
};

type NutritionCareInput = {
  name: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  source_url: string;
};

const meibalance = (item: NutritionCareInput) =>
  official({
    brand: "明治",
    ...item,
    tags: ["市販品", "栄養補助", "メイバランス", "公式栄養", ...item.tags],
    default_meal_type: "snack",
    fetched_at: fetchedAt,
  });

const miniMilk = (flavor: string) =>
  meibalance({
    name: `明治メイバランス Miniカップ ${flavor}`,
    category: "ドリンク",
    tags: ["栄養調整食品", "ドリンク", "Miniカップ", "ミルクテイスト", flavor],
    calories: 200,
    protein_g: 7.5,
    fat_g: 5.6,
    carbs_g: 31.8,
    salt_g: 0.33,
    serving_label: "125ml",
    source_url: sources.miniMilk,
  });

const miniYogurt = (flavor: string) =>
  meibalance({
    name: `明治メイバランス Miniカップ ${flavor}`,
    category: "ドリンク",
    tags: ["栄養調整食品", "ドリンク", "Miniカップ", "発酵乳仕込み", "ヨーグルト", flavor],
    calories: 200,
    protein_g: 7.5,
    fat_g: 5.6,
    carbs_g: 32.2,
    salt_g: 0.28,
    serving_label: "125ml",
    source_url: sources.miniYogurt,
  });

const gyuttoMini = (flavor: string) =>
  meibalance({
    name: `明治メイバランスぎゅっと Mini ${flavor}`,
    category: "ドリンク",
    tags: ["栄養調整食品", "ドリンク", "ぎゅっとMini", flavor],
    calories: 200,
    protein_g: 7.5,
    fat_g: 5.6,
    carbs_g: 31.8,
    salt_g: 0.33,
    serving_label: "100ml",
    source_url: sources.gyuttoMini,
  });

const softJelly = (flavor: string) =>
  meibalance({
    name: `明治メイバランス ソフトJelly ${flavor}`,
    category: "スイーツ",
    tags: ["栄養調整食品", "ゼリー", "ソフトJelly", "ヨーグルト", flavor],
    calories: 200,
    protein_g: 7.5,
    fat_g: 5.6,
    carbs_g: 31.6,
    salt_g: 0.33,
    serving_label: "125ml",
    source_url: sources.softJelly,
  });

export const nutritionCareProductFoods = [
  miniMilk("コーヒー味"),
  miniMilk("ストロベリー味"),
  miniMilk("ヨーグルト味"),
  miniMilk("バナナ味"),
  miniMilk("フルーツ・オレ味"),

  meibalance({ name: "明治メイバランス Miniカップ コーンスープ味", category: "ドリンク", tags: ["栄養調整食品", "ドリンク", "Miniカップ", "スープ", "コーンスープ"], calories: 200, protein_g: 7.5, fat_g: 5.6, carbs_g: 31.8, salt_g: 0.41, serving_label: "125ml", source_url: sources.miniSoup }),
  meibalance({ name: "明治メイバランス Miniカップ オニオンスープ味", category: "ドリンク", tags: ["栄養調整食品", "ドリンク", "Miniカップ", "スープ", "オニオンスープ"], calories: 200, protein_g: 7.5, fat_g: 5.6, carbs_g: 31.8, salt_g: 0.41, serving_label: "125ml", source_url: sources.miniSoup }),

  miniYogurt("さわやかヨーグルト味"),
  miniYogurt("白桃ヨーグルト味"),
  miniYogurt("ブルーベリーヨーグルト味"),
  miniYogurt("いちごヨーグルト味"),
  miniYogurt("マスカットヨーグルト味"),

  gyuttoMini("コーヒー味"),
  gyuttoMini("バナナ味"),
  gyuttoMini("ストロベリー味"),
  gyuttoMini("ミックスフルーツ味"),
  gyuttoMini("コーンスープ味"),
  gyuttoMini("ピーチ味"),

  softJelly("はちみつヨーグルト味"),
  softJelly("バナナヨーグルト味"),
  softJelly("ぶどうヨーグルト味"),
  softJelly("ヨーグルト味"),
  softJelly("ピーチヨーグルト味"),
  softJelly("パインヨーグルト味"),
  softJelly("ストロベリーヨーグルト味"),
  softJelly("マスカットヨーグルト味"),
];

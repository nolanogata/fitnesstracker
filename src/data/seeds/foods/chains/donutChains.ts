import { estimated, official } from "../helpers";

const misterDonutSourceUrl = "https://www.misterdonut.jp/m_menu/eiyou/eiyou.pdf";
const krispyKremeSourceUrl = "https://krispykreme.jp/cms/wp-content/uploads/nutrition.pdf?20260430133558=";
const imDonutSourceUrl = "https://www.foodandwine.com/im-donut-times-square-new-york-city-11719428";
const fetchedAt = "2026-06-14T00:00:00.000Z";

type OfficialDonutFood = {
  brand: "ミスタードーナツ" | "クリスピークリーム";
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  tags: string[];
  source_url: string;
};

type EstimatedDonutFood = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  tags: string[];
};

const misterDonutFoods: OfficialDonutFood[] = [
  { brand: "ミスタードーナツ", name: "ポン・デ・リング", calories: 219, protein_g: 1.2, fat_g: 11.8, carbs_g: 26.9, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "ポン・デ・リング", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ポン・デ・黒糖", calories: 202, protein_g: 1.2, fat_g: 11.9, carbs_g: 22.4, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "ポン・デ・リング", "黒糖", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ポン・デ・エンゼル", calories: 251, protein_g: 1.7, fat_g: 15.8, carbs_g: 25.3, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "ポン・デ・リング", "クリーム", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "エンゼルクリーム", calories: 200, protein_g: 3.1, fat_g: 12, carbs_g: 19.5, salt_g: 0.5, tags: ["ミスタードーナツ", "ドーナツ", "クリーム", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "カスタードクリーム", calories: 222, protein_g: 3.4, fat_g: 11.8, carbs_g: 25.2, salt_g: 0.5, tags: ["ミスタードーナツ", "ドーナツ", "カスタード", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ハニーディップ", calories: 216, protein_g: 4.1, fat_g: 11.4, carbs_g: 24, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "イーストドーナツ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "チョコリング", calories: 250, protein_g: 4.5, fat_g: 15.5, carbs_g: 22.6, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "チョコ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "フレンチクルーラー", calories: 148, protein_g: 1.5, fat_g: 9.2, carbs_g: 14.3, salt_g: 0.2, tags: ["ミスタードーナツ", "ドーナツ", "フレンチクルーラー", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "エンゼルフレンチ", calories: 186, protein_g: 2.1, fat_g: 13.7, carbs_g: 13.1, salt_g: 0.2, tags: ["ミスタードーナツ", "ドーナツ", "フレンチクルーラー", "クリーム", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "オールドファッション", calories: 281, protein_g: 3.4, fat_g: 17, carbs_g: 28, salt_g: 0.7, tags: ["ミスタードーナツ", "ドーナツ", "オールドファッション", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "チョコファッション", calories: 318, protein_g: 3.7, fat_g: 19.7, carbs_g: 30.7, salt_g: 0.7, tags: ["ミスタードーナツ", "ドーナツ", "オールドファッション", "チョコ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "チョコレート", calories: 245, protein_g: 2.9, fat_g: 13.9, carbs_g: 26.8, salt_g: 0.5, tags: ["ミスタードーナツ", "ドーナツ", "チョコ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ダブルチョコレート", calories: 271, protein_g: 3.4, fat_g: 17.3, carbs_g: 24.8, salt_g: 0.5, tags: ["ミスタードーナツ", "ドーナツ", "チョコ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ゴールデンチョコレート", calories: 274, protein_g: 3.2, fat_g: 14.4, carbs_g: 32.5, salt_g: 0.5, tags: ["ミスタードーナツ", "ドーナツ", "チョコ", "公式栄養"], source_url: misterDonutSourceUrl },
  { brand: "ミスタードーナツ", name: "ハニーチュロ", calories: 205, protein_g: 3.3, fat_g: 10.1, carbs_g: 24.9, salt_g: 0.6, tags: ["ミスタードーナツ", "ドーナツ", "チュロ", "公式栄養"], source_url: misterDonutSourceUrl },
];

const krispyKremeFoods: OfficialDonutFood[] = [
  { brand: "クリスピークリーム", name: "オリジナル・グレーズド", calories: 213, protein_g: 2.7, fat_g: 11, carbs_g: 25.9, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "オリジナルグレーズド", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "チョココート グレーズド", calories: 260, protein_g: 3.1, fat_g: 14.4, carbs_g: 29.7, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "チョコ", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "シナモン シュガー", calories: 205, protein_g: 2.8, fat_g: 12.9, carbs_g: 19.6, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "シナモン", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "チョココート カスタード", calories: 328, protein_g: 5, fat_g: 20, carbs_g: 32.6, salt_g: 0.4, tags: ["クリスピークリーム", "ドーナツ", "チョコ", "カスタード", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "チョココート スプリンクル", calories: 280, protein_g: 3.1, fat_g: 14.4, carbs_g: 34.7, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "チョコ", "スプリンクル", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "オールドファッション プレーン", calories: 301, protein_g: 2.7, fat_g: 19.2, carbs_g: 29.5, salt_g: 0.6, tags: ["クリスピークリーム", "ドーナツ", "オールドファッション", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "ダブル チョコ クランチ", calories: 249, protein_g: 3.6, fat_g: 16, carbs_g: 22.9, salt_g: 0.3, tags: ["クリスピークリーム", "ドーナツ", "チョコ", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "ブリュレ グレーズド カスタード", calories: 250, protein_g: 3.4, fat_g: 12.5, carbs_g: 31.2, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "ブリュレ", "カスタード", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "ブリュレ グレーズド レモンバター", calories: 260, protein_g: 2.7, fat_g: 12, carbs_g: 35.2, salt_g: 0.2, tags: ["クリスピークリーム", "ドーナツ", "ブリュレ", "レモン", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "Kome-Dough 黒蜜きなこ", calories: 329, protein_g: 2.1, fat_g: 21, carbs_g: 33.1, salt_g: 0.8, tags: ["クリスピークリーム", "ドーナツ", "きなこ", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "ミニ チョコ スプリンクル", calories: 152, protein_g: 1.5, fat_g: 7.8, carbs_g: 19, salt_g: 0.1, tags: ["クリスピークリーム", "ドーナツ", "ミニ", "チョコ", "公式栄養"], source_url: krispyKremeSourceUrl },
  { brand: "クリスピークリーム", name: "ミニ ストロベリー スター", calories: 141, protein_g: 1.3, fat_g: 7.8, carbs_g: 16.5, salt_g: 0.1, tags: ["クリスピークリーム", "ドーナツ", "ミニ", "ストロベリー", "公式栄養"], source_url: krispyKremeSourceUrl },
];

const imDonutFoods: EstimatedDonutFood[] = [
  { name: "I'm donut? オリジナル", calories: 260, protein_g: 5, fat_g: 13, carbs_g: 32, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "推定栄養"] },
  { name: "I'm donut? 抹茶", calories: 280, protein_g: 5, fat_g: 14, carbs_g: 35, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "抹茶", "推定栄養"] },
  { name: "I'm donut? カスタード", calories: 360, protein_g: 6, fat_g: 20, carbs_g: 42, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "カスタード", "推定栄養"] },
  { name: "I'm donut? チョコ", calories: 340, protein_g: 5, fat_g: 19, carbs_g: 40, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "チョコ", "推定栄養"] },
  { name: "I'm donut? ピスタチオ", calories: 390, protein_g: 7, fat_g: 24, carbs_g: 43, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "ピスタチオ", "推定栄養"] },
  { name: "I'm donut? あんこ", calories: 330, protein_g: 6, fat_g: 15, carbs_g: 46, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "あんこ", "推定栄養"] },
  { name: "I'm donut? PB&J", calories: 520, protein_g: 11, fat_g: 31, carbs_g: 55, salt_g: 0.7, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "ピーナッツ", "推定栄養"] },
  { name: "I'm donut? Sake Cream", calories: 430, protein_g: 6, fat_g: 26, carbs_g: 43, salt_g: 0.5, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "クリーム", "推定栄養"] },
  { name: "I'm donut? ヴィーガン ストロベリーチョコ", calories: 320, protein_g: 4, fat_g: 17, carbs_g: 39, salt_g: 0.4, tags: ["アイムドーナツ", "ドーナツ", "生ドーナツ", "ヴィーガン", "ストロベリー", "推定栄養"] },
  { name: "I'm donut? Sausage in a Blanket", calories: 430, protein_g: 12, fat_g: 25, carbs_g: 39, salt_g: 1.8, tags: ["アイムドーナツ", "ドーナツ", "惣菜ドーナツ", "ソーセージ", "推定栄養"] },
  { name: "I'm donut? Scrambled Egg", calories: 420, protein_g: 13, fat_g: 22, carbs_g: 43, salt_g: 1.4, tags: ["アイムドーナツ", "ドーナツ", "惣菜ドーナツ", "卵", "推定栄養"] },
  { name: "I'm donut? NY BLT", calories: 620, protein_g: 20, fat_g: 36, carbs_g: 55, salt_g: 2.2, tags: ["アイムドーナツ", "ドーナツ", "惣菜ドーナツ", "BLT", "推定栄養"] },
  { name: "I'm donut? Chicken Ginger Teriyaki", calories: 560, protein_g: 24, fat_g: 26, carbs_g: 62, salt_g: 2.5, tags: ["アイムドーナツ", "ドーナツ", "惣菜ドーナツ", "チキン", "推定栄養"] },
];

export const donutChainFoods = [
  ...misterDonutFoods.map((food) =>
    official({
      brand: food.brand,
      name: food.name,
      category: "チェーン店",
      tags: food.tags,
      calories: food.calories,
      protein_g: food.protein_g,
      fat_g: food.fat_g,
      carbs_g: food.carbs_g,
      salt_g: food.salt_g,
      serving_label: "1個",
      default_meal_type: "snack",
      source_url: food.source_url,
      fetched_at: fetchedAt,
    }),
  ),
  ...krispyKremeFoods.map((food) =>
    official({
      brand: food.brand,
      name: food.name,
      category: "チェーン店",
      tags: food.tags,
      calories: food.calories,
      protein_g: food.protein_g,
      fat_g: food.fat_g,
      carbs_g: food.carbs_g,
      salt_g: food.salt_g,
      serving_label: "1個",
      default_meal_type: "snack",
      source_url: food.source_url,
      fetched_at: fetchedAt,
    }),
  ),
  ...imDonutFoods.map((food) =>
    estimated({
      brand: "アイムドーナツ",
      name: food.name,
      category: "チェーン店",
      tags: food.tags,
      calories: food.calories,
      protein_g: food.protein_g,
      fat_g: food.fat_g,
      carbs_g: food.carbs_g,
      salt_g: food.salt_g,
      serving_label: "1個",
      default_meal_type: "snack",
      source_url: imDonutSourceUrl,
      fetched_at: fetchedAt,
    }),
  ),
];

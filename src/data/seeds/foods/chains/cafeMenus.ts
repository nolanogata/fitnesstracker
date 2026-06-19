import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";
import { official } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sources = {
  スターバックス: "https://product.starbucks.co.jp/food/",
  ドトール: "https://www.doutor.co.jp/dcs/menu/",
  タリーズ: "https://www.tullys.co.jp/menu/food/",
  コメダ珈琲: "https://www.komeda.co.jp/menu/",
} as const;

type CafeMenu = {
  brand: keyof typeof sources;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  tags: string[];
  serving_label?: string;
};

type OfficialCafeMenu = CafeMenu & {
  salt_g: number;
  source_url: string;
};

const inferProfile = (input: CafeMenu): NutritionEstimateProfile => {
  const text = `${input.name} ${input.tags.join(" ")}`;
  if (text.includes("ドリンク") || text.includes("ジェリコ")) return "drink";
  if (text.includes("パスタ") || text.includes("スパ")) return "pasta";
  if (text.includes("カツ") || text.includes("サンド") || text.includes("パン") || text.includes("トースト")) return "bread";
  if (text.includes("デザート") || text.includes("シロノワール")) return "dessert";
  return "riceSetMeal";
};

const item = (input: CafeMenu) =>
  estimatedWithProfileTags({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["カフェ", input.brand, "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "snack",
    source_url: sources[input.brand],
    fetched_at: fetchedAt,
    profile: inferProfile(input),
  });

const officialItem = (input: OfficialCafeMenu) =>
  official({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["カフェ", input.brand, "公式", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "snack",
    source_url: input.source_url,
    fetched_at: fetchedAt,
  });

export const cafeMenuFoods = [
  officialItem({ brand: "スターバックス", name: "ニューヨークチーズケーキ", calories: 414, protein_g: 6.6, fat_g: 29.9, carbs_g: 30.1, salt_g: 0.7, tags: ["デザート","ケーキ"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785308985" }),
  officialItem({ brand: "スターバックス", name: "シュガードーナツ", calories: 360, protein_g: 4.5, fat_g: 21.4, carbs_g: 38, salt_g: 0.5, tags: ["ドーナツ"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785508385" }),
  officialItem({ brand: "スターバックス", name: "チョコレートチャンクスコーン", calories: 332, protein_g: 4.4, fat_g: 20.9, carbs_g: 32.4, salt_g: 0.8, tags: ["スコーン"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785614512" }),
  officialItem({ brand: "スターバックス", name: "ベーコンとほうれん草のキッシュ", calories: 299, protein_g: 7, fat_g: 20.4, carbs_g: 22.3, salt_g: 1.5, tags: ["キッシュ"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785561427" }),
  officialItem({ brand: "スターバックス", name: "ハム＆マリボーチーズ 石窯フィローネ", calories: 342, protein_g: 19, fat_g: 12.7, carbs_g: 39.4, salt_g: 1.8, tags: ["サンド","チーズ"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785447462" }),
  officialItem({ brand: "スターバックス", name: "チキン＆チーズアラビアータ 石窯フィローネ", calories: 362, protein_g: 21.8, fat_g: 11.5, carbs_g: 42.8, salt_g: 2.7, tags: ["サンド","チキン"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785628281" }),
  officialItem({ brand: "スターバックス", name: "クラブハウス 石窯カンパーニュサンド", calories: 299, protein_g: 11.8, fat_g: 17.5, carbs_g: 24.4, salt_g: 1.9, tags: ["サンド"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785625280" }),
  officialItem({ brand: "スターバックス", name: "根菜チキン サラダラップ", calories: 203, protein_g: 9.6, fat_g: 7.2, carbs_g: 25.1, salt_g: 1.6, tags: ["ラップ","チキン"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785598126" }),
  officialItem({ brand: "スターバックス", name: "ヨーグルト＆バナナグラノーラ", calories: 179, protein_g: 11.5, fat_g: 5.5, carbs_g: 20.9, salt_g: 0.1, tags: ["ヨーグルト","朝食"], serving_label: "1品", source_url: "https://menu.starbucks.co.jp/4524785625891" }),



  item({ brand: "コメダ珈琲", name: "シロノワール（単品）", calories: 933, protein_g: 15, fat_g: 44, carbs_g: 118, tags: ["デザート", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "ミニシロノワール（単品）", calories: 422, protein_g: 7, fat_g: 20, carbs_g: 53, tags: ["デザート", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "ミックスサンド", calories: 862, protein_g: 30, fat_g: 47, carbs_g: 78, tags: ["サンド", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "カツパン", calories: 1240, protein_g: 43, fat_g: 64, carbs_g: 122, tags: ["カツ", "パン", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "ハムサンド", calories: 517, protein_g: 22, fat_g: 25, carbs_g: 51, tags: ["サンド", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "小倉トースト", calories: 731, protein_g: 14, fat_g: 28, carbs_g: 105, tags: ["トースト", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "たっぷりたまごのピザトースト", calories: 969, protein_g: 34, fat_g: 52, carbs_g: 88, tags: ["トースト", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "「名古屋名物」あんかけスパ（単品）", calories: 624, protein_g: 22, fat_g: 22, carbs_g: 88, tags: ["パスタ", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "「喫茶店の王道」ナポリタン（単品）", calories: 706, protein_g: 24, fat_g: 26, carbs_g: 96, tags: ["パスタ", "公式カロリー"] }),
  item({ brand: "コメダ珈琲", name: "ジェリコ 元祖", calories: 257, protein_g: 5, fat_g: 11, carbs_g: 35, tags: ["ドリンク", "公式カロリー"] }),
];

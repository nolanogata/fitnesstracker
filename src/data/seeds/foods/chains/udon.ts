import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-15T00:00:00.000Z";

const sources = {
  marugameUdon: "https://jp.marugame.com/menu/udon/",
  marugameTempura: "https://jp.marugame.com/menu/tempura/",
  marugameRice: "https://jp.marugame.com/menu/gohanmono/",
  sukesanMenu:
    "https://meocloud-image.s3.ap-northeast-1.amazonaws.com/images/cms/managed/companies/569/20260415184134menu_2026ss01_A1.pdf",
  westCalories: "https://www.shop-west.jp/data/seasonal/178/additional_menu_1.pdf",
};

type UdonSeedInput = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label?: string;
  source_url: string;
  tags?: string[];
};

const inferProfile = (input: UdonSeedInput): NutritionEstimateProfile => {
  const text = `${input.name} ${(input.tags ?? []).join(" ")}`;
  if (text.includes("おむすび") || text.includes("いなり") || text.includes("ご飯")) return "onigiri";
  if (text.includes("カツ") || text.includes("丼")) return "riceBowl";
  if (text.includes("カレー")) return "curryRice";
  if (text.includes("天") || text.includes("かき揚げ") || text.includes("唐揚げ")) return "friedSide";
  return "sobaNoodle";
};

const chainEstimated = (input: UdonSeedInput) =>
  estimatedWithProfileTags({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["うどん・そば", input.brand, "公式メニュー確認", "栄養推定", ...(input.tags ?? [])],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: input.source_url,
    fetched_at: fetchedAt,
    profile: inferProfile(input),
  });

export const udonFoods = [
  chainEstimated({ brand: "丸亀製麺", name: "釜揚げうどん（並）", calories: 340, protein_g: 9.5, fat_g: 1.5, carbs_g: 70.0, salt_g: 3.0, tags: ["釜揚げ", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "釜揚げうどん（大）", calories: 500, protein_g: 14.0, fat_g: 2.2, carbs_g: 103.0, salt_g: 4.4, tags: ["釜揚げ", "大"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "かけうどん（並）", calories: 320, protein_g: 9.5, fat_g: 1.6, carbs_g: 67.0, salt_g: 5.1, tags: ["かけ", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "ぶっかけうどん（並）", calories: 360, protein_g: 10.5, fat_g: 1.8, carbs_g: 74.0, salt_g: 4.1, tags: ["ぶっかけ", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "ざるうどん（並）", calories: 350, protein_g: 10.0, fat_g: 1.6, carbs_g: 72.0, salt_g: 3.7, tags: ["ざる", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "とろ玉うどん（並）", calories: 560, protein_g: 19.0, fat_g: 10.0, carbs_g: 95.0, salt_g: 4.5, tags: ["とろろ", "卵", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "明太釜玉うどん（並）", calories: 430, protein_g: 17.0, fat_g: 8.0, carbs_g: 74.0, salt_g: 4.2, tags: ["明太子", "釜玉", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "きつねうどん（並）", calories: 520, protein_g: 17.0, fat_g: 12.0, carbs_g: 86.0, salt_g: 5.3, tags: ["きつね", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "カレーうどん（並）", calories: 620, protein_g: 18.0, fat_g: 16.0, carbs_g: 100.0, salt_g: 5.4, tags: ["カレー", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "肉うどん（並）", calories: 610, protein_g: 22.0, fat_g: 18.0, carbs_g: 87.0, salt_g: 5.2, tags: ["肉", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "肉ぶっかけうどん（並）", calories: 650, protein_g: 23.0, fat_g: 20.0, carbs_g: 92.0, salt_g: 4.7, tags: ["肉", "ぶっかけ", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "鬼おろし肉ぶっかけうどん（並）", calories: 690, protein_g: 24.0, fat_g: 21.0, carbs_g: 97.0, salt_g: 5.0, tags: ["肉", "ぶっかけ", "おろし", "並"], source_url: sources.marugameUdon }),
  chainEstimated({ brand: "丸亀製麺", name: "かしわ天", calories: 170, protein_g: 11.0, fat_g: 9.0, carbs_g: 11.0, salt_g: 0.8, tags: ["天ぷら", "鶏肉", "サイド"], serving_label: "1個", source_url: sources.marugameTempura }),
  chainEstimated({ brand: "丸亀製麺", name: "野菜かき揚げ", calories: 650, protein_g: 6.0, fat_g: 41.0, carbs_g: 67.0, salt_g: 0.8, tags: ["天ぷら", "野菜", "サイド"], serving_label: "1個", source_url: sources.marugameTempura }),
  chainEstimated({ brand: "丸亀製麺", name: "えび天", calories: 110, protein_g: 5.0, fat_g: 6.0, carbs_g: 10.0, salt_g: 0.5, tags: ["天ぷら", "海老", "サイド"], serving_label: "1個", source_url: sources.marugameTempura }),
  chainEstimated({ brand: "丸亀製麺", name: "ちくわ磯辺天", calories: 170, protein_g: 6.0, fat_g: 8.0, carbs_g: 20.0, salt_g: 0.9, tags: ["天ぷら", "ちくわ", "サイド"], serving_label: "1個", source_url: sources.marugameTempura }),
  chainEstimated({ brand: "丸亀製麺", name: "鮭おむすび", calories: 140, protein_g: 4.0, fat_g: 1.0, carbs_g: 29.0, salt_g: 0.8, tags: ["ご飯", "おむすび", "鮭"], serving_label: "1個", source_url: sources.marugameRice }),
  chainEstimated({ brand: "丸亀製麺", name: "明太子おむすび", calories: 140, protein_g: 4.0, fat_g: 1.0, carbs_g: 29.0, salt_g: 0.9, tags: ["ご飯", "おむすび", "明太子"], serving_label: "1個", source_url: sources.marugameRice }),
  chainEstimated({ brand: "丸亀製麺", name: "いなり", calories: 121, protein_g: 3.0, fat_g: 3.0, carbs_g: 21.0, salt_g: 0.6, tags: ["ご飯", "いなり"], serving_label: "1個", source_url: sources.marugameRice }),

  chainEstimated({ brand: "資さんうどん", name: "肉ごぼ天うどん", calories: 760, protein_g: 25.0, fat_g: 24.0, carbs_g: 108.0, salt_g: 6.5, tags: ["資さん", "ごぼ天", "肉"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "ごぼ天うどん", calories: 570, protein_g: 13.0, fat_g: 22.0, carbs_g: 80.0, salt_g: 5.8, tags: ["資さん", "ごぼ天"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "肉うどん", calories: 540, protein_g: 21.0, fat_g: 12.0, carbs_g: 84.0, salt_g: 5.6, tags: ["資さん", "肉"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "かしわうどん", calories: 500, protein_g: 22.0, fat_g: 8.0, carbs_g: 84.0, salt_g: 5.5, tags: ["資さん", "鶏肉"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "きつねうどん", calories: 520, protein_g: 16.0, fat_g: 12.0, carbs_g: 84.0, salt_g: 5.8, tags: ["資さん", "きつね"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "丸天うどん", calories: 540, protein_g: 19.0, fat_g: 16.0, carbs_g: 82.0, salt_g: 5.9, tags: ["資さん", "丸天"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "かけうどん", calories: 330, protein_g: 10.0, fat_g: 2.0, carbs_g: 68.0, salt_g: 5.0, tags: ["資さん", "かけ"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "ぶっかけうどん", calories: 360, protein_g: 11.0, fat_g: 2.0, carbs_g: 73.0, salt_g: 4.0, tags: ["資さん", "ぶっかけ"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "カレーうどん", calories: 650, protein_g: 18.0, fat_g: 18.0, carbs_g: 101.0, salt_g: 6.2, tags: ["資さん", "カレー"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "カツとじ丼", calories: 900, protein_g: 34.0, fat_g: 29.0, carbs_g: 121.0, salt_g: 4.3, tags: ["資さん", "丼", "カツ"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "天丼", calories: 850, protein_g: 22.0, fat_g: 28.0, carbs_g: 125.0, salt_g: 4.2, tags: ["資さん", "丼", "天ぷら"], source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "かしわおにぎり", calories: 220, protein_g: 6.0, fat_g: 3.0, carbs_g: 42.0, salt_g: 1.2, tags: ["資さん", "ご飯", "おにぎり"], serving_label: "1個", source_url: sources.sukesanMenu }),
  chainEstimated({ brand: "資さんうどん", name: "ぼた餅", calories: 210, protein_g: 4.0, fat_g: 2.0, carbs_g: 45.0, salt_g: 0.2, tags: ["資さん", "甘味"], serving_label: "1個", source_url: sources.sukesanMenu }),

  chainEstimated({ brand: "ウエスト", name: "かけうどん", calories: 318, protein_g: 9.0, fat_g: 1.4, carbs_g: 67.0, salt_g: 5.0, tags: ["公式カロリー", "かけ", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "月見うどん", calories: 414, protein_g: 15.0, fat_g: 7.0, carbs_g: 69.0, salt_g: 5.2, tags: ["公式カロリー", "卵", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "わかめうどん", calories: 324, protein_g: 10.0, fat_g: 1.6, carbs_g: 67.0, salt_g: 5.3, tags: ["公式カロリー", "わかめ", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "ごぼう天うどん", calories: 592, protein_g: 13.0, fat_g: 24.0, carbs_g: 82.0, salt_g: 5.8, tags: ["公式カロリー", "ごぼう天", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "きつねうどん", calories: 400, protein_g: 13.0, fat_g: 8.0, carbs_g: 69.0, salt_g: 5.5, tags: ["公式カロリー", "きつね", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "かき揚げうどん", calories: 750, protein_g: 14.0, fat_g: 39.0, carbs_g: 90.0, salt_g: 5.9, tags: ["公式カロリー", "かき揚げ", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "丸天うどん", calories: 604, protein_g: 20.0, fat_g: 20.0, carbs_g: 83.0, salt_g: 5.8, tags: ["公式カロリー", "丸天", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "牛肉うどん", calories: 459, protein_g: 20.0, fat_g: 10.0, carbs_g: 72.0, salt_g: 5.6, tags: ["公式カロリー", "肉", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "海老天うどん", calories: 598, protein_g: 17.0, fat_g: 24.0, carbs_g: 82.0, salt_g: 5.8, tags: ["公式カロリー", "海老天", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "和風カレーうどん", calories: 484, protein_g: 14.0, fat_g: 9.0, carbs_g: 88.0, salt_g: 5.8, tags: ["公式カロリー", "カレー", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "海鮮旨辛うどん", calories: 798, protein_g: 28.0, fat_g: 28.0, carbs_g: 108.0, salt_g: 6.7, tags: ["公式カロリー", "海鮮", "辛い", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "釜玉うどん", calories: 388, protein_g: 15.0, fat_g: 7.0, carbs_g: 66.0, salt_g: 3.9, tags: ["公式カロリー", "釜玉", "卵", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "明太釜玉うどん", calories: 421, protein_g: 17.0, fat_g: 8.0, carbs_g: 70.0, salt_g: 4.4, tags: ["公式カロリー", "釜玉", "明太子", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "カツどん", calories: 1090, protein_g: 35.0, fat_g: 38.0, carbs_g: 143.0, salt_g: 4.6, tags: ["公式カロリー", "丼", "カツ", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "かき揚げ丼", calories: 898, protein_g: 13.0, fat_g: 34.0, carbs_g: 132.0, salt_g: 3.8, tags: ["公式カロリー", "丼", "かき揚げ", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "明太ご飯", calories: 410, protein_g: 8.0, fat_g: 2.0, carbs_g: 88.0, salt_g: 1.8, tags: ["公式カロリー", "ご飯", "明太子", "ウェスト", "WEST"], source_url: sources.westCalories }),
  chainEstimated({ brand: "ウエスト", name: "いなり（一皿）", calories: 294, protein_g: 7.0, fat_g: 8.0, carbs_g: 47.0, salt_g: 1.4, tags: ["公式カロリー", "ご飯", "いなり", "ウェスト", "WEST"], source_url: sources.westCalories }),
];

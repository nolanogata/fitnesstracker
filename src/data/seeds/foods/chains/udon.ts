import { estimatedWithProfileTags, profiledEstimated, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-15T00:00:00.000Z";

const sources = {
  marugameUdon: "https://jp.marugame.com/menu/udon/",
  marugameTempura: "https://jp.marugame.com/menu/tempura/",
  marugameRice: "https://jp.marugame.com/menu/gohanmono/",
  sukesanMenu:
    "https://meocloud-image.s3.ap-northeast-1.amazonaws.com/images/cms/managed/companies/569/20260415184134menu_2026ss01_A1.pdf",
  westMenu: "https://www.shop-west.jp/",
  westCalories: "https://www.shop-west.jp/data/seasonal/178/additional_menu_1.pdf",
};

const westFetchedAt = "2026-07-12T00:00:00.000Z";

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

type WestOfficialCaloriesInput = {
  name: string;
  calories: number;
  tags?: string[];
  serving_label?: string;
  profile?: NutritionEstimateProfile;
};

const inferWestProfile = (input: WestOfficialCaloriesInput): NutritionEstimateProfile => {
  const text = `${input.name} ${(input.tags ?? []).join(" ")}`;
  if (text.includes("セット")) return "riceSetMeal";
  if (text.includes("カレーライス")) return "curryRice";
  if (text.includes("丼")) return "riceBowl";
  if (text.includes("にぎり") || text.includes("葉巻")) return "onigiri";
  if (text.startsWith("MIX")) return "proteinTopping";
  if (text.includes("ご飯")) return "plainRice";
  if (/(天|かき揚げ|磯辺)/.test(text) && !/(うどん|そば|ざる|ぶっかけ)/.test(text)) return "friedSide";
  return "sobaNoodle";
};

const westOfficial = (input: WestOfficialCaloriesInput) =>
  profiledEstimated({
    brand: "ウエスト",
    name: input.name,
    category: "チェーン店",
    tags: ["うどん・そば", "ウエスト", "WEST", "公式メニュー確認", "公式カロリー", "公式サイズのみ", ...(input.tags ?? [])],
    calories: input.calories,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sources.westCalories,
    fetched_at: westFetchedAt,
    profile: input.profile ?? inferWestProfile(input),
  });

const westNoodlePair = ({
  name,
  udon,
  soba,
  tags = [],
}: {
  name: string;
  udon: number;
  soba: number;
  tags?: string[];
}) => [
  westOfficial({ name: `${name}うどん`, calories: udon, serving_label: "1品", tags: ["うどん", ...tags] }),
  westOfficial({ name: `${name}そば`, calories: soba, serving_label: "1品", tags: ["そば", ...tags] }),
];

const westSetVariants = ({
  name,
  udon,
  soba,
  tags = [],
}: {
  name: string;
  udon: readonly [number, number];
  soba: readonly [number, number];
  tags?: string[];
}) => [
  westOfficial({ name: `${name}（温うどん）`, calories: udon[0], serving_label: "1セット", tags: ["うどん", "温", "セット", ...tags] }),
  westOfficial({ name: `${name}（冷うどん）`, calories: udon[1], serving_label: "1セット", tags: ["うどん", "冷", "セット", ...tags] }),
  westOfficial({ name: `${name}（温そば）`, calories: soba[0], serving_label: "1セット", tags: ["そば", "温", "セット", ...tags] }),
  westOfficial({ name: `${name}（冷そば）`, calories: soba[1], serving_label: "1セット", tags: ["そば", "冷", "セット", ...tags] }),
];

// 生そばウエスト メニューカロリー一覧（作成日 2025/02/03）で確認できる公式カロリー。
// 同資料にPFCはないため、PFCはプロフィールに基づく推定として別管理する。
const westOfficialFoods = [
  ...westNoodlePair({ name: "かけ", udon: 318, soba: 344, tags: ["かけ"] }),
  ...westNoodlePair({ name: "月見", udon: 414, soba: 440, tags: ["月見", "卵"] }),
  ...westNoodlePair({ name: "ごぼう天", udon: 463, soba: 489, tags: ["ごぼう天"] }),
  ...westNoodlePair({ name: "丸天", udon: 512, soba: 538, tags: ["丸天"] }),
  ...westNoodlePair({ name: "かき揚げ", udon: 713, soba: 739, tags: ["かき揚げ"] }),
  ...westNoodlePair({ name: "いか天", udon: 580, soba: 606, tags: ["いか天"] }),
  ...westNoodlePair({ name: "山かけ", udon: 348, soba: 374, tags: ["山かけ", "とろろ"] }),
  ...westNoodlePair({ name: "海老天", udon: 561, soba: 587, tags: ["海老天"] }),
  ...westNoodlePair({ name: "牛肉", udon: 459, soba: 485, tags: ["牛肉", "肉"] }),
  ...westNoodlePair({ name: "海鮮旨辛", udon: 761, soba: 787, tags: ["海鮮", "辛い"] }),
  ...westNoodlePair({ name: "ちくわ磯辺", udon: 624, soba: 650, tags: ["ちくわ", "磯辺"] }),
  ...westNoodlePair({ name: "豚肉", udon: 586, soba: 612, tags: ["豚肉", "肉"] }),
  ...westNoodlePair({ name: "豚得", udon: 662, soba: 688, tags: ["豚肉", "肉"] }),
  ...westNoodlePair({ name: "鴨南", udon: 489, soba: 515, tags: ["鴨", "肉"] }),
  ...westNoodlePair({ name: "紅生姜のかき揚げ", udon: 512, soba: 538, tags: ["紅生姜", "かき揚げ"] }),
  ...westNoodlePair({ name: "紅生姜と舞茸のかき揚げ", udon: 697, soba: 723, tags: ["紅生姜", "舞茸", "かき揚げ"] }),
  ...westNoodlePair({ name: "舞茸天", udon: 668, soba: 694, tags: ["舞茸", "天ぷら"] }),
  westOfficial({ name: "牛肉・ごぼう（うどん）", calories: 611, serving_label: "1杯", tags: ["うどん", "牛肉", "ごぼう天", "肉"] }),
  westOfficial({ name: "牛肉・ごぼう（そば）", calories: 637, serving_label: "1杯", tags: ["そば", "牛肉", "ごぼう天", "肉"] }),
  westOfficial({ name: "海老天・月見（うどん）", calories: 664, serving_label: "1杯", tags: ["うどん", "海老天", "月見", "卵"] }),
  westOfficial({ name: "海老天・月見（そば）", calories: 690, serving_label: "1杯", tags: ["そば", "海老天", "月見", "卵"] }),
  westOfficial({ name: "丸天・ごぼう（うどん）", calories: 664, serving_label: "1杯", tags: ["うどん", "丸天", "ごぼう天"] }),
  westOfficial({ name: "丸天・ごぼう（そば）", calories: 690, serving_label: "1杯", tags: ["そば", "丸天", "ごぼう天"] }),

  ...westSetVariants({ name: "かき揚げ丼セット", udon: [998, 1029], soba: [1024, 1018], tags: ["かき揚げ", "丼"] }),
  ...westSetVariants({ name: "いか天丼セット", udon: [801, 832], soba: [826, 820], tags: ["いか天", "丼"] }),
  ...westSetVariants({ name: "山かけ丼セット", udon: [708, 739], soba: [734, 727], tags: ["山かけ", "とろろ", "丼"] }),
  ...westSetVariants({ name: "海老天丼セット", udon: [795, 825], soba: [820, 814], tags: ["海老天", "丼"] }),
  ...westSetVariants({ name: "カレーセット", udon: [872, 903], soba: [898, 892], tags: ["カレー", "丼"] }),
  ...westSetVariants({ name: "玉子丼セット", udon: [668, 699], soba: [727, 721], tags: ["玉子", "卵", "丼"] }),
  ...westSetVariants({ name: "かつ丼セット", udon: [994, 1025], soba: [1020, 1014], tags: ["かつ", "丼"] }),
  ...westSetVariants({ name: "豚玉子とじ丼セット", udon: [894, 925], soba: [919, 913], tags: ["豚肉", "卵", "丼"] }),

  ...westNoodlePair({ name: "おろしぶっかけ", udon: 406, soba: 394, tags: ["ぶっかけ", "おろし"] }),
  ...westNoodlePair({ name: "海老天ぶっかけ", udon: 616, soba: 604, tags: ["ぶっかけ", "海老天"] }),
  ...westNoodlePair({ name: "温玉ぶっかけ", udon: 470, soba: 458, tags: ["ぶっかけ", "温玉", "卵"] }),
  ...westNoodlePair({ name: "豚玉ぶっかけ", udon: 667, soba: 655, tags: ["ぶっかけ", "豚肉", "卵"] }),
  ...westNoodlePair({ name: "豚おろしぶっかけ", udon: 587, soba: 575, tags: ["ぶっかけ", "豚肉", "おろし"] }),

  ...westNoodlePair({ name: "ざる", udon: 328, soba: 316, tags: ["ざる"] }),
  ...westNoodlePair({ name: "天ざる", udon: 752, soba: 740, tags: ["ざる", "天ぷら"] }),
  ...westNoodlePair({ name: "かき揚げ天ざる", udon: 672, soba: 660, tags: ["ざる", "かき揚げ"] }),
  ...westNoodlePair({ name: "野菜天ざる", udon: 694, soba: 682, tags: ["ざる", "野菜天"] }),
  ...westNoodlePair({ name: "紅生姜と舞茸のかき揚げ天ざる", udon: 993, soba: 981, tags: ["ざる", "紅生姜", "舞茸", "かき揚げ"] }),
  ...westNoodlePair({ name: "紅生姜のかき揚げ天ざる", udon: 619, soba: 607, tags: ["ざる", "紅生姜", "かき揚げ"] }),

  westOfficial({ name: "MIX月見", calories: 103, serving_label: "1トッピング", tags: ["トッピング", "月見", "卵"] }),
  westOfficial({ name: "MIXごぼう天", calories: 152, serving_label: "1トッピング", tags: ["トッピング", "ごぼう天"] }),
  westOfficial({ name: "MIX丸天", calories: 201, serving_label: "1トッピング", tags: ["トッピング", "丸天"] }),
  westOfficial({ name: "MIXかき揚げ", calories: 402, serving_label: "1トッピング", tags: ["トッピング", "かき揚げ"] }),
  westOfficial({ name: "MIXいか天", calories: 269, serving_label: "1トッピング", tags: ["トッピング", "いか天"] }),
  westOfficial({ name: "MIX山かけ", calories: 52, serving_label: "1トッピング", tags: ["トッピング", "山かけ", "とろろ"] }),
  westOfficial({ name: "MIX海老天", calories: 250, serving_label: "1トッピング", tags: ["トッピング", "海老天"] }),
  westOfficial({ name: "MIX牛肉", calories: 148, serving_label: "1トッピング", tags: ["トッピング", "牛肉", "肉"] }),
  westOfficial({ name: "MIXちくわ", calories: 313, serving_label: "1トッピング", tags: ["トッピング", "ちくわ"] }),
  westOfficial({ name: "MIX豚肉", calories: 268, serving_label: "1トッピング", tags: ["トッピング", "豚肉", "肉"] }),
  westOfficial({ name: "MIX豚得", calories: 344, serving_label: "1トッピング", tags: ["トッピング", "豚肉", "肉"] }),
  westOfficial({ name: "MIX鴨南", calories: 166, serving_label: "1トッピング", tags: ["トッピング", "鴨", "肉"] }),
  westOfficial({ name: "MIX紅生姜のかき揚げ", calories: 201, serving_label: "1トッピング", tags: ["トッピング", "紅生姜", "かき揚げ"] }),
  westOfficial({ name: "MIX紅生姜と舞茸のかき揚げ", calories: 386, serving_label: "1トッピング", tags: ["トッピング", "紅生姜", "舞茸", "かき揚げ"] }),
  westOfficial({ name: "MIX舞茸", calories: 357, serving_label: "1トッピング", tags: ["トッピング", "舞茸"] }),
  westOfficial({ name: "MIXわかめ", calories: 14, serving_label: "1トッピング", profile: "vegetableSide", tags: ["トッピング", "わかめ"] }),
  westOfficial({ name: "MIX温度玉子", calories: 103, serving_label: "1トッピング", tags: ["トッピング", "温玉", "卵"] }),
  westOfficial({ name: "MIX刻みのり", calories: 12, serving_label: "1トッピング", profile: "vegetableSide", tags: ["トッピング", "のり"] }),

  westOfficial({ name: "ミニかき揚げ丼", calories: 789, serving_label: "1杯", tags: ["ミニ", "丼", "かき揚げ"] }),
  westOfficial({ name: "ミニいか天丼", calories: 506, serving_label: "1杯", tags: ["ミニ", "丼", "いか天"] }),
  westOfficial({ name: "ミニ山かけ丼", calories: 413, serving_label: "1杯", tags: ["ミニ", "丼", "山かけ"] }),
  westOfficial({ name: "ミニ海老天丼", calories: 500, serving_label: "1杯", tags: ["ミニ", "丼", "海老天"] }),
  westOfficial({ name: "ミニ玉子丼", calories: 373, serving_label: "1杯", tags: ["ミニ", "丼", "玉子", "卵"] }),
  westOfficial({ name: "ミニかつ丼", calories: 700, serving_label: "1杯", tags: ["ミニ", "丼", "かつ"] }),
  westOfficial({ name: "ミニ豚玉子とじ丼", calories: 599, serving_label: "1杯", tags: ["ミニ", "丼", "豚肉", "卵"] }),
  westOfficial({ name: "かき揚げ丼", calories: 814, serving_label: "1品", tags: ["丼", "かき揚げ"] }),
  westOfficial({ name: "海老天丼", calories: 573, serving_label: "1杯", tags: ["丼", "海老天"] }),
  westOfficial({ name: "カツどん", calories: 1026, serving_label: "1品", tags: ["丼", "かつ", "かつ丼"] }),
  westOfficial({ name: "カレーライス", calories: 635, serving_label: "1皿", tags: ["カレー", "ご飯"], profile: "curryRice" }),
  westOfficial({ name: "白にぎり一皿", calories: 294, serving_label: "1皿", tags: ["ご飯", "にぎり"] }),
  westOfficial({ name: "高菜葉巻一皿", calories: 406, serving_label: "1皿", tags: ["ご飯", "高菜", "葉巻"] }),
  westOfficial({ name: "白ご飯", calories: 317, serving_label: "1杯", tags: ["ご飯"] }),
  westOfficial({ name: "温そば玉追加", calories: 270, serving_label: "1玉", tags: ["そば", "トッピング", "温"] }),
  westOfficial({ name: "冷そば玉追加", calories: 245, serving_label: "1玉", tags: ["そば", "トッピング", "冷"] }),
];

// 下記は同じ公式カロリー表に掲載がなく、既存記録との参照を保つために推定値として維持する。
const westEstimatedFoods = [
  chainEstimated({ brand: "ウエスト", name: "わかめうどん", calories: 324, protein_g: 10.0, fat_g: 1.6, carbs_g: 67.0, salt_g: 5.3, tags: ["うどん", "わかめ", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "きつねうどん", calories: 400, protein_g: 13.0, fat_g: 8.0, carbs_g: 69.0, salt_g: 5.5, tags: ["うどん", "きつね", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "和風カレーうどん", calories: 484, protein_g: 14.0, fat_g: 9.0, carbs_g: 88.0, salt_g: 5.8, tags: ["うどん", "カレー", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "釜玉うどん", calories: 388, protein_g: 15.0, fat_g: 7.0, carbs_g: 66.0, salt_g: 3.9, tags: ["うどん", "釜玉", "卵", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "明太釜玉うどん", calories: 421, protein_g: 17.0, fat_g: 8.0, carbs_g: 70.0, salt_g: 4.4, tags: ["うどん", "釜玉", "明太子", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "明太ご飯", calories: 410, protein_g: 8.0, fat_g: 2.0, carbs_g: 88.0, salt_g: 1.8, tags: ["ご飯", "明太子", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
  chainEstimated({ brand: "ウエスト", name: "いなり（一皿）", calories: 294, protein_g: 7.0, fat_g: 8.0, carbs_g: 47.0, salt_g: 1.4, tags: ["ご飯", "いなり", "ウエスト", "WEST", "要再確認"], source_url: sources.westMenu }),
];

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

  ...westOfficialFoods,
  ...westEstimatedFoods,
];

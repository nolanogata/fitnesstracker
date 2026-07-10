import { profiledEstimated, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-19T00:00:00.000Z";
const mitaFetchedAt = "2026-06-30T00:00:00.000Z";

const sources = {
  pepperLunch: "https://pepperlunch.com/menu/",
  sharin: "https://tsukemen-sharin.com/menu/",
  mitaSeimen: "https://mita-seimen.com/menu/",
  mitaSeimenAllergen: "https://mita-seimen.com/allergen",
};

type ChainMenuInput = {
  brand: string;
  name: string;
  calories: number;
  salt_g: number;
  serving_label?: string;
  default_meal_type?: "breakfast" | "lunch" | "dinner" | "snack";
  profile: NutritionEstimateProfile;
  tags: string[];
  source_url: string;
  fetched_at?: string;
};

const chainItem = (input: ChainMenuInput) =>
  profiledEstimated({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: [input.brand, "公式メニュー確認", "公式サイズ確認", "公式サイズのみ", "栄養推定", ...input.tags],
    calories: input.calories,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: input.default_meal_type ?? "lunch",
    source_url: input.source_url,
    fetched_at: input.fetched_at ?? fetchedAt,
    profile: input.profile,
  });

const pepperLunchItem = (input: Omit<ChainMenuInput, "brand" | "source_url">) =>
  chainItem({
    ...input,
    brand: "ペッパーランチ",
    source_url: sources.pepperLunch,
    tags: ["ステーキ", "鉄板", ...input.tags],
  });

const sharinItem = (input: Omit<ChainMenuInput, "brand" | "source_url">) =>
  chainItem({
    ...input,
    brand: "舎鈴",
    source_url: sources.sharin,
    serving_label: input.serving_label ?? "1杯",
    tags: ["つけめん", "ラーメン", ...input.tags],
  });

const mitaItem = (input: Omit<ChainMenuInput, "brand" | "source_url">) =>
  chainItem({
    ...input,
    brand: "三田製麺所",
    source_url: sources.mitaSeimen,
    fetched_at: mitaFetchedAt,
    serving_label: input.serving_label ?? "1杯",
    tags: ["つけ麺", "ラーメン", ...input.tags],
  });

const mitaAllergenItem = (input: Omit<ChainMenuInput, "brand" | "source_url">) =>
  chainItem({
    ...input,
    brand: "三田製麺所",
    source_url: sources.mitaSeimenAllergen,
    fetched_at: mitaFetchedAt,
    serving_label: input.serving_label ?? "1品",
    tags: ["アレルゲン表確認", ...input.tags],
  });

const pepperRiceSizes = (input: Omit<ChainMenuInput, "brand" | "source_url">) => [
  { label: "ライスS", calorieDelta: -78 },
  { label: "ライスM", calorieDelta: 0 },
  { label: "ライスL", calorieDelta: 78 },
].map(({ label, calorieDelta }) => pepperLunchItem({
  ...input,
  calories: input.calories + calorieDelta,
  serving_label: label,
  tags: [...input.tags, label],
}));

const sharinSizes = (input: Omit<ChainMenuInput, "brand" | "source_url">) => [
  { label: "小盛 茹で前200g", grams: 200 },
  { label: "並盛 茹で前300g", grams: 300 },
  { label: "大盛 茹で前400g", grams: 400 },
  { label: "特盛 茹で前500g", grams: 500 },
].map(({ label, grams }) => sharinItem({
  ...input,
  calories: Math.max(0, Math.round(input.calories + (grams - 300) * 3.5)),
  serving_label: label,
  tags: [...input.tags, label],
}));

const mitaSizes = (input: Omit<ChainMenuInput, "brand" | "source_url">) => [
  { label: "小 茹で上がり240g", grams: 240 },
  { label: "並 茹で上がり320g", grams: 320 },
  { label: "中 茹で上がり480g", grams: 480 },
  { label: "大 茹で上がり640g", grams: 640 },
  { label: "特大 茹で上がり800g", grams: 800 },
].map(({ label, grams }) => mitaItem({
  ...input,
  calories: Math.max(0, Math.round(input.calories + (grams - 320) * 1.5)),
  serving_label: label,
  tags: [...input.tags, label],
}));

export const pepperLunchTsukemenMenuFoods = [
  ...pepperRiceSizes({ name: "ビーフペッパーライス お肉普通", calories: 650, salt_g: 2.6, profile: "pepperRice", tags: ["ペッパーライス", "牛肉"] }),
  ...pepperRiceSizes({ name: "ビーフペッパーライス お肉大盛", calories: 790, salt_g: 3.0, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "大盛"] }),
  ...pepperRiceSizes({ name: "ビーフペッパーライス お肉特盛", calories: 920, salt_g: 3.4, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "特盛"] }),
  ...pepperRiceSizes({ name: "MEGAビーフペッパーライス", calories: 1180, salt_g: 4.5, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "MEGA"] }),
  ...pepperRiceSizes({ name: "牛カルビキムチーズペッパーライス", calories: 890, salt_g: 4.0, profile: "pepperRice", tags: ["ペッパーライス", "カルビ", "キムチ", "チーズ"] }),
  ...pepperRiceSizes({ name: "ブロッコリーチキンペッパーライス", calories: 720, salt_g: 3.1, profile: "pepperRice", tags: ["ペッパーライス", "チキン", "ブロッコリー"] }),
  pepperLunchItem({ name: "ワイルドジューシーステーキ", calories: 760, salt_g: 2.3, profile: "steakPlate", tags: ["ステーキ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カットステーキ", calories: 620, salt_g: 2.0, profile: "steakPlate", tags: ["ステーキ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カルビ＆カットステーキ", calories: 890, salt_g: 3.2, profile: "steakPlate", tags: ["ステーキ", "カルビ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カルビ＆ステーキ", calories: 980, salt_g: 3.4, profile: "steakPlate", tags: ["ステーキ", "カルビ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "ハンバーグステーキ 目玉焼き付き", calories: 720, salt_g: 3.0, profile: "hamburgerPlate", tags: ["ハンバーグ", "目玉焼き"], serving_label: "1皿" }),
  pepperLunchItem({ name: "肉塊ハンバーグ 目玉焼き付き", calories: 820, salt_g: 3.3, profile: "hamburgerPlate", tags: ["ハンバーグ", "目玉焼き"], serving_label: "1皿" }),
  pepperLunchItem({ name: "ダブル 肉塊ハンバーグ", calories: 1060, salt_g: 4.6, profile: "hamburgerPlate", tags: ["ハンバーグ", "ダブル"], serving_label: "1皿" }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(彩り野菜)", calories: 780, salt_g: 4.2, profile: "curryRice", tags: ["カレー", "野菜"] }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(ハンバーグ)", calories: 980, salt_g: 5.0, profile: "curryRice", tags: ["カレー", "ハンバーグ"] }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(ステーキ)", calories: 1020, salt_g: 5.0, profile: "curryRice", tags: ["カレー", "ステーキ"] }),
  pepperLunchItem({ name: "ライス", calories: 234, salt_g: 0, profile: "plainRice", tags: ["ライス", "ご飯"], serving_label: "S" }),
  pepperLunchItem({ name: "ライス", calories: 312, salt_g: 0, profile: "plainRice", tags: ["ライス", "ご飯"], serving_label: "M" }),
  pepperLunchItem({ name: "ライス", calories: 390, salt_g: 0, profile: "plainRice", tags: ["ライス", "ご飯"], serving_label: "L" }),
  pepperLunchItem({ name: "ガーリックチップ", calories: 35, salt_g: 0.1, profile: "friedSide", tags: ["トッピング", "ガーリック"] }),
  pepperLunchItem({ name: "オニオンソース", calories: 45, salt_g: 0.8, profile: "vegetableSide", tags: ["トッピング", "ソース"] }),
  pepperLunchItem({ name: "目玉焼き", calories: 83, salt_g: 0.2, profile: "proteinTopping", tags: ["トッピング", "卵"] }),
  pepperLunchItem({ name: "ブロッコリー", calories: 18, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  pepperLunchItem({ name: "さつまいも", calories: 65, salt_g: 0, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  pepperLunchItem({ name: "もやし", calories: 18, salt_g: 0.2, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  pepperLunchItem({ name: "ほうれん草", calories: 25, salt_g: 0.2, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  pepperLunchItem({ name: "コーン", calories: 55, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  pepperLunchItem({ name: "キムチ", calories: 30, salt_g: 1.1, profile: "vegetableSide", tags: ["トッピング", "キムチ"] }),
  pepperLunchItem({ name: "クワトロチーズ", calories: 145, salt_g: 0.8, profile: "dairy", tags: ["トッピング", "チーズ"] }),
  pepperLunchItem({ name: "カットステーキ", calories: 145, salt_g: 0.5, profile: "proteinTopping", tags: ["トッピング", "牛肉"], serving_label: "60g" }),

  ...sharinSizes({ name: "つけめん", calories: 850, salt_g: 6.0, profile: "tsukemen", tags: ["魚介豚骨"] }),
  ...sharinSizes({ name: "味玉つけめん", calories: 930, salt_g: 6.5, profile: "tsukemen", tags: ["魚介豚骨", "味玉"] }),
  ...sharinSizes({ name: "特製つけめん", calories: 1080, salt_g: 7.2, profile: "tsukemen", tags: ["魚介豚骨", "特製", "味玉", "チャーシュー"] }),
  ...sharinSizes({ name: "担々つけめん", calories: 980, salt_g: 7.0, profile: "tsukemen", tags: ["担々", "辛い"] }),
  ...sharinSizes({ name: "創業つけめん", calories: 900, salt_g: 6.4, profile: "tsukemen", tags: ["魚介豚骨", "創業"] }),
  ...sharinSizes({ name: "創業味玉つけめん", calories: 980, salt_g: 6.9, profile: "tsukemen", tags: ["魚介豚骨", "創業", "味玉"] }),
  ...sharinSizes({ name: "創業チャーシューつけめん", calories: 1120, salt_g: 7.5, profile: "tsukemen", tags: ["魚介豚骨", "創業", "チャーシュー"] }),
  sharinItem({ name: "らーめん", calories: 720, salt_g: 6.2, profile: "ramen", tags: ["ラーメン"] }),
  sharinItem({ name: "味玉らーめん", calories: 800, salt_g: 6.6, profile: "ramen", tags: ["ラーメン", "味玉"] }),
  sharinItem({ name: "特製らーめん", calories: 940, salt_g: 7.3, profile: "ramen", tags: ["ラーメン", "特製", "味玉", "チャーシュー"] }),
  sharinItem({ name: "特製盛り", calories: 210, salt_g: 1.2, profile: "proteinTopping", tags: ["トッピング", "味玉", "チャーシュー"], serving_label: "1皿" }),
  sharinItem({ name: "ぎょうざ", calories: 280, salt_g: 1.7, profile: "gyoza", tags: ["餃子", "サイド"], serving_label: "1皿" }),
  sharinItem({ name: "チャーシュー", calories: 160, salt_g: 1.0, profile: "proteinTopping", tags: ["トッピング", "チャーシュー"] }),
  sharinItem({ name: "味玉", calories: 80, salt_g: 0.5, profile: "proteinTopping", tags: ["トッピング", "卵"] }),
  sharinItem({ name: "のり", calories: 10, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "海苔"] }),
  sharinItem({ name: "メンマ", calories: 35, salt_g: 0.8, profile: "vegetableSide", tags: ["トッピング", "メンマ"] }),
  sharinItem({ name: "ほうれん草", calories: 15, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "野菜"] }),
  sharinItem({ name: "ねぎ増し", calories: 20, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "ねぎ"] }),
  sharinItem({ name: "ライス", calories: 250, salt_g: 0, profile: "plainRice", tags: ["サイド", "ご飯"] }),
  sharinItem({ name: "チャーハン", calories: 560, salt_g: 3.0, profile: "friedRice", tags: ["サイド", "ご飯"] }),
  sharinItem({ name: "チャーシュー丼", calories: 470, salt_g: 2.2, profile: "riceBowl", tags: ["サイド", "ご飯", "チャーシュー"] }),
  sharinItem({ name: "ネギチャーシュー丼", calories: 490, salt_g: 2.4, profile: "riceBowl", tags: ["サイド", "ご飯", "チャーシュー", "ねぎ"] }),
  sharinItem({ name: "味玉丼", calories: 390, salt_g: 1.7, profile: "riceBowl", tags: ["サイド", "ご飯", "味玉"] }),
  sharinItem({ name: "担々丼", calories: 460, salt_g: 2.2, profile: "riceBowl", tags: ["サイド", "ご飯", "担々"] }),

  ...mitaSizes({ name: "つけ麺", calories: 880, salt_g: 6.4, profile: "tsukemen", tags: ["魚介豚骨"] }),
  ...mitaSizes({ name: "辛つけ麺", calories: 930, salt_g: 6.8, profile: "tsukemen", tags: ["辛い", "魚介豚骨"] }),
  ...mitaSizes({ name: "全部のせつけ麺", calories: 1130, salt_g: 7.5, profile: "tsukemen", tags: ["全部のせ", "味玉", "チャーシュー", "メンマ"] }),
  ...mitaSizes({ name: "特濃つけ麺", calories: 980, salt_g: 7.0, profile: "tsukemen", tags: ["特濃", "魚介豚骨"] }),
  ...mitaSizes({ name: "特濃辛つけ麺", calories: 1030, salt_g: 7.4, profile: "tsukemen", tags: ["特濃", "辛い"] }),
  ...mitaSizes({ name: "全部のせ特濃つけ麺", calories: 1230, salt_g: 8.0, profile: "tsukemen", tags: ["特濃", "全部のせ", "味玉", "チャーシュー"] }),
  mitaItem({ name: "中華そば", calories: 760, salt_g: 6.3, profile: "ramen", tags: ["中華そば"] }),
  mitaItem({ name: "特製中華そば", calories: 930, salt_g: 7.1, profile: "ramen", tags: ["中華そば", "特製", "味玉", "チャーシュー"] }),
  ...mitaSizes({ name: "鯛だし塩つけ麺", calories: 820, salt_g: 6.1, profile: "tsukemen", tags: ["鯛だし", "塩"] }),
  mitaItem({ name: "油そば", calories: 830, salt_g: 5.8, profile: "ramen", tags: ["油そば"] }),
  mitaItem({ name: "辛味噌油そば", calories: 900, salt_g: 6.3, profile: "ramen", tags: ["油そば", "辛味噌", "辛い"] }),
  mitaItem({ name: "唐揚げ", calories: 360, salt_g: 1.8, profile: "friedSide", tags: ["唐揚げ", "サイド"], serving_label: "1皿" }),
  mitaItem({ name: "鶏皮串", calories: 180, salt_g: 1.0, profile: "friedSide", tags: ["鶏皮", "串", "サイド"], serving_label: "1本" }),
  mitaItem({ name: "肉ねぎ飯", calories: 470, salt_g: 2.2, profile: "riceBowl", tags: ["ご飯物", "チャーシュー", "ねぎ"], serving_label: "1杯" }),
  mitaItem({ name: "ねぎ飯", calories: 320, salt_g: 1.4, profile: "riceBowl", tags: ["ご飯物", "ねぎ"], serving_label: "1杯" }),
  mitaItem({ name: "明太子飯", calories: 360, salt_g: 1.8, profile: "riceBowl", tags: ["ご飯物", "明太子"], serving_label: "1杯" }),
  mitaItem({ name: "ライス", calories: 250, salt_g: 0.0, profile: "plainRice", tags: ["ご飯物", "白米"], serving_label: "1杯" }),
  mitaItem({ name: "黒チャーハン", calories: 560, salt_g: 3.0, profile: "friedRice", tags: ["チャーハン", "サイド"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "全部のせ", calories: 250, salt_g: 1.4, profile: "proteinTopping", tags: ["トッピング", "味玉", "チャーシュー", "メンマ", "のり"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "味付き玉子", calories: 80, salt_g: 0.5, profile: "proteinTopping", tags: ["トッピング", "味玉", "卵"], serving_label: "1個" }),
  mitaAllergenItem({ name: "生玉子", calories: 76, salt_g: 0.2, profile: "proteinTopping", tags: ["トッピング", "卵"], serving_label: "1個" }),
  mitaAllergenItem({ name: "ねぎ", calories: 20, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "ねぎ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "野菜盛り", calories: 80, salt_g: 0.4, profile: "vegetableSide", tags: ["トッピング", "野菜"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "チャーシュー", calories: 160, salt_g: 1.0, profile: "proteinTopping", tags: ["トッピング", "チャーシュー"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "メンマ", calories: 35, salt_g: 0.8, profile: "vegetableSide", tags: ["トッピング", "メンマ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "薬味ねぎ", calories: 10, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "ねぎ", "薬味"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "のり", calories: 10, salt_g: 0.1, profile: "vegetableSide", tags: ["トッピング", "海苔"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "バラのり", calories: 20, salt_g: 0.3, profile: "vegetableSide", tags: ["トッピング", "海苔"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "辛味増し", calories: 30, salt_g: 0.8, profile: "vegetableSide", tags: ["トッピング", "辛い"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "魚粉", calories: 25, salt_g: 0.4, profile: "proteinTopping", tags: ["トッピング", "魚粉"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "チャーマヨ飯", calories: 470, salt_g: 2.1, profile: "riceBowl", tags: ["ご飯物", "チャーシュー", "マヨ"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "炙りチャーマヨ飯", calories: 500, salt_g: 2.3, profile: "riceBowl", tags: ["ご飯物", "チャーシュー", "マヨ", "炙り"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "しらす飯", calories: 350, salt_g: 1.8, profile: "sushiRiceBowl", tags: ["ご飯物", "しらす"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "極み卵かけご飯", calories: 420, salt_g: 1.3, profile: "riceBowl", tags: ["ご飯物", "卵かけご飯", "卵"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "台湾飯", calories: 520, salt_g: 2.4, profile: "riceBowl", tags: ["ご飯物", "台湾", "ピリ辛"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "チキンカツ丼", calories: 780, salt_g: 3.2, profile: "riceBowl", tags: ["ご飯物", "チキンカツ", "丼"], serving_label: "1杯" }),
  mitaAllergenItem({ name: "チキンカツ定食", calories: 980, salt_g: 4.0, profile: "meatSetMeal", tags: ["定食", "チキンカツ"], serving_label: "1食" }),
  mitaAllergenItem({ name: "唐揚げ定食", calories: 920, salt_g: 3.8, profile: "meatSetMeal", tags: ["定食", "唐揚げ"], serving_label: "1食" }),
  mitaAllergenItem({ name: "からポテ", calories: 520, salt_g: 2.4, profile: "friedSide", tags: ["一品", "唐揚げ", "ポテト"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "ポテト", calories: 320, salt_g: 1.2, profile: "fries", tags: ["一品", "ポテト"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "枝豆", calories: 130, salt_g: 0.6, profile: "vegetableSide", tags: ["一品", "枝豆", "おつまみ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "玉子＆メンマ", calories: 120, salt_g: 1.1, profile: "proteinTopping", tags: ["一品", "卵", "メンマ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "餃子", calories: 300, salt_g: 1.8, profile: "gyoza", tags: ["一品", "餃子"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "三田流餃子", calories: 330, salt_g: 2.0, profile: "gyoza", tags: ["一品", "餃子"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "おつまみ３点盛り", calories: 260, salt_g: 2.0, profile: "proteinTopping", tags: ["一品", "おつまみ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "おつまみルーロー", calories: 280, salt_g: 1.8, profile: "proteinTopping", tags: ["一品", "ルーロー", "おつまみ"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "甘辛レバー揚げ", calories: 260, salt_g: 1.6, profile: "friedSide", tags: ["一品", "レバー", "揚げ物"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "たこ焼き", calories: 330, salt_g: 1.8, profile: "konamono", tags: ["一品", "たこ焼き"], serving_label: "1皿" }),
  mitaAllergenItem({ name: "チョリソー", calories: 260, salt_g: 1.9, profile: "proteinTopping", tags: ["一品", "ソーセージ", "おつまみ"], serving_label: "1皿" }),
];

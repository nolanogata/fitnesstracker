import { profiledEstimated, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-19T00:00:00.000Z";

const sources = {
  pepperLunch: "https://pepperlunch.com/menu/",
  sharin: "https://tsukemen-sharin.com/menu/",
  mitaSeimen: "https://mita-seimen.com/menu/",
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
};

const chainItem = (input: ChainMenuInput) =>
  profiledEstimated({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: [input.brand, "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: input.default_meal_type ?? "lunch",
    source_url: input.source_url,
    fetched_at: fetchedAt,
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
    serving_label: input.serving_label ?? "1杯",
    tags: ["つけ麺", "ラーメン", ...input.tags],
  });

export const pepperLunchTsukemenMenuFoods = [
  pepperLunchItem({ name: "ビーフペッパーライス お肉普通", calories: 650, salt_g: 2.6, profile: "pepperRice", tags: ["ペッパーライス", "牛肉"] }),
  pepperLunchItem({ name: "ビーフペッパーライス お肉大盛", calories: 790, salt_g: 3.0, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "大盛"] }),
  pepperLunchItem({ name: "ビーフペッパーライス お肉特盛", calories: 920, salt_g: 3.4, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "特盛"] }),
  pepperLunchItem({ name: "MEGAビーフペッパーライス", calories: 1180, salt_g: 4.5, profile: "pepperRice", tags: ["ペッパーライス", "牛肉", "MEGA"] }),
  pepperLunchItem({ name: "牛カルビキムチーズペッパーライス", calories: 890, salt_g: 4.0, profile: "pepperRice", tags: ["ペッパーライス", "カルビ", "キムチ", "チーズ"] }),
  pepperLunchItem({ name: "ブロッコリーチキンペッパーライス", calories: 720, salt_g: 3.1, profile: "pepperRice", tags: ["ペッパーライス", "チキン", "ブロッコリー"] }),
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

  sharinItem({ name: "つけめん", calories: 850, salt_g: 6.0, profile: "tsukemen", tags: ["魚介豚骨"] }),
  sharinItem({ name: "特製つけめん", calories: 1080, salt_g: 7.2, profile: "tsukemen", tags: ["魚介豚骨", "特製", "味玉", "チャーシュー"] }),
  sharinItem({ name: "担々つけめん", calories: 980, salt_g: 7.0, profile: "tsukemen", tags: ["担々", "辛い"] }),
  sharinItem({ name: "創業つけめん", calories: 900, salt_g: 6.4, profile: "tsukemen", tags: ["魚介豚骨", "創業"] }),
  sharinItem({ name: "らーめん", calories: 720, salt_g: 6.2, profile: "ramen", tags: ["ラーメン"] }),
  sharinItem({ name: "味玉らーめん", calories: 800, salt_g: 6.6, profile: "ramen", tags: ["ラーメン", "味玉"] }),
  sharinItem({ name: "特製らーめん", calories: 940, salt_g: 7.3, profile: "ramen", tags: ["ラーメン", "特製", "味玉", "チャーシュー"] }),
  sharinItem({ name: "特製盛り", calories: 210, salt_g: 1.2, profile: "proteinTopping", tags: ["トッピング", "味玉", "チャーシュー"], serving_label: "1皿" }),
  sharinItem({ name: "ぎょうざ", calories: 280, salt_g: 1.7, profile: "gyoza", tags: ["餃子", "サイド"], serving_label: "1皿" }),

  mitaItem({ name: "つけ麺", calories: 880, salt_g: 6.4, profile: "tsukemen", tags: ["魚介豚骨"] }),
  mitaItem({ name: "辛つけ麺", calories: 930, salt_g: 6.8, profile: "tsukemen", tags: ["辛い", "魚介豚骨"] }),
  mitaItem({ name: "全部のせつけ麺", calories: 1130, salt_g: 7.5, profile: "tsukemen", tags: ["全部のせ", "味玉", "チャーシュー", "メンマ"] }),
  mitaItem({ name: "特濃つけ麺", calories: 980, salt_g: 7.0, profile: "tsukemen", tags: ["特濃", "魚介豚骨"] }),
  mitaItem({ name: "特濃辛つけ麺", calories: 1030, salt_g: 7.4, profile: "tsukemen", tags: ["特濃", "辛い"] }),
  mitaItem({ name: "全部のせ特濃つけ麺", calories: 1230, salt_g: 8.0, profile: "tsukemen", tags: ["特濃", "全部のせ", "味玉", "チャーシュー"] }),
  mitaItem({ name: "中華そば", calories: 760, salt_g: 6.3, profile: "ramen", tags: ["中華そば"] }),
  mitaItem({ name: "特製中華そば", calories: 930, salt_g: 7.1, profile: "ramen", tags: ["中華そば", "特製", "味玉", "チャーシュー"] }),
  mitaItem({ name: "鯛だし塩つけ麺", calories: 820, salt_g: 6.1, profile: "tsukemen", tags: ["鯛だし", "塩"] }),
  mitaItem({ name: "唐揚げ", calories: 360, salt_g: 1.8, profile: "friedSide", tags: ["唐揚げ", "サイド"], serving_label: "1皿" }),
  mitaItem({ name: "黒チャーハン", calories: 560, salt_g: 3.0, profile: "friedRice", tags: ["チャーハン", "サイド"], serving_label: "1皿" }),
];

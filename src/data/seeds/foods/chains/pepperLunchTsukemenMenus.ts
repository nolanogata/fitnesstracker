import { estimated } from "../helpers";

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
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label?: string;
  default_meal_type?: "breakfast" | "lunch" | "dinner" | "snack";
  tags: string[];
  source_url: string;
};

const chainItem = (input: ChainMenuInput) =>
  estimated({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: [input.brand, "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: input.default_meal_type ?? "lunch",
    source_url: input.source_url,
    fetched_at: fetchedAt,
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
  pepperLunchItem({ name: "ビーフペッパーライス お肉普通", calories: 650, protein_g: 22, fat_g: 22, carbs_g: 88, salt_g: 2.6, tags: ["ペッパーライス", "牛肉"] }),
  pepperLunchItem({ name: "ビーフペッパーライス お肉大盛", calories: 790, protein_g: 31, fat_g: 32, carbs_g: 92, salt_g: 3.0, tags: ["ペッパーライス", "牛肉", "大盛"] }),
  pepperLunchItem({ name: "ビーフペッパーライス お肉特盛", calories: 920, protein_g: 40, fat_g: 42, carbs_g: 96, salt_g: 3.4, tags: ["ペッパーライス", "牛肉", "特盛"] }),
  pepperLunchItem({ name: "MEGAビーフペッパーライス", calories: 1180, protein_g: 55, fat_g: 55, carbs_g: 116, salt_g: 4.5, tags: ["ペッパーライス", "牛肉", "MEGA"] }),
  pepperLunchItem({ name: "牛カルビキムチーズペッパーライス", calories: 890, protein_g: 34, fat_g: 38, carbs_g: 101, salt_g: 4.0, tags: ["ペッパーライス", "カルビ", "キムチ", "チーズ"] }),
  pepperLunchItem({ name: "ブロッコリーチキンペッパーライス", calories: 720, protein_g: 36, fat_g: 22, carbs_g: 92, salt_g: 3.1, tags: ["ペッパーライス", "チキン", "ブロッコリー"] }),
  pepperLunchItem({ name: "ワイルドジューシーステーキ", calories: 760, protein_g: 49, fat_g: 54, carbs_g: 10, salt_g: 2.3, tags: ["ステーキ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カットステーキ", calories: 620, protein_g: 44, fat_g: 42, carbs_g: 8, salt_g: 2.0, tags: ["ステーキ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カルビ＆カットステーキ", calories: 890, protein_g: 48, fat_g: 64, carbs_g: 18, salt_g: 3.2, tags: ["ステーキ", "カルビ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "カルビ＆ステーキ", calories: 980, protein_g: 52, fat_g: 72, carbs_g: 18, salt_g: 3.4, tags: ["ステーキ", "カルビ", "牛肉"], serving_label: "1皿" }),
  pepperLunchItem({ name: "ハンバーグステーキ 目玉焼き付き", calories: 720, protein_g: 32, fat_g: 48, carbs_g: 35, salt_g: 3.0, tags: ["ハンバーグ", "目玉焼き"], serving_label: "1皿" }),
  pepperLunchItem({ name: "肉塊ハンバーグ 目玉焼き付き", calories: 820, protein_g: 38, fat_g: 56, carbs_g: 34, salt_g: 3.3, tags: ["ハンバーグ", "目玉焼き"], serving_label: "1皿" }),
  pepperLunchItem({ name: "ダブル 肉塊ハンバーグ", calories: 1060, protein_g: 58, fat_g: 76, carbs_g: 36, salt_g: 4.6, tags: ["ハンバーグ", "ダブル"], serving_label: "1皿" }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(彩り野菜)", calories: 780, protein_g: 18, fat_g: 28, carbs_g: 112, salt_g: 4.2, tags: ["カレー", "野菜"] }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(ハンバーグ)", calories: 980, protein_g: 36, fat_g: 48, carbs_g: 106, salt_g: 5.0, tags: ["カレー", "ハンバーグ"] }),
  pepperLunchItem({ name: "沸騰ぐつぐつ焼カレー(ステーキ)", calories: 1020, protein_g: 46, fat_g: 48, carbs_g: 105, salt_g: 5.0, tags: ["カレー", "ステーキ"] }),

  sharinItem({ name: "つけめん", calories: 850, protein_g: 29, fat_g: 18, carbs_g: 139, salt_g: 6.0, tags: ["魚介豚骨"] }),
  sharinItem({ name: "特製つけめん", calories: 1080, protein_g: 45, fat_g: 34, carbs_g: 145, salt_g: 7.2, tags: ["魚介豚骨", "特製", "味玉", "チャーシュー"] }),
  sharinItem({ name: "担々つけめん", calories: 980, protein_g: 34, fat_g: 38, carbs_g: 124, salt_g: 7.0, tags: ["担々", "辛い"] }),
  sharinItem({ name: "創業つけめん", calories: 900, protein_g: 31, fat_g: 22, carbs_g: 141, salt_g: 6.4, tags: ["魚介豚骨", "創業"] }),
  sharinItem({ name: "らーめん", calories: 720, protein_g: 26, fat_g: 22, carbs_g: 103, salt_g: 6.2, tags: ["ラーメン"] }),
  sharinItem({ name: "味玉らーめん", calories: 800, protein_g: 33, fat_g: 28, carbs_g: 104, salt_g: 6.6, tags: ["ラーメン", "味玉"] }),
  sharinItem({ name: "特製らーめん", calories: 940, protein_g: 43, fat_g: 38, carbs_g: 107, salt_g: 7.3, tags: ["ラーメン", "特製", "味玉", "チャーシュー"] }),
  sharinItem({ name: "特製盛り", calories: 210, protein_g: 15, fat_g: 14, carbs_g: 6, salt_g: 1.2, tags: ["トッピング", "味玉", "チャーシュー"], serving_label: "1皿" }),
  sharinItem({ name: "ぎょうざ", calories: 280, protein_g: 10, fat_g: 13, carbs_g: 30, salt_g: 1.7, tags: ["餃子", "サイド"], serving_label: "1皿" }),

  mitaItem({ name: "つけ麺", calories: 880, protein_g: 30, fat_g: 20, carbs_g: 142, salt_g: 6.4, tags: ["魚介豚骨"] }),
  mitaItem({ name: "辛つけ麺", calories: 930, protein_g: 31, fat_g: 25, carbs_g: 143, salt_g: 6.8, tags: ["辛い", "魚介豚骨"] }),
  mitaItem({ name: "全部のせつけ麺", calories: 1130, protein_g: 48, fat_g: 38, carbs_g: 148, salt_g: 7.5, tags: ["全部のせ", "味玉", "チャーシュー", "メンマ"] }),
  mitaItem({ name: "特濃つけ麺", calories: 980, protein_g: 34, fat_g: 30, carbs_g: 140, salt_g: 7.0, tags: ["特濃", "魚介豚骨"] }),
  mitaItem({ name: "特濃辛つけ麺", calories: 1030, protein_g: 35, fat_g: 35, carbs_g: 140, salt_g: 7.4, tags: ["特濃", "辛い"] }),
  mitaItem({ name: "全部のせ特濃つけ麺", calories: 1230, protein_g: 52, fat_g: 48, carbs_g: 146, salt_g: 8.0, tags: ["特濃", "全部のせ", "味玉", "チャーシュー"] }),
  mitaItem({ name: "中華そば", calories: 760, protein_g: 27, fat_g: 24, carbs_g: 108, salt_g: 6.3, tags: ["中華そば"] }),
  mitaItem({ name: "特製中華そば", calories: 930, protein_g: 42, fat_g: 36, carbs_g: 111, salt_g: 7.1, tags: ["中華そば", "特製", "味玉", "チャーシュー"] }),
  mitaItem({ name: "鯛だし塩つけ麺", calories: 820, protein_g: 28, fat_g: 18, carbs_g: 132, salt_g: 6.1, tags: ["鯛だし", "塩"] }),
  mitaItem({ name: "唐揚げ", calories: 360, protein_g: 22, fat_g: 22, carbs_g: 18, salt_g: 1.8, tags: ["唐揚げ", "サイド"], serving_label: "1皿" }),
  mitaItem({ name: "黒チャーハン", calories: 560, protein_g: 14, fat_g: 18, carbs_g: 86, salt_g: 3.0, tags: ["チャーハン", "サイド"], serving_label: "1皿" }),
];

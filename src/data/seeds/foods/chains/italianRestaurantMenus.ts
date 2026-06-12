import { estimated } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sources = {
  カプリチョーザ: "https://capricciosa.com/menu/",
  マンマパスタ: "https://www.giraud.co.jp/mamma",
  オリーブの丘: "https://www.olivenooka.jp/menu/index.html",
} as const;

type ItalianRestaurantMenu = {
  brand: keyof typeof sources;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
};

const item = (input: ItalianRestaurantMenu) =>
  estimated({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["イタリアン", input.brand, "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sources[input.brand],
    fetched_at: fetchedAt,
  });

export const italianRestaurantMenuFoods = [
  item({ brand: "カプリチョーザ", name: "トマトとニンニク", calories: 760, protein_g: 21, fat_g: 25, carbs_g: 111, salt_g: 3.4, tags: ["パスタ", "トマト"] }),
  item({ brand: "カプリチョーザ", name: "トマトとニンニク ダブルサイズ", calories: 1520, protein_g: 42, fat_g: 50, carbs_g: 222, salt_g: 6.8, tags: ["パスタ", "トマト", "大盛り"], serving_label: "2-3人前" }),
  item({ brand: "カプリチョーザ", name: "ペスカトーレ 漁師風トマトソース", calories: 820, protein_g: 34, fat_g: 22, carbs_g: 118, salt_g: 4.0, tags: ["パスタ", "海鮮", "トマト"] }),
  item({ brand: "カプリチョーザ", name: "渡り蟹のトマトクリーム", calories: 860, protein_g: 31, fat_g: 34, carbs_g: 104, salt_g: 3.8, tags: ["パスタ", "蟹", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "カルボナーラ", calories: 890, protein_g: 30, fat_g: 42, carbs_g: 92, salt_g: 3.5, tags: ["パスタ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "揚げ茄子とほうれん草のミートソース田舎風", calories: 880, protein_g: 30, fat_g: 34, carbs_g: 108, salt_g: 3.6, tags: ["パスタ", "ミートソース", "野菜"] }),
  item({ brand: "カプリチョーザ", name: "黒胡椒を効かせたあさりのスープ仕立て", calories: 640, protein_g: 24, fat_g: 16, carbs_g: 98, salt_g: 4.6, tags: ["パスタ", "あさり", "スープ"] }),
  item({ brand: "カプリチョーザ", name: "イカスミ", calories: 780, protein_g: 26, fat_g: 25, carbs_g: 108, salt_g: 3.8, tags: ["パスタ", "イカスミ"] }),
  item({ brand: "カプリチョーザ", name: "魚介とたらこのクリームソース", calories: 920, protein_g: 33, fat_g: 38, carbs_g: 106, salt_g: 4.2, tags: ["パスタ", "魚介", "たらこ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "トマトとニンニクとモッツァレラ", calories: 860, protein_g: 30, fat_g: 34, carbs_g: 110, salt_g: 3.7, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "イタリア産カラスミと魚介のペペロンチーノ", calories: 800, protein_g: 31, fat_g: 30, carbs_g: 102, salt_g: 4.3, tags: ["パスタ", "魚介", "ペペロンチーノ"] }),
  item({ brand: "カプリチョーザ", name: "ペンネアラビアータ", calories: 700, protein_g: 20, fat_g: 20, carbs_g: 106, salt_g: 3.8, tags: ["パスタ", "ペンネ", "辛い"] }),
  item({ brand: "カプリチョーザ", name: "ガーリックトースト", calories: 310, protein_g: 8, fat_g: 14, carbs_g: 38, salt_g: 1.6, tags: ["前菜", "パン"] }),
  item({ brand: "カプリチョーザ", name: "イカのリング揚げ", calories: 540, protein_g: 24, fat_g: 30, carbs_g: 42, salt_g: 2.5, tags: ["前菜", "揚げ物", "イカ"] }),
  item({ brand: "カプリチョーザ", name: "イカとツナのサラダ", calories: 380, protein_g: 25, fat_g: 25, carbs_g: 12, salt_g: 2.2, tags: ["サラダ", "イカ", "ツナ"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザのシーザーサラダ", calories: 430, protein_g: 16, fat_g: 32, carbs_g: 18, salt_g: 2.5, tags: ["サラダ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "たっぷり野菜と挽き肉のミネストローネ", calories: 260, protein_g: 12, fat_g: 10, carbs_g: 30, salt_g: 2.4, tags: ["スープ", "野菜"] }),
  item({ brand: "カプリチョーザ", name: "コーンクリームスープ", calories: 300, protein_g: 8, fat_g: 16, carbs_g: 32, salt_g: 1.8, tags: ["スープ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "ラザニアのミートクリームグラタン", calories: 780, protein_g: 32, fat_g: 40, carbs_g: 70, salt_g: 3.6, tags: ["グラタン", "ラザニア"] }),
  item({ brand: "カプリチョーザ", name: "マルゲリータ モッツァレラチーズとバジリコ", calories: 820, protein_g: 32, fat_g: 34, carbs_g: 98, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "カルネミスト ベーコンとソーセージ", calories: 940, protein_g: 38, fat_g: 46, carbs_g: 96, salt_g: 4.8, tags: ["ピザ", "肉"] }),
  item({ brand: "カプリチョーザ", name: "マリナーラ 魚介のトマトソース", calories: 880, protein_g: 36, fat_g: 34, carbs_g: 104, salt_g: 4.5, tags: ["ピザ", "海鮮"] }),
  item({ brand: "カプリチョーザ", name: "クアトロ・フォルマッジ 4種のチーズ", calories: 980, protein_g: 38, fat_g: 52, carbs_g: 88, salt_g: 4.1, tags: ["ピザ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザ 気まぐれ具沢山トッピング", calories: 960, protein_g: 38, fat_g: 45, carbs_g: 100, salt_g: 4.6, tags: ["ピザ"] }),
  item({ brand: "カプリチョーザ", name: "生ハムとルッコラ", calories: 900, protein_g: 34, fat_g: 40, carbs_g: 96, salt_g: 4.9, tags: ["ピザ", "生ハム"] }),
  item({ brand: "カプリチョーザ", name: "カボチャのタルト", calories: 420, protein_g: 7, fat_g: 22, carbs_g: 50, salt_g: 0.3, tags: ["デザート", "タルト"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザアイス", calories: 320, protein_g: 5, fat_g: 18, carbs_g: 36, salt_g: 0.2, tags: ["デザート", "アイス"] }),

  item({ brand: "マンマパスタ", name: "ポルチーニリゾット", calories: 760, protein_g: 24, fat_g: 30, carbs_g: 98, salt_g: 3.1, tags: ["リゾット", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "マルゲリータ", calories: 820, protein_g: 32, fat_g: 34, carbs_g: 98, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "ピッツァ コンテンポラネア", calories: 940, protein_g: 35, fat_g: 42, carbs_g: 108, salt_g: 4.3, tags: ["ピザ"] }),
  item({ brand: "マンマパスタ", name: "クワトロフォルマッジ", calories: 990, protein_g: 38, fat_g: 54, carbs_g: 88, salt_g: 4.2, tags: ["ピザ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "生ハムとルッコラのピッツァ", calories: 920, protein_g: 34, fat_g: 42, carbs_g: 100, salt_g: 4.8, tags: ["ピザ", "生ハム"] }),
  item({ brand: "マンマパスタ", name: "ペスカトーレ", calories: 850, protein_g: 35, fat_g: 24, carbs_g: 120, salt_g: 4.3, tags: ["パスタ", "海鮮", "トマト"] }),
  item({ brand: "マンマパスタ", name: "ボロネーゼ", calories: 820, protein_g: 31, fat_g: 30, carbs_g: 106, salt_g: 3.7, tags: ["パスタ", "ミートソース"] }),
  item({ brand: "マンマパスタ", name: "カルボナーラ", calories: 900, protein_g: 30, fat_g: 44, carbs_g: 92, salt_g: 3.5, tags: ["パスタ", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "ペペロンチーノ", calories: 680, protein_g: 18, fat_g: 26, carbs_g: 94, salt_g: 3.1, tags: ["パスタ", "ペペロンチーノ"] }),
  item({ brand: "マンマパスタ", name: "渡り蟹のトマトクリーム", calories: 880, protein_g: 31, fat_g: 36, carbs_g: 104, salt_g: 3.8, tags: ["パスタ", "蟹", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "明太子クリーム", calories: 820, protein_g: 27, fat_g: 34, carbs_g: 100, salt_g: 4.0, tags: ["パスタ", "明太子", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "シーザーサラダ", calories: 430, protein_g: 16, fat_g: 32, carbs_g: 18, salt_g: 2.4, tags: ["サラダ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "前菜盛り合わせ", calories: 520, protein_g: 22, fat_g: 34, carbs_g: 30, salt_g: 3.0, tags: ["前菜"], serving_label: "1皿" }),
  item({ brand: "マンマパスタ", name: "ティラミス", calories: 360, protein_g: 6, fat_g: 22, carbs_g: 34, salt_g: 0.2, tags: ["デザート"] }),
  item({ brand: "マンマパスタ", name: "ケーキ", calories: 420, protein_g: 6, fat_g: 24, carbs_g: 46, salt_g: 0.2, tags: ["デザート"], serving_label: "1個" }),

  item({ brand: "オリーブの丘", name: "アーリオオーリオ・ペペロンチーノ", calories: 620, protein_g: 16, fat_g: 24, carbs_g: 86, salt_g: 3.1, tags: ["パスタ", "ペペロンチーノ"] }),
  item({ brand: "オリーブの丘", name: "えびとほうれん草のトマトペペロンチーノ", calories: 680, protein_g: 26, fat_g: 22, carbs_g: 92, salt_g: 3.6, tags: ["パスタ", "海老", "トマト"] }),
  item({ brand: "オリーブの丘", name: "ボンゴレビアンコ", calories: 650, protein_g: 24, fat_g: 18, carbs_g: 94, salt_g: 4.0, tags: ["パスタ", "あさり"] }),
  item({ brand: "オリーブの丘", name: "ごろごろチキンのレモンバター醤油", calories: 760, protein_g: 34, fat_g: 30, carbs_g: 88, salt_g: 3.8, tags: ["パスタ", "チキン"] }),
  item({ brand: "オリーブの丘", name: "モッツァトマト", calories: 720, protein_g: 28, fat_g: 30, carbs_g: 88, salt_g: 3.5, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "アラビアータ", calories: 650, protein_g: 18, fat_g: 20, carbs_g: 96, salt_g: 3.7, tags: ["パスタ", "辛い"] }),
  item({ brand: "オリーブの丘", name: "菜園風のトマトソース", calories: 670, protein_g: 19, fat_g: 20, carbs_g: 102, salt_g: 3.4, tags: ["パスタ", "野菜", "トマト"] }),
  item({ brand: "オリーブの丘", name: "ダブルモッツァレラのトマトソース", calories: 820, protein_g: 34, fat_g: 38, carbs_g: 92, salt_g: 3.9, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "しらすと葱のジンジャーカルボ", calories: 760, protein_g: 30, fat_g: 34, carbs_g: 84, salt_g: 4.1, tags: ["パスタ", "カルボナーラ"] }),
  item({ brand: "オリーブの丘", name: "えびのビスククリームソース", calories: 780, protein_g: 28, fat_g: 34, carbs_g: 92, salt_g: 3.9, tags: ["パスタ", "海老", "クリーム"] }),
  item({ brand: "オリーブの丘", name: "明太子クリーム", calories: 760, protein_g: 26, fat_g: 30, carbs_g: 96, salt_g: 4.0, tags: ["パスタ", "明太子", "クリーム"] }),
  item({ brand: "オリーブの丘", name: "イカ墨（ネーロ）", calories: 760, protein_g: 24, fat_g: 24, carbs_g: 108, salt_g: 3.8, tags: ["パスタ", "イカスミ"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・マルゲリータ", calories: 690, protein_g: 27, fat_g: 28, carbs_g: 84, salt_g: 3.5, tags: ["ピザ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・ガーリックベーコン", calories: 780, protein_g: 28, fat_g: 38, carbs_g: 82, salt_g: 4.1, tags: ["ピザ", "ベーコン"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・クワトロフォルマッジ", calories: 840, protein_g: 32, fat_g: 44, carbs_g: 78, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "リゾットフォルマッジ", calories: 680, protein_g: 22, fat_g: 28, carbs_g: 86, salt_g: 3.0, tags: ["リゾット", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "えびとブロッコリーのビスククリームリゾット", calories: 740, protein_g: 27, fat_g: 30, carbs_g: 90, salt_g: 3.5, tags: ["リゾット", "海老"] }),
  item({ brand: "オリーブの丘", name: "ボローニャドリア", calories: 700, protein_g: 27, fat_g: 30, carbs_g: 84, salt_g: 3.4, tags: ["ドリア"] }),
  item({ brand: "オリーブの丘", name: "デミグラスハンバーグ", calories: 520, protein_g: 28, fat_g: 36, carbs_g: 20, salt_g: 2.9, tags: ["肉料理", "ハンバーグ"] }),
  item({ brand: "オリーブの丘", name: "チーズトマトハンバーグ", calories: 610, protein_g: 32, fat_g: 42, carbs_g: 22, salt_g: 3.2, tags: ["肉料理", "ハンバーグ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "チキンのオーブン焼き", calories: 540, protein_g: 42, fat_g: 34, carbs_g: 12, salt_g: 2.4, tags: ["肉料理", "チキン"] }),
  item({ brand: "オリーブの丘", name: "やわらか牛肉のビーフシチュー", calories: 690, protein_g: 38, fat_g: 42, carbs_g: 34, salt_g: 3.2, tags: ["肉料理", "牛肉"] }),
  item({ brand: "オリーブの丘", name: "ライス", calories: 330, protein_g: 5, fat_g: 1, carbs_g: 74, salt_g: 0.0, tags: ["ライス"], serving_label: "普通" }),
];

import { estimated } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";
const sourceUrl = "https://monsoon-cafe.jp/wp-content/uploads/sites/17/2026/02/202602-grand-maihama.pdf";

type MonsoonCafeMenu = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
};

const item = (input: MonsoonCafeMenu) =>
  estimated({
    brand: "モンスーンカフェ",
    name: input.name,
    category: "チェーン店",
    tags: ["モンスーンカフェ", "エスニック", "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

export const monsoonCafeMenuFoods = [
  item({ name: "ベトナム風生春巻き“ゴイクン”", calories: 155, protein_g: 8, fat_g: 3, carbs_g: 24, salt_g: 1.0, tags: ["前菜", "生春巻き", "海老"], serving_label: "1本" }),
  item({ name: "四川風よだれ鶏 ピリ辛胡麻ソース", calories: 360, protein_g: 28, fat_g: 22, carbs_g: 10, salt_g: 2.6, tags: ["前菜", "鶏", "辛い"] }),
  item({ name: "タイ海老トースト", calories: 520, protein_g: 19, fat_g: 32, carbs_g: 39, salt_g: 2.1, tags: ["前菜", "海老", "トースト", "揚げ物"] }),
  item({ name: "揚げ春巻き", calories: 360, protein_g: 12, fat_g: 22, carbs_g: 30, salt_g: 1.8, tags: ["前菜", "春巻き", "揚げ物"], serving_label: "2本" }),
  item({ name: "オリエンタルポテトフライ", calories: 520, protein_g: 6, fat_g: 28, carbs_g: 60, salt_g: 2.0, tags: ["前菜", "ポテト", "揚げ物"], serving_label: "Regular" }),
  item({ name: "オリエンタルポテトフライ", calories: 760, protein_g: 9, fat_g: 41, carbs_g: 88, salt_g: 3.0, tags: ["前菜", "ポテト", "揚げ物", "大盛り"], serving_label: "Large" }),
  item({ name: "ガーリックシュリンプ", calories: 330, protein_g: 22, fat_g: 20, carbs_g: 12, salt_g: 1.9, tags: ["前菜", "海老", "ガーリック"] }),
  item({ name: "仔羊のソーセージ", calories: 360, protein_g: 18, fat_g: 28, carbs_g: 8, salt_g: 2.1, tags: ["前菜", "羊肉", "ソーセージ"] }),
  item({ name: "鶏もも肉のから揚げ", calories: 620, protein_g: 36, fat_g: 38, carbs_g: 28, salt_g: 2.5, tags: ["前菜", "鶏", "唐揚げ", "揚げ物"] }),
  item({ name: "鶏手羽先のスパイシー揚げ", calories: 390, protein_g: 24, fat_g: 28, carbs_g: 10, salt_g: 2.0, tags: ["前菜", "鶏", "辛い", "揚げ物"], serving_label: "2本" }),
  item({ name: "海老とアボカドのチリマヨネーズ", calories: 520, protein_g: 20, fat_g: 38, carbs_g: 22, salt_g: 2.2, tags: ["前菜", "海老", "アボカド", "マヨネーズ"] }),
  item({ name: "上海風小籠包", calories: 320, protein_g: 16, fat_g: 16, carbs_g: 28, salt_g: 1.9, tags: ["前菜", "小籠包"], serving_label: "4個" }),
  item({ name: "Monsoon肉盛り", calories: 1180, protein_g: 78, fat_g: 78, carbs_g: 28, salt_g: 5.8, tags: ["肉料理", "前菜", "盛り合わせ"], serving_label: "1皿" }),
  item({ name: "鶏肉の串焼き ピーナッツソース", calories: 300, protein_g: 24, fat_g: 18, carbs_g: 10, salt_g: 1.4, tags: ["肉料理", "鶏", "サテ"], serving_label: "2本" }),

  item({ name: "オリエンタルサラダ", calories: 360, protein_g: 12, fat_g: 24, carbs_g: 26, salt_g: 2.0, tags: ["サラダ", "野菜"] }),
  item({ name: "海老と青パパイヤサラダ～ソムタム～", calories: 280, protein_g: 18, fat_g: 8, carbs_g: 34, salt_g: 2.6, tags: ["サラダ", "海老", "青パパイヤ", "辛い"] }),
  item({ name: "タイ風春雨サラダ～ヤムウンセン～", calories: 420, protein_g: 22, fat_g: 16, carbs_g: 48, salt_g: 3.0, tags: ["サラダ", "春雨", "海鮮", "辛い"] }),
  item({ name: "よだれ鶏とパクチーのサラダ", calories: 390, protein_g: 30, fat_g: 22, carbs_g: 15, salt_g: 2.8, tags: ["サラダ", "鶏", "パクチー"] }),
  item({ name: "パクチー盛り", calories: 25, protein_g: 2, fat_g: 0, carbs_g: 4, salt_g: 0.1, tags: ["サラダ", "パクチー", "追加"], serving_label: "1皿" }),

  item({ name: "空芯菜と青菜のトチオソース炒め", calories: 310, protein_g: 8, fat_g: 22, carbs_g: 20, salt_g: 2.9, tags: ["炒め物", "野菜", "空芯菜"] }),
  item({ name: "イカと季節野菜の山椒塩炒め", calories: 360, protein_g: 28, fat_g: 18, carbs_g: 20, salt_g: 3.0, tags: ["炒め物", "イカ", "野菜"] }),
  item({ name: "有頭海老のブラックペッパー炒め", calories: 390, protein_g: 30, fat_g: 20, carbs_g: 22, salt_g: 2.8, tags: ["炒め物", "海老", "ブラックペッパー"], serving_label: "3尾" }),
  item({ name: "鶏せせりと小松菜の山椒炒め", calories: 470, protein_g: 34, fat_g: 30, carbs_g: 16, salt_g: 2.9, tags: ["炒め物", "鶏", "野菜", "辛い"] }),

  item({ name: "トム・ヤム・クン", calories: 360, protein_g: 26, fat_g: 18, carbs_g: 22, salt_g: 4.0, tags: ["スープ", "海老", "辛い"] }),
  item({ name: "フォー追加", calories: 210, protein_g: 4, fat_g: 1, carbs_g: 46, salt_g: 0.2, tags: ["麺", "フォー", "追加"], serving_label: "追加" }),
  item({ name: "海鮮焼きビーフン“パッタイ”", calories: 820, protein_g: 34, fat_g: 28, carbs_g: 106, salt_g: 4.2, tags: ["麺", "パッタイ", "海鮮"] }),
  item({ name: "鶏肉と香味野菜のベトナムフォー", calories: 560, protein_g: 34, fat_g: 10, carbs_g: 82, salt_g: 4.0, tags: ["麺", "フォー", "鶏"] }),
  item({ name: "台湾ラーメン", calories: 720, protein_g: 32, fat_g: 28, carbs_g: 86, salt_g: 5.2, tags: ["麺", "ラーメン", "辛い"] }),

  item({ name: "牛肉のガパオライス", calories: 980, protein_g: 40, fat_g: 44, carbs_g: 104, salt_g: 3.8, tags: ["ごはん", "ガパオ", "牛肉"], serving_label: "タイ米/酵素玄米" }),
  item({ name: "鶏肉のガパオライス", calories: 840, protein_g: 38, fat_g: 32, carbs_g: 100, salt_g: 3.6, tags: ["ごはん", "ガパオ", "鶏"], serving_label: "タイ米/酵素玄米" }),
  item({ name: "鶏肉のグリーンカレー", calories: 780, protein_g: 30, fat_g: 34, carbs_g: 92, salt_g: 3.4, tags: ["ごはん", "カレー", "鶏", "辛い"], serving_label: "タイ米/酵素玄米" }),
  item({ name: "自家製チャーシューとパイナップルの炒飯", calories: 780, protein_g: 26, fat_g: 28, carbs_g: 104, salt_g: 3.5, tags: ["ごはん", "炒飯", "豚"] }),
  item({ name: "8種野菜のベトナムチャーハン", calories: 690, protein_g: 16, fat_g: 22, carbs_g: 106, salt_g: 3.2, tags: ["ごはん", "炒飯", "野菜"] }),
  item({ name: "ナシゴレン", calories: 850, protein_g: 34, fat_g: 32, carbs_g: 106, salt_g: 3.8, tags: ["ごはん", "炒飯", "鶏", "串焼き"] }),
  item({ name: "グリーンカレー&ガパオ", calories: 980, protein_g: 38, fat_g: 44, carbs_g: 108, salt_g: 4.0, tags: ["ランチ", "ごはん", "カレー", "ガパオ"], serving_label: "ランチメイン" }),
  item({ name: "海南チキンライス", calories: 720, protein_g: 38, fat_g: 22, carbs_g: 88, salt_g: 3.0, tags: ["ランチ", "ごはん", "鶏"] }),

  item({ name: "割包", calories: 220, protein_g: 6, fat_g: 4, carbs_g: 40, salt_g: 0.8, tags: ["サイド", "パン"], serving_label: "1個" }),
  item({ name: "タイ米", calories: 300, protein_g: 5, fat_g: 1, carbs_g: 68, salt_g: 0.0, tags: ["サイド", "ライス"], serving_label: "1皿" }),
  item({ name: "酵素玄米", calories: 300, protein_g: 6, fat_g: 2, carbs_g: 66, salt_g: 0.0, tags: ["サイド", "ライス"], serving_label: "1皿" }),
  item({ name: "マンゴープリン", calories: 280, protein_g: 4, fat_g: 10, carbs_g: 44, salt_g: 0.2, tags: ["デザート", "マンゴー", "プリン"] }),
  item({ name: "タピオカとコーヒーゼリーのチェー", calories: 360, protein_g: 5, fat_g: 12, carbs_g: 58, salt_g: 0.2, tags: ["デザート", "タピオカ", "コーヒーゼリー"] }),
  item({ name: "白玉かぼちゃぜんざい", calories: 330, protein_g: 6, fat_g: 4, carbs_g: 68, salt_g: 0.2, tags: ["デザート", "白玉", "かぼちゃ"] }),
  item({ name: "アイス・シャーベット", calories: 180, protein_g: 3, fat_g: 8, carbs_g: 25, salt_g: 0.1, tags: ["デザート", "アイス"], serving_label: "1皿" }),
];

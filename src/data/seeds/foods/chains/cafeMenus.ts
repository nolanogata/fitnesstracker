import { estimated } from "../helpers";

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

const item = (input: CafeMenu) =>
  estimated({
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
  });

export const cafeMenuFoods = [
  item({ brand: "スターバックス", name: "ニューヨークチーズケーキ", calories: 420, protein_g: 7, fat_g: 28, carbs_g: 35, tags: ["デザート", "ケーキ"] }),
  item({ brand: "スターバックス", name: "シュガードーナツ", calories: 360, protein_g: 6, fat_g: 19, carbs_g: 42, tags: ["ドーナツ"] }),
  item({ brand: "スターバックス", name: "チョコレートチャンクスコーン", calories: 360, protein_g: 7, fat_g: 18, carbs_g: 46, tags: ["スコーン"] }),
  item({ brand: "スターバックス", name: "ベーコンとほうれん草のキッシュ", calories: 340, protein_g: 12, fat_g: 24, carbs_g: 20, tags: ["キッシュ"] }),
  item({ brand: "スターバックス", name: "ハム&マリボーチーズ 石窯フィローネ", calories: 420, protein_g: 22, fat_g: 16, carbs_g: 48, tags: ["サンド", "チーズ"] }),
  item({ brand: "スターバックス", name: "チキン&チーズアラビアータ 石窯フィローネ", calories: 450, protein_g: 25, fat_g: 16, carbs_g: 52, tags: ["サンド", "チキン"] }),
  item({ brand: "スターバックス", name: "クラブハウス 石窯カンパーニュサンド", calories: 510, protein_g: 26, fat_g: 22, carbs_g: 55, tags: ["サンド"] }),
  item({ brand: "スターバックス", name: "根菜チキン サラダラップ", calories: 300, protein_g: 15, fat_g: 13, carbs_g: 34, tags: ["ラップ", "チキン"] }),
  item({ brand: "スターバックス", name: "ヨーグルト&バナナグラノーラ", calories: 280, protein_g: 9, fat_g: 8, carbs_g: 45, tags: ["ヨーグルト", "朝食"] }),

  item({ brand: "ドトール", name: "ミラノサンドA 生ハム・ボンレスハム・ボローニャソーセージ", calories: 410, protein_g: 19, fat_g: 18, carbs_g: 43, tags: ["サンド"] }),
  item({ brand: "ドトール", name: "爽やかレモン ミラノサンドB スモークサーモン・エビ・アボカド", calories: 430, protein_g: 22, fat_g: 19, carbs_g: 42, tags: ["サンド", "海老", "魚"] }),
  item({ brand: "ドトール", name: "ジャーマンドック", calories: 310, protein_g: 11, fat_g: 15, carbs_g: 33, tags: ["ホットドッグ"] }),
  item({ brand: "ドトール", name: "モーニング・セットA ハムタマゴサラダ", calories: 390, protein_g: 17, fat_g: 17, carbs_g: 43, tags: ["朝食", "サンド"], serving_label: "1食" }),
  item({ brand: "ドトール", name: "モーニング・セットB アボカド＆ツナポテト", calories: 430, protein_g: 16, fat_g: 20, carbs_g: 47, tags: ["朝食", "サンド"], serving_label: "1食" }),
  item({ brand: "ドトール", name: "ホットサンド 大豆のミート ～チーズ＆トマト～", calories: 420, protein_g: 19, fat_g: 19, carbs_g: 44, tags: ["ホットサンド", "大豆"] }),
  item({ brand: "ドトール", name: "ホットサンド ツナチェダー", calories: 470, protein_g: 22, fat_g: 24, carbs_g: 41, tags: ["ホットサンド", "ツナ"] }),
  item({ brand: "ドトール", name: "チーズトースト", calories: 360, protein_g: 13, fat_g: 15, carbs_g: 43, tags: ["トースト"] }),
  item({ brand: "ドトール", name: "ミルクレープ", calories: 330, protein_g: 5, fat_g: 20, carbs_g: 32, tags: ["デザート", "ケーキ"] }),

  item({ brand: "タリーズ", name: "チキンカツサンド ～粒マスタード＆デミソース～", calories: 520, protein_g: 24, fat_g: 22, carbs_g: 55, tags: ["サンド", "チキン"] }),
  item({ brand: "タリーズ", name: "３種のデリ風サラダサンド", calories: 330, protein_g: 11, fat_g: 15, carbs_g: 39, tags: ["サンド", "サラダ"] }),
  item({ brand: "タリーズ", name: "たっぷりタマゴサンド", calories: 390, protein_g: 16, fat_g: 21, carbs_g: 34, tags: ["サンド", "卵"] }),
  item({ brand: "タリーズ", name: "ハムチーズ＆サラダサンド", calories: 360, protein_g: 17, fat_g: 17, carbs_g: 36, tags: ["サンド", "チーズ"] }),
  item({ brand: "タリーズ", name: "ベーグルサンド 塩あんバター", calories: 430, protein_g: 10, fat_g: 16, carbs_g: 64, tags: ["ベーグル"] }),
  item({ brand: "タリーズ", name: "厚切りオープンサンド チキンリモーネ", calories: 380, protein_g: 23, fat_g: 16, carbs_g: 36, tags: ["サンド", "チキン"] }),
  item({ brand: "タリーズ", name: "ボールパークドッグ オリジナル", calories: 360, protein_g: 13, fat_g: 18, carbs_g: 35, tags: ["ホットドッグ"] }),
  item({ brand: "タリーズ", name: "彩り野菜の瀬戸内レモンパスタ ～青唐辛子風味～", calories: 610, protein_g: 20, fat_g: 22, carbs_g: 86, tags: ["パスタ"] }),
  item({ brand: "タリーズ", name: "ゴロっと茄子とベーコンの完熟トマトパスタ", calories: 680, protein_g: 23, fat_g: 26, carbs_g: 92, tags: ["パスタ"] }),

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

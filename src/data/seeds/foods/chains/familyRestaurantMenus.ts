import { estimated } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sources: Record<string, string> = {
  ガスト: "https://www.skylark.co.jp/gusto/menu/",
  ロイヤルホスト: "https://www.royalhost.jp/menu/",
  サイゼリヤ: "https://www.saizeriya.co.jp/menu/",
  オリーブの丘: "https://www.olivenooka.jp/",
  デニーズ: "https://www.dennys.jp/menu/",
  ジョイフル: "https://www.joyfull.co.jp/menu/",
  ジョナサン: "https://www.skylark.co.jp/jonathan/menu/",
  華屋与兵衛: "https://www.hanayayohei.co.jp/",
  藍屋: "https://www.skylark.co.jp/aiya/menu/",
};

type FamilyRestaurantMenu = {
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

const menu = (item: FamilyRestaurantMenu) =>
  estimated({
    brand: item.brand,
    name: item.name,
    category: "チェーン店",
    tags: ["ファミレス", item.brand, "公式メニュー確認", "栄養推定", ...item.tags],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: sources[item.brand],
    fetched_at: fetchedAt,
  });

export const familyRestaurantMenuFoods = [
  menu({ brand: "ガスト", name: "海老と蒸し鶏のコク旨冷麺", calories: 486, protein_g: 27, fat_g: 8, carbs_g: 76, salt_g: 5.9, tags: ["冷麺", "季節"] }),
  menu({ brand: "ガスト", name: "ねばとろサラダうどん", calories: 393, protein_g: 16, fat_g: 10, carbs_g: 62, salt_g: 4.4, tags: ["うどん", "野菜"] }),
  menu({ brand: "ガスト", name: "THE職人ビーフハンバーグ", calories: 593, protein_g: 34, fat_g: 38, carbs_g: 28, tags: ["ハンバーグ"] }),
  menu({ brand: "ガスト", name: "ビーフ100％粗挽き肉厚ステーキ風ハンバーグ", calories: 541, protein_g: 32, fat_g: 34, carbs_g: 24, tags: ["ハンバーグ"] }),
  menu({ brand: "ガスト", name: "鉄板ハンバーグミックスグリル", calories: 729, protein_g: 42, fat_g: 50, carbs_g: 24, tags: ["ハンバーグ", "グリル"] }),
  menu({ brand: "ガスト", name: "カットステーキ（6枚）ネギ＆にんにく醤油ソース", calories: 445, protein_g: 34, fat_g: 28, carbs_g: 12, tags: ["ステーキ"] }),
  menu({ brand: "ガスト", name: "イチオシ！！ガストスマッシュバーガー", calories: 1025, protein_g: 44, fat_g: 61, carbs_g: 74, tags: ["バーガー"] }),
  menu({ brand: "ガスト", name: "チーズＩＮハンバーグ", calories: 591, protein_g: 31, fat_g: 39, carbs_g: 21, tags: ["ハンバーグ", "チーズ"] }),

  menu({ brand: "ロイヤルホスト", name: "黒×黒ハンバーグ", calories: 780, protein_g: 38, fat_g: 52, carbs_g: 32, tags: ["ハンバーグ"] }),
  menu({ brand: "ロイヤルホスト", name: "ロイヤルホストハンバーグ", calories: 620, protein_g: 31, fat_g: 39, carbs_g: 34, tags: ["ハンバーグ"] }),
  menu({ brand: "ロイヤルホスト", name: "アンガスサーロインステーキ", calories: 720, protein_g: 48, fat_g: 52, carbs_g: 12, tags: ["ステーキ"] }),
  menu({ brand: "ロイヤルホスト", name: "アンガスサーロインステーキサラダ", calories: 520, protein_g: 36, fat_g: 34, carbs_g: 18, tags: ["ステーキ", "サラダ"] }),
  menu({ brand: "ロイヤルホスト", name: "オムライス", calories: 760, protein_g: 26, fat_g: 31, carbs_g: 92, tags: ["洋食", "ライス"] }),
  menu({ brand: "ロイヤルホスト", name: "ドリア", calories: 680, protein_g: 24, fat_g: 29, carbs_g: 82, tags: ["洋食"] }),
  menu({ brand: "ロイヤルホスト", name: "パンケーキ・フレンチトースト", calories: 620, protein_g: 15, fat_g: 26, carbs_g: 84, tags: ["デザート", "朝食"], serving_label: "1皿" }),
  menu({ brand: "ロイヤルホスト", name: "ロイヤルホストモーニング", calories: 560, protein_g: 23, fat_g: 27, carbs_g: 58, tags: ["朝食"], serving_label: "1食" }),
  menu({ brand: "ロイヤルホスト", name: "ロイヤルオムライス ハッシュドビーフソース", calories: 820, protein_g: 28, fat_g: 34, carbs_g: 98, salt_g: 3.8, tags: ["洋食", "オムライス", "ライス"] }),
  menu({ brand: "ロイヤルホスト", name: "海老と帆立のシーフードドリア", calories: 720, protein_g: 27, fat_g: 32, carbs_g: 82, salt_g: 3.2, tags: ["洋食", "ドリア", "海鮮"] }),
  menu({ brand: "ロイヤルホスト", name: "ビーフジャワカレー", calories: 820, protein_g: 25, fat_g: 30, carbs_g: 112, salt_g: 3.7, tags: ["カレー", "ライス", "牛肉"] }),
  menu({ brand: "ロイヤルホスト", name: "アンガスサーロインステーキピラフ", calories: 930, protein_g: 43, fat_g: 38, carbs_g: 104, salt_g: 4.0, tags: ["ステーキ", "ピラフ", "ライス"] }),
  menu({ brand: "ロイヤルホスト", name: "ビーフシチューハンバーグ", calories: 820, protein_g: 40, fat_g: 50, carbs_g: 38, salt_g: 4.0, tags: ["ハンバーグ", "ビーフシチュー"] }),
  menu({ brand: "ロイヤルホスト", name: "黒×黒ハンバーグ ブラウンバターソース", calories: 810, protein_g: 39, fat_g: 54, carbs_g: 34, salt_g: 3.5, tags: ["ハンバーグ"] }),
  menu({ brand: "ロイヤルホスト", name: "黒×黒ハンバーグ おろしきのこテリヤキソース", calories: 760, protein_g: 38, fat_g: 48, carbs_g: 36, salt_g: 4.0, tags: ["ハンバーグ", "和風"] }),
  menu({ brand: "ロイヤルホスト", name: "国産豚ポークロースステーキ", calories: 780, protein_g: 44, fat_g: 52, carbs_g: 22, salt_g: 3.0, tags: ["ステーキ", "豚肉"] }),
  menu({ brand: "ロイヤルホスト", name: "食いしんぼうのシェフサラダ", calories: 520, protein_g: 28, fat_g: 32, carbs_g: 32, salt_g: 3.0, tags: ["サラダ", "チキン", "卵"], serving_label: "1皿" }),
  menu({ brand: "ロイヤルホスト", name: "オニオングラタンスープ", calories: 220, protein_g: 9, fat_g: 12, carbs_g: 20, salt_g: 2.2, tags: ["スープ", "チーズ"], serving_label: "1杯" }),
  menu({ brand: "ロイヤルホスト", name: "フライドチキン＆ソーセージ", calories: 620, protein_g: 30, fat_g: 42, carbs_g: 30, salt_g: 3.6, tags: ["アペタイザー", "チキン", "ソーセージ"], serving_label: "1皿" }),
  menu({ brand: "ロイヤルホスト", name: "フライドポテト", calories: 360, protein_g: 5, fat_g: 18, carbs_g: 45, salt_g: 1.4, tags: ["サイド", "ポテト"], serving_label: "1皿" }),
  menu({ brand: "ロイヤルホスト", name: "ホットファッジサンデー", calories: 520, protein_g: 8, fat_g: 24, carbs_g: 68, salt_g: 0.5, tags: ["デザート", "サンデー"], serving_label: "1品" }),
  menu({ brand: "ロイヤルホスト", name: "ヨーグルトジャーマニー", calories: 430, protein_g: 9, fat_g: 16, carbs_g: 64, salt_g: 0.4, tags: ["デザート", "ヨーグルト", "パフェ"], serving_label: "1品" }),
  menu({ brand: "ロイヤルホスト", name: "パンケーキ", calories: 520, protein_g: 13, fat_g: 18, carbs_g: 76, salt_g: 1.6, tags: ["デザート", "朝食"], serving_label: "1皿" }),
  menu({ brand: "ロイヤルホスト", name: "フレンチトースト", calories: 610, protein_g: 16, fat_g: 28, carbs_g: 72, salt_g: 1.7, tags: ["デザート", "朝食"], serving_label: "1皿" }),

  menu({ brand: "サイゼリヤ", name: "ミラノ風ドリア", calories: 520, protein_g: 18, fat_g: 22, carbs_g: 65, tags: ["ドリア"] }),
  menu({ brand: "サイゼリヤ", name: "小エビのサラダ", calories: 190, protein_g: 12, fat_g: 11, carbs_g: 10, tags: ["サラダ", "海老"] }),
  menu({ brand: "サイゼリヤ", name: "辛味チキン", calories: 300, protein_g: 24, fat_g: 20, carbs_g: 6, tags: ["チキン", "サイド"] }),
  menu({ brand: "サイゼリヤ", name: "若鶏のディアボラ風", calories: 610, protein_g: 42, fat_g: 40, carbs_g: 20, tags: ["チキン"] }),
  menu({ brand: "サイゼリヤ", name: "ハンバーグステーキ", calories: 580, protein_g: 29, fat_g: 36, carbs_g: 32, tags: ["ハンバーグ"] }),
  menu({ brand: "サイゼリヤ", name: "タラコソースシシリー風", calories: 560, protein_g: 20, fat_g: 18, carbs_g: 82, tags: ["パスタ"] }),
  menu({ brand: "サイゼリヤ", name: "マルゲリータピザ", calories: 590, protein_g: 24, fat_g: 23, carbs_g: 74, tags: ["ピザ"] }),
  menu({ brand: "サイゼリヤ", name: "田舎風ミネストローネ", calories: 180, protein_g: 7, fat_g: 7, carbs_g: 24, tags: ["スープ"] }),

  menu({ brand: "オリーブの丘", name: "マスカルポーネと海の幸のトマトクリームソース", calories: 720, protein_g: 28, fat_g: 28, carbs_g: 90, tags: ["パスタ", "海鮮"] }),
  menu({ brand: "オリーブの丘", name: "茄子とチーズのニョッキグラタン", calories: 650, protein_g: 20, fat_g: 30, carbs_g: 78, tags: ["グラタン", "チーズ"] }),
  menu({ brand: "オリーブの丘", name: "マルゲリータピッツァ", calories: 620, protein_g: 24, fat_g: 24, carbs_g: 76, tags: ["ピザ"] }),
  menu({ brand: "オリーブの丘", name: "カルボナーラ", calories: 760, protein_g: 28, fat_g: 36, carbs_g: 82, tags: ["パスタ"] }),
  menu({ brand: "オリーブの丘", name: "ボロネーゼ", calories: 710, protein_g: 30, fat_g: 26, carbs_g: 88, tags: ["パスタ"] }),
  menu({ brand: "オリーブの丘", name: "シーザーサラダ", calories: 260, protein_g: 10, fat_g: 19, carbs_g: 12, tags: ["サラダ"] }),
  menu({ brand: "オリーブの丘", name: "肉料理", calories: 680, protein_g: 42, fat_g: 42, carbs_g: 24, tags: ["肉料理"] }),
  menu({ brand: "オリーブの丘", name: "ショコラオランジュのクレープ", calories: 420, protein_g: 7, fat_g: 22, carbs_g: 50, tags: ["デザート"] }),

  menu({ brand: "デニーズ", name: "きのこデミ煮込みハンバーグ", calories: 650, protein_g: 32, fat_g: 40, carbs_g: 36, tags: ["ハンバーグ"] }),
  menu({ brand: "デニーズ", name: "麻辣土鍋ハンバーグ", calories: 720, protein_g: 34, fat_g: 44, carbs_g: 42, tags: ["ハンバーグ"] }),
  menu({ brand: "デニーズ", name: "彩り野菜ハンバーグ～ライムとビネガーのソース", calories: 590, protein_g: 30, fat_g: 34, carbs_g: 38, tags: ["ハンバーグ", "野菜"] }),
  menu({ brand: "デニーズ", name: "しそおろしハンバーグ", calories: 560, protein_g: 29, fat_g: 32, carbs_g: 36, tags: ["ハンバーグ"] }),
  menu({ brand: "デニーズ", name: "BEEFハンバーグステーキ[約200g]～選べるソース", calories: 760, protein_g: 45, fat_g: 52, carbs_g: 20, tags: ["ハンバーグ", "ステーキ"] }),
  menu({ brand: "デニーズ", name: "海老ドリア", calories: 670, protein_g: 24, fat_g: 30, carbs_g: 78, tags: ["ドリア", "海老"] }),
  menu({ brand: "デニーズ", name: "特製ケチャップのオムライス", calories: 760, protein_g: 25, fat_g: 28, carbs_g: 102, tags: ["オムライス"] }),
  menu({ brand: "デニーズ", name: "グリルチキンのジャンバラヤ", calories: 820, protein_g: 38, fat_g: 28, carbs_g: 104, tags: ["ライス", "チキン"] }),

  menu({ brand: "ジョイフル", name: "ペッパーハンバーグ", calories: 660, protein_g: 33, fat_g: 42, carbs_g: 34, tags: ["ハンバーグ"] }),
  menu({ brand: "ジョイフル", name: "チーズインハンバーグ", calories: 720, protein_g: 35, fat_g: 48, carbs_g: 32, tags: ["ハンバーグ", "チーズ"] }),
  menu({ brand: "ジョイフル", name: "チキンステーキ", calories: 610, protein_g: 42, fat_g: 38, carbs_g: 22, tags: ["チキン", "ステーキ"] }),
  menu({ brand: "ジョイフル", name: "とり天定食", calories: 860, protein_g: 34, fat_g: 32, carbs_g: 108, tags: ["定食", "鶏"] }),
  menu({ brand: "ジョイフル", name: "しょうが焼き定食", calories: 830, protein_g: 35, fat_g: 34, carbs_g: 98, tags: ["定食", "豚肉"] }),
  menu({ brand: "ジョイフル", name: "かつとじ定食", calories: 980, protein_g: 40, fat_g: 42, carbs_g: 112, tags: ["定食"] }),
  menu({ brand: "ジョイフル", name: "日替りランチ", calories: 760, protein_g: 32, fat_g: 30, carbs_g: 92, tags: ["ランチ"], serving_label: "1食" }),
  menu({ brand: "ジョイフル", name: "チョコレートパフェ", calories: 430, protein_g: 7, fat_g: 20, carbs_g: 58, tags: ["デザート"] }),

  menu({ brand: "ジョナサン", name: "盛岡冷麺 キムチ・コチュジャンつき", calories: 566, protein_g: 24, fat_g: 10, carbs_g: 95, tags: ["冷麺"] }),
  menu({ brand: "ジョナサン", name: "アンガスビーフ100% 旨塩ねぎだれのハンバーグ膳", calories: 1021, protein_g: 44, fat_g: 52, carbs_g: 86, tags: ["ハンバーグ", "定食"], serving_label: "1食" }),
  menu({ brand: "ジョナサン", name: "希少部位　みすじステーキ和風オニオンソース", calories: 548, protein_g: 38, fat_g: 34, carbs_g: 20, tags: ["ステーキ"] }),
  menu({ brand: "ジョナサン", name: "みすじステーキのガーリックピラフ", calories: 657, protein_g: 31, fat_g: 28, carbs_g: 70, tags: ["ピラフ", "ステーキ"] }),
  menu({ brand: "ジョナサン", name: "焼きもろこしと小柱のポテトサラダ", calories: 122, protein_g: 4, fat_g: 7, carbs_g: 13, tags: ["サラダ"] }),
  menu({ brand: "ジョナサン", name: "やみつきミートのJonathan’sスープパスタ", calories: 959, protein_g: 36, fat_g: 44, carbs_g: 102, tags: ["パスタ"] }),
  menu({ brand: "ジョナサン", name: "スプーンで食べるジューシーハンバーグ", calories: 650, protein_g: 32, fat_g: 42, carbs_g: 32, tags: ["ハンバーグ"] }),
  menu({ brand: "ジョナサン", name: "ハーゲンダッツとアールグレイのジョナパフェ", calories: 527, protein_g: 9, fat_g: 28, carbs_g: 62, tags: ["デザート"] }),

  menu({ brand: "華屋与兵衛", name: "グランドメニュー", calories: 760, protein_g: 32, fat_g: 28, carbs_g: 94, tags: ["和食"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "平日ランチメニュー", calories: 780, protein_g: 33, fat_g: 30, carbs_g: 94, tags: ["ランチ", "和食"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "平日夜よへい定食", calories: 860, protein_g: 38, fat_g: 34, carbs_g: 102, tags: ["定食"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "金目鯛釜めし", calories: 720, protein_g: 32, fat_g: 18, carbs_g: 104, tags: ["釜めし", "魚"] }),
  menu({ brand: "華屋与兵衛", name: "鰻と天然大海老フェア", calories: 940, protein_g: 42, fat_g: 36, carbs_g: 108, tags: ["うなぎ", "海老"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "お子様メニュー", calories: 560, protein_g: 20, fat_g: 22, carbs_g: 70, tags: ["キッズ"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "お持ち帰りメニュー", calories: 820, protein_g: 34, fat_g: 30, carbs_g: 102, tags: ["テイクアウト"], serving_label: "1食" }),
  menu({ brand: "華屋与兵衛", name: "黒胡麻甘味", calories: 360, protein_g: 6, fat_g: 14, carbs_g: 54, tags: ["デザート"] }),

  menu({ brand: "藍屋", name: "乙姫ちらしの味彩御膳", calories: 820, protein_g: 36, fat_g: 24, carbs_g: 108, tags: ["御膳", "海鮮"], serving_label: "1食" }),
  menu({ brand: "藍屋", name: "季節の天ぷら盛り合わせ", calories: 520, protein_g: 18, fat_g: 32, carbs_g: 44, tags: ["天ぷら"] }),
  menu({ brand: "藍屋", name: "浜名湖産うなぎと季節の賑わい膳", calories: 950, protein_g: 42, fat_g: 36, carbs_g: 112, tags: ["うなぎ", "御膳"], serving_label: "1食" }),
  menu({ brand: "藍屋", name: "浜名湖産うな重膳", calories: 980, protein_g: 40, fat_g: 40, carbs_g: 116, tags: ["うなぎ"], serving_label: "1食" }),
  menu({ brand: "藍屋", name: "藍屋サラダ", calories: 160, protein_g: 6, fat_g: 10, carbs_g: 12, tags: ["サラダ"] }),
  menu({ brand: "藍屋", name: "刺身四種盛り合わせ", calories: 250, protein_g: 36, fat_g: 10, carbs_g: 4, tags: ["刺身"] }),
  menu({ brand: "藍屋", name: "松花堂弁当《熟成サーロインステーキ付き》", calories: 1100, protein_g: 54, fat_g: 48, carbs_g: 108, tags: ["弁当", "ステーキ"], serving_label: "1食" }),
  menu({ brand: "藍屋", name: "藍屋天丼膳", calories: 860, protein_g: 28, fat_g: 34, carbs_g: 108, tags: ["天丼"], serving_label: "1食" }),
];

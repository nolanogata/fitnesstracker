import { official } from "../helpers";

const sourceUrl = "https://www.ringerhut.jp/quality/allergy-nutrition_value/";
const fetchedAt = "2026-07-22T00:00:00.000Z";

type RingerHutRow = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label?: string;
  tags: string[];
};

export const ringerHutOfficialRows: RingerHutRow[] = [
  { name: "豚しゃぶの冷やしちゃんぽん", serving_label: "標準", calories: 592, protein_g: 21.1, fat_g: 24.7, carbs_g: 77.5, salt_g: 6.4, tags: ["ちゃんぽん", "冷やし", "期間限定"] },
  { name: "豚しゃぶの冷やしちゃんぽん 麺少なめ", serving_label: "麺少なめ", calories: 446, protein_g: 15.7, fat_g: 24.1, carbs_g: 45.4, salt_g: 6.2, tags: ["ちゃんぽん", "冷やし", "期間限定", "麺少なめ"] },
  { name: "豚しゃぶの冷やしちゃんぽん 麺1.5倍", serving_label: "麺1.5倍", calories: 739, protein_g: 26.5, fat_g: 25.4, carbs_g: 109.7, salt_g: 6.6, tags: ["ちゃんぽん", "冷やし", "期間限定", "麺増量"] },
  { name: "豚しゃぶの冷やしめん", serving_label: "標準", calories: 558, protein_g: 20.3, fat_g: 16.9, carbs_g: 87.5, salt_g: 5.2, tags: ["冷やし麺", "期間限定"] },
  { name: "豚しゃぶの冷やしめん 麺少なめ", serving_label: "麺少なめ", calories: 397, protein_g: 14.5, fat_g: 15.9, carbs_g: 52.6, salt_g: 4.3, tags: ["冷やし麺", "期間限定", "麺少なめ"] },
  { name: "豚しゃぶの冷やしめん 麺1.5倍", serving_label: "麺1.5倍", calories: 704, protein_g: 25.7, fat_g: 17.5, carbs_g: 119.6, salt_g: 5.4, tags: ["冷やし麺", "期間限定", "麺増量"] },
  { name: "夏辛ちゃんぽん", calories: 766, protein_g: 30.8, fat_g: 35.6, carbs_g: 89.1, salt_g: 8.8, tags: ["ちゃんぽん", "辛い", "期間限定"] },
  { name: "低糖質麺200g 夏辛ちゃんぽん", serving_label: "200g", calories: 757, protein_g: 34.8, fat_g: 35.8, carbs_g: 89.3, salt_g: 8.8, tags: ["ちゃんぽん", "辛い", "期間限定", "低糖質麺"] },
  { name: "夏辛ちゃんぽん 麺少なめ", calories: 620, protein_g: 25.4, fat_g: 34.9, carbs_g: 56.9, salt_g: 8.6, tags: ["ちゃんぽん", "辛い", "期間限定", "麺少なめ"] },

  { name: "長崎ちゃんぽん", serving_label: "標準", calories: 611, protein_g: 24.3, fat_g: 24.7, carbs_g: 81.8, salt_g: 7.4, tags: ["ちゃんぽん", "麺類"] },
  { name: "長崎ちゃんぽん 麺少なめ", serving_label: "麺少なめ", calories: 465, protein_g: 18.9, fat_g: 24.0, carbs_g: 49.7, salt_g: 7.2, tags: ["ちゃんぽん", "麺類", "麺少なめ"] },
  { name: "長崎ちゃんぽん 麺増量1.5倍", serving_label: "麺増量1.5倍", calories: 797, protein_g: 31.8, fat_g: 28.3, carbs_g: 115.1, salt_g: 11.8, tags: ["ちゃんぽん", "麺類", "麺増量"] },
  { name: "長崎ちゃんぽん 麺増量2倍", serving_label: "麺増量2倍", calories: 943, protein_g: 37.2, fat_g: 28.9, carbs_g: 147.2, salt_g: 12.0, tags: ["ちゃんぽん", "麺類", "麺増量"] },
  { name: "低糖質麺 長崎ちゃんぽん", calories: 602, protein_g: 28.2, fat_g: 24.9, carbs_g: 82.1, salt_g: 7.4, tags: ["ちゃんぽん", "麺類", "低糖質麺"] },
  { name: "スモールちゃんぽん", calories: 315, protein_g: 12.6, fat_g: 13.0, carbs_g: 41.3, salt_g: 4.6, tags: ["ちゃんぽん", "麺類", "小盛"] },

  { name: "減塩ちゃんぽん", calories: 589, protein_g: 23.1, fat_g: 22.8, carbs_g: 81.6, salt_g: 4.6, tags: ["ちゃんぽん", "麺類", "減塩"] },
  { name: "低糖質麺 減塩ちゃんぽん", calories: 580, protein_g: 27.0, fat_g: 23.1, carbs_g: 81.8, salt_g: 4.6, tags: ["ちゃんぽん", "麺類", "減塩", "低糖質麺"] },
  { name: "減塩ちゃんぽん 麺少なめ", calories: 442, protein_g: 17.7, fat_g: 22.2, carbs_g: 49.5, salt_g: 4.4, tags: ["ちゃんぽん", "麺類", "減塩", "麺少なめ"] },

  { name: "野菜たっぷりちゃんぽん", serving_label: "標準", calories: 759, protein_g: 28.4, fat_g: 35.7, carbs_g: 92.0, salt_g: 9.3, tags: ["ちゃんぽん", "野菜"] },
  { name: "野菜たっぷりちゃんぽん 麺少なめ", serving_label: "麺少なめ", calories: 613, protein_g: 23.1, fat_g: 35.0, carbs_g: 59.9, salt_g: 9.1, tags: ["ちゃんぽん", "野菜", "麺少なめ"] },
  { name: "野菜たっぷりちゃんぽん 麺増量1.5倍", serving_label: "麺増量1.5倍", calories: 946, protein_g: 36.0, fat_g: 39.4, carbs_g: 125.3, salt_g: 13.8, tags: ["ちゃんぽん", "野菜", "麺増量"] },
  { name: "野菜たっぷりちゃんぽん 麺増量2倍", serving_label: "麺増量2倍", calories: 1093, protein_g: 41.4, fat_g: 40.1, carbs_g: 157.4, salt_g: 14.0, tags: ["ちゃんぽん", "野菜", "麺増量"] },
  { name: "低糖質麺 野菜たっぷりちゃんぽん", calories: 750, protein_g: 32.4, fat_g: 35.9, carbs_g: 92.3, salt_g: 9.3, tags: ["ちゃんぽん", "野菜", "低糖質麺"] },

  { name: "ピリカラちゃんぽん", serving_label: "標準", calories: 656, protein_g: 25.4, fat_g: 28.0, carbs_g: 83.4, salt_g: 7.7, tags: ["ちゃんぽん", "辛い"] },
  { name: "ピリカラちゃんぽん 麺少なめ", serving_label: "麺少なめ", calories: 509, protein_g: 20.0, fat_g: 27.4, carbs_g: 51.3, salt_g: 7.5, tags: ["ちゃんぽん", "辛い", "麺少なめ"] },
  { name: "ピリカラちゃんぽん 麺増量1.5倍", serving_label: "麺増量1.5倍", calories: 842, protein_g: 32.9, fat_g: 31.7, carbs_g: 116.6, salt_g: 12.1, tags: ["ちゃんぽん", "辛い", "麺増量"] },
  { name: "ピリカラちゃんぽん 麺増量2倍", serving_label: "麺増量2倍", calories: 988, protein_g: 38.3, fat_g: 32.3, carbs_g: 148.7, salt_g: 12.3, tags: ["ちゃんぽん", "辛い", "麺増量"] },
  { name: "低糖質麺 ピリカラちゃんぽん", calories: 647, protein_g: 29.3, fat_g: 28.2, carbs_g: 83.6, salt_g: 7.7, tags: ["ちゃんぽん", "辛い", "低糖質麺"] },

  { name: "鶏白湯長崎ちゃんぽん", calories: 730, protein_g: 32.2, fat_g: 33.1, carbs_g: 84.7, salt_g: 6.4, tags: ["ちゃんぽん", "鶏白湯"] },
  { name: "低糖質麺 鶏白湯長崎ちゃんぽん", calories: 721, protein_g: 36.2, fat_g: 33.3, carbs_g: 84.9, salt_g: 6.4, tags: ["ちゃんぽん", "鶏白湯", "低糖質麺"] },
  { name: "鶏白湯長崎ちゃんぽん 麺少なめ", calories: 584, protein_g: 26.8, fat_g: 32.4, carbs_g: 52.6, salt_g: 6.2, tags: ["ちゃんぽん", "鶏白湯", "麺少なめ"] },
  { name: "しょうゆちゃんぽん", calories: 637, protein_g: 24.4, fat_g: 26.1, carbs_g: 85.1, salt_g: 7.8, tags: ["ちゃんぽん", "しょうゆ"] },
  { name: "低糖質麺 しょうゆちゃんぽん", calories: 628, protein_g: 28.3, fat_g: 26.3, carbs_g: 85.4, salt_g: 7.8, tags: ["ちゃんぽん", "しょうゆ", "低糖質麺"] },
  { name: "しょうゆちゃんぽん 麺少なめ", calories: 491, protein_g: 19.0, fat_g: 25.4, carbs_g: 53.0, salt_g: 7.6, tags: ["ちゃんぽん", "しょうゆ", "麺少なめ"] },
  { name: "みそちゃんぽん", calories: 655, protein_g: 26.6, fat_g: 25.5, carbs_g: 88.8, salt_g: 8.0, tags: ["ちゃんぽん", "みそ"] },
  { name: "低糖質麺 みそちゃんぽん", calories: 646, protein_g: 30.5, fat_g: 25.7, carbs_g: 89.0, salt_g: 8.0, tags: ["ちゃんぽん", "みそ", "低糖質麺"] },
  { name: "みそちゃんぽん 麺少なめ", calories: 509, protein_g: 21.2, fat_g: 24.8, carbs_g: 56.7, salt_g: 7.8, tags: ["ちゃんぽん", "みそ", "麺少なめ"] },
  { name: "野菜たっぷり食べるスープ", calories: 437, protein_g: 20.5, fat_g: 28.3, carbs_g: 30.6, salt_g: 7.1, tags: ["スープ", "野菜", "低糖質"] },
  { name: "海鮮ちゃんぽん海老スープ", calories: 761, protein_g: 32.4, fat_g: 36.3, carbs_g: 84.8, salt_g: 8.3, tags: ["ちゃんぽん", "海鮮", "海老"] },
  { name: "低糖質麺 海鮮ちゃんぽん海老スープ", calories: 752, protein_g: 36.4, fat_g: 36.5, carbs_g: 85.1, salt_g: 8.3, tags: ["ちゃんぽん", "海鮮", "海老", "低糖質麺"] },
  { name: "海鮮ちゃんぽん海老スープ 麺少なめ", calories: 615, protein_g: 27.1, fat_g: 35.7, carbs_g: 52.7, salt_g: 8.1, tags: ["ちゃんぽん", "海鮮", "海老", "麺少なめ"] },

  { name: "長崎皿うどん", serving_label: "標準", calories: 728, protein_g: 18.2, fat_g: 37.3, carbs_g: 83.6, salt_g: 7.5, tags: ["皿うどん", "麺類"] },
  { name: "長崎皿うどん 麺少なめ", serving_label: "麺少なめ", calories: 549, protein_g: 15.4, fat_g: 27.9, carbs_g: 62.7, salt_g: 7.5, tags: ["皿うどん", "麺類", "麺少なめ"] },
  { name: "長崎皿うどん 麺増量2倍", serving_label: "麺増量2倍", calories: 1146, protein_g: 24.8, fat_g: 56.7, carbs_g: 137.6, salt_g: 10.2, tags: ["皿うどん", "麺類", "麺増量"] },
  { name: "スモール皿うどん", calories: 425, protein_g: 10.2, fat_g: 19.1, carbs_g: 54.9, salt_g: 7.0, tags: ["皿うどん", "麺類", "小盛"] },
  { name: "野菜たっぷり皿うどん", serving_label: "標準", calories: 918, protein_g: 22.4, fat_g: 47.6, carbs_g: 105.5, salt_g: 10.1, tags: ["皿うどん", "野菜"] },
  { name: "野菜たっぷり皿うどん 麺少なめ", serving_label: "麺少なめ", calories: 728, protein_g: 19.4, fat_g: 37.7, carbs_g: 83.3, salt_g: 10.0, tags: ["皿うどん", "野菜", "麺少なめ"] },
  { name: "野菜たっぷり皿うどん 麺増量2倍", serving_label: "麺増量2倍", calories: 1277, protein_g: 28.0, fat_g: 66.4, carbs_g: 147.3, salt_g: 10.2, tags: ["皿うどん", "野菜", "麺増量"] },
  { name: "お手軽皿うどん（テイクアウト）", calories: 658, protein_g: 16.0, fat_g: 32.5, carbs_g: 77.6, salt_g: 7.4, tags: ["皿うどん", "持ち帰り"] },
  { name: "ピリカラ皿うどん", serving_label: "標準", calories: 773, protein_g: 19.3, fat_g: 40.7, carbs_g: 85.1, salt_g: 7.8, tags: ["皿うどん", "辛い"] },
  { name: "ピリカラ皿うどん 麺少なめ", serving_label: "麺少なめ", calories: 594, protein_g: 16.4, fat_g: 31.3, carbs_g: 64.2, salt_g: 7.7, tags: ["皿うどん", "辛い", "麺少なめ"] },
  { name: "ピリカラ皿うどん 麺増量2倍", serving_label: "麺増量2倍", calories: 1191, protein_g: 25.9, fat_g: 60.1, carbs_g: 139.2, salt_g: 10.5, tags: ["皿うどん", "辛い", "麺増量"] },
  { name: "焼き太めん皿うどん", serving_label: "標準", calories: 774, protein_g: 23.6, fat_g: 28.8, carbs_g: 105.5, salt_g: 8.6, tags: ["皿うどん", "太麺"] },
  { name: "焼き太めん皿うどん 麺増量2倍", serving_label: "麺増量2倍", calories: 1151, protein_g: 35.1, fat_g: 30.2, carbs_g: 180.6, salt_g: 11.5, tags: ["皿うどん", "太麺", "麺増量"] },
  { name: "やわらか太めん皿うどん", serving_label: "標準", calories: 694, protein_g: 24.0, fat_g: 19.3, carbs_g: 106.2, salt_g: 9.5, tags: ["皿うどん", "太麺"] },
  { name: "やわらか太めん皿うどん 麺増量2倍", serving_label: "麺増量2倍", calories: 1072, protein_g: 35.5, fat_g: 20.7, carbs_g: 181.3, salt_g: 12.4, tags: ["皿うどん", "太麺", "麺増量"] },
  { name: "減塩皿うどん", calories: 527, protein_g: 15.3, fat_g: 27.8, carbs_g: 57.3, salt_g: 4.5, tags: ["皿うどん", "減塩"] },

  { name: "ぎょうざ（3個）", serving_label: "3個", calories: 119, protein_g: 2.8, fat_g: 8.5, carbs_g: 7.9, salt_g: 0.4, tags: ["餃子", "サイド"] },
  { name: "ぎょうざ（5個）", serving_label: "5個", calories: 199, protein_g: 4.7, fat_g: 14.1, carbs_g: 13.1, salt_g: 0.7, tags: ["餃子", "サイド"] },
  { name: "焼き焼売（1個）", serving_label: "1個", calories: 86, protein_g: 3.9, fat_g: 5.4, carbs_g: 5.6, salt_g: 0.5, tags: ["焼売", "サイド"] },
  { name: "焼き焼売（2個）", serving_label: "2個", calories: 172, protein_g: 7.8, fat_g: 10.8, carbs_g: 11.3, salt_g: 0.9, tags: ["焼売", "サイド"] },
  { name: "ぎょうざ7個定食", calories: 592, protein_g: 11.8, fat_g: 20.5, carbs_g: 87.3, salt_g: 3.0, tags: ["餃子", "定食"] },
  { name: "ぎょうざ10個定食", calories: 712, protein_g: 14.7, fat_g: 28.9, carbs_g: 95.2, salt_g: 3.4, tags: ["餃子", "定食"] },
  { name: "ぎょうざ15個定食", calories: 911, protein_g: 19.4, fat_g: 43.1, carbs_g: 108.3, salt_g: 4.1, tags: ["餃子", "定食"] },
  { name: "ぎょうざ7個定食（半チャーハン）", calories: 579, protein_g: 13.1, fat_g: 30.0, carbs_g: 66.0, salt_g: 4.9, tags: ["餃子", "定食", "チャーハン"] },
  { name: "にんにく竹炭ぎょうざ（3個）", serving_label: "3個", calories: 170, protein_g: 3.2, fat_g: 13.0, carbs_g: 9.5, salt_g: 0.4, tags: ["餃子", "にんにく", "サイド"] },
  { name: "にんにく竹炭ぎょうざ（5個）", serving_label: "5個", calories: 284, protein_g: 5.4, fat_g: 21.7, carbs_g: 15.9, salt_g: 0.7, tags: ["餃子", "にんにく", "サイド"] },
  { name: "にんにく竹炭ぎょうざ7個定食", calories: 711, protein_g: 12.7, fat_g: 31.0, carbs_g: 91.2, salt_g: 3.1, tags: ["餃子", "にんにく", "定食"] },
  { name: "にんにく竹炭ぎょうざ10個定食", calories: 881, protein_g: 16.0, fat_g: 44.0, carbs_g: 100.7, salt_g: 3.5, tags: ["餃子", "にんにく", "定食"] },
  { name: "にんにく竹炭ぎょうざ15個定食", calories: 1164, protein_g: 21.3, fat_g: 65.6, carbs_g: 116.5, salt_g: 4.3, tags: ["餃子", "にんにく", "定食"] },
  { name: "にんにく竹炭ぎょうざ7個定食（半チャーハン）", calories: 697, protein_g: 14.0, fat_g: 40.5, carbs_g: 69.8, salt_g: 5.0, tags: ["餃子", "にんにく", "定食", "チャーハン"] },

  { name: "ちびっこちゃんぽん（単品）", calories: 317, protein_g: 13.3, fat_g: 12.9, carbs_g: 41.6, salt_g: 4.6, tags: ["キッズ", "ちゃんぽん"] },
  { name: "ちびっこさらうどん（単品）", calories: 425, protein_g: 10.2, fat_g: 19.1, carbs_g: 54.9, salt_g: 7.0, tags: ["キッズ", "皿うどん"] },
  { name: "ちびっこチャーハン（単品）", calories: 414, protein_g: 8.9, fat_g: 12.8, carbs_g: 68.3, salt_g: 3.2, tags: ["キッズ", "チャーハン"] },
  { name: "ちびっこナポリタン（単品）", calories: 473, protein_g: 15.2, fat_g: 13.7, carbs_g: 77.9, salt_g: 3.3, tags: ["キッズ", "ナポリタン"] },
  { name: "ちびっこちゃんぽんセット", calories: 407, protein_g: 14.8, fat_g: 15.0, carbs_g: 58.1, salt_g: 4.7, tags: ["キッズ", "ちゃんぽん", "セット"] },
  { name: "ちびっこさらうどんセット", calories: 514, protein_g: 11.6, fat_g: 21.2, carbs_g: 71.3, salt_g: 7.1, tags: ["キッズ", "皿うどん", "セット"] },
  { name: "ちびっこチャーハンセット", calories: 525, protein_g: 10.4, fat_g: 17.3, carbs_g: 84.9, salt_g: 3.3, tags: ["キッズ", "チャーハン", "セット"] },
  { name: "ちびっこナポリタンセット", calories: 563, protein_g: 16.7, fat_g: 15.9, carbs_g: 94.3, salt_g: 3.4, tags: ["キッズ", "ナポリタン", "セット"] },
  { name: "リンガーハットのプリン", serving_label: "1個", calories: 54, protein_g: 1.2, fat_g: 2.2, carbs_g: 7.8, salt_g: 0.1, tags: ["キッズ", "デザート", "プリン"] },
  { name: "野菜生活100ml（やさいとりんご）", serving_label: "100ml", calories: 36, protein_g: 0.3, fat_g: 0.0, carbs_g: 8.7, salt_g: 0.0, tags: ["キッズ", "ドリンク", "野菜ジュース"] },

  { name: "半チャーハン", calories: 291, protein_g: 5.9, fat_g: 10.2, carbs_g: 45.6, salt_g: 2.2, tags: ["チャーハン", "ご飯", "サイド"] },
  { name: "ねぎだくチャーハン", calories: 586, protein_g: 12.3, fat_g: 20.3, carbs_g: 92.5, salt_g: 4.3, tags: ["チャーハン", "ご飯"] },
  { name: "ごはん100グラム", serving_label: "100g", calories: 156, protein_g: 2.5, fat_g: 0.3, carbs_g: 37.1, salt_g: 0.0, tags: ["ご飯", "サイド"] },
  { name: "オニオンスープ", calories: 6, protein_g: 0.2, fat_g: 0.0, carbs_g: 1.2, salt_g: 1.4, tags: ["スープ", "サイド"] },
  { name: "半熟卵トッピング", serving_label: "1個", calories: 78, protein_g: 6.6, fat_g: 6.3, carbs_g: 0.1, salt_g: 0.2, tags: ["卵", "トッピング", "一部店舗"] },
  { name: "ピリカラ味噌（1辛・10g）", serving_label: "10g", calories: 28, protein_g: 0.7, fat_g: 2.1, carbs_g: 1.0, salt_g: 0.2, tags: ["辛い", "トッピング"] },
  { name: "ちゃんぽんドレッシング（15g）", serving_label: "15g", calories: 33, protein_g: 0.1, fat_g: 2.5, carbs_g: 1.4, salt_g: 0.4, tags: ["ドレッシング", "トッピング"] },
  { name: "柚子胡椒ドレッシング（15g）", serving_label: "15g", calories: 29, protein_g: 0.0, fat_g: 2.3, carbs_g: 2.0, salt_g: 0.9, tags: ["ドレッシング", "トッピング"] },
  { name: "杏仁豆腐", calories: 119, protein_g: 3.4, fat_g: 6.0, carbs_g: 12.9, salt_g: 0.1, tags: ["デザート", "杏仁豆腐"] },
  { name: "ミルクセーキ（小）", serving_label: "小", calories: 89, protein_g: 1.9, fat_g: 3.9, carbs_g: 11.7, salt_g: 0.1, tags: ["デザート", "ドリンク"] },
];

export const ringerHutOfficialFoods = ringerHutOfficialRows.map((row) => official({
  brand: "リンガーハット",
  name: row.name,
  category: "チェーン店",
  tags: ["公式栄養", ...row.tags],
  calories: row.calories,
  protein_g: row.protein_g,
  fat_g: row.fat_g,
  carbs_g: row.carbs_g,
  salt_g: row.salt_g,
  serving_label: row.serving_label ?? "1品",
  default_meal_type: "lunch",
  source_url: sourceUrl,
  fetched_at: fetchedAt,
}));

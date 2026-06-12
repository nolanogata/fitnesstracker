import { official } from "../helpers";

const sourceUrl = "https://assets.ctfassets.net/jax7ylg56usf/5a9F3VbgJPIn8M5urCB1Qj/c05b16fe6dcf20204e21fd964646a3d0/260603%C3%A6__%C3%A9__%C3%A6__%C3%A5__%C3%A8__%C3%AF__%C3%A3__%C3%A3__%C3%A3__%C3%A3__%C3%A3__%C3%A3__%C3%A7__%C3%AF____3_.pdf";
const fetchedAt = "2026-06-03T00:00:00.000Z";

const baseTags = ["ファストフード", "KFC", "ケンタ", "公式栄養"];

type KfcProduct = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  weight_g: number;
  default_meal_type: "lunch" | "snack";
  tag: string;
};

const products = [
  {"name": "オリジナルチキン","calories": 218,"protein_g": 16.5,"fat_g": 12.8,"carbs_g": 9.1,"salt_g": 1.5,"serving_label": "1品（87g）","weight_g": 87,"default_meal_type": "snack","tag": "チキン"},
  {"name": "辛旨ジンガー","calories": 149,"protein_g": 9.8,"fat_g": 9.0,"carbs_g": 7.3,"salt_g": 0.9,"serving_label": "1品（54g）","weight_g": 54,"default_meal_type": "lunch","tag": "チキン"},
  {"name": "レモン香るパリパリ旨塩チキン","calories": 253,"protein_g": 17.6,"fat_g": 15.0,"carbs_g": 11.9,"salt_g": 1.6,"serving_label": "1品（94g）","weight_g": 94,"default_meal_type": "snack","tag": "チキン"},
  {"name": "骨なしケンタッキー","calories": 191,"protein_g": 20.3,"fat_g": 8.5,"carbs_g": 8.3,"salt_g": 1.7,"serving_label": "1品（83g）","weight_g": 83,"default_meal_type": "lunch","tag": "チキン"},
  {"name": "カーネルクリスピー","calories": 119,"protein_g": 6.8,"fat_g": 6.6,"carbs_g": 8.2,"salt_g": 0.6,"serving_label": "1品（42g）","weight_g": 42,"default_meal_type": "lunch","tag": "チキン"},
  {"name": "ナゲット 5ピース","calories": 222,"protein_g": 13.3,"fat_g": 13.4,"carbs_g": 11.8,"salt_g": 1.5,"serving_label": "1品（94g）","weight_g": 94,"default_meal_type": "snack","tag": "ナゲット"},
  {"name": "（ケチャップ）","calories": 11,"protein_g": 0.1,"fat_g": 0.0,"carbs_g": 2.6,"salt_g": 0.2,"serving_label": "1品（9g）","weight_g": 9,"default_meal_type": "snack","tag": "ソース"},
  {"name": "NEW YORK style オニオンリングフィレバーガー","calories": 564,"protein_g": 28.5,"fat_g": 29.7,"carbs_g": 45.7,"salt_g": 3.5,"serving_label": "1品（200g）","weight_g": 200,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "TEXAS style スパイシーアボカドフィレバーガー","calories": 418,"protein_g": 27.6,"fat_g": 19.8,"carbs_g": 33.4,"salt_g": 3.3,"serving_label": "1品（178g）","weight_g": 178,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "LAS VEGAS style ダブルダウンフィレバーガー","calories": 625,"protein_g": 44.7,"fat_g": 34.7,"carbs_g": 32.5,"salt_g": 4.7,"serving_label": "1品（229g）","weight_g": 229,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ケンタの鶏竜田バーガー","calories": 473,"protein_g": 18.0,"fat_g": 27.5,"carbs_g": 38.8,"salt_g": 2.5,"serving_label": "1品（182g）","weight_g": 182,"default_meal_type": "lunch","tag": "バーガー"},
  {"name": "ケンタの鶏竜田バーガー 香味ネギソース","calories": 501,"protein_g": 18.3,"fat_g": 28.2,"carbs_g": 43.7,"salt_g": 3.1,"serving_label": "1品（197g）","weight_g": 197,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "チキンフィレバーガー","calories": 398,"protein_g": 24.3,"fat_g": 19.7,"carbs_g": 31.1,"salt_g": 2.4,"serving_label": "1品（161g）","weight_g": 161,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "辛口チキンフィレバーガー","calories": 384,"protein_g": 24.4,"fat_g": 17.8,"carbs_g": 31.9,"salt_g": 2.6,"serving_label": "1品（161g）","weight_g": 161,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "チーズチキンフィレバーガー","calories": 468,"protein_g": 26.8,"fat_g": 25.8,"carbs_g": 32.1,"salt_g": 2.9,"serving_label": "1品（178g）","weight_g": 178,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "ダブルチキンフィレバーガー","calories": 615,"protein_g": 44.6,"fat_g": 30.7,"carbs_g": 40.0,"salt_g": 4.2,"serving_label": "1品（248g）","weight_g": 248,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "和風チキンカツバーガー","calories": 426,"protein_g": 16.0,"fat_g": 22.3,"carbs_g": 40.5,"salt_g": 2.0,"serving_label": "1品（165g）","weight_g": 165,"default_meal_type": "snack","tag": "バーガー"},
  {"name": "ペッパーマヨツイスター","calories": 302,"protein_g": 10.8,"fat_g": 14.8,"carbs_g": 32.0,"salt_g": 1.9,"serving_label": "1品（143g）","weight_g": 143,"default_meal_type": "lunch","tag": "ツイスター"},
  {"name": "てりやきツイスター","calories": 360,"protein_g": 11.6,"fat_g": 18.8,"carbs_g": 35.0,"salt_g": 2.0,"serving_label": "1品（143g）","weight_g": 143,"default_meal_type": "lunch","tag": "ツイスター"},
  {"name": "カーネルクランチポテト S","calories": 191,"protein_g": 2.5,"fat_g": 9.7,"carbs_g": 23.6,"salt_g": 1.1,"serving_label": "1品（70g）","weight_g": 70,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "カーネルクランチポテト L","calories": 382,"protein_g": 5.0,"fat_g": 19.3,"carbs_g": 47.2,"salt_g": 2.1,"serving_label": "1品（140g）","weight_g": 140,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "カーネルクランチポテト ＢＯＸ","calories": 860,"protein_g": 11.3,"fat_g": 43.5,"carbs_g": 106.2,"salt_g": 4.7,"serving_label": "1品（315g）","weight_g": 315,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "フライドポテト Ｓ","calories": 195,"protein_g": 2.6,"fat_g": 7.8,"carbs_g": 28.7,"salt_g": 1.2,"serving_label": "1品（80g）","weight_g": 80,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "フライドポテト Ｌ","calories": 390,"protein_g": 5.3,"fat_g": 15.5,"carbs_g": 57.4,"salt_g": 2.4,"serving_label": "1品（160g）","weight_g": 160,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "フライドポテト ＢＯＸ","calories": 908,"protein_g": 12.3,"fat_g": 36.1,"carbs_g": 133.5,"salt_g": 5.6,"serving_label": "1品（372g）","weight_g": 372,"default_meal_type": "snack","tag": "ポテト"},
  {"name": "コールスローＭ","calories": 137,"protein_g": 1.6,"fat_g": 10.2,"carbs_g": 10.3,"salt_g": 0.9,"serving_label": "1品（130g）","weight_g": 130,"default_meal_type": "snack","tag": "サラダ"},
  {"name": "コールスローＳ","calories": 85,"protein_g": 1.0,"fat_g": 6.3,"carbs_g": 6.3,"salt_g": 0.6,"serving_label": "1品（80g）","weight_g": 80,"default_meal_type": "snack","tag": "サラダ"},
  {"name": "ビスケット","calories": 211,"protein_g": 3.2,"fat_g": 12.5,"carbs_g": 21.3,"salt_g": 1.1,"serving_label": "1品（56g）","weight_g": 56,"default_meal_type": "snack","tag": "サイド"},
  {"name": "（ハニーメイプル）","calories": 30,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 7.0,"salt_g": 0.0,"serving_label": "1品（10g）","weight_g": 10,"default_meal_type": "snack","tag": "ソース"},
  {"name": "チョコパイ","calories": 270,"protein_g": 3.1,"fat_g": 15.8,"carbs_g": 29.0,"salt_g": 0.3,"serving_label": "1品（53g）","weight_g": 53,"default_meal_type": "snack","tag": "スイーツ"},
  {"name": "ちゅる～りぃ（グリーンライム）","calories": 202,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 51.2,"salt_g": 0.6,"serving_label": "1品（342g）","weight_g": 342,"default_meal_type": "snack","tag": "スイーツ"},
  {"name": "ちゅる～りぃ（ブルーハワイ）","calories": 196,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 49.8,"salt_g": 0.6,"serving_label": "1品（342g）","weight_g": 342,"default_meal_type": "snack","tag": "スイーツ"},
  {"name": "ちゅる～りぃ（ピンククランベリー）","calories": 202,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 51.0,"salt_g": 0.6,"serving_label": "1品（342g）","weight_g": 342,"default_meal_type": "snack","tag": "スイーツ"},
  {"name": "ガムシロップ","calories": 14,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 3.5,"salt_g": 0.0,"serving_label": "1品（5g）","weight_g": 5,"default_meal_type": "snack","tag": "サイド"},
  {"name": "スティックシュガー","calories": 12,"protein_g": 0.0,"fat_g": 0.0,"carbs_g": 3.0,"salt_g": 0.0,"serving_label": "1品（3g）","weight_g": 3,"default_meal_type": "snack","tag": "サイド"},
] satisfies KfcProduct[];

export const kfcOfficialFoods = products.map((product) =>
  official({
    brand: "ケンタッキー",
    name: product.name,
    category: "チェーン店",
    tags: [...baseTags, product.tag],
    calories: product.calories,
    protein_g: product.protein_g,
    fat_g: product.fat_g,
    carbs_g: product.carbs_g,
    salt_g: product.salt_g,
    serving_label: product.serving_label,
    weight_g: product.weight_g,
    default_meal_type: product.default_meal_type,
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  }),
);

import { official } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

type Row = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  default_meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  tags?: string[];
  source_url: string;
};

const rows: Row[] = [
  {
    "brand": "マクドナルド",
    "name": "エッグマックマフィン",
    "calories": 310,
    "protein_g": 18.6,
    "fat_g": 13.6,
    "carbs_g": 27.2,
    "salt_g": 1.5,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "マフィン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "グランドフライ",
    "calories": 724,
    "protein_g": 9.8,
    "fat_g": 35.2,
    "carbs_g": 92.3,
    "salt_g": 1.3,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "ポテト",
      "期間限定"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ケチャップ",
    "calories": 23,
    "protein_g": 0.4,
    "fat_g": 0.1,
    "carbs_g": 5.5,
    "salt_g": 0.5,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "シャカシャカポテト 金沢名物 黒カレー味シーズニング",
    "calories": 7,
    "protein_g": 0.5,
    "fat_g": 0.2,
    "carbs_g": 1,
    "salt_g": 0.7,
    "serving_label": "1袋",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "ポテト",
      "シーズニング"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "シャカチキ チェダーチーズ味シーズニング",
    "calories": 8,
    "protein_g": 0.3,
    "fat_g": 0.1,
    "carbs_g": 1.3,
    "salt_g": 0.4,
    "serving_label": "1袋",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "シーズニング"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "スパイシーチキンマックナゲット 5ピース",
    "calories": 255,
    "protein_g": 15,
    "fat_g": 15.9,
    "carbs_g": 13,
    "salt_g": 1.6,
    "serving_label": "5ピース",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "ナゲット",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ソフトツイスト",
    "calories": 146,
    "protein_g": 4,
    "fat_g": 3.7,
    "carbs_g": 24.2,
    "salt_g": 0.2,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "デザート"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ソーセージエッグマフィン",
    "calories": 477,
    "protein_g": 21.9,
    "fat_g": 30.6,
    "carbs_g": 27.3,
    "salt_g": 1.8,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "マフィン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ソーセージマフィン",
    "calories": 397,
    "protein_g": 15.5,
    "fat_g": 25.1,
    "carbs_g": 27.1,
    "salt_g": 1.7,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "マフィン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "チキンマックマフィン",
    "calories": 398,
    "protein_g": 15,
    "fat_g": 20.4,
    "carbs_g": 38.4,
    "salt_g": 2,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "マフィン",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "チーズチーズてりやきマックバーガー",
    "calories": 578,
    "protein_g": 20.4,
    "fat_g": 38.2,
    "carbs_g": 38.9,
    "salt_g": 3.1,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "バーガー",
      "チーズ",
      "てりやき"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "チーズチーズダブルチーズバーガー",
    "calories": 561,
    "protein_g": 32.3,
    "fat_g": 33.2,
    "carbs_g": 33.1,
    "salt_g": 4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "バーガー",
      "チーズ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "バーベキューソース",
    "calories": 33,
    "protein_g": 0.2,
    "fat_g": 0.2,
    "carbs_g": 7.6,
    "salt_g": 0.5,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "プチパンケーキ",
    "calories": 161,
    "protein_g": 3.8,
    "fat_g": 4.4,
    "carbs_g": 26.4,
    "salt_g": 0.8,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "デザート"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ベーコンエッグマックサンド",
    "calories": 294,
    "protein_g": 16.3,
    "fat_g": 12.6,
    "carbs_g": 27.9,
    "salt_g": 1.5,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ペッパーチーズソース",
    "calories": 84,
    "protein_g": 0.2,
    "fat_g": 8.5,
    "carbs_g": 1.7,
    "salt_g": 1,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ホットアップルパイ",
    "calories": 211,
    "protein_g": 2.1,
    "fat_g": 10.9,
    "carbs_g": 26.2,
    "salt_g": 0.6,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "デザート"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ホットケーキ",
    "calories": 323,
    "protein_g": 8.3,
    "fat_g": 9.3,
    "carbs_g": 53.5,
    "salt_g": 1.4,
    "serving_label": "3枚",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "ホットケーキ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ホットケーキシロップ",
    "calories": 121,
    "protein_g": 0,
    "fat_g": 0,
    "carbs_g": 30.3,
    "salt_g": 0,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "ホットチリガーリックソース",
    "calories": 25,
    "protein_g": 0.3,
    "fat_g": 0.6,
    "carbs_g": 4.8,
    "salt_g": 0.7,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マスタードソース",
    "calories": 43,
    "protein_g": 0.4,
    "fat_g": 2.2,
    "carbs_g": 5.4,
    "salt_g": 0.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックグリドル ソーセージ",
    "calories": 414,
    "protein_g": 10.5,
    "fat_g": 23.4,
    "carbs_g": 40.4,
    "salt_g": 2.4,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "グリドル"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックグリドル ソーセージエッグ",
    "calories": 545,
    "protein_g": 19.8,
    "fat_g": 32.9,
    "carbs_g": 41.3,
    "salt_g": 3,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "グリドル"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックグリドル ベーコンエッグ",
    "calories": 382,
    "protein_g": 15.6,
    "fat_g": 16.7,
    "carbs_g": 41.3,
    "salt_g": 2.6,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "グリドル"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックチキン",
    "calories": 383,
    "protein_g": 13.5,
    "fat_g": 19.2,
    "carbs_g": 39.5,
    "salt_g": 2.2,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックフライポテト L",
    "calories": 515,
    "protein_g": 7,
    "fat_g": 25,
    "carbs_g": 66,
    "salt_g": 0.9,
    "serving_label": "L",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックフライポテト M",
    "calories": 409,
    "protein_g": 5.5,
    "fat_g": 19.8,
    "carbs_g": 52.4,
    "salt_g": 0.7,
    "serving_label": "M",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックフルーリー オレオ クッキー",
    "calories": 233,
    "protein_g": 5.9,
    "fat_g": 6.7,
    "carbs_g": 37.4,
    "salt_g": 0.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "デザート"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "マックフルーリー 超 オレオ クッキー",
    "calories": 352,
    "protein_g": 7.9,
    "fat_g": 10.7,
    "carbs_g": 56.6,
    "salt_g": 0.6,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "デザート"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "メガマフィン",
    "calories": 693,
    "protein_g": 30,
    "fat_g": 49.3,
    "carbs_g": 31.2,
    "salt_g": 3.1,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "朝マック",
      "マフィン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍えびフィレオ",
    "calories": 582,
    "protein_g": 17.5,
    "fat_g": 26.7,
    "carbs_g": 68.7,
    "salt_g": 3.1,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "えび"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍てりやきチキンフィレオ",
    "calories": 769,
    "protein_g": 35,
    "fat_g": 36.4,
    "carbs_g": 76.3,
    "salt_g": 5.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍てりやきマックバーガー",
    "calories": 731,
    "protein_g": 23.9,
    "fat_g": 50.7,
    "carbs_g": 45.6,
    "salt_g": 3.2,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "てりやき"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍エグチ",
    "calories": 489,
    "protein_g": 29.9,
    "fat_g": 26.6,
    "carbs_g": 31.2,
    "salt_g": 2.5,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "卵"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍ダブルチーズバーガー",
    "calories": 657,
    "protein_g": 41.5,
    "fat_g": 40.3,
    "carbs_g": 31.8,
    "salt_g": 3.8,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チーズ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍チキチー",
    "calories": 593,
    "protein_g": 24.7,
    "fat_g": 32.8,
    "carbs_g": 50.4,
    "salt_g": 3.8,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チキン",
      "チーズ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍チキンフィレオ",
    "calories": 725,
    "protein_g": 34.6,
    "fat_g": 37.1,
    "carbs_g": 63.8,
    "salt_g": 4.7,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍チーズバーガー",
    "calories": 409,
    "protein_g": 23.5,
    "fat_g": 21.1,
    "carbs_g": 31,
    "salt_g": 2.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チーズ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍ハンバーガー",
    "calories": 358,
    "protein_g": 20.6,
    "fat_g": 17.1,
    "carbs_g": 30.3,
    "salt_g": 1.9,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍ビッグマック",
    "calories": 723,
    "protein_g": 41.3,
    "fat_g": 43.1,
    "carbs_g": 42.1,
    "salt_g": 3.6,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍フィレオフィッシュ",
    "calories": 453,
    "protein_g": 23.4,
    "fat_g": 19.1,
    "carbs_g": 46.9,
    "salt_g": 2,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "魚"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍ベーコンレタスバーガー",
    "calories": 461,
    "protein_g": 25,
    "fat_g": 27,
    "carbs_g": 30.1,
    "salt_g": 2.7,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍マックチキン",
    "calories": 542,
    "protein_g": 21.9,
    "fat_g": 28.8,
    "carbs_g": 49.7,
    "salt_g": 3.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "倍マックポーク",
    "calories": 628,
    "protein_g": 24.3,
    "fat_g": 43.2,
    "carbs_g": 35.8,
    "salt_g": 2.5,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "夜マック",
      "バーガー",
      "ポーク"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "北海道じゃがチーズてりやき",
    "calories": 491,
    "protein_g": 17.9,
    "fat_g": 29.7,
    "carbs_g": 39.1,
    "salt_g": 2.9,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "バーガー",
      "てりやき",
      "チーズ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "北海道じゃがチーズてりやきマフィン",
    "calories": 454,
    "protein_g": 16.6,
    "fat_g": 26.7,
    "carbs_g": 36.9,
    "salt_g": 2.8,
    "serving_label": "朝マック",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "breakfast",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "朝マック",
      "マフィン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "博多明太バターてりやき",
    "calories": 542,
    "protein_g": 17.3,
    "fat_g": 36.4,
    "carbs_g": 37.2,
    "salt_g": 3.1,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "バーガー",
      "てりやき",
      "明太"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "名古屋名物 手羽先風黒胡椒ジューシーチキン",
    "calories": 470,
    "protein_g": 16.4,
    "fat_g": 22.3,
    "carbs_g": 51.8,
    "salt_g": 3.4,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "期間限定",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "炙り醤油風たまごベーコン肉厚ビーフ",
    "calories": 517,
    "protein_g": 29,
    "fat_g": 27.8,
    "carbs_g": 37.3,
    "salt_g": 3,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "バーガー",
      "ビーフ",
      "卵"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "炙り醤油風ダブル肉厚ビーフ",
    "calories": 633,
    "protein_g": 34.4,
    "fat_g": 38.7,
    "carbs_g": 37.2,
    "salt_g": 3.1,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "lunch",
    "tags": [
      "マクドナルド",
      "公式",
      "バーガー",
      "ビーフ"
    ]
  },
  {
    "brand": "マクドナルド",
    "name": "焙煎胡麻ドレッシング(カロリーハーフ)",
    "calories": 27,
    "protein_g": 0.4,
    "fat_g": 1.7,
    "carbs_g": 2.5,
    "salt_g": 0.6,
    "serving_label": "1個",
    "source_url": "https://www.mcdonalds.co.jp/quality/allergy_Nutrition/nutrient/",
    "default_meal_type": "snack",
    "tags": [
      "マクドナルド",
      "公式",
      "ドレッシング",
      "サラダ"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "LAS VEGAS style ダブルダウンフィレバーガー",
    "calories": 625,
    "protein_g": 44.7,
    "fat_g": 34.7,
    "carbs_g": 32.5,
    "salt_g": 4.7,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "バーガー",
      "期間限定",
      "高たんぱく"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "NEW YORK style オニオンリングフィレバーガー",
    "calories": 564,
    "protein_g": 28.5,
    "fat_g": 29.7,
    "carbs_g": 45.7,
    "salt_g": 3.5,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "バーガー",
      "期間限定"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "TEXAS style スパイシーアボカドフィレバーガー",
    "calories": 418,
    "protein_g": 27.6,
    "fat_g": 19.8,
    "carbs_g": 33.4,
    "salt_g": 3.3,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "バーガー",
      "期間限定"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ちゅる～りぃ さくらんぼ",
    "calories": 202,
    "protein_g": 1.6,
    "fat_g": 0.3,
    "carbs_g": 49.2,
    "salt_g": 0,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "snack",
    "tags": [
      "KFC",
      "公式",
      "デザート",
      "ドリンク"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ちゅる～りぃ アップルマンゴー",
    "calories": 196,
    "protein_g": 1.1,
    "fat_g": 0.2,
    "carbs_g": 48.4,
    "salt_g": 0,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "snack",
    "tags": [
      "KFC",
      "公式",
      "デザート",
      "ドリンク"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ちゅる～りぃ ソーダ",
    "calories": 202,
    "protein_g": 0.6,
    "fat_g": 0.1,
    "carbs_g": 50,
    "salt_g": 0,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "snack",
    "tags": [
      "KFC",
      "公式",
      "デザート",
      "ドリンク"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "カーネルクランチポテト BOX",
    "calories": 860,
    "protein_g": 11.3,
    "fat_g": 43.5,
    "carbs_g": 106.2,
    "salt_g": 4.7,
    "serving_label": "BOX",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "カーネルクランチポテト L",
    "calories": 382,
    "protein_g": 5,
    "fat_g": 19.3,
    "carbs_g": 47.2,
    "salt_g": 2.1,
    "serving_label": "L",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "カーネルクランチポテト S",
    "calories": 191,
    "protein_g": 2.5,
    "fat_g": 9.7,
    "carbs_g": 23.6,
    "salt_g": 1.1,
    "serving_label": "S",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ケチャップ",
    "calories": 11,
    "protein_g": 0.1,
    "fat_g": 0,
    "carbs_g": 2.6,
    "salt_g": 0.2,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "snack",
    "tags": [
      "KFC",
      "公式",
      "ソース"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ケンタの鶏竜田バーガー",
    "calories": 473,
    "protein_g": 18,
    "fat_g": 27.5,
    "carbs_g": 38.8,
    "salt_g": 2.5,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ケンタの鶏竜田バーガー 香味ネギソース",
    "calories": 501,
    "protein_g": 18.3,
    "fat_g": 28.2,
    "carbs_g": 43.7,
    "salt_g": 3.1,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "バーガー",
      "チキン"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "ハニーメイプル",
    "calories": 30,
    "protein_g": 0,
    "fat_g": 0,
    "carbs_g": 7.5,
    "salt_g": 0,
    "serving_label": "1個",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "snack",
    "tags": [
      "KFC",
      "公式",
      "ソース",
      "ビスケット"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "フライドポテト BOX",
    "calories": 908,
    "protein_g": 12.3,
    "fat_g": 36.1,
    "carbs_g": 133.5,
    "salt_g": 5.6,
    "serving_label": "BOX",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "サイド",
      "ポテト"
    ]
  },
  {
    "brand": "ケンタッキーフライドチキン",
    "name": "レモン香るパリパリ旨塩チキン",
    "calories": 253,
    "protein_g": 17.6,
    "fat_g": 15,
    "carbs_g": 11.9,
    "salt_g": 1.6,
    "serving_label": "1ピース",
    "source_url": "https://japan.kfc.co.jp/pdf/nutrition.pdf",
    "default_meal_type": "lunch",
    "tags": [
      "KFC",
      "公式",
      "チキン",
      "期間限定"
    ]
  },
]

export const mcdonaldsKfcOfficialCoverageFoods = rows.map((row) =>
  official({
    brand: row.brand,
    category: "チェーン店",
    name: row.name,
    tags: row.tags ?? [],
    calories: row.calories,
    protein_g: row.protein_g,
    fat_g: row.fat_g,
    carbs_g: row.carbs_g,
    salt_g: row.salt_g,
    serving_label: row.serving_label,
    default_meal_type: row.default_meal_type ?? "lunch",
    source_url: row.source_url,
    fetched_at: fetchedAt,
  }),
);

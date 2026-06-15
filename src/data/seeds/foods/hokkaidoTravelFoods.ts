import { estimated } from "./helpers";
import type { MealType } from "../../../types";

const fetchedAt = "2026-06-16T00:00:00.000Z";

const sources = {
  toriton: "https://toriton-kita1.jp/menu/hokkaido/",
  furanoCheese: "https://www.furano-cheese.jp/html/pizza.html",
  aonoza: "https://www.aonoza.com/cuisine/",
};

type HokkaidoTravelFood = {
  brand?: string;
  name: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label?: string;
  default_meal_type?: MealType;
  source_url?: string;
};

const travelFood = (item: HokkaidoTravelFood) =>
  estimated({
    brand: item.brand,
    name: item.name,
    category: item.category,
    tags: ["北海道旅行2026", "北海道旅行", "旅行メニュー", "栄養推定", ...item.tags],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label ?? "1品",
    default_meal_type: item.default_meal_type ?? "lunch",
    source_url: item.source_url,
    fetched_at: fetchedAt,
  });

const sushiTags = ["寿司", "海鮮", "北海道"];
const tritonTags = ["トリトン", "回転寿司", "公式メニュー確認", ...sushiTags];
const hokuhokuteiTags = ["北々亭", "回転寿司", "旅行候補", ...sushiTags];
const generalSushiTags = ["一般寿司", ...sushiTags];
const aonozaTags = ["支笏湖", "碧の座", "公式料理ページ確認", "旅行候補"];

const toritonRollSideFoods = [
  travelFood({ brand: "トリトン", name: "とろにしん", category: "チェーン店", tags: [...tritonTags, "にしん", "とろにしん", "握り", "旅行候補"], calories: 125, protein_g: 8, fat_g: 5, carbs_g: 14, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ツナサラダ", category: "チェーン店", tags: [...tritonTags, "ツナ", "軍艦"], calories: 145, protein_g: 5, fat_g: 6, carbs_g: 18, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "マヨコーン", category: "チェーン店", tags: [...tritonTags, "コーン", "軍艦"], calories: 145, protein_g: 3, fat_g: 6, carbs_g: 21, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "軍艦納豆", category: "チェーン店", tags: [...tritonTags, "納豆", "軍艦"], calories: 130, protein_g: 6, fat_g: 3, carbs_g: 20, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "えびマヨ", category: "チェーン店", tags: [...tritonTags, "えび", "マヨ", "軍艦"], calories: 150, protein_g: 6, fat_g: 6, carbs_g: 18, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "トビッ子", category: "チェーン店", tags: [...tritonTags, "とびっこ", "軍艦"], calories: 105, protein_g: 5, fat_g: 2, carbs_g: 17, salt_g: 0.9, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "まぐろたたき", category: "チェーン店", tags: [...tritonTags, "まぐろ", "軍艦"], calories: 130, protein_g: 7, fat_g: 4, carbs_g: 17, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "納豆巻", category: "チェーン店", tags: [...tritonTags, "納豆", "巻物"], calories: 185, protein_g: 7, fat_g: 3, carbs_g: 34, salt_g: 0.8, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "梅じそ巻", category: "チェーン店", tags: [...tritonTags, "梅", "しそ", "巻物"], calories: 160, protein_g: 4, fat_g: 1, carbs_g: 35, salt_g: 1.2, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "かんぴょう巻", category: "チェーン店", tags: [...tritonTags, "かんぴょう", "巻物"], calories: 175, protein_g: 4, fat_g: 1, carbs_g: 39, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "おしんこ巻", category: "チェーン店", tags: [...tritonTags, "おしんこ", "奈良漬け", "巻物"], calories: 165, protein_g: 4, fat_g: 1, carbs_g: 36, salt_g: 1.3, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "かっぱ巻", category: "チェーン店", tags: [...tritonTags, "きゅうり", "巻物"], calories: 150, protein_g: 4, fat_g: 1, carbs_g: 33, salt_g: 0.6, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "たまご巻", category: "チェーン店", tags: [...tritonTags, "玉子", "巻物"], calories: 190, protein_g: 6, fat_g: 4, carbs_g: 34, salt_g: 0.9, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "大人の納豆巻", category: "チェーン店", tags: [...tritonTags, "納豆", "山わさび", "ねぎ", "巻物"], calories: 190, protein_g: 7, fat_g: 3, carbs_g: 35, salt_g: 0.9, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ツナサラダ巻", category: "チェーン店", tags: [...tritonTags, "ツナ", "マヨ", "巻物"], calories: 240, protein_g: 7, fat_g: 9, carbs_g: 34, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "サーモン巻", category: "チェーン店", tags: [...tritonTags, "サーモン", "巻物"], calories: 210, protein_g: 9, fat_g: 4, carbs_g: 34, salt_g: 0.8, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "さばじそ巻", category: "チェーン店", tags: [...tritonTags, "さば", "しそ", "巻物"], calories: 230, protein_g: 10, fat_g: 6, carbs_g: 34, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "鉄火巻", category: "チェーン店", tags: [...tritonTags, "まぐろ", "巻物"], calories: 190, protein_g: 10, fat_g: 1, carbs_g: 34, salt_g: 0.8, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "まぐろたくあん巻", category: "チェーン店", tags: [...tritonTags, "まぐろ", "たくあん", "巻物"], calories: 210, protein_g: 9, fat_g: 2, carbs_g: 38, salt_g: 1.3, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "梅かっぱ巻", category: "チェーン店", tags: [...tritonTags, "梅", "きゅうり", "巻物"], calories: 160, protein_g: 4, fat_g: 1, carbs_g: 35, salt_g: 1.1, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "えび天巻", category: "チェーン店", tags: [...tritonTags, "えび天", "天ぷら", "巻物"], calories: 280, protein_g: 9, fat_g: 9, carbs_g: 40, salt_g: 1.3, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "山わさびかっぱ巻", category: "チェーン店", tags: [...tritonTags, "山わさび", "きゅうり", "巻物"], calories: 155, protein_g: 4, fat_g: 1, carbs_g: 34, salt_g: 0.7, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "山わさびかんぴょう巻", category: "チェーン店", tags: [...tritonTags, "山わさび", "かんぴょう", "巻物"], calories: 180, protein_g: 4, fat_g: 1, carbs_g: 40, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "から揚げマヨ巻", category: "チェーン店", tags: [...tritonTags, "唐揚げ", "マヨ", "巻物"], calories: 330, protein_g: 12, fat_g: 13, carbs_g: 42, salt_g: 1.4, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "まぐろアボカドロール", category: "チェーン店", tags: [...tritonTags, "まぐろ", "アボカド", "ロール", "巻物"], calories: 270, protein_g: 11, fat_g: 10, carbs_g: 35, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "サーモンアボカドロール", category: "チェーン店", tags: [...tritonTags, "サーモン", "アボカド", "ロール", "巻物"], calories: 285, protein_g: 11, fat_g: 12, carbs_g: 35, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "エビアボカドロール", category: "チェーン店", tags: [...tritonTags, "えび", "アボカド", "ロール", "巻物"], calories: 265, protein_g: 10, fat_g: 10, carbs_g: 35, salt_g: 1.0, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ニクソンロール", category: "チェーン店", tags: [...tritonTags, "ロール", "巻物"], calories: 340, protein_g: 13, fat_g: 14, carbs_g: 42, salt_g: 1.5, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "とろたく巻", category: "チェーン店", tags: [...tritonTags, "中とろ", "たくあん", "巻物"], calories: 300, protein_g: 11, fat_g: 11, carbs_g: 39, salt_g: 1.3, serving_label: "1本", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "厚焼玉子", category: "チェーン店", tags: [...tritonTags, "玉子", "サイド"], calories: 170, protein_g: 9, fat_g: 8, carbs_g: 15, salt_g: 1.0, serving_label: "1皿", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "いなり", category: "チェーン店", tags: [...tritonTags, "いなり", "サイド"], calories: 190, protein_g: 6, fat_g: 5, carbs_g: 32, salt_g: 1.0, serving_label: "2個", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ポテトフライ", category: "チェーン店", tags: [...tritonTags, "ポテト", "サイド"], calories: 310, protein_g: 4, fat_g: 15, carbs_g: 40, salt_g: 1.2, serving_label: "1皿", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "げそあげ", category: "チェーン店", tags: [...tritonTags, "いか", "げそ", "揚げ物", "サイド"], calories: 330, protein_g: 22, fat_g: 18, carbs_g: 20, salt_g: 2.0, serving_label: "1皿", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "温かい海老天うどん", category: "チェーン店", tags: [...tritonTags, "うどん", "海老天", "サイド"], calories: 430, protein_g: 15, fat_g: 10, carbs_g: 70, salt_g: 5.5, serving_label: "1杯", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "温かい海老天そば", category: "チェーン店", tags: [...tritonTags, "そば", "海老天", "サイド"], calories: 450, protein_g: 18, fat_g: 10, carbs_g: 72, salt_g: 5.6, serving_label: "1杯", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "シルクアイス・アイスクリーム各種", category: "チェーン店", tags: [...tritonTags, "アイス", "デザート"], calories: 210, protein_g: 4, fat_g: 10, carbs_g: 27, salt_g: 0.2, serving_label: "1個", default_meal_type: "snack", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ビール中ジョッキ", category: "チェーン店", tags: [...tritonTags, "ビール", "アルコール", "ドリンク"], calories: 200, protein_g: 1, fat_g: 0, carbs_g: 15, salt_g: 0, serving_label: "中ジョッキ1杯", default_meal_type: "dinner", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ノンアルコールビール", category: "チェーン店", tags: [...tritonTags, "ノンアルコール", "ビール", "ドリンク"], calories: 55, protein_g: 0.5, fat_g: 0, carbs_g: 13, salt_g: 0.1, serving_label: "1本", default_meal_type: "dinner", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "コカ・コーラ", category: "チェーン店", tags: [...tritonTags, "コーラ", "ドリンク"], calories: 90, protein_g: 0, fat_g: 0, carbs_g: 22.5, salt_g: 0, serving_label: "200ml", default_meal_type: "snack", source_url: sources.toriton }),
];

const aonozaExpandedFoods = [
  travelFood({ brand: "碧の座", name: "水白 和食懐石 八寸", category: "おかず・惣菜", tags: [...aonozaTags, "水白", "懐石", "八寸", "夕食"], calories: 260, protein_g: 12, fat_g: 12, carbs_g: 24, salt_g: 1.8, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 椀物", category: "スープ", tags: [...aonozaTags, "水白", "懐石", "椀物", "夕食"], calories: 120, protein_g: 8, fat_g: 4, carbs_g: 12, salt_g: 1.5, serving_label: "1椀", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 焼き魚", category: "肉・魚", tags: [...aonozaTags, "水白", "懐石", "焼き魚", "夕食"], calories: 280, protein_g: 28, fat_g: 16, carbs_g: 4, salt_g: 1.8, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 天ぷら", category: "おかず・惣菜", tags: [...aonozaTags, "水白", "懐石", "天ぷら", "夕食"], calories: 420, protein_g: 18, fat_g: 24, carbs_g: 36, salt_g: 1.5, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 季節の甘味", category: "スイーツ", tags: [...aonozaTags, "水白", "懐石", "甘味", "デザート"], calories: 260, protein_g: 4, fat_g: 10, carbs_g: 38, salt_g: 0.2, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "青翠 鉄板焼き 道産野菜", category: "サラダ・野菜", tags: [...aonozaTags, "青翠", "鉄板焼き", "道産野菜", "夕食"], calories: 160, protein_g: 5, fat_g: 9, carbs_g: 18, salt_g: 1.0, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "青翠 鉄板焼き 道産牛サーロイン", category: "肉・魚", tags: [...aonozaTags, "青翠", "鉄板焼き", "道産牛", "ステーキ", "夕食"], calories: 760, protein_g: 42, fat_g: 62, carbs_g: 4, salt_g: 2.0, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "青翠 鉄板焼き 海鮮盛り", category: "肉・魚", tags: [...aonozaTags, "青翠", "鉄板焼き", "海鮮", "夕食"], calories: 360, protein_g: 38, fat_g: 18, carbs_g: 10, salt_g: 2.0, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "青翠 ガーリックライス", category: "ごはん・丼", tags: [...aonozaTags, "青翠", "鉄板焼き", "ガーリックライス", "夕食"], calories: 420, protein_g: 8, fat_g: 14, carbs_g: 66, salt_g: 1.8, serving_label: "1杯", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 朝食 焼き魚", category: "肉・魚", tags: [...aonozaTags, "水白", "朝食", "焼き魚"], calories: 240, protein_g: 24, fat_g: 12, carbs_g: 4, salt_g: 1.6, serving_label: "1皿", default_meal_type: "breakfast", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "水白 朝食 ご飯・味噌汁セット", category: "ごはん・丼", tags: [...aonozaTags, "水白", "朝食", "ご飯", "味噌汁"], calories: 420, protein_g: 10, fat_g: 4, carbs_g: 82, salt_g: 2.2, serving_label: "1膳", default_meal_type: "breakfast", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "バーラウンジ青藍 食後のドリンク", category: "ドリンク", tags: [...aonozaTags, "青藍", "バーラウンジ", "ドリンク"], calories: 120, protein_g: 0, fat_g: 0, carbs_g: 8, salt_g: 0, serving_label: "1杯", default_meal_type: "snack", source_url: sources.aonoza }),
];

export const hokkaidoTravelFoods = [
  travelFood({ brand: "トリトン", name: "サーモン", category: "チェーン店", tags: [...tritonTags, "握り"], calories: 115, protein_g: 8, fat_g: 3.5, carbs_g: 14, salt_g: 0.5, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "生サーモン", category: "チェーン店", tags: [...tritonTags, "握り"], calories: 125, protein_g: 8.5, fat_g: 4.5, carbs_g: 14, salt_g: 0.5, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "炙りサーモンマヨ", category: "チェーン店", tags: [...tritonTags, "炙り", "マヨ"], calories: 165, protein_g: 8, fat_g: 8, carbs_g: 15, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "本まぐろ赤身", category: "チェーン店", tags: [...tritonTags, "まぐろ", "握り"], calories: 65, protein_g: 6, fat_g: 0.5, carbs_g: 8, salt_g: 0.3, serving_label: "1貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "本まぐろ中とろ", category: "チェーン店", tags: [...tritonTags, "まぐろ", "中とろ", "握り"], calories: 95, protein_g: 6, fat_g: 4, carbs_g: 8, salt_g: 0.3, serving_label: "1貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "天然まぐろ", category: "チェーン店", tags: [...tritonTags, "まぐろ", "握り"], calories: 100, protein_g: 12, fat_g: 1, carbs_g: 16, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "真いか", category: "チェーン店", tags: [...tritonTags, "いか", "握り"], calories: 90, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "真いか山わさび", category: "チェーン店", tags: [...tritonTags, "いか", "山わさび", "握り"], calories: 95, protein_g: 8, fat_g: 0.5, carbs_g: 16, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "たこ足", category: "チェーン店", tags: [...tritonTags, "たこ", "北海道産", "握り"], calories: 95, protein_g: 9, fat_g: 0.6, carbs_g: 14, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "たこ頭", category: "チェーン店", tags: [...tritonTags, "たこ", "北海道産", "握り"], calories: 100, protein_g: 9, fat_g: 0.8, carbs_g: 15, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "天然白つぶ", category: "チェーン店", tags: [...tritonTags, "つぶ", "貝", "握り"], calories: 90, protein_g: 8, fat_g: 0.5, carbs_g: 14, salt_g: 0.6, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "天然白つぶ塩レモン", category: "チェーン店", tags: [...tritonTags, "つぶ", "貝", "塩レモン", "握り"], calories: 95, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ほたて", category: "チェーン店", tags: [...tritonTags, "ほたて", "北海道産", "貝", "握り"], calories: 55, protein_g: 5, fat_g: 0.3, carbs_g: 8, salt_g: 0.3, serving_label: "1貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "ボイルほっき", category: "チェーン店", tags: [...tritonTags, "ほっき", "北海道産", "貝", "握り"], calories: 105, protein_g: 10, fat_g: 0.8, carbs_g: 15, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "甘えび", category: "チェーン店", tags: [...tritonTags, "えび", "握り"], calories: 95, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "大海老", category: "チェーン店", tags: [...tritonTags, "えび", "握り"], calories: 55, protein_g: 5, fat_g: 0.3, carbs_g: 8, salt_g: 0.3, serving_label: "1貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "いくら醤油漬", category: "チェーン店", tags: [...tritonTags, "いくら", "軍艦"], calories: 115, protein_g: 5, fat_g: 3, carbs_g: 17, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "かにいくら", category: "チェーン店", tags: [...tritonTags, "かに", "いくら", "軍艦"], calories: 120, protein_g: 6, fat_g: 3, carbs_g: 17, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "かにみそ", category: "チェーン店", tags: [...tritonTags, "かにみそ", "軍艦"], calories: 105, protein_g: 5, fat_g: 3, carbs_g: 16, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "えびいくら", category: "チェーン店", tags: [...tritonTags, "えび", "いくら", "軍艦"], calories: 115, protein_g: 6, fat_g: 2, carbs_g: 17, salt_g: 0.8, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "生ほっきひも", category: "チェーン店", tags: [...tritonTags, "ほっき", "北海道産", "軍艦"], calories: 95, protein_g: 8, fat_g: 0.7, carbs_g: 16, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "海鮮爆弾軍艦", category: "チェーン店", tags: [...tritonTags, "海鮮", "軍艦"], calories: 135, protein_g: 8, fat_g: 4, carbs_g: 17, salt_g: 0.9, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "炙りえんがわ焦がし醤油", category: "チェーン店", tags: [...tritonTags, "えんがわ", "炙り"], calories: 150, protein_g: 7, fat_g: 7, carbs_g: 15, salt_g: 0.7, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "活〆真だい", category: "チェーン店", tags: [...tritonTags, "鯛", "握り"], calories: 105, protein_g: 9, fat_g: 1, carbs_g: 15, salt_g: 0.5, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "天然煮穴子", category: "チェーン店", tags: [...tritonTags, "穴子", "握り"], calories: 140, protein_g: 7, fat_g: 3, carbs_g: 20, salt_g: 0.9, serving_label: "2貫", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "茶碗蒸し", category: "チェーン店", tags: [...tritonTags, "茶碗蒸し", "サイド"], calories: 110, protein_g: 7, fat_g: 5, carbs_g: 8, salt_g: 1.3, serving_label: "1個", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "いももち", category: "チェーン店", tags: [...tritonTags, "いももち", "北海道産", "サイド"], calories: 180, protein_g: 3, fat_g: 5, carbs_g: 31, salt_g: 0.8, serving_label: "1皿", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "鶏から揚げ", category: "チェーン店", tags: [...tritonTags, "唐揚げ", "サイド"], calories: 360, protein_g: 22, fat_g: 23, carbs_g: 18, salt_g: 1.8, serving_label: "1皿", source_url: sources.toriton }),
  travelFood({ brand: "トリトン", name: "濃厚クリームプリン", category: "チェーン店", tags: [...tritonTags, "プリン", "デザート"], calories: 260, protein_g: 6, fat_g: 15, carbs_g: 26, salt_g: 0.2, serving_label: "1個", default_meal_type: "snack", source_url: sources.toriton }),
  ...toritonRollSideFoods,

  travelFood({ brand: "北々亭", name: "北海三貫盛り", category: "チェーン店", tags: [...hokuhokuteiTags, "盛り合わせ", "いくら", "ほたて", "サーモン"], calories: 180, protein_g: 14, fat_g: 5, carbs_g: 22, salt_g: 1.0, serving_label: "3貫" }),
  travelFood({ brand: "北々亭", name: "まぐろ三貫盛り", category: "チェーン店", tags: [...hokuhokuteiTags, "盛り合わせ", "まぐろ"], calories: 210, protein_g: 18, fat_g: 6, carbs_g: 24, salt_g: 1.0, serving_label: "3貫" }),
  travelFood({ brand: "北々亭", name: "サーモン三貫盛り", category: "チェーン店", tags: [...hokuhokuteiTags, "盛り合わせ", "サーモン"], calories: 240, protein_g: 16, fat_g: 9, carbs_g: 24, salt_g: 1.0, serving_label: "3貫" }),
  travelFood({ brand: "北々亭", name: "炙り三貫盛り", category: "チェーン店", tags: [...hokuhokuteiTags, "盛り合わせ", "炙り"], calories: 260, protein_g: 16, fat_g: 11, carbs_g: 25, salt_g: 1.2, serving_label: "3貫" }),
  travelFood({ brand: "北々亭", name: "ほっき握り", category: "チェーン店", tags: [...hokuhokuteiTags, "ほっき", "貝"], calories: 105, protein_g: 10, fat_g: 0.8, carbs_g: 15, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ brand: "北々亭", name: "ほたて握り", category: "チェーン店", tags: [...hokuhokuteiTags, "ほたて", "貝"], calories: 105, protein_g: 10, fat_g: 0.6, carbs_g: 15, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ brand: "北々亭", name: "いくら軍艦", category: "チェーン店", tags: [...hokuhokuteiTags, "いくら", "軍艦"], calories: 115, protein_g: 5, fat_g: 3, carbs_g: 17, salt_g: 0.8, serving_label: "2貫" }),
  travelFood({ brand: "北々亭", name: "うに軍艦", category: "チェーン店", tags: [...hokuhokuteiTags, "うに", "軍艦"], calories: 105, protein_g: 5, fat_g: 3, carbs_g: 15, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ brand: "北々亭", name: "かにみそ軍艦", category: "チェーン店", tags: [...hokuhokuteiTags, "かにみそ", "軍艦"], calories: 105, protein_g: 5, fat_g: 3, carbs_g: 16, salt_g: 0.8, serving_label: "2貫" }),
  travelFood({ brand: "北々亭", name: "海鮮茶碗蒸し", category: "チェーン店", tags: [...hokuhokuteiTags, "茶碗蒸し", "海鮮", "サイド"], calories: 130, protein_g: 9, fat_g: 5, carbs_g: 10, salt_g: 1.5, serving_label: "1個" }),

  travelFood({ name: "寿司 サーモン", category: "ごはん・丼", tags: [...generalSushiTags, "サーモン"], calories: 115, protein_g: 8, fat_g: 3.5, carbs_g: 14, salt_g: 0.5, serving_label: "2貫" }),
  travelFood({ name: "寿司 まぐろ赤身", category: "ごはん・丼", tags: [...generalSushiTags, "まぐろ"], calories: 100, protein_g: 12, fat_g: 1, carbs_g: 16, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ name: "寿司 中とろ", category: "ごはん・丼", tags: [...generalSushiTags, "まぐろ", "中とろ"], calories: 160, protein_g: 12, fat_g: 7, carbs_g: 16, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ name: "寿司 いか", category: "ごはん・丼", tags: [...generalSushiTags, "いか"], calories: 90, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, serving_label: "2貫" }),
  travelFood({ name: "寿司 たこ", category: "ごはん・丼", tags: [...generalSushiTags, "たこ"], calories: 95, protein_g: 9, fat_g: 0.6, carbs_g: 14, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ name: "寿司 ほたて", category: "ごはん・丼", tags: [...generalSushiTags, "ほたて", "貝"], calories: 105, protein_g: 10, fat_g: 0.6, carbs_g: 15, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ name: "寿司 ほっき", category: "ごはん・丼", tags: [...generalSushiTags, "ほっき", "貝"], calories: 105, protein_g: 10, fat_g: 0.8, carbs_g: 15, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ name: "寿司 甘えび", category: "ごはん・丼", tags: [...generalSushiTags, "えび"], calories: 95, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, serving_label: "2貫" }),
  travelFood({ name: "寿司 いくら軍艦", category: "ごはん・丼", tags: [...generalSushiTags, "いくら", "軍艦"], calories: 115, protein_g: 5, fat_g: 3, carbs_g: 17, salt_g: 0.8, serving_label: "2貫" }),
  travelFood({ name: "寿司 うに軍艦", category: "ごはん・丼", tags: [...generalSushiTags, "うに", "軍艦"], calories: 105, protein_g: 5, fat_g: 3, carbs_g: 15, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ name: "寿司 かに軍艦", category: "ごはん・丼", tags: [...generalSushiTags, "かに", "軍艦"], calories: 95, protein_g: 6, fat_g: 1, carbs_g: 16, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ name: "寿司 えんがわ", category: "ごはん・丼", tags: [...generalSushiTags, "えんがわ"], calories: 140, protein_g: 7, fat_g: 6, carbs_g: 15, salt_g: 0.6, serving_label: "2貫" }),
  travelFood({ name: "寿司 穴子", category: "ごはん・丼", tags: [...generalSushiTags, "穴子"], calories: 140, protein_g: 7, fat_g: 3, carbs_g: 20, salt_g: 0.9, serving_label: "2貫" }),
  travelFood({ name: "寿司 玉子", category: "ごはん・丼", tags: [...generalSushiTags, "玉子"], calories: 130, protein_g: 6, fat_g: 4, carbs_g: 18, salt_g: 0.7, serving_label: "2貫" }),
  travelFood({ name: "寿司 ネギトロ軍艦", category: "ごはん・丼", tags: [...generalSushiTags, "ねぎとろ", "軍艦"], calories: 130, protein_g: 6, fat_g: 5, carbs_g: 17, salt_g: 0.7, serving_label: "2貫" }),

  travelFood({ name: "苫小牧ほっきカレー", category: "ごはん・丼", tags: ["苫小牧", "海の駅", "ぷらっとみなと市場", "ほっき", "カレー", "ご当地"], calories: 780, protein_g: 25, fat_g: 22, carbs_g: 120, salt_g: 3.8, serving_label: "1皿" }),
  travelFood({ name: "ほっき飯", category: "ごはん・丼", tags: ["苫小牧", "海の駅", "ぷらっとみなと市場", "ほっき", "炊き込みご飯", "ご当地"], calories: 520, protein_g: 18, fat_g: 5, carbs_g: 94, salt_g: 2.8, serving_label: "1杯" }),
  travelFood({ name: "ほっきコロッケ", category: "おかず・惣菜", tags: ["苫小牧", "海の駅", "ぷらっとみなと市場", "ほっき", "コロッケ", "揚げ物", "ご当地"], calories: 220, protein_g: 6, fat_g: 11, carbs_g: 25, salt_g: 0.8, serving_label: "1個" }),
  travelFood({ name: "苫小牧海鮮丼", category: "ごはん・丼", tags: ["苫小牧", "海の駅", "ぷらっとみなと市場", "海鮮丼", "ほっき", "いくら"], calories: 700, protein_g: 40, fat_g: 14, carbs_g: 102, salt_g: 3.5, serving_label: "1杯" }),
  travelFood({ name: "浜焼きほたて", category: "肉・魚", tags: ["苫小牧", "海の駅", "ぷらっとみなと市場", "ほたて", "浜焼き", "貝"], calories: 130, protein_g: 18, fat_g: 3, carbs_g: 6, salt_g: 1.4, serving_label: "1枚" }),
  travelFood({ name: "焼きほっけ定食", category: "肉・魚", tags: ["北海道", "ほっけ", "焼き魚", "定食"], calories: 760, protein_g: 45, fat_g: 20, carbs_g: 96, salt_g: 4.2, serving_label: "1食" }),
  travelFood({ name: "ザンギ", category: "おかず・惣菜", tags: ["北海道", "唐揚げ", "鶏", "ご当地"], calories: 420, protein_g: 25, fat_g: 25, carbs_g: 22, salt_g: 2.0, serving_label: "1皿" }),
  travelFood({ name: "北海道豚丼", category: "ごはん・丼", tags: ["北海道", "豚丼", "帯広", "ご当地"], calories: 820, protein_g: 30, fat_g: 30, carbs_g: 104, salt_g: 3.6, serving_label: "1杯" }),
  travelFood({ name: "ジンギスカン定食", category: "肉・魚", tags: ["北海道", "ジンギスカン", "羊肉", "ご当地", "定食"], calories: 900, protein_g: 42, fat_g: 36, carbs_g: 98, salt_g: 4.0, serving_label: "1食" }),
  travelFood({ name: "スープカレー チキンレッグ", category: "ごはん・丼", tags: ["北海道", "札幌", "スープカレー", "チキン", "ご当地"], calories: 820, protein_g: 36, fat_g: 34, carbs_g: 92, salt_g: 4.5, serving_label: "1皿" }),
  travelFood({ name: "旭川醤油ラーメン", category: "麺類", tags: ["旭川", "ラーメン", "醤油", "ご当地"], calories: 620, protein_g: 25, fat_g: 20, carbs_g: 82, salt_g: 6.8, serving_label: "1杯" }),
  travelFood({ name: "旭川味噌ラーメン", category: "麺類", tags: ["旭川", "ラーメン", "味噌", "ご当地"], calories: 720, protein_g: 28, fat_g: 28, carbs_g: 86, salt_g: 7.0, serving_label: "1杯" }),
  travelFood({ name: "札幌味噌ラーメン バターコーン", category: "麺類", tags: ["北海道", "札幌", "ラーメン", "味噌", "バター", "コーン", "ご当地"], calories: 820, protein_g: 28, fat_g: 36, carbs_g: 92, salt_g: 7.2, serving_label: "1杯" }),

  travelFood({ brand: "富良野チーズ工房", name: "マルゲリータ", category: "パン", tags: ["富良野", "チーズ工房", "ピッツァ工房", "ピザ", "マルゲリータ", "公式メニュー確認"], calories: 760, protein_g: 30, fat_g: 28, carbs_g: 98, salt_g: 3.0, serving_label: "1枚", source_url: sources.furanoCheese }),
  travelFood({ brand: "富良野チーズ工房", name: "チーズ工房ピッツァ", category: "パン", tags: ["富良野", "チーズ工房", "ピッツァ工房", "ピザ", "チーズ", "公式メニュー確認"], calories: 860, protein_g: 36, fat_g: 36, carbs_g: 98, salt_g: 3.4, serving_label: "1枚", source_url: sources.furanoCheese }),
  travelFood({ brand: "富良野チーズ工房", name: "アスパラピッツァ", category: "パン", tags: ["富良野", "チーズ工房", "ピッツァ工房", "ピザ", "アスパラ", "季節限定", "公式メニュー確認"], calories: 820, protein_g: 32, fat_g: 32, carbs_g: 100, salt_g: 3.2, serving_label: "1枚", source_url: sources.furanoCheese }),
  travelFood({ brand: "富良野チーズ工房", name: "チーズソフトクリーム", category: "スイーツ", tags: ["富良野", "チーズ工房", "ソフトクリーム", "チーズ", "乳製品"], calories: 260, protein_g: 7, fat_g: 12, carbs_g: 32, salt_g: 0.3, serving_label: "1個", default_meal_type: "snack", source_url: "https://www.furano-cheese.jp/" }),
  travelFood({ brand: "富良野チーズ工房", name: "ふらのチーズ試食セット", category: "おかず・惣菜", tags: ["富良野", "チーズ工房", "チーズ", "乳製品"], calories: 220, protein_g: 14, fat_g: 17, carbs_g: 2, salt_g: 1.2, serving_label: "50g", default_meal_type: "snack", source_url: "https://www.furano-cheese.jp/" }),
  travelFood({ brand: "カンパーナ六花亭", name: "雪やこんこまじりっけなし", category: "スイーツ", tags: ["富良野", "カンパーナ六花亭", "ソフトクリーム", "スイーツ"], calories: 260, protein_g: 6, fat_g: 12, carbs_g: 34, salt_g: 0.2, serving_label: "1個", default_meal_type: "snack" }),
  travelFood({ brand: "カンパーナ六花亭", name: "マルセイバターサンド", category: "スイーツ", tags: ["富良野", "カンパーナ六花亭", "六花亭", "バターサンド", "お土産"], calories: 165, protein_g: 2.5, fat_g: 8.5, carbs_g: 19, salt_g: 0.1, serving_label: "1個", default_meal_type: "snack" }),
  travelFood({ brand: "bi.ble", name: "美瑛小麦のパン", category: "パン", tags: ["美瑛", "bi.ble", "パン", "小麦"], calories: 260, protein_g: 8, fat_g: 5, carbs_g: 46, salt_g: 1.0, serving_label: "1個" }),
  travelFood({ brand: "bi.ble", name: "じゃがいもパン", category: "パン", tags: ["美瑛", "bi.ble", "パン", "じゃがいも"], calories: 300, protein_g: 8, fat_g: 8, carbs_g: 50, salt_g: 1.2, serving_label: "1個" }),
  travelFood({ brand: "bi.ble", name: "クロワッサン", category: "パン", tags: ["美瑛", "bi.ble", "パン", "クロワッサン"], calories: 290, protein_g: 6, fat_g: 16, carbs_g: 30, salt_g: 0.8, serving_label: "1個" }),

  travelFood({ brand: "碧の座", name: "和食懐石コース", category: "おかず・惣菜", tags: ["支笏湖", "碧の座", "懐石", "コース", "夕食", "レビュー想定"], calories: 1200, protein_g: 65, fat_g: 45, carbs_g: 120, salt_g: 6.0, serving_label: "1コース", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "鉄板焼きコース", category: "肉・魚", tags: ["支笏湖", "碧の座", "鉄板焼き", "コース", "夕食", "レビュー想定"], calories: 1500, protein_g: 80, fat_g: 75, carbs_g: 95, salt_g: 6.0, serving_label: "1コース", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "道産和牛ステーキ", category: "肉・魚", tags: ["支笏湖", "碧の座", "鉄板焼き", "和牛", "ステーキ"], calories: 620, protein_g: 42, fat_g: 46, carbs_g: 6, salt_g: 1.8, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "鮑の鉄板焼き", category: "肉・魚", tags: ["支笏湖", "碧の座", "鉄板焼き", "鮑", "海鮮"], calories: 240, protein_g: 24, fat_g: 12, carbs_g: 8, salt_g: 1.6, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "帆立バター焼き", category: "肉・魚", tags: ["支笏湖", "碧の座", "鉄板焼き", "帆立", "バター"], calories: 260, protein_g: 22, fat_g: 16, carbs_g: 8, salt_g: 1.5, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "季節の刺身盛り", category: "肉・魚", tags: ["支笏湖", "碧の座", "懐石", "刺身", "海鮮"], calories: 260, protein_g: 32, fat_g: 8, carbs_g: 8, salt_g: 1.4, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "毛蟹・蟹料理", category: "肉・魚", tags: ["支笏湖", "碧の座", "懐石", "蟹", "海鮮"], calories: 280, protein_g: 36, fat_g: 8, carbs_g: 8, salt_g: 2.0, serving_label: "1皿", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "季節の炊き込みご飯", category: "ごはん・丼", tags: ["支笏湖", "碧の座", "懐石", "炊き込みご飯"], calories: 360, protein_g: 9, fat_g: 5, carbs_g: 68, salt_g: 1.8, serving_label: "茶碗1杯", default_meal_type: "dinner", source_url: sources.aonoza }),
  travelFood({ brand: "碧の座", name: "北海道朝食膳", category: "おかず・惣菜", tags: ["支笏湖", "碧の座", "朝食", "和食", "焼き魚"], calories: 850, protein_g: 40, fat_g: 28, carbs_g: 105, salt_g: 5.0, serving_label: "1膳", default_meal_type: "breakfast", source_url: sources.aonoza }),
  ...aonozaExpandedFoods,
];

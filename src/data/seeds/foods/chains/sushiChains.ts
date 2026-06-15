import { estimated } from "../helpers";
import type { MealType } from "../../../../types";

const fetchedAt = "2026-06-16T00:00:00.000Z";

const sources = {
  sushiroMenu: "https://www.akindo-sushiro.co.jp/menu/",
  sushiroAllergy: "https://www3.akindo-sushiro.co.jp/pdf/menu/allergy.pdf",
  hamaMenu: "https://www.hama-sushi.co.jp/menu/",
  hamaAllergen: "https://images.zensho.co.jp/materials/hama-sushi/allergen/allergen.pdf",
};

type SushiChainInput = {
  brand: "スシロー" | "はま寿司";
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags?: string[];
  serving_label?: string;
  default_meal_type?: MealType;
  source_url?: string;
};

const sushiChain = (item: SushiChainInput) =>
  estimated({
    brand: item.brand,
    name: item.name,
    category: "チェーン店",
    tags: [
      "和食",
      "寿司",
      "回転寿司",
      item.brand,
      item.brand === "はま寿司" ? "公式カロリー確認" : "公式メニュー確認",
      "栄養推定",
      ...(item.tags ?? []),
    ],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label ?? "1皿",
    default_meal_type: item.default_meal_type ?? "lunch",
    source_url: item.source_url ?? (item.brand === "はま寿司" ? sources.hamaAllergen : sources.sushiroAllergy),
    fetched_at: fetchedAt,
  });

const sushiro = (item: Omit<SushiChainInput, "brand">) => sushiChain({ brand: "スシロー", ...item });
const hama = (item: Omit<SushiChainInput, "brand">) => sushiChain({ brand: "はま寿司", ...item });

export const sushiChainFoods = [
  sushiro({ name: "まぐろ", calories: 90, protein_g: 10, fat_g: 1, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "まぐろ"], serving_label: "2貫" }),
  sushiro({ name: "厳選まぐろ赤身", calories: 90, protein_g: 10, fat_g: 1, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "まぐろ"], serving_label: "2貫" }),
  sushiro({ name: "本鮪中とろ", calories: 125, protein_g: 10, fat_g: 5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "まぐろ", "中とろ"], serving_label: "2貫" }),
  sushiro({ name: "特ネタ大とろ", calories: 150, protein_g: 9, fat_g: 8, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "まぐろ", "大とろ"], serving_label: "2貫" }),
  sushiro({ name: "びん長まぐろ", calories: 92, protein_g: 9, fat_g: 1, carbs_g: 16, salt_g: 0.5, tags: ["にぎり", "まぐろ"], serving_label: "2貫" }),
  sushiro({ name: "まぐろたたき軍艦", calories: 110, protein_g: 7, fat_g: 3, carbs_g: 17, salt_g: 0.7, tags: ["軍艦", "まぐろ"], serving_label: "2貫" }),
  sushiro({ name: "ねぎまぐろ軍艦", calories: 112, protein_g: 7, fat_g: 3, carbs_g: 17, salt_g: 0.7, tags: ["軍艦", "ねぎとろ", "まぐろ"], serving_label: "2貫" }),
  sushiro({ name: "まぐたく巻", calories: 210, protein_g: 9, fat_g: 2, carbs_g: 38, salt_g: 1.1, tags: ["巻物", "まぐろ", "たくあん"], serving_label: "1本" }),
  sushiro({ name: "鉄火巻", calories: 190, protein_g: 10, fat_g: 1, carbs_g: 34, salt_g: 0.8, tags: ["巻物", "まぐろ"], serving_label: "1本" }),
  sushiro({ name: "サーモン", calories: 115, protein_g: 8, fat_g: 4, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "サーモン"], serving_label: "2貫" }),
  sushiro({ name: "オニオンサーモン", calories: 150, protein_g: 8, fat_g: 7, carbs_g: 16, salt_g: 0.8, tags: ["にぎり", "サーモン", "マヨ", "オニオン"], serving_label: "2貫" }),
  sushiro({ name: "焼とろサーモン", calories: 130, protein_g: 8, fat_g: 5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "サーモン", "炙り"], serving_label: "2貫" }),
  sushiro({ name: "えび", calories: 95, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "えび"], serving_label: "2貫" }),
  sushiro({ name: "えびアボカド", calories: 145, protein_g: 8, fat_g: 6, carbs_g: 17, salt_g: 0.8, tags: ["にぎり", "えび", "アボカド", "マヨ"], serving_label: "2貫" }),
  sushiro({ name: "えび天にぎり", calories: 160, protein_g: 7, fat_g: 6, carbs_g: 20, salt_g: 0.8, tags: ["にぎり", "えび", "天ぷら"], serving_label: "2貫" }),
  sushiro({ name: "いか", calories: 90, protein_g: 8, fat_g: 0.5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "いか"], serving_label: "2貫" }),
  sushiro({ name: "活〆はまち", calories: 115, protein_g: 10, fat_g: 3.5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "はまち"], serving_label: "2貫" }),
  sushiro({ name: "活〆真鯛", calories: 105, protein_g: 9, fat_g: 1, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "鯛"], serving_label: "2貫" }),
  sushiro({ name: "煮はまぐり", calories: 100, protein_g: 8, fat_g: 1, carbs_g: 16, salt_g: 0.8, tags: ["にぎり", "貝"], serving_label: "2貫" }),
  sushiro({ name: "えんがわ", calories: 140, protein_g: 7, fat_g: 6, carbs_g: 15, salt_g: 0.6, tags: ["にぎり", "えんがわ"], serving_label: "2貫" }),
  sushiro({ name: "いくら軍艦", calories: 115, protein_g: 5, fat_g: 3, carbs_g: 17, salt_g: 0.8, tags: ["軍艦", "いくら"], serving_label: "2貫" }),
  sushiro({ name: "コーン軍艦", calories: 130, protein_g: 3, fat_g: 5, carbs_g: 20, salt_g: 0.7, tags: ["軍艦", "コーン", "マヨ"], serving_label: "2貫" }),
  sushiro({ name: "かに風サラダ軍艦", calories: 140, protein_g: 5, fat_g: 6, carbs_g: 17, salt_g: 0.9, tags: ["軍艦", "サラダ", "かに風味"], serving_label: "2貫" }),
  sushiro({ name: "いなり", calories: 190, protein_g: 6, fat_g: 5, carbs_g: 32, salt_g: 1.0, tags: ["いなり"], serving_label: "2個" }),
  sushiro({ name: "茶碗蒸し", calories: 110, protein_g: 7, fat_g: 5, carbs_g: 8, salt_g: 1.3, tags: ["サイド", "茶碗蒸し"], source_url: sources.sushiroAllergy }),
  sushiro({ name: "フライドポテト", calories: 310, protein_g: 4, fat_g: 15, carbs_g: 40, salt_g: 1.2, tags: ["サイド", "ポテト"] }),
  sushiro({ name: "スシロー コク旨まぐろ醤油ラーメン", calories: 360, protein_g: 16, fat_g: 9, carbs_g: 54, salt_g: 5.0, tags: ["サイド", "ラーメン", "まぐろ"], serving_label: "1杯" }),
  sushiro({ name: "かけうどん", calories: 230, protein_g: 7, fat_g: 2, carbs_g: 47, salt_g: 4.0, tags: ["サイド", "うどん"], serving_label: "1杯" }),

  hama({ name: "まぐろ", calories: 81, protein_g: 10, fat_g: 0.8, carbs_g: 14, salt_g: 0.5, tags: ["にぎり", "まぐろ"], serving_label: "2貫" }),
  hama({ name: "特製漬けまぐろ", calories: 86, protein_g: 10, fat_g: 0.8, carbs_g: 15, salt_g: 0.7, tags: ["にぎり", "まぐろ", "漬け"], serving_label: "2貫" }),
  hama({ name: "厳選まぐろ中とろ", calories: 126, protein_g: 10, fat_g: 5, carbs_g: 15, salt_g: 0.5, tags: ["にぎり", "まぐろ", "中とろ"], serving_label: "2貫" }),
  hama({ name: "みなみまぐろ大とろ", calories: 61, protein_g: 5, fat_g: 3, carbs_g: 8, salt_g: 0.3, tags: ["にぎり", "まぐろ", "大とろ"], serving_label: "1貫" }),
  hama({ name: "とろびんちょう", calories: 87, protein_g: 9, fat_g: 1.5, carbs_g: 14, salt_g: 0.5, tags: ["にぎり", "まぐろ"], serving_label: "2貫" }),
  hama({ name: "まぐろたたき軍艦", calories: 92, protein_g: 6, fat_g: 3, carbs_g: 13, salt_g: 0.6, tags: ["軍艦", "まぐろ"], serving_label: "2貫" }),
  hama({ name: "まぐろ軍艦", calories: 79, protein_g: 6, fat_g: 2, carbs_g: 12, salt_g: 0.6, tags: ["軍艦", "まぐろ"], serving_label: "2貫" }),
  hama({ name: "鉄火巻", calories: 156, protein_g: 9, fat_g: 1, carbs_g: 30, salt_g: 0.8, tags: ["巻物", "まぐろ"], serving_label: "1本" }),
  hama({ name: "サーモン", calories: 88, protein_g: 8, fat_g: 3, carbs_g: 12, salt_g: 0.5, tags: ["にぎり", "サーモン"], serving_label: "2貫" }),
  hama({ name: "サーモンゆず塩", calories: 90, protein_g: 8, fat_g: 3, carbs_g: 13, salt_g: 0.6, tags: ["にぎり", "サーモン", "ゆず塩"], serving_label: "2貫" }),
  hama({ name: "炙りとろサーモン", calories: 114, protein_g: 8, fat_g: 5, carbs_g: 13, salt_g: 0.5, tags: ["にぎり", "サーモン", "炙り"], serving_label: "2貫" }),
  hama({ name: "オニオンサーモン", calories: 129, protein_g: 8, fat_g: 6, carbs_g: 14, salt_g: 0.8, tags: ["にぎり", "サーモン", "オニオン", "マヨ"], serving_label: "2貫" }),
  hama({ name: "えび", calories: 73, protein_g: 8, fat_g: 0.4, carbs_g: 10, salt_g: 0.5, tags: ["にぎり", "えび"], serving_label: "2貫" }),
  hama({ name: "生えび", calories: 74, protein_g: 8, fat_g: 0.4, carbs_g: 11, salt_g: 0.5, tags: ["にぎり", "えび"], serving_label: "2貫" }),
  hama({ name: "甘えび", calories: 76, protein_g: 8, fat_g: 0.4, carbs_g: 11, salt_g: 0.5, tags: ["にぎり", "えび"], serving_label: "2貫" }),
  hama({ name: "えびアボカド", calories: 118, protein_g: 8, fat_g: 5, carbs_g: 13, salt_g: 0.8, tags: ["にぎり", "えび", "アボカド", "マヨ"], serving_label: "2貫" }),
  hama({ name: "えび天握り", calories: 111, protein_g: 6, fat_g: 4, carbs_g: 15, salt_g: 0.7, tags: ["にぎり", "えび", "天ぷら"], serving_label: "2貫" }),
  hama({ name: "いか", calories: 70, protein_g: 8, fat_g: 0.4, carbs_g: 10, salt_g: 0.5, tags: ["にぎり", "いか"], serving_label: "2貫" }),
  hama({ name: "真いか", calories: 66, protein_g: 8, fat_g: 0.4, carbs_g: 9, salt_g: 0.5, tags: ["にぎり", "いか"], serving_label: "2貫" }),
  hama({ name: "活〆まだい", calories: 87, protein_g: 9, fat_g: 1, carbs_g: 13, salt_g: 0.5, tags: ["にぎり", "鯛"], serving_label: "2貫" }),
  hama({ name: "活〆はまち", calories: 103, protein_g: 10, fat_g: 3, carbs_g: 13, salt_g: 0.5, tags: ["にぎり", "はまち"], serving_label: "2貫" }),
  hama({ name: "真あじ", calories: 79, protein_g: 8, fat_g: 1.5, carbs_g: 12, salt_g: 0.5, tags: ["にぎり", "あじ"], serving_label: "2貫" }),
  hama({ name: "煮あなご", calories: 79, protein_g: 6, fat_g: 1.5, carbs_g: 12, salt_g: 0.8, tags: ["にぎり", "穴子"], serving_label: "2貫" }),
  hama({ name: "旨だしたまご", calories: 125, protein_g: 6, fat_g: 4, carbs_g: 17, salt_g: 0.7, tags: ["にぎり", "玉子"], serving_label: "2貫" }),
  hama({ name: "いくら", calories: 48, protein_g: 3, fat_g: 1.5, carbs_g: 6, salt_g: 0.5, tags: ["軍艦", "いくら"], serving_label: "2貫" }),
  hama({ name: "コーン", calories: 89, protein_g: 3, fat_g: 4, carbs_g: 12, salt_g: 0.6, tags: ["軍艦", "コーン", "マヨ"], serving_label: "2貫" }),
  hama({ name: "ツナ＆コーン", calories: 98, protein_g: 4, fat_g: 5, carbs_g: 11, salt_g: 0.7, tags: ["軍艦", "ツナ", "コーン", "マヨ"], serving_label: "2貫" }),
  hama({ name: "かっぱ巻", calories: 135, protein_g: 4, fat_g: 0.8, carbs_g: 29, salt_g: 0.6, tags: ["巻物", "きゅうり"], serving_label: "1本" }),
  hama({ name: "焼津産かつおだしの特製茶碗蒸し", calories: 89, protein_g: 7, fat_g: 4, carbs_g: 7, salt_g: 1.2, tags: ["サイド", "茶碗蒸し"] }),
  hama({ name: "あおさみそ汁", calories: 36, protein_g: 3, fat_g: 1, carbs_g: 4, salt_g: 1.8, tags: ["サイド", "味噌汁"], serving_label: "1杯" }),
  hama({ name: "あさりみそ汁", calories: 58, protein_g: 5, fat_g: 1.5, carbs_g: 6, salt_g: 2.2, tags: ["サイド", "味噌汁", "あさり"], serving_label: "1杯" }),
  hama({ name: "かけうどん", calories: 214, protein_g: 7, fat_g: 2, carbs_g: 42, salt_g: 4.1, tags: ["サイド", "うどん"], serving_label: "1杯" }),
  hama({ name: "えびの天ぷらうどん", calories: 324, protein_g: 12, fat_g: 6, carbs_g: 55, salt_g: 4.5, tags: ["サイド", "うどん", "えび天"], serving_label: "1杯" }),
  hama({ name: "濃厚冷やし担々麺", calories: 520, protein_g: 19, fat_g: 23, carbs_g: 62, salt_g: 5.4, tags: ["サイド", "麺", "冷やし", "担々麺"], serving_label: "1杯" }),
  hama({ name: "カリカリポテト", calories: 339, protein_g: 4, fat_g: 18, carbs_g: 40, salt_g: 1.2, tags: ["サイド", "ポテト"] }),
];

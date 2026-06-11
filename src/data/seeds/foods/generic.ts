import { estimated } from "./helpers";

export const genericFoods = [
  estimated({ name: "白米", category: "ごはん・丼", tags: ["自炊", "主食"], calories: 250, protein_g: 4, fat_g: 1, carbs_g: 56, serving_label: "茶碗1杯" }),
  estimated({ name: "玄米", category: "ごはん・丼", tags: ["自炊", "主食"], calories: 240, protein_g: 5, fat_g: 2, carbs_g: 50, serving_label: "茶碗1杯" }),
  estimated({ name: "卵", category: "肉・魚", tags: ["タンパク質"], calories: 80, protein_g: 7, fat_g: 6, carbs_g: 0, serving_label: "1個" }),
  estimated({ name: "鶏むね肉", category: "肉・魚", tags: ["タンパク質", "自炊"], calories: 220, protein_g: 42, fat_g: 5, carbs_g: 0, serving_label: "200g" }),
  estimated({ name: "鶏もも肉", category: "肉・魚", tags: ["タンパク質", "自炊"], calories: 330, protein_g: 34, fat_g: 22, carbs_g: 0, serving_label: "200g" }),
  estimated({ name: "鮭", category: "肉・魚", tags: ["魚", "タンパク質"], calories: 230, protein_g: 28, fat_g: 13, carbs_g: 0, serving_label: "1切れ" }),
  estimated({ name: "サバ", category: "肉・魚", tags: ["魚", "脂質"], calories: 310, protein_g: 27, fat_g: 22, carbs_g: 0, serving_label: "1切れ" }),
  estimated({ name: "納豆", category: "おかず・惣菜", tags: ["タンパク質", "発酵"], calories: 95, protein_g: 8, fat_g: 5, carbs_g: 7, serving_label: "1パック" }),
  estimated({ name: "豆腐", category: "おかず・惣菜", tags: ["タンパク質"], calories: 110, protein_g: 10, fat_g: 6, carbs_g: 4, serving_label: "半丁" }),
  estimated({ name: "味噌汁", category: "スープ", tags: ["汁物"], calories: 50, protein_g: 3, fat_g: 2, carbs_g: 6, serving_label: "1杯" }),
  estimated({ name: "野菜サラダ", category: "サラダ・野菜", tags: ["野菜"], calories: 90, protein_g: 3, fat_g: 4, carbs_g: 12, serving_label: "1皿" }),
  estimated({ name: "バナナ", category: "スイーツ", tags: ["果物"], calories: 90, protein_g: 1, fat_g: 0, carbs_g: 23, serving_label: "1本" }),
  estimated({ name: "プロテイン", category: "プロテイン", tags: ["タンパク質"], calories: 120, protein_g: 24, fat_g: 2, carbs_g: 3, serving_label: "1杯" }),
  estimated({ name: "プロテインバー", category: "プロテイン", tags: ["タンパク質", "間食"], calories: 200, protein_g: 15, fat_g: 8, carbs_g: 18, serving_label: "1本" }),
  estimated({ name: "カフェラテ", category: "ドリンク", tags: ["カフェ"], calories: 140, protein_g: 7, fat_g: 7, carbs_g: 12, serving_label: "M" }),
  estimated({ name: "ショートケーキ", category: "スイーツ", tags: ["ケーキ"], calories: 360, protein_g: 5, fat_g: 22, carbs_g: 37, serving_label: "1個" }),
  estimated({ name: "アイスクリーム", category: "スイーツ", tags: ["アイス"], calories: 220, protein_g: 4, fat_g: 12, carbs_g: 25, serving_label: "1個" }),
  estimated({ name: "ビール", category: "ドリンク", tags: ["アルコール"], calories: 200, protein_g: 1, fat_g: 0, carbs_g: 15, serving_label: "中ジョッキ" }),
];

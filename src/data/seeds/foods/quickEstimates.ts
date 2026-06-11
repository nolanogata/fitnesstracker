import { quick } from "./helpers";

export const quickEstimateFoods = [
  quick({ name: "外食 軽め", tags: ["外食"], calories: 550, protein_g: 20, fat_g: 18, carbs_g: 75 }),
  quick({ name: "外食 普通", tags: ["外食"], calories: 800, protein_g: 28, fat_g: 28, carbs_g: 105 }),
  quick({ name: "外食 重め", tags: ["外食"], calories: 1100, protein_g: 35, fat_g: 45, carbs_g: 140 }),
  quick({ name: "飲み会 軽め", tags: ["飲み会", "アルコール"], calories: 800, protein_g: 25, fat_g: 30, carbs_g: 85 }),
  quick({ name: "飲み会 普通", tags: ["飲み会", "アルコール"], calories: 1200, protein_g: 35, fat_g: 45, carbs_g: 140 }),
  quick({ name: "飲み会 重め", tags: ["飲み会", "アルコール"], calories: 1700, protein_g: 45, fat_g: 70, carbs_g: 190 }),
  quick({ name: "ラーメン 普通", tags: ["麺類"], calories: 850, protein_g: 28, fat_g: 32, carbs_g: 110 }),
  quick({ name: "定食 普通", tags: ["定食"], calories: 850, protein_g: 35, fat_g: 25, carbs_g: 115 }),
  quick({ name: "丼もの 普通", tags: ["丼"], calories: 760, protein_g: 25, fat_g: 22, carbs_g: 110 }),
  quick({ name: "うどん 普通", tags: ["うどん"], calories: 520, protein_g: 17, fat_g: 8, carbs_g: 95 }),
  quick({ name: "ファストフード 普通", tags: ["バーガー"], calories: 900, protein_g: 28, fat_g: 38, carbs_g: 110 }),
  quick({ name: "コンビニ飯 普通", tags: ["コンビニ"], calories: 700, protein_g: 28, fat_g: 22, carbs_g: 95 }),
  quick({ name: "スイーツ 普通", tags: ["間食"], calories: 350, protein_g: 5, fat_g: 18, carbs_g: 44 }),
  quick({ name: "カフェ軽食", tags: ["カフェ"], calories: 520, protein_g: 16, fat_g: 20, carbs_g: 68 }),
  quick({ name: "不明だが軽め", tags: ["不明"], calories: 450, protein_g: 15, fat_g: 15, carbs_g: 65 }),
  quick({ name: "不明だが普通", tags: ["不明"], calories: 750, protein_g: 25, fat_g: 25, carbs_g: 100 }),
  quick({ name: "不明だが多め", tags: ["不明"], calories: 1050, protein_g: 33, fat_g: 40, carbs_g: 135 }),
  quick({ name: "不明だが脂質多め", tags: ["不明", "脂質"], calories: 900, protein_g: 25, fat_g: 50, carbs_g: 85 }),
  quick({ name: "不明だが炭水化物多め", tags: ["不明", "炭水化物"], calories: 850, protein_g: 18, fat_g: 18, carbs_g: 150 }),
  quick({ name: "タンパク質少なめの日", tags: ["補正"], calories: 650, protein_g: 12, fat_g: 25, carbs_g: 95 }),
];

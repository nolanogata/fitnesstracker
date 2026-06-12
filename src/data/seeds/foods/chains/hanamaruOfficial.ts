import { official } from "../helpers";

const sourceUrl = "https://www.hanamaruudon.com/assets/pdf/allergy.pdf";
const fetchedAt = "2026-06-13T00:00:00.000Z";

const mealFor = (name: string): "breakfast" | "lunch" | "dinner" | "snack" => {
  if (/天|揚げ|唐揚げ|コロッケ|トッピング|たまご|ライス|ごまいなり|おにぎり|サラダ|だし|ソース/.test(name)) return "snack";
  return "lunch";
};

type NutritionRow = {
  name: string;
  serving_label: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  tags: string[];
};

const rows = [
  { name: "かけ", serving_label: "小", calories: 292, protein_g: 6.1, fat_g: 0.9, carbs_g: 65.4, salt_g: 5.2, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "かけ", serving_label: "中", calories: 573, protein_g: 10.9, fat_g: 1.7, carbs_g: 129.2, salt_g: 6.8, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "かけ", serving_label: "大", calories: 856, protein_g: 16, fat_g: 2.5, carbs_g: 193.3, salt_g: 9, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "冷かけ", serving_label: "小", calories: 295, protein_g: 6.3, fat_g: 0.9, carbs_g: 65.9, salt_g: 6.1, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "冷かけ", serving_label: "中", calories: 579, protein_g: 11.5, fat_g: 1.7, carbs_g: 130.1, salt_g: 8.6, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "冷かけ", serving_label: "大", calories: 863, protein_g: 16.6, fat_g: 2.5, carbs_g: 194.3, salt_g: 11.1, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "きつね", serving_label: "小", calories: 443, protein_g: 13.1, fat_g: 10.7, carbs_g: 74, salt_g: 6, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "きつね", serving_label: "中", calories: 724, protein_g: 17.9, fat_g: 11.6, carbs_g: 137.9, salt_g: 7.6, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "きつね", serving_label: "大", calories: 1007, protein_g: 22.9, fat_g: 12.4, carbs_g: 201.9, salt_g: 9.8, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "わかめうどん", serving_label: "小", calories: 299, protein_g: 6.8, fat_g: 1, carbs_g: 66.9, salt_g: 5.8, tags: ["はなまるうどん","公式栄養","うどん・そば","小","公式PDF"] },
  { name: "わかめうどん", serving_label: "中", calories: 581, protein_g: 11.6, fat_g: 1.8, carbs_g: 130.8, salt_g: 7.4, tags: ["はなまるうどん","公式栄養","うどん・そば","中","公式PDF"] },
  { name: "わかめうどん", serving_label: "大", calories: 866, protein_g: 16.9, fat_g: 2.7, carbs_g: 195.3, salt_g: 9.8, tags: ["はなまるうどん","公式栄養","うどん・そば","大","公式PDF"] },
  { name: "塩豚ねぎうどん", serving_label: "小", calories: 595, protein_g: 16.3, fat_g: 30.2, carbs_g: 69.1, salt_g: 6.1, tags: ["はなまるうどん","公式栄養","うどん・そば","小","公式PDF"] },
  { name: "塩豚ねぎうどん", serving_label: "中", calories: 876, protein_g: 21.2, fat_g: 31.1, carbs_g: 133, salt_g: 7.7, tags: ["はなまるうどん","公式栄養","うどん・そば","中","公式PDF"] },
  { name: "塩豚ねぎうどん", serving_label: "大", calories: 1319, protein_g: 31.3, fat_g: 47.6, carbs_g: 198.8, salt_g: 10.4, tags: ["はなまるうどん","公式栄養","うどん・そば","大","公式PDF"] },
  { name: "牛肉うどん（かまぼこ入り）", serving_label: "小", calories: 497, protein_g: 14.9, fat_g: 17.4, carbs_g: 73.2, salt_g: 6.4, tags: ["はなまるうどん","公式栄養","うどん・そば","小","公式PDF"] },
  { name: "牛肉うどん（かまぼこ入り）", serving_label: "中", calories: 779, protein_g: 19.8, fat_g: 18.3, carbs_g: 137.1, salt_g: 8, tags: ["はなまるうどん","公式栄養","うどん・そば","中","公式PDF"] },
  { name: "牛肉うどん（かまぼこ入り）", serving_label: "大", calories: 1162, protein_g: 29, fat_g: 27.4, carbs_g: 204.6, salt_g: 10.7, tags: ["はなまるうどん","公式栄養","うどん・そば","大","公式PDF"] },
  { name: "ざる", serving_label: "小", calories: 312, protein_g: 5.8, fat_g: 0.9, carbs_g: 70.5, salt_g: 4.2, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "ざる", serving_label: "中", calories: 600, protein_g: 10.8, fat_g: 1.7, carbs_g: 135.9, salt_g: 6.5, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "ざる", serving_label: "大", calories: 903, protein_g: 16.3, fat_g: 2.5, carbs_g: 204.5, salt_g: 10.1, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "釜上げ", serving_label: "小", calories: 312, protein_g: 5.8, fat_g: 0.9, carbs_g: 70.5, salt_g: 4.2, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "釜上げ", serving_label: "中", calories: 600, protein_g: 10.8, fat_g: 1.7, carbs_g: 135.9, salt_g: 6.5, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "釜上げ", serving_label: "大", calories: 905, protein_g: 16.4, fat_g: 2.6, carbs_g: 204.9, salt_g: 10.1, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "おろしぶっかけ", serving_label: "小", calories: 316, protein_g: 5.8, fat_g: 1, carbs_g: 71.8, salt_g: 3.6, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "おろしぶっかけ", serving_label: "中", calories: 604, protein_g: 10.8, fat_g: 1.8, carbs_g: 137.2, salt_g: 5.9, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "おろしぶっかけ", serving_label: "大", calories: 893, protein_g: 15.9, fat_g: 2.6, carbs_g: 202.6, salt_g: 8.1, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "温玉ぶっかけ", serving_label: "小", calories: 380, protein_g: 11.7, fat_g: 6, carbs_g: 69.1, salt_g: 3.8, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "温玉ぶっかけ", serving_label: "中", calories: 669, protein_g: 16.8, fat_g: 6.8, carbs_g: 134.5, salt_g: 6, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "温玉ぶっかけ", serving_label: "大", calories: 1033, protein_g: 28, fat_g: 12.8, carbs_g: 200.1, salt_g: 8.5, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "塩豚温玉ぶっかけ", serving_label: "小", calories: 678, protein_g: 21.7, fat_g: 35.3, carbs_g: 71.8, salt_g: 4.6, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "塩豚温玉ぶっかけ", serving_label: "中", calories: 967, protein_g: 26.8, fat_g: 36.2, carbs_g: 137.2, salt_g: 6.9, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "塩豚温玉ぶっかけ", serving_label: "大", calories: 1491, protein_g: 43.1, fat_g: 57.9, carbs_g: 204.5, salt_g: 9.9, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "塩豚おろしぶっかけ", serving_label: "小", calories: 614, protein_g: 15.8, fat_g: 30.3, carbs_g: 74.5, salt_g: 4.5, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "塩豚おろしぶっかけ", serving_label: "中", calories: 902, protein_g: 20.9, fat_g: 31.1, carbs_g: 139.9, salt_g: 6.7, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "塩豚おろしぶっかけ", serving_label: "大", calories: 1347, protein_g: 30.9, fat_g: 47.2, carbs_g: 207.1, salt_g: 9.5, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "牛肉おろしぶっかけ", serving_label: "小", calories: 516, protein_g: 14.2, fat_g: 17.5, carbs_g: 78.9, salt_g: 4.7, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "牛肉おろしぶっかけ", serving_label: "中", calories: 805, protein_g: 19.2, fat_g: 18.4, carbs_g: 144.3, salt_g: 6.9, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "牛肉おろしぶっかけ", serving_label: "大", calories: 1193, protein_g: 28.4, fat_g: 27.5, carbs_g: 213.3, salt_g: 9.7, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "牛肉温玉ぶっかけ", serving_label: "小", calories: 580, protein_g: 20.1, fat_g: 22.6, carbs_g: 76.2, salt_g: 4.9, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "牛肉温玉ぶっかけ", serving_label: "中", calories: 869, protein_g: 25.1, fat_g: 23.4, carbs_g: 141.6, salt_g: 7.1, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "10種野菜のサラダうどん（胡麻ドレッシング）", serving_label: "小", calories: 476, protein_g: 11.3, fat_g: 9.9, carbs_g: 87.3, salt_g: 4.4, tags: ["はなまるうどん","公式栄養","うどん・そば","サラダ","小","公式PDF"] },
  { name: "10種野菜のサラダうどん（野菜増量）（胡麻ドレッシング）", serving_label: "小", calories: 508, protein_g: 12, fat_g: 11.2, carbs_g: 92.1, salt_g: 4.5, tags: ["はなまるうどん","公式栄養","うどん・そば","サラダ","小","公式PDF"] },
  { name: "10種野菜のサラダうどん（野菜増量）（胡麻ドレッシング）", serving_label: "中", calories: 797, protein_g: 17, fat_g: 12.1, carbs_g: 157.5, salt_g: 6.8, tags: ["はなまるうどん","公式栄養","うどん・そば","サラダ","中","公式PDF"] },
  { name: "おろししょうゆ", serving_label: "小", calories: 294, protein_g: 5.6, fat_g: 0.9, carbs_g: 66.6, salt_g: 2.5, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "おろししょうゆ", serving_label: "中", calories: 579, protein_g: 10.6, fat_g: 1.7, carbs_g: 130.9, salt_g: 4.4, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "おろししょうゆ", serving_label: "大", calories: 864, protein_g: 15.8, fat_g: 2.6, carbs_g: 195.4, salt_g: 6.5, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "明太おろししょうゆ", serving_label: "小", calories: 317, protein_g: 7.5, fat_g: 1.3, carbs_g: 69.5, salt_g: 3.8, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "明太おろししょうゆ", serving_label: "中", calories: 598, protein_g: 12.3, fat_g: 2.1, carbs_g: 133.3, salt_g: 5.4, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "明太おろししょうゆ", serving_label: "大", calories: 895, protein_g: 18.4, fat_g: 3.1, carbs_g: 199.3, salt_g: 8.1, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "明太玉とろぶっかけ", serving_label: "小", calories: 440, protein_g: 15.1, fat_g: 6.5, carbs_g: 79.7, salt_g: 5.4, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "明太玉とろぶっかけ", serving_label: "中", calories: 729, protein_g: 20.1, fat_g: 7.4, carbs_g: 145.1, salt_g: 7.7, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "明太玉とろぶっかけ", serving_label: "大", calories: 1129, protein_g: 33.2, fat_g: 13.6, carbs_g: 217.4, salt_g: 11, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "牛肉玉とろぶっかけ", serving_label: "小", calories: 615, protein_g: 21.3, fat_g: 22.9, carbs_g: 83.1, salt_g: 4.9, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "牛肉玉とろぶっかけ", serving_label: "中", calories: 904, protein_g: 26.4, fat_g: 23.7, carbs_g: 148.5, salt_g: 7.1, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "牛肉玉とろぶっかけ", serving_label: "大", calories: 1392, protein_g: 42.6, fat_g: 38.1, carbs_g: 222.5, salt_g: 10.2, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "かま玉", serving_label: "小", calories: 365, protein_g: 11.6, fat_g: 6, carbs_g: 65.4, salt_g: 2.6, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "かま玉", serving_label: "中", calories: 650, protein_g: 16.6, fat_g: 6.8, carbs_g: 129.7, salt_g: 4.5, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "かま玉", serving_label: "大", calories: 1011, protein_g: 27.9, fat_g: 12.8, carbs_g: 194.4, salt_g: 6.8, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "カレーうどん（店内仕込み）", serving_label: "小", calories: 601, protein_g: 11.9, fat_g: 23, carbs_g: 86.5, salt_g: 5.5, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","小","公式PDF"] },
  { name: "カレーうどん（店内仕込み）", serving_label: "中", calories: 964, protein_g: 18.5, fat_g: 29.4, carbs_g: 156.5, salt_g: 8.3, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","中","公式PDF"] },
  { name: "カレーうどん（店内仕込み）", serving_label: "大", calories: 1399, protein_g: 26.7, fat_g: 41.3, carbs_g: 230.3, salt_g: 11.4, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","大","公式PDF"] },
  { name: "カレーうどん", serving_label: "小", calories: 522, protein_g: 9.4, fat_g: 16.3, carbs_g: 84.8, salt_g: 5, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","小","公式PDF"] },
  { name: "カレーうどん", serving_label: "中", calories: 866, protein_g: 15.5, fat_g: 20.9, carbs_g: 154.3, salt_g: 7.7, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","中","公式PDF"] },
  { name: "カレーうどん", serving_label: "大", calories: 1261, protein_g: 22.4, fat_g: 29.5, carbs_g: 227.3, salt_g: 10.5, tags: ["はなまるうどん","公式栄養","うどん・そば","牛丼・丼","カレー","大","公式PDF"] },
  { name: "玉とろぶっかけ", serving_label: "小", calories: 412, protein_g: 12.9, fat_g: 6.1, carbs_g: 76.2, salt_g: 3.8, tags: ["はなまるうどん","公式栄養","小","公式PDF"] },
  { name: "玉とろぶっかけ", serving_label: "中", calories: 701, protein_g: 18, fat_g: 7, carbs_g: 141.6, salt_g: 6, tags: ["はなまるうどん","公式栄養","中","公式PDF"] },
  { name: "玉とろぶっかけ", serving_label: "大", calories: 1088, protein_g: 30.1, fat_g: 13.1, carbs_g: 212.1, salt_g: 8.5, tags: ["はなまるうどん","公式栄養","大","公式PDF"] },
  { name: "ライス", serving_label: "小", calories: 316, protein_g: 5, fat_g: 1.1, carbs_g: 74, salt_g: 0, tags: ["はなまるうどん","公式栄養","牛丼・丼","小","公式PDF"] },
  { name: "ライス", serving_label: "大", calories: 395, protein_g: 6.2, fat_g: 1.4, carbs_g: 92.5, salt_g: 0, tags: ["はなまるうどん","公式栄養","牛丼・丼","大","公式PDF"] },
  { name: "カレーライス（店内仕込み）", serving_label: "小", calories: 625, protein_g: 11.7, fat_g: 23.3, carbs_g: 94.6, salt_g: 3.1, tags: ["はなまるうどん","公式栄養","牛丼・丼","カレー","小","公式PDF"] },
  { name: "カレーライス（店内仕込み）", serving_label: "大", calories: 781, protein_g: 14.6, fat_g: 29.1, carbs_g: 118.1, salt_g: 3.9, tags: ["はなまるうどん","公式栄養","牛丼・丼","カレー","大","公式PDF"] },
  { name: "カレーライス", serving_label: "小", calories: 573, protein_g: 9.2, fat_g: 16.9, carbs_g: 92.7, salt_g: 2.6, tags: ["はなまるうどん","公式栄養","牛丼・丼","カレー","小","公式PDF"] },
  { name: "カレーライス", serving_label: "大", calories: 716, protein_g: 11.5, fat_g: 21.1, carbs_g: 115.7, salt_g: 3.2, tags: ["はなまるうどん","公式栄養","牛丼・丼","カレー","大","公式PDF"] }
] satisfies NutritionRow[];

export const hanamaruOfficialFoods = rows.map((row) =>
  official({
    brand: "はなまるうどん",
    name: row.name,
    category: "チェーン店",
    tags: row.tags,
    calories: row.calories,
    protein_g: row.protein_g,
    fat_g: row.fat_g,
    carbs_g: row.carbs_g,
    salt_g: row.salt_g,
    serving_label: row.serving_label,
    default_meal_type: mealFor(row.name),
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  }),
);

import { estimatedWithProfileTags, type NutritionEstimateProfile } from "./estimationProfiles";

const fetchedAt = "2026-06-15T00:00:00.000Z";

type PantryProductInput = {
  brand: string;
  name: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label: string;
  source_url: string;
};

const pantryProduct = (input: PantryProductInput) =>
  estimatedWithProfileTags({
    ...input,
    tags: ["市販品", "ストック食品", ...input.tags],
    default_meal_type: "snack",
    fetched_at: fetchedAt,
    profile: inferPantryProfile(input),
  });

const inferPantryProfile = (input: PantryProductInput): NutritionEstimateProfile => {
  const text = [input.name, input.category, ...input.tags].join(" ");
  if (text.includes("サバ") || text.includes("さば") || text.includes("イワシ") || text.includes("いわし") || text.includes("魚")) return "fishSetMeal";
  return "proteinTopping";
};

const hagoromoSource = "https://www.hagoromofoods.co.jp/";
const maruhaSource = "https://www.maruha-nichiro.co.jp/products/";
const nissuiSource = "https://www.nissui.co.jp/product/";

export const pantryProductFoods = [
  pantryProduct({ brand: "はごろもフーズ", name: "シーチキンLフレーク", category: "肉・魚", tags: ["缶詰", "ツナ", "シーチキン", "魚", "脂質"], calories: 210, protein_g: 15, fat_g: 17, carbs_g: 0, salt_g: 0.6, serving_label: "1缶", source_url: hagoromoSource }),
  pantryProduct({ brand: "はごろもフーズ", name: "シーチキンマイルド", category: "肉・魚", tags: ["缶詰", "ツナ", "シーチキン", "魚", "脂質"], calories: 200, protein_g: 14, fat_g: 16, carbs_g: 0, salt_g: 0.6, serving_label: "1缶", source_url: hagoromoSource }),
  pantryProduct({ brand: "はごろもフーズ", name: "シーチキンSmile 水煮Lフレーク", category: "肉・魚", tags: ["缶詰", "ツナ", "シーチキン", "魚", "タンパク質", "低脂質"], calories: 60, protein_g: 14, fat_g: 0.5, carbs_g: 0, salt_g: 0.6, serving_label: "1袋", source_url: hagoromoSource }),
  pantryProduct({ brand: "はごろもフーズ", name: "素材そのままシーチキン マイルド", category: "肉・魚", tags: ["缶詰", "ツナ", "シーチキン", "魚", "タンパク質", "低脂質"], calories: 55, protein_g: 13, fat_g: 0.4, carbs_g: 0, salt_g: 0.6, serving_label: "1缶", source_url: hagoromoSource }),
  pantryProduct({ brand: "マルハニチロ", name: "月花さば水煮", category: "肉・魚", tags: ["缶詰", "サバ缶", "サバ", "魚", "タンパク質"], calories: 190, protein_g: 26, fat_g: 10, carbs_g: 0, salt_g: 1.0, serving_label: "1缶", source_url: maruhaSource }),
  pantryProduct({ brand: "マルハニチロ", name: "月花さばみそ煮", category: "肉・魚", tags: ["缶詰", "サバ缶", "サバ", "魚", "味噌煮"], calories: 290, protein_g: 25, fat_g: 17, carbs_g: 11, salt_g: 1.8, serving_label: "1缶", source_url: maruhaSource }),
  pantryProduct({ brand: "マルハニチロ", name: "いわし蒲焼", category: "肉・魚", tags: ["缶詰", "イワシ", "魚", "蒲焼"], calories: 260, protein_g: 20, fat_g: 15, carbs_g: 12, salt_g: 1.6, serving_label: "1缶", source_url: maruhaSource }),
  pantryProduct({ brand: "ニッスイ", name: "スルッとふた SABA さば水煮", category: "肉・魚", tags: ["缶詰", "サバ缶", "サバ", "魚", "タンパク質"], calories: 190, protein_g: 25, fat_g: 10, carbs_g: 0, salt_g: 1.0, serving_label: "1缶", source_url: nissuiSource }),
  pantryProduct({ brand: "ニッスイ", name: "スルッとふた SABA さばみそ煮", category: "肉・魚", tags: ["缶詰", "サバ缶", "サバ", "魚", "味噌煮"], calories: 285, protein_g: 24, fat_g: 17, carbs_g: 10, salt_g: 1.7, serving_label: "1缶", source_url: nissuiSource }),
  pantryProduct({ brand: "ホテイフーズ", name: "やきとり たれ味", category: "肉・魚", tags: ["缶詰", "焼き鳥", "鶏", "おつまみ", "居酒屋"], calories: 170, protein_g: 14, fat_g: 9, carbs_g: 8, salt_g: 1.3, serving_label: "1缶", source_url: "https://www.hoteifoods.co.jp/" }),
  pantryProduct({ brand: "ホテイフーズ", name: "やきとり 塩味", category: "肉・魚", tags: ["缶詰", "焼き鳥", "鶏", "おつまみ", "居酒屋"], calories: 145, protein_g: 15, fat_g: 8, carbs_g: 2, salt_g: 1.4, serving_label: "1缶", source_url: "https://www.hoteifoods.co.jp/" }),
];

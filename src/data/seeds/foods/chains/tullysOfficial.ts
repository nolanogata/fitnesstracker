import { official } from "../helpers";

const sourceUrl = "https://www.tullys.co.jp/menu/pdf/food.pdf";
const fetchedAt = "2026-06-13T00:00:00.000Z";

type TullysFood = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  tags: string[];
};

const foods: TullysFood[] = [
  { name: "厚切りオープンサンド チキンリモーネ", calories: 438, protein_g: 18.9, fat_g: 14.3, carbs_g: 58.4, salt_g: 2.4, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","サンド","チキン"] },
  { name: "ベーグルサンド 塩あんバター", calories: 334, protein_g: 7.5, fat_g: 12.8, carbs_g: 47.3, salt_g: 1, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","ベーグル","サンド"] },
  { name: "チキンカツサンド ～粒マスタード＆デミソース～", calories: 263, protein_g: 10, fat_g: 14.1, carbs_g: 23.9, salt_g: 1.3, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","サンド","チキン"] },
  { name: "3種のデリ風サラダサンド", calories: 280, protein_g: 8.1, fat_g: 12.7, carbs_g: 33.6, salt_g: 1.8, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","サンド","サラダ"] },
  { name: "たっぷりタマゴサンド", calories: 221, protein_g: 8.4, fat_g: 12, carbs_g: 19.3, salt_g: 1.6, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","サンド","卵"] },
  { name: "ハムチーズ＆サラダサンド", calories: 231, protein_g: 8.8, fat_g: 10, carbs_g: 26.6, salt_g: 1.9, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","サンド","サンド","チーズ"] },
  { name: "ボールパークドッグ プレーン", calories: 305, protein_g: 10.4, fat_g: 13.4, carbs_g: 35.7, salt_g: 1.7, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","ホットドッグ","ホットドッグ"] },
  { name: "ボールパークドッグ オリジナル", calories: 307, protein_g: 10.5, fat_g: 13.5, carbs_g: 36, salt_g: 2.3, serving_label: "1個", tags: ["カフェ","タリーズ","公式栄養","ホットドッグ","ホットドッグ"] },
  { name: "彩り野菜の瀬戸内レモンパスタ ～青唐辛子風味～", calories: 566, protein_g: 15.4, fat_g: 21, carbs_g: 80, salt_g: 3.9, serving_label: "1皿", tags: ["カフェ","タリーズ","公式栄養","パスタ","パスタ"] },
  { name: "ゴロっと茄子とベーコンの完熟トマトパスタ", calories: 597, protein_g: 22.3, fat_g: 18.5, carbs_g: 85.1, salt_g: 3, serving_label: "1皿", tags: ["カフェ","タリーズ","公式栄養","パスタ","パスタ"] }
];

export const tullysOfficialFoods = foods.map((food) =>
  official({
    brand: "タリーズ",
    name: food.name,
    category: "チェーン店",
    tags: [...new Set(food.tags)],
    calories: food.calories,
    protein_g: food.protein_g,
    fat_g: food.fat_g,
    carbs_g: food.carbs_g,
    salt_g: food.salt_g,
    serving_label: food.serving_label,
    default_meal_type: food.tags.includes("スイーツ") ? "snack" : "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  }),
);

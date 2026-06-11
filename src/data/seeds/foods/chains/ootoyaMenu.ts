import { estimated } from "../helpers";

const source = "https://www.ootoya.com/menu/";
const fetchedAt = "2026-06-12T00:00:00.000Z";
const tags = ["定食", "大戸屋", "公式メニュー確認", "栄養推定"];

const items = [
  ["チキンかあさん煮定食", 900, 38, 34, 105],
  ["鶏と野菜の黒酢あん定食", 980, 36, 38, 118],
  ["大戸屋ランチ定食", 860, 34, 31, 110],
  ["しまほっけの炭火焼き定食", 790, 43, 22, 103],
  ["さばの炭火焼き定食", 850, 39, 32, 96],
  ["すけそう鱈と野菜の黒酢あん定食", 820, 32, 29, 108],
  ["香味唐揚げ定食", 940, 39, 41, 105],
  ["豚肩ロースの生姜焼き定食", 910, 37, 36, 106],
] as const;

export const ootoyaMenuFoods = items.map(([name, calories, protein_g, fat_g, carbs_g]) =>
  estimated({
    brand: "大戸屋",
    name,
    category: "チェーン店",
    tags,
    calories,
    protein_g,
    fat_g,
    carbs_g,
    serving_label: "1食",
    default_meal_type: "lunch",
    source_url: source,
    fetched_at: fetchedAt,
  }),
);

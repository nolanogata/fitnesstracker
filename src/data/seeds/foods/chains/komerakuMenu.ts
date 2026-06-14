import { estimated } from "../helpers";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const ohitsuSourceUrl = "https://komeraku.jp/menu/ohitsugohan/";
const ochazukeSourceUrl = "https://komeraku.jp/menu/ochazukezen/";
const kaisenSoupSourceUrl = "https://komeraku.jp/menu/kaisengohan/";
const omusubiSourceUrl = "https://komeraku.jp/menu/omusubi/";

type KomerakuFood = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  tags: string[];
  source_url: string;
};

const komerakuFoods: KomerakuFood[] = [
  { name: "鮭といくらの北海ごはん", calories: 720, protein_g: 34, fat_g: 18, carbs_g: 102, salt_g: 3.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鮭", "いくら", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "人気3種のよくばりごはん", calories: 760, protein_g: 38, fat_g: 17, carbs_g: 108, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "ねぎとろ", "まぐろ", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "中落ちと漬けまぐろ二色ごはん", calories: 690, protein_g: 40, fat_g: 9, carbs_g: 108, salt_g: 3.5, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "まぐろ", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "アボカドとサーモンごはん", calories: 820, protein_g: 32, fat_g: 28, carbs_g: 108, salt_g: 3.1, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "アボカド", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "魚介たっぷり磯バター醤油焼きごはん", calories: 850, protein_g: 36, fat_g: 26, carbs_g: 112, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "魚介", "バター醤油", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "柚子香る帆立とサーモンたたきごはん", calories: 740, protein_g: 35, fat_g: 16, carbs_g: 108, salt_g: 3.1, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "帆立", "サーモン", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "みょうが香るごま鯖とあじのたたきごはん", calories: 760, protein_g: 38, fat_g: 20, carbs_g: 104, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鯖", "あじ", "海鮮", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "一面うなぎのおひつごはん", calories: 920, protein_g: 34, fat_g: 30, carbs_g: 122, salt_g: 3.8, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "うなぎ", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "やわらか厚切り豚の照焼きごはん", calories: 900, protein_g: 34, fat_g: 32, carbs_g: 112, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "豚", "照焼き", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },
  { name: "ローストビーフとマッシュポテトごはん", calories: 850, protein_g: 36, fat_g: 28, carbs_g: 108, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "ローストビーフ", "牛肉", "お茶漬け", "推定栄養"], source_url: ohitsuSourceUrl },

  { name: "焼き鯖と野菜のたっぷり鬼おろし添え膳", calories: 780, protein_g: 36, fat_g: 26, carbs_g: 98, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鯖", "野菜", "和食", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "ごろごろ野菜と鶏の黒酢あんかけ膳", calories: 860, protein_g: 34, fat_g: 30, carbs_g: 110, salt_g: 4.4, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鶏", "黒酢", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "温野菜の豚旨そぼろあんかけ膳", calories: 820, protein_g: 30, fat_g: 28, carbs_g: 108, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "そぼろ", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "千切り野菜と一緒に食べる豚の生姜焼き膳", calories: 880, protein_g: 35, fat_g: 32, carbs_g: 108, salt_g: 4.3, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "生姜焼き", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "おねぎたっぷり油淋鶏膳", calories: 920, protein_g: 36, fat_g: 36, carbs_g: 108, salt_g: 4.6, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "油淋鶏", "唐揚げ", "鶏", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "おろしそポン酢からあげ膳", calories: 890, protein_g: 34, fat_g: 34, carbs_g: 106, salt_g: 4.3, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "おろしポン酢", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "てりやき和風たるたるからあげ膳", calories: 980, protein_g: 36, fat_g: 42, carbs_g: 110, salt_g: 4.8, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "タルタル", "推定栄養"], source_url: ochazukeSourceUrl },

  { name: "鮭といくらごはんとお好きなスープセット", calories: 780, protein_g: 38, fat_g: 20, carbs_g: 108, salt_g: 4.2, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "鮭", "いくら", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "まぐろの山かけごはんとお好きなスープセット", calories: 740, protein_g: 40, fat_g: 10, carbs_g: 118, salt_g: 4.0, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "まぐろ", "山かけ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "真鯛のゴマだれごはんとお好きなスープセット", calories: 760, protein_g: 38, fat_g: 18, carbs_g: 108, salt_g: 4.1, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "真鯛", "ごまだれ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "漬けと中落の二色まぐろごはんとお好きなスープセット", calories: 760, protein_g: 42, fat_g: 11, carbs_g: 118, salt_g: 4.3, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "まぐろ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "帆立とサーモンの柚子塩ごはんとお好きなスープセット", calories: 790, protein_g: 38, fat_g: 18, carbs_g: 112, salt_g: 4.0, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "帆立", "サーモン", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "胡麻鯖と鯵のたたきごはんとお好きなスープセット", calories: 800, protein_g: 42, fat_g: 22, carbs_g: 106, salt_g: 4.2, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "鯖", "あじ", "推定栄養"], source_url: kaisenSoupSourceUrl },

  { name: "角煮と高菜の混ぜごはんおむすび", calories: 260, protein_g: 8, fat_g: 8, carbs_g: 38, salt_g: 1.2, serving_label: "1個", tags: ["こめらく", "おむすび", "角煮", "高菜", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "焼しゃけほぐしおむすび", calories: 210, protein_g: 8, fat_g: 4, carbs_g: 36, salt_g: 1.0, serving_label: "1個", tags: ["こめらく", "おむすび", "鮭", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "和風ツナマヨおむすび", calories: 260, protein_g: 6, fat_g: 10, carbs_g: 36, salt_g: 1.0, serving_label: "1個", tags: ["こめらく", "おむすび", "ツナマヨ", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "うなぎ蒲焼玉子そぼろ入り焼きおむすび", calories: 300, protein_g: 10, fat_g: 8, carbs_g: 46, salt_g: 1.4, serving_label: "1個", tags: ["こめらく", "おむすび", "うなぎ", "焼きおむすび", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
];

export const komerakuMenuFoods = komerakuFoods.map((food) =>
  estimated({
    brand: "こめらく",
    name: food.name,
    category: "チェーン店",
    tags: food.tags,
    calories: food.calories,
    protein_g: food.protein_g,
    fat_g: food.fat_g,
    carbs_g: food.carbs_g,
    salt_g: food.salt_g,
    serving_label: food.serving_label,
    default_meal_type: "lunch",
    source_url: food.source_url,
    fetched_at: fetchedAt,
  }),
);

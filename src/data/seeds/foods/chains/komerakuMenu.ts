import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const ohitsuSourceUrl = "https://komeraku.jp/menu/ohitsugohan/";
const ochazukeSourceUrl = "https://komeraku.jp/menu/ochazukezen/";
const kaisenSoupSourceUrl = "https://komeraku.jp/menu/kaisengohan/";
const omusubiSourceUrl = "https://komeraku.jp/menu/omusubi/";
const allergySourceUrl = "https://komeraku.jp/wp-content/uploads/2026/05/allergy0529.pdf";

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

const inferProfile = (food: KomerakuFood): NutritionEstimateProfile => {
  const text = `${food.name} ${food.tags.join(" ")}`;
  if (text.includes("おむすび")) return "onigiri";
  if (text.includes("スープ") || text.includes("汁")) return "soup";
  if (text.includes("唐揚げ") || text.includes("フライ") || text.includes("油淋鶏") || text.includes("チキン南蛮")) return "meatSetMeal";
  if (text.includes("海鮮") || text.includes("まぐろ") || text.includes("鮭") || text.includes("サーモン") || text.includes("鯛") || text.includes("鯖") || text.includes("ぶり") || text.includes("あじ")) return "sushiRiceBowl";
  if (text.includes("牛") || text.includes("豚") || text.includes("鶏") || text.includes("ハンバーグ")) return "meatSetMeal";
  return "riceBowl";
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
  { name: "鮭いくらごはん", calories: 700, protein_g: 33, fat_g: 17, carbs_g: 100, salt_g: 3.1, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鮭", "いくら", "海鮮", "お茶漬け", "推定栄養"], source_url: allergySourceUrl },
  { name: "しらすたっぷり海鮮ぶっかけごはん", calories: 680, protein_g: 34, fat_g: 10, carbs_g: 108, salt_g: 3.6, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "しらす", "海鮮", "魚", "お茶漬け", "推定栄養"], source_url: allergySourceUrl },
  { name: "サーモンといくらのアボカドマヨごはん", calories: 860, protein_g: 34, fat_g: 31, carbs_g: 106, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "いくら", "アボカド", "マヨ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "サーモンとたっぷりいくらのおひつごはん", calories: 790, protein_g: 36, fat_g: 20, carbs_g: 110, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "いくら", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "サーモンとしらすの炙りマヨごはん", calories: 780, protein_g: 34, fat_g: 22, carbs_g: 108, salt_g: 3.5, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "しらす", "炙り", "マヨ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "サーモンねぎとろごはん", calories: 760, protein_g: 34, fat_g: 18, carbs_g: 110, salt_g: 3.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "サーモン", "ねぎとろ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "二色まぐろごはん", calories: 680, protein_g: 40, fat_g: 8, carbs_g: 108, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "まぐろ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "鯛とあじの漁師ごはん", calories: 700, protein_g: 39, fat_g: 11, carbs_g: 108, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鯛", "あじ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "韓国風海鮮ユッケごはん", calories: 760, protein_g: 36, fat_g: 16, carbs_g: 112, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "海鮮", "ユッケ", "韓国料理", "辛い", "推定栄養"], source_url: allergySourceUrl },
  { name: "ねぎとろ温玉ごはん", calories: 740, protein_g: 34, fat_g: 18, carbs_g: 108, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "ねぎとろ", "温玉", "まぐろ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "北陸の海鮮づくしごはん", calories: 850, protein_g: 42, fat_g: 22, carbs_g: 114, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "ぶり", "甘海老", "とろサーモン", "ずわい蟹", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "アンガス牛のねぎ塩ダレごはん", calories: 890, protein_g: 36, fat_g: 34, carbs_g: 108, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "牛肉", "ねぎ塩", "推定栄養"], source_url: allergySourceUrl },
  { name: "鮭のアボカドマヨごはん", calories: 820, protein_g: 32, fat_g: 28, carbs_g: 106, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鮭", "アボカド", "マヨ", "推定栄養"], source_url: allergySourceUrl },
  { name: "うなぎ・ローストビーフのよくばりハーフおひつごはん", calories: 900, protein_g: 36, fat_g: 30, carbs_g: 118, salt_g: 3.8, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "うなぎ", "ローストビーフ", "牛肉", "推定栄養"], source_url: allergySourceUrl },
  { name: "まぐろ山かけごはん", calories: 700, protein_g: 40, fat_g: 8, carbs_g: 116, salt_g: 3.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "まぐろ", "山かけ", "とろろ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "ローストビーフごはん", calories: 800, protein_g: 36, fat_g: 24, carbs_g: 108, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "ローストビーフ", "牛肉", "推定栄養"], source_url: allergySourceUrl },
  { name: "牛とろフレークとローストビーフごはん", calories: 880, protein_g: 38, fat_g: 32, carbs_g: 108, salt_g: 3.5, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "牛肉", "ローストビーフ", "牛とろ", "推定栄養"], source_url: allergySourceUrl },
  { name: "角煮・明太子・高菜の博多ごはん", calories: 860, protein_g: 30, fat_g: 28, carbs_g: 116, salt_g: 4.4, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "角煮", "明太子", "高菜", "博多", "推定栄養"], source_url: allergySourceUrl },
  { name: "鯛とブリの贅沢ごはん", calories: 740, protein_g: 40, fat_g: 14, carbs_g: 108, salt_g: 3.3, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "鯛", "ぶり", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "北海海鮮おひつごはん", calories: 900, protein_g: 42, fat_g: 26, carbs_g: 116, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "いくら", "とろサーモン", "紅ズワイ蟹", "うに", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "北海道の贅沢盛りごはん", calories: 920, protein_g: 42, fat_g: 28, carbs_g: 116, salt_g: 4.1, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "うに", "いくら", "とろサーモン", "ずわい蟹", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "大分郷土料理ぶりのあつめしおひつごはん", calories: 760, protein_g: 40, fat_g: 16, carbs_g: 108, salt_g: 3.6, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "ぶり", "あつめし", "海鮮", "郷土料理", "推定栄養"], source_url: allergySourceUrl },
  { name: "真鯛の柚子塩たたきごはん", calories: 700, protein_g: 38, fat_g: 11, carbs_g: 108, salt_g: 3.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "真鯛", "柚子塩", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "鯵のなめろうおひつごはん", calories: 710, protein_g: 38, fat_g: 13, carbs_g: 108, salt_g: 3.5, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "あじ", "なめろう", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "二色まぐろの山かけごはん", calories: 720, protein_g: 42, fat_g: 8, carbs_g: 118, salt_g: 3.6, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "まぐろ", "山かけ", "とろろ", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "A4黒毛和牛の牛まぶし", calories: 980, protein_g: 36, fat_g: 42, carbs_g: 112, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "黒毛和牛", "牛肉", "牛まぶし", "推定栄養"], source_url: allergySourceUrl },
  { name: "真鯛と藁焼きかつおのひゅうがめし", calories: 760, protein_g: 42, fat_g: 14, carbs_g: 112, salt_g: 3.8, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "真鯛", "かつお", "ひゅうがめし", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "焼き鳥ごはん", calories: 820, protein_g: 34, fat_g: 24, carbs_g: 114, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "焼き鳥", "鶏", "推定栄養"], source_url: allergySourceUrl },
  { name: "国産牛カルビ焼きごはん", calories: 980, protein_g: 34, fat_g: 42, carbs_g: 112, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "牛肉", "カルビ", "推定栄養"], source_url: allergySourceUrl },
  { name: "出汁とろろ海鮮おひつごはん", calories: 760, protein_g: 38, fat_g: 12, carbs_g: 124, salt_g: 3.7, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "海鮮", "とろろ", "出汁", "推定栄養"], source_url: allergySourceUrl },
  { name: "まぐろと出汁とろろのおひつごはん", calories: 740, protein_g: 40, fat_g: 8, carbs_g: 122, salt_g: 3.7, serving_label: "1膳", tags: ["こめらく", "おひつごはん", "まぐろ", "とろろ", "出汁", "海鮮", "推定栄養"], source_url: allergySourceUrl },

  { name: "焼き鯖と野菜のたっぷり鬼おろし添え膳", calories: 780, protein_g: 36, fat_g: 26, carbs_g: 98, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鯖", "野菜", "和食", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "ごろごろ野菜と鶏の黒酢あんかけ膳", calories: 860, protein_g: 34, fat_g: 30, carbs_g: 110, salt_g: 4.4, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鶏", "黒酢", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "温野菜の豚旨そぼろあんかけ膳", calories: 820, protein_g: 30, fat_g: 28, carbs_g: 108, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "そぼろ", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "千切り野菜と一緒に食べる豚の生姜焼き膳", calories: 880, protein_g: 35, fat_g: 32, carbs_g: 108, salt_g: 4.3, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "生姜焼き", "野菜", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "おねぎたっぷり油淋鶏膳", calories: 920, protein_g: 36, fat_g: 36, carbs_g: 108, salt_g: 4.6, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "油淋鶏", "唐揚げ", "鶏", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "おろしそポン酢からあげ膳", calories: 890, protein_g: 34, fat_g: 34, carbs_g: 106, salt_g: 4.3, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "おろしポン酢", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "てりやき和風たるたるからあげ膳", calories: 980, protein_g: 36, fat_g: 42, carbs_g: 110, salt_g: 4.8, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "タルタル", "推定栄養"], source_url: ochazukeSourceUrl },
  { name: "ごま玉ねぎの塩だれからあげ膳", calories: 910, protein_g: 35, fat_g: 35, carbs_g: 108, salt_g: 4.5, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "塩だれ", "推定栄養"], source_url: allergySourceUrl },
  { name: "豚の生姜焼き膳", calories: 850, protein_g: 34, fat_g: 30, carbs_g: 108, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "生姜焼き", "推定栄養"], source_url: allergySourceUrl },
  { name: "鶏の唐揚げ膳", calories: 880, protein_g: 34, fat_g: 34, carbs_g: 106, salt_g: 4.2, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "唐揚げ", "鶏", "推定栄養"], source_url: allergySourceUrl },
  { name: "豆乳タルタルのチキン南蛮膳", calories: 960, protein_g: 36, fat_g: 40, carbs_g: 112, salt_g: 4.8, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "チキン南蛮", "鶏", "タルタル", "推定栄養"], source_url: allergySourceUrl },
  { name: "アボカド・ツナ・きのこの胡麻ソースサラダ膳", calories: 780, protein_g: 26, fat_g: 30, carbs_g: 100, salt_g: 4.0, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "アボカド", "ツナ", "きのこ", "サラダ", "推定栄養"], source_url: allergySourceUrl },
  { name: "ステーキ醤油のおろしハンバーグ膳", calories: 920, protein_g: 36, fat_g: 36, carbs_g: 108, salt_g: 4.6, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "ハンバーグ", "おろし", "推定栄養"], source_url: allergySourceUrl },
  { name: "塩レモンハンバーグ膳", calories: 900, protein_g: 36, fat_g: 35, carbs_g: 108, salt_g: 4.5, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "ハンバーグ", "塩レモン", "推定栄養"], source_url: allergySourceUrl },
  { name: "鯖の味噌煮膳", calories: 840, protein_g: 36, fat_g: 28, carbs_g: 102, salt_g: 4.3, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鯖", "味噌煮", "魚", "推定栄養"], source_url: allergySourceUrl },
  { name: "鯖竜田とごろごろ野菜の黒酢だれ膳", calories: 880, protein_g: 36, fat_g: 32, carbs_g: 106, salt_g: 4.5, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "鯖", "竜田揚げ", "黒酢", "野菜", "推定栄養"], source_url: allergySourceUrl },
  { name: "三種のフライ盛り合わせ膳", calories: 980, protein_g: 34, fat_g: 42, carbs_g: 112, salt_g: 4.8, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "フライ", "揚げ物", "推定栄養"], source_url: allergySourceUrl },
  { name: "よだれ豚しゃぶ膳", calories: 820, protein_g: 34, fat_g: 28, carbs_g: 106, salt_g: 4.4, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "しゃぶしゃぶ", "辛い", "推定栄養"], source_url: allergySourceUrl },
  { name: "とろとろ豚の角煮膳", calories: 920, protein_g: 32, fat_g: 36, carbs_g: 110, salt_g: 4.8, serving_label: "1膳", tags: ["こめらく", "お茶漬け膳", "豚", "角煮", "推定栄養"], source_url: allergySourceUrl },

  { name: "鮭といくらごはんとお好きなスープセット", calories: 780, protein_g: 38, fat_g: 20, carbs_g: 108, salt_g: 4.2, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "鮭", "いくら", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "まぐろの山かけごはんとお好きなスープセット", calories: 740, protein_g: 40, fat_g: 10, carbs_g: 118, salt_g: 4.0, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "まぐろ", "山かけ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "真鯛のゴマだれごはんとお好きなスープセット", calories: 760, protein_g: 38, fat_g: 18, carbs_g: 108, salt_g: 4.1, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "真鯛", "ごまだれ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "漬けと中落の二色まぐろごはんとお好きなスープセット", calories: 760, protein_g: 42, fat_g: 11, carbs_g: 118, salt_g: 4.3, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "まぐろ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "帆立とサーモンの柚子塩ごはんとお好きなスープセット", calories: 790, protein_g: 38, fat_g: 18, carbs_g: 112, salt_g: 4.0, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "帆立", "サーモン", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "胡麻鯖と鯵のたたきごはんとお好きなスープセット", calories: 800, protein_g: 42, fat_g: 22, carbs_g: 106, salt_g: 4.2, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "鯖", "あじ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "鯵のなめろうごはんとお好きなスープセット", calories: 760, protein_g: 40, fat_g: 14, carbs_g: 110, salt_g: 4.0, serving_label: "1セット", tags: ["こめらく", "海鮮ごはん", "スープセット", "あじ", "なめろう", "推定栄養"], source_url: allergySourceUrl },
  { name: "鶏つみれの塩ちゃんこ汁", calories: 180, protein_g: 12, fat_g: 6, carbs_g: 18, salt_g: 2.8, serving_label: "1杯", tags: ["こめらく", "スープ", "鶏", "つみれ", "塩ちゃんこ", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "たっぷりきのこのけんちん汁", calories: 160, protein_g: 8, fat_g: 5, carbs_g: 24, salt_g: 2.5, serving_label: "1杯", tags: ["こめらく", "スープ", "きのこ", "けんちん汁", "野菜", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "ごろごろ野菜の具だくさん豚汁", calories: 220, protein_g: 11, fat_g: 10, carbs_g: 24, salt_g: 2.8, serving_label: "1杯", tags: ["こめらく", "スープ", "豚汁", "野菜", "豚", "推定栄養"], source_url: kaisenSoupSourceUrl },
  { name: "サーモンといくらの北海茶漬け〜柚子味噌和え〜", calories: 620, protein_g: 34, fat_g: 14, carbs_g: 90, salt_g: 4.0, serving_label: "1杯", tags: ["こめらく", "お茶漬け", "サーモン", "いくら", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "真鯛のごま和え茶漬け", calories: 580, protein_g: 34, fat_g: 12, carbs_g: 86, salt_g: 3.8, serving_label: "1杯", tags: ["こめらく", "お茶漬け", "真鯛", "ごま", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "あじのなめろう茶漬け", calories: 590, protein_g: 34, fat_g: 13, carbs_g: 86, salt_g: 3.9, serving_label: "1杯", tags: ["こめらく", "お茶漬け", "あじ", "なめろう", "海鮮", "推定栄養"], source_url: allergySourceUrl },
  { name: "紀州五代梅とじゃこのお茶漬け", calories: 520, protein_g: 18, fat_g: 5, carbs_g: 98, salt_g: 4.2, serving_label: "1杯", tags: ["こめらく", "お茶漬け", "梅", "じゃこ", "しらす", "推定栄養"], source_url: allergySourceUrl },

  { name: "角煮と高菜の混ぜごはんおむすび", calories: 260, protein_g: 8, fat_g: 8, carbs_g: 38, salt_g: 1.2, serving_label: "1個", tags: ["こめらく", "おむすび", "角煮", "高菜", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "鮭・天かす・青のりの混ぜごはんおむすび", calories: 230, protein_g: 7, fat_g: 6, carbs_g: 38, salt_g: 1.1, serving_label: "1個", tags: ["こめらく", "おむすび", "鮭", "天かす", "青のり", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "焼しゃけほぐしおむすび", calories: 210, protein_g: 8, fat_g: 4, carbs_g: 36, salt_g: 1.0, serving_label: "1個", tags: ["こめらく", "おむすび", "鮭", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "カリカリ梅とじゃこの混ぜごはんおむすび", calories: 210, protein_g: 6, fat_g: 3, carbs_g: 40, salt_g: 1.3, serving_label: "1個", tags: ["こめらく", "おむすび", "梅", "じゃこ", "しらす", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "ピリ辛焼き鯖の味噌和えおむすび", calories: 240, protein_g: 8, fat_g: 6, carbs_g: 38, salt_g: 1.3, serving_label: "1個", tags: ["こめらく", "おむすび", "鯖", "味噌", "辛い", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "和風ツナマヨおむすび", calories: 260, protein_g: 6, fat_g: 10, carbs_g: 36, salt_g: 1.0, serving_label: "1個", tags: ["こめらく", "おむすび", "ツナマヨ", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "肉味噌おむすび", calories: 240, protein_g: 7, fat_g: 7, carbs_g: 38, salt_g: 1.3, serving_label: "1個", tags: ["こめらく", "おむすび", "肉味噌", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "葉わさびおむすび", calories: 190, protein_g: 4, fat_g: 2, carbs_g: 38, salt_g: 1.1, serving_label: "1個", tags: ["こめらく", "おむすび", "葉わさび", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "梅おむすび", calories: 185, protein_g: 4, fat_g: 2, carbs_g: 38, salt_g: 1.2, serving_label: "1個", tags: ["こめらく", "おむすび", "梅", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "桜えびマヨネーズおむすび", calories: 250, protein_g: 6, fat_g: 9, carbs_g: 36, salt_g: 1.2, serving_label: "1個", tags: ["こめらく", "おむすび", "桜えび", "マヨ", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "高菜おむすび", calories: 190, protein_g: 4, fat_g: 2, carbs_g: 38, salt_g: 1.2, serving_label: "1個", tags: ["こめらく", "おむすび", "高菜", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "牛しぐれ煮と紅生姜の混ぜごはんおむすび", calories: 260, protein_g: 8, fat_g: 8, carbs_g: 38, salt_g: 1.4, serving_label: "1個", tags: ["こめらく", "おむすび", "牛肉", "しぐれ煮", "紅生姜", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
  { name: "うなぎ蒲焼玉子そぼろ入り焼きおむすび", calories: 300, protein_g: 10, fat_g: 8, carbs_g: 46, salt_g: 1.4, serving_label: "1個", tags: ["こめらく", "おむすび", "うなぎ", "焼きおむすび", "発芽玄米", "推定栄養"], source_url: omusubiSourceUrl },
];

export const komerakuMenuFoods = komerakuFoods.map((food) =>
  estimatedWithProfileTags({
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
    profile: inferProfile(food),
  }),
);

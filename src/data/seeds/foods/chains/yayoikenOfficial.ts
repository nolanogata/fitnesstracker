import { official } from "../helpers";

const sourceUrl = "https://www.yayoiken.com/menu_list/info/13";
const fetchedAt = "2026-06-01T00:00:00.000Z";
const soupSourceUrl = "https://www.yayoiken.com/menu_list/view/40/765";
const soupFetchedAt = "2026-07-10T00:00:00.000Z";

const yayoiken = (
  name: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
  tags: string[] = [],
  serving_label = "白米",
) =>
  official({
    brand: "やよい軒",
    name,
    category: "チェーン店",
    tags: ["定食", "やよい軒", "公式", "味噌汁カスタム可", ...tags],
    calories,
    protein_g,
    fat_g,
    carbs_g,
    salt_g,
    serving_label,
    default_meal_type: "lunch",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });

const yayoikenSoup = (
  name: string,
  calories: number,
  protein_g: number,
  fat_g: number,
  carbs_g: number,
  salt_g: number,
  tags: string[] = [],
) =>
  official({
    brand: "やよい軒",
    name,
    category: "スープ",
    tags: ["やよい軒", "公式", "スープ", ...tags],
    calories,
    protein_g,
    fat_g,
    carbs_g,
    salt_g,
    serving_label: "1杯",
    default_meal_type: "lunch",
    source_url: name === "豚汁" ? soupSourceUrl : "https://www.yayoiken.com/menu_list/view/11/79",
    fetched_at: soupFetchedAt,
  });

export const yayoikenOfficialFoods = [
  yayoikenSoup("みそ汁", 21, 2.0, 0.7, 2.0, 1.9, ["味噌汁"]),
  yayoikenSoup("豚汁", 102, 7.3, 4.5, 9.2, 2.5, ["豚肉", "味噌汁変更"]),
  yayoiken("しょうが焼定食", 717, 26.2, 37.1, 72.9, 5.0, ["生姜焼き"]),
  yayoiken("肉野菜炒め定食", 545, 26.4, 18.6, 71.4, 5.0, ["野菜炒め"]),
  yayoiken("チキン南蛮定食", 843, 27.6, 37.7, 100.7, 6.3, ["チキン南蛮"]),
  yayoiken("から揚げ定食", 844, 39.7, 43.4, 78.6, 6.1, ["唐揚げ"]),
  yayoiken("特から揚げ定食", 992, 51.7, 52.2, 83.8, 6.9, ["唐揚げ"]),
  yayoiken("味噌かつ煮定食", 845, 40.6, 33.2, 100.2, 5.9, ["かつ"]),
  yayoiken("サバの塩焼定食", 686, 32.9, 35.1, 61.9, 3.8, ["魚", "サバ"]),
  yayoiken("サバの味噌煮定食", 621, 30.4, 24.9, 71.4, 4.3, ["魚", "サバ"]),
  yayoiken("しまほっけ定食", 631, 50.7, 21.3, 61.4, 4.2, ["魚", "ほっけ"]),
  yayoiken("銀鮭の塩焼定食", 499, 30.0, 16.8, 62.9, 4.7, ["魚", "鮭"]),
  yayoiken("なす味噌と焼魚の定食", 817, 30.3, 44.8, 77.4, 5.1, ["魚", "味噌"]),
  yayoiken("やよい御膳", 726, 28.1, 30.0, 89.9, 6.2, ["御膳"]),
  yayoiken("かつ丼", 857, 37.1, 27.0, 119.8, 5.9, ["丼", "かつ"], "ごはん普通盛"),
  yayoiken("地鶏親子丼～阿波尾鶏～", 683, 36.1, 13.8, 107.1, 5.2, ["丼", "親子丼"], "ごはん普通盛"),
  yayoiken("ネギまぐろ丼", 520, 30.4, 3.3, 94.5, 4.9, ["丼", "まぐろ"], "ごはん普通盛"),
];

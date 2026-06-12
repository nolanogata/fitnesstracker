import { estimated } from "../helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sourceUrls: Record<string, string> = {
  セブンイレブン: "https://www.sej.co.jp/products/",
  ファミリーマート: "https://www.family.co.jp/goods.html",
  ローソン: "https://www.lawson.co.jp/recommend/original/",
  ミニストップ: "https://www.ministop.co.jp/syohin/",
};

type ConvenienceInput = {
  brand: keyof typeof sourceUrls;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  meal?: "breakfast" | "lunch" | "dinner" | "snack";
  serving?: string;
};

const convenience = (input: ConvenienceInput) =>
  estimated({
    brand: input.brand,
    name: input.name,
    category: "コンビニ",
    tags: ["コンビニ", input.brand, ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving ?? "1品",
    default_meal_type: input.meal ?? "lunch",
    source_url: sourceUrls[input.brand],
    fetched_at: fetchedAt,
  });

const items: ConvenienceInput[] = [
  { brand: "セブンイレブン", name: "手巻おにぎり ツナマヨネーズ", calories: 235, protein_g: 4.8, fat_g: 9.1, carbs_g: 35.0, salt_g: 1.1, tags: ["おにぎり", "ツナマヨ"] },
  { brand: "セブンイレブン", name: "手巻おにぎり 熟成紅しゃけ", calories: 180, protein_g: 5.6, fat_g: 1.7, carbs_g: 36.0, salt_g: 1.3, tags: ["おにぎり", "鮭"] },
  { brand: "セブンイレブン", name: "手巻おにぎり 紀州南高梅", calories: 166, protein_g: 3.3, fat_g: 0.5, carbs_g: 37.0, salt_g: 1.4, tags: ["おにぎり", "梅"] },
  { brand: "セブンイレブン", name: "手巻おにぎり 昆布", calories: 176, protein_g: 3.7, fat_g: 0.7, carbs_g: 39.0, salt_g: 1.2, tags: ["おにぎり", "昆布"] },
  { brand: "セブンイレブン", name: "たまごサンド", calories: 370, protein_g: 13.0, fat_g: 24.0, carbs_g: 27.0, salt_g: 1.7, tags: ["サンドイッチ", "卵"], meal: "breakfast" },
  { brand: "セブンイレブン", name: "シャキシャキレタスサンド", calories: 280, protein_g: 12.0, fat_g: 14.0, carbs_g: 28.0, salt_g: 1.8, tags: ["サンドイッチ", "野菜"], meal: "breakfast" },
  { brand: "セブンイレブン", name: "ブリトー ハム&チーズ", calories: 292, protein_g: 12.0, fat_g: 11.0, carbs_g: 36.0, salt_g: 1.9, tags: ["ブリトー", "パン", "チーズ"], meal: "snack" },
  { brand: "セブンイレブン", name: "サラダチキン プレーン", calories: 110, protein_g: 24.0, fat_g: 1.2, carbs_g: 0.5, salt_g: 1.2, tags: ["サラダチキン", "高たんぱく", "チキン"], meal: "snack" },
  { brand: "セブンイレブン", name: "半熟煮たまご 2個", calories: 140, protein_g: 12.0, fat_g: 9.0, carbs_g: 2.0, salt_g: 1.3, tags: ["卵", "たんぱく質"], meal: "snack", serving: "2個" },
  { brand: "セブンイレブン", name: "たんぱく質が摂れる チキン&チリ", calories: 370, protein_g: 25.0, fat_g: 12.0, carbs_g: 42.0, salt_g: 2.4, tags: ["高たんぱく", "チキン", "パン"] },
  { brand: "セブンイレブン", name: "ざるそば", calories: 340, protein_g: 15.0, fat_g: 3.0, carbs_g: 65.0, salt_g: 3.0, tags: ["そば", "麺類"] },
  { brand: "セブンイレブン", name: "冷し中華", calories: 520, protein_g: 21.0, fat_g: 12.0, carbs_g: 82.0, salt_g: 5.0, tags: ["冷し中華", "麺類"] },
  { brand: "セブンイレブン", name: "幕の内弁当", calories: 650, protein_g: 25.0, fat_g: 18.0, carbs_g: 95.0, salt_g: 3.7, tags: ["弁当"] },
  { brand: "セブンイレブン", name: "ロースかつ丼", calories: 720, protein_g: 27.0, fat_g: 24.0, carbs_g: 98.0, salt_g: 3.5, tags: ["丼", "カツ"] },
  { brand: "セブンイレブン", name: "銀鮭の塩焼", calories: 160, protein_g: 20.0, fat_g: 8.0, carbs_g: 0.5, salt_g: 1.3, tags: ["魚", "鮭", "惣菜"] },
  { brand: "セブンイレブン", name: "さばの塩焼", calories: 290, protein_g: 20.0, fat_g: 22.0, carbs_g: 0.5, salt_g: 1.4, tags: ["魚", "サバ", "惣菜"] },
  { brand: "セブンイレブン", name: "肉じゃが", calories: 210, protein_g: 8.0, fat_g: 8.0, carbs_g: 27.0, salt_g: 1.8, tags: ["惣菜", "和食"] },
  { brand: "セブンイレブン", name: "シュークリーム", calories: 190, protein_g: 4.0, fat_g: 12.0, carbs_g: 17.0, salt_g: 0.3, tags: ["スイーツ"], meal: "snack" },
  { brand: "セブンイレブン", name: "牛カルビ弁当", calories: 780, protein_g: 25.0, fat_g: 28.0, carbs_g: 103.0, salt_g: 3.6, tags: ["弁当", "牛肉"] },
  { brand: "セブンイレブン", name: "チキン南蛮弁当", calories: 820, protein_g: 28.0, fat_g: 30.0, carbs_g: 107.0, salt_g: 3.8, tags: ["弁当", "チキン"] },
  { brand: "セブンイレブン", name: "明太子スパゲティ", calories: 450, protein_g: 17.0, fat_g: 13.0, carbs_g: 66.0, salt_g: 3.4, tags: ["パスタ", "明太子"] },
  { brand: "セブンイレブン", name: "カップデリ 蒸し鶏とザーサイ", calories: 120, protein_g: 12.0, fat_g: 5.0, carbs_g: 7.0, salt_g: 1.8, tags: ["惣菜", "チキン", "高たんぱく"], meal: "snack" },
  { brand: "セブンイレブン", name: "コールスローサラダ", calories: 130, protein_g: 2.0, fat_g: 9.0, carbs_g: 11.0, salt_g: 1.0, tags: ["サラダ", "野菜"], meal: "snack" },
  { brand: "セブンイレブン", name: "ギリシャヨーグルト", calories: 100, protein_g: 10.0, fat_g: 0.5, carbs_g: 12.0, salt_g: 0.1, tags: ["ヨーグルト", "高たんぱく"], meal: "snack" },
  { brand: "セブンイレブン", name: "プロテインドリンク", calories: 140, protein_g: 20.0, fat_g: 2.0, carbs_g: 10.0, salt_g: 0.3, tags: ["プロテイン", "高たんぱく", "ドリンク"], meal: "snack" },
  { brand: "セブンイレブン", name: "ななチキ", calories: 220, protein_g: 13.0, fat_g: 14.0, carbs_g: 11.0, salt_g: 1.4, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "セブンイレブン", name: "揚げ鶏", calories: 185, protein_g: 12.0, fat_g: 12.0, carbs_g: 7.0, salt_g: 1.1, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "セブンイレブン", name: "カレーパン", calories: 320, protein_g: 7.0, fat_g: 18.0, carbs_g: 34.0, salt_g: 1.6, tags: ["パン", "カレー"], meal: "snack" },

  { brand: "ファミリーマート", name: "手巻 シーチキンマヨネーズ", calories: 232, protein_g: 4.8, fat_g: 8.5, carbs_g: 35.0, salt_g: 1.1, tags: ["おむすび", "おにぎり", "ツナマヨ"] },
  { brand: "ファミリーマート", name: "手巻 紅しゃけ", calories: 183, protein_g: 5.4, fat_g: 1.8, carbs_g: 36.0, salt_g: 1.2, tags: ["おむすび", "おにぎり", "鮭"] },
  { brand: "ファミリーマート", name: "手巻 辛子明太子", calories: 170, protein_g: 4.7, fat_g: 0.8, carbs_g: 36.0, salt_g: 1.5, tags: ["おむすび", "おにぎり", "明太子"] },
  { brand: "ファミリーマート", name: "直巻 和風ツナマヨネーズ", calories: 240, protein_g: 5.0, fat_g: 8.8, carbs_g: 36.0, salt_g: 1.4, tags: ["おむすび", "おにぎり", "ツナマヨ"] },
  { brand: "ファミリーマート", name: "たまごサンド", calories: 350, protein_g: 12.5, fat_g: 22.0, carbs_g: 27.0, salt_g: 1.6, tags: ["サンドイッチ", "卵"], meal: "breakfast" },
  { brand: "ファミリーマート", name: "ハムチーズたまごサンド", calories: 310, protein_g: 14.0, fat_g: 17.0, carbs_g: 27.0, salt_g: 2.0, tags: ["サンドイッチ", "卵", "チーズ"], meal: "breakfast" },
  { brand: "ファミリーマート", name: "グリルチキン ブラックペッパー", calories: 113, protein_g: 21.0, fat_g: 2.3, carbs_g: 2.0, salt_g: 1.5, tags: ["高たんぱく", "チキン"], meal: "snack" },
  { brand: "ファミリーマート", name: "サラダチキン プレーン", calories: 115, protein_g: 24.0, fat_g: 1.5, carbs_g: 1.0, salt_g: 1.4, tags: ["サラダチキン", "高たんぱく", "チキン"], meal: "snack" },
  { brand: "ファミリーマート", name: "ファミチキ", calories: 251, protein_g: 12.7, fat_g: 15.7, carbs_g: 14.8, salt_g: 1.4, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ファミリーマート", name: "スパイシーチキン", calories: 201, protein_g: 10.0, fat_g: 12.0, carbs_g: 13.0, salt_g: 1.3, tags: ["ホットスナック", "チキン", "辛い"], meal: "snack" },
  { brand: "ファミリーマート", name: "炙り焼鮭弁当", calories: 520, protein_g: 24.0, fat_g: 12.0, carbs_g: 78.0, salt_g: 3.0, tags: ["弁当", "鮭"] },
  { brand: "ファミリーマート", name: "3色そぼろ&チキン南蛮弁当", calories: 760, protein_g: 29.0, fat_g: 24.0, carbs_g: 104.0, salt_g: 3.8, tags: ["弁当", "チキン"] },
  { brand: "ファミリーマート", name: "冷しぶっかけうどん", calories: 370, protein_g: 12.0, fat_g: 4.0, carbs_g: 72.0, salt_g: 4.0, tags: ["うどん", "麺類"] },
  { brand: "ファミリーマート", name: "大盛ミートソース", calories: 650, protein_g: 24.0, fat_g: 20.0, carbs_g: 96.0, salt_g: 4.2, tags: ["パスタ", "大盛"] },
  { brand: "ファミリーマート", name: "濃厚カスタードシュー", calories: 195, protein_g: 4.0, fat_g: 12.0, carbs_g: 18.0, salt_g: 0.3, tags: ["スイーツ"], meal: "snack" },
  { brand: "ファミリーマート", name: "たべる牧場ミルク", calories: 165, protein_g: 4.0, fat_g: 7.0, carbs_g: 22.0, salt_g: 0.2, tags: ["アイス", "スイーツ"], meal: "snack" },
  { brand: "ファミリーマート", name: "のり弁当", calories: 760, protein_g: 23.0, fat_g: 23.0, carbs_g: 111.0, salt_g: 3.8, tags: ["弁当", "のり弁"] },
  { brand: "ファミリーマート", name: "親子丼", calories: 620, protein_g: 26.0, fat_g: 16.0, carbs_g: 91.0, salt_g: 3.5, tags: ["丼", "卵", "チキン"] },
  { brand: "ファミリーマート", name: "冷し中華", calories: 510, protein_g: 20.0, fat_g: 11.0, carbs_g: 83.0, salt_g: 5.0, tags: ["冷し中華", "麺類"] },
  { brand: "ファミリーマート", name: "だし香る冷しそば", calories: 350, protein_g: 15.0, fat_g: 3.0, carbs_g: 67.0, salt_g: 3.6, tags: ["そば", "麺類"] },
  { brand: "ファミリーマート", name: "クリスピーチキン プレーン", calories: 145, protein_g: 11.0, fat_g: 8.0, carbs_g: 8.0, salt_g: 1.1, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ファミリーマート", name: "焼鳥ももタレ", calories: 120, protein_g: 12.0, fat_g: 5.0, carbs_g: 7.0, salt_g: 1.2, tags: ["焼鳥", "チキン", "高たんぱく"], meal: "snack" },
  { brand: "ファミリーマート", name: "サラダチキンバー", calories: 65, protein_g: 13.0, fat_g: 1.0, carbs_g: 1.0, salt_g: 0.8, tags: ["サラダチキン", "高たんぱく", "チキン"], meal: "snack" },
  { brand: "ファミリーマート", name: "プロテインドリンク", calories: 140, protein_g: 20.0, fat_g: 2.0, carbs_g: 10.0, salt_g: 0.3, tags: ["プロテイン", "高たんぱく", "ドリンク"], meal: "snack" },
  { brand: "ファミリーマート", name: "バウムクーヘン", calories: 250, protein_g: 4.0, fat_g: 14.0, carbs_g: 28.0, salt_g: 0.3, tags: ["焼き菓子", "スイーツ"], meal: "snack" },
  { brand: "ファミリーマート", name: "どら焼き", calories: 220, protein_g: 5.0, fat_g: 3.0, carbs_g: 44.0, salt_g: 0.3, tags: ["和菓子", "スイーツ"], meal: "snack" },

  { brand: "ローソン", name: "金しゃりおにぎり 焼さけハラミ", calories: 215, protein_g: 6.5, fat_g: 4.0, carbs_g: 38.0, salt_g: 1.4, tags: ["おにぎり", "鮭"] },
  { brand: "ローソン", name: "手巻おにぎり シーチキンマヨネーズ", calories: 235, protein_g: 4.8, fat_g: 8.8, carbs_g: 35.0, salt_g: 1.1, tags: ["おにぎり", "ツナマヨ"] },
  { brand: "ローソン", name: "手巻おにぎり 熟成紀州南高梅", calories: 166, protein_g: 3.3, fat_g: 0.5, carbs_g: 37.0, salt_g: 1.5, tags: ["おにぎり", "梅"] },
  { brand: "ローソン", name: "おにぎりセット", calories: 450, protein_g: 13.0, fat_g: 12.0, carbs_g: 72.0, salt_g: 2.7, tags: ["おにぎり", "セット"] },
  { brand: "ローソン", name: "たまごサンド", calories: 340, protein_g: 12.0, fat_g: 21.0, carbs_g: 27.0, salt_g: 1.7, tags: ["サンドイッチ", "卵"], meal: "breakfast" },
  { brand: "ローソン", name: "ミックスサンド", calories: 320, protein_g: 13.0, fat_g: 16.0, carbs_g: 31.0, salt_g: 2.1, tags: ["サンドイッチ"], meal: "breakfast" },
  { brand: "ローソン", name: "サラダチキン プレーン", calories: 114, protein_g: 23.0, fat_g: 1.8, carbs_g: 1.0, salt_g: 1.4, tags: ["サラダチキン", "高たんぱく", "チキン"], meal: "snack" },
  { brand: "ローソン", name: "からあげクン レギュラー", calories: 225, protein_g: 14.0, fat_g: 15.0, carbs_g: 9.0, salt_g: 1.7, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ローソン", name: "からあげクン レッド", calories: 230, protein_g: 14.0, fat_g: 15.0, carbs_g: 10.0, salt_g: 1.8, tags: ["ホットスナック", "チキン", "辛い"], meal: "snack" },
  { brand: "ローソン", name: "Lチキ レギュラー", calories: 250, protein_g: 13.0, fat_g: 16.0, carbs_g: 14.0, salt_g: 1.4, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ローソン", name: "ブランパン 2個入", calories: 130, protein_g: 12.0, fat_g: 5.0, carbs_g: 16.0, salt_g: 0.8, tags: ["パン", "低糖質", "高たんぱく"], meal: "breakfast", serving: "2個" },
  { brand: "ローソン", name: "これがのり弁当", calories: 770, protein_g: 23.0, fat_g: 24.0, carbs_g: 112.0, salt_g: 4.0, tags: ["弁当", "のり弁"] },
  { brand: "ローソン", name: "これがチキン南蛮弁当", calories: 800, protein_g: 27.0, fat_g: 28.0, carbs_g: 108.0, salt_g: 3.8, tags: ["弁当", "チキン"] },
  { brand: "ローソン", name: "冷し中華", calories: 500, protein_g: 20.0, fat_g: 10.0, carbs_g: 82.0, salt_g: 5.0, tags: ["冷し中華", "麺類"] },
  { brand: "ローソン", name: "たらこパスタ", calories: 420, protein_g: 16.0, fat_g: 12.0, carbs_g: 62.0, salt_g: 3.2, tags: ["パスタ"] },
  { brand: "ローソン", name: "プレミアムロールケーキ", calories: 220, protein_g: 3.5, fat_g: 16.0, carbs_g: 16.0, salt_g: 0.2, tags: ["スイーツ"], meal: "snack" },
  { brand: "ローソン", name: "鮭弁当", calories: 560, protein_g: 25.0, fat_g: 14.0, carbs_g: 84.0, salt_g: 3.2, tags: ["弁当", "鮭"] },
  { brand: "ローソン", name: "親子丼", calories: 620, protein_g: 26.0, fat_g: 16.0, carbs_g: 91.0, salt_g: 3.5, tags: ["丼", "卵", "チキン"] },
  { brand: "ローソン", name: "ざるそば", calories: 340, protein_g: 15.0, fat_g: 3.0, carbs_g: 65.0, salt_g: 3.0, tags: ["そば", "麺類"] },
  { brand: "ローソン", name: "たんぱく質が摂れる チキン&たまご", calories: 380, protein_g: 26.0, fat_g: 13.0, carbs_g: 40.0, salt_g: 2.4, tags: ["高たんぱく", "チキン", "卵"] },
  { brand: "ローソン", name: "豆腐バー", calories: 120, protein_g: 10.0, fat_g: 7.0, carbs_g: 5.0, salt_g: 0.8, tags: ["豆腐", "高たんぱく"], meal: "snack" },
  { brand: "ローソン", name: "焼鳥ももタレ", calories: 120, protein_g: 12.0, fat_g: 5.0, carbs_g: 7.0, salt_g: 1.2, tags: ["焼鳥", "チキン", "高たんぱく"], meal: "snack" },
  { brand: "ローソン", name: "ジャイアントポークフランク", calories: 300, protein_g: 12.0, fat_g: 25.0, carbs_g: 7.0, salt_g: 2.0, tags: ["ホットスナック", "ソーセージ"], meal: "snack" },
  { brand: "ローソン", name: "海からクン", calories: 205, protein_g: 12.0, fat_g: 12.0, carbs_g: 11.0, salt_g: 1.5, tags: ["ホットスナック", "魚介"], meal: "snack" },
  { brand: "ローソン", name: "大きなツインシュー", calories: 320, protein_g: 5.0, fat_g: 22.0, carbs_g: 26.0, salt_g: 0.3, tags: ["スイーツ"], meal: "snack" },
  { brand: "ローソン", name: "どらもっち", calories: 260, protein_g: 4.0, fat_g: 11.0, carbs_g: 37.0, salt_g: 0.3, tags: ["和菓子", "スイーツ"], meal: "snack" },

  { brand: "ミニストップ", name: "手巻おにぎり ツナマヨネーズ", calories: 230, protein_g: 4.8, fat_g: 8.5, carbs_g: 35.0, salt_g: 1.1, tags: ["おにぎり", "ツナマヨ"] },
  { brand: "ミニストップ", name: "手巻おにぎり 紅しゃけ", calories: 185, protein_g: 5.5, fat_g: 2.0, carbs_g: 36.0, salt_g: 1.3, tags: ["おにぎり", "鮭"] },
  { brand: "ミニストップ", name: "手巻おにぎり 紀州梅", calories: 168, protein_g: 3.3, fat_g: 0.5, carbs_g: 37.0, salt_g: 1.5, tags: ["おにぎり", "梅"] },
  { brand: "ミニストップ", name: "店内手づくりおにぎり 鮭", calories: 220, protein_g: 6.5, fat_g: 2.8, carbs_g: 43.0, salt_g: 1.5, tags: ["おにぎり", "店内手づくり", "鮭"] },
  { brand: "ミニストップ", name: "たまごサンド", calories: 350, protein_g: 12.0, fat_g: 22.0, carbs_g: 27.0, salt_g: 1.7, tags: ["サンドイッチ", "卵"], meal: "breakfast" },
  { brand: "ミニストップ", name: "ミックスサンド", calories: 320, protein_g: 13.0, fat_g: 16.0, carbs_g: 31.0, salt_g: 2.1, tags: ["サンドイッチ"], meal: "breakfast" },
  { brand: "ミニストップ", name: "ジューシーチキン プレーン", calories: 260, protein_g: 14.0, fat_g: 17.0, carbs_g: 13.0, salt_g: 1.4, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ミニストップ", name: "クランキーチキン", calories: 290, protein_g: 13.0, fat_g: 18.0, carbs_g: 18.0, salt_g: 1.7, tags: ["ホットスナック", "チキン"], meal: "snack" },
  { brand: "ミニストップ", name: "Xフライドポテト", calories: 410, protein_g: 5.0, fat_g: 22.0, carbs_g: 48.0, salt_g: 1.9, tags: ["ホットスナック", "ポテト"], meal: "snack" },
  { brand: "ミニストップ", name: "ホットドッグ", calories: 310, protein_g: 11.0, fat_g: 16.0, carbs_g: 31.0, salt_g: 2.0, tags: ["ホットスナック", "パン"], meal: "snack" },
  { brand: "ミニストップ", name: "のり弁当", calories: 720, protein_g: 22.0, fat_g: 22.0, carbs_g: 105.0, salt_g: 3.8, tags: ["弁当", "のり弁"] },
  { brand: "ミニストップ", name: "幕の内弁当", calories: 650, protein_g: 25.0, fat_g: 18.0, carbs_g: 95.0, salt_g: 3.7, tags: ["弁当"] },
  { brand: "ミニストップ", name: "冷しぶっかけうどん", calories: 370, protein_g: 12.0, fat_g: 4.0, carbs_g: 72.0, salt_g: 4.0, tags: ["うどん", "麺類"] },
  { brand: "ミニストップ", name: "ミートソースパスタ", calories: 610, protein_g: 23.0, fat_g: 18.0, carbs_g: 90.0, salt_g: 4.0, tags: ["パスタ"] },
  { brand: "ミニストップ", name: "北海道ミルクソフト", calories: 185, protein_g: 4.0, fat_g: 7.0, carbs_g: 27.0, salt_g: 0.2, tags: ["ソフトクリーム", "スイーツ"], meal: "snack" },
  { brand: "ミニストップ", name: "ハロハロ", calories: 300, protein_g: 4.0, fat_g: 6.0, carbs_g: 58.0, salt_g: 0.2, tags: ["ハロハロ", "スイーツ"], meal: "snack" },
  { brand: "ミニストップ", name: "なめらかプリンパフェ", calories: 320, protein_g: 6.0, fat_g: 13.0, carbs_g: 45.0, salt_g: 0.3, tags: ["パフェ", "スイーツ"], meal: "snack" },
  { brand: "ミニストップ", name: "辛口ジューシーチキン", calories: 270, protein_g: 14.0, fat_g: 17.0, carbs_g: 14.0, salt_g: 1.6, tags: ["ホットスナック", "チキン", "辛い"], meal: "snack" },
  { brand: "ミニストップ", name: "十勝ハッシュドポテト", calories: 230, protein_g: 3.0, fat_g: 13.0, carbs_g: 25.0, salt_g: 1.1, tags: ["ホットスナック", "ポテト"], meal: "snack" },
  { brand: "ミニストップ", name: "チーズハットグ", calories: 330, protein_g: 10.0, fat_g: 16.0, carbs_g: 36.0, salt_g: 1.7, tags: ["ホットスナック", "チーズ"], meal: "snack" },
  { brand: "ミニストップ", name: "まぜてのむほろにがコーヒーゼリー", calories: 230, protein_g: 5.0, fat_g: 6.0, carbs_g: 39.0, salt_g: 0.3, tags: ["ドリンク", "スイーツ", "コーヒー"], meal: "snack" },
  { brand: "ミニストップ", name: "サラダチキン プレーン", calories: 115, protein_g: 24.0, fat_g: 1.5, carbs_g: 1.0, salt_g: 1.4, tags: ["サラダチキン", "高たんぱく", "チキン"], meal: "snack" },
  { brand: "ミニストップ", name: "プロテインバー", calories: 200, protein_g: 15.0, fat_g: 8.0, carbs_g: 18.0, salt_g: 0.4, tags: ["プロテイン", "高たんぱく"], meal: "snack" },
  { brand: "ミニストップ", name: "鮭弁当", calories: 560, protein_g: 25.0, fat_g: 14.0, carbs_g: 84.0, salt_g: 3.2, tags: ["弁当", "鮭"] },
  { brand: "ミニストップ", name: "ソース焼そば", calories: 620, protein_g: 16.0, fat_g: 22.0, carbs_g: 88.0, salt_g: 4.8, tags: ["焼きそば", "麺類"] },
  { brand: "ミニストップ", name: "冷し中華", calories: 500, protein_g: 20.0, fat_g: 10.0, carbs_g: 82.0, salt_g: 5.0, tags: ["冷し中華", "麺類"] },
  { brand: "ミニストップ", name: "シュークリーム", calories: 195, protein_g: 4.0, fat_g: 12.0, carbs_g: 18.0, salt_g: 0.3, tags: ["スイーツ"], meal: "snack" },
];

export const convenienceFoods = items.map(convenience);

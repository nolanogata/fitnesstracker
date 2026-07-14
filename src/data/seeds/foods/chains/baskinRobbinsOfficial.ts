import { official } from "../helpers.ts";

const sourceUrl = "https://www.br31.jp/contents/calorieallergy/energy/";
const fetchedAt = "2026-07-14T00:00:00.000Z";

type FlavorNutrition = {
  name: string;
  kidsSmall: [number, number, number, number];
  regular: [number, number, number, number];
  pop: [number, number, number, number];
};

const flavors: FlavorNutrition[] = [
  { name: "どうぶつの森 夏の島 ごちそうアイス", kidsSmall: [152, 0.9, 4, 27], regular: [236, 1, 7, 42], pop: [108, 0.6, 3, 19] },
  { name: "ダイキュリーアイス", kidsSmall: [109, 0, 0, 27], regular: [170, 0, 0, 42], pop: [78, 0, 0, 19] },
  { name: "クレイジー アバウト マンゴ", kidsSmall: [144, 0.9, 2, 27], regular: [225, 1, 4, 42], pop: [103, 0.6, 1, 19] },
  { name: "レモンシャーベット", kidsSmall: [129, 0.9, 0.9, 27], regular: [201, 1, 1, 42], pop: [92, 0.6, 0.6, 19] },
  { name: "ラズベリーフロマージュ", kidsSmall: [164, 1, 5, 26], regular: [256, 2, 8, 40], pop: [117, 1, 3, 18] },
  { name: "ポッピンコットンキャンディ", kidsSmall: [171, 1, 6, 24], regular: [269, 2, 9, 38], pop: [122, 1, 4, 17] },
  { name: "ワンダフル キャラメル プレッツェル", kidsSmall: [156, 2, 7, 20], regular: [245, 3, 11, 31], pop: [111, 1, 5, 14] },
  { name: "ハッピー ブレイクタイム ～made with KITKAT®～", kidsSmall: [184, 2, 9, 20], regular: [289, 4, 15, 31], pop: [131, 2, 7, 14] },
  { name: "キウイ杏仁豆腐", kidsSmall: [127, 0.9, 1, 25], regular: [198, 1, 2, 39], pop: [90, 0.6, 1, 17] },
  { name: "ティーオーレ", kidsSmall: [140, 2, 6, 17], regular: [221, 3, 9, 27], pop: [100, 1, 4, 12] },
  { name: "マスカットバスケット", kidsSmall: [109, 0, 0, 27], regular: [170, 0, 0, 42], pop: [78, 0, 0, 19] },
  { name: "ピーチメルバ", kidsSmall: [144, 0.9, 3, 26], regular: [225, 1, 5, 40], pop: [103, 0.6, 2, 18] },
  { name: "ポッピングシャワー", kidsSmall: [165, 2, 7, 20], regular: [259, 3, 12, 31], pop: [118, 1, 5, 14] },
  { name: "ラブポーションサーティワン", kidsSmall: [160, 2, 7, 20], regular: [251, 3, 12, 31], pop: [114, 1, 5, 14] },
  { name: "ナッツトゥユー", kidsSmall: [168, 2, 9, 15], regular: [265, 4, 15, 24], pop: [120, 2, 7, 11] },
  { name: "大納言あずき", kidsSmall: [159, 2, 6, 22], regular: [250, 4, 9, 35], pop: [114, 2, 4, 16] },
  { name: "クッキーアンドクリーム", kidsSmall: [168, 2, 9, 18], regular: [265, 3, 14, 28], pop: [120, 1, 6, 13] },
  { name: "ストロベリーチーズケーキ", kidsSmall: [155, 2, 7, 20], regular: [244, 3, 11, 31], pop: [111, 1, 5, 14] },
  { name: "チョコレート", kidsSmall: [154, 2, 8, 20], regular: [242, 4, 13, 31], pop: [110, 2, 6, 14] },
  { name: "抹茶", kidsSmall: [140, 2, 7, 15], regular: [221, 4, 11, 24], pop: [100, 2, 5, 11] },
  { name: "マスクメロン", kidsSmall: [135, 2, 6, 15], regular: [212, 3, 9, 24], pop: [96, 1, 4, 11] },
  { name: "ロッキーロード®", kidsSmall: [175, 3, 9, 22], regular: [275, 5, 14, 35], pop: [125, 2, 6, 16] },
  { name: "ラムレーズン", kidsSmall: [143, 2, 5, 19], regular: [225, 3, 8, 30], pop: [102, 1, 4, 14] },
  { name: "キャラメルリボン", kidsSmall: [150, 2, 6, 20], regular: [236, 3, 9, 31], pop: [107, 1, 4, 14] },
  { name: "バナナアンドストロベリー", kidsSmall: [132, 1, 4, 18], regular: [207, 2, 7, 29], pop: [94, 1, 3, 13] },
  { name: "チョコレートミント", kidsSmall: [154, 2, 7, 17], regular: [242, 3, 12, 27], pop: [110, 1, 5, 12] },
  { name: "チョップドチョコレート", kidsSmall: [175, 3, 10, 19], regular: [275, 5, 16, 30], pop: [125, 2, 7, 14] },
  { name: "オレンジソルベ", kidsSmall: [109, 0, 0, 27], regular: [170, 0, 0, 42], pop: [78, 0, 0, 19] },
  { name: "ジャモカアーモンドファッジ", kidsSmall: [168, 2, 9, 19], regular: [264, 4, 14, 30], pop: [120, 2, 6, 14] },
  { name: "ベリーベリーストロベリー", kidsSmall: [126, 1, 4, 17], regular: [199, 2, 7, 27], pop: [90, 1, 3, 12] },
  { name: "バニラ", kidsSmall: [140, 2, 7, 16], regular: [221, 3, 11, 25], pop: [100, 1, 5, 11] },
];

const sizes = [
  { key: "kidsSmall" as const, label: "キッズ／スモール" },
  { key: "regular" as const, label: "レギュラー" },
  { key: "pop" as const, label: "ポップ" },
];

export const baskinRobbinsOfficialFoods = flavors.flatMap((flavor) => sizes.map(({ key, label }) => {
  const [calories, protein_g, fat_g, carbs_g] = flavor[key];
  return official({
    brand: "サーティワン",
    name: flavor.name,
    category: "チェーン店",
    tags: ["カフェ", "アイス", "デザート", "サーティワン", "フレーバー", "公式栄養", "公式サイズのみ"],
    calories,
    protein_g,
    fat_g,
    carbs_g,
    serving_label: label,
    default_meal_type: "snack",
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  });
}));

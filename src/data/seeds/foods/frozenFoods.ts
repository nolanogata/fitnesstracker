import { estimated } from "./helpers";

const fetchedAt = "2026-06-15T00:00:00.000Z";

type FrozenInput = {
  brand?: string;
  name: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label: string;
  source_url?: string;
};

const frozenGeneric = (input: FrozenInput) =>
  estimated({
    ...input,
    tags: ["冷凍食品", "一般", ...input.tags],
    default_meal_type: "lunch",
    fetched_at: fetchedAt,
  });

type FrozenProductInput = Required<Pick<FrozenInput, "brand" | "source_url">> & Omit<FrozenInput, "brand" | "source_url" | "category">;

const frozenEstimatedProduct = (input: FrozenProductInput) =>
  estimated({
    ...input,
    category: "冷凍食品",
    tags: ["市販品", "冷凍食品", "公式商品確認", "栄養推定", ...input.tags],
    default_meal_type: "lunch",
    fetched_at: fetchedAt,
  });

export const frozenFoods = [
  frozenGeneric({ name: "冷凍チャーハン", category: "ごはん・丼", tags: ["チャーハン", "主食"], calories: 610, protein_g: 16, fat_g: 20, carbs_g: 92, salt_g: 3.2, serving_label: "1食 300g" }),
  frozenGeneric({ name: "冷凍ラーメン 醤油", category: "麺類", tags: ["ラーメン", "醤油", "主食"], calories: 470, protein_g: 19, fat_g: 12, carbs_g: 72, salt_g: 6.0, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍ラーメン 味噌", category: "麺類", tags: ["ラーメン", "味噌", "主食"], calories: 560, protein_g: 22, fat_g: 18, carbs_g: 76, salt_g: 6.5, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍ラーメン 豚骨", category: "麺類", tags: ["ラーメン", "豚骨", "主食"], calories: 610, protein_g: 24, fat_g: 24, carbs_g: 72, salt_g: 6.4, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍スパゲティ ミートソース", category: "麺類", tags: ["パスタ", "スパゲティ", "ミートソース", "主食"], calories: 510, protein_g: 18, fat_g: 15, carbs_g: 76, salt_g: 3.0, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍スパゲティ ナポリタン", category: "麺類", tags: ["パスタ", "スパゲティ", "ナポリタン", "主食"], calories: 560, protein_g: 18, fat_g: 18, carbs_g: 82, salt_g: 3.4, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍スパゲティ カルボナーラ", category: "麺類", tags: ["パスタ", "スパゲティ", "カルボナーラ", "主食"], calories: 610, protein_g: 20, fat_g: 26, carbs_g: 72, salt_g: 3.2, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍うどん", category: "麺類", tags: ["うどん", "主食"], calories: 260, protein_g: 7, fat_g: 1, carbs_g: 56, salt_g: 0.7, serving_label: "1玉 200g" }),
  frozenGeneric({ name: "冷凍焼きおにぎり", category: "ごはん・丼", tags: ["焼きおにぎり", "おにぎり", "主食"], calories: 160, protein_g: 3, fat_g: 1, carbs_g: 35, salt_g: 1.1, serving_label: "1個" }),
  frozenGeneric({ name: "冷凍唐揚げ", category: "おかず・惣菜", tags: ["唐揚げ", "鶏", "おかず"], calories: 330, protein_g: 20, fat_g: 20, carbs_g: 18, salt_g: 2.0, serving_label: "100g" }),
  frozenGeneric({ name: "冷凍餃子", category: "おかず・惣菜", tags: ["餃子", "中華", "おかず"], calories: 300, protein_g: 12, fat_g: 15, carbs_g: 30, salt_g: 1.8, serving_label: "6個" }),
  frozenGeneric({ name: "冷凍ハンバーグ", category: "おかず・惣菜", tags: ["ハンバーグ", "洋食", "おかず"], calories: 320, protein_g: 16, fat_g: 20, carbs_g: 20, salt_g: 2.0, serving_label: "1個" }),
  frozenGeneric({ name: "冷凍コロッケ", category: "おかず・惣菜", tags: ["コロッケ", "揚げ物", "おかず"], calories: 180, protein_g: 4, fat_g: 9, carbs_g: 22, salt_g: 0.8, serving_label: "1個" }),
  frozenGeneric({ name: "冷凍グラタン", category: "おかず・惣菜", tags: ["グラタン", "洋食", "チーズ"], calories: 360, protein_g: 12, fat_g: 16, carbs_g: 42, salt_g: 2.4, serving_label: "1食" }),
  frozenGeneric({ name: "冷凍たこ焼き", category: "粉物", tags: ["たこ焼き", "粉物", "軽食"], calories: 320, protein_g: 12, fat_g: 9, carbs_g: 48, salt_g: 2.2, serving_label: "8個" }),

  frozenEstimatedProduct({ brand: "ニチレイ", name: "本格炒め炒飯", calories: 615, protein_g: 14.9, fat_g: 21.2, carbs_g: 91.0, salt_g: 3.6, serving_label: "1食 300g", source_url: "https://www.nichireifoods.co.jp/product/detail/sho_id4131/", tags: ["チャーハン", "主食"] }),
  frozenEstimatedProduct({ brand: "味の素冷凍食品", name: "ザ★®チャーハン", calories: 587, protein_g: 17.6, fat_g: 19.6, carbs_g: 85.0, salt_g: 4.0, serving_label: "1食 300g", source_url: "https://www.ffa.ajinomoto.com/products/detail/id/1", tags: ["チャーハン", "主食"] }),
  frozenEstimatedProduct({ brand: "マルハニチロ", name: "あおり炒めの焼豚炒飯", calories: 610, protein_g: 17.0, fat_g: 20.0, carbs_g: 90.0, salt_g: 3.6, serving_label: "1食 300g", source_url: "https://www.maruha-nichiro.co.jp/products/product?j=4902165359037", tags: ["チャーハン", "主食"] }),
  frozenEstimatedProduct({ brand: "キンレイ", name: "お水がいらない ラーメン横綱", calories: 476, protein_g: 19.0, fat_g: 15.8, carbs_g: 64.5, salt_g: 6.6, serving_label: "1食", source_url: "https://www.kinrei.com/product/ramen-yokozuna.php", tags: ["ラーメン", "豚骨醤油", "主食"] }),
  frozenEstimatedProduct({ brand: "キンレイ", name: "お水がいらない 鍋焼うどん", calories: 383, protein_g: 16.0, fat_g: 6.5, carbs_g: 65.0, salt_g: 5.8, serving_label: "1食", source_url: "https://www.kinrei.com/product/nabeyaki-udon.php", tags: ["うどん", "鍋焼き", "主食"] }),
  frozenEstimatedProduct({ brand: "日清食品冷凍", name: "冷凍 日清本麺 こくうま醤油ラーメン", calories: 430, protein_g: 18.0, fat_g: 10.0, carbs_g: 67.0, salt_g: 6.2, serving_label: "1食", source_url: "https://www.nissin.com/jp/products/brands/honmen/", tags: ["ラーメン", "醤油", "主食"] }),
  frozenEstimatedProduct({ brand: "日清食品冷凍", name: "日清もちっと生パスタ クリーミーボロネーゼ", calories: 460, protein_g: 16.0, fat_g: 14.0, carbs_g: 68.0, salt_g: 2.9, serving_label: "1食", source_url: "https://www.nissin.com/jp/products/brands/mochitto/", tags: ["パスタ", "スパゲティ", "ボロネーゼ", "主食"] }),
  frozenEstimatedProduct({ brand: "ニップン", name: "オーマイプレミアム 彩々野菜 ペペロンチーノ", calories: 420, protein_g: 14.0, fat_g: 13.0, carbs_g: 63.0, salt_g: 2.9, serving_label: "1食", source_url: "https://www.nippn.co.jp/products/frozen/", tags: ["パスタ", "スパゲティ", "ペペロンチーノ", "主食"] }),
  frozenEstimatedProduct({ brand: "テーブルマーク", name: "カトキチ さぬきうどん", calories: 263, protein_g: 7.4, fat_g: 1.0, carbs_g: 56.2, salt_g: 0.7, serving_label: "1食 180g", source_url: "https://www.tablemark.co.jp/products/frozen/udon/", tags: ["うどん", "主食"] }),
  frozenEstimatedProduct({ brand: "ニッスイ", name: "大きな大きな焼きおにぎり", calories: 167, protein_g: 3.5, fat_g: 1.0, carbs_g: 36.0, salt_g: 1.2, serving_label: "1個", source_url: "https://www.nissui.co.jp/product/00149.html", tags: ["焼きおにぎり", "おにぎり", "主食"] }),
  frozenEstimatedProduct({ brand: "味の素冷凍食品", name: "ギョーザ", calories: 276, protein_g: 10.0, fat_g: 14.0, carbs_g: 28.0, salt_g: 1.9, serving_label: "6個", source_url: "https://www.ffa.ajinomoto.com/products/detail/id/10", tags: ["餃子", "中華", "おかず"] }),
  frozenEstimatedProduct({ brand: "大阪王将", name: "羽根つき餃子", calories: 287, protein_g: 9.6, fat_g: 15.0, carbs_g: 28.0, salt_g: 1.8, serving_label: "6個", source_url: "https://www.eat-and.jp/foods/products/detail.php?id=1", tags: ["餃子", "中華", "おかず"] }),
  frozenEstimatedProduct({ brand: "ニチレイ", name: "特から", calories: 335, protein_g: 19.0, fat_g: 21.0, carbs_g: 17.0, salt_g: 2.1, serving_label: "100g", source_url: "https://www.nichireifoods.co.jp/product/detail/sho_id4/", tags: ["唐揚げ", "鶏", "おかず"] }),
  frozenEstimatedProduct({ brand: "味の素冷凍食品", name: "やわらか若鶏から揚げ", calories: 285, protein_g: 16.0, fat_g: 17.0, carbs_g: 17.0, salt_g: 1.8, serving_label: "100g", source_url: "https://www.ffa.ajinomoto.com/products/detail/id/8", tags: ["唐揚げ", "鶏", "おかず"] }),
  frozenEstimatedProduct({ brand: "ニチレイ", name: "ミニハンバーグ", calories: 235, protein_g: 12.0, fat_g: 14.0, carbs_g: 15.0, salt_g: 1.8, serving_label: "100g", source_url: "https://www.nichireifoods.co.jp/product/", tags: ["ハンバーグ", "お弁当", "おかず"] }),
  frozenEstimatedProduct({ brand: "味の素冷凍食品", name: "エビ寄せフライ", calories: 210, protein_g: 7.0, fat_g: 12.0, carbs_g: 19.0, salt_g: 1.4, serving_label: "3個", source_url: "https://www.ffa.ajinomoto.com/products/detail/id/16", tags: ["フライ", "えび", "お弁当", "おかず"] }),
  frozenEstimatedProduct({ brand: "テーブルマーク", name: "ごっつ旨い お好み焼", calories: 420, protein_g: 17.0, fat_g: 18.0, carbs_g: 48.0, salt_g: 3.0, serving_label: "1枚", source_url: "https://www.tablemark.co.jp/products/frozen/okonomiyaki/", tags: ["お好み焼き", "粉物", "主食"] }),
  frozenEstimatedProduct({ brand: "テーブルマーク", name: "ごっつ旨い 大粒たこ焼", calories: 318, protein_g: 12.0, fat_g: 10.0, carbs_g: 45.0, salt_g: 2.4, serving_label: "6個", source_url: "https://www.tablemark.co.jp/products/frozen/takoyaki/", tags: ["たこ焼き", "粉物", "軽食"] }),
];

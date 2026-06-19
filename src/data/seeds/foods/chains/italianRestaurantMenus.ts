import { estimatedWithProfileTags, estimateMacrosFromCalories, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const sources = {
  カプリチョーザ: "https://capricciosa.com/menu/",
  マンマパスタ: "https://www.giraud.co.jp/mamma",
  オリーブの丘: "https://www.olivenooka.jp/menu/index.html",
  ポポラマーマ: "https://www.popolamama.com/menu/",
} as const;

type ItalianRestaurantMenu = {
  brand: keyof typeof sources;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
  source_url?: string;
  fetched_at?: string;
  profile?: NutritionEstimateProfile;
};

const inferItalianProfile = (input: Pick<ItalianRestaurantMenu, "name" | "tags" | "brand">): NutritionEstimateProfile => {
  const text = `${input.name} ${input.tags.join(" ")}`;
  if (text.includes("サラダ")) return "salad";
  if (text.includes("ピザ") || text.includes("ピッツァ")) return "pizza";
  if (text.includes("クリーム") || text.includes("カルボナーラ")) return "creamPasta";
  if (text.includes("ペペロンチーノ") || text.includes("オリーブ")) return "oilPasta";
  if (text.includes("リゾット") || text.includes("オムライス")) return "riceBowl";
  if (text.includes("スープ")) return "soup";
  if (text.includes("デザート") || text.includes("タルト") || text.includes("アイス") || text.includes("クレープ")) return "dessert";
  if (text.includes("揚げ") || text.includes("ナゲット") || text.includes("ポテト") || text.includes("トースト") || text.includes("アヒージョ")) return "friedSide";
  if (text.includes("肉") || text.includes("チキン") || text.includes("ソーセージ")) return "meatSetMeal";
  return "pasta";
};

const item = (input: ItalianRestaurantMenu) =>
  estimatedWithProfileTags({
    brand: input.brand,
    name: input.name,
    category: "チェーン店",
    tags: ["イタリアン", input.brand, "公式メニュー確認", "栄養推定", ...input.tags],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: input.source_url ?? sources[input.brand],
    fetched_at: input.fetched_at ?? fetchedAt,
    profile: input.profile ?? inferItalianProfile(input),
  });

type PopolamamaCategory = "pasta" | "pizza" | "side" | "salad";
type PopolamamaRow = {
  category: PopolamamaCategory;
  section?: string;
  name: string;
  calories: number;
  salt_g: number;
};
type PopolamamaMacroProfile = NutritionEstimateProfile;

const popolamamaFetchedAt = "2026-06-18T00:00:00.000Z";
const popolamamaSources: Record<PopolamamaCategory, string> = {
  pasta: "https://www.popolamama.com/info/category/menu_pasta",
  pizza: "https://www.popolamama.com/info/category/menu_pizza",
  side: "https://www.popolamama.com/info/category/menu_side",
  salad: "https://www.popolamama.com/info/category/menu_salad",
};
const popolamamaCategoryTags: Record<PopolamamaCategory, string[]> = {
  pasta: ["パスタ"],
  pizza: ["ピザ"],
  side: ["サイド"],
  salad: ["サラダ"],
};
const estimatePopolamamaMacros = (calories: number, profile: PopolamamaMacroProfile) => {
  return estimateMacrosFromCalories(calories, profile);
};
const inferPopolamamaProfile = (row: PopolamamaRow): PopolamamaMacroProfile => {
  const name = row.name;
  if (row.category === "salad") return "salad";
  if (row.category === "pizza") return name.includes("うすパリ") ? "thinPizza" : "pizza";
  if (name.includes("オムライス")) return "riceBowl";
  if (row.category === "side") {
    if (name.includes("ソーセージ") || name.includes("カマンベール") || name.includes("チキン")) return "meatSetMeal";
    if (name.includes("ポテト") || name.includes("ナゲット") || name.includes("アヒージョ") || name.includes("トースト")) return "friedSide";
    return "friedSide";
  }
  if (row.section?.includes("クリーム") || name.includes("カルボナーラ") || name.includes("クリーム")) return "creamPasta";
  if (row.section?.includes("オリーブオイル") || name.includes("ペペロンチーノ") || name.includes("バター")) return "oilPasta";
  return "pasta";
};
const buildPopolamamaTags = (row: PopolamamaRow) => {
  const tags = [...popolamamaCategoryTags[row.category]];
  if (row.section) tags.push(row.section);
  if (row.name.includes("全粒粉")) tags.push("全粒粉");
  if (row.name.includes("ハーフ")) tags.push("ハーフ");
  tags.push("公式カロリー", "PFC推定");
  return tags;
};

const popolamamaRows: PopolamamaRow[] = [
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ 北海道産カマンベールとモッツァレラのトマトソース", calories: 677, salt_g: 4.2 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ヨード卵・光と吊るしベーコンのカルボナーラ", calories: 805, salt_g: 4.6 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ボンゴレ・ビアンコ", calories: 552, salt_g: 5.6 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ほうれん草と吊るしベーコンのしょうゆ", calories: 550, salt_g: 4.6 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ナスとツナ・きのこのペペロンチーノしょうゆ", calories: 591, salt_g: 5.3 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ヨード卵・光のカルボナーラ豆乳スープ", calories: 832, salt_g: 6.5 },
  { category: "pasta", section: "全粒粉入り生パスタ", name: "全粒粉入り生パスタ ハーフトマトとニンニク", calories: 309, salt_g: 2.1 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ トマトとニンニク", calories: 332, salt_g: 2.4 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ たらこ", calories: 219, salt_g: 2.7 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ ボンゴレ・ビアンコ", calories: 299, salt_g: 3.3 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ 本格ボロネーゼ", calories: 273, salt_g: 2.7 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ ほうれん草と吊るしベーコンのしょうゆ", calories: 300, salt_g: 2.8 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ ヨード卵・光と吊るしベーコンのカルボナーラ", calories: 458, salt_g: 2.9 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ ソーセージのナポリタン", calories: 352, salt_g: 2.8 },
  { category: "pasta", section: "ハーフスパゲティ", name: "ハーフ ナスと吊るしベーコンのアラビアータ", calories: 359, salt_g: 2.7 },
  { category: "pasta", section: "スープタイプ", name: "ヨード卵・光のカルボナーラスープ", calories: 878, salt_g: 7.1 },
  { category: "pasta", section: "スープタイプ", name: "吊るしベーコンとツナのトマトスープ", calories: 690, salt_g: 6.2 },
  { category: "pasta", section: "スープタイプ", name: "海の幸辛口トマトスープ", calories: 713, salt_g: 6.1 },
  { category: "pasta", section: "スープタイプ", name: "ヨード卵・光と吊るしベーコンのレッドカルボナーラスープ", calories: 832, salt_g: 6.2 },
  { category: "pasta", section: "スープタイプ", name: "渡り蟹のトマトスープ", calories: 663, salt_g: 6 },
  { category: "pasta", section: "クリーム味", name: "ヨード卵・光と吊るしベーコンのカルボナーラ", calories: 851, salt_g: 5.2 },
  { category: "pasta", section: "クリーム味", name: "ヨード卵・光と吊るしベーコンのカルボナーラ レッジャーノチーズ掛け", calories: 890, salt_g: 5.4 },
  { category: "pasta", section: "クリーム味", name: "ヨード卵・光と吊るしベーコンのレッドカルボナーラ", calories: 850, salt_g: 5.7 },
  { category: "pasta", section: "クリーム味", name: "北海道産ポテトとソーセージ・ほうれん草のクリーム", calories: 872, salt_g: 5.2 },
  { category: "pasta", section: "クリーム味", name: "渡り蟹のトマトクリーム", calories: 775, salt_g: 5.5 },
  { category: "pasta", section: "ジェノベーゼ味", name: "レッジャーノチーズのジェノベーゼ", calories: 672, salt_g: 5.2 },
  { category: "pasta", section: "ジェノベーゼ味", name: "ほうれん草と吊るしベーコンのジェノベーゼ", calories: 680, salt_g: 5.5 },
  { category: "pasta", section: "ジェノベーゼ味", name: "北海道産ポテト・ソーセージのジェノベーゼ", calories: 748, salt_g: 6.1 },
  { category: "pasta", section: "ジェノベーゼ味", name: "よくばりジェノベーゼ", calories: 726, salt_g: 6.8 },
  { category: "pasta", section: "トマト味", name: "トマトとニンニク", calories: 662, salt_g: 4.5 },
  { category: "pasta", section: "トマト味", name: "ナスと吊るしベーコンのアラビアータ", calories: 718, salt_g: 5 },
  { category: "pasta", section: "トマト味", name: "北海道産カマンベールとモッツァレラのトマトソース", calories: 723, salt_g: 4.8 },
  { category: "pasta", section: "トマト味", name: "国産鶏とナス・モッツァレラのトマトソース", calories: 766, salt_g: 5.1 },
  { category: "pasta", section: "トマト味", name: "ツナと吊るしベーコンのアラビアータ", calories: 717, salt_g: 5.1 },
  { category: "pasta", section: "トマト味", name: "ペスカトーレ", calories: 668, salt_g: 4.2 },
  { category: "pasta", section: "トマト味", name: "よくばりアラビアータ", calories: 679, salt_g: 4.3 },
  { category: "pasta", section: "トマト味", name: "ソーセージのナポリタン", calories: 702, salt_g: 5.2 },
  { category: "pasta", section: "トマト味", name: "よくばりナポリタン", calories: 734, salt_g: 6.6 },
  { category: "pasta", section: "トマト味", name: "本格ボロネーゼ", calories: 545, salt_g: 5.1 },
  { category: "pasta", section: "トマト味", name: "ナスとチーズのボロネーゼ", calories: 742, salt_g: 6.1 },
  { category: "pasta", section: "トマト味", name: "レッジャーノチーズときのこのボロネーゼ", calories: 662, salt_g: 6.2 },
  { category: "pasta", section: "和風味", name: "ペペロンチーノしょうゆ", calories: 559, salt_g: 4.6 },
  { category: "pasta", section: "和風味", name: "たらこ", calories: 436, salt_g: 5.1 },
  { category: "pasta", section: "和風味", name: "イカと熟成明太子 バター仕立て", calories: 543, salt_g: 5.1 },
  { category: "pasta", section: "和風味", name: "ほうれん草と吊るしベーコンのしょうゆ", calories: 596, salt_g: 5.2 },
  { category: "pasta", section: "和風味", name: "国産鶏ときのこのガーリックしょうゆ", calories: 622, salt_g: 5.9 },
  { category: "pasta", section: "和風味", name: "ナスとツナ・きのこのペペロンチーノしょうゆ", calories: 637, salt_g: 5.9 },
  { category: "pasta", section: "和風味", name: "よくばりペペロンチーノしょうゆ", calories: 659, salt_g: 4.6 },
  { category: "pasta", section: "和風味", name: "海の幸 ガーリックバターしょうゆ", calories: 660, salt_g: 6.2 },
  { category: "pasta", section: "オリーブオイル", name: "ペペロンチーノ", calories: 574, salt_g: 4.9 },
  { category: "pasta", section: "オリーブオイル", name: "レッドペペロンチーノ", calories: 598, salt_g: 5.5 },
  { category: "pasta", section: "オリーブオイル", name: "ほうれん草と吊るしベーコンのペペロンチーノ", calories: 621, salt_g: 5.3 },
  { category: "pasta", section: "オリーブオイル", name: "きのこと吊るしベーコン・セミドライトマトのオリーブペペロンチーノ", calories: 613, salt_g: 5.8 },
  { category: "pasta", section: "オリーブオイル", name: "吊るしベーコンとセミドライトマトのバジリコペペロンチーノ", calories: 635, salt_g: 5.5 },
  { category: "pasta", section: "オリーブオイル", name: "海の幸ペペロンチーノ", calories: 671, salt_g: 6.6 },
  { category: "pasta", section: "オリーブオイル", name: "ボンゴレ・ビアンコ", calories: 598, salt_g: 6.2 },
  { category: "pasta", section: "オリーブオイル", name: "よくばりペペロンチーノ", calories: 679, salt_g: 4.5 },
  { category: "pizza", name: "国産小麦生地のマルゲリータピッツァ", calories: 507, salt_g: 3.1 },
  { category: "pizza", name: "国産小麦生地のサラミピッツァ", calories: 645, salt_g: 4.4 },
  { category: "pizza", name: "国産小麦生地のたっぷりチーズピッツァ ハチミツ掛け", calories: 652, salt_g: 3.8 },
  { category: "pizza", name: "うすパリ生地のマルゲリータ", calories: 244, salt_g: 1.3 },
  { category: "pizza", name: "うすパリ生地のサラミピッツァ", calories: 285, salt_g: 1.9 },
  { category: "pizza", name: "うすパリ生地のたっぷりチーズピッツァ ハチミツ掛け", calories: 305, salt_g: 1.7 },
  { category: "side", name: "パンチェッタとカマンベール", calories: 132, salt_g: 1 },
  { category: "side", name: "タコのマリネ", calories: 132, salt_g: 0.8 },
  { category: "side", name: "5種ソーセージのオーブン焼き", calories: 326, salt_g: 2 },
  { category: "side", name: "ポポラさんのオムレツ", calories: 233, salt_g: 2 },
  { category: "side", name: "あさりとムール貝の白ワイン蒸し", calories: 155, salt_g: 2.9 },
  { category: "side", name: "エビと北海道産ポテトのバジルアヒージョ バケット付き", calories: 581, salt_g: 2 },
  { category: "side", name: "きのことセミドライトマトのアヒージョ バケット付き", calories: 524, salt_g: 3.5 },
  { category: "side", name: "ブルスケッタ", calories: 142, salt_g: 0.6 },
  { category: "side", name: "ニョッキ モッツァレラのトマトソース", calories: 332, salt_g: 3 },
  { category: "side", name: "ニョッキ チーズクリーム", calories: 384, salt_g: 3.4 },
  { category: "side", name: "Vポテト", calories: 309, salt_g: 1.4 },
  { category: "side", name: "チキンナゲット", calories: 235, salt_g: 2.2 },
  { category: "side", name: "Vポテト＆ナゲット", calories: 418, salt_g: 2.3 },
  { category: "side", name: "Vポテトとチーズのオーブン焼き", calories: 373, salt_g: 2.1 },
  { category: "side", name: "ガーリックトースト", calories: 228, salt_g: 1.2 },
  { category: "side", name: "本格デミグラスのオムライス", calories: 718, salt_g: 4.8 },
  { category: "salad", name: "ガーデンサラダ", calories: 94, salt_g: 1 },
];

const popolamamaMenuFoods = popolamamaRows.map((row) => {
  const macros = estimatePopolamamaMacros(row.calories, inferPopolamamaProfile(row));
  return item({
    brand: "ポポラマーマ",
    name: row.name,
    calories: row.calories,
    salt_g: row.salt_g,
    tags: buildPopolamamaTags(row),
    source_url: popolamamaSources[row.category],
    fetched_at: popolamamaFetchedAt,
    profile: inferPopolamamaProfile(row),
    ...macros,
  });
});

export const italianRestaurantMenuFoods = [
  item({ brand: "カプリチョーザ", name: "トマトとニンニク", calories: 760, protein_g: 21, fat_g: 25, carbs_g: 111, salt_g: 3.4, tags: ["パスタ", "トマト"] }),
  item({ brand: "カプリチョーザ", name: "トマトとニンニク ダブルサイズ", calories: 1520, protein_g: 42, fat_g: 50, carbs_g: 222, salt_g: 6.8, tags: ["パスタ", "トマト", "大盛り"], serving_label: "2-3人前" }),
  item({ brand: "カプリチョーザ", name: "ペスカトーレ 漁師風トマトソース", calories: 820, protein_g: 34, fat_g: 22, carbs_g: 118, salt_g: 4.0, tags: ["パスタ", "海鮮", "トマト"] }),
  item({ brand: "カプリチョーザ", name: "渡り蟹のトマトクリーム", calories: 860, protein_g: 31, fat_g: 34, carbs_g: 104, salt_g: 3.8, tags: ["パスタ", "蟹", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "カルボナーラ", calories: 890, protein_g: 30, fat_g: 42, carbs_g: 92, salt_g: 3.5, tags: ["パスタ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "揚げ茄子とほうれん草のミートソース田舎風", calories: 880, protein_g: 30, fat_g: 34, carbs_g: 108, salt_g: 3.6, tags: ["パスタ", "ミートソース", "野菜"] }),
  item({ brand: "カプリチョーザ", name: "黒胡椒を効かせたあさりのスープ仕立て", calories: 640, protein_g: 24, fat_g: 16, carbs_g: 98, salt_g: 4.6, tags: ["パスタ", "あさり", "スープ"] }),
  item({ brand: "カプリチョーザ", name: "イカスミ", calories: 780, protein_g: 26, fat_g: 25, carbs_g: 108, salt_g: 3.8, tags: ["パスタ", "イカスミ"] }),
  item({ brand: "カプリチョーザ", name: "魚介とたらこのクリームソース", calories: 920, protein_g: 33, fat_g: 38, carbs_g: 106, salt_g: 4.2, tags: ["パスタ", "魚介", "たらこ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "トマトとニンニクとモッツァレラ", calories: 860, protein_g: 30, fat_g: 34, carbs_g: 110, salt_g: 3.7, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "イタリア産カラスミと魚介のペペロンチーノ", calories: 800, protein_g: 31, fat_g: 30, carbs_g: 102, salt_g: 4.3, tags: ["パスタ", "魚介", "ペペロンチーノ"] }),
  item({ brand: "カプリチョーザ", name: "ペンネアラビアータ", calories: 700, protein_g: 20, fat_g: 20, carbs_g: 106, salt_g: 3.8, tags: ["パスタ", "ペンネ", "辛い"] }),
  item({ brand: "カプリチョーザ", name: "ガーリックトースト", calories: 310, protein_g: 8, fat_g: 14, carbs_g: 38, salt_g: 1.6, tags: ["前菜", "パン"] }),
  item({ brand: "カプリチョーザ", name: "イカのリング揚げ", calories: 540, protein_g: 24, fat_g: 30, carbs_g: 42, salt_g: 2.5, tags: ["前菜", "揚げ物", "イカ"] }),
  item({ brand: "カプリチョーザ", name: "イカとツナのサラダ", calories: 380, protein_g: 25, fat_g: 25, carbs_g: 12, salt_g: 2.2, tags: ["サラダ", "イカ", "ツナ"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザのシーザーサラダ", calories: 430, protein_g: 16, fat_g: 32, carbs_g: 18, salt_g: 2.5, tags: ["サラダ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "たっぷり野菜と挽き肉のミネストローネ", calories: 260, protein_g: 12, fat_g: 10, carbs_g: 30, salt_g: 2.4, tags: ["スープ", "野菜"] }),
  item({ brand: "カプリチョーザ", name: "コーンクリームスープ", calories: 300, protein_g: 8, fat_g: 16, carbs_g: 32, salt_g: 1.8, tags: ["スープ", "クリーム"] }),
  item({ brand: "カプリチョーザ", name: "ラザニアのミートクリームグラタン", calories: 780, protein_g: 32, fat_g: 40, carbs_g: 70, salt_g: 3.6, tags: ["グラタン", "ラザニア"] }),
  item({ brand: "カプリチョーザ", name: "マルゲリータ モッツァレラチーズとバジリコ", calories: 820, protein_g: 32, fat_g: 34, carbs_g: 98, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "カルネミスト ベーコンとソーセージ", calories: 940, protein_g: 38, fat_g: 46, carbs_g: 96, salt_g: 4.8, tags: ["ピザ", "肉"] }),
  item({ brand: "カプリチョーザ", name: "マリナーラ 魚介のトマトソース", calories: 880, protein_g: 36, fat_g: 34, carbs_g: 104, salt_g: 4.5, tags: ["ピザ", "海鮮"] }),
  item({ brand: "カプリチョーザ", name: "クアトロ・フォルマッジ 4種のチーズ", calories: 980, protein_g: 38, fat_g: 52, carbs_g: 88, salt_g: 4.1, tags: ["ピザ", "チーズ"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザ 気まぐれ具沢山トッピング", calories: 960, protein_g: 38, fat_g: 45, carbs_g: 100, salt_g: 4.6, tags: ["ピザ"] }),
  item({ brand: "カプリチョーザ", name: "生ハムとルッコラ", calories: 900, protein_g: 34, fat_g: 40, carbs_g: 96, salt_g: 4.9, tags: ["ピザ", "生ハム"] }),
  item({ brand: "カプリチョーザ", name: "カボチャのタルト", calories: 420, protein_g: 7, fat_g: 22, carbs_g: 50, salt_g: 0.3, tags: ["デザート", "タルト"] }),
  item({ brand: "カプリチョーザ", name: "カプリチョーザアイス", calories: 320, protein_g: 5, fat_g: 18, carbs_g: 36, salt_g: 0.2, tags: ["デザート", "アイス"] }),

  item({ brand: "マンマパスタ", name: "ポルチーニリゾット", calories: 760, protein_g: 24, fat_g: 30, carbs_g: 98, salt_g: 3.1, tags: ["リゾット", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "マルゲリータ", calories: 820, protein_g: 32, fat_g: 34, carbs_g: 98, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "ピッツァ コンテンポラネア", calories: 940, protein_g: 35, fat_g: 42, carbs_g: 108, salt_g: 4.3, tags: ["ピザ"] }),
  item({ brand: "マンマパスタ", name: "クワトロフォルマッジ", calories: 990, protein_g: 38, fat_g: 54, carbs_g: 88, salt_g: 4.2, tags: ["ピザ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "生ハムとルッコラのピッツァ", calories: 920, protein_g: 34, fat_g: 42, carbs_g: 100, salt_g: 4.8, tags: ["ピザ", "生ハム"] }),
  item({ brand: "マンマパスタ", name: "ペスカトーレ", calories: 850, protein_g: 35, fat_g: 24, carbs_g: 120, salt_g: 4.3, tags: ["パスタ", "海鮮", "トマト"] }),
  item({ brand: "マンマパスタ", name: "ボロネーゼ", calories: 820, protein_g: 31, fat_g: 30, carbs_g: 106, salt_g: 3.7, tags: ["パスタ", "ミートソース"] }),
  item({ brand: "マンマパスタ", name: "カルボナーラ", calories: 900, protein_g: 30, fat_g: 44, carbs_g: 92, salt_g: 3.5, tags: ["パスタ", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "ペペロンチーノ", calories: 680, protein_g: 18, fat_g: 26, carbs_g: 94, salt_g: 3.1, tags: ["パスタ", "ペペロンチーノ"] }),
  item({ brand: "マンマパスタ", name: "渡り蟹のトマトクリーム", calories: 880, protein_g: 31, fat_g: 36, carbs_g: 104, salt_g: 3.8, tags: ["パスタ", "蟹", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "明太子クリーム", calories: 820, protein_g: 27, fat_g: 34, carbs_g: 100, salt_g: 4.0, tags: ["パスタ", "明太子", "クリーム"] }),
  item({ brand: "マンマパスタ", name: "シーザーサラダ", calories: 430, protein_g: 16, fat_g: 32, carbs_g: 18, salt_g: 2.4, tags: ["サラダ", "チーズ"] }),
  item({ brand: "マンマパスタ", name: "前菜盛り合わせ", calories: 520, protein_g: 22, fat_g: 34, carbs_g: 30, salt_g: 3.0, tags: ["前菜"], serving_label: "1皿" }),
  item({ brand: "マンマパスタ", name: "ティラミス", calories: 360, protein_g: 6, fat_g: 22, carbs_g: 34, salt_g: 0.2, tags: ["デザート"] }),
  item({ brand: "マンマパスタ", name: "ケーキ", calories: 420, protein_g: 6, fat_g: 24, carbs_g: 46, salt_g: 0.2, tags: ["デザート"], serving_label: "1個" }),

  item({ brand: "オリーブの丘", name: "アーリオオーリオ・ペペロンチーノ", calories: 620, protein_g: 16, fat_g: 24, carbs_g: 86, salt_g: 3.1, tags: ["パスタ", "ペペロンチーノ"] }),
  item({ brand: "オリーブの丘", name: "えびとほうれん草のトマトペペロンチーノ", calories: 680, protein_g: 26, fat_g: 22, carbs_g: 92, salt_g: 3.6, tags: ["パスタ", "海老", "トマト"] }),
  item({ brand: "オリーブの丘", name: "ボンゴレビアンコ", calories: 650, protein_g: 24, fat_g: 18, carbs_g: 94, salt_g: 4.0, tags: ["パスタ", "あさり"] }),
  item({ brand: "オリーブの丘", name: "ごろごろチキンのレモンバター醤油", calories: 760, protein_g: 34, fat_g: 30, carbs_g: 88, salt_g: 3.8, tags: ["パスタ", "チキン"] }),
  item({ brand: "オリーブの丘", name: "モッツァトマト", calories: 720, protein_g: 28, fat_g: 30, carbs_g: 88, salt_g: 3.5, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "アラビアータ", calories: 650, protein_g: 18, fat_g: 20, carbs_g: 96, salt_g: 3.7, tags: ["パスタ", "辛い"] }),
  item({ brand: "オリーブの丘", name: "菜園風のトマトソース", calories: 670, protein_g: 19, fat_g: 20, carbs_g: 102, salt_g: 3.4, tags: ["パスタ", "野菜", "トマト"] }),
  item({ brand: "オリーブの丘", name: "ダブルモッツァレラのトマトソース", calories: 820, protein_g: 34, fat_g: 38, carbs_g: 92, salt_g: 3.9, tags: ["パスタ", "トマト", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "しらすと葱のジンジャーカルボ", calories: 760, protein_g: 30, fat_g: 34, carbs_g: 84, salt_g: 4.1, tags: ["パスタ", "カルボナーラ"] }),
  item({ brand: "オリーブの丘", name: "えびのビスククリームソース", calories: 780, protein_g: 28, fat_g: 34, carbs_g: 92, salt_g: 3.9, tags: ["パスタ", "海老", "クリーム"] }),
  item({ brand: "オリーブの丘", name: "明太子クリーム", calories: 760, protein_g: 26, fat_g: 30, carbs_g: 96, salt_g: 4.0, tags: ["パスタ", "明太子", "クリーム"] }),
  item({ brand: "オリーブの丘", name: "イカ墨（ネーロ）", calories: 760, protein_g: 24, fat_g: 24, carbs_g: 108, salt_g: 3.8, tags: ["パスタ", "イカスミ"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・マルゲリータ", calories: 690, protein_g: 27, fat_g: 28, carbs_g: 84, salt_g: 3.5, tags: ["ピザ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・ガーリックベーコン", calories: 780, protein_g: 28, fat_g: 38, carbs_g: 82, salt_g: 4.1, tags: ["ピザ", "ベーコン"] }),
  item({ brand: "オリーブの丘", name: "ピッツァ・クワトロフォルマッジ", calories: 840, protein_g: 32, fat_g: 44, carbs_g: 78, salt_g: 3.8, tags: ["ピザ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "リゾットフォルマッジ", calories: 680, protein_g: 22, fat_g: 28, carbs_g: 86, salt_g: 3.0, tags: ["リゾット", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "えびとブロッコリーのビスククリームリゾット", calories: 740, protein_g: 27, fat_g: 30, carbs_g: 90, salt_g: 3.5, tags: ["リゾット", "海老"] }),
  item({ brand: "オリーブの丘", name: "ボローニャドリア", calories: 700, protein_g: 27, fat_g: 30, carbs_g: 84, salt_g: 3.4, tags: ["ドリア"] }),
  item({ brand: "オリーブの丘", name: "デミグラスハンバーグ", calories: 520, protein_g: 28, fat_g: 36, carbs_g: 20, salt_g: 2.9, tags: ["肉料理", "ハンバーグ"] }),
  item({ brand: "オリーブの丘", name: "チーズトマトハンバーグ", calories: 610, protein_g: 32, fat_g: 42, carbs_g: 22, salt_g: 3.2, tags: ["肉料理", "ハンバーグ", "チーズ"] }),
  item({ brand: "オリーブの丘", name: "チキンのオーブン焼き", calories: 540, protein_g: 42, fat_g: 34, carbs_g: 12, salt_g: 2.4, tags: ["肉料理", "チキン"] }),
  item({ brand: "オリーブの丘", name: "やわらか牛肉のビーフシチュー", calories: 690, protein_g: 38, fat_g: 42, carbs_g: 34, salt_g: 3.2, tags: ["肉料理", "牛肉"] }),
  item({ brand: "オリーブの丘", name: "ライス", calories: 330, protein_g: 5, fat_g: 1, carbs_g: 74, salt_g: 0.0, tags: ["ライス"], serving_label: "普通" }),

  ...popolamamaMenuFoods,
];

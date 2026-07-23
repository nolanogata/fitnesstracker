import { estimatedWithProfileTags } from "./estimationProfiles";
import { official } from "./helpers";

const fetchedAt = "2026-07-23T00:00:00.000Z";

type PastaProductInput = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label: string;
  source_url: string;
  tags?: string[];
};

const brandAliases: Record<string, string[]> = {
  "キユーピー": ["キューピー"],
  "S&B": ["エスビー", "エスアンドビー"],
  "マ・マー": ["ママー", "マ･マー"],
  "ディ・チェコ": ["ディチェコ", "De Cecco"],
};

const productTags = (input: PastaProductInput, baseTags: string[]) => [
  ...baseTags,
  ...(brandAliases[input.brand] ?? []),
  ...(input.tags ?? []),
];

const pastaSauce = (input: PastaProductInput) =>
  official({
    ...input,
    category: "パスタソース",
    tags: productTags(input, ["市販品", "パスタソース", "ソース", "1人前"]),
    default_meal_type: "lunch",
    fetched_at: fetchedAt,
  });

const sbPastaSauce = (input: PastaProductInput) =>
  estimatedWithProfileTags({
    ...input,
    category: "パスタソース",
    tags: productTags(input, ["市販品", "パスタソース", "ソース", "1人前", "公式カロリー", "メーカー糖質表示"]),
    default_meal_type: "lunch",
    fetched_at: fetchedAt,
    profile: "oilPasta",
  });

const dryPasta = (input: PastaProductInput) =>
  official({
    ...input,
    category: "麺類",
    tags: productTags(input, ["市販品", "パスタ", "乾麺", "主食", "乾麺100g"]),
    default_meal_type: "lunch",
    fetched_at: fetchedAt,
  });

const kewpie = (jan: string) => `https://www.kewpie.co.jp/products/product/aeru/aeru/${jan}/`;
const welna = (jan: string) => `https://www.nisshin-seifun-welna.com/index/products/${jan}.html`;
const sb = (id: string) => `https://www.sbfoods.co.jp/products/detail/${id}.html`;

const kewpieSauces = [
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース ミートソース フォン・ド・ヴォー仕立て", calories: 149, protein_g: 4.5, fat_g: 7.9, carbs_g: 14.9, salt_g: 2.7, serving_label: "1食（80g）", source_url: kewpie("4901577055218"), tags: ["ミートソース", "トマト系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース カルボナーラ 濃厚チーズ仕立て", calories: 153, protein_g: 2.2, fat_g: 12.4, carbs_g: 8.1, salt_g: 1.8, serving_label: "1食（70g）", source_url: kewpie("4901577055232"), tags: ["カルボナーラ", "クリーム系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース トマト＆バジル 完熟トマト仕立て", calories: 98, protein_g: 1.9, fat_g: 5.1, carbs_g: 11.1, salt_g: 2.1, serving_label: "1食（65g）", source_url: kewpie("4901577252402"), tags: ["トマト", "バジル", "トマト系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース たらこ", calories: 79, protein_g: 3.2, fat_g: 6.6, carbs_g: 1.8, salt_g: 2.1, serving_label: "1食（ソース23g＋トッピング）", source_url: kewpie("4901577020650"), tags: ["たらこ", "和風"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース 明太子", calories: 78, protein_g: 3.1, fat_g: 6.7, carbs_g: 1.8, salt_g: 2.3, serving_label: "1食（ソース23g＋トッピング）", source_url: kewpie("4901577436352"), tags: ["明太子", "和風"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース バジル", calories: 113, protein_g: 0.9, fat_g: 10.9, carbs_g: 2.3, salt_g: 2.0, serving_label: "1食（23g）", source_url: kewpie("4901577039478"), tags: ["バジル", "ジェノベーゼ", "オイル系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース ペペロンチーノ", calories: 130, protein_g: 1.0, fat_g: 12.1, carbs_g: 3.2, salt_g: 1.9, serving_label: "1食（ソース25g＋トッピング）", source_url: kewpie("4901577024696"), tags: ["ペペロンチーノ", "オイル系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース ガーリックマヨ", calories: 194, protein_g: 0.8, fat_g: 18.9, carbs_g: 5.3, salt_g: 2.0, serving_label: "1食（ソース35g＋トッピング）", source_url: kewpie("4901577033544"), tags: ["ガーリック", "マヨネーズ", "オイル系"] }),
  pastaSauce({ brand: "キユーピー", name: "あえるパスタソース だし香る納豆", calories: 130, protein_g: 3.0, fat_g: 11.3, carbs_g: 3.1, salt_g: 2.2, serving_label: "1食（30.3g）", source_url: kewpie("4901577058110"), tags: ["納豆", "和風"] }),
];

const sbSauces = [
  sbPastaSauce({ brand: "S&B", name: "まぜるだけのスパゲッティソース 生風味たらこ", calories: 107, protein_g: 3.6, fat_g: 9.7, carbs_g: 1.3, salt_g: 2.2, serving_label: "1食（26.7g）", source_url: sb("18648"), tags: ["たらこ", "和風"] }),
  sbPastaSauce({ brand: "S&B", name: "まぜるだけのスパゲッティソース 生風味からし明太子", calories: 103, protein_g: 3.6, fat_g: 9.1, carbs_g: 1.7, salt_g: 2.1, serving_label: "1食（26.7g）", source_url: sb("18649"), tags: ["明太子", "和風"] }),
  sbPastaSauce({ brand: "S&B", name: "まぜるだけのスパゲッティソース バジル", calories: 102, protein_g: 1.3, fat_g: 8.7, carbs_g: 4.5, salt_g: 1.8, serving_label: "1食（24.3g）", source_url: sb("18655"), tags: ["バジル", "ジェノベーゼ", "オイル系"] }),
  sbPastaSauce({ brand: "S&B", name: "まぜるだけのスパゲッティソース ツナしょうゆ風味", calories: 158, protein_g: 3.5, fat_g: 12.2, carbs_g: 8.6, salt_g: 2.9, serving_label: "1食（40.7g）", source_url: sb("18652"), tags: ["ツナ", "しょうゆ", "和風"] }),
];

const welnaSauces = [
  pastaSauce({ brand: "マ・マー", name: "トマトの果肉たっぷりのミートソース 1人前", calories: 87, protein_g: 3.2, fat_g: 2.1, carbs_g: 13.9, salt_g: 2.6, serving_label: "1食（130g）", source_url: welna("4902110263138"), tags: ["ミートソース", "トマト系"] }),
  pastaSauce({ brand: "マ・マー", name: "トマトの果肉たっぷりのナポリタン 1人前", calories: 92, protein_g: 1.8, fat_g: 1.5, carbs_g: 17.9, salt_g: 2.1, serving_label: "1食（130g）", source_url: welna("4902110263152"), tags: ["ナポリタン", "トマト系"] }),
  pastaSauce({ brand: "青の洞窟", name: "ボロネーゼ", calories: 260, protein_g: 11.6, fat_g: 18.8, carbs_g: 11.2, salt_g: 2.7, serving_label: "1食（140g）", source_url: welna("4902110266535"), tags: ["ボロネーゼ", "ミートソース", "トマト系"] }),
  pastaSauce({ brand: "青の洞窟", name: "カルボナーラ", calories: 163, protein_g: 4.8, fat_g: 11.5, carbs_g: 10.0, salt_g: 2.3, serving_label: "1食（140g）", source_url: welna("4902110266573"), tags: ["カルボナーラ", "クリーム系"] }),
  pastaSauce({ brand: "青の洞窟", name: "アラビアータ", calories: 231, protein_g: 2.6, fat_g: 18.2, carbs_g: 14.2, salt_g: 1.9, serving_label: "1食（140g）", source_url: welna("4902110266559"), tags: ["アラビアータ", "トマト系", "辛口"] }),
];

const mamaPastaSource = "https://www.nisshin-seifun-welna.com/index/products/pasta/";
const mamaDryPasta = ["1.4mm", "1.6mm", "1.8mm"].map((thickness) =>
  dryPasta({ brand: "マ・マー", name: `スパゲティ ${thickness}`, calories: 350, protein_g: 12.9, fat_g: 1.8, carbs_g: 73.1, salt_g: 0, serving_label: "乾麺100g", source_url: mamaPastaSource, tags: [`太さ${thickness}`] }),
);

const barillaSource = "https://www.barilla.com/ja-jp/products/pasta";
const barillaNutrition = { calories: 359, protein_g: 12.8, fat_g: 2.0, carbs_g: 70.9, salt_g: 0.013 };
const barillaPasta = [
  ["スパゲッティ No.3（1.4mm）", "ロングパスタ", "細麺"],
  ["スパゲッティ No.4（1.6mm）", "ロングパスタ", "標準麺"],
  ["スパゲッティ No.5（1.8mm）", "ロングパスタ", "太麺"],
  ["ペンネ リガーテ", "ショートパスタ", "ペンネ"],
  ["フジリ", "ショートパスタ", "フジリ"],
].map(([name, shape, detail]) => dryPasta({ brand: "バリラ", name, ...barillaNutrition, serving_label: "乾麺100g", source_url: barillaSource, tags: [shape, detail] }));

const dececcoSource = "https://www.nisshin-seifun-welna.com/index/products/pasta/?rt_bn_product_list_skip=20";
const dececcoNutrition = { calories: 351, protein_g: 14, fat_g: 1.5, carbs_g: 69, salt_g: 0 };
const dececcoPasta = [
  ["No.7 リングイーネ", "ロングパスタ", "リングイーネ"],
  ["No.9 カッペリーニ", "ロングパスタ", "極細麺"],
  ["No.10 フェデリーニ", "ロングパスタ", "細麺"],
  ["No.11 スパゲッティーニ", "ロングパスタ", "標準麺"],
  ["No.12 スパゲッティ", "ロングパスタ", "太麺"],
  ["No.41 ペンネ リガーテ", "ショートパスタ", "ペンネ"],
].map(([name, shape, detail]) => dryPasta({ brand: "ディ・チェコ", name, ...dececcoNutrition, serving_label: "乾麺100g", source_url: dececcoSource, tags: [shape, detail] }));

export const pastaProductFoods = [
  ...kewpieSauces,
  ...sbSauces,
  ...welnaSauces,
  ...mamaDryPasta,
  ...barillaPasta,
  ...dececcoPasta,
];

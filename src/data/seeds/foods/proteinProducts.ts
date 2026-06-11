import { estimated, official } from "./helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

const asahiSource = "https://www.asahi-gf.co.jp/special/1pon-manzoku/";
const savasMilkSource = "https://www.meiji.co.jp/sports/savas/products/muscle_sports/savas_milk.html?flavor=cocoa_30";
const savasBarSource = "https://www.meiji.co.jp/sports/savas/products/muscle_sports/bar.html";
const savasSoyBarSource = "https://www.meiji.co.jp/sports/savas/products/shape_wellness/soy_bar.html";
const morinagaJellySource = "https://www.morinaga.co.jp/in/jelly/products/protein/";
const morinagaBarSource = "https://www.morinaga.co.jp/in/products/?in-bar";

type ProductInput = {
  brand: string;
  name: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label: string;
  source_url: string;
};

const officialProduct = (input: ProductInput) =>
  official({
    ...input,
    tags: ["プロテイン", "タンパク質", ...input.tags],
    default_meal_type: "snack",
    fetched_at: fetchedAt,
  });

const estimatedProduct = (input: ProductInput) =>
  estimated({
    ...input,
    tags: ["プロテイン", "タンパク質", "公式商品確認", "栄養推定", ...input.tags],
    default_meal_type: "snack",
    fetched_at: fetchedAt,
  });

export const proteinProductFoods = [
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインチョコ", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 181, protein_g: 16, fat_g: 8.3, carbs_g: 11.45, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインブラック", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 174, protein_g: 16, fat_g: 8.7, carbs_g: 12.4, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインホワイト", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 188, protein_g: 16, fat_g: 8.9, carbs_g: 11.9, salt_g: 0.48, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインストロベリー", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 186, protein_g: 16, fat_g: 9, carbs_g: 11.1, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインバイタリティ ベイクドカカオ", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 243, protein_g: 10, fat_g: 17, carbs_g: 13.15, salt_g: 0.28, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインストロング ココア", category: "サプリ", tags: ["プロテインバー", "一本満足"], calories: 337, protein_g: 30, fat_g: 17, carbs_g: 16.9, salt_g: 1.1, serving_label: "1本", source_url: asahiSource }),

  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 ココア味", category: "サプリ", tags: ["プロテインドリンク", "ザバス"], calories: 191, protein_g: 30, fat_g: 0, carbs_g: 18.1, salt_g: 0.38, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 カフェラテ味", category: "サプリ", tags: ["プロテインドリンク", "ザバス"], calories: 193, protein_g: 30, fat_g: 0, carbs_g: 18.5, salt_g: 0.48, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 ヨーグルト風味", category: "サプリ", tags: ["プロテインドリンク", "ザバス"], calories: 96, protein_g: 15, fat_g: 0, carbs_g: 10, salt_g: 0.22, serving_label: "1本", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス プロテインバー チョコレート味", category: "サプリ", tags: ["プロテインバー", "ザバス"], calories: 226, protein_g: 17.2, fat_g: 12.9, carbs_g: 10.4, salt_g: 0.37, serving_label: "44g", source_url: savasBarSource }),
  officialProduct({ brand: "明治", name: "ザバス プロテインバー 60g", category: "サプリ", tags: ["プロテインバー", "ザバス"], calories: 309, protein_g: 23.7, fat_g: 17.6, carbs_g: 13.9, salt_g: 0.52, serving_label: "60g", source_url: savasBarSource }),
  officialProduct({ brand: "明治", name: "ザバス ソイプロテインバー", category: "サプリ", tags: ["プロテインバー", "ザバス", "ソイ"], calories: 227, protein_g: 16.5, fat_g: 13.7, carbs_g: 10.7, salt_g: 0.49, serving_label: "45g", source_url: savasSoyBarSource }),

  estimatedProduct({ brand: "森永製菓", name: "inゼリー プロテイン5g", category: "サプリ", tags: ["プロテインゼリー", "inゼリー"], calories: 35, protein_g: 5, fat_g: 0, carbs_g: 4.5, salt_g: 0.1, serving_label: "180g", source_url: morinagaJellySource }),
  estimatedProduct({ brand: "森永製菓", name: "inゼリー プロテイン15g", category: "サプリ", tags: ["プロテインゼリー", "inゼリー"], calories: 94, protein_g: 15.6, fat_g: 0.8, carbs_g: 6.1, salt_g: 0.1, serving_label: "180g", source_url: "https://www.morinaga.co.jp/in/jelly/products/protein15000/" }),
  estimatedProduct({ brand: "森永製菓", name: "inバー プロテイン ベイクドチョコ", category: "サプリ", tags: ["プロテインバー", "inバー"], calories: 210, protein_g: 16, fat_g: 11, carbs_g: 13, serving_label: "1本", source_url: morinagaBarSource }),
  estimatedProduct({ brand: "森永製菓", name: "inバー プロテイン ザクザクチョコ", category: "サプリ", tags: ["プロテインバー", "inバー"], calories: 220, protein_g: 16, fat_g: 12, carbs_g: 15, serving_label: "1本", source_url: morinagaBarSource }),
  estimatedProduct({ brand: "森永製菓", name: "inバー プロテイン ウェファーバニラ", category: "サプリ", tags: ["プロテインバー", "inバー"], calories: 200, protein_g: 10, fat_g: 11, carbs_g: 16, serving_label: "1本", source_url: morinagaBarSource }),
];

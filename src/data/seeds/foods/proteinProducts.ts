import { estimated, official } from "./helpers";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const asahiSource = "https://www.asahi-gf.co.jp/special/1pon-manzoku/";
const savasMilkSource = "https://www.meiji.co.jp/sports/savas/products/muscle_sports/savas_milk.html?flavor=cocoa_30";
const savasBarSource = "https://www.meiji.co.jp/sports/savas/products/muscle_sports/bar.html";
const savasSoyBarSource = "https://www.meiji.co.jp/sports/savas/products/shape_wellness/soy_bar.html";
const oikosProteinShakeSource = "https://www.bonappetit.com/story/best-protein-shakes";
const morinagaJellySource = "https://www.morinaga.co.jp/in/jelly/products/protein/";
const morinagaBarSource = "https://www.morinaga.co.jp/in/bar/lp3/";

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

const secondaryProduct = (input: ProductInput) =>
  estimated({
    ...input,
    tags: ["プロテイン", "タンパク質", "二次情報", "栄養推定", ...input.tags],
    default_meal_type: "snack",
    fetched_at: fetchedAt,
  });

export const proteinProductFoods = [
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインチョコ", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 181, protein_g: 16, fat_g: 8.3, carbs_g: 11.45, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインブラック", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 174, protein_g: 16, fat_g: 8.7, carbs_g: 12.4, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインホワイト", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 188, protein_g: 16, fat_g: 8.9, carbs_g: 11.9, salt_g: 0.48, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインストロベリー", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 186, protein_g: 16, fat_g: 9, carbs_g: 11.1, salt_g: 0.49, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインバイタリティ ベイクドカカオ", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 243, protein_g: 10, fat_g: 17, carbs_g: 13.15, salt_g: 0.28, serving_label: "1本", source_url: asahiSource }),
  officialProduct({ brand: "アサヒグループ食品", name: "１本満足バー プロテインストロング ココア", category: "プロテイン", tags: ["プロテインバー", "一本満足"], calories: 337, protein_g: 30, fat_g: 17, carbs_g: 16.9, salt_g: 1.1, serving_label: "1本", source_url: asahiSource }),

  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 ココア味", category: "プロテイン", tags: ["プロテインドリンク", "ザバス"], calories: 191, protein_g: 30, fat_g: 0, carbs_g: 18.1, salt_g: 0.38, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 カフェラテ味", category: "プロテイン", tags: ["プロテインドリンク", "ザバス"], calories: 193, protein_g: 30, fat_g: 0, carbs_g: 18.5, salt_g: 0.48, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 ヨーグルト風味", category: "プロテイン", tags: ["プロテインドリンク", "ザバス"], calories: 96, protein_g: 15, fat_g: 0, carbs_g: 10, salt_g: 0.22, serving_label: "1本", source_url: savasMilkSource }),
  estimatedProduct({ brand: "明治", name: "ザバス MILK PROTEIN 脂肪0 ライチ風味", category: "プロテイン", tags: ["プロテインドリンク", "ザバス", "公式範囲値"], calories: 79, protein_g: 11.5, fat_g: 0, carbs_g: 9.1, salt_g: 0.5, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス WHEY PROTEIN マスカット風味", category: "プロテイン", tags: ["プロテインドリンク", "ザバス", "ホエイ"], calories: 94, protein_g: 20, fat_g: 0, carbs_g: 3.9, salt_g: 0.38, serving_label: "430ml", source_url: savasMilkSource }),
  officialProduct({ brand: "明治", name: "ザバス プロテインバー チョコレート味", category: "プロテイン", tags: ["プロテインバー", "ザバス"], calories: 226, protein_g: 17.2, fat_g: 12.9, carbs_g: 10.4, salt_g: 0.37, serving_label: "44g", source_url: savasBarSource }),
  officialProduct({ brand: "明治", name: "ザバス プロテインバー 60g", category: "プロテイン", tags: ["プロテインバー", "ザバス"], calories: 309, protein_g: 23.7, fat_g: 17.6, carbs_g: 13.9, salt_g: 0.52, serving_label: "60g", source_url: savasBarSource }),
  officialProduct({ brand: "明治", name: "ザバス ソイプロテインバー", category: "プロテイン", tags: ["プロテインバー", "ザバス", "ソイ"], calories: 227, protein_g: 16.5, fat_g: 13.7, carbs_g: 10.7, salt_g: 0.49, serving_label: "45g", source_url: savasSoyBarSource }),
  officialProduct({ brand: "明治", name: "ザバス プロテインバー 1/2日分の鉄分", category: "プロテイン", tags: ["プロテインバー", "ザバス", "鉄分"], calories: 196, protein_g: 14.7, fat_g: 11.4, carbs_g: 8.7, salt_g: 0.32, serving_label: "38g", source_url: savasBarSource }),

  secondaryProduct({ brand: "Oikos", name: "オイコス プロテインシェイク バニラ", category: "プロテイン", tags: ["プロテインドリンク", "オイコス", "海外品", "推定塩分"], calories: 170, protein_g: 30, fat_g: 3.5, carbs_g: 8, salt_g: 0.7, serving_label: "1本", source_url: oikosProteinShakeSource }),
  secondaryProduct({ brand: "Oikos", name: "オイコス プロテインシェイク チョコレート", category: "プロテイン", tags: ["プロテインドリンク", "オイコス", "海外品", "推定栄養"], calories: 170, protein_g: 30, fat_g: 3.5, carbs_g: 8, salt_g: 0.7, serving_label: "1本", source_url: oikosProteinShakeSource }),

  estimatedProduct({ brand: "森永製菓", name: "inゼリー プロテイン5g", category: "プロテイン", tags: ["プロテインゼリー", "inゼリー"], calories: 35, protein_g: 5, fat_g: 0, carbs_g: 4.5, salt_g: 0.1, serving_label: "180g", source_url: morinagaJellySource }),
  estimatedProduct({ brand: "森永製菓", name: "inゼリー プロテイン15g", category: "プロテイン", tags: ["プロテインゼリー", "inゼリー"], calories: 94, protein_g: 15.6, fat_g: 0.8, carbs_g: 6.1, salt_g: 0.1, serving_label: "180g", source_url: "https://www.morinaga.co.jp/in/jelly/products/protein15000/" }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ベイクドチョコ", category: "プロテイン", tags: ["プロテインバー", "inバー", "食塩上限値"], calories: 199, protein_g: 15.8, fat_g: 9.8, carbs_g: 12.5, salt_g: 0.72, serving_label: "42g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ザクザクチョコ", category: "プロテイン", tags: ["プロテインバー", "inバー", "食塩上限値"], calories: 209, protein_g: 17.9, fat_g: 9.8, carbs_g: 12.9, salt_g: 0.92, serving_label: "43g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ザクザクビター", category: "プロテイン", tags: ["プロテインバー", "inバー", "食塩上限値"], calories: 190, protein_g: 17.2, fat_g: 10.3, carbs_g: 11.1, salt_g: 1.11, serving_label: "41g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ベイクドビター", category: "プロテイン", tags: ["プロテインバー", "inバー", "ロカボ", "食塩上限値"], calories: 208, protein_g: 16.1, fat_g: 13, carbs_g: 10, salt_g: 0.64, serving_label: "42g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ウェファーバニラ", category: "プロテイン", tags: ["プロテインバー", "inバー", "食塩上限値"], calories: 200, protein_g: 10.7, fat_g: 12.4, carbs_g: 12.8, salt_g: 0.7, serving_label: "37g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ウェファーヨーグルト", category: "プロテイン", tags: ["プロテインバー", "inバー", "ロカボ", "食塩上限値"], calories: 202, protein_g: 11, fat_g: 12.4, carbs_g: 13.4, salt_g: 0.8, serving_label: "37g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ウェファーナッツ", category: "プロテイン", tags: ["プロテインバー", "inバー", "ナッツ", "食塩上限値"], calories: 193, protein_g: 10.7, fat_g: 10.4, carbs_g: 14.5, salt_g: 0.53, serving_label: "37g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン ウェファーカフェオレ", category: "プロテイン", tags: ["プロテインバー", "inバー", "カフェオレ", "食塩上限値"], calories: 200, protein_g: 10.5, fat_g: 12.3, carbs_g: 13.1, salt_g: 0.56, serving_label: "37g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー プロテイン グラノーラ", category: "プロテイン", tags: ["プロテインバー", "inバー", "グラノーラ", "低脂質", "食塩上限値"], calories: 114, protein_g: 10.9, fat_g: 0.6, carbs_g: 17.1, salt_g: 0.51, serving_label: "33g", source_url: morinagaBarSource }),
  officialProduct({ brand: "森永製菓", name: "inバー ジュニアプロテイン ココア", category: "プロテイン", tags: ["プロテインバー", "inバー", "ジュニア", "食塩上限値"], calories: 152, protein_g: 8.6, fat_g: 8.5, carbs_g: 10.3, salt_g: 0.6, serving_label: "30g", source_url: morinagaBarSource }),
];

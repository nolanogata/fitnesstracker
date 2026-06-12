import { official } from "../helpers";

const sourceUrl = "https://www.burgerking.co.jp/images/org/pdf/2026/01/08/af889feb-3500-412c-abee-a7ce17e65986.pdf";
const fetchedAt = "2026-06-12T00:00:00.000Z";

const tags = ["ファストフード", "バーガーキング", "Burger King", "公式栄養"];

type BurgerKingProduct = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  serving_label: string;
  weight_g?: number;
  default_meal_type: "lunch" | "snack";
  tag: string;
};

const products = [
  {"name":"ワッパーチーズ","calories":750,"protein_g":32.7,"fat_g":46.3,"carbs_g":51.4,"salt_g":3.7,"serving_label":"1品（305g）","weight_g":305,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ワッパーチーズジュニア","calories":372,"protein_g":16.1,"fat_g":21.8,"carbs_g":28.2,"salt_g":1.7,"serving_label":"1品（150g）","weight_g":150,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルワッパーチーズ","calories":985,"protein_g":51.2,"fat_g":64.1,"carbs_g":51.5,"salt_g":3.9,"serving_label":"1品（385g）","weight_g":385,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルワッパーチーズジュニア","calories":467,"protein_g":24.6,"fat_g":28.6,"carbs_g":28.2,"salt_g":1.8,"serving_label":"1品（182g）","weight_g":182,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"トリプルワッパーチーズ","calories":1219,"protein_g":69.7,"fat_g":81.9,"carbs_g":51.6,"salt_g":4.1,"serving_label":"1品（465g）","weight_g":465,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"アボカドワッパー","calories":732,"protein_g":28.7,"fat_g":45.1,"carbs_g":54.5,"salt_g":3,"serving_label":"1品（323g）","weight_g":323,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"アボカドワッパージュニア","calories":370,"protein_g":14.2,"fat_g":21.9,"carbs_g":30.2,"salt_g":1.4,"serving_label":"1品（164g）","weight_g":164,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"クアトロチーズワッパー","calories":823,"protein_g":37.5,"fat_g":53.7,"carbs_g":48,"salt_g":3.8,"serving_label":"1品（308g）","weight_g":308,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"クアトロチーズワッパージュニア","calories":409,"protein_g":18.5,"fat_g":25.5,"carbs_g":26.5,"salt_g":1.7,"serving_label":"1品（151g）","weight_g":151,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルクアトロチーズワッパー","calories":1057,"protein_g":56,"fat_g":71.4,"carbs_g":48.1,"salt_g":3.9,"serving_label":"1品（388g）","weight_g":388,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルクアトロチーズワッパージュニア","calories":503,"protein_g":27,"fat_g":32.2,"carbs_g":26.5,"salt_g":1.8,"serving_label":"1品（183g）","weight_g":183,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"トリプルクアトロチーズワッパー","calories":1292,"protein_g":74.6,"fat_g":89.2,"carbs_g":48.2,"salt_g":4.1,"serving_label":"1品（468g）","weight_g":468,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ワッパー","calories":672,"protein_g":28.2,"fat_g":39.9,"carbs_g":50.8,"salt_g":3,"serving_label":"1品（283g）","weight_g":283,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ワッパージュニア","calories":333,"protein_g":13.8,"fat_g":18.6,"carbs_g":27.9,"salt_g":1.3,"serving_label":"1品（139g）","weight_g":139,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スモーキーBBQワッパー","calories":674,"protein_g":28.1,"fat_g":39.9,"carbs_g":51.3,"salt_g":2.9,"serving_label":"1品（283g）","weight_g":283,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スモーキーBBQワッパージュニア","calories":334,"protein_g":13.8,"fat_g":18.6,"carbs_g":28.1,"salt_g":1.3,"serving_label":"1品（139g）","weight_g":139,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"テリヤキワッパー","calories":684,"protein_g":28.2,"fat_g":40,"carbs_g":53.4,"salt_g":3,"serving_label":"1品（283g）","weight_g":283,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"テリヤキワッパージュニア","calories":339,"protein_g":13.9,"fat_g":18.7,"carbs_g":29.2,"salt_g":1.4,"serving_label":"1品（139g）","weight_g":139,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スパイシーワッパー","calories":686,"protein_g":28.2,"fat_g":40,"carbs_g":54.1,"salt_g":3.5,"serving_label":"1品（290g）","weight_g":290,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スパイシーワッパージュニア","calories":341,"protein_g":13.9,"fat_g":18.7,"carbs_g":29.7,"salt_g":1.6,"serving_label":"1品（143g）","weight_g":143,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ベーコンチーズワッパー","calories":818,"protein_g":37.1,"fat_g":51.8,"carbs_g":51.7,"salt_g":4.3,"serving_label":"1品（320g）","weight_g":320,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ベーコンチーズワッパージュニア","calories":406,"protein_g":18.3,"fat_g":24.6,"carbs_g":28.3,"salt_g":2,"serving_label":"1品（157g）","weight_g":157,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"マッシュルームワッパー","calories":799,"protein_g":29.3,"fat_g":53.3,"carbs_g":51,"salt_g":3.2,"serving_label":"1品（309g）","weight_g":309,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"マッシュルームワッパージュニア","calories":405,"protein_g":15,"fat_g":26.1,"carbs_g":28,"salt_g":1.4,"serving_label":"1品（155g）","weight_g":155,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルマッシュルームワッパー","calories":1033,"protein_g":47.9,"fat_g":71.1,"carbs_g":51.1,"salt_g":3.3,"serving_label":"1品（389g）","weight_g":389,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ウィンタースペシャル マッシュルームワッパー","calories":790,"protein_g":29.2,"fat_g":52.3,"carbs_g":51.1,"salt_g":3.3,"serving_label":"1品（309g）","weight_g":309,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ウィンタースペシャル マッシュルームワッパージュニア","calories":401,"protein_g":14.9,"fat_g":25.5,"carbs_g":28.1,"salt_g":1.5,"serving_label":"1品（155g）","weight_g":155,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ウィンタースペシャル ダブルマッシュルームワッパー","calories":1024,"protein_g":47.7,"fat_g":70.1,"carbs_g":51.2,"salt_g":3.5,"serving_label":"1品（389g）","weight_g":389,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ベーコンダブルチーズバーガー","calories":494,"protein_g":31.1,"fat_g":28.7,"carbs_g":27.9,"salt_g":2.6,"serving_label":"1品（168g）","weight_g":168,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルチーズバーガー","calories":425,"protein_g":26.7,"fat_g":23.2,"carbs_g":27.6,"salt_g":2.1,"serving_label":"1品（153g）","weight_g":153,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ハンバーガー","calories":252,"protein_g":13.7,"fat_g":10.1,"carbs_g":27,"salt_g":1.2,"serving_label":"1品（99g）","weight_g":99,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"チーズバーガー","calories":291,"protein_g":15.9,"fat_g":13.3,"carbs_g":27.3,"salt_g":1.6,"serving_label":"1品（110g）","weight_g":110,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"チーズダブルチーズバーガー","calories":471,"protein_g":29.2,"fat_g":26.9,"carbs_g":28.1,"salt_g":2.4,"serving_label":"1品（167g）","weight_g":167,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"チーズアグリーバーガー","calories":675,"protein_g":32.4,"fat_g":44.7,"carbs_g":36.7,"salt_g":3.6,"serving_label":"1品（273g）","weight_g":273,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルチーズアグリーバーガー","calories":910,"protein_g":50.9,"fat_g":62.5,"carbs_g":36.8,"salt_g":3.8,"serving_label":"1品（353g）","weight_g":353,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"トリプルチーズアグリーバーガー","calories":1145,"protein_g":69.4,"fat_g":80.3,"carbs_g":36.9,"salt_g":3.9,"serving_label":"1品（433g）","weight_g":433,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"にんにく・ガーリック バーガー","calories":731,"protein_g":32.7,"fat_g":44.3,"carbs_g":50.8,"salt_g":3.6,"serving_label":"1品（246g）","weight_g":246,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ダブルにんにく・ガーリック バーガー","calories":1044,"protein_g":55.8,"fat_g":68.5,"carbs_g":51.5,"salt_g":4.5,"serving_label":"1品（348g）","weight_g":348,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スパイシーにんにく・ガーリック バーガー","calories":759,"protein_g":33.4,"fat_g":45.5,"carbs_g":54.4,"salt_g":3.7,"serving_label":"1品（252g）","weight_g":252,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スパイシーダブルにんにく・ガーリック バーガー","calories":1072,"protein_g":56.4,"fat_g":69.7,"carbs_g":55.1,"salt_g":4.7,"serving_label":"1品（354g）","weight_g":354,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"にんにく・ガーリック ザ・ワンパウンダー","calories":1638,"protein_g":92.7,"fat_g":118.1,"carbs_g":51.2,"salt_g":5.3,"serving_label":"1品（525g）","weight_g":525,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"クラシック スモーキーフライドチキンバーガー","calories":563,"protein_g":26.7,"fat_g":32.7,"carbs_g":40.7,"salt_g":2.8,"serving_label":"1品（208g）","weight_g":208,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"チーズ・クラシック スモーキーフライドチキンバーガー","calories":523,"protein_g":28.9,"fat_g":27.2,"carbs_g":40.7,"salt_g":3.1,"serving_label":"1品（207g）","weight_g":207,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スパイシーマヨ スモーキーフライドチキンバーガー","calories":538,"protein_g":26.8,"fat_g":29.3,"carbs_g":42,"salt_g":3.2,"serving_label":"1品（208g）","weight_g":208,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"タルタルチキンバーガー","calories":425,"protein_g":14.4,"fat_g":25.8,"carbs_g":34.7,"salt_g":2,"serving_label":"1品（138g）","weight_g":138,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"スモーキーテリヤキバーガー","calories":342,"protein_g":13.5,"fat_g":18.1,"carbs_g":31.4,"salt_g":1.6,"serving_label":"1品（123g）","weight_g":123,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"ハッシュ＆BBQバーガー","calories":488,"protein_g":14.9,"fat_g":27.8,"carbs_g":44.3,"salt_g":2,"serving_label":"1品（170g）","weight_g":170,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"BBQレタスバーガー","calories":332,"protein_g":13.4,"fat_g":17.9,"carbs_g":29.3,"salt_g":1.4,"serving_label":"1品（123g）","weight_g":123,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"フィッシュバーガー","calories":374,"protein_g":14.4,"fat_g":18.4,"carbs_g":37.9,"salt_g":2.1,"serving_label":"1品（134g）","weight_g":134,"default_meal_type":"lunch","tag":"バーガー"},
  {"name":"クラシック ホットドッグ","calories":302,"protein_g":12.3,"fat_g":19,"carbs_g":20.5,"salt_g":1.9,"serving_label":"1品（109g）","weight_g":109,"default_meal_type":"lunch","tag":"ホットドッグ"},
  {"name":"BBQ＆チーズ ホットドッグ","calories":343,"protein_g":13.8,"fat_g":22.2,"carbs_g":22,"salt_g":2.4,"serving_label":"1品（123g）","weight_g":123,"default_meal_type":"lunch","tag":"ホットドッグ"},
  {"name":"フレンチフライ S","calories":216,"protein_g":3,"fat_g":9.8,"carbs_g":29,"salt_g":0.9,"serving_label":"1品（74g）","weight_g":74,"default_meal_type":"snack","tag":"サイド"},
  {"name":"フレンチフライ M","calories":306,"protein_g":4.3,"fat_g":13.9,"carbs_g":41.1,"salt_g":1.3,"serving_label":"1品（105g）","weight_g":105,"default_meal_type":"snack","tag":"サイド"},
  {"name":"フレンチフライ L","calories":438,"protein_g":6.1,"fat_g":19.9,"carbs_g":58.8,"salt_g":1.8,"serving_label":"1品（150g）","weight_g":150,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チリチーズフライ","calories":325,"protein_g":8.9,"fat_g":18.3,"carbs_g":32,"salt_g":2.6,"serving_label":"1品（135g）","weight_g":135,"default_meal_type":"snack","tag":"サイド"},
  {"name":"オニオンリング","calories":218,"protein_g":2.5,"fat_g":10.9,"carbs_g":27.5,"salt_g":1.5,"serving_label":"1品（91g）","weight_g":91,"default_meal_type":"snack","tag":"サイド"},
  {"name":"シーザーサラダ（ドレッシングあり）","calories":111,"protein_g":2.7,"fat_g":9.7,"carbs_g":3.7,"salt_g":0.6,"serving_label":"1品（74g）","weight_g":74,"default_meal_type":"snack","tag":"サイド"},
  {"name":"シーザーサラダ（ドレッシングなし）","calories":43,"protein_g":2.7,"fat_g":3,"carbs_g":1.6,"salt_g":0.2,"serving_label":"1品（59g）","weight_g":59,"default_meal_type":"snack","tag":"サイド"},
  {"name":"（別添）シーザードレッシング","calories":63,"protein_g":0.3,"fat_g":6.3,"carbs_g":1.1,"salt_g":0.5,"serving_label":"1品（15g）","weight_g":15,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チキンナゲット 5ピース","calories":228,"protein_g":11.2,"fat_g":14.5,"carbs_g":15.2,"salt_g":1.2,"serving_label":"1品（88g）","weight_g":88,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チキンナゲット 8ピース","calories":364,"protein_g":17.9,"fat_g":23.2,"carbs_g":24.4,"salt_g":1.9,"serving_label":"1品（140g）","weight_g":140,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チーズ チキンナゲット 5ピース","calories":253,"protein_g":13.5,"fat_g":14.1,"carbs_g":18.1,"salt_g":1.1,"serving_label":"1品（96g）","weight_g":96,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チーズ チキンナゲット 8ピース","calories":406,"protein_g":21.7,"fat_g":22.6,"carbs_g":29,"salt_g":1.7,"serving_label":"1品（154g）","weight_g":154,"default_meal_type":"snack","tag":"サイド"},
  {"name":"チーズ チキンナゲット 16ピース","calories":811,"protein_g":43.3,"fat_g":45.2,"carbs_g":58.1,"salt_g":3.4,"serving_label":"1品（307g）","weight_g":307,"default_meal_type":"snack","tag":"サイド"},
  {"name":"スナックチキン","calories":137,"protein_g":8,"fat_g":7.6,"carbs_g":9.2,"salt_g":1,"serving_label":"1品（53g）","weight_g":53,"default_meal_type":"snack","tag":"サイド"},
  {"name":"アメリカンスモーキーチキン 4ピース","calories":220,"protein_g":23.8,"fat_g":13,"carbs_g":2,"salt_g":1.7,"serving_label":"1品（160g）","weight_g":160,"default_meal_type":"snack","tag":"サイド"},
  {"name":"ハッシュブラウン","calories":160,"protein_g":1.6,"fat_g":10,"carbs_g":15.4,"salt_g":0.6,"serving_label":"1品（59g）","weight_g":59,"default_meal_type":"snack","tag":"サイド"},
  {"name":"マスタードソース","calories":32,"protein_g":0.1,"fat_g":1.2,"carbs_g":5.2,"salt_g":0.5,"serving_label":"1品（18g）","weight_g":18,"default_meal_type":"snack","tag":"ソース"},
  {"name":"バーベキューソース","calories":26,"protein_g":0.2,"fat_g":0.1,"carbs_g":6.2,"salt_g":0.4,"serving_label":"1品（18g）","weight_g":18,"default_meal_type":"snack","tag":"ソース"},
  {"name":"アップルパイ","calories":203,"protein_g":1.9,"fat_g":10.7,"carbs_g":24.4,"salt_g":0.3,"serving_label":"1品（67g）","weight_g":67,"default_meal_type":"snack","tag":"デザート"},
  {"name":"キャラメルサンデー","calories":129,"protein_g":1.5,"fat_g":3.2,"carbs_g":23.8,"salt_g":0.2,"serving_label":"1品（130g）","weight_g":130,"default_meal_type":"snack","tag":"デザート"},
  {"name":"チョコレートサンデー","calories":129,"protein_g":1.5,"fat_g":3.1,"carbs_g":24.1,"salt_g":0.2,"serving_label":"1品（130g）","weight_g":130,"default_meal_type":"snack","tag":"デザート"},
  {"name":"プレーン","calories":102,"protein_g":1.4,"fat_g":3,"carbs_g":17.6,"salt_g":0.2,"serving_label":"1品（120g）","weight_g":120,"default_meal_type":"snack","tag":"デザート"},
  {"name":"フロートドリンク コカ・コーラ","calories":145,"protein_g":2,"fat_g":3.8,"carbs_g":25.9,"salt_g":0.2,"serving_label":"1品（340g）","weight_g":340,"default_meal_type":"snack","tag":"ドリンク"},
  {"name":"フロートドリンク コカ・コーラゼロ","calories":91,"protein_g":2,"fat_g":3.8,"carbs_g":12.5,"salt_g":0.2,"serving_label":"1品（340g）","weight_g":340,"default_meal_type":"snack","tag":"ドリンク"},
  {"name":"フロートドリンク メロンソーダ","calories":151,"protein_g":2,"fat_g":3.8,"carbs_g":27.4,"salt_g":0.2,"serving_label":"1品（340g）","weight_g":340,"default_meal_type":"snack","tag":"ドリンク"},
  {"name":"フロートドリンク ドクターペッパー","calories":133,"protein_g":0.9,"fat_g":2,"carbs_g":27.8,"salt_g":0.1,"serving_label":"1品（340g）","weight_g":340,"default_meal_type":"snack","tag":"ドリンク"},
  {"name":"フロートドリンク アイスコーヒー","calories":92,"protein_g":2,"fat_g":3.8,"carbs_g":12.5,"salt_g":0.2,"serving_label":"1品（340g）","weight_g":340,"default_meal_type":"snack","tag":"ドリンク"},
] satisfies BurgerKingProduct[];

export const burgerKingMenuFoods = products.map((product) =>
  official({
    brand: "バーガーキング",
    name: product.name,
    category: "チェーン店",
    tags: [...tags, product.tag],
    calories: product.calories,
    protein_g: product.protein_g,
    fat_g: product.fat_g,
    carbs_g: product.carbs_g,
    salt_g: product.salt_g,
    serving_label: product.serving_label,
    weight_g: product.weight_g,
    default_meal_type: product.default_meal_type,
    source_url: sourceUrl,
    fetched_at: fetchedAt,
  }),
);

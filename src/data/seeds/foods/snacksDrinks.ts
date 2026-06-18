import { official } from "./helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";
const snackFetchedAt = "2026-06-13T00:00:00.000Z";
const uhaFetchedAt = "2026-06-15T00:00:00.000Z";
const cheeseSnackFetchedAt = "2026-06-18T00:00:00.000Z";

type PackagedItem = {
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
  fetched_at?: string;
};

const packaged = (item: PackagedItem) =>
  official({
    brand: item.brand,
    name: item.name,
    category: item.category,
    tags: ["市販品", "公式栄養", ...item.tags],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label,
    default_meal_type: "snack",
    source_url: item.source_url,
    fetched_at: item.fetched_at ?? fetchedAt,
  });

export const snackDrinkFoods = [
  packaged({ brand: "明治", name: "果汁グミ ぶどう", category: "スイーツ", tags: ["グミ", "ぶどう", "間食"], calories: 167, protein_g: 3.0, fat_g: 0.0, carbs_g: 38.8, serving_label: "1袋 54g", source_url: "https://www.meiji.co.jp/products/candy_gum/04742.html" }),
  packaged({ brand: "明治", name: "果汁グミ 温州みかん", category: "スイーツ", tags: ["グミ", "みかん", "間食"], calories: 168, protein_g: 3.0, fat_g: 0.0, carbs_g: 39.0, serving_label: "1袋 54g", source_url: "https://www.meiji.co.jp/products/candy_gum/04743.html" }),
  packaged({ brand: "明治", name: "果汁グミ マスカット", category: "スイーツ", tags: ["グミ", "マスカット", "間食"], calories: 167, protein_g: 3.0, fat_g: 0.0, carbs_g: 38.8, serving_label: "1袋 54g", source_url: "https://www.meiji.co.jp/products/candy_gum/" }),
  packaged({ brand: "カンロ", name: "ピュレグミ グレープ", category: "スイーツ", tags: ["グミ", "グレープ", "間食"], calories: 193, protein_g: 3.0, fat_g: 0.0, carbs_g: 45.2, serving_label: "1袋 56g", source_url: "https://kanro.jp/products/pure/" }),
  packaged({ brand: "カンロ", name: "ピュレグミ レモン", category: "スイーツ", tags: ["グミ", "レモン", "間食"], calories: 192, protein_g: 3.0, fat_g: 0.0, carbs_g: 45.0, serving_label: "1袋 56g", source_url: "https://kanro.jp/products/pure/" }),
  packaged({ brand: "UHA味覚糖", name: "コロロ グレープ", category: "スイーツ", tags: ["グミ", "グレープ", "間食"], calories: 130, protein_g: 0.8, fat_g: 0.0, carbs_g: 31.9, serving_label: "1袋 48g", source_url: "https://www.uha-mikakuto.co.jp/catalog/gummy/" }),
  packaged({ brand: "UHA味覚糖", name: "コロロ マスカット", category: "スイーツ", tags: ["グミ", "マスカット", "間食"], calories: 130, protein_g: 0.8, fat_g: 0.0, carbs_g: 31.9, serving_label: "1袋 48g", source_url: "https://www.uha-mikakuto.co.jp/catalog/gummy/" }),
  packaged({ brand: "UHA味覚糖", name: "忍者めし 巨峰", category: "スイーツ", tags: ["グミ", "ハードグミ", "間食"], calories: 63, protein_g: 1.0, fat_g: 0.0, carbs_g: 15.7, serving_label: "1袋 20g", source_url: "https://www.uha-mikakuto.co.jp/catalog/gummy/" }),
  packaged({ brand: "UHA味覚糖", name: "シゲキックス グレープ", category: "スイーツ", tags: ["グミ", "ハードグミ", "シゲキックス", "グレープ", "すっぱい", "間食"], calories: 59, protein_g: 2.0, fat_g: 0.0, carbs_g: 15.2, salt_g: 0.01, serving_label: "1袋 20g", source_url: "https://www.uha-mikakuto.co.jp/catalog/gummy/si84.html", fetched_at: uhaFetchedAt }),
  packaged({ brand: "UHA味覚糖", name: "激シゲキックス 極刺激ソーダ", category: "スイーツ", tags: ["グミ", "ハードグミ", "シゲキックス", "ソーダ", "すっぱい", "間食"], calories: 63, protein_g: 2.0, fat_g: 0.0, carbs_g: 16.2, salt_g: 0.01, serving_label: "1袋 20g", source_url: "https://www.uha-mikakuto.co.jp/catalog/gummy/si77.html", fetched_at: uhaFetchedAt }),
  packaged({ brand: "ノーベル製菓", name: "男梅グミ", category: "スイーツ", tags: ["グミ", "梅", "間食", "塩分"], calories: 121, protein_g: 2.4, fat_g: 0.0, carbs_g: 27.8, salt_g: 1.7, serving_label: "1袋 38g", source_url: "https://www.nobel.co.jp/artdetail.php?id=19" }),
  packaged({ brand: "ブルボン", name: "フェットチーネグミ イタリアングレープ味", category: "スイーツ", tags: ["グミ", "グレープ", "間食"], calories: 166, protein_g: 2.5, fat_g: 0.0, carbs_g: 39.0, serving_label: "1袋 50g", source_url: "https://www.bourbon.co.jp/fettuccine/" }),
  packaged({ brand: "HARIBO", name: "ゴールドベア", category: "スイーツ", tags: ["グミ", "輸入菓子", "間食"], calories: 275, protein_g: 5.5, fat_g: 0.5, carbs_g: 62.0, serving_label: "1袋 80g", source_url: "https://www.haribo.com/ja-jp/products/haribo/goldbears" }),

  packaged({ brand: "カルビー", name: "ポテトチップス うすしお味", category: "スイーツ", tags: ["スナック", "ポテトチップス", "うすしお", "間食"], calories: 308, protein_g: 2.8, fat_g: 19.8, carbs_g: 29.7, salt_g: 0.5, serving_label: "1袋 55g", source_url: "https://www.calbee.co.jp/products/detail/?p=20220909090902", fetched_at: snackFetchedAt }),
  packaged({ brand: "カルビー", name: "じゃがりこ サラダ", category: "スイーツ", tags: ["スナック", "じゃがりこ", "ポテト", "間食"], calories: 285, protein_g: 4.2, fat_g: 13.7, carbs_g: 36.1, salt_g: 0.7, serving_label: "1カップ 57g", source_url: "https://www.calbee.co.jp/products/detail/?p=20211224132631", fetched_at: snackFetchedAt }),
  packaged({ brand: "カルビー", name: "かっぱえびせん", category: "スイーツ", tags: ["スナック", "えび", "間食"], calories: 380, protein_g: 5.1, fat_g: 17.0, carbs_g: 51.6, salt_g: 1.7, serving_label: "1袋 77g", source_url: "https://www.calbee.co.jp/products/detail/?p=20230410102049", fetched_at: snackFetchedAt }),
  packaged({ brand: "カルビー", name: "ピザポテト", category: "スイーツ", tags: ["スナック", "ポテトチップス", "チーズ", "ピザ", "間食"], calories: 331, protein_g: 3.3, fat_g: 20.8, carbs_g: 32.7, salt_g: 0.8, serving_label: "1袋 60g", source_url: "https://www.calbee.co.jp/products/detail/?p=20210513141859", fetched_at: snackFetchedAt }),
  packaged({ brand: "江崎グリコ", name: "ポッキーチョコレート", category: "スイーツ", tags: ["チョコ", "焼き菓子", "ポッキー", "間食"], calories: 142, protein_g: 2.6, fat_g: 6.3, carbs_g: 19.4, salt_g: 0.15, serving_label: "1袋 29g", source_url: "https://www.glico.com/jp/product/chocolate/pocky/47143/", fetched_at: snackFetchedAt }),
  packaged({ brand: "明治", name: "明治ミルクチョコレート", category: "スイーツ", tags: ["チョコ", "板チョコ", "間食"], calories: 283, protein_g: 3.8, fat_g: 18.4, carbs_g: 26.7, salt_g: 0.065, serving_label: "1枚 50g", source_url: "https://www.meiji.co.jp/products/chocolate/04777.html", fetched_at: snackFetchedAt }),
  packaged({ brand: "ブルボン", name: "アルフォートミニチョコレート", category: "スイーツ", tags: ["チョコ", "ビスケット", "間食"], calories: 287, protein_g: 4.6, fat_g: 15.7, carbs_g: 32.9, salt_g: 0.2, serving_label: "12個 55g", source_url: "https://www.bourbon.co.jp/product/detail/35360-03.html", fetched_at: snackFetchedAt }),
  packaged({ brand: "森永製菓", name: "チョコボール ピーナッツ", category: "スイーツ", tags: ["チョコ", "ピーナッツ", "間食"], calories: 162, protein_g: 3.1, fat_g: 10.6, carbs_g: 13.5, salt_g: 0.036, serving_label: "1箱 28g", source_url: "https://www.morinaga.co.jp/products/detail.php?id=PRD2018-10-0054", fetched_at: snackFetchedAt }),

  packaged({ brand: "明治", name: "明治北海道十勝スマートチーズ 熟成チェダーブレンド", category: "おかず・惣菜", tags: ["チーズ", "スマートチーズ", "おつまみ", "個包装", "間食"], calories: 41, protein_g: 2.5, fat_g: 3.3, carbs_g: 0.2, salt_g: 0.31, serving_label: "1個 11.3g", source_url: "https://www.meiji.co.jp/products/cheese/4902705093713.html", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "明治", name: "明治北海道十勝スマートチーズ 芳醇パルメザンブレンド", category: "おかず・惣菜", tags: ["チーズ", "スマートチーズ", "パルメザン", "おつまみ", "個包装", "間食"], calories: 40, protein_g: 2.6, fat_g: 3.2, carbs_g: 0.2, salt_g: 0.31, serving_label: "1個 11.3g", source_url: "https://www.meiji.co.jp/products/cheese/4902705093720.html", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "明治", name: "明治北海道十勝スマートチーズ 熟成チェダーブレンド ブラックペッパー入り", category: "おかず・惣菜", tags: ["チーズ", "スマートチーズ", "ブラックペッパー", "おつまみ", "個包装", "間食"], calories: 41, protein_g: 2.5, fat_g: 3.3, carbs_g: 0.3, salt_g: 0.30, serving_label: "1個 11.3g", source_url: "https://www.meiji.co.jp/products/cheese/4902705098442.html", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "明治", name: "明治北海道十勝6Pチーズ", category: "おかず・惣菜", tags: ["チーズ", "6Pチーズ", "おつまみ", "個包装", "間食"], calories: 54, protein_g: 3.5, fat_g: 4.4, carbs_g: 0.2, salt_g: 0.43, serving_label: "1個 16g", source_url: "https://www.meiji.co.jp/products/cheese/4902705096769.html", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "雪印メグミルク", name: "6Pチーズ", category: "おかず・惣菜", tags: ["チーズ", "6Pチーズ", "おつまみ", "個包装", "間食", "炭水化物範囲上限"], calories: 55, protein_g: 3.5, fat_g: 4.4, carbs_g: 0.6, salt_g: 0.52, serving_label: "1個 17g", source_url: "https://www.meg-snow.com/products/detail.php?p=6P", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "雪印メグミルク", name: "ベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "おつまみ", "個包装", "間食", "炭水化物範囲上限"], calories: 37, protein_g: 2.4, fat_g: 3.0, carbs_g: 0.4, salt_g: 0.35, serving_label: "1個 11.5g", source_url: "https://www.meg-snow.com/products/detail.php?p=babycheese", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "Kiri", name: "キリ クリーミーポーション", category: "おかず・惣菜", tags: ["チーズ", "クリームチーズ", "キリ", "おつまみ", "個包装", "間食", "炭水化物範囲上限"], calories: 50, protein_g: 1.5, fat_g: 4.7, carbs_g: 0.7, salt_g: 0.2, serving_label: "1個 16.3g", source_url: "https://www.kiri.jp/kiri/product/", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "Kiri", name: "キリ ハーブ&ガーリック", category: "おかず・惣菜", tags: ["チーズ", "クリームチーズ", "キリ", "ハーブ", "ガーリック", "おつまみ", "個包装", "間食", "炭水化物範囲上限"], calories: 62, protein_g: 1.6, fat_g: 5.8, carbs_g: 1.2, salt_g: 0.3, serving_label: "1個 18g", source_url: "https://www.kiri.jp/kiri/product/", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "Kiri", name: "キリ & スティック", category: "スイーツ", tags: ["チーズ", "クリームチーズ", "キリ", "クラッカー", "おつまみ", "個包装", "間食"], calories: 103, protein_g: 2.9, fat_g: 6.3, carbs_g: 8.6, salt_g: 0.5, serving_label: "1パック 35g", source_url: "https://www.kiri.jp/kiri/product/", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "ベビーチーズ（プレーン）", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "おつまみ", "個包装", "間食"], calories: 45, protein_g: 2.7, fat_g: 3.7, carbs_g: 0.2, salt_g: 0.35, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1663", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "アーモンド入りベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "アーモンド", "おつまみ", "個包装", "間食"], calories: 46, protein_g: 2.6, fat_g: 3.8, carbs_g: 0.3, salt_g: 0.38, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1664", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "カマンベール入りベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "カマンベール", "おつまみ", "個包装", "間食"], calories: 44, protein_g: 2.4, fat_g: 3.7, carbs_g: 0.2, salt_g: 0.38, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1665", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "スモーク味ベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "スモーク", "おつまみ", "個包装", "間食"], calories: 45, protein_g: 2.7, fat_g: 3.7, carbs_g: 0.2, salt_g: 0.39, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1666", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "クリームチーズ入りベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "クリームチーズ", "おつまみ", "個包装", "間食"], calories: 46, protein_g: 2.1, fat_g: 4.0, carbs_g: 0.3, salt_g: 0.35, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1667", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "ブラックペッパー入りベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "ブラックペッパー", "おつまみ", "個包装", "間食"], calories: 45, protein_g: 2.6, fat_g: 3.8, carbs_g: 0.3, salt_g: 0.38, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1668", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "モッツァレラベビーチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "モッツァレラ", "おつまみ", "個包装", "間食"], calories: 43, protein_g: 2.5, fat_g: 3.5, carbs_g: 0.4, salt_g: 0.33, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/1670", fetched_at: cheeseSnackFetchedAt }),
  packaged({ brand: "QBB", name: "プレミアムベビーチーズ クリーミークリームチーズ", category: "おかず・惣菜", tags: ["チーズ", "ベビーチーズ", "クリームチーズ", "プレミアム", "おつまみ", "個包装", "間食"], calories: 48, protein_g: 1.4, fat_g: 4.3, carbs_g: 0.9, salt_g: 0.20, serving_label: "1個 13.5g", source_url: "https://www.qbb.co.jp/products/detail/view_express_entity/25975", fetched_at: cheeseSnackFetchedAt }),

  packaged({ brand: "日本コカ・コーラ", name: "コカ・コーラ", category: "ドリンク", tags: ["炭酸", "コーラ", "ジュース"], calories: 225, protein_g: 0.0, fat_g: 0.0, carbs_g: 56.5, serving_label: "500ml", source_url: "https://www.coca-cola.com/jp/ja/about-us/faq" }),
  packaged({ brand: "日本コカ・コーラ", name: "コカ・コーラ ゼロ", category: "ドリンク", tags: ["炭酸", "コーラ", "ゼロカロリー"], calories: 0, protein_g: 0.0, fat_g: 0.0, carbs_g: 0.0, serving_label: "500ml", source_url: "https://www.coca-cola.com/jp/ja/about-us/faq" }),
  packaged({ brand: "日本コカ・コーラ", name: "ファンタ グレープ", category: "ドリンク", tags: ["炭酸", "ジュース", "グレープ"], calories: 230, protein_g: 0.0, fat_g: 0.0, carbs_g: 57.5, serving_label: "500ml", source_url: "https://www.coca-cola.com/jp/ja/brands/fanta" }),
  packaged({ brand: "日本コカ・コーラ", name: "ファンタ オレンジ", category: "ドリンク", tags: ["炭酸", "ジュース", "オレンジ"], calories: 230, protein_g: 0.0, fat_g: 0.0, carbs_g: 57.5, serving_label: "500ml", source_url: "https://www.coca-cola.com/jp/ja/brands/fanta" }),
  packaged({ brand: "アサヒ飲料", name: "三ツ矢サイダー", category: "ドリンク", tags: ["炭酸", "サイダー"], calories: 210, protein_g: 0.0, fat_g: 0.0, carbs_g: 55.0, serving_label: "500ml", source_url: "https://www.asahiinryo.co.jp/products/carbonated/mitsuya_cider/" }),
  packaged({ brand: "アサヒ飲料", name: "カルピスウォーター", category: "ドリンク", tags: ["乳酸菌飲料", "ジュース"], calories: 230, protein_g: 1.5, fat_g: 0.0, carbs_g: 57.0, serving_label: "500ml", source_url: "https://www.asahiinryo.co.jp/products/milkybeverage/calpis_water/" }),
  packaged({ brand: "サントリー", name: "C.C.レモン", category: "ドリンク", tags: ["炭酸", "レモン", "ジュース"], calories: 200, protein_g: 0.0, fat_g: 0.0, carbs_g: 50.5, serving_label: "500ml", source_url: "https://products.suntory.co.jp/d/4901777155512/" }),
  packaged({ brand: "サントリー", name: "デカビタC ダブルスーパーチャージ", category: "ドリンク", tags: ["炭酸", "エナジー", "ジュース"], calories: 235, protein_g: 0.0, fat_g: 0.0, carbs_g: 58.5, serving_label: "500ml", source_url: "https://products.suntory.co.jp/d/4901777233210/" }),
  packaged({ brand: "サントリー", name: "ペプシ〈生〉", category: "ドリンク", tags: ["炭酸", "コーラ"], calories: 288, protein_g: 0.0, fat_g: 0.0, carbs_g: 72.0, serving_label: "600ml", source_url: "https://products.suntory.co.jp/d/4901777375941/" }),
  packaged({ brand: "サントリー", name: "ペプシ〈生〉ゼロ", category: "ドリンク", tags: ["炭酸", "コーラ", "ゼロカロリー"], calories: 0, protein_g: 0.0, fat_g: 0.0, carbs_g: 0.0, serving_label: "600ml", source_url: "https://products.suntory.co.jp/d/4901777375965/" }),
  packaged({ brand: "サントリー", name: "なっちゃん オレンジ", category: "ドリンク", tags: ["ジュース", "オレンジ"], calories: 187, protein_g: 0.0, fat_g: 0.0, carbs_g: 46.8, serving_label: "425ml", source_url: "https://products.suntory.co.jp/d/4901777285257/" }),
  packaged({ brand: "キリン", name: "キリンレモン", category: "ドリンク", tags: ["炭酸", "レモン"], calories: 140, protein_g: 0.0, fat_g: 0.0, carbs_g: 35.0, serving_label: "500ml", source_url: "https://www.kirin.co.jp/softdrink/kirinlemon/" }),
  packaged({ brand: "キリン", name: "午後の紅茶 ミルクティー", category: "ドリンク", tags: ["紅茶", "ミルクティー"], calories: 185, protein_g: 2.5, fat_g: 2.5, carbs_g: 38.0, serving_label: "500ml", source_url: "https://www.kirin.co.jp/softdrink/gogo/" }),
  packaged({ brand: "キリン", name: "午後の紅茶 レモンティー", category: "ドリンク", tags: ["紅茶", "レモンティー"], calories: 140, protein_g: 0.0, fat_g: 0.0, carbs_g: 35.0, serving_label: "500ml", source_url: "https://www.kirin.co.jp/softdrink/gogo/" }),
  packaged({ brand: "カゴメ", name: "野菜生活100 オリジナル", category: "ドリンク", tags: ["野菜ジュース", "ジュース"], calories: 68, protein_g: 0.8, fat_g: 0.0, carbs_g: 16.0, salt_g: 0.2, serving_label: "200ml", source_url: "https://www.kagome.co.jp/products/drink/A3495/" }),
  packaged({ brand: "トロピカーナ", name: "100% オレンジ", category: "ドリンク", tags: ["ジュース", "オレンジ", "果汁100%"], calories: 152, protein_g: 1.7, fat_g: 0.0, carbs_g: 35.0, serving_label: "330ml", source_url: "https://www.k-tropicana.com/products/" }),
];

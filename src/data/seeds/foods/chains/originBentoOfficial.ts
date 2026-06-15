import { official } from "../helpers";

const fetchedAt = "2026-06-15T00:00:00.000Z";

type OriginInput = {
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  source_url: string;
  tags?: string[];
  serving_label?: string;
};

const originOfficial = (input: OriginInput) =>
  official({
    brand: "オリジン弁当",
    name: input.name,
    category: "チェーン店",
    tags: ["公式栄養", "弁当", "キッチンオリジン", ...(input.tags ?? [])],
    calories: input.calories,
    protein_g: input.protein_g,
    fat_g: input.fat_g,
    carbs_g: input.carbs_g,
    salt_g: input.salt_g,
    serving_label: input.serving_label ?? "1品",
    default_meal_type: "lunch",
    source_url: input.source_url,
    fetched_at: fetchedAt,
  });

export const originBentoOfficialFoods = [
  originOfficial({
    name: "オリジン幕の内弁当",
    calories: 587,
    protein_g: 16.4,
    fat_g: 18.8,
    carbs_g: 89.3,
    salt_g: 3.2,
    tags: ["幕の内"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detail8div5w2jhrkz9tyc",
  }),
  originOfficial({
    name: "タルタルのり弁当",
    calories: 605,
    protein_g: 18.2,
    fat_g: 13.6,
    carbs_g: 98.9,
    salt_g: 2.9,
    tags: ["のり弁"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detail75ovq8bb1uxbm4j2",
  }),
  originOfficial({
    name: "特のりタル弁当",
    calories: 751,
    protein_g: 26.1,
    fat_g: 22.3,
    carbs_g: 108.5,
    salt_g: 4.1,
    tags: ["のり弁"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailsmtk2fl5iq4pvahl",
  }),
  originOfficial({
    name: "ロースとんかつ弁当",
    calories: 657,
    protein_g: 21.1,
    fat_g: 23.6,
    carbs_g: 88.2,
    salt_g: 1.9,
    tags: ["とんかつ"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detail8c-tm3zj4cs1h11g",
  }),
  originOfficial({
    name: "生姜焼き弁当",
    calories: 786,
    protein_g: 18.3,
    fat_g: 41.0,
    carbs_g: 84.6,
    salt_g: 2.6,
    tags: ["豚肉", "生姜焼き"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detaildz24vzp19x7j1wqb",
  }),
  originOfficial({
    name: "デミグラスハンバーグ弁当",
    calories: 501,
    protein_g: 18.1,
    fat_g: 8.1,
    carbs_g: 89.5,
    salt_g: 2.3,
    tags: ["ハンバーグ"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detail5y67jqq62lu4-knl",
  }),
  originOfficial({
    name: "牛焼肉弁当",
    calories: 741,
    protein_g: 19.7,
    fat_g: 31.0,
    carbs_g: 89.0,
    salt_g: 2.3,
    tags: ["焼肉", "牛肉"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detaills8v1qr0hzly0okw",
  }),
  originOfficial({
    name: "ジャンボ唐揚げ弁当（3個）",
    calories: 918,
    protein_g: 33.1,
    fat_g: 40.1,
    carbs_g: 107.9,
    salt_g: 4.1,
    tags: ["唐揚げ", "鶏肉"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detaililymvee-ofx5ak2n",
  }),
  originOfficial({
    name: "チキン南蛮タルタル弁当",
    calories: 882,
    protein_g: 17.1,
    fat_g: 39.6,
    carbs_g: 111.2,
    salt_g: 3.9,
    tags: ["チキン南蛮", "鶏肉"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailxpma3z5kxsnqukbb",
  }),
  originOfficial({
    name: "肉野菜炒め弁当（濃厚醤油）",
    calories: 541,
    protein_g: 17.0,
    fat_g: 14.9,
    carbs_g: 86.5,
    salt_g: 3.2,
    tags: ["野菜炒め", "豚肉"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailkcr4tykyio7qs14r",
  }),
  originOfficial({
    name: "ロースかつ丼",
    calories: 851,
    protein_g: 29.7,
    fat_g: 28.2,
    carbs_g: 115.4,
    salt_g: 3.9,
    tags: ["丼", "かつ丼", "とんかつ"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detail4lxlm1qvnr2ixvvb",
  }),
  originOfficial({
    name: "カレーライス",
    calories: 487,
    protein_g: 7.1,
    fat_g: 10.2,
    carbs_g: 88.7,
    salt_g: 3.1,
    tags: ["カレー"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailuwauf6nmsae8b6zc",
  }),
  originOfficial({
    name: "ロースカツカレー",
    calories: 855,
    protein_g: 23.6,
    fat_g: 32.7,
    carbs_g: 113.8,
    salt_g: 3.7,
    tags: ["カレー", "とんかつ"],
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailquqs8v8i6krnn6pg",
  }),
  originOfficial({
    name: "ジャンボ唐揚げ",
    calories: 180,
    protein_g: 8.9,
    fat_g: 11.7,
    carbs_g: 10.1,
    salt_g: 1.1,
    tags: ["唐揚げ", "鶏肉", "おかず"],
    serving_label: "1個",
    source_url: "https://kitchen-origin.toshu.co.jp/en/detailz-pv9jip6mrafuru",
  }),
];

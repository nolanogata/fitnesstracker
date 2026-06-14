import { estimated } from "../helpers";

const fetchedAt = "2026-06-14T00:00:00.000Z";

const sources = {
  gindaco: "https://www.gindaco.com/menu/",
  kukuru: "https://dotonbori-kukuru.com/",
  dohtonbori: "https://dohtonbori.com/menu/",
  dohtonboriCalorie: "https://dohtonbori.com/calorie/",
};

type KonamonoChainInput = {
  brand: "築地銀だこ" | "たこ家道頓堀くくる" | "道とん堀";
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  tags: string[];
  serving_label?: string;
  source_url?: string;
};

const chainKonamono = (item: KonamonoChainInput) =>
  estimated({
    brand: item.brand,
    name: item.name,
    category: "チェーン店",
    tags: ["粉物", item.brand, "公式メニュー確認", "栄養推定", ...item.tags],
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
    serving_label: item.serving_label ?? "1品",
    default_meal_type: "snack",
    source_url: item.source_url ?? sources[item.brand === "築地銀だこ" ? "gindaco" : item.brand === "たこ家道頓堀くくる" ? "kukuru" : "dohtonbori"],
    fetched_at: fetchedAt,
  });

export const konamonoChainFoods = [
  chainKonamono({ brand: "築地銀だこ", name: "ぜったいうまい‼ たこ焼", calories: 670, protein_g: 22, fat_g: 34, carbs_g: 68, salt_g: 3.2, tags: ["たこ焼き"], serving_label: "8個" }),
  chainKonamono({ brand: "築地銀だこ", name: "ねぎだこ", calories: 610, protein_g: 22, fat_g: 27, carbs_g: 70, salt_g: 3.5, tags: ["たこ焼き", "ねぎ"], serving_label: "8個" }),
  chainKonamono({ brand: "築地銀だこ", name: "チーズ明太子", calories: 760, protein_g: 28, fat_g: 43, carbs_g: 70, salt_g: 4.1, tags: ["たこ焼き", "チーズ", "明太子"], serving_label: "8個" }),
  chainKonamono({ brand: "築地銀だこ", name: "てりたま", calories: 780, protein_g: 26, fat_g: 42, carbs_g: 76, salt_g: 3.8, tags: ["たこ焼き", "卵", "照り焼き"], serving_label: "8個" }),
  chainKonamono({ brand: "築地銀だこ", name: "九条ねぎマヨ 特製ソース", calories: 720, protein_g: 23, fat_g: 39, carbs_g: 70, salt_g: 3.7, tags: ["たこ焼き", "ねぎ", "マヨ"], serving_label: "8個" }),
  chainKonamono({ brand: "築地銀だこ", name: "ソース 焼きそば", calories: 610, protein_g: 18, fat_g: 22, carbs_g: 86, salt_g: 4.0, tags: ["焼きそば"], serving_label: "1皿" }),
  chainKonamono({ brand: "築地銀だこ", name: "だんらんパック 16個入り", calories: 1340, protein_g: 44, fat_g: 68, carbs_g: 136, salt_g: 6.4, tags: ["たこ焼き", "シェア"], serving_label: "16個" }),
  chainKonamono({ brand: "築地銀だこ", name: "だんらんパック 24個入り", calories: 2010, protein_g: 66, fat_g: 102, carbs_g: 204, salt_g: 9.6, tags: ["たこ焼き", "シェア"], serving_label: "24個" }),
  chainKonamono({ brand: "築地銀だこ", name: "贅沢だんらんパック 24個入り", calories: 2200, protein_g: 76, fat_g: 118, carbs_g: 214, salt_g: 11.0, tags: ["たこ焼き", "シェア"], serving_label: "24個" }),

  chainKonamono({ brand: "たこ家道頓堀くくる", name: "大たこ入りたこ焼", calories: 620, protein_g: 24, fat_g: 28, carbs_g: 68, salt_g: 3.2, tags: ["たこ焼き"], serving_label: "8個" }),
  chainKonamono({ brand: "たこ家道頓堀くくる", name: "明石焼", calories: 430, protein_g: 22, fat_g: 18, carbs_g: 44, salt_g: 3.0, tags: ["明石焼", "だし", "卵"], serving_label: "8個" }),
  chainKonamono({ brand: "たこ家道頓堀くくる", name: "多幸めし", calories: 560, protein_g: 22, fat_g: 12, carbs_g: 92, salt_g: 3.0, tags: ["たこ", "ごはん"], serving_label: "1杯" }),
  chainKonamono({ brand: "たこ家道頓堀くくる", name: "たこ焼・明石焼セット", calories: 760, protein_g: 31, fat_g: 32, carbs_g: 82, salt_g: 4.4, tags: ["たこ焼き", "明石焼"], serving_label: "1セット" }),
  chainKonamono({ brand: "たこ家道頓堀くくる", name: "たこ唐揚げ", calories: 320, protein_g: 24, fat_g: 18, carbs_g: 16, salt_g: 2.0, tags: ["たこ", "揚げ物"], serving_label: "1皿" }),

  chainKonamono({ brand: "道とん堀", name: "道とん堀ミックスお好み焼き", calories: 720, protein_g: 28, fat_g: 30, carbs_g: 84, salt_g: 4.0, tags: ["お好み焼き", "ミックス"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "豚玉", calories: 650, protein_g: 24, fat_g: 28, carbs_g: 76, salt_g: 3.5, tags: ["お好み焼き", "豚肉"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "もち明太子チーズお好み焼き", calories: 820, protein_g: 30, fat_g: 36, carbs_g: 94, salt_g: 4.3, tags: ["お好み焼き", "もち", "明太子", "チーズ"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "海鮮ミックスお好み焼き", calories: 700, protein_g: 34, fat_g: 25, carbs_g: 82, salt_g: 4.2, tags: ["お好み焼き", "海鮮"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "豚モダン焼き", calories: 880, protein_g: 30, fat_g: 34, carbs_g: 112, salt_g: 4.8, tags: ["お好み焼き", "モダン焼き", "豚肉"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "明太もちチーズもんじゃ", calories: 620, protein_g: 22, fat_g: 24, carbs_g: 78, salt_g: 4.6, tags: ["もんじゃ", "明太子", "もち", "チーズ"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "もちチーズもんじゃ", calories: 560, protein_g: 18, fat_g: 22, carbs_g: 72, salt_g: 4.0, tags: ["もんじゃ", "もち", "チーズ"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "豚もんじゃ", calories: 520, protein_g: 20, fat_g: 22, carbs_g: 62, salt_g: 3.7, tags: ["もんじゃ", "豚肉"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "ソース焼きそば", calories: 650, protein_g: 22, fat_g: 24, carbs_g: 88, salt_g: 4.2, tags: ["焼きそば"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "オムそば", calories: 780, protein_g: 28, fat_g: 34, carbs_g: 92, salt_g: 4.6, tags: ["焼きそば", "卵"], source_url: sources.dohtonboriCalorie }),
  chainKonamono({ brand: "道とん堀", name: "そば飯", calories: 760, protein_g: 24, fat_g: 26, carbs_g: 108, salt_g: 4.5, tags: ["そば飯", "焼きそば", "ごはん"], source_url: sources.dohtonboriCalorie }),
];


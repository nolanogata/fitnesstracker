import { unofficial } from "./helpers";

const fetchedAt = "2026-06-12T00:00:00.000Z";

type FatSecretInput = {
  brand: string;
  name: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  serving_label?: string;
  tags?: string[];
  source_url: string;
};

const fatSecret = (input: FatSecretInput) =>
  unofficial({
    ...input,
    category: "チェーン店",
    tags: ["非公式PFC", "FatSecret", ...(input.tags ?? [])],
    serving_label: input.serving_label ?? "1品",
    source_url: input.source_url,
    fetched_at: fetchedAt,
  });

export const externalNutritionFoods = [
  fatSecret({
    brand: "コメダ珈琲",
    name: "シロノワール（単品）",
    calories: 933,
    protein_g: 15.9,
    fat_g: 40.2,
    carbs_g: 120,
    tags: ["カフェ", "デザート"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B3%E3%83%A1%E3%83%80%E7%8F%88%E7%90%B2%E5%BA%97/%E3%82%B7%E3%83%AD%E3%83%8E%E3%83%AF%E3%83%BC%E3%83%AB/1%E5%80%8B",
  }),
  fatSecret({
    brand: "コメダ珈琲",
    name: "ミニシロノワール（単品）",
    calories: 422,
    protein_g: 6.8,
    fat_g: 17.2,
    carbs_g: 51.3,
    tags: ["カフェ", "デザート"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B3%E3%83%A1%E3%83%80%E7%8F%88%E7%90%B2%E5%BA%97/%E3%83%9F%E3%83%8B%E3%82%B7%E3%83%AD%E3%83%8E%E3%83%AF%E3%83%BC%E3%83%AB/1%E4%BA%BA%E5%89%8D",
  }),
  fatSecret({
    brand: "コメダ珈琲",
    name: "ミックスサンド",
    calories: 862,
    protein_g: 39.1,
    fat_g: 42,
    carbs_g: 79.4,
    tags: ["カフェ", "サンド"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B3%E3%83%A1%E3%83%80%E7%8F%88%E7%90%B2%E5%BA%97/%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9%E3%82%B5%E3%83%B3%E3%83%89/1%E4%BA%BA%E5%89%8D",
  }),
  fatSecret({
    brand: "コメダ珈琲",
    name: "小倉トースト",
    calories: 731,
    protein_g: 20,
    fat_g: 17.3,
    carbs_g: 123.3,
    tags: ["カフェ", "トースト"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B3%E3%83%A1%E3%83%80%E7%8F%88%E7%90%B2%E5%BA%97/%E5%B0%8F%E5%80%89%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88/1%E4%BA%BA%E5%89%8D",
  }),
  fatSecret({
    brand: "スターバックス",
    name: "ニューヨークチーズケーキ",
    calories: 414,
    protein_g: 6.6,
    fat_g: 29.9,
    carbs_g: 30.1,
    tags: ["カフェ", "ケーキ"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%90%E3%83%83%E3%82%AF%E3%82%B9/%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A8%E3%83%BC%E3%82%AF%E3%83%81%E3%83%BC%E3%82%BA%E3%82%B1%E3%83%BC%E3%82%AD/1%E5%80%8B",
  }),
  fatSecret({
    brand: "スターバックス",
    name: "シュガードーナツ",
    calories: 360,
    protein_g: 4.5,
    fat_g: 21.4,
    carbs_g: 38,
    tags: ["カフェ", "ドーナツ"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%90%E3%83%83%E3%82%AF%E3%82%B9/%E3%82%B7%E3%83%A5%E3%82%AC%E3%83%BC%E3%83%89%E3%83%BC%E3%83%8A%E3%83%84/1%E4%BA%BA%E5%89%8D",
  }),
  fatSecret({
    brand: "スターバックス",
    name: "チョコレートチャンクスコーン",
    calories: 358,
    protein_g: 6.3,
    fat_g: 17.4,
    carbs_g: 45.1,
    tags: ["カフェ", "スコーン"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%90%E3%83%83%E3%82%AF%E3%82%B9/%E3%83%81%E3%83%A7%E3%82%B3%E3%83%AC%E3%83%BC%E3%83%88%E3%83%81%E3%83%A3%E3%83%B3%E3%82%AF%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%B3/1%E5%80%8B",
  }),
  fatSecret({
    brand: "スターバックス",
    name: "根菜チキン サラダラップ",
    calories: 203,
    protein_g: 9.6,
    fat_g: 7.2,
    carbs_g: 25.1,
    tags: ["カフェ", "ラップ", "チキン"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%90%E3%83%83%E3%82%AF%E3%82%B9/%E6%A0%B9%E8%8F%9C%E3%83%81%E3%82%AD%E3%83%B3-%E3%82%B5%E3%83%A9%E3%83%80%E3%83%A9%E3%83%83%E3%83%97/1%E4%BA%BA%E5%89%8D",
  }),
  fatSecret({
    brand: "ガスト",
    name: "チーズＩＮハンバーグ",
    calories: 577,
    protein_g: 25.6,
    fat_g: 38.4,
    carbs_g: 34.3,
    tags: ["ファミレス", "ハンバーグ"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%AC%E3%82%B9%E3%83%88/%E3%83%81%E3%83%BC%E3%82%BAin%E3%83%8F%E3%83%B3%E3%83%90%E3%83%BC%E3%82%B0/1%E5%80%8B",
  }),
  fatSecret({
    brand: "サイゼリヤ",
    name: "ミラノ風ドリア",
    calories: 550,
    protein_g: 10,
    fat_g: 20,
    carbs_g: 50,
    tags: ["ファミレス", "ドリア"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B5%E3%82%A4%E3%82%BC%E3%83%AA%E3%83%A4/%E3%83%9F%E3%83%A9%E3%83%8E%E9%A2%A8%E3%83%89%E3%83%AA%E3%82%A2/1%E9%A3%9F",
  }),
  fatSecret({
    brand: "サイゼリヤ",
    name: "辛味チキン",
    calories: 374,
    protein_g: 22.4,
    fat_g: 23.6,
    carbs_g: 11.9,
    tags: ["ファミレス", "チキン", "サイド"],
    source_url: "https://www.fatsecret.jp/%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A/%E3%82%B5%E3%82%A4%E3%82%BC%E3%83%AA%E3%83%A4/%E8%BE%9B%E5%91%B3%E3%83%81%E3%82%AD%E3%83%B3/1%E7%9A%BF",
  }),
];

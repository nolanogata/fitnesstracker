import type { MealType } from "../../../../types";
import { estimatedWithProfileTags, type NutritionEstimateProfile } from "../estimationProfiles";

const fetchedAt = "2026-06-17T00:00:00.000Z";
const sourceUrl = "https://www.bikkuri-donkey.com/prefecture/tokyo/";

type MenuKind =
  | "alacarte"
  | "children"
  | "dish"
  | "limited_time"
  | "lunch"
  | "morning"
  | "no_milk_wheat_egg"
  | "rice_set"
  | "salad"
  | "side"
  | "steak"
  | "takeout";

type BikkuriDonkeyMenuInput = {
  name: string;
  kinds: MenuKind[];
};

type Nutrition = {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
};

const kindLabels: Record<MenuKind, string> = {
  alacarte: "アラカルト",
  children: "おこさま",
  dish: "ディッシュ",
  limited_time: "期間限定",
  lunch: "ランチ",
  morning: "モーニング",
  no_milk_wheat_egg: "乳小麦卵不使用",
  rice_set: "ライス・セット",
  salad: "サラダ",
  side: "サイド",
  steak: "ステーキ",
  takeout: "テイクアウト",
};

const round = (value: number) => Math.round(value * 10) / 10;

const adjust = (nutrition: Nutrition, delta: Partial<Nutrition>) => ({
  calories: nutrition.calories + (delta.calories ?? 0),
  protein_g: nutrition.protein_g + (delta.protein_g ?? 0),
  fat_g: nutrition.fat_g + (delta.fat_g ?? 0),
  carbs_g: nutrition.carbs_g + (delta.carbs_g ?? 0),
  salt_g: nutrition.salt_g + (delta.salt_g ?? 0),
});

const inferBase = ({ name, kinds }: BikkuriDonkeyMenuInput): Nutrition => {
  if (name === "ライス") return { calories: 336, protein_g: 5.0, fat_g: 0.5, carbs_g: 74.2, salt_g: 0.0 };
  if (name === "みそ汁") return { calories: 45, protein_g: 3.0, fat_g: 1.5, carbs_g: 5.0, salt_g: 1.8 };
  if (name === "コーンスープ") return { calories: 120, protein_g: 3.5, fat_g: 5.0, carbs_g: 16.0, salt_g: 1.1 };
  if (name === "サラダ・みそ汁セット") return { calories: 150, protein_g: 5.0, fat_g: 7.0, carbs_g: 16.0, salt_g: 2.0 };
  if (name === "ドンキーセット") return { calories: 440, protein_g: 10.0, fat_g: 5.0, carbs_g: 87.0, salt_g: 2.1 };
  if (name === "チーズソース") return { calories: 95, protein_g: 5.0, fat_g: 7.0, carbs_g: 3.0, salt_g: 0.8 };
  if (name === "カリーソース") return { calories: 135, protein_g: 4.0, fat_g: 6.0, carbs_g: 17.0, salt_g: 1.5 };
  if (name === "ペッパーソース" || name === "おろしそ") return { calories: 45, protein_g: 1.0, fat_g: 1.5, carbs_g: 7.0, salt_g: 1.0 };

  if (kinds.includes("salad")) return { calories: 180, protein_g: 6.0, fat_g: 11.0, carbs_g: 15.0, salt_g: 1.4 };
  if (kinds.includes("side")) return { calories: 360, protein_g: 10.0, fat_g: 20.0, carbs_g: 35.0, salt_g: 2.1 };
  if (kinds.includes("children")) return { calories: 390, protein_g: 14.0, fat_g: 14.0, carbs_g: 52.0, salt_g: 2.0 };
  if (kinds.includes("morning")) return { calories: 520, protein_g: 20.0, fat_g: 22.0, carbs_g: 62.0, salt_g: 2.7 };
  if (kinds.includes("lunch")) return { calories: 900, protein_g: 34.0, fat_g: 32.0, carbs_g: 110.0, salt_g: 4.2 };
  if (kinds.includes("steak")) return { calories: 650, protein_g: 39.0, fat_g: 40.0, carbs_g: 30.0, salt_g: 3.0 };
  if (kinds.includes("takeout") && !name.includes("ディッシュ")) return { calories: 450, protein_g: 25.0, fat_g: 29.0, carbs_g: 20.0, salt_g: 2.3 };
  if (kinds.includes("alacarte")) return { calories: 700, protein_g: 26.0, fat_g: 28.0, carbs_g: 84.0, salt_g: 3.5 };
  if (kinds.includes("no_milk_wheat_egg")) return { calories: 610, protein_g: 25.0, fat_g: 21.0, carbs_g: 80.0, salt_g: 2.8 };
  return { calories: 760, protein_g: 31.0, fat_g: 29.0, carbs_g: 93.0, salt_g: 3.4 };
};

const inferNutrition = (input: BikkuriDonkeyMenuInput): Nutrition => {
  const { name, kinds } = input;
  let nutrition = inferBase(input);

  if (name.includes("カリー")) nutrition = adjust(nutrition, { calories: 130, protein_g: 4, fat_g: 5, carbs_g: 22, salt_g: 0.7 });
  if (name.includes("チーズ")) nutrition = adjust(nutrition, { calories: 95, protein_g: 5, fat_g: 7, carbs_g: 3, salt_g: 0.5 });
  if (name.includes("エッグ") || name.includes("目玉焼き") || name.includes("卵")) nutrition = adjust(nutrition, { calories: 85, protein_g: 6, fat_g: 6, carbs_g: 0.5, salt_g: 0.2 });
  if (name.includes("パイン")) nutrition = adjust(nutrition, { calories: 45, carbs_g: 11 });
  if (name.includes("おろしそ") || name.includes("ねぎポン")) nutrition = adjust(nutrition, { calories: -20, fat_g: -1, carbs_g: -2, salt_g: 0.3 });
  if (name.includes("フォンデュ")) nutrition = adjust(nutrition, { calories: 150, protein_g: 7, fat_g: 11, carbs_g: 4, salt_g: 0.8 });
  if (name.includes("黒デミ") || name.includes("デミ")) nutrition = adjust(nutrition, { calories: 70, protein_g: 2, fat_g: 3, carbs_g: 9, salt_g: 0.4 });
  if (name.includes("ポテサラ")) nutrition = adjust(nutrition, { calories: 120, protein_g: 3, fat_g: 8, carbs_g: 9, salt_g: 0.5 });
  if (name.includes("メンチカツ")) nutrition = adjust(nutrition, { calories: 260, protein_g: 12, fat_g: 18, carbs_g: 18, salt_g: 0.9 });
  if (name.includes("コロコロステーキ")) nutrition = adjust(nutrition, { calories: 220, protein_g: 19, fat_g: 15, carbs_g: 2, salt_g: 0.8 });
  if (name.includes("チキン")) nutrition = adjust(nutrition, { calories: 230, protein_g: 25, fat_g: 12, carbs_g: 4, salt_g: 0.8 });
  if (name.includes("エビフライ")) nutrition = adjust(nutrition, { calories: 230, protein_g: 9, fat_g: 15, carbs_g: 18, salt_g: 0.8 });
  if (name.includes("ソイ")) nutrition = adjust(nutrition, { calories: -90, protein_g: -4, fat_g: -9, carbs_g: 8, salt_g: -0.2 });
  if (name.includes("いろどりセット")) nutrition = adjust(nutrition, { calories: -160, protein_g: -6, fat_g: -8, carbs_g: -18, salt_g: -0.3 });
  if (name.includes("ライトセット")) nutrition = adjust(nutrition, { calories: -260, protein_g: -11, fat_g: -13, carbs_g: -30, salt_g: -0.6 });
  if (name.includes("ミニマム")) nutrition = adjust(nutrition, { calories: -190, protein_g: -7, fat_g: -9, carbs_g: -22, salt_g: -0.4 });
  if (name.includes("おこさま") || name.includes("ぶ〜ちゃん") || name.includes("プチ")) nutrition = adjust(nutrition, { calories: -120, protein_g: -4, fat_g: -5, carbs_g: -14, salt_g: -0.3 });
  if (name.includes("スパ") || name.includes("トースト") || name.includes("シナモンロール")) nutrition = adjust(nutrition, { calories: 90, protein_g: 2, fat_g: 3, carbs_g: 14, salt_g: 0.3 });
  if (name.includes("ザンギ") || name.includes("ポテト") || name.includes("フライ")) nutrition = adjust(nutrition, { calories: 140, protein_g: 5, fat_g: 8, carbs_g: 12, salt_g: 0.5 });
  if (name.includes("マルゲリータ")) nutrition = adjust(nutrition, { calories: 160, protein_g: 8, fat_g: 6, carbs_g: 18, salt_g: 0.8 });
  if (name.includes("サラダ") || name.includes("ブロッコリー")) nutrition = adjust(nutrition, { calories: -55, protein_g: -1, fat_g: -4, carbs_g: -4, salt_g: -0.2 });

  if (kinds.includes("lunch") || name.includes("セット（みそ汁") || name.includes("ライス＋みそ汁")) {
    nutrition = adjust(nutrition, { calories: 45, protein_g: 3, fat_g: 1.5, carbs_g: 5, salt_g: 1.8 });
  }

  return {
    calories: Math.max(35, Math.round(nutrition.calories)),
    protein_g: Math.max(0, round(nutrition.protein_g)),
    fat_g: Math.max(0, round(nutrition.fat_g)),
    carbs_g: Math.max(0, round(nutrition.carbs_g)),
    salt_g: Math.max(0, round(nutrition.salt_g)),
  };
};

const inferMealType = (kinds: MenuKind[]): MealType => {
  if (kinds.includes("morning")) return "breakfast";
  if (kinds.includes("side") || kinds.includes("salad")) return "snack";
  return "lunch";
};

const inferProfile = ({ name, kinds }: BikkuriDonkeyMenuInput): NutritionEstimateProfile => {
  if (name === "ライス") return "riceBowl";
  if (name.includes("みそ汁") || name.includes("スープ")) return "soup";
  if (kinds.includes("salad") || name.includes("サラダ")) return "salad";
  if (name.includes("カリー") || name.includes("カレー")) return "curryRice";
  if (name.includes("ポテト") || name.includes("ザンギ") || name.includes("フライ") || name.includes("メンチカツ")) return "friedSide";
  if (name.includes("スパ") || name.includes("トースト") || name.includes("シナモンロール")) return "pasta";
  if (kinds.includes("steak") || name.includes("ステーキ")) return "steakPlate";
  if (kinds.includes("dish") || kinds.includes("lunch") || name.includes("ハンバーグ")) return "hamburgerPlate";
  return "riceSetMeal";
};

const item = (input: BikkuriDonkeyMenuInput) => {
  const nutrition = inferNutrition(input);

  return estimatedWithProfileTags({
    brand: "びっくりドンキー",
    name: input.name,
    category: "チェーン店",
    tags: ["ファミレス", "びっくりドンキー", "ハンバーグ", "公式メニュー確認", "栄養推定", ...input.kinds.map((kind) => kindLabels[kind])],
    ...nutrition,
    serving_label: "1品",
    default_meal_type: inferMealType(input.kinds),
    source_url: sourceUrl,
    fetched_at: fetchedAt,
    profile: inferProfile(input),
  });
};

const menus: BikkuriDonkeyMenuInput[] = [
  { name: "ハンバーグ&ビバ！ミートスパ", kinds: ["alacarte"] },
  { name: "ビバ！ミートスパ", kinds: ["alacarte"] },
  { name: "焼きカリーライス", kinds: ["alacarte"] },
  { name: "メンチカツサンド", kinds: ["alacarte", "limited_time"] },
  { name: "おこさまカレー", kinds: ["children"] },
  { name: "おこさまコーンスープ", kinds: ["children"] },
  { name: "おこさまザンギ", kinds: ["children"] },
  { name: "おこさまスパゲティ", kinds: ["children"] },
  { name: "びっくりフライドポテトS", kinds: ["children"] },
  { name: "ぶ〜ちゃんのおこさまランチ", kinds: ["children"] },
  { name: "プチうどん", kinds: ["children"] },
  { name: "いろどりセット エッグ", kinds: ["dish"] },
  { name: "いろどりセット おろしそ", kinds: ["dish"] },
  { name: "いろどりセット チーズ", kinds: ["dish"] },
  { name: "いろどりセット パイン", kinds: ["dish"] },
  { name: "いろどりセット レギュラー", kinds: ["dish"] },
  { name: "エッグカリーバーグディッシュ", kinds: ["dish"] },
  { name: "エッグバーグディッシュ", kinds: ["dish"] },
  { name: "オムデミチーズバーグディッシュ", kinds: ["dish"] },
  { name: "おろしそバーグディッシュ", kinds: ["dish"] },
  { name: "カリーバーグディッシュ", kinds: ["dish"] },
  { name: "ソイカリーバーグディッシュ", kinds: ["dish"] },
  { name: "チーズカリーバーグディッシュ", kinds: ["dish"] },
  { name: "チーズダッカルビ風バーグディッシュ", kinds: ["dish"] },
  { name: "チーズバーグディッシュ", kinds: ["dish"] },
  { name: "パインカリーバーグディッシュ", kinds: ["dish"] },
  { name: "パインバーグディッシュ", kinds: ["dish"] },
  { name: "フォンデュ風チーズバーグディッシュ", kinds: ["dish"] },
  { name: "ポテサラパケットディッシュ", kinds: ["dish"] },
  { name: "ライトセット エッグ", kinds: ["dish"] },
  { name: "ライトセット おろしそ", kinds: ["dish"] },
  { name: "ライトセット チーズ", kinds: ["dish"] },
  { name: "ライトセット パイン", kinds: ["dish"] },
  { name: "ライトセット レギュラー", kinds: ["dish"] },
  { name: "レギュラーバーグディッシュ", kinds: ["dish"] },
  { name: "黒デミバーグディッシュ", kinds: ["dish"] },
  { name: "メンチカツ&ハンバーグディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツおろしそ＆ハンバーグディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツおろしそディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツカリー&ハンバーグディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツカリーディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツペッパーソース&ハンバーグディッシュ", kinds: ["dish", "limited_time"] },
  { name: "メンチカツペッパーソースディッシュ", kinds: ["dish", "limited_time"] },
  { name: "エッグバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "オムデミチーズバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "おろしそバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "チーズバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "パインバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "ハンバーグ&コロコロステーキランチ（ライス＋みそ汁付）", kinds: ["lunch"] },
  { name: "レギュラーバーグディッシュランチ（みそ汁付）", kinds: ["lunch"] },
  { name: "イチゴホイップトーストセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "シナモンロールセット", kinds: ["morning"] },
  { name: "チーズトーストセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（スクランブルエッグ）イチゴホイップトースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（スクランブルエッグ）チーズトースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（スクランブルエッグ）プレーントースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（スクランブルエッグ）ポテサラトースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（目玉焼き）イチゴホイップトースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（目玉焼き）チーズトースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（目玉焼き）プレーントースト", kinds: ["morning"] },
  { name: "ドンキースペシャルブレックファスト（目玉焼き）ポテサラトースト", kinds: ["morning"] },
  { name: "プレーントーストセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ポテサラトーストセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ミニマムエッグバーグディッシュ", kinds: ["morning"] },
  { name: "ミニマムエッグバーグディッシュセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ミニマムおろしそバーグディッシュ", kinds: ["morning"] },
  { name: "ミニマムおろしそバーグディッシュセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ミニマムチーズバーグディッシュ", kinds: ["morning"] },
  { name: "ミニマムチーズバーグディッシュセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ミニマムパインバーグディッシュ", kinds: ["morning"] },
  { name: "ミニマムパインバーグディッシュセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "ミニマムレギュラーバーグディッシュ", kinds: ["morning"] },
  { name: "ミニマムレギュラーバーグディッシュセット（みそ汁orドリンク）", kinds: ["morning"] },
  { name: "卵かけご飯", kinds: ["morning"] },
  { name: "乳･小麦･卵を使わないハンバーグ", kinds: ["no_milk_wheat_egg"] },
  { name: "乳･小麦･卵を使わないハンバーグ(ライス・サラダ小盛)", kinds: ["no_milk_wheat_egg"] },
  { name: "コーンスープ", kinds: ["rice_set"] },
  { name: "サラダ・みそ汁セット", kinds: ["rice_set"] },
  { name: "ドンキーセット", kinds: ["rice_set"] },
  { name: "みそ汁", kinds: ["rice_set"] },
  { name: "ライス", kinds: ["rice_set"] },
  { name: "シーザーサラダ", kinds: ["salad"] },
  { name: "ディッシュサラダ", kinds: ["salad"] },
  { name: "ネギ塩サラダ", kinds: ["salad"] },
  { name: "マーメイドサラダ", kinds: ["salad"] },
  { name: "イカの箱舟", kinds: ["side"] },
  { name: "オーロラシュリンプ＆ポテト", kinds: ["side"] },
  { name: "カリーソース", kinds: ["side"] },
  { name: "ザンギ＆ポテト", kinds: ["side"] },
  { name: "スパイシーポテト", kinds: ["side"] },
  { name: "チーズソース", kinds: ["side"] },
  { name: "びっくりフライドポテト", kinds: ["side"] },
  { name: "ブロッコリーの箱舟", kinds: ["side"] },
  { name: "マカロニ＆チーズ", kinds: ["side"] },
  { name: "薪窯マルゲリータ", kinds: ["side"] },
  { name: "メンチカツ(単品)", kinds: ["side", "limited_time"] },
  { name: "エッグバーグステーキ", kinds: ["steak"] },
  { name: "おろしそバーグステーキ", kinds: ["steak"] },
  { name: "ガーリックチキン＆ハンバーグステーキ", kinds: ["steak"] },
  { name: "ガーリックチキンステーキ", kinds: ["steak"] },
  { name: "コロコロステーキ", kinds: ["steak"] },
  { name: "チーズバーグステーキ", kinds: ["steak"] },
  { name: "ねぎポンおろしバーグステーキ", kinds: ["steak"] },
  { name: "パインバーグステーキ", kinds: ["steak"] },
  { name: "ハンバーグ&コロコロステーキ", kinds: ["steak"] },
  { name: "びっくりエビフライ＆ハンバーグステーキ", kinds: ["steak"] },
  { name: "フォンデュ風チーズバーグステーキ", kinds: ["steak"] },
  { name: "レギュラーバーグステーキ", kinds: ["steak"] },
  { name: "黒デミバーグステーキ", kinds: ["steak"] },
  { name: "エッグハンバーグ", kinds: ["takeout"] },
  { name: "おこさまランチ", kinds: ["takeout"] },
  { name: "ガーリックチキン", kinds: ["takeout"] },
  { name: "ガーリックチキン＆ハンバーグ", kinds: ["takeout"] },
  { name: "カップサラダ", kinds: ["takeout"] },
  { name: "チーズハンバーグ", kinds: ["takeout"] },
  { name: "パインハンバーグ", kinds: ["takeout"] },
  { name: "びっくりエビフライ＆ハンバーグ", kinds: ["takeout"] },
  { name: "フォンデュ風チーズハンバーグ", kinds: ["takeout"] },
  { name: "ボックスサラダ", kinds: ["takeout"] },
  { name: "ポテサラパケットバーグ", kinds: ["takeout"] },
  { name: "レギュラーハンバーグ", kinds: ["takeout"] },
  { name: "黒デミバーグ", kinds: ["takeout"] },
  { name: "おろしそ", kinds: ["takeout", "limited_time"] },
  { name: "パーティーセット", kinds: ["takeout", "limited_time"] },
  { name: "ペッパーソース", kinds: ["takeout", "limited_time"] },
  { name: "メンチカツ", kinds: ["takeout", "limited_time"] },
];

export const bikkuriDonkeyMenuFoods = menus.map(item);

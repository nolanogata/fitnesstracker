import type { MenuItem } from "../types";

export type ChainComboMainFamily = "noodle" | "udon_soba" | "pasta" | "burger" | "sandwich" | "rice_bowl" | "curry" | "steak" | "set_meal" | "bento" | "pizza" | "sushi" | "rice" | "plate";
export type ChainComboSideKind = "set_bundle" | "dumpling" | "fried_rice" | "rice" | "fries" | "fried_side" | "tempura" | "soup" | "salad" | "topping" | "drink" | "dessert" | "small_side";

export type ChainComboMenuProfile = {
  mainFamily?: ChainComboMainFamily;
  sideKind?: ChainComboSideKind;
  completeSet: boolean;
  sideSized: boolean;
  shareableSide: boolean;
  carbHeavy: boolean;
};

type ComboItem = { item: MenuItem; role: "main" | "side" };

export function chainComboMenuText(item: MenuItem) {
  return [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
}

export function getChainComboMenuProfile(item: MenuItem): ChainComboMenuProfile {
  const text = chainComboMenuText(item);
  const mainFamily = detectMainFamily(text);
  const completeSet = /セット|コンビ|定食|プレート|ディッシュ/.test(text) && !!mainFamily;
  const sideSized = /ミニ|小盛|小サイズ|ハーフ|半分|半炒飯|半チャーハン|サイド|トッピング|追加|小鉢|単品/.test(text);
  const sideKind = detectSideKind(text, mainFamily);
  const shareableSide = !!sideKind && (
    /(?:10|12|15|20|24|30)\s*(?:個|本|ピース)|ファミリー|シェア|大皿|バーレル/.test(text)
    || (["dumpling", "fries", "fried_side"].includes(sideKind) && item.calories >= 520)
  );
  return {
    mainFamily,
    sideKind,
    completeSet,
    sideSized,
    shareableSide,
    carbHeavy: mainFamily !== undefined || sideKind === "fried_rice" || sideKind === "rice" || sideKind === "fries",
  };
}

export function isSemanticChainComboMain(item: MenuItem) {
  if (item.calories <= 0) return false;
  const profile = getChainComboMenuProfile(item);
  if (profile.mainFamily && !(profile.sideSized && profile.sideKind)) return true;
  return !profile.sideKind && item.calories >= 320;
}

export function isSemanticChainComboSide(item: MenuItem) {
  if (item.calories <= 0) return false;
  const profile = getChainComboMenuProfile(item);
  if (!profile.sideKind) return false;
  if (profile.mainFamily && !profile.sideSized && profile.sideKind !== "fried_rice") return false;
  return true;
}

export function isPlausibleChainCombo(items: ComboItem[]) {
  const main = items.find((item) => item.role === "main");
  if (!main) return false;
  const mainProfile = getChainComboMenuProfile(main.item);
  const sides = items.filter((item) => item.role === "side");
  const sideProfiles = sides.map((side) => getChainComboMenuProfile(side.item));

  if (sideProfiles.some((profile) => profile.shareableSide)) return false;
  if (sideProfiles.some((profile) => profile.mainFamily && !profile.sideKind)) return false;
  if (sideProfiles.some((profile) => profile.mainFamily === mainProfile.mainFamily && profile.sideKind !== "topping")) return false;
  if (mainProfile.mainFamily !== "noodle" && sideProfiles.some((profile) => profile.sideKind === "fried_rice")) return false;
  if (["rice_bowl", "curry", "rice"].includes(mainProfile.mainFamily ?? "") && sideProfiles.some((profile) => profile.sideKind === "rice" || profile.sideKind === "fried_rice")) return false;

  const sideKinds = sideProfiles.map((profile) => profile.sideKind).filter(Boolean);
  if (new Set(sideKinds).size !== sideKinds.length) return false;
  if (sideProfiles.filter((profile) => profile.carbHeavy).length >= 2) return false;
  if (mainProfile.completeSet && sideProfiles.some((profile) => profile.sideKind === "set_bundle")) return false;
  return true;
}

export function getChainComboSemanticAdjustment(items: ComboItem[]) {
  const main = items.find((item) => item.role === "main");
  if (!main) return 4;
  const mainProfile = getChainComboMenuProfile(main.item);
  const sides = items.filter((item) => item.role === "side").map((item) => getChainComboMenuProfile(item.item));
  let score = mainProfile.completeSet ? completeSetAdjustment(mainProfile.mainFamily) : 0;
  sides.forEach((side) => { score += sideAdjustment(mainProfile.mainFamily, side.sideKind); });
  if (!sides.length && !mainProfile.completeSet) score += 0.24;
  if (sides.length === 2) score += 0.08;
  return score;
}

export function getChainComboSemanticReason(items: ComboItem[]) {
  const main = items.find((item) => item.role === "main");
  if (!main) return "食べ方を調整";
  const mainProfile = getChainComboMenuProfile(main.item);
  const sideKinds = items.filter((item) => item.role === "side").map((item) => getChainComboMenuProfile(item.item).sideKind);
  if (mainProfile.completeSet && !sideKinds.length) return "セットでまとまる";
  if (sideKinds.includes("set_bundle")) return "定番セット";
  if (sideKinds.includes("dumpling")) return "餃子を追加";
  if (sideKinds.includes("fried_rice")) return "炒飯を追加";
  if (sideKinds.includes("topping")) return "トッピングで調整";
  if (sideKinds.includes("fries") || sideKinds.includes("fried_side") || sideKinds.includes("tempura")) return "定番サイド";
  if (sideKinds.includes("soup") || sideKinds.includes("salad")) return "汁物・野菜を追加";
  if (sideKinds.length) return "サイドで調整";
  return "単品で近い";
}

function detectMainFamily(text: string): ChainComboMainFamily | undefined {
  if (/ラーメン|らーめん|中華麺|ワンタン麺|ワンタンメン|ちゃんぽん|タンメン|担々麺|つけ麺|油そば/.test(text)) return "noodle";
  if (/うどん|そば|蕎麦/.test(text)) return "udon_soba";
  if (/パスタ|スパゲティ|スパゲッティ/.test(text)) return "pasta";
  if (/ハンバーガー|バーガー/.test(text)) return "burger";
  if (/サンドイッチ|サンド/.test(text)) return "sandwich";
  if (/カレー/.test(text)) return "curry";
  if (/ステーキ|ハンバーグ|ハンバーグディッシュ|バーグ/.test(text)) return "steak";
  if (/定食/.test(text)) return "set_meal";
  if (/弁当/.test(text)) return "bento";
  if (/ピザ|ピッツァ/.test(text)) return "pizza";
  if (/寿司|すし|握り|軍艦/.test(text)) return "sushi";
  if (/チャーハン|炒飯|焼きめし/.test(text)) return "rice";
  if (/丼|牛めし|豚めし|ビビンバ|クッパ/.test(text)) return "rice_bowl";
  if (/プレート|ディッシュ/.test(text)) return "plate";
  return undefined;
}

function detectSideKind(text: string, mainFamily?: ChainComboMainFamily): ChainComboSideKind | undefined {
  if (!mainFamily && /(?:ポテト|サイド|サラダ|スープ|ドリンク|ライス).{0,10}セット|セット(?:ポテト|サイド|サラダ|スープ|ドリンク|ライス)|ライス・スープセット/.test(text)) return "set_bundle";
  if (/餃子|ぎょうざ|焼売|シュウマイ/.test(text)) return "dumpling";
  if (/チャーハン|炒飯|焼きめし/.test(text)) return "fried_rice";
  if (/フライドポテト|ポテトフライ|マックフライポテト|フレンチフライ|ポテト(?:\s|（|\(|S|M|L|$)|ナゲット/.test(text)) return "fries";
  if (/天ぷら|かしわ天|ちくわ天|かき揚げ/.test(text)) return "tempura";
  if (/唐揚げ|からあげ|フライドチキン|コロッケ|春巻/.test(text)) return "fried_side";
  if (/スープ|味噌汁|みそ汁|豚汁|汁物/.test(text)) return "soup";
  if (/サラダ|野菜|コールスロー/.test(text)) return "salad";
  if (/トッピング|追加|味玉|煮卵|温玉|玉子|卵|チーズ|ソース|肉増し|ねぎトッピング|追加ねぎ|ねぎ追加|海苔トッピング/.test(text)) return "topping";
  if (/ミニ丼|小丼|小ライス|ライス|ご飯|白米/.test(text) && !mainFamily) return "rice";
  if (/ドリンク|コーヒー|紅茶|ジュース|シェイク/.test(text)) return "drink";
  if (/デザート|アイス|ケーキ|プリン|ドーナツ/.test(text)) return "dessert";
  if (/サイド|小鉢|単品/.test(text) && !mainFamily) return "small_side";
  return undefined;
}

function completeSetAdjustment(family?: ChainComboMainFamily) {
  if (family === "burger" || family === "sandwich") return -0.85;
  if (family === "steak" || family === "set_meal" || family === "plate") return -0.55;
  return -0.28;
}

function sideAdjustment(family: ChainComboMainFamily | undefined, side?: ChainComboSideKind) {
  if (!side) return 0.35;
  const weights: Partial<Record<ChainComboMainFamily, Partial<Record<ChainComboSideKind, number>>>> = {
    noodle: { dumpling: -1.05, fried_rice: -0.7, topping: -0.62, salad: -0.25, soup: 0.35, rice: -0.2 },
    udon_soba: { tempura: -0.95, topping: -0.7, rice: -0.48, fried_side: -0.35, salad: -0.2 },
    burger: { set_bundle: -1.45, fries: -1.3, drink: -0.88, salad: -0.82, fried_side: -0.12 },
    sandwich: { set_bundle: -1, soup: -0.62, salad: -0.52, drink: -0.4 },
    rice_bowl: { topping: -0.9, soup: -0.72, salad: -0.48, small_side: -0.35 },
    curry: { topping: -0.92, salad: -0.58, soup: -0.34, fried_side: -0.26 },
    steak: { set_bundle: -1.05, rice: -0.78, soup: -0.58, salad: -0.58, topping: -0.3 },
    set_meal: { small_side: -0.4, topping: -0.3, salad: -0.18, soup: 0.08, rice: 0.5 },
    pasta: { salad: -0.72, soup: -0.62, topping: -0.42, small_side: -0.3 },
    pizza: { salad: -0.7, drink: -0.45, soup: -0.3 },
    sushi: { soup: -0.72, salad: -0.34, small_side: -0.38, dessert: -0.18 },
    bento: { soup: -0.42, salad: -0.35, small_side: -0.25 },
  };
  return weights[family ?? "plate"]?.[side] ?? 0.12;
}

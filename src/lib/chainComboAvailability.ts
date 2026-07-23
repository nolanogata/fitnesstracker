import type { MenuItem } from "../types";

export type ChainComboServiceMode = "dine_in" | "takeout";
export type ChainComboMealPeriod = "breakfast" | "lunch" | "dinner";
export type ChainComboServiceRestriction = "any" | "dine_in_only" | "takeout_only";
export type ChainComboMealRestriction = "any" | "regular" | ChainComboMealPeriod;

const takeoutPattern = /テイクアウト|持ち帰り|持帰り|お持ち帰り|to\s*go|デリバリー|宅配/i;
const dineInPattern = /イートイン|店内飲食|店内限定|店内専用/i;
const breakfastPattern = /モーニング|朝食|朝定食|朝セット|朝メニュー|朝限定|朝マック|ブレックファスト|breakfast/i;
const lunchPattern = /ランチ|昼限定|昼メニュー/i;
const dinnerPattern = /ディナー|夜限定|夜メニュー|夕食限定/i;
const mcdonaldsRegularPattern = /バーガー|マックフライポテト|マックシェイク|マックフルーリー|ソフトツイスト|マックフロート/i;

export function chainComboAvailabilityText(item: MenuItem) {
  return [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
}

export function getChainComboServiceRestriction(item: MenuItem): ChainComboServiceRestriction {
  const text = chainComboAvailabilityText(item);
  const isTakeout = takeoutPattern.test(text);
  const isDineIn = dineInPattern.test(text);
  if (isTakeout && !isDineIn) return "takeout_only";
  if (isDineIn && !isTakeout) return "dine_in_only";
  return "any";
}

export function getChainComboMealRestriction(item: MenuItem): ChainComboMealRestriction {
  const text = chainComboAvailabilityText(item);
  if (breakfastPattern.test(text)) return "breakfast";
  if (lunchPattern.test(text)) return "lunch";
  if (dinnerPattern.test(text)) return "dinner";
  if (item.default_meal_type === "breakfast") return "breakfast";
  if (item.brand === "マクドナルド" && mcdonaldsRegularPattern.test(text)) return "regular";
  return "any";
}

export function isChainComboItemAvailable(item: MenuItem, context: {
  serviceMode: ChainComboServiceMode;
  mealPeriod: ChainComboMealPeriod;
}) {
  const service = getChainComboServiceRestriction(item);
  if (service === "takeout_only" && context.serviceMode !== "takeout") return false;
  if (service === "dine_in_only" && context.serviceMode !== "dine_in") return false;

  const meal = getChainComboMealRestriction(item);
  if (meal === "regular") return context.mealPeriod !== "breakfast";
  return meal === "any" || meal === context.mealPeriod;
}

export function getDefaultChainComboServiceMode(item?: MenuItem): ChainComboServiceMode {
  return item && getChainComboServiceRestriction(item) === "takeout_only" ? "takeout" : "dine_in";
}

export function getDefaultChainComboMealPeriod(item: MenuItem | undefined, hour: number): ChainComboMealPeriod {
  if (item) {
    const restriction = getChainComboMealRestriction(item);
    if (restriction === "regular") return hour >= 17 || hour < 5 ? "dinner" : "lunch";
    if (restriction !== "any") return restriction;
  }
  if (hour >= 5 && hour < 11) return "breakfast";
  if (hour >= 17 || hour < 5) return "dinner";
  return "lunch";
}

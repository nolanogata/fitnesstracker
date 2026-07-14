import type { MenuItem, NutritionMeta } from "../types";

export type BaskinRobbinsContainerId = "cup" | "sugar_cone" | "waffle_cone";

export type BaskinRobbinsContainerOption = {
  id: BaskinRobbinsContainerId;
  label: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g: number;
  uncertainty: { protein_g: number; fat_g: number; carbs_g: number };
};

export const baskinRobbinsContainerOptions: BaskinRobbinsContainerOption[] = [
  { id: "cup", label: "カップ", calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0, salt_g: 0, uncertainty: { protein_g: 0, fat_g: 0, carbs_g: 0 } },
  { id: "sugar_cone", label: "シュガーコーン", calories: 50, protein_g: 1, fat_g: 0.5, carbs_g: 10.4, salt_g: 0.1, uncertainty: { protein_g: 0.2, fat_g: 0.2, carbs_g: 1 } },
  { id: "waffle_cone", label: "ワッフルコーン", calories: 101, protein_g: 1.5, fat_g: 2.5, carbs_g: 18.1, salt_g: 0.15, uncertainty: { protein_g: 0.3, fat_g: 0.5, carbs_g: 1.8 } },
];

export function isBaskinRobbinsFlavor(item?: Pick<MenuItem, "brand" | "tags">) {
  return item?.brand === "サーティワン" && item.tags.includes("フレーバー");
}

export function addBaskinRobbinsContainerNutrition<T extends {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
}>(nutrition: T, container: BaskinRobbinsContainerOption): T {
  return {
    ...nutrition,
    calories: Math.round(nutrition.calories + container.calories),
    protein_g: round1(nutrition.protein_g + container.protein_g),
    fat_g: round1(nutrition.fat_g + container.fat_g),
    carbs_g: round1(nutrition.carbs_g + container.carbs_g),
    salt_g: round2((nutrition.salt_g ?? 0) + container.salt_g),
  };
}

export function addBaskinRobbinsContainerMeta(meta: NutritionMeta | undefined, container: BaskinRobbinsContainerOption): NutritionMeta | undefined {
  if (container.id === "cup") return meta;
  const proteinUncertainty = round1((meta?.uncertainty?.protein_g ?? 0) + container.uncertainty.protein_g);
  const fatUncertainty = round1((meta?.uncertainty?.fat_g ?? 0) + container.uncertainty.fat_g);
  const carbsUncertainty = round1((meta?.uncertainty?.carbs_g ?? 0) + container.uncertainty.carbs_g);
  return {
    ...meta,
    origin: "official_website",
    estimation_policy: "calories_exact_macros_estimated",
    uncertainty: {
      calories: meta?.uncertainty?.calories ?? 0,
      protein_g: proteinUncertainty,
      fat_g: fatUncertainty,
      carbs_g: carbsUncertainty,
    },
    explicit_uncertainty: true,
    evidence_note: `フレーバーと${container.label}のカロリーは公式値。コーンのPFCは食品構成からの推定。`,
    nutrient_evidence: {
      ...meta?.nutrient_evidence,
      calories: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
      protein_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated", uncertainty: { minus: proteinUncertainty, plus: proteinUncertainty } },
      fat_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated", uncertainty: { minus: fatUncertainty, plus: fatUncertainty } },
      carbs_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated", uncertainty: { minus: carbsUncertainty, plus: carbsUncertainty } },
    },
    components: [
      ...(meta?.components ?? []),
      {
        name: container.label,
        calories: container.calories,
        protein_g: container.protein_g,
        fat_g: container.fat_g,
        carbs_g: container.carbs_g,
        source_url: "https://www.br31.jp/contents/calorieallergy/energy/",
        nutrition_meta: {
          origin: "official_website",
          estimation_policy: "calories_exact_macros_estimated",
          evidence_note: "カロリーは公式値。PFCは食品構成からの推定。",
          nutrient_evidence: {
            calories: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
            protein_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
            fat_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
            carbs_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
          },
        },
      },
    ],
  };
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

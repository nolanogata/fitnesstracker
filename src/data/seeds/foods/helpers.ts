import type { MenuItem, NutritionMeta } from "../../../types.ts";
import { stableIdWithHash } from "../../../lib/ids.ts";

type SeedInput = Omit<MenuItem, "id" | "created_at" | "updated_at" | "is_public_preset" | "is_user_created" | "is_favorite"> & {
  is_favorite?: boolean;
};

export const makeMenuSeed = (input: SeedInput): MenuItem => {
  const timestamp = "2026-01-01T00:00:00.000Z";
  return {
    id: stableIdWithHash("menu", [input.brand, input.name, input.serving_label, input.data_source]),
    ...input,
    nutrition_meta: input.nutrition_meta ?? inferSeedNutritionMeta(input),
    is_public_preset: input.data_source !== "user",
    is_user_created: false,
    is_favorite: input.is_favorite ?? false,
    created_at: timestamp,
    updated_at: timestamp,
  };
};

function inferSeedNutritionMeta(input: SeedInput): NutritionMeta | undefined {
  if (input.data_source === "official") {
    return {
      origin: "official_website",
      estimation_policy: "exact",
      uncertainty: { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 },
      explicit_uncertainty: true,
      nutrient_evidence: {
        calories: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
        protein_g: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
        fat_g: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
        carbs_g: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
      },
    };
  }
  if (input.data_source !== "estimated" || !input.tags.includes("公式カロリー")) return undefined;
  return {
    origin: "official_website",
    estimation_policy: "calories_exact_macros_estimated",
    evidence_note: "公式カロリーを採用。PFCは食品構成からの推定。",
    nutrient_evidence: {
      calories: { origin: "official_website", confidence: "high", estimation_policy: "exact", uncertainty: { minus: 0, plus: 0 } },
      protein_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
      fat_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
      carbs_g: { origin: "derived_calculation", confidence: "medium", estimation_policy: "estimated" },
    },
  };
}

export const estimated = (input: Omit<SeedInput, "data_source" | "confidence">) =>
  makeMenuSeed({ ...input, data_source: "estimated", confidence: "medium" });

export const official = (input: Omit<SeedInput, "data_source" | "confidence">) =>
  makeMenuSeed({ ...input, data_source: "official", confidence: "high" });

export const unofficial = (input: Omit<SeedInput, "data_source" | "confidence">) =>
  makeMenuSeed({ ...input, data_source: "unofficial", confidence: "medium" });

export const quick = (input: Omit<SeedInput, "data_source" | "confidence" | "category">) =>
  makeMenuSeed({
    ...input,
    category: "クイック見積",
    data_source: "quick_estimate",
    confidence: "low",
  });

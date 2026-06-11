import type { MenuItem } from "../../../types";
import { stableId } from "../../../lib/ids";

type SeedInput = Omit<MenuItem, "id" | "created_at" | "updated_at" | "is_public_preset" | "is_user_created" | "is_favorite"> & {
  is_favorite?: boolean;
};

export const makeMenuSeed = (input: SeedInput): MenuItem => {
  const timestamp = "2026-01-01T00:00:00.000Z";
  return {
    id: stableId("menu", [input.brand, input.name, input.serving_label, input.data_source]),
    ...input,
    is_public_preset: input.data_source !== "user",
    is_user_created: false,
    is_favorite: input.is_favorite ?? false,
    created_at: timestamp,
    updated_at: timestamp,
  };
};

export const estimated = (input: Omit<SeedInput, "data_source" | "confidence">) =>
  makeMenuSeed({ ...input, data_source: "estimated", confidence: "medium" });

export const official = (input: Omit<SeedInput, "data_source" | "confidence">) =>
  makeMenuSeed({ ...input, data_source: "official", confidence: "high" });

export const quick = (input: Omit<SeedInput, "data_source" | "confidence" | "category">) =>
  makeMenuSeed({
    ...input,
    category: "クイック見積",
    data_source: "quick_estimate",
    confidence: "low",
  });

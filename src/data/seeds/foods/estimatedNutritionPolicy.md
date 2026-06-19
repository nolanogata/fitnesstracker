# Estimated Nutrition Policy

This app uses estimated nutrition only when official kcal/P/F/C values are not available or not yet verified.

Estimated values must be useful for daily logging, but must never be presented as verified official nutrition.

## Source Levels

- `official/high`: official kcal/P/F/C values from brand nutrition pages, PDFs, or product labels.
- `unofficial/medium`: third-party nutrition source, not brand-verified.
- `estimated/medium`: official menu/product name or official kcal was checked, but at least one nutrition value is estimated.
- `quick_estimate/low`: generic fallback for manual rough logging.

## Estimation Profiles

Shared profile logic lives in `estimationProfiles.ts`.

Each profile defines:

- kcal-to-P/F/C ratio
- human-readable method label
- kcal/macros consistency tolerance

The profile helper adds searchable tags such as:

- `推定方式:つけ麺`
- `PFC比率推定`
- `kcal整合:0%`

This gives future seed rows a traceable reason instead of silent hand-entered P/F/C.

## Current Profile Families

- Rice and plate meals: `pepperRice`, `curryRice`, `riceSetMeal`
- Meat plates: `steakPlate`, `hamburgerPlate`, `meatSetMeal`
- Noodles: `tsukemen`, `ramen`, `pasta`, `creamPasta`, `oilPasta`
- Pizza and sides: `pizza`, `thinPizza`, `gyoza`, `friedSide`, `friedRice`, `salad`
- Set meals: `fishSetMeal`, `meatSetMeal`, `riceSetMeal`

## Migration Status

Migrated to shared profiles:

- `pepperLunchTsukemenMenus.ts`: Pepper Lunch, Sharin, Mita Seimen official-name rows.

Already partially structured but still local to its file:

- `italianRestaurantMenus.ts`: Popolamama has local kcal-to-P/F/C profile logic. Move this to shared profiles when that file is next edited.

Needs later cleanup:

- Older broad chain estimates that manually entered kcal/P/F/C without `推定方式:*` tags.
- Generic food presets in `generic.ts` and `genericKonamono.ts`; these are practical defaults, so migration should be conservative.
- Store-scoped menus where rice size or side contents vary by location.

## Rules For New Estimated Rows

1. Prefer official nutrition over estimation whenever available.
2. If only official kcal is available, use kcal as fixed and estimate P/F/C via a profile.
3. If only official menu name is available, estimate kcal and then derive P/F/C via a profile.
4. Keep `source_url` and `fetched_at` for official-name or official-kcal rows.
5. Add `公式メニュー確認` or `公式商品確認` only when the name was checked on an official source.
6. Add `公式カロリー` only when kcal came from an official source.
7. Keep `栄養推定` on every non-official nutrition row.
8. For set meals, make rice or noodle amount explicit in `serving_label` when known or assumed.

## Risk Notes

- Noodles, steak plates, and set meals can vary by 15-25% because oil, sauce, soup, rice, and noodle weights are rarely disclosed.
- Estimated salt is especially approximate unless an official allergen/nutrition PDF provides it.
- A later schema should separate kcal source quality from P/F/C source quality. Current `data_source` applies to the whole row, so mixed official-kcal/PFC-estimated rows must remain `estimated/medium`.


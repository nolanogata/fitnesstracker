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

- Rice and plate meals: `pepperRice`, `curryRice`, `riceBowl`, `sushiRiceBowl`, `riceSetMeal`
- Meat plates: `steakPlate`, `hamburgerPlate`, `burger`, `meatSetMeal`
- Noodles: `tsukemen`, `ramen`, `sobaNoodle`, `pasta`, `creamPasta`, `oilPasta`
- Pizza, bread, and sides: `pizza`, `thinPizza`, `bread`, `gyoza`, `friedSide`, `fries`, `friedRice`, `salad`
- Set meals and small items: `fishSetMeal`, `meatSetMeal`, `riceSetMeal`, `proteinTopping`, `soup`, `onigiri`
- Other: `dessert`, `konamono`, `drink`
- Generic-only support profiles: `plainRice`, `dairy`, `fruit`, `snack`, `alcohol`, `supplement`, `vegetableSide`

## Migration Status

Migrated to shared profiles:

- `pepperLunchTsukemenMenus.ts`: Pepper Lunch, Sharin, Mita Seimen official-name rows.
- `panchoMenu.ts`: official-name pasta rows now keep existing estimates and add shared profile evidence tags.
- Bikkuri Donkey, Popolamama, Joyfull, Denny's, Royal Host, Marugame Seimen, Olive no Oka, and Tonden now use full official-source replacements instead of their older estimated seed rows.
- `familyRestaurantMenus.ts`: broad family-restaurant estimates now add shared profile evidence tags.
- `italianRestaurantMenus.ts`: Popolamama local kcal-to-P/F/C logic now uses shared profiles; older manually estimated Italian rows add shared profile evidence tags.
- `komerakuMenu.ts`: existing rice/seafood estimate values are preserved; rows now add shared profile evidence tags.
- Older Tonden estimates remain only as source history and are not loaded into the catalog.
- `bamiyanMenu.ts`: Chinese restaurant estimates now add profile evidence by ramen, dumpling, fried side, fried rice, dessert, or meat set type.
- `fastFood.ts`, `gyudon.ts`, `teishoku.ts`, `familyRestaurant.ts`, `cafe.ts`: broad chain fallback estimates now add profile evidence tags while preserving existing kcal/P/F/C values.
- `konamonoChains.ts`, `monsoonCafeMenu.ts`, `udon.ts`, `sushiChains.ts`: official-name/manual-PFC chain estimates now add shared profile evidence by menu type.
- `donutChains.ts`, `cafeMenus.ts`, `costcoFoodCourt.ts`, `dailyChainsOfficial.ts`, `shinpachiEstimated.ts`: remaining chain-scoped estimated rows now use shared profile evidence tags; official rows remain official.
- `generic.ts`: generic fallback menu rows now keep their existing kcal/P/F/C values while adding inferred profile evidence tags by category, name, tags, and serving label.
- `genericKonamono.ts`: generic powder/flour-based menu rows now add profile evidence tags while keeping existing kcal/P/F/C values.
- `frozenFoods.ts`, `pantryProducts.ts`, `proteinProducts.ts`, `hokkaidoTravelFoods.ts`: package, pantry, protein, frozen, and travel-food estimates now preserve existing values while adding shared profile evidence tags.

Needs later cleanup:

- Store-scoped menus where rice size or side contents vary by location.
- Mixed staple sets should keep editable staple components explicit, for example noodle amount and rice/bowl amount on the same item.
- Brands without full official PFC must remain estimated even when official menu names, kcal, salt, or sizes are available.

## Branded size rule

Do not infer a restaurant size range from a food name alone. Branded noodle, rice, and meat adjustments require an explicit verified tag or separate published size rows. `公式サイズのみ` rows must never expose generic 75%, 135%, 100g, or 300g choices that the restaurant does not sell.

## Generic Preset Rule

Generic presets are practical logging defaults, not official nutrition.

For these rows, avoid aggressive numeric rewrites. Prefer preserving the existing kcal/P/F/C and adding inference evidence via `genericEstimated` or a similar wrapper. This keeps search and AI-photo matching stable while making later cleanup possible by profile family.

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

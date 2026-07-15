# Food seed coverage report

Generated: 2026-07-16

## Summary

The bundled catalog currently contains 6,290 public rows: 4,674 official, 1,585 estimated, 11 unofficial, and 20 quick-estimate rows. An item is promoted to `official` only when kcal, protein, fat, carbohydrate, and salt come from the same official source.

All 69 brands exposed by the chain selector are now registered in `catalogRegistry.ts`: 20 have full official coverage, 10 have official core coverage, 1 has current names with estimated nutrition, 1 is a verified local-store catalog, and 37 remain explicitly marked for review. The registry prevents unreviewed brands from being silently presented as current. A build test fails when an official catalog is older than its refresh window or drops below its expected row count.

Seasonal, limited-time, and limited-quantity rows are automatically hidden from the public seed catalog after 30 days unless their source is refreshed. This prevents old promotions from remaining indefinitely while retaining a deterministic source record for later re-import.

## 2026-07-16 refresh

| Brand | Public rows | Refresh method |
| --- | ---: | --- |
| MOS Burger | 169 | Regenerated from the current official nutrition PDF |
| KFC | 35 | Regenerated from the current official nutrition PDF |
| Tully's | 160 | Regenerated from the current official food and drink PDFs |
| Seven-Eleven / FamilyMart / Lawson / MiniStop | 21 | Retained only products with an individual official product or nutrition source |

Convenience rows such as generic "bento" or "protein drink" entries are no longer published under a convenience-chain brand. They remain available only through generic food categories where appropriate.

## Official source refresh

| Brand | Official rows | Current source |
| --- | ---: | --- |
| びっくりドンキー | 343 | Official nutrition PDF updated 2026-06-10 |
| ポポラマーマ | 203 | Official nutrition PDF for 2026-06 |
| ジョイフル | 284 | Official allergen/nutrition PDF |
| デニーズ | 380 | Official nutrition PDF updated 2026-07-08 |
| ロイヤルホスト | 321 | Official allergen/nutrition PDF updated 2026-06-30 |
| 丸亀製麺 | 135 | Current official product pages, including size and temperature variants |
| オリーブの丘 | 195 | Official nutrition PDF updated 2026-07-01 |
| とんでん | 346 | Official nutrition/allergen PDF updated 2026-06-09 |

These 2,207 rows replace the older estimated rows for the same brands. The refresh includes current sides, toppings, drinks, kids items, breakfast, takeout rows where separately published, and seasonal items present in the source.

## Size and customization audit

- Branded items no longer receive arbitrary noodle, rice, steak, hamburger, or chicken sizes just because a food word or gram value appears in the name.
- Exact published variants use separate source rows and are grouped into one size selector. Supported labels include `小/並/中/大/得/特大`, `S/M/L/XL`, `温/冷`, and published cooked or dry noodle grams.
- `公式サイズのみ` disables heuristic scaling. Quantity can still be changed after the published size is chosen.
- Mamma Pasta uses cooked pasta 250g for standard and 375g for large. Only the pasta component is increased by 1.5x; sauce and toppings remain fixed.
- Spajiro uses the published dry-pasta sizes S 100g, M 120g, L 170g, and XL 240g.
- Pancho uses cooked sizes 300g, 400g, 500g, and 600g.
- Sharin and Mita Seimen use only the size ranges shown by their official menu materials.

## Remaining estimated brands

The largest restaurant groups still using estimated PFC are Komeraku, Mita Seimen, Triton, Sharin, Shinpachi Shokudo, Monsoon Cafe, Pepper Lunch, Hama Sushi, Spajiro, Kando Niku to Kome, Sushiro, Bamiyan, Pancho, and Capricciosa.

The official sources for these brands currently expose one or more of: menu names, allergens, kcal, salt, or published sizes, but not a complete same-source kcal/P/F/C/salt table. They therefore remain `estimated` even when names and sizes were verified. Skylark explicitly describes its restaurant nutrition display as principally calorie and salt; Komeraku's current PDF is an allergen table; Hama Sushi and Sushiro do not publish full PFC for restaurant menus.

## Validation

Run `npm run audit:food-seeds` before release. It checks numeric fields, provenance, duplicate natural keys, minimum source coverage, and common PDF extraction failures such as unresolved ditto marks or repeated takeout prefixes.

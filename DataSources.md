# Food Data Source Policy

Phase Log Local keeps bundled food data in two layers:

- `official/high`: copied from a brand's official nutrition page or PDF, with `source_url` and `fetched_at`.
- `estimated/medium` or `quick_estimate/low`: practical logging fallback, never presented as verified.

## Priority Official Sources

- KFC: official nutrition PDF. Added selected core items from the 2026-06-03 nutrition sheet.
- 松屋: official allergen/nutrition pages. Added 牛めし and チーズ牛めし from the 2026-06-09 values.
- 吉野家: official nutrition/allergen PDF. Added 牛丼 core sizes from the 2026-06-04 values.
- マクドナルド: official product nutrition pages. Added selected burger and side core items from product pages checked on 2026-06-12.
- サブウェイ: official nutrition PDF. Added selected sandwiches and potato sides from the 2026-06-10 nutrition sheet.
- なか卯: official nutrition PDF. Added representative parent bowls, beef bowls, katsudon, karaage bowl, and udon items from the 2026-06-10 sheet.
- やよい軒: official Tokyo nutrition table. Added representative teishoku, fish meals, and donburi items from the 2026-06-01 table.
- すき家: official menu pages and nutrition list links.
- 大戸屋: official menu page is store-scoped and warns menus differ by store. Added selected official-menu-name entries as `estimated/medium` only; P/F/C values are not official.
- しんぱち食堂: official site menu lists fish set meals. Added selected official-menu-name entries as `estimated/medium` only; P/F/C values are not official.
- 丸亀製麺: official menu and allergen pages were verified. Official P/F/C table was not found in the current pass.
- ウエスト: official menu page is store-scoped. Official P/F/C table was not verified in the current pass.
- 資さんうどん: official menu page is store-scoped. Official P/F/C table was not verified in the current pass.
- Convenience stores: add only product pages with nutrition shown on official sites. Regional and limited items should include source date.

## Import Shape

Use this shape for future CSV/JSON imports:

```text
brand,name,category,tags,calories,protein_g,fat_g,carbs_g,salt_g,serving_label,source_url,fetched_at
```

If kcal is official but P/F/C is estimated, do not mark the whole item as official. Split source quality in a later schema revision before importing mixed-source rows.

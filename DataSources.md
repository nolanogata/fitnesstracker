# Food Data Source Policy

ゴールトラッカー keeps bundled food data in two layers:

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
- Family restaurants:
  - ガスト, ジョナサン, 藍屋: official Skylark menu pages and embedded menu JSON were checked on 2026-06-12. Some kcal/salt values are present in JSON, but P/F/C is still estimated, so entries remain `estimated/medium`.
  - デニーズ: official menu category pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - ロイヤルホスト, ジョイフル, 華屋与兵衛, サイゼリヤ, オリーブの丘: official menu/category pages were checked on 2026-06-12. Added representative official-menu-name or official-category entries as `estimated/medium`; P/F/C values are not official.
- Cafe chains:
  - Starbucks: official menu API/list pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - Doutor and Tully's: official menu pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - Komeda: official menu and menu-allergy APIs were checked on 2026-06-12. Kcal values are official, but P/F/C is estimated, so entries remain `estimated/medium`.
- Protein bars/drinks:
  - Asahi 一本満足バー and Meiji SAVAS product pages were checked on 2026-06-12. Added selected items as `official/high` when kcal/P/F/C/salt were directly shown as single values.
  - Morinaga in jelly/bar pages were checked on 2026-06-12. Added selected items as `estimated/medium` where values are ranged or only product names were available in the current pass.
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

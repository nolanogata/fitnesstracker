# Food Data Source Policy

100% トラッカー keeps bundled food data with these source quality labels:

- `official/high`: copied from a brand's official nutrition page or PDF, with `source_url` and `fetched_at`.
- `unofficial/medium`: copied from a third-party nutrition database when official P/F/C was not verified. The app must show this as `非公式値`.
- `estimated/medium` or `quick_estimate/low`: practical logging fallback, never presented as verified.

UI confidence labels:

- `公式値 · 信用度 高`: official kcal/P/F/C.
- `公式kcal・PFC推定 · 信用度 中`: official kcal was checked, but P/F/C is estimated.
- `公式名・PFC推定 · 信用度 中`: official menu/product name was checked, but nutrition is estimated.
- `推定値 · 信用度 低`: no official or third-party source was checked for that row.
- `非公式値 · 信用度 中`: third-party nutrition source, not brand-verified.

## Priority Official Sources

- KFC: official nutrition PDF. Added selected core items from the 2026-06-03 nutrition sheet.
- 松屋: official allergen/nutrition pages. Added 牛めし and チーズ牛めし from the 2026-06-09 values.
- 吉野家: official nutrition/allergen PDF. Added 牛丼 core sizes from the 2026-06-04 values.
- マクドナルド: official product nutrition pages. Added selected burger and side core items from product pages checked on 2026-06-12.
- サブウェイ: official nutrition PDF. Added selected sandwiches and potato sides from the 2026-06-10 nutrition sheet.
- CoCo壱番屋: official nutrition PDF. Added selected core curries from the 2026-06-04 nutrition sheet.
- 天丼てんや: official in-store calorie/allergen PDF. Added selected core tempura bowls from the 2026-06-11 sheet.
- リンガーハット: official allergy/nutrition page. Added selected chanpon, sara-udon, and gyoza items checked on 2026-06-12.
- モスバーガー: official nutrition PDF. Added selected burger and side core items from the 2026-05-20 sheet.
- バーガーキング: official menu page was checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`; P/F/C values are not official.
- ほっともっと: official Tokyo menu nutrition pages/list. Added selected core bento items checked on 2026-06-12.
- 餃子の王将: official regional menu pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`; P/F/C values are not official.
- なか卯: official nutrition PDF. Added representative parent bowls, beef bowls, katsudon, karaage bowl, and udon items from the 2026-06-10 sheet.
- やよい軒: official Tokyo nutrition table. Added representative teishoku, fish meals, and donburi items from the 2026-06-01 table.
- すき家: official nutrition PDF. Added representative beef bowl and curry variants/sizes from the 2026-06-09 nutrition sheet.
- 大戸屋: official menu page is store-scoped and warns menus differ by store. Added selected official-menu-name entries as `estimated/medium` only; P/F/C values are not official.
- しんぱち食堂: official site menu lists fish set meals. Added selected official-menu-name entries as `estimated/medium` only; P/F/C values are not official.
- Family restaurants:
  - ガスト, ジョナサン, 藍屋: official Skylark menu pages and embedded menu JSON were checked on 2026-06-12. Some kcal/salt values are present in JSON, but P/F/C is still estimated, so entries remain `estimated/medium`.
  - デニーズ: official menu category pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - ロイヤルホスト, ジョイフル, 華屋与兵衛, サイゼリヤ, オリーブの丘: official menu/category pages were checked on 2026-06-12. Added representative official-menu-name or official-category entries as `estimated/medium`; P/F/C values are not official.
- モンスーンカフェ: official site and store PDF menus were checked on 2026-06-12. Added representative official-menu-name entries from grand, weekday lunch, and takeout menus as `estimated/medium`; P/F/C values are not official.
- ペッパーランチ: official all-menu page was checked on 2026-06-19. Added selected official-menu-name entries as `estimated/medium`; P/F/C values are not official.
- 舎鈴: official おしながき page was checked on 2026-06-19. Added selected official-menu-name entries as `estimated/medium`; P/F/C values are not official.
- 三田製麺所: official menu page was checked on 2026-06-19. Added selected official-menu-name entries as `estimated/medium`; P/F/C values are not official.
- Cafe chains:
  - Starbucks: official menu API/list pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - Doutor and Tully's: official menu pages were checked on 2026-06-12. Added selected official-menu-name entries as `estimated/medium`.
  - Komeda: official menu and menu-allergy APIs were checked on 2026-06-12. Kcal values are official, but P/F/C is estimated, so entries remain `estimated/medium`.
- Protein bars/drinks:
  - Protein foods are separated into the `プロテイン` category rather than `サプリ`.
  - Asahi 一本満足バー and Meiji SAVAS product pages were checked on 2026-06-12. Added selected items as `official/high` when kcal/P/F/C/salt were directly shown as single values.
  - Morinaga in jelly/bar pages were checked on 2026-06-12. Added selected items as `estimated/medium` where values are ranged or only product names were available in the current pass.
- General foods:
  - Common home/general meal presets such as rice bowls, curry, noodles, bread, mains, side dishes, soups, desserts, and drinks are bundled as `estimated/medium` practical logging defaults. They are not official nutrition values and should be treated as editable estimates.
- External nutrition fallback:
  - FatSecret Japan was checked on 2026-06-12. Added selected Starbucks, Komeda, Gusto, and Saizeriya rows as `unofficial/medium` only when menu name and serving unit matched closely enough. Non-exact matches were skipped.
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

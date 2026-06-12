# Food seed coverage report

Generated: 2026-06-13T00:00:00.000Z

## Summary

This pass continues the official-source food seed expansion. It still promotes rows to `official()` only when calories, protein, fat, carbohydrate, and salt are all backed by the same official nutrition source. Ambiguous or partial rows remain in manual review.

| Brand | Source type | Official inventory | Existing before expansion | Missing add records | Replace records | Manual review |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| バーガーキング | official_full | 78 | 12 | 66 | 12 | 0 |
| スターバックス | official_full | 9 | 9 | 0 | 9 | 0 |
| ケンタッキー | official_full | 35 | 18 | 17 | 18 | 0 |
| モスバーガー | official_full | 184 | 54 | 132 | 52 | 0 |
| サブウェイ | official_full | 154 | 120 | 34 | 0 | 0 |
| マクドナルド | official_full | 71 | 20 | 51 | 1 | 0 |
| KFC coverage add-on | official_full | 50 | 35 | 15 | 0 | 0 |
| すき家 | official_full | 129 | 62 | 67 | 0 | 1 |
| 吉野家 | official_full | 69 | 6 | 63 | 0 | 0 |
| 松屋 | official_full | 41 | 10 | 31 | 0 | 0 |
| なか卯 | official_full | 209 | 2 | 207 | 2 | 0 |
| はなまるうどん | official_full | 74 | 0 | 74 | 0 | 0 |
| やよい軒 | official_full | 39 | 15 | 24 | 0 | 0 |
| 大戸屋 | official_full/add_if_missing | 162 | 159 | 3 | 0 | 0 |
| ドトール | official_full | 116 | 10 | 106 | 10 | 0 |
| タリーズ | official_full | 10 | 9 | 1 | 9 | 0 |
| しんぱち食堂 | official_menu_plus_supplemental_estimated | 43 | 14 | 29 | 14 | 0 |
| Other supported chains | mixed/not fully extracted | 0 | 0 | 0 | 0 | 16 |

## Applied expansion

- Doutor official nutrition rows now add 116 food, snack, dessert, and light-meal records from the official nutrition search pages.
- Tullys official food PDF rows now add 10 verified food and pasta records. Existing estimated Tullys cafe menu rows are removed from the loaded seed path to avoid duplicate brand rows.
- Nakau official PDF rows now add 209 records across bowls, noodles, set meals, breakfast, rice, and sides. PDF rows with `W` size variants are preserved as distinct serving labels.
- Hanamaru official PDF rows now add 74 safely extracted udon, curry, and rice records.
- Subway ambiguous PDF rows are resolved into 34 additional official rows; the prior 15-row manual queue is cleared.
- Existing app ranking still puts `official` rows above `unofficial`, `estimated`, and generic templates. Seed initialization also clears old estimated brand rows for chains now covered by official sources.

## Manual review queue

- すき家カレー系追加候補: current official seed coverage already includes the safe curry rows. Remaining candidate rows still risk PDF name/value misalignment, so no new `official()` rows are added in this pass.
- バーミヤン: official pages appear to expose mainly calories and salt. PFC is not official-backed, so automatic promotion remains blocked.
- ガスト / すかいらーく系: official data is partial for the nutrients tracked by the app. Needs field-level provenance or secondary-source policy.
- サイゼリヤ: nutrition availability and PFC provenance need table-level validation before official promotion.
- コメダ珈琲: several rows remain estimated or calorie-only; do not promote until full PFC and salt are source-backed.
- ロイヤルホスト / デニーズ / ジョイフル等: broad family-restaurant rows remain estimated until complete official or credible secondary values are available.
- 餃子の王将 subset: rows are still estimated. Official PFC availability needs confirmation.
- Monsoon Cafe: official menu PDF may exist, but nutrition data is not confirmed. Candidate for `unofficial()` only if a credible secondary source is found.
- 汎用ファストフード / 汎用カフェ: keep as brandless quick-estimate fallbacks while official brand rows rank above them.
- 丸亀製麺・ウエスト・資さんうどん汎用: official or stable third-party values still need confirmation.

## Notes

- This is still an incremental source-of-truth crawl, not yet a completed all-chain inventory.
- Remaining high-priority work is now concentrated on partial/ambiguous chains, Monsoon Cafe, and generic fallback cleanup.
- Rows with only official calories/salt, or ambiguous source attachment, are intentionally not promoted to `official()`.

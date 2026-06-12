# Food seed coverage report

Generated: 2026-06-12T00:00:00.000Z

## Summary

This pass materializes the verified first-pass official inventory supplied in the handoff files. It applies safe full-official records only where kcal, protein, fat, carbohydrate, and salt are all source-backed. Partial official kcal/salt rows remain in manual review.

| Brand | Source type | Official inventory | Existing before expansion | Missing add records | Replace records | Manual review |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| バーガーキング | official_full | 78 | 12 | 66 | 12 | 0 |
| スターバックス | official_full | 9 | 9 | 0 | 9 | 0 |
| Other supported chains | mixed/not extracted in this artifact | 0 | 0 | 0 | 0 | 30 |

## Applied expansion

- Burger King official PDF rows are represented as add/replace records in `food_seed_coverage_diff.json`; the 66 add records are also emitted in `food_seed_missing_items_patch.ts`.
- Starbucks food rows in the supplied batch are replace records only; no new Starbucks add records were present in the handoff.
- Records with only official calories/salt, or ambiguous PDF table extraction, are not promoted to `official()`.

## Manual review queue

- バーミヤン: 公式ページで確認できるのは主にカロリー／塩分。PFC は公式確認できず、自動置換は保留。
- ドトール・タリーズ・コメダ: 一部は公式カロリータグだが PFC は estimated。公式表または商品ページで個別照合が必要。
- ガスト・ロイヤルホスト・サイゼリヤ・デニーズ・ジョイフル等: 全体が estimated。公式が kcal/塩分のみのチェーンが多く、PFC 補完方針の決定が必要。
- 餃子の王将 subset: 同ファイル内で王将のみ estimated。公式 PFC の有無確認が必要。
- Monsoon Cafe: 公式メニュー PDF は確認できても栄養成分表が見つからない可能性が高い。代替ソースで unofficial 化候補。
- しんぱち食堂: 全量 estimated。焼魚定食は魚種・ご飯量で乖離しやすいため優先レビュー。
- 汎用ファストフード: バーガーキング等の公式 seed と重複。公式 seed を優先し、汎用推定はブランド名なしのクイック見積へ寄せる。
- 汎用カフェ: スターバックス公式 seed と重複。ブランド別公式が入るものは非表示または優先度低下推奨。
- 丸亀製麺・ウエスト・資さんうどん汎用: 公式/第三者値の確認が必要。
- やよい軒・しんぱち食堂汎用: やよい軒公式と重複しうる。公式 seed 優先。
- モスバーガー: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- マクドナルド: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- ケンタッキー: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- サブウェイ: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- ドトール: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- タリーズ: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- すき家: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- 吉野家: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- 松屋: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- なか卯: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- はなまるうどん: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- やよい軒: Phase 1: Chains with official kcal/P/F/C/salt can be bulk-added as official() after exact table extraction and diffing.
- ガスト: Phase 2: Chains whose official sources may expose only calories/salt or whose table extraction requires careful validation. Keep PFC provenance explicit.
- バーミヤン: Phase 2: Chains whose official sources may expose only calories/salt or whose table extraction requires careful validation. Keep PFC provenance explicit.
- サイゼリヤ: Phase 2: Chains whose official sources may expose only calories/salt or whose table extraction requires careful validation. Keep PFC provenance explicit.
- コメダ珈琲: Phase 2: Chains whose official sources may expose only calories/salt or whose table extraction requires careful validation. Keep PFC provenance explicit.
- 大戸屋: Phase 2: Chains whose official sources may expose only calories/salt or whose table extraction requires careful validation. Keep PFC provenance explicit.
- しんぱち食堂: Phase 3: Chains where official nutrition may be absent. Use secondary sources only with clear source_url and confidence downgrade.
- Monsoon Cafe: Phase 3: Chains where official nutrition may be absent. Use secondary sources only with clear source_url and confidence downgrade.
- その他ローカル定食系: Phase 3: Chains where official nutrition may be absent. Use secondary sources only with clear source_url and confidence downgrade.

## Notes

- This is not yet a completed all-chain source-of-truth crawl. It is a structured first expansion pass from the verified handoff data.
- The remaining high-priority full official adapters should next extract MOS, McDonald's, KFC, Subway, Doutor, Tullys, Sukiya, Yoshinoya, Matsuya, Nakau, Hanamaru, and Yayoiken source inventories and append their own brand sections to `food_seed_coverage_diff.json`.
- Existing app search already ranks `official` above `unofficial`, `estimated`, and generic templates.

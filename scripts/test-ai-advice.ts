import assert from "node:assert/strict";
import {
  applyAdviceMemoryUpdates,
  aiAdviceTopicPresets,
  buildAiAdviceQuestion,
  buildAnonymousAdviceContext,
  parseExternalAiHandoff,
} from "../src/lib/aiAdvice.ts";

const timestamp = "2026-07-24T00:00:00.000Z";
const context = buildAnonymousAdviceContext({
  fullReport: `# レポート
- 名前: Alex
- メール: private@example.com
- 現在体重: 70kg

## 食事ログ
- 鮭定食`,
  appDate: "2026-07-24",
  contentScope: "food",
  topicLabel: "食事内容について",
  foodEntries: [{
    id: "food_1",
    app_date: "2026-07-24",
    logged_at: timestamp,
    meal_type: "dinner",
    name: "鮭定食",
    calories: 600,
    protein_g: 35,
    fat_g: 18,
    carbs_g: 70,
    portion_multiplier: 1,
    entry_source: "official",
    confidence: "high",
    created_at: timestamp,
    updated_at: timestamp,
  }],
  weightLogs: [],
  workoutSessions: [],
  workoutExercises: [],
  workoutSets: [],
});
assert.doesNotMatch(context, /Alex|private@example\.com/);
assert.match(context, /鮭定食/);
assert.match(context, /直近7日/);
assert.ok(context.length <= 24_000);

const workoutContext = buildAnonymousAdviceContext({
  fullReport: `# レポート

## AIへの依頼
- 現在の目標に対する適正な目標カロリーとP/F/Cを算定してください。

## ワークアウト
- ベンチプレス 60kg 10回 3セット

## 相談したいこと
ワークアウト内容を評価してください。`,
  appDate: "2026-07-24",
  contentScope: "workout",
  topicLabel: "ワークアウト内容について",
  foodEntries: [{
    id: "food_2",
    app_date: "2026-07-24",
    logged_at: timestamp,
    meal_type: "dinner",
    name: "非表示にする食事",
    calories: 900,
    protein_g: 20,
    fat_g: 40,
    carbs_g: 90,
    portion_multiplier: 1,
    entry_source: "estimated",
    confidence: "medium",
    created_at: timestamp,
    updated_at: timestamp,
  }],
  weightLogs: [],
  workoutSessions: [],
  workoutExercises: [],
  workoutSets: [],
});
assert.match(workoutContext, /ワークアウト内容について/);
assert.match(workoutContext, /ベンチプレス 60kg 10回 3セット/);
assert.doesNotMatch(workoutContext, /適正な目標カロリー|AIへの依頼|相談したいこと|非表示にする食事|食事記録日/);

const parsed = parseExternalAiHandoff(`回答本文
\`\`\`phase_log_handoff_v1
{"type":"phase_log_handoff_v1","headline":"継続","summary":"食事記録を続ける","observations":[],"evidence":[],"actions":["夕食を記録"],"cautions":[],"memory_updates":[{"category":"focus","text":"夕食記録を優先"}]}
\`\`\``);
assert.equal(parsed?.headline, "継続");
assert.deepEqual(parsed?.actions, ["夕食を記録"]);
assert.equal(parseExternalAiHandoff("コードブロックなし"), undefined);

const memory = applyAdviceMemoryUpdates({
  id: "default",
  items: [{
    id: "manual",
    category: "user_note",
    text: "夜勤あり",
    source: "user",
    active: true,
    created_at: timestamp,
    updated_at: timestamp,
  }],
  created_at: timestamp,
  updated_at: timestamp,
}, parsed!, timestamp);
assert.ok(memory.items.some((item) => item.id === "manual"));
assert.ok(memory.items.some((item) => item.text === "夕食記録を優先"));

assert.deepEqual(
  {
    mode: aiAdviceTopicPresets.remaining.mode,
    scope: aiAdviceTopicPresets.remaining.contentScope,
  },
  { mode: "day", scope: "food" },
);
assert.match(buildAiAdviceQuestion("remaining", "コンビニで買いたい"), /残りカロリーとPFC/);
assert.match(buildAiAdviceQuestion("remaining", "コンビニで買いたい"), /補足: コンビニで買いたい/);
assert.equal(buildAiAdviceQuestion("custom", "  今週の改善点は？  "), "今週の改善点は？");

console.log("AI advice context and memory tests passed");

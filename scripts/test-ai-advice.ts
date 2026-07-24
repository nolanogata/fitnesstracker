import assert from "node:assert/strict";
import {
  applyAdviceMemoryUpdates,
  aiAdviceTopicPresets,
  buildAiAdviceQuestion,
  buildAnonymousAdviceContext,
  buildDailyReviewQuestion,
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
  topic: "food",
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
assert.match(context, /食事比較/);
assert.match(context, /直前7日（直近7日と重複なし）/);
assert.match(context, /直近28日の参考平均/);
assert.doesNotMatch(context, /直近90日/);
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
  topic: "workout",
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
  workoutSessions: [{
    id: "session_previous",
    app_date: "2026-07-20",
    logged_at: "2026-07-20T09:00:00.000Z",
    title: "胸",
    workout_type: "strength",
    body_parts: ["胸"],
    created_at: timestamp,
    updated_at: timestamp,
  }, {
    id: "session_latest",
    app_date: "2026-07-24",
    logged_at: "2026-07-24T09:00:00.000Z",
    title: "胸",
    workout_type: "strength",
    body_parts: ["胸"],
    created_at: timestamp,
    updated_at: timestamp,
  }],
  workoutExercises: [{
    id: "exercise_previous",
    session_id: "session_previous",
    exercise_id: "bench_press",
    exercise_name: "ベンチプレス",
    body_part: "胸",
    equipment_type: "バーベル",
    order: 0,
    created_at: timestamp,
    updated_at: timestamp,
  }, {
    id: "exercise_latest",
    session_id: "session_latest",
    exercise_id: "bench_press",
    exercise_name: "ベンチプレス",
    body_part: "胸",
    equipment_type: "バーベル",
    order: 0,
    created_at: timestamp,
    updated_at: timestamp,
  }],
  workoutSets: [{
    id: "set_previous",
    workout_exercise_id: "exercise_previous",
    set_order: 1,
    weight_kg: 60,
    reps: 10,
    is_warmup: false,
    created_at: timestamp,
    updated_at: timestamp,
  }, {
    id: "set_latest",
    workout_exercise_id: "exercise_latest",
    set_order: 1,
    weight_kg: 62.5,
    reps: 8,
    is_warmup: false,
    created_at: timestamp,
    updated_at: timestamp,
  }],
  memory: {
    id: "default",
    items: [{
      id: "bad_memory",
      category: "focus",
      text: "種目ごとの重量を均一にする",
      source: "ai",
      active: true,
      created_at: timestamp,
      updated_at: timestamp,
    }],
    created_at: timestamp,
    updated_at: timestamp,
  },
});
assert.match(workoutContext, /ワークアウト内容について/);
assert.match(workoutContext, /ベンチプレス 60kg 10回 3セット/);
assert.doesNotMatch(workoutContext, /適正な目標カロリー|AIへの依頼|相談したいこと|非表示にする食事|食事記録日/);
assert.match(workoutContext, /直前7日（直近7日と重複なし）/);
assert.match(workoutContext, /直近28日の週平均/);
assert.match(workoutContext, /ベンチプレス: 2026-07-20 1セット \/ best 60kg×10 → 2026-07-24 1セット \/ best 62.5kg×8/);
assert.doesNotMatch(workoutContext, /種目ごとの重量を均一/);

const remainingContext = buildAnonymousAdviceContext({
  fullReport: `# レポート

## 現在のゴール
- 目標 kcal: 2200
- 目標 P/F/C: 160g / 60g / 240g

## 当日集計
- 当日 kcal: 1800
- 採用値ベース残量: 400kcal

## 食事ログ
- おにぎり`,
  appDate: "2026-07-24",
  topic: "remaining",
  contentScope: "food",
  topicLabel: "残りで何を食べられるか",
  foodEntries: [],
  weightLogs: [],
  workoutSessions: [],
  workoutExercises: [],
  workoutSets: [],
});
assert.match(remainingContext, /採用値ベース残量: 400kcal/);
assert.doesNotMatch(remainingContext, /食事比較|ワークアウト比較/);

const goalContext = buildAnonymousAdviceContext({
  fullReport: "# レポート\n\n## 現在のゴール\n- 目標体重: 70kg",
  appDate: "2026-07-24",
  topic: "goal",
  contentScope: "both",
  topicLabel: "ゴール設定について",
  foodEntries: [],
  weightLogs: [],
  workoutSessions: [],
  workoutExercises: [],
  workoutSets: [],
});
assert.match(goalContext, /食事比較/);
assert.match(goalContext, /ワークアウト比較/);

const dailyReviewContext = buildAnonymousAdviceContext({
  fullReport: `# レポート

## レポート状態
- 1日の途中経過

## 食事ログ
- 朝食: オートミール、ヨーグルト
- 昼食: 鮭定食`,
  appDate: "2026-07-24",
  topic: "daily_review",
  contentScope: "both",
  topicLabel: "今日1日の評価",
  foodEntries: [{
    id: "food_daily",
    app_date: "2026-07-24",
    logged_at: timestamp,
    meal_type: "breakfast",
    name: "オートミール",
    calories: 300,
    protein_g: 12,
    fat_g: 6,
    carbs_g: 50,
    portion_multiplier: 1,
    entry_source: "user",
    confidence: "high",
    created_at: timestamp,
    updated_at: timestamp,
  }],
  weightLogs: [],
  workoutSessions: [{
    id: "daily_previous_session",
    app_date: "2026-07-22",
    logged_at: "2026-07-22T09:00:00.000Z",
    title: "脚",
    workout_type: "strength",
    body_parts: ["脚"],
    created_at: timestamp,
    updated_at: timestamp,
  }],
  workoutExercises: [{
    id: "daily_previous_exercise",
    session_id: "daily_previous_session",
    exercise_id: "squat",
    exercise_name: "スクワット",
    body_part: "脚",
    equipment_type: "バーベル",
    order: 0,
    created_at: timestamp,
    updated_at: timestamp,
  }],
  workoutSets: [{
    id: "daily_previous_set",
    workout_exercise_id: "daily_previous_exercise",
    set_order: 1,
    weight_kg: 80,
    reps: 8,
    is_warmup: false,
    created_at: timestamp,
    updated_at: timestamp,
  }],
});
assert.match(dailyReviewContext, /今日1日の評価用データ/);
assert.match(dailyReviewContext, /今日のトレーニング記録: なし/);
assert.match(dailyReviewContext, /2026-07-20〜2026-07-23（直前4日間）/);
assert.match(dailyReviewContext, /2026-07-22 脚: 脚 \/ スクワット 1セット/);
assert.doesNotMatch(dailyReviewContext, /食事比較|ワークアウト比較/);

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
  Object.fromEntries(Object.entries(aiAdviceTopicPresets).map(([topic, preset]) => [topic, {
    mode: preset.mode,
    scope: preset.contentScope,
  }])),
  {
    daily_review: { mode: "day", scope: "both" },
    food: { mode: "week", scope: "food" },
    remaining: { mode: "day", scope: "food" },
    workout: { mode: "week", scope: "workout" },
    goal: { mode: "month", scope: "both" },
    custom: { mode: "week", scope: "both" },
  },
);
assert.match(buildAiAdviceQuestion("remaining", "コンビニで買いたい"), /残りカロリーとPFC/);
assert.match(buildAiAdviceQuestion("remaining", "コンビニで買いたい"), /補足: コンビニで買いたい/);
assert.equal(buildAiAdviceQuestion("custom", "  今週の改善点は？  "), "今週の改善点は？");
assert.match(buildDailyReviewQuestion({
  coverage: "partial",
  includeWorkout: true,
  hasWorkoutToday: false,
  detail: "夕食は外食予定",
}), /まだ途中経過/);
assert.match(buildDailyReviewQuestion({
  coverage: "partial",
  includeWorkout: true,
  hasWorkoutToday: false,
  detail: "夕食は外食予定",
}), /直前4日間/);
assert.match(buildDailyReviewQuestion({
  coverage: "partial",
  includeWorkout: true,
  hasWorkoutToday: false,
  detail: "夕食は外食予定",
}), /補足: 夕食は外食予定/);
assert.doesNotMatch(buildDailyReviewQuestion({
  coverage: "completed",
  includeWorkout: false,
  hasWorkoutToday: false,
  detail: "",
}), /直前4日間/);

console.log("AI advice context and memory tests passed");

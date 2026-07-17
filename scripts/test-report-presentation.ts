import assert from "node:assert/strict";
import { build } from "esbuild";
import {
  getActivityProfilePresentation,
  getDailyActivityPresentation,
  getFoodSummaryLabels,
  getProteinSafetyPresentation,
} from "../src/lib/reportPresentation.ts";
import type { ActivityProfile, DailyActivityContext } from "../src/types.ts";
import {
  buildFoodCoverageDays,
  foodRecordContextFromSelection,
  getFoodCoverageReviewDays,
} from "../src/lib/foodRecordCoverage.ts";
import { getCalorieOverTone, getDisplayedMacroProgress } from "../src/lib/nutritionEstimate.ts";
import { getHeroExceptionDisplay } from "../src/lib/homeHero.ts";
import {
  buildFollowUpAiReport,
  getAiReportDeliveryContent,
  latestCopiedAiReport,
} from "../src/lib/aiReportDelivery.ts";
import type { AiReport } from "../src/types.ts";

let passed = 0;

function test(name: string, run: () => void) {
  run();
  passed += 1;
  process.stdout.write(`✓ ${name}\n`);
}

const baseProfile: ActivityProfile = {
  activity_level: "moderate",
  average_steps: 11_639,
  average_active_calories: 709,
  average_exercise_minutes: 44,
  averaging_period: "last_30_days",
  confirmed_at: "2026-07-12T00:00:00.000Z",
  updated_at: "2026-07-12T00:00:00.000Z",
};

const qualitativeDaily: DailyActivityContext = {
  date: "2026-07-12",
  relative_activity_level: "normal",
  data_source: "unknown",
};

test("途中・採用P未達はあと表示", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 66.5, safeProteinLowerBound: 66.5, targetProtein: 150, coverage: "partial" });
  assert.equal(result.kind, "adopted_below");
  assert.equal(result.message, "目標まであと83.5g");
  assert.doesNotMatch(result.message, /不足|必須/);
});

test("確定・採用P未達は不足表示", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 66.5, safeProteinLowerBound: 66.5, targetProtein: 150, coverage: "completed" });
  assert.equal(result.kind, "adopted_below");
  assert.equal(result.message, "目標まで83.5g不足");
});

test("採用値達成・下限未達だけ任意注意を表示", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 157.5, safeProteinLowerBound: 146.7, targetProtein: 150, coverage: "partial" });
  assert.equal(result.kind, "uncertainty_crosses_target");
  assert.match(result.message, /最大3.3g届かない可能性/);
  assert.match(result.message, /追加摂取は必須ではありません/);
});

test("安全側下限も達成", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 178.8, safeProteinLowerBound: 157.6, targetProtein: 150, coverage: "partial" });
  assert.equal(result.kind, "safe_target_met");
  assert.equal(result.message, "下限でも目標を満たす見込み");
});

test("推定幅0でも採用P未達は通常の残量", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 100, safeProteinLowerBound: 100, targetProtein: 150, coverage: "partial" });
  assert.equal(result.message, "目標まであと50g");
});

test("Pが目標と完全一致", () => {
  const result = getProteinSafetyPresentation({ adoptedProtein: 150, safeProteinLowerBound: 150, targetProtein: 150, coverage: "partial" });
  assert.equal(result.kind, "safe_target_met");
});

test("安全側だけのカロリー超過は推定トーン", () => {
  assert.equal(getCalorieOverTone({
    adoptedRemainingCalories: 50,
    displayedRemainingCalories: -30,
    uncertaintyCalories: 80,
  }), "estimate");
});

test("採用値も推定幅を超えてオーバーした時だけ警告トーン", () => {
  assert.equal(getCalorieOverTone({
    adoptedRemainingCalories: -120,
    displayedRemainingCalories: -200,
    uncertaintyCalories: 80,
  }), "over");
});

test("採用値の小幅超過が推定幅内なら推定トーン", () => {
  assert.equal(getCalorieOverTone({
    adoptedRemainingCalories: -40,
    displayedRemainingCalories: -120,
    uncertaintyCalories: 80,
  }), "estimate");
});

test("HomeのPFCは選択中の残量基準から表示値と達成率を計算", () => {
  assert.deepEqual(getDisplayedMacroProgress(70, 50, 12), { value: 58, remaining: 12, percent: 83 });
  assert.deepEqual(getDisplayedMacroProgress(150, 120, 40), { value: 110, remaining: 40, percent: 73 });
});

test("旅行中はラベル操作で数値だけを表示し、評価外と100%バーは維持", () => {
  assert.deepEqual(getHeroExceptionDisplay({ isExceptionDay: true, isTravelMode: true, showTravelNutrition: false }), {
    hideGoalValues: true,
    muteGoalEvaluation: true,
    forceFullProgress: true,
  });
  assert.deepEqual(getHeroExceptionDisplay({ isExceptionDay: true, isTravelMode: true, showTravelNutrition: true }), {
    hideGoalValues: false,
    muteGoalEvaluation: true,
    forceFullProgress: true,
  });
  assert.equal(getHeroExceptionDisplay({ isExceptionDay: true, isTravelMode: false, showTravelNutrition: true }).hideGoalValues, true);
});

test("平均あり・対象日は定性入力のみ", () => {
  const profile = getActivityProfilePresentation(baseProfile, "moderate");
  const daily = getDailyActivityPresentation(qualitativeDaily);
  assert.equal(profile.sourceLabel, "保存元不明");
  assert.equal(daily.sourceLabel, "ユーザーの定性入力");
  assert.equal(daily.numericEvaluationLabel, "不可（対象日の数値は未入力）");
  assert.equal(daily.confidenceLabel, "定性評価のみ");
});

test("平均あり・対象日詳細あり", () => {
  const daily = getDailyActivityPresentation({ ...qualitativeDaily, steps: 9_500, active_calories: 620, exercise_minutes: 35, data_source: "apple_watch" });
  assert.equal(daily.sourceLabel, "Apple Watch");
  assert.equal(daily.numericEvaluationLabel, "入力値を参照");
  assert.equal(daily.confidenceLabel, "高");
});

test("平均なし・対象日詳細あり", () => {
  const profile = getActivityProfilePresentation(undefined, undefined);
  const daily = getDailyActivityPresentation({ ...qualitativeDaily, steps: 7_000, data_source: "user_estimate" });
  assert.equal(profile.confidenceLabel, "評価不可");
  assert.equal(daily.sourceLabel, "ユーザーによる推定");
  assert.equal(daily.confidenceLabel, "中");
});

test("平均・対象日の両方なし", () => {
  const profile = getActivityProfilePresentation(undefined, undefined);
  const daily = getDailyActivityPresentation(undefined);
  assert.equal(profile.sourceLabel, "未設定");
  assert.equal(daily.sourceLabel, "未入力");
  assert.equal(daily.numericEvaluationLabel, "不可（対象日の数値は未入力）");
});

test("平均活動量のデータソース判明", () => {
  const result = getActivityProfilePresentation({ ...baseProfile, data_source: "apple_health" }, "moderate");
  assert.equal(result.sourceLabel, "Appleヘルスケア");
  assert.equal(result.confidenceLabel, "高");
});

test("平均活動量のデータソース不明", () => {
  const result = getActivityProfilePresentation(baseProfile, "moderate");
  assert.equal(result.sourceLabel, "保存元不明");
  assert.equal(result.confidenceLabel, "中（保存元不明）");
});

test("過去のチートデー未記録は生成前確認の対象", () => {
  const days = buildFoodCoverageDays({
    dates: ["2026-07-11"],
    foodEntries: [],
    cheatDayDates: ["2026-07-11"],
    currentAppDate: "2026-07-12",
  });
  assert.equal(getFoodCoverageReviewDays(days).length, 1);
  assert.equal(days[0].isCheatDay, true);
  assert.equal(days[0].status, "unrecorded");
});

test("過去の通常日未記録も生成前確認の対象", () => {
  const days = buildFoodCoverageDays({
    dates: ["2026-07-11"],
    foodEntries: [],
    currentAppDate: "2026-07-12",
  });
  assert.equal(getFoodCoverageReviewDays(days).length, 1);
  assert.equal(days[0].isCheatDay, false);
});

test("当日途中の未記録は生成前確認を要求しない", () => {
  const days = buildFoodCoverageDays({
    dates: ["2026-07-12"],
    foodEntries: [],
    currentAppDate: "2026-07-12",
    dailyReportCoverage: "partial",
  });
  assert.equal(getFoodCoverageReviewDays(days).length, 0);
  assert.equal(days[0].status, "partial");
});

test("一時停止日の未記録は集計対象外", () => {
  const days = buildFoodCoverageDays({
    dates: ["2026-07-11"],
    foodEntries: [],
    pauseDayDates: ["2026-07-11"],
    currentAppDate: "2026-07-12",
  });
  assert.equal(getFoodCoverageReviewDays(days).length, 0);
  assert.equal(days[0].status, "excluded");
});

test("定性的な回答はkcalへ自動変換しない", () => {
  const context = foodRecordContextFromSelection({
    date: "2026-07-11",
    relativeLevel: "much_more",
    confirmedAt: "2026-07-12T00:00:00.000Z",
  });
  assert.equal(context.meal_record_status, "estimated_only");
  assert.equal(context.estimated_calories, undefined);
});

test("1日レポートは当日集計", () => {
  assert.deepEqual(getFoodSummaryLabels(true), { heading: "当日集計", calories: "当日 kcal", macros: "当日 P/F/C" });
});

for (const days of [7, 14, 30]) {
  test(`${days}日レポートは食事平均`, () => {
    assert.deepEqual(getFoodSummaryLabels(false), { heading: "食事平均", calories: "平均 kcal", macros: "平均 P/F/C" });
  });
}

const bundledReport = await build({
  entryPoints: [new URL("../src/lib/report.ts", import.meta.url).pathname],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const reportModuleUrl = `data:text/javascript;base64,${Buffer.from(bundledReport.outputFiles[0].text).toString("base64")}`;
const { generateMarkdownReport } = await import(reportModuleUrl) as typeof import("../src/lib/report.ts");

{
  const reportInput = {
    goal: {
      id: "goal-test",
      phase: "recomposition" as const,
      age: 40,
      activity_level: "moderate" as const,
      target_calories: 2_500,
      target_protein_g: 150,
      target_fat_g: 70,
      target_carbs_g: 315,
      start_date: "2026-07-01",
      is_active: true,
      created_at: "2026-07-01T00:00:00.000Z",
      updated_at: "2026-07-01T00:00:00.000Z",
    },
    foodEntries: [{
      id: "food-test",
      app_date: "2026-07-12",
      logged_at: "2026-07-12T12:00:00.000Z",
      meal_type: "lunch" as const,
      name: "テスト食事",
      calories: 760,
      protein_g: 66.5,
      fat_g: 9.5,
      carbs_g: 102.9,
      portion_multiplier: 1,
      entry_source: "user" as const,
      confidence: "high" as const,
      created_at: "2026-07-12T12:00:00.000Z",
      updated_at: "2026-07-12T12:00:00.000Z",
    }],
    weightLogs: [],
    workoutSessions: [],
    workoutExercises: [],
    workoutSets: [],
    periodStart: "2026-07-12",
    periodEnd: "2026-07-12",
    generatedAt: "2026-07-12T13:00:00.000Z",
    currentAppDate: "2026-07-12",
    activityProfile: baseProfile,
    dailyActivity: qualitativeDaily,
    question: "",
  };

  test("Markdownの日別途中レポートも共通判定を使用", () => {
    const report = generateMarkdownReport({ ...reportInput, reportCoverage: "partial" });
    assert.match(report, /対象範囲の状態: 当日途中/);
    assert.match(report, /## 当日集計/);
    assert.match(report, /当日 kcal: 760/);
    assert.match(report, /当日 P\/F\/C: 66\.5g \/ 9\.5g \/ 102\.9g/);
    assert.match(report, /Pの安全側評価: 採用P 66\.5g \/ 下限P 66\.5g \/ 目標まであと83\.5g/);
    assert.doesNotMatch(report, /最大83\.5g不足の可能性/);
  });

  test("Markdownの日次確定レポートは最終評価へ切り替え", () => {
    const report = generateMarkdownReport({ ...reportInput, reportCoverage: "completed" });
    assert.match(report, /対象範囲の状態: 1日完了/);
    assert.match(report, /Pの安全側評価: 採用P 66\.5g \/ 下限P 66\.5g \/ 目標まで83\.5g不足/);
  });

  test("Markdownで平均活動量と対象日活動量を分離", () => {
    const report = generateMarkdownReport({ ...reportInput, reportCoverage: "partial" });
    assert.match(report, /### 平均活動量プロフィール[\s\S]*データソース: 保存元不明[\s\S]*信頼度: 中（保存元不明）/);
    assert.match(report, /### 対象日の活動量[\s\S]*データソース: ユーザーの定性入力[\s\S]*数値評価: 不可（対象日の数値は未入力）[\s\S]*信頼度: 定性評価のみ/);
  });

  test("未記録のチートデーを0kcalや期間平均として扱わない", () => {
    const context = foodRecordContextFromSelection({
      date: "2026-07-11",
      relativeLevel: "much_more",
      confirmedAt: "2026-07-12T00:00:00.000Z",
    });
    const report = generateMarkdownReport({
      ...reportInput,
      periodStart: "2026-07-11",
      periodEnd: "2026-07-12",
      cheatDayDates: ["2026-07-11"],
      foodRecordContexts: [context],
      reportCoverage: undefined,
    });
    assert.match(report, /## 食事記録カバレッジ/);
    assert.match(report, /チートデーで詳細未記録: 1日 \(2026-07-11\)/);
    assert.match(report, /2026-07-11: チートデー \/ 普段よりかなり多く食べた \/ カロリー不明/);
    assert.match(report, /期間全体の平均摂取量: 正確な算出不可/);
    assert.match(report, /## 記録日の食事平均/);
    assert.match(report, /未記録日を0 kcalとして扱わないでください/);
  });

  test("食事未記録の日別レポートは0kcalや全量不足を表示しない", () => {
    const report = generateMarkdownReport({
      ...reportInput,
      foodEntries: [],
      reportCoverage: "completed",
    });
    assert.match(report, /当日 kcal: 算出不可（未記録を0kcalとは扱いません）/);
    assert.match(report, /食事の摂取量が不明なため、目標との差分は評価できません/);
    assert.doesNotMatch(report, /当日 kcal: 0/);
    assert.doesNotMatch(report, /2500kcal不足/);
  });

  test("未記録日の概算値は採用値の食事平均へ加算しない", () => {
    const context = foodRecordContextFromSelection({
      date: "2026-07-11",
      relativeLevel: "much_more",
      estimatedCalories: 3_500,
      estimatedProtein: 120,
      confirmedAt: "2026-07-12T00:00:00.000Z",
    });
    const report = generateMarkdownReport({
      ...reportInput,
      periodStart: "2026-07-11",
      periodEnd: "2026-07-12",
      foodRecordContexts: [context],
      reportCoverage: undefined,
    });
    assert.match(report, /2026-07-11: 普段よりかなり多く食べた \/ 概算 3500kcal \(P120g\)/);
    assert.match(report, /記録日の平均 kcal: 760/);
    assert.doesNotMatch(report, /記録日の平均 kcal: 4260/);
  });

  test("初回送信は完全版をそのまま返す", () => {
    const full = generateMarkdownReport({ ...reportInput, reportCoverage: "partial" });
    assert.equal(getAiReportDeliveryContent({
      mode: "full",
      fullReport: full,
      generatedAt: "2026-07-12T13:00:00.000Z",
    }), full);
  });

  test("同じチャット用は共通指示を圧縮して現在の記録を残す", () => {
    const previous = generateMarkdownReport({
      ...reportInput,
      periodStart: "2026-07-11",
      periodEnd: "2026-07-11",
      currentAppDate: "2026-07-11",
      generatedAt: "2026-07-11T13:00:00.000Z",
      reportCoverage: "completed",
      foodEntries: reportInput.foodEntries.map((entry) => ({ ...entry, app_date: "2026-07-11" })),
    });
    const current = generateMarkdownReport({ ...reportInput, reportCoverage: "partial" });
    const followUp = buildFollowUpAiReport({
      currentFullReport: current,
      previousFullReport: previous,
      previousCopiedAt: "2026-07-11T13:10:00.000Z",
      generatedAt: "2026-07-12T13:00:00.000Z",
    });
    assert.match(followUp, /AI相談 更新レポート/);
    assert.match(followUp, /同じAIチャットへの更新/);
    assert.match(followUp, /## 基本情報[\s\S]*目標 kcal: 2500/);
    assert.match(followUp, /### 当日集計[\s\S]*当日 kcal: 760/);
    assert.match(followUp, /### その日の食事詳細[\s\S]*テスト食事/);
    assert.doesNotMatch(followUp, /### 体重トレンド/);
    assert.doesNotMatch(followUp, /### 期間補正の参考/);
    assert.doesNotMatch(followUp, /## AIへの依頼/);
    assert.ok(followUp.length < current.length * 0.55, `更新版が十分に短くありません: ${followUp.length}/${current.length}`);
  });

  test("食事のみはワークアウト詳細を送らない", () => {
    const report = generateMarkdownReport({ ...reportInput, contentScope: "food", reportCoverage: "partial" });
    assert.match(report, /送信内容: 食事/);
    assert.match(report, /## その日の食事詳細/);
    assert.doesNotMatch(report, /## その日のワークアウト詳細/);
  });

  test("ワークアウトのみは食事集計と食事ログを送らない", () => {
    const report = generateMarkdownReport({ ...reportInput, contentScope: "workout", reportCoverage: "partial" });
    assert.match(report, /送信内容: ワークアウト/);
    assert.match(report, /## その日のワークアウト詳細/);
    assert.doesNotMatch(report, /## 当日集計/);
    assert.doesNotMatch(report, /## 食事記録カバレッジ/);
    assert.doesNotMatch(report, /## その日の食事詳細/);
  });

  test("ゴール変更は更新版へ再掲する", () => {
    const previous = generateMarkdownReport({ ...reportInput, reportCoverage: "partial" });
    const current = generateMarkdownReport({
      ...reportInput,
      goal: { ...reportInput.goal, target_calories: 2_600 },
      generatedAt: "2026-07-13T13:00:00.000Z",
      reportCoverage: "partial",
    });
    const followUp = buildFollowUpAiReport({
      currentFullReport: current,
      previousFullReport: previous,
      generatedAt: "2026-07-13T13:00:00.000Z",
    });
    assert.match(followUp, /## 基本情報[\s\S]*前回からの基本設定変更: あり[\s\S]*目標 kcal: 2600/);
    assert.doesNotMatch(followUp, /### 体組成目標/);
  });

  test("次回基準はコピー済みレポートだけを選ぶ", () => {
    const reports: AiReport[] = [
      {
        id: "generated-only",
        period_start: "2026-07-13",
        period_end: "2026-07-13",
        format: "markdown",
        content: "not sent",
        created_at: "2026-07-13T12:00:00.000Z",
        updated_at: "2026-07-13T12:00:00.000Z",
      },
      {
        id: "copied-old",
        period_start: "2026-07-11",
        period_end: "2026-07-11",
        format: "markdown",
        content: "sent old",
        copied_at: "2026-07-11T13:00:00.000Z",
        created_at: "2026-07-11T12:00:00.000Z",
        updated_at: "2026-07-11T13:00:00.000Z",
      },
      {
        id: "copied-latest",
        period_start: "2026-07-12",
        period_end: "2026-07-12",
        format: "markdown",
        content: "sent latest",
        copied_at: "2026-07-12T13:00:00.000Z",
        created_at: "2026-07-12T12:00:00.000Z",
        updated_at: "2026-07-12T13:00:00.000Z",
      },
    ];
    assert.equal(latestCopiedAiReport(reports)?.id, "copied-latest");
  });
}

process.stdout.write(`Report presentation tests passed: ${passed}\n`);

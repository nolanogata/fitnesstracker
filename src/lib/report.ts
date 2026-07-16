import type { ActivityProfile, AiReportContentScope, DailyActivityContext, FoodEntry, FoodRecordContext, Goal, MenuItem, Phase, Profile, ReportCoverage, WeightLog, WorkoutExercise, WorkoutSession, WorkoutSet } from "../types";
import { dateRange } from "./date";
import { phaseLabels } from "./goalCalculator";
import { formatWeeklyWorkoutStatus, type WeeklyWorkoutStatus } from "./workoutStatus";
import { getDailyNutritionEstimate } from "./nutritionEstimate";
import { getActivityProfilePresentation, getDailyActivityPresentation, getFoodSummaryLabels, getProteinSafetyPresentation } from "./reportPresentation";
import { buildFoodCoverageDays, getFoodCoverageConfidence, intakeRelativeLevelLabels, type FoodCoverageDay } from "./foodRecordCoverage";

const finisherPulseIntensity = "finisher_pulse";
const mealTypeLabels: Record<string, string> = {
  breakfast: "朝",
  lunch: "昼",
  dinner: "夜",
  snack: "間食",
  gym_before: "ジム前",
  gym_after: "ジム後",
};

type WorkoutGrouping = "day" | "week" | "month";
type SpecialModeDayKind = "travel" | "pause" | "test";
type SpecialModeDay = { date: string; label: string; kind?: SpecialModeDayKind; isTest?: boolean };
type PeriodReference = {
  diffKg: number;
  weeklyWeightChangeKg: number;
  dailyCalories: number;
  daysRemaining: number;
};

export function generateMarkdownReport(input: {
  profile?: Profile;
  goal?: Goal;
  foodEntries: FoodEntry[];
  menuItems?: MenuItem[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus?: WeeklyWorkoutStatus;
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  currentAppDate: string;
  cheatDayDates?: string[];
  specialModeDays?: SpecialModeDay[];
  workoutGrouping?: WorkoutGrouping;
  activityProfile?: ActivityProfile;
  dailyActivity?: DailyActivityContext;
  reportCoverage?: ReportCoverage;
  foodRecordContexts?: FoodRecordContext[];
  question: string;
  contentScope?: AiReportContentScope;
}) {
  const contentScope = input.contentScope ?? "both";
  const includeFood = contentScope !== "workout";
  const includeWorkout = contentScope !== "food";
  const dates = dateRange(input.periodStart, input.periodEnd);
  const cheatDayDates = dates.filter((date) => input.cheatDayDates?.includes(date));
  const specialModeDays = (input.specialModeDays ?? []).filter((day) => dates.includes(day.date));
  const foodDays = new Set(input.foodEntries.map((entry) => entry.app_date));
  const totals = input.foodEntries.reduce(
    (sum, entry) => ({
      calories: sum.calories + entry.calories,
      protein: sum.protein + entry.protein_g,
      fat: sum.fat + entry.fat_g,
      carbs: sum.carbs + entry.carbs_g,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );
  const divisor = Math.max(foodDays.size, 1);
  const sortedWeightLogs = [...input.weightLogs].sort((a, b) => a.logged_at.localeCompare(b.logged_at));
  const logsUpToPeriodEnd = sortedWeightLogs.filter((entry) => entry.app_date <= input.periodEnd);
  const latestWeight = logsUpToPeriodEnd.at(-1) ?? sortedWeightLogs.at(-1);
  const firstWeight = sortedWeightLogs[0];
  const recentWeightLogs = logsUpToPeriodEnd.filter((entry) => entry.app_date >= addDays(input.periodEnd, -6));
  const sevenDayAverageWeight = averageWeight(recentWeightLogs);
  const eatingOut = input.foodEntries.filter((entry) => entry.entry_source !== "user" && entry.brand).length;
  const sweets = input.foodEntries.filter((entry) => /スイーツ|ケーキ|アイス|チョコ|プリン/.test(entry.name)).length;
  const drinking = input.foodEntries.filter((entry) => /飲み会|ビール|アルコール|ハイボール|サワー|日本酒|焼酎|ワイン|ウイスキー|梅酒|カクテル|マッコリ/.test(`${entry.name} ${entry.note ?? ""}`)).length;
  const estimateSummary = getDailyNutritionEstimate(input.foodEntries, {
    calories: totals.calories,
    protein: totals.protein,
    fat: totals.fat,
    carbs: totals.carbs,
  }, input.goal, input.menuItems);
  const estimatedFoodEntries = estimateSummary.entries.map(({ entry }) => entry);
  const estimatedFoodRatio = `${estimateSummary.estimatedCalorieShare}%`;
  const sessionIds = new Set(input.workoutSessions.map((session) => session.id));
  const scopedExercises = input.workoutExercises.filter((exercise) => sessionIds.has(exercise.session_id));
  const isDaily = input.periodStart === input.periodEnd;
  const average = {
    calories: Math.round(totals.calories / divisor),
    protein: Math.round(totals.protein / divisor),
    fat: Math.round(totals.fat / divisor),
    carbs: Math.round(totals.carbs / divisor),
  };
  const macroDiffs = input.goal
    ? {
        calories: average.calories - input.goal.target_calories,
        protein: average.protein - input.goal.target_protein_g,
        fat: average.fat - input.goal.target_fat_g,
        carbs: average.carbs - input.goal.target_carbs_g,
      }
    : undefined;
  const fcWarnings = macroDiffs
    ? [
        macroDiffs.fat > 0 ? `脂質 +${macroDiffs.fat}g` : "",
        macroDiffs.carbs > 0 ? `炭水化物 +${macroDiffs.carbs}g` : "",
      ].filter(Boolean)
    : [];

  const foodLines = input.foodEntries.map((entry) => {
    const brand = entry.brand ? `${entry.brand} / ` : "";
    const note = entry.note ? ` / ${entry.note}` : "";
    const mealType = mealTypeLabels[entry.meal_type] ?? entry.meal_type;
    return `- ${entry.app_date} ${mealType}: ${brand}${normalizeFoodLoggedQuantityName(entry.name)} ${entry.calories}kcal / P${entry.protein_g} F${entry.fat_g} C${entry.carbs_g}${formatFoodEntrySourceNote(entry)}${note}`;
  });

  const exerciseLines = scopedExercises.map((exercise) => {
    const sets = input.workoutSets.filter((set) => set.workout_exercise_id === exercise.id);
    const activeCalories = sets.reduce((sum, set) => sum + (set.active_calories ?? 0), 0);
    const best = sets
      .filter((set) => set.weight_kg || set.reps)
      .sort((a, b) => workoutSetScoreForReport(b) - workoutSetScoreForReport(a))[0];
    const cardio = activeCalories ? ` / active ${activeCalories}kcal` : "";
    return `- ${exercise.exercise_name}: ${sets.length} set${best ? ` / best ${formatWorkoutLoadForReport(best)} x ${best.reps ?? "-"}` : ""}${cardio}`;
  });
  const workoutSummaryLines = buildWorkoutSummaryLines({
    grouping: input.workoutGrouping ?? "day",
    sessions: input.workoutSessions,
    exercises: scopedExercises,
    sets: input.workoutSets,
  });
  const dailyWorkoutDetailLines = buildDailyWorkoutDetailLines({
    sessions: input.workoutSessions,
    exercises: scopedExercises,
    sets: input.workoutSets,
  });
  const reportCoverage: ReportCoverage = input.reportCoverage ?? (isDaily && input.periodEnd === input.currentAppDate ? "partial" : "completed");
  const pauseDayDates = specialModeDays.filter((day) => day.kind === "pause").map((day) => day.date);
  const foodCoverageDays = buildFoodCoverageDays({
    dates,
    foodEntries: input.foodEntries,
    contexts: input.foodRecordContexts,
    cheatDayDates,
    pauseDayDates,
    currentAppDate: input.currentAppDate,
    dailyReportCoverage: isDaily ? reportCoverage : undefined,
  });
  const missingDays = foodCoverageDays.filter((day) => day.status !== "recorded").map((day) => day.date);
  const incompleteFoodDays = foodCoverageDays.filter((day) => !["recorded", "excluded"].includes(day.status));
  const periodFoodAverageReliable = incompleteFoodDays.length === 0;
  const isInProgressDailyReport = isDaily && reportCoverage === "partial";
  const proteinSafety = input.goal ? getProteinSafetyPresentation({
    adoptedProtein: estimateSummary.adoptedTotals.protein,
    safeProteinLowerBound: estimateSummary.safeProteinLowerBound,
    targetProtein: input.goal.target_protein_g,
    coverage: reportCoverage,
  }) : undefined;
  const defaultFoodSummaryLabels = getFoodSummaryLabels(isDaily);
  const foodSummaryLabels = !isDaily && !periodFoodAverageReliable
    ? { heading: "記録日の食事平均", calories: "記録日の平均 kcal", macros: "記録日の平均 P/F/C" }
    : defaultFoodSummaryLabels;
  const displayedNutrition = isDaily ? {
    calories: Math.round(totals.calories),
    protein: round1(totals.protein),
    fat: round1(totals.fat),
    carbs: round1(totals.carbs),
  } : average;
  const hasRecordedFood = foodDays.size > 0;
  const inProgressDifferenceLines = isDaily && !hasRecordedFood
    ? reportCoverage === "partial"
      ? "- 食事はまだ記録されていません。途中経過のため、残量や未達は評価しません"
      : "- 食事の摂取量が不明なため、目標との差分は評価できません"
    : macroDiffs && isInProgressDailyReport
    ? [
        `- kcal: ${formatInProgressRemaining(estimateSummary.adoptedRemaining.calories, "kcal")}`,
        `- P: ${formatInProgressRemaining(estimateSummary.adoptedRemaining.protein, "g")}`,
        `- F: ${formatInProgressRemaining(estimateSummary.adoptedRemaining.fat, "g")}`,
        `- C: ${formatInProgressRemaining(estimateSummary.adoptedRemaining.carbs, "g")}`,
        "- 判定: 当日途中のため最終評価はしません",
      ].join("\n")
    : macroDiffs
      ? [
          `- kcal: ${formatDiff(macroDiffs.calories, "kcal")}`,
          `- P: ${formatDiff(macroDiffs.protein, "g")}`,
          `- F: ${formatDiff(macroDiffs.fat, "g")}`,
          `- C: ${formatDiff(macroDiffs.carbs, "g")}`,
          `- F/C超過: ${fcWarnings.join(" / ") || "なし"}`,
        ].join("\n")
      : "- 目標未設定";
  const estimateBreakdownLines = [
    `- 推定を含むログ: ${estimateSummary.estimatedEntryCount}件${estimateSummary.estimatedEntryCount ? "（該当ログは食事詳細に明記）" : ""}`,
    `  - カロリー推定あり: ${estimateSummary.estimatedCalorieEntryCount}件`,
    `  - PFC推定あり: ${estimateSummary.macroEstimatedEntryCount}件`,
    `  - PFCのみ推定あり: ${estimateSummary.pfcOnlyEstimatedEntryCount}件`,
    `  - 摂取総量推定あり: ${estimateSummary.quantityEstimatedEntryCount}件`,
    `  - 構成量・内訳推定あり: ${estimateSummary.compositionEstimatedEntryCount}件`,
    `  - 0kcal推定項目: ${estimateSummary.zeroCalorieEstimatedEntryCount}件`,
    "  - ※各分類は重複するため、内訳件数の合計はログ総数と一致しない場合があります",
    `- 推定カロリー比率: ${estimatedFoodRatio}`,
    `- 安全側バッファ: ${estimateSummary.uncertainty.calories}kcal / P${estimateSummary.uncertainty.protein}g / F${estimateSummary.uncertainty.fat}g / C${estimateSummary.uncertainty.carbs}g`,
  ].join("\n");
  const dailyRemainingLines = isDaily && hasRecordedFood
    ? [
        `- 採用値ベース残量: ${formatRemainingForReport(estimateSummary.adoptedRemaining.calories, "kcal")} / P ${formatRemainingForReport(estimateSummary.adoptedRemaining.protein, "g")} / F ${formatRemainingForReport(estimateSummary.adoptedRemaining.fat, "g")} / C ${formatRemainingForReport(estimateSummary.adoptedRemaining.carbs, "g")}`,
        `- 安全側の追加上限: ${formatRemainingForReport(estimateSummary.safeRemaining.calories, "kcal")} / F ${formatRemainingForReport(estimateSummary.safeRemaining.fat, "g")} / C ${formatRemainingForReport(estimateSummary.safeRemaining.carbs, "g")}`,
        proteinSafety
          ? `- Pの安全側評価: ${proteinSafety.valueLine} / ${proteinSafety.message}`
          : "- Pの安全側評価: P目標未設定",
      ].join("\n")
    : isDaily ? "- 食事の摂取量が不明なため、残量は算出しません" : "";
  const estimatedFoodRequestLine = estimatedFoodEntries.length
    ? "- 食事ログに推定値が含まれています。可能ならAI側で公式サイト・商品ページ・信頼できる栄養データから正しい kcal / P / F / C の取得を試み、推定値との差分が大きいものを明記してください。"
    : "";
  const cheatDayRequestLine = cheatDayDates.length
    ? "- 対象範囲にチートデーがあります。該当日は通常の目標超過として厳しく評価しすぎず、週/月の平均や翌日以降の調整方針として扱ってください。"
    : "";
  const travelModeDays = specialModeDays.filter((day) => !day.isTest && day.kind !== "pause" && day.kind !== "test");
  const pauseModeDays = specialModeDays.filter((day) => day.kind === "pause");
  const testModeDays = specialModeDays.filter((day) => day.isTest || day.kind === "test");
  const specialModeRequestLine = travelModeDays.length
    ? "- 対象範囲に旅行モードの日があります。旅行期間として通常の目標判定から一部例外扱いにし、外食、塩分、炭水化物、移動疲労、水分変動を考慮してください。記録継続、たんぱく質確保、胃腸負担、通常復帰の提案を優先してください。"
    : "";
  const pauseModeRequestLine = pauseModeDays.length
    ? "- 対象範囲に一時停止モードの日があります。体調不良、休養、旅行後の戻し、仕事都合などで通常目標を追わない期間として扱い、厳しい達成判定ではなく復帰しやすい食事・運動・体重評価を優先してください。"
    : "";
  const testModeRequestLine = testModeDays.length
    ? "- 対象範囲にテストモードの日があります。動作確認中の記録である可能性があるため、実際の生活ログとして厳密に評価しすぎず、必要なら分析対象から分けて扱ってください。"
    : "";
  const targetPeriodRequestLine = input.goal?.target_date
    ? "- 目標体重と目標達成日から設定されている期間補正を、最新体重基準と7日平均基準の両方で評価してください。フェーズに応じて、どちらを主判定にするかも明記してください。"
    : "- 目標達成日が未設定です。目標体重に対して適切な達成期間を提案し、日次kcal補正の目安を出してください。";
  const targetBodyFatRequestLine = typeof input.goal?.target_body_fat_percentage === "number"
    ? "- 目標体脂肪率と体組成差分を、減量・リコンプ・バルクの目的に対して妥当か評価してください。体重だけでなく、脂肪量と除脂肪量の変化を前提に判断してください。"
    : "- 目標体脂肪率が未設定です。現在の体脂肪率とフェーズから、設定するならどの程度が現実的か提案してください。";
  const customTargetRequestLine = hasManualTargets(input.goal)
    ? "- 目標 kcal / P / F / C にはカスタム設定が含まれています。自動計算値との差だけを問題視せず、カスタム設定である前提で妥当性を評価してください。"
    : "";
  const periodAdjustmentPolicyLine = hasManualTargets(input.goal)
    ? "- 目標kcal/PFCはカスタム設定です。表示されている目標kcalを最終目標として扱い、期間補正をさらに上乗せ/差し引きしないでください。期間補正は目標設計の参考情報として扱ってください。"
    : "- 期間補正や参考kcal補正は二重加算せず、変更が必要な場合は修正後の最終目標kcalとして提案してください。";
  const activitySection = formatActivitySection(input.activityProfile, input.dailyActivity, input.goal, isDaily);
  const foodCoverageSection = formatFoodCoverageSection(foodCoverageDays, periodFoodAverageReliable);

  const goalTargetWeightText = typeof input.goal?.target_weight_kg === "number" ? `${input.goal.target_weight_kg}kg` : "-";
  const goalTargetBodyFatText = typeof input.goal?.target_body_fat_percentage === "number" ? `${input.goal.target_body_fat_percentage}%` : "-";
  const currentBodyComposition = getCurrentBodyComposition(latestWeight, input.profile);
  const targetBodyCompositionSummary = formatTargetBodyCompositionSummary(input.goal);
  const targetBodyCompositionDetail = formatTargetBodyCompositionDetail(input.goal, currentBodyComposition);
  const targetCustomizationText = formatTargetCustomization(input.goal);

  return `# 100% トラッカー AI相談レポート

${isDaily ? `対象日: ${input.periodStart}` : `期間: ${input.periodStart} - ${input.periodEnd}`}

## レポート情報

- 生成日時: ${formatReportDateTime(input.generatedAt)}
- 送信内容: ${contentScope === "food" ? "食事" : contentScope === "workout" ? "ワークアウト" : "食事とワークアウト"}
- 対象範囲の状態: ${isDaily ? reportCoverage === "partial" ? "当日途中" : "1日完了" : "対象期間の記録"}
- チートデー: ${cheatDayDates.length ? `あり (${cheatDayDates.join(", ")})` : "なし"}
- 旅行モード: ${travelModeDays.length ? travelModeDays.map((day) => `${day.date} ${day.label}`).join(", ") : "なし"}
- 一時停止モード: ${pauseModeDays.length ? pauseModeDays.map((day) => `${day.date} ${day.label}`).join(", ") : "なし"}
- テストモード: ${testModeDays.length ? testModeDays.map((day) => day.date).join(", ") : "なし"}
${isDaily && reportCoverage === "partial" ? "- 注意: このレポートは1日の途中経過です。最終的な摂取量・活動量・運動量とは限らない前提で判断してください。" : isDaily ? "- 注意: 1日全体の記録として作成していますが、未記録が完全にないことを保証するものではありません。" : ""}

## AIへの依頼

- このレポート、これまでの会話、AI側で把握している追加情報を踏まえて、現在の目標に対する適正な目標カロリーとP/F/Cを算定してください。
- 対象範囲の状態が当日途中の場合は、途中経過であることを明記し、その時点までの傾向として評価してください。
- チートデーがある場合は、該当日をチートデーとして明記したうえで、通常日と分けて評価してください。
- 旅行モードがある場合は、旅行中であることを明記し、この期間を通常日とは分けて評価してください。
- 一時停止モードがある場合は、休養・中断期間として明記し、通常目標の未達より復帰計画を優先してください。
- 食事の採用値は日々の残量計算にそのまま使用し、AI側で勝手に補正・置換しないでください。
- 推定値があっても採用値ベースの計算は曖昧にせず、食事提案では採用値ベース残量と安全側残量を区別してください。
- 数g・数十kcalの差を身体変化として断定する際は、推定幅と推定カロリー比率を考慮してください。
- テストモードがある場合は、テスト中の記録であることを明記し、通常ログとは分けて扱ってください。
- 体重、体脂肪率、活動量、トレーニング頻度、生活リズムなどについて、AI側にこのレポートより詳細または新しい情報がある場合は、その情報を優先して判断してください。
- 活動量は、平均活動量プロフィールと対象日の活動量を分けて評価してください。
- 「少なめ」「多め」は定性的な申告です。具体的な消費カロリーへ自動変換しないでください。
- ムーブ／アクティブカロリーは摂取可能カロリーへそのまま加算しないでください。
- 筋トレや有酸素の記録だけから、日常の総活動量が増えたと断定しないでください。
- 活動量データが不足している場合は不足を明記し、推測で補完しないでください。
- 摂取量、体重推移、活動量、筋トレ状況を合わせて評価し、単日の活動量だけで長期目標を大きく変更しないでください。
- 食事記録がない日は、明示的な「ほぼ食事なし」の申告がない限り0 kcalや絶食日として扱わないでください。
- チートデーの食事が未記録の場合、記録済みの日だけから期間平均やカロリー収支を断定しないでください。
- 食事記録カバレッジが不完全な場合は信頼度を明記し、必要なら最終判断の前に未記録日の食事量を確認してください。
- 未記録摂取がある可能性を確認してから、活動量、有酸素運動、目標カロリーの変更を提案してください。
- AI側で判断した適正値が、現在トラッカーに設定されている kcal / P / F / C と違う場合は、トラッカー側の値を編集する前提で修正後の数値を明示してください。
- 体重・体脂肪率・運動強度・フェーズ・週の運動目標など、PFC以外にもトラッカー側で直した方がよい項目があれば併せて示してください。
${targetPeriodRequestLine}
${targetBodyFatRequestLine}
${customTargetRequestLine}
${periodAdjustmentPolicyLine}
${estimatedFoodRequestLine}
${cheatDayRequestLine}
${specialModeRequestLine}
${pauseModeRequestLine}
${testModeRequestLine}
- 修正が不要な場合も、その理由と次に見るべき記録指標を簡潔に教えてください。
- トラッカー側で変更する値がある場合は、「トラッカー修正案」として、そのまま入力しやすい形でまとめてください。

## 現在のゴール

- フェーズ: ${input.goal ? phaseLabels[input.goal.phase] : "未設定"}
- 目標体重: ${goalTargetWeightText}
- 目標体脂肪率: ${goalTargetBodyFatText}
- 目標達成日: ${input.goal?.target_date ?? "未設定"}
- 保存済み期間補正: ${typeof input.goal?.target_daily_calorie_adjustment === "number" ? `${formatSignedInteger(input.goal.target_daily_calorie_adjustment)}kcal/日` : "未設定"}
- 保存済み体重変化ペース: ${typeof input.goal?.target_weight_change_per_week_kg === "number" ? `${formatSignedNumber(input.goal.target_weight_change_per_week_kg, 2)}kg/週` : "未設定"}
- 体組成目標: ${targetBodyCompositionSummary}
- 目標 kcal: ${input.goal?.target_calories ?? "-"}
- 目標 P/F/C: ${input.goal?.target_protein_g ?? "-"}g / ${input.goal?.target_fat_g ?? "-"}g / ${input.goal?.target_carbs_g ?? "-"}g
- 目標 kcal/PFC の設定: ${targetCustomizationText}
- 週の運動目標: 筋トレ ${input.goal?.target_workouts_per_week ?? "-"}回 / 有酸素 ${input.goal?.target_cardio_sessions_per_week ?? "-"}回

## 体組成目標

${targetBodyCompositionDetail}

## プロフィール

- 名前: ${input.profile?.name ?? "-"}
- 身長: ${input.profile?.height_cm ?? "-"}cm
- 現在体重: ${latestWeight?.weight_kg ?? input.profile?.current_weight_kg ?? "-"}kg
- 体脂肪率: ${latestWeight?.body_fat_percentage ?? input.profile?.body_fat_percentage ?? "-"}%

## 体重トレンド

${formatWeightTrendSection({ goal: input.goal, phase: input.goal?.phase, isDaily, firstWeight, latestWeight, sevenDayAverageWeight, recentWeightLogs, totalCount: sortedWeightLogs.length })}

## 期間補正の参考

${formatTargetPeriodReferenceSection({
    goal: input.goal,
    latestWeightKg: latestWeight?.weight_kg,
    sevenDayAverageWeightKg: sevenDayAverageWeight,
    periodEnd: input.periodEnd,
  })}

## 活動量情報

${activitySection}

${includeFood ? `## 食事記録カバレッジ

${foodCoverageSection}

## ${foodSummaryLabels.heading}

- 記録あり日数: ${foodDays.size}
- 詳細未記録日: ${missingDays.length}日 (${missingDays.join(", ") || "なし"})
- 期間平均の扱い: ${periodFoodAverageReliable ? "対象期間の平均として参照可能" : `正確な算出不可（表示値は記録のある${foodDays.size}日間のみ）`}
- ${foodSummaryLabels.calories}: ${hasRecordedFood ? displayedNutrition.calories : "算出不可（未記録を0kcalとは扱いません）"}
- ${foodSummaryLabels.macros}: ${hasRecordedFood ? `${displayedNutrition.protein}g / ${displayedNutrition.fat}g / ${displayedNutrition.carbs}g` : "算出不可"}
- 外食・チェーン系ログ: ${eatingOut}件
- スイーツ系ログ: ${sweets}件
- 飲酒・飲み会ログ: ${drinking}件
- チートデー: ${cheatDayDates.length ? `${cheatDayDates.length}日 (${cheatDayDates.join(", ")})` : "なし"}
- 旅行モード: ${travelModeDays.length ? `${travelModeDays.length}日 (${travelModeDays.map((day) => day.label).join(", ")})` : "なし"}
- 一時停止モード: ${pauseModeDays.length ? `${pauseModeDays.length}日 (${pauseModeDays.map((day) => day.label).join(", ")})` : "なし"}
- テストモード: ${testModeDays.length ? `${testModeDays.length}日` : "なし"}
${estimateBreakdownLines}
${dailyRemainingLines}

## 目標との差分

${inProgressDifferenceLines}

${isDaily ? "## その日の食事詳細" : "## 食事ログ"}

${foodLines.join("\n") || "- 記録なし"}` : ""}

${includeWorkout ? (isDaily ? `## その日のワークアウト詳細

- セッション数: ${input.workoutSessions.length}
- 種目数: ${scopedExercises.length}
- セット数: ${dailyWorkoutDetailLines.setCount}

${dailyWorkoutDetailLines.lines.join("\n") || "- 記録なし"}` : `## ワークアウト

- セッション数: ${input.workoutSessions.length}
- 種目数: ${scopedExercises.length}
- 今週の達成状況: ${input.weeklyWorkoutStatus ? formatWeeklyWorkoutStatus(input.weeklyWorkoutStatus) : "未計算"}
- 今週の対象期間: ${input.weeklyWorkoutStatus ? `${input.weeklyWorkoutStatus.start} - ${input.weeklyWorkoutStatus.end}` : "-"}
- 履歴粒度: ${groupingLabel(input.workoutGrouping ?? "day")}

### ワークアウト要約

${workoutSummaryLines.join("\n") || "- 記録なし"}

### 種目詳細

${exerciseLines.join("\n") || "- 記録なし"}`) : ""}

## 相談したいこと

${input.question || "ここに質問を追記してください。"}
`;
}

function formatFoodCoverageSection(days: FoodCoverageDay[], periodAverageReliable: boolean) {
  const recordedDays = days.filter((day) => day.status === "recorded");
  const unrecordedDays = days.filter((day) => day.status === "unrecorded");
  const qualitativeDays = days.filter((day) => day.status === "estimated_only" && day.context?.estimated_calories === undefined);
  const roughEstimateDays = days.filter((day) => day.status === "estimated_only" && day.context?.estimated_calories !== undefined);
  const noFoodDays = days.filter((day) => day.status === "declared_no_food");
  const partialDays = days.filter((day) => day.status === "partial");
  const excludedDays = days.filter((day) => day.status === "excluded");
  const cheatWithoutDetails = days.filter((day) => day.isCheatDay && day.status !== "recorded");
  const detailLines = days
    .filter((day) => day.status !== "recorded")
    .map((day) => {
      const prefix = day.isCheatDay ? "チートデー / " : "";
      if (day.status === "excluded") return `- ${day.date}: ${prefix}一時停止モードのため集計対象外`;
      if (day.status === "partial") return `- ${day.date}: ${prefix}途中経過`;
      if (day.status === "declared_no_food") return `- ${day.date}: ${prefix}ユーザー申告上、ほぼ食事なし`;
      if (day.context) {
        const estimate = typeof day.context.estimated_calories === "number"
          ? ` / 概算 ${Math.round(day.context.estimated_calories)}kcal${formatOptionalMacroEstimate(day.context)}`
          : " / カロリー不明";
        const memo = day.context.intake_memo ? ` / メモ: ${day.context.intake_memo}` : "";
        return `- ${day.date}: ${prefix}${intakeRelativeLevelLabels[day.context.intake_relative_level]}${estimate}${memo}`;
      }
      return `- ${day.date}: ${prefix}食事記録なし・摂取量不明`;
    });
  return [
    `- 対象日数: ${days.length}日`,
    `- 詳細な食事記録あり: ${recordedDays.length}日`,
    `- 食事未記録・摂取量不明: ${unrecordedDays.length}日`,
    `- 定性的な申告のみ: ${qualitativeDays.length}日`,
    `- 概算値のみ: ${roughEstimateDays.length}日`,
    `- ほぼ食事なしの申告: ${noFoodDays.length}日`,
    `- 途中経過: ${partialDays.length}日`,
    `- 集計対象外: ${excludedDays.length}日`,
    `- チートデーで詳細未記録: ${cheatWithoutDetails.length}日${cheatWithoutDetails.length ? ` (${cheatWithoutDetails.map((day) => day.date).join(", ")})` : ""}`,
    `- 期間全体の平均摂取量: ${periodAverageReliable ? "算出可能" : "正確な算出不可"}`,
    `- 食事記録の信頼度: ${getFoodCoverageConfidence(days)}`,
    ...(detailLines.length ? ["", "### 詳細未記録日の状態", ...detailLines] : []),
    ...(!periodAverageReliable ? [
      "",
      "### AIへの注意",
      "- 未記録日を0 kcalとして扱わないでください。",
      "- 表示される食事平均は記録日のみを対象としており、期間全体の平均ではありません。",
      "- 記録済みの日だけを根拠に、期間全体の食事管理やエネルギー収支を肯定しないでください。",
      "- 情報不足が結論へ影響する場合は、追加確認するか低信頼度として示してください。",
    ] : []),
  ].join("\n");
}

function formatOptionalMacroEstimate(context: FoodRecordContext) {
  const macros = [
    typeof context.estimated_protein_g === "number" ? `P${context.estimated_protein_g}g` : "",
    typeof context.estimated_fat_g === "number" ? `F${context.estimated_fat_g}g` : "",
    typeof context.estimated_carbs_g === "number" ? `C${context.estimated_carbs_g}g` : "",
  ].filter(Boolean);
  return macros.length ? ` (${macros.join(" ")})` : "";
}

function formatRemainingForReport(value: number, unit: string) {
  const absolute = unit === "kcal" ? Math.round(Math.abs(value)) : Math.round(Math.abs(value) * 10) / 10;
  return value >= 0 ? `残り${absolute}${unit}` : `超過${absolute}${unit}`;
}

const activityLevelReportLabels = {
  low: "低い",
  moderate: "中程度",
  high: "高い",
  very_high: "非常に高い",
} as const;

const relativeActivityReportLabels = {
  low: "通常より少なめ",
  normal: "いつも通り",
  high: "通常より多め",
  unknown: "わからない",
} as const;

function formatActivitySection(profile: ActivityProfile | undefined, daily: DailyActivityContext | undefined, goal: Goal | undefined, isDaily: boolean) {
  const level = profile?.activity_level ?? goal?.activity_level;
  const profilePresentation = getActivityProfilePresentation(profile, goal?.activity_level);
  const dailyPresentation = getDailyActivityPresentation(daily);
  const lines = [
    "### 平均活動量プロフィール",
    `- 活動区分: ${level ? activityLevelReportLabels[level] : "未設定"}${!profile && level ? "（ゴール設定を参照）" : ""}`,
    `- 平均期間: ${profile?.averaging_period === "last_4_weeks" ? "直近4週間" : profile?.averaging_period === "last_30_days" ? "直近30日" : profile ? "初期セットアップ時の設定" : "未設定"}`,
    `- 平均歩数: ${typeof profile?.average_steps === "number" ? `${Math.round(profile.average_steps).toLocaleString("ja-JP")}歩` : "未入力"}`,
    `- 平均ムーブ: ${typeof profile?.average_active_calories === "number" ? `${Math.round(profile.average_active_calories)}kcal（アクティブカロリー）` : "未入力"}`,
    `- 平均エクササイズ時間: ${typeof profile?.average_exercise_minutes === "number" ? `${Math.round(profile.average_exercise_minutes)}分` : "未入力"}`,
    `- 平均活動量の補足: ${profile?.notes?.trim() || "なし"}`,
    `- データソース: ${profilePresentation.sourceLabel}`,
    `- 信頼度: ${profilePresentation.confidenceLabel}`,
    "",
    `### ${isDaily ? "対象日の活動量" : "期間最終日の活動量"}`,
    `- 定性入力: ${daily ? relativeActivityReportLabels[daily.relative_activity_level] : isDaily ? "わからない" : "未入力"}`,
    `- 対象日の歩数: ${typeof daily?.steps === "number" ? `${Math.round(daily.steps).toLocaleString("ja-JP")}歩` : "未入力"}`,
    `- 対象日のムーブ: ${typeof daily?.active_calories === "number" ? `${Math.round(daily.active_calories)}kcal（アクティブカロリー）` : "未入力"}`,
    `- 対象日のエクササイズ時間: ${typeof daily?.exercise_minutes === "number" ? `${Math.round(daily.exercise_minutes)}分` : "未入力"}`,
    `- 追加の徒歩 / 自転車: ${typeof daily?.walking_minutes === "number" ? `${Math.round(daily.walking_minutes)}分` : "未入力"} / ${typeof daily?.cycling_minutes === "number" ? `${Math.round(daily.cycling_minutes)}分` : "未入力"}`,
    `- その他の活動: ${daily?.notes?.trim() || "なし"}`,
    `- データソース: ${dailyPresentation.sourceLabel}`,
    `- 数値評価: ${dailyPresentation.numericEvaluationLabel}`,
    `- 信頼度: ${dailyPresentation.confidenceLabel}`,
  ];
  if (!daily || (daily.relative_activity_level === "unknown" && !dailyPresentation.hasNumericData)) {
    lines.push(`- 注意: ${isDaily ? "対象日の" : "期間最終日の"}活動量情報が不足しているため、エネルギー収支には不確実性があります`);
  }
  return lines.join("\n");
}

function formatInProgressRemaining(value: number, unit: string) {
  const absolute = unit === "kcal" ? Math.round(Math.abs(value)) : Math.round(Math.abs(value) * 10) / 10;
  if (value > 0) return unit === "kcal" ? `残り${absolute}${unit}` : `あと${absolute}${unit}`;
  if (value < 0) return `記録上は${absolute}${unit}多め`;
  return "目標まで0";
}

function formatFoodEntrySourceNote(entry: FoodEntry) {
  const evidence = entry.nutrition_meta?.nutrient_evidence;
  const calorieOrigin = evidence?.calories?.origin;
  const caloriesOfficial = evidence?.calories?.estimation_policy === "exact" && (calorieOrigin === "official_website" || calorieOrigin === "package_label");
  const macrosEstimated = [evidence?.protein_g, evidence?.fat_g, evidence?.carbs_g].some((item) => item && item.estimation_policy !== "exact");
  if (caloriesOfficial && macrosEstimated) return " / データ: 公式kcal・PFC推定";
  if (entry.nutrition_meta?.quantity_meta?.estimated && caloriesOfficial) return " / データ: 商品ラベル値・摂取量推定";
  if (entry.entry_source === "official" && entry.confidence === "high") return " / データ: 公式値";
  if (entry.entry_source === "user") {
    return ` / データ: ユーザー入力${entry.confidence !== "high" ? "（未確認・要確認）" : ""}`;
  }
  if (entry.entry_source === "unofficial") return " / データ: 非公式値（要確認）";
  if (entry.entry_source === "quick_estimate") return " / データ: クイック見積（推定値・要確認）";
  if (entry.entry_source === "estimated") return " / データ: 推定値（要確認）";
  return entry.confidence === "high" ? "" : " / データ: 要確認";
}

function normalizeFoodLoggedQuantityName(name: string) {
  return name.replace(/[（(]([^（）()]+)[）)]\s*[（(]\s*\1\s*×\s*([0-9]+(?:\.[0-9]+)?)\s*[）)]/g, (_, label: string, quantityText: string) => {
    return `（${label}）（${formatFoodQuantitySummary(label, Number(quantityText))}）`;
  });
}

function formatFoodQuantitySummary(label: string, quantity: number) {
  const safeQuantity = Math.max(0, quantity);
  const normalized = label.trim();
  const countMatch = normalized.match(/^(\d+(?:\.\d+)?)\s*(個|本|枚|杯|食|袋|粒|切れ|パック)$/);
  if (countMatch) {
    const total = round1(Number(countMatch[1]) * safeQuantity);
    return `合計${formatFoodAmountValue(total)}${countMatch[2]}`;
  }
  const gramsMatch = normalized.match(/^(\d+(?:\.\d+)?)\s*g$/i);
  if (gramsMatch) {
    const total = round1(Number(gramsMatch[1]) * safeQuantity);
    return `合計${formatFoodAmountValue(total)}g`;
  }
  const mlMatch = normalized.match(/^(\d+(?:\.\d+)?)\s*(ml|mL|ML)$/);
  if (mlMatch) {
    const total = round1(Number(mlMatch[1]) * safeQuantity);
    return `合計${formatFoodAmountValue(total)}ml`;
  }
  return `${normalized} × ${formatFoodAmountValue(safeQuantity)}回分`;
}

function formatFoodAmountValue(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value.toFixed(1).replace(/\.0$/, "")}`;
}

function buildWorkoutSummaryLines(input: {
  grouping: WorkoutGrouping;
  sessions: WorkoutSession[];
  exercises: WorkoutExercise[];
  sets: WorkoutSet[];
}) {
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  input.exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.sets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });

  const groups = new Map<string, WorkoutSession[]>();
  input.sessions.forEach((session) => {
    const key = input.grouping === "day" ? session.app_date : input.grouping === "week" ? startOfWeek(session.app_date) : session.app_date.slice(0, 7);
    groups.set(key, [...(groups.get(key) ?? []), session]);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, sessions]) => {
      const exerciseCount = sessions.reduce((sum, session) => sum + (exercisesBySession.get(session.id)?.length ?? 0), 0);
      const setCount = sessions.reduce((sum, session) => {
        const sessionExercises = exercisesBySession.get(session.id) ?? [];
        return sum + sessionExercises.reduce((setSum, exercise) => setSum + (setsByExercise.get(exercise.id)?.length ?? 0), 0);
      }, 0);
      const titles = sessions.map((session) => session.title).join(" / ");
      return `- ${formatGroupingKey(key, input.grouping)}: ${sessions.length}回 / ${exerciseCount}種目 / ${setCount}セット (${titles})`;
    });
}

function buildDailyWorkoutDetailLines(input: {
  sessions: WorkoutSession[];
  exercises: WorkoutExercise[];
  sets: WorkoutSet[];
}) {
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  input.exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.sets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });

  let setCount = 0;
  const lines = [...input.sessions]
    .sort((a, b) => a.logged_at.localeCompare(b.logged_at))
    .flatMap((session) => {
      const sessionExercises = [...(exercisesBySession.get(session.id) ?? [])].sort((a, b) => a.order - b.order);
      const sessionKind = workoutSessionKindLabel(session, sessionExercises);
      const bodyParts = [...new Set((sessionExercises.length ? sessionExercises.map((exercise) => exercise.body_part) : session.body_parts).filter((part) => part !== "有酸素"))].join(" / ");
      const sessionLines = [
        `- セッション: ${session.title}（${sessionKind}${bodyParts ? ` / ${bodyParts}` : ""}${session.note ? ` / ${session.note}` : ""}）`,
      ];
      if (!sessionExercises.length) {
        sessionLines.push("  - 種目なし");
        return sessionLines;
      }
      sessionExercises.forEach((exercise) => {
        const exerciseSets = [...(setsByExercise.get(exercise.id) ?? [])].sort((a, b) => a.set_order - b.set_order);
        setCount += exerciseSets.length;
        sessionLines.push(`  - ${exercise.exercise_name}: ${exercise.body_part} / ${exercise.equipment_type}${exercise.note ? ` / ${exercise.note}` : ""}`);
        if (!exerciseSets.length) {
          sessionLines.push("    - セット記録なし");
          return;
        }
        exerciseSets.forEach((set) => {
          sessionLines.push(`    - ${set.set_order}セット目: ${formatWorkoutSetDetail(set)}`);
        });
      });
      return sessionLines;
    });

  return { lines, setCount };
}

function workoutSessionKindLabel(session: WorkoutSession, exercises: WorkoutExercise[]) {
  if (exercises.length) {
    const hasCardio = exercises.some((exercise) => exercise.body_part === "有酸素");
    const hasStrength = exercises.some((exercise) => exercise.body_part !== "有酸素");
    if (hasCardio && hasStrength) return "筋トレ＋有酸素";
    if (hasCardio) return "有酸素";
    if (hasStrength) return "筋トレ";
  }
  if (session.workout_type === "mixed") return "筋トレ＋有酸素";
  if (session.workout_type === "cardio") return "有酸素";
  if (session.workout_type === "strength") return "筋トレ";
  return session.workout_type || "未分類";
}

function formatWorkoutSetDetail(set: WorkoutSet) {
  const parts: string[] = [];
  if (typeof set.duration_min === "number") parts.push(`${set.duration_min}分`);
  if (typeof set.weight_kg === "number" || typeof set.reps === "number") {
    parts.push(`${formatWorkoutLoadForReport(set)} x ${typeof set.reps === "number" ? `${set.reps}回` : "回数未記録"}`);
  }
  if (typeof set.active_calories === "number") parts.push(`${set.active_calories}kcal`);
  if (set.intensity === finisherPulseIntensity) parts.push("仕上げパルス");
  else if (set.intensity) parts.push(`強度:${set.intensity}`);
  if (set.is_warmup) parts.push("ウォームアップ");
  if (set.note) parts.push(set.note);
  return parts.join(" / ") || "内容未記録";
}

function formatWorkoutLoadForReport(set: WorkoutSet) {
  if (set.load_type === "bodyweight") return "自重";
  if (set.load_type === "weighted") return `+${set.weight_kg ?? 0}kg`;
  if (set.load_type === "assisted") return `補助${set.weight_kg ?? 0}kg`;
  return typeof set.weight_kg === "number" ? `${set.weight_kg}kg` : "重量未記録";
}

function workoutSetScoreForReport(set: WorkoutSet) {
  const weight = set.weight_kg ?? 0;
  const reps = set.reps ?? 0;
  if (set.load_type === "assisted") return reps - weight / 10;
  return weight ? weight * (1 + reps / 30) : reps;
}

function groupingLabel(grouping: WorkoutGrouping) {
  if (grouping === "week") return "週別";
  if (grouping === "month") return "月別";
  return "日別";
}

function formatReportDateTime(isoString: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}

function startOfWeek(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date.toISOString().slice(0, 10);
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatGroupingKey(key: string, grouping: WorkoutGrouping) {
  if (grouping === "week") return `${key} - ${addDays(key, 6)}`;
  if (grouping === "month") return key;
  return key;
}

function hasManualTargets(goal?: Goal) {
  if (!goal) return false;
  return goal.phase === "custom" || [goal.manual_target_calories, goal.manual_protein_g, goal.manual_fat_g, goal.manual_carbs_g].some((value) => typeof value === "number");
}

function formatTargetCustomization(goal?: Goal) {
  if (!goal) return "未設定";
  const customParts = [
    typeof goal.manual_target_calories === "number" ? `kcal ${goal.manual_target_calories}` : "",
    typeof goal.manual_protein_g === "number" ? `P ${goal.manual_protein_g}g` : "",
    typeof goal.manual_fat_g === "number" ? `F ${goal.manual_fat_g}g` : "",
    typeof goal.manual_carbs_g === "number" ? `C ${goal.manual_carbs_g}g` : "",
  ].filter(Boolean);
  if (!customParts.length && goal.phase === "custom") {
    return `カスタム設定あり（既存カスタムゴール: kcal ${goal.target_calories} / P ${goal.target_protein_g}g / F ${goal.target_fat_g}g / C ${goal.target_carbs_g}g）`;
  }
  return customParts.length ? `カスタム設定あり（${customParts.join(" / ")}）` : "自動計算";
}

function getCurrentBodyComposition(latestWeight?: WeightLog, profile?: Profile) {
  const weight = latestWeight?.weight_kg ?? profile?.current_weight_kg;
  const bodyFat = latestWeight?.body_fat_percentage ?? profile?.body_fat_percentage;
  if (typeof weight !== "number" || typeof bodyFat !== "number" || bodyFat <= 0 || bodyFat >= 80) return undefined;
  const fatMass = round1(weight * (bodyFat / 100));
  return {
    fatMass,
    leanMass: round1(weight - fatMass),
  };
}

function formatTargetBodyCompositionSummary(goal?: Goal) {
  if (typeof goal?.target_fat_mass_kg !== "number" || typeof goal.target_lean_mass_kg !== "number") return "未設定";
  return `脂肪量 約${formatKg(goal.target_fat_mass_kg)} / 除脂肪量 約${formatKg(goal.target_lean_mass_kg)}（詳細は体組成目標セクション）`;
}

function formatTargetBodyCompositionDetail(goal?: Goal, current?: { fatMass: number; leanMass: number }) {
  if (typeof goal?.target_fat_mass_kg !== "number" || typeof goal.target_lean_mass_kg !== "number") {
    return "- 目標体脂肪率が未設定のため、体組成目標は未設定です。";
  }
  const fatChange = current ? round1(goal.target_fat_mass_kg - current.fatMass) : goal.target_fat_mass_change_kg;
  const leanChange = current ? round1(goal.target_lean_mass_kg - current.leanMass) : goal.target_lean_mass_change_kg;
  return `現在推定:
- 脂肪量: ${current ? `約${formatKg(current.fatMass)}` : "未推定（現在体脂肪率が未入力）"}
- 除脂肪量: ${current ? `約${formatKg(current.leanMass)}` : "未推定（現在体脂肪率が未入力）"}

目標:
- 脂肪量: 約${formatKg(goal.target_fat_mass_kg)}
- 除脂肪量: 約${formatKg(goal.target_lean_mass_kg)}

必要変化:
- 脂肪量: ${typeof fatChange === "number" ? `現在比 ${formatSignedKg(fatChange)}` : "現在推定がないため未計算"}
- 除脂肪量: ${typeof leanChange === "number" ? `現在比 ${formatSignedKg(leanChange)}` : "現在推定がないため未計算"}

補足: ${formatBodyCompositionGoalNote(goal.phase)}`;
}

function formatBodyCompositionGoalNote(phase: Phase) {
  const trendNote = "体組成計の数値は水分量やグリコーゲン量で変動するため、単日ではなく週平均・月平均の傾向で判断してください。";
  switch (phase) {
    case "weight_loss":
    case "slow_cut":
      return `減量では、脂肪量を減らしつつ除脂肪量の低下をできるだけ抑えることを重視します。${trendNote}`;
    case "lean_bulk":
      return `リーンバルクでは、除脂肪量を増やしながら脂肪量の増加を最小限に抑えることを重視します。${trendNote}`;
    case "recomposition":
      return `リコンプでは、体重だけでなく「脂肪量を減らし、除脂肪量を増やす」ことを目標にします。${trendNote}`;
    case "strength_focus":
      return `筋力重視では、トレーニング出力を伸ばしながら除脂肪量の維持・増加と過度な脂肪増加の抑制を見ます。${trendNote}`;
    case "maintenance":
      return `維持では、体重を大きく動かさず、脂肪量と除脂肪量の傾向が目的から外れていないかを見ます。${trendNote}`;
    case "custom":
      return `カスタム設定では、入力された目標体重・目標体脂肪率・PFCを優先し、脂肪量と除脂肪量の変化が目的に合っているかを見ます。${trendNote}`;
  }
}

function formatWeightTrendSection(input: {
  goal?: Goal;
  phase?: Phase;
  isDaily: boolean;
  firstWeight?: WeightLog;
  latestWeight?: WeightLog;
  sevenDayAverageWeight?: number;
  recentWeightLogs: WeightLog[];
  totalCount: number;
}) {
  const targetWeight = input.goal?.target_weight_kg;
  const latestDiff = typeof targetWeight === "number" && input.latestWeight ? targetWeight - input.latestWeight.weight_kg : undefined;
  const averageDiff = typeof targetWeight === "number" && typeof input.sevenDayAverageWeight === "number" ? targetWeight - input.sevenDayAverageWeight : undefined;
  const commonLines = [
    `- 最新体重: ${formatWeightLog(input.latestWeight)}`,
    `- 直近7日平均: ${typeof input.sevenDayAverageWeight === "number" ? `${formatKg(input.sevenDayAverageWeight)}（${input.recentWeightLogs.length}件）` : "-"}`,
    `- 目標体重: ${typeof targetWeight === "number" ? formatKg(targetWeight) : "-"}`,
    `- 最新体重基準の目標差分: ${formatTargetWeightDiff(targetWeight, latestDiff)}`,
    `- 7日平均基準の目標差分: ${formatTargetWeightDiff(targetWeight, averageDiff)}`,
    `- 判定補足: ${formatWeightEvaluationNote(input.phase)}`,
  ];
  if (input.isDaily) {
    return [
      ...commonLines,
      `- 参照できる体重記録: ${input.totalCount}件`,
    ].join("\n");
  }
  return [
    `- 初回: ${formatWeightLog(input.firstWeight)}`,
    ...commonLines,
    `- 記録回数: ${input.totalCount}`,
  ].join("\n");
}

function formatTargetPeriodReferenceSection(input: {
  goal?: Goal;
  latestWeightKg?: number;
  sevenDayAverageWeightKg?: number;
  periodEnd: string;
}) {
  const goal = input.goal;
  if (!goal || typeof goal.target_weight_kg !== "number" || !goal.target_date) {
    return "- 目標体重または目標達成日が未設定のため、期間補正の参考値は未計算です。";
  }
  const latestReference = buildPeriodReference(goal, input.latestWeightKg, input.periodEnd);
  const averageReference = buildPeriodReference(goal, input.sevenDayAverageWeightKg, input.periodEnd);
  return [
    `- 保存済み期間補正: ${typeof goal.target_weight_change_per_week_kg === "number" ? `${formatSignedNumber(goal.target_weight_change_per_week_kg, 2)}kg/週` : "-"}、${typeof goal.target_daily_calorie_adjustment === "number" ? `${formatSignedInteger(goal.target_daily_calorie_adjustment)}kcal/日` : "-"}`,
    `- 目標kcalへの扱い: ${hasManualTargets(goal) ? "カスタム設定あり。現在の目標kcal/PFCを最終値として扱い、下記の参考補正を二重に足し引きしないでください。" : "自動計算値の参考です。変更する場合は二重加算せず、修正後の最終目標kcalとして扱ってください。"}`,
    `- 最新体重基準の体重変化ペース: ${formatPeriodReferenceWeight(latestReference)}`,
    `- 最新体重基準のkcal補正: ${formatPeriodReferenceCalories(latestReference)}`,
    `- 7日平均基準の体重変化ペース: ${formatPeriodReferenceWeight(averageReference)}`,
    `- 7日平均基準のkcal補正: ${formatPeriodReferenceCalories(averageReference)}`,
    `- 判定補足: ${formatPeriodReferenceNote(goal.phase)}`,
  ].join("\n");
}

function buildPeriodReference(goal: Goal, referenceWeightKg: number | undefined, referenceDate: string): PeriodReference | undefined {
  if (typeof goal.target_weight_kg !== "number" || !goal.target_date || typeof referenceWeightKg !== "number") return undefined;
  const daysRemaining = daysBetween(referenceDate, goal.target_date);
  if (daysRemaining <= 0) return undefined;
  const diffKg = goal.target_weight_kg - referenceWeightKg;
  return {
    diffKg,
    weeklyWeightChangeKg: Number(((diffKg / daysRemaining) * 7).toFixed(2)),
    dailyCalories: Math.round((diffKg * 7700) / daysRemaining),
    daysRemaining,
  };
}

function daysBetween(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T12:00:00`).getTime();
  const end = new Date(`${endDate}T12:00:00`).getTime();
  return Math.round((end - start) / 86_400_000);
}

function formatTargetWeightDiff(targetWeight: number | undefined, diffKg: number | undefined) {
  if (typeof targetWeight !== "number" || typeof diffKg !== "number") return "-";
  return `${formatKg(targetWeight)}まで ${formatSignedKg(diffKg)}`;
}

function formatPeriodReferenceWeight(reference?: PeriodReference) {
  if (!reference) return "-";
  return `${formatSignedNumber(reference.weeklyWeightChangeKg, 2)}kg/週（残り${reference.daysRemaining}日）`;
}

function formatPeriodReferenceCalories(reference?: PeriodReference) {
  if (!reference) return "-";
  return `${formatSignedInteger(reference.dailyCalories)}kcal/日`;
}

function formatWeightEvaluationNote(phase?: Phase) {
  switch (phase) {
    case "recomposition":
      return "リコンプでは、単日体重ではなく7日平均体重・腹囲・写真・筋トレ重量を主判定にします。目標体重は必達値ではなく、体組成改善の目安です。体重が目標に届いていなくても、筋トレ重量が伸び、腹囲が増えていなければ成功とみなします。";
    case "weight_loss":
    case "slow_cut":
      return "減量では、単日体重より7日平均体重と腹囲の低下傾向を優先します。チートデー翌日や塩分が多い日の増加は水分変動として参考扱いにします。";
    case "lean_bulk":
      return "リーンバルクでは、7日平均体重のゆるやかな増加と筋トレ重量の伸びを主判定にします。単日の増減だけで増量不足/過多と判断しません。";
    case "strength_focus":
      return "筋力重視では、7日平均体重に加えてトレーニング出力、疲労、回復を優先します。体重目標はパフォーマンスを支える範囲で評価します。";
    case "maintenance":
      return "維持では、7日平均体重が目標付近の範囲に収まっているかを見ます。単日の水分変動ではなく週平均の安定性を優先します。";
    case "custom":
      return "カスタム設定では、入力された目的に沿って7日平均体重と体組成の傾向を優先し、単日体重は参考値として扱います。";
    default:
      return "単日体重は水分・グリコーゲン・胃腸内容物で変動するため、7日平均体重を併せて判断します。";
  }
}

function formatPeriodReferenceNote(phase: Phase) {
  switch (phase) {
    case "recomposition":
      return "リコンプでは7日平均基準を主判定にし、期間補正は体組成改善のペース確認として扱います。目標体重だけを追いすぎず、腹囲・写真・筋トレ重量も同時に見てください。";
    case "weight_loss":
    case "slow_cut":
      return "減量では7日平均基準の補正を主に見ます。急すぎるマイナス補正は筋量・回復への影響も評価してください。";
    case "lean_bulk":
      return "リーンバルクでは7日平均基準の増加ペースを主に見ます。脂肪増加が速すぎない範囲でkcalを評価してください。";
    case "strength_focus":
      return "筋力重視では参考補正だけでなく、トレーニング出力と回復状態を優先してkcalを評価してください。";
    case "maintenance":
      return "維持では参考補正が大きくなりすぎる場合、目標体重または達成日の設定が維持目的と合っているか確認してください。";
    case "custom":
      return "カスタム設定では参考補正を自動で上乗せせず、必要なら最終目標kcal/PFCとして提案してください。";
  }
}

function formatWeightLog(log?: WeightLog) {
  if (!log) return "-";
  return `${formatKg(log.weight_kg)} (${log.app_date})`;
}

function averageWeight(logs: WeightLog[]) {
  if (!logs.length) return undefined;
  return logs.reduce((sum, log) => sum + log.weight_kg, 0) / logs.length;
}

function formatKg(value: number) {
  return `${round1(value).toFixed(1)}kg`;
}

function formatSignedKg(value: number) {
  const rounded = round1(value);
  if (rounded > 0) return `+${rounded.toFixed(1)}kg`;
  if (rounded < 0) return `${rounded.toFixed(1)}kg`;
  return "±0.0kg";
}

function formatSignedInteger(value: number) {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${rounded}`;
  if (rounded < 0) return `${rounded}`;
  return "±0";
}

function formatSignedNumber(value: number, digits: number) {
  const rounded = Number(value.toFixed(digits));
  if (rounded > 0) return `+${rounded.toFixed(digits)}`;
  if (rounded < 0) return rounded.toFixed(digits);
  return `±${(0).toFixed(digits)}`;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function formatDiff(value: number, unit: string) {
  if (value > 0) return `+${value}${unit}超過`;
  if (value < 0) return `${Math.abs(value)}${unit}不足`;
  return "目標どおり";
}

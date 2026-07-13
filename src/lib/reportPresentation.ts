import type {
  ActivityDataSource,
  ActivityLevel,
  ActivityProfile,
  ActivityProfileDataSource,
  DailyActivityContext,
  ReportCoverage,
} from "../types";

export type ProteinSafetyKind = "adopted_below" | "uncertainty_crosses_target" | "safe_target_met";

export type ProteinSafetyPresentation = {
  kind: ProteinSafetyKind;
  valueLine: string;
  message: string;
};

export function getProteinSafetyPresentation(input: {
  adoptedProtein: number;
  safeProteinLowerBound: number;
  targetProtein: number;
  coverage: ReportCoverage;
}): ProteinSafetyPresentation {
  const adopted = round1(input.adoptedProtein);
  const lowerBound = round1(input.safeProteinLowerBound);
  const target = round1(input.targetProtein);
  const valueLine = `採用P ${formatNumber(adopted)}g / 下限P ${formatNumber(lowerBound)}g`;

  if (adopted < target) {
    const gap = round1(target - adopted);
    return {
      kind: "adopted_below",
      valueLine,
      message: input.coverage === "partial"
        ? `目標まであと${formatNumber(gap)}g`
        : `目標まで${formatNumber(gap)}g不足`,
    };
  }

  if (lowerBound < target) {
    const gap = round1(target - lowerBound);
    return {
      kind: "uncertainty_crosses_target",
      valueLine,
      message: `採用値では目標達成済み。推定が下振れした場合、最大${formatNumber(gap)}g届かない可能性があります。追加摂取は必須ではありません`,
    };
  }

  return {
    kind: "safe_target_met",
    valueLine,
    message: "下限でも目標を満たす見込み",
  };
}

export type ActivityProfilePresentation = {
  activityLevelLabel: string;
  sourceLabel: string;
  confidenceLabel: string;
  hasNumericData: boolean;
};

export type DailyActivityPresentation = {
  sourceLabel: string;
  numericEvaluationLabel: string;
  confidenceLabel: string;
  hasNumericData: boolean;
};

const activityLevelLabels: Record<ActivityLevel, string> = {
  low: "低い",
  moderate: "中程度",
  high: "高い",
  very_high: "非常に高い",
};

const activityDataSourceLabels: Record<ActivityProfileDataSource, string> = {
  apple_watch: "Apple Watch",
  apple_health: "Appleヘルスケア",
  smartphone: "スマートフォン",
  wearable: "その他のウェアラブル",
  user_estimate: "ユーザーによる推定",
  unknown: "保存元不明",
  initial_setup: "初期セットアップ",
};

export function getActivityProfilePresentation(profile: ActivityProfile | undefined, fallbackLevel?: ActivityLevel): ActivityProfilePresentation {
  const level = profile?.activity_level ?? fallbackLevel;
  const hasNumericData = !!profile && [profile.average_steps, profile.average_active_calories, profile.average_exercise_minutes]
    .some((value) => typeof value === "number");
  const source = profile?.data_source;
  const sourceLabel = profile
    ? source ? activityDataSourceLabels[source] : "保存元不明"
    : fallbackLevel ? "ゴール設定の活動区分" : "未設定";
  const confidenceLabel = !profile
    ? fallbackLevel ? "低（活動区分のみ）" : "評価不可"
    : !hasNumericData
      ? "低（活動区分のみ）"
      : isMeasuredActivitySource(source)
        ? "高"
        : source === "user_estimate"
          ? "中"
          : "中（保存元不明）";

  return {
    activityLevelLabel: level ? activityLevelLabels[level] : "未設定",
    sourceLabel,
    confidenceLabel,
    hasNumericData,
  };
}

export function getDailyActivityPresentation(daily: DailyActivityContext | undefined): DailyActivityPresentation {
  const hasNumericData = !!daily && [daily.steps, daily.active_calories, daily.exercise_minutes, daily.walking_minutes, daily.cycling_minutes]
    .some((value) => typeof value === "number");
  const hasQualitativeInput = !!daily && daily.relative_activity_level !== "unknown";
  const source = daily?.data_source;
  const sourceLabel = hasNumericData
    ? source && source !== "unknown" ? activityDataSourceLabels[source] : "保存元不明"
    : hasQualitativeInput ? "ユーザーの定性入力" : "未入力";
  const confidenceLabel = hasNumericData
    ? isMeasuredActivitySource(source)
      ? "高"
      : source === "user_estimate"
        ? "中"
        : "中（保存元不明）"
    : hasQualitativeInput ? "定性評価のみ" : "評価不可";

  return {
    sourceLabel,
    numericEvaluationLabel: hasNumericData ? "入力値を参照" : "不可（対象日の数値は未入力）",
    confidenceLabel,
    hasNumericData,
  };
}

export function getFoodSummaryLabels(isDaily: boolean) {
  return isDaily
    ? { heading: "当日集計", calories: "当日 kcal", macros: "当日 P/F/C" }
    : { heading: "食事平均", calories: "平均 kcal", macros: "平均 P/F/C" };
}

export function activityDataSourceLabel(source?: ActivityProfileDataSource | ActivityDataSource) {
  return source ? activityDataSourceLabels[source] : "保存元不明";
}

function isMeasuredActivitySource(source?: ActivityProfileDataSource | ActivityDataSource) {
  return source === "apple_watch" || source === "apple_health" || source === "smartphone" || source === "wearable";
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

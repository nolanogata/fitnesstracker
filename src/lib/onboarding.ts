export type OnboardingActivityMode = "simple" | "detailed" | "later";

export type OnboardingStepKey =
  | "welcome"
  | "name"
  | "height"
  | "weight"
  | "bodyFat"
  | "birthYear"
  | "sex"
  | "activityMethod"
  | "averageSteps"
  | "averageMove"
  | "averageExercise"
  | "activityLevel"
  | "activityNotes"
  | "activityConfirm"
  | "phase"
  | "targetWeight"
  | "targetBodyFat"
  | "targetDate"
  | "workout"
  | "cardio"
  | "confirm";

export type OnboardingStep = {
  key: OnboardingStepKey;
  title: string;
  subtitle: string;
};

const profileSteps: OnboardingStep[] = [
  { key: "name", title: "呼び名", subtitle: "アプリ内で表示する名前です。あとから変更できます。" },
  { key: "height", title: "身長", subtitle: "基礎代謝の自動計算に使います。" },
  { key: "weight", title: "今の体重", subtitle: "今日のスタート地点です。記録しながら後で更新できます。" },
  { key: "bodyFat", title: "体脂肪率", subtitle: "わからなければ空欄でOKです。" },
  { key: "birthYear", title: "生まれ年", subtitle: "年齢による消費量の違いを目標計算に反映します。" },
  { key: "sex", title: "性別", subtitle: "基礎代謝の推定に使います。未指定でも開始できます。" },
];

const simpleActivitySteps: OnboardingStep[] = [
  { key: "activityLevel", title: "普段の活動量", subtitle: "生活と運動を合わせた、普段の過ごし方に近いものを選びます。" },
];

const detailedActivitySteps: OnboardingStep[] = [
  { key: "averageSteps", title: "平均歩数", subtitle: "直近30日または4週間の、1日あたりの平均歩数です。わからなければ空欄で進めます。" },
  { key: "averageMove", title: "平均ムーブ", subtitle: "1日あたりのアクティブカロリーです。総消費カロリーではありません。" },
  { key: "averageExercise", title: "平均エクササイズ時間", subtitle: "1日あたりの平均エクササイズ分数です。" },
  { key: "activityLevel", title: "普段の活動量", subtitle: "入力した平均値も参考に、普段の過ごし方に近いものを選びます。" },
  { key: "activityNotes", title: "生活の補足", subtitle: "立ち仕事、通勤、リモートワークなど、普段の活動が分かる情報を任意で残せます。" },
  { key: "activityConfirm", title: "活動量を確認", subtitle: "この活動量を使って、最初のカロリーとPFCを計算します。" },
];

const goalSteps: OnboardingStep[] = [
  { key: "phase", title: "目標", subtitle: "体重や筋肉をどの方向へ変えたいか選びます。" },
  { key: "targetWeight", title: "目標体重", subtitle: "PFCの基準にする体重です。維持でも今の体重でOKです。" },
  { key: "targetBodyFat", title: "目標体脂肪率", subtitle: "未定なら空欄で進めます。" },
  { key: "targetDate", title: "目標達成日", subtitle: "体重差と期間から、減量・増量のペースを計算します。" },
  { key: "workout", title: "筋トレ頻度", subtitle: "Homeの今週の運動カードに使います。" },
  { key: "cardio", title: "有酸素頻度", subtitle: "歩く・バイク・ランなどの週目標です。" },
  { key: "confirm", title: "確認", subtitle: "入力内容から計算した目標で始めます。あとからSettingsで変更できます。" },
];

export function getOnboardingSteps(activityMode?: OnboardingActivityMode): OnboardingStep[] {
  const activitySteps = activityMode === "detailed"
    ? detailedActivitySteps
    : activityMode === "simple"
      ? simpleActivitySteps
      : [];
  return [
    { key: "welcome", title: "Welcome", subtitle: "100%を始めましょう。バックアップがある場合は、ここから復元できます。" },
    ...profileSteps,
    { key: "activityMethod", title: "活動量の設定", subtitle: "最初のカロリーとPFCを決めるために使います。後から設定することもできます。" },
    ...activitySteps,
    ...goalSteps,
  ];
}

import type { AiReport, AiReportDeliveryMode } from "../types";

type MarkdownSection = {
  heading: string;
  body: string;
};

type ParsedMarkdownReport = {
  preamble: string;
  sections: MarkdownSection[];
};

const changingBaselineHeadings = ["現在のゴール", "プロフィール"];

const continuingRuleLines = [
  "- この更新は、同じチャットに送った直前までの完全版・更新版を前提にしてください。",
  "- 食事の採用値は固定し、推定幅で摂取合計を書き換えないでください。安全側の値は追加提案と解釈にだけ使ってください。",
  "- 食事未記録日は、明示的な申告がない限り0kcalとして扱わないでください。",
  "- 当日途中は最終的な不足・未達と判定せず、現時点の残りとして扱ってください。",
  "- 活動量やムーブを摂取可能カロリーへそのまま加算しないでください。",
  "- カスタム目標は最終値です。期間補正を二重に適用しないでください。",
  "- 過去の会話と今回の記録を比較し、前日比や直近の傾向があれば簡潔に示してください。",
];

export function latestCopiedAiReport(reports: AiReport[]) {
  return [...reports]
    .filter((report) => report.copied_at)
    .sort((a, b) => (b.copied_at ?? "").localeCompare(a.copied_at ?? ""))[0];
}

export function getAiReportDeliveryContent(input: {
  mode: AiReportDeliveryMode;
  fullReport: string;
  previousReport?: AiReport;
  generatedAt: string;
}) {
  if (input.mode === "full" || !input.previousReport) return input.fullReport;
  return buildFollowUpAiReport({
    currentFullReport: input.fullReport,
    previousFullReport: input.previousReport.full_content ?? input.previousReport.content,
    previousCopiedAt: input.previousReport.copied_at,
    generatedAt: input.generatedAt,
  });
}

export function buildFollowUpAiReport(input: {
  currentFullReport: string;
  previousFullReport: string;
  previousCopiedAt?: string;
  generatedAt: string;
}) {
  const current = parseMarkdownReport(input.currentFullReport);
  const previous = parseMarkdownReport(input.previousFullReport);
  const changedBaseline = changingBaselineHeadings.flatMap((heading) => {
    const currentSection = findSection(current, heading);
    if (!currentSection) return [];
    const previousSection = findSection(previous, heading);
    return normalizeForComparison(currentSection.body) === normalizeForComparison(previousSection?.body ?? "")
      ? []
      : [currentSection];
  });
  const goalChanged = changedBaseline.some((section) => section.heading === "現在のゴール");
  if (goalChanged) {
    const composition = findSection(current, "体組成目標");
    if (composition) changedBaseline.push(composition);
  }

  const currentSections = current.sections.filter((section) => shouldIncludeCurrentSection(section.heading));
  const previousLabel = input.previousCopiedAt ? formatJapaneseDateTime(input.previousCopiedAt) : "前回コピー時";
  const currentLabel = formatJapaneseDateTime(input.generatedAt);

  return `# 100% トラッカー AI相談 更新レポート

${current.preamble.replace(/^# .+\n?/, "").trim()}

- 形式: 同じAIチャットへの更新
- 前回送信: ${previousLabel}
- 今回生成: ${currentLabel}

## 継続ルール

${continuingRuleLines.join("\n")}

## 前回から変更された前提

${changedBaseline.length
    ? changedBaseline.map(formatNestedSection).join("\n\n")
    : "- ゴールとプロフィールの変更なし"}

## 今回の更新

${currentSections.map(formatNestedSection).join("\n\n")}
`;
}

function parseMarkdownReport(markdown: string): ParsedMarkdownReport {
  const lines = markdown.trim().split("\n");
  const firstHeadingIndex = lines.findIndex((line) => /^##\s+/.test(line));
  const preambleLines = firstHeadingIndex === -1 ? lines : lines.slice(0, firstHeadingIndex);
  const sectionLines = firstHeadingIndex === -1 ? [] : lines.slice(firstHeadingIndex);
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | undefined;

  sectionLines.forEach((line) => {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (current) sections.push({ ...current, body: current.body.trim() });
      current = { heading: match[1].trim(), body: "" };
      return;
    }
    if (current) current.body += `${line}\n`;
  });
  if (current) sections.push({ ...current, body: current.body.trim() });

  return { preamble: preambleLines.join("\n").trim(), sections };
}

function findSection(report: ParsedMarkdownReport, heading: string) {
  return report.sections.find((section) => section.heading === heading);
}

function shouldIncludeCurrentSection(heading: string) {
  return heading === "レポート情報"
    || heading === "体重トレンド"
    || heading === "期間補正の参考"
    || heading === "活動量情報"
    || heading === "食事記録カバレッジ"
    || heading === "当日集計"
    || heading === "食事平均"
    || heading === "記録日の食事平均"
    || heading === "目標との差分"
    || heading === "その日の食事詳細"
    || heading === "食事ログ"
    || heading === "その日のワークアウト詳細"
    || heading === "ワークアウト"
    || heading === "相談したいこと";
}

function formatNestedSection(section: MarkdownSection) {
  return `### ${section.heading}\n\n${section.body}`;
}

function normalizeForComparison(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function formatJapaneseDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

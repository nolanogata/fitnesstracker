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
  "- 同じチャットに送った直前までのレポートと会話を前提に、今回の更新を比較してください。",
  "- 食事の採用値は固定し、安全側の値は追加提案と解釈にだけ使ってください。未記録日は0kcalとみなさないでください。",
  "- 当日途中は最終評価にせず、活動量やムーブ、期間補正を目標kcalへ直接加算しないでください。",
  "- 今回の相談へ簡潔に回答し、変化がある時だけ前日比や直近傾向を示してください。",
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
  const isDaily = /(?:^|\n)対象日:/.test(current.preamble);
  const currentSections = current.sections
    .filter((section) => shouldIncludeCurrentSection(section.heading, isDaily))
    .map((section) => compactCurrentSection(section, isDaily));
  const previousLabel = input.previousCopiedAt ? formatJapaneseDateTime(input.previousCopiedAt) : "前回コピー時";
  const currentLabel = formatJapaneseDateTime(input.generatedAt);

  return `# 100% トラッカー AI相談 更新レポート

${current.preamble.replace(/^# .+\n?/, "").trim()}

- 形式: 同じAIチャットへの更新
- 前回送信: ${previousLabel}
- 今回生成: ${currentLabel}

## 継続ルール

${continuingRuleLines.join("\n")}

## 基本情報

${buildCompactBasicInformation(current, changedBaseline.length > 0)}

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

function shouldIncludeCurrentSection(heading: string, isDaily: boolean) {
  return heading === "レポート情報"
    || heading === "活動量情報"
    || heading === "食事記録カバレッジ"
    || heading === "当日集計"
    || heading === "食事平均"
    || heading === "記録日の食事平均"
    || heading === "その日の食事詳細"
    || (isDaily && heading === "食事ログ")
    || heading === "その日のワークアウト詳細"
    || heading === "ワークアウト"
    || heading === "相談したいこと";
}

function compactCurrentSection(section: MarkdownSection, isDaily: boolean): MarkdownSection {
  if (section.heading === "活動量情報") {
    return { ...section, body: keepLines(section.body, [
      "### ", "- 活動区分:", "- 平均期間:", "- 平均歩数:", "- 平均ムーブ:", "- 平均エクササイズ時間:",
      "- 定性入力:", "- 対象日の歩数:", "- 対象日のムーブ:", "- 対象日のエクササイズ時間:", "- その他の活動:", "- データソース:",
    ]) };
  }
  if (section.heading === "食事記録カバレッジ" && /食事未記録・摂取量不明: 0日/.test(section.body)) {
    return { ...section, body: keepLines(section.body, ["- 対象日数:", "- 詳細な食事記録あり:", "- 食事記録の信頼度:"]) };
  }
  if (["当日集計", "食事平均", "記録日の食事平均"].includes(section.heading)) {
    return { ...section, body: keepLines(section.body, [
      "- 記録あり日数:", "- 詳細未記録日:", "- 当日 kcal:", "- 当日 P/F/C:", "- 平均 kcal:", "- 平均 P/F/C:",
      "- 記録日の平均 kcal:", "- 記録日の平均 P/F/C:", "- 推定を含むログ:", "- 推定カロリー比率:", "- 安全側バッファ:",
      "- 採用値ベース残量:", "- 安全側の追加上限:", "- Pの安全側評価:",
    ]) };
  }
  if (!isDaily && section.heading === "ワークアウト") {
    return { ...section, body: section.body.split("### 種目詳細")[0].trim() };
  }
  return section;
}

function keepLines(body: string, prefixes: string[]) {
  const kept = body.split("\n").filter((line) => prefixes.some((prefix) => line.startsWith(prefix)));
  return kept.join("\n");
}

function buildCompactBasicInformation(report: ParsedMarkdownReport, changed: boolean) {
  const profile = findSection(report, "プロフィール");
  const goal = findSection(report, "現在のゴール");
  const profileLines = pickLines(profile?.body, ["- 名前:", "- 身長:", "- 現在体重:", "- 体脂肪率:"]);
  const goalLines = pickLines(goal?.body, ["- フェーズ:", "- 目標体重:", "- 目標体脂肪率:", "- 目標達成日:", "- 目標 kcal:", "- 目標 P/F/C:", "- 週の運動目標:"]);
  return [
    `- 前回からの基本設定変更: ${changed ? "あり" : "なし"}`,
    ...profileLines,
    ...goalLines,
  ].join("\n");
}

function pickLines(body: string | undefined, prefixes: string[]) {
  if (!body) return [];
  return body.split("\n").filter((line) => prefixes.some((prefix) => line.startsWith(prefix)));
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

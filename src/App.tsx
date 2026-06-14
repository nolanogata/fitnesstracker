import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode, type RefObject, type TouchEvent } from "react";
import {
  Activity,
  Archive,
  BarChart3,
  Beef,
  Bike,
  BicepsFlexed,
  CakeSlice,
  Carrot,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Copy,
  Croissant,
  CupSoda,
  Dumbbell,
  EggFried,
  FileDown,
  FileText,
  Fish,
  GripVertical,
  Heart,
  Home,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Soup,
  Store,
  Trash2,
  Trophy,
  Utensils,
  UtensilsCrossed,
  Weight,
  type LucideIcon,
} from "lucide-react";
import { db } from "./db";
import { initializeSeeds } from "./data/seedInit";
import type {
  ActivityLevel,
  BackupPayload,
  ExercisePreset,
  FoodEntry,
  Goal,
  MealType,
  MenuItem,
  Phase,
  Profile,
  Settings as AppSettings,
  TemplateExercise,
  ThemeMode,
  WeightLog,
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
  WorkoutSetPattern,
  WorkoutTemplate,
  WorkoutTemplateIconKey,
} from "./types";
import { addDays, dateRange, formatJapaneseDate, nowIso, todayAppDate } from "./lib/date";
import { makeId } from "./lib/ids";
import { activityLabels, buildGoal, calculateTargets, phaseLabels } from "./lib/goalCalculator";
import { downloadText, exportBackup, importBackup, resetLocalData } from "./lib/backup";
import { generateMarkdownReport } from "./lib/report";
import { getWeeklyWorkoutStatus, type WeeklyWorkoutStatus } from "./lib/workoutStatus";

type Tab = "home" | "food" | "workout" | "records" | "settings";
type FoodMode = "search" | "favorite" | "chain" | "category" | "quick" | "manual" | "personal";
type WorkoutMode = "favorite" | "preset" | "body" | "equipment" | "previous" | "search";
type FoodFocus = "todayLog" | undefined;
type SettingsFocus = "ai" | "backup" | "myMenu" | undefined;
type HistoryGrouping = "day" | "week" | "month";
type EditableRecordTab = "food" | "workout";
type BackupInfo = {
  lastBackupAt?: string;
  daysSinceBackup?: number;
  trackedRecords: number;
  level: "ok" | "soon" | "danger";
};
type WorkoutPrCelebration = {
  id: string;
  exerciseName: string;
  label: string;
  previousLabel?: string;
};
type DayRecordSummary = {
  foodCount: number;
  weightCount: number;
  workoutCount: number;
};
type CalendarCell = {
  date?: string;
  day?: number;
};
type ReportMode = HistoryGrouping;
type AppUpdate = {
  id: string;
  title: string;
  date: string;
  items: string[];
};
type PortionOption = {
  label: string;
  value: number;
};
type WorkoutExerciseDraft = {
  exercise: ExercisePreset;
  sets: number;
  reps: number;
  weight_kg: number;
  duration_min: number;
  setSchemeText: string;
};
type ManualFoodDraft = {
  name: string;
  brand: string;
  meal_type: MealType;
  category: string;
  subcategory: string;
  calories: string;
  protein_g: string;
  fat_g: string;
  carbs_g: string;
  salt_g: string;
  note: string;
  savePreset: boolean;
  favorite: boolean;
};
type FoodEntryEditDraft = {
  name: string;
  brand: string;
  meal_type: MealType;
  calories: string;
  protein_g: string;
  fat_g: string;
  carbs_g: string;
  salt_g: string;
};
type PerfectFoodPlan = "meal" | "snack" | "protein" | "none";
type PerfectFoodSuggestionGroup = {
  label: string;
  items: MenuItem[];
};

const mealLabels: Record<MealType, string> = {
  breakfast: "朝",
  lunch: "昼",
  dinner: "夜",
  snack: "間食",
};

const chainCategories: Record<string, string[]> = {
  "牛丼・丼": ["松屋", "すき家", "吉野家", "なか卯"],
  "うどん・そば": ["丸亀製麺", "はなまるうどん", "ウエスト", "資さんうどん"],
  ファストフード: ["マクドナルド", "モスバーガー", "ケンタッキー", "バーガーキング", "サブウェイ", "コストコ"],
  "カレー・弁当": ["CoCo壱番屋", "ほっともっと"],
  "中華・麺": ["リンガーハット", "餃子の王将"],
  天丼: ["天丼てんや"],
  定食: ["大戸屋", "やよい軒", "しんぱち食堂"],
  ファミレス: ["ガスト", "ロイヤルホスト", "サイゼリヤ", "オリーブの丘", "デニーズ", "ジョイフル", "ジョナサン", "華屋与兵衛", "藍屋"],
  エスニック: ["モンスーンカフェ"],
  カフェ: ["スターバックス", "ドトール", "タリーズ", "コメダ珈琲"],
  ドーナツ: ["ミスタードーナツ", "クリスピークリーム", "アイムドーナツ"],
  コンビニ: ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"],
  居酒屋: [],
  その他: [],
};

const genericCategories: Record<string, string[]> = {
  "ごはん・丼": ["白米", "おにぎり", "チャーハン", "オムライス", "親子丼", "カツ丼", "ネギトロ", "まぐろ", "サーモン", "天丼", "豚丼", "焼肉", "ビビンバ", "クッパ", "カレー", "インドカレー", "インド料理", "寿司"],
  麺類: ["ラーメン", "つけ麺", "油そば", "タンメン", "担々麺", "トッピング", "うどん", "そば", "冷やし", "パスタ", "スパゲティ", "焼きそば", "冷麺"],
  パン: ["サンドイッチ", "トースト", "食パン", "菓子パン", "惣菜パン", "食事パン", "ハード系", "ナン", "ピザ"],
  "肉・魚": ["鶏", "豚", "牛肉", "牛豚", "羊肉", "焼肉", "カルビ", "ロース", "ハラミ", "ホルモン", "牛タン", "鮭", "サバ", "刺身", "卵"],
  "サラダ・野菜": ["サラダ", "野菜", "海藻", "チョレギ", "サンチュ", "焼き野菜"],
  "おかず・惣菜": ["納豆", "豆腐", "唐揚げ", "フライドポテト", "フライドチキン", "チキンナゲット", "ポテト", "副菜", "揚げ物", "惣菜", "洋食", "インド料理", "韓国料理", "ナムル", "キムチ"],
  スープ: ["味噌汁", "スープ", "豚汁", "汁物", "ユッケジャン"],
  スイーツ: ["ケーキ", "ドーナツ", "アイス", "和菓子", "焼き菓子", "スナック", "せんべい", "米菓", "チョコ", "グミ", "プリン", "果物", "ヨーグルト"],
  ドリンク: ["コーヒー", "カフェラテ", "牛乳", "豆乳", "ジュース", "炭酸", "アルコール"],
  コンビニ: ["おにぎり", "弁当", "サンドイッチ", "サラダチキン", "カップ麺", "スイーツ"],
  チェーン店: ["牛丼", "うどん", "定食", "バーガー"],
  プロテイン: ["プロテイン", "プロテインバー", "プロテインドリンク", "プロテインゼリー"],
  自炊: ["白米", "鶏", "卵"],
  居酒屋: ["飲み会", "ビール"],
  サプリ: ["ビタミン", "ミネラル", "クレアチン", "EAA", "BCAA", "グルタミン", "シトルリン", "プレワークアウト", "その他"],
  その他: ["不明"],
};
const commercialGeneralCategories = new Set(["チェーン店", "コンビニ", "プロテイン", "サプリ"]);
const generalFoodCategoryLabels = [...Object.keys(genericCategories).filter((category) => !commercialGeneralCategories.has(category)), "ざっくり"];

const emptyManual: ManualFoodDraft = {
  name: "",
  brand: "",
  meal_type: "lunch" as MealType,
  category: "自炊",
  subcategory: "白米",
  calories: "",
  protein_g: "",
  fat_g: "",
  carbs_g: "",
  salt_g: "",
  note: "",
  savePreset: false,
  favorite: false,
};

const backupStorageKey = "phase-log-last-backup-at";
const updateSeenStorageKey = "phase-log-seen-update-id";
const foodFitFilterSeenStorageKey = "phase-log-food-fit-filter-seen-2026-06-14";
const workoutWeightPresetStorageKey = "phase-log-workout-weight-presets";
const cheatDayStorageKey = "phase-log-cheat-day-dates";
const staleAppPromptDelayMs = 6 * 60 * 60 * 1000;
const weightStepOptions = [1, 2.5, 5, 10];
const finisherPulseIntensity = "finisher_pulse";
const finisherPulseNote = "仕上げパルス（部分可動域・素早く）";
const appUpdates: AppUpdate[] = [
  {
    id: "2026-06-14-costco-food-court-menu",
    title: "コストコのフードコートメニューを追加",
    date: "2026-06-14",
    items: [
      "チェーン検索のファストフードにコストコを追加しました。",
      "ホットドッグ、ピザ、プルコギベイク、クラムチャウダー、ソフトクリームなどを推定栄養値で追加しました。",
    ],
  },
  {
    id: "2026-06-14-food-search-fit-filter",
    title: "食事検索に栄養バランスフィルターを追加",
    date: "2026-06-14",
    items: [
      "Foodタブの検索バー横にフィルターボタンを追加しました。",
      "目標を超えない候補だけに絞り込み、必要な時だけP不足やF/C超過のバランス表示を出せるようにしました。",
      "アップデート後に初めてFoodタブを開いた時、変更点がわかる案内を表示するようにしました。",
    ],
  },
  {
    id: "2026-06-14-perfect-food-macro-breakdown",
    title: "ぴったりフードの判定を詳しく表示",
    date: "2026-06-14",
    items: [
      "Pは追加後にあと何g足りないか、F/Cは何g超えるかを候補ごとに表示しました。",
      "F/Cやkcalが大きく超える候補は上位に出にくくして、ぴったり感を改善しました。",
    ],
  },
  {
    id: "2026-06-14-perfect-food-fit-badge",
    title: "ぴったりフードに余裕度を表示",
    date: "2026-06-14",
    items: [
      "候補ごとに残り枠の何%を使うかを表示するようにしました。",
      "余裕あり、ちょうどいい、ギリギリ、超過が色でわかるようになりました。",
    ],
  },
  {
    id: "2026-06-14-perfect-food-dark-readability",
    title: "ぴったりフードのダーク表示を改善",
    date: "2026-06-14",
    items: [
      "ダークモードでぴったりフード候補の文字が薄く見える問題を修正しました。",
      "候補カードと記録ボタンのコントラストを上げ、黒背景でも読みやすくしました。",
    ],
  },
  {
    id: "2026-06-14-dark-home-black-gradient",
    title: "ダークモードのHome背景を調整",
    date: "2026-06-14",
    items: [
      "Safariで見える上部の白いブラウザ枠を活かすため、Home上部を黒いグラデーションにしました。",
      "ヒーローカードより下は黒ベースにして、カードが浮いて見えるようにしました。",
      "Safari系ブラウザ表示では日付まわりの白を少し柔らかく調整しました。",
    ],
  },
  {
    id: "2026-06-14-workout-pr-celebration",
    title: "記録更新の演出を追加",
    date: "2026-06-14",
    items: [
      "筋トレで自己ベストを更新したとき、記録更新ポップアップと紙吹雪を表示するようにしました。",
      "Foodタブの残り内フィルターを「目標内のメニューのみ表示」に変更しました。",
    ],
  },
  {
    id: "2026-06-14-perfect-food-filter-balance",
    title: "ぴったりフードと食事検索を調整",
    date: "2026-06-14",
    items: [
      "ぴったりフードの候補が同じチェーンに偏りすぎないようにしました。",
      "ぴったりフード表示中は、Homeの下引っ張り更新が反応しないようにしました。",
      "Foodタブに、残りカロリー・脂質・炭水化物を超える候補を非表示にするフィルターを追加しました。",
    ],
  },
  {
    id: "2026-06-14-workout-finisher-pulse",
    title: "筋トレに仕上げパルスを追加",
    date: "2026-06-14",
    items: [
      "各筋トレ種目に、仕上げ用の小さい可動域で素早く動かす「仕上げパルス」を追加できるようにしました。",
      "仕上げパルスは通常セットと区別して表示し、PR判定には含めないようにしました。",
      "AI相談レポートにも仕上げパルスの記録が分かるようにしました。",
    ],
  },
  {
    id: "2026-06-14-perfect-food-cold-menu-workout",
    title: "ぴったりフードと筋トレ追加フローを改善",
    date: "2026-06-14",
    items: [
      "ホームの「ゴールを確認」の横に、残り栄養素と予定から候補を出す「ぴったりフード」を追加しました。",
      "ぴったりフードの候補から、そのまま今日の食事に記録できるようにしました。",
      "なか卯の冷やし担々うどんを検索しやすくし、一般メニューの冷やし系を拡充しました。",
      "単一種目を記録した後、同じ種目の別重量セットを続けて追加できる導線を追加しました。",
    ],
  },
  {
    id: "2026-06-14-dark-mode-settings",
    title: "ダークモードを追加",
    date: "2026-06-14",
    items: [
      "Settingsからライト、ダーク、端末に合わせる表示を選べるようにしました。",
      "Liquid Glass UIの背景、カード、入力、下部ナビ、グラフを暗い画面でも読みやすく調整しました。",
      "過去日編集バナーやチートデー表示も、ダークモードで視認性が落ちないようにしました。",
    ],
  },
  {
    id: "2026-06-14-workout-flow-labels-nav",
    title: "ワークアウト操作と下部ナビを改善",
    date: "2026-06-14",
    items: [
      "ワークアウト編集の「一括反映」を、段階セットでセット一覧を置き換える操作だと分かる文言に変更しました。",
      "種目内の「追加」は「セットを追加」に変更し、ワークアウトへ種目を追加する操作と区別しやすくしました。",
      "種目追加後の「次の種目を選ぶ」から、種目選択エリアへ自然に戻るようにしました。",
      "小さい端末でスクロール中に下部ナビが浮いて見える問題を抑えるため、画面下にドックする見た目へ調整しました。",
    ],
  },
  {
    id: "2026-06-14-small-screen-readable-workout",
    title: "小さい画面でのワークアウト表示を改善",
    date: "2026-06-14",
    items: [
      "ワークアウトプリセットや種目行で、画面幅が狭い時に名前が読めなくなる問題を改善しました。",
      "小さい画面では操作ボタンを2段目に逃がし、メニュー名を最大2行まで表示するようにしました。",
      "最近追加した操作変更が分かるよう、更新履歴を整理しました。",
    ],
  },
  {
    id: "2026-06-14-past-record-editing",
    title: "過去の食事・ワークアウト修正に対応",
    date: "2026-06-14",
    items: [
      "Historyのカレンダーで記録がある日を選び、食事や筋トレを過去日に戻って修正できるようにしました。",
      "Foodログの鉛筆ボタンから、名前・ブランド・食事タイミング・kcal/PFC/塩分を編集できるようにしました。",
      "過去日を編集中はヘッダーに表示し、今日の記録へ戻れる導線を追加しました。",
    ],
  },
  {
    id: "2026-06-14-liquid-glass-refresh",
    title: "全体UIをLiquid Glass寄りに更新",
    date: "2026-06-14",
    items: [
      "Food、Workout、History、Settingsを中心に、半透明カード、淡い多層背景、ガラス調ボタンへ更新しました。",
      "チートデーやリロードなど既存のHome操作は残したまま、通常時は落ち着いたパール系の見た目に調整しました。",
      "数字表示をAppleのSan Francisco Rounded寄りのフォント指定にし、主要な数値を読みやすくしました。",
    ],
  },
  {
    id: "2026-06-13-yoshoku-snack-foods",
    title: "洋食とお菓子メニューを追加",
    date: "2026-06-13",
    items: [
      "一般的なスパゲティ、ピザ、シチュー、グラタン、フライなどの洋食メニューを追加しました。",
      "ポテトチップス、クッキー、グミ、ナッツ、米菓などの汎用お菓子を追加しました。",
      "カルビー、グリコ、明治、ブルボン、森永製菓の主要お菓子は公式栄養情報をもとに登録しました。",
    ],
  },
  {
    id: "2026-06-13-cheat-day-mode",
    title: "チートデーモードを追加",
    date: "2026-06-13",
    items: [
      "Home上部の！ボタンから、その日をチートデーとして切り替えられるようにしました。",
      "チートデー中はカロリーカードを虹色にし、カロリー差分を横棒表示にして、今日がチートデーであることをHomeに明記します。",
      "AI相談レポートにも対象範囲内のチートデーを明記するようにしました。",
    ],
  },
  {
    id: "2026-06-13-ramen-search-flow",
    title: "ラーメンと食事検索を改善",
    date: "2026-06-13",
    items: [
      "一般的なラーメン各種と、味玉・バター・替え玉などのトッピングを追加しました。",
      "食事検索を始めた時に検索結果へ移動し、検索中は結果が見やすいよう余分な候補パネルを畳むようにしました。",
    ],
  },
  {
    id: "2026-06-12-ai-report-estimated-food-notes",
    title: "AI相談レポートの推定値表示を改善",
    date: "2026-06-12",
    items: [
      "AI相談レポートの食事詳細で、公式値・推定値・クイック見積・非公式値・ユーザー入力を明記するようにしました。",
      "推定値を含む場合は、AI側で公式サイトや商品ページなどから正しい栄養値の取得を試みる依頼を自動で追加します。",
    ],
  },
  {
    id: "2026-06-12-snack-drink-chain-expansion",
    title: "グミ・飲料とチェーン店メニューを追加",
    date: "2026-06-12",
    items: [
      "直近で販売されているグミ、ジュース、炭酸飲料を市販品メニューに追加しました。",
      "天丼てんや、モスバーガー、ほっともっと、餃子の王将の不足していた定番メニューを補完しました。",
      "公式栄養情報が確認できるものは公式値、確認が難しい王将メニューは推定値として分けて登録しました。",
    ],
  },
  {
    id: "2026-06-12-generic-sweets-expansion",
    title: "一般スイーツメニューを追加",
    date: "2026-06-12",
    items: [
      "ケーキ類、クレープ、プリン、ゼリー、パフェ、シュークリームなどの一般スイーツを追加しました。",
      "検索やスイーツカテゴリから、ブランド不明の一般的なデザートを記録しやすくしました。",
    ],
  },
  {
    id: "2026-06-12-chain-menu-nutrition-expansion",
    title: "チェーン店メニューと公式栄養値を追加",
    date: "2026-06-12",
    items: [
      "バーミヤンの主要メニューを公式メニュー確認済みの推定栄養値として追加しました。",
      "リンガーハットのちゃんぽん・皿うどん・餃子定食などを公式栄養値で拡充しました。",
      "はなまるうどんの推定値を整理し、取得できたメニューを公式PDFの栄養値に置き換えました。",
    ],
  },
  {
    id: "2026-06-12-home-header-reload-checkin-edit",
    title: "Homeの更新導線とチェックイン表示を調整",
    date: "2026-06-12",
    items: [
      "Home右上のフェーズ/体重表示をリロードアイコンに変更しました。",
      "Homeの日付サイズを少し抑え、チェックインカードに編集できることが分かる表示を追加しました。",
    ],
  },
  {
    id: "2026-06-12-all-tabs-glass-theme",
    title: "各タブの色合いをHomeのテーマに統一",
    date: "2026-06-12",
    items: [
      "Food、Workout、History、Settingsのカード・ボタン・入力をHomeに近い淡いガラス調へ寄せました。",
      "既存機能は変更せず、背景、余白、境界線、下部ナビとの見た目の連続性を整えました。",
    ],
  },
  {
    id: "2026-06-12-home-pfc-status-colors",
    title: "HomeのPFC達成率を色で確認可能に",
    date: "2026-06-12",
    items: [
      "HomeのカロリーカードでPFCの目標比率を%表示にしました。",
      "安全圏は緑、超過は赤、未達は黄系で控えめに見分けられるようにしました。",
    ],
  },
  {
    id: "2026-06-12-home-health-weather-redesign",
    title: "HomeをApple Health / Weather寄りに整理",
    date: "2026-06-12",
    items: [
      "Homeを要約中心にし、詳細なリストや大きなボタン群をタップ先へ移しました。",
      "背景グラデーション、ガラス風カード、大きなカロリー数値で静かな情報階層に変更しました。",
      "チェックインはHome直置き入力ではなく、タップして開く編集シートに変更しました。",
    ],
  },
  {
    id: "2026-06-12-weekly-workout-date-linked",
    title: "今週の運動目標を日付連動に修正",
    date: "2026-06-12",
    items: [
      "ホームの今週の運動目標を、ワークアウト記録数ではなく週内の日付単位で集計するようにしました。",
      "同じ日に複数回記録しても、週目標上は1日分として扱います。",
      "筋トレ・有酸素それぞれの日付別達成状態をホームに表示しました。",
    ],
  },
  {
    id: "2026-06-12-preset-scroll-and-general-foods",
    title: "プリセット編集スクロールと一般メニューを追加",
    date: "2026-06-12",
    items: [
      "ワークアウトプリセットをタップした時、プリセット内容の編集欄へ自動スクロールするようにしました。",
      "ゆで卵、目玉焼き、チーズトースト、オートミールなど日常的な一般メニューを追加しました。",
    ],
  },
  {
    id: "2026-06-12-home-food-log-jump",
    title: "ホームから今日の食事ログへ直接移動",
    date: "2026-06-12",
    items: [
      "ホームの今日の食事エントリをタップした時、Foodタブ下部の今日の食事ログへ直接スクロールするようにしました。",
      "通常のFoodタブボタンはこれまで通り食事追加の上部から開きます。",
    ],
  },
  {
    id: "2026-06-12-home-food-delete",
    title: "ホームの今日の食事から削除可能に変更",
    date: "2026-06-12",
    items: [
      "ホームの今日の食事リストに削除ボタンを追加しました。",
      "削除しても食品メニュー本体は残り、その日の食事記録だけを削除します。",
    ],
  },
  {
    id: "2026-06-12-workout-weight-rep-pages",
    title: "ワークアウト追加の重量と回数を分離",
    date: "2026-06-12",
    items: [
      "筋トレ追加を重量、回数、セット数、確認の順に分けました。",
      "重量ページにスライダーと手入力を残しつつ、種目ごとに5枠の重量プリセットを保存できるようにしました。",
      "保存した重量プリセットは次回同じ種目を追加する時に呼び出せます。",
    ],
  },
  {
    id: "2026-06-12-monsoon-cafe-menu",
    title: "モンスーンカフェのメニューを追加",
    date: "2026-06-12",
    items: [
      "モンスーンカフェの前菜、サラダ、炒め物、麺、ご飯、デザートを追加しました。",
      "公式PDFメニューで名称を確認し、栄養値は推定値として登録しました。",
      "食事追加のチェーン一覧にエスニックカテゴリを追加しました。",
    ],
  },
  {
    id: "2026-06-12-workout-add-wizard",
    title: "ワークアウト追加を複数ステップ化",
    date: "2026-06-12",
    items: [
      "筋トレは重量・回数、セット数、確認の順に進む追加フローに変更しました。",
      "重量はスライダー、手入力、プラス・マイナス、重量刻みボタンで調整できます。",
      "単発追加画面から段階セット入力を外し、有酸素も分数入力から確認へ進む流れにしました。",
    ],
  },
  {
    id: "2026-06-12-italian-chain-menu-expansion",
    title: "イタリアンチェーンのメニューを追加",
    date: "2026-06-12",
    items: [
      "カプリチョーザ、マンマパスタ、オリーブの丘の定番メニューを追加しました。",
      "公式メニューで名称を確認し、栄養値は推定値として登録しました。",
      "パスタ、ピッツァ、リゾット、ドリア、肉料理、前菜、デザートを検索しやすくしました。",
    ],
  },
  {
    id: "2026-06-12-pre-workout-fuel-foods",
    title: "トレ前補給向けメニューを追加",
    date: "2026-06-12",
    items: [
      "塩大福、ミニ塩大福、バナナの量違い、羊羹、干し芋、ラムネ菓子などを追加しました。",
      "トレ前補給・糖質補給・低脂質タグで検索しやすくしました。",
      "スポーツドリンクやエネルギーゼリーも補給用メニューとして追加しました。",
    ],
  },
  {
    id: "2026-06-12-ootoya-official-nutrition",
    title: "大戸屋メニューを公式栄養値で拡充",
    date: "2026-06-12",
    items: [
      "大戸屋の定食、サイド、ご飯量、麺セット、キッズ・デザート、弁当を公式栄養値で追加しました。",
      "炭水化物は公式ページの糖質と食物繊維を合算して記録するようにしました。",
      "古い推定版の大戸屋メニューは、ユーザー作成メニューを残したまま整理します。",
    ],
  },
  {
    id: "2026-06-12-convenience-official-nutrition",
    title: "コンビニ定番メニューの公式栄養値を反映",
    date: "2026-06-12",
    items: [
      "ファミチキ、スパイシーチキン、クリスピーチキン、からあげクン、Lチキなどの公式栄養値を反映しました。",
      "セブンイレブンとミニストップの一部ホットスナックも公式栄養値へ置き換えました。",
    ],
  },
  {
    id: "2026-06-12-convenience-menu-expansion",
    title: "コンビニメニューを拡充",
    date: "2026-06-12",
    items: [
      "セブンイレブン、ファミリーマート、ローソン、ミニストップの定番メニューを追加しました。",
      "おにぎり、サンドイッチ、弁当、麺類、ホットスナック、高たんぱく系、スイーツを検索しやすくしました。",
    ],
  },
  {
    id: "2026-06-12-my-menu-registration-flow",
    title: "マイメニュー登録の導線を改善",
    date: "2026-06-12",
    items: [
      "食事のマイメニュー画面から、マイメニュー登録フォームへ直接移動できるようにしました。",
      "マイメニュー登録では朝・昼・夜などの食事タイミングを選ばず、メニューそのものだけを登録できるようにしました。",
    ],
  },
  {
    id: "2026-06-12-workout-template-reorder",
    title: "ワークアウトプリセットの並べ替えを追加",
    date: "2026-06-12",
    items: [
      "ワークアウトプリセットをドラッグして並べ替えられるようにしました。",
      "並べ替えた順番は保存され、再読み込み後も維持されます。",
    ],
  },
  {
    id: "2026-06-12-workout-template-explicit-start",
    title: "ワークアウトプリセット開始を明確化",
    date: "2026-06-12",
    items: [
      "ワークアウトプリセットの行を押しても今日の記録に追加されないようにし、行タップは編集を開く動きにしました。",
      "今日の記録へ追加する操作は、記録ボタンだけに分けました。",
    ],
  },
  {
    id: "2026-06-12-ai-report-generated-at",
    title: "AI相談レポートに生成時刻を追加",
    date: "2026-06-12",
    items: [
      "AI相談レポートに生成日時を明記し、当日途中のレポートである可能性をAIに伝えるようにしました。",
    ],
  },
  {
    id: "2026-06-12-workout-template-save-fix",
    title: "ワークアウトプリセット保存を修正",
    date: "2026-06-12",
    items: [
      "記録中のワークアウトをプリセット保存した後、保存したプリセットをすぐ確認・編集できるようにしました。",
      "現在の種目内容から部位とセット構成を作り直して保存し、空のプリセットが作られないようにしました。",
    ],
  },
  {
    id: "2026-06-12-user-menu-imports",
    title: "独自メニューを全体メニューへ追加",
    date: "2026-06-12",
    items: [
      "バックアップ内の独自メニューから、イオン せせりとむねからを全体の食事メニューへ追加しました。",
    ],
  },
  {
    id: "2026-06-12-chain-filter-scroll-flow",
    title: "チェーンメニュー選択時の移動を調整",
    date: "2026-06-12",
    items: [
      "食事メニューのチェーン検索で、ジャンル選択後はチェーン一覧へ、チェーン選択後はメニュー一覧へ移動するようにしました。",
      "メニュー一覧を見ている途中でチェーンボタンを押し直した場合は、チェーン検索の上部へ戻るようにしました。",
    ],
  },
  {
    id: "2026-06-12-food-category-scroll-results",
    title: "食事カテゴリ選択後の移動を改善",
    date: "2026-06-12",
    items: [
      "食事メニューでカテゴリやチェーンを選んだ後、候補一覧まで自動でスクロールするようにしました。",
    ],
  },
  {
    id: "2026-06-12-workout-tap-slider-inputs",
    title: "ワークアウト入力をタップ・スライダー中心に改善",
    date: "2026-06-12",
    items: [
      "筋トレの重量・回数・セット数を、手入力中心ではなくタップとスライダーで調整しやすくしました。",
      "マシンごとの重量刻みに合わせられるよう、1kg / 2.5kg / 5kg / 10kg の切り替えを追加しました。",
      "有酸素の分数もスライダーとタップで調整しやすくしました。",
    ],
  },
  {
    id: "2026-06-12-workout-set-schemes",
    title: "段階セットの記録と保存を追加",
    date: "2026-06-12",
    items: [
      "筋トレ種目で 47×10 / 54×10 のような段階セットをまとめて入力・反映できるようにしました。",
      "記録した段階セットをカスタム種目として保存したり、任意のワークアウトプリセットへ追加できるようにしました。",
      "プリセットから開始した場合も、保存済みの段階セットをそのまま記録へ反映するようにしました。",
    ],
  },
  {
    id: "2026-06-12-daily-ai-report-details",
    title: "日別AI相談レポートを詳細化",
    date: "2026-06-12",
    items: [
      "AI相談レポートの日別生成で、その日の食事とワークアウトの詳細を渡せるようにしました。",
      "日別レポートでは週次要約ではなく、当日の種目・セット内容を中心に出力するようにしました。",
    ],
  },
  {
    id: "2026-06-12-food-menu-modal-dismiss",
    title: "食事メニュー選択を閉じやすく改善",
    date: "2026-06-12",
    items: [
      "食事メニューをタップして開いた記録画面を、閉じるボタンだけでなく枠外タップでも閉じられるようにしました。",
    ],
  },
  {
    id: "2026-06-12-favorite-menu-persistence",
    title: "お気に入りメニューの保持を修正",
    date: "2026-06-12",
    items: [
      "アプリ更新や再読み込みで食事メニューのお気に入りが外れる問題を修正しました。",
      "食品メニューの初期データ更新時も、登録済みのお気に入り状態を引き継ぐようにしました。",
    ],
  },
  {
    id: "2026-06-12-home-workout-refresh-flow",
    title: "ホーム表示・ワークアウト追加・更新促進を改善",
    date: "2026-06-12",
    items: [
      "ホームの今日の食事と今日の筋トレで、件数をタップすると当日の全件を確認できるようにしました。",
      "ワークアウト種目は、セット数・重量・回数または分数を入力してから追加する流れにしました。",
      "アプリを長時間開きっぱなしにした場合、ホームに更新ボタンを促すバナーを表示するようにしました。",
      "サプリカテゴリにクレアチン、マルチビタミン、EAA/BCAAなどの筋トレ系サプリを追加しました。",
      "亀田製菓 うすやきせんべい えび味を食品メニューに追加しました。",
    ],
  },
  {
    id: "2026-06-12-workout-template-cardio-updates",
    title: "ワークアウト操作と更新履歴を改善",
    date: "2026-06-12",
    items: [
      "ワークアウトプリセット本体を削除できるようにしました。標準プリセットも削除後に自動復活しません。",
      "ホームに未読更新バナーを追加し、タップで更新内容を確認できるようにしました。",
      "設定のゴールトラッカー情報に、更新内容だけを開くリンクを追加しました。",
      "クロストレーナーなど有酸素種目の分数を、記録中とプリセット編集時に指定しやすくしました。",
    ],
  },
  {
    id: "2026-06-12-food-menu-updates",
    title: "食事メニューと記録操作を改善",
    date: "2026-06-12",
    items: [
      "一般的な食事メニューと推定栄養素を追加しました。",
      "食事追加時の分量候補を食品タイプ別に出し分けるようにしました。",
      "チェーン店メニューのサイズ表記を表示名に反映しました。",
      "ホームから最新アプリへ更新できるボタンを追加しました。",
    ],
  },
];

function App() {
  const [settings, setSettings] = useState<AppSettings>();
  const [profile, setProfile] = useState<Profile>();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [exercisePresets, setExercisePresets] = useState<ExercisePreset[]>([]);
  const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>([]);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);
  const [tab, setTab] = useState<Tab>(() => (localStorage.getItem("phase-log-tab") as Tab) || "home");
  const [foodFocus, setFoodFocus] = useState<FoodFocus>();
  const [settingsFocus, setSettingsFocus] = useState<SettingsFocus>();
  const [lastBackupAt, setLastBackupAt] = useState<string | undefined>(() => localStorage.getItem(backupStorageKey) || undefined);
  const [seenUpdateId, setSeenUpdateId] = useState<string | undefined>(() => localStorage.getItem(updateSeenStorageKey) || undefined);
  const [cheatDayDates, setCheatDayDates] = useState<string[]>(() => loadCheatDayDates());
  const [isUpdateNotesOpen, setIsUpdateNotesOpen] = useState(false);
  const [showStaleAppPrompt, setShowStaleAppPrompt] = useState(false);
  const [isHeaderReloading, setIsHeaderReloading] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [selectedAppDate, setSelectedAppDate] = useState<string>();
  const [toast, setToast] = useState<{ id: string; text: string }>();
  const [prCelebration, setPrCelebration] = useState<WorkoutPrCelebration>();
  const [prefersDarkTheme, setPrefersDarkTheme] = useState(() => (
    typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches
  ));
  const toastTimerRef = useRef<number | undefined>(undefined);
  const prCelebrationTimerRef = useRef<number | undefined>(undefined);
  const appOpenedAtRef = useRef(Date.now());
  const actualAppDate = todayAppDate(settings?.day_boundary_hour ?? 3, currentTime);
  const appDate = selectedAppDate ?? actualAppDate;
  const isEditingPastDate = appDate !== actualAppDate;
  const activeGoal = goals.find((goal) => goal.is_active);
  const latestUpdate = appUpdates[0];
  const themeMode = settings?.theme_mode ?? "system";
  const resolvedTheme: "light" | "dark" = themeMode === "system" ? (prefersDarkTheme ? "dark" : "light") : themeMode;

  const refresh = async () => {
    const [nextSettings, nextProfile, nextGoals, nextMenu, nextFood, nextWeights, nextExercises, nextTemplates, nextSessions, nextWorkoutExercises, nextSets] =
      await Promise.all([
        db.settings.get("local"),
        db.profile.get("local"),
        db.goals.toArray(),
        db.menu_items.toArray(),
        db.food_entries.orderBy("logged_at").reverse().toArray(),
        db.weight_logs.orderBy("logged_at").toArray(),
        db.exercise_presets.toArray(),
        db.workout_templates.toArray(),
        db.workout_sessions.orderBy("logged_at").reverse().toArray(),
        db.workout_exercises.toArray(),
        db.workout_sets.toArray(),
      ]);
    setSettings(nextSettings);
    setProfile(nextProfile);
    setGoals(nextGoals);
    setMenuItems(nextMenu);
    setFoodEntries(nextFood);
    setWeightLogs(nextWeights);
    setExercisePresets(nextExercises);
    setWorkoutTemplates(sortWorkoutTemplates(nextTemplates));
    setWorkoutSessions(nextSessions);
    setWorkoutExercises(nextWorkoutExercises);
    setWorkoutSets(nextSets);
  };

  useEffect(() => {
    initializeSeeds().then(refresh);
  }, []);

  useEffect(() => {
    localStorage.setItem("phase-log-tab", tab);
  }, [tab]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setPrefersDarkTheme(query.matches);
    update();
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeColor = resolvedTheme === "dark" ? "#000000" : "#f7f6f2";
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      if (!meta.media) meta.content = themeColor;
    });
    document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute(
      "content",
      resolvedTheme === "dark" ? "black-translucent" : "default",
    );
  }, [resolvedTheme]);

  useEffect(() => {
    const refreshCurrentTime = () => setCurrentTime(new Date());
    const interval = window.setInterval(refreshCurrentTime, 60_000);
    document.addEventListener("visibilitychange", refreshCurrentTime);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshCurrentTime);
    };
  }, []);

  useEffect(() => {
    const updatePromptState = () => {
      setShowStaleAppPrompt(Date.now() - appOpenedAtRef.current >= staleAppPromptDelayMs);
    };
    const timer = window.setTimeout(updatePromptState, staleAppPromptDelayMs);
    const interval = window.setInterval(updatePromptState, 60_000);
    document.addEventListener("visibilitychange", updatePromptState);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", updatePromptState);
    };
  }, []);

  const todayEntries = foodEntries.filter((entry) => entry.app_date === appDate);
  const todayWorkouts = workoutSessions.filter((session) => session.app_date === appDate);
  const latestWeight = weightLogs.at(-1);
  const dayTotals = sumFood(todayEntries);
  const target = activeGoal ?? defaultGoal(profile);
  const isCheatDay = cheatDayDates.includes(appDate);
  const targetCalories = target?.target_calories ?? 0;
  const homeTone = isCheatDay
    ? "cheat"
    : targetCalories <= 0
    ? "neutral"
    : dayTotals.calories > targetCalories
      ? "over"
      : targetCalories - dayTotals.calories <= 100
        ? "on-track"
        : "under";
  const backupInfo = getBackupInfo(lastBackupAt, foodEntries.length + weightLogs.length + workoutSessions.length + workoutSets.length);
  const weeklyWorkoutStatus = getWeeklyWorkoutStatus(target, workoutSessions, workoutExercises, appDate);
  const markBackupNow = () => {
    const timestamp = nowIso();
    localStorage.setItem(backupStorageKey, timestamp);
    setLastBackupAt(timestamp);
  };
  const showToast = (text: string) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ id: makeId("toast"), text });
    toastTimerRef.current = window.setTimeout(() => setToast(undefined), 2200);
  };
  const showWorkoutPrCelebration = (celebration: Omit<WorkoutPrCelebration, "id">) => {
    if (prCelebrationTimerRef.current) window.clearTimeout(prCelebrationTimerRef.current);
    setPrCelebration({ id: makeId("pr"), ...celebration });
    prCelebrationTimerRef.current = window.setTimeout(() => setPrCelebration(undefined), 3200);
  };
  const reloadLatestApp = async () => {
    await refresh();
    await updateServiceWorkers();
    await clearAppCaches();
    window.location.reload();
  };
  const openUpdateNotes = () => {
    if (latestUpdate) {
      localStorage.setItem(updateSeenStorageKey, latestUpdate.id);
      setSeenUpdateId(latestUpdate.id);
    }
    setIsUpdateNotesOpen(true);
  };
  const reloadFromHeader = async () => {
    setIsHeaderReloading(true);
    try {
      await reloadLatestApp();
    } catch {
      window.location.reload();
    }
  };
  const toggleCheatDay = () => {
    setCheatDayDates((current) => {
      const next = current.includes(appDate) ? current.filter((date) => date !== appDate) : [...current, appDate].sort();
      localStorage.setItem(cheatDayStorageKey, JSON.stringify(next));
      showToast(next.includes(appDate) ? "チートデーに設定しました" : "チートデーを解除しました");
      return next;
    });
  };
  const editRecordDate = (date: string, targetTab: EditableRecordTab) => {
    setSelectedAppDate(date === actualAppDate ? undefined : date);
    setSettingsFocus(undefined);
    setFoodFocus(targetTab === "food" ? "todayLog" : undefined);
    setTab(targetTab);
    showToast(`${formatJapaneseDate(date)}を編集します`);
  };

  useEffect(() => () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }, []);

  const homeDateTitle = formatHomeDateParts(appDate);
  const headerTitle = {
    home: "",
    food: "Food",
    workout: "Workout",
    records: "History",
    settings: "Settings",
  }[tab];
  const headerSubtext = tab === "home" ? "今日の記録" : formatJapaneseDate(appDate);
  const statusWeight = latestWeight?.weight_kg ?? profile?.current_weight_kg;

  if (settings && !settings.onboarding_completed) {
    return <Onboarding refresh={refresh} />;
  }

  return (
    <main className={`theme-${resolvedTheme} app-shell app-shell-${tab} mx-auto min-h-screen max-w-[430px] text-ink ${tab === "home" ? `home-shell home-shell-${homeTone}` : ""}`} data-theme={resolvedTheme}>
      <header className={`safe-top app-header sticky top-0 z-20 px-4 pb-3 ${tab === "home" ? "home-header" : ""}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`numeric-text ${tab === "home" ? "text-[2.08rem] font-semibold leading-tight tracking-normal" : "text-2xl font-bold tracking-normal"}`}>
              {tab === "home" ? (
                <>
                  {homeDateTitle.date}
                  <span className="ml-1 align-baseline text-[0.58em] font-medium text-moss">{homeDateTitle.weekday}</span>
                </>
              ) : headerTitle}
            </h1>
            <p className="mt-1 text-xs font-normal text-moss">{isEditingPastDate ? "過去の記録を編集中" : headerSubtext}</p>
          </div>
          {tab === "home" ? (
            <div className="flex items-center gap-2">
              {isEditingPastDate && (
                <button className="home-header-today" onClick={() => setSelectedAppDate(undefined)}>
                  今日
                </button>
              )}
              <button
                className={`home-header-cheat ${isCheatDay ? "home-header-cheat-active" : ""}`}
                aria-pressed={isCheatDay}
                aria-label={isCheatDay ? "チートデーを解除" : "チートデーに設定"}
                onClick={toggleCheatDay}
                title={isCheatDay ? "チートデーを解除" : "チートデーに設定"}
              >
                !
              </button>
              <button className="home-header-reload" disabled={isHeaderReloading} aria-label="最新の情報にリロード" onClick={reloadFromHeader}>
                <RotateCcw className={isHeaderReloading ? "home-header-reload-loading" : ""} size={18} />
              </button>
            </div>
          ) : (
            isEditingPastDate ? (
              <button className="app-status-pill" onClick={() => setSelectedAppDate(undefined)}>
                {formatJapaneseDate(appDate)} / 今日へ
              </button>
            ) : (
              <div className="app-status-pill">
                {activeGoal ? phaseLabels[activeGoal.phase] : "未設定"} / {typeof statusWeight === "number" ? `${statusWeight}kg` : "-"}
              </div>
            )
          )}
        </div>
      </header>

      <section className={tab === "home" ? "px-4 pb-28 pt-2" : "px-4 pb-28 pt-4"}>
        {isEditingPastDate && (
          <div className="past-edit-banner mb-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">過去の記録を編集中</p>
              <p className="mt-1 text-xs font-semibold">{formatJapaneseDate(appDate)} の食事・ワークアウトに記録されます</p>
            </div>
            <button className="past-edit-banner-button" onClick={() => setSelectedAppDate(undefined)}>今日に戻る</button>
          </div>
        )}
        {tab === "home" && (
          <HomeTab
            profile={profile}
            goal={target}
            appDate={appDate}
            dayTotals={dayTotals}
            todayEntries={todayEntries}
            menuItems={menuItems}
            todayWorkouts={todayWorkouts}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            weeklyWorkoutStatus={weeklyWorkoutStatus}
            isCheatDay={isCheatDay}
            latestWeight={latestWeight}
            weightLogs={weightLogs}
            backupInfo={backupInfo}
            setTab={(nextTab) => {
              setSettingsFocus(undefined);
              setFoodFocus(undefined);
              setTab(nextTab);
            }}
            openTodayFoodLog={() => {
              setSettingsFocus(undefined);
              setFoodFocus("todayLog");
              setTab("food");
            }}
            openAiReport={() => {
              setSettingsFocus("ai");
              setFoodFocus(undefined);
              setTab("settings");
            }}
            openBackup={() => {
              setSettingsFocus("backup");
              setFoodFocus(undefined);
              setTab("settings");
            }}
            latestUpdate={latestUpdate}
            hasUnreadUpdate={!!latestUpdate && seenUpdateId !== latestUpdate.id}
            showStaleAppPrompt={showStaleAppPrompt}
            openUpdateNotes={openUpdateNotes}
            reloadLatestApp={reloadLatestApp}
            refresh={refresh}
            showToast={showToast}
          />
        )}
        {tab === "food" && (
          <FoodTab
            menuItems={menuItems}
            foodEntries={foodEntries}
            appDate={appDate}
            goal={target}
            dayTotals={dayTotals}
            focus={foodFocus}
            openMyMenuSettings={() => {
              setSettingsFocus("myMenu");
              setFoodFocus(undefined);
              setTab("settings");
            }}
            onFocusHandled={() => setFoodFocus(undefined)}
            refresh={refresh}
            showToast={showToast}
          />
        )}
        {tab === "workout" && (
          <WorkoutTab
            profile={profile}
            appDate={appDate}
            exercisePresets={exercisePresets}
            workoutTemplates={workoutTemplates}
            workoutSessions={workoutSessions}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            setWorkoutTemplates={setWorkoutTemplates}
            refresh={refresh}
            showToast={showToast}
            showPrCelebration={showWorkoutPrCelebration}
          />
        )}
        {tab === "records" && (
          <RecordsTab
            profile={profile}
            goal={target}
            appDate={appDate}
            cheatDayDates={cheatDayDates}
            foodEntries={foodEntries}
            weightLogs={weightLogs}
            workoutSessions={workoutSessions}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            weeklyWorkoutStatus={weeklyWorkoutStatus}
            showToast={showToast}
            onEditRecordDate={editRecordDate}
          />
        )}
        {tab === "settings" && (
          <SettingsTab
            profile={profile}
            goals={goals}
            activeGoal={activeGoal}
            appDate={appDate}
            weeklyWorkoutStatus={weeklyWorkoutStatus}
            cheatDayDates={cheatDayDates}
            menuItems={menuItems}
            workoutTemplates={workoutTemplates}
            focus={settingsFocus}
            backupInfo={backupInfo}
            settings={settings}
            themeMode={themeMode}
            resolvedTheme={resolvedTheme}
            markBackupNow={markBackupNow}
            openUpdateNotes={openUpdateNotes}
            refresh={refresh}
            showToast={showToast}
            allData={{ foodEntries, weightLogs, workoutSessions, workoutExercises, workoutSets }}
          />
        )}
      </section>

      {isUpdateNotesOpen && <UpdateNotesModal updates={appUpdates} onClose={() => setIsUpdateNotesOpen(false)} />}
      {toast && <QuickToast key={toast.id} text={toast.text} />}
      <WorkoutPrCelebrationOverlay celebration={prCelebration} />

      <nav className="safe-bottom app-bottom-nav fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] px-3 pt-1.5">
        <div className="grid grid-cols-5 gap-1">
          <TabButton active={tab === "home"} icon={<Home size={19} />} label="Home" onClick={() => { setSettingsFocus(undefined); setFoodFocus(undefined); setTab("home"); }} />
          <TabButton active={tab === "food"} icon={<Utensils size={19} />} label="Food" onClick={() => { setSettingsFocus(undefined); setFoodFocus(undefined); setTab("food"); }} />
          <TabButton active={tab === "workout"} icon={<Dumbbell size={19} />} label="Workout" onClick={() => { setSettingsFocus(undefined); setFoodFocus(undefined); setTab("workout"); }} />
          <TabButton active={tab === "records"} icon={<BarChart3 size={19} />} label="History" onClick={() => { setSettingsFocus(undefined); setFoodFocus(undefined); setTab("records"); }} />
          <TabButton active={tab === "settings"} icon={<Settings size={19} />} label="Settings" onClick={() => { setSettingsFocus(undefined); setFoodFocus(undefined); setTab("settings"); }} />
        </div>
      </nav>
    </main>
  );
}

function QuickToast({ text }: { text: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 mx-auto max-w-[430px] px-4">
      <div className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-xl border border-moss/20 bg-ink px-4 py-3 text-sm font-bold text-white shadow-lg">
        <Check size={16} />
        <span className="truncate">{text}</span>
      </div>
    </div>
  );
}

function WorkoutPrCelebrationOverlay({ celebration }: { celebration?: WorkoutPrCelebration }) {
  if (!celebration) return null;
  const colors = ["#D97A68", "#E7B85B", "#8CA798", "#8FB2D8", "#C79BD8", "#F3DDD3"];
  const pieces = Array.from({ length: 42 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    delay: `${(index % 9) * 0.045}s`,
    drift: `${((index % 7) - 3) * 18}px`,
    rotate: `${(index * 31) % 180}deg`,
    color: colors[index % colors.length],
    width: `${6 + (index % 3) * 2}px`,
    height: `${10 + (index % 4) * 2}px`,
  }));

  return (
    <div className="pr-celebration pointer-events-none fixed inset-0 z-[70] mx-auto max-w-[430px] overflow-hidden">
      <div className="absolute inset-0">
        {pieces.map((piece) => (
          <span
            className="pr-confetti-piece"
            key={piece.id}
            style={{
              "--confetti-left": piece.left,
              "--confetti-delay": piece.delay,
              "--confetti-drift": piece.drift,
              "--confetti-rotate": piece.rotate,
              "--confetti-color": piece.color,
              width: piece.width,
              height: piece.height,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 top-[22vh]">
        <div className="pr-celebration-card mx-auto w-full max-w-[360px] p-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-sun/40 bg-sun/20 text-[#8a5d13]">
            <Trophy size={24} />
          </div>
          <p className="mt-3 text-xl font-black">記録を更新しました</p>
          <p className="mt-2 text-sm font-bold text-moss">{celebration.exerciseName}</p>
          <p className="numeric-text mt-1 text-lg font-black">{celebration.label}</p>
          {celebration.previousLabel && <p className="mt-1 text-xs font-semibold text-muted">これまで: {celebration.previousLabel}</p>}
        </div>
      </div>
    </div>
  );
}

function loadCheatDayDates() {
  try {
    const parsed = JSON.parse(localStorage.getItem(cheatDayStorageKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((date): date is string => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)).sort();
  } catch {
    return [];
  }
}

function HomeTab(props: {
  profile?: Profile;
  goal?: Goal;
  appDate: string;
  dayTotals: ReturnType<typeof sumFood>;
  todayEntries: FoodEntry[];
  menuItems: MenuItem[];
  todayWorkouts: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  isCheatDay: boolean;
  latestWeight?: WeightLog;
  weightLogs: WeightLog[];
  backupInfo: BackupInfo;
  setTab: (tab: Tab) => void;
  openTodayFoodLog: () => void;
  openAiReport: () => void;
  openBackup: () => void;
  latestUpdate?: AppUpdate;
  hasUnreadUpdate: boolean;
  showStaleAppPrompt: boolean;
  openUpdateNotes: () => void;
  reloadLatestApp: () => Promise<void>;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
}) {
  const [weight, setWeight] = useState(props.latestWeight?.weight_kg ?? props.profile?.current_weight_kg ?? 70);
  const [bodyFat, setBodyFat] = useState(props.latestWeight?.body_fat_percentage ?? props.profile?.body_fat_percentage ?? 20);
  const [isReloadingLatest, setIsReloadingLatest] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isPerfectFoodOpen, setIsPerfectFoodOpen] = useState(false);
  const [pullOffset, setPullOffset] = useState(0);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  const pullStartYRef = useRef<number | undefined>(undefined);
  const pullThreshold = 64;
  const remaining = (props.goal?.target_calories ?? 0) - props.dayTotals.calories;
  const calorieState = getCalorieState(remaining, props.goal?.target_calories ?? 0);
  const average7 = movingAverage(props.weightLogs, 7);
  const caloriePercent = props.goal?.target_calories ? Math.min(100, Math.round((props.dayTotals.calories / props.goal.target_calories) * 100)) : 0;
  const backupTitle = props.backupInfo.level === "danger" ? "バックアップ推奨" : "そろそろバックアップ";
  const todayWorkoutExerciseIds = props.workoutExercises
    .filter((exercise) => props.todayWorkouts.some((session) => session.id === exercise.session_id))
    .map((exercise) => exercise.id);
  const todayWorkoutCalories = props.workoutSets
    .filter((set) => todayWorkoutExerciseIds.includes(set.workout_exercise_id))
    .reduce((sum, set) => sum + (set.active_calories ?? 0), 0);
  const previousWeight = props.weightLogs.length > 1 ? props.weightLogs.at(-2)?.weight_kg : undefined;
  const weightDelta = typeof previousWeight === "number" ? round1(weight - previousWeight) : undefined;
  const calorieDelta = props.goal?.target_calories ? props.dayTotals.calories - props.goal.target_calories : undefined;
  const calorieDeltaText = typeof calorieDelta === "number" ? `${calorieDelta > 0 ? "+" : ""}${Math.round(calorieDelta)}` : "-";
  const calorieDisplayText = props.isCheatDay ? "-" : calorieDeltaText;
  const calorieMoodClass = props.isCheatDay ? "cheat" : typeof calorieDelta === "number" ? (calorieDelta > 0 ? "over" : Math.abs(calorieDelta) <= 100 ? "on-track" : "left") : "neutral";
  const calorieMoodLabel = props.isCheatDay ? "cheat day" : typeof calorieDelta === "number" ? (calorieDelta > 0 ? "over" : Math.abs(calorieDelta) <= 100 ? "on track" : "left") : calorieState.label;
  const foodSummary = `${props.todayEntries.length}件 / ${props.dayTotals.calories} kcal`;
  const workoutSummary = todayWorkoutCalories > 0 ? `${props.todayWorkouts.length}回 / ${todayWorkoutCalories} kcal` : `${props.todayWorkouts.length}回`;
  const macroStats = [
    { label: "P", value: props.dayTotals.protein, target: props.goal?.target_protein_g ?? 0 },
    { label: "F", value: props.dayTotals.fat, target: props.goal?.target_fat_g ?? 0 },
    { label: "C", value: props.dayTotals.carbs, target: props.goal?.target_carbs_g ?? 0 },
  ].map((macro) => {
    const percent = macro.target > 0 ? Math.round((macro.value / macro.target) * 100) : undefined;
    const tone = typeof percent !== "number"
      ? "neutral"
      : macro.label === "P"
        ? percent < 80 ? "over" : "safe"
        : percent > 110 ? "over" : percent >= 80 ? "safe" : "low";
    return { ...macro, percent, tone };
  });
  const saveCheckIn = async () => {
    const timestamp = nowIso();
    const normalizedBodyFat = clampBodyFat(bodyFat);
    await db.weight_logs.put({
      id: makeId("weight"),
      app_date: props.appDate,
      logged_at: timestamp,
      weight_kg: weight,
      body_fat_percentage: normalizedBodyFat,
      lean_body_mass_kg: round1(weight * (1 - normalizedBodyFat / 100)),
      created_at: timestamp,
      updated_at: timestamp,
    });
    if (props.profile) await db.profile.update(props.profile.id, { current_weight_kg: weight, body_fat_percentage: normalizedBodyFat, updated_at: timestamp });
    setBodyFat(normalizedBodyFat);
    setIsCheckInOpen(false);
    await props.refresh();
    props.showToast("チェックインを保存しました");
  };
  const logPerfectFood = async (item: MenuItem) => {
    const timestamp = nowIso();
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: item.default_meal_type ?? "snack",
      name: item.name,
      brand: item.brand,
      calories: item.calories,
      protein_g: item.protein_g,
      fat_g: item.fat_g,
      carbs_g: item.carbs_g,
      salt_g: item.salt_g,
      portion_multiplier: 1,
      entry_source: item.data_source,
      confidence: item.confidence,
      menu_item_id: item.id,
      note: "ぴったりフードから追加",
      created_at: timestamp,
      updated_at: timestamp,
    });
    setIsPerfectFoodOpen(false);
    await props.refresh();
    props.showToast(`${formatMenuItemName(item)}を記録しました`);
  };
  const resetPullRefresh = () => {
    pullStartYRef.current = undefined;
    setPullOffset(0);
  };
  const handlePullStart = (event: TouchEvent<HTMLDivElement>) => {
    const target = event.target instanceof HTMLElement ? event.target : undefined;
    if (isCheckInOpen || isPerfectFoodOpen || isPullRefreshing || window.scrollY > 0 || target?.closest("input, select, textarea")) {
      pullStartYRef.current = undefined;
      return;
    }
    pullStartYRef.current = event.touches[0]?.clientY;
  };
  const handlePullMove = (event: TouchEvent<HTMLDivElement>) => {
    const startY = pullStartYRef.current;
    if (typeof startY !== "number") return;
    const deltaY = (event.touches[0]?.clientY ?? startY) - startY;
    if (deltaY <= 0 || window.scrollY > 0) {
      resetPullRefresh();
      return;
    }
    event.preventDefault();
    setPullOffset(Math.min(96, Math.round(deltaY * 0.58)));
  };
  const handlePullEnd = () => {
    const shouldRefresh = pullOffset >= pullThreshold && !isPullRefreshing;
    pullStartYRef.current = undefined;
    if (!shouldRefresh) {
      setPullOffset(0);
      return;
    }
    setPullOffset(72);
    setIsPullRefreshing(true);
    void props.refresh()
      .then(() => props.showToast("Homeを更新しました"))
      .finally(() => {
        setIsPullRefreshing(false);
        setPullOffset(0);
      });
  };

  useEffect(() => {
    setWeight(props.latestWeight?.weight_kg ?? props.profile?.current_weight_kg ?? 70);
    setBodyFat(clampBodyFat(props.latestWeight?.body_fat_percentage ?? props.profile?.body_fat_percentage ?? 20));
  }, [props.latestWeight?.weight_kg, props.latestWeight?.body_fat_percentage, props.profile?.current_weight_kg, props.profile?.body_fat_percentage]);

  return (
    <div
      className={`home-pull-shell ${isPullRefreshing ? "home-pull-refreshing" : ""}`}
      onTouchStart={handlePullStart}
      onTouchMove={handlePullMove}
      onTouchEnd={handlePullEnd}
      onTouchCancel={resetPullRefresh}
    >
      <div
        className={`home-pull-indicator ${pullOffset >= pullThreshold ? "home-pull-ready" : ""}`}
        style={{ height: `${pullOffset}px`, opacity: pullOffset > 8 || isPullRefreshing ? 1 : 0 }}
        aria-hidden="true"
      >
        <RotateCcw className={isPullRefreshing ? "home-pull-spin" : ""} size={17} />
        <span>{isPullRefreshing ? "更新中" : pullOffset >= pullThreshold ? "離して更新" : "更新"}</span>
      </div>
      <div className="home-dashboard space-y-4" style={pullOffset > 0 ? { transform: `translateY(${Math.min(18, pullOffset * 0.16)}px)` } : undefined}>
        {props.latestUpdate && props.hasUnreadUpdate && (
        <button className="home-notice flex w-full items-center gap-3 px-4 py-3 text-left" onClick={props.openUpdateNotes}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">更新があります</p>
            <p className="mt-1 truncate text-xs text-moss">{props.latestUpdate.title}</p>
          </div>
          <ChevronRight className="shrink-0 text-muted" size={18} />
        </button>
      )}

      {props.showStaleAppPrompt && (
        <div className="home-notice flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">長時間更新していません</p>
            <p className="mt-1 text-xs text-moss">最新のメニューや修正を反映するには更新してください。</p>
          </div>
          <button
            className="secondary-button shrink-0 px-3 py-2 text-xs"
            disabled={isReloadingLatest}
            onClick={async () => {
              setIsReloadingLatest(true);
              try {
                await props.reloadLatestApp();
              } catch {
                window.location.reload();
              }
            }}
          >
            <RotateCcw size={15} />{isReloadingLatest ? "更新中" : "更新"}
          </button>
        </div>
      )}

      {props.backupInfo.level !== "ok" && (
        <button className="home-notice flex w-full items-center gap-3 px-4 py-3 text-left" onClick={props.openBackup}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{backupTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-moss">{backupMessage(props.backupInfo)}</p>
          </div>
          <ChevronRight className="shrink-0 text-muted" size={18} />
        </button>
      )}

      <section className={`home-hero-card home-hero-${calorieMoodClass}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink/80">今日のカロリー</p>
          {props.isCheatDay && <span className="home-cheat-badge">チートデー</span>}
        </div>
        <div className="mt-6">
          <p className={`numeric-text text-[4.25rem] font-semibold leading-none tracking-normal ${calorieDelta && calorieDelta > 0 ? "text-clay" : "text-ink"}`}>
            {calorieDisplayText}<span className="ml-2 text-xl font-semibold">kcal</span>
          </p>
          <p className="mt-2 text-sm font-semibold text-moss">{calorieMoodLabel}</p>
          {props.isCheatDay && <p className="mt-1 text-sm font-bold text-ink">今日はチートデーです。目標差分は参考値として見ます。</p>}
          <p className="numeric-text mt-1 text-sm text-moss">摂取 {props.dayTotals.calories} / 目標 {props.goal?.target_calories ?? "-"} kcal</p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/55">
            <div className={`h-full rounded-full ${props.isCheatDay ? "home-progress-cheat" : calorieDelta && calorieDelta > 0 ? "bg-clay" : "bg-moss"}`} style={{ width: `${caloriePercent}%` }} />
          </div>
        </div>
        <div className="home-macro-row mt-5">
          {macroStats.map((macro) => (
            <div className={`home-macro-pill home-macro-${macro.tone}`} key={macro.label}>
              <span className="home-macro-dot" />
              <span className="font-bold">{macro.label}</span>
              <span className="home-macro-grams">{round1(macro.value)}g</span>
              <span className="home-macro-percent">{typeof macro.percent === "number" ? `${macro.percent}%` : "-"}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="home-action-row">
        <button className="home-primary-action" onClick={() => props.setTab("food")}>食事を記録 <ChevronRight size={17} /></button>
        <button className="home-secondary-action" onClick={() => props.setTab("workout")}>筋トレを記録 <ChevronRight size={17} /></button>
      </div>
      <div className="flex justify-center gap-3 text-xs font-semibold text-moss/80">
        <button className="px-1.5 py-1" onClick={() => setIsPerfectFoodOpen(true)}>ぴったりフード</button>
        <button className="px-2 py-1" onClick={() => props.setTab("settings")}>ゴールを確認</button>
        <button className="px-2 py-1 text-moss/70" onClick={props.openAiReport}>AIレポート</button>
      </div>

      <button className="home-glass-card relative w-full p-5 text-left" onClick={() => setIsCheckInOpen(true)}>
        <span className="home-checkin-edit" aria-hidden="true"><Plus size={15} /></span>
        <div className="grid grid-cols-2 items-end gap-3">
          <div>
            <p className="text-sm font-bold">今日のチェックイン</p>
            <p className="numeric-text mt-6 text-[2.6rem] font-semibold leading-none tracking-normal">{round1(weight)}<span className="ml-1 text-base font-semibold">kg</span></p>
            <p className="numeric-text mt-2 text-xs text-moss">7日平均 {average7 ? `${average7}kg` : "-"}{typeof weightDelta === "number" ? ` / 前日比 ${weightDelta > 0 ? "+" : ""}${weightDelta}kg` : ""}</p>
          </div>
          <div className="text-right">
            <p className="numeric-text text-[2.15rem] font-semibold leading-none tracking-normal">{round1(bodyFat)}<span className="ml-1 text-sm font-semibold">%</span></p>
            <p className="mt-2 text-xs text-moss">体脂肪率</p>
          </div>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <section className="home-glass-card p-4">
          <button className="w-full text-left" onClick={props.openTodayFoodLog}>
            <p className="text-sm font-bold">今日の記録</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-moss">食事</span>
                <span className="numeric-text text-right text-sm font-semibold">{foodSummary}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-moss">筋トレ</span>
                <span className="numeric-text text-right text-sm font-semibold">{workoutSummary}</span>
              </div>
            </div>
          </button>
        </section>

        <section className="home-glass-card p-4">
          <button className="w-full text-left" onClick={() => props.setTab("workout")}>
            <p className="text-sm font-bold">今週の運動</p>
            <div className="mt-5 space-y-4">
              <WorkoutGoalProgress
                label="筋トレ"
                done={props.weeklyWorkoutStatus.strengthDone}
                target={props.weeklyWorkoutStatus.strengthTarget}
              />
              <WorkoutGoalProgress
                label="有酸素"
                done={props.weeklyWorkoutStatus.cardioDone}
                target={props.weeklyWorkoutStatus.cardioTarget}
              />
            </div>
          </button>
        </section>
      </div>

      {isCheckInOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/25 px-4 pb-4" onClick={() => setIsCheckInOpen(false)}>
          <div className="home-sheet w-full p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold">今日のチェックイン</p>
                <p className="mt-1 text-xs text-moss">体重と体脂肪率を保存します。</p>
              </div>
              <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={() => setIsCheckInOpen(false)}>×</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <CheckInStepper label="体重" value={weight} suffix="kg" step={0.1} onChange={setWeight} />
              <CheckInStepper label="体脂肪" value={bodyFat} suffix="%" step={0.5} onChange={(value) => setBodyFat(clampBodyFat(value))} />
            </div>
            <button className="primary-button mt-5 w-full" onClick={saveCheckIn}><Save size={16} />保存</button>
          </div>
        </div>
      )}
      {isPerfectFoodOpen && (
        <PerfectFoodModal
          dayTotals={props.dayTotals}
          goal={props.goal}
          menuItems={props.menuItems}
          onClose={() => setIsPerfectFoodOpen(false)}
          onLog={logPerfectFood}
        />
      )}
      </div>
    </div>
  );
}

function PerfectFoodModal({ dayTotals, goal, menuItems, onClose, onLog }: {
  dayTotals: ReturnType<typeof sumFood>;
  goal?: Goal;
  menuItems: MenuItem[];
  onClose: () => void;
  onLog: (item: MenuItem) => void | Promise<void>;
}) {
  const [page, setPage] = useState<0 | 1 | 2>(0);
  const [plans, setPlans] = useState<PerfectFoodPlan[]>(["none"]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const remaining = getRemainingNutrition(dayTotals, goal);
  const planned = getPlannedNutrition(plans);
  const adjusted = {
    calories: Math.max(0, remaining.calories - planned.calories),
    protein: Math.max(0, remaining.protein - planned.protein),
    fat: Math.max(0, remaining.fat - planned.fat),
    carbs: Math.max(0, remaining.carbs - planned.carbs),
  };
  const suggestionGroups = useMemo(() => buildPerfectFoodSuggestions(menuItems, adjusted, plans), [menuItems, adjusted.calories, adjusted.protein, adjusted.fat, adjusted.carbs, plans]);
  const togglePlan = (plan: PerfectFoodPlan) => {
    setPlans((current) => {
      if (plan === "none") return ["none"];
      const next = current.includes(plan) ? current.filter((item) => item !== plan) : [...current.filter((item) => item !== "none"), plan];
      return next.length ? next : ["none"];
    });
  };
  const toggleSuggestionGroup = (label: string) => {
    setExpandedGroups((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="home-sheet max-h-[86vh] w-full overflow-y-auto p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">ぴったりフード</p>
            <p className="mt-1 text-xs text-moss">{page === 0 ? "残り栄養素を確認" : page === 1 ? "このあと食べる予定を選択" : "ジャンル別の候補"}</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["残り", "予定", "候補"].map((label, index) => (
            <button className={`mini-chip ${page === index ? "mini-chip-active" : ""}`} key={label} onClick={() => setPage(index as 0 | 1 | 2)}>{label}</button>
          ))}
        </div>

        {page === 0 && (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <PerfectFoodMetric label="kcal" value={remaining.calories} suffix="kcal" />
              <PerfectFoodMetric label="P" value={remaining.protein} suffix="g" />
              <PerfectFoodMetric label="F" value={remaining.fat} suffix="g" />
              <PerfectFoodMetric label="C" value={remaining.carbs} suffix="g" />
            </div>
            <button className="primary-button w-full" onClick={() => setPage(1)}>予定を入れる <ChevronRight size={17} /></button>
          </div>
        )}

        {page === 1 && (
          <div className="mt-5 space-y-4">
            <div className="grid gap-2">
              {perfectFoodPlans.map((plan) => (
                <button className={`choice-button justify-between px-4 ${plans.includes(plan.id) ? "choice-button-active" : ""}`} key={plan.id} onClick={() => togglePlan(plan.id)}>
                  <span>{plan.label}</span>
                  <span className="numeric-text text-xs text-moss">{plan.summary}</span>
                </button>
              ))}
            </div>
            <div className="perfect-food-panel rounded-md bg-rice p-3">
              <p className="text-xs font-bold text-moss">予定を引いた残り</p>
              <p className="numeric-text mt-2 text-sm font-bold">あと {Math.round(adjusted.calories)}kcal / P{round1(adjusted.protein)} F{round1(adjusted.fat)} C{round1(adjusted.carbs)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setPage(0)}>戻る</button>
              <button className="primary-button" onClick={() => setPage(2)}>候補を見る</button>
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="mt-5 space-y-4">
            {suggestionGroups.length ? suggestionGroups.map((group) => {
              const isExpanded = expandedGroups.includes(group.label);
              const visibleItems = group.items.slice(0, isExpanded ? 9 : 3);
              const hiddenCount = Math.max(0, group.items.length - visibleItems.length);
              return (
              <section className="perfect-food-group rounded-md border border-line bg-rice/70 p-3" key={group.label}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold">{group.label}</h2>
                  <span className="text-xs font-semibold text-moss">{visibleItems.length}/{group.items.length}件</span>
                </div>
                <div className="space-y-2">
                  {visibleItems.map((item) => {
                    const fit = getPerfectFoodFit(item, adjusted);
                    return (
                      <div className={`perfect-food-item perfect-food-item-${fit.tone} rounded-xl bg-surface/70 p-3`} key={item.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">{formatMenuItemName(item)}</p>
                            <p className="numeric-text mt-1 text-xs text-moss">{item.brand ? `${item.brand} · ` : ""}{item.calories}kcal · P{round1(item.protein_g)} F{round1(item.fat_g)} C{round1(item.carbs_g)}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {fit.details.map((detail) => (
                                <span className={`perfect-food-detail-chip perfect-food-detail-${detail.tone}`} key={detail.label}>{detail.label}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-2">
                            <span className={`perfect-food-fit-badge perfect-food-fit-${fit.tone}`}>
                              {fit.label}
                            </span>
                            <button className="perfect-food-log-button secondary-button px-3 py-2 text-xs" onClick={() => onLog(item)}>記録</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {group.items.length > 3 && (
                  <button className="perfect-food-more-button secondary-button mt-3 w-full py-2 text-xs" onClick={() => toggleSuggestionGroup(group.label)}>
                    {isExpanded ? "候補を閉じる" : `他の候補を表示${hiddenCount ? `（あと${hiddenCount}件）` : ""}`}
                  </button>
                )}
              </section>
            );}) : (
              <p className="perfect-food-panel rounded-md bg-rice p-4 text-center text-sm font-semibold text-moss">候補を出すにはゴール設定が必要です</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setPage(1)}>戻る</button>
              <button className="primary-button" onClick={onClose}>閉じる</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getPerfectFoodFit(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }) {
  const balance = getPerfectFoodBalance(item, target);
  const details: { label: string; tone: "protein" | "ok" | "warn" | "over" }[] = [];
  if (target.protein > 0) {
    details.push(balance.proteinLeft > 0.5
      ? { label: `Pあと${round1(balance.proteinLeft)}g`, tone: "protein" }
      : { label: "Pクリア", tone: "ok" });
  }
  const hasFatOrCarbsTarget = target.fat > 0 || target.carbs > 0;
  if (target.fat > 0) {
    if (balance.fatOver > 0.5) details.push({ label: `F+${round1(balance.fatOver)}g`, tone: "over" });
  }
  if (target.carbs > 0) {
    if (balance.carbsOver > 0.5) details.push({ label: `C+${round1(balance.carbsOver)}g`, tone: "over" });
  }
  if (hasFatOrCarbsTarget && balance.fatOver <= 0.5 && balance.carbsOver <= 0.5) {
    details.push({
      label: "F/C内",
      tone: balance.nonProteinLoad >= 0.88 ? "warn" : "ok",
    });
  }
  if (balance.calorieOver > 25) {
    details.push({ label: `kcal+${Math.round(balance.calorieOver)}`, tone: "over" });
  }

  if (balance.hasOver) return { tone: "over" as const, label: "超過あり", details };
  if (balance.proteinLeft > Math.max(8, target.protein * 0.35)) return { tone: "easy" as const, label: "P不足", details };
  if (balance.nonProteinLoad >= 0.88) return { tone: "tight" as const, label: "枠ギリ", details };
  if (balance.proteinLeft <= 0.5 && balance.nonProteinLoad >= 0.45) return { tone: "good" as const, label: "ぴったり寄り", details };
  return { tone: "good" as const, label: "候補OK", details };
}

function PerfectFoodMetric({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="perfect-food-panel rounded-md bg-rice p-3">
      <p className="text-xs font-bold text-moss">{label}</p>
      <p className="numeric-text mt-2 text-lg font-black">{round1(value)}<span className="ml-1 text-xs font-bold">{suffix}</span></p>
    </div>
  );
}

function UpdateNotesModal({ updates, onClose }: { updates: AppUpdate[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4">
      <div className="compact-card max-h-[82vh] w-full overflow-y-auto p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">更新内容</p>
            <p className="mt-1 text-xs text-moss">アプリに入った変更だけを表示しています。</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 space-y-3">
          {updates.map((update) => (
            <section className="rounded-md border border-line bg-rice p-3" key={update.id}>
              <p className="text-[11px] font-bold text-moss">{formatJapaneseDate(update.date)}</p>
              <h2 className="mt-1 text-sm font-bold">{update.title}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-moss">
                {update.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckInStepper({ label, value, suffix, step, onChange }: { label: string; value: number; suffix: string; step: number; onChange: (value: number) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-moss">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-moss" onClick={() => onChange(round1(Math.max(0, value - step)))} aria-label={`${label}を減らす`}>
          <Minus size={14} />
        </button>
        <label className="min-w-0 flex-1">
          <span className="sr-only">{label}</span>
          <input
            className="h-10 w-full rounded-xl border-line bg-rice px-1 text-center text-base font-semibold focus:ring-1 focus:ring-leaf"
            type="number"
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        </label>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-moss" onClick={() => onChange(round1(value + step))} aria-label={`${label}を増やす`}>
          <Plus size={14} />
        </button>
      </div>
      <p className="mt-1 text-center text-xs font-bold text-ink">{round1(value)} {suffix}</p>
    </div>
  );
}

function FoodTab(props: {
  menuItems: MenuItem[];
  foodEntries: FoodEntry[];
  appDate: string;
  goal?: Goal;
  dayTotals: ReturnType<typeof sumFood>;
  focus?: FoodFocus;
  openMyMenuSettings: () => void;
  onFocusHandled: () => void;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
}) {
  const foodTopRef = useRef<HTMLDivElement | null>(null);
  const chainSectionRef = useRef<HTMLElement | null>(null);
  const chainListRef = useRef<HTMLDivElement | null>(null);
  const categorySectionRef = useRef<HTMLElement | null>(null);
  const genericSectionRef = useRef<HTMLElement | null>(null);
  const foodResultsRef = useRef<HTMLElement | null>(null);
  const todayLogRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<FoodMode>("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem>();
  const [editingEntry, setEditingEntry] = useState<{ entry: FoodEntry; draft: FoodEntryEditDraft }>();
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [multiplier, setMultiplier] = useState(1);
  const [manual, setManual] = useState(emptyManual);
  const [chainCategory, setChainCategory] = useState("牛丼・丼");
  const [brand, setBrand] = useState("松屋");
  const [categoryGenre, setCategoryGenre] = useState("ごはん・丼");
  const [generalCategory, setGeneralCategory] = useState("ごはん・丼");
  const [hideOverGoalItems, setHideOverGoalItems] = useState(false);
  const [showFoodBalance, setShowFoodBalance] = useState(false);
  const [isFoodFilterOpen, setIsFoodFilterOpen] = useState(false);
  const [showFoodFilterIntro, setShowFoodFilterIntro] = useState(() => localStorage.getItem(foodFitFilterSeenStorageKey) !== "1");

  const recentIds = new Set(props.foodEntries.slice(0, 20).map((entry) => entry.menu_item_id).filter(Boolean));
  const favoriteItems = props.menuItems.filter((item) => item.is_favorite);
  const recentItems = props.menuItems.filter((item) => recentIds.has(item.id));
  const scrollToFoodTop = () => {
    window.requestAnimationFrame(() => foodTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const scrollToFoodResults = () => {
    window.setTimeout(() => foodResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const scrollToChainSection = () => {
    window.setTimeout(() => chainSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const scrollToChainList = () => {
    window.setTimeout(() => chainListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const scrollToCategorySection = () => {
    window.setTimeout(() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const scrollToGenericSection = () => {
    window.setTimeout(() => genericSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const dismissFoodFilterIntro = () => {
    setShowFoodFilterIntro(false);
    localStorage.setItem(foodFitFilterSeenStorageKey, "1");
  };
  const openFoodFilterOptions = () => {
    setIsFoodFilterOpen((value) => !value);
    if (showFoodFilterIntro) dismissFoodFilterIntro();
  };
  useEffect(() => {
    if (props.focus !== "todayLog") return;
    const timer = window.setTimeout(() => {
      todayLogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onFocusHandled();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [props.focus]);
  const selectFoodItem = (item: MenuItem) => {
    setMultiplier(1);
    setSelected(item);
  };
  const selectMode = (nextMode: FoodMode) => {
    setMode(nextMode);
    if (nextMode !== "search") setQuery("");
    if (nextMode === "chain") {
      scrollToChainSection();
      return;
    }
    if (nextMode === "category") {
      scrollToCategorySection();
      return;
    }
    if (nextMode === "quick") {
      scrollToGenericSection();
      return;
    }
    if (nextMode === "search" && query.trim()) {
      scrollToFoodResults();
      return;
    }
    scrollToFoodTop();
  };
  const updateSearchQuery = (nextQuery: string) => {
    const wasSearching = query.trim().length > 0;
    const isSearching = nextQuery.trim().length > 0;
    setQuery(nextQuery);
    if (isSearching && !wasSearching) {
      setMode("search");
      scrollToFoodResults();
    }
  };
  const portionOptions = selected ? getPortionOptions(selected) : [];
  const isGlobalSearch = query.trim().length > 0;
  const remainingNutrition = getRemainingNutrition(props.dayTotals, props.goal);
  const canUseOverGoalFilter = !!props.goal && props.goal.target_calories > 0;
  const canShowFoodBalance = canUseOverGoalFilter;
  const isFoodFitFilterActive = (hideOverGoalItems && canUseOverGoalFilter) || (showFoodBalance && canShowFoodBalance);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const tokens = needle.split(/\s+/).filter(Boolean);
    const base = needle
      ? props.menuItems
      : props.menuItems.filter((item) => {
        if (mode === "favorite") return item.is_favorite;
        if (mode === "quick") {
          if (generalCategory === "ざっくり") return item.data_source === "quick_estimate";
          if (item.data_source === "quick_estimate") return false;
          if (item.brand || commercialGeneralCategories.has(item.category)) return false;
          return item.category === generalCategory || item.tags.some((tag) => genericCategories[generalCategory]?.includes(tag));
        }
        if (mode === "personal") return item.is_user_created;
        if (mode === "chain") return item.brand === brand;
        if (mode === "category") {
          return item.category === categoryGenre || item.tags.some((tag) => genericCategories[categoryGenre]?.includes(tag));
        }
        return true;
      });
    const sorted = dedupeMenuItemsBySource(base);
    const matched = needle
      ? sorted.filter((item) => {
        const haystack = `${item.name} ${item.brand ?? ""} ${item.category} ${item.tags.join(" ")} ${item.serving_label ?? ""}`.toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      })
      : sorted;
    const filtered = hideOverGoalItems && canUseOverGoalFilter
      ? matched.filter((item) => fitsRemainingFoodFilter(item, remainingNutrition))
      : matched;
    return filtered.slice(0, 80);
  }, [
    props.menuItems,
    query,
    mode,
    brand,
    categoryGenre,
    generalCategory,
    hideOverGoalItems,
    canUseOverGoalFilter,
    remainingNutrition.calories,
    remainingNutrition.fat,
    remainingNutrition.carbs,
  ]);

  const saveSelected = async () => {
    if (!selected) return;
    const timestamp = nowIso();
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: mealType,
      name: formatMenuItemName(selected),
      brand: selected.brand,
      calories: Math.round(selected.calories * multiplier),
      protein_g: round1(selected.protein_g * multiplier),
      fat_g: round1(selected.fat_g * multiplier),
      carbs_g: round1(selected.carbs_g * multiplier),
      salt_g: selected.salt_g ? round1(selected.salt_g * multiplier) : undefined,
      portion_multiplier: multiplier,
      entry_source: selected.data_source,
      confidence: selected.confidence,
      menu_item_id: selected.id,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setSelected(undefined);
    setMultiplier(1);
    await props.refresh();
    props.showToast(`${formatMenuItemName(selected)}を記録しました`);
  };

  const cloneSelectedToManual = () => {
    if (!selected) return;
    setManual(toManualDraft(selected, mealType));
    setSelected(undefined);
    setMode("manual");
  };

  const saveManual = async () => {
    const timestamp = nowIso();
    let menuItemId: string | undefined;
    const nutrition = draftNutrition(manual);
    const displayName = manual.name.trim() || `${mealLabels[manual.meal_type]}のマニュアル`;
    const brand = manual.brand.trim();
    const tags = unique([manual.category, manual.subcategory, brand, ...(nutrition.unknown.length ? ["栄養素一部不明"] : [])]);
    const note = unique([manual.note, nutrition.unknown.length ? `未入力: ${nutrition.unknown.join("/")}` : ""]).join(" / ") || undefined;
    const confidence = nutrition.unknown.length ? "low" : "high";
    if (manual.savePreset) {
      menuItemId = makeId("menu_user");
      await db.menu_items.put({
        id: menuItemId,
        name: displayName,
        brand: brand || undefined,
        category: manual.category,
        tags,
        calories: nutrition.calories,
        protein_g: nutrition.protein_g,
        fat_g: nutrition.fat_g,
        carbs_g: nutrition.carbs_g,
        salt_g: nutrition.salt_g,
        default_meal_type: manual.meal_type,
        data_source: "user",
        confidence,
        is_public_preset: false,
        is_user_created: true,
        is_favorite: manual.favorite,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: manual.meal_type,
      name: displayName,
      brand: brand || undefined,
      calories: nutrition.calories,
      protein_g: nutrition.protein_g,
      fat_g: nutrition.fat_g,
      carbs_g: nutrition.carbs_g,
      salt_g: nutrition.salt_g,
      portion_multiplier: 1,
      entry_source: "user",
      confidence,
      menu_item_id: menuItemId,
      note,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setManual(emptyManual);
    await props.refresh();
    props.showToast(manual.savePreset ? "食事を記録し、マイメニューに保存しました" : "食事を記録しました");
  };
  const openFoodEntryEdit = (entry: FoodEntry) => {
    setEditingEntry({
      entry,
      draft: {
        name: entry.name,
        brand: entry.brand ?? "",
        meal_type: entry.meal_type,
        calories: String(entry.calories),
        protein_g: String(entry.protein_g),
        fat_g: String(entry.fat_g),
        carbs_g: String(entry.carbs_g),
        salt_g: entry.salt_g === undefined ? "" : String(entry.salt_g),
      },
    });
  };
  const saveFoodEntryEdit = async () => {
    if (!editingEntry) return;
    const { entry, draft } = editingEntry;
    const calories = draftNumber(draft.calories);
    const protein = draftNumber(draft.protein_g);
    const fat = draftNumber(draft.fat_g);
    const carbs = draftNumber(draft.carbs_g);
    const salt = draft.salt_g.trim() === "" ? undefined : draftNumber(draft.salt_g).value;
    const unknown = [calories, protein, fat, carbs].some((item) => item.unknown);
    await db.food_entries.update(entry.id, {
      meal_type: draft.meal_type,
      name: draft.name.trim() || entry.name || `${mealLabels[draft.meal_type]}の食事ログ`,
      brand: draft.brand.trim() || undefined,
      calories: Math.round(calories.value),
      protein_g: round1(protein.value),
      fat_g: round1(fat.value),
      carbs_g: round1(carbs.value),
      salt_g: salt === undefined ? undefined : round1(salt),
      confidence: unknown ? "low" : entry.confidence,
      note: unique([entry.note ?? "", unknown ? "編集時に栄養素一部不明" : ""]).join(" / ") || undefined,
      updated_at: nowIso(),
    });
    setEditingEntry(undefined);
    await props.refresh();
    props.showToast("食事ログを修正しました");
  };
  const todayFoodEntries = props.foodEntries.filter((entry) => entry.app_date === props.appDate);
  const foodLogTitle = `${formatJapaneseDate(props.appDate)}の食事ログ`;

  return (
    <div className="scroll-mt-24 space-y-4" ref={foodTopRef}>
      <div className="sticky-panel sticky top-[74px] z-10 -mx-4 space-y-3 px-4 pb-2">
        <form className="compact-card flex gap-2 p-2" onSubmit={(event) => { event.preventDefault(); setMode("search"); scrollToFoodResults(); }}>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-moss" size={20} />
            <input className="h-12 w-full pl-10 text-base" value={query} onChange={(event) => updateSearchQuery(event.target.value)} placeholder="食品・ブランド検索" />
          </div>
          <button
            type="button"
            className={`food-filter-button h-12 w-12 ${isFoodFitFilterActive ? "food-filter-button-active" : ""} ${showFoodFilterIntro ? "food-filter-button-highlight" : ""}`}
            aria-label="食事検索フィルター"
            onClick={openFoodFilterOptions}
          >
            <SlidersHorizontal size={18} />
          </button>
          <button type="submit" className={`${mode === "search" || isGlobalSearch ? "primary-button" : "secondary-button"} h-12 px-4`}>検索</button>
        </form>
        {showFoodFilterIntro && mode !== "manual" && (
          <section className="food-filter-intro compact-card p-3">
            <div className="min-w-0">
              <p className="text-sm font-bold">検索フィルターが増えました</p>
              <p className="mt-1 text-xs text-moss">検索バー横のボタンから、目標内だけ表示やP/F/Cバランス表示を選べます。</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="primary-button h-9 flex-1 px-3 text-xs" onClick={openFoodFilterOptions}>使ってみる</button>
              <button className="secondary-button h-9 px-3 text-xs" onClick={dismissFoodFilterIntro}>閉じる</button>
            </div>
          </section>
        )}
        {isFoodFilterOpen && mode !== "manual" && (
          <section className="food-filter-panel compact-card p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold">検索フィルター</p>
                <p className="numeric-text mt-1 text-[11px] font-semibold text-moss">
                  あと {Math.max(0, Math.round(remainingNutrition.calories))}kcal / P{round1(remainingNutrition.protein)} F{round1(remainingNutrition.fat)} C{round1(remainingNutrition.carbs)}
                </p>
              </div>
              <button className="icon-button h-8 w-8" aria-label="フィルターを閉じる" onClick={() => setIsFoodFilterOpen(false)}>×</button>
            </div>
            <div className="mt-3 space-y-2">
              <button
                className={`food-filter-option ${hideOverGoalItems ? "food-filter-option-active" : ""} ${!canUseOverGoalFilter ? "opacity-50" : ""}`}
                disabled={!canUseOverGoalFilter}
                onClick={() => setHideOverGoalItems((value) => !value)}
              >
                <span>
                  <span className="block text-sm font-bold">目標を超えないメニューのみ表示</span>
                  <span className="mt-1 block text-xs text-moss">kcal/F/Cが今日の残り枠に収まる候補だけに絞ります。</span>
                </span>
                <span className="mini-chip shrink-0">{hideOverGoalItems ? "ON" : "OFF"}</span>
              </button>
              <button
                className={`food-filter-option ${showFoodBalance ? "food-filter-option-active" : ""} ${!canShowFoodBalance ? "opacity-50" : ""}`}
                disabled={!canShowFoodBalance}
                onClick={() => setShowFoodBalance((value) => !value)}
              >
                <span>
                  <span className="block text-sm font-bold">残りの数値とのバランスを表示</span>
                  <span className="mt-1 block text-xs text-moss">P不足、F/C超過、kcal超過を検索結果の行に表示します。</span>
                </span>
                <span className="mini-chip shrink-0">{showFoodBalance ? "ON" : "OFF"}</span>
              </button>
            </div>
          </section>
        )}
        {!isGlobalSearch && (
          <div className="grid grid-cols-3 gap-2">
            {(["favorite", "personal", "manual", "chain", "category", "quick"] as FoodMode[]).map((item) => (
              <button key={item} className={`mode-button ${mode === item ? "mode-button-active" : ""}`} onClick={() => selectMode(item)}>
                {foodModeLabel(item)}
              </button>
            ))}
          </div>
        )}
      </div>

      {mode === "chain" && (
        <section className="compact-card scroll-mt-24 p-3" ref={chainSectionRef}>
          <p className="mb-2 text-xs font-semibold text-moss">ジャンル</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(chainCategories).map((item) => (
              <button
                className={`tap-tile ${chainCategory === item ? "tap-tile-active" : ""}`}
                key={item}
                onClick={() => {
                  setChainCategory(item);
                  setBrand(chainCategories[item]?.[0] ?? "");
                  scrollToChainList();
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="mb-2 mt-3 text-xs font-semibold text-moss">チェーン</p>
          <div className="grid grid-cols-2 gap-2 scroll-mt-24" ref={chainListRef}>
            {chainCategories[chainCategory].map((item) => (
              <button className={`tap-tile ${brand === item ? "tap-tile-active" : ""}`} key={item} onClick={() => { setBrand(item); scrollToFoodResults(); }}>{item}</button>
            ))}
            {chainCategories[chainCategory].length === 0 && <p className="col-span-2 px-1 py-2 text-sm text-moss">該当するチェーンはまだ登録されていません。</p>}
          </div>
        </section>
      )}

      {mode === "category" && (
        <section className="compact-card scroll-mt-24 p-3" ref={categorySectionRef}>
          <p className="mb-2 text-xs font-semibold text-moss">ジャンル</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(genericCategories).map((item) => (
              <button className={`tap-tile ${categoryGenre === item ? "tap-tile-active" : ""}`} key={item} onClick={() => { setCategoryGenre(item); scrollToFoodResults(); }}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode === "quick" && (
        <section className="compact-card scroll-mt-24 p-3" ref={genericSectionRef}>
          <p className="mb-2 text-xs font-semibold text-moss">ジャンル</p>
          <div className="grid grid-cols-2 gap-2">
            {generalFoodCategoryLabels.map((item) => (
              <button className={`tap-tile ${generalCategory === item ? "tap-tile-active" : ""}`} key={item} onClick={() => { setGeneralCategory(item); scrollToFoodResults(); }}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode !== "manual" && (
        <>
          {mode === "search" && !isGlobalSearch && (
            <QuickStrip title="Recent" items={recentItems} onPick={selectFoodItem} fallback={favoriteItems} />
          )}
          {mode === "favorite" && !isGlobalSearch && favoriteItems.length === 0 && (
            <section className="compact-card p-4 text-sm text-moss">食品行のハートを押すとここから呼び出せます。</section>
          )}
          {mode === "personal" && !isGlobalSearch && (
            <section className="compact-card p-3">
              <button className="primary-button w-full" onClick={props.openMyMenuSettings}><Plus size={17} />マイメニューを登録</button>
            </section>
          )}
          <section className="compact-card divide-y divide-line overflow-hidden scroll-mt-24" ref={foodResultsRef}>
            <ListHeader title={isGlobalSearch ? "検索結果" : mode === "category" ? categoryGenre : mode === "quick" ? generalCategory : foodModeLabel(mode)} value={`${results.length}件`} />
            {results.map((item) => (
              <FoodItemRow
                key={item.id}
                item={item}
                onPick={selectFoodItem}
                onClone={setManualFromItem(setManual, setMode)}
                refresh={props.refresh}
                balanceTarget={showFoodBalance && canShowFoodBalance ? remainingNutrition : undefined}
              />
            ))}
            {results.length === 0 && <EmptyLine text="見つかりません" />}
          </section>
        </>
      )}

      {mode === "manual" && (
        <ManualFoodForm manual={manual} setManual={setManual} onSave={saveManual} />
      )}

      <section className="compact-card divide-y divide-line scroll-mt-24" ref={todayLogRef}>
        <ListHeader title={foodLogTitle} value={`${todayFoodEntries.length}件`} />
        {todayFoodEntries.map((entry) => (
          <FoodLogRow
            entry={entry}
            key={entry.id}
            displayName={formatFoodEntryName(entry, props.menuItems)}
            showSource
            onEdit={() => openFoodEntryEdit(entry)}
            onDelete={async () => {
              await db.food_entries.delete(entry.id);
              await props.refresh();
            }}
          />
        ))}
      </section>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={() => setSelected(undefined)}>
          <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
            <p className="text-lg font-bold">{formatMenuItemName(selected)}</p>
            <p className="numeric-text text-sm text-moss">{selected.brand ?? selected.category} · {Math.round(selected.calories * multiplier)} kcal</p>
            <div className="mt-2">
              <SourceBadge item={selected} source={selected.data_source} confidence={selected.confidence} />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Object.entries(mealLabels).map(([key, label]) => (
                <button key={key} className={`chip justify-center ${mealType === key ? "chip-active" : ""}`} onClick={() => setMealType(key as MealType)}>{label}</button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {portionOptions.map(({ label, value }) => (
                <button key={label} className={`chip justify-center ${multiplier === value ? "chip-active" : ""}`} onClick={() => setMultiplier(value)}>{label}</button>
              ))}
            </div>
            <input className="mt-3 w-full" type="number" step="0.05" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setSelected(undefined)}>閉じる</button>
              <button className="primary-button" onClick={saveSelected}><Check size={17} />記録</button>
            </div>
            <button className="secondary-button mt-2 w-full" onClick={cloneSelectedToManual}><Pencil size={17} />編集して個人メニュー化</button>
          </div>
        </div>
      )}

      {editingEntry && (
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={() => setEditingEntry(undefined)}>
          <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold">食事ログを修正</p>
                <p className="mt-1 text-xs text-moss">{formatJapaneseDate(editingEntry.entry.app_date)}の記録</p>
              </div>
              <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={() => setEditingEntry(undefined)}>×</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <input
                className="col-span-2"
                value={editingEntry.draft.name}
                onChange={(event) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, name: event.target.value } })}
                placeholder="名前"
              />
              <input
                value={editingEntry.draft.brand}
                onChange={(event) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, brand: event.target.value } })}
                placeholder="ブランド"
              />
              <select
                value={editingEntry.draft.meal_type}
                onChange={(event) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, meal_type: event.target.value as MealType } })}
              >
                {Object.entries(mealLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
              <PartialNumberInput label="kcal" value={editingEntry.draft.calories} onChange={(value) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, calories: value } })} />
              <PartialNumberInput label="P" value={editingEntry.draft.protein_g} step={0.1} onChange={(value) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, protein_g: value } })} />
              <PartialNumberInput label="F" value={editingEntry.draft.fat_g} step={0.1} onChange={(value) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, fat_g: value } })} />
              <PartialNumberInput label="C" value={editingEntry.draft.carbs_g} step={0.1} onChange={(value) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, carbs_g: value } })} />
              <input
                className="col-span-2"
                value={editingEntry.draft.salt_g}
                onChange={(event) => setEditingEntry({ ...editingEntry, draft: { ...editingEntry.draft, salt_g: event.target.value } })}
                placeholder="塩分 optional"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="secondary-button justify-center" onClick={() => setEditingEntry(undefined)}>閉じる</button>
              <button className="primary-button" onClick={saveFoodEntryEdit}><Save size={17} />保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutTab(props: {
  profile?: Profile;
  appDate: string;
  exercisePresets: ExercisePreset[];
  workoutTemplates: WorkoutTemplate[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  setWorkoutTemplates: (templates: WorkoutTemplate[]) => void;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  showPrCelebration: (celebration: Omit<WorkoutPrCelebration, "id">) => void;
}) {
  const [sessionId, setSessionId] = useState<string>();
  const [mode, setMode] = useState<WorkoutMode>("favorite");
  const [filter, setFilter] = useState("");
  const [focusedExerciseId, setFocusedExerciseId] = useState<string>();
  const [sessionScrollKey, setSessionScrollKey] = useState(0);
  const [editingTemplateId, setEditingTemplateId] = useState<string>();
  const [templateExerciseQuery, setTemplateExerciseQuery] = useState("");
  const [templateTargetItem, setTemplateTargetItem] = useState<{ label: string; item: TemplateExercise }>();
  const [exerciseDraft, setExerciseDraft] = useState<WorkoutExerciseDraft>();
  const [templateSaveMessage, setTemplateSaveMessage] = useState("");
  const [draggingTemplateId, setDraggingTemplateId] = useState<string>();
  const draggingTemplateIdRef = useRef<string | undefined>(undefined);
  const dragReorderLockRef = useRef(false);
  const celebratedPrKeysRef = useRef<Set<string>>(new Set());
  const exerciseEditorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const workoutTopRef = useRef<HTMLDivElement | null>(null);
  const templateEditorRef = useRef<HTMLElement | null>(null);
  const sessionSectionRef = useRef<HTMLElement | null>(null);
  const activeSession = props.workoutSessions.find((session) => session.id === sessionId);
  const editingTemplate = props.workoutTemplates.find((template) => template.id === editingTemplateId);
  const activeExercises = props.workoutExercises
    .filter((exercise) => exercise.session_id === sessionId)
    .sort((a, b) => a.order - b.order);
  const dateSessions = props.workoutSessions.filter((session) => session.app_date === props.appDate);

  useEffect(() => {
    setSessionId(undefined);
    setFocusedExerciseId(undefined);
    setSessionScrollKey(0);
    celebratedPrKeysRef.current.clear();
  }, [props.appDate]);

  useEffect(() => {
    if (!focusedExerciseId) return;
    const target = exerciseEditorRefs.current[focusedExerciseId];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = window.setTimeout(() => setFocusedExerciseId(undefined), 1800);
    return () => window.clearTimeout(timer);
  }, [focusedExerciseId, activeExercises.length]);

  useEffect(() => {
    if (!sessionScrollKey || focusedExerciseId || !activeSession) return;
    sessionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSession, focusedExerciseId, sessionScrollKey]);

  useEffect(() => {
    if (!draggingTemplateId) return;
    const handlePointerMove = (event: PointerEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-workout-template-id]") as HTMLElement | null;
      const targetId = target?.dataset.workoutTemplateId;
      const draggedId = draggingTemplateIdRef.current;
      if (!targetId || !draggedId || targetId === draggedId || dragReorderLockRef.current) return;
      dragReorderLockRef.current = true;
      void reorderWorkoutTemplate(draggedId, targetId).finally(() => {
        dragReorderLockRef.current = false;
      });
    };
    const stopDragging = () => {
      draggingTemplateIdRef.current = undefined;
      setDraggingTemplateId(undefined);
    };
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", stopDragging, { once: true });
    document.addEventListener("pointercancel", stopDragging, { once: true });
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", stopDragging);
      document.removeEventListener("pointercancel", stopDragging);
    };
  }, [draggingTemplateId, props.workoutTemplates]);

  const openExerciseDraft = (exercise: ExercisePreset) => {
    const isCardio = isCardioWorkoutItem(exercise);
    const firstSet = exercise.default_set_scheme?.[0];
    const sets = isCardio ? 1 : Math.min(5, Math.max(1, Math.round(exercise.default_sets ?? exercise.default_set_scheme?.length ?? 3)));
    const reps = Math.max(0, Math.round(exercise.default_reps ?? firstSet?.reps ?? (isCardio ? 0 : 10)));
    const weight = round1(Math.max(0, exercise.default_weight_kg ?? firstSet?.weight_kg ?? 0));
    const duration = Math.max(0, Math.round(exercise.default_duration_min ?? firstSet?.duration_min ?? 20));
    setExerciseDraft({
      exercise,
      sets,
      reps,
      weight_kg: weight,
      duration_min: duration,
      setSchemeText: "",
    });
  };

  const addPresetExercise = async (draft: WorkoutExerciseDraft) => {
    const { exercise } = draft;
    const isCardio = isCardioWorkoutItem(exercise);
    const setCount = isCardio ? 1 : Math.min(5, Math.max(1, Math.round(draft.sets)));
    const reps = isCardio ? 0 : Math.max(0, Math.round(draft.reps));
    const weightKg = isCardio ? undefined : round1(Math.max(0, draft.weight_kg));
    const durationMin = isCardio ? Math.max(0, Math.round(draft.duration_min)) : undefined;
    const setScheme: WorkoutSetPattern[] = isCardio
      ? [{
        reps: 0,
        duration_min: durationMin ?? 0,
        active_calories: estimateActiveCalories(exercise.name, durationMin ?? 0, props.profile?.current_weight_kg ?? 70),
      }]
      : Array.from({ length: setCount }, () => ({
        reps,
        weight_kg: weightKg ?? 0,
      }));
    let targetSessionId = sessionId;
    let targetSessionForPr = props.workoutSessions.find((session) => session.id === targetSessionId);
    if (!targetSessionId) {
      targetSessionId = makeId("session");
      const timestamp = nowIso();
      targetSessionForPr = {
        id: targetSessionId,
        app_date: props.appDate,
        logged_at: timestamp,
        title: "フリーワークアウト",
        workout_type: "strength",
        body_parts: [exercise.body_part],
        created_at: timestamp,
        updated_at: timestamp,
      };
      await db.workout_sessions.put(targetSessionForPr);
      setSessionId(targetSessionId);
    }
    const addedExerciseId = await addExerciseToSession(
      targetSessionId,
      {
        ...exercisePresetToTemplateExercise(exercise),
        sets: setCount,
        reps,
        weight_kg: weightKg,
        duration_min: durationMin,
        set_scheme: setScheme,
      },
      props.workoutExercises.filter((item) => item.session_id === targetSessionId).length,
      props.workoutSets,
      props.workoutExercises,
      { bodyWeightKg: props.profile?.current_weight_kg ?? 70, preferItemValues: true },
    );
    const previewExercise: WorkoutExercise = {
      id: addedExerciseId,
      session_id: targetSessionId,
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      body_part: exercise.body_part,
      equipment_type: exercise.equipment_type,
      machine_name: exercise.machine_name,
      order: props.workoutExercises.filter((item) => item.session_id === targetSessionId).length,
      created_at: nowIso(),
      updated_at: nowIso(),
    };
    maybeCelebratePr(
      previewExercise,
      [],
      workoutSetPatternsToPreviewSets(addedExerciseId, setScheme),
      targetSessionForPr ? [...props.workoutSessions.filter((session) => session.id !== targetSessionForPr?.id), targetSessionForPr] : props.workoutSessions,
      props.workoutExercises,
      props.workoutSets,
    );
    await props.refresh();
    setFocusedExerciseId(addedExerciseId);
    props.showToast(`${exercise.name}を今日のワークアウトに追加しました`);
  };

  const maybeCelebratePr = (
    exercise: WorkoutExercise,
    previousSets: WorkoutSet[],
    nextSets: WorkoutSet[],
    sessions = props.workoutSessions,
    exercises = props.workoutExercises,
    allSets = props.workoutSets,
  ) => {
    const pr = detectWorkoutPrUpdate(exercise, previousSets, nextSets, sessions, exercises, allSets);
    if (!pr) return;
    const key = `${exercise.session_id}:${exercise.exercise_name}:${pr.previousScore}`;
    if (celebratedPrKeysRef.current.has(key)) return;
    celebratedPrKeysRef.current.add(key);
    props.showPrCelebration({
      exerciseName: exercise.exercise_name,
      label: pr.label,
      previousLabel: pr.previousLabel,
    });
  };

  const toggleExerciseFavorite = async (exercise: ExercisePreset) => {
    await db.exercise_presets.update(exercise.id, { is_favorite: !exercise.is_favorite, updated_at: nowIso() });
    await props.refresh();
  };

  const updateTemplateExercises = async (template: WorkoutTemplate, exercises: TemplateExercise[]) => {
    await db.workout_templates.update(template.id, {
      exercises,
      body_parts: templateBodyParts(exercises),
      updated_at: nowIso(),
    });
    await props.refresh();
  };

  const addExerciseToTemplate = async (templateId: string, item: TemplateExercise) => {
    const template = props.workoutTemplates.find((item) => item.id === templateId);
    if (!template) return;
    await updateTemplateExercises(template, [...template.exercises, item]);
    setEditingTemplateId(template.id);
    setTemplateTargetItem(undefined);
    props.showToast(`${template.name}に${item.exercise_name}を追加しました`);
  };

  const removeExerciseFromTemplate = async (template: WorkoutTemplate, index: number) => {
    await updateTemplateExercises(template, template.exercises.filter((_, itemIndex) => itemIndex !== index));
  };

  const updateTemplateExercise = async (template: WorkoutTemplate, index: number, exercise: TemplateExercise) => {
    await updateTemplateExercises(template, template.exercises.map((item, itemIndex) => itemIndex === index ? exercise : item));
  };

  const updateTemplateDetails = async (template: WorkoutTemplate, details: { name: string; icon_key: WorkoutTemplateIconKey }) => {
    const name = details.name.trim() || template.name;
    await db.workout_templates.update(template.id, {
      name,
      icon_key: details.icon_key,
      updated_at: nowIso(),
    });
    await props.refresh();
  };

  const beginTemplateDrag = (template: WorkoutTemplate) => {
    draggingTemplateIdRef.current = template.id;
    setDraggingTemplateId(template.id);
  };

  const endTemplateDrag = () => {
    draggingTemplateIdRef.current = undefined;
    setDraggingTemplateId(undefined);
  };

  const reorderWorkoutTemplate = async (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const ordered = sortWorkoutTemplates(props.workoutTemplates);
    const draggedIndex = ordered.findIndex((template) => template.id === draggedId);
    const targetIndex = ordered.findIndex((template) => template.id === targetId);
    if (draggedIndex < 0 || targetIndex < 0) return;
    const [dragged] = ordered.splice(draggedIndex, 1);
    ordered.splice(targetIndex, 0, dragged);
    const timestamp = nowIso();
    const nextTemplates = ordered.map((template, index) => ({ ...template, display_order: index, updated_at: timestamp }));
    props.setWorkoutTemplates(nextTemplates);
    await Promise.all(ordered.map((template, index) => db.workout_templates.update(template.id, {
      display_order: index,
      updated_at: timestamp,
    })));
  };

  const openTemplateEditor = (template: WorkoutTemplate) => {
    setEditingTemplateId(template.id);
    setTemplateExerciseQuery("");
    window.setTimeout(() => {
      templateEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const deleteWorkoutTemplate = async (template: WorkoutTemplate) => {
    if (!confirm(`ワークアウトプリセット「${template.name}」を削除しますか？過去の記録は残ります。`)) return;
    const timestamp = nowIso();
    await db.transaction("rw", db.settings, db.workout_templates, async () => {
      await db.workout_templates.delete(template.id);
      if (template.is_public_preset) {
        const settings = await db.settings.get("local");
        if (settings) {
          await db.settings.update("local", {
            hidden_workout_template_ids: unique([...(settings.hidden_workout_template_ids ?? []), template.id]),
            updated_at: timestamp,
          });
        }
      }
    });
    if (editingTemplateId === template.id) setEditingTemplateId(undefined);
    await props.refresh();
  };

  const deleteWorkoutSession = async (session: WorkoutSession) => {
    if (!confirm(`この日の記録から「${session.title}」を削除しますか？ワークアウトメニュー・プリセット本体は残ります。`)) return;
    const exerciseIds = props.workoutExercises.filter((exercise) => exercise.session_id === session.id).map((exercise) => exercise.id);
    const setIds = props.workoutSets.filter((set) => exerciseIds.includes(set.workout_exercise_id)).map((set) => set.id);
    await db.transaction("rw", db.workout_sessions, db.workout_exercises, db.workout_sets, async () => {
      if (setIds.length) await db.workout_sets.bulkDelete(setIds);
      if (exerciseIds.length) await db.workout_exercises.bulkDelete(exerciseIds);
      await db.workout_sessions.delete(session.id);
    });
    if (sessionId === session.id) {
      setSessionId(undefined);
      setFocusedExerciseId(undefined);
    }
    await props.refresh();
  };

  const deleteWorkoutExercise = async (exercise: WorkoutExercise) => {
    if (!confirm(`この日の記録から「${exercise.exercise_name}」を削除しますか？種目メニュー本体は残ります。`)) return;
    const setIds = props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id).map((set) => set.id);
    const remainingExercises = props.workoutExercises.filter((item) => item.session_id === exercise.session_id && item.id !== exercise.id);
    await db.transaction("rw", db.workout_sessions, db.workout_exercises, db.workout_sets, async () => {
      if (setIds.length) await db.workout_sets.bulkDelete(setIds);
      await db.workout_exercises.delete(exercise.id);
      await db.workout_sessions.update(exercise.session_id, {
        body_parts: unique(remainingExercises.map((item) => item.body_part)),
        updated_at: nowIso(),
      });
    });
    await props.refresh();
  };

  const saveActiveSessionAsTemplate = async (session: WorkoutSession) => {
    const sessionExercises = props.workoutExercises
      .filter((exercise) => exercise.session_id === session.id)
      .sort((a, b) => a.order - b.order);
    if (!sessionExercises.length) {
      setTemplateSaveMessage("保存できる種目がありません");
      return;
    }
    const exercises = sessionExercises.map((exercise) => workoutExerciseToTemplateExercise(
      exercise,
      props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id).sort((a, b) => a.set_order - b.set_order),
    ));
    const bodyParts = templateBodyParts(exercises);
    const timestamp = nowIso();
    const template: WorkoutTemplate = {
      id: makeId("template_user"),
      name: `${session.title} preset`,
      body_parts: bodyParts,
      icon_key: inferWorkoutTemplateIconKey({ body_parts: bodyParts, exercises }),
      exercises,
      is_public_preset: false,
      is_user_created: true,
      display_order: props.workoutTemplates.length,
      created_at: timestamp,
      updated_at: timestamp,
    };
    await db.workout_templates.put(template);
    await props.refresh();
    setMode("preset");
    setEditingTemplateId(template.id);
    setTemplateExerciseQuery("");
    setTemplateSaveMessage("プリセットに保存しました");
    props.showToast("ワークアウトプリセットに保存しました");
    window.requestAnimationFrame(() => workoutTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const scrollToWorkoutTop = () => {
    setFocusedExerciseId(undefined);
    setMode("search");
    setFilter("");
    window.setTimeout(() => workoutTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const startFromTemplate = async (template: WorkoutTemplate) => {
    const timestamp = nowIso();
    const newSession: WorkoutSession = {
      id: makeId("session"),
      app_date: props.appDate,
      logged_at: timestamp,
      title: template.name,
      workout_type: "strength",
      body_parts: template.body_parts,
      template_id: template.id,
      created_at: timestamp,
      updated_at: timestamp,
    };
    await db.workout_sessions.put(newSession);
    let firstExerciseId: string | undefined;
    for (const [index, item] of template.exercises.entries()) {
      const addedExerciseId = await addExerciseToSession(newSession.id, item, index, props.workoutSets, props.workoutExercises);
      firstExerciseId ??= addedExerciseId;
    }
    setSessionId(newSession.id);
    await props.refresh();
    setFocusedExerciseId(firstExerciseId);
    props.showToast(`${template.name}を今日のワークアウトに追加しました`);
  };

  const copyPrevious = async () => {
    const previous = props.workoutSessions.find((session) => session.app_date !== props.appDate);
    if (!previous) return;
    const exercises = props.workoutExercises.filter((exercise) => exercise.session_id === previous.id).sort((a, b) => a.order - b.order);
    const timestamp = nowIso();
    const newSession: WorkoutSession = {
      ...previous,
      id: makeId("session"),
      app_date: props.appDate,
      logged_at: timestamp,
      title: `${previous.title} コピー`,
      created_at: timestamp,
      updated_at: timestamp,
    };
    await db.workout_sessions.put(newSession);
    let firstExerciseId: string | undefined;
    for (const exercise of exercises) {
      const newExercise = { ...exercise, id: makeId("workout_exercise"), session_id: newSession.id, created_at: timestamp, updated_at: timestamp };
      firstExerciseId ??= newExercise.id;
      await db.workout_exercises.put(newExercise);
      const sets = props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id);
      await db.workout_sets.bulkPut(sets.map((set) => ({ ...set, id: makeId("set"), workout_exercise_id: newExercise.id, created_at: timestamp, updated_at: timestamp })));
    }
    setSessionId(newSession.id);
    await props.refresh();
    setFocusedExerciseId(firstExerciseId);
    props.showToast("前回のワークアウトをコピーしました");
  };

  const favoriteExercises = props.exercisePresets.filter((item) => item.is_favorite);
  const exerciseResults = props.exercisePresets
    .filter((item) => {
      if (mode === "body" && filter) return item.body_part === filter;
      if (mode === "equipment" && filter) return item.equipment_type === filter;
      if (mode === "search" && filter) return item.name.includes(filter) || item.body_part.includes(filter) || item.equipment_type.includes(filter);
      return mode === "search";
    })
    .slice(0, 40);

  return (
    <div className="space-y-4" ref={workoutTopRef}>
      <div className="grid grid-cols-3 gap-2">
        {(["favorite", "preset", "body", "equipment", "previous", "search"] as const).map((item) => (
          <button className={`mode-button ${mode === item ? "mode-button-active" : ""}`} key={item} onClick={() => setMode(item)}>{workoutModeLabel(item)}</button>
        ))}
      </div>

      {dateSessions.length > 0 && (
        <section className="compact-card divide-y divide-line">
          <ListHeader title={`${formatJapaneseDate(props.appDate)}のワークアウト`} value={`${dateSessions.length}件`} />
          {dateSessions.map((session) => (
            <div className="flex items-center justify-between gap-3 px-4 py-3" key={session.id}>
              <button className="min-w-0 flex-1 text-left" onClick={() => {
                setSessionId(session.id);
                setFocusedExerciseId(undefined);
                setSessionScrollKey((key) => key + 1);
              }}>
                <p className="truncate text-sm font-semibold">{session.title}</p>
                <p className="truncate text-xs text-moss">{session.body_parts.join(" / ") || "未設定"}</p>
              </button>
              <button className="icon-button h-8 w-8 text-clay" aria-label={`${session.title}をこの日の記録から削除`} onClick={() => deleteWorkoutSession(session)}><Trash2 size={14} /></button>
              <ChevronRight size={17} />
            </div>
          ))}
        </section>
      )}

      {mode === "favorite" && (
        <section className="compact-card divide-y divide-line">
          <ListHeader title="お気に入り種目" value={`${favoriteExercises.length}件`} />
          {favoriteExercises.map((exercise) => (
            <ExercisePresetRow
              exercise={exercise}
              isFavorite={!!exercise.is_favorite}
              key={exercise.id}
              onAdd={openExerciseDraft}
              onToggleFavorite={toggleExerciseFavorite}
              onPickTemplate={props.workoutTemplates.length ? (item) => setTemplateTargetItem({ label: item.name, item: exercisePresetToTemplateExercise(item) }) : undefined}
            />
          ))}
          {favoriteExercises.length === 0 && <EmptyLine text="種目行のハートを押すと、ここから単一種目をすぐ追加できます" />}
        </section>
      )}

      {mode === "preset" && (
        <div className="space-y-3">
          <section className="compact-card divide-y divide-line">
            <ListHeader title="ワークアウトプリセット" value={`${props.workoutTemplates.length}件`} />
            {props.workoutTemplates.map((template) => (
              <WorkoutTemplateRow
                isDragging={draggingTemplateId === template.id}
                isEditing={editingTemplateId === template.id}
                key={template.id}
                onEdit={() => openTemplateEditor(template)}
                onStart={startFromTemplate}
                onDelete={() => deleteWorkoutTemplate(template)}
                onDragEnd={endTemplateDrag}
                onDragEnter={(targetTemplate) => {
                  if (draggingTemplateId) reorderWorkoutTemplate(draggingTemplateId, targetTemplate.id);
                }}
                onDragStart={beginTemplateDrag}
                template={template}
              />
            ))}
            {props.workoutTemplates.length === 0 && <EmptyLine text="ワークアウト後に「現在の内容をプリセット保存」でここから呼び出せます" />}
          </section>

          {editingTemplate && (
            <WorkoutTemplateEditor
              editorRef={templateEditorRef}
              exercisePresets={props.exercisePresets}
              bodyWeightKg={props.profile?.current_weight_kg ?? 70}
              onAddExercise={(exercise) => addExerciseToTemplate(editingTemplate.id, exercisePresetToTemplateExercise(exercise))}
              onRemoveExercise={(index) => removeExerciseFromTemplate(editingTemplate, index)}
              onStart={() => startFromTemplate(editingTemplate)}
              onDelete={() => deleteWorkoutTemplate(editingTemplate)}
              onUpdateDetails={(details) => updateTemplateDetails(editingTemplate, details)}
              onUpdateExercise={(index, exercise) => updateTemplateExercise(editingTemplate, index, exercise)}
              query={templateExerciseQuery}
              setQuery={setTemplateExerciseQuery}
              template={editingTemplate}
            />
          )}
        </div>
      )}

      {mode === "previous" && (
        <button className="primary-button w-full" onClick={copyPrevious}><RotateCcw size={17} />前回コピー</button>
      )}

      {(mode === "body" || mode === "equipment" || mode === "search") && (
        <section className="compact-card p-3">
          {mode === "search" ? (
            <input className="h-12 w-full text-base" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="種目検索" />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {unique(props.exercisePresets.map((item) => mode === "body" ? item.body_part : item.equipment_type)).map((item) => (
                <button className={`tap-tile ${filter === item ? "tap-tile-active" : ""}`} key={item} onClick={() => setFilter(item)}>{item}</button>
              ))}
            </div>
          )}
          <div className="mt-3 divide-y divide-line">
            {exerciseResults.map((exercise) => (
              <ExercisePresetRow
                exercise={exercise}
                isFavorite={!!exercise.is_favorite}
                key={exercise.id}
                onAdd={openExerciseDraft}
                onToggleFavorite={toggleExerciseFavorite}
                onPickTemplate={props.workoutTemplates.length ? (item) => setTemplateTargetItem({ label: item.name, item: exercisePresetToTemplateExercise(item) }) : undefined}
              />
            ))}
          </div>
        </section>
      )}

      {activeSession && (
        <section className="compact-card divide-y divide-line" ref={sessionSectionRef}>
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold">{activeSession.title}</h2>
              <p className="mt-1 text-xs text-moss">{formatJapaneseDate(activeSession.app_date)} · {activeExercises.length}種目</p>
            </div>
            <button className="secondary-button border-clay px-3 py-2 text-xs text-clay" aria-label={`${activeSession.title}をこの日の記録から削除`} onClick={() => deleteWorkoutSession(activeSession)}><Trash2 size={14} />記録から削除</button>
          </div>
          {activeExercises.map((exercise) => (
            <div
              key={exercise.id}
              ref={(node) => {
                exerciseEditorRefs.current[exercise.id] = node;
              }}
              className={`workout-editor-anchor ${focusedExerciseId === exercise.id ? "workout-editor-focus" : ""}`}
            >
              <WorkoutExerciseEditor
                exercise={exercise}
                sets={props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id).sort((a, b) => a.set_order - b.set_order)}
                bodyWeightKg={props.profile?.current_weight_kg ?? 70}
                onDeleteExercise={() => deleteWorkoutExercise(exercise)}
                onPickTemplate={props.workoutTemplates.length ? (item) => setTemplateTargetItem(item) : undefined}
                onPrUpdate={maybeCelebratePr}
                refresh={props.refresh}
              />
            </div>
          ))}
          <div className="grid gap-2 p-3">
            <button className="secondary-button w-full" onClick={scrollToWorkoutTop}><Plus size={17} />他の種目を追加</button>
            <button className="secondary-button w-full" onClick={() => saveActiveSessionAsTemplate(activeSession)}><Archive size={17} />現在の内容をプリセット保存</button>
            {templateSaveMessage && <p className="text-center text-xs font-semibold text-moss">{templateSaveMessage}</p>}
          </div>
        </section>
      )}

      <section className="compact-card divide-y divide-line">
        <ListHeader title="履歴" value={`${props.workoutSessions.length}件`} />
        {props.workoutSessions.slice(0, 12).map((session) => (
          <div className="flex items-center justify-between gap-3 px-4 py-3" key={session.id}>
            <button className="min-w-0 flex-1 text-left" onClick={() => {
              setSessionId(session.id);
              setFocusedExerciseId(undefined);
              setSessionScrollKey((key) => key + 1);
            }}>
              <p className="text-sm font-semibold">{session.title}</p>
              <p className="text-xs text-moss">{formatJapaneseDate(session.app_date)} · {session.body_parts.join(" / ")}</p>
            </button>
            <button className="icon-button h-8 w-8 text-clay" aria-label={`${session.title}をこの日の記録から削除`} onClick={() => deleteWorkoutSession(session)}><Trash2 size={14} /></button>
            <ChevronRight size={17} />
          </div>
        ))}
      </section>

      {templateTargetItem && (
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4">
          <div className="compact-card w-full p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold">プリセットへ追加</p>
                <p className="mt-1 text-sm text-moss">{templateTargetItem.label}</p>
              </div>
              <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={() => setTemplateTargetItem(undefined)}>×</button>
            </div>
            <div className="mt-3 grid gap-2">
              {props.workoutTemplates.map((template) => (
                <button className="secondary-button justify-between" key={template.id} onClick={() => addExerciseToTemplate(template.id, templateTargetItem.item)}>
                  <span className="truncate">{template.name}</span>
                  <span className="text-xs text-muted">{template.exercises.length}種目</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {exerciseDraft && (
        <ExerciseAddModal
          draft={exerciseDraft}
          setDraft={setExerciseDraft}
          onClose={() => setExerciseDraft(undefined)}
          onAddAnother={() => {
            setExerciseDraft(undefined);
            scrollToWorkoutTop();
          }}
          onSave={() => addPresetExercise(exerciseDraft)}
        />
      )}
    </div>
  );
}

function RecordsTab(props: {
  profile?: Profile;
  goal?: Goal;
  appDate: string;
  cheatDayDates: string[];
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  showToast: (text: string) => void;
  onEditRecordDate: (date: string, targetTab: EditableRecordTab) => void;
}) {
  const [historyGrouping, setHistoryGrouping] = useState<HistoryGrouping>("day");
  const [reportMonth, setReportMonth] = useState(() => monthKey(props.appDate));
  const [selectedReportDate, setSelectedReportDate] = useState(props.appDate);
  const [historyReport, setHistoryReport] = useState("");
  const [historyReportCopied, setHistoryReportCopied] = useState(false);
  const sortedWeightLogs = [...props.weightLogs].sort((a, b) => a.logged_at.localeCompare(b.logged_at));
  const latestWeight = sortedWeightLogs.at(-1);
  const firstWeight = sortedWeightLogs[0];
  const latestBodyFat = [...sortedWeightLogs].reverse().find((log) => typeof log.body_fat_percentage === "number");
  const firstBodyFat = sortedWeightLogs.find((log) => typeof log.body_fat_percentage === "number");
  const workoutHistory = buildWorkoutHistory(props.workoutSessions, props.workoutExercises, props.workoutSets);
  const workoutGroups = groupWorkoutHistory(workoutHistory, historyGrouping);
  const recentPrs = workoutHistory.flatMap((session) => session.prs.map((pr) => ({ ...pr, app_date: session.app_date }))).slice(0, 8);
  const recordsByDate = useMemo(() => {
    const summaries = new Map<string, DayRecordSummary>();
    const summaryFor = (date: string) => {
      const existing = summaries.get(date);
      if (existing) return existing;
      const next = { foodCount: 0, weightCount: 0, workoutCount: 0 };
      summaries.set(date, next);
      return next;
    };
    props.foodEntries.forEach((entry) => {
      summaryFor(entry.app_date).foodCount += 1;
    });
    props.weightLogs.forEach((entry) => {
      summaryFor(entry.app_date).weightCount += 1;
    });
    props.workoutSessions.forEach((entry) => {
      summaryFor(entry.app_date).workoutCount += 1;
    });
    return summaries;
  }, [props.foodEntries, props.weightLogs, props.workoutSessions]);
  const calendarCells = useMemo(() => buildMonthCalendar(reportMonth), [reportMonth]);
  const selectedSummary = recordsByDate.get(selectedReportDate);
  const selectedFoodEntries = selectedReportDate ? props.foodEntries.filter((entry) => entry.app_date === selectedReportDate) : [];
  const selectedFoodTotal = sumFood(selectedFoodEntries);
  const selectedWeight = selectedReportDate
    ? [...props.weightLogs].reverse().find((entry) => entry.app_date === selectedReportDate)
    : undefined;
  const selectedHasRecords = !!selectedSummary;
  const generateHistoryDayReport = async () => {
    if (!selectedReportDate || !selectedHasRecords) return;
    const generatedAt = nowIso();
    const content = generateMarkdownReport({
      profile: props.profile,
      goal: props.goal,
      foodEntries: selectedFoodEntries,
      weightLogs: props.weightLogs.filter((entry) => entry.app_date === selectedReportDate),
      workoutSessions: props.workoutSessions.filter((entry) => entry.app_date === selectedReportDate),
      workoutExercises: props.workoutExercises,
      workoutSets: props.workoutSets,
      weeklyWorkoutStatus: props.weeklyWorkoutStatus,
      periodStart: selectedReportDate,
      periodEnd: selectedReportDate,
      generatedAt,
      currentAppDate: props.appDate,
      cheatDayDates: props.cheatDayDates.filter((date) => date === selectedReportDate),
      workoutGrouping: "day",
      question: `${formatJapaneseDate(selectedReportDate)}の記録を翌朝に振り返る前提で、よかった点と次回の調整を簡潔に整理してください。`,
    });
    setHistoryReport(content);
    setHistoryReportCopied(false);
    await db.ai_reports.put({
      id: makeId("report"),
      period_start: selectedReportDate,
      period_end: selectedReportDate,
      format: "markdown",
      content,
      created_at: generatedAt,
      updated_at: generatedAt,
    });
    props.showToast("日別AIレポートを生成しました");
  };

  return (
    <div className="space-y-4">
      <section className="compact-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold">体重・体脂肪</p>
            <p className="text-xs text-moss">最新 {latestWeight ? formatJapaneseDate(latestWeight.app_date) : "-"}</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">{latestWeight ? `${latestWeight.weight_kg}kg` : "-"}</p>
            <p className="text-moss">{typeof latestBodyFat?.body_fat_percentage === "number" ? `${latestBodyFat.body_fat_percentage}%` : "体脂肪 -"}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <MetricPill label="体重変化" value={formatSignedDelta(latestWeight?.weight_kg, firstWeight?.weight_kg, "kg")} />
          <MetricPill label="体脂肪変化" value={formatSignedDelta(latestBodyFat?.body_fat_percentage, firstBodyFat?.body_fat_percentage, "%")} />
        </div>
      </section>

      <HistoryLineChart
        title="体重推移"
        unit="kg"
        logs={sortedWeightLogs}
        getValue={(log) => log.weight_kg}
        color="#526a57"
      />
      <HistoryLineChart
        title="体脂肪率"
        unit="%"
        logs={sortedWeightLogs.filter((log) => typeof log.body_fat_percentage === "number")}
        getValue={(log) => log.body_fat_percentage}
        color="#c76f51"
      />

      <section className="compact-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold">日別AIレポート</h2>
            <p className="mt-1 text-xs text-moss">印が付いた日を選んで、過去の日別レポートを生成できます。</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              aria-label="前の月"
              className="icon-button h-9 w-9"
              onClick={() => {
                setReportMonth(shiftMonthKey(reportMonth, -1));
                setSelectedReportDate("");
                setHistoryReport("");
              }}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              aria-label="次の月"
              className="icon-button h-9 w-9"
              onClick={() => {
                setReportMonth(shiftMonthKey(reportMonth, 1));
                setSelectedReportDate("");
                setHistoryReport("");
              }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 rounded-md bg-rice px-3 py-2">
          <p className="text-sm font-black">{formatMonthLabel(reportMonth)}</p>
          <button
            className="text-xs font-bold text-leaf underline-offset-2 hover:underline"
            onClick={() => {
              setReportMonth(monthKey(props.appDate));
              setSelectedReportDate(props.appDate);
              setHistoryReport("");
            }}
          >
            今月へ
          </button>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-moss">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {calendarCells.map((cell, index) => {
            if (!cell.date) return <div className="aspect-square min-h-10 rounded-md border border-transparent" key={`empty-${index}`} />;
            const hasRecords = recordsByDate.has(cell.date);
            const isSelected = selectedReportDate === cell.date;
            return (
              <button
                className={`relative flex aspect-square min-h-10 items-center justify-center rounded-md border text-sm font-black transition active:scale-[0.98] ${
                  isSelected
                    ? "border-leaf bg-leaf text-white"
                    : hasRecords
                      ? "border-leaf/30 bg-leaf/10 text-ink"
                      : "border-line bg-white/60 text-moss/40"
                }`}
                disabled={!hasRecords}
                key={cell.date}
                onClick={() => {
                  setSelectedReportDate(cell.date ?? "");
                  setHistoryReport("");
                }}
              >
                {cell.day}
                {hasRecords && <span className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-leaf"}`} />}
              </button>
            );
          })}
        </div>
        <div className="mt-3 rounded-md bg-rice p-3 text-sm">
          {selectedHasRecords ? (
            <>
              <p className="font-bold">{formatJapaneseDate(selectedReportDate)}の記録</p>
              <p className="mt-1 text-xs text-moss">
                食事 {selectedSummary.foodCount}件 / 体重 {selectedSummary.weightCount}件 / ワークアウト {selectedSummary.workoutCount}回
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <MetricPill label="摂取" value={`${Math.round(selectedFoodTotal.calories)}kcal`} />
                <MetricPill label="PFC" value={`P${selectedFoodTotal.protein} F${selectedFoodTotal.fat} C${selectedFoodTotal.carbs}`} />
                <MetricPill label="体重" value={selectedWeight ? `${selectedWeight.weight_kg}kg` : "-"} />
                <MetricPill label="チートデー" value={props.cheatDayDates.includes(selectedReportDate) ? "対象" : "-"} />
              </div>
              <button className="primary-button mt-3 w-full" onClick={generateHistoryDayReport}>
                <FileText size={17} />この日の日別レポートを生成
              </button>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="secondary-button justify-center" onClick={() => props.onEditRecordDate(selectedReportDate, "food")}>
                  <Utensils size={16} />食事を修正
                </button>
                <button className="secondary-button justify-center" onClick={() => props.onEditRecordDate(selectedReportDate, "workout")}>
                  <Dumbbell size={16} />筋トレを修正
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-moss">印が付いた日を選ぶと生成ボタンが表示されます。</p>
          )}
        </div>
        {historyReport && (
          <>
            <textarea className="mt-3 min-h-56 w-full font-mono text-xs" value={historyReport} readOnly />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button className="primary-button" onClick={async () => {
                await copyText(historyReport);
                setHistoryReportCopied(true);
              }}><Copy size={17} />{historyReportCopied ? "コピー済み" : "コピー"}</button>
              <button className="secondary-button" onClick={() => downloadText(`phase-log-report-${selectedReportDate}.md`, historyReport, "text/markdown")}><FileDown size={17} />MD保存</button>
            </div>
          </>
        )}
      </section>

      <section className="compact-card divide-y divide-line">
        <ListHeader title="最近の記録更新" value={`${recentPrs.length}件`} />
        {recentPrs.map((pr) => (
          <div className="flex items-start gap-3 px-4 py-3" key={`${pr.exerciseName}-${pr.app_date}-${pr.label}`}>
            <div className="mt-0.5 rounded-full bg-sun/20 p-1.5 text-[#8a5d13]"><Trophy size={15} /></div>
            <div className="min-w-0">
              <p className="text-sm font-bold">{pr.exerciseName}</p>
              <p className="text-xs text-moss">{formatJapaneseDate(pr.app_date)} · {pr.label}</p>
            </div>
          </div>
        ))}
        {recentPrs.length === 0 && <EmptyLine text="まだ記録更新はありません" />}
      </section>

      <section className="compact-card divide-y divide-line">
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold">ワークアウト履歴</h2>
              <p className="mt-1 text-xs text-moss">{workoutHistory.length}セッション / {workoutGroups.length}期間</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["day", "日別"],
              ["week", "週別"],
              ["month", "月別"],
            ].map(([key, label]) => (
              <button
                className={`mode-button min-h-10 ${historyGrouping === key ? "mode-button-active" : ""}`}
                key={key}
                onClick={() => setHistoryGrouping(key as HistoryGrouping)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {workoutGroups.slice(0, 20).map((group) => (
          <div className="px-4 py-3" key={group.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{group.label}</p>
                <p className="text-xs text-moss">{group.sessionCount}回 · {group.exerciseCount}種目 · {group.setCount}セット</p>
              </div>
              {group.prs.length > 0 && <span className="rounded-full bg-sun/20 px-2 py-0.5 text-[11px] font-black text-[#8a5d13]">PR {group.prs.length}</span>}
            </div>
            <div className="mt-2 space-y-1">
              {group.lines.slice(0, historyGrouping === "day" ? 5 : 6).map((line, index) => (
                <div className="flex items-center justify-between gap-2 text-xs" key={`${group.id}-${line.exerciseName}-${index}`}>
                  <span className="truncate text-ink">{line.prefix ? `${line.prefix}: ` : ""}{line.exerciseName}</span>
                  <span className={line.isPr ? "shrink-0 font-bold text-clay" : "shrink-0 text-moss"}>{line.isPr ? "PR " : ""}{line.label}</span>
                </div>
              ))}
              {group.lines.length > (historyGrouping === "day" ? 5 : 6) && <p className="text-xs text-moss">ほか {group.lines.length - (historyGrouping === "day" ? 5 : 6)}件</p>}
            </div>
          </div>
        ))}
        {workoutHistory.length === 0 && <EmptyLine text="まだワークアウト履歴はありません" />}
      </section>
    </div>
  );
}

function SettingsTab(props: {
  profile?: Profile;
  goals: Goal[];
  activeGoal?: Goal;
  appDate: string;
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  cheatDayDates: string[];
  menuItems: MenuItem[];
  workoutTemplates: WorkoutTemplate[];
  focus?: SettingsFocus;
  backupInfo: BackupInfo;
  settings?: AppSettings;
  themeMode: ThemeMode;
  resolvedTheme: "light" | "dark";
  markBackupNow: () => void;
  openUpdateNotes: () => void;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  allData: {
    foodEntries: FoodEntry[];
    weightLogs: WeightLog[];
    workoutSessions: WorkoutSession[];
    workoutExercises: WorkoutExercise[];
    workoutSets: WorkoutSet[];
  };
}) {
  const [goalDraft, setGoalDraft] = useState({
    phase: props.activeGoal?.phase ?? "maintenance" as Phase,
    age: props.activeGoal?.age ?? 35,
    activity_level: props.activeGoal?.activity_level ?? "moderate" as ActivityLevel,
    target_weight_kg: props.activeGoal?.target_weight_kg ?? props.profile?.current_weight_kg ?? 70,
    manual_target_calories: 0,
    manual_protein_g: 0,
    manual_fat_g: 0,
    manual_carbs_g: 0,
    target_workouts_per_week: props.activeGoal?.target_workouts_per_week ?? 3,
    target_cardio_sessions_per_week: props.activeGoal?.target_cardio_sessions_per_week ?? 1,
  });
  const [presetDraft, setPresetDraft] = useState({ ...emptyManual, name: "", savePreset: true });
  const [reportMode, setReportMode] = useState<ReportMode>("day");
  const [question, setQuestion] = useState("");
  const [report, setReport] = useState("");
  const [copiedReport, setCopiedReport] = useState(false);
  const [backupImportMessage, setBackupImportMessage] = useState("");
  const backupSectionRef = useRef<HTMLElement | null>(null);
  const myMenuSectionRef = useRef<HTMLElement | null>(null);
  const themeOptions: Array<{ value: ThemeMode; label: string; description: string }> = [
    { value: "system", label: "端末に合わせる", description: props.resolvedTheme === "dark" ? "現在はダーク" : "現在はライト" },
    { value: "light", label: "ライト", description: "明るいガラスUI" },
    { value: "dark", label: "ダーク", description: "暗いガラスUI" },
  ];

  const updateThemeMode = async (theme_mode: ThemeMode) => {
    const timestamp = nowIso();
    if (props.settings) {
      await db.settings.update("local", { theme_mode, updated_at: timestamp });
    } else {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: true,
        theme_mode,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await props.refresh();
    props.showToast(theme_mode === "system" ? "表示を端末設定に合わせます" : `${theme_mode === "dark" ? "ダーク" : "ライト"}モードにしました`);
  };

  useEffect(() => {
    if (props.focus !== "backup" && props.focus !== "myMenu") return;
    const timer = window.setTimeout(() => {
      const target = props.focus === "backup" ? backupSectionRef.current : myMenuSectionRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [props.focus]);

  const calculated = props.profile
    ? calculateTargets({
        profile: props.profile,
        age: goalDraft.age,
        sex: props.profile.sex,
        activity_level: goalDraft.activity_level,
        phase: goalDraft.phase,
        target_weight_kg: goalDraft.target_weight_kg,
        manual_target_calories: goalDraft.manual_target_calories || undefined,
        manual_protein_g: goalDraft.manual_protein_g || undefined,
        manual_fat_g: goalDraft.manual_fat_g || undefined,
        manual_carbs_g: goalDraft.manual_carbs_g || undefined,
      })
    : undefined;

  const aiReportSection = (
    <section className={`compact-card p-4 ${props.focus === "ai" ? "border-2 border-leaf" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">AI相談レポート</h2>
        {props.focus === "ai" && <span className="rounded-md bg-leaf px-2 py-1 text-[11px] font-bold text-white">相談を作成</span>}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button className={`mode-button ${reportMode === "day" ? "mode-button-active" : ""}`} onClick={() => setReportMode("day")}>日別</button>
        <button className={`mode-button ${reportMode === "week" ? "mode-button-active" : ""}`} onClick={() => setReportMode("week")}>週別</button>
        <button className={`mode-button ${reportMode === "month" ? "mode-button-active" : ""}`} onClick={() => setReportMode("month")}>月別</button>
      </div>
      <p className="mt-2 text-xs text-moss">{reportMode === "day" ? "今日1日分を参照します。" : reportMode === "week" ? "直近7日分を週別の相談材料としてまとめます。" : "直近30日分を月別の相談材料としてまとめます。"}</p>
      <textarea className="mt-3 min-h-20 w-full" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="AIにコピーして相談できるレポートを生成します。特に相談したいことがあれば記入してください。なければそのまま生成を押してください" />
      <button className="primary-button mt-3 w-full" onClick={async () => {
        const generatedAt = nowIso();
        const end = props.appDate;
        const start = reportMode === "day" ? end : addDays(end, reportMode === "week" ? -6 : -29);
        const range = dateRange(start, end);
        const scopedCheatDayDates = props.cheatDayDates.filter((date) => range.includes(date));
        const content = generateMarkdownReport({
          profile: props.profile,
          goal: props.activeGoal,
          foodEntries: props.allData.foodEntries.filter((entry) => range.includes(entry.app_date)),
          weightLogs: props.allData.weightLogs.filter((entry) => range.includes(entry.app_date)),
          workoutSessions: props.allData.workoutSessions.filter((entry) => range.includes(entry.app_date)),
          workoutExercises: props.allData.workoutExercises,
          workoutSets: props.allData.workoutSets,
          weeklyWorkoutStatus: props.weeklyWorkoutStatus,
          periodStart: start,
          periodEnd: end,
          generatedAt,
          currentAppDate: props.appDate,
          cheatDayDates: scopedCheatDayDates,
          workoutGrouping: reportMode,
          question,
        });
        setReport(content);
        setCopiedReport(false);
        await db.ai_reports.put({ id: makeId("report"), period_start: start, period_end: end, format: "markdown", content, created_at: generatedAt, updated_at: generatedAt });
      }}><FileText size={17} />生成</button>
      {report && (
        <>
          <textarea className="mt-3 min-h-56 w-full font-mono text-xs" value={report} readOnly />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button className="primary-button" onClick={async () => {
              await copyText(report);
              setCopiedReport(true);
            }}><Copy size={17} />{copiedReport ? "コピー済み" : "コピー"}</button>
            <button className="secondary-button" onClick={() => downloadText(`phase-log-report-${Date.now()}.md`, report, "text/markdown")}><FileDown size={17} />MD保存</button>
          </div>
        </>
      )}
    </section>
  );

  return (
    <div className="space-y-4">
      {props.focus === "ai" && aiReportSection}

      <section className="compact-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold">表示設定</h2>
            <p className="mt-1 text-xs text-moss">Liquid Glass UIの明るさを切り替えます。</p>
          </div>
          <span className="mini-chip">{props.resolvedTheme === "dark" ? "Dark" : "Light"}</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              className={`mode-button flex-col gap-0.5 px-2 text-center ${props.themeMode === option.value ? "mode-button-active" : ""}`}
              onClick={() => updateThemeMode(option.value)}
            >
              <span>{option.label}</span>
              <span className="text-[10px] font-semibold text-moss">{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="compact-card p-4">
        <h2 className="font-bold">ゴール設定</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <SelectField label="フェーズ" hint="体重・筋量をどう動かしたいか">
            <select value={goalDraft.phase} onChange={(event) => setGoalDraft({ ...goalDraft, phase: event.target.value as Phase })}>
              {Object.entries(phaseLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </SelectField>
          <SelectField label="運動強度" hint="日常活動込みの消費量補正">
            <select value={goalDraft.activity_level} onChange={(event) => setGoalDraft({ ...goalDraft, activity_level: event.target.value as ActivityLevel })}>
              {Object.entries(activityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </SelectField>
          <NumberInput label="年齢" value={goalDraft.age} onChange={(value) => setGoalDraft({ ...goalDraft, age: value })} />
          <NumberInput label="目標体重" value={goalDraft.target_weight_kg} step={0.1} onChange={(value) => setGoalDraft({ ...goalDraft, target_weight_kg: value })} />
          <NumberInput label="筋トレ/週" value={goalDraft.target_workouts_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_workouts_per_week: value })} />
          <NumberInput label="有酸素/週" value={goalDraft.target_cardio_sessions_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_cardio_sessions_per_week: value })} />
          <NumberInput label="kcal上書き (0=自動)" value={goalDraft.manual_target_calories} onChange={(value) => setGoalDraft({ ...goalDraft, manual_target_calories: value })} />
          <NumberInput label="P上書き (0=自動)" value={goalDraft.manual_protein_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_protein_g: value })} />
          <NumberInput label="F上書き (0=自動)" value={goalDraft.manual_fat_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_fat_g: value })} />
          <NumberInput label="C上書き (0=自動)" value={goalDraft.manual_carbs_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_carbs_g: value })} />
        </div>
        <p className="mt-3 rounded-md bg-rice p-3 text-sm">計算: {calculated?.target_calories ?? "-"} kcal / P{calculated?.target_protein_g ?? "-"} F{calculated?.target_fat_g ?? "-"} C{calculated?.target_carbs_g ?? "-"}</p>
        <p className="mt-2 text-xs text-moss">自動計算は現在体重から消費カロリーを出し、目標体重・フェーズ・運動強度・総カロリーからP/F/Cを配分します。AI相談後はkcal/P/F/Cを個別に上書きできます。</p>
        <button className="primary-button mt-3 w-full" onClick={async () => {
          if (!props.profile) return;
          const timestamp = nowIso();
          await Promise.all(props.goals.filter((goal) => goal.is_active).map((goal) => db.goals.update(goal.id, { is_active: false, end_date: addDays(todayAppDate(), -1), updated_at: timestamp })));
          const goal = buildGoal({
            profile: props.profile,
            phase: goalDraft.phase,
            activity_level: goalDraft.activity_level,
            age: goalDraft.age,
            target_weight_kg: goalDraft.target_weight_kg,
            manual_target_calories: goalDraft.manual_target_calories || undefined,
            manual_protein_g: goalDraft.manual_protein_g || undefined,
            manual_fat_g: goalDraft.manual_fat_g || undefined,
            manual_carbs_g: goalDraft.manual_carbs_g || undefined,
            target_workouts_per_week: goalDraft.target_workouts_per_week,
            target_cardio_sessions_per_week: goalDraft.target_cardio_sessions_per_week,
          });
          await db.goals.put(goal);
          await db.settings.update("local", { active_goal_id: goal.id, updated_at: timestamp });
          await props.refresh();
          props.showToast("ゴールを保存しました");
        }}><Save size={17} />保存</button>
      </section>

      <section ref={myMenuSectionRef} className={`compact-card scroll-mt-24 p-4 ${props.focus === "myMenu" ? "border-2 border-leaf" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold">マイメニューを追加</h2>
          {props.focus === "myMenu" && <span className="rounded-md bg-leaf px-2 py-1 text-[11px] font-bold text-white">登録はこちら</span>}
        </div>
        <ManualFoodForm manual={presetDraft} setManual={setPresetDraft} compact mode="preset" onSave={async () => {
          if (!presetDraft.name.trim()) return;
          const timestamp = nowIso();
          const nutrition = draftNutrition(presetDraft);
          const tags = unique([presetDraft.category, presetDraft.subcategory, presetDraft.brand, ...(nutrition.unknown.length ? ["栄養素一部不明"] : [])]);
          await db.menu_items.put({
            id: makeId("menu_user"),
            name: presetDraft.name,
            brand: presetDraft.brand || undefined,
            category: presetDraft.category,
            tags,
            calories: nutrition.calories,
            protein_g: nutrition.protein_g,
            fat_g: nutrition.fat_g,
            carbs_g: nutrition.carbs_g,
            salt_g: nutrition.salt_g,
            data_source: "user",
            confidence: nutrition.unknown.length ? "low" : "high",
            is_public_preset: false,
            is_user_created: true,
            is_favorite: presetDraft.favorite,
            created_at: timestamp,
            updated_at: timestamp,
          });
          setPresetDraft({ ...emptyManual, savePreset: true });
          await props.refresh();
          props.showToast(`${presetDraft.name.trim()}をマイメニューに保存しました`);
        }} />
        <div className="mt-3 divide-y divide-line">
          {props.menuItems.filter((item) => item.is_user_created).slice(0, 10).map((item) => (
            <div className="flex items-center justify-between py-2" key={item.id}>
              <span className="text-sm font-semibold">{item.name}</span>
              <button className="icon-button h-8 w-8" aria-label="削除" onClick={async () => { await db.menu_items.delete(item.id); await props.refresh(); }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </section>

      {props.focus !== "ai" && aiReportSection}

      <section ref={backupSectionRef} className={`compact-card scroll-mt-24 p-4 ${props.focus === "backup" ? "border-2 border-leaf" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold">バックアップ</h2>
          {props.focus === "backup" && <span className="rounded-md bg-leaf px-2 py-1 text-[11px] font-bold text-moss">保存はこちら</span>}
        </div>
        <div className={`mt-2 rounded-md border p-3 text-sm ${props.backupInfo.level === "danger" ? "border-clay/40 bg-clay/10" : "border-leaf/40 bg-leaf/10"}`}>
          <p className="font-semibold text-ink">{backupMessage(props.backupInfo)}</p>
          <p className="mt-1 text-xs text-moss">目安は週1回。外食や筋トレを連日記録している時は、3-4日に1回保存しておくと安心です。</p>
        </div>
        <div className="mt-3 grid gap-2">
          <button className="secondary-button" onClick={async () => {
            downloadText(`fitness-tracker-backup-${todayAppDate()}.json`, JSON.stringify(await exportBackup(), null, 2));
            props.markBackupNow();
          }}><FileDown size={17} />JSONエクスポート</button>
          <label className="secondary-button cursor-pointer">
            <Archive size={17} />JSONインポート
            <input className="hidden" type="file" accept="application/json" onChange={async (event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                const payload = JSON.parse(await file.text()) as BackupPayload;
                if (!confirm("バックアップを読み込むと、現在この端末にあるローカルデータをバックアップ内容で置き換えます。続けますか？")) return;
                await importBackup(payload);
                props.markBackupNow();
                setBackupImportMessage("読み込みました。現在のデータはバックアップ内容に置き換わっています。");
                await props.refresh();
              } catch (error) {
                setBackupImportMessage(error instanceof Error ? error.message : "読み込みに失敗しました。JSONファイルを確認してください。");
              } finally {
                event.target.value = "";
              }
            }} />
          </label>
          {backupImportMessage && <p className="rounded-md bg-rice px-3 py-2 text-xs font-semibold text-moss">{backupImportMessage}</p>}
          <button className="secondary-button border-clay text-clay" onClick={() => {
            if (confirm("ローカルデータをすべて削除しますか？")) resetLocalData();
          }}><Trash2 size={17} />リセット</button>
        </div>
      </section>

      <section className="compact-card p-4 text-sm text-moss">
        <p className="font-semibold text-ink">ゴールトラッカー</p>
        <p>IndexedDB local-only · no login · no backend</p>
        <p className="mt-2">同じURLを友達が開いても、ログは各iPhone内に別々に保存されます。</p>
        <button className="secondary-button mt-3 w-full" onClick={props.openUpdateNotes}><FileText size={17} />更新内容</button>
      </section>
    </div>
  );
}

function Onboarding({ refresh }: { refresh: () => Promise<void> }) {
  const [draft, setDraft] = useState({
    name: "Nick",
    height_cm: 170,
    current_weight_kg: 70,
    body_fat_percentage: "",
    birth_year: 1990,
    sex: "unspecified" as Profile["sex"],
    phase: "maintenance" as Phase,
    activity_level: "moderate" as ActivityLevel,
    target_weight_kg: 70,
    target_calories: 0,
    target_protein_g: 0,
    target_fat_g: 0,
    target_carbs_g: 0,
    workouts: 3,
    cardio: 1,
  });
  const [restoreMessage, setRestoreMessage] = useState("");
  const age = new Date().getFullYear() - draft.birth_year;
  const profile: Profile = {
    id: "local",
    name: draft.name,
    height_cm: Number(draft.height_cm),
    birth_year: Number(draft.birth_year),
    sex: draft.sex,
    current_weight_kg: Number(draft.current_weight_kg),
    body_fat_percentage: draft.body_fat_percentage === "" ? undefined : Number(draft.body_fat_percentage),
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  const calculated = calculateTargets({
    profile,
    age,
    sex: draft.sex,
    activity_level: draft.activity_level,
    phase: draft.phase,
    target_weight_kg: draft.target_weight_kg,
    manual_target_calories: draft.target_calories || undefined,
    manual_protein_g: draft.target_protein_g || undefined,
    manual_fat_g: draft.target_fat_g || undefined,
    manual_carbs_g: draft.target_carbs_g || undefined,
  });

  return (
    <main className="mx-auto min-h-screen max-w-[430px] bg-rice px-4 py-8 text-ink">
      <div className="compact-card p-5">
        <h1 className="text-2xl font-black tracking-normal">ゴールトラッカー</h1>
        <section className="mt-4 rounded-md border border-leaf/30 bg-leaf/10 p-3 text-sm">
          <p className="font-bold">前に使っていたデータがある場合</p>
          <p className="mt-1 text-xs text-moss">アップデート後や別のiPhoneでこの画面が出たら、設定で保存したバックアップJSONを読み込んで復元してください。読み込みは追加ではなく、バックアップ内容への置き換えです。</p>
          <label className="secondary-button mt-3 w-full cursor-pointer">
            <Archive size={17} />バックアップJSONを読み込む
            <input className="hidden" type="file" accept="application/json" onChange={async (event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                const payload = JSON.parse(await file.text()) as BackupPayload;
                await importBackup(payload);
                localStorage.setItem(backupStorageKey, nowIso());
                setRestoreMessage("復元しました。");
                await refresh();
              } catch (error) {
                setRestoreMessage(error instanceof Error ? error.message : "読み込みに失敗しました。JSONファイルを確認してください。");
              } finally {
                event.target.value = "";
              }
            }} />
          </label>
          {restoreMessage && <p className="mt-2 text-xs font-semibold text-clay">{restoreMessage}</p>}
        </section>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <label className="col-span-2 text-xs font-semibold">名前<input className="mt-1 w-full" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
          <NumberInput label="身長cm" value={draft.height_cm} onChange={(value) => setDraft({ ...draft, height_cm: value })} />
          <NumberInput label="体重kg" value={draft.current_weight_kg} step={0.1} onChange={(value) => setDraft({ ...draft, current_weight_kg: value })} />
          <label className="text-xs font-semibold">体脂肪%<input className="mt-1 w-full" type="number" value={draft.body_fat_percentage} onChange={(event) => setDraft({ ...draft, body_fat_percentage: event.target.value })} /></label>
          <NumberInput label="生年" value={draft.birth_year} onChange={(value) => setDraft({ ...draft, birth_year: value })} />
          <select value={draft.sex} onChange={(event) => setDraft({ ...draft, sex: event.target.value as Profile["sex"] })}>
            <option value="unspecified">未指定</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
          <SelectField label="フェーズ" hint="体重・筋量の方向">
            <select value={draft.phase} onChange={(event) => setDraft({ ...draft, phase: event.target.value as Phase })}>
              {Object.entries(phaseLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </SelectField>
          <SelectField label="運動強度" hint="消費量の補正">
            <select value={draft.activity_level} onChange={(event) => setDraft({ ...draft, activity_level: event.target.value as ActivityLevel })}>
              {Object.entries(activityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </SelectField>
          <NumberInput label="目標体重" value={draft.target_weight_kg} step={0.1} onChange={(value) => setDraft({ ...draft, target_weight_kg: value })} />
          <NumberInput label="筋トレ/週" value={draft.workouts} onChange={(value) => setDraft({ ...draft, workouts: value })} />
          <NumberInput label="有酸素/週" value={draft.cardio} onChange={(value) => setDraft({ ...draft, cardio: value })} />
          <NumberInput label="kcal上書き (0=自動)" value={draft.target_calories} onChange={(value) => setDraft({ ...draft, target_calories: value })} />
          <NumberInput label="P上書き (0=自動)" value={draft.target_protein_g} onChange={(value) => setDraft({ ...draft, target_protein_g: value })} />
          <NumberInput label="F上書き (0=自動)" value={draft.target_fat_g} onChange={(value) => setDraft({ ...draft, target_fat_g: value })} />
          <NumberInput label="C上書き (0=自動)" value={draft.target_carbs_g} onChange={(value) => setDraft({ ...draft, target_carbs_g: value })} />
        </div>
        <p className="mt-3 rounded-md bg-surface p-3 text-xs text-moss">初回設定後は、Settingsのバックアップから週1回くらいJSONエクスポートしておくと、次にこの画面が出ても復元できます。</p>
        <p className="mt-4 rounded-md bg-rice p-3 text-sm">目標: {calculated.target_calories} kcal / P{calculated.target_protein_g} F{calculated.target_fat_g} C{calculated.target_carbs_g}</p>
        <p className="mt-2 text-xs text-moss">カロリーは現在体重の消費量、自動PFCは目標体重・フェーズ・運動強度・総カロリーをもとに計算します。</p>
        <button className="primary-button mt-4 w-full" onClick={async () => {
          const timestamp = nowIso();
          await db.profile.put(profile);
          const goal = buildGoal({
            profile,
            phase: draft.phase,
            activity_level: draft.activity_level,
            age,
            target_weight_kg: draft.target_weight_kg,
            manual_target_calories: draft.target_calories || undefined,
            manual_protein_g: draft.target_protein_g || undefined,
            manual_fat_g: draft.target_fat_g || undefined,
            manual_carbs_g: draft.target_carbs_g || undefined,
            target_workouts_per_week: draft.workouts,
            target_cardio_sessions_per_week: draft.cardio,
          });
          await db.goals.put(goal);
          await db.settings.update("local", { onboarding_completed: true, active_goal_id: goal.id, updated_at: timestamp });
          await refresh();
        }}><Check size={17} />開始</button>
      </div>
    </main>
  );
}

function ManualFoodForm({ manual, setManual, onSave, compact = false, mode = "log" }: {
  manual: ManualFoodDraft;
  setManual: (manual: ManualFoodDraft) => void;
  onSave: () => void;
  compact?: boolean;
  mode?: "log" | "preset";
}) {
  const subcategories = genericCategories[manual.category] ?? [];
  const isPresetOnly = mode === "preset";
  return (
    <section className={compact ? "" : "compact-card p-4"}>
      {!compact && (
        <div>
          <h2 className="font-bold">マニュアル</h2>
          <p className="mt-1 text-xs leading-relaxed text-moss">名前・ブランドは空欄でも保存できます。名前が空なら食事タイミングから自動でラベルを付けます。</p>
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <input className="col-span-2" value={manual.name} onChange={(event) => setManual({ ...manual, name: event.target.value })} placeholder={isPresetOnly ? "メニュー名" : "名前（空欄OK）"} />
        <input className={isPresetOnly ? "col-span-2" : ""} value={manual.brand} onChange={(event) => setManual({ ...manual, brand: event.target.value })} placeholder="ブランド（空欄OK）" />
        {!isPresetOnly && (
          <select value={manual.meal_type} onChange={(event) => setManual({ ...manual, meal_type: event.target.value as MealType })}>
            {Object.entries(mealLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
        )}
        <div className="col-span-2">
          <p className="mb-2 text-xs font-semibold">カテゴリ</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(genericCategories).map((category) => (
              <button className={`chip justify-center ${manual.category === category ? "chip-active" : ""}`} key={category} onClick={() => setManual({ ...manual, category, subcategory: genericCategories[category]?.[0] ?? "" })}>{category}</button>
            ))}
          </div>
          {!!subcategories.length && (
            <div className="manual-subcategory-scroll mt-2 flex gap-2 overflow-x-auto pb-1">
              {subcategories.map((subcategory) => (
                <button className={`chip manual-subcategory-chip ${manual.subcategory === subcategory ? "chip-active" : ""}`} key={subcategory} onClick={() => setManual({ ...manual, subcategory })}>{subcategory}</button>
              ))}
            </div>
          )}
        </div>
        <PartialNumberInput label="kcal" value={manual.calories} onChange={(value) => setManual({ ...manual, calories: value })} />
        <PartialNumberInput label="P" value={manual.protein_g} step={0.1} onChange={(value) => setManual({ ...manual, protein_g: value })} />
        <PartialNumberInput label="F" value={manual.fat_g} step={0.1} onChange={(value) => setManual({ ...manual, fat_g: value })} />
        <PartialNumberInput label="C" value={manual.carbs_g} step={0.1} onChange={(value) => setManual({ ...manual, carbs_g: value })} />
        <input value={manual.salt_g} onChange={(event) => setManual({ ...manual, salt_g: event.target.value })} placeholder="塩分 optional" />
        <input value={manual.note} onChange={(event) => setManual({ ...manual, note: event.target.value })} placeholder="メモ" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!isPresetOnly && <label className="chip"><input type="checkbox" checked={manual.savePreset} onChange={(event) => setManual({ ...manual, savePreset: event.target.checked })} />メニューとして登録</label>}
        <label className="chip"><input type="checkbox" checked={manual.favorite} onChange={(event) => setManual({ ...manual, favorite: event.target.checked })} />お気に入り</label>
      </div>
      <button className="primary-button mt-3 w-full" onClick={onSave}><Save size={17} />保存</button>
    </section>
  );
}

function FoodItemRow({ item, onPick, onClone, refresh, balanceTarget }: {
  item: MenuItem;
  onPick: (item: MenuItem) => void;
  onClone: (item: MenuItem) => void;
  refresh: () => Promise<void>;
  balanceTarget?: { calories: number; protein: number; fat: number; carbs: number };
}) {
  const pictogram = getFoodPictogram(item);
  const fit = balanceTarget ? getPerfectFoodFit(item, balanceTarget) : undefined;
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-rice/70">
      <Pictogram {...pictogram} />
      <button className="min-w-0 flex-1 text-left" onClick={() => onPick(item)}>
        <p className="truncate text-sm font-semibold">{formatMenuItemName(item)}</p>
        <p className="numeric-text truncate text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <SourceBadge item={item} source={item.data_source} confidence={item.confidence} />
          {fit && <span className={`perfect-food-fit-badge perfect-food-fit-${fit.tone}`}>{fit.label}</span>}
          {fit?.details.map((detail) => (
            <span className={`perfect-food-detail-chip perfect-food-detail-${detail.tone}`} key={detail.label}>{detail.label}</span>
          ))}
        </div>
      </button>
      <button className="icon-button h-8 w-8" aria-label="編集して個人メニュー化" onClick={() => onClone(item)}><Pencil size={14} /></button>
      <button className="icon-button h-8 w-8" aria-label="お気に入り" onClick={async () => {
        await db.menu_items.update(item.id, { is_favorite: !item.is_favorite, updated_at: nowIso() });
        await refresh();
      }}><Heart size={14} fill={item.is_favorite ? "currentColor" : "none"} /></button>
    </div>
  );
}

function WorkoutTemplateRow({ template, isEditing, isDragging, onStart, onEdit, onDelete, onDragStart, onDragEnter, onDragEnd }: {
  template: WorkoutTemplate;
  isEditing: boolean;
  isDragging: boolean;
  onStart: (template: WorkoutTemplate) => void | Promise<void>;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
  onDragStart: (template: WorkoutTemplate) => void;
  onDragEnter: (template: WorkoutTemplate) => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      className={`workout-template-row px-4 py-4 transition-colors hover:bg-rice/70 ${isEditing ? "bg-leaf/20" : ""} ${isDragging ? "opacity-60" : ""}`}
      data-workout-template-id={template.id}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragEnter(template);
      }}
      onDragOver={(event) => event.preventDefault()}
    >
      <button
        className="workout-template-drag icon-button h-8 w-8 cursor-grab active:cursor-grabbing"
        draggable
        aria-label={`${template.name}を並べ替え`}
        onDragStart={(event) => {
          event.dataTransfer.effectAllowed = "move";
          onDragStart(template);
        }}
        onDragEnd={onDragEnd}
        onPointerDown={() => onDragStart(template)}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <GripVertical size={14} />
      </button>
      <span className="workout-template-icon">
        <Pictogram {...getWorkoutTemplatePictogram(template)} />
      </span>
      <button className="workout-template-main min-w-0 text-left" onClick={onEdit}>
        <p className="workout-row-title text-sm font-bold">{template.name}</p>
        <p className="workout-row-meta text-xs text-moss">{template.body_parts.join(" / ") || "未設定"} · {template.exercises.length}種目</p>
      </button>
      <div className="workout-template-actions">
        <button className={`icon-button h-8 w-8 ${isEditing ? "border-moss/50 text-moss" : ""}`} aria-label={`${template.name}を編集`} onClick={onEdit}><Pencil size={14} /></button>
        <button className="icon-button h-8 w-8 text-clay" aria-label={`${template.name}を削除`} onClick={onDelete}><Trash2 size={14} /></button>
        <button className="workout-template-record secondary-button h-8 px-2 py-1 text-xs" aria-label={`${template.name}を今日の記録に追加`} onClick={() => onStart(template)}><Plus size={13} />記録</button>
      </div>
    </div>
  );
}

function WorkoutTemplateEditor({ template, exercisePresets, bodyWeightKg, query, setQuery, editorRef, onStart, onDelete, onAddExercise, onRemoveExercise, onUpdateExercise, onUpdateDetails }: {
  template: WorkoutTemplate;
  exercisePresets: ExercisePreset[];
  bodyWeightKg: number;
  query: string;
  setQuery: (query: string) => void;
  editorRef: RefObject<HTMLElement | null>;
  onStart: () => void | Promise<void>;
  onDelete: () => void | Promise<void>;
  onAddExercise: (exercise: ExercisePreset) => void | Promise<void>;
  onRemoveExercise: (index: number) => void | Promise<void>;
  onUpdateExercise: (index: number, exercise: TemplateExercise) => void | Promise<void>;
  onUpdateDetails: (details: { name: string; icon_key: WorkoutTemplateIconKey }) => void | Promise<void>;
}) {
  const [nameDraft, setNameDraft] = useState(template.name);
  const [iconDraft, setIconDraft] = useState<WorkoutTemplateIconKey>(template.icon_key ?? inferWorkoutTemplateIconKey(template));
  const needle = query.trim().toLowerCase();
  const addResults = exercisePresets
    .filter((exercise) => {
      if (!needle) return true;
      const haystack = `${exercise.name} ${exercise.body_part} ${exercise.equipment_type}`.toLowerCase();
      return haystack.includes(needle);
    })
    .slice(0, 12);
  useEffect(() => {
    setNameDraft(template.name);
    setIconDraft(template.icon_key ?? inferWorkoutTemplateIconKey(template));
  }, [template.id, template.name, template.icon_key, template.body_parts.join("|"), template.exercises.length]);
  return (
    <section className="compact-card divide-y divide-line overflow-hidden scroll-mt-24" ref={editorRef}>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{template.name}を編集</p>
            <p className="mt-1 text-xs text-moss">プリセット内の種目を削除・追加・セット編集できます。</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="icon-button h-10 w-10 text-clay" aria-label={`${template.name}を削除`} onClick={onDelete}><Trash2 size={16} /></button>
            <button className="primary-button h-10 px-3 py-2" onClick={onStart}><Plus size={16} />記録に追加</button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <label className="text-xs font-semibold text-moss">
          プリセット名
          <input className="mt-2 h-11 w-full text-base" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder="プリセット名" />
        </label>
        <div className="mt-3">
          <p className="text-xs font-semibold text-moss">アイコン</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {workoutTemplateIconOptions.map((option) => {
              const pictogram = getWorkoutTemplateIconPictogram(option.key);
              return (
                <button className={`tap-tile gap-2 ${iconDraft === option.key ? "tap-tile-active" : ""}`} key={option.key} onClick={() => setIconDraft(option.key)}>
                  <Pictogram {...pictogram} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <button className="secondary-button mt-3 w-full" onClick={() => onUpdateDetails({ name: nameDraft, icon_key: iconDraft })}><Save size={16} />今の内容で保存</button>
      </div>

      <div>
        <ListHeader title="登録中の種目" value={`${template.exercises.length}件`} />
        {template.exercises.map((exercise, index) => (
          <TemplateExerciseRow
            bodyWeightKg={bodyWeightKg}
            exercise={exercise}
            index={index}
            key={`${exercise.exercise_name}-${index}`}
            onRemove={onRemoveExercise}
            onUpdate={onUpdateExercise}
          />
        ))}
        {template.exercises.length === 0 && <EmptyLine text="まだ種目がありません。下から追加できます" />}
      </div>

      <div className="p-4">
        <label className="text-xs font-semibold text-moss">
          追加する種目
          <input className="mt-2 h-11 w-full text-base" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="種目名・部位・器具で検索" />
        </label>
        <div className="mt-3 divide-y divide-line rounded-md border border-line">
          {addResults.map((exercise) => (
            <button className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition-colors hover:bg-rice/70" key={exercise.id} onClick={() => onAddExercise(exercise)}>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{exercise.name}</p>
                <p className="truncate text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
              </div>
              <Plus className="shrink-0 text-moss" size={16} />
            </button>
          ))}
          {addResults.length === 0 && <EmptyLine text="追加できる種目が見つかりません" />}
        </div>
      </div>
    </section>
  );
}

function TemplateExerciseRow({ exercise, index, bodyWeightKg, onRemove, onUpdate }: {
  exercise: TemplateExercise;
  index: number;
  bodyWeightKg: number;
  onRemove: (index: number) => void | Promise<void>;
  onUpdate: (index: number, exercise: TemplateExercise) => void | Promise<void>;
}) {
  const pictogram = getWorkoutPictogram(exercise.body_part, exercise.equipment_type);
  const isCardio = exercise.body_part === "有酸素" || exercise.equipment_type === "有酸素";
  const setSchemeLabel = formatWorkoutSetPatternText(exercise.set_scheme, isCardio);
  const firstPattern = exercise.set_scheme?.[0];
  const [weightStep, setWeightStep] = useState(() => inferWeightStep(exercise));
  const [setSchemeText, setSetSchemeText] = useState(() => setSchemeLabel || templateExerciseFallbackSetText(exercise, isCardio));
  const setsValue = exercise.set_scheme?.length || exercise.sets || 3;
  const weightValue = exercise.weight_kg ?? firstPattern?.weight_kg ?? 0;
  const repsValue = exercise.reps ?? firstPattern?.reps ?? 10;
  const durationValue = exercise.duration_min ?? firstPattern?.duration_min ?? 20;

  useEffect(() => {
    setWeightStep(inferWeightStep(exercise));
    setSetSchemeText(formatWorkoutSetPatternText(exercise.set_scheme, isCardio) || templateExerciseFallbackSetText(exercise, isCardio));
  }, [exercise.exercise_name, exercise.body_part, exercise.equipment_type, exercise.sets, exercise.reps, exercise.weight_kg, exercise.duration_min, exercise.set_scheme, isCardio]);

  const updateCardioDuration = (duration_min: number) => {
    onUpdate(index, {
      ...exercise,
      sets: 1,
      reps: 0,
      duration_min,
      set_scheme: [{ reps: 0, duration_min, active_calories: estimateActiveCalories(exercise.exercise_name, duration_min, bodyWeightKg) }],
    });
  };

  const updateStrengthDefaults = (next: { sets?: number; weight_kg?: number; reps?: number }) => {
    const sets = Math.max(1, Math.round(next.sets ?? setsValue));
    const weight_kg = round1(next.weight_kg ?? weightValue);
    const reps = Math.max(0, Math.round(next.reps ?? repsValue));
    const set_scheme = Array.from({ length: sets }, () => ({ weight_kg, reps }));
    onUpdate(index, { ...exercise, sets, weight_kg, reps, set_scheme });
  };

  const saveSetSchemeText = () => {
    const scheme = parseWorkoutSetScheme(setSchemeText, isCardio, exercise.exercise_name, bodyWeightKg);
    if (!scheme.length) return;
    const first = scheme[0];
    onUpdate(index, {
      ...exercise,
      sets: scheme.length,
      reps: first.reps,
      weight_kg: first.weight_kg,
      duration_min: first.duration_min,
      set_scheme: scheme,
    });
  };

  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <Pictogram {...pictogram} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{exercise.exercise_name}</p>
          <p className="truncate text-xs text-moss">
            {exercise.body_part} · {exercise.equipment_type} · {setsValue}セット{isCardio ? ` · ${durationValue}分` : ""}
          </p>
          {setSchemeLabel && <p className="mt-1 truncate text-xs font-semibold text-moss">{setSchemeLabel}</p>}
        </div>
        <button className="icon-button h-8 w-8 text-clay" aria-label={`${exercise.exercise_name}をプリセットから削除`} onClick={() => onRemove(index)}><Trash2 size={14} /></button>
      </div>

      {isCardio ? (
        <div className="mt-3">
          <TapSliderControl
            label="分数"
            value={durationValue}
            suffix="min"
            step={5}
            min={0}
            max={120}
            onChange={updateCardioDuration}
          />
        </div>
      ) : (
        <div className="mt-3 space-y-3 rounded-md bg-rice p-3">
          <TapSliderControl
            label="セット"
            value={setsValue}
            suffix="set"
            step={1}
            min={1}
            max={10}
            onChange={(sets) => updateStrengthDefaults({ sets })}
          />
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-moss">重量刻み</p>
              <div className="flex gap-1">
                {weightStepOptions.map((step) => (
                  <button className={`mini-chip ${weightStep === step ? "mini-chip-active" : ""}`} key={step} onClick={() => setWeightStep(step)}>{step}</button>
                ))}
              </div>
            </div>
            <TapSliderControl
              label="重量"
              value={weightValue}
              suffix="kg"
              step={weightStep}
              min={0}
              max={sliderMax(weightValue, 200, weightStep)}
              onChange={(weight_kg) => updateStrengthDefaults({ weight_kg })}
            />
          </div>
          <TapSliderControl
            label="回数"
            value={repsValue}
            suffix="回"
            step={1}
            min={0}
            max={50}
            onChange={(reps) => updateStrengthDefaults({ reps })}
          />
        </div>
      )}

      <label className="mt-3 block text-xs font-semibold text-moss">
        段階セット
        <textarea
          className="mt-2 min-h-16 w-full text-sm"
          value={setSchemeText}
          onChange={(event) => setSetSchemeText(event.target.value)}
          placeholder={isCardio ? "例: 25分 または 25〜30分" : "例: 47×10 / 54×10 / 61×10 / 68×10 または 20×10×3"}
        />
      </label>
      <button className="secondary-button mt-2 w-full" onClick={saveSetSchemeText}><Save size={15} />このセット内容を保存</button>
    </div>
  );
}

function ExercisePresetRow({ exercise, isFavorite, onAdd, onToggleFavorite, onPickTemplate }: {
  exercise: ExercisePreset;
  isFavorite: boolean;
  onAdd: (exercise: ExercisePreset) => void | Promise<void>;
  onToggleFavorite: (exercise: ExercisePreset) => void | Promise<void>;
  onPickTemplate?: (exercise: ExercisePreset) => void;
}) {
  const pictogram = getWorkoutPictogram(exercise.body_part, exercise.equipment_type);
  return (
    <div className="exercise-preset-row px-4 py-3 transition-colors hover:bg-rice/70">
      <span className="exercise-preset-icon">
        <Pictogram {...pictogram} />
      </span>
      <button className="exercise-preset-main min-w-0 text-left" onClick={() => onAdd(exercise)}>
        <p className="workout-row-title text-sm font-semibold">{exercise.name}</p>
        <p className="workout-row-meta text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
      </button>
      <div className="exercise-preset-actions">
        <button className="icon-button h-8 w-8" aria-label={`${exercise.name}の内容を設定して追加`} onClick={() => onAdd(exercise)}><Plus size={14} /></button>
        {onPickTemplate && <button className="icon-button h-8 w-8" aria-label={`${exercise.name}をプリセットへ追加`} onClick={() => onPickTemplate(exercise)}><Archive size={14} /></button>}
        <button
          className={`icon-button h-8 w-8 ${isFavorite ? "border-sun/50 text-[#8a5d13]" : ""}`}
          aria-label={`${exercise.name}をお気に入り${isFavorite ? "から外す" : "に追加"}`}
          onClick={() => onToggleFavorite(exercise)}
        >
          <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

function ExerciseAddModal({ draft, setDraft, onClose, onAddAnother, onSave }: {
  draft: WorkoutExerciseDraft;
  setDraft: (draft: WorkoutExerciseDraft) => void;
  onClose: () => void;
  onAddAnother: () => void;
  onSave: () => void | Promise<void>;
}) {
  const isCardio = draft.exercise.body_part === "有酸素" || draft.exercise.equipment_type === "有酸素";
  const pictogram = getWorkoutPictogram(draft.exercise.body_part, draft.exercise.equipment_type);
  const [weightStep, setWeightStep] = useState(() => inferWeightStep(draft.exercise));
  const [step, setStep] = useState<"duration" | "weight" | "reps" | "sets" | "confirm" | "done">(isCardio ? "duration" : "weight");
  const [weightPresets, setWeightPresets] = useState(() => loadWorkoutWeightPresets(draft.exercise.id, draft.weight_kg, weightStep));
  const [hasUnsavedWeightPreset, setHasUnsavedWeightPreset] = useState(false);
  const [isWeightPresetPickerOpen, setIsWeightPresetPickerOpen] = useState(false);
  const [weightPresetMessage, setWeightPresetMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const setCount = Math.min(5, Math.max(1, Math.round(draft.sets)));
  const summary = isCardio
    ? `${Math.max(0, Math.round(draft.duration_min))}分`
    : `${formatControlValue(Math.max(0, draft.weight_kg))}kg × ${Math.max(0, Math.round(draft.reps))}回 × ${setCount}set`;
  const stepLabel = step === "done"
    ? "追加完了"
    : isCardio
      ? `${step === "duration" ? 1 : 2}/2`
      : `${step === "weight" ? 1 : step === "reps" ? 2 : step === "sets" ? 3 : 4}/4`;
  const saveWeightPreset = (index: number) => {
    const normalized = roundToStep(Math.max(0, draft.weight_kg), weightStep);
    const nextPresets = weightPresets.map((value, valueIndex) => valueIndex === index ? normalized : value);
    setWeightPresets(nextPresets);
    saveWorkoutWeightPresets(draft.exercise.id, nextPresets);
    setHasUnsavedWeightPreset(false);
    setIsWeightPresetPickerOpen(false);
    setWeightPresetMessage(`プリセット${index + 1}に保存しました`);
  };
  const updateDraftWeight = (weight_kg: number) => {
    setDraft({ ...draft, weight_kg });
    setHasUnsavedWeightPreset(true);
    setWeightPresetMessage("");
  };
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await onSave();
      setStep("done");
    } finally {
      setIsSaving(false);
    }
  };
  const restartSameExercise = () => {
    setIsSaving(false);
    setStep(isCardio ? "duration" : "weight");
  };
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4">
      <div className="compact-card w-full p-4">
        <div className="flex items-start gap-3">
          <Pictogram {...pictogram} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold">{draft.exercise.name}</p>
            <p className="mt-1 text-sm text-moss">{draft.exercise.body_part} · {draft.exercise.equipment_type}</p>
          </div>
          <p className="rounded-md bg-rice px-2 py-1 text-xs font-bold text-moss">{stepLabel}</p>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>

        {step === "done" ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-md bg-rice p-4">
              <p className="text-sm font-bold">追加しました</p>
              <p className="mt-2 text-lg font-bold text-ink">{summary}</p>
            </div>
            <button className="secondary-button w-full" onClick={restartSameExercise}>
              <Plus size={17} />{isCardio ? "同じ種目をもう1本追加" : "同じ種目の別重量を追加"}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={onAddAnother}>次の種目を選ぶ</button>
              <button className="primary-button" onClick={onClose}>終了</button>
            </div>
          </div>
        ) : isCardio && step === "duration" ? (
          <div className="mt-4 space-y-4">
            <WizardNumberControl
              label="分数"
              value={draft.duration_min}
              suffix="min"
              step={5}
              min={0}
              max={120}
              onChange={(duration_min) => setDraft({ ...draft, duration_min })}
            />
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={onClose}>閉じる</button>
              <button className="primary-button" onClick={() => setStep("confirm")}>次へ</button>
            </div>
          </div>
        ) : !isCardio && step === "weight" ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-md bg-rice p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-moss">重量刻み</p>
                <div className="flex gap-1">
                  {weightStepOptions.map((stepOption) => (
                    <button className={`mini-chip ${weightStep === stepOption ? "mini-chip-active" : ""}`} key={stepOption} onClick={() => setWeightStep(stepOption)}>{stepOption}</button>
                  ))}
                </div>
              </div>
              <WizardNumberControl
                label="重量"
                value={draft.weight_kg}
                suffix="kg"
                step={weightStep}
                min={0}
                max={sliderMax(draft.weight_kg, 200, weightStep)}
                onChange={updateDraftWeight}
              />
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold text-moss">重量プリセット</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {weightPresets.map((value, index) => (
                    <button
                      className={`mini-chip ${roundToStep(draft.weight_kg, weightStep) === roundToStep(value, weightStep) ? "mini-chip-active" : ""}`}
                      key={`${index}-${value}`}
                      onClick={() => {
                        setDraft({ ...draft, weight_kg: value });
                        setHasUnsavedWeightPreset(false);
                        setWeightPresetMessage("");
                      }}
                    >
                      {formatControlValue(value)}
                    </button>
                  ))}
                </div>
                {hasUnsavedWeightPreset && (
                  <button className="secondary-button mt-2 w-full py-2 text-xs" onClick={() => setIsWeightPresetPickerOpen(true)}>
                    <Save size={15} />重量プリセットに保存
                  </button>
                )}
                {weightPresetMessage && <p className="mt-2 text-xs font-semibold text-moss">{weightPresetMessage}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={onClose}>閉じる</button>
              <button className="primary-button" onClick={() => setStep("reps")}>次へ</button>
            </div>
          </div>
        ) : !isCardio && step === "reps" ? (
          <div className="mt-4 space-y-4">
            <WizardNumberControl
              label="回数"
              value={draft.reps}
              suffix="回"
              step={1}
              min={0}
              max={50}
              onChange={(reps) => setDraft({ ...draft, reps: Math.max(0, Math.round(reps)) })}
            />
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setStep("weight")}>戻る</button>
              <button className="primary-button" onClick={() => setStep("sets")}>次へ</button>
            </div>
          </div>
        ) : !isCardio && step === "sets" ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((sets) => (
                <button
                  key={sets}
                  className={`choice-button ${setCount === sets ? "choice-button-active" : ""}`}
                  onClick={() => setDraft({ ...draft, sets })}
                >
                  {sets}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-rice p-3 text-sm font-bold">{summary}</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setStep("reps")}>戻る</button>
              <button className="primary-button" onClick={() => setStep("confirm")}>次へ</button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="rounded-md bg-rice p-4">
              <p className="text-xs font-bold text-moss">追加内容</p>
              <p className="mt-2 text-lg font-bold text-ink">{summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => setStep(isCardio ? "duration" : "sets")}>戻る</button>
              <button className="primary-button whitespace-nowrap" disabled={isSaving} onClick={handleSave}><Plus size={17} />{isSaving ? "追加中" : "今日の記録に追加"}</button>
            </div>
          </div>
        )}
      </div>
      {isWeightPresetPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-ink/35 px-4 pb-4">
          <div className="compact-card w-full p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold">保存先を選択</p>
                <p className="mt-1 text-xs text-moss">{formatControlValue(roundToStep(Math.max(0, draft.weight_kg), weightStep))}kgで置き換えます</p>
              </div>
              <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={() => setIsWeightPresetPickerOpen(false)}>×</button>
            </div>
            <div className="mt-4 grid gap-2">
              {weightPresets.map((value, index) => (
                <button className="secondary-button justify-between px-4" key={`${index}-${value}`} onClick={() => saveWeightPreset(index)}>
                  <span>プリセット{index + 1}</span>
                  <span className="numeric-text text-xs text-muted">{formatControlValue(value)}kg → {formatControlValue(roundToStep(Math.max(0, draft.weight_kg), weightStep))}kg</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FoodLogRow({ entry, displayName, showSource = false, onEdit, onDelete }: { entry: FoodEntry; displayName?: string; showSource?: boolean; onEdit?: () => void; onDelete?: () => Promise<void> }) {
  const pictogram = getFoodPictogram(entry);
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <Pictogram {...pictogram} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{displayName ?? entry.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="numeric-text text-xs text-moss">{mealLabels[entry.meal_type]} · P{entry.protein_g} F{entry.fat_g} C{entry.carbs_g}</span>
          {showSource && <SourceBadge source={entry.entry_source} confidence={entry.confidence} />}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="numeric-text text-sm font-bold">{entry.calories}</p>
        {onEdit && <button className="icon-button h-8 w-8" aria-label="修正" onClick={onEdit}><Pencil size={14} /></button>}
        {onDelete && <button className="icon-button h-8 w-8" aria-label="削除" onClick={onDelete}><Trash2 size={14} /></button>}
      </div>
    </div>
  );
}

function WorkoutExerciseEditor({
  exercise,
  sets,
  bodyWeightKg,
  onDeleteExercise,
  onPickTemplate,
  onPrUpdate,
  refresh,
}: {
  exercise: WorkoutExercise;
  sets: WorkoutSet[];
  bodyWeightKg: number;
  onDeleteExercise: () => void | Promise<void>;
  onPickTemplate?: (item: { label: string; item: TemplateExercise }) => void;
  onPrUpdate: (exercise: WorkoutExercise, previousSets: WorkoutSet[], nextSets: WorkoutSet[]) => void;
  refresh: () => Promise<void>;
}) {
  const isCardio = exercise.body_part === "有酸素" || exercise.equipment_type === "有酸素";
  const pictogram = getWorkoutPictogram(exercise.body_part, exercise.equipment_type);
  const setSignature = sets.map((set) => [set.set_order, set.weight_kg, set.reps, set.duration_min, set.active_calories, set.intensity, set.note].join(":")).join("|");
  const [setSchemeText, setSetSchemeText] = useState("");
  const [setSchemeStatus, setSetSchemeStatus] = useState("");
  const [weightStep, setWeightStep] = useState(() => inferWeightStep(exercise));
  useEffect(() => {
    setSetSchemeText(formatWorkoutSetText(sets, isCardio));
  }, [isCardio, setSignature]);
  useEffect(() => {
    setWeightStep(inferWeightStep(exercise));
  }, [exercise.exercise_name, exercise.equipment_type]);
  const updateCardioDuration = async (value: number) => {
    const timestamp = nowIso();
    let nextSets: WorkoutSet[];
    if (!sets.length) {
      const nextSet = {
        id: makeId("set"),
        workout_exercise_id: exercise.id,
        set_order: 1,
        reps: 0,
        duration_min: value,
        active_calories: estimateActiveCalories(exercise.exercise_name, value, bodyWeightKg),
        is_warmup: false,
        created_at: timestamp,
        updated_at: timestamp,
      };
      nextSets = [nextSet];
      await db.workout_sets.put(nextSet);
    } else {
      nextSets = sets.map((set) => ({
        ...set,
        duration_min: value,
        active_calories: estimateActiveCalories(exercise.exercise_name, value, bodyWeightKg),
        updated_at: timestamp,
      }));
      await Promise.all(sets.map((set) => db.workout_sets.update(set.id, {
        duration_min: value,
        active_calories: estimateActiveCalories(exercise.exercise_name, value, bodyWeightKg),
        updated_at: timestamp,
      })));
    }
    onPrUpdate(exercise, sets, nextSets);
    await refresh();
  };
  const applySetScheme = async () => {
    const scheme = parseWorkoutSetScheme(setSchemeText, isCardio, exercise.exercise_name, bodyWeightKg);
    if (!scheme.length) {
      setSetSchemeStatus("入力を読み取れませんでした");
      return;
    }
    const nextSets = workoutSetPatternsToPreviewSets(exercise.id, scheme);
    await replaceWorkoutSetsWithScheme(exercise.id, scheme);
    onPrUpdate(exercise, sets, nextSets);
    await refresh();
    setSetSchemeStatus(`${scheme.length}セットに置き換えました`);
  };
  const saveCustomExercise = async () => {
    const parsedScheme = parseWorkoutSetScheme(setSchemeText, isCardio, exercise.exercise_name, bodyWeightKg);
    const scheme = parsedScheme.length ? parsedScheme : workoutSetsToPattern(sets);
    if (!scheme.length) {
      setSetSchemeStatus("保存できるセットがありません");
      return;
    }
    const timestamp = nowIso();
    const first = scheme[0];
    const customName = `${exercise.exercise_name}（段階）`;
    const existing = await db.exercise_presets.filter((preset) => preset.is_user_created && preset.name === customName).first();
    await db.exercise_presets.put({
      id: existing?.id ?? makeId("exercise_user"),
      name: customName,
      body_part: exercise.body_part,
      equipment_type: exercise.equipment_type,
      movement_pattern: "custom",
      machine_name: exercise.machine_name,
      default_sets: scheme.length,
      default_reps: first.reps,
      default_weight_kg: first.weight_kg,
      default_duration_min: first.duration_min,
      default_set_scheme: scheme,
      intensity_default: first.intensity,
      is_public_preset: false,
      is_user_created: true,
      is_favorite: true,
      preset_pack: "custom",
      created_at: existing?.created_at ?? timestamp,
      updated_at: timestamp,
    });
    await refresh();
    setSetSchemeStatus("カスタム種目に保存しました");
  };
  const addFinisherPulseSet = async () => {
    const previous = sets.at(-1);
    const timestamp = nowIso();
    await db.workout_sets.put({
      id: makeId("set"),
      workout_exercise_id: exercise.id,
      set_order: sets.length + 1,
      weight_kg: previous?.weight_kg ?? 0,
      reps: Math.max(20, previous?.reps ?? 20),
      intensity: finisherPulseIntensity,
      note: finisherPulseNote,
      is_warmup: false,
      created_at: timestamp,
      updated_at: timestamp,
    });
    await refresh();
  };
  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        <Pictogram {...pictogram} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{exercise.exercise_name}</p>
          <p className="text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
        </div>
        <button className="icon-button h-8 w-8 text-clay" aria-label={`${exercise.exercise_name}をこの日の記録から削除`} onClick={onDeleteExercise}><Trash2 size={14} /></button>
      </div>
      {isCardio && (
        <div className="mt-3 rounded-md bg-rice p-3">
          <TapSliderControl
            label="分数"
            value={sets[0]?.duration_min ?? 20}
            suffix="min"
            step={5}
            min={0}
            max={120}
            onChange={updateCardioDuration}
          />
        </div>
      )}
      {!isCardio && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-md bg-rice p-3">
          <p className="text-xs font-bold text-moss">重量刻み</p>
          <div className="flex gap-1">
            {weightStepOptions.map((step) => (
              <button className={`mini-chip ${weightStep === step ? "mini-chip-active" : ""}`} key={step} onClick={() => setWeightStep(step)}>{step}</button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 space-y-2">
        {sets.map((set) => (
          <div className="rounded-md border border-line bg-surface p-3" key={set.id}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-moss">
                Set {set.set_order}
                {isFinisherPulseSet(set) && <span className="rounded-full border border-sun/35 bg-sun/20 px-2 py-0.5 text-[10px] text-[#8a5d13]">仕上げパルス</span>}
              </span>
              <button className="icon-button h-8 w-8" aria-label="削除" onClick={async () => { await db.workout_sets.delete(set.id); await refresh(); }}><Trash2 size={14} /></button>
            </div>
            {isCardio ? (
              <div className="space-y-2">
                <TapSliderControl value={set.duration_min ?? 20} label="時間" suffix="min" step={5} min={0} max={120} onChange={async (value) => {
                  await db.workout_sets.update(set.id, {
                    duration_min: value,
                    active_calories: estimateActiveCalories(exercise.exercise_name, value, bodyWeightKg),
                    updated_at: nowIso(),
                  });
                  await refresh();
                }} />
                <p className="numeric-text text-right text-xs font-bold text-moss">{set.active_calories ?? estimateActiveCalories(exercise.exercise_name, set.duration_min ?? 20, bodyWeightKg)} kcal</p>
              </div>
            ) : (
              <div className="space-y-3">
                <TapSliderControl
                  value={set.weight_kg ?? 0}
                  label="重量"
                  suffix="kg"
                  step={weightStep}
                  min={0}
                  max={sliderMax(set.weight_kg ?? 0, 200, weightStep)}
                  onChange={async (value) => {
                    const timestamp = nowIso();
                    const nextSets = sets.map((item) => item.id === set.id ? { ...item, weight_kg: value, updated_at: timestamp } : item);
                    await db.workout_sets.update(set.id, { weight_kg: value, updated_at: timestamp });
                    onPrUpdate(exercise, sets, nextSets);
                    await refresh();
                  }}
                />
                <TapSliderControl
                  value={set.reps ?? 0}
                  label="回数"
                  suffix="回"
                  step={1}
                  min={0}
                  max={50}
                  onChange={async (value) => {
                    const timestamp = nowIso();
                    const reps = Math.round(value);
                    const nextSets = sets.map((item) => item.id === set.id ? { ...item, reps, updated_at: timestamp } : item);
                    await db.workout_sets.update(set.id, { reps, updated_at: timestamp });
                    onPrUpdate(exercise, sets, nextSets);
                    await refresh();
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md bg-rice p-3">
        <label className="block text-xs font-bold text-moss">
          段階セット
          <textarea
            className="mt-2 min-h-20 w-full text-sm"
            value={setSchemeText}
            onChange={(event) => {
              setSetSchemeText(event.target.value);
              setSetSchemeStatus("");
            }}
            placeholder={isCardio ? "例: 25分 または 25〜30分" : "例: 47×10 / 54×10 / 61×10 / 68×10 または 20×10×3"}
          />
        </label>
        <p className="mt-2 text-xs leading-relaxed text-moss">入力した段階セットで、上のセット一覧をまとめて置き換えます。</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button className="secondary-button" onClick={applySetScheme}><Check size={16} />段階セットを反映</button>
          <button className="secondary-button" onClick={saveCustomExercise}><Save size={16} />カスタム種目保存</button>
        </div>
        {setSchemeStatus && <p className="mt-2 text-xs font-semibold text-moss">{setSchemeStatus}</p>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="secondary-button" onClick={async () => {
          const previous = sets.at(-1);
          await db.workout_sets.put({
            id: makeId("set"),
            workout_exercise_id: exercise.id,
            set_order: sets.length + 1,
            weight_kg: previous?.weight_kg ?? 0,
            reps: isCardio ? 0 : previous?.reps ?? 10,
            duration_min: isCardio ? previous?.duration_min ?? 20 : undefined,
            active_calories: isCardio ? estimateActiveCalories(exercise.exercise_name, previous?.duration_min ?? 20, bodyWeightKg) : undefined,
            is_warmup: false,
            created_at: nowIso(),
            updated_at: nowIso(),
          });
          await refresh();
        }}><Plus size={16} />セットを追加</button>
        {!isCardio && (
          <button className="secondary-button" onClick={addFinisherPulseSet}>
            <Activity size={16} />仕上げパルス
          </button>
        )}
        <button className="secondary-button" onClick={async () => {
          const previous = sets.at(-1);
          if (!previous) return;
          await db.workout_sets.put({ ...previous, id: makeId("set"), set_order: sets.length + 1, created_at: nowIso(), updated_at: nowIso() });
          await refresh();
        }}>直前セットを複製</button>
        {onPickTemplate && (
          <button className="secondary-button col-span-2" onClick={() => onPickTemplate({
            label: exercise.exercise_name,
            item: workoutExerciseToTemplateExercise(exercise, sets),
          })}><Archive size={16} />この種目をプリセットへ追加</button>
        )}
      </div>
    </div>
  );
}

function Stepper({ value, suffix, step, onChange }: { value: number; suffix: string; step: number; onChange: (value: number) => void }) {
  return (
    <div className="grid grid-cols-[30px_1fr_30px] items-center overflow-hidden rounded-md border border-line bg-white">
      <button className="h-9" onClick={() => onChange(round1(Math.max(0, value - step)))} aria-label="減らす"><Minus size={14} className="mx-auto" /></button>
      <input className="h-9 rounded-none border-0 px-1 text-center text-xs focus:ring-0" type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={suffix} />
      <button className="h-9" onClick={() => onChange(round1(value + step))} aria-label="増やす"><Plus size={14} className="mx-auto" /></button>
    </div>
  );
}

function WizardNumberControl({ label, value, suffix, step, min, max, onChange }: {
  label: string;
  value: number;
  suffix: string;
  step: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const normalized = clampToRange(value, min, max);
  const commit = (nextValue: number) => {
    onChange(roundToStep(clampToRange(nextValue, min, max), step));
  };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-moss">{label}</p>
        <p className="numeric-text rounded-md bg-rice px-2 py-1 text-sm font-bold text-ink">{formatControlValue(normalized)}{suffix}</p>
      </div>
      <div className="grid grid-cols-[36px_1fr_74px_36px] items-center gap-2">
        <button className="icon-button h-9 w-9 bg-surface" onClick={() => commit(normalized - step)} aria-label={`${label}を減らす`}><Minus size={14} /></button>
        <input
          className="h-9 w-full accent-moss"
          type="range"
          min={min}
          max={max}
          step={step}
          value={normalized}
          onChange={(event) => commit(Number(event.target.value))}
          aria-label={label}
        />
        <input
          className="h-9 w-full px-2 text-center text-sm font-bold"
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={normalized}
          onChange={(event) => commit(Number(event.target.value))}
          aria-label={`${label}を入力`}
        />
        <button className="icon-button h-9 w-9 bg-surface" onClick={() => commit(normalized + step)} aria-label={`${label}を増やす`}><Plus size={14} /></button>
      </div>
    </div>
  );
}

function TapSliderControl({ label, value, suffix, step, min, max, onChange }: {
  label: string;
  value: number;
  suffix: string;
  step: number;
  min: number;
  max: number;
  onChange: (value: number) => void | Promise<void>;
}) {
  const normalized = clampToRange(value, min, max);
  const commit = (nextValue: number) => {
    onChange(roundToStep(clampToRange(nextValue, min, max), step));
  };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-moss">{label}</p>
        <p className="numeric-text rounded-md bg-rice px-2 py-1 text-sm font-bold text-ink">{formatControlValue(normalized)}{suffix}</p>
      </div>
      <div className="grid grid-cols-[36px_1fr_36px] items-center gap-2">
        <button className="icon-button h-9 w-9 bg-surface" onClick={() => commit(normalized - step)} aria-label={`${label}を減らす`}><Minus size={14} /></button>
        <input
          className="h-9 w-full accent-moss"
          type="range"
          min={min}
          max={max}
          step={step}
          value={normalized}
          onChange={(event) => commit(Number(event.target.value))}
          aria-label={label}
        />
        <button className="icon-button h-9 w-9 bg-surface" onClick={() => commit(normalized + step)} aria-label={`${label}を増やす`}><Plus size={14} /></button>
      </div>
    </div>
  );
}

function NumberInput({ label, value, step = 1, onChange }: { label: string; value: number; step?: number; onChange: (value: number) => void }) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <input className="mt-1 w-full" type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function SelectField({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
  return (
    <label className="text-xs font-semibold">
      <span>{label}</span>
      <span className="ml-1 font-normal text-moss">{hint}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function PartialNumberInput({ label, value, step = 1, onChange }: { label: string; value: string; step?: number; onChange: (value: string) => void }) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <input className="mt-1 w-full" inputMode="decimal" type="number" step={step} value={value} onChange={(event) => onChange(event.target.value)} placeholder="不明なら空欄" />
    </label>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-rice px-3 py-2">
      <p className="text-[11px] font-semibold text-moss">{label}</p>
      <p className="numeric-text mt-0.5 text-sm font-black">{value}</p>
    </div>
  );
}

type PictogramTone = "moss" | "leaf" | "clay" | "sun" | "sky" | "blush" | "ink";

const pictogramToneClasses: Record<PictogramTone, string> = {
  moss: "border-moss/20 bg-moss/10 text-moss",
  leaf: "border-leaf/30 bg-leaf/15 text-moss",
  clay: "border-clay/25 bg-clay/10 text-clay",
  sun: "border-sun/35 bg-sun/15 text-[#8a5d13]",
  sky: "border-sky/30 bg-sky/10 text-sky",
  blush: "border-blush/30 bg-blush/10 text-blush",
  ink: "border-ink/15 bg-ink/5 text-ink",
};

function Pictogram({ icon: Icon, tone = "moss" }: { icon: LucideIcon; tone?: PictogramTone }) {
  return (
    <span className={`pictogram inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${pictogramToneClasses[tone]}`} aria-hidden="true">
      <Icon size={18} strokeWidth={2.25} />
    </span>
  );
}

function getFoodPictogram(item: { name: string; brand?: string; category?: string; tags?: string[]; meal_type?: MealType }) {
  const text = [item.name, item.brand, item.category, ...(item.tags ?? [])].filter(Boolean).join(" ");
  if (/カフェ|コーヒー|ラテ|ドトール|スターバックス|タリーズ|コメダ/.test(text)) return { icon: Coffee, tone: "sky" as PictogramTone };
  if (/ドリンク|ジュース|プロテインドリンク|ソーダ|牛乳|ミルク/.test(text)) return { icon: CupSoda, tone: "sky" as PictogramTone };
  if (/スイーツ|ケーキ|アイス|チョコ|プリン|デザート|甘味|ドーナツ|クレープ/.test(text)) return { icon: CakeSlice, tone: "blush" as PictogramTone };
  if (/サラダ|野菜|ベジ|キャベツ|トマト/.test(text)) return { icon: Carrot, tone: "leaf" as PictogramTone };
  if (/魚|鮭|サバ|ほっけ|刺身|寿司|海鮮|まぐろ|うなぎ/.test(text)) return { icon: Fish, tone: "sky" as PictogramTone };
  if (/肉|牛|豚|鶏|チキン|唐揚|から揚|カツ|ステーキ|ハンバーグ|焼肉/.test(text)) return { icon: Beef, tone: "clay" as PictogramTone };
  if (/ラーメン|うどん|そば|パスタ|麺|冷麺|スープ/.test(text)) return { icon: Soup, tone: "sun" as PictogramTone };
  if (/パン|サンド|バーガー|トースト|ベーグル|クロワッサン/.test(text)) return { icon: Croissant, tone: "sun" as PictogramTone };
  if (/卵|玉子|たまご|エッグ|オム/.test(text)) return { icon: EggFried, tone: "sun" as PictogramTone };
  if (/コンビニ|セブン|ファミリーマート|ローソン|ミニストップ|弁当|おにぎり/.test(text)) return { icon: ShoppingBag, tone: "sky" as PictogramTone };
  if (/チェーン|外食|定食|丼|カレー|ごはん|ライス/.test(text)) return { icon: UtensilsCrossed, tone: "moss" as PictogramTone };
  if (item.brand) return { icon: Store, tone: "ink" as PictogramTone };
  if (item.meal_type === "breakfast") return { icon: Coffee, tone: "sky" as PictogramTone };
  return { icon: Utensils, tone: "moss" as PictogramTone };
}

function getWorkoutPictogram(bodyPart = "", equipmentType = "") {
  const text = `${bodyPart} ${equipmentType}`;
  if (/有酸素|バイク|トレッドミル|ランニング|ウォーキング|クロストレーナー|ローイング/.test(text)) return { icon: Bike, tone: "sky" as PictogramTone };
  if (/胸|肩|腕|上腕|三頭|二頭/.test(text)) return { icon: BicepsFlexed, tone: "clay" as PictogramTone };
  if (/脚|下半身|尻|ヒップ/.test(text)) return { icon: Dumbbell, tone: "sun" as PictogramTone };
  if (/背中|広背|ロー|プル/.test(text)) return { icon: Activity, tone: "moss" as PictogramTone };
  if (/腹|体幹|コア/.test(text)) return { icon: Weight, tone: "leaf" as PictogramTone };
  return { icon: Dumbbell, tone: "moss" as PictogramTone };
}

const workoutTemplateIconOptions: { key: WorkoutTemplateIconKey; label: string }[] = [
  { key: "strength", label: "全身" },
  { key: "upper", label: "上半身" },
  { key: "legs", label: "脚" },
  { key: "back", label: "背中" },
  { key: "core", label: "体幹" },
  { key: "cardio", label: "有酸素" },
];

function getWorkoutTemplatePictogram(template: Pick<WorkoutTemplate, "icon_key" | "body_parts" | "exercises">) {
  if (template.icon_key) return getWorkoutTemplateIconPictogram(template.icon_key);
  return getWorkoutPictogram(template.body_parts.join(" "), template.exercises[0]?.equipment_type);
}

function getWorkoutTemplateIconPictogram(key: WorkoutTemplateIconKey) {
  return {
    strength: { icon: Dumbbell, tone: "moss" as PictogramTone },
    upper: { icon: BicepsFlexed, tone: "clay" as PictogramTone },
    legs: { icon: Dumbbell, tone: "sun" as PictogramTone },
    back: { icon: Activity, tone: "moss" as PictogramTone },
    core: { icon: Weight, tone: "leaf" as PictogramTone },
    cardio: { icon: Bike, tone: "sky" as PictogramTone },
  }[key];
}

function inferWorkoutTemplateIconKey(template: Pick<WorkoutTemplate, "body_parts" | "exercises">): WorkoutTemplateIconKey {
  const text = `${template.body_parts.join(" ")} ${template.exercises[0]?.equipment_type ?? ""}`;
  if (/有酸素|バイク|トレッドミル|ランニング|ウォーキング|クロストレーナー|ローイング/.test(text)) return "cardio";
  if (/胸|肩|腕|上腕|三頭|二頭/.test(text)) return "upper";
  if (/脚|下半身|尻|ヒップ/.test(text)) return "legs";
  if (/背中|広背|ロー|プル/.test(text)) return "back";
  if (/腹|体幹|コア/.test(text)) return "core";
  return "strength";
}

function WorkoutGoalProgress({ label, done, target }: { label: string; done: number; target: number }) {
  const percent = target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;
  const complete = target > 0 && done >= target;
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-bold text-ink">{label}</span>
        <span className={complete ? "font-bold text-moss" : "font-bold text-ink"}>{done}/{target || "-"}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-oat">
        <div className={`h-full rounded-full ${complete ? "bg-moss" : "bg-sun"}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function HistoryLineChart({
  title,
  unit,
  logs,
  getValue,
  color,
}: {
  title: string;
  unit: string;
  logs: WeightLog[];
  getValue: (log: WeightLog) => number | undefined;
  color: string;
}) {
  const values = logs
    .map((log) => ({ date: log.app_date, value: getValue(log) }))
    .filter((point): point is { date: string; value: number } => typeof point.value === "number" && Number.isFinite(point.value));
  const recent = values.slice(-30);
  const min = recent.length ? Math.min(...recent.map((point) => point.value)) : 0;
  const max = recent.length ? Math.max(...recent.map((point) => point.value)) : 0;
  const span = Math.max(max - min, 1);
  const width = 320;
  const height = 132;
  const pad = 18;
  const points = recent.map((point, index) => {
    const x = recent.length === 1 ? width / 2 : pad + (index / (recent.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (point.value - min) / span) * (height - pad * 2);
    return { ...point, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const latest = recent.at(-1);

  return (
    <section className="compact-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs text-moss">直近30件</p>
        </div>
        <p className="numeric-text text-sm font-black">{latest ? `${latest.value}${unit}` : "-"}</p>
      </div>
      {recent.length > 0 ? (
        <>
          <svg className="mt-3 h-36 w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
            <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="var(--chart-grid)" strokeWidth="1" />
            <line x1={pad} y1={pad} x2={width - pad} y2={pad} stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="4 4" />
            {path && <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
            {points.map((point, index) => (
              <circle key={`${point.date}-${index}`} cx={point.x} cy={point.y} r={index === points.length - 1 ? 4 : 2.5} fill={index === points.length - 1 ? "var(--chart-point-fill)" : color} stroke={color} strokeWidth="2" />
            ))}
          </svg>
          <div className="numeric-text mt-1 flex justify-between text-[11px] font-semibold text-moss">
            <span>{recent[0]?.date}</span>
            <span>min {round1(min)}{unit} / max {round1(max)}{unit}</span>
            <span>{latest?.date}</span>
          </div>
        </>
      ) : (
        <p className="mt-4 rounded-md bg-rice px-3 py-6 text-center text-sm text-moss">まだ記録がありません</p>
      )}
    </section>
  );
}

const perfectFoodPlans: { id: PerfectFoodPlan; label: string; summary: string; nutrition: { calories: number; protein: number; fat: number; carbs: number } }[] = [
  { id: "meal", label: "もう1食食べる", summary: "約550kcal", nutrition: { calories: 550, protein: 25, fat: 18, carbs: 75 } },
  { id: "snack", label: "軽食を食べる", summary: "約200kcal", nutrition: { calories: 200, protein: 5, fat: 8, carbs: 25 } },
  { id: "protein", label: "プロテイン補給", summary: "P24g想定", nutrition: { calories: 120, protein: 24, fat: 2, carbs: 4 } },
  { id: "none", label: "予定なし", summary: "残り全部で見る", nutrition: { calories: 0, protein: 0, fat: 0, carbs: 0 } },
];

function getRemainingNutrition(dayTotals: ReturnType<typeof sumFood>, goal?: Goal) {
  return {
    calories: Math.max(0, (goal?.target_calories ?? 0) - dayTotals.calories),
    protein: Math.max(0, (goal?.target_protein_g ?? 0) - dayTotals.protein),
    fat: Math.max(0, (goal?.target_fat_g ?? 0) - dayTotals.fat),
    carbs: Math.max(0, (goal?.target_carbs_g ?? 0) - dayTotals.carbs),
  };
}

function fitsRemainingFoodFilter(item: MenuItem, remaining: { calories: number; fat: number; carbs: number }) {
  const fitsCalories = remaining.calories <= 0 ? item.calories <= 0 : item.calories <= remaining.calories;
  const fitsFat = remaining.fat <= 0 ? item.fat_g <= 0 : item.fat_g <= remaining.fat;
  const fitsCarbs = remaining.carbs <= 0 ? item.carbs_g <= 0 : item.carbs_g <= remaining.carbs;
  return fitsCalories && fitsFat && fitsCarbs;
}

function getPlannedNutrition(plans: PerfectFoodPlan[]) {
  return plans
    .filter((plan) => plan !== "none")
    .reduce((sum, plan) => {
      const nutrition = perfectFoodPlans.find((item) => item.id === plan)?.nutrition ?? perfectFoodPlans.at(-1)!.nutrition;
      return {
        calories: sum.calories + nutrition.calories,
        protein: sum.protein + nutrition.protein,
        fat: sum.fat + nutrition.fat,
        carbs: sum.carbs + nutrition.carbs,
      };
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });
}

function buildPerfectFoodSuggestions(menuItems: MenuItem[], target: { calories: number; protein: number; fat: number; carbs: number }, plans: PerfectFoodPlan[]): PerfectFoodSuggestionGroup[] {
  if (target.calories <= 0 && target.protein <= 0 && target.fat <= 0 && target.carbs <= 0) return [];
  const groups: { label: string; test: (item: MenuItem) => boolean }[] = [
    { label: "プロテイン・補給", test: (item) => item.category === "プロテイン" || item.tags.some((tag) => /プロテイン|サプリ|クレアチン|EAA|BCAA/.test(tag)) },
    { label: "ごはん・丼", test: (item) => item.category === "ごはん・丼" || item.tags.some((tag) => /丼|おにぎり|米|カレー/.test(tag)) },
    { label: "麺・パン", test: (item) => item.category === "麺類" || item.category === "パン" || item.tags.some((tag) => /麺|うどん|そば|パスタ|パン|ピザ/.test(tag)) },
    { label: "おかず・軽食", test: (item) => ["肉・魚", "おかず・惣菜", "サラダ・野菜", "スープ"].includes(item.category) },
    { label: "チェーン店", test: (item) => item.category === "チェーン店" },
  ];
  const plannedProtein = plans.includes("protein");
  const candidates = menuItems
    .filter((item) => item.calories > 0)
    .filter((item) => !plannedProtein || !(item.category === "プロテイン" || item.tags.includes("プロテイン")));

  return groups
    .map((group) => ({
      label: group.label,
      items: pickDiversePerfectFoodItems(candidates
        .filter(group.test)
        .sort((a, b) => perfectFoodScore(a, target) - perfectFoodScore(b, target))),
    }))
    .filter((group) => group.items.length > 0);
}

function pickDiversePerfectFoodItems(items: MenuItem[], maxItems = 9) {
  const picked: MenuItem[] = [];
  const pickedIds = new Set<string>();
  const brandCounts = new Map<string, number>();
  const brandKey = (item: MenuItem) => item.brand?.trim() || item.category || "一般";
  const brandCaps = [1, 2, 3, Number.POSITIVE_INFINITY];

  for (const cap of brandCaps) {
    for (const item of items) {
      if (picked.length >= maxItems) return picked;
      if (pickedIds.has(item.id)) continue;
      const key = brandKey(item);
      const maxForThisPass = item.brand ? cap : Math.max(cap, 3);
      if ((brandCounts.get(key) ?? 0) >= maxForThisPass) continue;
      picked.push(item);
      pickedIds.add(item.id);
      brandCounts.set(key, (brandCounts.get(key) ?? 0) + 1);
    }
  }

  return picked;
}

function getPerfectFoodBalance(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }) {
  const calorieLeft = target.calories - item.calories;
  const proteinLeft = target.protein - item.protein_g;
  const fatLeft = target.fat - item.fat_g;
  const carbsLeft = target.carbs - item.carbs_g;
  const calorieOver = Math.max(0, -calorieLeft);
  const fatOver = Math.max(0, -fatLeft);
  const carbsOver = Math.max(0, -carbsLeft);
  const nonProteinLoad = Math.max(
    target.calories > 0 ? item.calories / target.calories : 0,
    target.fat > 0 ? item.fat_g / target.fat : 0,
    target.carbs > 0 ? item.carbs_g / target.carbs : 0,
  );
  return {
    calorieLeft,
    calorieOver,
    proteinLeft,
    fatLeft,
    fatOver,
    carbsLeft,
    carbsOver,
    hasOver: calorieOver > 25 || fatOver > 0.5 || carbsOver > 0.5,
    nonProteinLoad: Number.isFinite(nonProteinLoad) ? nonProteinLoad : 0,
  };
}

function perfectFoodScore(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }) {
  const balance = getPerfectFoodBalance(item, target);
  const calorieTarget = Math.max(140, Math.min(target.calories || item.calories, 820));
  const calorieScore = Math.abs(item.calories - calorieTarget) / calorieTarget;
  const proteinShortageScore = Math.max(0, balance.proteinLeft) / Math.max(18, target.protein || 18);
  const proteinCoverageBonus = target.protein > 0 ? Math.min(item.protein_g / target.protein, 1) * -0.42 : 0;
  const fatOverPenalty = balance.fatOver / Math.max(4, target.fat * 0.28 || 8);
  const carbsOverPenalty = balance.carbsOver / Math.max(12, target.carbs * 0.22 || 24);
  const calorieOverPenalty = balance.calorieOver / Math.max(160, target.calories * 0.18 || 240);
  const loadPenalty = balance.nonProteinLoad > 1 ? (balance.nonProteinLoad - 1) * 2.8 : Math.abs(balance.nonProteinLoad - 0.72) * 0.35;
  const sourceBonus = sourceRank(item.data_source) * 0.06;
  return (
    calorieScore * 0.72 +
    proteinShortageScore * 0.56 +
    proteinCoverageBonus +
    fatOverPenalty * 2.5 +
    carbsOverPenalty * 2.1 +
    calorieOverPenalty * 1.8 +
    loadPenalty +
    sourceBonus
  );
}

function getCalorieState(remaining: number, target: number) {
  if (target <= 0) {
    return {
      label: "未設定",
      displayValue: "-",
      subtitle: "目標kcalを設定すると状態を表示します",
      cardClass: "calorie-card-neutral",
      badgeClass: "bg-oat text-moss",
      valueClass: "text-ink",
    };
  }
  if (remaining < 0) {
    return {
      label: "超過",
      displayValue: Math.abs(remaining),
      subtitle: `${Math.abs(remaining)} kcal超過`,
      cardClass: "calorie-card-over",
      badgeClass: "bg-[#F3D8CE] text-clay",
      valueClass: "text-clay",
    };
  }
  if (remaining <= 100) {
    return {
      label: "適正",
      displayValue: remaining,
      subtitle: remaining === 0 ? "ぴったり目標" : `あと ${remaining} kcal`,
      cardClass: "calorie-card-on-track",
      badgeClass: "bg-leaf text-moss",
      valueClass: "text-moss",
    };
  }
  return {
    label: "不足",
    displayValue: remaining,
    subtitle: `あと ${remaining} kcal`,
    cardClass: "calorie-card-under",
    badgeClass: "bg-[#F4E5C8] text-[#8A5D13]",
    valueClass: "text-ink",
  };
}

function formatHomeDateParts(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  return {
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    weekday: new Intl.DateTimeFormat("ja-JP", { weekday: "long" }).format(date),
  };
}

function ListHeader({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <h2 className="text-sm font-bold">{title}</h2>
      <span className="text-xs font-semibold text-moss">{value}</span>
    </div>
  );
}

function ExpandableListHeader({ title, value, expanded, disabled, onToggle }: { title: string; value: string; expanded: boolean; disabled: boolean; onToggle: () => void }) {
  if (disabled) return <ListHeader title={title} value={value} />;
  return (
    <button className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={onToggle}>
      <h2 className="text-sm font-bold">{title}</h2>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-moss">
        {value}
        <ChevronRight className={`transition-transform ${expanded ? "rotate-90" : ""}`} size={14} />
      </span>
    </button>
  );
}

function EmptyLine({ text }: { text: string }) {
  return <p className="px-4 py-5 text-center text-sm text-moss">{text}</p>;
}

function TabButton({ active, icon, label, onClick }: { active: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button className={`tab-button ${active ? "tab-button-active" : ""}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function QuickStrip({ title, items, fallback, onPick }: { title: string; items: MenuItem[]; fallback: MenuItem[]; onPick: (item: MenuItem) => void }) {
  const visible = items.length ? items : fallback;
  if (!visible.length) return null;
  return (
    <section className="compact-card overflow-hidden">
      <ListHeader title={title} value={`${visible.length}件`} />
      <div className="divide-y divide-line">
        {visible.slice(0, 5).map((item) => (
          <button className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-rice/70" key={item.id} onClick={() => onPick(item)}>
            <Pictogram {...getFoodPictogram(item)} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{formatMenuItemName(item)}</p>
              <p className="numeric-text truncate text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
            </div>
            <ChevronRight className="shrink-0 text-muted" size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

function isCardioWorkoutItem(item: { body_part: string; equipment_type: string }) {
  return item.body_part === "有酸素" || item.equipment_type === "有酸素";
}

function isFinisherPulseSet(set: { intensity?: string; note?: string }) {
  return set.intensity === finisherPulseIntensity || /仕上げパルス|パーシャル|部分可動域|pulse/i.test(set.note ?? "");
}

function parseWorkoutSetScheme(text: string, isCardio: boolean, exerciseName: string, bodyWeightKg: number): WorkoutSetPattern[] {
  const normalizedText = text
    .replace(/[／]/g, "/")
    .replace(/[，、]/g, "/")
    .replace(/\n+/g, "/");
  return normalizedText
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .flatMap((segment) => parseWorkoutSetSegment(segment, isCardio, exerciseName, bodyWeightKg))
    .slice(0, 20);
}

function parseWorkoutSetSegment(segment: string, isCardio: boolean, exerciseName: string, bodyWeightKg: number): WorkoutSetPattern[] {
  const [, afterColon = segment] = segment.match(/[:：](.+)$/) ?? [];
  let target = afterColon.trim();
  const notes = Array.from(target.matchAll(/[（(]([^）)]+)[）)]/g)).map((match) => match[1].trim()).filter(Boolean);
  target = target.replace(/[（(][^）)]+[）)]/g, "").trim();
  const note = notes.join(" / ") || undefined;
  const intensity = /仕上げパルス|パーシャル|部分可動域|pulse/i.test(note ?? segment) ? finisherPulseIntensity : undefined;
  const numbers = target.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  if (!numbers.length) return [];

  if (isCardio || /分/.test(target)) {
    const duration = /[〜~\-－]/.test(target) && numbers.length > 1 ? numbers[1] : numbers[0];
    return [{
      reps: 0,
      duration_min: duration,
      active_calories: estimateActiveCalories(exerciseName, duration, bodyWeightKg),
      intensity,
      note,
    }];
  }

  if (numbers.length < 2) return [];
  const repeat = Math.max(1, Math.min(10, Math.round(numbers[2] ?? 1)));
  return Array.from({ length: repeat }, () => ({
    weight_kg: numbers[0],
    reps: Math.round(numbers[1]),
    intensity,
    note,
  }));
}

function workoutSetsToPattern(sets: WorkoutSet[]): WorkoutSetPattern[] {
  return [...sets]
    .sort((a, b) => a.set_order - b.set_order)
    .map((set) => ({
      weight_kg: set.weight_kg,
      reps: set.reps,
      duration_min: set.duration_min,
      active_calories: set.active_calories,
      intensity: set.intensity,
      note: set.note,
    }));
}

function workoutSetPatternsToPreviewSets(workoutExerciseId: string, scheme: WorkoutSetPattern[]): WorkoutSet[] {
  const timestamp = nowIso();
  return scheme.map((pattern, index) => ({
    id: `preview_${index}`,
    workout_exercise_id: workoutExerciseId,
    set_order: index + 1,
    weight_kg: pattern.weight_kg,
    reps: pattern.reps,
    duration_min: pattern.duration_min,
    active_calories: pattern.active_calories,
    intensity: pattern.intensity,
    note: pattern.note,
    is_warmup: false,
    created_at: timestamp,
    updated_at: timestamp,
  }));
}

function formatWorkoutSetPatternText(patterns: WorkoutSetPattern[] | undefined, isCardio: boolean) {
  if (!patterns?.length) return "";
  return patterns.map((pattern) => formatWorkoutSetPatternToken(pattern, isCardio)).join(" / ");
}

function templateExerciseFallbackSetText(exercise: TemplateExercise, isCardio: boolean) {
  if (isCardio) return `${exercise.duration_min ?? exercise.set_scheme?.[0]?.duration_min ?? 20}分`;
  return `${exercise.weight_kg ?? exercise.set_scheme?.[0]?.weight_kg ?? 0}×${exercise.reps ?? exercise.set_scheme?.[0]?.reps ?? 10}×${exercise.set_scheme?.length || exercise.sets || 3}`;
}

function formatWorkoutSetText(sets: WorkoutSet[], isCardio: boolean) {
  return formatWorkoutSetPatternText(workoutSetsToPattern(sets), isCardio);
}

function formatWorkoutSetPatternToken(pattern: WorkoutSetPattern, isCardio: boolean) {
  const label = isFinisherPulseSet(pattern) ? "仕上げパルス" : pattern.note;
  if (isCardio || typeof pattern.duration_min === "number") {
    return `${pattern.duration_min ?? 0}分${label ? `（${label}）` : ""}`;
  }
  return `${pattern.weight_kg ?? 0}×${pattern.reps ?? 0}${label ? `（${label}）` : ""}`;
}

async function replaceWorkoutSetsWithScheme(workoutExerciseId: string, scheme: WorkoutSetPattern[]) {
  const timestamp = nowIso();
  const existing = await db.workout_sets.where("workout_exercise_id").equals(workoutExerciseId).toArray();
  await db.transaction("rw", db.workout_sets, async () => {
    if (existing.length) await db.workout_sets.bulkDelete(existing.map((set) => set.id));
    await db.workout_sets.bulkPut(scheme.map((pattern, index) => ({
      id: makeId("set"),
      workout_exercise_id: workoutExerciseId,
      set_order: index + 1,
      weight_kg: pattern.weight_kg,
      reps: pattern.reps,
      duration_min: pattern.duration_min,
      active_calories: pattern.active_calories,
      intensity: pattern.intensity,
      note: pattern.note,
      is_warmup: false,
      created_at: timestamp,
      updated_at: timestamp,
    })));
  });
}

async function addExerciseToSession(
  sessionId: string,
  item: TemplateExercise,
  order: number,
  allSets: WorkoutSet[],
  allExercises: WorkoutExercise[],
  options: { bodyWeightKg?: number; preferItemValues?: boolean } = {},
): Promise<string> {
  const timestamp = nowIso();
  const exercise: WorkoutExercise = {
    id: makeId("workout_exercise"),
    session_id: sessionId,
    exercise_id: item.exercise_id,
    exercise_name: item.exercise_name,
    body_part: item.body_part,
    equipment_type: item.equipment_type,
    order,
    created_at: timestamp,
    updated_at: timestamp,
  };
  await db.workout_exercises.put(exercise);
  const previousExercise = allExercises
    .filter((candidate) => candidate.exercise_name === item.exercise_name)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
  const previousSets = previousExercise ? allSets.filter((set) => set.workout_exercise_id === previousExercise.id).sort((a, b) => a.set_order - b.set_order) : [];
  const setScheme = item.set_scheme?.length ? item.set_scheme : undefined;
  const sets = setScheme
    ? setScheme.map((pattern, index) => ({
      id: makeId("set"),
      workout_exercise_id: exercise.id,
      set_order: index + 1,
      weight_kg: pattern.weight_kg,
      reps: pattern.reps,
      duration_min: pattern.duration_min,
      active_calories: pattern.active_calories ?? (item.body_part === "有酸素" && pattern.duration_min ? estimateActiveCalories(item.exercise_name, pattern.duration_min, options.bodyWeightKg ?? 70) : undefined),
      intensity: pattern.intensity,
      note: pattern.note,
      is_warmup: false,
      created_at: timestamp,
      updated_at: timestamp,
    }))
    : Array.from({ length: options.preferItemValues ? item.sets || previousSets.length || 3 : previousSets.length || item.sets || 3 }, (_, index) => {
      const previous = previousSets[index] ?? previousSets.at(-1);
      const durationMin = item.duration_min ?? previous?.duration_min;
      return {
      id: makeId("set"),
      workout_exercise_id: exercise.id,
      set_order: index + 1,
      weight_kg: options.preferItemValues ? item.weight_kg ?? previous?.weight_kg ?? 0 : previous?.weight_kg ?? item.weight_kg ?? 0,
      reps: options.preferItemValues ? item.reps ?? previous?.reps ?? 10 : previous?.reps ?? item.reps ?? 10,
      duration_min: durationMin,
      active_calories: item.body_part === "有酸素" && durationMin ? estimateActiveCalories(item.exercise_name, durationMin, options.bodyWeightKg ?? 70) : undefined,
      is_warmup: false,
      created_at: timestamp,
      updated_at: timestamp,
      };
    });
  await db.workout_sets.bulkPut(sets);
  return exercise.id;
}

const cardioMets: Record<string, number> = {
  クロストレーナー: 5.5,
  トレッドミル: 6.0,
  傾斜ウォーキング: 6.5,
  早歩き: 4.3,
  バイク: 5.8,
  リカンベントバイク: 4.8,
  エアロバイク高負荷: 7.0,
  ローイングマシン: 7.0,
  ステアクライマー: 8.8,
  階段昇降: 7.0,
  ウォーキング: 3.5,
  ランニング: 9.8,
  ジョギング: 7.0,
  縄跳び: 10.0,
  HIIT: 8.0,
};

function estimateActiveCalories(exerciseName: string, durationMin: number, weightKg: number) {
  const met = cardioMets[exerciseName] ?? 5;
  return Math.round(met * 3.5 * weightKg * durationMin / 200);
}

function sumFood(entries: FoodEntry[]) {
  return entries.reduce(
    (sum, entry) => ({
      calories: sum.calories + entry.calories,
      protein: round1(sum.protein + entry.protein_g),
      fat: round1(sum.fat + entry.fat_g),
      carbs: round1(sum.carbs + entry.carbs_g),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );
}

function defaultGoal(profile?: Profile): Goal | undefined {
  if (!profile) return undefined;
  return buildGoal({ profile, phase: "maintenance", activity_level: "moderate", age: new Date().getFullYear() - profile.birth_year });
}

type WorkoutPr = {
  exerciseName: string;
  label: string;
};

type WorkoutHistoryLine = {
  exerciseName: string;
  label: string;
  isPr: boolean;
};

type WorkoutHistoryItem = {
  id: string;
  app_date: string;
  title: string;
  exerciseCount: number;
  setCount: number;
  lines: WorkoutHistoryLine[];
  prs: WorkoutPr[];
};

type WorkoutHistoryGroupLine = WorkoutHistoryLine & {
  prefix?: string;
};

type WorkoutHistoryGroup = {
  id: string;
  label: string;
  sessionCount: number;
  exerciseCount: number;
  setCount: number;
  lines: WorkoutHistoryGroupLine[];
  prs: WorkoutPr[];
};

function buildWorkoutHistory(sessions: WorkoutSession[], exercises: WorkoutExercise[], sets: WorkoutSet[]): WorkoutHistoryItem[] {
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  const setsByExercise = new Map<string, WorkoutSet[]>();
  exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  sets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });

  const bestByExercise = new Map<string, number>();
  const sortedSessions = [...sessions].sort((a, b) => a.logged_at.localeCompare(b.logged_at));

  return sortedSessions.map((session) => {
    const sessionExercises = (exercisesBySession.get(session.id) ?? []).sort((a, b) => a.order - b.order);
    const lines: WorkoutHistoryLine[] = [];
    const prs: WorkoutPr[] = [];
    let setCount = 0;

    sessionExercises.forEach((exercise) => {
      const exerciseSets = (setsByExercise.get(exercise.id) ?? []).sort((a, b) => a.set_order - b.set_order);
      setCount += exerciseSets.length;
      const bestSet = pickBestWorkoutSet(exercise, exerciseSets);
      if (!bestSet) {
        lines.push({ exerciseName: exercise.exercise_name, label: `${exerciseSets.length}セット`, isPr: false });
        return;
      }
      const previousBest = bestByExercise.get(exercise.exercise_name);
      const isPr = typeof previousBest === "number" && bestSet.score > previousBest;
      if (isPr) {
        prs.push({ exerciseName: exercise.exercise_name, label: bestSet.label });
      }
      bestByExercise.set(exercise.exercise_name, Math.max(previousBest ?? 0, bestSet.score));
      lines.push({ exerciseName: exercise.exercise_name, label: bestSet.label, isPr });
    });

    return {
      id: session.id,
      app_date: session.app_date,
      title: session.title,
      exerciseCount: sessionExercises.length,
      setCount,
      lines,
      prs,
    };
  }).reverse();
}

function groupWorkoutHistory(history: WorkoutHistoryItem[], grouping: HistoryGrouping): WorkoutHistoryGroup[] {
  if (grouping === "day") {
    return history.map((session) => ({
      id: session.id,
      label: `${formatJapaneseDate(session.app_date)} ${session.title}`,
      sessionCount: 1,
      exerciseCount: session.exerciseCount,
      setCount: session.setCount,
      lines: session.lines,
      prs: session.prs,
    }));
  }

  const groups = new Map<string, WorkoutHistoryItem[]>();
  history.forEach((session) => {
    const key = grouping === "week" ? weekKey(session.app_date) : monthKey(session.app_date);
    groups.set(key, [...(groups.get(key) ?? []), session]);
  });

  return Array.from(groups.entries()).map(([key, sessions]) => {
    const sortedSessions = [...sessions].sort((a, b) => b.app_date.localeCompare(a.app_date));
    const exerciseCount = sortedSessions.reduce((sum, session) => sum + session.exerciseCount, 0);
    const setCount = sortedSessions.reduce((sum, session) => sum + session.setCount, 0);
    return {
      id: key,
      label: grouping === "week" ? formatWeekLabel(key) : formatMonthLabel(key),
      sessionCount: sortedSessions.length,
      exerciseCount,
      setCount,
      lines: sortedSessions.flatMap((session) =>
        session.lines.map((line) => ({
          ...line,
          prefix: formatJapaneseDate(session.app_date),
        })),
      ),
      prs: sortedSessions.flatMap((session) => session.prs),
    };
  });
}

function pickBestWorkoutSet(exercise: WorkoutExercise, sets: WorkoutSet[]) {
  const candidates = sets
    .filter((set) => !isFinisherPulseSet(set))
    .map((set) => {
      if (exercise.body_part === "有酸素" || set.duration_min) {
        const duration = set.duration_min ?? 0;
        if (!duration) return undefined;
        return {
          score: duration,
          label: `${duration}分${set.active_calories ? ` / ${set.active_calories}kcal` : ""}`,
        };
      }
      const weight = set.weight_kg ?? 0;
      const reps = set.reps ?? 0;
      if (!weight && !reps) return undefined;
      const score = weight ? weight * (1 + reps / 30) : reps;
      return {
        score,
        label: weight ? `${weight}kg x ${reps || "-"}回` : `${reps}回`,
      };
    })
    .filter((candidate): candidate is { score: number; label: string } => !!candidate);
  return candidates.sort((a, b) => b.score - a.score)[0];
}

function detectWorkoutPrUpdate(
  exercise: WorkoutExercise,
  previousSets: WorkoutSet[],
  nextSets: WorkoutSet[],
  sessions: WorkoutSession[],
  exercises: WorkoutExercise[],
  allSets: WorkoutSet[],
) {
  const previousBest = getPreviousWorkoutBest(exercise, sessions, exercises, allSets);
  if (!previousBest) return undefined;
  const before = pickBestWorkoutSet(exercise, previousSets);
  const after = pickBestWorkoutSet(exercise, nextSets);
  if (!after) return undefined;
  if ((before?.score ?? 0) > previousBest.score) return undefined;
  if (after.score <= previousBest.score) return undefined;
  return {
    score: after.score,
    label: after.label,
    previousScore: previousBest.score,
    previousLabel: previousBest.label,
  };
}

function getPreviousWorkoutBest(exercise: WorkoutExercise, sessions: WorkoutSession[], exercises: WorkoutExercise[], allSets: WorkoutSet[]) {
  const currentSession = sessions.find((session) => session.id === exercise.session_id);
  if (!currentSession) return undefined;
  const previousSessionIds = new Set(
    sessions
      .filter((session) => session.id !== currentSession.id && session.logged_at < currentSession.logged_at)
      .map((session) => session.id),
  );
  const previousExercises = exercises.filter((item) => item.exercise_name === exercise.exercise_name && previousSessionIds.has(item.session_id));
  const bests = previousExercises
    .map((item) => pickBestWorkoutSet(item, allSets.filter((set) => set.workout_exercise_id === item.id)))
    .filter((best): best is { score: number; label: string } => !!best);
  return bests.sort((a, b) => b.score - a.score)[0];
}

function formatSignedDelta(latest?: number, first?: number, unit = "") {
  if (typeof latest !== "number" || typeof first !== "number") return "-";
  const delta = round1(latest - first);
  if (delta > 0) return `+${delta}${unit}`;
  if (delta < 0) return `${delta}${unit}`;
  return `±0${unit}`;
}

function movingAverage(logs: WeightLog[], count: number) {
  const recent = logs.slice(-count);
  if (!recent.length) return undefined;
  return round1(recent.reduce((sum, log) => sum + log.weight_kg, 0) / recent.length);
}

function weekKey(dateString: string) {
  return startOfWeek(dateString);
}

function monthKey(dateString: string) {
  return dateString.slice(0, 7);
}

function shiftMonthKey(month: string, offset: number) {
  const [year, monthNumber] = month.split("-").map(Number);
  const date = new Date(year, monthNumber - 1 + offset, 1, 12);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function buildMonthCalendar(month: string): CalendarCell[] {
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDay = new Date(year, monthNumber - 1, 1, 12);
  const lastDay = new Date(year, monthNumber, 0, 12);
  const leadingEmptyCells = firstDay.getDay();
  const totalCells = Math.ceil((leadingEmptyCells + lastDay.getDate()) / 7) * 7;
  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - leadingEmptyCells + 1;
    if (day < 1 || day > lastDay.getDate()) return {};
    return {
      day,
      date: `${year}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });
}

function startOfWeek(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date.toISOString().slice(0, 10);
}

function endOfWeek(dateString: string) {
  return addDays(startOfWeek(dateString), 6);
}

function formatWeekLabel(weekStart: string) {
  return `${formatJapaneseDate(weekStart)} - ${formatJapaneseDate(endOfWeek(weekStart))}`;
}

function formatMonthLabel(month: string) {
  const [year, monthNumber] = month.split("-");
  return `${year}年${Number(monthNumber)}月`;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function clampToRange(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value: number, step: number) {
  const rounded = Math.round(value / step) * step;
  return round1(rounded);
}

function sliderMax(value: number, fallbackMax: number, step: number) {
  const nextMax = Math.max(fallbackMax, value + step * 10);
  return Math.ceil(nextMax / step) * step;
}

function formatControlValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function defaultWorkoutWeightPresets(currentWeight: number, step: number) {
  const base = currentWeight > 0 ? currentWeight : 20;
  const candidates = [
    currentWeight,
    base,
    base + step * 5,
    base + step * 10,
    base + step * 15,
    base + step * 20,
    0,
    10,
    20,
    30,
    40,
  ];
  const seen = new Set<string>();
  const presets = candidates
    .map((value) => roundToStep(Math.max(0, value), step))
    .filter((value) => {
      const key = String(value);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);
  while (presets.length < 5) presets.push(roundToStep(presets.length * step * 5, step));
  return presets;
}

function loadWorkoutWeightPresets(exerciseId: string, currentWeight: number, step: number) {
  const fallback = defaultWorkoutWeightPresets(currentWeight, step);
  try {
    const raw = localStorage.getItem(workoutWeightPresetStorageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const values = Array.isArray(parsed[exerciseId]) ? parsed[exerciseId] : undefined;
    if (!values) return fallback;
    const normalized = values
      .map((value) => typeof value === "number" ? roundToStep(Math.max(0, value), step) : undefined)
      .filter((value): value is number => typeof value === "number")
      .slice(0, 5);
    return normalized.length === 5 ? normalized : [...normalized, ...fallback].slice(0, 5);
  } catch {
    return fallback;
  }
}

function saveWorkoutWeightPresets(exerciseId: string, presets: number[]) {
  try {
    const raw = localStorage.getItem(workoutWeightPresetStorageKey);
    const parsed = raw ? JSON.parse(raw) as Record<string, number[]> : {};
    parsed[exerciseId] = presets.slice(0, 5);
    localStorage.setItem(workoutWeightPresetStorageKey, JSON.stringify(parsed));
  } catch {
    // 操作補助の保存なので、失敗しても記録自体は止めない。
  }
}

function inferWeightStep(item: { exercise_name?: string; name?: string; equipment_type: string }) {
  const text = `${item.exercise_name ?? item.name ?? ""} ${item.equipment_type}`;
  if (/ダンベル|ケーブル|プレート|フリー|スミス/.test(text)) return 2.5;
  if (/自重|チューブ/.test(text)) return 1;
  if (/マシン|プレス|ロー|カール|エクステンション|プルダウン/.test(text)) return 1;
  return 1;
}

function clampBodyFat(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value * 2) / 2));
}

function unique(values: string[]) {
  return [...new Set(values)].filter(Boolean);
}

function foodModeLabel(mode: FoodMode) {
  return {
    search: "検索",
    favorite: "お気に入り",
    chain: "チェーン",
    category: "カテゴリ",
    quick: "一般",
    manual: "マニュアル",
    personal: "マイメニュー",
  }[mode];
}

function toManualDraft(item: MenuItem, mealType: MealType = "lunch"): ManualFoodDraft {
  const category = genericCategories[item.category] ? item.category : "チェーン店";
  const subcategory = item.tags.find((tag) => genericCategories[category]?.includes(tag)) ?? genericCategories[category]?.[0] ?? "";
  return {
    name: formatMenuItemName(item),
    brand: item.brand ?? "",
    meal_type: item.default_meal_type ?? mealType,
    category,
    subcategory,
    calories: String(item.calories),
    protein_g: String(item.protein_g),
    fat_g: String(item.fat_g),
    carbs_g: String(item.carbs_g),
    salt_g: item.salt_g === undefined ? "" : String(item.salt_g),
    note: item.data_source === "estimated" ? "推定メニューから編集" : item.data_source === "unofficial" ? "非公式メニューから編集" : "",
    savePreset: true,
    favorite: item.is_favorite,
  };
}

function setManualFromItem(setManual: (manual: ManualFoodDraft) => void, setMode: (mode: FoodMode) => void) {
  return (item: MenuItem) => {
    setManual(toManualDraft(item, item.default_meal_type ?? "lunch"));
    setMode("manual");
  };
}

function exercisePresetToTemplateExercise(exercise: ExercisePreset): TemplateExercise {
  return {
    exercise_id: exercise.id,
    exercise_name: exercise.name,
    body_part: exercise.body_part,
    equipment_type: exercise.equipment_type,
    sets: exercise.default_sets ?? 3,
    reps: exercise.default_reps,
    weight_kg: exercise.default_weight_kg,
    duration_min: exercise.default_duration_min,
    set_scheme: exercise.default_set_scheme,
  };
}

function workoutExerciseToTemplateExercise(exercise: WorkoutExercise, sets: WorkoutSet[]): TemplateExercise {
  const firstSet = sets[0];
  return {
    exercise_id: exercise.exercise_id,
    exercise_name: exercise.exercise_name,
    body_part: exercise.body_part,
    equipment_type: exercise.equipment_type,
    sets: sets.length || 3,
    reps: firstSet?.reps,
    weight_kg: firstSet?.weight_kg,
    duration_min: firstSet?.duration_min,
    set_scheme: sets.length ? workoutSetsToPattern(sets) : undefined,
  };
}

function sortWorkoutTemplates(templates: WorkoutTemplate[]) {
  return [...templates].sort((a, b) => {
    const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.created_at.localeCompare(b.created_at) || a.name.localeCompare(b.name);
  });
}

function templateBodyParts(exercises: TemplateExercise[]) {
  return unique(exercises.map((exercise) => exercise.body_part));
}

function draftNutrition(manual: ManualFoodDraft) {
  const calories = draftNumber(manual.calories);
  const protein = draftNumber(manual.protein_g);
  const fat = draftNumber(manual.fat_g);
  const carbs = draftNumber(manual.carbs_g);
  const salt = manual.salt_g.trim() === "" ? undefined : draftNumber(manual.salt_g).value;
  return {
    calories: Math.round(calories.value),
    protein_g: round1(protein.value),
    fat_g: round1(fat.value),
    carbs_g: round1(carbs.value),
    salt_g: salt === undefined ? undefined : round1(salt),
    unknown: [
      calories.unknown ? "kcal" : "",
      protein.unknown ? "P" : "",
      fat.unknown ? "F" : "",
      carbs.unknown ? "C" : "",
    ].filter(Boolean),
  };
}

function draftNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { value: 0, unknown: true };
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? { value: parsed, unknown: false } : { value: 0, unknown: true };
}

function sourceRank(source: MenuItem["data_source"]) {
  return { official: 0, user: 1, unofficial: 2, estimated: 3, quick_estimate: 4 }[source];
}

function sourceLabel(source: MenuItem["data_source"], confidence: MenuItem["confidence"], item?: MenuItem) {
  const sourceText = sourceDescription(source, item);
  const confidenceText = confidenceDescription(source, confidence, item);
  return [sourceText, confidenceText].filter(Boolean).join(" · ");
}

function SourceBadge({ source, confidence, item }: { source: MenuItem["data_source"]; confidence: MenuItem["confidence"]; item?: MenuItem }) {
  return (
    <span className={`source-badge ${sourceBadgeClass(source, item)}`}>
      {sourceLabel(source, confidence, item)}
    </span>
  );
}

function sourceDescription(source: MenuItem["data_source"], item?: MenuItem) {
  if (source === "estimated" && item) {
    if (item.tags.includes("公式カロリー")) return "公式kcal・PFC推定";
    if (hasOfficialPartialSignal(item)) return "公式名・PFC推定";
  }
  return {
    official: "公式値",
    unofficial: "非公式値",
    estimated: "推定値",
    quick_estimate: "概算",
    user: "自分で入力",
  }[source];
}

function confidenceDescription(source: MenuItem["data_source"], confidence: MenuItem["confidence"], item?: MenuItem) {
  if (source === "official") return "信用度 高";
  if (source === "unofficial") return "信用度 中";
  if (source === "estimated" && item && hasOfficialPartialSignal(item)) return "信用度 中";
  if (source === "estimated") return "信用度 低";
  if (source === "quick_estimate") return "信用度 低";
  if (confidence === "low") return "信用度 低";
  if (confidence === "medium") return "信用度 中";
  return "信用度 高";
}

function hasOfficialPartialSignal(item: MenuItem) {
  return Boolean(item.source_url || item.tags.some((tag) => tag.includes("公式")));
}

function sourceBadgeClass(source: MenuItem["data_source"], item?: MenuItem) {
  if (source === "estimated" && item && hasOfficialPartialSignal(item)) return "source-badge-partial";
  return {
    official: "source-badge-official",
    unofficial: "source-badge-unofficial",
    estimated: "source-badge-estimated",
    quick_estimate: "source-badge-quick",
    user: "source-badge-user",
  }[source];
}

function dedupeMenuItemsBySource(items: MenuItem[]) {
  const seen = new Set<string>();
  return [...items]
    .sort((a, b) => sourceRank(a.data_source) - sourceRank(b.data_source))
    .filter((item) => {
      const key = [item.brand ?? "", item.name, item.serving_label ?? ""].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function workoutModeLabel(mode: WorkoutMode) {
  return {
    favorite: "お気に入り",
    preset: "プリセット",
    body: "部位",
    equipment: "器具",
    previous: "前回",
    search: "検索",
  }[mode];
}

const unhelpfulServingLabels = new Set(["1品", "1食"]);

function formatMenuItemName(item: Pick<MenuItem, "name" | "serving_label">) {
  const servingLabel = item.serving_label?.trim();
  if (!servingLabel || unhelpfulServingLabels.has(servingLabel) || item.name.includes(servingLabel)) return item.name;
  return `${item.name}（${servingLabel}）`;
}

function formatFoodEntryName(entry: FoodEntry, menuItems: MenuItem[]) {
  if (!entry.menu_item_id) return entry.name;
  const menuItem = menuItems.find((item) => item.id === entry.menu_item_id);
  if (!menuItem || entry.name !== menuItem.name) return entry.name;
  return formatMenuItemName(menuItem);
}

function getPortionOptions(item: MenuItem): PortionOption[] {
  const text = [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  const servingLabel = item.serving_label?.trim();
  const standardLabel = servingLabel && !unhelpfulServingLabels.has(servingLabel) ? servingLabel : "普通";

  if (hasFoodToken(text, ["ドリンク", "コーヒー", "カフェラテ", "牛乳", "豆乳", "ジュース", "炭酸", "アルコール"])) {
    return [
      { label: "S", value: 0.75 },
      { label: standardLabel === "普通" ? "M" : standardLabel, value: 1 },
      { label: "L", value: 1.25 },
    ];
  }

  if (item.category === "プロテイン" || hasFoodToken(text, ["プロテイン", "プロテインバー", "プロテインドリンク", "プロテインゼリー"])) {
    return [
      { label: "半分", value: 0.5 },
      { label: standardLabel === "普通" ? "1回分" : standardLabel, value: 1 },
      { label: doubleServingLabel(servingLabel, "2回分"), value: 2 },
    ];
  }

  if (hasFoodToken(text, ["おにぎり", "パン", "サンドイッチ", "トースト", "スイーツ", "和菓子", "果物", "卵"])) {
    return [
      { label: "半分", value: 0.5 },
      { label: standardLabel === "普通" ? "1個" : standardLabel, value: 1 },
      { label: doubleServingLabel(servingLabel, "2個"), value: 2 },
    ];
  }

  if (hasFoodToken(text, ["ごはん", "丼", "カレー", "麺", "ラーメン", "うどん", "そば", "パスタ", "焼きそば", "寿司", "弁当", "定食"])) {
    return [
      { label: "少なめ", value: 0.8 },
      { label: standardLabel === "普通" ? "普通量" : standardLabel, value: 1 },
      { label: "多め", value: 1.2 },
    ];
  }

  return [
    { label: "半分", value: 0.5 },
    { label: standardLabel === "普通" ? "1人前" : standardLabel, value: 1 },
    { label: "1.5人前", value: 1.5 },
  ];
}

function hasFoodToken(text: string, tokens: string[]) {
  return tokens.some((token) => text.includes(token));
}

function doubleServingLabel(servingLabel: string | undefined, fallback: string) {
  const label = servingLabel?.trim();
  if (!label || unhelpfulServingLabels.has(label)) return fallback;
  const singleServing = label.match(/^1(.+)$/);
  if (singleServing) return `2${singleServing[1]}`;
  return fallback;
}

async function updateServiceWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.update()));
  registrations.forEach((registration) => {
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
  });
}

async function clearAppCaches() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.filter((key) => key.startsWith("phase-log-local")).map((key) => caches.delete(key)));
}

function getBackupInfo(lastBackupAt: string | undefined, trackedRecords: number): BackupInfo {
  if (!trackedRecords) return { lastBackupAt, trackedRecords, level: "ok" };
  if (!lastBackupAt) return { lastBackupAt, trackedRecords, level: trackedRecords >= 10 ? "danger" : "soon" };
  const daysSinceBackup = Math.max(0, Math.floor((Date.now() - new Date(lastBackupAt).getTime()) / 86_400_000));
  const level = daysSinceBackup >= 14 ? "danger" : daysSinceBackup >= 7 || (trackedRecords >= 80 && daysSinceBackup >= 3) ? "soon" : "ok";
  return { lastBackupAt, daysSinceBackup, trackedRecords, level };
}

function backupMessage(info: BackupInfo) {
  if (!info.trackedRecords) return "まだ記録が少ないので、初回バックアップは数日後で大丈夫です。";
  if (!info.lastBackupAt) return `${info.trackedRecords}件の記録があります。初回バックアップを保存しておくと安心です。`;
  const days = info.daysSinceBackup ?? 0;
  if (info.level === "danger") return `最終バックアップから${days}日、記録は${info.trackedRecords}件です。今日JSON保存しておくのが安全です。`;
  if (info.level === "soon") return `最終バックアップから${days}日です。今週中にJSON保存しておくと安心です。`;
  return `最終バックアップから${days}日。今のところ安全圏です。`;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for older iOS/browser permission edge cases.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default App;

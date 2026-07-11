import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent, type ReactNode, type RefObject, type TouchEvent } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Archive,
  BarChart3,
  Beef,
  Bike,
  BicepsFlexed,
  CakeSlice,
  CalendarDays,
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
  Palette,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
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
import flashCheatBackground from "./assets/theme-characters/flash-cheat.jpg";
import flashFailBackground from "./assets/theme-characters/flash-fail.jpg";
import flashHighBackground from "./assets/theme-characters/flash-high.jpg";
import flashHomeBackground from "./assets/theme-characters/flash-home.jpg";
import flashLowBackground from "./assets/theme-characters/flash-low.jpg";
import flashTravelBackground from "./assets/theme-characters/flash-travel.jpg";
import titanCheatBackground from "./assets/theme-characters/titan-cheat.jpg";
import titanFailBackground from "./assets/theme-characters/titan-fail.jpg";
import titanHighBackground from "./assets/theme-characters/titan-high.jpg";
import titanHomeBackground from "./assets/theme-characters/titan-home.jpg";
import titanLowBackground from "./assets/theme-characters/titan-low.jpg";
import titanTravelBackground from "./assets/theme-characters/titan-travel.jpg";
import sageCheatBackground from "./assets/theme-characters/sage-cheat.jpg";
import sageFailBackground from "./assets/theme-characters/sage-fail.jpg";
import sageHighBackground from "./assets/theme-characters/sage-high.jpg";
import sageLowBackground from "./assets/theme-characters/sage-low.jpg";
import sageMidBackground from "./assets/theme-characters/sage-mid.jpg";
import sageTravelBackground from "./assets/theme-characters/sage-travel.jpg";
import voltCheatBackground from "./assets/theme-characters/volt-cheat.jpg";
import voltFailBackground from "./assets/theme-characters/volt-fail.jpg";
import voltHighBackground from "./assets/theme-characters/volt-high.jpg";
import voltLowBackground from "./assets/theme-characters/volt-low.jpg";
import voltMidBackground from "./assets/theme-characters/volt-mid.jpg";
import voltTravelBackground from "./assets/theme-characters/volt-travel.jpg";
import novaCheatBackground from "./assets/theme-characters/nova-cheat.jpg";
import novaFailBackground from "./assets/theme-characters/nova-fail.jpg";
import novaHighBackground from "./assets/theme-characters/nova-high.jpg";
import novaLowBackground from "./assets/theme-characters/nova-low.jpg";
import novaMidBackground from "./assets/theme-characters/nova-mid.jpg";
import novaTravelBackground from "./assets/theme-characters/nova-travel.jpg";
import gritCheatBackground from "./assets/theme-characters/grit-cheat.jpg";
import gritFailBackground from "./assets/theme-characters/grit-fail.jpg";
import gritHighBackground from "./assets/theme-characters/grit-high.jpg";
import gritLowBackground from "./assets/theme-characters/grit-low.jpg";
import gritMidBackground from "./assets/theme-characters/grit-mid.jpg";
import gritTravelBackground from "./assets/theme-characters/grit-travel.jpg";
import aegisCheatBackground from "./assets/theme-characters/aegis-cheat.jpg";
import aegisFailBackground from "./assets/theme-characters/aegis-fail.jpg";
import aegisHighBackground from "./assets/theme-characters/aegis-high.jpg";
import aegisLowBackground from "./assets/theme-characters/aegis-low.jpg";
import aegisMidBackground from "./assets/theme-characters/aegis-mid.jpg";
import aegisTravelBackground from "./assets/theme-characters/aegis-travel.jpg";
import kitsuneCheatBackground from "./assets/theme-characters/kitsune-cheat.jpg";
import kitsuneFailBackground from "./assets/theme-characters/kitsune-fail.jpg";
import kitsuneHighBackground from "./assets/theme-characters/kitsune-high.jpg";
import kitsuneLowBackground from "./assets/theme-characters/kitsune-low.jpg";
import kitsuneMidBackground from "./assets/theme-characters/kitsune-mid.jpg";
import kitsuneTravelBackground from "./assets/theme-characters/kitsune-travel.jpg";
import lumenCheatBackground from "./assets/theme-characters/lumen-cheat.jpg";
import lumenFailBackground from "./assets/theme-characters/lumen-fail.jpg";
import lumenHighBackground from "./assets/theme-characters/lumen-high.jpg";
import lumenLowBackground from "./assets/theme-characters/lumen-low.jpg";
import lumenMidBackground from "./assets/theme-characters/lumen-mid.jpg";
import lumenTravelBackground from "./assets/theme-characters/lumen-travel.jpg";
import koruCheatBackground from "./assets/theme-characters/koru-cheat.jpg";
import koruFailBackground from "./assets/theme-characters/koru-fail.jpg";
import koruHighBackground from "./assets/theme-characters/koru-high.jpg";
import koruLowBackground from "./assets/theme-characters/koru-low.jpg";
import koruMidBackground from "./assets/theme-characters/koru-mid.jpg";
import koruTravelBackground from "./assets/theme-characters/koru-travel.jpg";
import vitoCheatBackground from "./assets/theme-characters/vito-cheat.jpg";
import vitoFailBackground from "./assets/theme-characters/vito-fail.jpg";
import vitoHighBackground from "./assets/theme-characters/vito-high.jpg";
import vitoLowBackground from "./assets/theme-characters/vito-low.jpg";
import vitoMidBackground from "./assets/theme-characters/vito-mid.jpg";
import vitoTravelBackground from "./assets/theme-characters/vito-travel.jpg";
import ariaCheatBackground from "./assets/theme-characters/aria-cheat.jpg";
import ariaFailBackground from "./assets/theme-characters/aria-fail.jpg";
import ariaHighBackground from "./assets/theme-characters/aria-high.jpg";
import ariaLowBackground from "./assets/theme-characters/aria-low.jpg";
import ariaMidBackground from "./assets/theme-characters/aria-mid.jpg";
import ariaTravelBackground from "./assets/theme-characters/aria-travel.jpg";
import type {
  AchievementUnlock,
  ActivityLevel,
  AiReport,
  BackupPayload,
  Confidence,
  DataSource,
  ExercisePreset,
  FoodEntry,
  Goal,
  HomeBodyFatDisplay,
  HomeNutritionRemainingDisplay,
  HomeWeightDisplay,
  MealType,
  MenuItem,
  NutritionMeta,
  NutritionOrigin,
  Phase,
  Profile,
  Settings as AppSettings,
  SpecialModeSettings,
  TemplateExercise,
  ThemeAccent,
  ThemeCharacter,
  ThemeCharacterProgress,
  ThemeCharacterProgressStage,
  ThemeMode,
  WeightLog,
  WorkoutLoadType,
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
import { getDailyNutritionEstimate } from "./lib/nutritionEstimate";

type Tab = "home" | "food" | "workout" | "records" | "settings";
type FoodMode = "search" | "favorite" | "chain" | "quick" | "manual" | "personal" | "recommend" | "ai";
type WorkoutMode = "favorite" | "preset" | "body" | "equipment" | "my" | "search";
type FoodFocus = "todayLog" | "specialMode" | "favorite" | undefined;
type FoodAddStep = "size" | "customSize" | "quantity" | "timing" | "confirm";
type ManualFoodWizardStep = "basic" | "unit" | "purpose" | "category" | "nutrition" | "confirm";
type AiFoodImportStep = "prompt" | "paste" | "read" | "match" | "timing" | "confirm";
type WorkoutFocus = "dateLog" | undefined;
type MyTrainingWizardStep = "method" | "source" | "basic" | "defaults" | "presets" | "confirm";
type SettingsFocus = "ai" | "backup" | "myMenu" | "goal" | undefined;
type SettingsSection = "ai" | "backup" | "goal" | "theme" | "records" | "myMenu" | "myTraining" | "general";
type MyMenuSection = "list" | "method" | "new" | "edit";
type MyTrainingSection = "list";
type GoalSettingsSection = "guided" | "manual" | "custom";
type HistoryGrouping = "day" | "week" | "month";
type ExportSection = "backup" | "logs";
type LogExportStep = "type" | "grouping" | "period" | "output";
type LogExportType = "food" | "workout" | "food_workout";
type LogExportDateTarget = "start" | "end";
type EditableRecordTab = "food" | "workout";
type ThemeCharacterStage = ThemeCharacterProgressStage | "fail" | "cheat" | "travel";
type ThemeCharacterImageSet = Record<ThemeCharacterStage, string>;
type ThemeCharacterImageVariants = Record<string, ThemeCharacterImageSet>;
type ThemeCharacterGroup = "female" | "male" | "other";
const homeBodyFatDisplayLabels: Record<HomeBodyFatDisplay, string> = {
  hidden: "非表示",
  average7: "7日間平均",
  today: "今日の数値",
};
const homeWeightDisplayLabels: Record<HomeWeightDisplay, string> = {
  average7: "7日平均",
  today: "今日の数値",
};
const homeNutritionRemainingDisplayLabels: Record<HomeNutritionRemainingDisplay, string> = {
  recorded: "記録上の残り",
  safe: "余裕をみた残り",
};
const bottomTabs: Tab[] = ["home", "food", "workout", "records", "settings"];
const themeAccentOptions: Array<{ value: ThemeAccent; label: string; colors: [string, string] }> = [
  { value: "classic", label: "クラシック", colors: ["#566e61", "#9fbea9"] },
  { value: "orange", label: "オレンジ", colors: ["#b75a12", "#ff9f32"] },
  { value: "aqua", label: "アクア", colors: ["#2f6f78", "#72bfd0"] },
  { value: "graphite", label: "グラファイト", colors: ["#4d5559", "#a6b0b5"] },
  { value: "crazy_pink", label: "クレイジーピンク", colors: ["#ff2bd6", "#8a2cff"] },
  { value: "crazy_yellow", label: "クレイジーイエロー", colors: ["#f4ff00", "#00ffa8"] },
  { value: "vivid_neon", label: "ビビッドネオン", colors: ["#00e5ff", "#ff2bd6"] },
];
const themeAccentLabels = Object.fromEntries(themeAccentOptions.map((option) => [option.value, option.label])) as Record<ThemeAccent, string>;
function normalizeThemeAccent(value: unknown): ThemeAccent {
  if (value === "ruby") return "orange";
  return themeAccentOptions.some((option) => option.value === value) ? value as ThemeAccent : "classic";
}
const themeCharacterOptions: Array<{ value: ThemeCharacter; label: string; image?: string; group?: ThemeCharacterGroup }> = [
  { value: "none", label: "なし" },
  { value: "sage", label: "SAGE", image: sageMidBackground, group: "female" },
  { value: "volt", label: "VOLT", image: voltMidBackground, group: "female" },
  { value: "nova", label: "NOVA", image: novaMidBackground, group: "female" },
  { value: "aria", label: "ARIA", image: ariaMidBackground, group: "female" },
  { value: "titan", label: "TITAN", image: titanHomeBackground, group: "male" },
  { value: "flash", label: "FLASH", image: flashHomeBackground, group: "male" },
  { value: "grit", label: "GRIT", image: gritMidBackground, group: "male" },
  { value: "aegis", label: "AEGIS", image: aegisMidBackground, group: "male" },
  { value: "lumen", label: "LUMEN", image: lumenMidBackground, group: "male" },
  { value: "koru", label: "KORU", image: koruMidBackground, group: "male" },
  { value: "vito", label: "VITO", image: vitoMidBackground, group: "male" },
  { value: "kitsune", label: "KITSUNE", image: kitsuneMidBackground, group: "other" },
];
const themeCharacterImageVariants: Record<Exclude<ThemeCharacter, "none">, ThemeCharacterImageVariants> = {
  titan: { default: {
    low: titanLowBackground,
    mid: titanHomeBackground,
    high: titanHighBackground,
    fail: titanFailBackground,
    cheat: titanCheatBackground,
    travel: titanTravelBackground,
  } },
  flash: { default: {
    low: flashLowBackground,
    mid: flashHomeBackground,
    high: flashHighBackground,
    fail: flashFailBackground,
    cheat: flashCheatBackground,
    travel: flashTravelBackground,
  } },
  sage: { default: {
    low: sageLowBackground,
    mid: sageMidBackground,
    high: sageHighBackground,
    fail: sageFailBackground,
    cheat: sageCheatBackground,
    travel: sageTravelBackground,
  } },
  volt: { default: {
    low: voltLowBackground,
    mid: voltMidBackground,
    high: voltHighBackground,
    fail: voltFailBackground,
    cheat: voltCheatBackground,
    travel: voltTravelBackground,
  } },
  nova: { default: {
    low: novaLowBackground,
    mid: novaMidBackground,
    high: novaHighBackground,
    fail: novaFailBackground,
    cheat: novaCheatBackground,
    travel: novaTravelBackground,
  } },
  grit: { default: {
    low: gritLowBackground,
    mid: gritMidBackground,
    high: gritHighBackground,
    fail: gritFailBackground,
    cheat: gritCheatBackground,
    travel: gritTravelBackground,
  } },
  aegis: { default: {
    low: aegisLowBackground,
    mid: aegisMidBackground,
    high: aegisHighBackground,
    fail: aegisFailBackground,
    cheat: aegisCheatBackground,
    travel: aegisTravelBackground,
  } },
  kitsune: { default: {
    low: kitsuneLowBackground,
    mid: kitsuneMidBackground,
    high: kitsuneHighBackground,
    fail: kitsuneFailBackground,
    cheat: kitsuneCheatBackground,
    travel: kitsuneTravelBackground,
  } },
  lumen: { default: {
    low: lumenLowBackground,
    mid: lumenMidBackground,
    high: lumenHighBackground,
    fail: lumenFailBackground,
    cheat: lumenCheatBackground,
    travel: lumenTravelBackground,
  } },
  koru: { default: {
    low: koruLowBackground,
    mid: koruMidBackground,
    high: koruHighBackground,
    fail: koruFailBackground,
    cheat: koruCheatBackground,
    travel: koruTravelBackground,
  } },
  vito: { default: {
    low: vitoLowBackground,
    mid: vitoMidBackground,
    high: vitoHighBackground,
    fail: vitoFailBackground,
    cheat: vitoCheatBackground,
    travel: vitoTravelBackground,
  } },
  aria: { default: {
    low: ariaLowBackground,
    mid: ariaMidBackground,
    high: ariaHighBackground,
    fail: ariaFailBackground,
    cheat: ariaCheatBackground,
    travel: ariaTravelBackground,
  } },
};
const themeCharacterLabels = Object.fromEntries(themeCharacterOptions.map((option) => [option.value, option.label])) as Record<ThemeCharacter, string>;
function normalizeThemeCharacter(value: unknown): ThemeCharacter {
  return themeCharacterOptions.some((option) => option.value === value) ? value as ThemeCharacter : "none";
}
function themeCharacterStageFromProgress(progress: number): ThemeCharacterProgressStage {
  if (progress >= 85) return "high";
  if (progress >= 40) return "mid";
  return "low";
}
const themeCharacterProgressStages: ThemeCharacterProgressStage[] = ["low", "mid", "high"];
const themeCharacterStageLabels: Record<ThemeCharacterProgressStage, string> = {
  low: "フェーズ 1",
  mid: "フェーズ 2",
  high: "フェーズ 3",
};
const themeCharacterGroupLabels: Record<ThemeCharacterGroup, string> = {
  female: "女性",
  male: "男性",
  other: "それ以外",
};
function themeCharacterProgressStageIndex(stage: ThemeCharacterProgressStage) {
  return themeCharacterProgressStages.indexOf(stage);
}
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
type LogExportResult = {
  text: string;
  csv: string;
  markdown: string;
  basename: string;
  summary: string;
};
type GoalHelpTopic = "phase" | "activity" | "targetBodyFat";
type AppUpdate = {
  id: string;
  title: string;
  date: string;
  items: string[];
};
type AchievementTone = "starter" | "streak" | "training" | "nutrition" | "system";
type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  tone: AchievementTone;
  hidden?: boolean;
};
type AchievementMetric =
  | "foodEntries"
  | "workouts"
  | "workoutSets"
  | "exerciseVariety"
  | "checkins"
  | "userMenus"
  | "myTrainingExercises"
  | "aiReports"
  | "streak"
  | "prCount"
  | "calorieMasterDays"
  | "proteinDays"
  | "macroBalanceDays"
  | "perfectOverallDays"
  | "perfectCalorieDays"
  | "perfectProteinDays"
  | "perfectFatDays"
  | "perfectCarbDays"
  | "weightGoalDayMoves"
  | "weightGoalAverageMoves";
type AchievementProgressSpec = {
  metric: AchievementMetric;
  target: number;
  unit: string;
  repeatable?: boolean;
};
type AchievementProgress = {
  current: number;
  target: number;
  unit: string;
  repeatable: boolean;
};
type AchievementTarget = {
  achievement: AchievementDefinition;
  progress?: AchievementProgress;
  remaining?: number;
  ratio: number;
  status: string;
};
type AchievementCelebration = {
  id: string;
  title: string;
  description: string;
  count: number;
};
type PortionOption = {
  label: string;
  value: number;
};
type MenuSizeVariant = {
  item: MenuItem;
  label: string;
  baseName: string;
  rank: number;
  groupKey: string;
};
type MenuSizeVariantIndex = {
  variantsByItemId: Map<string, MenuSizeVariant>;
  variantsByGroupKey: Map<string, MenuSizeVariant[]>;
};
type StaplePortionConfig = {
  kind: "rice" | "noodle" | "steak" | "hamburger" | "chicken" | "soup";
  label: string;
  defaultGrams: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
  saltPer100g?: number;
};
type StaplePortionMultipliers = Partial<Record<StaplePortionConfig["kind"], number>>;
type NutritionSnapshot = Pick<MenuItem, "calories" | "protein_g" | "fat_g" | "carbs_g" | "salt_g">;
type WorkoutExerciseDraft = {
  exercise: ExercisePreset;
  sets: number;
  reps: number;
  weight_kg: number;
  load_type?: WorkoutLoadType;
  duration_min: number;
  setSchemeText: string;
};
type MyTrainingDraft = {
  editingExerciseId?: string;
  sourceExerciseId?: string;
  name: string;
  body_part: string;
  equipment_type: string;
  movement_pattern: string;
  machine_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
  load_type?: WorkoutLoadType;
  duration_min: number;
  weight_presets: number[];
  favorite: boolean;
};
type ManualFoodDraft = {
  entry_kind: "meal" | "ingredient";
  name: string;
  brand: string;
  meal_type: MealType;
  category: string;
  subcategory: string;
  ingredient_grams: string;
  calories: string;
  protein_g: string;
  fat_g: string;
  carbs_g: string;
  salt_g: string;
  note: string;
  savePreset: boolean;
  favorite: boolean;
  officialVerified: boolean;
};
type MenuOverwriteTarget = {
  item: MenuItem;
  logAfterSave?: boolean;
  logMultiplier?: number;
  logPortionLabel?: string;
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
type AiFoodBridgeItem = {
  observed_name: string;
  possible_brand?: string;
  possible_menu_name?: string;
  food_type?: string;
  quantity?: string;
  nutrition_estimate: {
    calories: number;
    protein_g: number;
    fat_g: number;
    carbs_g: number;
    salt_g?: number;
  };
  confidence: Confidence;
  nutrition_meta?: NutritionMeta;
  analysis_fingerprint?: string;
  match_keywords: string[];
  needs_confirmation: string[];
  note?: string;
};
type AiFoodMatchCandidate = {
  item: MenuItem;
  score: number;
  reason: string;
};
type AiFoodImportSelection = {
  source: "menu" | "ai_once" | "ai_menu" | "ai_menu_only" | "skip";
  menuItemId?: string;
};
type AiFoodImportIntent = "log" | "menu";
const aiFoodImportMaxTextLength = 60_000;
const aiFoodImportMaxJsonCandidates = 8;
const aiFoodImportMaxItems = 12;
const aiFoodImportMaxKeywords = 12;
const aiFoodImportMaxStringLength = 120;
const aiFoodImportMaxNoteLength = 260;
function menuItemFromAiFoodImportItem(aiItem: AiFoodBridgeItem, timestamp: string, defaultMealType?: MealType): MenuItem {
  // A possible menu name is only a matching hint. Do not save an unverified alias as an official menu name.
  const name = aiItem.observed_name.trim() || "AI推定メニュー";
  const brand = aiItem.possible_brand?.trim() || undefined;
  const nutritionMeta = aiItem.nutrition_meta;
  return {
    id: makeId("menu_user"),
    name,
    brand,
    category: brand ? "チェーン店" : "AI推定",
    tags: unique(["AI写真登録", "AI推定", aiItem.food_type ?? "", brand ?? "", ...aiItem.match_keywords]),
    calories: aiItem.nutrition_estimate.calories,
    protein_g: aiItem.nutrition_estimate.protein_g,
    fat_g: aiItem.nutrition_estimate.fat_g,
    carbs_g: aiItem.nutrition_estimate.carbs_g,
    salt_g: aiItem.nutrition_estimate.salt_g,
    serving_label: aiItem.quantity,
    default_meal_type: defaultMealType,
    data_source: dataSourceFromNutritionMeta(nutritionMeta),
    confidence: nutritionMeta?.nutrient_evidence?.calories?.confidence ?? aiItem.confidence,
    nutrition_meta: nutritionMeta,
    is_public_preset: false,
    is_user_created: true,
    is_favorite: false,
    created_at: timestamp,
    updated_at: timestamp,
  };
}
function userMenuItemCloneFromMenuItem(item: MenuItem, timestamp: string): MenuItem {
  return {
    ...item,
    id: makeId("menu_user"),
    data_source: "user",
    is_public_preset: false,
    is_user_created: true,
    is_favorite: false,
    created_at: timestamp,
    updated_at: timestamp,
  };
}
type PerfectFoodPlan = "meal" | "snack" | "protein" | "none";
type PerfectFoodMode = "fit" | "improve";
type RecommendedFoodFilter = "all" | string;
type PersistedFoodSearchState = Partial<{
  mode: FoodMode;
  query: string;
  brand: string;
  chainCategory: string;
  generalCategory: string;
  recommendCategory: RecommendedFoodFilter;
  showGeneralFoodsOnly: boolean;
  hideOverGoalItems: boolean;
  showFoodBalance: boolean;
  sortFoodByFit: boolean;
}>;
type PerfectFoodSuggestionGroup = {
  label: string;
  items: MenuItem[];
};
type ChainComboMode = "auto" | "main";
type ChainComboCandidate = {
  item: MenuItem;
  role: "main" | "side";
  portionLabel?: string;
  portionMultiplier: number;
  staplePortionMultipliers?: StaplePortionMultipliers;
  nutrition: NutritionSnapshot;
};
type ChainComboSuggestion = {
  id: string;
  title: string;
  reason: string;
  score: number;
  items: ChainComboCandidate[];
  nutrition: NutritionSnapshot;
  remainingAfter: { calories: number; protein: number; fat: number; carbs: number };
};
type SpecialModeDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  foodQuery?: string;
  defaultEnabled: boolean;
  defaultStartDate: string;
  defaultEndDate: string;
};
type ActiveSpecialMode = SpecialModeDefinition & {
  startDate: string;
  endDate: string;
};
type ActivePauseMode = {
  id: string;
  label: string;
  shortLabel: string;
  startDate: string;
  endDate: string;
};

const mealLabels: Record<MealType, string> = {
  breakfast: "朝",
  lunch: "昼",
  dinner: "夜",
  snack: "間食",
  gym_before: "ジム前",
  gym_after: "ジム後",
};

const chainCategories: Record<string, string[]> = {
  "牛丼・丼": ["松屋", "すき家", "吉野家", "なか卯", "こめらく", "天丼てんや"],
  "うどん・そば": ["丸亀製麺", "はなまるうどん", "ウエスト", "資さんうどん"],
  ファストフード: ["マクドナルド", "モスバーガー", "ケンタッキー", "バーガーキング", "サブウェイ", "コストコ"],
  "カレー・弁当": ["CoCo壱番屋", "ほっともっと", "オリジン弁当"],
  "中華・麺": ["リンガーハット", "餃子の王将", "大阪王将", "バーミヤン", "三田製麺所", "舎鈴"],
  和食: ["スシロー", "はま寿司", "トリトン", "北々亭"],
  定食: ["大戸屋", "やよい軒", "しんぱち食堂", "とんでん"],
  ファミレス: ["びっくりドンキー", "ガスト", "ロイヤルホスト", "サイゼリヤ", "オリーブの丘", "デニーズ", "ジョイフル", "ジョナサン", "華屋与兵衛", "藍屋"],
  ステーキ: ["いきなりステーキ", "ペッパーランチ", "感動の肉と米"],
  イタリアン: ["パンチョ", "カプリチョーザ", "マンマパスタ", "ポポラマーマ", "すぱじろう"],
  エスニック: ["モンスーンカフェ"],
  カフェ: ["スターバックス", "ドトール", "タリーズ", "コメダ珈琲"],
  ドーナツ: ["ミスタードーナツ", "クリスピークリーム", "アイムドーナツ"],
  粉物: ["築地銀だこ", "たこ家道頓堀くくる", "道とん堀"],
  コンビニ: ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"],
  居酒屋: [],
  その他: ["佐野PA"],
};

const genericCategories: Record<string, string[]> = {
  "ごはん・丼": ["白米", "おにぎり", "炊き込みご飯", "混ぜご飯", "赤飯", "わかめご飯", "しらすご飯", "チャーハン", "オムライス", "親子丼", "カツ丼", "ネギトロ", "まぐろ", "サーモン", "天丼", "豚丼", "焼肉", "ビビンバ", "クッパ", "カレー", "インドカレー", "インド料理", "寿司"],
  麺類: ["ラーメン", "つけ麺", "油そば", "タンメン", "担々麺", "トッピング", "うどん", "そば", "冷やし", "パスタ", "スパゲティ", "焼きそば", "冷麺"],
  パン: ["サンドイッチ", "トースト", "食パン", "菓子パン", "惣菜パン", "食事パン", "ハード系", "ナン", "ピザ"],
  粉物: ["たこ焼き", "お好み焼き", "もんじゃ", "明石焼", "焼きそば", "そば飯", "イカ焼き"],
  "肉・魚": ["鶏", "豚", "牛肉", "牛豚", "羊肉", "焼肉", "カルビ", "ロース", "ハラミ", "ホルモン", "牛タン", "鮭", "サバ", "サバ缶", "ツナ", "缶詰", "刺身", "卵", "サラダチキン"],
  "サラダ・野菜": ["サラダ", "野菜", "海藻", "チョレギ", "サンチュ", "焼き野菜"],
  "おかず・惣菜": ["納豆", "豆腐", "ご飯のお供", "ふりかけ", "漬物", "佃煮", "明太子", "たらこ", "しらす", "塩昆布", "なめ茸", "唐揚げ", "フライドポテト", "フライドチキン", "チキンナゲット", "ポテト", "副菜", "揚げ物", "惣菜", "おつまみ", "おでん", "もつ煮", "串揚げ", "缶詰", "洋食", "インド料理", "韓国料理", "ナムル", "キムチ"],
  スープ: ["味噌汁", "スープ", "豚汁", "汁物", "ユッケジャン", "おでん", "もつ煮"],
  スイーツ: ["ケーキ", "ドーナツ", "アイス", "和菓子", "焼き菓子", "スナック", "せんべい", "米菓", "チョコ", "グミ", "プリン", "果物", "ヨーグルト", "ギリシャヨーグルト", "高たんぱくヨーグルト", "水切りヨーグルト"],
  ドリンク: ["コーヒー", "カフェラテ", "牛乳", "豆乳", "ジュース", "炭酸", "アルコール"],
  冷凍食品: ["冷凍食品", "市販品", "チャーハン", "ラーメン", "パスタ", "スパゲティ", "うどん", "焼きおにぎり", "唐揚げ", "餃子", "お弁当"],
  コンビニ: ["おにぎり", "弁当", "サンドイッチ", "サラダチキン", "カップ麺", "スイーツ"],
  チェーン店: ["牛丼", "うどん", "定食", "バーガー"],
  プロテイン: ["プロテイン", "プロテインバー", "プロテインドリンク", "プロテインゼリー"],
  自炊: ["白米", "鶏", "卵"],
  居酒屋: ["飲み会", "ビール", "おつまみ", "おでん", "もつ煮", "串揚げ", "焼き鳥", "缶詰"],
  サプリ: ["ビタミン", "ミネラル", "クレアチン", "EAA", "BCAA", "グルタミン", "シトルリン", "プレワークアウト", "その他"],
  その他: ["不明"],
};
const commercialGeneralCategories = new Set(["チェーン店", "コンビニ", "冷凍食品", "プロテイン", "サプリ"]);
const generalFoodCategoryLabels = [...Object.keys(genericCategories).filter((category) => !commercialGeneralCategories.has(category)), "ざっくり"];
const specialModeDefinitions: SpecialModeDefinition[] = [
  {
    id: "hokkaido_trip",
    label: "北海道旅行",
    shortLabel: "HKD",
    foodQuery: "北海道旅行",
    defaultEnabled: false,
    defaultStartDate: "2026-06-24",
    defaultEndDate: "2026-06-28",
  },
];

const emptyManual: ManualFoodDraft = {
  entry_kind: "meal",
  name: "",
  brand: "",
  meal_type: "lunch" as MealType,
  category: "自炊",
  subcategory: "白米",
  ingredient_grams: "100",
  calories: "",
  protein_g: "",
  fat_g: "",
  carbs_g: "",
  salt_g: "",
  note: "",
  savePreset: false,
  favorite: false,
  officialVerified: false,
};

const manualFoodWizardSteps: Array<{ key: ManualFoodWizardStep; label: string }> = [
  { key: "basic", label: "名前" },
  { key: "unit", label: "単位" },
  { key: "purpose", label: "使い方" },
  { key: "category", label: "カテゴリ" },
  { key: "nutrition", label: "栄養値" },
  { key: "confirm", label: "保存" },
];

const oneTimeManualFoodWizardSteps = manualFoodWizardSteps
  .filter((step) => step.key !== "category")
  .map((step) => step.key === "confirm" ? { ...step, label: "記録" } : step);

const settingsManualFoodWizardSteps = manualFoodWizardSteps.filter((step) => step.key !== "purpose");

function manualFoodDraftFromMenuItem(item: MenuItem): ManualFoodDraft {
  const subcategory = item.tags.find((tag) => (genericCategories[item.category] ?? []).includes(tag)) ?? genericCategories[item.category]?.[0] ?? "";
  const weight = typeof item.weight_g === "number" && item.weight_g > 0 ? item.weight_g : undefined;
  const scale = weight ? weight / 100 : 1;
  const formatStored = (value: number) => String(round1(value / scale));
  return {
    ...emptyManual,
    entry_kind: weight ? "ingredient" : "meal",
    name: item.name,
    brand: item.brand ?? "",
    meal_type: item.default_meal_type ?? "lunch",
    category: item.category,
    subcategory,
    ingredient_grams: weight ? String(weight) : emptyManual.ingredient_grams,
    calories: weight ? String(Math.round(item.calories / scale)) : String(item.calories),
    protein_g: formatStored(item.protein_g),
    fat_g: formatStored(item.fat_g),
    carbs_g: formatStored(item.carbs_g),
    salt_g: typeof item.salt_g === "number" ? formatStored(item.salt_g) : "",
    savePreset: true,
    favorite: !!item.is_favorite,
    officialVerified: item.data_source === "official",
  };
}

function myTrainingDraftFromExercise(exercise?: ExercisePreset, overrides: Partial<MyTrainingDraft> = {}): MyTrainingDraft {
  const firstSet = exercise?.default_set_scheme?.[0];
  const isCardio = exercise ? isCardioWorkoutItem(exercise) : false;
  const isBodyweight = exercise ? isBodyweightStrengthItem(exercise) : false;
  const weight = round1(Math.max(0, exercise?.default_weight_kg ?? firstSet?.weight_kg ?? 0));
  const step = exercise ? inferWeightStep(exercise) : 2.5;
  return {
    sourceExerciseId: exercise?.id,
    name: exercise ? `${exercise.name} カスタム` : "",
    body_part: exercise?.body_part ?? "胸",
    equipment_type: exercise?.equipment_type ?? "マシン",
    movement_pattern: exercise?.movement_pattern ?? "custom",
    machine_name: exercise?.machine_name ?? "",
    sets: isCardio ? 1 : Math.min(5, Math.max(1, Math.round(exercise?.default_sets ?? exercise?.default_set_scheme?.length ?? 3))),
    reps: Math.max(0, Math.round(exercise?.default_reps ?? firstSet?.reps ?? (isCardio ? 0 : 10))),
    weight_kg: isBodyweight ? 0 : weight,
    load_type: firstSet?.load_type ?? exercise?.default_set_scheme?.find((set) => set.load_type)?.load_type ?? (isBodyweight ? "bodyweight" : undefined),
    duration_min: Math.max(0, Math.round(exercise?.default_duration_min ?? firstSet?.duration_min ?? 20)),
    weight_presets: defaultWorkoutWeightPresets(weight, step),
    favorite: true,
    ...overrides,
  };
}

function myTrainingDraftFromWorkoutDraft(draft: WorkoutExerciseDraft, presets: number[], overrides: Partial<MyTrainingDraft> = {}): MyTrainingDraft {
  return myTrainingDraftFromExercise(draft.exercise, {
    name: `${draft.exercise.name} カスタム`,
    sets: draft.sets,
    reps: draft.reps,
    weight_kg: draft.weight_kg,
    load_type: draft.load_type,
    duration_min: draft.duration_min,
    weight_presets: presets,
    favorite: true,
    ...overrides,
  });
}

function editableMyTrainingDraftFromExercise(exercise: ExercisePreset, weightPresetStore: Record<string, number[]>): MyTrainingDraft {
  const firstSet = exercise.default_set_scheme?.[0];
  const weight = round1(Math.max(0, exercise.default_weight_kg ?? firstSet?.weight_kg ?? 0));
  const step = inferWeightStep(exercise);
  return myTrainingDraftFromExercise(exercise, {
    editingExerciseId: exercise.id,
    sourceExerciseId: exercise.id,
    name: exercise.name,
    weight_presets: loadWorkoutWeightPresets(workoutWeightPresetKeys(exercise), weight, step, weightPresetStore),
    favorite: !!exercise.is_favorite,
  });
}

function exercisePresetFromMyTrainingDraft(draft: MyTrainingDraft, timestamp: string, existing?: ExercisePreset): ExercisePreset {
  const name = draft.name.trim();
  const bodyPart = draft.body_part.trim() || "その他";
  const equipmentType = draft.equipment_type.trim() || "その他";
  const machineName = draft.machine_name.trim() || undefined;
  const isCardio = bodyPart === "有酸素" || equipmentType === "有酸素";
  const isBodyweight = !isCardio && /自重|自宅/.test(equipmentType);
  const setCount = isCardio ? 1 : Math.min(5, Math.max(1, Math.round(draft.sets)));
  const reps = isCardio ? 0 : Math.max(0, Math.round(draft.reps));
  const loadType = isCardio ? undefined : draft.load_type ?? (isBodyweight ? "bodyweight" : undefined);
  const weightKg = isCardio || loadType === "bodyweight" ? undefined : round1(Math.max(0, draft.weight_kg));
  const durationMin = Math.max(0, Math.round(draft.duration_min));
  return {
    id: existing?.id ?? makeId("exercise_user"),
    name: name || "マイトレ",
    body_part: bodyPart,
    equipment_type: equipmentType,
    movement_pattern: draft.movement_pattern.trim() || "custom",
    machine_name: machineName,
    default_sets: setCount,
    default_reps: isCardio ? undefined : reps,
    default_weight_kg: weightKg,
    default_duration_min: isCardio ? durationMin : undefined,
    default_set_scheme: isCardio
      ? [{ reps: 0, duration_min: durationMin, active_calories: estimateActiveCalories(name, durationMin, 70) }]
      : Array.from({ length: setCount }, () => ({ reps, weight_kg: weightKg, load_type: loadType })),
    is_public_preset: false,
    is_user_created: true,
    is_favorite: draft.favorite,
    preset_pack: existing?.preset_pack ?? (draft.sourceExerciseId ? "my_training_customized" : "my_training"),
    created_at: existing?.created_at ?? timestamp,
    updated_at: timestamp,
  };
}

function settingsGoalDraftFrom(activeGoal?: Goal, profile?: Profile) {
  const isLegacyCustomGoal = activeGoal?.phase === "custom";
  const fallbackTargetDate = addDays(todayAppDate(), 90);
  return {
    phase: activeGoal?.phase ?? ("maintenance" as Phase),
    age: activeGoal?.age ?? 35,
    activity_level: activeGoal?.activity_level ?? ("moderate" as ActivityLevel),
    target_weight_kg: activeGoal?.target_weight_kg ?? profile?.current_weight_kg ?? 70,
    target_body_fat_percentage: activeGoal?.target_body_fat_percentage ?? profile?.body_fat_percentage ?? 0,
    target_date: activeGoal?.target_date ?? fallbackTargetDate,
    manual_target_calories: activeGoal?.manual_target_calories ?? (isLegacyCustomGoal ? activeGoal?.target_calories ?? 0 : 0),
    manual_protein_g: activeGoal?.manual_protein_g ?? (isLegacyCustomGoal ? activeGoal?.target_protein_g ?? 0 : 0),
    manual_fat_g: activeGoal?.manual_fat_g ?? (isLegacyCustomGoal ? activeGoal?.target_fat_g ?? 0 : 0),
    manual_carbs_g: activeGoal?.manual_carbs_g ?? (isLegacyCustomGoal ? activeGoal?.target_carbs_g ?? 0 : 0),
    target_workouts_per_week: activeGoal?.target_workouts_per_week ?? 3,
    target_cardio_sessions_per_week: activeGoal?.target_cardio_sessions_per_week ?? 1,
  };
}
type SettingsGoalDraft = ReturnType<typeof settingsGoalDraftFrom>;

function getSpecialModeSettings(settings?: AppSettings): SpecialModeSettings[] {
  const presetModes = specialModeDefinitions.flatMap((definition) => {
    const saved = settings?.special_modes?.find((mode) => mode.id === definition.id);
    if (saved?.deleted) return [];
    return {
      id: definition.id,
      enabled: saved?.enabled ?? definition.defaultEnabled,
      label: saved?.label ?? definition.label,
      short_label: saved?.short_label ?? definition.shortLabel,
      food_query: saved?.food_query ?? definition.foodQuery,
      start_date: saved?.start_date ?? (saved?.start_month_day ? dateFromMonthDay(definition.defaultStartDate, saved.start_month_day) : definition.defaultStartDate),
      end_date: saved?.end_date ?? (saved?.end_month_day ? dateFromMonthDay(definition.defaultStartDate, saved.end_month_day, saved.start_month_day) : definition.defaultEndDate),
      updated_at: saved?.updated_at,
    };
  });
  const customModes = (settings?.special_modes ?? [])
    .filter((mode) => !mode.deleted && !specialModeDefinitions.some((definition) => definition.id === mode.id))
    .map((mode) => ({
      ...mode,
      label: mode.label ?? "旅行",
      short_label: mode.short_label ?? "TRIP",
    }));
  return [...presetModes, ...customModes];
}

function getActiveSpecialMode(appDate: string, settings: SpecialModeSettings[]): ActiveSpecialMode | undefined {
  return settings
    .map((modeSettings) => {
      if (!modeSettings.enabled) return undefined;
      const definition = specialModeDefinitions.find((item) => item.id === modeSettings.id);
      const startDate = modeSettings.start_date ?? definition?.defaultStartDate;
      const endDate = modeSettings.end_date ?? definition?.defaultEndDate;
      if (!startDate || !endDate || appDate < startDate || appDate > endDate) return undefined;
      return {
        id: modeSettings.id,
        label: modeSettings.label ?? definition?.label ?? "旅行",
        shortLabel: modeSettings.short_label ?? definition?.shortLabel ?? "TRIP",
        foodQuery: modeSettings.food_query ?? definition?.foodQuery,
        defaultEnabled: definition?.defaultEnabled ?? false,
        defaultStartDate: definition?.defaultStartDate ?? startDate,
        defaultEndDate: definition?.defaultEndDate ?? endDate,
        startDate,
        endDate,
      };
    })
    .find(Boolean);
}

function getSpecialModeDaysInRange(start: string, end: string, settings: SpecialModeSettings[]) {
  return dateRange(start, end)
    .map((date) => {
      const mode = settings.find((modeSettings) => {
        if (!modeSettings.enabled) return false;
        const definition = specialModeDefinitions.find((item) => item.id === modeSettings.id);
        const startDate = modeSettings.start_date ?? definition?.defaultStartDate;
        const endDate = modeSettings.end_date ?? definition?.defaultEndDate;
        return !!startDate && !!endDate && date >= startDate && date <= endDate;
      });
      if (!mode) return undefined;
      const definition = specialModeDefinitions.find((item) => item.id === mode.id);
      return { date, label: mode.label ?? definition?.label ?? "旅行", kind: "travel" as const };
    })
    .filter((item): item is { date: string; label: string; kind: "travel" } => !!item);
}

function getPauseModeSettings(settings?: AppSettings): SpecialModeSettings[] {
  return (settings?.pause_modes ?? [])
    .filter((mode) => !mode.deleted)
    .map((mode) => ({
      ...mode,
      label: mode.label ?? "一時停止",
      short_label: mode.short_label ?? "PAUSE",
    }));
}

function getPauseModeDaysInRange(start: string, end: string, settings: SpecialModeSettings[]) {
  return dateRange(start, end)
    .map((date) => {
      const mode = settings.find((modeSettings) => {
        if (!modeSettings.enabled) return false;
        return !!modeSettings.start_date && !!modeSettings.end_date && date >= modeSettings.start_date && date <= modeSettings.end_date;
      });
      return mode ? { date, label: mode.label ?? "一時停止モード", kind: "pause" as const } : undefined;
    })
    .filter((item): item is { date: string; label: string; kind: "pause" } => !!item);
}

function getActivePauseMode(appDate: string, settings: SpecialModeSettings[]): ActivePauseMode | undefined {
  return settings
    .map((mode) => {
      if (!mode.enabled || !mode.start_date || !mode.end_date) return undefined;
      if (appDate < mode.start_date || appDate > mode.end_date) return undefined;
      return {
        id: mode.id,
        label: mode.label ?? "一時停止",
        shortLabel: mode.short_label ?? "PAUSE",
        startDate: mode.start_date,
        endDate: mode.end_date,
      };
    })
    .find(Boolean);
}

function isDeveloperTestModeActive(settings?: AppSettings, now = new Date()) {
  const activeUntil = settings?.developer_test_active_until ? new Date(settings.developer_test_active_until) : undefined;
  return !!activeUntil && activeUntil.getTime() > now.getTime();
}

function getDeveloperTestModeDaysInRange(start: string, end: string, settings?: AppSettings, now = new Date()) {
  if (!isDeveloperTestModeActive(settings, now)) return [];
  const currentDate = todayAppDate(settings?.day_boundary_hour ?? 3, now);
  return currentDate >= start && currentDate <= end ? [{ date: currentDate, label: "テストモード", isTest: true, kind: "test" as const }] : [];
}

function isStandalonePwa() {
  return (
    (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(display-mode: standalone)").matches) ||
    (typeof navigator !== "undefined" && !!(navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function dateFromMonthDay(referenceDate: string, monthDay: string, startMonthDay?: string) {
  const year = Number(referenceDate.slice(0, 4));
  const nextYear = startMonthDay && monthDay < startMonthDay;
  return `${year + (nextYear ? 1 : 0)}-${monthDay}`;
}

const backupStorageKey = "phase-log-last-backup-at";
const updateSeenStorageKey = "phase-log-seen-update-id";
const foodFitFilterSeenStorageKey = "phase-log-food-fit-filter-seen-2026-06-14";
const foodSearchStateStorageKey = "phase-log-food-search-state-2026-06-19";
const foodMyMenuIntroSeenStorageKey = "phase-log-my-menu-unified-intro-seen-2026-06-17";
const workoutWeightPresetStorageKey = "phase-log-workout-weight-presets";
const cheatDayStorageKey = "phase-log-cheat-day-dates";
const dismissedRecordReminderStorageKey = "phase-log-dismissed-record-reminders";
const themeCharacterVisibilityStorageKey = "phase-log-theme-character-visible";
const staleAppPromptDelayMs = 6 * 60 * 60 * 1000;
const weightStepOptions = [1, 2.5, 5, 10];
const finisherPulseIntensity = "finisher_pulse";
const finisherPulseNote = "仕上げパルス（部分可動域・素早く）";
const persistedFoodModes = new Set<FoodMode>(["search", "favorite", "chain", "quick", "personal", "recommend"]);

function readPersistedFoodSearchState(): PersistedFoodSearchState {
  try {
    const raw = localStorage.getItem(foodSearchStateStorageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PersistedFoodSearchState;
    if (!parsed || typeof parsed !== "object") return {};
    const mode = parsed.mode && persistedFoodModes.has(parsed.mode) ? parsed.mode : undefined;
    const chainCategory = typeof parsed.chainCategory === "string" && chainCategories[parsed.chainCategory] ? parsed.chainCategory : undefined;
    const brand = typeof parsed.brand === "string" ? parsed.brand : undefined;
    return {
      mode,
      query: typeof parsed.query === "string" ? parsed.query : undefined,
      brand: brand && (!chainCategory || chainCategories[chainCategory]?.includes(brand)) ? brand : undefined,
      chainCategory,
      generalCategory: typeof parsed.generalCategory === "string" && generalFoodCategoryLabels.includes(parsed.generalCategory) ? parsed.generalCategory : undefined,
      recommendCategory: typeof parsed.recommendCategory === "string" ? parsed.recommendCategory : undefined,
      showGeneralFoodsOnly: typeof parsed.showGeneralFoodsOnly === "boolean" ? parsed.showGeneralFoodsOnly : undefined,
      hideOverGoalItems: typeof parsed.hideOverGoalItems === "boolean" ? parsed.hideOverGoalItems : undefined,
      showFoodBalance: typeof parsed.showFoodBalance === "boolean" ? parsed.showFoodBalance : undefined,
      sortFoodByFit: typeof parsed.sortFoodByFit === "boolean" ? parsed.sortFoodByFit : undefined,
    };
  } catch {
    return {};
  }
}
const achievementDefinitions: AchievementDefinition[] = [
  { id: "first_open", title: "はじめの一歩", description: "アプリを開いた", tone: "starter" },
  { id: "first_goal", title: "目標セット", description: "初めてゴールを設定した", tone: "starter" },
  { id: "first_food", title: "食卓の記録者", description: "食事を1件記録した", tone: "nutrition" },
  { id: "first_checkin", title: "朝の測定士", description: "体重・体脂肪を記録した", tone: "starter" },
  { id: "first_workout", title: "鉄の門を叩く者", description: "ワークアウトを1件記録した", tone: "training" },
  { id: "first_my_menu", title: "マイメニュー職人", description: "初めてマイメニューを登録した", tone: "nutrition" },
  { id: "first_my_training", title: "マイトレ職人", description: "初めてマイトレを登録した", tone: "training" },
  { id: "first_ai_report", title: "AI相談デビュー", description: "AI相談レポートを生成した", tone: "system" },
  { id: "used_ai_photo", title: "AI写真デビュー", description: "AI写真登録を使った", tone: "system" },
  { id: "used_food_search", title: "検索デビュー", description: "フード検索を使った", tone: "system" },
  { id: "used_perfect_food", title: "ぴったり探し", description: "ぴったりフードを使った", tone: "system" },
  { id: "used_food_filter", title: "フィルター入門", description: "フード検索フィルターを試した", tone: "system" },
  { id: "edited_past_record", title: "過去ログ修正", description: "過去の日付の記録編集に入った", tone: "system" },
  { id: "goal_updated", title: "作戦会議", description: "ゴール設定を更新した", tone: "system" },
  { id: "food_3", title: "食卓メモの芽", description: "食事を3件記録した", tone: "nutrition" },
  { id: "food_10", title: "食卓の地図", description: "食事を10件記録した", tone: "nutrition" },
  { id: "food_25", title: "食のアーカイブ", description: "食事を25件記録した", tone: "nutrition" },
  { id: "food_50", title: "献立クロニクル", description: "食事を50件記録した", tone: "nutrition" },
  { id: "food_100", title: "百食の書", description: "食事を100件記録した", tone: "nutrition" },
  { id: "food_300", title: "食卓年代記", description: "食事を300件記録した", tone: "nutrition" },
  { id: "calorie_master_1", title: "カロリーマスター", description: "カロリーを超えずに1日を終えた", tone: "nutrition" },
  { id: "calorie_master_3", title: "熱量の見習い", description: "カロリー内で終えた日が3日ある", tone: "nutrition" },
  { id: "calorie_master_7", title: "熱量の番人", description: "カロリー内で終えた日が7日ある", tone: "nutrition" },
  { id: "calorie_master_14", title: "熱量の守護者", description: "カロリー内で終えた日が14日ある", tone: "nutrition" },
  { id: "calorie_master_30", title: "熱量の賢者", description: "カロリー内で終えた日が30日ある", tone: "nutrition" },
  { id: "protein_day", title: "たんぱく質の目覚め", description: "たんぱく質目標の90%以上を記録した日がある", tone: "nutrition" },
  { id: "protein_days_3", title: "筋肉への補給路", description: "たんぱく質目標90%以上の日が3日ある", tone: "nutrition" },
  { id: "protein_days_7", title: "プロテインルーティン", description: "たんぱく質目標90%以上の日が7日ある", tone: "nutrition" },
  { id: "protein_days_14", title: "補給線の守り手", description: "たんぱく質目標90%以上の日が14日ある", tone: "nutrition" },
  { id: "protein_days_30", title: "プロテインマスター", description: "たんぱく質目標90%以上の日が30日ある", tone: "nutrition" },
  { id: "macro_balance_1", title: "三色の調律", description: "Pを満たし、F/Cを大きく超えずに1日を終えた", tone: "nutrition" },
  { id: "macro_balance_3", title: "栄養のコンパス", description: "PFCバランス達成日が3日ある", tone: "nutrition" },
  { id: "macro_balance_7", title: "マクロの守り手", description: "PFCバランス達成日が7日ある", tone: "nutrition" },
  { id: "macro_balance_14", title: "栄養錬成術師", description: "PFCバランス達成日が14日ある", tone: "nutrition" },
  { id: "macro_balance_30", title: "マクロマスター", description: "PFCバランス達成日が30日ある", tone: "nutrition" },
  { id: "perfect_overall", title: "ピタリ賞・総合", description: "kcal/P/F/Cをすべて目標ぴったりで記録した", tone: "nutrition" },
  { id: "perfect_calorie", title: "kcalピタリ賞", description: "摂取カロリーを目標ぴったりで記録した", tone: "nutrition" },
  { id: "perfect_protein", title: "Pピタリ賞", description: "たんぱく質を目標ぴったりで記録した", tone: "nutrition" },
  { id: "perfect_fat", title: "Fピタリ賞", description: "脂質を目標ぴったりで記録した", tone: "nutrition" },
  { id: "perfect_carb", title: "Cピタリ賞", description: "炭水化物を目標ぴったりで記録した", tone: "nutrition" },
  { id: "workout_3", title: "鍛錬の火種", description: "ワークアウトを3回記録した", tone: "training" },
  { id: "workout_10", title: "十戦の鍛錬者", description: "ワークアウトを10回記録した", tone: "training" },
  { id: "workout_30", title: "月間ファイター", description: "ワークアウトを30回記録した", tone: "training" },
  { id: "workout_50", title: "鉄を積む者", description: "ワークアウトを50回記録した", tone: "training" },
  { id: "workout_100", title: "百練の戦士", description: "ワークアウトを100回記録した", tone: "training" },
  { id: "workout_sets_30", title: "セット職人見習い", description: "累計30セット記録した", tone: "training" },
  { id: "workout_sets_100", title: "百セット職人", description: "累計100セット記録した", tone: "training" },
  { id: "workout_sets_500", title: "セットの錬金術師", description: "累計500セット記録した", tone: "training" },
  { id: "workout_sets_1000", title: "千セットの覇者", description: "累計1000セット記録した", tone: "training" },
  { id: "exercise_variety_3", title: "種目の旅人", description: "3種類の種目を記録した", tone: "training" },
  { id: "exercise_variety_5", title: "種目ハンター", description: "5種類の種目を記録した", tone: "training" },
  { id: "exercise_variety_15", title: "フォームコレクター", description: "15種類の種目を記録した", tone: "training" },
  { id: "exercise_variety_30", title: "全身攻略者", description: "30種類の種目を記録した", tone: "training" },
  { id: "workout_pr", title: "記録更新", description: "筋トレの自己記録を更新した", tone: "training" },
  { id: "workout_pr_5", title: "PRハンター5", description: "自己記録更新を5回達成した", tone: "training" },
  { id: "workout_pr_10", title: "PRハンター10", description: "自己記録更新を10回達成した", tone: "training" },
  { id: "workout_pr_25", title: "PRハンター25", description: "自己記録更新を25回達成した", tone: "training" },
  { id: "weekly_workout_goal", title: "週の試練クリア", description: "週の筋トレ目標を達成した", tone: "training" },
  { id: "checkin_3", title: "測定の芽", description: "チェックインを3回記録した", tone: "starter" },
  { id: "checkin_7", title: "スケールの友", description: "チェックインを7回記録した", tone: "starter" },
  { id: "checkin_30", title: "月間観測者", description: "チェックインを30回記録した", tone: "starter" },
  { id: "checkin_100", title: "百日の観測者", description: "チェックインを100回記録した", tone: "starter" },
  { id: "weight_goal_day_1", title: "針が動いた", description: "前回比で目標方向に体重が動いた", tone: "starter" },
  { id: "weight_goal_day_3", title: "軌道修正者", description: "前回比で目標方向に動いた日が3回ある", tone: "starter" },
  { id: "weight_goal_day_7", title: "体重の航路", description: "前回比で目標方向に動いた日が7回ある", tone: "starter" },
  { id: "weight_goal_avg_1", title: "平均の風向き", description: "7日平均体重が目標方向に動いた", tone: "streak" },
  { id: "weight_goal_avg_3", title: "トレンド乗り", description: "7日平均体重が目標方向に動いた回数が3回ある", tone: "streak" },
  { id: "weight_goal_avg_7", title: "流れを掴む者", description: "7日平均体重が目標方向に動いた回数が7回ある", tone: "streak" },
  { id: "my_menu_5", title: "私設食堂", description: "マイメニューを5件登録した", tone: "system" },
  { id: "my_menu_20", title: "マイメニュー工房", description: "マイメニューを20件登録した", tone: "system" },
  { id: "my_training_5", title: "種目アレンジャー", description: "マイトレを5件登録した", tone: "training" },
  { id: "ai_report_5", title: "相談室の常連", description: "AI相談レポートを5回生成した", tone: "system" },
  { id: "ai_report_20", title: "参謀会議", description: "AI相談レポートを20回生成した", tone: "system" },
  { id: "streak_3", title: "三日の灯火", description: "3日連続で何かを記録した", tone: "streak" },
  { id: "streak_7", title: "七日間の旅路", description: "7日連続で記録した", tone: "streak" },
  { id: "streak_14", title: "2週間の流れ", description: "14日連続で記録した", tone: "streak" },
  { id: "streak_30", title: "月の巡礼者", description: "30日連続で記録した", tone: "streak" },
  { id: "streak_45", title: "45日のリズム", description: "45日連続で記録した", tone: "streak" },
  { id: "streak_60", title: "習慣の守護者", description: "60日連続で記録した", tone: "streak" },
  { id: "streak_75", title: "75日の巡航", description: "75日連続で記録した", tone: "streak" },
  { id: "streak_100", title: "百日のレジェンド", description: "100日連続で記録した", tone: "streak" },
  { id: "streak_150", title: "百五十日の軌跡", description: "150日連続で記録した", tone: "streak" },
  { id: "streak_365", title: "一年の王冠", description: "365日連続で記録した", tone: "streak" },
];
const achievementProgressSpecs: Record<string, AchievementProgressSpec> = {
  food_3: { metric: "foodEntries", target: 3, unit: "件" },
  food_10: { metric: "foodEntries", target: 10, unit: "件" },
  food_25: { metric: "foodEntries", target: 25, unit: "件" },
  food_50: { metric: "foodEntries", target: 50, unit: "件" },
  food_100: { metric: "foodEntries", target: 100, unit: "件" },
  food_300: { metric: "foodEntries", target: 300, unit: "件" },
  calorie_master_1: { metric: "calorieMasterDays", target: 1, unit: "日", repeatable: true },
  calorie_master_3: { metric: "calorieMasterDays", target: 3, unit: "日" },
  calorie_master_7: { metric: "calorieMasterDays", target: 7, unit: "日" },
  calorie_master_14: { metric: "calorieMasterDays", target: 14, unit: "日" },
  calorie_master_30: { metric: "calorieMasterDays", target: 30, unit: "日" },
  protein_day: { metric: "proteinDays", target: 1, unit: "日", repeatable: true },
  protein_days_3: { metric: "proteinDays", target: 3, unit: "日" },
  protein_days_7: { metric: "proteinDays", target: 7, unit: "日" },
  protein_days_14: { metric: "proteinDays", target: 14, unit: "日" },
  protein_days_30: { metric: "proteinDays", target: 30, unit: "日" },
  macro_balance_1: { metric: "macroBalanceDays", target: 1, unit: "日", repeatable: true },
  macro_balance_3: { metric: "macroBalanceDays", target: 3, unit: "日" },
  macro_balance_7: { metric: "macroBalanceDays", target: 7, unit: "日" },
  macro_balance_14: { metric: "macroBalanceDays", target: 14, unit: "日" },
  macro_balance_30: { metric: "macroBalanceDays", target: 30, unit: "日" },
  perfect_overall: { metric: "perfectOverallDays", target: 1, unit: "日", repeatable: true },
  perfect_calorie: { metric: "perfectCalorieDays", target: 1, unit: "日", repeatable: true },
  perfect_protein: { metric: "perfectProteinDays", target: 1, unit: "日", repeatable: true },
  perfect_fat: { metric: "perfectFatDays", target: 1, unit: "日", repeatable: true },
  perfect_carb: { metric: "perfectCarbDays", target: 1, unit: "日", repeatable: true },
  workout_3: { metric: "workouts", target: 3, unit: "回" },
  workout_10: { metric: "workouts", target: 10, unit: "回" },
  workout_30: { metric: "workouts", target: 30, unit: "回" },
  workout_50: { metric: "workouts", target: 50, unit: "回" },
  workout_100: { metric: "workouts", target: 100, unit: "回" },
  workout_sets_30: { metric: "workoutSets", target: 30, unit: "セット" },
  workout_sets_100: { metric: "workoutSets", target: 100, unit: "セット" },
  workout_sets_500: { metric: "workoutSets", target: 500, unit: "セット" },
  workout_sets_1000: { metric: "workoutSets", target: 1000, unit: "セット" },
  exercise_variety_3: { metric: "exerciseVariety", target: 3, unit: "種目" },
  exercise_variety_5: { metric: "exerciseVariety", target: 5, unit: "種目" },
  exercise_variety_15: { metric: "exerciseVariety", target: 15, unit: "種目" },
  exercise_variety_30: { metric: "exerciseVariety", target: 30, unit: "種目" },
  workout_pr: { metric: "prCount", target: 1, unit: "回", repeatable: true },
  workout_pr_5: { metric: "prCount", target: 5, unit: "回" },
  workout_pr_10: { metric: "prCount", target: 10, unit: "回" },
  workout_pr_25: { metric: "prCount", target: 25, unit: "回" },
  checkin_3: { metric: "checkins", target: 3, unit: "回" },
  checkin_7: { metric: "checkins", target: 7, unit: "回" },
  checkin_30: { metric: "checkins", target: 30, unit: "回" },
  checkin_100: { metric: "checkins", target: 100, unit: "回" },
  weight_goal_day_1: { metric: "weightGoalDayMoves", target: 1, unit: "回", repeatable: true },
  weight_goal_day_3: { metric: "weightGoalDayMoves", target: 3, unit: "回" },
  weight_goal_day_7: { metric: "weightGoalDayMoves", target: 7, unit: "回" },
  weight_goal_avg_1: { metric: "weightGoalAverageMoves", target: 1, unit: "回", repeatable: true },
  weight_goal_avg_3: { metric: "weightGoalAverageMoves", target: 3, unit: "回" },
  weight_goal_avg_7: { metric: "weightGoalAverageMoves", target: 7, unit: "回" },
  my_menu_5: { metric: "userMenus", target: 5, unit: "件" },
  my_menu_20: { metric: "userMenus", target: 20, unit: "件" },
  my_training_5: { metric: "myTrainingExercises", target: 5, unit: "件" },
  ai_report_5: { metric: "aiReports", target: 5, unit: "回" },
  ai_report_20: { metric: "aiReports", target: 20, unit: "回" },
  streak_3: { metric: "streak", target: 3, unit: "日" },
  streak_7: { metric: "streak", target: 7, unit: "日" },
  streak_14: { metric: "streak", target: 14, unit: "日" },
  streak_30: { metric: "streak", target: 30, unit: "日" },
  streak_45: { metric: "streak", target: 45, unit: "日" },
  streak_60: { metric: "streak", target: 60, unit: "日" },
  streak_75: { metric: "streak", target: 75, unit: "日" },
  streak_100: { metric: "streak", target: 100, unit: "日" },
  streak_150: { metric: "streak", target: 150, unit: "日" },
  streak_365: { metric: "streak", target: 365, unit: "日" },
};
const appUpdates: AppUpdate[] = [
  {
    id: "2026-07-10-home-remaining-display",
    title: "Homeの残り表示を選択可能に",
    date: "2026-07-10",
    items: [
      "ヒーローカードのギアから、記録上の残りと、推定値の幅を差し引いた残りを選べるようにしました。",
      "選んだ残りに合わせて、ヒーローカードのkcal、進捗バー、背景の進み具合を揃えました。",
      "Pは不足を注意・達成以上を良好、FとCは超過を注意としてPFCピルの色分けを戻しました。",
    ],
  },
  {
    id: "2026-07-10-ai-photo-review-flow",
    title: "AI写真登録の確認手順を改善",
    date: "2026-07-10",
    items: [
      "AIのコードを読み取った後に、品目数と読み取ったメニューを最初に確認できるようにしました。",
      "品目ごとに登録済みメニューの候補を確認し、候補にない場合だけ記録方法を選ぶ流れに変更しました。",
      "未確認の候補が自動で選ばれないようにし、複数品目を1件ずつ確認してから保存するようにしました。",
    ],
  },
  {
    id: "2026-07-10-home-guidance",
    title: "Homeの表示と案内を改善",
    date: "2026-07-10",
    items: [
      "チェックインから、Homeに表示する体重と体脂肪率を選べるようにしました。",
      "ゴールを確認する時は、現在のカロリーとPFCを先に確認してから編集へ進めるようにしました。",
      "推定値を含む日の表示と、設定画面などの説明を分かりやすく見直しました。",
    ],
  },
  {
    id: "2026-07-10-estimate-aware-nutrition",
    title: "推定値を含む日の判断を改善",
    date: "2026-07-10",
    items: [
      "採用した栄養値はそのままに、推定値を含む日は記録上の残りと安全側の追加目安を分けて確認できるようにしました。",
      "AI写真登録の形式を拡張し、栄養値の根拠と推定幅を引き継げるようにしました。従来形式の貼り付けにも対応しています。",
      "ぴったりフード、Foodのおすすめ、チェーンの組み合わせ、AI相談レポートで推定カロリー比率と安全側の残りを考慮します。",
    ],
  },
  {
    id: "2026-07-10-trophy-guide",
    title: "トロフィー攻略を追加",
    date: "2026-07-10",
    items: [
      "トロフィー一覧に、次に狙えるトロフィーを表示する攻略セクションを追加しました。",
      "各トロフィーをタップすると、条件、現在の進捗、あと何が必要かを確認できる詳細画面を開けるようにしました。",
      "更新内容からすぐトロフィー攻略を開ける導線を追加しました。",
    ],
  },
  {
    id: "2026-06-18-my-training-achievements",
    title: "マイトレ登録とトロフィーを追加",
    date: "2026-06-18",
    items: [
      "WorkoutとSettingsにマイトレ管理を追加し、狙い方やジム差分を別名の種目として登録・編集できるようにしました。",
      "AI写真登録やマイトレ登録など、新機能を試した時のトロフィーを追加しました。",
      "連続記録トロフィーに45日・75日・150日・365日の節目を追加しました。",
    ],
  },
  {
    id: "2026-06-17-ai-photo-food-import",
    title: "FoodにAI写真登録を追加",
    date: "2026-06-17",
    items: [
      "Foodタブに控えめなレインボーのAI写真ボタンを追加し、AI用プロンプトのコピー、JSON貼り付け、既存メニュー照合、確認保存の4ステップで記録できるようにしました。",
      "履歴ボタンを廃止し、直近10件はマイメニュー画面の中からすぐ再記録できるようにしました。",
    ],
  },
  {
    id: "2026-06-17-bikkuri-donkey-menu-seeds",
    title: "びっくりドンキーのメニューを追加",
    date: "2026-06-17",
    items: [
      "公式メニューで確認できたびっくりドンキーのディッシュ、ステーキ、サイド、ランチ、モーニング系メニューを追加しました。",
      "栄養値は推定値として扱い、検索やファミレスのチェーン一覧から呼び出せるようにしました。",
    ],
  },
  {
    id: "2026-06-17-pancho-menu-seeds",
    title: "パンチョのメニューを追加",
    date: "2026-06-17",
    items: [
      "公式注文メニューで確認できたパンチョのナポリタン、ミートソース、別格メニューをサイズ別に追加しました。",
      "栄養値は推定値として扱い、検索やイタリアンのチェーン一覧から呼び出せるようにしました。",
    ],
  },
  {
    id: "2026-06-17-food-menu-edit-variants",
    title: "Foodメニュー編集を改善",
    date: "2026-06-17",
    items: [
      "検索結果の鉛筆ボタンから、非公式・推定メニューの編集フォームが正しく開くようにしました。",
      "上書き編集時に、元メニューを残したまま別メニューとして保存できるようにしました。",
    ],
  },
  {
    id: "2026-06-17-settings-export-logs",
    title: "Settingsのエクスポートを拡張",
    date: "2026-06-17",
    items: [
      "Settingsのバックアップ項目をエクスポートに名称変更し、バックアップJSONとログ出力を階層化しました。",
      "食事ログ、ワークアウトログ、両方のログを日別・週別・月別でカレンダー指定し、テキストコピー、CSV保存、MD保存できるようにしました。",
    ],
  },
  {
    id: "2026-06-17-special-card-confetti-layout",
    title: "Home演出の表示を調整",
    date: "2026-06-17",
    items: [
      "旅行モードのヒーローカード背景が角丸からはみ出さないようにしました。",
      "トロフィー獲得や記録更新時の紙吹雪を、実績カードの近くから飛ぶ位置に調整しました。",
    ],
  },
  {
    id: "2026-06-17-100-percent-tracker-brand",
    title: "アプリ名とアイコンを変更",
    date: "2026-06-17",
    items: [
      "アプリ名を「100% トラッカー」に変更しました。",
      "ファビコンとホーム画面用アイコンを、100%モチーフのスポーティーなデザインに変更しました。",
    ],
  },
  {
    id: "2026-06-17-exception-pfc-bars",
    title: "例外日のHome表示を調整",
    date: "2026-06-17",
    items: [
      "チートデーや旅行モード中もHomeヒーローのPFC上ステータスバーを表示し、常に100%の流れるレインボー表示にしました。",
      "一時停止モード中は同じステータスバーを100%幅のグレー表示にし、停止中だと分かるようにしました。",
    ],
  },
  {
    id: "2026-06-17-confetti-burst",
    title: "アンロック演出を調整",
    date: "2026-06-17",
    items: [
      "トロフィー獲得や記録更新時の紙吹雪を、上から落ちる演出から下から放射状に飛ぶクラッカー風に変更しました。",
    ],
  },
  {
    id: "2026-06-17-bottom-nav-motion",
    title: "下部ナビの操作感を調整",
    date: "2026-06-17",
    items: [
      "下部ナビでタブを切り替えた時、選択中のガラスハイライトが横に移動するようにしました。",
      "ナビアイコンをタップした時に軽く反応するアニメーションを追加しました。",
      "ナビバーの透明度を上げ、選択中のアイコンをテーマカラーで見分けやすくしました。",
    ],
  },
  {
    id: "2026-06-17-food-history-mode",
    title: "Foodの履歴入力を追加",
    date: "2026-06-17",
    items: [
      "Foodのカテゴリボタンを履歴に置き換え、過去30件の食事ログで使ったメニューを最近順に呼び出せるようにしました。",
      "HomeからFoodを開いた時にRecent候補を自動表示しないようにしました。",
    ],
  },
  {
    id: "2026-06-17-exception-day-streak-bridge",
    title: "例外日のストリーク判定を調整",
    date: "2026-06-17",
    items: [
      "チートデーや旅行モードの日は、記録がなくても連続記録トロフィーのストリークが途切れないようにしました。",
    ],
  },
  {
    id: "2026-06-17-food-my-menu-recommend",
    title: "Foodの登録導線を整理",
    date: "2026-06-17",
    items: [
      "Foodのマニュアル登録をマイメニューに統合し、保存するか今回だけ記録するかを選べるようにしました。",
      "Foodにおすすめタブを追加し、残り栄養値に合う候補をカテゴリで絞って表示できるようにしました。",
      "ぴったりフードを目的選択から始める形に変更し、候補ごとに食べた後の余裕や不足が分かるようにしました。",
    ],
  },
  {
    id: "2026-06-16-settings-my-menu-wizard",
    title: "マイメニュー設定を整理",
    date: "2026-06-16",
    items: [
      "Settingsのマイメニューを、登録済み一覧と新規登録に分けて開けるようにしました。",
      "新規マイメニュー登録を、名前・単位・カテゴリ・栄養値・保存確認の手順に分けました。",
      "旅行、一時停止、チートデー中はHomeの目標カロリーとPFC数値を評価外として隠すようにしました。",
    ],
  },
  {
    id: "2026-06-16-ios-pwa-edge-swipe",
    title: "iOSホーム画面版の戻るスワイプを修正",
    date: "2026-06-16",
    items: [
      "iPhoneのホーム画面に追加したWebアプリで、Home画面を右スワイプした時にSafariのエラー画面へ戻ることがある問題を抑止しました。",
    ],
  },
  {
    id: "2026-06-16-settings-hierarchy-pause",
    title: "Settingsを階層化",
    date: "2026-06-16",
    items: [
      "SettingsをAI相談、エクスポート、ゴール設定、記録設定、マイメニュー、一般に分けました。",
      "HomeからAI相談やエクスポート、ゴール設定へ移動する導線は、そのまま該当画面を直接開くようにしました。",
      "一時停止モードを記録設定に追加し、AIレポートに休養期間として含めるようにしました。",
      "一時停止期間は、連続記録トロフィーのストリークを途切れさせないようにしました。",
      "登録済みマイメニューを一覧から編集できるようにしました。",
    ],
  },
  {
    id: "2026-06-16-achievement-progress",
    title: "トロフィー進捗を強化",
    date: "2026-06-16",
    items: [
      "カロリーマスターやPFCなど、複数回達成できるトロフィーに累計回数を表示するようにしました。",
      "未獲得トロフィーに、あと何日・何回で達成できるかを表示しました。",
      "体重ゴールに合わせて、前回比や7日平均が目標方向に動いた時のトロフィーを追加しました。",
      "始めたてでも達成しやすい3回・3日・25件などの中間トロフィーを追加しました。",
    ],
  },
  {
    id: "2026-06-16-trophy-achievements",
    title: "トロフィーを追加",
    date: "2026-06-16",
    items: [
      "Home右上にトロフィーボタンを追加しました。",
      "初めての食事・運動・AI相談に加えて、食事回数、カロリー管理、PFC、運動回数、セット数、PR、連続記録の段階実績を追加しました。",
      "フード検索、ぴったりフード、検索フィルター、過去ログ編集など、便利な動線を試した時のトロフィーを追加しました。",
      "テストモード中は獲得済みトロフィーの演出を一覧から再生できます。",
      "トロフィー獲得時は紙吹雪つきの通知から一覧へ移動できます。",
    ],
  },
  {
    id: "2026-06-16-food-add-step-modal",
    title: "食事追加の流れを整理",
    date: "2026-06-16",
    items: [
      "食事メニューの追加画面を、サイズ・個数・食べたタイミング・確認のステップ式にしました。",
      "食べたタイミングにジム前・ジム後を追加しました。",
      "最後にkcal/P/F/Cを確認してから記録できるようにしました。",
    ],
  },
  {
    id: "2026-06-15-record-reminder-banner",
    title: "記録リマインダーを追加",
    date: "2026-06-15",
    items: [
      "Homeに朝・昼・夜の記録リマインダーバナーを追加しました。",
      "指定時間を過ぎても食事記録がない場合、次にアプリを開いた時に記録を促します。",
      "Homeの食事・ワークアウト記録ボタンを同じ幅に揃え、小さい画面でも改行しにくくしました。",
    ],
  },
  {
    id: "2026-06-15-walk-cardio-home-label",
    title: "散歩を有酸素に追加",
    date: "2026-06-15",
    items: [
      "Homeの「筋トレを記録」を「ワークアウトを記録」に変更しました。",
      "有酸素メニューに散歩を追加し、ゆっくり・普通・早歩きから選べるようにしました。",
      "散歩は分数で記録でき、強度に応じた消費カロリーを推定します。",
    ],
  },
  {
    id: "2026-06-15-goal-override-name-settings",
    title: "ゴール設定の見た目を整理",
    date: "2026-06-15",
    items: [
      "目標kcal/P/F/Cの上書き設定を、ゴール設定内の専用モーダルに移動しました。",
      "上書きモーダル内で、kcal/P/F/Cそれぞれを自動計算に戻せるボタンを追加しました。",
      "Settings下部から、AI相談レポートに含めるユーザー名を変更できるようにしました。",
    ],
  },
  {
    id: "2026-06-15-goal-setup-help",
    title: "ゴール設定の案内を追加",
    date: "2026-06-15",
    items: [
      "Homeのゴール設定案内を、目標達成期間と目標体脂肪率の新設が分かる内容に変更しました。",
      "Settingsのフェーズ、運動強度、目標体脂肪率にヘルプを追加し、迷った時に設定の考え方を確認できるようにしました。",
      "目標体脂肪率は分からなければ未指定でもよいこと、AI相談で目安を聞けることを案内するようにしました。",
    ],
  },
  {
    id: "2026-06-15-ai-report-weight-period-reference",
    title: "AIレポートの体重評価を7日平均対応に",
    date: "2026-06-15",
    items: [
      "AI相談レポートに、最新体重基準と7日平均基準の目標体重差分を追加しました。",
      "期間補正の参考値を最新体重基準と7日平均基準で分けて表示し、フェーズ別にどちらを重視するか分かるようにしました。",
      "カスタムkcal/PFCがある場合、期間補正をさらに上乗せせず、現在の目標値を最終目標として扱うようレポートに明記しました。",
    ],
  },
  {
    id: "2026-06-15-ai-report-phase-weight-alcohol",
    title: "AIレポートとお酒メニューを調整",
    date: "2026-06-15",
    items: [
      "AI相談レポートの体組成補足を、減量・リコンプ・バルクなどフェーズに合わせた文言にしました。",
      "日別AIレポートの体重トレンドは、対象日までの最新値と直近7日平均を表示するようにしました。",
      "ビール、日本酒、焼酎、ワイン、サワー、カクテルなどのお酒メニューを、杯・合・mlが分かる形で追加しました。",
    ],
  },
  {
    id: "2026-06-15-ai-report-body-composition-current-comparison",
    title: "AIレポートの体組成目標表示を調整",
    date: "2026-06-15",
    items: [
      "AI相談レポートの体組成目標を、不足/超過ではなく現在比の必要変化として表示するようにしました。",
      "体組成目標に、現在推定・目標・必要変化とリコンプ向けの補足説明を追加しました。",
      "目標kcal/P/F/Cが手動上書きされている場合、カスタム設定であることをAIレポートに明記するようにしました。",
    ],
  },
  {
    id: "2026-06-15-goal-body-fat-target",
    title: "目標体脂肪率を追加",
    date: "2026-06-15",
    items: [
      "ゴール設定とオンボーディングで目標体脂肪率を設定できるようにしました。",
      "目標体重・目標体脂肪率から体脂肪量と除脂肪量の変化を計算し、プレビューに表示します。",
      "AI相談レポートに目標体脂肪率と体組成の目標差分を含め、リコンプやバルクの判断材料にできるようにしました。",
    ],
  },
  {
    id: "2026-06-15-past-edit-glow-performance",
    title: "過去日編集の表示と一覧処理を調整",
    date: "2026-06-15",
    items: [
      "過去日編集中の画面外枠を、UIに馴染む黄色グローに調整しました。",
      "食事検索、Home集計、Workout、Historyの一部一覧計算をメモ化し、記録やメニューが増えても不要な再計算を抑えるようにしました。",
    ],
  },
  {
    id: "2026-06-15-past-edit-frame-home-history",
    title: "過去日編集とHomeの記録導線を調整",
    date: "2026-06-15",
    items: [
      "過去日を編集中は画面外枠を黄色で囲み、通常モードではないことをわかりやすくしました。",
      "Homeの今日の記録カードで、食事行は食事履歴へ、筋トレ行はワークアウト履歴へ直接移動できるようにしました。",
    ],
  },
  {
    id: "2026-06-15-goal-target-period",
    title: "目標期間をカロリー計算に反映",
    date: "2026-06-15",
    items: [
      "目標体重と目標達成日から、減量・増量どちらも日次カロリー補正を自動計算するようにしました。",
      "既存ユーザーにはHomeで目標期間の設定を促すバナーを表示します。",
      "手動でkcal/P/F/Cを設定している場合は、その値を上書きせずに目標期間だけ保存できます。",
      "AI相談レポートに目標体重・目標達成日・期間補正を含め、AI側で妥当性を判断しやすくしました。",
    ],
  },
  {
    id: "2026-06-14-food-recommend-badge-zoom-edge-back",
    title: "おすすめ表示と入力中の拡大を調整",
    date: "2026-06-14",
    items: [
      "Food検索の残り栄養素おすすめ順で、上位候補に順位バッジと区切りを表示するようにしました。",
      "iPhoneで入力後に画面が拡大したまま戻らない問題を起きにくくしました。",
      "左端からのスワイプで、直前に開いていたアプリ内タブへ戻れるようにしました。",
    ],
  },
  {
    id: "2026-06-14-goal-custom-general-food-filter",
    title: "ゴール上書き保存と一般メニュー検索を修正",
    date: "2026-06-14",
    items: [
      "ゴール設定のカスタムkcal/P/F/Cが再編集時に抜けないようにしました。",
      "Foodタブの検索フィルターに、一般メニューのみで検索するオプションを追加しました。",
    ],
  },
  {
    id: "2026-06-14-food-chain-recommend-sort",
    title: "チェーン・コンビニメニューのおすすめ順を追加",
    date: "2026-06-14",
    items: [
      "Foodタブの検索フィルターに、残り栄養素に合うメニューを上位表示するオプションを追加しました。",
      "チェーン店やコンビニメニューを見る時に、P不足とF/C/kcal超過を見ながら選びやすくしました。",
    ],
  },
  {
    id: "2026-06-14-oikos-greek-yogurt",
    title: "オイコスとギリシャヨーグルトを探しやすく",
    date: "2026-06-14",
    items: [
      "オイコスのヨーグルト類をギリシャヨーグルト・高たんぱくヨーグルトでも検索しやすくしました。",
      "一般メニューに脂肪0、加糖、はちみつ、ベリー、グラノーラなどのギリシャヨーグルト系を追加しました。",
    ],
  },
  {
    id: "2026-06-14-chain-scoped-food-search",
    title: "チェーン店内検索を追加",
    date: "2026-06-14",
    items: [
      "Foodタブでチェーン店を選んだあと、そのチェーンのメニューだけを検索できるようにしました。",
    ],
  },
  {
    id: "2026-06-14-michitas-drink",
    title: "明治MICHITASドリンクを追加",
    date: "2026-06-14",
    items: [
      "市販品メニューに明治MICHITAS カップ 乳酸菌飲料風味を追加しました。",
    ],
  },
  {
    id: "2026-06-14-takikomi-rice-gohan-no-otomo",
    title: "炊き込みご飯とご飯のお供を追加",
    date: "2026-06-14",
    items: [
      "五目・鶏ごぼう・きのこ・たけのこなど、一般メニューに炊き込みご飯と混ぜご飯を追加しました。",
      "鮭フレーク、明太子、塩昆布、なめ茸、ふりかけ、漬物などのご飯のお供を追加しました。",
    ],
  },
  {
    id: "2026-06-14-ingredient-grams-meibalance",
    title: "材料のグラム記録とメイバランスを追加",
    date: "2026-06-14",
    items: [
      "マニュアル入力で材料(g)モードを選び、鶏むね肉などをグラム指定で記録できるようにしました。",
      "材料(g)モードでは100gあたりの栄養値から、使用量に合わせてkcal/P/F/Cを自動換算します。",
      "明治メイバランスMini、ぎゅっとMini、ソフトJellyを公式栄養値で追加しました。",
    ],
  },
  {
    id: "2026-06-14-royalhost-konamono-menus",
    title: "ロイヤルホスト・粉物メニューを追加",
    date: "2026-06-14",
    items: [
      "ロイヤルホストのグランドメニューを追加しました。",
      "一般メニューに粉物カテゴリを追加し、たこ焼き・お好み焼き・もんじゃ・焼きそば系を増やしました。",
      "銀だこ、くくる、道とん堀をチェーンの粉物カテゴリから選べるようにしました。",
    ],
  },
  {
    id: "2026-06-14-tonden-hottomotto-menus",
    title: "とんでん・ほっともっとを追加",
    date: "2026-06-14",
    items: [
      "ほっともっとの弁当、丼、幕の内、カレー、おかず系メニューを公式栄養値で追加しました。",
      "とんでんの和食メニューを公式メニュー確認の推定値として追加しました。",
      "チェーンの定食カテゴリから、とんでんを選べるようにしました。",
    ],
  },
  {
    id: "2026-06-14-light-theme-floating-cards",
    title: "ライトテーマの見た目を調整",
    date: "2026-06-14",
    items: [
      "日付まわりだけ淡いグラデーションを残し、下の背景は白ベースにしました。",
      "全タブのカード、ボタン、下部ナビが白い面から浮いて見えるよう影と境界線を調整しました。",
    ],
  },
  {
    id: "2026-06-14-komeraku-korean-oikos",
    title: "こめらく・韓国系・ヨーグルト商品を追加",
    date: "2026-06-14",
    items: [
      "こめらくのおひつごはん、お茶漬け膳、海鮮ごはん、手作りおむすびを追加しました。",
      "スンドゥブ、チヂミ、トッポギなど韓国系の一般メニューを増やしました。",
      "オイコスのヨーグルトとプロテインドリンクを公式栄養値ベースで追加しました。",
    ],
  },
  {
    id: "2026-06-14-protein-products-expanded",
    title: "プロテイン商品を拡充",
    date: "2026-06-14",
    items: [
      "ザバスのプロテインドリンクとプロテインバーを追加しました。",
      "オイコスのプロテインシェイクを推定値で追加しました。",
      "森永inバーの複数フレーバーを公式栄養値ベースで追加しました。",
    ],
  },
  {
    id: "2026-06-14-onboarding-readability-layout",
    title: "初回設定と表示の読みやすさを改善",
    date: "2026-06-14",
    items: [
      "オンボーディングを1画面1質問の流れに戻し、目標や運動量の説明を追加しました。",
      "数値入力を手入力とプラス/マイナスのどちらでも調整できるようにし、入力中に0を消せるようにしました。",
      "ダークモードのフォームやカードのコントラストを上げ、PCやタブレット横向きでも中央に読みやすく収まるよう調整しました。",
    ],
  },
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
      "設定の100% トラッカー情報に、更新内容だけを開くリンクを追加しました。",
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
  const [aiReports, setAiReports] = useState<AiReport[]>([]);
  const [tab, setTab] = useState<Tab>(() => (localStorage.getItem("phase-log-tab") as Tab) || "home");
  const [foodFocus, setFoodFocus] = useState<FoodFocus>();
  const [workoutFocus, setWorkoutFocus] = useState<WorkoutFocus>();
  const [settingsFocus, setSettingsFocus] = useState<SettingsFocus>();
  const [lastBackupAt, setLastBackupAt] = useState<string | undefined>(() => localStorage.getItem(backupStorageKey) || undefined);
  const [seenUpdateId, setSeenUpdateId] = useState<string | undefined>(() => localStorage.getItem(updateSeenStorageKey) || undefined);
  const [cheatDayDates, setCheatDayDates] = useState<string[]>(() => loadCheatDayDates());
  const [dismissedRecordReminderIds, setDismissedRecordReminderIds] = useState<string[]>(() => loadDismissedRecordReminders());
  const [isUpdateNotesOpen, setIsUpdateNotesOpen] = useState(false);
  const [showStaleAppPrompt, setShowStaleAppPrompt] = useState(false);
  const [isHeaderReloading, setIsHeaderReloading] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [selectedAppDate, setSelectedAppDate] = useState<string>();
  const [isThemeCharacterVisible, setIsThemeCharacterVisible] = useState(true);
  const [themePowerTapCount, setThemePowerTapCount] = useState(0);
  const [isThemePowerFlash, setIsThemePowerFlash] = useState(false);
  const [toast, setToast] = useState<{ id: string; text: string }>();
  const [prCelebration, setPrCelebration] = useState<WorkoutPrCelebration>();
  const [achievementCelebration, setAchievementCelebration] = useState<AchievementCelebration>();
  const [pendingAchievementIds, setPendingAchievementIds] = useState<string[]>([]);
  const [isTrophyOpen, setIsTrophyOpen] = useState(false);
  const [prefersDarkTheme, setPrefersDarkTheme] = useState(() => (
    typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches
  ));
  const toastTimerRef = useRef<number | undefined>(undefined);
  const prCelebrationTimerRef = useRef<number | undefined>(undefined);
  const achievementCelebrationTimerRef = useRef<number | undefined>(undefined);
  const appOpenedAtRef = useRef(Date.now());
  const tabHistoryRef = useRef<Tab[]>([]);
  const lastTabRef = useRef(tab);
  const achievementFlushTabRef = useRef(tab);
  const suppressTabHistoryRef = useRef(false);
  const edgeSwipeStartRef = useRef<{ x: number; y: number; startedAt: number } | undefined>(undefined);
  const recordCountsRef = useRef({ food: 0, weight: 0, workout: 0, report: 0 });
  const actualAppDate = todayAppDate(settings?.day_boundary_hour ?? 3, currentTime);
  const appDate = selectedAppDate ?? actualAppDate;
  const isEditingPastDate = appDate !== actualAppDate;
  const activeGoal = goals.find((goal) => goal.is_active);
  const latestUpdate = appUpdates[0];
  const themeMode = settings?.theme_mode ?? "system";
  const themeAccent = normalizeThemeAccent(settings?.theme_accent);
  const themeCharacter = normalizeThemeCharacter(settings?.theme_character);
  const themeCharacterVariant = settings?.theme_character_variant ?? "default";
  const activeThemeCharacterImages = themeCharacter === "none"
    ? undefined
    : themeCharacterImageVariants[themeCharacter][themeCharacterVariant] ?? themeCharacterImageVariants[themeCharacter].default;
  const resolvedTheme: "light" | "dark" = themeMode === "system" ? (prefersDarkTheme ? "dark" : "light") : themeMode;
  const shellTheme = themeCharacter !== "none" ? "dark" : resolvedTheme;
  const specialModeSettings = useMemo(() => getSpecialModeSettings(settings), [settings]);
  const pauseModeSettings = useMemo(() => getPauseModeSettings(settings), [settings]);
  const activeSpecialMode = useMemo(() => getActiveSpecialMode(appDate, specialModeSettings), [appDate, specialModeSettings]);
  const activePauseMode = useMemo(() => getActivePauseMode(appDate, pauseModeSettings), [appDate, pauseModeSettings]);
  const isDeveloperTestMode = useMemo(() => isDeveloperTestModeActive(settings, currentTime), [settings?.developer_test_active_until, currentTime]);
  const shouldForceTrophyAnimation = isDeveloperTestMode && !!settings?.developer_force_trophy_animation;
  const developerProgressPercent = isDeveloperTestMode ? settings?.developer_progress_percent : undefined;
  const openSpecialFoodMode = () => {
    if (!activeSpecialMode?.foodQuery) return;
    setSettingsFocus(undefined);
    setWorkoutFocus(undefined);
    setFoodFocus("specialMode");
    setTab("food");
  };

  const refresh = async () => {
    const [nextSettings, nextProfile, nextGoals, nextMenu, rawFood, nextWeights, nextExercises, nextTemplates, nextSessions, nextWorkoutExercises, nextSets, nextReports] =
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
        db.ai_reports.toArray(),
      ]);
    const repairedFoodResult = repairExactSizeVariantFoodEntries(rawFood, nextMenu);
    if (repairedFoodResult.updates.length) {
      await Promise.all(repairedFoodResult.updates.map(({ id, patch }) => db.food_entries.update(id, patch)));
    }
    const nextFood = repairedFoodResult.entries;
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
    setAiReports(nextReports);
  };

  useEffect(() => {
    initializeSeeds().then(refresh);
  }, []);

  useEffect(() => {
    localStorage.setItem("phase-log-tab", tab);
  }, [tab]);

  useEffect(() => {
    if (!isStandalonePwa() || !window.history?.pushState) return;
    const guardState = { phaseLogPwaHistoryGuard: true };
    window.history.replaceState({ ...(window.history.state ?? {}), phaseLogPwaRoot: true }, "", window.location.href);
    window.history.pushState(guardState, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(guardState, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const previous = lastTabRef.current;
    if (previous === tab) return;
    if (suppressTabHistoryRef.current) {
      suppressTabHistoryRef.current = false;
    } else {
      tabHistoryRef.current = [...tabHistoryRef.current, previous].slice(-8);
    }
    lastTabRef.current = tab;
  }, [tab]);

  useEffect(() => {
    const isBlockedTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return true;
      return Boolean(target.closest("input, select, textarea, button, a, [role='button'], [draggable='true']"));
    };
    const hasBlockingOverlay = () => Boolean(document.querySelector(".fixed.inset-0"));
    const handleTouchStart = (event: globalThis.TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || touch.clientX > 18 || isBlockedTarget(event.target) || hasBlockingOverlay()) {
        edgeSwipeStartRef.current = undefined;
        return;
      }
      edgeSwipeStartRef.current = { x: touch.clientX, y: touch.clientY, startedAt: Date.now() };
    };
    const handleTouchMove = (event: globalThis.TouchEvent) => {
      const start = edgeSwipeStartRef.current;
      const touch = event.touches[0];
      if (!start || !touch) return;
      const dx = touch.clientX - start.x;
      const dy = Math.abs(touch.clientY - start.y);
      if (dy > 18 && dy > Math.abs(dx)) {
        edgeSwipeStartRef.current = undefined;
        return;
      }
      if (dx > 8 && dy < 32 && event.cancelable) {
        event.preventDefault();
      }
    };
    const handleTouchEnd = (event: globalThis.TouchEvent) => {
      const start = edgeSwipeStartRef.current;
      edgeSwipeStartRef.current = undefined;
      const touch = event.changedTouches[0];
      if (!start || !touch) return;
      const dx = touch.clientX - start.x;
      const dy = Math.abs(touch.clientY - start.y);
      const elapsed = Date.now() - start.startedAt;
      if (dx < 76 || dy > 52 || elapsed > 800) return;
      const previousTab = tabHistoryRef.current.pop();
      if (!previousTab || previousTab === lastTabRef.current) return;
      suppressTabHistoryRef.current = true;
      setSettingsFocus(undefined);
      setFoodFocus(undefined);
      setTab(previousTab);
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

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
    const themeColor = resolvedTheme === "dark" ? "#000000" : "#ffffff";
    root.dataset.theme = resolvedTheme;
    root.dataset.accent = themeAccent;
    root.style.colorScheme = resolvedTheme;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      if (!meta.media) meta.content = themeColor;
    });
    document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute(
      "content",
      resolvedTheme === "dark" ? "black-translucent" : "default",
    );
  }, [resolvedTheme, themeAccent]);

  useEffect(() => {
    if (themeCharacter === "none") {
      setIsThemeCharacterVisible(true);
      return;
    }
    setIsThemeCharacterVisible(localStorage.getItem(`${themeCharacterVisibilityStorageKey}-${themeCharacter}`) !== "0");
  }, [themeCharacter]);

  useEffect(() => {
    if (!activeThemeCharacterImages) return;
    Object.values(activeThemeCharacterImages).forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
  }, [activeThemeCharacterImages]);

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

  const todayEntries = useMemo(() => foodEntries.filter((entry) => entry.app_date === appDate), [foodEntries, appDate]);
  const todayWorkouts = useMemo(() => workoutSessions.filter((session) => session.app_date === appDate), [workoutSessions, appDate]);
  const latestWeight = weightLogs.at(-1);
  const dayTotals = useMemo(() => sumFood(todayEntries), [todayEntries]);
  const target = useMemo(() => activeGoal ?? defaultGoal(profile), [activeGoal, profile]);
  const needsGoalTargetPeriod = !!activeGoal && (!activeGoal.target_date || typeof activeGoal.target_body_fat_percentage !== "number");
  const isCheatDay = cheatDayDates.includes(appDate);
  const isSpecialModeDay = !!activeSpecialMode;
  const isPauseModeDay = !!activePauseMode;
  const isExceptionDay = isCheatDay || isSpecialModeDay || isPauseModeDay;
  const homeCharacterEstimate = useMemo(
    () => getDailyNutritionEstimate(todayEntries, dayTotals, target, menuItems),
    [todayEntries, dayTotals.calories, dayTotals.protein, dayTotals.fat, dayTotals.carbs, target, menuItems],
  );
  const homeCharacterRemaining = settings?.home_nutrition_remaining_display === "safe"
    ? homeCharacterEstimate.safeRemaining
    : homeCharacterEstimate.adoptedRemaining;
  const homeCharacterProgress = isExceptionDay
    ? 100
    : typeof developerProgressPercent === "number"
      ? Math.max(0, Math.min(100, developerProgressPercent))
      : target?.target_calories
        ? Math.max(0, Math.min(100, Math.round(((target.target_calories - homeCharacterRemaining.calories) / target.target_calories) * 100)))
        : 0;
  const normalThemeCharacterStage = themeCharacterStageFromProgress(homeCharacterProgress);
  const isThemeCharacterFailure = !isExceptionDay && (
    (typeof developerProgressPercent === "number" && developerProgressPercent > 100)
    || (!!target?.target_calories && dayTotals.calories > target.target_calories)
  );
  const storedThemeCharacterStage = themeCharacter !== "none" && settings?.theme_character_progress?.app_date === appDate
    ? settings.theme_character_progress.unlocked_stages?.[themeCharacter]
    : undefined;
  const unlockedThemeCharacterStage = storedThemeCharacterStage && themeCharacterProgressStages.includes(storedThemeCharacterStage)
    ? storedThemeCharacterStage
    : "low";
  const displayedThemeCharacterProgressStage = isEditingPastDate
    ? normalThemeCharacterStage
    : themeCharacterProgressStages[Math.min(
      themeCharacterProgressStageIndex(unlockedThemeCharacterStage),
      themeCharacterProgressStageIndex(normalThemeCharacterStage),
    )];
  const hasThemePowerUnlock = themeCharacter !== "none"
    && isThemeCharacterVisible
    && !isEditingPastDate
    && !isExceptionDay
    && !isThemeCharacterFailure
    && themeCharacterProgressStageIndex(normalThemeCharacterStage) > themeCharacterProgressStageIndex(displayedThemeCharacterProgressStage);
  const nextThemeCharacterStage = hasThemePowerUnlock
    ? themeCharacterProgressStages[themeCharacterProgressStageIndex(displayedThemeCharacterProgressStage) + 1]
    : undefined;
  const themeCharacterStage: ThemeCharacterStage = isCheatDay
    ? "cheat"
    : activeSpecialMode
      ? "travel"
      : isThemeCharacterFailure
        ? "fail"
        : displayedThemeCharacterProgressStage;
  const themeCharacterImage = themeCharacter === "none" || !isThemeCharacterVisible
    ? undefined
    : activeThemeCharacterImages?.[themeCharacterStage];
  useEffect(() => {
    setThemePowerTapCount(0);
    setIsThemePowerFlash(false);
  }, [appDate, hasThemePowerUnlock, normalThemeCharacterStage, themeCharacter]);
  const unseenAchievementCount = useMemo(() => {
    const viewedAt = settings?.achievements_viewed_at ?? "";
    return (settings?.achievements ?? []).filter((achievement) => (
      achievement.unlocked_at.slice(0, 10) === actualAppDate && achievement.unlocked_at > viewedAt
    )).length;
  }, [actualAppDate, settings?.achievements, settings?.achievements_viewed_at]);
  const targetCalories = target?.target_calories ?? 0;
  const homeTone = isCheatDay
    ? "cheat"
    : isSpecialModeDay
      ? "special"
    : targetCalories <= 0
    ? "neutral"
    : dayTotals.calories > targetCalories
      ? "over"
      : targetCalories - dayTotals.calories <= 100
        ? "on-track"
        : "under";
  const backupInfo = useMemo(() => getBackupInfo(lastBackupAt, foodEntries.length + weightLogs.length + workoutSessions.length + workoutSets.length), [lastBackupAt, foodEntries.length, weightLogs.length, workoutSessions.length, workoutSets.length]);
  const weeklyWorkoutStatus = useMemo(() => getWeeklyWorkoutStatus(target, workoutSessions, workoutExercises, appDate), [target, workoutSessions, workoutExercises, appDate]);
  const recordReminder = useMemo(() => getRecordReminder({
    appDate,
    actualAppDate,
    currentTime,
    todayEntries,
    dismissedIds: dismissedRecordReminderIds,
  }), [actualAppDate, appDate, currentTime, dismissedRecordReminderIds, todayEntries]);
  const achievementSnapshot = useMemo(() => getAchievementSnapshot({
    profile,
    goals,
    menuItems,
    exercisePresets,
    foodEntries,
    weightLogs,
    workoutSessions,
    workoutExercises,
    workoutSets,
    weeklyWorkoutStatus,
    aiReports,
    goal: target,
    cheatDayDates,
    specialModeSettings,
    pauseModeSettings,
    currentAppDate: actualAppDate,
  }), [
    profile?.current_weight_kg,
    goals.length,
    menuItems.length,
    exercisePresets.length,
    foodEntries.length,
    weightLogs.length,
    workoutSessions.length,
    workoutExercises.length,
    workoutSets.length,
    weeklyWorkoutStatus.strengthDone,
    weeklyWorkoutStatus.strengthTarget,
    aiReports.length,
    target?.target_weight_kg,
    target?.target_protein_g,
    target?.target_fat_g,
    target?.target_carbs_g,
    target?.target_calories,
    cheatDayDates,
    specialModeSettings,
    pauseModeSettings,
    actualAppDate,
  ]);
  const achievementProgress = useMemo(() => buildAchievementProgress(achievementSnapshot.counts), [achievementSnapshot]);

  useEffect(() => {
    if (!settings?.onboarding_completed) return;
    void unlockAchievements(achievementSnapshot.ids, true, achievementSnapshot.counts);
  }, [
    settings?.onboarding_completed,
    settings?.achievements?.length,
    achievementSnapshot,
  ]);

  useEffect(() => {
    const previousTab = achievementFlushTabRef.current;
    const nextCounts = {
      food: foodEntries.length,
      weight: weightLogs.length,
      workout: workoutSessions.length,
      report: aiReports.length,
    };
    const previous = recordCountsRef.current;
    const didRecordIncrease = (
      nextCounts.food > previous.food ||
      nextCounts.weight > previous.weight ||
      nextCounts.workout > previous.workout ||
      nextCounts.report > previous.report
    );
    recordCountsRef.current = nextCounts;
    achievementFlushTabRef.current = tab;
    if (!pendingAchievementIds.length || achievementCelebration) return;
    if ((previousTab !== "home" && tab === "home") || didRecordIncrease) flushPendingAchievement();
  }, [tab, pendingAchievementIds.length, achievementCelebration, foodEntries.length, weightLogs.length, workoutSessions.length, aiReports.length]);

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
  const showAchievementCelebration = (definition: AchievementDefinition, count = 1) => {
    if (achievementCelebrationTimerRef.current) window.clearTimeout(achievementCelebrationTimerRef.current);
    setAchievementCelebration({
      id: definition.id,
      title: definition.title,
      description: definition.description,
      count,
    });
    achievementCelebrationTimerRef.current = window.setTimeout(() => setAchievementCelebration(undefined), 5200);
  };
  const unlockAchievements = async (ids: string[], announce = true, counts: Record<string, number> = {}) => {
    if (!settings) return [];
    const knownIds = new Set(achievementDefinitions.map((achievement) => achievement.id));
    const current = settings.achievements ?? [];
    const currentIds = new Set(current.map((achievement) => achievement.id));
    const freshIds = unique(ids).filter((id) => knownIds.has(id) && !currentIds.has(id));
    const currentWithCounts = current.map((achievement) => {
      const nextCount = counts[achievement.id];
      if (!nextCount) return achievement;
      const currentCount = achievement.count ?? 1;
      return nextCount > currentCount ? { ...achievement, count: nextCount } : achievement;
    });
    const didUpdateCounts = currentWithCounts.some((achievement, index) => achievement !== current[index]);
    if (!freshIds.length) {
      if (didUpdateCounts) {
        const timestamp = nowIso();
        await db.settings.update("local", { achievements: currentWithCounts, updated_at: timestamp });
        setSettings({ ...settings, achievements: currentWithCounts, updated_at: timestamp });
      }
      if (announce && shouldForceTrophyAnimation) {
        const replayId = unique(ids).find((id) => knownIds.has(id));
        const definition = replayId ? achievementDefinition(replayId) : undefined;
        if (definition) showAchievementCelebration(definition);
      }
      return [];
    }
    const timestamp = nowIso();
    const nextAchievements: AchievementUnlock[] = [
      ...currentWithCounts,
      ...freshIds.map((id) => ({ id, unlocked_at: timestamp, count: counts[id] || 1 })),
    ];
    await db.settings.update("local", { achievements: nextAchievements, updated_at: timestamp });
    setSettings({ ...settings, achievements: nextAchievements, updated_at: timestamp });
    if (announce) {
      const definition = achievementDefinition(freshIds[0]);
      if (definition) {
        showAchievementCelebration(definition, freshIds.length);
      }
    }
    return freshIds;
  };
  const unlockAchievementLater = (id: string) => {
    void unlockAchievements([id], false).then((freshIds) => {
      if (!freshIds.length && !shouldForceTrophyAnimation) return;
      setPendingAchievementIds((current) => unique([...current, id]));
    });
  };
  const flushPendingAchievement = () => {
    setPendingAchievementIds((current) => {
      const [nextId, ...rest] = current;
      if (!nextId || achievementCelebration) return current;
      const definition = achievementDefinition(nextId);
      if (definition) showAchievementCelebration(definition);
      return rest;
    });
  };
  const showWorkoutPrCelebration = (celebration: Omit<WorkoutPrCelebration, "id">) => {
    if (prCelebrationTimerRef.current) window.clearTimeout(prCelebrationTimerRef.current);
    setPrCelebration({ id: makeId("pr"), ...celebration });
    prCelebrationTimerRef.current = window.setTimeout(() => setPrCelebration(undefined), 3200);
    void unlockAchievements(["workout_pr"]);
  };
  const openTrophies = async () => {
    setIsTrophyOpen(true);
    if (!settings || !unseenAchievementCount) return;
    const timestamp = nowIso();
    await db.settings.update("local", { achievements_viewed_at: timestamp, updated_at: timestamp });
    setSettings({ ...settings, achievements_viewed_at: timestamp, updated_at: timestamp });
  };
  const unlockAllAchievements = async () => {
    if (!settings) return;
    const timestamp = nowIso();
    const existingById = new Map((settings.achievements ?? []).map((achievement) => [achievement.id, achievement]));
    const nextAchievements = achievementDefinitions.map((definition) => {
      const existing = existingById.get(definition.id);
      const progress = achievementProgress[definition.id];
      const count = Math.max(existing?.count ?? 1, progress?.current ?? 1);
      return {
        id: definition.id,
        unlocked_at: existing?.unlocked_at ?? timestamp,
        count,
      };
    });
    await db.settings.update("local", { achievements: nextAchievements, updated_at: timestamp });
    setSettings({ ...settings, achievements: nextAchievements, updated_at: timestamp });
    const firstLocked = achievementDefinitions.find((definition) => !existingById.has(definition.id));
    if (firstLocked) showAchievementCelebration(firstLocked, achievementDefinitions.length);
    showToast("トロフィーを全アンロックしました");
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
  const dismissRecordReminder = (id: string) => {
    setDismissedRecordReminderIds((current) => {
      const next = current.includes(id) ? current : [...current, id].slice(-60);
      localStorage.setItem(dismissedRecordReminderStorageKey, JSON.stringify(next));
      return next;
    });
  };
  const editRecordDate = (date: string, targetTab: EditableRecordTab) => {
    setSelectedAppDate(date === actualAppDate ? undefined : date);
    setSettingsFocus(undefined);
    setFoodFocus(targetTab === "food" ? "todayLog" : undefined);
    setWorkoutFocus(targetTab === "workout" ? "dateLog" : undefined);
    setTab(targetTab);
    if (date !== actualAppDate) unlockAchievementLater("edited_past_record");
    showToast(`${formatJapaneseDate(date)}を編集します`);
  };

  useEffect(() => () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    if (achievementCelebrationTimerRef.current) window.clearTimeout(achievementCelebrationTimerRef.current);
  }, []);

  const homeDateTitle = formatHomeDateParts(appDate);
  const canToggleThemeCharacter = themeCharacter !== "none";
  const themeCharacterToggleLabel = isThemeCharacterVisible ? "テーマキャラを非表示" : "テーマキャラを表示";
  const headerTitle = {
    home: "",
    food: "Food",
    workout: "Workout",
    records: "History",
    settings: "Settings",
  }[tab];
  const bottomTabIndex = bottomTabs.indexOf(tab);
  const bottomTabGlowX = `${12.5 + bottomTabIndex * 18.75}%`;
  const headerSubtext = tab === "home" ? "今日の記録" : formatJapaneseDate(appDate);
  const statusWeight = latestWeight?.weight_kg ?? profile?.current_weight_kg;
  const scrollCurrentTabToTop = () => {
    const prefersReducedMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    window.requestAnimationFrame(() => {
      const scroller = document.scrollingElement ?? document.documentElement;
      scroller.scrollTo({ top: 0, behavior });
    });
  };
  const selectBottomTab = (nextTab: Tab) => {
    setSettingsFocus(undefined);
    setFoodFocus(undefined);
    setWorkoutFocus(undefined);
    if (nextTab === tab) {
      scrollCurrentTabToTop();
      return;
    }
    setTab(nextTab);
  };
  const handleBottomTabClick = (nextTab: Tab) => {
    selectBottomTab(nextTab);
  };
  const toggleThemeCharacterVisibility = () => {
    if (!canToggleThemeCharacter) return;
    setIsThemeCharacterVisible((current) => {
      const next = !current;
      localStorage.setItem(`${themeCharacterVisibilityStorageKey}-${themeCharacter}`, next ? "1" : "0");
      return next;
    });
  };
  const unlockNextThemeCharacterStage = async () => {
    if (!settings || themeCharacter === "none" || !nextThemeCharacterStage) return;
    const currentProgress: ThemeCharacterProgress = settings.theme_character_progress?.app_date === appDate
      ? settings.theme_character_progress
      : { app_date: appDate, unlocked_stages: {} };
    const nextProgress: ThemeCharacterProgress = {
      app_date: appDate,
      unlocked_stages: {
        ...(currentProgress.unlocked_stages ?? {}),
        [themeCharacter]: nextThemeCharacterStage,
      },
    };
    const updatedAt = nowIso();
    await db.settings.update("local", { theme_character_progress: nextProgress, updated_at: updatedAt });
    setSettings({ ...settings, theme_character_progress: nextProgress, updated_at: updatedAt });
    showToast(`${themeCharacterStageLabels[nextThemeCharacterStage]}をアンロックしました`);
  };
  const handleThemePowerTap = () => {
    if (!hasThemePowerUnlock || isThemePowerFlash) return;
    const nextTapCount = themePowerTapCount + 1;
    setThemePowerTapCount(nextTapCount);
    if (nextTapCount < 10) return;
    setIsThemePowerFlash(true);
    window.setTimeout(() => {
      void unlockNextThemeCharacterStage().finally(() => {
        setThemePowerTapCount(0);
        setIsThemePowerFlash(false);
      });
    }, 520);
  };

  if (settings && !settings.onboarding_completed) {
    return <Onboarding refresh={refresh} />;
  }

  return (
    <main
      className={`theme-${shellTheme} app-shell app-shell-${tab} mx-auto min-h-screen max-w-[430px] md:max-w-[760px] text-ink ${tab === "home" ? `home-shell home-shell-${homeTone}` : ""} ${isEditingPastDate ? "app-shell-past-editing" : ""}`}
      data-theme={shellTheme}
      data-accent={themeAccent}
      data-character={themeCharacter}
      data-character-stage={themeCharacter === "none" ? undefined : themeCharacterStage}
      style={themeCharacterImage ? { "--theme-character-image": `url(${themeCharacterImage})` } as CSSProperties : undefined}
    >
      <header className={`safe-top app-header sticky top-0 z-20 px-4 ${tab === "home" ? "home-header pb-2" : "pb-3"}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`numeric-text ${tab === "home" ? "text-[2.08rem] font-semibold leading-tight tracking-normal" : "text-2xl font-bold tracking-normal"}`}>
              {tab === "home" ? (
                <button
                  className="home-date-toggle"
                  type="button"
                  aria-pressed={canToggleThemeCharacter ? isThemeCharacterVisible : undefined}
                  aria-label={canToggleThemeCharacter ? `${homeDateTitle.date} ${homeDateTitle.weekday}。${themeCharacterToggleLabel}` : `${homeDateTitle.date} ${homeDateTitle.weekday}`}
                  disabled={!canToggleThemeCharacter}
                  onClick={toggleThemeCharacterVisibility}
                  title={canToggleThemeCharacter ? themeCharacterToggleLabel : undefined}
                >
                  {homeDateTitle.date}
                  <span className="ml-1 align-baseline text-[0.58em] font-medium text-moss">{homeDateTitle.weekday}</span>
                </button>
              ) : headerTitle}
            </h1>
            <p className="mt-1 text-xs font-normal text-moss">
              {isEditingPastDate || tab === "home" || !canToggleThemeCharacter ? headerSubtext : (
                <button
                  className="app-date-toggle"
                  type="button"
                  aria-pressed={isThemeCharacterVisible}
                  aria-label={`${headerSubtext}。${themeCharacterToggleLabel}`}
                  onClick={toggleThemeCharacterVisibility}
                  title={themeCharacterToggleLabel}
                >
                  {headerSubtext}
                </button>
              )}
            </p>
          </div>
          {tab === "home" ? (
            <div className="flex items-center gap-2">
              {isEditingPastDate && (
                <button className="home-header-today" onClick={() => setSelectedAppDate(undefined)}>
                  今日
                </button>
              )}
              {activeSpecialMode?.foodQuery && (
                <button
                  className="home-header-special"
                  aria-label={`${activeSpecialMode.label}メニューを開く`}
                  onClick={openSpecialFoodMode}
                  title={`${activeSpecialMode.label}メニュー`}
                >
                  {activeSpecialMode.shortLabel}
                </button>
              )}
              <button
                className={`home-header-trophy ${unseenAchievementCount ? "home-header-trophy-unseen" : ""} ${unseenAchievementCount >= 3 ? "home-header-trophy-strong" : ""}`}
                aria-label="トロフィー"
                onClick={() => void openTrophies()}
                title="トロフィー"
              >
                <Trophy size={18} />
              </button>
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
            ) : activeSpecialMode?.foodQuery ? (
              <button className="app-status-pill app-status-special" onClick={openSpecialFoodMode}>
                {activeSpecialMode.shortLabel}モード
              </button>
            ) : (
              <div className="app-status-pill">
                {activeGoal ? phaseLabels[activeGoal.phase] : "未設定"} / {typeof statusWeight === "number" ? `${statusWeight}kg` : "-"}
              </div>
            )
          )}
        </div>
      </header>

      <section className={tab === "home" ? "px-4 pb-28 pt-3" : "px-4 pb-28 pt-4"}>
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
            activeSpecialMode={activeSpecialMode}
            activePauseMode={activePauseMode}
            isExceptionDay={isExceptionDay}
            developerProgressPercent={developerProgressPercent}
            isEditingPastDate={isEditingPastDate}
            latestWeight={latestWeight}
            weightLogs={weightLogs}
            bodyFatDisplayMode={settings?.home_body_fat_display ?? "today"}
            weightDisplayMode={settings?.home_weight_display ?? "today"}
            nutritionRemainingDisplayMode={settings?.home_nutrition_remaining_display ?? "recorded"}
            themePowerUnlock={hasThemePowerUnlock && nextThemeCharacterStage ? {
              taps: themePowerTapCount,
              nextStage: nextThemeCharacterStage,
              isFlashing: isThemePowerFlash,
              onTap: handleThemePowerTap,
            } : undefined}
            backupInfo={backupInfo}
            recordReminder={recordReminder}
            needsGoalTargetPeriod={needsGoalTargetPeriod}
            setTab={(nextTab) => {
              setSettingsFocus(undefined);
              setFoodFocus(nextTab === "food" ? "favorite" : undefined);
              setWorkoutFocus(undefined);
              setTab(nextTab);
            }}
            openGoalSettings={() => {
              setSettingsFocus("goal");
              setFoodFocus(undefined);
              setWorkoutFocus(undefined);
              setTab("settings");
            }}
            openTodayFoodLog={() => {
              setSettingsFocus(undefined);
              setFoodFocus("todayLog");
              setWorkoutFocus(undefined);
              setTab("food");
            }}
            openTodayWorkoutLog={() => {
              setSettingsFocus(undefined);
              setFoodFocus(undefined);
              setWorkoutFocus("dateLog");
              setTab("workout");
            }}
            openAiReport={() => {
              setSettingsFocus("ai");
              setFoodFocus(undefined);
              setWorkoutFocus(undefined);
              setTab("settings");
            }}
            openBackup={() => {
              setSettingsFocus("backup");
              setFoodFocus(undefined);
              setWorkoutFocus(undefined);
              setTab("settings");
            }}
            dismissRecordReminder={dismissRecordReminder}
            latestUpdate={latestUpdate}
            hasUnreadUpdate={!!latestUpdate && seenUpdateId !== latestUpdate.id}
            showStaleAppPrompt={showStaleAppPrompt}
            openUpdateNotes={openUpdateNotes}
            reloadLatestApp={reloadLatestApp}
            refresh={refresh}
            showToast={showToast}
            unlockAchievement={unlockAchievementLater}
          />
        )}
        {tab === "food" && (
          <FoodTab
            menuItems={menuItems}
            foodEntries={foodEntries}
            appDate={appDate}
            goal={target}
            dayTotals={dayTotals}
            activeSpecialMode={activeSpecialMode}
            focus={foodFocus}
            openMyMenuSettings={() => {
              setSettingsFocus("myMenu");
              setFoodFocus(undefined);
              setWorkoutFocus(undefined);
              setTab("settings");
            }}
            onFocusHandled={() => setFoodFocus(undefined)}
            refresh={refresh}
            showToast={showToast}
            unlockAchievement={unlockAchievementLater}
          />
        )}
        {tab === "workout" && (
          <WorkoutTab
            profile={profile}
            settings={settings}
            appDate={appDate}
            exercisePresets={exercisePresets}
            workoutTemplates={workoutTemplates}
            workoutSessions={workoutSessions}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            setWorkoutTemplates={setWorkoutTemplates}
            focus={workoutFocus}
            onFocusHandled={() => setWorkoutFocus(undefined)}
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
            specialModeSettings={specialModeSettings}
            pauseModeSettings={pauseModeSettings}
            settings={settings}
            menuItems={menuItems}
            foodEntries={foodEntries}
            weightLogs={weightLogs}
            workoutSessions={workoutSessions}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            weeklyWorkoutStatus={weeklyWorkoutStatus}
            refresh={refresh}
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
            exercisePresets={exercisePresets}
            workoutTemplates={workoutTemplates}
            specialModeSettings={specialModeSettings}
            pauseModeSettings={pauseModeSettings}
            activeSpecialMode={activeSpecialMode}
            isDeveloperTestMode={isDeveloperTestMode}
            achievementProgress={achievementProgress}
            focus={settingsFocus}
            backupInfo={backupInfo}
            settings={settings}
            themeMode={themeMode}
            themeAccent={themeAccent}
            themeCharacter={themeCharacter}
            themeCharacterVariant={themeCharacterVariant}
            resolvedTheme={resolvedTheme}
            markBackupNow={markBackupNow}
            openUpdateNotes={openUpdateNotes}
            refresh={refresh}
            showToast={showToast}
            unlockAllAchievements={unlockAllAchievements}
            allData={{ foodEntries, weightLogs, workoutSessions, workoutExercises, workoutSets }}
          />
        )}
      </section>

      {isUpdateNotesOpen && (
        <UpdateNotesModal
          updates={appUpdates}
          onClose={() => setIsUpdateNotesOpen(false)}
          onOpenTrophies={() => void openTrophies()}
        />
      )}
      {isTrophyOpen && (
        <TrophyModal
          progress={achievementProgress}
          isDeveloperTestMode={isDeveloperTestMode}
          unlocks={settings?.achievements ?? []}
          onClose={() => setIsTrophyOpen(false)}
          onReplay={(achievement) => showAchievementCelebration(achievement)}
        />
      )}
      {toast && <QuickToast key={toast.id} text={toast.text} />}
      <WorkoutPrCelebrationOverlay celebration={prCelebration} />
      {isDeveloperTestMode && settings?.developer_test_overlay_enabled && (
        <div className="developer-test-overlay">テストモード</div>
      )}
      <AchievementCelebrationOverlay
        celebration={achievementCelebration}
        onClose={() => setAchievementCelebration(undefined)}
        onOpenTrophies={() => {
          setAchievementCelebration(undefined);
          void openTrophies();
        }}
      />

      <nav
        className={`safe-bottom app-bottom-nav tab-index-${bottomTabIndex} px-3 pt-1.5`}
        style={{ "--active-tab-glow-x": bottomTabGlowX } as CSSProperties & Record<"--active-tab-glow-x", string>}
      >
        <span className="tab-glass-indicator" aria-hidden="true" />
        <div className="app-bottom-nav-grid grid grid-cols-5 gap-1">
          <TabButton active={tab === "home"} icon={<Home size={19} />} label="Home" onClick={() => handleBottomTabClick("home")} />
          <TabButton active={tab === "food"} icon={<Utensils size={19} />} label="Food" onClick={() => handleBottomTabClick("food")} />
          <TabButton active={tab === "workout"} icon={<Dumbbell size={19} />} label="Workout" onClick={() => handleBottomTabClick("workout")} />
          <TabButton active={tab === "records"} icon={<BarChart3 size={19} />} label="History" onClick={() => handleBottomTabClick("records")} />
          <TabButton active={tab === "settings"} icon={<Settings size={19} />} label="Settings" onClick={() => handleBottomTabClick("settings")} />
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

function buildConfettiBurstPieces(count: number, colors: string[]) {
  return Array.from({ length: count }, (_, index) => {
    const spread = count <= 1 ? 0.5 : index / (count - 1);
    const angle = (205 + spread * 130 + ((index % 5) - 2) * 5) * (Math.PI / 180);
    const distance = 168 + (index % 9) * 16 + (index % 3) * 10;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return {
      id: index,
      delay: `${(index % 8) * 0.028}s`,
      x: `${Math.round(x)}px`,
      y: `${Math.round(y)}px`,
      fall: `${28 + (index % 5) * 9}px`,
      rotate: `${(index * 31) % 180}deg`,
      color: colors[index % colors.length],
      width: `${6 + (index % 4) * 2}px`,
      height: `${10 + (index % 5) * 2}px`,
    };
  });
}

function WorkoutPrCelebrationOverlay({ celebration }: { celebration?: WorkoutPrCelebration }) {
  if (!celebration) return null;
  const colors = ["#D97A68", "#E7B85B", "#8CA798", "#8FB2D8", "#C79BD8", "#F3DDD3"];
  const pieces = buildConfettiBurstPieces(42, colors);

  return (
    <div className="pr-celebration pointer-events-none fixed inset-0 z-[70] mx-auto max-w-[430px] overflow-hidden">
      <div className="absolute inset-0">
        {pieces.map((piece) => (
          <span
            className="pr-confetti-piece"
            key={piece.id}
            style={{
              "--confetti-delay": piece.delay,
              "--confetti-x": piece.x,
              "--confetti-y": piece.y,
              "--confetti-fall": piece.fall,
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

function TrophyModal({ unlocks, progress, isDeveloperTestMode, onClose, onReplay }: {
  unlocks: AchievementUnlock[];
  progress: Record<string, AchievementProgress>;
  isDeveloperTestMode: boolean;
  onClose: () => void;
  onReplay: (achievement: AchievementDefinition) => void;
}) {
  const [selectedAchievementId, setSelectedAchievementId] = useState<string>();
  const unlockedById = new Map(unlocks.map((unlock) => [unlock.id, unlock]));
  const unlockedCount = achievementDefinitions.filter((achievement) => unlockedById.has(achievement.id)).length;
  const nextTargets = buildAchievementTargets(unlockedById, progress);
  const selectedAchievement = achievementDefinitions.find((achievement) => achievement.id === selectedAchievementId)
    ?? nextTargets[0]?.achievement
    ?? achievementDefinitions[0];
  const selectedUnlock = selectedAchievement ? unlockedById.get(selectedAchievement.id) : undefined;
  const selectedProgress = selectedAchievement ? progress[selectedAchievement.id] : undefined;
  const selectedStatus = achievementStatusText(selectedUnlock, selectedProgress);
  return (
    <div className="fixed inset-0 z-[65] flex items-end bg-ink/35 px-4 pb-4" onClick={onClose}>
      <div className="trophy-sheet compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black">トロフィー</p>
            <p className="mt-1 text-sm font-bold text-moss">{unlockedCount}/{achievementDefinitions.length} 獲得</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        {nextTargets.length > 0 && (
          <section className="trophy-guide-panel mt-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-black">次に狙える</p>
                <p className="mt-1 text-xs font-semibold text-moss">あと少しで取れるものを優先表示します。</p>
              </div>
              <span className="mini-chip shrink-0">攻略</span>
            </div>
            <div className="mt-3 grid gap-2">
              {nextTargets.slice(0, 3).map((target) => (
                <button
                  className={`trophy-target-card ${selectedAchievement?.id === target.achievement.id ? "trophy-target-card-active" : ""}`}
                  key={target.achievement.id}
                  onClick={() => setSelectedAchievementId(target.achievement.id)}
                >
                  <span className={`trophy-target-icon trophy-target-icon-${target.achievement.tone}`}><Trophy size={16} /></span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-black">{target.achievement.title}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-moss">{target.status}</span>
                  </span>
                  <span className="numeric-text text-xs font-black text-moss">{Math.round(target.ratio * 100)}%</span>
                </button>
              ))}
            </div>
          </section>
        )}
        {selectedAchievement && (
          <section className={`trophy-detail-panel trophy-card-${selectedAchievement.tone} mt-3`}>
            <div className="flex items-start gap-3">
              <div className="trophy-card-icon shrink-0">
                <Trophy size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-black">{selectedAchievement.title}</p>
                    <p className="mt-1 text-xs font-semibold text-moss">{selectedAchievement.description}</p>
                  </div>
                  <span className={`mini-chip shrink-0 ${selectedUnlock ? "" : "opacity-70"}`}>{selectedUnlock ? "獲得済み" : "攻略中"}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-2xl border border-line bg-surface/60 p-2">
                    <p className="font-bold text-moss">進捗</p>
                    <p className="numeric-text mt-1 font-black">{selectedStatus ?? (selectedUnlock ? "獲得済み" : "条件達成で獲得")}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-surface/60 p-2">
                    <p className="font-bold text-moss">攻略メモ</p>
                    <p className="mt-1 font-black">{achievementGuideText(selectedAchievement, selectedProgress, selectedUnlock)}</p>
                  </div>
                </div>
                {selectedUnlock && (
                  <p className="numeric-text mt-3 text-[11px] font-bold text-muted">
                    {formatJapaneseDate(selectedUnlock.unlocked_at.slice(0, 10))} 獲得
                  </p>
                )}
                {selectedUnlock && isDeveloperTestMode && (
                  <button className="secondary-button mt-3 w-full py-2 text-xs" onClick={() => onReplay(selectedAchievement)}>
                    演出を再生
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {achievementDefinitions.map((achievement) => {
            const unlock = unlockedById.get(achievement.id);
            const progressItem = progress[achievement.id];
            const statusText = achievementStatusText(unlock, progressItem);
            return (
              <button
                className={`trophy-card trophy-card-${achievement.tone} ${unlock ? "trophy-card-unlocked" : "trophy-card-locked"} ${selectedAchievement?.id === achievement.id ? "trophy-card-selected" : ""}`}
                key={achievement.id}
                onClick={() => setSelectedAchievementId(achievement.id)}
              >
                <div className="trophy-card-icon">
                  <Trophy size={20} />
                </div>
                <p className="mt-3 text-sm font-black">{achievement.title}</p>
                <p className="mt-1 text-xs font-semibold text-moss">{achievement.description}</p>
                <p className="numeric-text mt-3 text-[11px] font-bold text-muted">
                  {unlock ? `${formatJapaneseDate(unlock.unlocked_at.slice(0, 10))} 獲得` : "未獲得"}
                </p>
                {statusText && (
                  <p className={`numeric-text mt-1 text-[11px] font-black ${unlock ? "text-moss" : "text-muted"}`}>
                    {statusText}
                  </p>
                )}
                {unlock && isDeveloperTestMode && (
                  <span className="secondary-button mt-3 w-full py-2 text-xs" onClick={(event) => {
                    event.stopPropagation();
                    onReplay(achievement);
                  }}>
                    演出
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AchievementCelebrationOverlay({ celebration, onClose, onOpenTrophies }: {
  celebration?: AchievementCelebration;
  onClose: () => void;
  onOpenTrophies: () => void;
}) {
  if (!celebration) return null;
  const colors = ["#ff6b6b", "#ffd166", "#4ecdc4", "#7b61ff", "#f3ddd3", "#9fbea9"];
  const pieces = buildConfettiBurstPieces(54, colors);
  return (
    <div className="achievement-celebration fixed inset-0 z-[75] mx-auto max-w-[430px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {pieces.map((piece) => (
          <span
            className="pr-confetti-piece"
            key={piece.id}
            style={{
              "--confetti-delay": piece.delay,
              "--confetti-x": piece.x,
              "--confetti-y": piece.y,
              "--confetti-fall": piece.fall,
              "--confetti-rotate": piece.rotate,
              "--confetti-color": piece.color,
              width: piece.width,
              height: piece.height,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="absolute inset-x-4 top-[18vh]">
        <div className="achievement-celebration-card mx-auto w-full max-w-[360px] p-5 text-center">
          <button className="absolute right-4 top-4 icon-button h-8 w-8" aria-label="閉じる" onClick={onClose}>×</button>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/55 text-[#6a4b08] shadow-lg">
            <Trophy size={28} />
          </div>
          <p className="mt-4 text-sm font-black text-moss">トロフィー獲得</p>
          <p className="mt-1 text-2xl font-black">{celebration.title}</p>
          <p className="mt-2 text-sm font-bold text-moss">{celebration.description}</p>
          {celebration.count > 1 && <p className="mt-2 text-xs font-black text-ink">ほか {celebration.count - 1}個も獲得しました</p>}
          <button className="primary-button mt-5 w-full" onClick={onOpenTrophies}>
            <Trophy size={17} />トロフィー一覧を見る
          </button>
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

function loadDismissedRecordReminders() {
  try {
    const parsed = JSON.parse(localStorage.getItem(dismissedRecordReminderStorageKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

type RecordReminder = {
  id: string;
  title: string;
  message: string;
  mealType: MealType;
};

const recordReminderSlots: Array<{ mealType: MealType; hour: number; title: string; label: string }> = [
  { mealType: "breakfast", hour: 10, title: "朝の記録を忘れていませんか？", label: "朝食" },
  { mealType: "lunch", hour: 14, title: "昼の記録を忘れていませんか？", label: "昼食" },
  { mealType: "dinner", hour: 20, title: "夜の記録を忘れていませんか？", label: "夕食" },
];

function getRecordReminder(params: {
  appDate: string;
  actualAppDate: string;
  currentTime: Date;
  todayEntries: FoodEntry[];
  dismissedIds: string[];
}): RecordReminder | undefined {
  if (params.appDate !== params.actualAppDate) return undefined;
  const dismissed = new Set(params.dismissedIds);
  const loggedMealTypes = new Set(params.todayEntries.map((entry) => entry.meal_type));
  const currentHour = params.currentTime.getHours();
  const slot = [...recordReminderSlots]
    .reverse()
    .find((candidate) => currentHour >= candidate.hour && !loggedMealTypes.has(candidate.mealType) && !dismissed.has(`${params.appDate}-${candidate.mealType}`));
  if (!slot) return undefined;
  return {
    id: `${params.appDate}-${slot.mealType}`,
    mealType: slot.mealType,
    title: slot.title,
    message: `${slot.label}がまだ記録されていません。次に開いた時でも、ここからすぐ追加できます。`,
  };
}

function getUnlockedAchievementIds(params: {
  profile?: Profile;
  goals: Goal[];
  menuItems: MenuItem[];
  exercisePresets: ExercisePreset[];
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  aiReports: AiReport[];
  goal?: Goal;
  cheatDayDates?: string[];
  specialModeSettings?: SpecialModeSettings[];
  pauseModeSettings?: SpecialModeSettings[];
  currentAppDate: string;
}) {
  return getAchievementSnapshot(params).ids;
}

function getAchievementSnapshot(params: {
  profile?: Profile;
  goals: Goal[];
  menuItems: MenuItem[];
  exercisePresets: ExercisePreset[];
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  aiReports: AiReport[];
  goal?: Goal;
  cheatDayDates?: string[];
  specialModeSettings?: SpecialModeSettings[];
  pauseModeSettings?: SpecialModeSettings[];
  currentAppDate: string;
}) {
  const unlocked = new Set<string>(["first_open"]);
  const counts: Record<string, number> = {};
  const addMilestones = (count: number, milestones: Array<[number, string]>) => {
    milestones.forEach(([threshold, id]) => {
      if (count >= threshold) unlocked.add(id);
      counts[id] = count;
    });
  };
  if (params.goals.length > 0) unlocked.add("first_goal");
  if (params.goals.length > 1) unlocked.add("goal_updated");
  if (params.foodEntries.length > 0) unlocked.add("first_food");
  addMilestones(params.foodEntries.length, [[3, "food_3"], [10, "food_10"], [25, "food_25"], [50, "food_50"], [100, "food_100"], [300, "food_300"]]);
  if (params.workoutSessions.length > 0) unlocked.add("first_workout");
  addMilestones(params.workoutSessions.length, [[3, "workout_3"], [10, "workout_10"], [30, "workout_30"], [50, "workout_50"], [100, "workout_100"]]);
  addMilestones(params.workoutSets.length, [[30, "workout_sets_30"], [100, "workout_sets_100"], [500, "workout_sets_500"], [1000, "workout_sets_1000"]]);
  addMilestones(new Set(params.workoutExercises.map((exercise) => exercise.exercise_name)).size, [[3, "exercise_variety_3"], [5, "exercise_variety_5"], [15, "exercise_variety_15"], [30, "exercise_variety_30"]]);
  if (params.weightLogs.length > 0) unlocked.add("first_checkin");
  addMilestones(params.weightLogs.length, [[3, "checkin_3"], [7, "checkin_7"], [30, "checkin_30"], [100, "checkin_100"]]);
  const weightDirection = goalWeightDirection(params.goal, params.profile, params.weightLogs);
  if (weightDirection) {
    addMilestones(countGoalDirectionWeightMoves(params.weightLogs, weightDirection), [[1, "weight_goal_day_1"], [3, "weight_goal_day_3"], [7, "weight_goal_day_7"]]);
    addMilestones(countGoalDirectionAverageMoves(params.weightLogs, weightDirection), [[1, "weight_goal_avg_1"], [3, "weight_goal_avg_3"], [7, "weight_goal_avg_7"]]);
  }
  const userMenuCount = params.menuItems.filter((item) => item.is_user_created).length;
  if (userMenuCount > 0) unlocked.add("first_my_menu");
  addMilestones(userMenuCount, [[5, "my_menu_5"], [20, "my_menu_20"]]);
  const myTrainingCount = params.exercisePresets.filter((item) => item.is_user_created).length;
  if (myTrainingCount > 0) unlocked.add("first_my_training");
  addMilestones(myTrainingCount, [[5, "my_training_5"]]);
  const aiPhotoUseCount = params.foodEntries.filter((entry) => entry.note?.includes("AI写真登録") || entry.entry_source === "estimated").length
    + params.menuItems.filter((item) => item.tags.includes("AI写真登録")).length;
  if (aiPhotoUseCount > 0) unlocked.add("used_ai_photo");
  if (params.aiReports.length > 0) unlocked.add("first_ai_report");
  addMilestones(params.aiReports.length, [[5, "ai_report_5"], [20, "ai_report_20"]]);
  const streak = longestRecordStreak([
    ...params.foodEntries.map((entry) => entry.app_date),
    ...params.weightLogs.map((entry) => entry.app_date),
    ...params.workoutSessions.map((entry) => entry.app_date),
  ], streakBridgeDatesUpTo({
    endDate: params.currentAppDate,
    cheatDayDates: params.cheatDayDates ?? [],
    specialModeSettings: params.specialModeSettings ?? [],
    pauseModeSettings: params.pauseModeSettings ?? [],
  }));
  addMilestones(streak, [[3, "streak_3"], [7, "streak_7"], [14, "streak_14"], [30, "streak_30"], [45, "streak_45"], [60, "streak_60"], [75, "streak_75"], [100, "streak_100"], [150, "streak_150"], [365, "streak_365"]]);
  const workoutHistory = buildWorkoutHistory(params.workoutSessions, params.workoutExercises, params.workoutSets);
  const prCount = workoutHistory.reduce((sum, item) => sum + item.prs.length, 0);
  addMilestones(prCount, [[1, "workout_pr"], [5, "workout_pr_5"], [10, "workout_pr_10"], [25, "workout_pr_25"]]);
  if (params.goal) {
    const foodEntriesByDate = new Map<string, FoodEntry[]>();
    params.foodEntries.forEach((entry) => {
      foodEntriesByDate.set(entry.app_date, [...(foodEntriesByDate.get(entry.app_date) ?? []), entry]);
    });
    const foodDays = [...foodEntriesByDate.entries()]
      .filter(([date, entries]) => date <= params.currentAppDate && entries.length > 0)
      .map(([, entries]) => sumFood(entries));
    const perfectCounts = countPerfectNutritionDays(foodDays, params.goal);
    addMilestones(perfectCounts.overall, [[1, "perfect_overall"]]);
    addMilestones(perfectCounts.calories, [[1, "perfect_calorie"]]);
    addMilestones(perfectCounts.protein, [[1, "perfect_protein"]]);
    addMilestones(perfectCounts.fat, [[1, "perfect_fat"]]);
    addMilestones(perfectCounts.carbs, [[1, "perfect_carb"]]);
    const completedFoodDays = [...foodEntriesByDate.entries()]
      .filter(([date, entries]) => date < params.currentAppDate && entries.length > 0)
      .map(([, entries]) => sumFood(entries));
    const calorieMasterDays = params.goal.target_calories > 0
      ? completedFoodDays.filter((total) => total.calories > 0 && total.calories <= params.goal!.target_calories).length
      : 0;
    addMilestones(calorieMasterDays, [[1, "calorie_master_1"], [3, "calorie_master_3"], [7, "calorie_master_7"], [14, "calorie_master_14"], [30, "calorie_master_30"]]);
    if (params.goal.target_protein_g > 0) {
      const proteinDays = completedFoodDays.filter((total) => total.protein >= params.goal!.target_protein_g * 0.9).length;
      addMilestones(proteinDays, [[1, "protein_day"], [3, "protein_days_3"], [7, "protein_days_7"], [14, "protein_days_14"], [30, "protein_days_30"]]);
      const macroBalanceDays = completedFoodDays.filter((total) => (
        total.protein >= params.goal!.target_protein_g * 0.9 &&
        (params.goal!.target_fat_g <= 0 || total.fat <= params.goal!.target_fat_g * 1.1) &&
        (params.goal!.target_carbs_g <= 0 || total.carbs <= params.goal!.target_carbs_g * 1.1) &&
        (params.goal!.target_calories <= 0 || total.calories <= params.goal!.target_calories)
      )).length;
      addMilestones(macroBalanceDays, [[1, "macro_balance_1"], [3, "macro_balance_3"], [7, "macro_balance_7"], [14, "macro_balance_14"], [30, "macro_balance_30"]]);
    }
  }
  if (
    params.weeklyWorkoutStatus.strengthTarget > 0 &&
    params.weeklyWorkoutStatus.strengthDone >= params.weeklyWorkoutStatus.strengthTarget
  ) {
    unlocked.add("weekly_workout_goal");
  }
  return { ids: [...unlocked], counts };
}

function countPerfectNutritionDays(
  totals: Array<{ calories: number; protein: number; fat: number; carbs: number }>,
  goal: Goal,
) {
  type PerfectNutritionCounts = { overall: number; calories: number; protein: number; fat: number; carbs: number };
  const hasCalorieTarget = goal.target_calories > 0;
  const hasProteinTarget = goal.target_protein_g > 0;
  const hasFatTarget = goal.target_fat_g > 0;
  const hasCarbTarget = goal.target_carbs_g > 0;
  const isPerfectCalorie = (total: { calories: number }) => (
    hasCalorieTarget && Math.round(total.calories) === Math.round(goal.target_calories)
  );
  const isPerfectProtein = (total: { protein: number }) => (
    hasProteinTarget && round1(total.protein) === round1(goal.target_protein_g)
  );
  const isPerfectFat = (total: { fat: number }) => (
    hasFatTarget && round1(total.fat) === round1(goal.target_fat_g)
  );
  const isPerfectCarb = (total: { carbs: number }) => (
    hasCarbTarget && round1(total.carbs) === round1(goal.target_carbs_g)
  );
  const canCountOverall = hasCalorieTarget && hasProteinTarget && hasFatTarget && hasCarbTarget;
  return totals.reduce<PerfectNutritionCounts>((counts, total) => {
    const calories = isPerfectCalorie(total);
    const protein = isPerfectProtein(total);
    const fat = isPerfectFat(total);
    const carbs = isPerfectCarb(total);
    return {
      overall: counts.overall + (canCountOverall && calories && protein && fat && carbs ? 1 : 0),
      calories: counts.calories + (calories ? 1 : 0),
      protein: counts.protein + (protein ? 1 : 0),
      fat: counts.fat + (fat ? 1 : 0),
      carbs: counts.carbs + (carbs ? 1 : 0),
    };
  }, { overall: 0, calories: 0, protein: 0, fat: 0, carbs: 0 });
}

function pauseDatesUpTo(endDate: string, settings: SpecialModeSettings[]) {
  return settings.flatMap((mode) => {
    if (!mode.enabled || !mode.start_date || !mode.end_date) return [];
    const start = mode.start_date <= mode.end_date ? mode.start_date : mode.end_date;
    const end = mode.start_date <= mode.end_date ? mode.end_date : mode.start_date;
    return dateRange(start, end > endDate ? endDate : end);
  });
}

function streakBridgeDatesUpTo(params: {
  endDate: string;
  cheatDayDates: string[];
  specialModeSettings: SpecialModeSettings[];
  pauseModeSettings: SpecialModeSettings[];
}) {
  const cheatDates = params.cheatDayDates
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= params.endDate);
  const travelDates = specialModeDatesUpTo(params.endDate, params.specialModeSettings);
  const pauseDates = pauseDatesUpTo(params.endDate, params.pauseModeSettings);
  return unique([...cheatDates, ...travelDates, ...pauseDates]);
}

function specialModeDatesUpTo(endDate: string, settings: SpecialModeSettings[]) {
  return settings.flatMap((mode) => {
    if (!mode.enabled) return [];
    const definition = specialModeDefinitions.find((item) => item.id === mode.id);
    const rawStart = mode.start_date ?? definition?.defaultStartDate;
    const rawEnd = mode.end_date ?? definition?.defaultEndDate;
    if (!rawStart || !rawEnd) return [];
    const start = rawStart <= rawEnd ? rawStart : rawEnd;
    const end = rawStart <= rawEnd ? rawEnd : rawStart;
    if (start > endDate) return [];
    return dateRange(start, end > endDate ? endDate : end);
  });
}

function longestRecordStreak(dates: string[], ignoredDates: string[] = []) {
  const uniqueDates = [...new Set(dates)].filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort();
  if (!uniqueDates.length) return 0;
  const ignored = new Set(ignoredDates);
  let longest = 1;
  let current = 1;
  for (let index = 1; index < uniqueDates.length; index += 1) {
    if (uniqueDates[index] === addDays(uniqueDates[index - 1], 1) || isStreakBridge(uniqueDates[index - 1], uniqueDates[index], ignored)) {
      current += 1;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
  }
  return longest;
}

function isStreakBridge(previousDate: string, nextDate: string, ignoredDates: Set<string>) {
  let cursor = addDays(previousDate, 1);
  let hasIgnoredDay = false;
  while (cursor < nextDate) {
    if (!ignoredDates.has(cursor)) return false;
    hasIgnoredDay = true;
    cursor = addDays(cursor, 1);
  }
  return hasIgnoredDay;
}

function goalWeightDirection(goal?: Goal, profile?: Profile, weightLogs: WeightLog[] = []) {
  if (!goal?.target_weight_kg) return undefined;
  const sortedLogs = [...weightLogs].sort((a, b) => `${a.app_date}-${a.logged_at}`.localeCompare(`${b.app_date}-${b.logged_at}`));
  const baseline = sortedLogs[0]?.weight_kg ?? profile?.current_weight_kg;
  if (typeof baseline !== "number") return undefined;
  const delta = goal.target_weight_kg - baseline;
  if (delta <= -0.1) return "down" as const;
  if (delta >= 0.1) return "up" as const;
  return undefined;
}

function countGoalDirectionWeightMoves(weightLogs: WeightLog[], direction: "up" | "down") {
  const sortedLogs = [...weightLogs].sort((a, b) => `${a.app_date}-${a.logged_at}`.localeCompare(`${b.app_date}-${b.logged_at}`));
  let count = 0;
  for (let index = 1; index < sortedLogs.length; index += 1) {
    const delta = round1(sortedLogs[index].weight_kg - sortedLogs[index - 1].weight_kg);
    if (direction === "down" && delta <= -0.1) count += 1;
    if (direction === "up" && delta >= 0.1) count += 1;
  }
  return count;
}

function countGoalDirectionAverageMoves(weightLogs: WeightLog[], direction: "up" | "down") {
  const sortedLogs = [...weightLogs].sort((a, b) => `${a.app_date}-${a.logged_at}`.localeCompare(`${b.app_date}-${b.logged_at}`));
  let count = 0;
  for (let index = 7; index < sortedLogs.length; index += 1) {
    const previousAverage = movingAverage(sortedLogs.slice(0, index), 7);
    const currentAverage = movingAverage(sortedLogs.slice(0, index + 1), 7);
    if (typeof previousAverage !== "number" || typeof currentAverage !== "number") continue;
    const delta = round1(currentAverage - previousAverage);
    if (direction === "down" && delta <= -0.1) count += 1;
    if (direction === "up" && delta >= 0.1) count += 1;
  }
  return count;
}

function achievementDefinition(id: string) {
  return achievementDefinitions.find((achievement) => achievement.id === id);
}

function buildAchievementProgress(counts: Record<string, number>) {
  return Object.fromEntries(Object.entries(achievementProgressSpecs).map(([id, spec]) => [
    id,
    {
      current: counts[id] ?? 0,
      target: spec.target,
      unit: spec.unit,
      repeatable: !!spec.repeatable,
    },
  ])) as Record<string, AchievementProgress>;
}

function achievementStatusText(unlock?: AchievementUnlock, progress?: AchievementProgress) {
  if (!progress) return undefined;
  const current = unlock ? Math.max(unlock.count ?? 1, progress.current) : progress.current;
  if (unlock) {
    if (progress.repeatable || current > progress.target) return `累計 ${current}${progress.unit}`;
    return `${current}/${progress.target}${progress.unit}`;
  }
  const remaining = Math.max(0, progress.target - current);
  return `あと ${remaining}${progress.unit}`;
}

function buildAchievementTargets(unlockedById: Map<string, AchievementUnlock>, progress: Record<string, AchievementProgress>): AchievementTarget[] {
  const targets = achievementDefinitions
    .filter((achievement) => !achievement.hidden && !unlockedById.has(achievement.id))
    .map((achievement) => {
      const progressItem = progress[achievement.id];
      if (!progressItem) {
        return {
          achievement,
          ratio: 0,
          status: "条件を満たすと獲得",
        } satisfies AchievementTarget;
      }
      const current = Math.max(0, progressItem.current);
      const target = Math.max(1, progressItem.target);
      const remaining = Math.max(0, target - current);
      return {
        achievement,
        progress: progressItem,
        remaining,
        ratio: Math.min(1, current / target),
        status: remaining <= 0 ? "達成目前" : `あと ${remaining}${progressItem.unit}`,
      } satisfies AchievementTarget;
    });
  return targets
    .sort((a, b) => {
      const aHasProgress = a.progress ? 1 : 0;
      const bHasProgress = b.progress ? 1 : 0;
      if (aHasProgress !== bHasProgress) return bHasProgress - aHasProgress;
      const aRemaining = a.remaining ?? Number.MAX_SAFE_INTEGER;
      const bRemaining = b.remaining ?? Number.MAX_SAFE_INTEGER;
      const aNearlyThere = aRemaining <= 1 ? 1 : 0;
      const bNearlyThere = bRemaining <= 1 ? 1 : 0;
      if (aNearlyThere !== bNearlyThere) return bNearlyThere - aNearlyThere;
      if (a.ratio !== b.ratio) return b.ratio - a.ratio;
      return aRemaining - bRemaining;
    })
    .slice(0, 6);
}

function achievementGuideText(achievement: AchievementDefinition, progress?: AchievementProgress, unlock?: AchievementUnlock) {
  if (unlock) return "獲得済み。テストモード中は演出も見返せます。";
  if (!progress) return "この機能を使うと獲得できます。";
  const remaining = Math.max(0, progress.target - progress.current);
  if (remaining <= 0) return "条件は達成済みです。次の記録更新で反映されます。";
  const action = progress.unit === "日"
    ? "積み上げる"
    : progress.unit === "件"
      ? "追加する"
      : progress.unit === "セット"
        ? "積む"
        : progress.unit === "種目"
          ? "増やす"
          : "進める";
  if (achievement.tone === "streak") return `あと${remaining}${progress.unit}、記録を続けると獲得できます。`;
  return `あと${remaining}${progress.unit}${action}と獲得できます。`;
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
  activeSpecialMode?: ActiveSpecialMode;
  activePauseMode?: ActivePauseMode;
  isExceptionDay: boolean;
  developerProgressPercent?: number;
  isEditingPastDate: boolean;
  latestWeight?: WeightLog;
  weightLogs: WeightLog[];
  bodyFatDisplayMode: HomeBodyFatDisplay;
  weightDisplayMode: HomeWeightDisplay;
  nutritionRemainingDisplayMode: HomeNutritionRemainingDisplay;
  themePowerUnlock?: {
    taps: number;
    nextStage: ThemeCharacterProgressStage;
    isFlashing: boolean;
    onTap: () => void;
  };
  backupInfo: BackupInfo;
  recordReminder?: RecordReminder;
  needsGoalTargetPeriod: boolean;
  setTab: (tab: Tab) => void;
  openGoalSettings: () => void;
  openTodayFoodLog: () => void;
  openTodayWorkoutLog: () => void;
  openAiReport: () => void;
  openBackup: () => void;
  dismissRecordReminder: (id: string) => void;
  latestUpdate?: AppUpdate;
  hasUnreadUpdate: boolean;
  showStaleAppPrompt: boolean;
  openUpdateNotes: () => void;
  reloadLatestApp: () => Promise<void>;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  unlockAchievement: (id: string) => void;
}) {
  const [weight, setWeight] = useState(props.latestWeight?.weight_kg ?? props.profile?.current_weight_kg ?? 70);
  const [bodyFat, setBodyFat] = useState(props.latestWeight?.body_fat_percentage ?? props.profile?.body_fat_percentage ?? 20);
  const [isReloadingLatest, setIsReloadingLatest] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isPerfectFoodOpen, setIsPerfectFoodOpen] = useState(false);
  const [isEstimateDetailOpen, setIsEstimateDetailOpen] = useState(false);
  const [isGoalSummaryOpen, setIsGoalSummaryOpen] = useState(false);
  const [showMacroRemaining, setShowMacroRemaining] = useState(false);
  const [pullOffset, setPullOffset] = useState(0);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);
  const pullStartYRef = useRef<number | undefined>(undefined);
  const pullThreshold = 64;
  const average7 = movingAverage(props.weightLogs, 7);
  const previousAverage7 = movingAverage(props.weightLogs.slice(0, -1), 7);
  const bodyFatAverage7 = movingAverageValue(props.weightLogs, 7, (log) => log.body_fat_percentage);
  const displayedWeight = props.weightDisplayMode === "average7" ? (average7 ?? weight) : weight;
  const displayedBodyFat = props.bodyFatDisplayMode === "average7" ? bodyFatAverage7 : bodyFat;
  const shouldShowBodyFat = props.bodyFatDisplayMode !== "hidden";
  const developerProgressPercent = typeof props.developerProgressPercent === "number"
    ? Math.max(0, Math.min(110, Math.round(props.developerProgressPercent)))
    : undefined;
  const backupTitle = props.backupInfo.level === "danger" ? "バックアップ推奨" : "そろそろバックアップ";
  const todayWorkoutCalories = useMemo(() => {
    const sessionIds = new Set(props.todayWorkouts.map((session) => session.id));
    const exerciseIds = new Set(
      props.workoutExercises
        .filter((exercise) => sessionIds.has(exercise.session_id))
        .map((exercise) => exercise.id),
    );
    return props.workoutSets
      .filter((set) => exerciseIds.has(set.workout_exercise_id))
      .reduce((sum, set) => sum + (set.active_calories ?? 0), 0);
  }, [props.todayWorkouts, props.workoutExercises, props.workoutSets]);
  const previousWeight = props.weightLogs.length > 1 ? props.weightLogs.at(-2)?.weight_kg : undefined;
  const weightDelta = typeof previousWeight === "number" ? round1(weight - previousWeight) : undefined;
  const average7Delta = typeof average7 === "number" ? round1(weight - average7) : undefined;
  const displayedWeightTrendDelta = props.weightDisplayMode === "average7"
    ? typeof average7 === "number" && typeof previousAverage7 === "number" ? round1(average7 - previousAverage7) : undefined
    : average7Delta;
  const average7Trend = typeof displayedWeightTrendDelta === "number" && Math.abs(displayedWeightTrendDelta) >= 0.1 ? (displayedWeightTrendDelta > 0 ? "up" : "down") : undefined;
  const calorieDelta = props.goal?.target_calories ? props.dayTotals.calories - props.goal.target_calories : undefined;
  const dailyEstimate = useMemo(
    () => getDailyNutritionEstimate(props.todayEntries, props.dayTotals, props.goal, props.menuItems),
    [props.todayEntries, props.dayTotals.calories, props.dayTotals.protein, props.dayTotals.fat, props.dayTotals.carbs, props.goal, props.menuItems],
  );
  const displayedRemaining = props.nutritionRemainingDisplayMode === "safe" ? dailyEstimate.safeRemaining : dailyEstimate.adoptedRemaining;
  const heroCalorieDelta = props.goal?.target_calories ? -displayedRemaining.calories : undefined;
  const heroCaloriePercent = props.goal?.target_calories
    ? Math.max(0, Math.min(100, Math.round(((props.goal.target_calories - displayedRemaining.calories) / props.goal.target_calories) * 100)))
    : 0;
  const isCalorieOverWithinEstimate = props.nutritionRemainingDisplayMode === "recorded"
    && typeof calorieDelta === "number"
    && calorieDelta > 0
    && calorieDelta <= dailyEstimate.uncertainty.calories;
  const calorieDeltaText = typeof heroCalorieDelta === "number" ? `${heroCalorieDelta > 0 ? "+" : ""}${Math.round(heroCalorieDelta)}` : "-";
  const shouldMaskGoalProgress = props.isExceptionDay;
  const shouldShowRainbowProgress = props.isCheatDay || !!props.activeSpecialMode;
  const shouldShowPausedProgress = !shouldShowRainbowProgress && !!props.activePauseMode;
  const heroProgressPercent = shouldMaskGoalProgress ? 100 : Math.min(100, developerProgressPercent ?? heroCaloriePercent);
  const heroGlowPercent = shouldMaskGoalProgress ? 100 : developerProgressPercent ?? heroProgressPercent;
  const heroBackgroundProgress = Math.max(0, Math.min(100, heroGlowPercent));
  const isDeveloperProgressOver = typeof developerProgressPercent === "number" && developerProgressPercent > 100;
  const shouldUseThemeHeroFrame = !shouldShowRainbowProgress && !shouldShowPausedProgress && !isDeveloperProgressOver && !(heroCalorieDelta && heroCalorieDelta > 0);
  const heroThemeGlowClass = !shouldUseThemeHeroFrame
    ? ""
    : heroGlowPercent >= 90
      ? "home-hero-theme-frame home-hero-theme-glow-90 home-hero-theme-spin"
      : heroGlowPercent >= 75
        ? "home-hero-theme-frame home-hero-theme-glow-75"
        : heroGlowPercent >= 50
          ? "home-hero-theme-frame home-hero-theme-glow-50"
          : heroGlowPercent >= 25
            ? "home-hero-theme-frame home-hero-theme-glow-25"
            : "home-hero-theme-frame home-hero-theme-glow-0";
  const heroProgressClass = shouldShowRainbowProgress
    ? "home-progress-rainbow"
    : shouldShowPausedProgress
      ? "home-progress-paused"
      : isCalorieOverWithinEstimate ? "home-progress-estimate" : (isDeveloperProgressOver || (heroCalorieDelta && heroCalorieDelta > 0)) ? "home-progress-over" : "home-progress-normal";
  const calorieDisplayText = shouldMaskGoalProgress ? "-" : calorieDeltaText;
  const calorieMoodClass = props.isCheatDay ? "cheat" : props.activeSpecialMode ? "trip" : props.activePauseMode ? "cheat" : typeof heroCalorieDelta === "number" ? (heroCalorieDelta > 0 ? (isCalorieOverWithinEstimate ? "estimate" : "over") : Math.abs(heroCalorieDelta) <= 100 ? "on-track" : "left") : "neutral";
  const heroStyle = {
    "--hero-progress-level": String(heroBackgroundProgress),
  } as CSSProperties & Record<"--hero-progress-level", string>;
  const foodSummary = `${props.todayEntries.length}件 / ${props.dayTotals.calories} kcal`;
  const workoutSummary = todayWorkoutCalories > 0 ? `${props.todayWorkouts.length}回 / ${todayWorkoutCalories} kcal` : `${props.todayWorkouts.length}回`;
  const macroStats = [
    { label: "P", value: props.dayTotals.protein, target: props.goal?.target_protein_g ?? 0 },
    { label: "F", value: props.dayTotals.fat, target: props.goal?.target_fat_g ?? 0 },
    { label: "C", value: props.dayTotals.carbs, target: props.goal?.target_carbs_g ?? 0 },
  ].map((macro) => {
    const percent = macro.target > 0 ? Math.round((macro.value / macro.target) * 100) : undefined;
    const remaining = macro.target > 0 ? round1(macro.target - macro.value) : undefined;
    const macroOver = typeof remaining === "number" && remaining < 0 ? Math.abs(remaining) : 0;
    const isWithinEstimate = macro.label === "F" && macroOver > 0 && macroOver <= dailyEstimate.uncertainty.fat;
    const tone = shouldMaskGoalProgress
      ? "disabled"
      : typeof percent !== "number"
      ? "neutral"
      : macro.label === "P"
        ? percent < 80 ? "over" : "safe"
        : isWithinEstimate ? "estimate" : percent > 110 ? "over" : percent >= 80 ? "safe" : "low";
    return { ...macro, percent, remaining, tone };
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
  const saveCheckInDisplay = async (patch: Partial<Pick<AppSettings, "home_weight_display" | "home_body_fat_display">>) => {
    await db.settings.update("local", { ...patch, updated_at: nowIso() });
    await props.refresh();
  };
  const saveNutritionRemainingDisplay = async (mode: HomeNutritionRemainingDisplay) => {
    await db.settings.update("local", { home_nutrition_remaining_display: mode, updated_at: nowIso() });
    await props.refresh();
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
      nutrition_meta: item.nutrition_meta,
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
      <div className="home-dashboard" style={pullOffset > 0 ? { transform: `translateY(${Math.min(18, pullOffset * 0.16)}px)` } : undefined}>
        {props.latestUpdate && props.hasUnreadUpdate && (
        <button className="home-notice flex w-full items-center gap-3 px-4 py-3 text-left" onClick={props.openUpdateNotes}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">更新があります</p>
            <p className="mt-1 truncate text-xs text-moss">{props.latestUpdate.title}</p>
          </div>
          <ChevronRight className="shrink-0 text-muted" size={18} />
        </button>
      )}

      {props.needsGoalTargetPeriod && (
        <button className="home-notice flex w-full items-center gap-3 px-4 py-3 text-left" onClick={props.openGoalSettings}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">目標日と体脂肪率を追加できます</p>
            <p className="mt-1 text-xs text-moss">いつまでに、どの体脂肪率を目指すか設定すると、毎日の目標が分かりやすくなります。</p>
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

      {props.recordReminder && (
        <div className="home-notice home-reminder-notice flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{props.recordReminder.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-moss">{props.recordReminder.message}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="secondary-button px-3 py-2 text-xs" onClick={() => props.dismissRecordReminder(props.recordReminder!.id)}>あとで</button>
            <button className="primary-button px-3 py-2 text-xs" onClick={() => props.setTab("food")}>記録</button>
          </div>
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

      <section
        className={`home-hero-card home-hero-${calorieMoodClass} ${heroThemeGlowClass} ${props.activeSpecialMode?.id === "hokkaido_trip" ? "home-hero-hokkaido" : ""}`}
        style={heroStyle}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink/80">今日のカロリー</p>
          {props.isCheatDay ? <span className="home-cheat-badge">チートデー</span>
            : props.activeSpecialMode ? <span className="home-cheat-badge home-trip-badge">{props.activeSpecialMode.label}</span>
            : props.activePauseMode ? <span className="home-cheat-badge">{props.activePauseMode.label}</span>
            : (
              <button
                className={`home-estimate-badge ${dailyEstimate.estimatedEntryCount ? "home-estimate-badge-active" : ""}`}
                aria-label={`${dailyEstimate.estimatedEntryCount ? "推定値あり" : "推定値なし"}。栄養値の詳細を開く`}
                onClick={() => setIsEstimateDetailOpen(true)}
              >
                <span>{dailyEstimate.estimatedEntryCount ? "推定値あり" : "推定値なし"}</span>
                <Settings size={12} strokeWidth={2.4} />
              </button>
            )}
        </div>
        <div className="mt-5">
          <p className={`numeric-text text-[4.25rem] font-semibold leading-none tracking-normal ${heroCalorieDelta && heroCalorieDelta > 0 ? (isCalorieOverWithinEstimate ? "text-estimate" : "text-clay") : "text-ink"}`}>
            {calorieDisplayText}<span className="ml-2 text-xl font-semibold">kcal</span>
          </p>
          {!shouldMaskGoalProgress && <p className="numeric-text mt-2 text-sm text-moss">摂取 {props.dayTotals.calories} / 目標 {props.goal?.target_calories ?? "-"} kcal</p>}
          <div className="home-progress-track mt-5 h-2 overflow-hidden rounded-full bg-white/55">
            <div className={`home-progress-fill h-full rounded-full ${heroProgressClass}`} style={{ width: `${heroProgressPercent}%` }} />
          </div>
        </div>
        <div className="home-macro-row mt-4">
          {macroStats.map((macro) => (
            <button
              type="button"
              className={`home-macro-pill home-macro-${macro.tone} ${shouldMaskGoalProgress ? "home-macro-disabled" : ""} ${showMacroRemaining && !shouldMaskGoalProgress ? "home-macro-remaining-active" : ""}`}
              key={macro.label}
              onClick={() => {
                if (!shouldMaskGoalProgress) setShowMacroRemaining((current) => !current);
              }}
              aria-label={`PFC表示を${showMacroRemaining ? "摂取量と達成率" : "残りグラム"}に切り替え`}
            >
              <span className="home-macro-dot" />
              <span className="font-bold">{macro.label}</span>
              {shouldMaskGoalProgress ? (
                <span className="home-macro-paused">評価外</span>
              ) : showMacroRemaining ? (
                <span className="home-macro-grams home-macro-remaining">
                  {typeof macro.remaining === "number" ? `${macro.remaining >= 0 ? "残り" : "超過"} ${round1(Math.abs(macro.remaining))}g` : "-"}
                </span>
              ) : (
                <>
                  <span className="home-macro-grams">{round1(macro.value)}g</span>
                  <span className="home-macro-percent">{typeof macro.percent === "number" ? `${macro.percent}%` : "-"}</span>
                </>
              )}
            </button>
          ))}
        </div>
        {props.themePowerUnlock && (
          <div className={`theme-power-overlay ${props.themePowerUnlock.isFlashing ? "theme-power-overlay-flash" : ""}`}>
            {props.themePowerUnlock.isFlashing ? (
              <span className="theme-power-flash-mark">UNLOCK</span>
            ) : (
              <>
                <span className="theme-power-kicker">次のフェーズをアンロック</span>
                <strong>{themeCharacterStageLabels[props.themePowerUnlock.nextStage]}</strong>
                <button className="theme-power-button" type="button" onClick={props.themePowerUnlock.onTap}>
                  パワーを送る
                </button>
                <span className="theme-power-count">ボタンを連打！ {props.themePowerUnlock.taps}/10</span>
                <span className="theme-power-track" aria-hidden="true"><span style={{ width: `${props.themePowerUnlock.taps * 10}%` }} /></span>
              </>
            )}
          </div>
        )}
      </section>

      <div className="home-action-row">
        <button className="home-primary-action" onClick={() => props.setTab("food")}>食事を記録 <ChevronRight size={17} /></button>
        <button className="home-secondary-action" onClick={() => props.setTab("workout")}>ワークアウト記録 <ChevronRight size={17} /></button>
      </div>
      <div className="home-link-actions flex justify-center gap-3 text-xs font-semibold text-moss/80">
        <button className="px-1.5 py-1" onClick={() => {
          props.unlockAchievement("used_perfect_food");
          setIsPerfectFoodOpen(true);
        }}>ぴったりフード</button>
        <button className="px-2 py-1" onClick={() => setIsGoalSummaryOpen(true)}>ゴールを確認</button>
        <button className="px-2 py-1" onClick={props.openAiReport}>AIレポート</button>
      </div>

      <button className="home-glass-card home-checkin-card relative w-full p-4 text-left" onClick={() => setIsCheckInOpen(true)}>
        <span className="home-checkin-edit" aria-hidden="true"><Plus size={15} /></span>
        <div className={`grid items-end gap-3 ${shouldShowBodyFat ? "grid-cols-2" : "grid-cols-1"}`}>
          <div>
            <p className="text-sm font-bold">今日のチェックイン</p>
            <p className="numeric-text mt-4 flex items-end gap-1 text-[2.45rem] font-semibold leading-none tracking-normal">
              <span>{typeof displayedWeight === "number" ? round1(displayedWeight) : "-"}</span>
              <span className="mb-1 text-base font-semibold">kg</span>
              {average7Trend && (
                <span className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full ${average7Trend === "up" ? "text-clay" : "text-moss"}`} aria-label={`${props.weightDisplayMode === "average7" ? "前回の7日平均" : "現在の7日平均"}より${average7Trend === "up" ? "上" : "下"}`} title={`${props.weightDisplayMode === "average7" ? "前回の7日平均" : "現在の7日平均"}より${average7Trend === "up" ? "上" : "下"}`}>
                  {average7Trend === "up" ? <ArrowUp size={16} strokeWidth={2.6} /> : <ArrowDown size={16} strokeWidth={2.6} />}
                </span>
              )}
            </p>
            <p className="numeric-text mt-1.5 text-xs text-moss">
              {props.weightDisplayMode === "average7" ? `今日 ${round1(weight)}kg` : `7日平均 ${average7 ? `${average7}kg` : "-"}`}
              {typeof weightDelta === "number" ? ` / 前日比 ${weightDelta > 0 ? "+" : ""}${weightDelta}kg` : ""}
            </p>
          </div>
          {shouldShowBodyFat && (
            <div className="text-right">
              <p className="numeric-text text-[2.05rem] font-semibold leading-none tracking-normal">
                {typeof displayedBodyFat === "number" ? (
                  <>{round1(displayedBodyFat)}<span className="ml-1 text-sm font-semibold">%</span></>
                ) : (
                  "-"
                )}
              </p>
              <p className="mt-1.5 text-xs text-moss">{props.bodyFatDisplayMode === "average7" ? "体脂肪率 7日平均" : "体脂肪率"}</p>
            </div>
          )}
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <section className="home-glass-card home-mini-card p-4">
          <p className="text-sm font-bold">{props.isEditingPastDate ? "この日の記録" : "今日の記録"}</p>
          <div className="mt-4 space-y-2">
            <button className="flex w-full items-center justify-between gap-2 rounded-2xl px-1 py-1 text-left transition active:scale-[0.98]" onClick={props.openTodayFoodLog}>
              <span className="text-sm text-moss">食事</span>
              <span className="numeric-text min-w-0 truncate text-right text-sm font-semibold">{foodSummary}</span>
            </button>
            <button className="flex w-full items-center justify-between gap-2 rounded-2xl px-1 py-1 text-left transition active:scale-[0.98]" onClick={props.openTodayWorkoutLog}>
              <span className="text-sm text-moss">筋トレ</span>
              <span className="numeric-text min-w-0 truncate text-right text-sm font-semibold">{workoutSummary}</span>
            </button>
          </div>
        </section>

        <section className="home-glass-card home-mini-card p-4">
          <button className="w-full text-left" onClick={() => props.setTab("workout")}>
            <p className="text-sm font-bold">今週の運動</p>
            <div className="mt-4 space-y-3">
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
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/25 px-4 pb-4" onClick={() => setIsCheckInOpen(false)}>
          <div className="home-sheet max-h-[88vh] w-full max-w-[430px] overflow-y-auto p-5" onClick={(event) => event.stopPropagation()}>
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
            <section className="checkin-display-settings mt-4">
              <p className="text-sm font-bold">Homeに表示する数値</p>
              <p className="mt-1 text-xs text-moss">記録は変えず、チェックイン欄の見せ方だけを選べます。</p>
              <div className="mt-3">
                <p className="text-xs font-bold text-moss">体重</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(Object.keys(homeWeightDisplayLabels) as HomeWeightDisplay[]).map((mode) => (
                    <button
                      className={`mode-button min-h-10 text-xs ${props.weightDisplayMode === mode ? "mode-button-active" : ""}`}
                      key={mode}
                      aria-pressed={props.weightDisplayMode === mode}
                      onClick={() => void saveCheckInDisplay({ home_weight_display: mode })}
                    >
                      {homeWeightDisplayLabels[mode]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs font-bold text-moss">体脂肪率</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(Object.keys(homeBodyFatDisplayLabels) as HomeBodyFatDisplay[]).map((mode) => (
                    <button
                      className={`mode-button min-h-10 text-xs ${props.bodyFatDisplayMode === mode ? "mode-button-active" : ""}`}
                      key={mode}
                      aria-pressed={props.bodyFatDisplayMode === mode}
                      onClick={() => void saveCheckInDisplay({ home_body_fat_display: mode })}
                    >
                      {homeBodyFatDisplayLabels[mode]}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            <button className="primary-button mt-5 w-full" onClick={saveCheckIn}><Save size={16} />保存</button>
          </div>
        </div>
      )}
      {isPerfectFoodOpen && (
        <PerfectFoodModal
          dayTotals={props.dayTotals}
          goal={props.goal}
          menuItems={props.menuItems}
          foodEntries={props.todayEntries}
          onClose={() => setIsPerfectFoodOpen(false)}
          onLog={logPerfectFood}
        />
      )}
      {isEstimateDetailOpen && (
        <NutritionEstimateDetailSheet
          estimate={dailyEstimate}
          isPastDate={props.isEditingPastDate}
          calorieDelta={calorieDelta}
          remainingDisplayMode={props.nutritionRemainingDisplayMode}
          onRemainingDisplayChange={saveNutritionRemainingDisplay}
          onClose={() => setIsEstimateDetailOpen(false)}
        />
      )}
      {isGoalSummaryOpen && (
        <GoalSummarySheet
          goal={props.goal}
          onClose={() => setIsGoalSummaryOpen(false)}
          onEdit={() => {
            setIsGoalSummaryOpen(false);
            props.openGoalSettings();
          }}
        />
      )}
      </div>
    </div>
  );
}

function GoalSummarySheet({ goal, onClose, onEdit }: { goal?: Goal; onClose: () => void; onEdit: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="home-sheet goal-summary-sheet max-h-[86vh] w-full max-w-[430px] overflow-y-auto p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">現在のゴール</p>
            <p className="mt-1 text-xs font-semibold text-moss">今日の食事と運動は、この目標を基準に表示されます。</p>
          </div>
          <button className="icon-button h-9 w-9 shrink-0" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        {goal ? (
          <>
            <div className="goal-summary-calories mt-4">
              <span>1日の目標</span>
              <strong className="numeric-text">{goal.target_calories} kcal</strong>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["P", goal.target_protein_g],
                ["F", goal.target_fat_g],
                ["C", goal.target_carbs_g],
              ].map(([label, value]) => (
                <div className="goal-summary-macro" key={label}>
                  <span>{label}</span>
                  <strong className="numeric-text">{value}g</strong>
                </div>
              ))}
            </div>
            <div className="goal-summary-details mt-3">
              <div><span>目的</span><strong>{phaseLabels[goal.phase]}</strong></div>
              {typeof goal.target_weight_kg === "number" && <div><span>目標体重</span><strong>{goal.target_weight_kg}kg</strong></div>}
              {typeof goal.target_body_fat_percentage === "number" && <div><span>目標体脂肪率</span><strong>{goal.target_body_fat_percentage}%</strong></div>}
              {goal.target_date && <div><span>目標日</span><strong>{formatJapaneseDate(goal.target_date)}</strong></div>}
            </div>
          </>
        ) : (
          <p className="nutrition-estimate-empty mt-4">ゴールがまだ設定されていません。</p>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="secondary-button" onClick={onClose}>閉じる</button>
          <button className="primary-button" onClick={onEdit}>{goal ? "ゴールを変更" : "ゴールを設定"}<ChevronRight size={17} /></button>
        </div>
      </div>
    </div>
  );
}

function NutritionEstimateDetailSheet({ estimate, isPastDate, calorieDelta, remainingDisplayMode, onRemainingDisplayChange, onClose }: {
  estimate: ReturnType<typeof getDailyNutritionEstimate>;
  isPastDate: boolean;
  calorieDelta?: number;
  remainingDisplayMode: HomeNutritionRemainingDisplay;
  onRemainingDisplayChange: (mode: HomeNutritionRemainingDisplay) => void | Promise<void>;
  onClose: () => void;
}) {
  const status = isPastDate ? getDailyEstimateStatus(calorieDelta, estimate.uncertainty.calories) : "記録中";
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="home-sheet nutrition-estimate-sheet max-h-[86vh] w-full max-w-[430px] overflow-y-auto p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">栄養値の確かさ</p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-moss">外食や写真から推定した栄養値がある日は、食べられる量を少し控えめに案内します。記録済みの数値は変わりません。</p>
          </div>
          <button className="icon-button h-9 w-9 shrink-0" aria-label="閉じる" onClick={onClose}>×</button>
        </div>

        <div className="nutrition-estimate-status mt-4">
          <span>{status}</span>
          <strong>{estimate.estimatedEntryCount
            ? estimate.estimatedCalorieShare > 0 ? `カロリー推定の割合 ${estimate.estimatedCalorieShare}%` : "カロリーへの推定影響なし"
            : "推定値なし"}</strong>
        </div>

        <section className="nutrition-display-setting mt-3">
          <p className="text-sm font-bold">ヒーローカードに表示する残り</p>
          <p className="mt-1 text-xs leading-relaxed text-moss">推定値の幅を差し引くか選べます。推定値がない日は、どちらも同じ表示です。</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(Object.keys(homeNutritionRemainingDisplayLabels) as HomeNutritionRemainingDisplay[]).map((mode) => (
              <button
                className={`mode-button min-h-11 px-2 text-xs ${remainingDisplayMode === mode ? "mode-button-active" : ""}`}
                key={mode}
                aria-pressed={remainingDisplayMode === mode}
                onClick={() => void onRemainingDisplayChange(mode)}
              >
                {homeNutritionRemainingDisplayLabels[mode]}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <NutritionRemainingCard title="記録上の残り" {...estimate.adoptedRemaining} selected={remainingDisplayMode === "recorded"} />
          <NutritionRemainingCard title="余裕をみた残り" {...estimate.safeRemaining} safe selected={remainingDisplayMode === "safe"} />
        </div>

        {estimate.estimatedEntryCount > 0 ? (
          <>
            <div className="nutrition-estimate-buffer mt-3">
              <span>推定値の幅</span>
              <strong>{estimate.uncertainty.calories}kcal / P{round1(estimate.uncertainty.protein)}g / F{round1(estimate.uncertainty.fat)}g / C{round1(estimate.uncertainty.carbs)}g</strong>
            </div>
            <section className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">推定値を含む記録</p>
                <span className="mini-chip">{estimate.estimatedEntryCount}件</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-moss">カロリー推定 {estimate.estimatedCalorieEntryCount}件 / PFC推定 {estimate.macroEstimatedEntryCount}件 / 摂取量推定 {estimate.quantityEstimatedEntryCount}件{estimate.zeroCalorieEstimatedEntryCount ? ` / 0kcal推定 ${estimate.zeroCalorieEstimatedEntryCount}件` : ""}</p>
              <div className="mt-2 space-y-2">
                {estimate.entries.map(({ entry, meta, uncertainty, inferred, estimatedFields, quantityEstimated }) => (
                  <div className="nutrition-estimate-entry" key={entry.id}>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{entry.name}</p>
                      <p className="mt-1 text-xs text-moss">{nutritionEstimateEntrySummary(meta, estimatedFields, quantityEstimated, entry.confidence)}{inferred ? " · 旧データから復元" : ""}</p>
                    </div>
                    <span className="numeric-text shrink-0 text-xs font-bold">±{uncertainty.calories ?? 0}kcal / F{uncertainty.fat_g ?? 0}g</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <p className="nutrition-estimate-empty mt-3">今日の記録は公式値・確認済み入力が中心です。通常残量と安全側残量は同じです。</p>
        )}
        <button className="secondary-button mt-4 w-full" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

function NutritionRemainingCard({ title, calories, protein, fat, carbs, safe = false, selected = false }: { title: string; calories: number; protein: number; fat: number; carbs: number; safe?: boolean; selected?: boolean }) {
  return (
    <div className={`nutrition-remaining-card ${safe ? "nutrition-remaining-card-safe" : ""} ${selected ? "nutrition-remaining-card-selected" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <p>{title}</p>
        {selected && <span className="nutrition-remaining-selected-label">表示中</span>}
      </div>
      <strong>{formatSignedRemaining(calories, "kcal")}</strong>
      <span>P{formatSignedRemaining(protein, "g")} / F{formatSignedRemaining(fat, "g")} / C{formatSignedRemaining(carbs, "g")}{safe ? "（Pは確保目安）" : ""}</span>
    </div>
  );
}

function nutritionEstimateEntrySummary(meta: NutritionMeta, estimatedFields: Array<"calories" | "protein_g" | "fat_g" | "carbs_g">, quantityEstimated: boolean, confidence: Confidence) {
  const labels = estimatedFields.map((field) => ({ calories: "kcal", protein_g: "P", fat_g: "F", carbs_g: "C" })[field]);
  if (quantityEstimated) labels.push("量");
  const source = meta.nutrient_evidence?.calories?.origin ?? meta.origin;
  return `${nutritionOriginLabel(source)} · ${labels.length ? `${labels.join("/")}推定` : "量推定"} · ${confidenceLabel(meta.nutrient_evidence?.calories?.confidence ?? confidence)}`;
}

function getDailyEstimateStatus(calorieDelta: number | undefined, uncertaintyCalories: number) {
  if (typeof calorieDelta !== "number") return "目標未設定";
  if (calorieDelta > Math.max(100, uncertaintyCalories)) return "目標オーバー";
  if (calorieDelta > 0 || Math.abs(calorieDelta) <= Math.max(100, uncertaintyCalories)) return "ほぼ目標内";
  return "目標より少なめ";
}

function formatSignedRemaining(value: number, unit: string, prefix = "") {
  const rounded = unit === "kcal" ? Math.round(Math.abs(value)) : round1(Math.abs(value));
  return value >= 0 ? `${prefix}残り${rounded}${unit}` : `${prefix}超過${rounded}${unit}`;
}

function nutritionOriginLabel(origin: NutritionOrigin) {
  return {
    official_website: "公式サイト",
    package_label: "商品ラベル",
    user_measured: "実測",
    user_entered: "ユーザー入力",
    brand_match: "ブランド近似",
    ai_photo_estimate: "AI写真推定",
    manual_estimate: "手動推定",
    derived_calculation: "計算推定",
    unknown: "推定元不明",
  }[origin];
}

function scaleNutritionMeta(meta: NutritionMeta | undefined, multiplier: number) {
  if (!meta || !Number.isFinite(multiplier) || multiplier === 1) return meta;
  const scale = Math.max(0, multiplier);
  const legacyUncertainty = meta.uncertainty;
  return {
    ...meta,
    uncertainty: legacyUncertainty && {
      calories: legacyUncertainty.calories === undefined ? undefined : Math.round(legacyUncertainty.calories * scale),
      protein_g: legacyUncertainty.protein_g === undefined ? undefined : round1(legacyUncertainty.protein_g * scale),
      fat_g: legacyUncertainty.fat_g === undefined ? undefined : round1(legacyUncertainty.fat_g * scale),
      carbs_g: legacyUncertainty.carbs_g === undefined ? undefined : round1(legacyUncertainty.carbs_g * scale),
    },
    nutrient_evidence: meta.nutrient_evidence && Object.fromEntries(Object.entries(meta.nutrient_evidence).map(([key, evidence]) => [key, evidence && {
      ...evidence,
      uncertainty: evidence.uncertainty && {
        minus: evidence.uncertainty.minus === undefined ? undefined : round1(evidence.uncertainty.minus * scale),
        plus: evidence.uncertainty.plus === undefined ? undefined : round1(evidence.uncertainty.plus * scale),
      },
    }])),
    quantity_meta: meta.quantity_meta && {
      ...meta.quantity_meta,
      estimated_amount: meta.quantity_meta.estimated_amount === undefined ? undefined : round1(meta.quantity_meta.estimated_amount * scale),
      uncertainty_amount: meta.quantity_meta.uncertainty_amount === undefined ? undefined : round1(meta.quantity_meta.uncertainty_amount * scale),
    },
    components: meta.components?.map((component) => ({
      ...component,
      calories: component.calories === undefined ? undefined : Math.round(component.calories * scale),
      protein_g: component.protein_g === undefined ? undefined : round1(component.protein_g * scale),
      fat_g: component.fat_g === undefined ? undefined : round1(component.fat_g * scale),
      carbs_g: component.carbs_g === undefined ? undefined : round1(component.carbs_g * scale),
    })),
    nutrition_candidate: meta.nutrition_candidate && {
      ...meta.nutrition_candidate,
      calories: Math.round(meta.nutrition_candidate.calories * scale),
      protein_g: round1(meta.nutrition_candidate.protein_g * scale),
      fat_g: round1(meta.nutrition_candidate.fat_g * scale),
      carbs_g: round1(meta.nutrition_candidate.carbs_g * scale),
      salt_g: meta.nutrition_candidate.salt_g === undefined ? undefined : round1(meta.nutrition_candidate.salt_g * scale),
    },
  };
}

function PerfectFoodModal({ dayTotals, goal, menuItems, foodEntries, onClose, onLog }: {
  dayTotals: ReturnType<typeof sumFood>;
  goal?: Goal;
  menuItems: MenuItem[];
  foodEntries: FoodEntry[];
  onClose: () => void;
  onLog: (item: MenuItem) => void | Promise<void>;
}) {
  const [page, setPage] = useState<0 | 1>(0);
  const [plans, setPlans] = useState<PerfectFoodPlan[]>(["none"]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const estimate = useMemo(() => getDailyNutritionEstimate(foodEntries, dayTotals, goal, menuItems), [foodEntries, dayTotals.calories, dayTotals.protein, dayTotals.fat, dayTotals.carbs, goal, menuItems]);
  const remaining = getRemainingNutrition(dayTotals, goal);
  const safeRemaining = {
    calories: Math.max(0, estimate.safeRemaining.calories),
    protein: Math.max(0, estimate.safeRemaining.protein),
    fat: Math.max(0, estimate.safeRemaining.fat),
    carbs: Math.max(0, estimate.safeRemaining.carbs),
  };
  const planned = getPlannedNutrition(plans);
  const adjusted = {
    calories: Math.max(0, safeRemaining.calories - planned.calories),
    protein: Math.max(0, safeRemaining.protein - planned.protein),
    fat: Math.max(0, safeRemaining.fat - planned.fat),
    carbs: Math.max(0, safeRemaining.carbs - planned.carbs),
  };
  const suggestionGroups = useMemo(() => buildPerfectFoodSuggestions(menuItems, adjusted, plans, "fit"), [menuItems, adjusted.calories, adjusted.protein, adjusted.fat, adjusted.carbs, plans]);
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
            <p className="mt-1 text-xs text-moss">{page === 0 ? "計算から引く予定" : "残り枠で食べられる候補"}</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["予定", "候補"].map((label, index) => (
            <button className={`mini-chip ${page === index ? "mini-chip-active" : ""}`} key={label} onClick={() => setPage(index as 0 | 1)}>{label}</button>
          ))}
        </div>

        {page === 0 && (
          <div className="mt-5 space-y-4">
            <p className="text-sm font-semibold text-moss">このあと食べる予定があるものを、候補計算から先に引きます。</p>
            <div className="grid gap-2">
              {perfectFoodPlans.map((plan) => (
                <button className={`choice-button justify-between px-4 ${plans.includes(plan.id) ? "choice-button-active" : ""}`} key={plan.id} onClick={() => togglePlan(plan.id)}>
                  <span>{plan.label}</span>
                  <span className="numeric-text text-xs text-moss">{plan.summary}</span>
                </button>
              ))}
            </div>
            <div className="perfect-food-panel rounded-md bg-rice p-3">
              <p className="text-xs font-bold text-moss">計算に使う安全側の残り</p>
              <p className="numeric-text mt-2 text-sm font-bold">あと {Math.round(adjusted.calories)}kcal / P{round1(adjusted.protein)} F{round1(adjusted.fat)} C{round1(adjusted.carbs)}</p>
              {estimate.estimatedEntryCount > 0 && <p className="mt-2 text-[11px] font-semibold text-moss">記録上は残り{Math.max(0, Math.round(remaining.calories))}kcal / P{round1(Math.max(0, remaining.protein))} / F{round1(Math.max(0, remaining.fat))} / C{round1(Math.max(0, remaining.carbs))}。推定幅を考慮して候補を絞っています。</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={onClose}>閉じる</button>
              <button className="primary-button" onClick={() => setPage(1)}>候補を見る</button>
            </div>
          </div>
        )}

        {page === 1 && (
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
                    const fit = getPerfectFoodFit(item, adjusted, "fit");
                    return (
                      <div className={`perfect-food-item perfect-food-item-${fit.tone} rounded-xl bg-surface/70 p-3`} key={item.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">{formatMenuItemName(item)}</p>
                            <p className="numeric-text mt-1 text-xs text-moss">{item.brand ? `${item.brand} · ` : ""}{item.calories}kcal · P{round1(item.protein_g)} F{round1(item.fat_g)} C{round1(item.carbs_g)}</p>
                            <p className="mt-3 text-[11px] font-black text-moss">食後の残り枠</p>
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
              <button className="secondary-button" onClick={() => setPage(0)}>戻る</button>
              <button className="primary-button" onClick={onClose}>閉じる</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChainComboModal({ brand, menuItems, variantIndex, remainingNutrition, adoptedRemainingNutrition, foodEntries, initialMainItem, onClose, onPick }: {
  brand: string;
  menuItems: MenuItem[];
  variantIndex: MenuSizeVariantIndex;
  remainingNutrition: { calories: number; protein: number; fat: number; carbs: number };
  adoptedRemainingNutrition: { calories: number; protein: number; fat: number; carbs: number };
  foodEntries: FoodEntry[];
  initialMainItem?: MenuItem;
  onClose: () => void;
  onPick: (candidate: ChainComboCandidate) => void;
}) {
  const [mode, setMode] = useState<ChainComboMode>(initialMainItem ? "main" : "auto");
  const [selectedMainId, setSelectedMainId] = useState(initialMainItem?.id);
  const usageMap = useMemo(() => buildFoodUsageMap(foodEntries), [foodEntries]);
  const mainCandidates = useMemo(() => (
    menuItems
      .filter(isChainComboMainItem)
      .sort((a, b) => chainComboUsageBoost(b, usageMap) - chainComboUsageBoost(a, usageMap) || b.protein_g - a.protein_g || a.calories - b.calories)
      .slice(0, 36)
  ), [menuItems, usageMap]);
  const selectedMain = mainCandidates.find((item) => item.id === selectedMainId) ?? (initialMainItem && isChainComboMainItem(initialMainItem) ? initialMainItem : undefined);
  const suggestions = useMemo(() => buildChainComboSuggestions({
    menuItems,
    variantIndex,
    remainingNutrition,
    usageMap,
    selectedMain,
  }), [menuItems, variantIndex, remainingNutrition.calories, remainingNutrition.protein, remainingNutrition.fat, remainingNutrition.carbs, usageMap, selectedMain?.id]);
  const topSuggestions = suggestions.slice(0, 8);
  const remainingSummary = `あと ${Math.round(remainingNutrition.calories)}kcal / P${round1(remainingNutrition.protein)} F${round1(remainingNutrition.fat)} C${round1(remainingNutrition.carbs)}`;
  const hasSafetyAdjustment = Math.round(adoptedRemainingNutrition.calories) !== Math.round(remainingNutrition.calories)
    || round1(adoptedRemainingNutrition.protein) !== round1(remainingNutrition.protein)
    || round1(adoptedRemainingNutrition.fat) !== round1(remainingNutrition.fat)
    || round1(adoptedRemainingNutrition.carbs) !== round1(remainingNutrition.carbs);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="chain-combo-sheet home-sheet max-h-[86vh] w-full max-w-[430px] overflow-x-hidden overflow-y-auto p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-lg font-bold">おすすめの組み合わせ</p>
            <p className="numeric-text mt-1 text-xs font-semibold text-moss">{brand} · 安全側 {remainingSummary}</p>
            {hasSafetyAdjustment && <p className="numeric-text mt-1 text-[11px] font-semibold text-moss">記録上はあと {Math.round(adoptedRemainingNutrition.calories)}kcal / P{round1(adoptedRemainingNutrition.protein)} F{round1(adoptedRemainingNutrition.fat)} C{round1(adoptedRemainingNutrition.carbs)}</p>}
          </div>
          <button className="icon-button h-9 w-9 shrink-0" aria-label="閉じる" onClick={onClose}>×</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className={`mini-chip ${mode === "auto" ? "mini-chip-active" : ""}`}
            onClick={() => {
              setMode("auto");
              setSelectedMainId(undefined);
            }}
          >
            自動で組む
          </button>
          <button className={`mini-chip ${mode === "main" ? "mini-chip-active" : ""}`} onClick={() => setMode("main")}>
            メインを選ぶ
          </button>
        </div>

        {mode === "main" && (
          <section className="chain-combo-panel mt-4 rounded-md border border-line bg-rice/70 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-bold">先に食べたいメイン</p>
              {selectedMain && <button className="text-xs font-black text-moss" onClick={() => setSelectedMainId(undefined)}>解除</button>}
            </div>
            <div className="chain-combo-main-scroll flex gap-2 overflow-x-auto pb-1">
              {mainCandidates.slice(0, 18).map((item) => (
                <button
                  key={item.id}
                  className={`chain-combo-main-chip ${selectedMainId === item.id ? "chain-combo-main-chip-active" : ""}`}
                  onClick={() => setSelectedMainId(item.id)}
                >
                  <span className="truncate">{formatMenuItemName(item)}</span>
                  <span className="numeric-text">{item.calories}kcal P{round1(item.protein_g)}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-4 space-y-3">
          {topSuggestions.length ? topSuggestions.map((suggestion, index) => (
            <section className="chain-combo-card perfect-food-group rounded-md border border-line bg-rice/70 p-3" key={suggestion.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="recommendation-rank-badge">組み合わせ{index + 1}位</span>
                    <span className="mini-chip">{suggestion.reason}</span>
                  </div>
                  <p className="chain-combo-title mt-2 text-sm font-black">{suggestion.title}</p>
                  <p className="numeric-text mt-1 text-xs font-semibold text-moss">
                    {suggestion.nutrition.calories}kcal · P{round1(suggestion.nutrition.protein_g)} F{round1(suggestion.nutrition.fat_g)} C{round1(suggestion.nutrition.carbs_g)}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid gap-2">
                {suggestion.items.map((candidate) => (
                  <div className="chain-combo-action rounded-xl border border-line p-3" key={`${suggestion.id}-${candidate.item.id}-${candidate.portionLabel ?? "base"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="chain-combo-item-title text-sm font-bold">{formatChainComboCandidateDisplayName(candidate)}</p>
                        <p className="numeric-text mt-1 text-xs text-moss">
                          {candidate.role === "main" ? "メイン" : "追加"}{candidate.portionLabel ? ` · ${candidate.portionLabel}` : ""} · {candidate.nutrition.calories}kcal
                        </p>
                      </div>
                      <button className="chain-combo-record-button shrink-0 px-3 py-2 text-xs" onClick={() => onPick(candidate)}>記録</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-[11px] font-black text-moss">食後の残り枠</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {formatChainComboRemainingChips(suggestion.remainingAfter).map((chip) => (
                    <span className={`perfect-food-detail-chip perfect-food-detail-${chip.tone}`} key={chip.label}>{chip.label}</span>
                  ))}
                </div>
              </div>
            </section>
          )) : (
            <p className="perfect-food-panel rounded-md bg-rice p-4 text-center text-sm font-semibold text-moss">
              このチェーン内で組み合わせ候補を作れませんでした。
            </p>
          )}
        </div>

        <button className="secondary-button mt-4 w-full" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

function getPerfectFoodFit(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }, mode: PerfectFoodMode = "improve") {
  const balance = getPerfectFoodBalance(item, target);
  const details: { label: string; tone: "protein" | "ok" | "warn" | "over" }[] = [];
  const calorieLeftLabel = balance.calorieOver > 25 ? `kcal超過${Math.round(balance.calorieOver)}` : `残り${Math.max(0, Math.round(balance.calorieLeft))}kcal`;
  details.push({ label: calorieLeftLabel, tone: balance.calorieOver > 25 ? "over" : balance.calorieLeft <= 100 ? "warn" : "ok" });
  if (target.protein > 0) {
    details.push(balance.proteinLeft > 0.5
      ? { label: `P残り${round1(balance.proteinLeft)}g`, tone: "protein" }
      : { label: "P残り0g", tone: "ok" });
  }
  if (target.fat > 0) {
    details.push(balance.fatOver > 0.5
      ? { label: `F超過${round1(balance.fatOver)}g`, tone: "over" }
      : { label: `F残り${round1(Math.max(0, balance.fatLeft))}g`, tone: balance.fatLeft <= 3 ? "warn" : "ok" });
  }
  if (target.carbs > 0) {
    details.push(balance.carbsOver > 0.5
      ? { label: `C超過${round1(balance.carbsOver)}g`, tone: "over" }
      : { label: `C残り${round1(Math.max(0, balance.carbsLeft))}g`, tone: balance.carbsLeft <= 10 ? "warn" : "ok" });
  }

  if (mode === "fit") {
    if (balance.hasOver) return { tone: "over" as const, label: "超過あり", details };
    if (balance.nonProteinLoad >= 0.88) return { tone: "tight" as const, label: "残り少なめ", details };
    return { tone: "good" as const, label: "枠内", details };
  }

  if (balance.hasOver) return { tone: "over" as const, label: "超過あり", details };
  if (balance.proteinLeft > Math.max(8, target.protein * 0.35)) return { tone: "easy" as const, label: "P補給", details };
  if (balance.nonProteinLoad >= 0.88) return { tone: "tight" as const, label: "あと少し", details };
  if (balance.proteinLeft <= 0.5 && balance.nonProteinLoad >= 0.45) return { tone: "good" as const, label: "かなり近い", details };
  return { tone: "good" as const, label: "近づく", details };
}

function PerfectFoodMetric({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="perfect-food-panel rounded-md bg-rice p-3">
      <p className="text-xs font-bold text-moss">{label}</p>
      <p className="numeric-text mt-2 text-lg font-black">{round1(value)}<span className="ml-1 text-xs font-bold">{suffix}</span></p>
    </div>
  );
}

function UpdateNotesModal({ updates, onClose, onOpenTrophies }: {
  updates: AppUpdate[];
  onClose: () => void;
  onOpenTrophies?: () => void;
}) {
  const latestUpdate = updates[0];
  const latestUpdateHasTrophy = !!latestUpdate && (
    latestUpdate.title.includes("トロフィー") ||
    latestUpdate.items.some((item) => item.includes("トロフィー"))
  );
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
        {latestUpdateHasTrophy && onOpenTrophies && (
          <button className="primary-button mt-4 w-full" onClick={() => {
            onClose();
            onOpenTrophies();
          }}>
            <Trophy size={17} />トロフィー攻略を見る
          </button>
        )}
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
  activeSpecialMode?: ActiveSpecialMode;
  focus?: FoodFocus;
  openMyMenuSettings: () => void;
  onFocusHandled: () => void;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  unlockAchievement: (id: string) => void;
}) {
  const foodTopRef = useRef<HTMLDivElement | null>(null);
  const foodSearchFormRef = useRef<HTMLFormElement | null>(null);
  const foodSearchInputRef = useRef<HTMLInputElement | null>(null);
  const chainSectionRef = useRef<HTMLElement | null>(null);
  const chainListRef = useRef<HTMLDivElement | null>(null);
  const genericSectionRef = useRef<HTMLElement | null>(null);
  const foodResultsRef = useRef<HTMLElement | null>(null);
  const todayLogRef = useRef<HTMLElement | null>(null);
  const persistedFoodSearchState = useMemo(() => readPersistedFoodSearchState(), []);
  const initialChainCategory = persistedFoodSearchState.chainCategory ?? "牛丼・丼";
  const [mode, setMode] = useState<FoodMode>(persistedFoodSearchState.mode ?? "search");
  const [query, setQuery] = useState(persistedFoodSearchState.query ?? "");
  const [selected, setSelected] = useState<MenuItem>();
  const [editingEntry, setEditingEntry] = useState<{ entry: FoodEntry; draft: FoodEntryEditDraft }>();
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [foodAddStep, setFoodAddStep] = useState<FoodAddStep>("size");
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [portionQuantity, setPortionQuantity] = useState(1);
  const [staplePortionMultipliers, setStaplePortionMultipliers] = useState<StaplePortionMultipliers>({});
  const [manual, setManual] = useState({ ...emptyManual, savePreset: true });
  const [manualWizardStep, setManualWizardStep] = useState<ManualFoodWizardStep>("basic");
  const [isMyMenuRegistrationOpen, setIsMyMenuRegistrationOpen] = useState(false);
  const [myMenuRegistrationMethod, setMyMenuRegistrationMethod] = useState<"manual" | "ai" | undefined>();
  const [menuOverwriteTarget, setMenuOverwriteTarget] = useState<MenuOverwriteTarget>();
  const [isAiFoodImportOpen, setIsAiFoodImportOpen] = useState(false);
  const [aiFoodImportIntent, setAiFoodImportIntent] = useState<AiFoodImportIntent>("log");
  const [aiFoodImportStep, setAiFoodImportStep] = useState<AiFoodImportStep>("prompt");
  const [aiFoodImportText, setAiFoodImportText] = useState("");
  const [aiFoodImportItems, setAiFoodImportItems] = useState<AiFoodBridgeItem[]>([]);
  const [aiFoodImportSelections, setAiFoodImportSelections] = useState<Record<number, AiFoodImportSelection>>({});
  const [aiFoodImportError, setAiFoodImportError] = useState("");
  const [copiedAiFoodPrompt, setCopiedAiFoodPrompt] = useState(false);
  const [aiFoodMealType, setAiFoodMealType] = useState<MealType>("lunch");
  const [chainCategory, setChainCategory] = useState(initialChainCategory);
  const [brand, setBrand] = useState(persistedFoodSearchState.brand ?? chainCategories[initialChainCategory]?.[0] ?? "松屋");
  const [generalCategory, setGeneralCategory] = useState(persistedFoodSearchState.generalCategory ?? "ごはん・丼");
  const [recommendCategory, setRecommendCategory] = useState<RecommendedFoodFilter>(persistedFoodSearchState.recommendCategory ?? "all");
  const [isChainComboOpen, setIsChainComboOpen] = useState(false);
  const [chainComboSeedItem, setChainComboSeedItem] = useState<MenuItem>();
  const [showGeneralFoodsOnly, setShowGeneralFoodsOnly] = useState(!!persistedFoodSearchState.showGeneralFoodsOnly);
  const [hideOverGoalItems, setHideOverGoalItems] = useState(!!persistedFoodSearchState.hideOverGoalItems);
  const [showFoodBalance, setShowFoodBalance] = useState(!!persistedFoodSearchState.showFoodBalance);
  const [sortFoodByFit, setSortFoodByFit] = useState(!!persistedFoodSearchState.sortFoodByFit);
  const [isFoodFilterOpen, setIsFoodFilterOpen] = useState(false);
  const [isFoodSearchHidden, setIsFoodSearchHidden] = useState(false);
  const [showFoodFilterIntro, setShowFoodFilterIntro] = useState(() => localStorage.getItem(foodFitFilterSeenStorageKey) !== "1");
  const [showMyMenuIntro, setShowMyMenuIntro] = useState(() => localStorage.getItem(foodMyMenuIntroSeenStorageKey) !== "1");
  const multiplier = Math.max(0, portionMultiplier * portionQuantity);

  const favoriteItems = useMemo(() => props.menuItems.filter((item) => item.is_favorite), [props.menuItems]);
  const menuItemsById = useMemo(() => new Map(props.menuItems.map((item) => [item.id, item])), [props.menuItems]);
  const menuSearchTextById = useMemo(() => buildMenuSearchTextIndex(props.menuItems), [props.menuItems]);
  const menuSizeVariantIndex = useMemo(() => buildMenuSizeVariantIndex(props.menuItems), [props.menuItems]);
  const recentFoodEntries = useMemo(
    () => [...props.foodEntries].sort((a, b) => b.logged_at.localeCompare(a.logged_at)).slice(0, 10),
    [props.foodEntries],
  );
  const chainComboMenuItems = useMemo(() => (
    mergeMenuSizeVariantItems(
      mergeGenericDuplicateMenuItems(dedupeMenuItemsBySource(props.menuItems.filter((item) => item.brand === brand))),
      menuSizeVariantIndex,
    )
  ), [props.menuItems, brand, menuSizeVariantIndex]);
  const aiFoodMatchCandidates = useMemo(
    () => aiFoodImportItems.map((item) => buildAiFoodImportCandidates(item, props.menuItems)),
    [aiFoodImportItems, props.menuItems],
  );
  const scrollToFoodTop = () => {
    window.requestAnimationFrame(() => foodTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const focusFoodSearch = () => {
    scrollToFoodTop();
    window.setTimeout(() => foodSearchInputRef.current?.focus({ preventScroll: true }), 360);
  };
  const dismissFoodKeyboard = () => {
    if (document.activeElement === foodSearchInputRef.current) foodSearchInputRef.current?.blur();
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
  const scrollToGenericSection = () => {
    window.setTimeout(() => genericSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const dismissFoodFilterIntro = () => {
    setShowFoodFilterIntro(false);
    localStorage.setItem(foodFitFilterSeenStorageKey, "1");
  };
  const dismissMyMenuIntro = () => {
    setShowMyMenuIntro(false);
    localStorage.setItem(foodMyMenuIntroSeenStorageKey, "1");
  };
  const openFoodFilterOptions = () => {
    props.unlockAchievement("used_food_filter");
    setIsFoodFilterOpen((value) => !value);
    if (showFoodFilterIntro) dismissFoodFilterIntro();
  };
  const resetFoodSearchFilters = () => {
    setShowGeneralFoodsOnly(false);
    setHideOverGoalItems(false);
    setShowFoodBalance(false);
    setSortFoodByFit(false);
    props.showToast("検索フィルターをリセットしました");
  };
  useEffect(() => {
    const persistedMode = persistedFoodModes.has(mode) ? mode : "search";
    localStorage.setItem(foodSearchStateStorageKey, JSON.stringify({
      mode: persistedMode,
      query,
      brand,
      chainCategory,
      generalCategory,
      recommendCategory,
      showGeneralFoodsOnly,
      hideOverGoalItems,
      showFoodBalance,
      sortFoodByFit,
    } satisfies PersistedFoodSearchState));
  }, [mode, query, brand, chainCategory, generalCategory, recommendCategory, showGeneralFoodsOnly, hideOverGoalItems, showFoodBalance, sortFoodByFit]);
  useEffect(() => {
    const update = () => {
      const target = foodSearchFormRef.current;
      if (!target) {
        setIsFoodSearchHidden(false);
        return;
      }
      setIsFoodSearchHidden(target.getBoundingClientRect().bottom < 72);
    };
    window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const interval = window.setInterval(update, 250);
    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (props.focus !== "todayLog") return;
    const timer = window.setTimeout(() => {
      todayLogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onFocusHandled();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [props.focus]);
  useEffect(() => {
    if (props.focus !== "favorite") return;
    setMode("favorite");
    setQuery("");
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
    setMenuOverwriteTarget(undefined);
    const timer = window.setTimeout(() => {
      scrollToFoodTop();
      props.onFocusHandled();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [props.focus]);
  useEffect(() => {
    if (props.focus !== "specialMode" || !props.activeSpecialMode?.foodQuery) return;
    setMode("search");
    setQuery(props.activeSpecialMode.foodQuery);
    const timer = window.setTimeout(() => {
      foodSearchInputRef.current?.focus({ preventScroll: true });
      scrollToFoodResults();
      props.onFocusHandled();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [props.focus, props.activeSpecialMode?.id]);
  const selectFoodItem = (item: MenuItem) => {
    setPortionMultiplier(isMisoSoupSwitchItem(item) ? 0 : 1);
    setPortionQuantity(1);
    setStaplePortionMultipliers({});
    setMealType(item.default_meal_type ?? mealType);
    setFoodAddStep("size");
    setSelected(item);
  };
  const selectChainComboCandidate = (candidate: ChainComboCandidate) => {
    setPortionMultiplier(candidate.portionMultiplier);
    setPortionQuantity(1);
    setStaplePortionMultipliers(candidate.staplePortionMultipliers ?? {});
    setMealType(candidate.item.default_meal_type ?? mealType);
    setFoodAddStep("size");
    setSelected(candidate.item);
  };
  const openChainCombo = (seedItem?: MenuItem) => {
    setChainComboSeedItem(seedItem);
    setIsChainComboOpen(true);
  };
  const selectMode = (nextMode: FoodMode) => {
    if (nextMode === "ai") {
      openAiFoodImport();
      return;
    }
    setMode(nextMode);
    if (nextMode === "personal" && showMyMenuIntro) dismissMyMenuIntro();
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
    setMenuOverwriteTarget(undefined);
    setIsChainComboOpen(false);
    setChainComboSeedItem(undefined);
    if (nextMode !== "search") setQuery("");
    if (nextMode === "chain") {
      scrollToChainSection();
      return;
    }
    if (nextMode === "quick") {
      scrollToGenericSection();
      return;
    }
    if (nextMode === "recommend") {
      scrollToFoodResults();
      return;
    }
    if (nextMode === "search" && query.trim()) {
      scrollToFoodResults();
      return;
    }
    scrollToFoodTop();
  };
  const resetAiFoodImport = () => {
    setAiFoodImportStep("prompt");
    setAiFoodImportText("");
    setAiFoodImportItems([]);
    setAiFoodImportSelections({});
    setAiFoodImportError("");
    setCopiedAiFoodPrompt(false);
    setAiFoodMealType("lunch");
  };
  const openAiFoodImport = (intent: AiFoodImportIntent = "log") => {
    setAiFoodImportIntent(intent);
    if (intent === "log") setMode("ai");
    if (intent === "menu") setMode("personal");
    setSelected(undefined);
    setEditingEntry(undefined);
    setIsMyMenuRegistrationOpen(intent === "menu");
    setMyMenuRegistrationMethod(intent === "menu" ? "ai" : undefined);
    setMenuOverwriteTarget(undefined);
    setIsAiFoodImportOpen(true);
    setAiFoodImportStep("prompt");
    setAiFoodImportError("");
  };
  const closeAiFoodImport = () => {
    setIsAiFoodImportOpen(false);
    if (aiFoodImportIntent === "menu") {
      setMode("personal");
      setIsMyMenuRegistrationOpen(true);
      setMyMenuRegistrationMethod(undefined);
    } else {
      setMode("search");
    }
    setAiFoodImportIntent("log");
  };
  const parseAiFoodImport = () => {
    const result = parseAiFoodBridgeText(aiFoodImportText);
    if (!result.items.length) {
      setAiFoodImportError(result.error || "取り込める食品データが見つかりませんでした。");
      return;
    }
    setAiFoodImportItems(result.items);
    setAiFoodImportSelections({});
    setAiFoodMealType(inferAiFoodMealType(result.items));
    setAiFoodImportError("");
    setAiFoodImportStep("read");
  };
  const logRecentFoodEntry = async (entry: FoodEntry) => {
    const timestamp = nowIso();
    await db.food_entries.put({
      ...entry,
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      created_at: timestamp,
      updated_at: timestamp,
    });
    await props.refresh();
    props.showToast(`${entry.name}を記録しました`);
  };
  const updateSearchQuery = (nextQuery: string) => {
    const wasSearching = query.trim().length > 0;
    const isSearching = nextQuery.trim().length > 0;
    setQuery(nextQuery);
    if (isSearching && !wasSearching) {
      props.unlockAchievement("used_food_search");
      if (mode !== "chain") setMode("search");
    }
  };
  const portionOptions = selected ? getPortionOptions(selected) : [];
  const selectedSizeVariants = useMemo(() => selected ? getMenuSizeVariants(selected, menuSizeVariantIndex) : [], [selected?.id, menuSizeVariantIndex]);
  const hasSelectedSizeVariants = selectedSizeVariants.length > 1;
  const selectedSizeVariantLabel = selectedSizeVariants.find((variant) => variant.item.id === selected?.id)?.label;
  const selectedDisplayName = selected
    ? hasSelectedSizeVariants
      ? selectedSizeVariants.find((variant) => variant.item.id === selected.id)?.baseName ?? formatMenuItemName(selected)
      : formatMenuItemName(selected)
    : "";
  const selectedStapleConfigs = selected ? getStaplePortionConfigs(selected) : [];
  const hasSelectedCompositeStaples = selectedStapleConfigs.length > 1;
  const selectedStapleConfig = selectedStapleConfigs[0];
  const hasSelectedSoupOptions = selectedStapleConfig?.kind === "soup";
  const hasSelectedPublishedPortionOptions = selected ? usesPublishedInlinePortionOptions(selected) : false;
  const selectedComponentPortionTitle = selectedStapleConfigs.map((config) => config.label).join("・");
  const selectedServingGrams = selected ? selectedStapleConfig?.defaultGrams ?? menuItemServingGrams(selected) : undefined;
  const defaultPortionValue = hasSelectedSoupOptions ? 0 : 1;
  const defaultPortionOption = portionOptions.find((option) => option.value === defaultPortionValue) ?? portionOptions[0];
  const customPortionOptions = portionOptions.filter((option) => option.value !== defaultPortionOption?.value);
  const selectedPortionOptionLabel = portionOptions.find((option) => option.value === portionMultiplier)?.label;
  const canCustomizeSelectedPortion = !!selected
    && !usesOfficialFixedSizeOptions(selected)
    && !hasSelectedPublishedPortionOptions
    && !hasSelectedSoupOptions
    && (hasSelectedCompositeStaples || !!selectedStapleConfig || customPortionOptions.length > 0 || !!selectedServingGrams);
  const selectedExactSizeVariant = useMemo(
    () => selected && selectedServingGrams && hasSelectedSizeVariants && !hasSelectedCompositeStaples
      ? findExactMenuSizeVariantByGrams(selected, menuSizeVariantIndex, selectedServingGrams * portionMultiplier)
      : undefined,
    [selected?.id, selectedServingGrams, hasSelectedSizeVariants, hasSelectedCompositeStaples, portionMultiplier, menuSizeVariantIndex],
  );
  const selectedSizeVariantTargetGrams = selected && selectedServingGrams && hasSelectedSizeVariants && !hasSelectedCompositeStaples
    ? selectedServingGrams * portionMultiplier
    : undefined;
  const selectedSizeVariantNutrition = useMemo(
    () => selected && selectedSizeVariantTargetGrams && hasSelectedSizeVariants && !hasSelectedCompositeStaples
      ? getSizeVariantNutritionForTargetGrams(selected, menuSizeVariantIndex, selectedSizeVariantTargetGrams)
      : undefined,
    [selected?.id, selectedSizeVariantTargetGrams, hasSelectedSizeVariants, hasSelectedCompositeStaples, menuSizeVariantIndex],
  );
  const selectedExactSizeVariantLabel = selectedExactSizeVariant ? menuSizeVariantIndex.variantsByItemId.get(selectedExactSizeVariant.id)?.label : undefined;
  const selectedResolvedItem = selectedExactSizeVariant ?? selected;
  const selectedCompositePortionLabel = hasSelectedCompositeStaples
    ? selectedStapleConfigs.map((config) => formatStaplePortionLabel(config, staplePortionMultipliers[config.kind] ?? 1)).join(" / ")
    : undefined;
  const hasSelectedCustomPortion = hasSelectedCompositeStaples
    ? selectedStapleConfigs.some((config) => (staplePortionMultipliers[config.kind] ?? 1) !== 1)
    : selectedExactSizeVariant
      ? false
      : portionMultiplier !== (defaultPortionOption?.value ?? 1);
  const selectedPortionLabel = selected
    ? selectedExactSizeVariantLabel
      ?? (hasSelectedSizeVariants && portionMultiplier === 1 ? selectedSizeVariantLabel : undefined)
      ?? selectedCompositePortionLabel
      ?? selectedPortionOptionLabel
      ?? (selectedStapleConfig && selectedServingGrams ? `${selectedStapleConfig.label}${formatControlValue(round1(selectedServingGrams * portionMultiplier))}g` : undefined)
      ?? (selectedServingGrams ? `${formatControlValue(round1(selectedServingGrams * portionMultiplier))}g` : "カスタム")
    : "";
  const selectedPortionLogLabel = selected
    ? formatFoodPortionLogLabel({
      portionLabel: selectedPortionLabel,
      quantity: portionQuantity,
      forceSingleQuantity: hasSelectedCustomPortion,
    })
    : undefined;
  const selectedNutrition = selectedResolvedItem
    ? selectedSizeVariantNutrition
      ? {
        calories: Math.round(selectedSizeVariantNutrition.calories * portionQuantity),
        protein_g: round1(selectedSizeVariantNutrition.protein_g * portionQuantity),
        fat_g: round1(selectedSizeVariantNutrition.fat_g * portionQuantity),
        carbs_g: round1(selectedSizeVariantNutrition.carbs_g * portionQuantity),
        salt_g: selectedSizeVariantNutrition.salt_g === undefined ? undefined : round1(selectedSizeVariantNutrition.salt_g * portionQuantity),
      }
      : getAdjustedMenuNutrition(
        selectedResolvedItem,
        selectedExactSizeVariant ? 1 : portionMultiplier,
        portionQuantity,
        selectedExactSizeVariant ? undefined : hasSelectedCompositeStaples ? staplePortionMultipliers : undefined,
      )
    : undefined;
  const selectedEntryPortionMultiplier = hasSelectedSoupOptions
    ? Math.max(1, portionQuantity)
    : selectedExactSizeVariant || selectedSizeVariantNutrition || hasSelectedCompositeStaples
      ? Math.max(0, portionQuantity)
      : multiplier;
  const selectedCalories = selectedNutrition?.calories ?? 0;
  const selectedProtein = selectedNutrition?.protein_g ?? 0;
  const selectedFat = selectedNutrition?.fat_g ?? 0;
  const selectedCarbs = selectedNutrition?.carbs_g ?? 0;
  const selectedSalt = selectedNutrition?.salt_g;
  const isGlobalSearch = query.trim().length > 0;
  const adoptedRemainingNutrition = getRemainingNutrition(props.dayTotals, props.goal);
  const currentDayFoodEntries = useMemo(() => props.foodEntries.filter((entry) => entry.app_date === props.appDate), [props.foodEntries, props.appDate]);
  const currentDayEstimate = useMemo(
    () => getDailyNutritionEstimate(currentDayFoodEntries, props.dayTotals, props.goal, props.menuItems),
    [currentDayFoodEntries, props.dayTotals.calories, props.dayTotals.protein, props.dayTotals.fat, props.dayTotals.carbs, props.goal, props.menuItems],
  );
  const remainingNutrition = {
    calories: Math.max(0, currentDayEstimate.safeRemaining.calories),
    protein: Math.max(0, currentDayEstimate.safeRemaining.protein),
    fat: Math.max(0, currentDayEstimate.safeRemaining.fat),
    carbs: Math.max(0, currentDayEstimate.safeRemaining.carbs),
  };
  const canUseOverGoalFilter = !!props.goal && props.goal.target_calories > 0;
  const canShowFoodBalance = canUseOverGoalFilter;
  const isChainScopedSearch = mode === "chain" && !!brand;
  const isChainOrConvenienceMenuView = mode === "chain";
  const canSortFoodByFit = canUseOverGoalFilter && isChainOrConvenienceMenuView;
  const isSortFoodByFitActive = sortFoodByFit && canSortFoodByFit;
  const isFoodFitFilterActive = showGeneralFoodsOnly || (hideOverGoalItems && canUseOverGoalFilter) || (showFoodBalance && canShowFoodBalance) || isSortFoodByFitActive;
  const searchPlaceholder = isChainScopedSearch ? `${brand}内を検索` : "食品・ブランド検索";
  const shouldShowFloatingSearch = !["manual", "personal", "recommend", "ai"].includes(mode) && !selected && !editingEntry && isFoodSearchHidden;
  const floatingFoodSearchLabel = isChainScopedSearch ? "チェーン店内でメニュー検索" : "検索に戻る";
  const floatingFoodSearchAriaLabel = isChainScopedSearch ? `${brand}内のメニュー検索へ戻る` : "検索バーへ戻る";
  const recommendCategories = useMemo(() => {
    const categories = unique(props.menuItems.filter((item) => item.calories > 0).map((item) => item.category));
    return ["all", ...categories.sort((a, b) => a.localeCompare(b, "ja"))];
  }, [props.menuItems]);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (mode === "search" && !needle) return [];
    const tokens = needle.split(/\s+/).filter(Boolean);
    const base = needle
      ? props.menuItems.filter((item) => !isChainScopedSearch || item.brand === brand)
      : props.menuItems.filter((item) => {
        if (mode === "favorite") return item.is_favorite;
        if (mode === "recommend") return !!props.goal && item.calories > 0 && (recommendCategory === "all" || item.category === recommendCategory);
        if (mode === "quick") {
          if (generalCategory === "ざっくり") return item.data_source === "quick_estimate";
          if (item.data_source === "quick_estimate") return false;
          if (item.brand || commercialGeneralCategories.has(item.category)) return false;
          return item.category === generalCategory || item.tags.some((tag) => genericCategories[generalCategory]?.includes(tag));
        }
        if (mode === "personal") return item.is_user_created;
        if (mode === "chain") return item.brand === brand;
        return true;
      });
    const matchedBase = needle
      ? base.filter((item) => {
        const haystack = menuSearchTextById.get(item.id) ?? "";
        return tokens.every((token) => haystack.includes(token));
      })
      : base;
    const matched = sortSpecialModeFoodItems(dedupeMenuItemsBySource(matchedBase), props.activeSpecialMode);
    const generalFiltered = showGeneralFoodsOnly ? matched.filter(isGeneralFoodMenuItem) : mergeGenericDuplicateMenuItems(matched);
    const sizeMerged = (needle || mode === "search" || mode === "chain" || mode === "recommend")
      ? mergeMenuSizeVariantItems(generalFiltered, menuSizeVariantIndex)
      : generalFiltered;
    const filtered = hideOverGoalItems && canUseOverGoalFilter
      ? sizeMerged.filter((item) => fitsRemainingFoodFilter(item, remainingNutrition))
      : sizeMerged;
    const recommended = isSortFoodByFitActive || mode === "recommend"
      ? [...filtered].sort((a, b) => {
        const specialDiff = mode === "recommend" ? 0 : specialModeFoodRank(a, props.activeSpecialMode) - specialModeFoodRank(b, props.activeSpecialMode);
        if (specialDiff !== 0) return specialDiff;
        const scoreDiff = perfectFoodScore(a, remainingNutrition) - perfectFoodScore(b, remainingNutrition);
        if (Math.abs(scoreDiff) > 0.0001) return scoreDiff;
        const sourceDiff = sourceRank(a.data_source) - sourceRank(b.data_source);
        if (sourceDiff !== 0) return sourceDiff;
        return a.calories - b.calories;
      })
      : filtered;
    return recommended.slice(0, 80);
  }, [
    props.menuItems,
    menuSearchTextById,
    menuSizeVariantIndex,
    props.goal?.id,
    query,
    mode,
    brand,
    isChainScopedSearch,
    generalCategory,
    recommendCategory,
    showGeneralFoodsOnly,
    hideOverGoalItems,
    canUseOverGoalFilter,
    sortFoodByFit,
    canSortFoodByFit,
    isSortFoodByFitActive,
    props.activeSpecialMode?.id,
    remainingNutrition.calories,
    remainingNutrition.protein,
    remainingNutrition.fat,
    remainingNutrition.carbs,
  ]);
  const shouldShowFoodResults = mode !== "ai" && (mode !== "search" || isGlobalSearch);

  const saveSelected = async () => {
    if (!selectedResolvedItem) return;
    const timestamp = nowIso();
    const nutrition = selectedNutrition ?? getAdjustedMenuNutrition(
      selectedResolvedItem,
      selectedExactSizeVariant ? 1 : portionMultiplier,
      portionQuantity,
      selectedExactSizeVariant ? undefined : hasSelectedCompositeStaples ? staplePortionMultipliers : undefined,
    );
    const loggedName = formatFoodLoggedName(selectedResolvedItem.name, selectedPortionLogLabel);
    const portionNote = selectedPortionLogLabel ? `記録量: ${selectedPortionLogLabel}` : undefined;
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: mealType,
      name: loggedName,
      brand: selectedResolvedItem.brand,
      calories: nutrition.calories,
      protein_g: nutrition.protein_g,
      fat_g: nutrition.fat_g,
      carbs_g: nutrition.carbs_g,
      salt_g: nutrition.salt_g,
      portion_multiplier: selectedEntryPortionMultiplier,
      entry_source: selectedResolvedItem.data_source,
      confidence: selectedResolvedItem.confidence,
      nutrition_meta: scaleNutritionMeta(selectedResolvedItem.nutrition_meta, selectedResolvedItem.calories > 0 ? nutrition.calories / selectedResolvedItem.calories : selectedEntryPortionMultiplier),
      menu_item_id: selectedResolvedItem.id,
      note: portionNote,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setSelected(undefined);
    setPortionMultiplier(1);
    setPortionQuantity(1);
    setStaplePortionMultipliers({});
    setFoodAddStep("size");
    await props.refresh();
    props.showToast(`${loggedName}を記録しました`);
  };
  const saveAiFoodImport = async () => {
    const timestamp = nowIso();
    const importGroupId = makeId("ai_import");
    if (aiFoodImportIntent === "log") {
      const existingEntries = await db.food_entries.where("app_date").equals(props.appDate).toArray();
      const duplicates = aiFoodImportItems.flatMap((aiItem, index) => {
        const selection = aiFoodImportSelections[index] ?? { source: "skip" };
        if (selection.source === "skip" || selection.source === "ai_menu_only") return [];
        const matchedItem = selection.source === "menu" && selection.menuItemId ? menuItemsById.get(selection.menuItemId) : undefined;
        const name = matchedItem?.name ?? aiItem.observed_name;
        const brand = matchedItem?.brand ?? aiItem.possible_brand;
        const calories = matchedItem?.calories ?? aiItem.nutrition_estimate.calories;
        return existingEntries.some((entry) => isLikelyAiFoodDuplicate(entry, { name, brand, calories, timestamp })) ? [`${brand ? `${brand} / ` : ""}${name}`] : [];
      });
      if (duplicates.length && !window.confirm(`同じ写真・同じ商品をすでに記録している可能性があります。\n${duplicates.join("\n")}\n\n追加分として記録しますか？`)) return;
    }
    let savedCount = 0;
    let menuSavedCount = 0;
    for (let index = 0; index < aiFoodImportItems.length; index += 1) {
      const aiItem = aiFoodImportItems[index];
      const selection = aiFoodImportSelections[index] ?? { source: "skip" };
      if (selection.source === "skip") continue;
      const matchedItem = selection.source === "menu" && selection.menuItemId ? menuItemsById.get(selection.menuItemId) : undefined;
      if (matchedItem) {
        if (aiFoodImportIntent === "menu") {
          await db.menu_items.put(userMenuItemCloneFromMenuItem(matchedItem, timestamp));
          menuSavedCount += 1;
          continue;
        }
        await db.food_entries.put({
          id: makeId("food"),
          app_date: props.appDate,
          logged_at: timestamp,
          meal_type: aiFoodMealType,
          name: matchedItem.name,
          brand: matchedItem.brand,
          calories: matchedItem.calories,
          protein_g: matchedItem.protein_g,
          fat_g: matchedItem.fat_g,
          carbs_g: matchedItem.carbs_g,
          salt_g: matchedItem.salt_g,
          portion_multiplier: 1,
          entry_source: matchedItem.data_source,
          confidence: matchedItem.confidence,
          nutrition_meta: matchedItem.nutrition_meta,
          menu_item_id: matchedItem.id,
          note: unique(["AI写真登録で照合", aiItem.note ?? "", aiItem.quantity ? `AI推定量: ${aiItem.quantity}` : ""]).join(" / ") || undefined,
          created_at: timestamp,
          updated_at: timestamp,
        });
        savedCount += 1;
        continue;
      }
      const shouldSaveMenu = aiFoodImportIntent === "menu" || selection.source === "ai_menu" || selection.source === "ai_menu_only";
      const shouldLogFood = aiFoodImportIntent === "log" && selection.source !== "ai_menu_only";
      const resolvedAiItem = {
        ...aiItem,
        nutrition_meta: {
          ...(aiItem.nutrition_meta ?? defaultAiPhotoNutritionMeta(aiItem.confidence)),
          import_group_id: importGroupId,
          analysis_fingerprint: aiItem.analysis_fingerprint ?? buildAiFoodAnalysisFingerprint(aiItem),
          nutrition_candidate: aiItem.nutrition_estimate,
        },
      };
      const aiMenuItem = menuItemFromAiFoodImportItem(resolvedAiItem, timestamp, aiFoodMealType);
      if (shouldSaveMenu) {
        await db.menu_items.put(aiMenuItem);
        menuSavedCount += 1;
      }
      if (!shouldLogFood) {
        continue;
      }
      await db.food_entries.put({
        id: makeId("food"),
        app_date: props.appDate,
        logged_at: timestamp,
        meal_type: aiFoodMealType,
        name: aiMenuItem.name,
        brand: aiMenuItem.brand,
        calories: aiItem.nutrition_estimate.calories,
        protein_g: aiItem.nutrition_estimate.protein_g,
        fat_g: aiItem.nutrition_estimate.fat_g,
        carbs_g: aiItem.nutrition_estimate.carbs_g,
        salt_g: aiItem.nutrition_estimate.salt_g,
        portion_multiplier: 1,
        entry_source: aiMenuItem.data_source,
        confidence: aiMenuItem.confidence,
        nutrition_meta: resolvedAiItem.nutrition_meta,
        menu_item_id: shouldSaveMenu ? aiMenuItem.id : undefined,
        note: unique(["AI写真登録", aiItem.note ?? "", aiItem.quantity ? `AI推定量: ${aiItem.quantity}` : "", aiItem.needs_confirmation.length ? `確認事項: ${aiItem.needs_confirmation.join(" / ")}` : ""]).join(" / ") || undefined,
        created_at: timestamp,
        updated_at: timestamp,
      });
      savedCount += 1;
    }
    resetAiFoodImport();
    setIsAiFoodImportOpen(false);
    setMode(aiFoodImportIntent === "menu" ? "personal" : "search");
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
    setAiFoodImportIntent("log");
    await props.refresh();
    const messages = [
      savedCount ? `${savedCount}件を記録` : "",
      menuSavedCount ? `${menuSavedCount}件をマイメニュー保存` : "",
    ].filter(Boolean).join(" / ");
    props.showToast(messages ? `AI写真登録から${messages}しました` : "AI写真登録で保存する項目はありませんでした");
  };

  const cloneSelectedToManual = () => {
    if (!selected) return;
    if (canOverwriteMenuItem(selected)) {
      startMenuOverwrite(selected, { logAfterSave: true, logMultiplier: selectedEntryPortionMultiplier, logPortionLabel: selectedPortionLogLabel, mealType });
      return;
    }
    cloneMenuItemToManual(selected, mealType);
  };
  const cloneMenuItemToManual = (item: MenuItem, nextMealType: MealType = item.default_meal_type ?? "lunch") => {
    setManual(toManualDraft(item, nextMealType));
    setMenuOverwriteTarget(undefined);
    setSelected(undefined);
    setQuery("");
    setManualWizardStep("basic");
    setMyMenuRegistrationMethod("manual");
    setIsMyMenuRegistrationOpen(true);
    setMode("personal");
    scrollToFoodTop();
  };
  const startMenuOverwrite = (item: MenuItem, options?: Pick<MenuOverwriteTarget, "logAfterSave" | "logMultiplier" | "logPortionLabel"> & { mealType?: MealType }) => {
    setManual(toManualDraft(item, options?.mealType ?? item.default_meal_type ?? mealType));
    setMenuOverwriteTarget({ item, logAfterSave: options?.logAfterSave, logMultiplier: options?.logMultiplier, logPortionLabel: options?.logPortionLabel });
    setSelected(undefined);
    setQuery("");
    setManualWizardStep("basic");
    setMyMenuRegistrationMethod("manual");
    setIsMyMenuRegistrationOpen(true);
    setMode("personal");
    scrollToFoodTop();
  };
  const openMenuEdit = (item: MenuItem) => {
    if (canOverwriteMenuItem(item)) {
      startMenuOverwrite(item);
      return;
    }
    cloneMenuItemToManual(item, item.default_meal_type ?? "lunch");
  };
  const startMyMenuRegistration = () => {
    setManual({ ...emptyManual, savePreset: true });
    setMenuOverwriteTarget(undefined);
    setManualWizardStep("basic");
    setMyMenuRegistrationMethod(undefined);
    setIsMyMenuRegistrationOpen(true);
  };
  const closeMyMenuRegistration = () => {
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
    setManual({ ...emptyManual, savePreset: true });
    setMenuOverwriteTarget(undefined);
    setManualWizardStep("basic");
  };

  const getManualSavePayload = () => {
    const nutrition = draftNutrition(manual);
    const baseName = manual.name.trim() || `${mealLabels[manual.meal_type]}のマニュアル`;
    const ingredientGrams = manual.entry_kind === "ingredient" ? ingredientGramValue(manual) : undefined;
    const ingredientServingLabel = ingredientGrams === undefined ? undefined : `${formatControlValue(ingredientGrams)}g`;
    const displayName = manual.entry_kind === "ingredient" && ingredientServingLabel ? `${baseName}（${ingredientServingLabel}）` : baseName;
    const brand = manual.brand.trim();
    const dataSource: DataSource = manual.officialVerified ? "official" : "user";
    const confidence: Confidence = manual.officialVerified ? "high" : nutrition.unknown.length ? "low" : "high";
    const tags = unique([
      manual.category,
      manual.subcategory,
      brand,
      manual.entry_kind === "ingredient" ? "材料" : "",
      manual.officialVerified ? "公式値" : "",
      ...(nutrition.unknown.length ? ["栄養素一部不明"] : []),
    ]);
    const note = unique([
      manual.note,
      manual.officialVerified ? "公式値確認済み" : "",
      manual.entry_kind === "ingredient" ? `材料入力: ${ingredientServingLabel ?? "g未入力"} / 栄養値は100gあたりから換算` : "",
      nutrition.unknown.length ? `未入力: ${nutrition.unknown.join("/")}` : "",
    ]).join(" / ") || undefined;
    const nutritionMeta: NutritionMeta = manual.officialVerified
      ? { origin: "official_website", estimation_policy: "exact", uncertainty: { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 }, explicit_uncertainty: true }
      : { origin: "user_entered", estimation_policy: "exact", uncertainty: { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 }, explicit_uncertainty: true };
    return { nutrition, baseName, ingredientGrams, ingredientServingLabel, displayName, brand, tags, note, dataSource, confidence, nutritionMeta };
  };

  const resetManualRegistration = () => {
    setManual({ ...emptyManual, savePreset: true });
    setMenuOverwriteTarget(undefined);
    setManualWizardStep("basic");
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
    setPortionMultiplier(1);
    setPortionQuantity(1);
    setStaplePortionMultipliers({});
    setFoodAddStep("size");
  };

  const saveManualAsNewMenu = async () => {
    const timestamp = nowIso();
    const payload = getManualSavePayload();
    const menuItemId = makeId("menu_user");
    await db.menu_items.put({
      id: menuItemId,
      name: payload.baseName,
      brand: payload.brand || undefined,
      category: manual.category,
      tags: payload.tags,
      calories: payload.nutrition.calories,
      protein_g: payload.nutrition.protein_g,
      fat_g: payload.nutrition.fat_g,
      carbs_g: payload.nutrition.carbs_g,
      salt_g: payload.nutrition.salt_g,
      serving_label: payload.ingredientServingLabel,
      weight_g: payload.ingredientGrams,
      default_meal_type: manual.meal_type,
      data_source: payload.dataSource,
      confidence: payload.confidence,
      nutrition_meta: payload.nutritionMeta,
      is_public_preset: false,
      is_user_created: true,
      is_favorite: manual.favorite,
      created_at: timestamp,
      updated_at: timestamp,
    });
    if (menuOverwriteTarget?.logAfterSave) {
      const logMultiplier = Math.max(0, menuOverwriteTarget.logMultiplier ?? 1);
      const loggedName = menuOverwriteTarget.logPortionLabel ? formatFoodLoggedName(payload.baseName, menuOverwriteTarget.logPortionLabel) : payload.displayName ?? payload.baseName;
      const logNote = unique([payload.note ?? "", menuOverwriteTarget.logPortionLabel ? `記録量: ${menuOverwriteTarget.logPortionLabel}` : ""]).join(" / ") || undefined;
      await db.food_entries.put({
        id: makeId("food"),
        app_date: props.appDate,
        logged_at: timestamp,
        meal_type: manual.meal_type,
        name: loggedName,
        brand: payload.brand || undefined,
        calories: Math.round(payload.nutrition.calories * logMultiplier),
        protein_g: round1(payload.nutrition.protein_g * logMultiplier),
        fat_g: round1(payload.nutrition.fat_g * logMultiplier),
        carbs_g: round1(payload.nutrition.carbs_g * logMultiplier),
        salt_g: payload.nutrition.salt_g === undefined ? undefined : round1(payload.nutrition.salt_g * logMultiplier),
        portion_multiplier: logMultiplier,
        entry_source: payload.dataSource,
        confidence: payload.confidence,
        nutrition_meta: payload.nutritionMeta,
        menu_item_id: menuItemId,
        note: logNote,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    resetManualRegistration();
    await props.refresh();
    props.showToast(menuOverwriteTarget?.logAfterSave ? "別メニューとして保存して記録しました" : "別メニューとして保存しました");
  };

  const saveManual = async () => {
    const timestamp = nowIso();
    let menuItemId: string | undefined;
    const { nutrition, baseName, ingredientGrams, ingredientServingLabel, displayName, brand, tags, note, dataSource, confidence, nutritionMeta } = getManualSavePayload();
    if (menuOverwriteTarget) {
      const sourceItem = menuOverwriteTarget.item;
      const logMultiplier = Math.max(0, menuOverwriteTarget.logMultiplier ?? 1);
      await db.menu_items.put({
        ...sourceItem,
        name: baseName,
        brand: brand || undefined,
        category: manual.category,
        tags: unique([...tags, dataSource === "official" ? "公式値確認済み" : "ユーザー補正"]),
        calories: nutrition.calories,
        protein_g: nutrition.protein_g,
        fat_g: nutrition.fat_g,
        carbs_g: nutrition.carbs_g,
        salt_g: nutrition.salt_g,
        serving_label: ingredientServingLabel,
        weight_g: ingredientGrams,
        default_meal_type: manual.meal_type,
        data_source: dataSource,
        confidence,
        nutrition_meta: nutritionMeta,
        is_favorite: manual.favorite,
        updated_at: timestamp,
      });
      if (menuOverwriteTarget.logAfterSave) {
        const loggedName = menuOverwriteTarget.logPortionLabel ? formatFoodLoggedName(baseName, menuOverwriteTarget.logPortionLabel) : displayName ?? baseName;
        const logNote = unique([note ?? "", menuOverwriteTarget.logPortionLabel ? `記録量: ${menuOverwriteTarget.logPortionLabel}` : ""]).join(" / ") || undefined;
        await db.food_entries.put({
          id: makeId("food"),
          app_date: props.appDate,
          logged_at: timestamp,
          meal_type: manual.meal_type,
          name: loggedName,
          brand: brand || undefined,
          calories: Math.round(nutrition.calories * logMultiplier),
          protein_g: round1(nutrition.protein_g * logMultiplier),
          fat_g: round1(nutrition.fat_g * logMultiplier),
          carbs_g: round1(nutrition.carbs_g * logMultiplier),
          salt_g: nutrition.salt_g === undefined ? undefined : round1(nutrition.salt_g * logMultiplier),
          portion_multiplier: logMultiplier,
          entry_source: dataSource,
          confidence,
          nutrition_meta: nutritionMeta,
          menu_item_id: sourceItem.id,
          note: logNote,
          created_at: timestamp,
          updated_at: timestamp,
        });
      }
      resetManualRegistration();
      await props.refresh();
      props.showToast(menuOverwriteTarget.logAfterSave ? "メニューを上書きして記録しました" : "メニューを上書きしました");
      return;
    }
    if (manual.savePreset) {
      menuItemId = makeId("menu_user");
      await db.menu_items.put({
        id: menuItemId,
        name: baseName,
        brand: brand || undefined,
        category: manual.category,
        tags,
        calories: nutrition.calories,
        protein_g: nutrition.protein_g,
        fat_g: nutrition.fat_g,
        carbs_g: nutrition.carbs_g,
        salt_g: nutrition.salt_g,
        serving_label: ingredientServingLabel,
        weight_g: ingredientGrams,
        default_meal_type: manual.meal_type,
        data_source: dataSource,
        confidence,
        nutrition_meta: nutritionMeta,
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
      name: menuItemId ? baseName : displayName,
      brand: brand || undefined,
      calories: nutrition.calories,
      protein_g: nutrition.protein_g,
      fat_g: nutrition.fat_g,
      carbs_g: nutrition.carbs_g,
      salt_g: nutrition.salt_g,
      portion_multiplier: 1,
      entry_source: dataSource,
      confidence,
      nutrition_meta: nutritionMeta,
      menu_item_id: menuItemId,
      note,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setManual({ ...emptyManual, savePreset: true });
    setManualWizardStep("basic");
    setIsMyMenuRegistrationOpen(false);
    setMyMenuRegistrationMethod(undefined);
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
      nutrition_meta: { origin: "user_entered", estimation_policy: "exact", uncertainty: { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0 }, explicit_uncertainty: true },
      note: unique([entry.note ?? "", unknown ? "編集時に栄養素一部不明" : ""]).join(" / ") || undefined,
      updated_at: nowIso(),
    });
    setEditingEntry(undefined);
    await props.refresh();
    props.showToast("食事ログを修正しました");
  };
  const deleteUserMenuItem = async (item: MenuItem) => {
    if (!item.is_user_created) return;
    const name = formatMenuItemName(item);
    const confirmed = window.confirm(`${name}をマイメニューから削除しますか？\n記録済みの食事ログは残ります。`);
    if (!confirmed) return;
    await db.menu_items.delete(item.id);
    await props.refresh();
    props.showToast(`${name}をマイメニューから削除しました`);
  };
  const todayFoodEntries = useMemo(() => props.foodEntries.filter((entry) => entry.app_date === props.appDate), [props.foodEntries, props.appDate]);
  const foodLogTitle = `${formatJapaneseDate(props.appDate)}の食事ログ`;

  return (
    <div className="scroll-mt-24 space-y-4" ref={foodTopRef}>
      <div className="sticky-panel sticky top-[74px] z-10 -mx-4 space-y-3 px-4 pb-2">
        <form ref={foodSearchFormRef} className="compact-card flex gap-2 p-2" onSubmit={(event) => { event.preventDefault(); dismissFoodKeyboard(); if (mode !== "chain") setMode("search"); scrollToFoodResults(); }}>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-moss" size={20} />
            <input ref={foodSearchInputRef} className="h-12 w-full pl-10 text-base" value={query} onChange={(event) => updateSearchQuery(event.target.value)} placeholder={searchPlaceholder} />
          </div>
          <button
            type="button"
            className={`food-filter-button h-12 w-12 ${isFoodFitFilterActive ? "food-filter-button-active" : ""} ${showFoodFilterIntro ? "food-filter-button-highlight" : ""}`}
            aria-label="食事検索フィルター"
            onClick={openFoodFilterOptions}
          >
            <SlidersHorizontal size={18} />
          </button>
          <button type="submit" className={`food-search-submit-button ${mode === "search" || isGlobalSearch ? "primary-button" : "secondary-button"} h-12 px-4`}>検索</button>
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
                  安全側 あと {Math.max(0, Math.round(remainingNutrition.calories))}kcal / P{round1(remainingNutrition.protein)} F{round1(remainingNutrition.fat)} C{round1(remainingNutrition.carbs)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button className="secondary-button h-8 px-3 text-[11px]" type="button" onClick={resetFoodSearchFilters}>リセット</button>
                <button className="icon-button h-8 w-8" aria-label="フィルターを閉じる" onClick={() => setIsFoodFilterOpen(false)}>×</button>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <button
                className={`food-filter-option ${showGeneralFoodsOnly ? "food-filter-option-active" : ""}`}
                onClick={() => setShowGeneralFoodsOnly((value) => !value)}
              >
                <span>
                  <span className="block text-sm font-bold">一般メニューのみで検索</span>
                  <span className="mt-1 block text-xs text-moss">チェーン店・コンビニ・市販プロテイン・サプリなどを除いて表示します。</span>
                </span>
                <span className="mini-chip shrink-0">{showGeneralFoodsOnly ? "ON" : "OFF"}</span>
              </button>
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
                  <span className="mt-1 block text-xs text-moss">Pを補いやすさと、F/C/kcalの収まりを検索結果の行に表示します。</span>
                </span>
                <span className="mini-chip shrink-0">{showFoodBalance ? "ON" : "OFF"}</span>
              </button>
              <button
                className={`food-filter-option ${isSortFoodByFitActive ? "food-filter-option-active" : ""} ${!canSortFoodByFit ? "opacity-50" : ""}`}
                disabled={!canSortFoodByFit}
                onClick={() => setSortFoodByFit((value) => !value)}
              >
                <span>
                  <span className="block text-sm font-bold">残り栄養素に合う順で表示</span>
                  <span className="mt-1 block text-xs text-moss">チェーン店・コンビニ一覧で、Pを補いやすくF/C/kcal超過が少ない候補を上に出します。</span>
                </span>
                <span className="mini-chip shrink-0">{isSortFoodByFitActive ? "ON" : "OFF"}</span>
              </button>
            </div>
          </section>
        )}
        {isGlobalSearch && isChainScopedSearch && (
          <div className="flex items-center justify-between gap-2 rounded-full border border-line bg-surface/55 px-3 py-2 text-xs font-semibold text-moss shadow-soft">
            <span className="min-w-0 truncate">{brand}のメニュー内を検索中</span>
            <button className="shrink-0 text-ink" type="button" onClick={() => { setQuery(""); scrollToChainSection(); }}>チェーン変更</button>
          </div>
        )}
        {props.activeSpecialMode?.foodQuery && mode !== "manual" && (
          <button
            className="special-mode-food-banner"
            type="button"
            onClick={() => {
              const foodQuery = props.activeSpecialMode?.foodQuery;
              if (!foodQuery) return;
              setMode("search");
              setQuery(foodQuery);
              scrollToFoodResults();
            }}
          >
            <span className="font-black">{props.activeSpecialMode.shortLabel}モード</span>
            <span className="min-w-0 flex-1 truncate">旅行タグの候補を上位表示中</span>
            <ChevronRight size={16} />
          </button>
        )}
        {!isGlobalSearch && (
          <div className="grid grid-cols-3 gap-2">
            {(["favorite", "personal", "recommend", "chain", "ai", "quick"] as FoodMode[]).map((item) => (
              <button
                key={item}
                className={`mode-button ${item === "ai" ? "ai-food-mode-button" : ""} ${mode === item ? "mode-button-active" : ""} ${showMyMenuIntro && item === "personal" ? "food-mode-highlight" : ""} ${showMyMenuIntro && item !== "personal" ? "food-mode-dimmed" : ""}`}
                onClick={() => selectMode(item)}
              >
                {item === "ai" ? <><Sparkles size={15} />{foodModeLabel(item)}</> : foodModeLabel(item)}
              </button>
            ))}
          </div>
        )}
        {showMyMenuIntro && !isGlobalSearch && (
          <section className="food-filter-intro compact-card p-3">
            <div className="min-w-0">
              <p className="text-sm font-bold">マニュアルモードはマイメニューに統一されました</p>
              <p className="mt-1 text-xs text-moss">今後はマイメニューから、保存する記録も今回だけの記録も追加できます。</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="primary-button h-9 flex-1 px-3 text-xs" onClick={() => selectMode("personal")}>マイメニューを開く</button>
              <button className="secondary-button h-9 px-3 text-xs" onClick={dismissMyMenuIntro}>閉じる</button>
            </div>
          </section>
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
          {brand && chainComboMenuItems.length > 0 && (
            <div className="chain-combo-entry mt-3 rounded-md border border-line bg-rice/60 p-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">チェーン内で組み合わせる</p>
                  <p className="mt-1 text-xs font-semibold text-moss">{brand}のメイン・サイド・サイズ調整から、残り枠に近い食べ方を探します。</p>
                </div>
                <span className="mini-chip shrink-0">{chainComboMenuItems.length}件</span>
              </div>
              <button className="primary-button chain-combo-open-button mt-3 w-full" onClick={() => openChainCombo()}>
                <Sparkles size={17} />おすすめの組み合わせ
              </button>
            </div>
          )}
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

      {mode === "recommend" && (
        <section className="compact-card scroll-mt-24 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold">おすすめ</p>
              <p className="numeric-text mt-1 text-[11px] font-semibold text-moss">
                安全側 あと {Math.max(0, Math.round(remainingNutrition.calories))}kcal / P{round1(remainingNutrition.protein)} F{round1(remainingNutrition.fat)} C{round1(remainingNutrition.carbs)}
              </p>
            </div>
            <span className="mini-chip">全ジャンル</span>
          </div>
          <div className="manual-subcategory-scroll mt-3 flex gap-2 overflow-x-auto pb-1">
            {recommendCategories.map((category) => (
              <button className={`chip manual-subcategory-chip ${recommendCategory === category ? "chip-active" : ""}`} key={category} onClick={() => setRecommendCategory(category)}>
                {category === "all" ? "すべて" : category}
              </button>
            ))}
          </div>
        </section>
      )}

      {mode !== "manual" && (
        <>
          {mode === "favorite" && !isGlobalSearch && favoriteItems.length === 0 && (
            <section className="compact-card p-4 text-sm text-moss">食品行のハートを押すとここから呼び出せます。</section>
          )}
          {mode === "personal" && !isGlobalSearch && (
            <>
              {!isMyMenuRegistrationOpen ? (
                <div>
                  <button className="primary-button w-full" onClick={startMyMenuRegistration}>
                    <Plus size={17} />マイメニューを登録
                  </button>
                </div>
              ) : (
                <section className="compact-card p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-bold">{menuOverwriteTarget ? "メニューを上書き編集" : "マイメニュー登録"}</h2>
                      {menuOverwriteTarget && <p className="mt-1 text-xs font-semibold text-moss">保存済みのメニューを、この内容で更新します。</p>}
                    </div>
                    <button className="secondary-button shrink-0 px-3 py-2 text-xs" onClick={closeMyMenuRegistration}>閉じる</button>
                  </div>
                  {!menuOverwriteTarget && !myMenuRegistrationMethod ? (
                    <div className="grid gap-2">
                      <button className="food-filter-option" onClick={() => setMyMenuRegistrationMethod("manual")}>
                        <span>
                          <span className="block text-sm font-bold">手動で登録</span>
                          <span className="mt-1 block text-xs text-moss">名前、単位、カテゴリ、栄養値を順番に入力します。</span>
                        </span>
                        <span className="mini-chip shrink-0">手動</span>
                      </button>
                      <button className="food-filter-option ai-food-action-option ai-food-action-save" onClick={() => openAiFoodImport("menu")}>
                        <span>
                          <span className="block text-sm font-bold">AIを使って登録</span>
                          <span className="mt-1 block text-xs text-moss">写真や栄養成分表示から、マイメニューだけを保存します。</span>
                        </span>
                        <span className="mini-chip shrink-0">AI</span>
                      </button>
                    </div>
                  ) : (
                    <ManualFoodForm
                      manual={manual}
                      setManual={setManual}
                      compact
                      mode={menuOverwriteTarget ? "preset" : "log"}
                      variant="wizard"
                      wizardStep={manualWizardStep}
                      setWizardStep={setManualWizardStep}
                      includePurposeStep={!menuOverwriteTarget}
                      submitLabel={menuOverwriteTarget ? (menuOverwriteTarget.logAfterSave ? "上書きして記録" : "上書き保存") : manual.savePreset ? "保存して記録" : "今回だけ記録"}
                      secondarySubmitLabel={menuOverwriteTarget ? (menuOverwriteTarget.logAfterSave ? "別メニューとして保存して記録" : "別メニューとして保存") : undefined}
                      onSecondarySave={menuOverwriteTarget ? saveManualAsNewMenu : undefined}
                      onSave={saveManual}
                    />
                  )}
                </section>
              )}
            </>
          )}
          {shouldShowFoodResults && (
            <section className="compact-card divide-y divide-line overflow-hidden scroll-mt-24" ref={foodResultsRef} onPointerDown={dismissFoodKeyboard} onTouchStart={dismissFoodKeyboard} onWheel={dismissFoodKeyboard}>
              <ListHeader title={isGlobalSearch ? (isChainScopedSearch ? `${brand}の検索結果` : "検索結果") : mode === "quick" ? generalCategory : foodModeLabel(mode)} value={`${results.length}件`} />
              {results.map((item, index) => (
                <Fragment key={item.id}>
                  {isSortFoodByFitActive && index === 10 && (
                    <div className="recommendation-divider px-4 py-2 text-center text-[11px] font-black text-moss">ここから通常候補</div>
                  )}
                  <FoodItemRow
                    item={item}
                    displayName={getMenuDisplayName(item, menuSizeVariantIndex)}
                    onPick={selectFoodItem}
                    onClone={openMenuEdit}
                    onDelete={deleteUserMenuItem}
                    refresh={props.refresh}
                    balanceTarget={(showFoodBalance && canShowFoodBalance) || isSortFoodByFitActive || mode === "recommend" ? remainingNutrition : undefined}
                    recommendationRank={(isSortFoodByFitActive || mode === "recommend") && index < 10 ? index + 1 : undefined}
                  />
                </Fragment>
              ))}
              {results.length === 0 && <EmptyLine text="見つかりません" />}
            </section>
          )}
        </>
      )}

      {mode === "personal" && !isGlobalSearch && recentFoodEntries.length > 0 && (
        <section className="compact-card divide-y divide-line overflow-hidden">
          <ListHeader title="直近10件" value={`${recentFoodEntries.length}件`} />
          {recentFoodEntries.map((entry) => (
            <RecentFoodEntryRow
              key={entry.id}
              entry={entry}
              displayName={formatFoodEntryName(entry, props.menuItems)}
              onLog={() => logRecentFoodEntry(entry)}
            />
          ))}
        </section>
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

      {shouldShowFloatingSearch && (
        <button
          type="button"
          className="floating-food-search floating-food-search-visible"
          onClick={focusFoodSearch}
          aria-label={floatingFoodSearchAriaLabel}
        >
          <ArrowUp size={15} />
          <span>{floatingFoodSearchLabel}</span>
        </button>
      )}

      {isChainComboOpen && (
        <ChainComboModal
          brand={brand}
          menuItems={chainComboMenuItems}
          variantIndex={menuSizeVariantIndex}
          remainingNutrition={remainingNutrition}
          adoptedRemainingNutrition={adoptedRemainingNutrition}
          foodEntries={props.foodEntries}
          initialMainItem={chainComboSeedItem}
          onClose={() => {
            setIsChainComboOpen(false);
            setChainComboSeedItem(undefined);
          }}
          onPick={(candidate) => {
            setIsChainComboOpen(false);
            setChainComboSeedItem(undefined);
            selectChainComboCandidate(candidate);
          }}
        />
      )}

      {selected && (
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={() => setSelected(undefined)}>
          <div className="food-add-sheet compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-lg font-bold">{selectedDisplayName}</p>
                <p className="numeric-text mt-1 text-sm text-moss">{selected.brand ?? selected.category} · {selectedCalories} kcal</p>
              </div>
              <button className="icon-button h-9 w-9 shrink-0" aria-label="閉じる" onClick={() => setSelected(undefined)}>×</button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <SourceBadge item={selected} source={selected.data_source} confidence={selected.confidence} />
              <span className="numeric-text rounded-md bg-rice px-2 py-1 text-xs font-bold text-moss">
                {foodAddStep === "size" || foodAddStep === "customSize" ? "1/4" : foodAddStep === "quantity" ? "2/4" : foodAddStep === "timing" ? "3/4" : "4/4"}
              </span>
            </div>
            <div className="food-add-progress mt-4" aria-hidden="true">
              {(["size", "quantity", "timing", "confirm"] as FoodAddStep[]).map((step) => (
                <span className={(foodAddStep === step || (foodAddStep === "customSize" && step === "size")) ? "food-add-progress-dot food-add-progress-dot-active" : "food-add-progress-dot"} key={step} />
              ))}
            </div>

            {foodAddStep === "size" && (
              <div className="mt-4">
                <p className="text-sm font-black text-ink">{hasSelectedSoupOptions ? "汁物を選択" : hasSelectedSizeVariants ? "サイズを選択" : hasSelectedCompositeStaples ? "麺・ご飯の量を選択" : selectedStapleConfig ? `${selectedStapleConfig.label}の量を選択` : "サイズを選択"}</p>
                <p className="mt-1 text-xs font-semibold text-moss">
                  {hasSelectedSoupOptions
                    ? "みそ汁のままにするか、豚汁に変更するかを選びます。"
                    : hasSelectedSizeVariants
                    ? "登録済みのサイズ違いから選びます。公式値や推定値がある場合はその値を使います。"
                    : hasSelectedCompositeStaples
                      ? "丼+麺セットは、麺量とご飯量を別々に調整できます。"
                    : selectedStapleConfig
                      ? `定食やセット全体ではなく、${selectedStapleConfig.label}量だけを調整します。`
                      : "通常は既定サイズのまま進めます。"}
                </p>
                <div className="mt-4 grid gap-2">
                  {hasSelectedSizeVariants
                    ? selectedSizeVariants.map((variant) => (
                      <button
                        className={`food-add-choice food-add-choice-size min-h-[3.2rem] ${selected.id === variant.item.id ? "food-add-choice-active" : ""}`}
                        key={variant.item.id}
                        onClick={() => {
                          setSelected(variant.item);
                          setPortionMultiplier(1);
                          setStaplePortionMultipliers({});
                          setFoodAddStep("quantity");
                        }}
                      >
                        <span>{variant.label}</span>
                        <span className="numeric-text text-xs font-bold text-moss">{variant.item.calories}kcal</span>
                      </button>
                    ))
                    : hasSelectedPublishedPortionOptions || hasSelectedSoupOptions
                      ? portionOptions.map((option) => (
                        <button
                          className={`food-add-choice min-h-[3.2rem] ${portionMultiplier === option.value ? "food-add-choice-active" : ""}`}
                          key={option.label}
                          onClick={() => {
                            setPortionMultiplier(option.value);
                            setStaplePortionMultipliers({});
                            setFoodAddStep("quantity");
                          }}
                        >
                          {option.label}
                        </button>
                      ))
                      : defaultPortionOption && (
                      <button
                        className="food-add-choice food-add-choice-active min-h-[3.2rem]"
                        onClick={() => {
                          setPortionMultiplier(defaultPortionOption.value);
                          setStaplePortionMultipliers({});
                          setFoodAddStep("quantity");
                        }}
                      >
                        {hasSelectedCompositeStaples ? "標準量のまま" : defaultPortionOption.label}
                      </button>
                    )}
                  {canCustomizeSelectedPortion && (
                    <button className="food-add-choice" onClick={() => setFoodAddStep("customSize")}>
                      {hasSelectedCompositeStaples ? `${selectedComponentPortionTitle}量をカスタム` : selectedStapleConfig ? `${selectedStapleConfig.label}量をカスタム` : "サイズをカスタム"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {foodAddStep === "customSize" && (
              <div className="mt-4">
                <p className="text-sm font-black text-ink">{hasSelectedCompositeStaples ? `${selectedComponentPortionTitle}量をカスタム` : selectedStapleConfig ? `${selectedStapleConfig.label}量をカスタム` : "サイズをカスタム"}</p>
                <p className="mt-1 text-xs font-semibold text-moss">{hasSelectedCompositeStaples ? `${selectedComponentPortionTitle}を別々に調整し、その他の具材やサイドはそのまま計算します。` : selectedStapleConfig ? `その他の具材やサイドはそのまま、${selectedStapleConfig.label}の量だけで栄養値を補正します。` : "既定サイズ以外で記録したい時だけ選びます。"}</p>
                {hasSelectedCompositeStaples ? (
                  <div className="mt-4 space-y-4">
                    {selectedStapleConfigs.map((config) => {
                      const selectedMultiplier = staplePortionMultipliers[config.kind] ?? 1;
                      return (
                        <div className="rounded-2xl border border-line bg-white/20 p-3" key={config.kind}>
                          <p className="text-xs font-black text-ink">{config.label}量</p>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {getStaplePortionOptions(config).map(({ label, value }) => (
                              <button
                                key={label}
                                className={`food-add-choice ${selectedMultiplier === value ? "food-add-choice-active" : ""}`}
                                onClick={() => setStaplePortionMultipliers((current) => ({ ...current, [config.kind]: value }))}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                          <label className="mt-3 block text-xs font-semibold text-moss">
                            {config.label}量をグラム指定
                            <input
                              className="mt-2 w-full"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="1"
                              value={formatControlValue(round1(config.defaultGrams * selectedMultiplier))}
                              onChange={(event) => {
                                const grams = Math.max(0, Number(event.target.value) || 0);
                                setStaplePortionMultipliers((current) => ({ ...current, [config.kind]: grams / config.defaultGrams }));
                              }}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {customPortionOptions.map(({ label, value }) => (
                        <button
                          key={label}
                          className={`food-add-choice ${portionMultiplier === value ? "food-add-choice-active" : ""}`}
                          onClick={() => {
                            setPortionMultiplier(value);
                            setFoodAddStep("quantity");
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {selectedServingGrams && (
                      <label className="mt-4 block text-xs font-semibold text-moss">
                        {selectedStapleConfig ? `${selectedStapleConfig.label}量をグラム指定` : "グラム指定"}
                        <input
                          className="mt-2 w-full"
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="1"
                          value={formatControlValue(round1(selectedServingGrams * portionMultiplier))}
                          onChange={(event) => {
                            const grams = Math.max(0, Number(event.target.value) || 0);
                            setPortionMultiplier(grams / selectedServingGrams);
                          }}
                        />
                      </label>
                    )}
                  </>
                )}
                <button className="secondary-button mt-3 w-full" onClick={() => setFoodAddStep("quantity")}>
                  {hasSelectedCompositeStaples ? `この${selectedComponentPortionTitle}量で進む` : selectedStapleConfig ? `この${selectedStapleConfig.label}量で進む` : "このサイズで進む"}
                </button>
                {!hasSelectedCompositeStaples && customPortionOptions.length === 0 && !selectedServingGrams && (
                  <p className="mt-3 rounded-2xl bg-rice px-3 py-2 text-xs font-bold text-moss">このメニューはカスタムできるサイズ候補がありません。</p>
                )}
              </div>
            )}

            {foodAddStep === "quantity" && (
              <div className="mt-4">
                <p className="text-sm font-black text-ink">個数を選択</p>
                <p className="mt-1 text-xs font-semibold text-moss">{selectedPortionLabel}のメニューを何人前記録するか選びます。</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      className={`food-add-choice ${portionQuantity === value ? "food-add-choice-active" : ""}`}
                      onClick={() => {
                        setPortionQuantity(value);
                        setFoodAddStep("timing");
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <Stepper value={portionQuantity} suffix="個数" step={0.5} onChange={(value) => setPortionQuantity(Math.max(0, value))} />
                </div>
                <button className="secondary-button mt-3 w-full" onClick={() => setFoodAddStep("timing")}>
                  この個数で進む
                </button>
              </div>
            )}

            {foodAddStep === "timing" && (
              <div className="mt-4">
                <p className="text-sm font-black text-ink">いつ食べた？</p>
                <p className="mt-1 text-xs font-semibold text-moss">食事タイミングを選びます。ジム前・ジム後もここで記録できます。</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(mealLabels).map(([key, label]) => (
                    <button
                      key={key}
                      className={`food-add-choice ${mealType === key ? "food-add-choice-active" : ""}`}
                      onClick={() => {
                        setMealType(key as MealType);
                        setFoodAddStep("confirm");
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {foodAddStep === "confirm" && (
              <div className="mt-4">
                <p className="text-sm font-black text-ink">記録内容を確認</p>
                <div className="mt-3 rounded-3xl border border-line bg-white/25 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black text-ink">{formatMenuItemName(selected)}</p>
                      <p className="numeric-text mt-1 text-xs font-bold text-moss">{selectedPortionLabel} × {formatFoodAmountValue(portionQuantity)} / {mealLabels[mealType]}</p>
                    </div>
                    <p className="numeric-text shrink-0 text-xl font-black text-ink">{selectedCalories}kcal</p>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <MetricPill label="P" value={`${selectedProtein}g`} />
                    <MetricPill label="F" value={`${selectedFat}g`} />
                    <MetricPill label="C" value={`${selectedCarbs}g`} />
                  </div>
                  {selectedSalt !== undefined && <p className="numeric-text mt-2 text-xs font-semibold text-moss">塩分 {selectedSalt}g</p>}
                </div>
              </div>
            )}

            <div className={`mt-5 grid gap-2 ${foodAddStep === "confirm" ? "grid-cols-2" : "grid-cols-1"}`}>
              <button
                className="secondary-button"
                onClick={() => {
                  if (foodAddStep === "size") {
                    setSelected(undefined);
                    return;
                  }
                  setFoodAddStep(
                    foodAddStep === "customSize"
                      ? "size"
                      : foodAddStep === "quantity"
                        ? hasSelectedCustomPortion ? "customSize" : "size"
                        : foodAddStep === "timing"
                          ? "quantity"
                          : "timing",
                  );
                }}
              >
                {foodAddStep === "size" ? "閉じる" : <><ChevronLeft size={17} />戻る</>}
              </button>
              {foodAddStep === "confirm" && (
                <button className="primary-button" onClick={saveSelected}><Check size={17} />記録</button>
              )}
            </div>
            {foodAddStep === "confirm" && (
              <button className="secondary-button mt-2 w-full" onClick={cloneSelectedToManual}>
                <Pencil size={17} />{canOverwriteMenuItem(selected) ? "値を上書きして記録" : "マイメニューで編集"}
              </button>
            )}
          </div>
        </div>
      )}

      {isAiFoodImportOpen && (
        <AiFoodImportModal
          intent={aiFoodImportIntent}
          step={aiFoodImportStep}
          setStep={setAiFoodImportStep}
          text={aiFoodImportText}
          setText={setAiFoodImportText}
          items={aiFoodImportItems}
          menuItems={props.menuItems}
          candidates={aiFoodMatchCandidates}
          selections={aiFoodImportSelections}
          setSelections={setAiFoodImportSelections}
          mealType={aiFoodMealType}
          setMealType={setAiFoodMealType}
          error={aiFoodImportError}
          copiedPrompt={copiedAiFoodPrompt}
          onCopyPrompt={async () => {
            await copyText(aiFoodImportPrompt);
            setCopiedAiFoodPrompt(true);
          }}
          onParse={parseAiFoodImport}
          onSave={saveAiFoodImport}
          onReset={resetAiFoodImport}
          onClose={closeAiFoodImport}
        />
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
  settings?: AppSettings;
  appDate: string;
  exercisePresets: ExercisePreset[];
  workoutTemplates: WorkoutTemplate[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  setWorkoutTemplates: (templates: WorkoutTemplate[]) => void;
  focus?: WorkoutFocus;
  onFocusHandled: () => void;
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
  const [isMyTrainingModalOpen, setIsMyTrainingModalOpen] = useState(false);
  const [myTrainingInitialDraft, setMyTrainingInitialDraft] = useState<MyTrainingDraft>();
  const [templateSaveMessage, setTemplateSaveMessage] = useState("");
  const [workoutWeightPresetStore, setWorkoutWeightPresetStore] = useState(() => mergeWorkoutWeightPresetStores(readLocalWorkoutWeightPresetStore(), props.settings?.workout_weight_presets));
  const [isTemplateReorderMode, setIsTemplateReorderMode] = useState(false);
  const [draggingTemplateId, setDraggingTemplateId] = useState<string>();
  const draggingTemplateIdRef = useRef<string | undefined>(undefined);
  const dragReorderLockRef = useRef(false);
  const celebratedPrKeysRef = useRef<Set<string>>(new Set());
  const exerciseEditorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const workoutTopRef = useRef<HTMLDivElement | null>(null);
  const workoutSearchSectionRef = useRef<HTMLElement | null>(null);
  const workoutSearchControlsRef = useRef<HTMLDivElement | null>(null);
  const workoutSearchInputRef = useRef<HTMLInputElement | null>(null);
  const templateEditorRef = useRef<HTMLElement | null>(null);
  const dateSessionsRef = useRef<HTMLElement | null>(null);
  const sessionSectionRef = useRef<HTMLElement | null>(null);
  const [isWorkoutSearchHidden, setIsWorkoutSearchHidden] = useState(false);
  const activeSession = props.workoutSessions.find((session) => session.id === sessionId);
  const editingTemplate = props.workoutTemplates.find((template) => template.id === editingTemplateId);
  useEffect(() => {
    const merged = mergeWorkoutWeightPresetStores(readLocalWorkoutWeightPresetStore(), props.settings?.workout_weight_presets);
    setWorkoutWeightPresetStore(merged);
    if (Object.keys(merged).length > 0 && !workoutWeightPresetStoresEqual(props.settings?.workout_weight_presets, merged)) {
      void persistWorkoutWeightPresetStore(merged, props.settings);
    }
  }, [props.settings?.workout_weight_presets]);
  const saveWorkoutWeightPresetStore = async (nextStore: Record<string, number[]>) => {
    setWorkoutWeightPresetStore(nextStore);
    await persistWorkoutWeightPresetStore(nextStore, props.settings);
  };
  const activeExercises = useMemo(() => props.workoutExercises
    .filter((exercise) => exercise.session_id === sessionId)
    .sort((a, b) => a.order - b.order), [props.workoutExercises, sessionId]);
  const dateSessions = useMemo(() => props.workoutSessions.filter((session) => session.app_date === props.appDate), [props.workoutSessions, props.appDate]);
  const setsByExerciseId = useMemo(() => {
    const grouped = new Map<string, WorkoutSet[]>();
    props.workoutSets.forEach((set) => {
      const current = grouped.get(set.workout_exercise_id);
      if (current) current.push(set);
      else grouped.set(set.workout_exercise_id, [set]);
    });
    grouped.forEach((sets) => sets.sort((a, b) => a.set_order - b.set_order));
    return grouped;
  }, [props.workoutSets]);

  useEffect(() => {
    setSessionId(undefined);
    setFocusedExerciseId(undefined);
    setSessionScrollKey(0);
    celebratedPrKeysRef.current.clear();
  }, [props.appDate]);

  useEffect(() => {
    if (props.focus !== "dateLog") return;
    const timer = window.setTimeout(() => {
      (dateSessionsRef.current ?? workoutTopRef.current)?.scrollIntoView({ behavior: "smooth", block: "start" });
      props.onFocusHandled();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [props.focus, props.appDate]);

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
    const update = () => {
      const target = workoutSearchControlsRef.current;
      if (!target) {
        setIsWorkoutSearchHidden(false);
        return;
      }
      setIsWorkoutSearchHidden(target.getBoundingClientRect().bottom < 72);
    };
    window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const interval = window.setInterval(update, 250);
    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(interval);
    };
  }, []);

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

  useEffect(() => {
    if (isTemplateReorderMode) return;
    endTemplateDrag();
  }, [isTemplateReorderMode]);

  const openExerciseDraft = (exercise: ExercisePreset) => {
    const isCardio = isCardioWorkoutItem(exercise);
    const isBodyweight = isBodyweightStrengthItem(exercise);
    const firstSet = exercise.default_set_scheme?.[0];
    const sets = isCardio ? 1 : Math.min(5, Math.max(1, Math.round(exercise.default_sets ?? exercise.default_set_scheme?.length ?? 3)));
    const reps = Math.max(0, Math.round(exercise.default_reps ?? firstSet?.reps ?? (isCardio ? 0 : 10)));
    const weight = round1(Math.max(0, exercise.default_weight_kg ?? firstSet?.weight_kg ?? 0));
    const loadType = firstSet?.load_type ?? exercise.default_set_scheme?.find((set) => set.load_type)?.load_type ?? (isBodyweight ? "bodyweight" : undefined);
    const duration = Math.max(0, Math.round(exercise.default_duration_min ?? firstSet?.duration_min ?? 20));
    setExerciseDraft({
      exercise,
      sets,
      reps,
      weight_kg: weight,
      load_type: loadType,
      duration_min: duration,
      setSchemeText: "",
    });
  };

  const addPresetExercise = async (draft: WorkoutExerciseDraft) => {
    const { exercise } = draft;
    const isCardio = isCardioWorkoutItem(exercise);
    const isBodyweight = isBodyweightStrengthItem(exercise);
    const loadType = isCardio ? undefined : draft.load_type ?? (isBodyweight ? "bodyweight" : undefined);
    const setCount = isCardio ? 1 : Math.min(5, Math.max(1, Math.round(draft.sets)));
    const reps = isCardio ? 0 : Math.max(0, Math.round(draft.reps));
    const weightKg = isCardio || loadType === "bodyweight" ? undefined : round1(Math.max(0, draft.weight_kg));
    const durationMin = isCardio ? Math.max(0, Math.round(draft.duration_min)) : undefined;
    const setScheme: WorkoutSetPattern[] = isCardio
      ? [{
        reps: 0,
        duration_min: durationMin ?? 0,
        active_calories: estimateActiveCalories(exercise.name, durationMin ?? 0, props.profile?.current_weight_kg ?? 70),
      }]
      : Array.from({ length: setCount }, () => ({
        reps,
        weight_kg: weightKg,
        load_type: loadType,
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
        load_type: loadType,
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

  const openMyTrainingModal = (initialDraft?: MyTrainingDraft) => {
    setMyTrainingInitialDraft(initialDraft);
    setIsMyTrainingModalOpen(true);
  };

  const saveMyTrainingDraft = async (draft: MyTrainingDraft) => {
    const timestamp = nowIso();
    const editingExercise = draft.editingExerciseId
      ? props.exercisePresets.find((item) => item.id === draft.editingExerciseId && item.is_user_created)
      : undefined;
    const exercise = exercisePresetFromMyTrainingDraft(draft, timestamp, editingExercise);
    const presetKeys = workoutWeightPresetKeys(exercise);
    await db.exercise_presets.put(exercise);
    if (draft.weight_presets.length) {
      await saveWorkoutWeightPresetStore(saveWorkoutWeightPresets(presetKeys, draft.weight_presets, workoutWeightPresetStore));
    }
    await props.refresh();
    setMode("my");
    setIsMyTrainingModalOpen(false);
    setMyTrainingInitialDraft(undefined);
    props.showToast(editingExercise ? `${exercise.name}を更新しました` : `${exercise.name}をマイトレに保存しました`);
  };

  const deleteMyTrainingExercise = async (exercise: ExercisePreset) => {
    if (!confirm(`マイトレ「${exercise.name}」を削除しますか？過去の記録は残ります。`)) return;
    await db.exercise_presets.delete(exercise.id);
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
    setMode("favorite");
    setFilter("");
    window.setTimeout(() => workoutTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  const focusWorkoutSearch = () => {
    setFocusedExerciseId(undefined);
    setMode("search");
    window.setTimeout(() => {
      (workoutSearchSectionRef.current ?? workoutTopRef.current)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => workoutSearchInputRef.current?.focus({ preventScroll: true }), 320);
    }, 80);
  };

  const dismissWorkoutKeyboard = () => {
    if (document.activeElement === workoutSearchInputRef.current) workoutSearchInputRef.current?.blur();
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

  const favoriteExercises = useMemo(() => props.exercisePresets.filter((item) => item.is_favorite), [props.exercisePresets]);
  const myTrainingExercises = useMemo(() => props.exercisePresets
    .filter((item) => item.is_user_created)
    .sort((a, b) => (b.updated_at || b.created_at).localeCompare(a.updated_at || a.created_at)), [props.exercisePresets]);
  const exerciseResults = useMemo(() => props.exercisePresets
    .filter((item) => {
      if (mode === "body" && filter) return item.body_part === filter;
      if (mode === "equipment" && filter) return item.equipment_type === filter;
      if (mode === "search" && filter) return item.name.includes(filter) || item.body_part.includes(filter) || item.equipment_type.includes(filter);
      return mode === "search";
    })
    .slice(0, 40), [props.exercisePresets, mode, filter]);
  const workoutFilterOptions = useMemo(
    () => unique(props.exercisePresets.map((item) => mode === "body" ? item.body_part : item.equipment_type)),
    [props.exercisePresets, mode],
  );
  const isWorkoutSearchMode = mode === "body" || mode === "equipment" || mode === "search";
  const shouldShowFloatingWorkoutSearch = isWorkoutSearchMode && !exerciseDraft && !templateTargetItem && isWorkoutSearchHidden;

  return (
    <div className="space-y-4" ref={workoutTopRef}>
      <div className="grid grid-cols-3 gap-2">
        {(["favorite", "preset", "body", "equipment", "my", "search"] as const).map((item) => (
          <button className={`mode-button ${mode === item ? "mode-button-active" : ""}`} key={item} onClick={() => setMode(item)}>{workoutModeLabel(item)}</button>
        ))}
      </div>

      {dateSessions.length > 0 && (
        <section className="compact-card divide-y divide-line scroll-mt-24" ref={dateSessionsRef}>
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
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <h2 className="text-sm font-bold">ワークアウトプリセット</h2>
                <p className="mt-1 text-xs font-semibold text-moss">{props.workoutTemplates.length}件</p>
              </div>
              {props.workoutTemplates.length > 1 && (
                <button
                  className={`secondary-button h-9 shrink-0 px-3 py-2 text-xs ${isTemplateReorderMode ? "border-moss/50 text-moss" : ""}`}
                  onClick={() => setIsTemplateReorderMode((value) => !value)}
                >
                  <GripVertical size={14} />{isTemplateReorderMode ? "完了" : "並び替え"}
                </button>
              )}
            </div>
            {props.workoutTemplates.map((template) => (
              <WorkoutTemplateRow
                canReorder={isTemplateReorderMode}
                isDragging={draggingTemplateId === template.id}
                isEditing={editingTemplateId === template.id}
                key={template.id}
                onEdit={() => openTemplateEditor(template)}
                onStart={startFromTemplate}
                onDelete={() => deleteWorkoutTemplate(template)}
                onDragEnd={endTemplateDrag}
                onDragEnter={(targetTemplate) => {
                  if (isTemplateReorderMode && draggingTemplateId) reorderWorkoutTemplate(draggingTemplateId, targetTemplate.id);
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

      {mode === "my" && (
        <section className="compact-card divide-y divide-line">
          <div className="p-3">
            <button className="primary-button w-full" onClick={() => openMyTrainingModal()}><Plus size={17} />マイトレを登録</button>
          </div>
          <ListHeader title="マイトレ" value={`${myTrainingExercises.length}件`} />
          {myTrainingExercises.map((exercise) => {
            const pictogram = getWorkoutPictogram(exercise.body_part, exercise.equipment_type);
            return (
              <div className="flex items-center justify-between gap-3 px-4 py-3" key={exercise.id}>
                <Pictogram {...pictogram} />
                <button className="min-w-0 flex-1 text-left" onClick={() => openExerciseDraft(exercise)}>
                  <p className="truncate text-sm font-semibold">{exercise.name}</p>
                  <p className="truncate text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
                </button>
                <button className="icon-button h-9 w-9" aria-label={`${exercise.name}を追加`} onClick={() => openExerciseDraft(exercise)}><Plus size={17} /></button>
                <button className="icon-button h-9 w-9" aria-label={`${exercise.name}を編集`} onClick={() => openMyTrainingModal(editableMyTrainingDraftFromExercise(exercise, workoutWeightPresetStore))}><Pencil size={16} /></button>
                <button className="icon-button h-9 w-9 text-clay" aria-label={`${exercise.name}を削除`} onClick={() => deleteMyTrainingExercise(exercise)}><Trash2 size={16} /></button>
              </div>
            );
          })}
          {myTrainingExercises.length === 0 && <EmptyLine text="ジムや狙い方に合わせた種目を登録できます" />}
        </section>
      )}

      {(mode === "body" || mode === "equipment" || mode === "search") && (
        <section className="compact-card p-3" ref={workoutSearchSectionRef}>
          <div ref={workoutSearchControlsRef}>
            {mode === "search" ? (
              <input
                ref={workoutSearchInputRef}
                className="h-12 w-full text-base"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") dismissWorkoutKeyboard();
                }}
                placeholder="種目検索"
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
              {workoutFilterOptions.map((item) => (
                <button className={`tap-tile ${filter === item ? "tap-tile-active" : ""}`} key={item} onClick={() => setFilter(item)}>{item}</button>
              ))}
              </div>
            )}
          </div>
          <div className="mt-3 divide-y divide-line" onPointerDown={dismissWorkoutKeyboard} onTouchStart={dismissWorkoutKeyboard} onWheel={dismissWorkoutKeyboard}>
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

      {shouldShowFloatingWorkoutSearch && (
        <button
          type="button"
          className="floating-workout-search floating-food-search-visible"
          onClick={focusWorkoutSearch}
          aria-label="種目検索へ戻る"
        >
          <ArrowUp size={15} />
          <span>検索に戻る</span>
        </button>
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
                sets={setsByExerciseId.get(exercise.id) ?? []}
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
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={() => setTemplateTargetItem(undefined)}>
          <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
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
          weightPresetStore={workoutWeightPresetStore}
          onSaveWeightPresetStore={saveWorkoutWeightPresetStore}
          onClose={() => setExerciseDraft(undefined)}
          onAddAnother={() => {
            setExerciseDraft(undefined);
            scrollToWorkoutTop();
          }}
          onSave={() => addPresetExercise(exerciseDraft)}
          onSaveAsMyTraining={(draft, presets) => openMyTrainingModal(myTrainingDraftFromWorkoutDraft(draft, presets))}
        />
      )}

      {isMyTrainingModalOpen && (
        <MyTrainingModal
          exercisePresets={props.exercisePresets}
          initialDraft={myTrainingInitialDraft}
          weightPresetStore={workoutWeightPresetStore}
          onClose={() => {
            setIsMyTrainingModalOpen(false);
            setMyTrainingInitialDraft(undefined);
          }}
          onSave={saveMyTrainingDraft}
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
  menuItems: MenuItem[];
  foodEntries: FoodEntry[];
  weightLogs: WeightLog[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
  weeklyWorkoutStatus: WeeklyWorkoutStatus;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  onEditRecordDate: (date: string, targetTab: EditableRecordTab) => void;
  specialModeSettings: SpecialModeSettings[];
  pauseModeSettings: SpecialModeSettings[];
  settings?: AppSettings;
}) {
  const [historyGrouping, setHistoryGrouping] = useState<HistoryGrouping>("day");
  const [reportMonth, setReportMonth] = useState(() => monthKey(props.appDate));
  const [selectedReportDate, setSelectedReportDate] = useState(props.appDate);
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<EditableRecordTab | undefined>();
  const [historyReport, setHistoryReport] = useState("");
  const [historyReportCopied, setHistoryReportCopied] = useState(false);
  const sortedWeightLogs = useMemo(() => [...props.weightLogs].sort((a, b) => a.logged_at.localeCompare(b.logged_at)), [props.weightLogs]);
  const latestWeight = sortedWeightLogs.at(-1);
  const firstWeight = sortedWeightLogs[0];
  const latestBodyFat = useMemo(() => [...sortedWeightLogs].reverse().find((log) => typeof log.body_fat_percentage === "number"), [sortedWeightLogs]);
  const firstBodyFat = sortedWeightLogs.find((log) => typeof log.body_fat_percentage === "number");
  const workoutHistory = useMemo(() => buildWorkoutHistory(props.workoutSessions, props.workoutExercises, props.workoutSets), [props.workoutSessions, props.workoutExercises, props.workoutSets]);
  const workoutGroups = useMemo(() => groupWorkoutHistory(workoutHistory, historyGrouping), [workoutHistory, historyGrouping]);
  const recentPrs = useMemo(() => workoutHistory.flatMap((session) => session.prs.map((pr) => ({ ...pr, app_date: session.app_date }))).slice(0, 8), [workoutHistory]);
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
  const selectedFoodEntries = useMemo(() => selectedReportDate ? props.foodEntries.filter((entry) => entry.app_date === selectedReportDate) : [], [props.foodEntries, selectedReportDate]);
  const selectedFoodTotal = useMemo(() => sumFood(selectedFoodEntries), [selectedFoodEntries]);
  const selectedWorkoutItems = useMemo(() => selectedReportDate ? workoutHistory.filter((session) => session.app_date === selectedReportDate) : [], [workoutHistory, selectedReportDate]);
  const selectedWeight = useMemo(() => selectedReportDate
    ? [...props.weightLogs].reverse().find((entry) => entry.app_date === selectedReportDate)
    : undefined, [props.weightLogs, selectedReportDate]);
  const selectedHasRecords = !!selectedSummary;
  useEffect(() => {
    setSelectedRecordDetail(undefined);
  }, [selectedReportDate]);
  const generateHistoryDayReport = async () => {
    if (!selectedReportDate || !selectedHasRecords) return;
    const generatedAt = nowIso();
    const content = generateMarkdownReport({
      profile: props.profile,
      goal: props.goal,
      foodEntries: selectedFoodEntries,
      menuItems: props.menuItems,
      weightLogs: props.weightLogs.filter((entry) => entry.app_date <= selectedReportDate),
      workoutSessions: props.workoutSessions.filter((entry) => entry.app_date === selectedReportDate),
      workoutExercises: props.workoutExercises,
      workoutSets: props.workoutSets,
      weeklyWorkoutStatus: props.weeklyWorkoutStatus,
      periodStart: selectedReportDate,
      periodEnd: selectedReportDate,
      generatedAt,
      currentAppDate: props.appDate,
      cheatDayDates: props.cheatDayDates.filter((date) => date === selectedReportDate),
      specialModeDays: [
        ...getSpecialModeDaysInRange(selectedReportDate, selectedReportDate, props.specialModeSettings),
        ...getPauseModeDaysInRange(selectedReportDate, selectedReportDate, props.pauseModeSettings),
        ...getDeveloperTestModeDaysInRange(selectedReportDate, selectedReportDate, props.settings),
      ],
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
    await props.refresh();
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
                <MetricPill label="一時停止" value={getPauseModeDaysInRange(selectedReportDate, selectedReportDate, props.pauseModeSettings).length ? "対象" : "-"} />
              </div>
              <button className="primary-button mt-3 w-full" onClick={generateHistoryDayReport}>
                <FileText size={17} />この日の日別レポートを生成
              </button>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  className={`secondary-button justify-center ${selectedRecordDetail === "food" ? "border-leaf bg-leaf/15 text-leaf" : ""}`}
                  onClick={() => setSelectedRecordDetail((current) => current === "food" ? undefined : "food")}
                >
                  <Utensils size={16} />食事の表示
                </button>
                <button
                  className={`secondary-button justify-center ${selectedRecordDetail === "workout" ? "border-leaf bg-leaf/15 text-leaf" : ""}`}
                  onClick={() => setSelectedRecordDetail((current) => current === "workout" ? undefined : "workout")}
                >
                  <Dumbbell size={16} />筋トレの表示
                </button>
              </div>
              {selectedRecordDetail === "food" && (
                <div className="mt-3 overflow-hidden rounded-md border border-line bg-rice">
                  <div className="flex items-center justify-between gap-3 px-3 py-2">
                    <div>
                      <p className="text-xs font-black">食事ログ</p>
                      <p className="text-[11px] font-semibold text-moss">{selectedFoodEntries.length}件 · {Math.round(selectedFoodTotal.calories)}kcal</p>
                    </div>
                    <button className="secondary-button h-8 px-3 py-1 text-[11px]" onClick={() => props.onEditRecordDate(selectedReportDate, "food")}>
                      Foodで編集
                    </button>
                  </div>
                  <div className="divide-y divide-line">
                    {selectedFoodEntries.map((entry) => (
                      <FoodLogRow
                        displayName={formatFoodEntryName(entry, props.menuItems)}
                        entry={entry}
                        key={entry.id}
                        onEdit={() => props.onEditRecordDate(selectedReportDate, "food")}
                        showSource
                      />
                    ))}
                    {selectedFoodEntries.length === 0 && <EmptyLine text="この日の食事ログはありません" />}
                  </div>
                </div>
              )}
              {selectedRecordDetail === "workout" && (
                <div className="mt-3 overflow-hidden rounded-md border border-line bg-rice">
                  <div className="flex items-center justify-between gap-3 px-3 py-2">
                    <div>
                      <p className="text-xs font-black">筋トレログ</p>
                      <p className="text-[11px] font-semibold text-moss">{selectedWorkoutItems.length}回</p>
                    </div>
                    <button className="secondary-button h-8 px-3 py-1 text-[11px]" onClick={() => props.onEditRecordDate(selectedReportDate, "workout")}>
                      Workoutで編集
                    </button>
                  </div>
                  <div className="divide-y divide-line">
                    {selectedWorkoutItems.map((session) => (
                      <div className="px-3 py-3" key={session.id}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">{session.title}</p>
                            <p className="text-xs text-moss">{session.exerciseCount}種目 · {session.setCount}セット</p>
                          </div>
                          {session.prs.length > 0 && <span className="shrink-0 rounded-full bg-sun/20 px-2 py-0.5 text-[11px] font-black text-[#8a5d13]">PR {session.prs.length}</span>}
                        </div>
                        <div className="mt-2 space-y-1">
                          {session.lines.map((line, index) => (
                            <div className="flex items-center justify-between gap-2 text-xs" key={`${session.id}-${line.exerciseName}-${index}`}>
                              <span className="truncate font-semibold text-ink">{line.exerciseName}</span>
                              <span className={line.isPr ? "shrink-0 font-black text-clay" : "shrink-0 text-moss"}>{line.isPr ? "PR " : ""}{line.label}</span>
                            </div>
                          ))}
                        </div>
                        <button className="secondary-button mt-3 h-8 w-full justify-center py-1 text-[11px]" onClick={() => props.onEditRecordDate(selectedReportDate, "workout")}>
                          この日の筋トレを編集
                        </button>
                      </div>
                    ))}
                    {selectedWorkoutItems.length === 0 && <EmptyLine text="この日の筋トレログはありません" />}
                  </div>
                </div>
              )}
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
  exercisePresets: ExercisePreset[];
  workoutTemplates: WorkoutTemplate[];
  specialModeSettings: SpecialModeSettings[];
  pauseModeSettings: SpecialModeSettings[];
  activeSpecialMode?: ActiveSpecialMode;
  isDeveloperTestMode: boolean;
  achievementProgress: Record<string, AchievementProgress>;
  focus?: SettingsFocus;
  backupInfo: BackupInfo;
  settings?: AppSettings;
  themeMode: ThemeMode;
  themeAccent: ThemeAccent;
  themeCharacter: ThemeCharacter;
  themeCharacterVariant: string;
  resolvedTheme: "light" | "dark";
  markBackupNow: () => void;
  openUpdateNotes: () => void;
  refresh: () => Promise<void>;
  showToast: (text: string) => void;
  unlockAllAchievements: () => Promise<void>;
  allData: {
    foodEntries: FoodEntry[];
    weightLogs: WeightLog[];
    workoutSessions: WorkoutSession[];
    workoutExercises: WorkoutExercise[];
    workoutSets: WorkoutSet[];
  };
}) {
  const [activeSettingsSection, setActiveSettingsSection] = useState<SettingsSection | undefined>(() => props.focus);
  const [themeCharacterCandidate, setThemeCharacterCandidate] = useState<Exclude<ThemeCharacter, "none">>();
  const [goalDraft, setGoalDraft] = useState(() => settingsGoalDraftFrom(props.activeGoal, props.profile));
  const [activeGoalSettingsSection, setActiveGoalSettingsSection] = useState<GoalSettingsSection>();
  const [goalWizardStep, setGoalWizardStep] = useState(0);
  const [presetDraft, setPresetDraft] = useState({ ...emptyManual, name: "", savePreset: true });
  const [editingUserMenuItemId, setEditingUserMenuItemId] = useState<string>();
  const [activeMyMenuSection, setActiveMyMenuSection] = useState<MyMenuSection | undefined>(() => props.focus === "myMenu" ? "method" : undefined);
  const [myMenuWizardStep, setMyMenuWizardStep] = useState<ManualFoodWizardStep>("basic");
  const [activeMyTrainingSection, setActiveMyTrainingSection] = useState<MyTrainingSection | undefined>();
  const [settingsMyTrainingModalOpen, setSettingsMyTrainingModalOpen] = useState(false);
  const [settingsMyTrainingInitialDraft, setSettingsMyTrainingInitialDraft] = useState<MyTrainingDraft>();
  const [settingsAiFoodImportOpen, setSettingsAiFoodImportOpen] = useState(false);
  const [settingsAiFoodImportStep, setSettingsAiFoodImportStep] = useState<AiFoodImportStep>("prompt");
  const [settingsAiFoodImportText, setSettingsAiFoodImportText] = useState("");
  const [settingsAiFoodImportItems, setSettingsAiFoodImportItems] = useState<AiFoodBridgeItem[]>([]);
  const [settingsAiFoodImportSelections, setSettingsAiFoodImportSelections] = useState<Record<number, AiFoodImportSelection>>({});
  const [settingsAiFoodImportError, setSettingsAiFoodImportError] = useState("");
  const [settingsCopiedAiFoodPrompt, setSettingsCopiedAiFoodPrompt] = useState(false);
  const [settingsAiFoodMealType, setSettingsAiFoodMealType] = useState<MealType>("lunch");
  const [activeExportSection, setActiveExportSection] = useState<ExportSection | undefined>(() => props.focus === "backup" ? "backup" : undefined);
  const [reportMode, setReportMode] = useState<ReportMode>("day");
  const [question, setQuestion] = useState("");
  const [report, setReport] = useState("");
  const [copiedReport, setCopiedReport] = useState(false);
  const [backupImportMessage, setBackupImportMessage] = useState("");
  const [logExportStep, setLogExportStep] = useState<LogExportStep>("type");
  const [logExportType, setLogExportType] = useState<LogExportType>("food_workout");
  const [logExportGrouping, setLogExportGrouping] = useState<HistoryGrouping>("day");
  const [logExportStartDate, setLogExportStartDate] = useState(addDays(props.appDate, -6));
  const [logExportEndDate, setLogExportEndDate] = useState(props.appDate);
  const [logExportCalendarMonth, setLogExportCalendarMonth] = useState(() => monthKey(props.appDate));
  const [logExportDateTarget, setLogExportDateTarget] = useState<LogExportDateTarget>("start");
  const [logExportResult, setLogExportResult] = useState<LogExportResult>();
  const [copiedLogExport, setCopiedLogExport] = useState(false);
  const [goalHelpTopic, setGoalHelpTopic] = useState<GoalHelpTopic>();
  const [isMacroOverrideOpen, setIsMacroOverrideOpen] = useState(false);
  const [isProfileNameOpen, setIsProfileNameOpen] = useState(false);
  const [profileNameDraft, setProfileNameDraft] = useState(props.profile?.name ?? "");
  const [isTravelModeOpen, setIsTravelModeOpen] = useState(false);
  const [travelModalStep, setTravelModalStep] = useState<"select" | "period">("select");
  const [selectedTravelModeId, setSelectedTravelModeId] = useState("");
  const [travelNameDraft, setTravelNameDraft] = useState("");
  const [travelStartDraft, setTravelStartDraft] = useState(props.appDate);
  const [travelEndDraft, setTravelEndDraft] = useState(addDays(props.appDate, 4));
  const [isPauseModeOpen, setIsPauseModeOpen] = useState(false);
  const [pauseLabelDraft, setPauseLabelDraft] = useState("一時停止");
  const [pauseStartDraft, setPauseStartDraft] = useState(props.appDate);
  const [pauseEndDraft, setPauseEndDraft] = useState(addDays(props.appDate, 6));
  const [developerTapCount, setDeveloperTapCount] = useState(0);
  const [isDeveloperMenuOpen, setIsDeveloperMenuOpen] = useState(false);
  const themeOptions: Array<{ value: ThemeMode; label: string }> = [
    { value: "system", label: "端末に合わせる" },
    { value: "light", label: "ライト" },
    { value: "dark", label: "ダーク" },
  ];
  const goalWizardSteps = [
    { key: "phase", title: "目標", subtitle: "体重や筋肉の方向性を選びます。" },
    { key: "activity", title: "運動量", subtitle: "日常活動も含めた消費量の補正です。" },
    { key: "age", title: "年齢", subtitle: "消費カロリーの自動計算に使います。" },
    { key: "targetWeight", title: "目標体重", subtitle: "PFCの基準にする体重です。" },
    { key: "targetBodyFat", title: "目標体脂肪率", subtitle: "未定なら0のままでOKです。" },
    { key: "targetDate", title: "目標達成日", subtitle: "期間から1日のカロリー補正を計算します。" },
    { key: "workout", title: "筋トレ頻度", subtitle: "Homeの今週の運動カードに使います。" },
    { key: "cardio", title: "有酸素頻度", subtitle: "歩く・バイク・ランなどの週目標です。" },
    { key: "confirm", title: "確認", subtitle: "計算結果を確認して保存します。" },
  ] as const;

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
        theme_accent: props.themeAccent,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await props.refresh();
    props.showToast(theme_mode === "system" ? "表示を端末設定に合わせます" : `${theme_mode === "dark" ? "ダーク" : "ライト"}モードにしました`);
  };
  const updateThemeAccent = async (theme_accent: ThemeAccent) => {
    const timestamp = nowIso();
    if (props.settings) {
      await db.settings.update("local", { theme_accent, updated_at: timestamp });
    } else {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: true,
        theme_mode: props.themeMode,
        theme_accent,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await props.refresh();
    props.showToast(`テーマカラーを${themeAccentLabels[theme_accent]}にしました`);
  };
  const saveSettingsPatch = async (patch: Partial<AppSettings>) => {
    const timestamp = nowIso();
    if (props.settings) {
      await db.settings.update("local", { ...patch, updated_at: timestamp });
    } else {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: true,
        theme_mode: props.themeMode,
        theme_accent: props.themeAccent,
        created_at: timestamp,
        updated_at: timestamp,
        ...patch,
      });
    }
    await props.refresh();
  };
  const updateThemeCharacter = async (theme_character: ThemeCharacter, theme_character_variant = "default") => {
    await saveSettingsPatch({ theme_character, theme_character_variant });
    setThemeCharacterCandidate(undefined);
    props.showToast(theme_character === "none" ? "テーマキャラをオフにしました" : `${themeCharacterLabels[theme_character]}をHomeに表示します`);
  };

  useEffect(() => {
    if (!props.focus) return;
    setActiveSettingsSection(props.focus);
    if (props.focus === "myMenu") {
      setEditingUserMenuItemId(undefined);
      setPresetDraft({ ...emptyManual, savePreset: true });
      setActiveMyMenuSection("method");
      setMyMenuWizardStep("basic");
    }
    if (props.focus === "backup") {
      setActiveExportSection("backup");
    }
    if (props.focus === "goal") {
      setActiveGoalSettingsSection(undefined);
      setGoalWizardStep(0);
    }
  }, [props.focus]);

  useEffect(() => {
    setGoalDraft(settingsGoalDraftFrom(props.activeGoal, props.profile));
  }, [props.activeGoal?.id, props.profile?.current_weight_kg, props.profile?.body_fat_percentage]);

  useEffect(() => {
    setProfileNameDraft(props.profile?.name ?? "");
  }, [props.profile?.name]);
  useEffect(() => {
    if (!props.isDeveloperTestMode) setIsDeveloperMenuOpen(false);
  }, [props.isDeveloperTestMode]);

  const calculated = props.profile
    ? calculateTargets({
        profile: props.profile,
        age: goalDraft.age,
        sex: props.profile.sex,
        activity_level: goalDraft.activity_level,
        phase: goalDraft.phase,
        target_weight_kg: goalDraft.target_weight_kg,
        target_body_fat_percentage: goalDraft.target_body_fat_percentage || undefined,
        target_date: goalDraft.target_date || undefined,
        manual_target_calories: goalDraft.manual_target_calories || undefined,
        manual_protein_g: goalDraft.manual_protein_g || undefined,
        manual_fat_g: goalDraft.manual_fat_g || undefined,
        manual_carbs_g: goalDraft.manual_carbs_g || undefined,
      })
    : undefined;
  const macroOverrideSummary = [
    goalDraft.manual_target_calories ? `kcal ${goalDraft.manual_target_calories}` : "",
    goalDraft.manual_protein_g ? `P ${goalDraft.manual_protein_g}g` : "",
    goalDraft.manual_fat_g ? `F ${goalDraft.manual_fat_g}g` : "",
    goalDraft.manual_carbs_g ? `C ${goalDraft.manual_carbs_g}g` : "",
  ].filter(Boolean).join(" / ") || "すべて自動";
  const phaseDescriptions: Record<Phase, string> = {
    weight_loss: "体重をしっかり落としたい時。カロリーはやや強めに抑えます。",
    slow_cut: "無理なく少しずつ落としたい時。続けやすい赤字幅にします。",
    maintenance: "今の体重を大きく変えず、食事と運動を安定させます。",
    recomposition: "体重より見た目重視。脂肪を抑えつつ筋肉を残す配分にします。",
    lean_bulk: "脂肪を増やしすぎず、筋肉を増やすために少しだけ多めに食べます。",
    strength_focus: "筋力とトレーニング出力を優先し、エネルギーを少し厚めにします。",
    custom: "自分でkcal/PFCを決めたい時。カスタムPFCで上書きできます。",
  };
  const activityDescriptions: Record<ActivityLevel, string> = {
    low: "在宅や座り仕事が中心で、運動日以外はあまり歩かない。",
    moderate: "日常でそこそこ歩く、または週2〜4回くらい運動する。",
    high: "立ち仕事・よく歩く生活、または週4〜6回しっかり運動する。",
    very_high: "肉体労働や競技練習など、毎日の消費がかなり多い。",
  };
  const goalCalculationSummary = (
    <p className="mt-3 rounded-md bg-rice p-3 text-sm">
      計算: {calculated?.target_calories ?? "-"} kcal / P{calculated?.target_protein_g ?? "-"} F{calculated?.target_fat_g ?? "-"} C{calculated?.target_carbs_g ?? "-"}
      {typeof calculated?.target_daily_calorie_adjustment === "number" && <span className="block text-xs text-moss">期間補正: {calculated.target_daily_calorie_adjustment > 0 ? "+" : ""}{calculated.target_daily_calorie_adjustment} kcal/日</span>}
      {typeof calculated?.target_fat_mass_kg === "number" && typeof calculated?.target_lean_mass_kg === "number" && (
        <span className="block text-xs text-moss">
          体組成: 脂肪 {calculated.target_fat_mass_kg}kg{typeof calculated.target_fat_mass_change_kg === "number" ? ` (${formatSignedNumber(calculated.target_fat_mass_change_kg)}kg)` : ""} / 除脂肪 {calculated.target_lean_mass_kg}kg{typeof calculated.target_lean_mass_change_kg === "number" ? ` (${formatSignedNumber(calculated.target_lean_mass_change_kg)}kg)` : ""}
        </span>
      )}
    </p>
  );
  const userMenuItems = useMemo(
    () => props.menuItems
      .filter((item) => item.is_user_created)
      .sort((a, b) => (b.updated_at || b.created_at).localeCompare(a.updated_at || a.created_at)),
    [props.menuItems],
  );
  const myTrainingExercises = useMemo(
    () => props.exercisePresets
      .filter((item) => item.is_user_created)
      .sort((a, b) => (b.updated_at || b.created_at).localeCompare(a.updated_at || a.created_at)),
    [props.exercisePresets],
  );
  const settingsWorkoutWeightPresetStore = useMemo(
    () => mergeWorkoutWeightPresetStores(readLocalWorkoutWeightPresetStore(), props.settings?.workout_weight_presets),
    [props.settings?.workout_weight_presets],
  );
  const activeTravelMode = props.specialModeSettings.find((mode) => mode.enabled);
  const isTravelModeEnabled = !!activeTravelMode;
  const travelModePeriodLabel = activeTravelMode?.start_date && activeTravelMode.end_date
    ? `${formatJapaneseDate(activeTravelMode.start_date)}〜${formatJapaneseDate(activeTravelMode.end_date)}`
    : "未設定";
  const activePauseMode = props.pauseModeSettings.find((mode) => mode.enabled);
  const isPauseModeEnabled = !!activePauseMode;
  const pauseModePeriodLabel = activePauseMode?.start_date && activePauseMode.end_date
    ? `${formatJapaneseDate(activePauseMode.start_date)}〜${formatJapaneseDate(activePauseMode.end_date)}`
    : "未設定";
  const logExportCalendarCells = useMemo(() => buildMonthCalendar(logExportCalendarMonth), [logExportCalendarMonth]);
  const normalizedLogExportPeriod = normalizeDatePeriod(logExportStartDate, logExportEndDate);
  const settingsAiFoodMatchCandidates = useMemo(
    () => settingsAiFoodImportItems.map((item) => buildAiFoodImportCandidates(item, props.menuItems)),
    [settingsAiFoodImportItems, props.menuItems],
  );
  const developerProgressPercent = Math.max(0, Math.min(110, Math.round(props.settings?.developer_progress_percent ?? 0)));
  const developerForceTrophyAnimation = !!props.settings?.developer_force_trophy_animation;
  const developerTestOverlayEnabled = !!props.settings?.developer_test_overlay_enabled;
  const developerHokkaidoMode = props.specialModeSettings.find((mode) => mode.id === "hokkaido_trip");
  const isDeveloperHokkaidoModeEnabled = !!developerHokkaidoMode?.enabled;
  const homeBodyFatDisplay = props.settings?.home_body_fat_display ?? "today";
  const homeWeightDisplay = props.settings?.home_weight_display ?? "today";

  const resetSettingsAiFoodImport = () => {
    setSettingsAiFoodImportStep("prompt");
    setSettingsAiFoodImportText("");
    setSettingsAiFoodImportItems([]);
    setSettingsAiFoodImportSelections({});
    setSettingsAiFoodImportError("");
    setSettingsCopiedAiFoodPrompt(false);
    setSettingsAiFoodMealType("lunch");
  };
  const openSettingsAiFoodImport = () => {
    resetSettingsAiFoodImport();
    setSettingsAiFoodImportOpen(true);
  };
  const closeSettingsAiFoodImport = () => {
    setSettingsAiFoodImportOpen(false);
    resetSettingsAiFoodImport();
  };
  const parseSettingsAiFoodImport = () => {
    const result = parseAiFoodBridgeText(settingsAiFoodImportText);
    if (!result.items.length) {
      setSettingsAiFoodImportError(result.error || "取り込める食品データが見つかりませんでした。");
      return;
    }
    setSettingsAiFoodImportItems(result.items);
    setSettingsAiFoodImportSelections({});
    setSettingsAiFoodMealType(inferAiFoodMealType(result.items));
    setSettingsAiFoodImportError("");
    setSettingsAiFoodImportStep("read");
  };
  const saveSettingsAiFoodImport = async () => {
    const timestamp = nowIso();
    const menuItemsById = new Map(props.menuItems.map((item) => [item.id, item]));
    let savedCount = 0;
    for (let index = 0; index < settingsAiFoodImportItems.length; index += 1) {
      const aiItem = settingsAiFoodImportItems[index];
      const selection = settingsAiFoodImportSelections[index] ?? { source: "skip" };
      if (selection.source === "skip") continue;
      const matchedItem = selection.source === "menu" && selection.menuItemId ? menuItemsById.get(selection.menuItemId) : undefined;
      await db.menu_items.put(matchedItem ? userMenuItemCloneFromMenuItem(matchedItem, timestamp) : menuItemFromAiFoodImportItem(aiItem, timestamp, settingsAiFoodMealType));
      savedCount += 1;
    }
    closeSettingsAiFoodImport();
    setActiveMyMenuSection("list");
    await props.refresh();
    props.showToast(savedCount ? `${savedCount}件をマイメニューに保存しました` : "保存する項目はありませんでした");
  };

  useEffect(() => {
    const mode = activePauseMode ?? props.pauseModeSettings[0];
    if (!mode) return;
    setPauseLabelDraft(mode.label ?? "一時停止");
    setPauseStartDraft(mode.start_date ?? props.appDate);
    setPauseEndDraft(mode.end_date ?? addDays(props.appDate, 6));
  }, [activePauseMode?.id, activePauseMode?.start_date, activePauseMode?.end_date, props.pauseModeSettings.length, props.appDate]);

  const deleteUserMenuItem = async (item: MenuItem) => {
    const name = formatMenuItemName(item);
    const confirmed = window.confirm(`${name}をマイメニューから削除しますか？\n記録済みの食事ログは残ります。`);
    if (!confirmed) return;
    await db.menu_items.delete(item.id);
    if (editingUserMenuItemId === item.id) {
      setEditingUserMenuItemId(undefined);
      setPresetDraft({ ...emptyManual, savePreset: true });
      setActiveMyMenuSection("list");
      setMyMenuWizardStep("basic");
    }
    await props.refresh();
    props.showToast(`${name}をマイメニューから削除しました`);
  };
  const editUserMenuItem = (item: MenuItem) => {
    setEditingUserMenuItemId(item.id);
    setPresetDraft(manualFoodDraftFromMenuItem(item));
    setActiveMyMenuSection("edit");
    setMyMenuWizardStep("basic");
  };
  const startNewUserMenuItem = () => {
    setEditingUserMenuItemId(undefined);
    setPresetDraft({ ...emptyManual, savePreset: true });
    setActiveMyMenuSection("method");
    setMyMenuWizardStep("basic");
  };
  const closeMyMenuSubsection = () => {
    setActiveMyMenuSection(undefined);
    setEditingUserMenuItemId(undefined);
    setPresetDraft({ ...emptyManual, savePreset: true });
    setMyMenuWizardStep("basic");
  };
  const startNewSettingsMyTraining = () => {
    setSettingsMyTrainingInitialDraft(undefined);
    setSettingsMyTrainingModalOpen(true);
  };
  const editSettingsMyTraining = (exercise: ExercisePreset) => {
    setSettingsMyTrainingInitialDraft(editableMyTrainingDraftFromExercise(exercise, settingsWorkoutWeightPresetStore));
    setSettingsMyTrainingModalOpen(true);
  };
  const closeSettingsMyTrainingModal = () => {
    setSettingsMyTrainingModalOpen(false);
    setSettingsMyTrainingInitialDraft(undefined);
  };
  const saveSettingsMyTrainingDraft = async (draft: MyTrainingDraft) => {
    const timestamp = nowIso();
    const editingExercise = draft.editingExerciseId
      ? props.exercisePresets.find((item) => item.id === draft.editingExerciseId && item.is_user_created)
      : undefined;
    const exercise = exercisePresetFromMyTrainingDraft(draft, timestamp, editingExercise);
    await db.exercise_presets.put(exercise);
    if (draft.weight_presets.length) {
      const nextStore = saveWorkoutWeightPresets(workoutWeightPresetKeys(exercise), draft.weight_presets, settingsWorkoutWeightPresetStore);
      await persistWorkoutWeightPresetStore(nextStore, props.settings);
    }
    closeSettingsMyTrainingModal();
    setActiveMyTrainingSection("list");
    await props.refresh();
    props.showToast(editingExercise ? `${exercise.name}を更新しました` : `${exercise.name}をマイトレに保存しました`);
  };
  const deleteSettingsMyTraining = async (exercise: ExercisePreset) => {
    if (!confirm(`マイトレ「${exercise.name}」を削除しますか？過去の記録は残ります。`)) return;
    await db.exercise_presets.delete(exercise.id);
    await props.refresh();
    props.showToast(`${exercise.name}を削除しました`);
  };
  const resetLogExportWizard = () => {
    setLogExportStep("type");
    setLogExportCalendarMonth(monthKey(props.appDate));
    setLogExportDateTarget("start");
    setLogExportResult(undefined);
    setCopiedLogExport(false);
  };
  const saveUserMenuItem = async () => {
    if (!presetDraft.name.trim()) return;
    const timestamp = nowIso();
    const nutrition = draftNutrition(presetDraft);
    const ingredientGrams = presetDraft.entry_kind === "ingredient" ? ingredientGramValue(presetDraft) : undefined;
    const ingredientServingLabel = ingredientGrams === undefined ? undefined : `${formatControlValue(ingredientGrams)}g`;
    const dataSource: DataSource = presetDraft.officialVerified ? "official" : "user";
    const confidence: Confidence = presetDraft.officialVerified ? "high" : nutrition.unknown.length ? "low" : "high";
    const tags = unique([
      presetDraft.category,
      presetDraft.subcategory,
      presetDraft.brand,
      presetDraft.entry_kind === "ingredient" ? "材料" : "",
      presetDraft.officialVerified ? "公式値" : "",
      ...(nutrition.unknown.length ? ["栄養素一部不明"] : []),
    ]);
    const editingItem = editingUserMenuItemId ? userMenuItems.find((item) => item.id === editingUserMenuItemId) : undefined;
    await db.menu_items.put({
      id: editingItem?.id ?? makeId("menu_user"),
      name: presetDraft.name.trim(),
      brand: presetDraft.brand || undefined,
      category: presetDraft.category,
      tags,
      calories: nutrition.calories,
      protein_g: nutrition.protein_g,
      fat_g: nutrition.fat_g,
      carbs_g: nutrition.carbs_g,
      salt_g: nutrition.salt_g,
      serving_label: ingredientServingLabel,
      weight_g: ingredientGrams,
      data_source: dataSource,
      confidence,
      source_url: dataSource === "official" ? editingItem?.source_url : undefined,
      fetched_at: dataSource === "official" ? editingItem?.fetched_at : undefined,
      is_public_preset: false,
      is_user_created: true,
      is_favorite: presetDraft.favorite,
      created_at: editingItem?.created_at ?? timestamp,
      updated_at: timestamp,
    });
    const savedName = presetDraft.name.trim();
    setEditingUserMenuItemId(undefined);
    setPresetDraft({ ...emptyManual, savePreset: true });
    setActiveMyMenuSection("list");
    setMyMenuWizardStep("basic");
    await props.refresh();
    props.showToast(editingItem ? `${savedName}を更新しました` : `${savedName}をマイメニューに保存しました`);
  };
  const saveSpecialModeSettings = async (nextModes: SpecialModeSettings[]) => {
    const timestamp = nowIso();
    const special_modes = nextModes.map((mode) => ({ ...mode, updated_at: timestamp }));
    if (props.settings) {
      await db.settings.update("local", { special_modes, updated_at: timestamp });
    } else {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: true,
        special_modes,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await props.refresh();
  };
  const savePauseModeSettings = async (nextModes: SpecialModeSettings[]) => {
    const timestamp = nowIso();
    const pause_modes = nextModes.map((mode) => ({ ...mode, updated_at: timestamp }));
    if (props.settings) {
      await db.settings.update("local", { pause_modes, updated_at: timestamp });
    } else {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: true,
        pause_modes,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    await props.refresh();
  };
  const openTravelModeModal = () => {
    const mode = activeTravelMode ?? props.specialModeSettings[0];
    setSelectedTravelModeId(mode?.id ?? "");
    setTravelStartDraft(mode?.start_date ?? props.appDate);
    setTravelEndDraft(mode?.end_date ?? addDays(props.appDate, 4));
    setTravelNameDraft("");
    setTravelModalStep("select");
    setIsTravelModeOpen(true);
  };
  const disableTravelMode = async () => {
    await saveSpecialModeSettings(props.specialModeSettings.map((mode) => ({ ...mode, enabled: false })));
    props.showToast("旅行モードをOFFにしました");
  };
  const toggleTravelMode = async () => {
    if (isTravelModeEnabled) {
      await disableTravelMode();
      return;
    }
    openTravelModeModal();
  };
  const addTravelDestination = async () => {
    const label = travelNameDraft.trim();
    if (!label) return;
    const id = makeId("trip");
    const nextMode: SpecialModeSettings = {
      id,
      enabled: false,
      label,
      short_label: label.slice(0, 3).toUpperCase(),
      start_date: props.appDate,
      end_date: addDays(props.appDate, 2),
    };
    await saveSpecialModeSettings([...props.specialModeSettings, nextMode]);
    setSelectedTravelModeId(id);
    setTravelStartDraft(nextMode.start_date ?? props.appDate);
    setTravelEndDraft(nextMode.end_date ?? addDays(props.appDate, 2));
    setTravelNameDraft("");
    setTravelModalStep("period");
  };
  const deleteTravelDestination = async (id: string) => {
    const target = props.specialModeSettings.find((mode) => mode.id === id);
    if (!target) return;
    const confirmed = window.confirm(`${target.label ?? "旅行先"}を削除しますか？`);
    if (!confirmed) return;
    const isPreset = specialModeDefinitions.some((definition) => definition.id === id);
    const nextModes = isPreset
      ? props.specialModeSettings.map((mode) => mode.id === id ? { ...mode, enabled: false, deleted: true } : mode)
      : props.specialModeSettings.filter((mode) => mode.id !== id);
    await saveSpecialModeSettings(nextModes);
    const nextSelected = nextModes.find((mode) => !mode.deleted && mode.id !== id)?.id ?? "";
    setSelectedTravelModeId(nextSelected);
    props.showToast("旅行先を削除しました");
  };
  const saveTravelModePeriod = async () => {
    const selected = props.specialModeSettings.find((mode) => mode.id === selectedTravelModeId);
    if (!selected || !travelStartDraft || !travelEndDraft) return;
    const startDate = travelStartDraft <= travelEndDraft ? travelStartDraft : travelEndDraft;
    const endDate = travelStartDraft <= travelEndDraft ? travelEndDraft : travelStartDraft;
    await saveSpecialModeSettings(props.specialModeSettings.map((mode) => (
      mode.id === selected.id
        ? { ...mode, enabled: true, start_date: startDate, end_date: endDate }
        : { ...mode, enabled: false }
    )));
    setIsTravelModeOpen(false);
    props.showToast("旅行モードをONにしました");
  };
  const disablePauseMode = async () => {
    await savePauseModeSettings(props.pauseModeSettings.map((mode) => ({ ...mode, enabled: false })));
    props.showToast("一時停止モードをOFFにしました");
  };
  const savePauseMode = async () => {
    if (!pauseStartDraft || !pauseEndDraft) {
      props.showToast("一時停止期間を入力してください");
      return;
    }
    const label = pauseLabelDraft.trim() || "一時停止";
    const startDate = pauseStartDraft <= pauseEndDraft ? pauseStartDraft : pauseEndDraft;
    const endDate = pauseStartDraft <= pauseEndDraft ? pauseEndDraft : pauseStartDraft;
    const current = props.pauseModeSettings[0];
    const nextMode: SpecialModeSettings = {
      id: current?.id ?? "pause_default",
      enabled: true,
      label,
      short_label: current?.short_label ?? "PAUSE",
      start_date: startDate,
      end_date: endDate,
    };
    const rest = props.pauseModeSettings.slice(1).map((mode) => ({ ...mode, enabled: false }));
    await savePauseModeSettings([nextMode, ...rest]);
    props.showToast("一時停止モードをONにしました");
  };
  const togglePauseMode = async () => {
    if (isPauseModeEnabled) {
      await disablePauseMode();
      return;
    }
    await savePauseMode();
  };
  const saveDeveloperTestMode = async (enabled: boolean) => {
    const developer_test_active_until = enabled ? new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString() : undefined;
    await saveSettingsPatch(enabled
      ? { developer_test_active_until }
      : {
          developer_test_active_until,
          developer_force_trophy_animation: false,
          developer_progress_percent: undefined,
          developer_test_overlay_enabled: false,
        });
    setDeveloperTapCount(0);
    setIsDeveloperMenuOpen(enabled);
    props.showToast(enabled ? "テストモードに入りました" : "テストモードを終了しました");
  };
  const handleDeveloperModeTap = async () => {
    if (props.isDeveloperTestMode) {
      setIsDeveloperMenuOpen(true);
      return;
    }
    const next = developerTapCount + 1;
    if (next >= 10) {
      await saveDeveloperTestMode(true);
      return;
    }
    setDeveloperTapCount(next);
    if (next >= 5) props.showToast(`開発者モードまであと${10 - next}回`);
  };
  const toggleDeveloperHokkaidoMode = async () => {
    const definition = specialModeDefinitions.find((mode) => mode.id === "hokkaido_trip");
    const fallback: SpecialModeSettings = {
      id: "hokkaido_trip",
      enabled: true,
      label: definition?.label ?? "北海道旅行",
      short_label: definition?.shortLabel ?? "北",
      food_query: definition?.foodQuery ?? "北海道旅行",
      start_date: props.appDate,
      end_date: props.appDate,
    };
    const nextModes = props.specialModeSettings.some((mode) => mode.id === "hokkaido_trip")
      ? props.specialModeSettings.map((mode) => mode.id === "hokkaido_trip"
        ? {
            ...mode,
            enabled: !isDeveloperHokkaidoModeEnabled,
            deleted: false,
            label: mode.label ?? fallback.label,
            short_label: mode.short_label ?? fallback.short_label,
            food_query: mode.food_query ?? fallback.food_query,
            start_date: props.appDate,
            end_date: props.appDate,
          }
        : mode)
      : [...props.specialModeSettings, fallback];
    await saveSpecialModeSettings(nextModes);
    props.showToast(isDeveloperHokkaidoModeEnabled ? "北海道モードをOFFにしました" : "北海道モードをONにしました");
  };
  const saveGoalSettings = async () => {
    if (!props.profile) return;
    const timestamp = nowIso();
    await Promise.all(props.goals.filter((goal) => goal.is_active).map((goal) => db.goals.update(goal.id, { is_active: false, end_date: addDays(todayAppDate(), -1), updated_at: timestamp })));
    const goal = buildGoal({
      profile: props.profile,
      phase: goalDraft.phase,
      activity_level: goalDraft.activity_level,
      age: goalDraft.age,
      target_weight_kg: goalDraft.target_weight_kg,
      target_body_fat_percentage: goalDraft.target_body_fat_percentage || undefined,
      target_date: goalDraft.target_date || undefined,
      manual_target_calories: goalDraft.manual_target_calories || undefined,
      manual_protein_g: goalDraft.manual_protein_g || undefined,
      manual_fat_g: goalDraft.manual_fat_g || undefined,
      manual_carbs_g: goalDraft.manual_carbs_g || undefined,
      target_workouts_per_week: goalDraft.target_workouts_per_week,
      target_cardio_sessions_per_week: goalDraft.target_cardio_sessions_per_week,
    });
    await db.goals.put(goal);
    await db.settings.update("local", { active_goal_id: goal.id, updated_at: timestamp });
    setActiveGoalSettingsSection(undefined);
    setGoalWizardStep(0);
    await props.refresh();
    props.showToast("ゴールを保存しました");
  };
  const generateLogExport = () => {
    const result = buildLogExport({
      type: logExportType,
      grouping: logExportGrouping,
      startDate: logExportStartDate,
      endDate: logExportEndDate,
      foodEntries: props.allData.foodEntries,
      menuItems: props.menuItems,
      workoutSessions: props.allData.workoutSessions,
      workoutExercises: props.allData.workoutExercises,
      workoutSets: props.allData.workoutSets,
    });
    setLogExportResult(result);
    setCopiedLogExport(false);
    setLogExportStep("output");
    props.showToast("ログを出力しました");
  };
  const renderGoalWizardStep = () => {
    const step = goalWizardSteps[goalWizardStep];
    if (!step) return undefined;
    if (step.key === "phase") {
      return (
        <div className="grid gap-2">
          {(Object.keys(phaseLabels) as Phase[]).map((key) => (
            <button
              key={key}
              className={`onboarding-choice ${goalDraft.phase === key ? "onboarding-choice-active" : ""}`}
              onClick={() => setGoalDraft({ ...goalDraft, phase: key })}
            >
              <span>{phaseLabels[key]}</span>
              <small>{phaseDescriptions[key]}</small>
            </button>
          ))}
        </div>
      );
    }
    if (step.key === "activity") {
      return (
        <div className="grid gap-2">
          {(Object.keys(activityLabels) as ActivityLevel[]).map((key) => (
            <button
              key={key}
              className={`onboarding-choice ${goalDraft.activity_level === key ? "onboarding-choice-active" : ""}`}
              onClick={() => setGoalDraft({ ...goalDraft, activity_level: key })}
            >
              <span>{activityLabels[key]}</span>
              <small>{activityDescriptions[key]}</small>
            </button>
          ))}
        </div>
      );
    }
    if (step.key === "age") return <NumberInput label="年齢" value={goalDraft.age} onChange={(value) => setGoalDraft({ ...goalDraft, age: value })} />;
    if (step.key === "targetWeight") return <NumberInput label="目標体重 kg" value={goalDraft.target_weight_kg} step={0.1} onChange={(value) => setGoalDraft({ ...goalDraft, target_weight_kg: value })} />;
    if (step.key === "targetBodyFat") return <NumberInput label="目標体脂肪 %" labelAction={<GoalHelpButton label="目標体脂肪率のヘルプ" onClick={() => setGoalHelpTopic("targetBodyFat")} />} value={goalDraft.target_body_fat_percentage} step={0.1} zeroDisplayLabel="自動" onChange={(value) => setGoalDraft({ ...goalDraft, target_body_fat_percentage: clampBodyFat(value) })} />;
    if (step.key === "targetDate") {
      return (
        <label className="onboarding-field">
          <span>目標達成日</span>
          <input
            type="date"
            min={addDays(todayAppDate(), 1)}
            value={goalDraft.target_date}
            onChange={(event) => setGoalDraft({ ...goalDraft, target_date: event.target.value })}
          />
        </label>
      );
    }
    if (step.key === "workout") return <NumberInput label="筋トレ / 週" value={goalDraft.target_workouts_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_workouts_per_week: Math.max(0, Math.round(value)) })} />;
    if (step.key === "cardio") return <NumberInput label="有酸素 / 週" value={goalDraft.target_cardio_sessions_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_cardio_sessions_per_week: Math.max(0, Math.round(value)) })} />;
    return (
      <div className="space-y-3">
        {goalCalculationSummary}
        <div className="rounded-3xl border border-line bg-surface/60 p-3 text-xs leading-relaxed text-moss">
          <p className="font-bold text-ink">保存内容</p>
          <p className="mt-1">{phaseLabels[goalDraft.phase]} / {activityLabels[goalDraft.activity_level]}</p>
          <p>目標体重 {goalDraft.target_weight_kg}kg / 目標体脂肪 {goalDraft.target_body_fat_percentage ? `${goalDraft.target_body_fat_percentage}%` : "自動"}</p>
          <p>筋トレ {goalDraft.target_workouts_per_week}回/週 / 有酸素 {goalDraft.target_cardio_sessions_per_week}回/週</p>
          <p>カスタムPFC: {macroOverrideSummary}</p>
        </div>
      </div>
    );
  };

  const aiReportSection = (
    <section className={`ai-report-section compact-card p-4 ${props.focus === "ai" ? "border-2 border-leaf" : ""}`}>
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
        const scopedSpecialModeDays = [
          ...getSpecialModeDaysInRange(start, end, props.specialModeSettings),
          ...getPauseModeDaysInRange(start, end, props.pauseModeSettings),
          ...getDeveloperTestModeDaysInRange(start, end, props.settings),
        ];
        const content = generateMarkdownReport({
          profile: props.profile,
          goal: props.activeGoal,
          foodEntries: props.allData.foodEntries.filter((entry) => range.includes(entry.app_date)),
          menuItems: props.menuItems,
          weightLogs: props.allData.weightLogs.filter((entry) => reportMode === "day" ? entry.app_date <= end : range.includes(entry.app_date)),
          workoutSessions: props.allData.workoutSessions.filter((entry) => range.includes(entry.app_date)),
          workoutExercises: props.allData.workoutExercises,
          workoutSets: props.allData.workoutSets,
          weeklyWorkoutStatus: props.weeklyWorkoutStatus,
          periodStart: start,
          periodEnd: end,
          generatedAt,
          currentAppDate: props.appDate,
          cheatDayDates: scopedCheatDayDates,
          specialModeDays: scopedSpecialModeDays,
          workoutGrouping: reportMode,
          question,
        });
        setReport(content);
        setCopiedReport(false);
        await db.ai_reports.put({ id: makeId("report"), period_start: start, period_end: end, format: "markdown", content, created_at: generatedAt, updated_at: generatedAt });
        await props.refresh();
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
  const sectionTitles: Record<SettingsSection, { title: string; subtitle: string }> = {
    ai: { title: "AI相談レポート", subtitle: "AIに渡す相談材料を生成します。" },
    backup: { title: "エクスポート", subtitle: "バックアップ保存とログ出力を管理します。" },
    goal: { title: "ゴール設定", subtitle: "目標体重、PFC、運動目標を調整します。" },
    theme: { title: "テーマ設定", subtitle: "表示モード、テーマカラー、テーマキャラクターを選びます。" },
    records: { title: "記録設定", subtitle: "旅行や休養など、通常評価と分けたい期間を管理します。" },
    myMenu: { title: "マイメニュー", subtitle: "自分用の食事メニューを登録・編集します。" },
    myTraining: { title: "マイトレ", subtitle: "自分用のワークアウト種目を登録・編集します。" },
    general: { title: "一般", subtitle: "チェックイン表示、ユーザー名、更新履歴、開発者モードを管理します。" },
  };
  const activeSectionTitle = activeSettingsSection ? sectionTitles[activeSettingsSection] : undefined;
  const goBackFromSettingsSection = () => {
    if (activeSettingsSection === "theme" && themeCharacterCandidate) {
      setThemeCharacterCandidate(undefined);
      return;
    }
    if (activeSettingsSection === "goal" && activeGoalSettingsSection) {
      setActiveGoalSettingsSection(undefined);
      setGoalWizardStep(0);
      return;
    }
    if (activeSettingsSection === "myMenu" && activeMyMenuSection) {
      closeMyMenuSubsection();
      return;
    }
    if (activeSettingsSection === "myTraining" && activeMyTrainingSection) {
      setActiveMyTrainingSection(undefined);
      return;
    }
    if (activeSettingsSection === "backup" && activeExportSection) {
      setActiveExportSection(undefined);
      return;
    }
    setActiveSettingsSection(undefined);
  };

  return (
    <div className="space-y-4">
      {!activeSettingsSection && (
        <>
          <section className="compact-card divide-y divide-line overflow-hidden">
            <SettingsMenuRow title="AI相談レポート" description="AIにコピーする日別・週別・月別レポート" icon={<FileText size={18} />} onClick={() => setActiveSettingsSection("ai")} />
            <SettingsMenuRow title="エクスポート" description="バックアップ保存 / 食事・ワークアウトのログ出力" icon={<Archive size={18} />} onClick={() => setActiveSettingsSection("backup")} />
            <SettingsMenuRow title="ゴール設定" description={`${phaseLabels[goalDraft.phase]} / ${calculated?.target_calories ?? "-"}kcal`} icon={<SlidersHorizontal size={18} />} onClick={() => setActiveSettingsSection("goal")} />
            <SettingsMenuRow title="テーマ設定" description={`${props.resolvedTheme === "dark" ? "ダーク" : "ライト"} / ${themeAccentLabels[props.themeAccent]} / ${themeCharacterLabels[props.themeCharacter]}`} icon={<Palette size={18} />} onClick={() => setActiveSettingsSection("theme")} />
          </section>
          <section className="compact-card divide-y divide-line overflow-hidden">
            <SettingsMenuRow title="記録設定" description={`旅行 ${isTravelModeEnabled ? "ON" : "OFF"} / 一時停止 ${isPauseModeEnabled ? "ON" : "OFF"}`} icon={<CalendarDays size={18} />} onClick={() => setActiveSettingsSection("records")} />
            <SettingsMenuRow title="マイメニュー" description={`登録済み ${userMenuItems.length}件`} icon={<Store size={18} />} onClick={() => setActiveSettingsSection("myMenu")} />
            <SettingsMenuRow title="マイトレ" description={`登録済み ${myTrainingExercises.length}件`} icon={<Dumbbell size={18} />} onClick={() => setActiveSettingsSection("myTraining")} />
            <SettingsMenuRow title="一般" description={props.profile?.name || "ユーザー名 未設定"} icon={<Settings size={18} />} onClick={() => setActiveSettingsSection("general")} />
          </section>
        </>
      )}

      {activeSectionTitle && (
        <section className="settings-detail-header">
          <button className="icon-button h-10 w-10" aria-label="Settingsに戻る" onClick={goBackFromSettingsSection}><ChevronLeft size={18} /></button>
          <div className="min-w-0">
            <h2 className="text-lg font-black">{activeSectionTitle.title}</h2>
            <p className="mt-1 text-xs font-semibold text-moss">{activeSectionTitle.subtitle}</p>
          </div>
        </section>
      )}

      {activeSettingsSection === "theme" && !themeCharacterCandidate && <section className="compact-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold">表示モード</h2>
            <p className="mt-1 text-xs text-moss">端末に合わせる、ライト、ダークから選べます。</p>
          </div>
          <select
            className="min-w-[9.5rem] text-sm font-bold"
            value={props.themeMode}
            aria-label="表示モード"
            onChange={(event) => updateThemeMode(event.target.value as ThemeMode)}
          >
            {themeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <p className="text-xs font-black text-moss">テーマカラー</p>
          <div className="theme-accent-grid mt-2">
            {themeAccentOptions.map((option) => (
              <button
                className={`theme-accent-option ${props.themeAccent === option.value ? "theme-accent-option-active" : ""}`}
                key={option.value}
                aria-pressed={props.themeAccent === option.value}
                onClick={() => updateThemeAccent(option.value)}
              >
                <span className="theme-accent-swatch" style={{ "--swatch-start": option.colors[0], "--swatch-end": option.colors[1] } as CSSProperties} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-xs font-black text-moss">テーマキャラ</p>
          <p className="mt-1 text-xs text-moss">Homeの背景に表示するキャラクターを選びます。達成状況や特別モードに合わせて姿が変化します。</p>
          <div className="theme-character-grid theme-character-grid-none mt-2">
            {themeCharacterOptions.filter((option) => option.value === "none").map((option) => (
              <button
                className={`theme-character-option ${props.themeCharacter === option.value ? "theme-character-option-active" : ""}`}
                key={option.value}
                aria-pressed={props.themeCharacter === option.value}
                onClick={() => void updateThemeCharacter("none")}
              >
                <span className="theme-character-preview theme-character-preview-none" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {(["female", "male", "other"] as ThemeCharacterGroup[]).map((group) => {
            const options = themeCharacterOptions.filter((option) => option.group === group);
            if (!options.length) return undefined;
            return (
              <div className="theme-character-group" key={group}>
                <p className="theme-character-group-title">{themeCharacterGroupLabels[group]}</p>
                <div className="theme-character-grid mt-2">
                  {options.map((option) => (
                    <button
                      className={`theme-character-option ${props.themeCharacter === option.value ? "theme-character-option-active" : ""}`}
                      key={option.value}
                      aria-pressed={props.themeCharacter === option.value}
                      onClick={() => setThemeCharacterCandidate(option.value as Exclude<ThemeCharacter, "none">)}
                    >
                      <span className="theme-character-preview" style={{ backgroundImage: `url(${option.image})` }} />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>}

      {activeSettingsSection === "theme" && themeCharacterCandidate && <section className="compact-card p-4">
        <p className="text-xs font-black text-moss">テーマキャラ</p>
        <h3 className="mt-1 text-xl font-black">{themeCharacterLabels[themeCharacterCandidate]}</h3>
        <p className="mt-1 text-xs text-moss">スタイルを選んでHomeに適用します。衣装や獲得条件つきのスタイルはここに追加されます。</p>
        <div className="theme-character-grid mt-4">
          {(Object.entries(themeCharacterImageVariants[themeCharacterCandidate]) as Array<[string, ThemeCharacterImageSet]>).map(([variant, images]) => (
            <button
              className={`theme-character-option ${props.themeCharacter === themeCharacterCandidate && props.themeCharacterVariant === variant ? "theme-character-option-active" : ""}`}
              key={variant}
              aria-pressed={props.themeCharacter === themeCharacterCandidate && props.themeCharacterVariant === variant}
              onClick={() => void updateThemeCharacter(themeCharacterCandidate, variant)}
            >
              <span className="theme-character-preview" style={{ backgroundImage: `url(${images.mid})` }} />
              <span>基本スタイル</span>
            </button>
          ))}
        </div>
        <button className="secondary-button mt-4 w-full" onClick={() => setThemeCharacterCandidate(undefined)}><ChevronLeft size={17} />キャラクターを選び直す</button>
      </section>}

      {activeSettingsSection === "general" && <section className="compact-card p-4">
        <div>
          <p className="text-sm font-black">Homeのチェックイン</p>
          <p className="mt-1 text-xs text-moss">Homeに大きく表示する数値を選べます。記録内容は変わりません。</p>
          <p className="mt-3 text-xs font-black text-moss">体重</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(Object.keys(homeWeightDisplayLabels) as HomeWeightDisplay[]).map((mode) => (
              <button
                className={`mode-button min-h-10 text-xs ${homeWeightDisplay === mode ? "mode-button-active" : ""}`}
                key={mode}
                aria-pressed={homeWeightDisplay === mode}
                onClick={() => saveSettingsPatch({ home_weight_display: mode })}
              >
                {homeWeightDisplayLabels[mode]}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs font-black text-moss">体脂肪率</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(Object.keys(homeBodyFatDisplayLabels) as HomeBodyFatDisplay[]).map((mode) => (
              <button
                className={`mode-button min-h-10 text-xs ${homeBodyFatDisplay === mode ? "mode-button-active" : ""}`}
                key={mode}
                aria-pressed={homeBodyFatDisplay === mode}
                onClick={() => saveSettingsPatch({ home_body_fat_display: mode })}
              >
                {homeBodyFatDisplayLabels[mode]}
              </button>
            ))}
          </div>
        </div>
      </section>}

      {activeSettingsSection === "goal" && !activeGoalSettingsSection && (
        <section className={`compact-card divide-y divide-line overflow-hidden scroll-mt-24 ${props.focus === "goal" ? "border-2 border-leaf" : ""}`}>
          <SettingsMenuRow title="再度質問に答える" description="質問に答えながら目標を計算し直します" icon={<Sparkles size={18} />} onClick={() => {
            setGoalWizardStep(0);
            setActiveGoalSettingsSection("guided");
          }} />
          <SettingsMenuRow title="手動で入力する" description="目標体重・目標日・運動回数などを直接変更します" icon={<SlidersHorizontal size={18} />} onClick={() => setActiveGoalSettingsSection("manual")} />
          <SettingsMenuRow title="カスタムPFCを設定する" description={`カロリーとPFCを自分で入力 · ${macroOverrideSummary}`} icon={<BarChart3 size={18} />} onClick={() => setActiveGoalSettingsSection("custom")} />
        </section>
      )}

      {activeSettingsSection === "goal" && activeGoalSettingsSection === "guided" && (
        <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "goal" ? "border-2 border-leaf" : ""}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black text-moss">ゴール再設定</p>
              <h2 className="mt-1 text-lg font-black">{goalWizardSteps[goalWizardStep]?.title}</h2>
              <p className="mt-1 text-xs text-moss">{goalWizardSteps[goalWizardStep]?.subtitle}</p>
            </div>
            <span className="numeric-text mini-chip shrink-0">{goalWizardStep + 1}/{goalWizardSteps.length}</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/5">
            <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${((goalWizardStep + 1) / goalWizardSteps.length) * 100}%` }} />
          </div>
          <div className="mt-4">{renderGoalWizardStep()}</div>
          {goalWizardStep < goalWizardSteps.length - 1 && goalCalculationSummary}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="secondary-button" onClick={() => {
              if (goalWizardStep === 0) {
                setActiveGoalSettingsSection(undefined);
                return;
              }
              setGoalWizardStep((current) => Math.max(0, current - 1));
            }}><ChevronLeft size={17} />戻る</button>
            {goalWizardStep === goalWizardSteps.length - 1 ? (
              <button className="primary-button" onClick={saveGoalSettings}><Save size={17} />保存</button>
            ) : (
              <button className="primary-button" onClick={() => setGoalWizardStep((current) => Math.min(goalWizardSteps.length - 1, current + 1))}>次へ<ChevronRight size={17} /></button>
            )}
          </div>
        </section>
      )}

      {activeSettingsSection === "goal" && activeGoalSettingsSection === "manual" && (
        <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "goal" ? "border-2 border-leaf" : ""}`}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-bold">手動で入力する</h2>
            <button className="primary-button shrink-0 px-3 py-2 text-xs" onClick={saveGoalSettings}><Save size={15} />保存</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <SelectField label="フェーズ" hint="体重・筋量をどう動かしたいか" labelAction={<GoalHelpButton label="フェーズのヘルプ" onClick={() => setGoalHelpTopic("phase")} />}>
              <select value={goalDraft.phase} onChange={(event) => setGoalDraft({ ...goalDraft, phase: event.target.value as Phase })}>
                {Object.entries(phaseLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </SelectField>
            <SelectField label="運動強度" hint="日常活動込みの消費量補正" labelAction={<GoalHelpButton label="運動強度のヘルプ" onClick={() => setGoalHelpTopic("activity")} />}>
              <select value={goalDraft.activity_level} onChange={(event) => setGoalDraft({ ...goalDraft, activity_level: event.target.value as ActivityLevel })}>
                {Object.entries(activityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </SelectField>
            <NumberInput label="年齢" value={goalDraft.age} onChange={(value) => setGoalDraft({ ...goalDraft, age: value })} />
            <NumberInput label="目標体重" value={goalDraft.target_weight_kg} step={0.1} onChange={(value) => setGoalDraft({ ...goalDraft, target_weight_kg: value })} />
            <NumberInput label="目標体脂肪 %" labelAction={<GoalHelpButton label="目標体脂肪率のヘルプ" onClick={() => setGoalHelpTopic("targetBodyFat")} />} value={goalDraft.target_body_fat_percentage} step={0.1} zeroDisplayLabel="自動" onChange={(value) => setGoalDraft({ ...goalDraft, target_body_fat_percentage: clampBodyFat(value) })} />
            <SelectField label="目標達成日" hint="体重差からkcal補正">
              <input
                type="date"
                min={addDays(todayAppDate(), 1)}
                value={goalDraft.target_date}
                onChange={(event) => setGoalDraft({ ...goalDraft, target_date: event.target.value })}
              />
            </SelectField>
            <NumberInput label="筋トレ/週" value={goalDraft.target_workouts_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_workouts_per_week: value })} />
            <NumberInput label="有酸素/週" value={goalDraft.target_cardio_sessions_per_week} onChange={(value) => setGoalDraft({ ...goalDraft, target_cardio_sessions_per_week: value })} />
          </div>
          <button className="secondary-button mt-3 w-full justify-between px-4" onClick={() => setActiveGoalSettingsSection("custom")}>
            <span>カスタムPFCを設定する</span>
            <span className="mini-chip">{macroOverrideSummary}</span>
          </button>
          {goalCalculationSummary}
          <p className="mt-2 text-xs text-moss">入力した体重・目標・活動量から、1日のカロリーとPFCを計算します。</p>
        </section>
      )}

      {activeSettingsSection === "goal" && activeGoalSettingsSection === "custom" && (
        <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "goal" ? "border-2 border-leaf" : ""}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">カスタムPFCを設定する</h2>
              <p className="mt-1 text-xs text-moss">0にすると自動計算に戻ります。設定した値はAIレポートにも表示されます。</p>
            </div>
            <button className="primary-button shrink-0 px-3 py-2 text-xs" onClick={saveGoalSettings}><Save size={15} />保存</button>
          </div>
          <div className="mt-4 rounded-md bg-rice p-3 text-xs leading-relaxed text-moss">
            <p className="font-bold text-ink">現在の自動計算</p>
            <p className="mt-1">kcal {calculated?.target_calories ?? "-"} / P{calculated?.target_protein_g ?? "-"} F{calculated?.target_fat_g ?? "-"} C{calculated?.target_carbs_g ?? "-"}</p>
          </div>
          <div className="mt-4 grid gap-3">
            <NumberInput label="目標kcal" labelAction={<AutoValueButton onClick={() => setGoalDraft({ ...goalDraft, manual_target_calories: 0 })} />} value={goalDraft.manual_target_calories} onChange={(value) => setGoalDraft({ ...goalDraft, manual_target_calories: value })} />
            <NumberInput label="目標P" labelAction={<AutoValueButton onClick={() => setGoalDraft({ ...goalDraft, manual_protein_g: 0 })} />} value={goalDraft.manual_protein_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_protein_g: value })} />
            <NumberInput label="目標F" labelAction={<AutoValueButton onClick={() => setGoalDraft({ ...goalDraft, manual_fat_g: 0 })} />} value={goalDraft.manual_fat_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_fat_g: value })} />
            <NumberInput label="目標C" labelAction={<AutoValueButton onClick={() => setGoalDraft({ ...goalDraft, manual_carbs_g: 0 })} />} value={goalDraft.manual_carbs_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_carbs_g: value })} />
          </div>
          <button className="secondary-button mt-4 w-full justify-between px-4" onClick={() => setActiveGoalSettingsSection("manual")}>
            <span>フェーズや目標体重も調整する</span>
            <ChevronRight size={17} />
          </button>
        </section>
      )}

      {activeSettingsSection === "myMenu" && !activeMyMenuSection && (
        <section className={`compact-card divide-y divide-line overflow-hidden scroll-mt-24 ${props.focus === "myMenu" ? "border-2 border-leaf" : ""}`}>
          <SettingsMenuRow title="登録済みのマイメニュー" description={`一覧の表示、編集、削除 · ${userMenuItems.length}件`} icon={<Store size={18} />} onClick={() => setActiveMyMenuSection("list")} />
          <SettingsMenuRow title="新規マイメニューの登録" description="手動入力またはAI写真から登録" icon={<Plus size={18} />} onClick={startNewUserMenuItem} />
        </section>
      )}

      {activeSettingsSection === "myMenu" && activeMyMenuSection === "method" && (
        <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "myMenu" ? "border-2 border-leaf" : ""}`}>
          <div className="mb-3">
            <h2 className="font-bold">新規マイメニューの登録</h2>
          </div>
          <div className="grid gap-2">
            <button className="food-filter-option" onClick={() => setActiveMyMenuSection("new")}>
              <span>
                <span className="block text-sm font-bold">手動で登録</span>
                <span className="mt-1 block text-xs text-moss">名前、単位、カテゴリ、栄養値を順番に入力します。</span>
              </span>
              <span className="mini-chip shrink-0">手動</span>
            </button>
            <button className="food-filter-option ai-food-action-option ai-food-action-save" onClick={openSettingsAiFoodImport}>
              <span>
                <span className="block text-sm font-bold">AIを使って登録</span>
                <span className="mt-1 block text-xs text-moss">写真や栄養成分表示から、マイメニューだけを保存します。</span>
              </span>
              <span className="mini-chip shrink-0">AI</span>
            </button>
          </div>
        </section>
      )}

      {activeSettingsSection === "myMenu" && activeMyMenuSection === "list" && (
        <section className="compact-card scroll-mt-24 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">登録済みのマイメニュー</h2>
              <p className="mt-1 text-xs font-semibold text-moss">一覧から編集・削除できます。</p>
            </div>
            <button className="primary-button shrink-0 px-3 py-2 text-xs" onClick={startNewUserMenuItem}><Plus size={15} />新規</button>
          </div>
          <div className="settings-record-list">
            {userMenuItems.map((item) => (
              <div className="settings-record-row" key={item.id}>
                <div className="settings-record-content">
                  <p className="settings-record-title">{formatMenuItemName(item)}</p>
                  <p className="settings-record-meta">{item.brand || item.category} · {item.serving_label ? `${item.serving_label} · ` : ""}{item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button className="icon-button settings-record-action" aria-label={`${formatMenuItemName(item)}を編集`} onClick={() => editUserMenuItem(item)}><Pencil size={14} /></button>
                  <button className="icon-button settings-record-action settings-record-action-danger" aria-label={`${formatMenuItemName(item)}を削除`} onClick={() => deleteUserMenuItem(item)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
            {userMenuItems.length === 0 && <EmptyLine text="登録済みのマイメニューはありません" />}
          </div>
        </section>
      )}

      {activeSettingsSection === "myMenu" && (activeMyMenuSection === "new" || activeMyMenuSection === "edit") && (
        <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "myMenu" ? "border-2 border-leaf" : ""}`}>
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">{activeMyMenuSection === "edit" ? "マイメニューを編集" : "新規マイメニューの登録"}</h2>
            </div>
          </div>
          <ManualFoodForm
            manual={presetDraft}
            setManual={setPresetDraft}
            compact
            mode="preset"
            variant="wizard"
            wizardStep={myMenuWizardStep}
            setWizardStep={setMyMenuWizardStep}
            submitLabel={activeMyMenuSection === "edit" ? "更新" : "保存"}
            onSave={saveUserMenuItem}
          />
          {activeMyMenuSection === "edit" && (
            <button className="secondary-button mt-2 w-full" onClick={() => {
              setEditingUserMenuItemId(undefined);
              setPresetDraft({ ...emptyManual, savePreset: true });
              setActiveMyMenuSection("list");
              setMyMenuWizardStep("basic");
            }}>
              編集をキャンセル
            </button>
          )}
        </section>
      )}

      {activeSettingsSection === "myTraining" && !activeMyTrainingSection && (
        <section className="compact-card divide-y divide-line overflow-hidden scroll-mt-24">
          <SettingsMenuRow title="登録済みのマイトレ" description={`一覧の表示、編集、削除 · ${myTrainingExercises.length}件`} icon={<Dumbbell size={18} />} onClick={() => setActiveMyTrainingSection("list")} />
          <SettingsMenuRow title="新規マイトレの登録" description="既存種目のカスタマイズまたは新規登録" icon={<Plus size={18} />} onClick={startNewSettingsMyTraining} />
        </section>
      )}

      {activeSettingsSection === "myTraining" && activeMyTrainingSection === "list" && (
        <section className="compact-card scroll-mt-24 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">登録済みのマイトレ</h2>
              <p className="mt-1 text-xs font-semibold text-moss">一覧から上書き編集・削除できます。</p>
            </div>
            <button className="primary-button shrink-0 px-3 py-2 text-xs" onClick={startNewSettingsMyTraining}><Plus size={15} />新規</button>
          </div>
          <div className="settings-record-list">
            {myTrainingExercises.map((exercise) => {
              const pictogram = getWorkoutPictogram(exercise.body_part, exercise.equipment_type);
              return (
                <div className="settings-record-row" key={exercise.id}>
                  <Pictogram {...pictogram} />
                  <div className="settings-record-content">
                    <p className="settings-record-title">{exercise.name}</p>
                    <p className="settings-record-meta">{exercise.body_part} · {exercise.equipment_type}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button className="icon-button settings-record-action" aria-label={`${exercise.name}を編集`} onClick={() => editSettingsMyTraining(exercise)}><Pencil size={14} /></button>
                    <button className="icon-button settings-record-action settings-record-action-danger" aria-label={`${exercise.name}を削除`} onClick={() => deleteSettingsMyTraining(exercise)}><Trash2 size={14} /></button>
                  </div>
                </div>
              );
            })}
            {myTrainingExercises.length === 0 && <EmptyLine text="登録済みのマイトレはありません" />}
          </div>
        </section>
      )}

      {activeSettingsSection === "ai" && aiReportSection}

      {activeSettingsSection === "backup" && !activeExportSection && (
        <section className={`compact-card divide-y divide-line overflow-hidden scroll-mt-24 ${props.focus === "backup" ? "border-2 border-leaf" : ""}`}>
          <SettingsMenuRow title="バックアップJSON" description={backupMessage(props.backupInfo)} icon={<Archive size={18} />} onClick={() => setActiveExportSection("backup")} />
          <SettingsMenuRow title="タイプ別ログ出力" description="食事・ワークアウトを期間指定して出力" icon={<FileDown size={18} />} onClick={() => {
            resetLogExportWizard();
            setActiveExportSection("logs");
          }} />
        </section>
      )}

      {activeSettingsSection === "backup" && activeExportSection === "backup" && <section className={`compact-card scroll-mt-24 p-4 ${props.focus === "backup" ? "border-2 border-leaf" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold">バックアップJSON</h2>
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
      </section>}

      {activeSettingsSection === "backup" && activeExportSection === "logs" && (
        <section className="compact-card scroll-mt-24 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold">タイプ別ログ出力</h2>
              <p className="mt-1 text-xs font-semibold text-moss">食事ログ・ワークアウトログを期間指定して出力します。</p>
            </div>
            <span className="numeric-text shrink-0 rounded-md bg-rice px-2 py-1 text-[11px] font-bold text-moss">
              {logExportStep === "type" ? "1/4" : logExportStep === "grouping" ? "2/4" : logExportStep === "period" ? "3/4" : "4/4"}
            </span>
          </div>
          <div className="manual-wizard-progress mt-4" aria-hidden="true">
            {(["type", "grouping", "period", "output"] as LogExportStep[]).map((step) => (
              <span className={(["type", "grouping", "period", "output"] as LogExportStep[]).indexOf(step) <= (["type", "grouping", "period", "output"] as LogExportStep[]).indexOf(logExportStep) ? "food-add-progress-dot food-add-progress-dot-active" : "food-add-progress-dot"} key={step} />
            ))}
          </div>

          {logExportStep === "type" && (
            <div className="mt-4 grid gap-2">
              {([
                ["food", "食事ログのみ", "食事名、PFC、kcal、食事タイミングを出力"],
                ["workout", "ワークアウトログのみ", "セッション、種目、セット内容を出力"],
                ["food_workout", "食事とワークアウトログ", "同じ期間の食事と運動をまとめて出力"],
              ] as Array<[LogExportType, string, string]>).map(([value, title, description]) => (
                <button className={`food-filter-option ${logExportType === value ? "food-filter-option-active" : ""}`} key={value} onClick={() => setLogExportType(value)}>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-1 block text-xs text-moss">{description}</span>
                  </span>
                  <span className="mini-chip shrink-0">{logExportType === value ? "選択中" : "選択"}</span>
                </button>
              ))}
              <button className="primary-button mt-2 w-full" onClick={() => setLogExportStep("grouping")}>次へ<ChevronRight size={17} /></button>
            </div>
          )}

          {logExportStep === "grouping" && (
            <div className="mt-4 grid gap-2">
              {([
                ["day", "日別", "1日ごとにログをまとめます"],
                ["week", "週別", "週単位でログをまとめます"],
                ["month", "月別", "月単位でログをまとめます"],
              ] as Array<[HistoryGrouping, string, string]>).map(([value, title, description]) => (
                <button className={`food-filter-option ${logExportGrouping === value ? "food-filter-option-active" : ""}`} key={value} onClick={() => setLogExportGrouping(value)}>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-1 block text-xs text-moss">{description}</span>
                  </span>
                  <span className="mini-chip shrink-0">{logExportGrouping === value ? "選択中" : "選択"}</span>
                </button>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="secondary-button" onClick={() => setLogExportStep("type")}><ChevronLeft size={17} />戻る</button>
                <button className="primary-button" onClick={() => setLogExportStep("period")}>次へ<ChevronRight size={17} /></button>
              </div>
            </div>
          )}

          {logExportStep === "period" && (
            <div className="mt-4 grid gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`food-filter-option items-start text-left ${logExportDateTarget === "start" ? "food-filter-option-active" : ""}`}
                  type="button"
                  onClick={() => setLogExportDateTarget("start")}
                >
                  <span>
                    <span className="block text-xs font-bold text-moss">{historyGroupingLabel(logExportGrouping)}の開始</span>
                    <span className="mt-1 block text-sm font-black text-ink">{formatJapaneseDate(logExportStartDate)}</span>
                  </span>
                  <span className="mini-chip shrink-0">{logExportDateTarget === "start" ? "選択中" : "開始"}</span>
                </button>
                <button
                  className={`food-filter-option items-start text-left ${logExportDateTarget === "end" ? "food-filter-option-active" : ""}`}
                  type="button"
                  onClick={() => setLogExportDateTarget("end")}
                >
                  <span>
                    <span className="block text-xs font-bold text-moss">{historyGroupingLabel(logExportGrouping)}の終了</span>
                    <span className="mt-1 block text-sm font-black text-ink">{formatJapaneseDate(logExportEndDate)}</span>
                  </span>
                  <span className="mini-chip shrink-0">{logExportDateTarget === "end" ? "選択中" : "終了"}</span>
                </button>
              </div>
              <div className="rounded-[1.5rem] border border-line bg-rice/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="前の月"
                    onClick={() => setLogExportCalendarMonth((month) => shiftMonthKey(month, -1))}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex min-w-0 items-center gap-2 text-sm font-black text-ink">
                    <CalendarDays size={17} />
                    <span>{formatMonthLabel(logExportCalendarMonth)}</span>
                  </div>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="次の月"
                    onClick={() => setLogExportCalendarMonth((month) => shiftMonthKey(month, 1))}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <button
                  className="mx-auto mt-2 block text-xs font-bold text-leaf underline decoration-leaf/40 underline-offset-4"
                  type="button"
                  onClick={() => setLogExportCalendarMonth(monthKey(props.appDate))}
                >
                  今月へ
                </button>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-moss">
                  {["日", "月", "火", "水", "木", "金", "土"].map((day) => <span key={day}>{day}</span>)}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {logExportCalendarCells.map((cell, index) => {
                    if (!cell.date) return <span key={`empty-${index}`} className="aspect-square" />;
                    const pickedDate = cell.date;
                    const isStart = pickedDate === logExportStartDate;
                    const isEnd = pickedDate === logExportEndDate;
                    const isInRange = pickedDate >= normalizedLogExportPeriod.start && pickedDate <= normalizedLogExportPeriod.end;
                    const isToday = pickedDate === props.appDate;
                    return (
                      <button
                        key={pickedDate}
                        className={[
                          "relative flex aspect-square items-center justify-center rounded-2xl border text-sm font-black transition",
                          isStart || isEnd
                            ? "border-leaf bg-leaf text-white shadow-soft"
                            : isInRange
                              ? "border-leaf/30 bg-leaf/10 text-ink"
                              : "border-transparent bg-transparent text-ink hover:border-line hover:bg-white/70",
                        ].join(" ")}
                        type="button"
                        onClick={() => {
                          if (logExportDateTarget === "start") {
                            setLogExportStartDate(pickedDate);
                            setLogExportDateTarget("end");
                          } else {
                            setLogExportEndDate(pickedDate);
                            setLogExportDateTarget("start");
                          }
                          setLogExportResult(undefined);
                          setCopiedLogExport(false);
                        }}
                      >
                        {cell.day}
                        {isToday && !(isStart || isEnd) && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-leaf" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs font-semibold text-moss">
                出力期間: {formatJapaneseDate(normalizedLogExportPeriod.start)}〜{formatJapaneseDate(normalizedLogExportPeriod.end)}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button className="secondary-button" onClick={() => setLogExportStep("grouping")}><ChevronLeft size={17} />戻る</button>
                <button className="primary-button" disabled={!logExportStartDate || !logExportEndDate} onClick={generateLogExport}><FileText size={17} />出力</button>
              </div>
            </div>
          )}

          {logExportStep === "output" && logExportResult && (
            <div className="mt-4">
              <p className="rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs font-semibold text-moss">{logExportResult.summary}</p>
              <textarea className="mt-3 min-h-64 w-full font-mono text-xs" value={logExportResult.text} readOnly />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button className="primary-button" onClick={async () => {
                  await copyText(logExportResult.text);
                  setCopiedLogExport(true);
                }}><Copy size={17} />{copiedLogExport ? "コピー済み" : "テキストコピー"}</button>
                <button className="secondary-button" onClick={() => downloadText(`${logExportResult.basename}.csv`, logExportResult.csv, "text/csv;charset=utf-8")}><FileDown size={17} />CSV保存</button>
                <button className="secondary-button" onClick={() => downloadText(`${logExportResult.basename}.md`, logExportResult.markdown, "text/markdown")}><FileDown size={17} />MD保存</button>
                <button className="secondary-button" onClick={() => setLogExportStep("period")}><ChevronLeft size={17} />期間に戻る</button>
              </div>
            </div>
          )}
        </section>
      )}

      {activeSettingsSection === "records" && <section className="compact-card p-4 text-sm text-moss">
        <div className="special-mode-settings mt-3">
          <div className="min-w-0 flex-1">
            <p className="font-bold text-ink">旅行モード</p>
            <p className="numeric-text mt-1 text-[11px] font-bold text-moss">
              {isTravelModeEnabled ? `${activeTravelMode?.label ?? "旅行"} / ${travelModePeriodLabel}` : "旅行先一覧から追加・編集"}
            </p>
          </div>
          <button className="secondary-button shrink-0 px-3 py-2 text-xs" onClick={openTravelModeModal}>編集</button>
          <button
            className={`special-mode-toggle ${isTravelModeEnabled ? "special-mode-toggle-on" : ""}`}
            type="button"
            aria-pressed={isTravelModeEnabled}
            onClick={toggleTravelMode}
          >
            <span className="special-mode-toggle-track">
              <span className="special-mode-toggle-knob" />
            </span>
            <span className="special-mode-toggle-copy">
              <span className="special-mode-toggle-state">{isTravelModeEnabled ? "ON" : "OFF"}</span>
            </span>
          </button>
        </div>
        <div className="special-mode-settings mt-3">
          <div className="min-w-0 flex-1">
            <p className="font-bold text-ink">一時停止モード</p>
            <p className="numeric-text mt-1 text-[11px] font-bold text-moss">
              {isPauseModeEnabled ? `${activePauseMode?.label ?? "一時停止"} / ${pauseModePeriodLabel}` : "休養・中断期間をAIレポートで例外扱い"}
            </p>
          </div>
          <button className="secondary-button shrink-0 px-3 py-2 text-xs" onClick={() => setIsPauseModeOpen(true)}>設定</button>
          <button
            className={`special-mode-toggle ${isPauseModeEnabled ? "special-mode-toggle-on" : ""}`}
            type="button"
            aria-pressed={isPauseModeEnabled}
            onClick={togglePauseMode}
          >
            <span className="special-mode-toggle-track">
              <span className="special-mode-toggle-knob" />
            </span>
            <span className="special-mode-toggle-copy">
              <span className="special-mode-toggle-state">{isPauseModeEnabled ? "ON" : "OFF"}</span>
            </span>
          </button>
        </div>
      </section>}

      {activeSettingsSection === "general" && <section className="compact-card p-4 text-sm text-moss">
        <p className="font-semibold text-ink">100% トラッカー</p>
        <p className="mt-2">記録はこの端末に保存されます。端末の故障や機種変更に備えて、定期的にエクスポートしてください。</p>
        <p className="mt-2 text-xs">レポート名: <span className="font-bold text-ink">{props.profile?.name || "未設定"}</span></p>
        <div className="mt-3 grid gap-2">
          <button className="secondary-button w-full" onClick={() => {
            setProfileNameDraft(props.profile?.name ?? "");
            setIsProfileNameOpen(true);
          }}><Pencil size={17} />ユーザー名変更</button>
          <button className="secondary-button w-full" onClick={props.openUpdateNotes}><FileText size={17} />更新内容</button>
          <button className="secondary-button w-full" onClick={handleDeveloperModeTap}>
            <Settings size={17} />{props.isDeveloperTestMode ? "開発者モードメニュー" : "開発者モード"}
            {props.isDeveloperTestMode && <span className="mini-chip ml-auto">テスト中</span>}
          </button>
        </div>
      </section>}
      {isDeveloperMenuOpen && props.isDeveloperTestMode && (
        <div className="fixed inset-0 z-[68] flex items-end bg-ink/35 px-4 pb-4" onClick={() => setIsDeveloperMenuOpen(false)}>
          <div className="developer-menu compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-black text-ink">開発者モード</p>
                <p className="mt-1 text-xs font-bold text-moss">表示確認と実績テスト用のメニューです。</p>
              </div>
              <button className="icon-button h-10 w-10" aria-label="閉じる" onClick={() => setIsDeveloperMenuOpen(false)}>×</button>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="developer-control-row">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-ink">トロフィーアニメーションを強制再生</p>
                  <p className="mt-1 text-xs font-semibold text-moss">既に獲得済みの実績でも演出を確認できます。</p>
                </div>
                <button
                  className={`special-mode-toggle ${developerForceTrophyAnimation ? "special-mode-toggle-on" : ""}`}
                  type="button"
                  aria-pressed={developerForceTrophyAnimation}
                  onClick={() => void saveSettingsPatch({ developer_force_trophy_animation: !developerForceTrophyAnimation })}
                >
                  <span className="special-mode-toggle-track"><span className="special-mode-toggle-knob" /></span>
                  <span className="special-mode-toggle-copy"><span className="special-mode-toggle-state">{developerForceTrophyAnimation ? "ON" : "OFF"}</span></span>
                </button>
              </div>
              <div className="developer-control-row developer-control-column">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-ink">プログレスバーを進める</p>
                    <p className="mt-1 text-xs font-semibold text-moss">スライダーでHomeの進み具合を確認できます。</p>
                  </div>
                  <span className="numeric-text rounded-full bg-leaf/15 px-3 py-1 text-sm font-black text-leaf">{developerProgressPercent}%</span>
                </div>
                <input
                  className="developer-range mt-3 w-full"
                  type="range"
                  min={0}
                  max={110}
                  step={1}
                  value={developerProgressPercent}
                  onChange={(event) => void saveSettingsPatch({ developer_progress_percent: Number(event.currentTarget.value) })}
                />
              </div>
              <div className="developer-control-row">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-ink">北海道モード</p>
                  <p className="mt-1 text-xs font-semibold text-moss">今日だけ北海道旅行モードとして表示します。</p>
                </div>
                <button
                  className={`special-mode-toggle ${isDeveloperHokkaidoModeEnabled ? "special-mode-toggle-on" : ""}`}
                  type="button"
                  aria-pressed={isDeveloperHokkaidoModeEnabled}
                  onClick={() => void toggleDeveloperHokkaidoMode()}
                >
                  <span className="special-mode-toggle-track"><span className="special-mode-toggle-knob" /></span>
                  <span className="special-mode-toggle-copy"><span className="special-mode-toggle-state">{isDeveloperHokkaidoModeEnabled ? "ON" : "OFF"}</span></span>
                </button>
              </div>
              <div className="developer-control-row">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-ink">テストモードオーバーレイ</p>
                  <p className="mt-1 text-xs font-semibold text-moss">画面右下に黄色のテスト表示を出します。</p>
                </div>
                <button
                  className={`special-mode-toggle ${developerTestOverlayEnabled ? "special-mode-toggle-on" : ""}`}
                  type="button"
                  aria-pressed={developerTestOverlayEnabled}
                  onClick={() => void saveSettingsPatch({ developer_test_overlay_enabled: !developerTestOverlayEnabled })}
                >
                  <span className="special-mode-toggle-track"><span className="special-mode-toggle-knob" /></span>
                  <span className="special-mode-toggle-copy"><span className="special-mode-toggle-state">{developerTestOverlayEnabled ? "ON" : "OFF"}</span></span>
                </button>
              </div>
              <button className="secondary-button w-full" onClick={() => void props.unlockAllAchievements()}>
                <Trophy size={17} />トロフィー全アンロック
              </button>
              <button className="danger-soft-button w-full" onClick={() => void saveDeveloperTestMode(false)}>
                <Settings size={17} />開発者モードを終了
              </button>
            </div>
          </div>
        </div>
      )}
      {isMacroOverrideOpen && (
        <MacroOverrideModal
          draft={goalDraft}
          setDraft={setGoalDraft}
          calculated={calculated}
          onClose={() => setIsMacroOverrideOpen(false)}
        />
      )}
      {isProfileNameOpen && (
        <ProfileNameModal
          value={profileNameDraft}
          setValue={setProfileNameDraft}
          onClose={() => setIsProfileNameOpen(false)}
          onSave={async () => {
            const name = profileNameDraft.trim();
            if (!props.profile || !name) return;
            await db.profile.update(props.profile.id, { name, updated_at: nowIso() });
            await props.refresh();
            setIsProfileNameOpen(false);
            props.showToast("ユーザー名を保存しました");
          }}
        />
      )}
      {isTravelModeOpen && (
        <TravelModeModal
          modes={props.specialModeSettings}
          step={travelModalStep}
          selectedId={selectedTravelModeId}
          nameDraft={travelNameDraft}
          startDraft={travelStartDraft}
          endDraft={travelEndDraft}
          onSelect={(mode) => {
            setSelectedTravelModeId(mode.id);
            setTravelStartDraft(mode.start_date ?? props.appDate);
            setTravelEndDraft(mode.end_date ?? addDays(props.appDate, 2));
          }}
          onNameChange={setTravelNameDraft}
          onAdd={addTravelDestination}
          onDelete={deleteTravelDestination}
          onStepChange={setTravelModalStep}
          onStartChange={setTravelStartDraft}
          onEndChange={setTravelEndDraft}
          onSave={saveTravelModePeriod}
          onClose={() => setIsTravelModeOpen(false)}
        />
      )}
      {isPauseModeOpen && (
        <PauseModeModal
          labelDraft={pauseLabelDraft}
          startDraft={pauseStartDraft}
          endDraft={pauseEndDraft}
          isEnabled={isPauseModeEnabled}
          onLabelChange={setPauseLabelDraft}
          onStartChange={setPauseStartDraft}
          onEndChange={setPauseEndDraft}
          onDisable={async () => {
            await disablePauseMode();
            setIsPauseModeOpen(false);
          }}
          onSave={async () => {
            if (!pauseStartDraft || !pauseEndDraft) {
              props.showToast("一時停止期間を入力してください");
              return;
            }
            await savePauseMode();
            setIsPauseModeOpen(false);
          }}
          onClose={() => setIsPauseModeOpen(false)}
        />
      )}
      {settingsAiFoodImportOpen && (
        <AiFoodImportModal
          intent="menu"
          step={settingsAiFoodImportStep}
          setStep={setSettingsAiFoodImportStep}
          text={settingsAiFoodImportText}
          setText={setSettingsAiFoodImportText}
          items={settingsAiFoodImportItems}
          menuItems={props.menuItems}
          candidates={settingsAiFoodMatchCandidates}
          selections={settingsAiFoodImportSelections}
          setSelections={setSettingsAiFoodImportSelections}
          mealType={settingsAiFoodMealType}
          setMealType={setSettingsAiFoodMealType}
          error={settingsAiFoodImportError}
          copiedPrompt={settingsCopiedAiFoodPrompt}
          onCopyPrompt={async () => {
            await copyText(aiFoodImportPrompt);
            setSettingsCopiedAiFoodPrompt(true);
          }}
          onParse={parseSettingsAiFoodImport}
          onSave={saveSettingsAiFoodImport}
          onReset={resetSettingsAiFoodImport}
          onClose={closeSettingsAiFoodImport}
        />
      )}
      {settingsMyTrainingModalOpen && (
        <MyTrainingModal
          exercisePresets={props.exercisePresets}
          initialDraft={settingsMyTrainingInitialDraft}
          weightPresetStore={settingsWorkoutWeightPresetStore}
          onClose={closeSettingsMyTrainingModal}
          onSave={saveSettingsMyTrainingDraft}
        />
      )}
      {goalHelpTopic && <GoalHelpModal topic={goalHelpTopic} onClose={() => setGoalHelpTopic(undefined)} />}
    </div>
  );
}

function Onboarding({ refresh }: { refresh: () => Promise<void> }) {
  const [step, setStep] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
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
    target_body_fat_percentage: "",
    target_date: addDays(todayAppDate(), 90),
    target_calories: 0,
    target_protein_g: 0,
    target_fat_g: 0,
    target_carbs_g: 0,
    workouts: 3,
    cardio: 1,
  });
  const [restoreMessage, setRestoreMessage] = useState("");
  const currentYear = new Date().getFullYear();
  const age = currentYear - draft.birth_year;
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
    target_body_fat_percentage: draft.target_body_fat_percentage === "" ? undefined : Number(draft.target_body_fat_percentage),
    target_date: draft.target_date,
    manual_target_calories: draft.target_calories || undefined,
    manual_protein_g: draft.target_protein_g || undefined,
    manual_fat_g: draft.target_fat_g || undefined,
    manual_carbs_g: draft.target_carbs_g || undefined,
  });
  const phaseDescriptions: Record<Phase, string> = {
    weight_loss: "体重をしっかり落としたい時。カロリーはやや強めに抑えます。",
    slow_cut: "無理なく少しずつ落としたい時。続けやすい赤字幅にします。",
    maintenance: "今の体重を大きく変えず、食事と運動を安定させます。",
    recomposition: "体重より見た目重視。脂肪を抑えつつ筋肉を残す配分にします。",
    lean_bulk: "脂肪を増やしすぎず、筋肉を増やすために少しだけ多めに食べます。",
    strength_focus: "筋力とトレーニング出力を優先し、エネルギーを少し厚めにします。",
    custom: "自分でkcal/PFCを決めたい時。あとからSettingsで細かく直せます。",
  };
  const activityDescriptions: Record<ActivityLevel, string> = {
    low: "在宅や座り仕事が中心で、運動日以外はあまり歩かない。",
    moderate: "日常でそこそこ歩く、または週2〜4回くらい運動する。",
    high: "立ち仕事・よく歩く生活、または週4〜6回しっかり運動する。",
    very_high: "肉体労働や競技練習など、毎日の消費がかなり多い。",
  };
  const sexOptions: Array<{ value: Profile["sex"]; label: string; description: string }> = [
    { value: "unspecified", label: "未指定", description: "迷う場合は未指定でOK。あとから変えられます。" },
    { value: "male", label: "男性", description: "基礎代謝の自動計算に反映します。" },
    { value: "female", label: "女性", description: "基礎代謝の自動計算に反映します。" },
  ];
  const steps = [
    { title: "まずは復元", subtitle: "以前のバックアップがなければ、そのまま次へ進めます。" },
    { title: "呼び名", subtitle: "アプリ内で表示する名前です。あとから変更できます。" },
    { title: "身長", subtitle: "基礎代謝の自動計算に使います。" },
    { title: "今の体重", subtitle: "今日のスタート地点です。記録しながら後で更新できます。" },
    { title: "体脂肪率", subtitle: "わからなければ空欄でOK。空欄でも目標は計算できます。" },
    { title: "生まれ年", subtitle: "年齢による消費量の違いをざっくり反映します。" },
    { title: "性別", subtitle: "基礎代謝の推定に使います。未指定でも開始できます。" },
    { title: "目標", subtitle: "体重や筋肉の方向性を選びます。" },
    { title: "運動量", subtitle: "日常活動も含めた消費量の補正です。迷ったら普通がおすすめ。" },
    { title: "目標体重", subtitle: "PFCの基準にする体重です。維持でも今の体重でOK。" },
    { title: "目標体脂肪率", subtitle: "リコンプやバルクで、体重だけでは見えない変化をAI相談に渡せます。未定なら空欄でOK。" },
    { title: "目標達成日", subtitle: "体重差と期間から、減量・増量に必要なカロリー補正を計算します。" },
    { title: "筋トレ頻度", subtitle: "Homeの今週の運動カードに使います。" },
    { title: "有酸素頻度", subtitle: "歩く・バイク・ランなどの週目標です。" },
    { title: "確認", subtitle: "自動計算した目標で始めます。細かい上書きは後からでもOKです。" },
  ];
  const lastStep = steps.length - 1;
  const goNext = () => setStep((current) => Math.min(lastStep, current + 1));
  const goBack = () => setStep((current) => Math.max(0, current - 1));
  const finish = async () => {
    const timestamp = nowIso();
    await db.profile.put(profile);
    const goal = buildGoal({
      profile,
      phase: draft.phase,
      activity_level: draft.activity_level,
      age,
      target_weight_kg: draft.target_weight_kg,
      target_body_fat_percentage: draft.target_body_fat_percentage === "" ? undefined : Number(draft.target_body_fat_percentage),
      target_date: draft.target_date,
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
  };
  const renderStep = () => {
    if (step === 0) {
      return (
        <section className="onboarding-panel">
          <p className="text-sm font-bold text-ink">前に使っていたデータがある場合</p>
          <p className="mt-2 text-sm leading-relaxed text-moss">アップデート後や別のiPhoneでこの画面が出たら、設定で保存したバックアップJSONを読み込むと復元できます。読み込みは追加ではなく置き換えです。</p>
          <label className="secondary-button mt-4 w-full cursor-pointer">
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
          {restoreMessage && <p className="mt-3 rounded-2xl bg-clay/10 px-3 py-2 text-xs font-semibold text-clay">{restoreMessage}</p>}
        </section>
      );
    }
    if (step === 1) {
      return (
        <label className="onboarding-field">
          <span>名前</span>
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="例: Nick" />
        </label>
      );
    }
    if (step === 2) return <NumberInput label="身長 cm" value={draft.height_cm} onChange={(value) => setDraft({ ...draft, height_cm: value })} />;
    if (step === 3) return <NumberInput label="体重 kg" value={draft.current_weight_kg} step={0.1} onChange={(value) => setDraft({ ...draft, current_weight_kg: value, target_weight_kg: draft.target_weight_kg || value })} />;
    if (step === 4) return <PartialNumberInput label="体脂肪 %" value={draft.body_fat_percentage} step={0.1} onChange={(value) => setDraft({ ...draft, body_fat_percentage: value })} />;
    if (step === 5) return <NumberInput label="生まれ年" value={draft.birth_year} onChange={(value) => setDraft({ ...draft, birth_year: Math.round(value) })} />;
    if (step === 6) {
      return (
        <div className="grid gap-2">
          {sexOptions.map((option) => (
            <button
              key={option.value}
              className={`onboarding-choice ${draft.sex === option.value ? "onboarding-choice-active" : ""}`}
              onClick={() => setDraft({ ...draft, sex: option.value })}
            >
              <span>{option.label}</span>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
      );
    }
    if (step === 7) {
      return (
        <div className="grid gap-2">
          {(Object.keys(phaseLabels) as Phase[]).map((key) => (
            <button
              key={key}
              className={`onboarding-choice ${draft.phase === key ? "onboarding-choice-active" : ""}`}
              onClick={() => setDraft({ ...draft, phase: key })}
            >
              <span>{phaseLabels[key]}</span>
              <small>{phaseDescriptions[key]}</small>
            </button>
          ))}
        </div>
      );
    }
    if (step === 8) {
      return (
        <div className="grid gap-2">
          {(Object.keys(activityLabels) as ActivityLevel[]).map((key) => (
            <button
              key={key}
              className={`onboarding-choice ${draft.activity_level === key ? "onboarding-choice-active" : ""}`}
              onClick={() => setDraft({ ...draft, activity_level: key })}
            >
              <span>{activityLabels[key]}</span>
              <small>{activityDescriptions[key]}</small>
            </button>
          ))}
        </div>
      );
    }
    if (step === 9) return <NumberInput label="目標体重 kg" value={draft.target_weight_kg} step={0.1} onChange={(value) => setDraft({ ...draft, target_weight_kg: value })} />;
    if (step === 10) return <PartialNumberInput label="目標体脂肪 %" value={draft.target_body_fat_percentage} step={0.1} onChange={(value) => setDraft({ ...draft, target_body_fat_percentage: value })} />;
    if (step === 11) {
      return (
        <label className="onboarding-field">
          <span>目標達成日</span>
          <input type="date" min={addDays(todayAppDate(), 1)} value={draft.target_date} onChange={(event) => setDraft({ ...draft, target_date: event.target.value })} />
        </label>
      );
    }
    if (step === 12) return <NumberInput label="筋トレ / 週" value={draft.workouts} onChange={(value) => setDraft({ ...draft, workouts: Math.max(0, Math.round(value)) })} />;
    if (step === 13) return <NumberInput label="有酸素 / 週" value={draft.cardio} onChange={(value) => setDraft({ ...draft, cardio: Math.max(0, Math.round(value)) })} />;
    return (
      <div className="grid gap-3">
        <div className="onboarding-target-card">
          <p className="text-xs font-bold text-moss">自動計算された目標</p>
          <p className="numeric-text mt-2 text-3xl font-black">{calculated.target_calories} kcal</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><span>P</span><strong>{calculated.target_protein_g}g</strong></div>
            <div><span>F</span><strong>{calculated.target_fat_g}g</strong></div>
            <div><span>C</span><strong>{calculated.target_carbs_g}g</strong></div>
          </div>
          {typeof calculated.target_fat_mass_kg === "number" && typeof calculated.target_lean_mass_kg === "number" && (
            <p className="numeric-text mt-3 rounded-2xl bg-white/45 px-3 py-2 text-xs font-bold text-moss">
              体組成目標: 脂肪 {calculated.target_fat_mass_kg}kg / 除脂肪 {calculated.target_lean_mass_kg}kg
            </p>
          )}
          <p className="mt-3 text-xs leading-relaxed text-moss">入力した体重・年齢・目標・運動量から計算しています。あとからゴール設定で調整できます。</p>
        </div>
        <button className="secondary-button w-full" onClick={() => setShowAdvanced((current) => !current)}>
          {showAdvanced ? "詳細上書きを閉じる" : "kcal/PFCを手で上書きする"}
        </button>
        {showAdvanced && (
          <div className="grid grid-cols-2 gap-2">
            <NumberInput label="kcal (0=自動)" value={draft.target_calories} onChange={(value) => setDraft({ ...draft, target_calories: Math.max(0, Math.round(value)) })} />
            <NumberInput label="P g (0=自動)" value={draft.target_protein_g} onChange={(value) => setDraft({ ...draft, target_protein_g: Math.max(0, Math.round(value)) })} />
            <NumberInput label="F g (0=自動)" value={draft.target_fat_g} onChange={(value) => setDraft({ ...draft, target_fat_g: Math.max(0, Math.round(value)) })} />
            <NumberInput label="C g (0=自動)" value={draft.target_carbs_g} onChange={(value) => setDraft({ ...draft, target_carbs_g: Math.max(0, Math.round(value)) })} />
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="onboarding-shell mx-auto min-h-screen max-w-[430px] px-4 py-8 text-ink">
      <div className="onboarding-card compact-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-moss">100% Tracker</p>
            <h1 className="mt-2 text-2xl font-black tracking-normal">初回設定</h1>
          </div>
          <span className="numeric-text mini-chip">{step + 1}/{steps.length}</span>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink/5">
          <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <section className="onboarding-hero mt-5">
          <p className="text-xs font-bold text-moss">STEP {step + 1}</p>
          <h2 className="mt-2 text-2xl font-black leading-tight">{steps[step].title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-moss">{steps[step].subtitle}</p>
        </section>
        <div className="mt-5 min-h-[16rem]">
          {renderStep()}
        </div>
        <p className="mt-4 rounded-3xl bg-surface p-3 text-xs leading-relaxed text-moss">設定の「エクスポート」から、定期的にバックアップを保存しておくと安心です。</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="secondary-button" disabled={step === 0} onClick={goBack}><ChevronLeft size={17} />戻る</button>
          {step === lastStep ? (
            <button className="primary-button" onClick={finish}><Check size={17} />開始</button>
          ) : (
            <button className="primary-button" onClick={goNext}>次へ<ChevronRight size={17} /></button>
          )}
        </div>
      </div>
    </main>
  );
}

function ManualFoodForm({ manual, setManual, onSave, compact = false, mode = "log", variant = "form", wizardStep = "basic", setWizardStep, submitLabel = "保存", secondarySubmitLabel, onSecondarySave, includePurposeStep = false }: {
  manual: ManualFoodDraft;
  setManual: (manual: ManualFoodDraft) => void;
  onSave: () => void;
  compact?: boolean;
  mode?: "log" | "preset";
  variant?: "form" | "wizard";
  wizardStep?: ManualFoodWizardStep;
  setWizardStep?: (step: ManualFoodWizardStep) => void;
  submitLabel?: string;
  secondarySubmitLabel?: string;
  onSecondarySave?: () => void;
  includePurposeStep?: boolean;
}) {
  const subcategories = genericCategories[manual.category] ?? [];
  const isPresetOnly = mode === "preset";
  const isIngredient = manual.entry_kind === "ingredient";
  const previewNutrition = draftNutrition(manual);
  const wizardSteps = includePurposeStep ? (manual.savePreset ? manualFoodWizardSteps : oneTimeManualFoodWizardSteps) : settingsManualFoodWizardSteps;
  const activeWizardStep = wizardSteps.some((step) => step.key === wizardStep)
    ? wizardStep
    : wizardSteps.some((step) => step.key === "nutrition")
      ? "nutrition"
      : wizardSteps[0]?.key ?? "basic";
  const wizardIndex = Math.max(0, wizardSteps.findIndex((step) => step.key === activeWizardStep));
  const canAdvanceWizard = activeWizardStep !== "basic" || !!manual.name.trim();
  const switchManualKind = (entryKind: ManualFoodDraft["entry_kind"]) => {
    if (entryKind === "ingredient") {
      setManual({
        ...manual,
        entry_kind: "ingredient",
        category: manual.category === "自炊" ? "肉・魚" : manual.category,
        subcategory: manual.category === "自炊" ? "鶏" : manual.subcategory,
        ingredient_grams: manual.ingredient_grams || "100",
      });
      return;
    }
    setManual({ ...manual, entry_kind: "meal" });
  };
  const moveWizard = (direction: 1 | -1) => {
    if (!setWizardStep) return;
    const next = wizardSteps[wizardIndex + direction]?.key;
    if (next) setWizardStep(next);
  };
  if (variant === "wizard") {
    return (
      <section className={compact ? "" : "compact-card p-4"}>
        <div className="manual-wizard-progress mt-4" aria-hidden="true">
          {wizardSteps.map((step, index) => (
            <span className={index <= wizardIndex ? "food-add-progress-dot food-add-progress-dot-active" : "food-add-progress-dot"} key={step.key} />
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-moss">{wizardSteps[wizardIndex]?.label}</p>

        {activeWizardStep === "basic" && (
          <div className="mt-3 grid gap-2">
            <label className="text-xs font-bold text-moss">
              メニュー名
              <input className="mt-2 w-full" value={manual.name} onChange={(event) => setManual({ ...manual, name: event.target.value })} placeholder="例: 鶏むね肉と白米" />
            </label>
            <label className="text-xs font-bold text-moss">
              ブランド
              <input className="mt-2 w-full" value={manual.brand} onChange={(event) => setManual({ ...manual, brand: event.target.value })} placeholder="空欄OK" />
            </label>
          </div>
        )}

        {activeWizardStep === "unit" && (
          <div className="mt-3 grid gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button className={`mode-button ${!isIngredient ? "mode-button-active" : ""}`} onClick={() => switchManualKind("meal")}>1食分</button>
              <button className={`mode-button ${isIngredient ? "mode-button-active" : ""}`} onClick={() => switchManualKind("ingredient")}>材料(g)</button>
            </div>
            {isIngredient ? (
              <>
                <PartialNumberInput label="使用量 g" value={manual.ingredient_grams} step={1} onChange={(value) => setManual({ ...manual, ingredient_grams: value })} />
                <p className="rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs font-semibold text-moss">栄養値は100gあたりで入力し、保存時に使用量へ換算します。</p>
              </>
            ) : (
              <p className="rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs font-semibold text-moss">栄養値は1食分として保存します。</p>
            )}
          </div>
        )}

        {activeWizardStep === "purpose" && (
          <div className="mt-3 grid gap-2">
            {!isPresetOnly && (
              <label className="text-xs font-bold text-moss">
                記録タイミング
                <select className="mt-2 w-full" value={manual.meal_type} onChange={(event) => setManual({ ...manual, meal_type: event.target.value as MealType })}>
                  {Object.entries(mealLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
              </label>
            )}
            <button className={`food-filter-option ${manual.savePreset ? "food-filter-option-active" : ""}`} onClick={() => setManual({ ...manual, savePreset: true })}>
              <span>
                <span className="block text-sm font-bold">マイメニューとして登録</span>
                <span className="mt-1 block text-xs text-moss">今日の記録にも追加し、次回からマイメニューで呼び出せます。</span>
              </span>
              <span className="mini-chip shrink-0">{manual.savePreset ? "選択中" : "選択"}</span>
            </button>
            <button className={`food-filter-option ${!manual.savePreset ? "food-filter-option-active" : ""}`} onClick={() => setManual({ ...manual, savePreset: false, favorite: false })}>
              <span>
                <span className="block text-sm font-bold">今回の記録だけに使う</span>
                <span className="mt-1 block text-xs text-moss">マイメニューには保存せず、この食事ログだけ作成します。</span>
              </span>
              <span className="mini-chip shrink-0">{!manual.savePreset ? "選択中" : "選択"}</span>
            </button>
          </div>
        )}

        {activeWizardStep === "category" && (
          <div className="mt-3">
            <p className="mb-2 text-xs font-bold text-moss">追加カテゴリ</p>
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
        )}

        {activeWizardStep === "nutrition" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <PartialNumberInput label={isIngredient ? "kcal / 100g" : "kcal"} value={manual.calories} onChange={(value) => setManual({ ...manual, calories: value })} />
            <PartialNumberInput label={isIngredient ? "P / 100g" : "P"} value={manual.protein_g} step={0.1} onChange={(value) => setManual({ ...manual, protein_g: value })} />
            <PartialNumberInput label={isIngredient ? "F / 100g" : "F"} value={manual.fat_g} step={0.1} onChange={(value) => setManual({ ...manual, fat_g: value })} />
            <PartialNumberInput label={isIngredient ? "C / 100g" : "C"} value={manual.carbs_g} step={0.1} onChange={(value) => setManual({ ...manual, carbs_g: value })} />
            <input value={manual.salt_g} onChange={(event) => setManual({ ...manual, salt_g: event.target.value })} placeholder={isIngredient ? "塩分 / 100g optional" : "塩分 optional"} />
            <input value={manual.note} onChange={(event) => setManual({ ...manual, note: event.target.value })} placeholder="メモ" />
            {isIngredient && (
              <div className="col-span-2 rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs text-moss">
                <p className="font-semibold text-ink">保存される栄養</p>
                <p className="numeric-text mt-1">使用量 {formatControlValue(ingredientGramValue(manual) ?? 0)}g · {previewNutrition.calories}kcal · P{previewNutrition.protein_g} F{previewNutrition.fat_g} C{previewNutrition.carbs_g}</p>
              </div>
            )}
          </div>
        )}

        {activeWizardStep === "confirm" && (
          <div className="mt-3 space-y-3">
            <div className="rounded-3xl border border-line bg-white/30 p-3">
              <p className="truncate text-sm font-black text-ink">{manual.name || "名称未入力"}</p>
              <p className="mt-1 text-xs font-semibold text-moss">{manual.savePreset ? `${manual.brand || "ブランドなし"} · ${manual.category} / ${manual.subcategory || "未分類"}` : manual.brand || "今回の記録だけ"}</p>
              <p className="numeric-text mt-2 text-xs font-bold text-moss">{isIngredient ? `${formatControlValue(ingredientGramValue(manual) ?? 0)}g · ` : ""}{previewNutrition.calories}kcal · P{previewNutrition.protein_g} F{previewNutrition.fat_g} C{previewNutrition.carbs_g}</p>
            </div>
            {manual.savePreset && <label className="chip"><input type="checkbox" checked={manual.favorite} onChange={(event) => setManual({ ...manual, favorite: event.target.checked })} />お気に入りに追加</label>}
            <label className="chip">
              <input
                type="checkbox"
                checked={manual.officialVerified}
                onChange={(event) => setManual({ ...manual, officialVerified: event.target.checked })}
              />
              公式値として登録
            </label>
            <p className="rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs font-semibold text-moss">
              公式サイト・パッケージ等で栄養値を確認できている場合だけONにします。保存後は「公式値・信用度 高」として扱います。
            </p>
            <button className="primary-button w-full" disabled={!manual.name.trim()} onClick={onSave}><Save size={17} />{submitLabel}</button>
            {onSecondarySave && (
              <button className="secondary-button w-full" disabled={!manual.name.trim()} onClick={onSecondarySave}>
                <Plus size={17} />{secondarySubmitLabel ?? "別メニューとして保存"}
              </button>
            )}
          </div>
        )}

        {activeWizardStep !== "confirm" && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="secondary-button" disabled={wizardIndex === 0} onClick={() => moveWizard(-1)}><ChevronLeft size={17} />戻る</button>
            <button className="primary-button" disabled={!canAdvanceWizard} onClick={() => moveWizard(1)}>次へ<ChevronRight size={17} /></button>
          </div>
        )}
        {activeWizardStep === "confirm" && (
          <button className="secondary-button mt-2 w-full" onClick={() => moveWizard(-1)}><ChevronLeft size={17} />戻る</button>
        )}
      </section>
    );
  }
  return (
    <section className={compact ? "" : "compact-card p-4"}>
      {!compact && (
        <div>
          <h2 className="font-bold">マニュアル</h2>
          <p className="mt-1 text-xs leading-relaxed text-moss">名前・ブランドは空欄でも保存できます。材料(g)なら100gあたりの栄養値と使用量から自動換算します。</p>
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <button className={`mode-button ${!isIngredient ? "mode-button-active" : ""}`} onClick={() => switchManualKind("meal")}>1食分</button>
          <button className={`mode-button ${isIngredient ? "mode-button-active" : ""}`} onClick={() => switchManualKind("ingredient")}>材料(g)</button>
        </div>
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
        {isIngredient && (
          <PartialNumberInput label="使用量 g" value={manual.ingredient_grams} step={1} onChange={(value) => setManual({ ...manual, ingredient_grams: value })} />
        )}
        <PartialNumberInput label={isIngredient ? "kcal / 100g" : "kcal"} value={manual.calories} onChange={(value) => setManual({ ...manual, calories: value })} />
        <PartialNumberInput label={isIngredient ? "P / 100g" : "P"} value={manual.protein_g} step={0.1} onChange={(value) => setManual({ ...manual, protein_g: value })} />
        <PartialNumberInput label={isIngredient ? "F / 100g" : "F"} value={manual.fat_g} step={0.1} onChange={(value) => setManual({ ...manual, fat_g: value })} />
        <PartialNumberInput label={isIngredient ? "C / 100g" : "C"} value={manual.carbs_g} step={0.1} onChange={(value) => setManual({ ...manual, carbs_g: value })} />
        <input value={manual.salt_g} onChange={(event) => setManual({ ...manual, salt_g: event.target.value })} placeholder={isIngredient ? "塩分 / 100g optional" : "塩分 optional"} />
        <input value={manual.note} onChange={(event) => setManual({ ...manual, note: event.target.value })} placeholder="メモ" />
        {isIngredient && (
          <div className="col-span-2 rounded-2xl border border-line bg-rice/60 px-3 py-2 text-xs text-moss">
            <p className="font-semibold text-ink">記録される栄養</p>
            <p className="numeric-text mt-1">使用量 {formatControlValue(ingredientGramValue(manual) ?? 0)}g · {previewNutrition.calories}kcal · P{previewNutrition.protein_g} F{previewNutrition.fat_g} C{previewNutrition.carbs_g}</p>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!isPresetOnly && <label className="chip"><input type="checkbox" checked={manual.savePreset} onChange={(event) => setManual({ ...manual, savePreset: event.target.checked })} />メニューとして登録</label>}
        <label className="chip"><input type="checkbox" checked={manual.favorite} onChange={(event) => setManual({ ...manual, favorite: event.target.checked })} />お気に入り</label>
        <label className="chip"><input type="checkbox" checked={manual.officialVerified} onChange={(event) => setManual({ ...manual, officialVerified: event.target.checked })} />公式値として登録</label>
      </div>
      <button className="primary-button mt-3 w-full" onClick={onSave}><Save size={17} />保存</button>
    </section>
  );
}

function FoodItemRow({ item, displayName, onPick, onClone, onDelete, refresh, balanceTarget, recommendationRank }: {
  item: MenuItem;
  displayName?: string;
  onPick: (item: MenuItem) => void;
  onClone: (item: MenuItem) => void;
  onDelete?: (item: MenuItem) => void | Promise<void>;
  refresh: () => Promise<void>;
  balanceTarget?: { calories: number; protein: number; fat: number; carbs: number };
  recommendationRank?: number;
}) {
  const pictogram = getFoodPictogram(item);
  const fit = balanceTarget ? getPerfectFoodFit(item, balanceTarget) : undefined;
  const editLabel = canOverwriteMenuItem(item) ? "値を上書き編集" : "マイメニューで編集";
  const rowDisplayName = displayName ?? formatMenuItemName(item);
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-rice/70">
      <Pictogram {...pictogram} />
      <button className="min-w-0 flex-1 text-left" onClick={() => onPick(item)}>
        <p className="truncate text-sm font-semibold">{rowDisplayName}</p>
        <p className="numeric-text truncate text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {recommendationRank && <span className="recommendation-rank-badge">おすすめ{recommendationRank}位</span>}
          <SourceBadge item={item} source={item.data_source} confidence={item.confidence} />
          {fit && <span className={`perfect-food-fit-badge perfect-food-fit-${fit.tone}`}>{fit.label}</span>}
          {fit?.details.map((detail) => (
            <span className={`perfect-food-detail-chip perfect-food-detail-${detail.tone}`} key={detail.label}>{detail.label}</span>
          ))}
        </div>
      </button>
      <button className="icon-button h-8 w-8" aria-label={`${rowDisplayName}を${editLabel}`} title={editLabel} onClick={() => onClone(item)}><Pencil size={14} /></button>
      <button className="icon-button h-8 w-8" aria-label="お気に入り" onClick={async () => {
        await db.menu_items.update(item.id, { is_favorite: !item.is_favorite, updated_at: nowIso() });
        await refresh();
      }}><Heart size={14} fill={item.is_favorite ? "currentColor" : "none"} /></button>
      {item.is_user_created && onDelete && (
        <button className="icon-button h-8 w-8 text-clay" aria-label={`${rowDisplayName}をマイメニューから削除`} onClick={() => onDelete(item)}><Trash2 size={14} /></button>
      )}
    </div>
  );
}

function RecentFoodEntryRow({ entry, displayName, onLog }: { entry: FoodEntry; displayName: string; onLog: () => void | Promise<void> }) {
  const pictogram = getFoodPictogram(entry);
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-rice/70">
      <Pictogram {...pictogram} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{displayName}</p>
        <p className="numeric-text truncate text-xs text-moss">{mealLabels[entry.meal_type]} · {entry.calories}kcal · P{entry.protein_g} F{entry.fat_g} C{entry.carbs_g}</p>
      </div>
      <button className="secondary-button h-9 px-3 py-2 text-xs" onClick={onLog}>記録</button>
    </div>
  );
}

function AiFoodImportModal({ intent = "log", step, setStep, text, setText, items, menuItems, candidates, selections, setSelections, mealType, setMealType, error, copiedPrompt, onCopyPrompt, onParse, onSave, onReset, onClose }: {
  intent?: AiFoodImportIntent;
  step: AiFoodImportStep;
  setStep: (step: AiFoodImportStep) => void;
  text: string;
  setText: (text: string) => void;
  items: AiFoodBridgeItem[];
  menuItems: MenuItem[];
  candidates: AiFoodMatchCandidate[][];
  selections: Record<number, AiFoodImportSelection>;
  setSelections: (selections: Record<number, AiFoodImportSelection>) => void;
  mealType: MealType;
  setMealType: (mealType: MealType) => void;
  error: string;
  copiedPrompt: boolean;
  onCopyPrompt: () => void | Promise<void>;
  onParse: () => void;
  onSave: () => void | Promise<void>;
  onReset: () => void;
  onClose: () => void;
}) {
  const selectionCreatesFoodLog = (selection: AiFoodImportSelection | undefined) => {
    if (intent !== "log" || !selection) return false;
    const source = selection.source;
    return source !== "skip" && source !== "ai_menu_only";
  };
  const hasLoggableSelections = (nextSelections = selections) => items.some((_, index) => selectionCreatesFoodLog(nextSelections[index]));
  const stepUsesTiming = intent === "log" && (step !== "confirm" || hasLoggableSelections());
  const aiFoodSteps: AiFoodImportStep[] = stepUsesTiming ? ["prompt", "paste", "read", "match", "timing", "confirm"] : ["prompt", "paste", "read", "match", "confirm"];
  const stepIndex = aiFoodSteps.indexOf(step);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matchStage, setMatchStage] = useState<"candidate" | "usage">("candidate");
  const [isManualSearchOpen, setIsManualSearchOpen] = useState(false);
  const [manualSearchQuery, setManualSearchQuery] = useState("");
  const menuItemsById = useMemo(() => new Map(menuItems.map((item) => [item.id, item])), [menuItems]);
  const goToNextMatchItem = (index: number, nextSelections = selections) => {
    setMatchStage("candidate");
    setIsManualSearchOpen(false);
    setManualSearchQuery("");
    if (index < items.length - 1) {
      setMatchIndex(index + 1);
      return;
    }
    setStep(hasLoggableSelections(nextSelections) ? "timing" : "confirm");
  };
  const chooseCurrentSelection = (selection: AiFoodImportSelection) => {
    const index = Math.min(matchIndex, Math.max(0, items.length - 1));
    const nextSelections = { ...selections, [index]: selection };
    setSelections(nextSelections);
    goToNextMatchItem(index, nextSelections);
  };
  useEffect(() => {
    if (matchIndex < items.length) return;
    setMatchIndex(Math.max(0, items.length - 1));
  }, [items.length, matchIndex]);
  useEffect(() => {
    if (step === "match") return;
    setMatchStage("candidate");
    setIsManualSearchOpen(false);
    setManualSearchQuery("");
  }, [step]);
  const selectedSummary = items.map((item, index) => {
    const selection = selections[index] ?? { source: "skip" };
    const matched = selection.source === "menu" && selection.menuItemId ? menuItemsById.get(selection.menuItemId) : undefined;
    return { item, selection, matched };
  });
  const activeSummary = selectedSummary.filter(({ selection }) => selection.source !== "skip");
  const skippedCount = selectedSummary.length - activeSummary.length;
  const currentMatchIndex = Math.min(matchIndex, Math.max(0, items.length - 1));
  const currentItem = items[currentMatchIndex];
  const currentCandidates = candidates[currentMatchIndex] ?? [];
  const currentSelection = selections[currentMatchIndex];
  const currentDisplayName = currentItem?.observed_name || "読み取った品目";
  const beginItemReview = () => {
    setMatchIndex(0);
    setMatchStage("candidate");
    setIsManualSearchOpen(false);
    setManualSearchQuery("");
    setStep("match");
  };
  const manualSearchResults = useMemo(() => {
    const query = manualSearchQuery.trim();
    if (!query) return [];
    const normalizedQuery = normalizeExactMenuKeyPart(query);
    const tokens = query.toLowerCase().split(/\s+/).map(normalizeExactMenuKeyPart).filter(Boolean);
    return menuItems
      .map((item) => {
        const name = normalizeExactMenuKeyPart(item.name);
        const brand = normalizeExactMenuKeyPart(item.brand ?? "");
        const text = normalizeExactMenuKeyPart([item.name, item.brand, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" "));
        let score = 0;
        if (name.includes(normalizedQuery)) score += 40;
        if (brand && normalizedQuery && (brand.includes(normalizedQuery) || normalizedQuery.includes(brand))) score += 24;
        const tokenHits = tokens.filter((token) => token.length >= 2 && text.includes(token)).length;
        score += tokenHits * 8;
        score += Math.max(0, 5 - sourceRank(item.data_source));
        return { item, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || sourceRank(a.item.data_source) - sourceRank(b.item.data_source) || a.item.name.localeCompare(b.item.name, "ja"))
      .slice(0, 8);
  }, [manualSearchQuery, menuItems]);
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="ai-food-import-sheet compact-card max-h-[86vh] w-full max-w-[430px] overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="ai-food-import-icon"><Sparkles size={17} /></span>
              <p className="text-lg font-black">AI写真登録</p>
            </div>
            <p className="mt-1 text-xs font-semibold text-moss">写真から読み取った品目を、1件ずつ確認して登録します。</p>
          </div>
          <button className="icon-button h-9 w-9 shrink-0" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="manual-wizard-progress mt-4" aria-hidden="true">
          {aiFoodSteps.map((item, index) => (
            <span className={index <= stepIndex ? "food-add-progress-dot food-add-progress-dot-active" : "food-add-progress-dot"} key={item} />
          ))}
        </div>
        <p className="mt-2 text-xs font-bold text-moss">
          {step === "prompt" ? "1. プロンプトをコピー" : step === "paste" ? "2. AI出力を貼り付け" : step === "read" ? "3. 読み取り結果" : step === "match" ? `4. ${currentMatchIndex + 1}件目を確認` : step === "timing" ? `${aiFoodSteps.length - 1}. 記録タイミングを選択` : `${aiFoodSteps.length}. ${intent === "menu" ? "保存内容を確認" : "記録内容を確認"}`}
        </p>

        {step === "prompt" && (
          <div className="mt-4 space-y-3">
            <div className="ai-food-helper-card">
              <p>1. 下のプロンプトをコピーボタンを押してください。</p>
              <p className="mt-1">2. 初回のみお好きなAIを開いて（Gemini推奨）新規チャットにペーストしてください。次回以降は同じチャットに写真を貼るだけで使えます。</p>
              <p className="mt-1">3. AIが返してきたコードを丸ごとコピーして次の画面で貼り付けてください。</p>
            </div>
            <button className="primary-button w-full" onClick={onCopyPrompt}><Copy size={17} />{copiedPrompt ? "コピー済み" : "プロンプトをコピー"}</button>
          </div>
        )}

        {step === "paste" && (
          <div className="mt-4 space-y-3">
            <label className="block text-xs font-bold text-moss">
              AIのコードブロック
              <textarea
                className="mt-2 min-h-52 w-full text-sm"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="```json&#10;{ &quot;type&quot;: &quot;food_ai_bridge_v2&quot;, &quot;items&quot;: [...] }&#10;```"
              />
            </label>
            {error && <p className="rounded-2xl border border-clay/20 bg-clay/10 px-3 py-2 text-xs font-bold text-clay">{error}</p>}
          </div>
        )}

        {step === "read" && (
          <div className="mt-4 space-y-3">
            <div className="ai-food-read-result">
              <span className="ai-food-read-count numeric-text">{items.length}</span>
              <div>
                <p className="text-lg font-black">{items.length}件読み取りました</p>
                <p className="mt-1 text-xs font-semibold text-moss">内容を1件ずつ確認します。</p>
              </div>
            </div>
            <div className="ai-food-read-list">
              {items.map((item, index) => (
                <div className="ai-food-read-item" key={`${item.observed_name}-${index}`}>
                  <span className="numeric-text">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="break-words text-sm font-black">{item.observed_name}</p>
                    <p className="mt-1 text-xs font-semibold text-moss">{item.possible_brand || item.food_type || "ブランド不明"} · {item.nutrition_estimate.calories}kcal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "match" && currentItem && (
          <div className="mt-4 space-y-3">
            <div className="ai-food-match-pager">
              <button
                className="secondary-button h-9 px-3 text-xs"
                disabled={currentMatchIndex === 0}
                onClick={() => {
                  setMatchIndex((index) => Math.max(0, index - 1));
                  setMatchStage("candidate");
                  setIsManualSearchOpen(false);
                }}
              >
                <ChevronLeft size={15} />前の品目
              </button>
              <span className="numeric-text">{currentMatchIndex + 1}件目 / {items.length}件</span>
              <button
                className="secondary-button h-9 px-3 text-xs"
                disabled={!currentSelection || currentMatchIndex >= items.length - 1}
                onClick={() => {
                  setMatchIndex((index) => Math.min(items.length - 1, index + 1));
                  setMatchStage("candidate");
                  setIsManualSearchOpen(false);
                }}
              >
                次の品目<ChevronRight size={15} />
              </button>
            </div>

            <section className="ai-food-read-item-hero" key={`${currentItem.observed_name}-${currentMatchIndex}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="ai-food-section-label">AIが読み取った品目</p>
                  <h3 className="break-words text-xl font-black leading-snug">{currentDisplayName}</h3>
                  {currentItem.possible_menu_name && currentItem.possible_menu_name !== currentItem.observed_name && (
                    <p className="mt-1 break-words text-xs font-semibold text-moss">照合候補: {currentItem.possible_menu_name}</p>
                  )}
                  <p className="mt-2 text-xs font-bold text-moss">
                    {[currentItem.possible_brand || "ブランド不明", currentItem.quantity].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="mini-chip shrink-0">{confidenceLabel(currentItem.confidence)}</span>
              </div>
              <div className="ai-food-read-nutrition mt-3">
                <div><span>kcal</span><strong>{currentItem.nutrition_estimate.calories}</strong></div>
                <div><span>P</span><strong>{currentItem.nutrition_estimate.protein_g}g</strong></div>
                <div><span>F</span><strong>{currentItem.nutrition_estimate.fat_g}g</strong></div>
                <div><span>C</span><strong>{currentItem.nutrition_estimate.carbs_g}g</strong></div>
              </div>
              {currentItem.needs_confirmation.length > 0 && (
                <p className="ai-food-note mt-3">確認したいこと: {currentItem.needs_confirmation.join(" / ")}</p>
              )}
            </section>

            {matchStage === "candidate" ? (
              <section className="ai-food-choice-screen">
                <div>
                  <h3 className="text-base font-black">この中に登録したいメニューはありますか？</h3>
                  <p className="mt-1 text-xs font-semibold text-moss">同じメニューがあれば、登録済みの栄養値を使います。</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button className="ai-food-none-button" onClick={() => setMatchStage("usage")}>リストにありません</button>
                  <button
                    className={`secondary-button min-h-12 px-3 text-xs ${isManualSearchOpen ? "mode-button-active" : ""}`}
                    onClick={() => {
                      setManualSearchQuery(currentDisplayName);
                      setIsManualSearchOpen((open) => !open);
                    }}
                  >
                    <Search size={15} />ほかを検索
                  </button>
                </div>
                {isManualSearchOpen && (
                  <div className="ai-food-manual-search mt-3">
                    <label className="block text-xs font-bold text-moss">
                      登録済みメニューを検索
                      <input
                        className="mt-2 w-full"
                        value={manualSearchQuery}
                        onChange={(event) => setManualSearchQuery(event.target.value)}
                        placeholder="メニュー名・ブランド名"
                      />
                    </label>
                    <div className="mt-2 space-y-2">
                      {manualSearchResults.map(({ item }) => (
                        <button
                          className={`food-filter-option ai-food-candidate-option ${currentSelection?.source === "menu" && currentSelection.menuItemId === item.id ? "food-filter-option-active" : ""}`}
                          key={item.id}
                          onClick={() => chooseCurrentSelection({ source: "menu", menuItemId: item.id })}
                        >
                          <span className="min-w-0">
                            <span className="block break-words text-sm font-bold">{formatMenuItemName(item)}</span>
                            <span className="numeric-text mt-1 block text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</span>
                          </span>
                          <span className="mini-chip shrink-0">選択</span>
                        </button>
                      ))}
                      {manualSearchQuery.trim() && manualSearchResults.length === 0 && (
                        <p className="ai-food-note">登録済みメニューに見つかりませんでした。</p>
                      )}
                    </div>
                  </div>
                )}
                {!isManualSearchOpen && (
                  <div className="mt-3 space-y-2">
                    <p className="ai-food-section-label">近い登録済みメニュー</p>
                    {currentCandidates.length ? currentCandidates.slice(0, 3).map((candidate) => (
                      <button
                        className={`food-filter-option ai-food-candidate-option ${currentSelection?.source === "menu" && currentSelection.menuItemId === candidate.item.id ? "food-filter-option-active" : ""}`}
                        key={candidate.item.id}
                        onClick={() => chooseCurrentSelection({ source: "menu", menuItemId: candidate.item.id })}
                      >
                        <span className="min-w-0">
                          <span className="block break-words text-sm font-bold">{formatMenuItemName(candidate.item)}</span>
                          <span className="numeric-text mt-1 block text-xs text-moss">{candidate.item.brand ?? candidate.item.category} · {candidate.item.calories}kcal · P{candidate.item.protein_g} F{candidate.item.fat_g} C{candidate.item.carbs_g}</span>
                        </span>
                        <span className="mini-chip shrink-0">選択</span>
                      </button>
                    )) : <p className="ai-food-note">近い登録済みメニューは見つかりませんでした。</p>}
                  </div>
                )}
              </section>
            ) : (
              <section className="ai-food-choice-screen">
                <div>
                  <h3 className="text-base font-black">読み取った内容をどう使いますか？</h3>
                  <p className="mt-1 text-xs font-semibold text-moss">「{currentDisplayName}」の登録方法を選んでください。</p>
                </div>
                <div className="mt-3 space-y-2">
                  {intent === "log" && (
                    <button className="food-filter-option ai-food-action-option ai-food-action-once" onClick={() => chooseCurrentSelection({ source: "ai_once" })}>
                      <span><span className="block text-sm font-bold">今回の食事だけに記録</span><span className="mt-1 block text-xs text-moss">マイメニューには保存しません。</span></span>
                      <span className="mini-chip shrink-0">記録のみ</span>
                    </button>
                  )}
                  {intent === "log" && (
                    <button className="food-filter-option ai-food-action-option ai-food-action-save" onClick={() => chooseCurrentSelection({ source: "ai_menu" })}>
                      <span><span className="block text-sm font-bold">マイメニューに保存して記録</span><span className="mt-1 block text-xs text-moss">今回記録し、次回からも呼び出せます。</span></span>
                      <span className="mini-chip shrink-0">保存+記録</span>
                    </button>
                  )}
                  <button className="food-filter-option ai-food-action-option ai-food-action-save" onClick={() => chooseCurrentSelection({ source: "ai_menu_only" })}>
                    <span><span className="block text-sm font-bold">マイメニューに保存だけ</span><span className="mt-1 block text-xs text-moss">今回は食事記録に追加しません。</span></span>
                    <span className="mini-chip shrink-0">保存のみ</span>
                  </button>
                  <button className="food-filter-option ai-food-action-option ai-food-action-skip" onClick={() => chooseCurrentSelection({ source: "skip" })}>
                    <span><span className="block text-sm font-bold">この品目は登録しない</span><span className="mt-1 block text-xs text-moss">読み取り結果から除外します。</span></span>
                    <span className="mini-chip shrink-0">除外</span>
                  </button>
                </div>
                <button className="secondary-button mt-3 w-full" onClick={() => setMatchStage("candidate")}><ChevronLeft size={16} />候補一覧に戻る</button>
              </section>
            )}
          </div>
        )}

        {step === "timing" && (
          <div className="mt-4 space-y-3">
            <div className="ai-food-helper-card">
              <p className="text-sm font-black text-ink">いつの記録にする？</p>
              <p className="mt-1 text-xs font-semibold text-moss">取り込む{activeSummary.length}件に同じタイミングを設定します。あとから食事ログで個別編集できます。</p>
              {skippedCount > 0 && <p className="mt-1 text-xs font-semibold text-moss">スキップ中: {skippedCount}件</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(mealLabels).map(([key, label]) => (
                <button
                  className={`food-add-choice ${mealType === key ? "food-add-choice-active" : ""}`}
                  key={key}
                  onClick={() => setMealType(key as MealType)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="mt-4 space-y-3">
            {hasLoggableSelections() && (
              <div className="ai-food-timing-summary">
                <span>記録タイミング</span>
                <strong>{mealLabels[mealType]}</strong>
              </div>
            )}
            <div className="space-y-2">
              {selectedSummary.map(({ item, selection, matched }, index) => {
                const name = matched ? formatMenuItemName(matched) : item.observed_name;
                const nutrition = matched ?? item.nutrition_estimate;
                const skipped = selection.source === "skip";
                const statusText = skipped
                  ? "スキップして登録しない"
                  : intent === "menu"
                    ? "マイメニューに保存"
                    : matched
                      ? "既存メニューで記録"
                      : selection.source === "ai_menu"
                        ? "マイメニュー保存して記録"
                        : selection.source === "ai_menu_only"
                          ? "マイメニューに登録だけ"
                          : "今回だけ記録";
                return (
                  <div className={`ai-food-summary-card ${skipped ? "ai-food-summary-skipped" : ""}`} key={`${name}-${index}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{name}</p>
                        <p className="mt-1 text-xs font-semibold text-moss">
                          {statusText}
                        </p>
                      </div>
                      <p className="numeric-text shrink-0 text-lg font-black">{skipped ? "除外" : `${nutrition.calories}kcal`}</p>
                    </div>
                    {!skipped && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <MetricPill label="P" value={`${nutrition.protein_g}g`} />
                        <MetricPill label="F" value={`${nutrition.fat_g}g`} />
                        <MetricPill label="C" value={`${nutrition.carbs_g}g`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step !== "match" && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              className="secondary-button"
              onClick={() => {
                if (step === "prompt") {
                  onClose();
                  return;
                }
                setStep(step === "paste" ? "prompt" : step === "read" ? "paste" : step === "timing" ? "match" : hasLoggableSelections() ? "timing" : "match");
              }}
            >
              {step === "prompt" ? "閉じる" : <><ChevronLeft size={17} />戻る</>}
            </button>
            {step === "prompt" && <button className="primary-button" onClick={() => setStep("paste")}>貼り付けへ<ChevronRight size={17} /></button>}
            {step === "paste" && <button className="primary-button" onClick={onParse}>読み取る<ChevronRight size={17} /></button>}
            {step === "read" && <button className="primary-button" disabled={!items.length} onClick={beginItemReview}>1件目を確認<ChevronRight size={17} /></button>}
            {step === "timing" && <button className="primary-button" disabled={!activeSummary.length} onClick={() => setStep("confirm")}>確認へ<ChevronRight size={17} /></button>}
            {step === "confirm" && <button className="primary-button" disabled={!items.length} onClick={onSave}><Check size={17} />{!activeSummary.length ? "完了" : hasLoggableSelections() ? "記録" : "保存"}</button>}
          </div>
        )}
        {step === "match" && matchStage === "candidate" && (
          <button
            className="secondary-button mt-5 w-full"
            onClick={() => {
              if (currentMatchIndex === 0) {
                setStep("read");
                return;
              }
              setMatchIndex((index) => Math.max(0, index - 1));
              setIsManualSearchOpen(false);
            }}
          >
            <ChevronLeft size={17} />{currentMatchIndex === 0 ? "読み取り結果に戻る" : "前の品目に戻る"}
          </button>
        )}
        {step !== "prompt" && (
          <button className="secondary-button mt-2 w-full" onClick={onReset}><RotateCcw size={17} />最初からやり直す</button>
        )}
      </div>
    </div>
  );
}

function WorkoutTemplateRow({ template, canReorder, isEditing, isDragging, onStart, onEdit, onDelete, onDragStart, onDragEnter, onDragEnd }: {
  template: WorkoutTemplate;
  canReorder: boolean;
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
      className={`workout-template-row ${canReorder ? "workout-template-row-reorder" : ""} px-4 py-4 transition-colors hover:bg-rice/70 ${isEditing ? "bg-leaf/20" : ""} ${isDragging ? "opacity-60" : ""}`}
      data-workout-template-id={template.id}
      onDragEnter={(event) => {
        if (!canReorder) return;
        event.preventDefault();
        onDragEnter(template);
      }}
      onDragOver={(event) => {
        if (canReorder) event.preventDefault();
      }}
    >
      {canReorder && (
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
      )}
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
        <button className="secondary-button mt-3 w-full" onClick={() => onUpdateDetails({ name: nameDraft, icon_key: iconDraft })}><Save size={16} />名前を保存</button>
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
  const weightPresetKeys = useMemo(() => workoutWeightPresetKeys(exercise), [exercise.exercise_id, exercise.exercise_name, exercise.body_part, exercise.equipment_type]);
  const weightPresetValues = useMemo(
    () => loadWorkoutWeightPresets(weightPresetKeys, weightValue, weightStep),
    [weightPresetKeys, weightValue, weightStep],
  );

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
    const load_type = exercise.load_type ?? firstPattern?.load_type;
    const set_scheme = Array.from({ length: sets }, () => ({ weight_kg: load_type === "bodyweight" ? undefined : weight_kg, load_type, reps }));
    onUpdate(index, { ...exercise, sets, weight_kg: load_type === "bodyweight" ? undefined : weight_kg, load_type, reps, set_scheme });
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
      load_type: first.load_type,
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
            {weightPresetValues.length > 0 && (
              <div className="mt-3">
                <p className="mb-2 text-xs font-bold text-moss">重量プリセット</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {weightPresetValues.map((value, presetIndex) => (
                    <button
                      className={`mini-chip ${roundToStep(weightValue, weightStep) === roundToStep(value, weightStep) ? "mini-chip-active" : ""}`}
                      key={`${exercise.exercise_id}-${presetIndex}-${value}`}
                      onClick={() => updateStrengthDefaults({ weight_kg: value })}
                    >
                      {formatControlValue(value)}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

function MyTrainingModal({ initialDraft, exercisePresets, weightPresetStore, onClose, onSave }: {
  initialDraft?: MyTrainingDraft;
  exercisePresets: ExercisePreset[];
  weightPresetStore: Record<string, number[]>;
  onClose: () => void;
  onSave: (draft: MyTrainingDraft) => void | Promise<void>;
}) {
  const [step, setStep] = useState<MyTrainingWizardStep>(initialDraft ? "basic" : "method");
  const [draft, setDraft] = useState<MyTrainingDraft>(() => initialDraft ?? myTrainingDraftFromExercise());
  const [sourceQuery, setSourceQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isCardio = draft.body_part === "有酸素" || draft.equipment_type === "有酸素";
  const isBodyweight = !isCardio && /自重|自宅/.test(draft.equipment_type);
  const bodyPartOptions = useMemo(() => unique(["胸", "背中", "肩", "腕", "脚", "体幹", "有酸素", ...exercisePresets.map((item) => item.body_part)]).slice(0, 12), [exercisePresets]);
  const equipmentOptions = useMemo(() => unique(["マシン", "フリーウェイト", "スミスマシン", "ケーブル", "自重", "有酸素", ...exercisePresets.map((item) => item.equipment_type)]).slice(0, 12), [exercisePresets]);
  const sourceResults = useMemo(() => {
    const query = sourceQuery.trim().toLowerCase();
    return exercisePresets
      .filter((exercise) => {
        if (!query) return true;
        return `${exercise.name} ${exercise.body_part} ${exercise.equipment_type}`.toLowerCase().includes(query);
      })
      .slice(0, 12);
  }, [exercisePresets, sourceQuery]);
  const normalizedPresets = draft.weight_presets.length ? draft.weight_presets.slice(0, 5) : defaultWorkoutWeightPresets(draft.weight_kg, 2.5);
  const updateDraft = (patch: Partial<MyTrainingDraft>) => setDraft((current) => ({ ...current, ...patch }));
  const selectSourceExercise = (exercise: ExercisePreset) => {
    const stepValue = inferWeightStep(exercise);
    const firstSet = exercise.default_set_scheme?.[0];
    const weight = round1(Math.max(0, exercise.default_weight_kg ?? firstSet?.weight_kg ?? 0));
    setDraft(myTrainingDraftFromExercise(exercise, {
      name: `${exercise.name} カスタム`,
      weight_presets: loadWorkoutWeightPresets(workoutWeightPresetKeys(exercise), weight, stepValue, weightPresetStore),
    }));
    setStep("basic");
  };
  const goBack = () => {
    if (step === "method") return onClose();
    if (step === "source") return setStep("method");
    if (step === "basic") return initialDraft ? onClose() : setStep(draft.sourceExerciseId ? "source" : "method");
    if (step === "defaults") return setStep("basic");
    if (step === "presets") return setStep("defaults");
    setStep(isCardio ? "defaults" : "presets");
  };
  const goNext = () => {
    if (step === "basic") return setStep("defaults");
    if (step === "defaults") return setStep(isCardio || isBodyweight ? "confirm" : "presets");
    if (step === "presets") return setStep("confirm");
  };
  const save = async () => {
    if (isSaving || !draft.name.trim()) return;
    setIsSaving(true);
    try {
      await onSave({
        ...draft,
        weight_kg: isBodyweight ? 0 : draft.weight_kg,
        load_type: isBodyweight ? "bodyweight" : draft.load_type,
        weight_presets: isCardio || isBodyweight ? [] : normalizedPresets,
      });
    } finally {
      setIsSaving(false);
    }
  };
  const progress = ["method", "source", "basic", "defaults", "presets", "confirm"].filter((item) => {
    if (initialDraft && (item === "method" || item === "source")) return false;
    if ((isCardio || isBodyweight) && item === "presets") return false;
    return true;
  });
  const title = step === "method" ? "マイトレ登録" : step === "source" ? "元の種目を選択" : step === "basic" ? "基本情報" : step === "defaults" ? "初期値" : step === "presets" ? "重量プリセット" : "登録内容";

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card max-h-[86vh] w-full overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3">
          <Pictogram {...getWorkoutPictogram(draft.body_part, draft.equipment_type)} />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">{title}</p>
            <p className="mt-1 text-sm text-moss">狙い方やジム差分を別名の種目として保存します。</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-2">
          {progress.map((item) => (
            <span className={`h-1.5 rounded-full ${item === step ? "bg-moss" : "bg-line"}`} key={item} />
          ))}
        </div>

        {step === "method" && (
          <div className="mt-5 grid gap-2">
            <button className="choice-button h-16 items-center justify-start px-4 text-left" onClick={() => setStep("source")}>
              <span className="font-black">既存の種目をカスタマイズ</span>
            </button>
            <button
              className="choice-button h-16 items-center justify-start px-4 text-left"
              onClick={() => {
                setDraft(myTrainingDraftFromExercise(undefined, { name: "" }));
                setStep("basic");
              }}
            >
              <span className="font-black">新規登録</span>
            </button>
          </div>
        )}

        {step === "source" && (
          <div className="mt-5 space-y-3">
            <input className="h-12 w-full text-base" value={sourceQuery} onChange={(event) => setSourceQuery(event.target.value)} placeholder="種目名・部位・器具で検索" />
            <div className="my-training-source-list">
              {sourceResults.map((exercise) => (
                <button className="my-training-source-row" key={exercise.id} onClick={() => selectSourceExercise(exercise)}>
                  <Pictogram {...getWorkoutPictogram(exercise.body_part, exercise.equipment_type)} />
                  <span className="my-training-source-content">
                    <span className="my-training-source-title">{exercise.name}</span>
                    <span className="my-training-source-meta">{exercise.body_part} · {exercise.equipment_type}</span>
                  </span>
                  <ChevronRight className="my-training-source-chevron" size={17} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "basic" && (
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-bold">
              種目名
              <input className="mt-2 h-12 w-full text-base" value={draft.name} onChange={(event) => updateDraft({ name: event.target.value })} placeholder="例: ペックフライ 上部狙い" />
            </label>
            <div>
              <p className="mb-2 text-sm font-bold">部位</p>
              <div className="grid grid-cols-3 gap-2">
                {bodyPartOptions.map((item) => (
                  <button className={`mini-chip h-10 ${draft.body_part === item ? "mini-chip-active" : ""}`} key={item} onClick={() => updateDraft({ body_part: item })}>{item}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold">器具</p>
              <div className="grid grid-cols-2 gap-2">
                {equipmentOptions.map((item) => (
                  <button className={`mini-chip h-10 ${draft.equipment_type === item ? "mini-chip-active" : ""}`} key={item} onClick={() => updateDraft({ equipment_type: item, load_type: /自重|自宅/.test(item) ? "bodyweight" : draft.load_type })}>{item}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm font-bold">
              マシン・メモ
              <input className="mt-2 h-12 w-full text-base" value={draft.machine_name} onChange={(event) => updateDraft({ machine_name: event.target.value })} placeholder="例: 手幅広め / 台を1段上げる" />
            </label>
          </div>
        )}

        {step === "defaults" && (
          <div className="mt-5 space-y-4">
            {isCardio ? (
              <WizardNumberControl
                label="初期分数"
                value={draft.duration_min}
                suffix="min"
                step={5}
                min={0}
                max={120}
                onChange={(duration_min) => updateDraft({ duration_min })}
              />
            ) : (
              <>
                {isBodyweight && (
                  <div className="rounded-md bg-rice p-3 text-sm font-bold text-moss">自重種目として保存します。</div>
                )}
                {!isBodyweight && (
                  <WizardNumberControl
                    label="初期重量"
                    value={draft.weight_kg}
                    suffix="kg"
                    step={inferWeightStep({ name: draft.name, equipment_type: draft.equipment_type })}
                    min={0}
                    max={sliderMax(draft.weight_kg, 200, inferWeightStep({ name: draft.name, equipment_type: draft.equipment_type }))}
                    onChange={(weight_kg) => updateDraft({ weight_kg })}
                  />
                )}
                <WizardNumberControl
                  label="初期回数"
                  value={draft.reps}
                  suffix="回"
                  step={1}
                  min={0}
                  max={50}
                  onChange={(reps) => updateDraft({ reps: Math.max(0, Math.round(reps)) })}
                />
                <WizardNumberControl
                  label="初期セット"
                  value={draft.sets}
                  suffix="set"
                  step={1}
                  min={1}
                  max={5}
                  onChange={(sets) => updateDraft({ sets: Math.min(5, Math.max(1, Math.round(sets))) })}
                />
              </>
            )}
          </div>
        )}

        {step === "presets" && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-bold">よく使う重量</p>
            <div className="grid grid-cols-2 gap-2">
              {normalizedPresets.map((value, index) => (
                <label className="rounded-md border border-line bg-rice/60 p-3 text-xs font-bold text-moss" key={index}>
                  プリセット{index + 1}
                  <input
                    className="mt-2 h-11 w-full text-base"
                    type="number"
                    value={value}
                    onChange={(event) => {
                      const next = [...normalizedPresets];
                      next[index] = round1(Math.max(0, Number(event.target.value) || 0));
                      updateDraft({ weight_presets: next });
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="mt-5 space-y-3">
            <div className="rounded-md bg-rice p-4">
              <p className="text-xs font-bold text-moss">登録する種目</p>
              <p className="mt-2 text-lg font-black">{draft.name || "未入力"}</p>
              <p className="mt-1 text-sm font-semibold text-moss">{draft.body_part} · {draft.equipment_type}</p>
              <p className="mt-3 text-sm font-bold">
                {isCardio
                  ? `${Math.max(0, Math.round(draft.duration_min))}分`
                  : `${formatWorkoutLoadLabel(draft.weight_kg, isBodyweight ? "bodyweight" : draft.load_type)} × ${Math.max(0, Math.round(draft.reps))}回 × ${Math.min(5, Math.max(1, Math.round(draft.sets)))}set`}
              </p>
            </div>
            {!isCardio && !isBodyweight && (
              <div className="rounded-md bg-rice p-3">
                <p className="mb-2 text-xs font-bold text-moss">重量プリセット</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {normalizedPresets.map((value, index) => <span className="mini-chip" key={index}>{formatControlValue(value)}</span>)}
                </div>
              </div>
            )}
            <label className="flex items-center justify-between rounded-md border border-line bg-rice px-3 py-3 text-sm font-bold">
              お気に入りにも追加
              <input type="checkbox" checked={draft.favorite} onChange={(event) => updateDraft({ favorite: event.target.checked })} />
            </label>
          </div>
        )}

        {step === "method" ? (
          <button className="secondary-button mt-5 w-full" onClick={onClose}>閉じる</button>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button className="secondary-button" onClick={goBack}>{initialDraft && step === "basic" ? "閉じる" : "戻る"}</button>
            {step === "source" ? (
              <button className="secondary-button" onClick={onClose}>閉じる</button>
            ) : step === "confirm" ? (
              <button className="primary-button" disabled={isSaving || !draft.name.trim()} onClick={save}><Save size={17} />{isSaving ? "保存中" : "保存"}</button>
            ) : (
              <button className="primary-button" disabled={step === "basic" && !draft.name.trim()} onClick={goNext}>次へ<ChevronRight size={17} /></button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ExerciseAddModal({ draft, setDraft, weightPresetStore, onSaveWeightPresetStore, onClose, onAddAnother, onSave, onSaveAsMyTraining }: {
  draft: WorkoutExerciseDraft;
  setDraft: (draft: WorkoutExerciseDraft) => void;
  weightPresetStore: Record<string, number[]>;
  onSaveWeightPresetStore: (store: Record<string, number[]>) => void | Promise<void>;
  onClose: () => void;
  onAddAnother: () => void;
  onSave: () => void | Promise<void>;
  onSaveAsMyTraining: (draft: WorkoutExerciseDraft, presets: number[]) => void;
}) {
  const isCardio = draft.exercise.body_part === "有酸素" || draft.exercise.equipment_type === "有酸素";
  const isBodyweight = isBodyweightStrengthItem(draft.exercise);
  const pictogram = getWorkoutPictogram(draft.exercise.body_part, draft.exercise.equipment_type);
  const [weightStep, setWeightStep] = useState(() => inferWeightStep(draft.exercise));
  const [step, setStep] = useState<"duration" | "load" | "weight" | "reps" | "sets" | "confirm" | "done">(isCardio ? "duration" : isBodyweight ? "load" : "weight");
  const weightPresetKeys = useMemo(() => workoutWeightPresetKeys(draft.exercise), [draft.exercise.id, draft.exercise.name, draft.exercise.body_part, draft.exercise.equipment_type]);
  const [weightPresets, setWeightPresets] = useState(() => loadWorkoutWeightPresets(weightPresetKeys, draft.weight_kg, weightStep, weightPresetStore));
  const [hasUnsavedWeightPreset, setHasUnsavedWeightPreset] = useState(false);
  const [isWeightPresetPickerOpen, setIsWeightPresetPickerOpen] = useState(false);
  const [weightPresetMessage, setWeightPresetMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const setCount = Math.min(5, Math.max(1, Math.round(draft.sets)));
  const loadType = draft.load_type ?? (isBodyweight ? "bodyweight" : undefined);
  const summary = isCardio
    ? `${Math.max(0, Math.round(draft.duration_min))}分`
    : `${formatWorkoutLoadLabel(draft.weight_kg, loadType)} × ${Math.max(0, Math.round(draft.reps))}回 × ${setCount}set`;
  const totalStrengthSteps = isBodyweight && loadType !== "bodyweight" ? 5 : isBodyweight ? 4 : 4;
  const stepLabel = step === "done"
    ? "追加完了"
    : isCardio
      ? `${step === "duration" ? 1 : 2}/2`
      : `${step === "load" ? 1 : step === "weight" ? (isBodyweight ? 2 : 1) : step === "reps" ? (isBodyweight && loadType !== "bodyweight" ? 3 : isBodyweight ? 2 : 2) : step === "sets" ? totalStrengthSteps - 1 : totalStrengthSteps}/${totalStrengthSteps}`;
  useEffect(() => {
    setWeightPresets(loadWorkoutWeightPresets(weightPresetKeys, draft.weight_kg, weightStep, weightPresetStore));
    setHasUnsavedWeightPreset(false);
    setWeightPresetMessage("");
  }, [weightPresetKeys.join("|"), weightStep, weightPresetStore]);
  const saveWeightPreset = async (index: number) => {
    const normalized = roundToStep(Math.max(0, draft.weight_kg), weightStep);
    const nextPresets = weightPresets.map((value, valueIndex) => valueIndex === index ? normalized : value);
    setWeightPresets(nextPresets);
    const nextStore = saveWorkoutWeightPresets(weightPresetKeys, nextPresets, weightPresetStore);
    await onSaveWeightPresetStore(nextStore);
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
    setStep(isCardio ? "duration" : isBodyweight ? "load" : "weight");
  };
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
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
              <Plus size={17} />{isCardio ? "同じ種目をもう1本追加" : isBodyweight ? "同じ種目をもう1セット追加" : "同じ種目の別重量を追加"}
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
        ) : !isCardio && step === "load" ? (
          <div className="mt-4 space-y-4">
            <div className="grid gap-2">
              {[
                { type: "bodyweight" as WorkoutLoadType, label: "自重のみ", detail: "重量入力をスキップして回数へ進みます。" },
                { type: "weighted" as WorkoutLoadType, label: "加重あり", detail: "ベルトやダンベルなどの追加重量を記録します。" },
                { type: "assisted" as WorkoutLoadType, label: "補助あり", detail: "アシストマシンやバンドの補助重量を記録します。" },
              ].map((option) => (
                <button
                  className={`choice-button h-auto min-h-[4.25rem] flex-col items-start justify-center px-4 py-3 text-left ${loadType === option.type ? "choice-button-active" : ""}`}
                  key={option.type}
                  onClick={() => {
                    setDraft({ ...draft, load_type: option.type, weight_kg: option.type === "bodyweight" ? 0 : draft.weight_kg });
                    setHasUnsavedWeightPreset(false);
                    setWeightPresetMessage("");
                    setStep(option.type === "bodyweight" ? "reps" : "weight");
                  }}
                >
                  <span className="font-black">{option.label}</span>
                  <span className="mt-1 text-xs font-semibold text-moss">{option.detail}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={onClose}>閉じる</button>
              <button className="primary-button" onClick={() => setStep(loadType === "bodyweight" ? "reps" : "weight")}>次へ</button>
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
                label={loadType === "assisted" ? "補助重量" : loadType === "weighted" ? "追加重量" : "重量"}
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
                        setStep("reps");
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
              <button className="secondary-button" onClick={() => isBodyweight ? setStep("load") : onClose()}>{isBodyweight ? "戻る" : "閉じる"}</button>
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
              <button className="secondary-button" onClick={() => setStep(isBodyweight && loadType === "bodyweight" ? "load" : "weight")}>戻る</button>
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
                  onClick={() => {
                    setDraft({ ...draft, sets });
                    setStep("confirm");
                  }}
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
            <button className="secondary-button w-full" onClick={() => onSaveAsMyTraining(draft, weightPresets)}><Save size={17} />別名で種目登録して保存</button>
          </div>
        )}
      </div>
      {isWeightPresetPickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-ink/35 px-4 pb-4"
          onClick={(event) => {
            event.stopPropagation();
            setIsWeightPresetPickerOpen(false);
          }}
        >
          <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
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
          {showSource && <SourceBadge source={entry.entry_source} confidence={entry.confidence} nutritionMeta={entry.nutrition_meta} />}
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
  const setSignature = sets.map((set) => [set.set_order, set.weight_kg, set.load_type, set.reps, set.duration_min, set.active_calories, set.intensity, set.note].join(":")).join("|");
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
      load_type: previous?.load_type,
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
                {set.load_type === "bodyweight" ? (
                  <div className="flex items-center justify-between gap-2 rounded-md bg-rice px-3 py-2">
                    <p className="text-xs font-bold text-moss">負荷</p>
                    <p className="font-black text-ink">自重</p>
                  </div>
                ) : (
                  <TapSliderControl
                    value={set.weight_kg ?? 0}
                    label={set.load_type === "assisted" ? "補助重量" : set.load_type === "weighted" ? "追加重量" : "重量"}
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
                )}
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
            load_type: previous?.load_type,
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

function NumberInput({ label, labelAction, value, step = 1, zeroDisplayLabel, onChange }: { label: string; labelAction?: ReactNode; value: number; step?: number; zeroDisplayLabel?: string; onChange: (value: number) => void }) {
  const getDisplayValue = (nextValue: number) => zeroDisplayLabel && nextValue === 0 ? "" : String(nextValue);
  const [inputValue, setInputValue] = useState(getDisplayValue(value));
  useEffect(() => {
    setInputValue(getDisplayValue(value));
  }, [value, zeroDisplayLabel]);
  const decimalPlaces = step.toString().includes(".") ? step.toString().split(".")[1].length : 0;
  const normalize = (nextValue: number) => Number(nextValue.toFixed(decimalPlaces));
  const commit = (nextValue: number) => {
    if (!Number.isFinite(nextValue)) return;
    const normalized = normalize(nextValue);
    setInputValue(getDisplayValue(normalized));
    onChange(normalized);
  };
  const current = Number.parseFloat(inputValue);
  const baseValue = Number.isFinite(current) ? current : value;
  return (
    <label className="text-xs font-semibold">
      <span className="flex items-center gap-1">
        <span>{label}</span>
        {labelAction}
      </span>
      <div className="number-stepper mt-1">
        <button type="button" className="number-stepper-button" onClick={() => commit(baseValue - step)} aria-label={`${label}を減らす`}>
          <Minus size={14} />
        </button>
        <input
          className="number-stepper-input"
          type="number"
          inputMode="decimal"
          step={step}
          value={inputValue}
          placeholder={value === 0 ? zeroDisplayLabel : undefined}
          onBlur={() => {
            if (inputValue === "" || inputValue === "-" || inputValue === ".") setInputValue(getDisplayValue(value));
          }}
          onChange={(event) => {
            const nextValue = event.target.value;
            setInputValue(nextValue);
            if (nextValue === "" || nextValue === "-" || nextValue === ".") return;
            const parsed = Number.parseFloat(nextValue);
            if (Number.isFinite(parsed)) onChange(parsed);
          }}
        />
        <button type="button" className="number-stepper-button" onClick={() => commit(baseValue + step)} aria-label={`${label}を増やす`}>
          <Plus size={14} />
        </button>
      </div>
    </label>
  );
}

function SelectField({ label, hint, labelAction, children }: { label: string; hint: string; labelAction?: ReactNode; children: ReactNode }) {
  return (
    <label className="text-xs font-semibold">
      <span className="flex items-center gap-1">
        <span>{label}</span>
        {labelAction}
      </span>
      <span className="font-normal text-moss">{hint}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function MacroOverrideModal({ draft, setDraft, calculated, onClose }: {
  draft: SettingsGoalDraft;
  setDraft: (draft: SettingsGoalDraft) => void;
  calculated?: ReturnType<typeof calculateTargets>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card max-h-[82vh] w-full overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">カロリーとPFCを入力</p>
            <p className="mt-1 text-xs text-moss">0にすると自動計算に戻ります。設定した値はAIレポートにも表示されます。</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 rounded-md bg-rice p-3 text-xs leading-relaxed text-moss">
          <p className="font-bold text-ink">現在の自動計算</p>
          <p className="mt-1">kcal {calculated?.target_calories ?? "-"} / P{calculated?.target_protein_g ?? "-"} F{calculated?.target_fat_g ?? "-"} C{calculated?.target_carbs_g ?? "-"}</p>
        </div>
        <div className="mt-4 grid gap-3">
          <NumberInput
            label="目標kcal"
            labelAction={<AutoValueButton onClick={() => setDraft({ ...draft, manual_target_calories: 0 })} />}
            value={draft.manual_target_calories}
            onChange={(value) => setDraft({ ...draft, manual_target_calories: value })}
          />
          <NumberInput
            label="目標P"
            labelAction={<AutoValueButton onClick={() => setDraft({ ...draft, manual_protein_g: 0 })} />}
            value={draft.manual_protein_g}
            onChange={(value) => setDraft({ ...draft, manual_protein_g: value })}
          />
          <NumberInput
            label="目標F"
            labelAction={<AutoValueButton onClick={() => setDraft({ ...draft, manual_fat_g: 0 })} />}
            value={draft.manual_fat_g}
            onChange={(value) => setDraft({ ...draft, manual_fat_g: value })}
          />
          <NumberInput
            label="目標C"
            labelAction={<AutoValueButton onClick={() => setDraft({ ...draft, manual_carbs_g: 0 })} />}
            value={draft.manual_carbs_g}
            onChange={(value) => setDraft({ ...draft, manual_carbs_g: value })}
          />
        </div>
        <button className="primary-button mt-4 w-full" onClick={onClose}><Check size={17} />完了</button>
      </div>
    </div>
  );
}

function AutoValueButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded-full border border-line bg-rice px-2 py-0.5 text-[10px] font-black text-moss"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
    >
      自動
    </button>
  );
}

function TravelModeModal({ modes, step, selectedId, nameDraft, startDraft, endDraft, onSelect, onNameChange, onAdd, onDelete, onStepChange, onStartChange, onEndChange, onSave, onClose }: {
  modes: SpecialModeSettings[];
  step: "select" | "period";
  selectedId: string;
  nameDraft: string;
  startDraft: string;
  endDraft: string;
  onSelect: (mode: SpecialModeSettings) => void;
  onNameChange: (value: string) => void;
  onAdd: () => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onStepChange: (step: "select" | "period") => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onSave: () => void | Promise<void>;
  onClose: () => void;
}) {
  const selectedMode = modes.find((mode) => mode.id === selectedId);
  const canAdd = !!nameDraft.trim();
  const canSave = !!selectedMode && !!startDraft && !!endDraft;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card max-h-[84vh] w-full overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">旅行モード</p>
            <p className="mt-1 text-xs text-moss">{step === "select" ? "登録済みの旅行先を選ぶか、新しく追加します。" : "旅行期間を指定します。"}</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>

        {step === "select" ? (
          <>
            <div className="mt-4 space-y-2">
              {modes.map((mode) => {
                const isSelected = mode.id === selectedId;
                const period = mode.start_date && mode.end_date ? `${formatJapaneseDate(mode.start_date)}〜${formatJapaneseDate(mode.end_date)}` : "期間未設定";
                return (
                  <div className={`flex items-center gap-2 rounded-3xl border p-2 ${isSelected ? "border-leaf bg-leaf/10" : "border-line bg-white/25"}`} key={mode.id}>
                    <button className="min-w-0 flex-1 text-left" onClick={() => onSelect(mode)}>
                      <span className="block truncate text-sm font-black text-ink">{mode.label ?? "旅行"}</span>
                      <span className="numeric-text block truncate text-[11px] font-bold text-moss">{period}</span>
                    </button>
                    {isSelected && <span className="mini-chip mini-chip-active">選択中</span>}
                    <button className="icon-button h-8 w-8 shrink-0 text-clay" aria-label={`${mode.label ?? "旅行先"}を削除`} onClick={() => onDelete(mode.id)}><Trash2 size={14} /></button>
                  </div>
                );
              })}
              {modes.length === 0 && <EmptyLine text="旅行先がまだありません" />}
            </div>

            <div className="mt-4 rounded-3xl border border-line bg-white/25 p-3">
              <label className="block text-xs font-bold text-moss">
                新しい旅行先
                <input className="mt-2 w-full" value={nameDraft} onChange={(event) => onNameChange(event.target.value)} placeholder="例: 沖縄旅行" />
              </label>
              <button className="secondary-button mt-2 w-full" disabled={!canAdd} onClick={onAdd}><Plus size={16} />旅行先を追加</button>
            </div>

            <button className="primary-button mt-4 w-full" disabled={!selectedMode} onClick={() => onStepChange("period")}>
              次へ<ChevronRight size={17} />
            </button>
          </>
        ) : (
          <>
            <div className="mt-4 rounded-3xl border border-line bg-white/25 p-3">
              <p className="font-black text-ink">{selectedMode?.label ?? "旅行"}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <label className="min-w-0 text-xs font-bold text-moss">
                  開始
                  <input className="mt-1 h-11 min-w-0 w-full px-3 text-sm" type="date" value={startDraft} onChange={(event) => onStartChange(event.target.value)} />
                </label>
                <label className="min-w-0 text-xs font-bold text-moss">
                  終了
                  <input className="mt-1 h-11 min-w-0 w-full px-3 text-sm" type="date" value={endDraft} onChange={(event) => onEndChange(event.target.value)} />
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="secondary-button" onClick={() => onStepChange("select")}><ChevronLeft size={17} />戻る</button>
              <button className="primary-button" disabled={!canSave} onClick={onSave}><Save size={17} />ONにする</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PauseModeModal({ labelDraft, startDraft, endDraft, isEnabled, onLabelChange, onStartChange, onEndChange, onSave, onDisable, onClose }: {
  labelDraft: string;
  startDraft: string;
  endDraft: string;
  isEnabled: boolean;
  onLabelChange: (value: string) => void;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onSave: () => void | Promise<void>;
  onDisable: () => void | Promise<void>;
  onClose: () => void;
}) {
  const canSave = !!startDraft && !!endDraft;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card max-h-[84vh] w-full overflow-y-auto p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">一時停止モード</p>
            <p className="mt-1 text-xs text-moss">休養や体調調整の期間を、AIレポートとストリーク判定で通常日と分けます。</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 rounded-3xl border border-line bg-white/25 p-3">
          <label className="block text-xs font-bold text-moss">
            モード名
            <input className="mt-2 w-full" value={labelDraft} onChange={(event) => onLabelChange(event.target.value)} placeholder="例: 体調調整" />
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="min-w-0 text-xs font-bold text-moss">
              開始
              <input className="mt-1 h-11 min-w-0 w-full px-3 text-sm" type="date" value={startDraft} onChange={(event) => onStartChange(event.target.value)} />
            </label>
            <label className="min-w-0 text-xs font-bold text-moss">
              終了
              <input className="mt-1 h-11 min-w-0 w-full px-3 text-sm" type="date" value={endDraft} onChange={(event) => onEndChange(event.target.value)} />
            </label>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {isEnabled ? (
            <button className="secondary-button border-clay text-clay" onClick={onDisable}>OFFにする</button>
          ) : (
            <button className="secondary-button" onClick={onClose}>閉じる</button>
          )}
          <button className="primary-button" disabled={!canSave} onClick={onSave}><Save size={17} />ONにする</button>
        </div>
      </div>
    </div>
  );
}

function ProfileNameModal({ value, setValue, onClose, onSave }: {
  value: string;
  setValue: (value: string) => void;
  onClose: () => void;
  onSave: () => void | Promise<void>;
}) {
  const trimmed = value.trim();
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">ユーザー名変更</p>
            <p className="mt-1 text-xs text-moss">AI相談レポートのプロフィール名として使います。</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <label className="mt-4 block text-xs font-semibold">
          レポートに含める名前
          <input className="mt-1 w-full" value={value} onChange={(event) => setValue(event.target.value)} placeholder="例: Nick" />
        </label>
        <button className="primary-button mt-4 w-full" disabled={!trimmed} onClick={onSave}><Save size={17} />保存</button>
      </div>
    </div>
  );
}

function GoalHelpButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-line bg-rice text-[10px] font-black leading-none text-moss"
      aria-label={label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
    >
      ?
    </button>
  );
}

function GoalHelpModal({ topic, onClose }: { topic: GoalHelpTopic; onClose: () => void }) {
  const content = goalHelpContent(topic);
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/30 px-4 pb-4" onClick={onClose}>
      <div className="compact-card w-full p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold">{content.title}</p>
            <p className="mt-1 text-xs text-moss">{content.subtitle}</p>
          </div>
          <button className="icon-button h-9 w-9" aria-label="閉じる" onClick={onClose}>×</button>
        </div>
        <div className="mt-4 space-y-2 text-sm leading-relaxed text-moss">
          {content.items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function goalHelpContent(topic: GoalHelpTopic) {
  if (topic === "phase") {
    return {
      title: "フェーズの選び方",
      subtitle: "今いちばん優先したい体の変化を選びます。",
      items: [
        "減量/ゆる減量は、体脂肪を落とすことを優先します。ゆる減量は続けやすさ重視です。",
        "維持は、体重を大きく動かさず記録を安定させたい時に使います。",
        "リコンプは、体重より見た目や体組成を重視し、脂肪を抑えながら筋肉や筋力を伸ばしたい時に向いています。",
        "リーンバルク/筋力重視は、筋肉やトレーニング出力を伸ばすために少し多めに食べる方向です。",
      ],
    };
  }
  if (topic === "activity") {
    return {
      title: "運動強度の目安",
      subtitle: "筋トレだけでなく、仕事・移動・歩数など日常活動も含めます。",
      items: [
        "低め: 座り仕事や在宅中心で、運動日以外はあまり歩かない。",
        "普通: 日常でそこそこ歩く、または週2〜4回くらい運動する。",
        "高め: 立ち仕事・よく歩く生活、または週4〜6回しっかり運動する。",
        "かなり高い: 肉体労働や競技練習など、毎日の消費がかなり多い。",
        "迷ったら普通から始めて、2〜3週間の体重トレンドと体調で調整するのがおすすめです。",
      ],
    };
  }
  return {
    title: "目標体脂肪率について",
    subtitle: "体重だけでは見えない、脂肪量と除脂肪量の目標に使います。",
    items: [
      "リコンプやバルクでは、目標体重だけでなく脂肪量と除脂肪量の変化を見ると判断しやすくなります。",
      "わからなければ0のまま未指定でOKです。未指定でもカロリーやPFCの設定は使えます。",
      "体組成計の数値は水分量でぶれやすいので、単日ではなく週平均や月平均の傾向で見ます。",
      "目安に迷う場合は、AI相談レポートを作って「今の体重・体脂肪率なら目標体脂肪率は何%が現実的？」と聞いてみてください。",
    ],
  };
}

function PartialNumberInput({ label, value, step = 1, onChange }: { label: string; value: string; step?: number; onChange: (value: string) => void }) {
  const decimalPlaces = step.toString().includes(".") ? step.toString().split(".")[1].length : 0;
  const normalize = (nextValue: number) => String(Number(nextValue.toFixed(decimalPlaces)));
  const parsed = Number.parseFloat(value);
  const baseValue = Number.isFinite(parsed) ? parsed : 0;
  const commit = (nextValue: number) => {
    if (!Number.isFinite(nextValue)) return;
    onChange(normalize(nextValue));
  };
  return (
    <label className="text-xs font-semibold">
      {label}
      <div className="number-stepper mt-1">
        <button type="button" className="number-stepper-button" onClick={() => commit(baseValue - step)} aria-label={`${label}を減らす`}>
          <Minus size={14} />
        </button>
        <input
          className="number-stepper-input"
          inputMode="decimal"
          type="number"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="不明なら空欄"
        />
        <button type="button" className="number-stepper-button" onClick={() => commit(baseValue + step)} aria-label={`${label}を増やす`}>
          <Plus size={14} />
        </button>
      </div>
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

function SettingsMenuRow({ title, description, icon, onClick }: {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="settings-menu-row w-full px-4 py-3 text-left" onClick={onClick}>
      <span className="settings-menu-icon">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-ink">{title}</span>
        <span className="mt-0.5 block truncate text-xs font-semibold text-moss">{description}</span>
      </span>
      <ChevronRight className="shrink-0 text-muted" size={17} />
    </button>
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
  if (item.meal_type === "gym_before" || item.meal_type === "gym_after") return { icon: Dumbbell, tone: "leaf" as PictogramTone };
  if (item.meal_type === "breakfast") return { icon: Coffee, tone: "sky" as PictogramTone };
  return { icon: Utensils, tone: "moss" as PictogramTone };
}

function getWorkoutPictogram(bodyPart = "", equipmentType = "") {
  const text = `${bodyPart} ${equipmentType}`;
  if (/有酸素|バイク|トレッドミル|ランニング|ウォーキング|散歩|クロストレーナー|ローイング/.test(text)) return { icon: Bike, tone: "sky" as PictogramTone };
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
        <span className={`font-bold workout-goal-progress-value ${complete ? "workout-goal-progress-value-complete" : ""}`}>{done}/{target || "-"}</span>
      </div>
      <div className="workout-goal-progress-track mt-2 h-1.5 overflow-hidden rounded-full">
        <div className={`h-full rounded-full workout-goal-progress-fill ${complete ? "workout-goal-progress-fill-complete" : ""}`} style={{ width: `${percent}%` }} />
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

function isGeneralFoodMenuItem(item: MenuItem) {
  if (item.brand) return false;
  if (item.data_source === "quick_estimate" || item.data_source === "user") return false;
  if (commercialGeneralCategories.has(item.category)) return false;
  return Boolean(genericCategories[item.category]);
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

function buildPerfectFoodSuggestions(menuItems: MenuItem[], target: { calories: number; protein: number; fat: number; carbs: number }, plans: PerfectFoodPlan[], mode: PerfectFoodMode = "improve"): PerfectFoodSuggestionGroup[] {
  if (target.calories <= 0 && target.protein <= 0 && target.fat <= 0 && target.carbs <= 0) return [];
  const groups: { label: string; test: (item: MenuItem) => boolean }[] = [
    { label: "プロテイン・補給", test: (item) => item.category === "プロテイン" || item.tags.some((tag) => /プロテイン|サプリ|クレアチン|EAA|BCAA/.test(tag)) },
    { label: "コンビニ・市販", test: (item) => ["コンビニ", "冷凍食品"].includes(item.category) || ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"].includes(item.brand ?? "") },
    { label: "スナック・甘味", test: (item) => item.category === "スイーツ" || item.tags.some((tag) => /スナック|菓子|チョコ|グミ|アイス|ドーナツ|プリン/.test(tag)) },
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
        .sort((a, b) => perfectFoodScore(a, target, mode) - perfectFoodScore(b, target, mode))),
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

function perfectFoodScore(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }, mode: PerfectFoodMode = "improve") {
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
  const improveScore = (
    calorieScore * 0.72 +
    proteinShortageScore * 0.56 +
    proteinCoverageBonus +
    fatOverPenalty * 2.5 +
    carbsOverPenalty * 2.1 +
    calorieOverPenalty * 1.8 +
    loadPenalty +
    sourceBonus
  );
  if (mode === "fit") {
    const fitOverPenalty = (balance.calorieOver / Math.max(80, target.calories * 0.12 || 160)) * 4.5
      + (balance.fatOver / Math.max(2, target.fat * 0.14 || 4)) * 4.2
      + (balance.carbsOver / Math.max(6, target.carbs * 0.14 || 12)) * 3.8;
    const usefulLoadBonus = Math.abs(balance.nonProteinLoad - 0.58) * 0.42;
    return improveScore + fitOverPenalty + usefulLoadBonus;
  }
  return improveScore;
}

function buildFoodUsageMap(foodEntries: FoodEntry[]) {
  const map = new Map<string, number>();
  foodEntries.forEach((entry) => {
    if (entry.menu_item_id) map.set(entry.menu_item_id, (map.get(entry.menu_item_id) ?? 0) + 1);
    const textKey = foodUsageTextKey(entry.brand, entry.name);
    map.set(textKey, (map.get(textKey) ?? 0) + 1);
  });
  return map;
}

function foodUsageTextKey(brand?: string, name?: string) {
  return `${brand ?? ""}::${(name ?? "").replace(/（.*?）|\(.*?\)/g, "").trim()}`;
}

function chainComboUsageBoost(item: MenuItem, usageMap: Map<string, number>) {
  const count = (usageMap.get(item.id) ?? 0) + (usageMap.get(foodUsageTextKey(item.brand, item.name)) ?? 0);
  return Math.min(0.5, count * 0.08) + (item.is_favorite ? 0.22 : 0);
}

function isChainComboSideItem(item: MenuItem) {
  const text = [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  const mainLike = /ステーキ|ハンバーグ|バーグ|丼|定食|弁当|カレー|ラーメン|油そば|うどん|そば|パスタ|つけ麺|焼きそば|ハンバーガー|バーガー|サンド|プレート|ディッシュ/.test(text);
  const explicitSide = /ライス・スープセット|ライスセット|スープセット|サラダセット|セットドリンク|トッピング|追加|サイド|単品/.test(text);
  if (mainLike && item.calories >= 380 && !explicitSide) return false;
  if (/ライス・スープセット|ライスセット|スープセット|サラダセット|セットドリンク/.test(text)) return true;
  if (/トッピング|追加|サイド|単品|ライス|ご飯|白米|スープ|味噌汁|みそ汁|サラダ|小鉢|味玉|玉子|卵|チーズ|ポテト|ナゲット|からあげ|唐揚げ|餃子|天ぷら|かしわ天|ちくわ天|かき揚げ|コロッケ|デザート|ドリンク|ソース/.test(text)) return true;
  return item.calories > 0 && item.calories <= 220 && item.protein_g < 18;
}

function isChainComboMainItem(item: MenuItem) {
  if (item.calories <= 0) return false;
  if (isChainComboSideItem(item) && item.calories < 420) return false;
  const text = [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  if (/ステーキ|ハンバーグ|バーグ|丼|定食|弁当|カレー|ラーメン|油そば|うどん|そば|パスタ|つけ麺|焼きそば|ハンバーガー|バーガー|サンド|プレート|ディッシュ|セット/.test(text)) return true;
  return item.calories >= 320;
}

function buildChainComboSuggestions({ menuItems, variantIndex, remainingNutrition, usageMap, selectedMain }: {
  menuItems: MenuItem[];
  variantIndex: MenuSizeVariantIndex;
  remainingNutrition: { calories: number; protein: number; fat: number; carbs: number };
  usageMap: Map<string, number>;
  selectedMain?: MenuItem;
}): ChainComboSuggestion[] {
  if (remainingNutrition.calories <= 0 && remainingNutrition.protein <= 0 && remainingNutrition.fat <= 0 && remainingNutrition.carbs <= 0) return [];
  const mainItems = selectedMain
    ? [selectedMain]
    : menuItems
      .filter(isChainComboMainItem)
      .sort((a, b) => chainComboUsageBoost(b, usageMap) - chainComboUsageBoost(a, usageMap) || b.protein_g - a.protein_g || a.calories - b.calories)
      .slice(0, 30);
  const sideItems = menuItems
    .filter((item) => item.id !== selectedMain?.id && isChainComboSideItem(item))
    .sort((a, b) => chainComboSideScore(a, remainingNutrition, usageMap) - chainComboSideScore(b, remainingNutrition, usageMap))
    .slice(0, 28);
  const mainCandidates = mainItems.flatMap((item) => buildChainComboCandidateVariants(item, "main", variantIndex)).slice(0, selectedMain ? 8 : 84);
  const sideCandidates = sideItems.flatMap((item) => buildChainComboCandidateVariants(item, "side", variantIndex)).filter((candidate) => candidate.nutrition.calories > 0).slice(0, 48);
  const combos: ChainComboCandidate[][] = [];

  mainCandidates.forEach((main) => {
    combos.push([main]);
    sideCandidates.slice(0, 24).forEach((side) => {
      if (side.item.id !== main.item.id) combos.push([main, side]);
    });
    sideCandidates.slice(0, 12).forEach((first, firstIndex) => {
      sideCandidates.slice(firstIndex + 1, firstIndex + 8).forEach((second) => {
        if (first.item.id !== second.item.id && first.item.id !== main.item.id && second.item.id !== main.item.id) {
          combos.push([main, first, second]);
        }
      });
    });
  });

  const seen = new Set<string>();
  const seenDisplay = new Set<string>();
  const seenNutritionShape = new Set<string>();
  return combos
    .map((items) => {
      const nutrition = sumChainComboNutrition(items);
      const remainingAfter = {
        calories: remainingNutrition.calories - nutrition.calories,
        protein: remainingNutrition.protein - nutrition.protein_g,
        fat: remainingNutrition.fat - nutrition.fat_g,
        carbs: remainingNutrition.carbs - nutrition.carbs_g,
      };
      const id = items.map((item) => `${item.item.id}:${item.portionLabel ?? "base"}`).join("|");
      const score = scoreChainCombo(items, nutrition, remainingAfter, remainingNutrition, usageMap, Boolean(selectedMain));
      const sizeHint = items.find((item) => item.portionLabel && !/普通|標準|1人前|1個|肉450g/.test(item.portionLabel));
      return {
        id,
        title: items.map(formatChainComboCandidateDisplayName).join(" + "),
        reason: sizeHint ? `${sizeHint.portionLabel}が合いそう` : items.length >= 2 ? "メイン+追加" : "単品で近い",
        score,
        items,
        nutrition,
        remainingAfter,
      } satisfies ChainComboSuggestion;
    })
    .filter((suggestion) => {
      if (seen.has(suggestion.id)) return false;
      const displayKey = [
        suggestion.items.map((item) => `${formatMenuItemName(item.item)}:${item.portionLabel ?? ""}`).join("|"),
        suggestion.nutrition.calories,
        round1(suggestion.nutrition.protein_g),
        round1(suggestion.nutrition.fat_g),
        round1(suggestion.nutrition.carbs_g),
      ].join("::");
      if (seenDisplay.has(displayKey)) return false;
      const nutritionShapeKey = [
        suggestion.items.map((item) => `${item.role}:${item.portionLabel ?? ""}:${item.nutrition.calories}:${round1(item.nutrition.protein_g)}:${round1(item.nutrition.fat_g)}:${round1(item.nutrition.carbs_g)}`).join("|"),
        suggestion.nutrition.calories,
        round1(suggestion.nutrition.protein_g),
        round1(suggestion.nutrition.fat_g),
        round1(suggestion.nutrition.carbs_g),
      ].join("::");
      if (seenNutritionShape.has(nutritionShapeKey)) return false;
      seen.add(suggestion.id);
      seenDisplay.add(displayKey);
      seenNutritionShape.add(nutritionShapeKey);
      return suggestion.nutrition.calories > 0;
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 18);
}

function buildChainComboCandidateVariants(item: MenuItem, role: ChainComboCandidate["role"], variantIndex: MenuSizeVariantIndex): ChainComboCandidate[] {
  const base = makeChainComboCandidate(item, role, 1, undefined, undefined);
  const exactSizeVariants = getExactChainComboSizeVariantCandidates(item, role, variantIndex);
  if (exactSizeVariants.length > 1) {
    return exactSizeVariants.slice(0, role === "main" ? 7 : 4);
  }
  if (role === "side") {
    return [base];
  }
  const staples = getStaplePortionConfigs(item);
  if (staples.length > 1) {
    const variants = staples.flatMap((staple) => (
      getTrustedChainComboPortionOptions(item, staple)
        .filter((option) => option.value > 0 && option.value !== 1)
        .slice(0, 3)
        .map((option) => makeChainComboCandidate(item, role, 1, { [staple.kind]: option.value }, option.label))
    ));
    return [base, ...variants].slice(0, 7);
  }
  const options = staples.flatMap((staple) => getTrustedChainComboPortionOptions(item, staple))
    .filter((option) => option.value > 0 && option.value !== 1)
    .slice(0, 5);
  const variants = options.map((option) => makeChainComboCandidate(item, role, option.value, undefined, option.label));
  return [base, ...variants].slice(0, 6);
}

function getExactChainComboSizeVariantCandidates(item: MenuItem, role: ChainComboCandidate["role"], variantIndex: MenuSizeVariantIndex) {
  const selectedVariant = variantIndex.variantsByItemId.get(item.id);
  if (!selectedVariant) return [];
  const variants = variantIndex.variantsByGroupKey.get(selectedVariant.groupKey) ?? [];
  if (variants.length <= 1) return [];
  return sortMenuSizeVariants(variants)
    .filter((variant) => variant.item.calories > 0)
    .map((variant) => makeChainComboCandidate(variant.item, role, 1, undefined, variant.label));
}

function getTrustedChainComboPortionOptions(item: MenuItem, staple: StaplePortionConfig): PortionOption[] {
  const base = Math.max(1, staple.defaultGrams);
  if (item.brand === "すぱじろう" && staple.kind === "noodle") {
    return [
      { label: "S 乾麺100g", value: 100 / base },
      { label: "M 乾麺120g", value: 120 / base },
      { label: "L 乾麺170g", value: 170 / base },
      { label: "XL 乾麺240g", value: 240 / base },
    ];
  }
  return [];
}

function makeChainComboCandidate(item: MenuItem, role: ChainComboCandidate["role"], portionMultiplier: number, staplePortionMultipliers?: StaplePortionMultipliers, portionLabel?: string): ChainComboCandidate {
  const effectivePortionMultiplier = isMisoSoupSwitchItem(item) && !staplePortionMultipliers ? 0 : portionMultiplier;
  return {
    item,
    role,
    portionLabel,
    portionMultiplier: effectivePortionMultiplier,
    staplePortionMultipliers,
    nutrition: getAdjustedMenuNutrition(item, effectivePortionMultiplier, 1, staplePortionMultipliers),
  };
}

function formatChainComboCandidateDisplayName(candidate: ChainComboCandidate) {
  const baseName = formatMenuItemName(candidate.item);
  const label = candidate.portionLabel?.trim();
  if (!label || /^(普通|標準量|普通量|1人前|1個|1トッピング|1回分)$/.test(label)) return baseName;
  if (/（.*?）|\(.*?\)/.test(baseName)) return baseName.replace(/（.*?）|\(.*?\)/, `（${label}）`);
  return `${baseName}（${label}）`;
}

function sumChainComboNutrition(items: ChainComboCandidate[]): NutritionSnapshot {
  return items.reduce<NutritionSnapshot>((sum, item) => ({
    calories: sum.calories + item.nutrition.calories,
    protein_g: round1(sum.protein_g + item.nutrition.protein_g),
    fat_g: round1(sum.fat_g + item.nutrition.fat_g),
    carbs_g: round1(sum.carbs_g + item.nutrition.carbs_g),
    salt_g: item.nutrition.salt_g === undefined && sum.salt_g === undefined ? undefined : round1((sum.salt_g ?? 0) + (item.nutrition.salt_g ?? 0)),
  }), { calories: 0, protein_g: 0, fat_g: 0, carbs_g: 0, salt_g: undefined });
}

function chainComboSideScore(item: MenuItem, target: { calories: number; protein: number; fat: number; carbs: number }, usageMap: Map<string, number>) {
  const proteinEfficiency = item.calories > 0 ? item.protein_g / item.calories : 0;
  const fitScore = perfectFoodScore(item, target, "improve");
  return fitScore - proteinEfficiency * 1.8 - chainComboUsageBoost(item, usageMap);
}

function scoreChainCombo(items: ChainComboCandidate[], nutrition: NutritionSnapshot, remainingAfter: { calories: number; protein: number; fat: number; carbs: number }, target: { calories: number; protein: number; fat: number; carbs: number }, usageMap: Map<string, number>, hasSelectedMain: boolean) {
  const calorieTarget = Math.max(260, Math.min(target.calories || nutrition.calories, hasSelectedMain ? 980 : 1120));
  const calorieScore = Math.abs(nutrition.calories - calorieTarget) / calorieTarget;
  const proteinShortage = Math.max(0, remainingAfter.protein) / Math.max(18, target.protein || 18);
  const proteinCoverageBonus = target.protein > 0 ? Math.min(nutrition.protein_g / target.protein, 1) * -0.58 : Math.min(nutrition.protein_g / 45, 1) * -0.28;
  const calorieOver = Math.max(0, -remainingAfter.calories) / Math.max(140, target.calories * 0.14 || 220);
  const fatOver = Math.max(0, -remainingAfter.fat) / Math.max(4, target.fat * 0.18 || 8);
  const carbOver = Math.max(0, -remainingAfter.carbs) / Math.max(10, target.carbs * 0.18 || 24);
  const comboBonus = items.length >= 2 ? -0.18 : hasSelectedMain ? 0.1 : 0.22;
  const tooManySidesPenalty = items.length > 2 ? 0.12 : 0;
  const usageBonus = items.reduce((sum, item) => sum + chainComboUsageBoost(item.item, usageMap), 0) * -0.18;
  const sourcePenalty = items.reduce((sum, item) => sum + sourceRank(item.item.data_source) * 0.025, 0);
  return calorieScore * 0.72
    + proteinShortage * 0.62
    + proteinCoverageBonus
    + calorieOver * 2.2
    + fatOver * 2.7
    + carbOver * 2.2
    + comboBonus
    + tooManySidesPenalty
    + usageBonus
    + sourcePenalty;
}

function formatChainComboRemainingChips(remaining: { calories: number; protein: number; fat: number; carbs: number }) {
  return [
    remaining.calories < -25
      ? { label: `kcal超過${Math.round(Math.abs(remaining.calories))}`, tone: "over" as const }
      : { label: `残り${Math.max(0, Math.round(remaining.calories))}kcal`, tone: remaining.calories <= 100 ? "warn" as const : "ok" as const },
    remaining.protein > 0.5
      ? { label: `Pあと${round1(remaining.protein)}g`, tone: "protein" as const }
      : { label: "P残り0g", tone: "ok" as const },
    remaining.fat < -0.5
      ? { label: `F超過${round1(Math.abs(remaining.fat))}g`, tone: "over" as const }
      : { label: `F残り${round1(Math.max(0, remaining.fat))}g`, tone: remaining.fat <= 3 ? "warn" as const : "ok" as const },
    remaining.carbs < -0.5
      ? { label: `C超過${round1(Math.abs(remaining.carbs))}g`, tone: "over" as const }
      : { label: `C残り${round1(Math.max(0, remaining.carbs))}g`, tone: remaining.carbs <= 10 ? "warn" as const : "ok" as const },
  ];
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
    <button className={`tab-button ${active ? "tab-button-active" : ""}`} aria-current={active ? "page" : undefined} onClick={onClick}>
      <span className="tab-button-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function isCardioWorkoutItem(item: { body_part: string; equipment_type: string }) {
  return item.body_part === "有酸素" || item.equipment_type === "有酸素";
}

function isBodyweightStrengthItem(item: { body_part: string; equipment_type: string }) {
  return !isCardioWorkoutItem(item) && /自重|自宅/.test(item.equipment_type);
}

function formatWorkoutLoadLabel(weight: number | undefined, loadType?: WorkoutLoadType) {
  if (loadType === "bodyweight") return "自重";
  const normalized = formatControlValue(Math.max(0, weight ?? 0));
  if (loadType === "weighted") return `+${normalized}kg`;
  if (loadType === "assisted") return `補助${normalized}kg`;
  return `${normalized}kg`;
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

  if (/自重/.test(target)) {
    const repeat = Math.max(1, Math.min(10, Math.round(numbers[1] ?? 1)));
    return Array.from({ length: repeat }, () => ({
      load_type: "bodyweight" as const,
      reps: Math.round(numbers[0]),
      intensity,
      note,
    }));
  }

  if (numbers.length < 2) return [];
  const repeat = Math.max(1, Math.min(10, Math.round(numbers[2] ?? 1)));
  const loadType = /補助|アシスト/.test(target) ? "assisted" : /加重|\+/.test(target) ? "weighted" : undefined;
  return Array.from({ length: repeat }, () => ({
    weight_kg: numbers[0],
    load_type: loadType,
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
      load_type: set.load_type,
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
    load_type: pattern.load_type,
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
  const loadType = exercise.load_type ?? exercise.set_scheme?.[0]?.load_type;
  return `${formatWorkoutLoadLabel(exercise.weight_kg ?? exercise.set_scheme?.[0]?.weight_kg, loadType)}×${exercise.reps ?? exercise.set_scheme?.[0]?.reps ?? 10}×${exercise.set_scheme?.length || exercise.sets || 3}`;
}

function formatWorkoutSetText(sets: WorkoutSet[], isCardio: boolean) {
  return formatWorkoutSetPatternText(workoutSetsToPattern(sets), isCardio);
}

function formatWorkoutSetPatternToken(pattern: WorkoutSetPattern, isCardio: boolean) {
  const label = isFinisherPulseSet(pattern) ? "仕上げパルス" : pattern.note;
  if (isCardio || typeof pattern.duration_min === "number") {
    return `${pattern.duration_min ?? 0}分${label ? `（${label}）` : ""}`;
  }
  return `${formatWorkoutLoadLabel(pattern.weight_kg, pattern.load_type)}×${pattern.reps ?? 0}${label ? `（${label}）` : ""}`;
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
      load_type: pattern.load_type,
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
  const session = await db.workout_sessions.get(sessionId);
  if (session) {
    const bodyParts = [...new Set([...session.body_parts, item.body_part])];
    const hasCardio = bodyParts.includes("有酸素");
    const hasStrength = bodyParts.some((part) => part !== "有酸素");
    await db.workout_sessions.update(sessionId, {
      body_parts: bodyParts,
      workout_type: hasCardio && hasStrength ? "mixed" : hasCardio ? "cardio" : "strength",
      updated_at: timestamp,
    });
  }
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
      load_type: pattern.load_type,
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
      load_type: options.preferItemValues ? item.load_type ?? previous?.load_type : previous?.load_type ?? item.load_type,
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
  "散歩（ゆっくり）": 2.8,
  "散歩（普通）": 3.5,
  "散歩（早歩き）": 4.3,
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
      const score = set.load_type === "assisted" ? reps - weight / 10 : weight ? weight * (1 + reps / 30) : reps;
      return {
        score,
        label: `${formatWorkoutLoadLabel(weight, set.load_type)} x ${reps || "-"}回`,
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

function formatSignedNumber(value: number) {
  const rounded = round1(value);
  if (rounded > 0) return `+${rounded}`;
  if (rounded < 0) return `${rounded}`;
  return "±0";
}

function movingAverage(logs: WeightLog[], count: number) {
  return movingAverageValue(logs, count, (log) => log.weight_kg);
}

function movingAverageValue(logs: WeightLog[], count: number, getValue: (log: WeightLog) => number | undefined) {
  const recent = logs
    .map(getValue)
    .filter((value): value is number => typeof value === "number")
    .slice(-count);
  if (!recent.length) return undefined;
  return round1(recent.reduce((sum, value) => sum + value, 0) / recent.length);
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

function historyGroupingLabel(grouping: HistoryGrouping) {
  return { day: "日別", week: "週別", month: "月別" }[grouping];
}

function logExportTypeLabel(type: LogExportType) {
  return {
    food: "食事ログのみ",
    workout: "ワークアウトログのみ",
    food_workout: "食事とワークアウトログ",
  }[type];
}

function normalizeDatePeriod(startDate: string, endDate: string) {
  return startDate <= endDate ? { start: startDate, end: endDate } : { start: endDate, end: startDate };
}

function logGroupKey(dateString: string, grouping: HistoryGrouping) {
  if (grouping === "week") return weekKey(dateString);
  if (grouping === "month") return monthKey(dateString);
  return dateString;
}

function logGroupLabel(key: string, grouping: HistoryGrouping) {
  if (grouping === "week") return formatWeekLabel(key);
  if (grouping === "month") return formatMonthLabel(key);
  return formatJapaneseDate(key);
}

function buildLogExport(input: {
  type: LogExportType;
  grouping: HistoryGrouping;
  startDate: string;
  endDate: string;
  foodEntries: FoodEntry[];
  menuItems: MenuItem[];
  workoutSessions: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  workoutSets: WorkoutSet[];
}): LogExportResult {
  const { start, end } = normalizeDatePeriod(input.startDate, input.endDate);
  const includeFood = input.type === "food" || input.type === "food_workout";
  const includeWorkout = input.type === "workout" || input.type === "food_workout";
  const foodEntries = includeFood
    ? input.foodEntries
      .filter((entry) => entry.app_date >= start && entry.app_date <= end)
      .sort((a, b) => `${a.app_date} ${a.logged_at}`.localeCompare(`${b.app_date} ${b.logged_at}`))
    : [];
  const workoutSessions = includeWorkout
    ? input.workoutSessions
      .filter((session) => session.app_date >= start && session.app_date <= end)
      .sort((a, b) => `${a.app_date} ${a.logged_at}`.localeCompare(`${b.app_date} ${b.logged_at}`))
    : [];
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  input.workoutExercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });
  exercisesBySession.forEach((items, sessionId) => {
    exercisesBySession.set(sessionId, [...items].sort((a, b) => a.order - b.order));
  });
  const setsByExercise = new Map<string, WorkoutSet[]>();
  input.workoutSets.forEach((set) => {
    setsByExercise.set(set.workout_exercise_id, [...(setsByExercise.get(set.workout_exercise_id) ?? []), set]);
  });
  setsByExercise.forEach((items, exerciseId) => {
    setsByExercise.set(exerciseId, [...items].sort((a, b) => a.set_order - b.set_order));
  });

  const groupKeys = new Set<string>();
  foodEntries.forEach((entry) => groupKeys.add(logGroupKey(entry.app_date, input.grouping)));
  workoutSessions.forEach((session) => groupKeys.add(logGroupKey(session.app_date, input.grouping)));
  const sortedGroupKeys = [...groupKeys].sort();
  const csvRows: string[][] = [["group", "date", "log_type", "meal_or_session", "item", "detail", "calories", "protein_g", "fat_g", "carbs_g", "weight_kg", "reps", "duration_min", "note"]];
  const textLines = [
    `100% トラッカー ログ出力`,
    `種類: ${logExportTypeLabel(input.type)}`,
    `集計: ${historyGroupingLabel(input.grouping)}`,
    `期間: ${formatJapaneseDate(start)} - ${formatJapaneseDate(end)}`,
    "",
  ];
  const mdLines = [
    `# 100% トラッカー ログ出力`,
    "",
    `- 種類: ${logExportTypeLabel(input.type)}`,
    `- 集計: ${historyGroupingLabel(input.grouping)}`,
    `- 期間: ${formatJapaneseDate(start)} - ${formatJapaneseDate(end)}`,
    "",
  ];

  if (!sortedGroupKeys.length) {
    textLines.push("対象期間のログはありません。");
    mdLines.push("対象期間のログはありません。");
  }

  sortedGroupKeys.forEach((key) => {
    const groupLabel = logGroupLabel(key, input.grouping);
    const groupFood = foodEntries.filter((entry) => logGroupKey(entry.app_date, input.grouping) === key);
    const groupWorkouts = workoutSessions.filter((session) => logGroupKey(session.app_date, input.grouping) === key);
    textLines.push(`## ${groupLabel}`);
    mdLines.push(`## ${groupLabel}`);

    if (includeFood) {
      textLines.push(`食事ログ (${groupFood.length}件)`);
      mdLines.push(`### 食事ログ (${groupFood.length}件)`);
      if (!groupFood.length) {
        textLines.push("- なし");
        mdLines.push("- なし");
      }
      groupFood.forEach((entry) => {
        const name = formatFoodEntryName(entry, input.menuItems);
        const meal = mealLabels[entry.meal_type];
        const nutrition = `${entry.calories}kcal P${entry.protein_g} F${entry.fat_g} C${entry.carbs_g}${entry.salt_g !== undefined ? ` 塩分${entry.salt_g}g` : ""}`;
        const line = `- ${formatJapaneseDate(entry.app_date)} ${meal}: ${name} / ${nutrition}`;
        textLines.push(line);
        mdLines.push(line);
        csvRows.push([groupLabel, entry.app_date, "food", meal, name, nutrition, String(entry.calories), String(entry.protein_g), String(entry.fat_g), String(entry.carbs_g), "", "", "", entry.note ?? ""]);
      });
    }

    if (includeWorkout) {
      textLines.push(`ワークアウトログ (${groupWorkouts.length}件)`);
      mdLines.push(`### ワークアウトログ (${groupWorkouts.length}件)`);
      if (!groupWorkouts.length) {
        textLines.push("- なし");
        mdLines.push("- なし");
      }
      groupWorkouts.forEach((session) => {
        const sessionExercises = exercisesBySession.get(session.id) ?? [];
        const sessionLine = `- ${formatJapaneseDate(session.app_date)} ${session.title} (${sessionExercises.length}種目)`;
        textLines.push(sessionLine);
        mdLines.push(sessionLine);
        if (!sessionExercises.length) {
          csvRows.push([groupLabel, session.app_date, "workout", session.title, "", "種目なし", "", "", "", "", "", "", "", session.note ?? ""]);
        }
        sessionExercises.forEach((exercise) => {
          const sets = setsByExercise.get(exercise.id) ?? [];
          const detail = sets.length ? sets.map(formatWorkoutSetExportLabel).join(" / ") : "セットなし";
          textLines.push(`  - ${exercise.exercise_name}: ${detail}`);
          mdLines.push(`  - ${exercise.exercise_name}: ${detail}`);
          if (!sets.length) {
            csvRows.push([groupLabel, session.app_date, "workout", session.title, exercise.exercise_name, "セットなし", "", "", "", "", "", "", "", exercise.note ?? session.note ?? ""]);
          }
          sets.forEach((set) => {
            csvRows.push([
              groupLabel,
              session.app_date,
              "workout",
              session.title,
              exercise.exercise_name,
              `set ${set.set_order}${set.is_warmup ? " warmup" : ""}`,
              set.active_calories === undefined ? "" : String(set.active_calories),
              "",
              "",
              "",
              set.weight_kg === undefined ? "" : String(set.weight_kg),
              set.reps === undefined ? "" : String(set.reps),
              set.duration_min === undefined ? "" : String(set.duration_min),
              unique([set.note ?? "", exercise.note ?? "", session.note ?? ""]).join(" / "),
            ]);
          });
        });
      });
    }
    textLines.push("");
    mdLines.push("");
  });

  const basename = `100-percent-tracker-log-${input.type}-${input.grouping}-${start}_${end}`;
  const summary = `${logExportTypeLabel(input.type)} / ${historyGroupingLabel(input.grouping)} / ${formatJapaneseDate(start)} - ${formatJapaneseDate(end)} / 食事${foodEntries.length}件・ワークアウト${workoutSessions.length}件`;
  return {
    text: textLines.join("\n").trimEnd(),
    markdown: mdLines.join("\n").trimEnd(),
    csv: csvRows.map((row) => row.map(escapeCsvCell).join(",")).join("\n"),
    basename,
    summary,
  };
}

function formatWorkoutSetExportLabel(set: WorkoutSet) {
  if (set.duration_min !== undefined || set.active_calories !== undefined) {
    return `${set.set_order}: ${set.duration_min ?? 0}分${set.active_calories !== undefined ? ` / ${set.active_calories}kcal` : ""}${set.is_warmup ? " (WU)" : ""}`;
  }
  return `${set.set_order}: ${formatWorkoutLoadLabel(set.weight_kg ?? 0, set.load_type)} x ${set.reps ?? "-"}回${set.is_warmup ? " (WU)" : ""}`;
}

function escapeCsvCell(value: string) {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
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

function formatFoodAmountValue(value: number) {
  if (Number.isInteger(value)) return String(value);
  const rounded = Math.round(value * 100) / 100;
  return rounded.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
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

function workoutWeightPresetKeys(item: { id?: string; exercise_id?: string; name?: string; exercise_name?: string; body_part: string; equipment_type: string }) {
  const name = item.name ?? item.exercise_name ?? "";
  const stableKey = ["exercise", name, item.body_part, item.equipment_type]
    .map((value) => value.trim().toLowerCase())
    .join("|");
  return unique([item.id ?? "", item.exercise_id ?? "", stableKey]);
}

function normalizeWorkoutWeightPresetStore(input: unknown): Record<string, number[]> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input as Record<string, unknown>).flatMap(([key, value]) => {
    if (!key || !Array.isArray(value)) return [];
    const presets = value
      .map((item) => typeof item === "number" && Number.isFinite(item) ? round1(Math.max(0, item)) : undefined)
      .filter((item): item is number => typeof item === "number")
      .slice(0, 5);
    return presets.length ? [[key, presets]] : [];
  }));
}

function readLocalWorkoutWeightPresetStore() {
  try {
    return normalizeWorkoutWeightPresetStore(JSON.parse(localStorage.getItem(workoutWeightPresetStorageKey) || "{}"));
  } catch {
    return {};
  }
}

function writeLocalWorkoutWeightPresetStore(store: Record<string, number[]>) {
  try {
    localStorage.setItem(workoutWeightPresetStorageKey, JSON.stringify(normalizeWorkoutWeightPresetStore(store)));
  } catch {
    // 操作補助の保存なので、失敗しても記録自体は止めない。
  }
}

function mergeWorkoutWeightPresetStores(...stores: Array<unknown>) {
  return stores.reduce<Record<string, number[]>>((merged, store) => ({ ...merged, ...normalizeWorkoutWeightPresetStore(store) }), {});
}

function workoutWeightPresetStoresEqual(a: unknown, b: unknown) {
  const normalizeForCompare = (store: unknown) => {
    const normalized = normalizeWorkoutWeightPresetStore(store);
    return JSON.stringify(Object.keys(normalized).sort().map((key) => [key, normalized[key]]));
  };
  return normalizeForCompare(a) === normalizeForCompare(b);
}

async function persistWorkoutWeightPresetStore(store: Record<string, number[]>, settings?: AppSettings) {
  const normalized = normalizeWorkoutWeightPresetStore(store);
  writeLocalWorkoutWeightPresetStore(normalized);
  const timestamp = nowIso();
  if (settings) {
    await db.settings.update("local", { workout_weight_presets: normalized, updated_at: timestamp });
    return;
  }
  const current = await db.settings.get("local");
  if (current) {
    await db.settings.update("local", { workout_weight_presets: normalized, updated_at: timestamp });
    return;
  }
  await db.settings.put({
    id: "local",
    day_boundary_hour: 3,
    onboarding_completed: true,
    theme_mode: "system",
    theme_accent: "classic",
    workout_weight_presets: normalized,
    created_at: timestamp,
    updated_at: timestamp,
  });
}

function loadWorkoutWeightPresets(exerciseKeys: string | string[], currentWeight: number, step: number, presetStore?: Record<string, number[]>) {
  const fallback = defaultWorkoutWeightPresets(currentWeight, step);
  try {
    const parsed = mergeWorkoutWeightPresetStores(readLocalWorkoutWeightPresetStore(), presetStore);
    const keys = Array.isArray(exerciseKeys) ? exerciseKeys : [exerciseKeys];
    const values = keys.map((key) => parsed[key]).find(Array.isArray);
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

function saveWorkoutWeightPresets(exerciseKeys: string | string[], presets: number[], presetStore?: Record<string, number[]>) {
  try {
    const parsed = mergeWorkoutWeightPresetStores(readLocalWorkoutWeightPresetStore(), presetStore);
    const keys = Array.isArray(exerciseKeys) ? exerciseKeys : [exerciseKeys];
    const normalized = presets.slice(0, 5);
    keys.filter(Boolean).forEach((key) => {
      parsed[key] = normalized;
    });
    writeLocalWorkoutWeightPresetStore(parsed);
    return parsed;
  } catch {
    // 操作補助の保存なので、失敗しても記録自体は止めない。
    return normalizeWorkoutWeightPresetStore(presetStore);
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

const aiFoodImportPrompt = `あなたは食事写真・バーコード・食品パッケージ・栄養成分表示から、食事記録アプリ「100% トラッカー」へ取り込むための照合材料を作るアシスタントです。

目的:
- 写真に写っている食品を推定する
- 食事全体の写真では、白米、味噌汁、主菜、副菜、飲み物などを1皿・1食品ごとにできるだけ分解して items に分ける
- 外食・チェーン店・コンビニ・市販食品の可能性があれば、ブランド名や商品名候補を出す
- 栄養値は分かる範囲で推定する
- 最終保存データではなく、アプリ側で既存DBと照合するための材料を返す

注意:
- このプロンプトだけで写真・バーコード・栄養成分表示が添付されていない場合は、JSONを作らず「写真、バーコード、または栄養成分表示を添付してください。」とだけ返す
- 画像だけで店名や商品名が不確かな場合、断定せず possible_brand / possible_menu_name に候補として入れる。possible_menu_name は照合候補であり、正式名称として断定しない
- 料理が複数見える場合は、原則として1つの items 要素にまとめず、食品ごとに分ける
- チェーン店の公式セットメニューとして特定できる場合は、possible_menu_name にセット名候補を入れつつ、note に「分解候補: 白米 / 味噌汁 / 主菜 ...」のように残す
- 逆に自炊・一般的な定食・弁当のように公式セット名が不明な場合は、セット名1件ではなく分解した複数 items を優先する
- 外食っぽい場合は、店名・レシート・メニュー名・サイズなど追加確認が必要なら needs_confirmation に入れる
- バーコードや栄養成分表示が読める場合は、その情報を優先する
- 写真・バーコード・栄養成分表示・ユーザーコメントから店名、チェーン名、商品名、メニュー名、サイズが特定できた場合は、可能であれば公式サイト、公式PDF、公式商品ページ、公式栄養成分表など一次情報を検索し、公式の栄養値を nutrition_candidate に反映する
- 公式ソースを使えた場合は note に「公式栄養値参照: ソース名またはURL」のように短く残す。公式でkcalだけ分かりP/F/Cが不明な場合は、kcalは公式値、P/F/Cは推定であることを note に明記する
- 公式ソースが見つからない、または商品・サイズが断定できない場合は、公式値として扱わず推定値にし、needs_confirmation と note に不足情報を残す
- 同じチャットで新しい写真・バーコード・栄養成分表示が添付された場合は、前回の食品候補を引き継がず、新しいメニューとして最初から分析し直す
- 返答の最初に、\`\`\`json から始まる取り込み用コードブロックを1つ出す。AIツールのコピーボタンでそのままコピーできる形にする
- JSONコードブロック内には説明文やコメントを入れない
- JSONコードブロックの後に「今回はこう読み取りました。」として、各itemsの候補名・ブランド候補・量・kcal/P/F/C・信頼度・確認が必要な点を人間向けに短く箇条書きする
- 最後に「修正がなければ上のコードブロックをコピーして100% トラッカーに戻してください。修正がある場合は、どの項目をどう直すか教えてください。修正版のコードブロックを再生成します。次のメニューを分析するには、新しく写真・バーコード・栄養成分表示を添付してください。」と案内する
- ユーザーから修正が来た場合は、修正内容を反映したJSONコードブロックを再生成し、同じ形式で読み取り要約も更新する
- 数値不明でも calories / protein_g / fat_g / carbs_g は推定値を入れる
- nutrition_candidate はアプリに渡す候補値。幅やレンジではなく、根拠を踏まえた単一値を入れる。アプリで保存された数値が日々の計算の採用値になり、あとから自動補正されない
- nutrition_meta.nutrient_evidence で kcal / P / F / C を必ず個別に明記する。公式kcal・推定PFCのような混在では、kcalだけ exact、P/F/C は estimated にする
- 公式サイト・商品ラベル・ユーザー実測の栄養素だけ estimation_policy を exact にする。derived_calculation は、確定値同士の単純な合算・倍率計算で components を示せる場合だけ exact。それ以外は estimated にする
- 推定幅は各栄養素の uncertainty.plus / minus に絶対値で入れる。公式確認済み栄養素は 0 にする。採用値はアプリ側で自動補正しない
- 商品ラベルの栄養値が確定でも、食べた量だけが推定の場合は nutrition_meta.quantity_meta に estimated と推定量・推定幅を入れる。栄養素そのものを推定値扱いにしない
- 複数メニューや追加トッピングの合計は components に親商品・追加分を分け、公式値の根拠を残す

返却フォーマット:
\`\`\`json
{
  "type": "food_ai_bridge_v3",
  "items": [
    {
      "observed_name": "写真から見えた食事名",
      "possible_brand": "店名・ブランド候補。なければ空文字",
      "possible_menu_name": "メニュー名・商品名候補。なければ空文字",
      "food_type": "chain_menu | packaged_food | home_cooked | general | unknown",
      "quantity": "1品、1個、約180gなど",
      "nutrition_candidate": {
        "calories": 0,
        "protein_g": 0,
        "fat_g": 0,
        "carbs_g": 0,
        "salt_g": 0
      },
      "confidence": "high | medium | low",
      "nutrition_meta": {
        "origin": "official_website | package_label | user_measured | user_entered | brand_match | ai_photo_estimate | manual_estimate | derived_calculation | unknown",
        "estimation_policy": "exact | estimated | neutral | safe_high",
        "nutrient_evidence": {
          "calories": { "origin": "official_website", "confidence": "high", "estimation_policy": "exact", "uncertainty": { "minus": 0, "plus": 0 } },
          "protein_g": { "origin": "derived_calculation", "confidence": "medium", "estimation_policy": "estimated", "uncertainty": { "minus": 4, "plus": 4 } },
          "fat_g": { "origin": "derived_calculation", "confidence": "medium", "estimation_policy": "estimated", "uncertainty": { "minus": 3, "plus": 3 } },
          "carbs_g": { "origin": "derived_calculation", "confidence": "medium", "estimation_policy": "estimated", "uncertainty": { "minus": 5, "plus": 5 } }
        },
        "quantity_meta": { "estimated": false, "estimated_amount": 1, "uncertainty_amount": 0, "unit": "食" },
        "components": [{ "name": "親商品または追加トッピング", "calories": 0, "nutrition_meta": { "origin": "official_website", "estimation_policy": "exact" } }],
        "evidence_note": "参照した根拠を短く"
      },
      "match_keywords": ["照合に使える日本語キーワード"],
      "needs_confirmation": ["確認すべきこと。なければ空配列"],
      "note": "推定根拠を短く"
    }
  ]
}
\`\`\`

今回はこう読み取りました。
- 候補名 / ブランド候補 / 量 / kcal / P / F / C / 信頼度 / 確認点

修正がなければ上のコードブロックをコピーして100% トラッカーに戻してください。
修正がある場合は、どの項目をどう直すか教えてください。修正版のコードブロックを再生成します。
次のメニューを分析するには、新しく写真・バーコード・栄養成分表示を添付してください。`;

function foodModeLabel(mode: FoodMode) {
  return {
    search: "検索",
    favorite: "お気に入り",
    chain: "チェーン",
    ai: "AI写真",
    quick: "一般",
    manual: "マニュアル",
    personal: "マイメニュー",
    recommend: "おすすめ",
  }[mode];
}

function confidenceLabel(confidence: Confidence) {
  return { high: "高", medium: "中", low: "低" }[confidence];
}

function parseAiFoodBridgeText(text: string): { items: AiFoodBridgeItem[]; error?: string } {
  if (text.length > aiFoodImportMaxTextLength) {
    return { items: [], error: "貼り付け内容が長すぎます。AIのコードブロック部分だけをコピーしてください。" };
  }
  const candidates = extractJsonCandidates(text);
  if (!candidates.length) {
    return { items: [], error: "JSONが見つかりません。AIのコードブロックをコピーして貼り付けてください。" };
  }
  for (const candidate of candidates) {
    try {
      const payload = JSON.parse(repairAiJsonText(candidate)) as unknown;
      const rawItems = getAiFoodRawItems(payload);
      const items = rawItems.map(normalizeAiFoodBridgeItem).filter((item): item is AiFoodBridgeItem => !!item);
      if (items.length) return { items };
    } catch {
      continue;
    }
  }
  return { items: [], error: "JSONとして読み取れませんでした。AIのコードブロック全体をコピーして貼り付けてください。" };
}

function extractJsonCandidates(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const candidates: string[] = [];
  for (const match of trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)) {
    const fenced = match[1]?.trim();
    if (fenced) candidates.push(fenced);
  }
  candidates.push(...extractBalancedJsonSlices(trimmed));
  if (/^\s*[\[{]/.test(trimmed)) candidates.push(trimmed);
  return unique(candidates.map((candidate) => candidate.trim()).filter(Boolean)).slice(0, aiFoodImportMaxJsonCandidates);
}

function extractBalancedJsonSlices(text: string) {
  const slices: string[] = [];
  let start = -1;
  let stack: string[] = [];
  let inString = false;
  let escapeNext = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (inString) {
      if (escapeNext) {
        escapeNext = false;
      } else if (char === "\\") {
        escapeNext = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }
    if (char === "\"") {
      inString = true;
      continue;
    }
    if (char === "{" || char === "[") {
      if (!stack.length) start = index;
      stack.push(char === "{" ? "}" : "]");
      continue;
    }
    if ((char === "}" || char === "]") && stack.length) {
      const expected = stack[stack.length - 1];
      if (char !== expected) {
        stack = [];
        start = -1;
        continue;
      }
      stack.pop();
      if (!stack.length && start >= 0) {
        slices.push(text.slice(start, index + 1));
        start = -1;
      }
    }
  }
  return slices.sort((a, b) => b.length - a.length);
}

function repairAiJsonText(text: string) {
  return text
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'")
    .replace(/,\s*([}\]])/g, "$1");
}

function getAiFoodRawItems(payload: unknown) {
  if (Array.isArray(payload)) return payload.slice(0, aiFoodImportMaxItems);
  if (typeof payload !== "object" || payload === null) return [];
  const object = payload as Record<string, unknown>;
  const itemKeys = ["items", "foods", "food_items", "menu_items", "entries", "results", "食事", "食品", "メニュー"];
  for (const key of itemKeys) {
    if (Array.isArray(object[key])) {
      const rootNeedsConfirmation = stringArrayValue(object.needs_confirmation ?? object.questions ?? object["確認事項"] ?? object["確認"]);
      if (!rootNeedsConfirmation.length) return (object[key] as unknown[]).slice(0, aiFoodImportMaxItems);
      return (object[key] as unknown[]).map((item) => {
        if (typeof item !== "object" || item === null) return item;
        const itemObject = item as Record<string, unknown>;
        const itemNeedsConfirmation = stringArrayValue(itemObject.needs_confirmation ?? itemObject.questions ?? itemObject["確認事項"] ?? itemObject["確認"]);
        return { ...itemObject, needs_confirmation: unique([...itemNeedsConfirmation, ...rootNeedsConfirmation]) };
      }).slice(0, aiFoodImportMaxItems);
    }
  }
  if (object.nutrition_candidate || object.nutrition_estimate || object.estimated_nutrition || object.nutrition || object.nutrients || object["栄養値"] || object["栄養成分"]) return [object];
  return [];
}

function normalizeAiFoodBridgeItem(raw: unknown): AiFoodBridgeItem | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const nutrition = normalizeAiFoodNutrition(object.nutrition_candidate ?? object.nutrition_estimate ?? object.estimated_nutrition ?? object.nutrition ?? object.nutrients ?? object["栄養値"] ?? object["栄養成分"]);
  if (!nutrition) return undefined;
  const observedName = stringValue(object.observed_name) || stringValue(object.estimated_food_name) || stringValue(object.name) || stringValue(object.food_name) || stringValue(object["料理名"]) || stringValue(object["食品名"]) || stringValue(object["名前"]) || stringValue(object.possible_menu_name) || stringValue(object["メニュー名"]) || "AI推定メニュー";
  const possibleBrand = stringValue(object.possible_brand) || stringValue(object.brand) || stringValue(object["店名"]) || stringValue(object["ブランド"]) || stringValue(object["ブランド名"]);
  const possibleMenuName = stringValue(object.possible_menu_name) || stringValue(object.menu_name) || stringValue(object.product_name) || stringValue(object.estimated_menu_name) || stringValue(object["メニュー名"]) || stringValue(object["商品名"]);
  const category = stringValue(object.category) || stringValue(object["カテゴリ"]);
  const keywords = stringArrayValue(object.match_keywords ?? object.keywords ?? object["キーワード"] ?? object["照合キーワード"]);
  return {
    observed_name: observedName,
    possible_brand: possibleBrand,
    possible_menu_name: possibleMenuName,
    food_type: stringValue(object.food_type) || stringValue(object.type) || category || stringValue(object["種類"]),
    quantity: stringValue(object.quantity) || stringValue(object.portion) || stringValue(object.amount) || stringValue(object.serving) || stringValue(object["量"]) || stringValue(object["分量"]),
    nutrition_estimate: nutrition,
    confidence: confidenceValue(object.confidence),
    nutrition_meta: normalizeAiFoodNutritionMeta(object.nutrition_meta ?? object.nutritionMeta ?? object["推定情報"]),
    analysis_fingerprint: stringValue(object.analysis_fingerprint ?? object.analysisFingerprint),
    match_keywords: unique([...keywords, possibleBrand, possibleMenuName, observedName, category].filter(Boolean)).slice(0, aiFoodImportMaxKeywords),
    needs_confirmation: stringArrayValue(object.needs_confirmation ?? object.questions ?? object["確認事項"] ?? object["確認"]).slice(0, aiFoodImportMaxKeywords),
    note: longStringValue(object.note) || longStringValue(object["メモ"]) || longStringValue(object["推定根拠"]),
  };
}

function normalizeAiFoodNutritionMeta(raw: unknown): NutritionMeta | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const origin = nutritionOriginValue(object.origin ?? object.source ?? object["出所"]);
  const estimationPolicy = estimationPolicyValue(object.estimation_policy ?? object.estimationPolicy ?? object.policy ?? object["推定方針"]);
  const uncertaintyRaw = object.uncertainty ?? object.uncertainty_upper ?? object["推定幅"];
  const uncertainty = normalizeAiFoodUncertainty(uncertaintyRaw);
  const nutrientEvidence = normalizeAiFoodNutrientEvidence(object.nutrient_evidence ?? object.nutrition_evidence ?? object.fields ?? object["栄養素別根拠"]);
  const quantityMeta = normalizeAiFoodQuantityMeta(object.quantity_meta ?? object.quantityMeta ?? object["量の推定"]);
  const components = normalizeAiFoodComponents(object.components ?? object["内訳"]);
  return {
    origin,
    estimation_policy: estimationPolicy,
    uncertainty,
    evidence_note: longStringValue(object.evidence_note ?? object.evidence ?? object["根拠"]),
    explicit_uncertainty: !!uncertainty,
    nutrient_evidence: nutrientEvidence,
    quantity_meta: quantityMeta,
    components,
  };
}

function normalizeAiFoodNutrientEvidence(raw: unknown): NutritionMeta["nutrient_evidence"] | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const mappings: Array<[keyof NonNullable<NutritionMeta["nutrient_evidence"]>, string[]]> = [
    ["calories", ["calories", "calories_kcal", "kcal", "カロリー"]],
    ["protein_g", ["protein_g", "protein", "P", "たんぱく質"]],
    ["fat_g", ["fat_g", "fat", "F", "脂質"]],
    ["carbs_g", ["carbs_g", "carbs", "carbohydrate_g", "C", "炭水化物"]],
  ];
  const result: NonNullable<NutritionMeta["nutrient_evidence"]> = {};
  mappings.forEach(([key, aliases]) => {
    const value = aliases.map((alias) => object[alias]).find((candidate) => typeof candidate === "object" && candidate !== null);
    const evidence = normalizeAiFoodFieldEvidence(value);
    if (evidence) result[key] = evidence;
  });
  return Object.keys(result).length ? result : undefined;
}

function normalizeAiFoodFieldEvidence(raw: unknown) {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const rawOrigin = object.origin ?? object.source ?? object["出所"];
  const rawPolicy = object.estimation_policy ?? object.estimationPolicy ?? object.policy ?? object["推定方針"];
  const rawConfidence = object.confidence ?? object["信頼度"];
  const uncertainty = normalizeAiFoodFieldUncertainty(object.uncertainty ?? object["推定幅"]);
  if (rawOrigin === undefined && rawPolicy === undefined && rawConfidence === undefined && !uncertainty) return undefined;
  const origin = nutritionOriginValue(rawOrigin);
  const estimation_policy = rawPolicy === undefined
    ? (["official_website", "package_label", "user_measured", "user_entered"].includes(origin) ? "exact" : "estimated")
    : estimationPolicyValue(rawPolicy);
  return {
    origin,
    confidence: confidenceValue(rawConfidence),
    estimation_policy,
    uncertainty,
    evidence_note: longStringValue(object.evidence_note ?? object.evidence ?? object["根拠"]),
  };
}

function normalizeAiFoodFieldUncertainty(raw: unknown) {
  if (typeof raw === "number" || typeof raw === "string") {
    const value = numericValue(raw);
    return value === undefined ? undefined : { minus: Math.max(0, value), plus: Math.max(0, value) };
  }
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const minus = numericValue(object.minus ?? object.lower ?? object.down ?? object["下振れ"]);
  const plus = numericValue(object.plus ?? object.upper ?? object.up ?? object["上振れ"] ?? object.value);
  if (minus === undefined && plus === undefined) return undefined;
  return {
    minus: minus === undefined ? undefined : Math.max(0, minus),
    plus: plus === undefined ? undefined : Math.max(0, plus),
  };
}

function normalizeAiFoodQuantityMeta(raw: unknown): NutritionMeta["quantity_meta"] | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const estimated = Boolean(object.estimated ?? object.is_estimated ?? object["推定"]);
  const estimatedAmount = numericValue(object.estimated_amount ?? object.amount ?? object.grams ?? object["推定量"]);
  const uncertaintyAmount = numericValue(object.uncertainty_amount ?? object.uncertainty ?? object["推定幅"]);
  if (!estimated && estimatedAmount === undefined && uncertaintyAmount === undefined) return undefined;
  return {
    estimated,
    estimated_amount: estimatedAmount === undefined ? undefined : Math.max(0, estimatedAmount),
    uncertainty_amount: uncertaintyAmount === undefined ? undefined : Math.max(0, uncertaintyAmount),
    unit: stringValue(object.unit ?? object["単位"]),
    evidence_note: longStringValue(object.evidence_note ?? object.evidence ?? object["根拠"]),
  };
}

function normalizeAiFoodComponents(raw: unknown): NutritionMeta["components"] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const components = raw.slice(0, aiFoodImportMaxItems).flatMap((value) => {
    if (typeof value !== "object" || value === null) return [];
    const object = value as Record<string, unknown>;
    const name = stringValue(object.name ?? object.observed_name ?? object["名前"]);
    if (!name) return [];
    const nutrition = normalizeAiFoodNutrition(object.nutrition ?? object.nutrition_estimate ?? object["栄養値"]);
    const meta = normalizeAiFoodNutritionMeta(object.nutrition_meta ?? object.meta ?? object["根拠"]);
    return [{
      name,
      calories: nutrition?.calories,
      protein_g: nutrition?.protein_g,
      fat_g: nutrition?.fat_g,
      carbs_g: nutrition?.carbs_g,
      source_url: stringValue(object.source_url ?? object.url),
      nutrition_meta: meta,
    }];
  });
  return components.length ? components : undefined;
}

function normalizeAiFoodUncertainty(raw: unknown): NutritionMeta["uncertainty"] | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const calories = numericValue(object.calories ?? object.calories_kcal ?? object.kcal ?? object["カロリー"]);
  const protein = numericValue(object.protein_g ?? object.protein ?? object["たんぱく質"] ?? object["P"]);
  const fat = numericValue(object.fat_g ?? object.fat ?? object["脂質"] ?? object["F"]);
  const carbs = numericValue(object.carbs_g ?? object.carbs ?? object.carbohydrate_g ?? object["炭水化物"] ?? object["C"]);
  if ([calories, protein, fat, carbs].every((value) => value === undefined)) return undefined;
  return {
    calories: calories === undefined ? undefined : Math.round(Math.min(10_000, Math.max(0, calories))),
    protein_g: protein === undefined ? undefined : round1(Math.min(1_000, Math.max(0, protein))),
    fat_g: fat === undefined ? undefined : round1(Math.min(1_000, Math.max(0, fat))),
    carbs_g: carbs === undefined ? undefined : round1(Math.min(1_500, Math.max(0, carbs))),
  };
}

function nutritionOriginValue(value: unknown): NutritionOrigin {
  const allowed: NutritionOrigin[] = ["official_website", "package_label", "user_measured", "user_entered", "brand_match", "ai_photo_estimate", "manual_estimate", "derived_calculation", "unknown"];
  return typeof value === "string" && allowed.includes(value as NutritionOrigin) ? value as NutritionOrigin : "ai_photo_estimate";
}

function estimationPolicyValue(value: unknown): NutritionMeta["estimation_policy"] {
  return value === "exact" || value === "estimated" || value === "safe_high" || value === "calories_exact_macros_estimated" || value === "quantity_estimated" ? value : "neutral";
}

function defaultAiPhotoNutritionMeta(confidence: Confidence): NutritionMeta {
  return {
    origin: "ai_photo_estimate",
    estimation_policy: "neutral",
    evidence_note: `AI写真推定・信用度${confidenceLabel(confidence)}`,
    explicit_uncertainty: false,
    nutrient_evidence: {
      calories: { origin: "ai_photo_estimate", confidence, estimation_policy: "estimated" },
      protein_g: { origin: "ai_photo_estimate", confidence, estimation_policy: "estimated" },
      fat_g: { origin: "ai_photo_estimate", confidence, estimation_policy: "estimated" },
      carbs_g: { origin: "ai_photo_estimate", confidence, estimation_policy: "estimated" },
    },
  };
}

function dataSourceFromNutritionMeta(meta: NutritionMeta | undefined): DataSource {
  const calories = meta?.nutrient_evidence?.calories;
  const origin = calories?.origin ?? meta?.origin;
  const policy = calories?.estimation_policy ?? meta?.estimation_policy;
  const exact = policy === "exact" && (origin === "official_website" || origin === "package_label" || origin === "user_measured" || origin === "user_entered");
  if (!exact) return "estimated";
  if (origin === "user_measured" || origin === "user_entered") return "user";
  return "official";
}

function buildAiFoodAnalysisFingerprint(item: AiFoodBridgeItem) {
  const text = [item.possible_brand ?? "", item.observed_name, item.quantity ?? "", item.nutrition_estimate.calories]
    .map((value) => normalizeExactMenuKeyPart(String(value)))
    .filter(Boolean)
    .join("|");
  return text.slice(0, 180);
}

function isLikelyAiFoodDuplicate(entry: FoodEntry, candidate: { name: string; brand?: string; calories: number; timestamp: string }) {
  const entryName = normalizeExactMenuKeyPart(entry.name.replace(/（[^（）]*）/g, ""));
  const candidateName = normalizeExactMenuKeyPart(candidate.name.replace(/（[^（）]*）/g, ""));
  const entryBrand = normalizeExactMenuKeyPart(entry.brand ?? "");
  const candidateBrand = normalizeExactMenuKeyPart(candidate.brand ?? "");
  const sameName = entryName === candidateName && (!entryBrand || !candidateBrand || entryBrand === candidateBrand);
  const elapsedMs = Math.abs(new Date(entry.logged_at).getTime() - new Date(candidate.timestamp).getTime());
  return sameName && Number.isFinite(elapsedMs) && elapsedMs <= 15 * 60 * 1000;
}

function normalizeAiFoodNutrition(raw: unknown): AiFoodBridgeItem["nutrition_estimate"] | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const object = raw as Record<string, unknown>;
  const calories = numericValue(object.calories ?? object.calories_kcal ?? object.kcal ?? object["カロリー"] ?? object["熱量"] ?? object["エネルギー"]);
  const protein = numericValue(object.protein_g ?? object.protein ?? object["protein"] ?? object["たんぱく質"] ?? object["タンパク質"] ?? object["P"]);
  const fat = numericValue(object.fat_g ?? object.fat ?? object["fat"] ?? object["脂質"] ?? object["F"]);
  const carbs = numericValue(object.carbs_g ?? object.carbs ?? object.carbohydrate_g ?? object.carbohydrates ?? object.carbohydrate ?? object["炭水化物"] ?? object["糖質"] ?? object["C"]);
  if ([calories, protein, fat, carbs].some((value) => value === undefined)) return undefined;
  const salt = numericValue(object.salt_g ?? object.salt ?? object.sodium_chloride_g ?? object["食塩相当量"] ?? object["塩分"]);
  return {
    calories: Math.min(10_000, Math.max(0, Math.round(calories!))),
    protein_g: round1(Math.min(1_000, Math.max(0, protein!))),
    fat_g: round1(Math.min(1_000, Math.max(0, fat!))),
    carbs_g: round1(Math.min(1_500, Math.max(0, carbs!))),
    salt_g: salt === undefined ? undefined : round1(Math.min(100, Math.max(0, salt))),
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? sanitizeAiFoodText(value, aiFoodImportMaxStringLength) : "";
}

function longStringValue(value: unknown) {
  return typeof value === "string" ? sanitizeAiFoodText(value, aiFoodImportMaxNoteLength) : "";
}

function sanitizeAiFoodText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function stringArrayValue(value: unknown) {
  if (typeof value === "string") return value.split(/[,、/\n]/).map((item) => sanitizeAiFoodText(item, aiFoodImportMaxStringLength)).filter(Boolean).slice(0, aiFoodImportMaxKeywords);
  if (!Array.isArray(value)) return [];
  return value.map(stringValue).filter(Boolean).slice(0, aiFoodImportMaxKeywords);
}

function numericValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const parsed = Number(value.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function confidenceValue(value: unknown): Confidence {
  if (value === "high" || value === "medium" || value === "low") return value;
  if (value === "高") return "high";
  if (value === "中") return "medium";
  return "low";
}

function inferAiFoodMealType(items: AiFoodBridgeItem[]): MealType {
  const text = items.map((item) => `${item.observed_name} ${item.possible_menu_name ?? ""} ${item.match_keywords.join(" ")}`).join(" ");
  if (/朝|モーニング|トースト|ブレックファスト|breakfast/i.test(text)) return "breakfast";
  if (/間食|おやつ|スナック|デザート|プロテイン|snack/i.test(text)) return "snack";
  return "lunch";
}

function buildAiFoodImportCandidates(aiItem: AiFoodBridgeItem, menuItems: MenuItem[]): AiFoodMatchCandidate[] {
  const brand = normalizeExactMenuKeyPart(aiItem.possible_brand ?? "");
  const menuName = normalizeExactMenuKeyPart(aiItem.possible_menu_name ?? "");
  const observedName = normalizeExactMenuKeyPart(aiItem.observed_name);
  const keywords = aiItem.match_keywords.map(normalizeExactMenuKeyPart).filter(Boolean);
  return menuItems
    .map((item) => {
      const itemBrand = normalizeExactMenuKeyPart(item.brand ?? "");
      const itemName = normalizeExactMenuKeyPart(item.name);
      const itemText = normalizeExactMenuKeyPart([item.name, item.brand, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" "));
      let score = 0;
      const reasons: string[] = [];
      if (brand && itemBrand && (brand === itemBrand || itemBrand.includes(brand) || brand.includes(itemBrand))) {
        score += 38;
        reasons.push("ブランド近似");
      }
      if (menuName && (itemName.includes(menuName) || menuName.includes(itemName))) {
        score += 48;
        reasons.push("メニュー名近似");
      }
      if (observedName && (itemName.includes(observedName) || observedName.includes(itemName))) {
        score += 28;
        reasons.push("見た目名近似");
      }
      const keywordHits = keywords.filter((keyword) => keyword.length >= 2 && itemText.includes(keyword)).length;
      if (keywordHits) {
        score += Math.min(24, keywordHits * 6);
        reasons.push(`キーワード${keywordHits}件`);
      }
      score += Math.max(0, 5 - sourceRank(item.data_source));
      return { item, score, reason: reasons.join(" / ") || "近い候補" };
    })
    .filter((candidate) => candidate.score >= 18)
    .sort((a, b) => b.score - a.score || sourceRank(a.item.data_source) - sourceRank(b.item.data_source) || a.item.name.localeCompare(b.item.name, "ja"))
    .slice(0, 6);
}

function toManualDraft(item: MenuItem, mealType: MealType = "lunch"): ManualFoodDraft {
  const category = genericCategories[item.category] ? item.category : "チェーン店";
  const subcategory = item.tags.find((tag) => genericCategories[category]?.includes(tag)) ?? genericCategories[category]?.[0] ?? "";
  const isIngredient = item.tags.includes("材料") || !!item.weight_g;
  const ingredientScale = isIngredient && item.weight_g ? item.weight_g / 100 : 1;
  return {
    entry_kind: isIngredient ? "ingredient" : "meal",
    name: isIngredient ? item.name : formatMenuItemName(item),
    brand: item.brand ?? "",
    meal_type: item.default_meal_type ?? mealType,
    category,
    subcategory,
    ingredient_grams: item.weight_g ? String(item.weight_g) : "100",
    calories: String(round1(item.calories / ingredientScale)),
    protein_g: String(round1(item.protein_g / ingredientScale)),
    fat_g: String(round1(item.fat_g / ingredientScale)),
    carbs_g: String(round1(item.carbs_g / ingredientScale)),
    salt_g: item.salt_g === undefined ? "" : String(round1(item.salt_g / ingredientScale)),
    note: item.data_source === "estimated" ? "推定メニューから編集" : item.data_source === "unofficial" ? "非公式メニューから編集" : "",
    savePreset: true,
    favorite: item.is_favorite,
    officialVerified: item.data_source === "official",
  };
}

function canOverwriteMenuItem(item: MenuItem) {
  return item.data_source !== "official" || item.is_user_created;
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
    load_type: exercise.default_set_scheme?.[0]?.load_type ?? (isBodyweightStrengthItem(exercise) ? "bodyweight" : undefined),
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
    load_type: firstSet?.load_type,
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
  const grams = ingredientGramValue(manual);
  const scale = manual.entry_kind === "ingredient" ? (grams ?? 0) / 100 : 1;
  return {
    calories: Math.round(calories.value * scale),
    protein_g: round1(protein.value * scale),
    fat_g: round1(fat.value * scale),
    carbs_g: round1(carbs.value * scale),
    salt_g: salt === undefined ? undefined : round1(salt * scale),
    unknown: [
      manual.entry_kind === "ingredient" && grams === undefined ? "g" : "",
      calories.unknown ? "kcal" : "",
      protein.unknown ? "P" : "",
      fat.unknown ? "F" : "",
      carbs.unknown ? "C" : "",
    ].filter(Boolean),
  };
}

function ingredientGramValue(manual: ManualFoodDraft) {
  const grams = draftNumber(manual.ingredient_grams);
  if (grams.unknown || grams.value <= 0) return undefined;
  return round1(grams.value);
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

function sortSpecialModeFoodItems(items: MenuItem[], specialMode?: ActiveSpecialMode) {
  if (!specialMode) return items;
  return [...items].sort((a, b) => {
    const specialDiff = specialModeFoodRank(a, specialMode) - specialModeFoodRank(b, specialMode);
    if (specialDiff !== 0) return specialDiff;
    return sourceRank(a.data_source) - sourceRank(b.data_source);
  });
}

function specialModeFoodRank(item: MenuItem, specialMode?: ActiveSpecialMode) {
  if (!specialMode) return 0;
  const text = [item.name, item.brand, item.category, ...(item.tags ?? [])].join(" ");
  if (specialMode.id === "hokkaido_trip") {
    if (/北海道旅行2026|北海道旅行|旅行メニュー|旅行候補/.test(text)) return -30;
    if (/北海道|トリトン|北々亭|碧の座|富良野|美瑛|支笏湖|苫小牧|ほっき|ザンギ|ジンギスカン|旭川|札幌/.test(text)) return -16;
  }
  return 0;
}

function sourceLabel(source: MenuItem["data_source"], confidence: MenuItem["confidence"], item?: MenuItem, nutritionMeta?: NutritionMeta) {
  const sourceText = sourceDescription(source, item, nutritionMeta);
  const confidenceText = confidenceDescription(source, confidence, item, nutritionMeta);
  return [sourceText, confidenceText].filter(Boolean).join(" · ");
}

function SourceBadge({ source, confidence, item, nutritionMeta }: { source: MenuItem["data_source"]; confidence: MenuItem["confidence"]; item?: MenuItem; nutritionMeta?: NutritionMeta }) {
  const resolvedMeta = nutritionMeta ?? item?.nutrition_meta;
  return (
    <span className={`source-badge ${sourceBadgeClass(source, item, resolvedMeta)}`}>
      {sourceLabel(source, confidence, item, resolvedMeta)}
    </span>
  );
}

function sourceDescription(source: MenuItem["data_source"], item?: MenuItem, nutritionMeta?: NutritionMeta) {
  const evidence = nutritionMeta?.nutrient_evidence;
  const calorieOrigin = evidence?.calories?.origin;
  const officialCalories = evidence?.calories?.estimation_policy === "exact" && (calorieOrigin === "official_website" || calorieOrigin === "package_label");
  const estimatedMacros = [evidence?.protein_g, evidence?.fat_g, evidence?.carbs_g].some((field) => field && field.estimation_policy !== "exact");
  if (officialCalories && estimatedMacros) return "公式kcal・PFC推定";
  if (officialCalories && nutritionMeta?.quantity_meta?.estimated) return "公式値・量推定";
  if (officialCalories) return calorieOrigin === "package_label" ? "商品ラベル値" : "公式値";
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

function confidenceDescription(source: MenuItem["data_source"], confidence: MenuItem["confidence"], item?: MenuItem, nutritionMeta?: NutritionMeta) {
  const calorieConfidence = nutritionMeta?.nutrient_evidence?.calories?.confidence;
  if (nutritionMeta?.nutrient_evidence?.calories?.estimation_policy === "exact" && calorieConfidence === "high") return "信用度 高";
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

function sourceBadgeClass(source: MenuItem["data_source"], item?: MenuItem, nutritionMeta?: NutritionMeta) {
  const evidence = nutritionMeta?.nutrient_evidence;
  const officialCalories = evidence?.calories?.estimation_policy === "exact" && ["official_website", "package_label"].includes(evidence.calories.origin);
  const estimatedMacros = [evidence?.protein_g, evidence?.fat_g, evidence?.carbs_g].some((field) => field && field.estimation_policy !== "exact");
  if (officialCalories && estimatedMacros) return "source-badge-partial";
  if (officialCalories) return "source-badge-official";
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
      const key = [item.brand ?? "", item.name, item.serving_label ?? ""].map(normalizeExactMenuKeyPart).join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

const menuSizeVariantLabels = [
  "ご飯増量",
  "ごはん増量",
  "ライス増量",
  "おかず増量",
  "普通盛り",
  "普通盛",
  "ミニ",
  "小サイズ",
  "小盛サイズ",
  "小盛",
  "小盛り",
  "少なめ",
  "並サイズ",
  "並盛",
  "並盛り",
  "普通",
  "普通量",
  "中サイズ",
  "中盛",
  "中盛り",
  "アタマの大盛",
  "肉並盛",
  "肉大盛",
  "大サイズ",
  "大盛",
  "大盛り",
  "特盛",
  "特盛り",
  "超特盛",
  "メガ",
  "メガ盛",
  "メガ盛り",
];
const menuSizeVariantRanks = new Map(menuSizeVariantLabels.map((label, index) => [normalizeExactMenuKeyPart(label), index]));

function buildMenuSearchTextIndex(items: MenuItem[]) {
  return new Map(items.map((item) => [
    item.id,
    `${item.name} ${item.brand ?? ""} ${item.category} ${item.tags.join(" ")} ${item.serving_label ?? ""}`.toLowerCase(),
  ]));
}

function buildMenuSizeVariantIndex(items: MenuItem[]): MenuSizeVariantIndex {
  const variantsByItemId = new Map<string, MenuSizeVariant>();
  const variantsByGroupKey = new Map<string, MenuSizeVariant[]>();
  items.forEach((item) => {
    const variant = getMenuSizeVariant(item);
    if (!variant) return;
    variantsByItemId.set(item.id, variant);
    variantsByGroupKey.set(variant.groupKey, [...(variantsByGroupKey.get(variant.groupKey) ?? []), variant]);
  });
  variantsByGroupKey.forEach((variants, groupKey) => {
    variantsByGroupKey.set(groupKey, sortMenuSizeVariants(variants));
  });
  return { variantsByItemId, variantsByGroupKey };
}

function mergeMenuSizeVariantItems(items: MenuItem[], variantIndex: MenuSizeVariantIndex) {
  const emittedGroupKeys = new Set<string>();
  return items.flatMap((item) => {
    const variant = variantIndex.variantsByItemId.get(item.id);
    if (!variant) return [item];
    const groupVariants = variantIndex.variantsByGroupKey.get(variant.groupKey) ?? [];
    if (groupVariants.length <= 1) return [item];
    if (emittedGroupKeys.has(variant.groupKey)) return [];
    emittedGroupKeys.add(variant.groupKey);
    return [pickMenuSizeVariantRepresentative(groupVariants).item];
  });
}

function getMenuSizeVariants(selected: MenuItem, variantIndex: MenuSizeVariantIndex) {
  const selectedVariant = variantIndex.variantsByItemId.get(selected.id);
  if (!selectedVariant) return [];
  const variants = variantIndex.variantsByGroupKey.get(selectedVariant.groupKey) ?? [];
  return variants.length > 1 ? variants : [];
}

function findExactMenuSizeVariantByGrams(selected: MenuItem, variantIndex: MenuSizeVariantIndex, targetGrams: number) {
  if (!Number.isFinite(targetGrams) || targetGrams <= 0) return undefined;
  const roundedTarget = round1(targetGrams);
  return getMenuSizeVariantGramEntries(selected, variantIndex)
    .find((entry) => Math.abs(entry.grams - roundedTarget) < 0.1)?.variant.item;
}

function getMenuSizeVariantGramEntries(selected: MenuItem, variantIndex: MenuSizeVariantIndex) {
  const entries = getMenuSizeVariants(selected, variantIndex)
    .map((variant) => {
      const labelGrams = extractMenuSizeGrams(variant.label);
      const configGrams = getStaplePortionConfigs(variant.item)[0]?.defaultGrams;
      const grams = labelGrams ?? configGrams;
      return grams === undefined ? undefined : { variant, grams: round1(grams) };
    })
    .filter((entry): entry is { variant: MenuSizeVariant; grams: number } => !!entry)
    .sort((a, b) => a.grams - b.grams);
  const uniqueGramCount = new Set(entries.map((entry) => entry.grams)).size;
  return uniqueGramCount > 1 ? entries : [];
}

function getSizeVariantNutritionForTargetGrams(selected: MenuItem, variantIndex: MenuSizeVariantIndex, targetGrams: number): NutritionSnapshot | undefined {
  if (!Number.isFinite(targetGrams) || targetGrams <= 0) return undefined;
  const entries = getMenuSizeVariantGramEntries(selected, variantIndex);
  if (entries.length < 2) return undefined;
  const roundedTarget = round1(targetGrams);
  const exact = entries.find((entry) => Math.abs(entry.grams - roundedTarget) < 0.1);
  if (exact) return nutritionSnapshotFromMenuItem(exact.variant.item);

  const lower = [...entries].reverse().find((entry) => entry.grams < roundedTarget);
  const upper = entries.find((entry) => entry.grams > roundedTarget);
  const [start, end] = lower && upper
    ? [lower, upper]
    : roundedTarget < entries[0].grams
      ? [entries[0], entries[1]]
      : [entries[entries.length - 2], entries[entries.length - 1]];
  if (!start || !end || start.grams === end.grams) return undefined;

  const ratio = (roundedTarget - start.grams) / (end.grams - start.grams);
  const interpolate = (from: number, to: number) => Math.max(0, from + (to - from) * ratio);
  const interpolateOptional = (from?: number, to?: number) => {
    if (from === undefined || to === undefined) return undefined;
    return round1(interpolate(from, to));
  };
  return {
    calories: Math.max(0, Math.round(interpolate(start.variant.item.calories, end.variant.item.calories))),
    protein_g: round1(interpolate(start.variant.item.protein_g, end.variant.item.protein_g)),
    fat_g: round1(interpolate(start.variant.item.fat_g, end.variant.item.fat_g)),
    carbs_g: round1(interpolate(start.variant.item.carbs_g, end.variant.item.carbs_g)),
    salt_g: interpolateOptional(start.variant.item.salt_g, end.variant.item.salt_g),
  };
}

function nutritionSnapshotFromMenuItem(item: MenuItem): NutritionSnapshot {
  return {
    calories: item.calories,
    protein_g: item.protein_g,
    fat_g: item.fat_g,
    carbs_g: item.carbs_g,
    salt_g: item.salt_g,
  };
}

function repairExactSizeVariantFoodEntries(entries: FoodEntry[], menuItems: MenuItem[]) {
  const menuById = new Map(menuItems.map((item) => [item.id, item]));
  const variantIndex = buildMenuSizeVariantIndex(menuItems);
  const timestamp = nowIso();
  const updates: Array<{ id: string; patch: Partial<FoodEntry> }> = [];
  const repairedEntries = entries.map((entry) => {
    const currentItem = entry.menu_item_id ? menuById.get(entry.menu_item_id) : undefined;
    if (!currentItem || currentItem.is_user_created || currentItem.data_source !== "official") return entry;
    const targetGrams = extractLoggedFoodPortionGrams(entry);
    if (!targetGrams) return entry;
    const exactItem = findExactMenuSizeVariantByGrams(currentItem, variantIndex, targetGrams);
    if (!exactItem || exactItem.data_source !== "official") return entry;
    const baseGrams = getStaplePortionConfigs(currentItem)[0]?.defaultGrams;
    const baseRatio = baseGrams ? targetGrams / baseGrams : 1;
    const quantity = baseRatio > 0 ? Math.max(1, Math.round((entry.portion_multiplier || 1) / baseRatio)) : Math.max(1, Math.round(entry.portion_multiplier || 1));
    const nextName = formatFoodLoggedName(exactItem.name, entry.name === exactItem.name ? undefined : extractLoggedFoodPortionLabel(entry));
    const nextEntry: FoodEntry = {
      ...entry,
      name: nextName,
      brand: exactItem.brand,
      calories: Math.round(exactItem.calories * quantity),
      protein_g: round1(exactItem.protein_g * quantity),
      fat_g: round1(exactItem.fat_g * quantity),
      carbs_g: round1(exactItem.carbs_g * quantity),
      salt_g: exactItem.salt_g === undefined ? undefined : round1(exactItem.salt_g * quantity),
      portion_multiplier: quantity,
      entry_source: exactItem.data_source,
      confidence: exactItem.confidence,
      menu_item_id: exactItem.id,
      updated_at: timestamp,
    };
    const didChange = (
      nextEntry.menu_item_id !== entry.menu_item_id ||
      nextEntry.name !== entry.name ||
      nextEntry.calories !== entry.calories ||
      Math.abs(nextEntry.protein_g - entry.protein_g) >= 0.1 ||
      Math.abs(nextEntry.fat_g - entry.fat_g) >= 0.1 ||
      Math.abs(nextEntry.carbs_g - entry.carbs_g) >= 0.1 ||
      nextEntry.portion_multiplier !== entry.portion_multiplier
    );
    if (!didChange) return entry;
    updates.push({
      id: entry.id,
      patch: {
        name: nextEntry.name,
        brand: nextEntry.brand,
        calories: nextEntry.calories,
        protein_g: nextEntry.protein_g,
        fat_g: nextEntry.fat_g,
        carbs_g: nextEntry.carbs_g,
        salt_g: nextEntry.salt_g,
        portion_multiplier: nextEntry.portion_multiplier,
        entry_source: nextEntry.entry_source,
        confidence: nextEntry.confidence,
        menu_item_id: nextEntry.menu_item_id,
        updated_at: nextEntry.updated_at,
      },
    });
    return nextEntry;
  });
  return { entries: repairedEntries, updates };
}

function extractLoggedFoodPortionGrams(entry: FoodEntry) {
  const text = [entry.name, entry.note].filter(Boolean).join(" ");
  const match = text.match(/(?:肉|ステーキ|ハンバーグ|バーグ|チキン)\s*(\d+(?:\.\d+)?)\s*g/i);
  return match ? Number(match[1]) : undefined;
}

function extractLoggedFoodPortionLabel(entry: FoodEntry) {
  const text = [entry.note, entry.name].filter(Boolean).join(" ");
  const match = text.match(/(?:記録量:\s*)?((?:肉|ステーキ|ハンバーグ|バーグ|チキン)\s*\d+(?:\.\d+)?\s*g)/i);
  return match?.[1]?.replace(/\s+/g, "");
}

function getMenuDisplayName(item: MenuItem, variantIndex: MenuSizeVariantIndex) {
  const variant = variantIndex.variantsByItemId.get(item.id);
  if (!variant) return formatMenuItemName(item);
  const variants = variantIndex.variantsByGroupKey.get(variant.groupKey) ?? [];
  if (variants.length <= 1) return formatMenuItemName(item);
  return variant?.baseName ?? formatMenuItemName(item);
}

function sortMenuSizeVariants(variants: MenuSizeVariant[]) {
  return [...variants].sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    const sourceDiff = sourceRank(a.item.data_source) - sourceRank(b.item.data_source);
    if (sourceDiff !== 0) return sourceDiff;
    return a.item.calories - b.item.calories;
  });
}

function pickMenuSizeVariantRepresentative(variants: MenuSizeVariant[]) {
  return sortMenuSizeVariants(variants).sort((a, b) => menuSizeRepresentativeRank(a.label) - menuSizeRepresentativeRank(b.label))[0];
}

function menuSizeRepresentativeRank(label: string) {
  if (/^ライスM$/i.test(label)) return 0;
  if (/^ライス(?:S|SS)$/i.test(label)) return 2;
  if (/^ライス(?:L|XL)$/i.test(label)) return 3;
  if (/(?:^|\s)(?:並|並盛|普通|普通量|レギュラー|M)(?:$|\s)/i.test(label)) return 0;
  if (/(?:^|\s)(?:中|中盛)(?:$|\s)/.test(label)) return 1;
  if (/(?:^|\s)(?:小|小盛|ミニ|少なめ|S|SS)(?:$|\s)/i.test(label)) return 2;
  const grams = extractMenuSizeGrams(label);
  if (grams !== undefined) {
    if (grams === 150 || grams === 200) return 0;
    if (grams > 200 && grams <= 300) return 1;
    if (grams < 150) return 2;
    return 3;
  }
  if (/肉並盛/.test(label)) return 0;
  return 3;
}

function getMenuSizeVariant(item: MenuItem): MenuSizeVariant | undefined {
  if (!item.brand || item.is_user_created) return undefined;
  const servingLabel = item.serving_label?.trim();
  const fromServing = servingLabel ? extractMenuSizeLabel(servingLabel) : undefined;
  const fromName = extractMenuSizeLabel(item.name);
  const fromTags = item.tags.map(extractMenuSizeLabel).find(Boolean);
  const label = fromServing ?? fromName ?? fromTags;
  if (!label) return undefined;
  const baseName = stripMenuSizeLabel(item.name, label, fromServing ? servingLabel : undefined).trim();
  if (!baseName || baseName === item.name && !fromServing) return undefined;
  const groupKey = [
    item.brand,
    baseName,
  ].map(normalizeExactMenuKeyPart).join("|");
  return {
    item,
    label,
    baseName,
    rank: menuSizeVariantRank(label),
    groupKey,
  };
}

function extractMenuSizeLabel(value: string) {
  const normalized = value.trim();
  if (!normalized || /\d+\s*(?:個|貫|皿|本|杯|枚|切れ|袋|パック)/i.test(normalized)) return undefined;
  const riceSize = normalized.match(/^ライス\s*(SS|XL|S|M|L)$/i)?.[1];
  if (riceSize) return `ライス${riceSize.toUpperCase()}`;
  if (/(?:茹で前|茹で上がり)\s*\d+(?:\.\d+)?\s*g/i.test(normalized)) return normalized;
  if (/^(?:温|冷)\s*(?:並|大|得)$/.test(normalized)) return normalized;
  const meatGramLabel = normalized.match(/(?:肉|ステーキ|ハンバーグ|バーグ|チキン)\s*(\d+(?:\.\d+)?)\s*g/i);
  if (meatGramLabel) return meatGramLabel[0].replace(/\s+/g, "");
  const parenthetical = normalized.match(/[（(]([^（）()]+)[）)]/);
  const parentheticalLabel = parenthetical ? matchMenuSizeLabel(parenthetical[1]) : undefined;
  if (parentheticalLabel) return parentheticalLabel;
  return matchMenuSizeLabel(normalized);
}

function matchMenuSizeLabel(value: string) {
  const normalized = value.trim();
  if (/^(?:小|並|中|大|得|特大)$/.test(normalized)) return normalized;
  const latinSize = normalized.match(/(?:^|[\s（(])((?:SS|XL|S|M|L))(?:$|[\s（(）)])/i)
    ?? normalized.match(/((?:SS|XL|S|M|L))$/i);
  if (latinSize) return latinSize[1].toUpperCase();
  if (/^(レギュラー|プラスハーフ|ダブル)$/.test(normalized)) return normalized;
  const meatAmountLabel = normalized.match(/お肉(普通|大盛|特盛)/);
  if (meatAmountLabel) return meatAmountLabel[1];
  return menuSizeVariantLabels
    .filter((label) => normalized.includes(label))
    .sort((a, b) => b.length - a.length)[0];
}

function stripMenuSizeLabel(name: string, label: string, servingLabel?: string) {
  const escaped = escapeRegExp(label);
  const spacedEscaped = escapeRegExp(label.replace(/(\d+(?:\.\d+)?)g$/i, " $1g"));
  const servingPattern = servingLabel ? escapeRegExp(servingLabel) : "";
  let stripped = name
    .replace(new RegExp(`^\\s*(?:${escaped}|${spacedEscaped})\\s+`, "g"), "")
    .replace(new RegExp(`\\s+(?:${escaped}|${spacedEscaped})(?=\\s*[（(])`, "g"), "")
    .replace(new RegExp(`[（(]\\s*(?:${escaped}|${spacedEscaped})\\s*[）)]`, "g"), "")
    .replace(new RegExp(`\\s*(?:${escaped}|${spacedEscaped})\\s*$`, "g"), "")
    .replace(new RegExp(`[（(]\\s*${escaped}\\s*(?:\\d+(?:\\.\\d+)?\\s*g)?\\s*[）)]`, "g"), "")
    .replace(new RegExp(`\\s*${escaped}\\s*(?:盛り|盛)?\\s*(?:\\d+(?:\\.\\d+)?\\s*g)?\\s*$`, "g"), "")
    .replace(new RegExp(`[（(]\\s*${escaped}\\s*[）)]`, "g"), "")
    .replace(new RegExp(`\\s*${escaped}\\s*$`, "g"), "")
    .replace(/\s+/g, " ")
    .trim();
  if (servingPattern) {
    stripped = stripped
      .replace(new RegExp(`[（(]\\s*${servingPattern}\\s*[）)]`, "g"), "")
      .replace(new RegExp(`\\s*${servingPattern}\\s*$`, "g"), "")
      .replace(/\s+/g, " ")
      .trim();
  }
  return stripped;
}

function menuSizeVariantRank(label: string) {
  const grams = extractMenuSizeGrams(label);
  if (grams !== undefined) return grams;
  const temperatureSize = label.match(/^(?:温|冷)\s*(並|大|得)$/)?.[1];
  if (temperatureSize) return { 並: 0, 大: 1, 得: 2 }[temperatureSize] ?? 999;
  const latinLabel = label.match(/^ライス(SS|XL|S|M|L)$/i)?.[1] ?? label;
  const latinRank = { SS: 0, S: 1, M: 2, L: 3, XL: 4 }[latinLabel.toUpperCase()];
  if (latinRank !== undefined) return 100 + latinRank;
  const namedRank = { レギュラー: 0, プラスハーフ: 1, ダブル: 2 }[label];
  if (namedRank !== undefined) return 200 + namedRank;
  const shortRank = { 小: 0, 並: 1, 中: 2, 大: 3, 得: 4, 特大: 5 }[label];
  if (shortRank !== undefined) return 300 + shortRank;
  return menuSizeVariantRanks.get(normalizeExactMenuKeyPart(label)) ?? 999;
}

function extractMenuSizeGrams(label: string) {
  const match = label.match(/(\d+(?:\.\d+)?)\s*g/i);
  return match ? Number(match[1]) : undefined;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeExactMenuKeyPart(value: string) {
  return value
    .toLowerCase()
    .replace(/[（）]/g, (char) => (char === "（" ? "(" : ")"))
    .replace(/[＆]/g, "&")
    .replace(/[　\s]+/g, "")
    .replace(/[・･]/g, "")
    .replace(/[ー－―‐]/g, "-")
    .trim();
}

function mergeGenericDuplicateMenuItems(items: MenuItem[]) {
  const brandedOrSourcedKeys = new Set(
    items
      .filter((item) => !isGeneralFoodMenuItem(item))
      .filter((item) => item.brand || item.data_source === "official" || item.data_source === "unofficial" || hasOfficialPartialSignal(item))
      .map((item) => duplicateMenuKey(item.name)),
  );
  if (brandedOrSourcedKeys.size === 0) return items;
  return items.filter((item) => {
    if (!isGeneralFoodMenuItem(item)) return true;
    return !brandedOrSourcedKeys.has(duplicateMenuKey(item.name));
  });
}

function duplicateMenuKey(name: string) {
  return name
    .toLowerCase()
    .replace(/[（）]/g, (char) => (char === "（" ? "(" : ")"))
    .replace(/\([^)]*(並|大|得|小|中|メガ|ミニ|一皿|1個|2個|3個|4個|5個|6個|7個|8個|9個|10個)[^)]*\)/g, "")
    .replace(/[　\s]+/g, "")
    .replace(/[・･]/g, "")
    .replace(/[ー－―‐]/g, "-")
    .replace(/ロースかつ/g, "カツ")
    .replace(/とんかつ/g, "カツ")
    .trim();
}

function workoutModeLabel(mode: WorkoutMode) {
  return {
    favorite: "お気に入り",
    preset: "プリセット",
    body: "部位",
    equipment: "器具",
    my: "マイトレ",
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
  const normalizedEntryName = normalizeFoodLoggedQuantityName(entry.name);
  if (!entry.menu_item_id) return normalizedEntryName;
  const menuItem = menuItems.find((item) => item.id === entry.menu_item_id);
  if (!menuItem || entry.name !== menuItem.name) return normalizedEntryName;
  return formatMenuItemName(menuItem);
}

function formatFoodPortionLogLabel({
  portionLabel,
  quantity,
  forceSingleQuantity = false,
}: {
  portionLabel?: string;
  quantity: number;
  forceSingleQuantity?: boolean;
}) {
  const label = portionLabel?.trim();
  if (!label) return undefined;
  const safeQuantity = Math.max(0, quantity);
  if (safeQuantity !== 1) return formatFoodQuantitySummary(label, safeQuantity);
  return forceSingleQuantity ? label : undefined;
}

function formatFoodLoggedName(name: string, portionLogLabel?: string) {
  const label = portionLogLabel?.trim();
  if (!label) return name;
  if (name.includes(`（${label}）`) || name.includes(`(${label})`)) return name;
  return normalizeFoodLoggedQuantityName(`${name}（${label}）`);
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

function menuItemServingGrams(item: Pick<MenuItem, "name" | "brand" | "category" | "serving_label" | "weight_g" | "tags">) {
  if (item.weight_g && item.weight_g > 0) return item.weight_g;
  const match = item.serving_label?.match(/(\d+(?:\.\d+)?)\s*g/i);
  if (match) return Number(match[1]);
  return inferDefaultServingGrams(item);
}

function inferDefaultServingGrams(item: Pick<MenuItem, "name" | "brand" | "category" | "serving_label" | "tags">) {
  if (isSupplementLikeMenuItem(item)) return undefined;
  const text = [item.name, item.brand, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  if (hasFoodToken(text, ["トッピング", "追加", "ソース", "ディップ"])) return 30;
  if (hasFoodToken(text, ["ハンバーガー", "バーガー"])) return 120;
  if (hasFoodToken(text, ["サンドイッチ", "フィローネ", "カンパーニュサンド", "サンド", "ラップ", "トースト"])) return 140;
  if (hasFoodToken(text, ["スターバックス"]) && hasFoodToken(text, ["ケーキ", "ドーナツ", "スコーン", "キッシュ", "ヨーグルト", "グラノーラ"])) return 120;
  return undefined;
}

function extractPortionGrams(text: string, labels: string[]) {
  for (const label of labels) {
    const match = text.match(new RegExp(`${escapeRegExp(label)}\\s*(\\d+(?:\\.\\d+)?)\\s*g`, "i"));
    if (match) return Number(match[1]);
  }
  const generic = text.match(/(?:肉|ステーキ|ハンバーグ|バーグ|チキン)\s*(\d+(?:\.\d+)?)\s*g/i);
  return generic ? Number(generic[1]) : undefined;
}

function extractAnyPortionGrams(text: string) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*g/i);
  return match ? Number(match[1]) : undefined;
}

function inferRicePortionGrams(item: MenuItem, primaryText: string) {
  const explicitGrams = extractAnyPortionGrams(primaryText);
  if (explicitGrams) return explicitGrams;
  const text = [primaryText, ...item.tags].filter(Boolean).join(" ");
  if (hasFoodToken(text, ["茶碗1杯", "茶わん1杯", "ご飯茶碗", "ごはん茶碗"])) return 160;
  if (hasFoodToken(text, ["小丼", "ミニ丼"])) return 160;
  return undefined;
}

function inferNoodlePortionGrams(primaryText: string) {
  return extractAnyPortionGrams(primaryText);
}

function isRiceAdjustableCurry(item: MenuItem, primaryText: string, tagText: string) {
  if (!hasFoodToken(primaryText, ["カレー"])) return false;
  const contextText = [primaryText, item.category, tagText].filter(Boolean).join(" ");
  const isIndianCurry = hasFoodToken(contextText, ["インドカレー", "インド料理", "チキンティッカマサラ", "ダルカレー", "マトンカレー"]);
  return !isIndianCurry || hasFoodToken(primaryText, ["カレーライス"]);
}

function makeStaplePortionConfig(kind: StaplePortionConfig["kind"], defaultGrams?: number): StaplePortionConfig {
  if (kind === "soup") {
    return {
      kind: "soup",
      label: "汁物",
      defaultGrams: defaultGrams ?? 1,
      caloriesPer100g: 8100,
      proteinPer100g: 530,
      fatPer100g: 380,
      carbsPer100g: 720,
      saltPer100g: 60,
    };
  }
  if (kind === "noodle") {
    return {
      kind: "noodle",
      label: "麺",
      defaultGrams: defaultGrams ?? 230,
      caloriesPer100g: 150,
      proteinPer100g: 5,
      fatPer100g: 0.8,
      carbsPer100g: 30,
    };
  }
  if (kind === "steak") {
    return {
      kind: "steak",
      label: "肉",
      defaultGrams: defaultGrams ?? 200,
      caloriesPer100g: 245,
      proteinPer100g: 20,
      fatPer100g: 18,
      carbsPer100g: 0,
    };
  }
  if (kind === "hamburger") {
    return {
      kind: "hamburger",
      label: "ハンバーグ",
      defaultGrams: defaultGrams ?? 150,
      caloriesPer100g: 255,
      proteinPer100g: 15,
      fatPer100g: 20,
      carbsPer100g: 6,
    };
  }
  if (kind === "chicken") {
    return {
      kind: "chicken",
      label: "チキン",
      defaultGrams: defaultGrams ?? 220,
      caloriesPer100g: 190,
      proteinPer100g: 24,
      fatPer100g: 10,
      carbsPer100g: 0,
    };
  }
  return {
    kind: "rice",
    label: "ご飯",
    defaultGrams: defaultGrams ?? 200,
    caloriesPer100g: 156,
    proteinPer100g: 2.5,
    fatPer100g: 0.3,
    carbsPer100g: 37.1,
  };
}

function getStaplePortionConfigs(item: MenuItem): StaplePortionConfig[] {
  if (isSupplementLikeMenuItem(item)) return [];
  if (usesOfficialFixedSizeOptions(item)) return [];
  const primaryText = [item.name, item.serving_label].filter(Boolean).join(" ");
  const text = [primaryText, item.category, ...item.tags].filter(Boolean).join(" ");
  if (isMisoSoupSwitchItem(item)) return [makeStaplePortionConfig("soup")];
  const noodleTokens = ["麺", "ラーメン", "油そば", "うどん", "そば", "パスタ", "焼きそば", "フォー", "春雨"];
  const riceTokens = ["ごはん", "ご飯", "白米", "玄米", "ライス", "丼", "定食", "弁当", "プレート", "ディッシュ", "ガパオ", "チャーハン", "炒飯", "オムライス", "炊き込み", "混ぜご飯", "赤飯", "菜飯", "ビリヤニ"];
  const sideOnlyTokens = ["天ぷら", "かしわ天", "ちくわ天", "かき揚げ", "コロッケ", "唐揚げ", "から揚げ", "トッピング", "サイド", "単品"];
  const sideOnly = hasFoodToken(text, sideOnlyTokens);
  const hasVerifiedNoodleSizes = !item.brand || item.tags.includes("麺量カスタム可") || ["マンマパスタ", "すぱじろう"].includes(item.brand);
  const hasVerifiedMeatSizes = !item.brand || item.tags.includes("肉量カスタム可");
  const hasVerifiedRiceSizes = !item.brand || item.tags.includes("ご飯量カスタム可");
  const hasNoodle = hasVerifiedNoodleSizes && (hasFoodToken(primaryText, noodleTokens) || (!sideOnly && hasFoodToken(text, noodleTokens)));
  const hasHamburger = hasVerifiedMeatSizes && hasFoodToken(primaryText, ["ハンバーグ", "バーグ"]);
  const hasChicken = hasVerifiedMeatSizes && hasFoodToken(primaryText, ["チキンステーキ", "グリルチキン"]);
  const hasMeatGram = extractPortionGrams(primaryText, ["ステーキ", "肉", "ヒレ", "リブロース", "肩ロース", "ブレードミート"]) !== undefined;
  const hasSteak = !hasChicken
    && (!hasHamburger || hasFoodToken(primaryText, ["コロコロステーキ", "カットステーキ", "ワイルドコンボ"]))
    && (hasMeatGram || hasFoodToken(primaryText, ["ステーキ", "ヒレ", "リブロース", "肩ロース", "ブレードミート", "ワイルドコンボ"]));
  const tagText = item.tags.join(" ");
  const hasCurryRice = !hasNoodle && !sideOnly && isRiceAdjustableCurry(item, primaryText, tagText);
  const hasRice = hasVerifiedRiceSizes && (hasFoodToken(primaryText, riceTokens) || hasFoodToken(tagText, ["ごはん", "ご飯", "白米", "玄米", "ライス", "丼", "炊き込みご飯", "混ぜご飯"]) || hasCurryRice);
  const hasAdjustableInPrimaryText = hasFoodToken(primaryText, noodleTokens) || hasFoodToken(primaryText, riceTokens) || hasSteak || hasHamburger || hasChicken;
  if (!hasAdjustableInPrimaryText && hasFoodToken(text, sideOnlyTokens)) return [];
  const compositeText = hasAdjustableInPrimaryText ? primaryText : text;
  const isRiceComposite = hasFoodToken(compositeText, ["定食", "弁当", "プレート", "ディッシュ", "丼", "ガパオ", "チャーハン", "オムライス"]) || hasCurryRice || (hasFoodToken(primaryText, ["セット"]) && hasRice);
  const isComposite = isRiceComposite || hasNoodle || hasSteak || hasHamburger || hasChicken;
  if (!isComposite && !hasRice) return [];
  return [
    ...(hasSteak ? [makeStaplePortionConfig("steak", extractPortionGrams(primaryText, ["ステーキ", "肉", "ヒレ", "リブロース", "肩ロース", "ブレードミート"]))] : []),
    ...(hasHamburger ? [makeStaplePortionConfig("hamburger", extractPortionGrams(primaryText, ["ハンバーグ", "バーグ"]))] : []),
    ...(hasChicken ? [makeStaplePortionConfig("chicken", extractPortionGrams(primaryText, ["チキン"]))] : []),
    ...(hasNoodle ? [makeStaplePortionConfig("noodle", inferNoodlePortionGrams(primaryText))] : []),
    ...((hasRice || isRiceComposite) ? [makeStaplePortionConfig("rice", inferRicePortionGrams(item, primaryText))] : []),
  ];
}

function getStaplePortionConfig(item: MenuItem): StaplePortionConfig | undefined {
  return getStaplePortionConfigs(item)[0];
}

function getAdjustedMenuNutrition(item: MenuItem, portionMultiplier: number, portionQuantity: number, staplePortionMultipliers?: StaplePortionMultipliers) {
  const staples = getStaplePortionConfigs(item);
  if (staples.length === 0) {
    const multiplier = Math.max(0, portionMultiplier * portionQuantity);
    return {
      calories: Math.round(item.calories * multiplier),
      protein_g: round1(item.protein_g * multiplier),
      fat_g: round1(item.fat_g * multiplier),
      carbs_g: round1(item.carbs_g * multiplier),
      salt_g: item.salt_g ? round1(item.salt_g * multiplier) : undefined,
    };
  }
  const base = staples.reduce(
    (current, staple) => {
      const selectedMultiplier = Math.max(0, staplePortionMultipliers?.[staple.kind] ?? portionMultiplier);
      const stapleDeltaGrams = staple.defaultGrams * (staple.kind === "soup" ? selectedMultiplier : selectedMultiplier - 1);
      return {
        calories: current.calories + (staple.caloriesPer100g * stapleDeltaGrams) / 100,
        protein_g: current.protein_g + (staple.proteinPer100g * stapleDeltaGrams) / 100,
        fat_g: current.fat_g + (staple.fatPer100g * stapleDeltaGrams) / 100,
        carbs_g: current.carbs_g + (staple.carbsPer100g * stapleDeltaGrams) / 100,
        salt_g: current.salt_g === undefined && staple.saltPer100g === undefined
          ? undefined
          : (current.salt_g ?? 0) + ((staple.saltPer100g ?? 0) * stapleDeltaGrams) / 100,
      };
    },
    { calories: item.calories, protein_g: item.protein_g, fat_g: item.fat_g, carbs_g: item.carbs_g, salt_g: item.salt_g },
  );
  const quantity = Math.max(0, portionQuantity);
  return {
    calories: Math.max(0, Math.round(base.calories * quantity)),
    protein_g: round1(Math.max(0, base.protein_g * quantity)),
    fat_g: round1(Math.max(0, base.fat_g * quantity)),
    carbs_g: round1(Math.max(0, base.carbs_g * quantity)),
    salt_g: base.salt_g ? round1(Math.max(0, base.salt_g * quantity)) : undefined,
  };
}

function getStaplePortionOptions(staple: StaplePortionConfig): PortionOption[] {
  if (staple.kind === "soup") {
    return [
      { label: "みそ汁", value: 0 },
      { label: "豚汁に変更", value: 1 },
    ];
  }
  if (staple.kind === "rice") {
    return [
      { label: "ご飯なし", value: 0 },
      { label: "ご飯少なめ", value: 0.75 },
      { label: "ご飯普通", value: 1 },
      { label: "ご飯大盛り", value: 1.5 },
    ];
  }
  if (staple.kind === "steak" || staple.kind === "hamburger" || staple.kind === "chicken") {
    const base = Math.max(1, staple.defaultGrams);
    const candidates = staple.kind === "hamburger"
      ? [100, 150, 200, 300]
      : staple.kind === "chicken"
        ? [110, 220, 330, 440]
        : [100, 150, 200, 300, 450];
    const grams = Array.from(new Set([...candidates, base]))
      .filter((gramsValue) => gramsValue > 0 && (Math.abs(gramsValue - base) <= 260 || gramsValue === base))
      .sort((a, b) => a - b);
    return grams.map((gramsValue) => ({
      label: `${staple.label}${formatControlValue(gramsValue)}g`,
      value: gramsValue / base,
    }));
  }
  return [
    { label: "麺少なめ", value: 0.75 },
    { label: "麺普通", value: 1 },
    { label: "麺大盛り", value: 1.35 },
    { label: "麺特盛", value: 1.7 },
  ];
}

function formatStaplePortionLabel(staple: StaplePortionConfig, multiplier: number) {
  return `${staple.label}${formatControlValue(round1(staple.defaultGrams * Math.max(0, multiplier)))}g`;
}

function getPortionOptions(item: MenuItem): PortionOption[] {
  const text = [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  const servingLabel = item.serving_label?.trim();
  const standardLabel = servingLabel && !unhelpfulServingLabels.has(servingLabel) ? servingLabel : "普通";
  if (usesOfficialFixedSizeOptions(item)) {
    return [{ label: standardLabel === "普通" ? "1食" : standardLabel, value: 1 }];
  }
  const staples = getStaplePortionConfigs(item);
  const staple = staples[0];

  if (staples.length > 1) return [{ label: "標準量", value: 1 }];
  if (staple?.kind === "soup") return getStaplePortionOptions(staple);
  if (item.brand === "すぱじろう" && staple?.kind === "noodle") {
    const base = Math.max(1, staple.defaultGrams);
    return [
      { label: "S 乾麺100g", value: 100 / base },
      { label: "M 乾麺120g", value: 120 / base },
      { label: "L 乾麺170g", value: 170 / base },
      { label: "XL 乾麺240g", value: 240 / base },
    ];
  }
  if (item.brand === "マンマパスタ" && staple?.kind === "noodle") {
    return [
      { label: "標準 茹で上がり250g", value: 1 },
      { label: "大盛り 茹で上がり375g", value: 1.5 },
    ];
  }
  if (staple) return getStaplePortionOptions(staple);

  if (hasFoodToken(text, ["トッピング", "追加", "ソース", "ディップ"]) || servingLabel?.includes("トッピング")) {
    return [
      { label: "なし", value: 0 },
      { label: "半分", value: 0.5 },
      { label: standardLabel === "普通" ? "1トッピング" : standardLabel, value: 1 },
      { label: doubleServingLabel(servingLabel, "2トッピング"), value: 2 },
    ];
  }

  if (hasFoodToken(text, ["ドリンク", "コーヒー", "カフェラテ", "牛乳", "豆乳", "ジュース", "炭酸", "アルコール"])) {
    return [
      { label: "S", value: 0.75 },
      { label: standardLabel === "普通" ? "M" : standardLabel, value: 1 },
      { label: "L", value: 1.25 },
    ];
  }

  if (isSupplementLikeMenuItem(item) || item.category === "プロテイン" || hasFoodToken(text, ["プロテイン", "プロテインバー", "プロテインドリンク", "プロテインゼリー"])) {
    return [
      { label: "半分", value: 0.5 },
      { label: standardLabel === "普通" ? "1回分" : standardLabel, value: 1 },
      { label: doubleServingLabel(servingLabel, "2回分"), value: 2 },
    ];
  }

  if (hasFoodToken(text, ["おにぎり", "パン", "サンドイッチ", "サンド", "フィローネ", "ラップ", "トースト", "ハンバーガー", "バーガー", "スイーツ", "和菓子", "果物", "卵"])) {
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

function isSupplementLikeMenuItem(item: Pick<MenuItem, "name" | "category" | "serving_label" | "tags">) {
  const text = [item.name, item.category, item.serving_label, ...item.tags].filter(Boolean).join(" ");
  return item.category === "サプリ" || hasFoodToken(text, ["サプリ", "クレアチン", "EAA", "BCAA", "グルタミン", "シトルリン", "プレワークアウト", "マルチビタミン", "ビタミン", "ミネラル"]);
}

function usesOfficialFixedSizeOptions(item: Pick<MenuItem, "tags">) {
  return item.tags.includes("公式サイズのみ");
}

function usesPublishedInlinePortionOptions(item: Pick<MenuItem, "brand">) {
  return item.brand === "マンマパスタ" || item.brand === "すぱじろう";
}

function isMisoSoupSwitchItem(item: Pick<MenuItem, "brand" | "tags">) {
  return item.brand === "やよい軒" && item.tags.includes("味噌汁カスタム可");
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

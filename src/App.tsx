import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Activity,
  Archive,
  Check,
  ChevronRight,
  Copy,
  Dumbbell,
  FileDown,
  FileText,
  Heart,
  Home,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  Trash2,
  Utensils,
  Weight,
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
  WeightLog,
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
  WorkoutTemplate,
} from "./types";
import { addDays, dateRange, formatJapaneseDate, nowIso, todayAppDate } from "./lib/date";
import { makeId } from "./lib/ids";
import { activityLabels, buildGoal, calculateTargets, phaseLabels } from "./lib/goalCalculator";
import { downloadText, exportBackup, importBackup, resetLocalData } from "./lib/backup";
import { generateMarkdownReport } from "./lib/report";

type Tab = "home" | "food" | "workout" | "settings";
type FoodMode = "search" | "favorite" | "chain" | "category" | "quick" | "rough" | "manual" | "personal";
type WorkoutMode = "favorite" | "preset" | "body" | "equipment" | "previous" | "search";
type SettingsFocus = "ai" | undefined;
type BackupInfo = {
  lastBackupAt?: string;
  daysSinceBackup?: number;
  trackedRecords: number;
  level: "ok" | "soon" | "danger";
};
type ReportMode = "day" | "period";
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

const mealLabels: Record<MealType, string> = {
  breakfast: "朝",
  lunch: "昼",
  dinner: "夜",
  snack: "間食",
};

const chainCategories: Record<string, string[]> = {
  "牛丼・丼": ["松屋", "すき家", "吉野家", "なか卯"],
  "うどん・そば": ["丸亀製麺", "はなまるうどん", "ウエスト", "資さんうどん"],
  ファストフード: ["マクドナルド", "モスバーガー", "ケンタッキー", "バーガーキング", "サブウェイ"],
  定食: ["大戸屋", "やよい軒", "しんぱち食堂"],
  ファミレス: ["ガスト", "ロイヤルホスト", "サイゼリヤ", "オリーブの丘", "デニーズ", "ジョイフル", "ジョナサン", "華屋与兵衛", "藍屋"],
  カフェ: ["スターバックス", "ドトール", "タリーズ", "コメダ珈琲"],
  コンビニ: ["セブンイレブン", "ファミリーマート", "ローソン", "ミニストップ"],
  居酒屋: [],
  その他: [],
};

const genericCategories: Record<string, string[]> = {
  "ごはん・丼": ["白米", "牛丼", "親子丼", "カツ丼", "カレー", "寿司"],
  麺類: ["ラーメン", "うどん", "そば", "パスタ", "焼きそば"],
  パン: ["サンドイッチ", "トースト"],
  "肉・魚": ["鶏", "鮭", "サバ", "卵"],
  "サラダ・野菜": ["サラダ", "野菜"],
  "おかず・惣菜": ["納豆", "豆腐", "唐揚げ"],
  スープ: ["味噌汁", "スープ"],
  スイーツ: ["ケーキ", "アイス", "和菓子", "焼き菓子", "チョコ", "プリン"],
  ドリンク: ["コーヒー", "カフェラテ", "牛乳", "ジュース", "アルコール"],
  コンビニ: ["おにぎり", "弁当", "サンドイッチ", "サラダチキン", "カップ麺", "スイーツ"],
  チェーン店: ["牛丼", "うどん", "定食", "バーガー"],
  自炊: ["白米", "鶏", "卵"],
  居酒屋: ["飲み会", "ビール"],
  サプリ: ["プロテイン", "プロテインバー", "プロテインドリンク", "プロテインゼリー", "その他"],
  その他: ["不明"],
};

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

const emptyRough: ManualFoodDraft = {
  ...emptyManual,
  category: "その他",
  subcategory: "不明",
};

const backupStorageKey = "phase-log-last-backup-at";

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
  const [settingsFocus, setSettingsFocus] = useState<SettingsFocus>();
  const [lastBackupAt, setLastBackupAt] = useState<string | undefined>(() => localStorage.getItem(backupStorageKey) || undefined);
  const appDate = todayAppDate(settings?.day_boundary_hour ?? 3);
  const activeGoal = goals.find((goal) => goal.is_active);

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
    setWorkoutTemplates(nextTemplates);
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

  const todayEntries = foodEntries.filter((entry) => entry.app_date === appDate);
  const todayWorkouts = workoutSessions.filter((session) => session.app_date === appDate);
  const latestWeight = weightLogs.at(-1);
  const dayTotals = sumFood(todayEntries);
  const target = activeGoal ?? defaultGoal(profile);
  const backupInfo = getBackupInfo(lastBackupAt, foodEntries.length + weightLogs.length + workoutSessions.length + workoutSets.length);
  const markBackupNow = () => {
    const timestamp = nowIso();
    localStorage.setItem(backupStorageKey, timestamp);
    setLastBackupAt(timestamp);
  };

  if (settings && !settings.onboarding_completed) {
    return <Onboarding refresh={refresh} />;
  }

  return (
    <main className="mx-auto min-h-screen max-w-[430px] bg-rice text-ink">
      <header className="safe-top sticky top-0 z-20 border-b border-line bg-rice/95 px-4 pb-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-moss">{formatJapaneseDate(appDate)}</p>
            <h1 className="text-xl font-bold tracking-normal">ゴールトラッカー</h1>
          </div>
          <div className="rounded-md border border-leaf/20 bg-leaf/10 px-3 py-2 text-right text-xs shadow-soft">
            <p className="font-semibold">{activeGoal ? phaseLabels[activeGoal.phase] : "未設定"}</p>
            <p className="text-moss">{latestWeight?.weight_kg ?? profile?.current_weight_kg ?? "-"}kg</p>
          </div>
        </div>
      </header>

      <section className="px-4 pb-28 pt-4">
        {tab === "home" && (
          <HomeTab
            profile={profile}
            goal={target}
            appDate={appDate}
            dayTotals={dayTotals}
            todayEntries={todayEntries}
            todayWorkouts={todayWorkouts}
            workoutExercises={workoutExercises}
            latestWeight={latestWeight}
            weightLogs={weightLogs}
            backupInfo={backupInfo}
            setTab={(nextTab) => {
              setSettingsFocus(undefined);
              setTab(nextTab);
            }}
            openAiReport={() => {
              setSettingsFocus("ai");
              setTab("settings");
            }}
            refresh={refresh}
          />
        )}
        {tab === "food" && <FoodTab menuItems={menuItems} foodEntries={foodEntries} appDate={appDate} refresh={refresh} />}
        {tab === "workout" && (
          <WorkoutTab
            profile={profile}
            appDate={appDate}
            exercisePresets={exercisePresets}
            workoutTemplates={workoutTemplates}
            workoutSessions={workoutSessions}
            workoutExercises={workoutExercises}
            workoutSets={workoutSets}
            refresh={refresh}
          />
        )}
        {tab === "settings" && (
          <SettingsTab
            profile={profile}
            goals={goals}
            activeGoal={activeGoal}
            menuItems={menuItems}
            workoutTemplates={workoutTemplates}
            focus={settingsFocus}
            backupInfo={backupInfo}
            markBackupNow={markBackupNow}
            refresh={refresh}
            allData={{ foodEntries, weightLogs, workoutSessions, workoutExercises, workoutSets }}
          />
        )}
      </section>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-line bg-white px-3 pt-2">
        <div className="grid grid-cols-4 gap-1">
          <TabButton active={tab === "home"} icon={<Home size={19} />} label="Home" onClick={() => { setSettingsFocus(undefined); setTab("home"); }} />
          <TabButton active={tab === "food"} icon={<Utensils size={19} />} label="Food" onClick={() => { setSettingsFocus(undefined); setTab("food"); }} />
          <TabButton active={tab === "workout"} icon={<Dumbbell size={19} />} label="Workout" onClick={() => { setSettingsFocus(undefined); setTab("workout"); }} />
          <TabButton active={tab === "settings"} icon={<Settings size={19} />} label="Settings" onClick={() => { setSettingsFocus(undefined); setTab("settings"); }} />
        </div>
      </nav>
    </main>
  );
}

function HomeTab(props: {
  profile?: Profile;
  goal?: Goal;
  appDate: string;
  dayTotals: ReturnType<typeof sumFood>;
  todayEntries: FoodEntry[];
  todayWorkouts: WorkoutSession[];
  workoutExercises: WorkoutExercise[];
  latestWeight?: WeightLog;
  weightLogs: WeightLog[];
  backupInfo: BackupInfo;
  setTab: (tab: Tab) => void;
  openAiReport: () => void;
  refresh: () => Promise<void>;
}) {
  const [weight, setWeight] = useState(props.latestWeight?.weight_kg ?? props.profile?.current_weight_kg ?? 70);
  const remaining = (props.goal?.target_calories ?? 0) - props.dayTotals.calories;
  const calorieState = getCalorieState(remaining, props.goal?.target_calories ?? 0);
  const average7 = movingAverage(props.weightLogs, 7);
  return (
    <div className="space-y-4">
      {props.backupInfo.level !== "ok" && (
        <button className={`compact-card w-full p-3 text-left ${props.backupInfo.level === "danger" ? "border-clay bg-clay/10" : "border-leaf bg-leaf/10"}`} onClick={() => props.setTab("settings")}>
          <p className="text-sm font-bold">{props.backupInfo.level === "danger" ? "バックアップ推奨" : "そろそろバックアップ"}</p>
          <p className="mt-1 text-xs text-moss">{backupMessage(props.backupInfo)} · タップでJSON保存へ</p>
        </button>
      )}

      <section className={`calorie-card ${calorieState.cardClass}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-moss">残りカロリー</p>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${calorieState.badgeClass}`}>{calorieState.label}</span>
            </div>
            <p className={`mt-1 text-4xl font-black tracking-normal ${calorieState.valueClass}`}>{calorieState.displayValue}</p>
            <p className="text-sm font-semibold text-moss">{calorieState.subtitle}</p>
            <p className="mt-1 text-xs text-moss">{props.dayTotals.calories} / {props.goal?.target_calories ?? "-"} kcal</p>
          </div>
          <div className="grid gap-1 text-right text-xs">
            <MacroLine label="P" value={props.dayTotals.protein} target={props.goal?.target_protein_g ?? 0} color="#526a57" />
            <MacroLine label="F" value={props.dayTotals.fat} target={props.goal?.target_fat_g ?? 0} color="#c76f51" />
            <MacroLine label="C" value={props.dayTotals.carbs} target={props.goal?.target_carbs_g ?? 0} color="#d9a441" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <button className="primary-button" onClick={() => props.setTab("food")}><Utensils size={17} />食事を追加</button>
        <button className="secondary-button" onClick={() => props.setTab("workout")}><Dumbbell size={17} />筋トレ</button>
        <button className="secondary-button" onClick={() => props.setTab("settings")}><Activity size={17} />ゴール</button>
        <button className="secondary-button" onClick={props.openAiReport}><FileText size={17} />AI相談レポート</button>
      </div>

      <section className="compact-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">体重</p>
            <p className="text-xs text-moss">7日平均 {average7 ? `${average7}kg` : "-"}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-button" onClick={() => setWeight(round1(weight - 0.1))} aria-label="体重を下げる"><Minus size={16} /></button>
            <input className="w-20 text-center" type="number" step="0.1" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
            <button className="icon-button" onClick={() => setWeight(round1(weight + 0.1))} aria-label="体重を上げる"><Plus size={16} /></button>
            <button className="icon-button bg-ink text-white" aria-label="保存" onClick={async () => {
              const timestamp = nowIso();
              await db.weight_logs.put({
                id: makeId("weight"),
                app_date: props.appDate,
                logged_at: timestamp,
                weight_kg: weight,
                body_fat_percentage: props.profile?.body_fat_percentage,
                lean_body_mass_kg: props.profile?.body_fat_percentage ? round1(weight * (1 - props.profile.body_fat_percentage / 100)) : undefined,
                created_at: timestamp,
                updated_at: timestamp,
              });
              if (props.profile) await db.profile.update(props.profile.id, { current_weight_kg: weight, updated_at: timestamp });
              await props.refresh();
            }}><Save size={16} /></button>
          </div>
        </div>
      </section>

      <section className="compact-card divide-y divide-line">
        <ListHeader title="今日の食事" value={`${props.todayEntries.length}件`} />
        {props.todayEntries.slice(0, 6).map((entry) => (
          <div className="flex items-center justify-between px-4 py-3" key={entry.id}>
            <div>
              <p className="text-sm font-semibold">{entry.name}</p>
              <p className="text-xs text-moss">{mealLabels[entry.meal_type]} · P{entry.protein_g} F{entry.fat_g} C{entry.carbs_g}</p>
            </div>
            <p className="font-bold">{entry.calories}</p>
          </div>
        ))}
        {props.todayEntries.length === 0 && <EmptyLine text="まだ食事ログなし" />}
      </section>

      <section className="compact-card divide-y divide-line">
        <ListHeader title="今日の筋トレ" value={`${props.todayWorkouts.length}件`} />
        {props.todayWorkouts.map((session) => (
          <div className="px-4 py-3" key={session.id}>
            <p className="text-sm font-semibold">{session.title}</p>
            <p className="text-xs text-moss">{props.workoutExercises.filter((item) => item.session_id === session.id).length}種目</p>
          </div>
        ))}
        {props.todayWorkouts.length === 0 && <EmptyLine text="まだワークアウトなし" />}
      </section>
    </div>
  );
}

function FoodTab(props: { menuItems: MenuItem[]; foodEntries: FoodEntry[]; appDate: string; refresh: () => Promise<void> }) {
  const [mode, setMode] = useState<FoodMode>("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem>();
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [multiplier, setMultiplier] = useState(1);
  const [manual, setManual] = useState(emptyManual);
  const [rough, setRough] = useState(emptyRough);
  const [chainCategory, setChainCategory] = useState("牛丼・丼");
  const [brand, setBrand] = useState("松屋");
  const [genericCategory, setGenericCategory] = useState("ごはん・丼");

  const recentIds = new Set(props.foodEntries.slice(0, 20).map((entry) => entry.menu_item_id).filter(Boolean));
  const favoriteItems = props.menuItems.filter((item) => item.is_favorite);
  const recentItems = props.menuItems.filter((item) => recentIds.has(item.id));
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const base = props.menuItems.filter((item) => {
      if (mode === "favorite") return item.is_favorite;
      if (mode === "quick") return item.data_source === "quick_estimate";
      if (mode === "personal") return item.is_user_created;
      if (mode === "chain") return item.brand === brand;
      if (mode === "category") return item.category === genericCategory || item.tags.some((tag) => genericCategories[genericCategory]?.includes(tag));
      return true;
    });
    const sorted = dedupeMenuItemsBySource(base);
    if (!needle) return sorted.slice(0, 80);
    return sorted
      .filter((item) => `${item.name} ${item.brand ?? ""} ${item.category} ${item.tags.join(" ")} ${item.serving_label ?? ""}`.toLowerCase().includes(needle))
      .slice(0, 80);
  }, [props.menuItems, query, mode, brand, genericCategory]);

  const saveSelected = async () => {
    if (!selected) return;
    const timestamp = nowIso();
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: mealType,
      name: selected.name,
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
  };

  const cloneSelectedToManual = () => {
    if (!selected) return;
    setManual(toManualDraft(selected, mealType));
    setSelected(undefined);
    setMode("manual");
  };

  const saveManual = async () => {
    if (!manual.name.trim()) return;
    const timestamp = nowIso();
    let menuItemId: string | undefined;
    const nutrition = draftNutrition(manual);
    const tags = unique([manual.category, manual.subcategory, manual.brand, ...(nutrition.unknown.length ? ["栄養素一部不明"] : [])]);
    const note = unique([manual.note, nutrition.unknown.length ? `未入力: ${nutrition.unknown.join("/")}` : ""]).join(" / ") || undefined;
    const confidence = nutrition.unknown.length ? "low" : "high";
    if (manual.savePreset) {
      menuItemId = makeId("menu_user");
      await db.menu_items.put({
        id: menuItemId,
        name: manual.name,
        brand: manual.brand || undefined,
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
      name: manual.name,
      brand: manual.brand || undefined,
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
  };

  const saveRough = async () => {
    const timestamp = nowIso();
    const nutrition = draftNutrition(rough);
    const label = rough.note.trim() || "ざっくり";
    const note = unique([
      rough.note,
      nutrition.unknown.length ? `未入力: ${nutrition.unknown.join("/")}` : "",
    ]).join(" / ") || undefined;
    await db.food_entries.put({
      id: makeId("food"),
      app_date: props.appDate,
      logged_at: timestamp,
      meal_type: rough.meal_type,
      name: `${mealLabels[rough.meal_type]}の${label}`,
      calories: nutrition.calories,
      protein_g: nutrition.protein_g,
      fat_g: nutrition.fat_g,
      carbs_g: nutrition.carbs_g,
      salt_g: nutrition.salt_g,
      portion_multiplier: 1,
      entry_source: "quick_estimate",
      confidence: "low",
      note,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setRough({ ...emptyRough, meal_type: rough.meal_type });
    await props.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-[74px] z-10 -mx-4 space-y-3 bg-rice px-4 pb-2">
        <form className="compact-card flex gap-2 p-2" onSubmit={(event) => { event.preventDefault(); setMode("search"); }}>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-moss" size={20} />
            <input className="h-12 w-full pl-10 text-base" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="食品・ブランド検索" />
          </div>
          <button type="submit" className={`${mode === "search" ? "primary-button" : "secondary-button"} h-12 px-4`}>検索</button>
        </form>
        <div className="grid grid-cols-3 gap-2">
          {(["favorite", "chain", "category", "quick", "rough", "manual", "personal"] as FoodMode[]).map((item) => (
            <button key={item} className={`mode-button ${mode === item ? "mode-button-active" : ""}`} onClick={() => setMode(item)}>
              {foodModeLabel(item)}
            </button>
          ))}
        </div>
      </div>

      {mode === "chain" && (
        <section className="compact-card p-3">
          <select className="h-12 w-full text-base" value={chainCategory} onChange={(event) => {
            setChainCategory(event.target.value);
            setBrand(chainCategories[event.target.value]?.[0] ?? "");
          }}>
            {Object.keys(chainCategories).map((item) => <option key={item}>{item}</option>)}
          </select>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {chainCategories[chainCategory].map((item) => (
              <button className={`tap-tile ${brand === item ? "tap-tile-active" : ""}`} key={item} onClick={() => setBrand(item)}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode === "category" && (
        <section className="compact-card p-3">
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(genericCategories).map((item) => (
              <button className={`tap-tile ${genericCategory === item ? "tap-tile-active" : ""}`} key={item} onClick={() => setGenericCategory(item)}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode !== "manual" && mode !== "rough" && (
        <>
          {mode === "search" && (
            <QuickStrip title="Recent" items={recentItems} onPick={setSelected} fallback={favoriteItems} />
          )}
          {mode === "favorite" && favoriteItems.length === 0 && (
            <section className="compact-card p-4 text-sm text-moss">食品行のハートを押すとここから呼び出せます。</section>
          )}
          <section className="compact-card divide-y divide-line overflow-hidden">
            <ListHeader title={foodModeLabel(mode)} value={`${results.length}件`} />
            {results.map((item) => <FoodItemRow key={item.id} item={item} onPick={setSelected} onClone={setManualFromItem(setManual, setMode)} refresh={props.refresh} />)}
            {results.length === 0 && <EmptyLine text="見つかりません" />}
          </section>
        </>
      )}

      {mode === "manual" && (
        <ManualFoodForm manual={manual} setManual={setManual} onSave={saveManual} />
      )}

      {mode === "rough" && (
        <RoughFoodForm rough={rough} setRough={setRough} onSave={saveRough} />
      )}

      <section className="compact-card divide-y divide-line">
        <ListHeader title="今日の食事ログ" value={`${props.foodEntries.filter((entry) => entry.app_date === props.appDate).length}件`} />
        {props.foodEntries.filter((entry) => entry.app_date === props.appDate).map((entry) => (
          <div className="flex items-center justify-between px-4 py-3" key={entry.id}>
            <div>
              <p className="text-sm font-semibold">{entry.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-moss">{mealLabels[entry.meal_type]}</span>
                <SourceBadge source={entry.entry_source} confidence={entry.confidence} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">{entry.calories}</p>
              <button className="icon-button h-8 w-8" aria-label="削除" onClick={async () => { await db.food_entries.delete(entry.id); await props.refresh(); }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-end bg-ink/30 px-4 pb-4">
          <div className="compact-card w-full p-4">
            <p className="text-lg font-bold">{selected.name}</p>
            <p className="text-sm text-moss">{selected.brand ?? selected.category} · {Math.round(selected.calories * multiplier)} kcal</p>
            <div className="mt-2">
              <SourceBadge source={selected.data_source} confidence={selected.confidence} />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Object.entries(mealLabels).map(([key, label]) => (
                <button key={key} className={`chip justify-center ${mealType === key ? "chip-active" : ""}`} onClick={() => setMealType(key as MealType)}>{label}</button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[["少なめ", 0.8], ["普通", 1], ["多め", 1.2], ["ご飯少なめ", 0.85], ["ご飯大盛", 1.25], ["タンパク質多め", 1.1], ["脂質多め", 1.15]].map(([label, value]) => (
                <button key={label} className={`chip justify-center ${multiplier === value ? "chip-active" : ""}`} onClick={() => setMultiplier(Number(value))}>{label}</button>
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
  refresh: () => Promise<void>;
}) {
  const [sessionId, setSessionId] = useState<string>();
  const [mode, setMode] = useState<WorkoutMode>("favorite");
  const [filter, setFilter] = useState("");
  const activeSession = props.workoutSessions.find((session) => session.id === sessionId);
  const activeExercises = props.workoutExercises
    .filter((exercise) => exercise.session_id === sessionId)
    .sort((a, b) => a.order - b.order);

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
    for (const [index, item] of template.exercises.entries()) {
      await addExerciseToSession(newSession.id, item, index, props.workoutSets, props.workoutExercises);
    }
    setSessionId(newSession.id);
    await props.refresh();
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
    for (const exercise of exercises) {
      const newExercise = { ...exercise, id: makeId("workout_exercise"), session_id: newSession.id, created_at: timestamp, updated_at: timestamp };
      await db.workout_exercises.put(newExercise);
      const sets = props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id);
      await db.workout_sets.bulkPut(sets.map((set) => ({ ...set, id: makeId("set"), workout_exercise_id: newExercise.id, created_at: timestamp, updated_at: timestamp })));
    }
    setSessionId(newSession.id);
    await props.refresh();
  };

  const exerciseResults = props.exercisePresets
    .filter((item) => {
      if (mode === "body" && filter) return item.body_part === filter;
      if (mode === "equipment" && filter) return item.equipment_type === filter;
      if (mode === "search" && filter) return item.name.includes(filter) || item.body_part.includes(filter) || item.equipment_type.includes(filter);
      return mode === "search";
    })
    .slice(0, 40);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {(["favorite", "preset", "body", "equipment", "previous", "search"] as const).map((item) => (
          <button className={`mode-button ${mode === item ? "mode-button-active" : ""}`} key={item} onClick={() => setMode(item)}>{workoutModeLabel(item)}</button>
        ))}
      </div>

      {(mode === "favorite" || mode === "preset") && (
        <section className="compact-card divide-y divide-line">
          <ListHeader title={mode === "favorite" ? "お気に入りワークアウト" : "自分のプリセット"} value={`${props.workoutTemplates.length}件`} />
          {props.workoutTemplates.map((template) => (
            <button className="flex w-full items-center justify-between px-4 py-4 text-left" key={template.id} onClick={() => startFromTemplate(template)}>
              <div>
                <p className="text-sm font-bold">{template.name}</p>
                <p className="text-xs text-moss">{template.body_parts.join(" / ")} · {template.exercises.length}種目</p>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
          {props.workoutTemplates.length === 0 && <EmptyLine text="ワークアウト後に「現在の内容をプリセット保存」でここから呼び出せます" />}
        </section>
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
              <button className="flex w-full items-center justify-between py-3 text-left" key={exercise.id} onClick={async () => {
                let targetSessionId = sessionId;
                if (!targetSessionId) {
                  targetSessionId = makeId("session");
                  const timestamp = nowIso();
                  await db.workout_sessions.put({
                    id: targetSessionId,
                    app_date: props.appDate,
                    logged_at: timestamp,
                    title: "フリーワークアウト",
                    workout_type: "strength",
                    body_parts: [exercise.body_part],
                    created_at: timestamp,
                    updated_at: timestamp,
                  });
                  setSessionId(targetSessionId);
                }
                await addExerciseToSession(targetSessionId, {
                  exercise_id: exercise.id,
                  exercise_name: exercise.name,
                  body_part: exercise.body_part,
                  equipment_type: exercise.equipment_type,
                  sets: exercise.default_sets ?? 3,
                  reps: exercise.default_reps,
                  duration_min: exercise.default_duration_min,
                }, props.workoutExercises.filter((item) => item.session_id === targetSessionId).length, props.workoutSets, props.workoutExercises);
                await props.refresh();
              }}>
                <div>
                  <p className="text-sm font-semibold">{exercise.name}</p>
                  <p className="text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
                </div>
                <Plus size={17} />
              </button>
            ))}
          </div>
        </section>
      )}

      {activeSession && (
        <section className="compact-card divide-y divide-line">
          <ListHeader title={activeSession.title} value={`${activeExercises.length}種目`} />
          {activeExercises.map((exercise) => (
            <WorkoutExerciseEditor
              key={exercise.id}
              exercise={exercise}
              sets={props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id).sort((a, b) => a.set_order - b.set_order)}
              bodyWeightKg={props.profile?.current_weight_kg ?? 70}
              refresh={props.refresh}
            />
          ))}
          <div className="p-3">
            <button className="secondary-button w-full" onClick={async () => {
              const sessionExercises = props.workoutExercises.filter((exercise) => exercise.session_id === activeSession.id);
              const template: WorkoutTemplate = {
                id: makeId("template_user"),
                name: `${activeSession.title} preset`,
                body_parts: activeSession.body_parts,
                exercises: sessionExercises.map((exercise) => ({
                  exercise_id: exercise.exercise_id,
                  exercise_name: exercise.exercise_name,
                  body_part: exercise.body_part,
                  equipment_type: exercise.equipment_type,
                  sets: props.workoutSets.filter((set) => set.workout_exercise_id === exercise.id).length || 3,
                  reps: props.workoutSets.find((set) => set.workout_exercise_id === exercise.id)?.reps,
                  weight_kg: props.workoutSets.find((set) => set.workout_exercise_id === exercise.id)?.weight_kg,
                })),
                is_public_preset: false,
                is_user_created: true,
                created_at: nowIso(),
                updated_at: nowIso(),
              };
              await db.workout_templates.put(template);
              await props.refresh();
            }}><Archive size={17} />現在の内容をプリセット保存</button>
          </div>
        </section>
      )}

      <section className="compact-card divide-y divide-line">
        <ListHeader title="履歴" value={`${props.workoutSessions.length}件`} />
        {props.workoutSessions.slice(0, 12).map((session) => (
          <button className="flex w-full items-center justify-between px-4 py-3 text-left" key={session.id} onClick={() => setSessionId(session.id)}>
            <div>
              <p className="text-sm font-semibold">{session.title}</p>
              <p className="text-xs text-moss">{formatJapaneseDate(session.app_date)} · {session.body_parts.join(" / ")}</p>
            </div>
            <ChevronRight size={17} />
          </button>
        ))}
      </section>
    </div>
  );
}

function SettingsTab(props: {
  profile?: Profile;
  goals: Goal[];
  activeGoal?: Goal;
  menuItems: MenuItem[];
  workoutTemplates: WorkoutTemplate[];
  focus?: SettingsFocus;
  backupInfo: BackupInfo;
  markBackupNow: () => void;
  refresh: () => Promise<void>;
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
  });
  const [presetDraft, setPresetDraft] = useState({ ...emptyManual, name: "", savePreset: true });
  const [reportMode, setReportMode] = useState<ReportMode>("day");
  const [reportDays, setReportDays] = useState(14);
  const [question, setQuestion] = useState("");
  const [report, setReport] = useState("");
  const [copiedReport, setCopiedReport] = useState(false);

  const calculated = props.profile
    ? calculateTargets({
        profile: props.profile,
        age: goalDraft.age,
        sex: props.profile.sex,
        activity_level: goalDraft.activity_level,
        phase: goalDraft.phase,
        manual_target_calories: goalDraft.manual_target_calories || undefined,
        manual_protein_g: goalDraft.manual_protein_g || undefined,
      })
    : undefined;

  const aiReportSection = (
    <section className={`compact-card p-4 ${props.focus === "ai" ? "border-2 border-leaf" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">AI相談レポート</h2>
        {props.focus === "ai" && <span className="rounded-md bg-leaf px-2 py-1 text-[11px] font-bold text-white">相談を作成</span>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className={`mode-button ${reportMode === "day" ? "mode-button-active" : ""}`} onClick={() => setReportMode("day")}>1日</button>
        <button className={`mode-button ${reportMode === "period" ? "mode-button-active" : ""}`} onClick={() => setReportMode("period")}>期間</button>
      </div>
      {reportMode === "period" && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {[7, 14, 30].map((days) => <button className={`chip justify-center ${reportDays === days ? "chip-active" : ""}`} key={days} onClick={() => setReportDays(days)}>{days}日</button>)}
          <button className="chip justify-center" onClick={() => setReportDays(14)}>標準</button>
        </div>
      )}
      <textarea className="mt-3 min-h-20 w-full" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="AIにコピーして相談できるレポートを生成します。特に相談したいことがあれば記入してください。なければそのまま生成を押してください" />
      <button className="primary-button mt-3 w-full" onClick={async () => {
        const end = todayAppDate();
        const start = reportMode === "day" ? end : addDays(end, -(reportDays - 1));
        const range = dateRange(start, end);
        const content = generateMarkdownReport({
          profile: props.profile,
          goal: props.activeGoal,
          foodEntries: props.allData.foodEntries.filter((entry) => range.includes(entry.app_date)),
          weightLogs: props.allData.weightLogs.filter((entry) => range.includes(entry.app_date)),
          workoutSessions: props.allData.workoutSessions.filter((entry) => range.includes(entry.app_date)),
          workoutExercises: props.allData.workoutExercises,
          workoutSets: props.allData.workoutSets,
          periodStart: start,
          periodEnd: end,
          question,
        });
        setReport(content);
        setCopiedReport(false);
        await db.ai_reports.put({ id: makeId("report"), period_start: start, period_end: end, format: "markdown", content, created_at: nowIso(), updated_at: nowIso() });
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
        <h2 className="font-bold">ゴール設定</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <select value={goalDraft.phase} onChange={(event) => setGoalDraft({ ...goalDraft, phase: event.target.value as Phase })}>
            {Object.entries(phaseLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <select value={goalDraft.activity_level} onChange={(event) => setGoalDraft({ ...goalDraft, activity_level: event.target.value as ActivityLevel })}>
            {Object.entries(activityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <NumberInput label="年齢" value={goalDraft.age} onChange={(value) => setGoalDraft({ ...goalDraft, age: value })} />
          <NumberInput label="目標体重" value={goalDraft.target_weight_kg} step={0.1} onChange={(value) => setGoalDraft({ ...goalDraft, target_weight_kg: value })} />
          <NumberInput label="kcal上書き (0=自動)" value={goalDraft.manual_target_calories} onChange={(value) => setGoalDraft({ ...goalDraft, manual_target_calories: value })} />
          <NumberInput label="P上書き (0=自動)" value={goalDraft.manual_protein_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_protein_g: value })} />
        </div>
        <p className="mt-3 rounded-md bg-rice p-3 text-sm">計算: {calculated?.target_calories ?? "-"} kcal / P{calculated?.target_protein_g ?? "-"} F{calculated?.target_fat_g ?? "-"} C{calculated?.target_carbs_g ?? "-"}</p>
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
          });
          await db.goals.put(goal);
          await db.settings.update("local", { active_goal_id: goal.id, updated_at: timestamp });
          await props.refresh();
        }}><Save size={17} />保存</button>
      </section>

      <section className="compact-card p-4">
        <h2 className="font-bold">個人メニューを追加</h2>
        <ManualFoodForm manual={presetDraft} setManual={setPresetDraft} compact onSave={async () => {
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
            default_meal_type: presetDraft.meal_type,
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

      <section className="compact-card p-4">
        <h2 className="font-bold">バックアップ</h2>
        <div className={`mt-2 rounded-md border p-3 text-sm ${props.backupInfo.level === "danger" ? "border-clay/40 bg-clay/10" : "border-leaf/40 bg-leaf/10"}`}>
          <p className="font-semibold text-ink">{backupMessage(props.backupInfo)}</p>
          <p className="mt-1 text-xs text-moss">目安は週1回。外食や筋トレを連日記録している時は、3-4日に1回保存しておくと安心です。</p>
        </div>
        <div className="mt-3 grid gap-2">
          <button className="secondary-button" onClick={async () => {
            downloadText(`phase-log-backup-${Date.now()}.json`, JSON.stringify(await exportBackup(), null, 2));
            props.markBackupNow();
          }}><FileDown size={17} />JSONエクスポート</button>
          <label className="secondary-button cursor-pointer">
            <Archive size={17} />JSONインポート
            <input className="hidden" type="file" accept="application/json" onChange={async (event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const payload = JSON.parse(await file.text()) as BackupPayload;
              await importBackup(payload);
              await props.refresh();
            }} />
          </label>
          <button className="secondary-button border-clay text-clay" onClick={() => {
            if (confirm("ローカルデータをすべて削除しますか？")) resetLocalData();
          }}><Trash2 size={17} />リセット</button>
        </div>
      </section>

      <section className="compact-card p-4 text-sm text-moss">
        <p className="font-semibold text-ink">ゴールトラッカー</p>
        <p>IndexedDB local-only · no login · no backend</p>
        <p className="mt-2">同じURLを友達が開いても、ログは各iPhone内に別々に保存されます。</p>
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
    manual_target_calories: draft.target_calories || undefined,
    manual_protein_g: draft.target_protein_g || undefined,
  });

  return (
    <main className="mx-auto min-h-screen max-w-[430px] bg-rice px-4 py-8 text-ink">
      <div className="compact-card p-5">
        <h1 className="text-2xl font-black tracking-normal">ゴールトラッカー</h1>
        <section className="mt-4 rounded-md border border-leaf/30 bg-leaf/10 p-3 text-sm">
          <p className="font-bold">前に使っていたデータがある場合</p>
          <p className="mt-1 text-xs text-moss">アップデート後や別のiPhoneでこの画面が出たら、設定で保存したバックアップJSONを読み込んで復元してください。</p>
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
              } catch {
                setRestoreMessage("読み込みに失敗しました。JSONファイルを確認してください。");
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
          <select value={draft.phase} onChange={(event) => setDraft({ ...draft, phase: event.target.value as Phase })}>
            {Object.entries(phaseLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <select value={draft.activity_level} onChange={(event) => setDraft({ ...draft, activity_level: event.target.value as ActivityLevel })}>
            {Object.entries(activityLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <NumberInput label="目標体重" value={draft.target_weight_kg} step={0.1} onChange={(value) => setDraft({ ...draft, target_weight_kg: value })} />
          <NumberInput label="筋トレ/週" value={draft.workouts} onChange={(value) => setDraft({ ...draft, workouts: value })} />
          <NumberInput label="有酸素/週" value={draft.cardio} onChange={(value) => setDraft({ ...draft, cardio: value })} />
          <NumberInput label="kcal上書き (0=自動)" value={draft.target_calories} onChange={(value) => setDraft({ ...draft, target_calories: value })} />
          <NumberInput label="P上書き (0=自動)" value={draft.target_protein_g} onChange={(value) => setDraft({ ...draft, target_protein_g: value })} />
        </div>
        <p className="mt-3 rounded-md bg-surface p-3 text-xs text-moss">初回設定後は、Settingsのバックアップから週1回くらいJSONエクスポートしておくと、次にこの画面が出ても復元できます。</p>
        <p className="mt-4 rounded-md bg-rice p-3 text-sm">目標: {calculated.target_calories} kcal / P{calculated.target_protein_g} F{calculated.target_fat_g} C{calculated.target_carbs_g}</p>
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

function ManualFoodForm({ manual, setManual, onSave, compact = false }: {
  manual: ManualFoodDraft;
  setManual: (manual: ManualFoodDraft) => void;
  onSave: () => void;
  compact?: boolean;
}) {
  const subcategories = genericCategories[manual.category] ?? [];
  return (
    <section className={compact ? "" : "compact-card p-4"}>
      {!compact && <h2 className="font-bold">手入力</h2>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <input className="col-span-2" value={manual.name} onChange={(event) => setManual({ ...manual, name: event.target.value })} placeholder="名前" />
        <input value={manual.brand} onChange={(event) => setManual({ ...manual, brand: event.target.value })} placeholder="ブランド" />
        <select value={manual.meal_type} onChange={(event) => setManual({ ...manual, meal_type: event.target.value as MealType })}>
          {Object.entries(mealLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <div className="col-span-2">
          <p className="mb-2 text-xs font-semibold">カテゴリ</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(genericCategories).map((category) => (
              <button className={`chip justify-center ${manual.category === category ? "chip-active" : ""}`} key={category} onClick={() => setManual({ ...manual, category, subcategory: genericCategories[category]?.[0] ?? "" })}>{category}</button>
            ))}
          </div>
          {!!subcategories.length && (
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {subcategories.map((subcategory) => (
                <button className={`chip ${manual.subcategory === subcategory ? "chip-active" : ""}`} key={subcategory} onClick={() => setManual({ ...manual, subcategory })}>{subcategory}</button>
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
        <label className="chip"><input type="checkbox" checked={manual.savePreset} onChange={(event) => setManual({ ...manual, savePreset: event.target.checked })} />プリセット保存</label>
        <label className="chip"><input type="checkbox" checked={manual.favorite} onChange={(event) => setManual({ ...manual, favorite: event.target.checked })} />お気に入り</label>
      </div>
      <button className="primary-button mt-3 w-full" onClick={onSave}><Save size={17} />保存</button>
    </section>
  );
}

function RoughFoodForm({ rough, setRough, onSave }: {
  rough: ManualFoodDraft;
  setRough: (manual: ManualFoodDraft) => void;
  onSave: () => void;
}) {
  return (
    <section className="compact-card p-4">
      <h2 className="font-bold">ざっくり</h2>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Object.entries(mealLabels).map(([key, label]) => (
          <button
            className={`tap-tile ${rough.meal_type === key ? "tap-tile-active" : ""}`}
            key={key}
            onClick={() => setRough({ ...rough, meal_type: key as MealType })}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <PartialNumberInput label="kcal" value={rough.calories} onChange={(value) => setRough({ ...rough, calories: value })} />
        <PartialNumberInput label="P" value={rough.protein_g} step={0.1} onChange={(value) => setRough({ ...rough, protein_g: value })} />
        <PartialNumberInput label="F" value={rough.fat_g} step={0.1} onChange={(value) => setRough({ ...rough, fat_g: value })} />
        <PartialNumberInput label="C" value={rough.carbs_g} step={0.1} onChange={(value) => setRough({ ...rough, carbs_g: value })} />
        <input value={rough.salt_g} onChange={(event) => setRough({ ...rough, salt_g: event.target.value })} placeholder="塩分 optional" />
        <input value={rough.note} onChange={(event) => setRough({ ...rough, note: event.target.value })} placeholder="メモ" />
      </div>
      <button className="primary-button mt-3 w-full" onClick={onSave}><Save size={17} />保存</button>
    </section>
  );
}

function FoodItemRow({ item, onPick, onClone, refresh }: { item: MenuItem; onPick: (item: MenuItem) => void; onClone: (item: MenuItem) => void; refresh: () => Promise<void> }) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3">
      <button className="min-w-0 flex-1 text-left" onClick={() => onPick(item)}>
        <p className="truncate text-sm font-semibold">{item.name}</p>
        <p className="truncate text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
        <div className="mt-1">
          <SourceBadge source={item.data_source} confidence={item.confidence} />
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

function WorkoutExerciseEditor({
  exercise,
  sets,
  bodyWeightKg,
  refresh,
}: {
  exercise: WorkoutExercise;
  sets: WorkoutSet[];
  bodyWeightKg: number;
  refresh: () => Promise<void>;
}) {
  const isCardio = exercise.body_part === "有酸素" || exercise.equipment_type === "有酸素";
  return (
    <div className="p-4">
      <p className="text-sm font-bold">{exercise.exercise_name}</p>
      <p className="text-xs text-moss">{exercise.body_part} · {exercise.equipment_type}</p>
      <div className="mt-3 space-y-2">
        {sets.map((set) => (
          <div className={isCardio ? "grid grid-cols-[28px_1fr_72px_36px] items-center gap-2" : "grid grid-cols-[28px_1fr_1fr_36px] items-center gap-2"} key={set.id}>
            <span className="text-xs font-bold text-moss">{set.set_order}</span>
            {isCardio ? (
              <>
                <Stepper value={set.duration_min ?? 20} suffix="min" step={5} onChange={async (value) => {
                  await db.workout_sets.update(set.id, {
                    duration_min: value,
                    active_calories: estimateActiveCalories(exercise.exercise_name, value, bodyWeightKg),
                    updated_at: nowIso(),
                  });
                  await refresh();
                }} />
                <p className="text-right text-xs font-bold text-moss">{set.active_calories ?? estimateActiveCalories(exercise.exercise_name, set.duration_min ?? 20, bodyWeightKg)} kcal</p>
              </>
            ) : (
              <>
                <Stepper value={set.weight_kg ?? 0} suffix="kg" step={2.5} onChange={async (value) => { await db.workout_sets.update(set.id, { weight_kg: value, updated_at: nowIso() }); await refresh(); }} />
                <Stepper value={set.reps ?? 0} suffix="rep" step={1} onChange={async (value) => { await db.workout_sets.update(set.id, { reps: value, updated_at: nowIso() }); await refresh(); }} />
              </>
            )}
            <button className="icon-button h-9 w-9" aria-label="削除" onClick={async () => { await db.workout_sets.delete(set.id); await refresh(); }}><Trash2 size={14} /></button>
          </div>
        ))}
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
        }}><Plus size={16} />追加</button>
        <button className="secondary-button" onClick={async () => {
          const previous = sets.at(-1);
          if (!previous) return;
          await db.workout_sets.put({ ...previous, id: makeId("set"), set_order: sets.length + 1, created_at: nowIso(), updated_at: nowIso() });
          await refresh();
        }}>複製</button>
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

function NumberInput({ label, value, step = 1, onChange }: { label: string; value: number; step?: number; onChange: (value: number) => void }) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <input className="mt-1 w-full" type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
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

function MacroLine({ label, value, target, color = "#8fb48e" }: { label: string; value: number; target: number; color?: string }) {
  const percent = target ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div className="w-28">
      <div className="flex justify-between"><span>{label}</span><span>{round1(value)}/{target}</span></div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full" style={{ width: `${percent}%`, backgroundColor: color }} /></div>
    </div>
  );
}

function getCalorieState(remaining: number, target: number) {
  if (target <= 0) {
    return {
      label: "未設定",
      displayValue: "-",
      subtitle: "目標kcalを設定すると状態を表示します",
      cardClass: "calorie-card-neutral",
      badgeClass: "bg-ink/5 text-moss",
      valueClass: "text-ink",
    };
  }
  if (remaining < 0) {
    return {
      label: "オーバー",
      displayValue: Math.abs(remaining),
      subtitle: `${Math.abs(remaining)} kcal超過`,
      cardClass: "calorie-card-over",
      badgeClass: "bg-clay text-white",
      valueClass: "text-clay",
    };
  }
  if (remaining <= 100) {
    return {
      label: "ほぼ目標",
      displayValue: remaining,
      subtitle: remaining === 0 ? "ぴったり目標" : `あと ${remaining} kcal`,
      cardClass: "calorie-card-on-track",
      badgeClass: "bg-moss text-white",
      valueClass: "text-moss",
    };
  }
  return {
    label: "不足",
    displayValue: remaining,
    subtitle: `あと ${remaining} kcal`,
    cardClass: "calorie-card-under",
    badgeClass: "bg-sun text-white",
    valueClass: "text-[#8a5d13]",
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

function EmptyLine({ text }: { text: string }) {
  return <p className="px-4 py-5 text-center text-sm text-moss">{text}</p>;
}

function TabButton({ active, icon, label, onClick }: { active: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button className={`flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[11px] font-bold ${active ? "bg-moss text-white" : "text-moss"}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function QuickStrip({ title, items, fallback, onPick }: { title: string; items: MenuItem[]; fallback: MenuItem[]; onPick: (item: MenuItem) => void }) {
  const visible = items.length ? items : fallback;
  if (!visible.length) return null;
  return (
    <section className="compact-card p-3">
      <p className="mb-2 text-xs font-bold text-moss">{title}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {visible.slice(0, 10).map((item) => <button className="chip" key={item.id} onClick={() => onPick(item)}>{item.name}</button>)}
      </div>
    </section>
  );
}

async function addExerciseToSession(
  sessionId: string,
  item: TemplateExercise,
  order: number,
  allSets: WorkoutSet[],
  allExercises: WorkoutExercise[],
) {
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
  const setCount = previousSets.length || item.sets || 3;
  const sets = Array.from({ length: setCount }, (_, index) => {
    const previous = previousSets[index] ?? previousSets.at(-1);
    const durationMin = previous?.duration_min ?? item.duration_min;
    return {
      id: makeId("set"),
      workout_exercise_id: exercise.id,
      set_order: index + 1,
      weight_kg: previous?.weight_kg ?? item.weight_kg ?? 0,
      reps: previous?.reps ?? item.reps ?? 10,
      duration_min: durationMin,
      active_calories: item.body_part === "有酸素" && durationMin ? estimateActiveCalories(item.exercise_name, durationMin, 70) : undefined,
      is_warmup: false,
      created_at: timestamp,
      updated_at: timestamp,
    };
  });
  await db.workout_sets.bulkPut(sets);
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

function movingAverage(logs: WeightLog[], count: number) {
  const recent = logs.slice(-count);
  if (!recent.length) return undefined;
  return round1(recent.reduce((sum, log) => sum + log.weight_kg, 0) / recent.length);
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
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
    quick: "見積",
    rough: "ざっくり",
    manual: "手入力",
    personal: "個人",
  }[mode];
}

function toManualDraft(item: MenuItem, mealType: MealType = "lunch"): ManualFoodDraft {
  const category = genericCategories[item.category] ? item.category : "チェーン店";
  const subcategory = item.tags.find((tag) => genericCategories[category]?.includes(tag)) ?? genericCategories[category]?.[0] ?? "";
  return {
    name: item.name,
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

function sourceLabel(source: MenuItem["data_source"], confidence: MenuItem["confidence"]) {
  const sourceText = {
    official: "公式値",
    unofficial: "非公式値",
    estimated: "推定値",
    quick_estimate: "ざっくり概算",
    user: "自分で入力",
  }[source];
  const confidenceText = confidence === "low" ? "一部不明" : confidence === "medium" ? "確認推奨" : "";
  return [sourceText, confidenceText].filter(Boolean).join(" · ");
}

function SourceBadge({ source, confidence }: { source: MenuItem["data_source"]; confidence: MenuItem["confidence"] }) {
  return (
    <span className={`source-badge ${sourceBadgeClass(source)}`}>
      {sourceLabel(source, confidence)}
    </span>
  );
}

function sourceBadgeClass(source: MenuItem["data_source"]) {
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

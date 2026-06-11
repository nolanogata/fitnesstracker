import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Activity,
  Archive,
  Check,
  ChevronRight,
  Dumbbell,
  FileDown,
  FileText,
  Heart,
  Home,
  Minus,
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
type FoodMode = "search" | "chain" | "category" | "quick" | "manual" | "personal";

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
  ファミレス: ["サイゼリヤ", "ガスト", "デニーズ", "ジョイフル", "ロイヤルホスト"],
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
  サプリ: ["プロテイン", "プロテインバー", "その他"],
  その他: ["不明"],
};

const emptyManual = {
  name: "",
  brand: "",
  meal_type: "lunch" as MealType,
  category: "自炊",
  calories: 0,
  protein_g: 0,
  fat_g: 0,
  carbs_g: 0,
  salt_g: "",
  note: "",
  savePreset: false,
  favorite: false,
};

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

  if (settings && !settings.onboarding_completed) {
    return <Onboarding refresh={refresh} />;
  }

  return (
    <main className="mx-auto min-h-screen max-w-[430px] bg-rice text-ink">
      <header className="safe-top sticky top-0 z-20 border-b border-line bg-rice/95 px-4 pb-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-moss">{formatJapaneseDate(appDate)}</p>
            <h1 className="text-xl font-bold tracking-normal">Phase Log</h1>
          </div>
          <div className="rounded-md bg-white px-3 py-2 text-right text-xs shadow-soft">
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
            setTab={setTab}
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
            refresh={refresh}
            allData={{ foodEntries, weightLogs, workoutSessions, workoutExercises, workoutSets }}
          />
        )}
      </section>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-line bg-white px-3 pt-2">
        <div className="grid grid-cols-4 gap-1">
          <TabButton active={tab === "home"} icon={<Home size={19} />} label="Home" onClick={() => setTab("home")} />
          <TabButton active={tab === "food"} icon={<Utensils size={19} />} label="Food" onClick={() => setTab("food")} />
          <TabButton active={tab === "workout"} icon={<Dumbbell size={19} />} label="Workout" onClick={() => setTab("workout")} />
          <TabButton active={tab === "settings"} icon={<Settings size={19} />} label="Settings" onClick={() => setTab("settings")} />
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
  setTab: (tab: Tab) => void;
  refresh: () => Promise<void>;
}) {
  const [weight, setWeight] = useState(props.latestWeight?.weight_kg ?? props.profile?.current_weight_kg ?? 70);
  const remaining = (props.goal?.target_calories ?? 0) - props.dayTotals.calories;
  const average7 = movingAverage(props.weightLogs, 7);
  return (
    <div className="space-y-4">
      <section className="compact-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-moss">Remaining</p>
            <p className="mt-1 text-4xl font-black tracking-normal">{remaining}</p>
            <p className="text-sm text-moss">{props.dayTotals.calories} / {props.goal?.target_calories ?? "-"} kcal</p>
          </div>
          <div className="grid gap-1 text-right text-xs">
            <MacroLine label="P" value={props.dayTotals.protein} target={props.goal?.target_protein_g ?? 0} />
            <MacroLine label="F" value={props.dayTotals.fat} target={props.goal?.target_fat_g ?? 0} />
            <MacroLine label="C" value={props.dayTotals.carbs} target={props.goal?.target_carbs_g ?? 0} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <button className="primary-button" onClick={() => props.setTab("food")}><Utensils size={17} />食事を追加</button>
        <button className="secondary-button" onClick={() => props.setTab("workout")}><Dumbbell size={17} />筋トレ</button>
        <button className="secondary-button" onClick={() => props.setTab("settings")}><Activity size={17} />ゴール</button>
        <button className="secondary-button" onClick={() => props.setTab("settings")}><FileText size={17} />AI相談</button>
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
  const [chainCategory, setChainCategory] = useState("牛丼・丼");
  const [brand, setBrand] = useState("松屋");
  const [genericCategory, setGenericCategory] = useState("ごはん・丼");

  const recentIds = new Set(props.foodEntries.slice(0, 20).map((entry) => entry.menu_item_id).filter(Boolean));
  const favoriteItems = props.menuItems.filter((item) => item.is_favorite);
  const recentItems = props.menuItems.filter((item) => recentIds.has(item.id));
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const base = props.menuItems.filter((item) => {
      if (mode === "quick") return item.data_source === "quick_estimate";
      if (mode === "personal") return item.is_user_created;
      if (mode === "chain") return item.brand === brand;
      if (mode === "category") return item.category === genericCategory || item.tags.some((tag) => genericCategories[genericCategory]?.includes(tag));
      return true;
    });
    const sorted = [...base].sort((a, b) => sourceRank(a.data_source) - sourceRank(b.data_source));
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

  const saveManual = async () => {
    if (!manual.name.trim()) return;
    const timestamp = nowIso();
    let menuItemId: string | undefined;
    if (manual.savePreset) {
      menuItemId = makeId("menu_user");
      await db.menu_items.put({
        id: menuItemId,
        name: manual.name,
        brand: manual.brand || undefined,
        category: manual.category,
        tags: [manual.category, manual.brand].filter(Boolean),
        calories: Number(manual.calories),
        protein_g: Number(manual.protein_g),
        fat_g: Number(manual.fat_g),
        carbs_g: Number(manual.carbs_g),
        salt_g: manual.salt_g === "" ? undefined : Number(manual.salt_g),
        default_meal_type: manual.meal_type,
        data_source: "user",
        confidence: "high",
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
      calories: Number(manual.calories),
      protein_g: Number(manual.protein_g),
      fat_g: Number(manual.fat_g),
      carbs_g: Number(manual.carbs_g),
      salt_g: manual.salt_g === "" ? undefined : Number(manual.salt_g),
      portion_multiplier: 1,
      entry_source: "user",
      confidence: "high",
      menu_item_id: menuItemId,
      note: manual.note || undefined,
      created_at: timestamp,
      updated_at: timestamp,
    });
    setManual(emptyManual);
    await props.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-[74px] z-10 -mx-4 bg-rice px-4 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 text-moss" size={18} />
          <input className="w-full pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="食品・ブランド検索" />
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {(["search", "chain", "category", "quick", "manual", "personal"] as FoodMode[]).map((item) => (
            <button key={item} className={`chip ${mode === item ? "chip-active" : ""}`} onClick={() => setMode(item)}>
              {foodModeLabel(item)}
            </button>
          ))}
        </div>
      </div>

      {mode === "chain" && (
        <section className="compact-card p-3">
          <select className="w-full" value={chainCategory} onChange={(event) => {
            setChainCategory(event.target.value);
            setBrand(chainCategories[event.target.value]?.[0] ?? "");
          }}>
            {Object.keys(chainCategories).map((item) => <option key={item}>{item}</option>)}
          </select>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {chainCategories[chainCategory].map((item) => (
              <button className={`chip ${brand === item ? "chip-active" : ""}`} key={item} onClick={() => setBrand(item)}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode === "category" && (
        <section className="compact-card p-3">
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(genericCategories).map((item) => (
              <button className={`chip justify-center ${genericCategory === item ? "chip-active" : ""}`} key={item} onClick={() => setGenericCategory(item)}>{item}</button>
            ))}
          </div>
        </section>
      )}

      {mode !== "manual" && (
        <>
          {mode === "search" && (
            <QuickStrip title="Recent" items={recentItems} onPick={setSelected} fallback={favoriteItems} />
          )}
          <section className="compact-card divide-y divide-line overflow-hidden">
            <ListHeader title={foodModeLabel(mode)} value={`${results.length}件`} />
            {results.map((item) => <FoodItemRow key={item.id} item={item} onPick={setSelected} refresh={props.refresh} />)}
            {results.length === 0 && <EmptyLine text="見つかりません" />}
          </section>
        </>
      )}

      {mode === "manual" && (
        <ManualFoodForm manual={manual} setManual={setManual} onSave={saveManual} />
      )}

      <section className="compact-card divide-y divide-line">
        <ListHeader title="今日の食事ログ" value={`${props.foodEntries.filter((entry) => entry.app_date === props.appDate).length}件`} />
        {props.foodEntries.filter((entry) => entry.app_date === props.appDate).map((entry) => (
          <div className="flex items-center justify-between px-4 py-3" key={entry.id}>
            <div>
              <p className="text-sm font-semibold">{entry.name}</p>
              <p className="text-xs text-moss">{mealLabels[entry.meal_type]} · {entry.entry_source}</p>
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
  const [mode, setMode] = useState<"preset" | "body" | "equipment" | "previous" | "search">("preset");
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
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["preset", "body", "equipment", "previous", "search"] as const).map((item) => (
          <button className={`chip ${mode === item ? "chip-active" : ""}`} key={item} onClick={() => setMode(item)}>{workoutModeLabel(item)}</button>
        ))}
      </div>

      {mode === "preset" && (
        <section className="compact-card divide-y divide-line">
          <ListHeader title="自分のプリセット" value={`${props.workoutTemplates.length}件`} />
          {props.workoutTemplates.map((template) => (
            <button className="flex w-full items-center justify-between px-4 py-3 text-left" key={template.id} onClick={() => startFromTemplate(template)}>
              <div>
                <p className="text-sm font-bold">{template.name}</p>
                <p className="text-xs text-moss">{template.body_parts.join(" / ")} · {template.exercises.length}種目</p>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </section>
      )}

      {mode === "previous" && (
        <button className="primary-button w-full" onClick={copyPrevious}><RotateCcw size={17} />前回コピー</button>
      )}

      {(mode === "body" || mode === "equipment" || mode === "search") && (
        <section className="compact-card p-3">
          {mode === "search" ? (
            <input className="w-full" value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="種目検索" />
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {unique(props.exercisePresets.map((item) => mode === "body" ? item.body_part : item.equipment_type)).map((item) => (
                <button className={`chip ${filter === item ? "chip-active" : ""}`} key={item} onClick={() => setFilter(item)}>{item}</button>
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
    manual_target_calories: props.activeGoal?.target_calories ?? 0,
    manual_protein_g: props.activeGoal?.target_protein_g ?? 0,
  });
  const [presetDraft, setPresetDraft] = useState({ ...emptyManual, name: "", savePreset: true });
  const [reportDays, setReportDays] = useState(14);
  const [question, setQuestion] = useState("");
  const [report, setReport] = useState("");

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

  return (
    <div className="space-y-4">
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
          <NumberInput label="kcal上書き" value={goalDraft.manual_target_calories} onChange={(value) => setGoalDraft({ ...goalDraft, manual_target_calories: value })} />
          <NumberInput label="P上書き" value={goalDraft.manual_protein_g} onChange={(value) => setGoalDraft({ ...goalDraft, manual_protein_g: value })} />
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
        <h2 className="font-bold">個人フードプリセット</h2>
        <ManualFoodForm manual={presetDraft} setManual={setPresetDraft} compact onSave={async () => {
          if (!presetDraft.name.trim()) return;
          const timestamp = nowIso();
          await db.menu_items.put({
            id: makeId("menu_user"),
            name: presetDraft.name,
            brand: presetDraft.brand || undefined,
            category: presetDraft.category,
            tags: [presetDraft.category, presetDraft.brand].filter(Boolean),
            calories: Number(presetDraft.calories),
            protein_g: Number(presetDraft.protein_g),
            fat_g: Number(presetDraft.fat_g),
            carbs_g: Number(presetDraft.carbs_g),
            salt_g: presetDraft.salt_g === "" ? undefined : Number(presetDraft.salt_g),
            default_meal_type: presetDraft.meal_type,
            data_source: "user",
            confidence: "high",
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

      <section className="compact-card p-4">
        <h2 className="font-bold">AI相談レポート</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[7, 14, 30].map((days) => <button className={`chip justify-center ${reportDays === days ? "chip-active" : ""}`} key={days} onClick={() => setReportDays(days)}>{days}日</button>)}
          <button className="chip justify-center" onClick={() => setReportDays(14)}>標準</button>
        </div>
        <textarea className="mt-3 min-h-20 w-full" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="相談したいこと" />
        <button className="primary-button mt-3 w-full" onClick={async () => {
          const end = todayAppDate();
          const start = addDays(end, -(reportDays - 1));
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
          await db.ai_reports.put({ id: makeId("report"), period_start: start, period_end: end, format: "markdown", content, created_at: nowIso(), updated_at: nowIso() });
        }}><FileText size={17} />生成</button>
        {report && (
          <>
            <textarea className="mt-3 min-h-56 w-full font-mono text-xs" value={report} readOnly />
            <button className="secondary-button mt-2 w-full" onClick={() => downloadText(`phase-log-report-${Date.now()}.md`, report, "text/markdown")}><FileDown size={17} />Markdown保存</button>
          </>
        )}
      </section>

      <section className="compact-card p-4">
        <h2 className="font-bold">バックアップ</h2>
        <p className="mt-2 rounded-md border border-clay/30 bg-clay/10 p-3 text-sm text-ink">ローカル保存のため、定期的にバックアップしてください</p>
        <div className="mt-3 grid gap-2">
          <button className="secondary-button" onClick={async () => downloadText(`phase-log-backup-${Date.now()}.json`, JSON.stringify(await exportBackup(), null, 2))}><FileDown size={17} />JSONエクスポート</button>
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
        <p className="font-semibold text-ink">Phase Log Local</p>
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
        <h1 className="text-2xl font-black tracking-normal">Phase Log Local</h1>
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
          <NumberInput label="kcal上書き" value={draft.target_calories} onChange={(value) => setDraft({ ...draft, target_calories: value })} />
          <NumberInput label="P上書き" value={draft.target_protein_g} onChange={(value) => setDraft({ ...draft, target_protein_g: value })} />
        </div>
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
  manual: typeof emptyManual;
  setManual: (manual: typeof emptyManual) => void;
  onSave: () => void;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "" : "compact-card p-4"}>
      {!compact && <h2 className="font-bold">手入力</h2>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <input className="col-span-2" value={manual.name} onChange={(event) => setManual({ ...manual, name: event.target.value })} placeholder="名前" />
        <input value={manual.brand} onChange={(event) => setManual({ ...manual, brand: event.target.value })} placeholder="ブランド" />
        <select value={manual.meal_type} onChange={(event) => setManual({ ...manual, meal_type: event.target.value as MealType })}>
          {Object.entries(mealLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <input value={manual.category} onChange={(event) => setManual({ ...manual, category: event.target.value })} placeholder="カテゴリ" />
        <NumberInput label="kcal" value={manual.calories} onChange={(value) => setManual({ ...manual, calories: value })} />
        <NumberInput label="P" value={manual.protein_g} step={0.1} onChange={(value) => setManual({ ...manual, protein_g: value })} />
        <NumberInput label="F" value={manual.fat_g} step={0.1} onChange={(value) => setManual({ ...manual, fat_g: value })} />
        <NumberInput label="C" value={manual.carbs_g} step={0.1} onChange={(value) => setManual({ ...manual, carbs_g: value })} />
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

function FoodItemRow({ item, onPick, refresh }: { item: MenuItem; onPick: (item: MenuItem) => void; refresh: () => Promise<void> }) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3">
      <button className="min-w-0 flex-1 text-left" onClick={() => onPick(item)}>
        <p className="truncate text-sm font-semibold">{item.name}</p>
        <p className="truncate text-xs text-moss">{item.brand ?? item.category} · {item.calories}kcal · P{item.protein_g} F{item.fat_g} C{item.carbs_g}</p>
        <p className="text-[11px] text-clay">{item.data_source} · {item.confidence}</p>
      </button>
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

function MacroLine({ label, value, target }: { label: string; value: number; target: number }) {
  const percent = target ? Math.min(100, Math.round((value / target) * 100)) : 0;
  return (
    <div className="w-28">
      <div className="flex justify-between"><span>{label}</span><span>{round1(value)}/{target}</span></div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full bg-leaf" style={{ width: `${percent}%` }} /></div>
    </div>
  );
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
    <button className={`flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[11px] font-bold ${active ? "bg-ink text-white" : "text-moss"}`} onClick={onClick}>
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
    chain: "チェーン",
    category: "カテゴリ",
    quick: "見積",
    manual: "手入力",
    personal: "個人",
  }[mode];
}

function sourceRank(source: MenuItem["data_source"]) {
  return { official: 0, user: 1, estimated: 2, quick_estimate: 3 }[source];
}

function workoutModeLabel(mode: "preset" | "body" | "equipment" | "previous" | "search") {
  return {
    preset: "プリセット",
    body: "部位",
    equipment: "器具",
    previous: "前回",
    search: "検索",
  }[mode];
}

export default App;

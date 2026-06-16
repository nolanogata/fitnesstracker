export type Phase =
  | "weight_loss"
  | "slow_cut"
  | "maintenance"
  | "lean_bulk"
  | "recomposition"
  | "strength_focus"
  | "custom";

export type Sex = "male" | "female" | "unspecified";
export type ActivityLevel = "low" | "moderate" | "high" | "very_high";
export type DataSource = "official" | "unofficial" | "estimated" | "quick_estimate" | "user";
export type Confidence = "high" | "medium" | "low";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "gym_before" | "gym_after";
export type ThemeMode = "system" | "light" | "dark";
export type SpecialModeId = "hokkaido_trip" | string;

export type SpecialModeSettings = {
  id: SpecialModeId;
  enabled: boolean;
  label?: string;
  short_label?: string;
  food_query?: string;
  deleted?: boolean;
  start_date?: string;
  end_date?: string;
  start_month_day?: string;
  end_month_day?: string;
  updated_at?: string;
};

export type AchievementUnlock = {
  id: string;
  unlocked_at: string;
};

export type Settings = {
  id: string;
  day_boundary_hour: number;
  onboarding_completed: boolean;
  theme_mode?: ThemeMode;
  active_goal_id?: string;
  hidden_workout_template_ids?: string[];
  special_modes?: SpecialModeSettings[];
  developer_test_active_until?: string;
  achievements?: AchievementUnlock[];
  achievements_viewed_at?: string;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  name: string;
  height_cm: number;
  birth_year: number;
  sex: Sex;
  current_weight_kg: number;
  body_fat_percentage?: number;
  created_at: string;
  updated_at: string;
};

export type Goal = {
  id: string;
  phase: Phase;
  age: number;
  activity_level: ActivityLevel;
  target_weight_kg?: number;
  target_body_fat_percentage?: number;
  target_date?: string;
  target_calories: number;
  target_protein_g: number;
  target_fat_g: number;
  target_carbs_g: number;
  manual_target_calories?: number;
  manual_protein_g?: number;
  manual_fat_g?: number;
  manual_carbs_g?: number;
  target_active_calories?: number;
  target_workouts_per_week?: number;
  target_cardio_sessions_per_week?: number;
  target_daily_calorie_adjustment?: number;
  target_weight_change_per_week_kg?: number;
  target_fat_mass_kg?: number;
  target_lean_mass_kg?: number;
  target_fat_mass_change_kg?: number;
  target_lean_mass_change_kg?: number;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type MenuItem = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  tags: string[];
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  serving_label?: string;
  weight_g?: number;
  default_meal_type?: MealType;
  data_source: DataSource;
  confidence: Confidence;
  source_url?: string;
  fetched_at?: string;
  is_public_preset: boolean;
  is_user_created: boolean;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
};

export type FoodEntry = {
  id: string;
  app_date: string;
  logged_at: string;
  meal_type: MealType;
  name: string;
  brand?: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
  portion_multiplier: number;
  entry_source: DataSource;
  confidence: Confidence;
  menu_item_id?: string;
  note?: string;
  created_at: string;
  updated_at: string;
};

export type WeightLog = {
  id: string;
  app_date: string;
  logged_at: string;
  weight_kg: number;
  body_fat_percentage?: number;
  lean_body_mass_kg?: number;
  note?: string;
  created_at: string;
  updated_at: string;
};

export type ExercisePreset = {
  id: string;
  name: string;
  body_part: string;
  equipment_type: string;
  movement_pattern: string;
  machine_name?: string;
  default_sets?: number;
  default_reps?: number;
  default_weight_kg?: number;
  default_duration_min?: number;
  default_set_scheme?: WorkoutSetPattern[];
  intensity_default?: string;
  is_public_preset: boolean;
  is_user_created: boolean;
  is_favorite?: boolean;
  preset_pack?: string;
  created_at: string;
  updated_at: string;
};

export type TemplateExercise = {
  exercise_id?: string;
  exercise_name: string;
  body_part: string;
  equipment_type: string;
  sets: number;
  reps?: number;
  weight_kg?: number;
  load_type?: WorkoutLoadType;
  duration_min?: number;
  set_scheme?: WorkoutSetPattern[];
};

export type WorkoutLoadType = "bodyweight" | "weighted" | "assisted";

export type WorkoutSetPattern = {
  weight_kg?: number;
  load_type?: WorkoutLoadType;
  reps?: number;
  duration_min?: number;
  active_calories?: number;
  intensity?: string;
  note?: string;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  icon_key?: WorkoutTemplateIconKey;
  body_parts: string[];
  exercises: TemplateExercise[];
  is_public_preset: boolean;
  is_user_created: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
};

export type WorkoutTemplateIconKey = "strength" | "upper" | "legs" | "back" | "core" | "cardio";

export type WorkoutSession = {
  id: string;
  app_date: string;
  logged_at: string;
  title: string;
  workout_type: string;
  body_parts: string[];
  template_id?: string;
  note?: string;
  created_at: string;
  updated_at: string;
};

export type WorkoutExercise = {
  id: string;
  session_id: string;
  exercise_id?: string;
  exercise_name: string;
  body_part: string;
  equipment_type: string;
  machine_name?: string;
  order: number;
  note?: string;
  created_at: string;
  updated_at: string;
};

export type WorkoutSet = {
  id: string;
  workout_exercise_id: string;
  set_order: number;
  weight_kg?: number;
  load_type?: WorkoutLoadType;
  reps?: number;
  duration_min?: number;
  active_calories?: number;
  intensity?: string;
  is_warmup: boolean;
  note?: string;
  created_at: string;
  updated_at: string;
};

export type AiReport = {
  id: string;
  period_start: string;
  period_end: string;
  format: "markdown";
  content: string;
  created_at: string;
  updated_at: string;
};

export type BackupPayload = {
  schema_version: number;
  exported_at: string;
  profile: Profile[];
  settings: Settings[];
  goals: Goal[];
  menu_items: MenuItem[];
  food_entries: FoodEntry[];
  weight_logs: WeightLog[];
  exercise_presets: ExercisePreset[];
  workout_templates: WorkoutTemplate[];
  workout_sessions: WorkoutSession[];
  workout_exercises: WorkoutExercise[];
  workout_sets: WorkoutSet[];
  ai_reports: AiReport[];
};

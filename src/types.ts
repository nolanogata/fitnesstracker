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
export type ActivityAveragingPeriod = "last_30_days" | "last_4_weeks" | "initial_setup";
export type ActivityDataSource = "apple_watch" | "apple_health" | "smartphone" | "wearable" | "user_estimate" | "unknown";
export type ActivityProfileDataSource = ActivityDataSource | "initial_setup";
export type ActivityProfile = {
  activity_level: ActivityLevel;
  average_steps?: number;
  average_active_calories?: number;
  average_exercise_minutes?: number;
  notes?: string;
  averaging_period: ActivityAveragingPeriod;
  data_source?: ActivityProfileDataSource;
  confirmed_at: string;
  updated_at: string;
};
export type RelativeActivityLevel = "low" | "normal" | "high" | "unknown";
export type DailyActivityContext = {
  date: string;
  relative_activity_level: RelativeActivityLevel;
  steps?: number;
  active_calories?: number;
  exercise_minutes?: number;
  walking_minutes?: number;
  cycling_minutes?: number;
  notes?: string;
  data_source?: ActivityDataSource;
};
export type ReportCoverage = "partial" | "completed";
export type MealRecordStatus = "declared_no_food" | "estimated_only" | "unrecorded" | "partial" | "excluded";
export type IntakeRelativeLevel = "none" | "much_less" | "less" | "normal" | "more" | "much_more" | "consumed_unknown" | "unknown";
export type IntakeEstimateConfidence = "low" | "medium" | "high";
export type FoodRecordConfirmationSource = "report_generation_prompt" | "daily_log" | "manual_edit" | "imported";
export type FoodRecordContext = {
  date: string;
  meal_record_status: MealRecordStatus;
  intake_relative_level: IntakeRelativeLevel;
  estimated_calories?: number;
  estimated_protein_g?: number;
  estimated_fat_g?: number;
  estimated_carbs_g?: number;
  intake_memo?: string;
  intake_estimate_confidence?: IntakeEstimateConfidence;
  confirmation_source: FoodRecordConfirmationSource;
  confirmed_at: string;
};
export type DataSource = "official" | "unofficial" | "estimated" | "quick_estimate" | "user";
export type Confidence = "high" | "medium" | "low";
export type NutritionOrigin =
  | "official_website"
  | "package_label"
  | "user_measured"
  | "user_entered"
  | "brand_match"
  | "ai_photo_estimate"
  | "manual_estimate"
  | "derived_calculation"
  | "unknown";
export type NutritionEstimationPolicy = "exact" | "estimated" | "neutral" | "safe_high" | "calories_exact_macros_estimated" | "quantity_estimated";
export type NutritionFieldKey = "calories" | "protein_g" | "fat_g" | "carbs_g";
export type NutritionFieldUncertainty = {
  minus?: number;
  plus?: number;
};
export type NutritionFieldEvidence = {
  origin: NutritionOrigin;
  confidence?: Confidence;
  estimation_policy: NutritionEstimationPolicy;
  uncertainty?: NutritionFieldUncertainty;
  evidence_note?: string;
};
export type NutritionQuantityMeta = {
  estimated: boolean;
  estimated_amount?: number;
  uncertainty_amount?: number;
  unit?: string;
  evidence_note?: string;
};
export type NutritionCompositionMeta = {
  estimated: boolean;
  evidence_note?: string;
};
export type NutritionComponent = {
  name: string;
  calories?: number;
  protein_g?: number;
  fat_g?: number;
  carbs_g?: number;
  source_url?: string;
  nutrition_meta?: Pick<NutritionMeta, "origin" | "estimation_policy" | "nutrient_evidence" | "evidence_note">;
};
export type NutritionCandidate = {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  salt_g?: number;
};
export type NutritionUncertainty = {
  calories?: number;
  protein_g?: number;
  fat_g?: number;
  carbs_g?: number;
};
export type NutritionMeta = {
  origin: NutritionOrigin;
  estimation_policy: NutritionEstimationPolicy;
  uncertainty?: NutritionUncertainty;
  evidence_note?: string;
  explicit_uncertainty?: boolean;
  import_group_id?: string;
  /** Field-level evidence takes precedence over legacy item-level metadata. */
  nutrient_evidence?: Partial<Record<NutritionFieldKey, NutritionFieldEvidence>>;
  quantity_meta?: NutritionQuantityMeta;
  /** Internal ingredient ratios are uncertain while the consumed total is known. */
  composition_meta?: NutritionCompositionMeta;
  components?: NutritionComponent[];
  /** Original AI candidate, retained only when it differs from the adopted entry values. */
  nutrition_candidate?: NutritionCandidate;
  analysis_fingerprint?: string;
};
export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "gym_before" | "gym_after";
export type ThemeMode = "system" | "light" | "dark";
export type ThemeAccent = "classic" | "orange" | "aqua" | "graphite" | "crazy_pink" | "crazy_yellow" | "vivid_neon";
export type ThemeCharacter =
  | "none"
  | "titan"
  | "flash"
  | "sage"
  | "volt"
  | "nova"
  | "grit"
  | "aegis"
  | "kitsune"
  | "lumen"
  | "koru"
  | "vito"
  | "aria";
export type ThemeCharacterProgressStage = "low" | "mid" | "high";
export type ThemeCharacterProgress = {
  app_date: string;
  unlocked_stages?: Partial<Record<Exclude<ThemeCharacter, "none">, ThemeCharacterProgressStage>>;
};
export type HomeBodyFatDisplay = "hidden" | "average7" | "today";
export type HomeWeightDisplay = "average7" | "today";
export type HomeNutritionRemainingDisplay = "recorded" | "safe";
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
  count?: number;
};

export type Settings = {
  id: string;
  day_boundary_hour: number;
  onboarding_completed: boolean;
  theme_mode?: ThemeMode;
  theme_accent?: ThemeAccent;
  theme_character?: ThemeCharacter;
  theme_character_variant?: string;
  theme_character_progress?: ThemeCharacterProgress;
  home_body_fat_display?: HomeBodyFatDisplay;
  home_weight_display?: HomeWeightDisplay;
  home_nutrition_remaining_display?: HomeNutritionRemainingDisplay;
  data_seed_version?: number;
  active_goal_id?: string;
  hidden_workout_template_ids?: string[];
  special_modes?: SpecialModeSettings[];
  pause_modes?: SpecialModeSettings[];
  developer_test_active_until?: string;
  developer_force_trophy_animation?: boolean;
  developer_progress_percent?: number;
  developer_test_overlay_enabled?: boolean;
  achievements?: AchievementUnlock[];
  achievements_viewed_at?: string;
  workout_weight_presets?: Record<string, number[]>;
  activity_profile?: ActivityProfile;
  activity_profile_prompt_dismissed_at?: string;
  activity_profile_prompt_next_at?: string;
  food_record_contexts?: Record<string, FoodRecordContext>;
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
  nutrition_meta?: NutritionMeta;
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
  nutrition_meta?: NutritionMeta;
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
  report_coverage?: ReportCoverage;
  activity_context?: DailyActivityContext;
  food_record_contexts?: FoodRecordContext[];
  delivery_mode?: AiReportDeliveryMode;
  full_content?: string;
  copied_at?: string;
  conversation_anchor_id?: string;
  previous_report_id?: string;
  created_at: string;
  updated_at: string;
};

export type AiReportDeliveryMode = "full" | "follow_up";

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

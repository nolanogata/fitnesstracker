import Dexie, { type Table } from "dexie";
import type {
  AiReport,
  ExercisePreset,
  FoodEntry,
  Goal,
  MenuItem,
  Profile,
  Settings,
  WeightLog,
  WorkoutExercise,
  WorkoutSession,
  WorkoutSet,
  WorkoutTemplate,
} from "./types";

export const SCHEMA_VERSION = 1;

class PhaseLogDb extends Dexie {
  settings!: Table<Settings, string>;
  profile!: Table<Profile, string>;
  goals!: Table<Goal, string>;
  menu_items!: Table<MenuItem, string>;
  food_entries!: Table<FoodEntry, string>;
  weight_logs!: Table<WeightLog, string>;
  exercise_presets!: Table<ExercisePreset, string>;
  workout_templates!: Table<WorkoutTemplate, string>;
  workout_sessions!: Table<WorkoutSession, string>;
  workout_exercises!: Table<WorkoutExercise, string>;
  workout_sets!: Table<WorkoutSet, string>;
  ai_reports!: Table<AiReport, string>;

  constructor() {
    super("phase_log_local");
    this.version(SCHEMA_VERSION).stores({
      settings: "id",
      profile: "id",
      goals: "id, is_active, start_date",
      menu_items: "id, brand, category, is_user_created, is_favorite, data_source",
      food_entries: "id, app_date, logged_at, meal_type, menu_item_id",
      weight_logs: "id, app_date, logged_at",
      exercise_presets: "id, body_part, equipment_type, name",
      workout_templates: "id, name, is_user_created",
      workout_sessions: "id, app_date, logged_at, template_id",
      workout_exercises: "id, session_id, exercise_id, order",
      workout_sets: "id, workout_exercise_id, set_order",
      ai_reports: "id, period_start, period_end",
    });
  }
}

export const db = new PhaseLogDb();

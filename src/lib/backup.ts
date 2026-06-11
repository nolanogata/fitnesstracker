import { db, SCHEMA_VERSION } from "../db";
import type { BackupPayload } from "../types";
import { nowIso } from "./date";

export async function exportBackup(): Promise<BackupPayload> {
  return {
    schema_version: SCHEMA_VERSION,
    exported_at: nowIso(),
    profile: await db.profile.toArray(),
    settings: await db.settings.toArray(),
    goals: await db.goals.toArray(),
    menu_items: await db.menu_items.toArray(),
    food_entries: await db.food_entries.toArray(),
    weight_logs: await db.weight_logs.toArray(),
    exercise_presets: await db.exercise_presets.toArray(),
    workout_templates: await db.workout_templates.toArray(),
    workout_sessions: await db.workout_sessions.toArray(),
    workout_exercises: await db.workout_exercises.toArray(),
    workout_sets: await db.workout_sets.toArray(),
    ai_reports: await db.ai_reports.toArray(),
  };
}

export async function importBackup(payload: BackupPayload) {
  if (!payload || payload.schema_version !== SCHEMA_VERSION) {
    throw new Error(`対応していないバックアップ形式です: schema_version ${payload?.schema_version ?? "unknown"}`);
  }
  await db.transaction(
    "rw",
    [
      db.profile,
      db.settings,
      db.goals,
      db.menu_items,
      db.food_entries,
      db.weight_logs,
      db.exercise_presets,
      db.workout_templates,
      db.workout_sessions,
      db.workout_exercises,
      db.workout_sets,
      db.ai_reports,
    ],
    async () => {
      await Promise.all([
        db.profile.clear(),
        db.settings.clear(),
        db.goals.clear(),
        db.menu_items.clear(),
        db.food_entries.clear(),
        db.weight_logs.clear(),
        db.exercise_presets.clear(),
        db.workout_templates.clear(),
        db.workout_sessions.clear(),
        db.workout_exercises.clear(),
        db.workout_sets.clear(),
        db.ai_reports.clear(),
      ]);
      await Promise.all([
        db.profile.bulkPut(payload.profile ?? []),
        db.settings.bulkPut(payload.settings ?? []),
        db.goals.bulkPut(payload.goals ?? []),
        db.menu_items.bulkPut(payload.menu_items ?? []),
        db.food_entries.bulkPut(payload.food_entries ?? []),
        db.weight_logs.bulkPut(payload.weight_logs ?? []),
        db.exercise_presets.bulkPut(payload.exercise_presets ?? []),
        db.workout_templates.bulkPut(payload.workout_templates ?? []),
        db.workout_sessions.bulkPut(payload.workout_sessions ?? []),
        db.workout_exercises.bulkPut(payload.workout_exercises ?? []),
        db.workout_sets.bulkPut(payload.workout_sets ?? []),
        db.ai_reports.bulkPut(payload.ai_reports ?? []),
      ]);
    },
  );
}

export async function resetLocalData() {
  await db.delete();
  window.location.reload();
}

export function downloadText(filename: string, content: string, type = "application/json") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

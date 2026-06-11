import { db } from "../db";
import { foodSeeds } from "./seeds/foods";
import { exerciseSeeds, workoutTemplateSeeds } from "./seeds/workouts";
import { nowIso } from "../lib/date";

export async function initializeSeeds() {
  const timestamp = nowIso();
  await db.transaction("rw", db.settings, db.menu_items, db.exercise_presets, db.workout_templates, async () => {
    const settings = await db.settings.get("local");
    const existingExercises = await db.exercise_presets.toArray();
    const favoriteExerciseIds = new Set(existingExercises.filter((exercise) => exercise.is_favorite).map((exercise) => exercise.id));
    if (!settings) {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: false,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }

    await db.menu_items.bulkPut(foodSeeds);
    await db.exercise_presets.bulkPut(exerciseSeeds.map((exercise) => ({ ...exercise, is_favorite: favoriteExerciseIds.has(exercise.id) })));
    await db.workout_templates.bulkPut(workoutTemplateSeeds);
  });
}

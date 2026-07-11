import type { Goal, WorkoutExercise, WorkoutSession } from "../types";
import { addDays, dateRange } from "./date";

export type WeeklyWorkoutStatus = {
  start: string;
  end: string;
  days: {
    date: string;
    hasStrength: boolean;
    hasCardio: boolean;
  }[];
  strengthDone: number;
  strengthTarget: number;
  cardioDone: number;
  cardioTarget: number;
};

export function getWeeklyWorkoutStatus(
  goal: Pick<Goal, "target_workouts_per_week" | "target_cardio_sessions_per_week"> | undefined,
  sessions: WorkoutSession[],
  exercises: WorkoutExercise[],
  appDate: string,
): WeeklyWorkoutStatus {
  const start = startOfWeek(appDate);
  const end = addDays(start, 6);
  const weekDates = new Set(dateRange(start, end));
  const exercisesBySession = new Map<string, WorkoutExercise[]>();
  exercises.forEach((exercise) => {
    exercisesBySession.set(exercise.session_id, [...(exercisesBySession.get(exercise.session_id) ?? []), exercise]);
  });

  const weekSessions = sessions.filter((session) => weekDates.has(session.app_date));
  const strengthDates = new Set<string>();
  const cardioDates = new Set<string>();
  weekSessions.forEach((session) => {
    const sessionExercises = exercisesBySession.get(session.id) ?? [];
    // Exercises are the source of truth. A session may begin as cardio and later receive strength exercises.
    const hasCardio = sessionExercises.length
      ? sessionExercises.some((exercise) => exercise.body_part === "有酸素")
      : session.workout_type === "cardio" || session.workout_type === "mixed" || session.body_parts.includes("有酸素");
    const hasStrength = sessionExercises.length
      ? sessionExercises.some((exercise) => exercise.body_part !== "有酸素")
      : session.workout_type === "strength" || session.workout_type === "mixed" || session.body_parts.some((part) => part !== "有酸素");
    if (hasCardio) cardioDates.add(session.app_date);
    if (hasStrength) strengthDates.add(session.app_date);
  });
  const days = [...weekDates].map((date) => ({
    date,
    hasStrength: strengthDates.has(date),
    hasCardio: cardioDates.has(date),
  }));

  return {
    start,
    end,
    days,
    strengthDone: strengthDates.size,
    strengthTarget: goal?.target_workouts_per_week ?? 0,
    cardioDone: cardioDates.size,
    cardioTarget: goal?.target_cardio_sessions_per_week ?? 0,
  };
}

export function formatWeeklyWorkoutStatus(status: WeeklyWorkoutStatus) {
  return `筋トレ ${status.strengthDone}/${status.strengthTarget || "-"}、有酸素 ${status.cardioDone}/${status.cardioTarget || "-"}`;
}

function startOfWeek(appDate: string) {
  const date = new Date(`${appDate}T12:00:00`);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  return addDays(appDate, diffToMonday);
}

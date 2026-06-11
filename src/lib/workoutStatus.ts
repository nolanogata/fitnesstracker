import type { Goal, WorkoutExercise, WorkoutSession } from "../types";
import { addDays, dateRange } from "./date";

export type WeeklyWorkoutStatus = {
  start: string;
  end: string;
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
  const cardioDone = weekSessions.filter((session) => {
    const sessionExercises = exercisesBySession.get(session.id) ?? [];
    return session.workout_type === "cardio" || session.body_parts.includes("有酸素") || sessionExercises.some((exercise) => exercise.body_part === "有酸素");
  }).length;
  const strengthDone = weekSessions.filter((session) => {
    const sessionExercises = exercisesBySession.get(session.id) ?? [];
    return session.workout_type !== "cardio" && sessionExercises.some((exercise) => exercise.body_part !== "有酸素");
  }).length;

  return {
    start,
    end,
    strengthDone,
    strengthTarget: goal?.target_workouts_per_week ?? 0,
    cardioDone,
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

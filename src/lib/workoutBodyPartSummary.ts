import type { WorkoutExercise, WorkoutSession, WorkoutSet } from "../types";

export type WorkoutBodyPart = "胸" | "肩" | "腕" | "背中" | "脚" | "体幹" | "その他";
export type WorkoutBodyPartPeriod = "all" | "month" | "week" | "day";

export const primaryWorkoutBodyParts: WorkoutBodyPart[] = ["胸", "肩", "腕", "背中", "脚", "体幹"];

export type WorkoutBodyPartStat = {
  bodyPart: WorkoutBodyPart;
  setCount: number;
  percentage: number;
  lastDate?: string;
  daysSince?: number;
};

export type WorkoutBodyPartSummary = {
  stats: WorkoutBodyPartStat[];
  totalSets: number;
  periodStart?: string;
  periodEnd: string;
};

export function isWorkoutBodyPartOverdue(daysSince?: number) {
  return typeof daysSince === "number" && daysSince >= 4;
}

export function getWorkoutBodyPartSummary(input: {
  appDate: string;
  period: WorkoutBodyPartPeriod;
  sessions: WorkoutSession[];
  exercises: WorkoutExercise[];
  sets: WorkoutSet[];
}): WorkoutBodyPartSummary {
  const sessionById = new Map(input.sessions.map((session) => [session.id, session]));
  const setCountByExercise = new Map<string, number>();
  input.sets.forEach((set) => {
    setCountByExercise.set(set.workout_exercise_id, (setCountByExercise.get(set.workout_exercise_id) ?? 0) + 1);
  });

  const periodStart = getPeriodStart(input.appDate, input.period);
  const counts = new Map<WorkoutBodyPart, number>();
  const lastDates = new Map<WorkoutBodyPart, string>();

  input.exercises.forEach((exercise) => {
    const session = sessionById.get(exercise.session_id);
    if (!session || session.app_date > input.appDate) return;
    const bodyPart = normalizeWorkoutBodyPart(exercise.body_part, exercise.equipment_type);
    if (!bodyPart) return;

    const previousLastDate = lastDates.get(bodyPart);
    if (!previousLastDate || session.app_date > previousLastDate) lastDates.set(bodyPart, session.app_date);

    if (periodStart && session.app_date < periodStart) return;
    const recordedSets = setCountByExercise.get(exercise.id) ?? 0;
    counts.set(bodyPart, (counts.get(bodyPart) ?? 0) + Math.max(1, recordedSets));
  });

  const displayedParts = [...primaryWorkoutBodyParts];
  if ((counts.get("その他") ?? 0) > 0 || lastDates.has("その他")) displayedParts.push("その他");
  const totalSets = displayedParts.reduce((sum, bodyPart) => sum + (counts.get(bodyPart) ?? 0), 0);
  const stats = displayedParts.map((bodyPart) => {
    const setCount = counts.get(bodyPart) ?? 0;
    const lastDate = lastDates.get(bodyPart);
    return {
      bodyPart,
      setCount,
      percentage: totalSets ? Math.round((setCount / totalSets) * 100) : 0,
      lastDate,
      daysSince: lastDate ? daysBetween(lastDate, input.appDate) : undefined,
    };
  });

  return {
    stats,
    totalSets,
    periodStart,
    periodEnd: input.appDate,
  };
}

export function normalizeWorkoutBodyPart(bodyPart: string, equipmentType = ""): WorkoutBodyPart | undefined {
  const value = `${bodyPart} ${equipmentType}`;
  if (/有酸素|カーディオ/.test(value)) return undefined;
  if (/胸|大胸/.test(value)) return "胸";
  if (/肩|三角筋/.test(value)) return "肩";
  if (/腕|二頭|三頭|前腕/.test(value)) return "腕";
  if (/背中|広背|僧帽|背筋/.test(value)) return "背中";
  if (/脚|足|臀|尻|大腿|ハム|ふくらはぎ|カーフ/.test(value)) return "脚";
  if (/体幹|腹|コア/.test(value)) return "体幹";
  return "その他";
}

function getPeriodStart(appDate: string, period: WorkoutBodyPartPeriod) {
  if (period === "all") return undefined;
  if (period === "month") return `${appDate.slice(0, 7)}-01`;
  if (period === "day") return appDate;
  const date = parseDate(appDate);
  const day = date.getDay();
  date.setDate(date.getDate() + (day === 0 ? -6 : 1 - day));
  return formatDate(date);
}

function daysBetween(startDate: string, endDate: string) {
  return Math.max(0, Math.round((parseDate(endDate).getTime() - parseDate(startDate).getTime()) / 86_400_000));
}

function parseDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

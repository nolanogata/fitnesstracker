import assert from "node:assert/strict";
import { getWorkoutBodyPartSummary, isWorkoutBodyPartOverdue, normalizeWorkoutBodyPart } from "../src/lib/workoutBodyPartSummary.ts";
import type { WorkoutExercise, WorkoutSession, WorkoutSet } from "../src/types.ts";

let passed = 0;

function test(name: string, run: () => void) {
  run();
  passed += 1;
  process.stdout.write(`✓ ${name}\n`);
}

const sessions: WorkoutSession[] = [
  makeSession("s1", "2026-07-01"),
  makeSession("s2", "2026-07-18"),
  makeSession("s3", "2026-07-21"),
];
const exercises: WorkoutExercise[] = [
  makeExercise("e1", "s1", "胸", "マシン"),
  makeExercise("e2", "s2", "背中", "マシン"),
  makeExercise("e3", "s3", "胸", "フリーウェイト"),
  makeExercise("e4", "s3", "有酸素", "有酸素"),
  makeExercise("e5", "s3", "肩", "マシン"),
];
const sets: WorkoutSet[] = [
  ...makeSets("e1", 3),
  ...makeSets("e2", 2),
  ...makeSets("e3", 4),
  ...makeSets("e4", 1),
];

test("日本語の種目表記を主要部位へ正規化", () => {
  assert.equal(normalizeWorkoutBodyPart("上腕二頭筋"), "腕");
  assert.equal(normalizeWorkoutBodyPart("臀部"), "脚");
  assert.equal(normalizeWorkoutBodyPart("腹筋"), "体幹");
  assert.equal(normalizeWorkoutBodyPart("有酸素", "クロストレーナー"), undefined);
});

test("全期間はセット数と最終実施日を部位別に集計", () => {
  const summary = getWorkoutBodyPartSummary({ appDate: "2026-07-21", period: "all", sessions, exercises, sets });
  assert.equal(summary.totalSets, 10);
  assert.deepEqual(stat(summary, "胸"), { setCount: 7, percentage: 70, lastDate: "2026-07-21", daysSince: 0 });
  assert.deepEqual(stat(summary, "背中"), { setCount: 2, percentage: 20, lastDate: "2026-07-18", daysSince: 3 });
  assert.deepEqual(stat(summary, "肩"), { setCount: 1, percentage: 10, lastDate: "2026-07-21", daysSince: 0 });
});

test("週間と日別は対象期間のセットだけを円グラフへ使う", () => {
  const week = getWorkoutBodyPartSummary({ appDate: "2026-07-21", period: "week", sessions, exercises, sets });
  const day = getWorkoutBodyPartSummary({ appDate: "2026-07-21", period: "day", sessions, exercises, sets });
  assert.equal(week.periodStart, "2026-07-20");
  assert.equal(week.totalSets, 5);
  assert.equal(day.totalSets, 5);
  assert.equal(stat(day, "胸").setCount, 4);
  assert.equal(stat(day, "背中").setCount, 0);
});

test("未記録部位も最終実施日一覧に残す", () => {
  const summary = getWorkoutBodyPartSummary({ appDate: "2026-07-21", period: "month", sessions, exercises, sets });
  assert.equal(summary.stats.find((item) => item.bodyPart === "脚")?.lastDate, undefined);
  assert.equal(summary.stats.find((item) => item.bodyPart === "体幹")?.setCount, 0);
});

test("丸3日を超えた4日前から警告対象にする", () => {
  assert.equal(isWorkoutBodyPartOverdue(undefined), false);
  assert.equal(isWorkoutBodyPartOverdue(3), false);
  assert.equal(isWorkoutBodyPartOverdue(4), true);
});

process.stdout.write(`Workout body-part summary tests passed: ${passed}\n`);

function stat(summary: ReturnType<typeof getWorkoutBodyPartSummary>, bodyPart: string) {
  const result = summary.stats.find((item) => item.bodyPart === bodyPart);
  assert.ok(result);
  return {
    setCount: result.setCount,
    percentage: result.percentage,
    lastDate: result.lastDate,
    daysSince: result.daysSince,
  };
}

function makeSession(id: string, appDate: string): WorkoutSession {
  return {
    id,
    app_date: appDate,
    logged_at: `${appDate}T12:00:00.000Z`,
    title: "テスト",
    workout_type: "strength",
    body_parts: [],
    created_at: `${appDate}T12:00:00.000Z`,
    updated_at: `${appDate}T12:00:00.000Z`,
  };
}

function makeExercise(id: string, sessionId: string, bodyPart: string, equipmentType: string): WorkoutExercise {
  return {
    id,
    session_id: sessionId,
    exercise_name: id,
    body_part: bodyPart,
    equipment_type: equipmentType,
    order: 0,
    created_at: "2026-07-01T12:00:00.000Z",
    updated_at: "2026-07-01T12:00:00.000Z",
  };
}

function makeSets(exerciseId: string, count: number): WorkoutSet[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${exerciseId}-${index}`,
    workout_exercise_id: exerciseId,
    set_order: index + 1,
    weight_kg: 30,
    reps: 10,
    created_at: "2026-07-01T12:00:00.000Z",
    updated_at: "2026-07-01T12:00:00.000Z",
  }));
}

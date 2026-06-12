import { db } from "../db";
import { foodSeeds } from "./seeds/foods";
import { exerciseSeeds, workoutTemplateSeeds } from "./seeds/workouts";
import { nowIso } from "../lib/date";

export async function initializeSeeds() {
  const timestamp = nowIso();
  await db.transaction("rw", db.settings, db.menu_items, db.exercise_presets, db.workout_templates, async () => {
    const settings = await db.settings.get("local");
    const existingMenuItems = await db.menu_items.toArray();
    const existingExercises = await db.exercise_presets.toArray();
    const existingWorkoutTemplates = await db.workout_templates.toArray();
    const favoriteMenuItemIds = new Set(existingMenuItems.filter((item) => item.is_favorite).map((item) => item.id));
    const favoriteExerciseIds = new Set(existingExercises.filter((exercise) => exercise.is_favorite).map((exercise) => exercise.id));
    const workoutTemplateOrders = new Map(existingWorkoutTemplates.map((template) => [template.id, template.display_order]));
    const officialFoodReplacementNames = new Set([
      "バーガーキング|ワッパー",
      "バーガーキング|ワッパーチーズ",
      "バーガーキング|ダブルワッパーチーズ",
      "バーガーキング|テリヤキワッパー",
      "バーガーキング|スモーキーBBQワッパー",
      "バーガーキング|アボカドワッパー",
      "バーガーキング|チーズバーガー",
      "バーガーキング|ダブルチーズバーガー",
      "バーガーキング|チキンナゲット 5ピース",
      "バーガーキング|フレンチフライ",
      "バーガーキング|オニオンリング",
      "バーガーキング|アップルパイ",
      "モスバーガー|モス野菜バーガー",
      "モスバーガー|ハンバーガー",
      "モスバーガー|チーズバーガー",
      "モスバーガー|ダブルモスチーズバーガー",
      "スターバックス|ニューヨークチーズケーキ",
      "スターバックス|シュガードーナツ",
      "スターバックス|チョコレートチャンクスコーン",
      "スターバックス|ベーコンとほうれん草のキッシュ",
      "スターバックス|ハム&マリボーチーズ 石窯フィローネ",
      "スターバックス|ハム＆マリボーチーズ 石窯フィローネ",
      "スターバックス|チキン&チーズアラビアータ 石窯フィローネ",
      "スターバックス|チキン＆チーズアラビアータ 石窯フィローネ",
      "スターバックス|クラブハウス 石窯カンパーニュサンド",
      "スターバックス|根菜チキン サラダラップ",
      "スターバックス|ヨーグルト&バナナグラノーラ",
      "スターバックス|ヨーグルト＆バナナグラノーラ",
      "ドトール|ミラノサンドA 生ハム・ボンレスハム・ボローニャソーセージ",
      "ドトール|爽やかレモン ミラノサンドB スモークサーモン・エビ・アボカド",
      "ドトール|カマンベール in ミラノサンドB スモークサーモン・エビ・アボカド",
      "ドトール|ジャーマンドック",
      "ドトール|モーニングセットA ハムタマゴサラダ",
      "ドトール|モーニング・セットA ハムタマゴサラダ",
      "ドトール|モーニングセットB アボカド＆ツナポテト",
      "ドトール|モーニング・セットB アボカド＆ツナポテト",
      "ドトール|ホットサンド 大豆のミート ～チーズ＆トマト～",
      "ドトール|ホットサンド ツナチェダーチーズ",
      "ドトール|ホットサンド ツナチェダー",
      "ドトール|チーズトースト",
      "ドトール|ミルクレープ",
    ]);
    if (!settings) {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: false,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }

    await db.menu_items.bulkDelete(existingMenuItems
      .filter((item) => {
        if (item.is_user_created) return false;
        if (["大戸屋", "はなまるうどん"].includes(item.brand ?? "") && item.data_source === "estimated") return true;
        return officialFoodReplacementNames.has(`${item.brand ?? ""}|${item.name}`);
      })
      .map((item) => item.id));
    await db.menu_items.bulkPut(foodSeeds.map((item) => ({ ...item, is_favorite: item.is_favorite || favoriteMenuItemIds.has(item.id) })));
    await db.exercise_presets.bulkPut(exerciseSeeds.map((exercise) => ({ ...exercise, is_favorite: favoriteExerciseIds.has(exercise.id) })));
    const hiddenWorkoutTemplateIds = new Set(settings?.hidden_workout_template_ids ?? []);
    await db.workout_templates.bulkPut(workoutTemplateSeeds
      .filter((template) => !hiddenWorkoutTemplateIds.has(template.id))
      .map((template, index) => ({ ...template, display_order: workoutTemplateOrders.get(template.id) ?? index })));
  });
}

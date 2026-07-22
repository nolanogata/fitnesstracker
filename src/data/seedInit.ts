import { db } from "../db";
import { foodSeeds } from "./seeds/foods";
import { exerciseSeeds, workoutTemplateSeeds } from "./seeds/workouts";
import { nowIso } from "../lib/date";

const DATA_SEED_VERSION = 2026072201;

function menuSeedNaturalKey(item: { brand?: string; name: string; serving_label?: string; data_source: string }) {
  return [item.brand ?? "", item.name, item.serving_label ?? "", item.data_source]
    .map((value) => value.trim().toLowerCase())
    .join("|");
}

export async function initializeSeeds() {
  const timestamp = nowIso();
  await db.transaction("rw", db.settings, db.menu_items, db.exercise_presets, db.workout_templates, async () => {
    const settings = await db.settings.get("local");
    const existingMenuItems = await db.menu_items.toArray();
    const existingExercises = await db.exercise_presets.toArray();
    const existingWorkoutTemplates = await db.workout_templates.toArray();
    const favoriteMenuItemIds = new Set(existingMenuItems.filter((item) => item.is_favorite).map((item) => item.id));
    const favoriteMenuItemKeys = new Set(existingMenuItems
      .filter((item) => item.is_favorite)
      .map((item) => `${item.brand ?? ""}|${item.name}`));
    const userCorrectedMenuItemIds = new Set(existingMenuItems
      .filter((item) => !item.is_user_created && item.data_source === "user")
      .map((item) => item.id));
    const userCorrectedMenuItemKeys = new Set(existingMenuItems
      .filter((item) => !item.is_user_created && item.data_source === "user")
      .map(menuSeedNaturalKey));
    const foodSeedIdByNaturalKey = new Map(foodSeeds.map((item) => [menuSeedNaturalKey(item), item.id]));
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
      "マクドナルド|マックフライポテト",
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
    const officialFoodRefreshBrands = new Set([
      "ケンタッキー",
      "モスバーガー",
      "サブウェイ",
      "ドトール",
      "タリーズ",
      "なか卯",
      "はなまるうどん",
      "CoCo壱番屋",
      "いきなりステーキ",
    ]);
    const fullFoodRefreshBrands = new Set([
      "CoCo壱番屋",
      "いきなりステーキ",
      "びっくりドンキー",
      "パンチョ",
      "ペッパーランチ",
      "感動の肉と米",
      "三田製麺所",
      "舎鈴",
      "すぱじろう",
      "マンマパスタ",
      "ポポラマーマ",
      "ジョイフル",
      "デニーズ",
      "ロイヤルホスト",
      "丸亀製麺",
      "ウエスト",
      "オリーブの丘",
      "とんでん",
      "バーガーキング",
      "スターバックス",
      "ケンタッキー",
      "モスバーガー",
      "サブウェイ",
      "マクドナルド",
      "すき家",
      "吉野家",
      "松屋",
      "なか卯",
      "はなまるうどん",
      "やよい軒",
      "大戸屋",
      "ドトール",
      "タリーズ",
      "ティーヌン",
      "サーティワン",
      "リンガーハット",
    ]);
    const shouldRunCriticalFoodRefresh = (settings?.data_seed_version ?? 0) < DATA_SEED_VERSION;
    if (!settings) {
      await db.settings.put({
        id: "local",
        day_boundary_hour: 3,
        onboarding_completed: false,
        theme_mode: "system",
        theme_accent: "classic",
        data_seed_version: DATA_SEED_VERSION,
        created_at: timestamp,
        updated_at: timestamp,
      });
    } else if (shouldRunCriticalFoodRefresh) {
      await db.settings.update("local", {
        data_seed_version: DATA_SEED_VERSION,
        updated_at: timestamp,
      });
    }

    await db.menu_items.bulkDelete(existingMenuItems
      .filter((item) => {
        if (item.is_user_created || item.data_source === "user") return false;
        const seedId = foodSeedIdByNaturalKey.get(menuSeedNaturalKey(item));
        if (seedId && seedId !== item.id) return true;
        if (shouldRunCriticalFoodRefresh && fullFoodRefreshBrands.has(item.brand ?? "")) return true;
        if (["大戸屋", "はなまるうどん", "タリーズ", "なか卯"].includes(item.brand ?? "") && item.data_source === "estimated") return true;
        if (item.brand === "しんぱち食堂" && item.data_source === "estimated") return true;
        if (officialFoodRefreshBrands.has(item.brand ?? "") && item.data_source === "official") return true;
        return officialFoodReplacementNames.has(`${item.brand ?? ""}|${item.name}`);
      })
      .map((item) => item.id));
    await db.menu_items.bulkPut(foodSeeds
      .filter((item) => !userCorrectedMenuItemIds.has(item.id) && !userCorrectedMenuItemKeys.has(menuSeedNaturalKey(item)))
      .map((item) => ({
        ...item,
        is_favorite: item.is_favorite || favoriteMenuItemIds.has(item.id) || favoriteMenuItemKeys.has(`${item.brand ?? ""}|${item.name}`),
      })));
    await db.exercise_presets.bulkPut(exerciseSeeds.map((exercise) => ({ ...exercise, is_favorite: favoriteExerciseIds.has(exercise.id) })));
    const hiddenWorkoutTemplateIds = new Set(settings?.hidden_workout_template_ids ?? []);
    await db.workout_templates.bulkPut(workoutTemplateSeeds
      .filter((template) => !hiddenWorkoutTemplateIds.has(template.id))
      .map((template, index) => ({ ...template, display_order: workoutTemplateOrders.get(template.id) ?? index })));
  });
}

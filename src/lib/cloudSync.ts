import { db } from "../db";
import { initializeSeeds } from "../data/seedInit";
import type { BackupPayload } from "../types";
import type { MenuItem } from "../types";
import { exportBackup } from "./backup";
import { recordsUpdatedAfter } from "./syncDelta";

const syncCursorKey = "phase-log-cloud-sync-cursor";
const syncDeviceKey = "phase-log-cloud-sync-device";
const syncLastAtKey = "phase-log-cloud-sync-last-at";
const sharedCatalogSinceKey = "phase-log-shared-catalog-since";
const cloudUserKey = "phase-log-cloud-user";

type SyncEntityType = Exclude<keyof BackupPayload, "schema_version" | "exported_at">;

type RemoteChange = {
  cursor: number;
  entity_type: SyncEntityType;
  entity_id: string;
  payload: Record<string, unknown> | null;
  updated_at: string;
  deleted_at?: string | null;
};

type PushRecord = {
  entity_type: SyncEntityType;
  entity_id: string;
  payload: Record<string, unknown>;
  updated_at: string;
};

export type CloudSyncStatus =
  | { state: "disabled"; message: string }
  | { state: "synced"; syncedAt: string; uploaded: number; downloaded: number }
  | { state: "error"; message: string };

const entityTypes: SyncEntityType[] = [
  "settings",
  "profile",
  "goals",
  "menu_items",
  "food_entries",
  "weight_logs",
  "exercise_presets",
  "workout_templates",
  "workout_sessions",
  "workout_exercises",
  "workout_sets",
  "ai_reports",
  "ai_consultations",
  "ai_advice_memory",
];

let activeSync: Promise<CloudSyncStatus> | undefined;

export function cloudSyncLastAt() {
  return localStorage.getItem(syncLastAtKey) || undefined;
}

export async function syncCloudNow(): Promise<CloudSyncStatus> {
  if (activeSync) return activeSync;
  activeSync = performSync().finally(() => {
    activeSync = undefined;
  });
  return activeSync;
}

async function performSync(): Promise<CloudSyncStatus> {
  if (!navigator.onLine) return { state: "disabled", message: "オフラインのため、接続後に同期します。" };
  const syncStartedAt = new Date().toISOString();
  const previousSyncAt = localStorage.getItem(syncLastAtKey) || undefined;
  try {
    const sessionResponse = await fetch("/api/session", { headers: { accept: "application/json" } });
    if (sessionResponse.status === 404) {
      return { state: "disabled", message: "この配信環境ではクラウド同期が有効になっていません。" };
    }
    if (!sessionResponse.ok) {
      return { state: "error", message: sessionResponse.status === 401 ? "ログインし直してください。" : "クラウドへ接続できませんでした。" };
    }
    const session = await sessionResponse.json() as { user?: { email?: string } };
    const resetCount = await isolateCloudUser(session.user?.email);
    let cursor = Number(localStorage.getItem(syncCursorKey) ?? "0") || 0;
    let downloaded = resetCount;
    while (true) {
      const response = await apiJson<{ changes: RemoteChange[]; cursor: number; has_more: boolean }>(`/api/sync/pull?cursor=${cursor}`);
      await applyRemoteChanges(response.changes);
      downloaded += response.changes.length;
      cursor = response.cursor;
      localStorage.setItem(syncCursorKey, String(cursor));
      if (!response.has_more) break;
    }
    downloaded += await syncSharedCatalog();

    const backup = await exportBackup();
    const records = flattenBackup(backup);
    const changedRecords = recordsUpdatedAfter(records, previousSyncAt);
    const deviceId = syncDeviceId();
    let uploaded = 0;
    for (let offset = 0; offset < changedRecords.length; offset += 100) {
      const batch = changedRecords.slice(offset, offset + 100);
      const response = await apiJson<{ accepted: number; cursor: number }>("/api/sync/push", {
        method: "POST",
        body: JSON.stringify({ device_id: deviceId, records: batch }),
      });
      cursor = response.cursor;
      uploaded += response.accepted;
    }
    const inventory = Object.fromEntries(entityTypes.map((type) => [
      type,
      records.filter((record) => record.entity_type === type).map((record) => record.entity_id),
    ]));
    const inventoryResult = await apiJson<{ cursor: number }>("/api/sync/inventory", {
      method: "POST",
      body: JSON.stringify({ expected_cursor: cursor, inventory }),
    });
    cursor = inventoryResult.cursor;
    localStorage.setItem(syncCursorKey, String(cursor));

    const finalPull = await apiJson<{ changes: RemoteChange[]; cursor: number; has_more: boolean }>(`/api/sync/pull?cursor=${cursor}`);
    await applyRemoteChanges(finalPull.changes);
    downloaded += finalPull.changes.length;
    cursor = finalPull.cursor;
    localStorage.setItem(syncCursorKey, String(cursor));
    const syncedAt = syncStartedAt;
    localStorage.setItem(syncLastAtKey, syncedAt);
    return { state: "synced", syncedAt, uploaded, downloaded };
  } catch (error) {
    if (error instanceof CloudIdentityChanged) {
      return { state: "disabled", message: "ログインユーザーを切り替えています…" };
    }
    const message = error instanceof CloudApiError
      ? error.code === "sync_changed"
        ? "別の端末から変更が届きました。もう一度同期してください。"
        : error.message
      : "クラウド同期に失敗しました。端末内の記録は残っています。";
    return { state: "error", message };
  }
}

async function isolateCloudUser(email: string | undefined) {
  const normalized = email?.trim().toLowerCase();
  if (!normalized) throw new Error("ログインユーザーを確認できませんでした。");
  const previous = localStorage.getItem(cloudUserKey);
  if (!previous) {
    localStorage.setItem(cloudUserKey, normalized);
    return 0;
  }
  if (previous === normalized) return 0;
  const existingCount = (await Promise.all(db.tables.map((table) => table.count())))
    .reduce((sum, count) => sum + count, 0);
  await db.transaction("rw", db.tables, async () => {
    for (const table of db.tables) await table.clear();
  });
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith("phase-log-")) localStorage.removeItem(key);
  }
  localStorage.setItem(cloudUserKey, normalized);
  await initializeSeeds();
  window.setTimeout(() => window.location.reload(), 0);
  throw new CloudIdentityChanged(`Cleared ${existingCount} records for a Cloudflare Access identity change.`);
}

async function syncSharedCatalog() {
  const since = localStorage.getItem(sharedCatalogSinceKey) ?? "";
  const response = await apiJson<{
    items: Array<{
      id: string;
      menu: Partial<MenuItem>;
      evidence_type: string;
      source_url?: string | null;
      evidence_label: string;
      verified_at: string;
      updated_at: string;
    }>;
  }>(`/api/catalog?since=${encodeURIComponent(since)}`);
  let latest = since;
  for (const shared of response.items) {
    const now = shared.updated_at || new Date().toISOString();
    const item: MenuItem = {
      ...shared.menu,
      id: shared.id,
      name: String(shared.menu.name ?? "名称未設定"),
      category: String(shared.menu.category ?? "その他"),
      tags: Array.from(new Set([...(shared.menu.tags ?? []), "共有公式"])),
      calories: Number(shared.menu.calories) || 0,
      protein_g: Number(shared.menu.protein_g) || 0,
      fat_g: Number(shared.menu.fat_g) || 0,
      carbs_g: Number(shared.menu.carbs_g) || 0,
      data_source: "official",
      confidence: "high",
      source_url: shared.source_url || undefined,
      fetched_at: shared.verified_at,
      nutrition_meta: {
        ...(shared.menu.nutrition_meta ?? {}),
        origin: shared.evidence_type === "package_label" ? "package_label" : "official_website",
        estimation_policy: "exact",
        evidence_note: shared.evidence_label,
      },
      is_public_preset: true,
      is_user_created: false,
      is_favorite: false,
      created_at: shared.menu.created_at ?? now,
      updated_at: now,
    };
    await db.menu_items.put(item);
    if (now > latest) latest = now;
  }
  if (latest) localStorage.setItem(sharedCatalogSinceKey, latest);
  return response.items.length;
}

export async function registerCloudMigration(fileText: string, payload: BackupPayload) {
  const fileHash = await sha256Hex(fileText);
  const recordCount = entityTypes.reduce((sum, type) => sum + payload[type].length, 0);
  return apiJson<{ duplicate: boolean; imported_at: string }>("/api/migrations/register", {
    method: "POST",
    body: JSON.stringify({ file_hash: fileHash, record_count: recordCount }),
  });
}

async function applyRemoteChanges(changes: RemoteChange[]) {
  for (const change of changes) {
    if (!entityTypes.includes(change.entity_type)) continue;
    const table = db.table(change.entity_type);
    if (change.deleted_at || !change.payload) {
      await table.delete(change.entity_id);
      continue;
    }
    const local = await table.get(change.entity_id) as { updated_at?: string } | undefined;
    if (local?.updated_at && local.updated_at > change.updated_at) continue;
    await table.put(change.payload);
  }
}

function flattenBackup(backup: BackupPayload): PushRecord[] {
  return entityTypes.flatMap((entityType) => {
    const values = backup[entityType] as Array<Record<string, unknown>>;
    return values
      .filter((value) => shouldSyncRecord(entityType, value))
      .map((value) => ({
        entity_type: entityType,
        entity_id: String(value.id),
        payload: value,
        updated_at: validUpdatedAt(value.updated_at) ? String(value.updated_at) : backup.exported_at,
      }));
  });
}

function shouldSyncRecord(entityType: SyncEntityType, value: Record<string, unknown>) {
  if (entityType === "menu_items") {
    return value.is_user_created === true || value.is_favorite === true || value.is_public_preset !== true;
  }
  if (entityType === "exercise_presets" || entityType === "workout_templates") {
    return value.is_user_created === true;
  }
  return true;
}

function validUpdatedAt(value: unknown) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function syncDeviceId() {
  const existing = localStorage.getItem(syncDeviceKey);
  if (existing) return existing;
  const created = `device_${crypto.randomUUID()}`;
  localStorage.setItem(syncDeviceKey, created);
  return created;
}

class CloudApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

class CloudIdentityChanged extends Error {}

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  const data = await response.json().catch(() => ({})) as { error?: string; message?: string };
  if (!response.ok) throw new CloudApiError(response.status, data.error ?? "api_error", data.message ?? "クラウド処理に失敗しました。");
  return data as T;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

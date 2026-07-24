type D1Result<T = unknown> = {
  results?: T[];
  success: boolean;
  meta?: { last_row_id?: number };
};

type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  first: <T = unknown>(column?: string) => Promise<T | null>;
  all: <T = unknown>() => Promise<D1Result<T>>;
  run: () => Promise<D1Result>;
};

type D1Database = {
  prepare: (sql: string) => D1Statement;
  batch: (statements: D1Statement[]) => Promise<D1Result[]>;
};

type R2Bucket = {
  put: (key: string, value: ArrayBuffer | Uint8Array, options?: { httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string> }) => Promise<unknown>;
  get: (key: string) => Promise<{ body: ReadableStream; httpMetadata?: { contentType?: string } } | null>;
  delete: (key: string) => Promise<void>;
};

type Env = {
  DB: D1Database;
  EVIDENCE: R2Bucket;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  GEMINI_API_KEY?: string;
  GEMINI_PRIMARY_MODEL?: string;
  GEMINI_FALLBACK_MODEL?: string;
  GEMINI_PER_USER_DAILY_LIMIT?: string;
  GEMINI_GLOBAL_DAILY_LIMIT?: string;
  ADMIN_EMAILS?: string;
  DEV_AUTH_BYPASS?: string;
  DEV_USER_EMAIL?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
  params: { path?: string | string[] };
  waitUntil: (promise: Promise<unknown>) => void;
};

type AccessIdentity = {
  sub: string;
  email: string;
};

type AppUser = AccessIdentity & {
  id: string;
  role: "user" | "admin";
};

type SyncRecord = {
  entity_type: string;
  entity_id: string;
  payload: Record<string, unknown> | null;
  updated_at: string;
  deleted_at?: string | null;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const allowedEntityTypes = new Set([
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
]);

export const onRequest = async (context: PagesContext): Promise<Response> => {
  try {
    enforceSameOrigin(context.request);
    const identity = await authenticate(context.request, context.env);
    const user = await ensureUser(context.env, identity);
    const path = normalizePath(context.params.path);
    const method = context.request.method.toUpperCase();

    if (method === "GET" && path === "session") {
      return json({ user: { email: user.email, role: user.role }, cloud_sync: true });
    }
    if (method === "GET" && path === "sync/pull") return handleSyncPull(context, user);
    if (method === "POST" && path === "sync/push") return handleSyncPush(context, user);
    if (method === "POST" && path === "sync/inventory") return handleSyncInventory(context, user);
    if (method === "POST" && path === "migrations/register") return handleMigrationRegister(context, user);
    if (method === "GET" && path === "catalog") return handleCatalog(context);
    if (method === "POST" && path === "catalog/submissions") return handleCatalogSubmission(context, user);
    if (method === "GET" && path === "admin/catalog/submissions") return handleAdminSubmissions(context, user);
    if (method === "POST" && /^admin\/catalog\/submissions\/[^/]+\/approve$/.test(path)) {
      return handleAdminReview(context, user, path.split("/")[3], "approved");
    }
    if (method === "POST" && /^admin\/catalog\/submissions\/[^/]+\/reject$/.test(path)) {
      return handleAdminReview(context, user, path.split("/")[3], "rejected");
    }
    if (method === "GET" && /^admin\/catalog\/evidence\/[^/]+$/.test(path)) {
      return handleEvidenceDownload(context, user, path.split("/")[3]);
    }
    if (method === "POST" && path === "ai/photo-analyze") return handleGeminiPhoto(context, user);
    if (method === "GET" && path === "ai/usage") return handleAiUsage(context, user);

    return json({ error: "not_found" }, 404);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const code = error instanceof HttpError ? error.code : "internal_error";
    if (status >= 500) console.error(code, error instanceof Error ? error.message : String(error));
    return json({ error: code, message: error instanceof HttpError ? error.message : "処理に失敗しました。" }, status);
  }
};

class HttpError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: jsonHeaders });
}

function normalizePath(path: string | string[] | undefined) {
  return (Array.isArray(path) ? path.join("/") : path ?? "").replace(/^\/+|\/+$/g, "");
}

function enforceSameOrigin(request: Request) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method.toUpperCase())) return;
  const origin = request.headers.get("origin");
  if (!origin) return;
  if (origin !== new URL(request.url).origin) throw new HttpError(403, "invalid_origin", "許可されていない送信元です。");
}

async function readJson<T>(request: Request, maxBytes = 2_000_000): Promise<T> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > maxBytes) throw new HttpError(413, "payload_too_large", "送信データが大きすぎます。");
  const text = await request.text();
  if (text.length > maxBytes) throw new HttpError(413, "payload_too_large", "送信データが大きすぎます。");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new HttpError(400, "invalid_json", "JSONを読み取れませんでした。");
  }
}

async function authenticate(request: Request, env: Env): Promise<AccessIdentity> {
  if (env.DEV_AUTH_BYPASS === "1") {
    const email = request.headers.get("x-dev-user-email") || env.DEV_USER_EMAIL || "developer@example.com";
    return { sub: `dev:${email.toLowerCase()}`, email: email.toLowerCase() };
  }
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) throw new HttpError(401, "authentication_required", "ログインが必要です。");
  return verifyAccessJwt(token, env);
}

async function verifyAccessJwt(token: string, env: Env): Promise<AccessIdentity> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new HttpError(401, "invalid_access_token", "ログイン情報が壊れています。");
  const header = decodeJwtPart<{ alg?: string; kid?: string }>(parts[0]);
  const payload = decodeJwtPart<{ sub?: string; email?: string; aud?: string | string[]; iss?: string; exp?: number; nbf?: number }>(parts[1]);
  if (header.alg !== "RS256" || !header.kid) throw new HttpError(401, "invalid_access_token", "対応していないログイン形式です。");
  const teamDomain = env.ACCESS_TEAM_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const expectedIssuer = `https://${teamDomain}`;
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  const now = Math.floor(Date.now() / 1000);
  if (!payload.sub || !payload.email || payload.iss !== expectedIssuer || !audiences.includes(env.ACCESS_AUD)) {
    throw new HttpError(401, "invalid_access_token", "ログイン情報を確認できませんでした。");
  }
  if (!payload.exp || payload.exp <= now || (payload.nbf && payload.nbf > now + 30)) {
    throw new HttpError(401, "expired_access_token", "ログインの有効期限が切れています。");
  }
  const certResponse = await fetch(`${expectedIssuer}/cdn-cgi/access/certs`, { cf: { cacheTtl: 3600, cacheEverything: true } } as RequestInit);
  if (!certResponse.ok) throw new HttpError(503, "access_keys_unavailable", "ログイン確認サービスへ接続できません。");
  const jwks = await certResponse.json() as { keys?: Array<JsonWebKey & { kid?: string }> };
  const jwk = jwks.keys?.find((key) => key.kid === header.kid);
  if (!jwk) throw new HttpError(401, "unknown_access_key", "ログイン署名を確認できませんでした。");
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const signed = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, base64UrlBytes(parts[2]), signed);
  if (!valid) throw new HttpError(401, "invalid_access_signature", "ログイン署名が一致しません。");
  return { sub: payload.sub, email: payload.email.toLowerCase() };
}

function decodeJwtPart<T>(value: string): T {
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlBytes(value))) as T;
  } catch {
    throw new HttpError(401, "invalid_access_token", "ログイン情報を読み取れませんでした。");
  }
}

function base64UrlBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function ensureUser(env: Env, identity: AccessIdentity): Promise<AppUser> {
  const id = `usr_${await sha256Hex(identity.sub)}`;
  const adminEmails = new Set((env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean));
  const role = adminEmails.has(identity.email) ? "admin" : "user";
  const now = new Date().toISOString();
  await env.DB.prepare(`
    INSERT INTO users (id, access_subject, email, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(access_subject) DO UPDATE SET
      email = excluded.email,
      role = excluded.role,
      updated_at = excluded.updated_at
  `).bind(id, identity.sub, identity.email, role, now, now).run();
  const row = await env.DB.prepare("SELECT id, role, disabled_at FROM users WHERE access_subject = ?")
    .bind(identity.sub).first<{ id: string; role: "user" | "admin"; disabled_at?: string }>();
  if (!row || row.disabled_at) throw new HttpError(403, "account_disabled", "このアカウントは利用できません。");
  return { ...identity, id: row.id, role: row.role };
}

async function handleSyncPull(context: PagesContext, user: AppUser) {
  const url = new URL(context.request.url);
  const cursor = Math.max(0, Number(url.searchParams.get("cursor") ?? "0") || 0);
  const rows = await context.env.DB.prepare(`
    SELECT id AS cursor, entity_type, entity_id, payload_json, updated_at, deleted_at
    FROM sync_changes
    WHERE user_id = ? AND id > ?
    ORDER BY id ASC
    LIMIT 500
  `).bind(user.id, cursor).all<{
    cursor: number;
    entity_type: string;
    entity_id: string;
    payload_json: string | null;
    updated_at: string;
    deleted_at: string | null;
  }>();
  const changes = (rows.results ?? []).map((row) => ({
    cursor: row.cursor,
    entity_type: row.entity_type,
    entity_id: row.entity_id,
    payload: row.payload_json ? JSON.parse(row.payload_json) : null,
    updated_at: row.updated_at,
    deleted_at: row.deleted_at,
  }));
  const nextCursor = changes.length ? changes[changes.length - 1].cursor : cursor;
  return json({ changes, cursor: nextCursor, has_more: changes.length === 500 });
}

async function handleSyncPush(context: PagesContext, user: AppUser) {
  const body = await readJson<{ device_id?: string; records?: SyncRecord[] }>(context.request);
  const records = Array.isArray(body.records) ? body.records : [];
  if (!body.device_id || body.device_id.length > 120) throw new HttpError(400, "invalid_device", "端末IDがありません。");
  if (records.length > 150) throw new HttpError(400, "too_many_records", "一度に送信できる記録数を超えています。");
  const statements = records.map((record) => {
    validateSyncRecord(record);
    return context.env.DB.prepare(`
      INSERT INTO user_records (
        user_id, entity_type, entity_id, payload_json, updated_at, deleted_at
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, entity_type, entity_id) DO UPDATE SET
        payload_json = excluded.payload_json,
        updated_at = excluded.updated_at,
        deleted_at = excluded.deleted_at
      WHERE excluded.updated_at >= user_records.updated_at
        AND (
          excluded.payload_json IS NOT user_records.payload_json
          OR excluded.deleted_at IS NOT user_records.deleted_at
        )
    `).bind(
      user.id,
      record.entity_type,
      record.entity_id,
      record.payload ? JSON.stringify(record.payload) : null,
      record.updated_at,
      record.deleted_at ?? null,
    );
  });
  if (statements.length) await context.env.DB.batch(statements);
  const cursor = await latestCursor(context.env.DB, user.id);
  await context.env.DB.prepare(`
    INSERT INTO sync_devices (user_id, device_id, last_cursor, last_seen_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, device_id) DO UPDATE SET
      last_cursor = excluded.last_cursor,
      last_seen_at = excluded.last_seen_at
  `).bind(user.id, body.device_id, cursor, new Date().toISOString()).run();
  return json({ accepted: records.length, cursor });
}

async function handleSyncInventory(context: PagesContext, user: AppUser) {
  const body = await readJson<{ expected_cursor?: number; inventory?: Record<string, string[]> }>(context.request);
  const currentCursor = await latestCursor(context.env.DB, user.id);
  if ((body.expected_cursor ?? -1) !== currentCursor) {
    throw new HttpError(409, "sync_changed", "別の端末から変更が届きました。もう一度同期してください。");
  }
  const inventory = body.inventory ?? {};
  const totalIds = Object.values(inventory).reduce((sum, ids) => sum + (Array.isArray(ids) ? ids.length : 0), 0);
  if (totalIds > 25_000) throw new HttpError(413, "inventory_too_large", "同期対象が多すぎます。");
  const existing = await context.env.DB.prepare(`
    SELECT entity_type, entity_id FROM user_records
    WHERE user_id = ? AND deleted_at IS NULL
  `).bind(user.id).all<{ entity_type: string; entity_id: string }>();
  const now = new Date().toISOString();
  const deletes = (existing.results ?? []).filter((row) => {
    const ids = inventory[row.entity_type];
    return Array.isArray(ids) && !ids.includes(row.entity_id);
  });
  for (let offset = 0; offset < deletes.length; offset += 100) {
    await context.env.DB.batch(deletes.slice(offset, offset + 100).map((row) => context.env.DB.prepare(`
      UPDATE user_records
      SET payload_json = NULL, deleted_at = ?, updated_at = ?
      WHERE user_id = ? AND entity_type = ? AND entity_id = ? AND deleted_at IS NULL
    `).bind(now, now, user.id, row.entity_type, row.entity_id)));
  }
  return json({ deleted: deletes.length, cursor: await latestCursor(context.env.DB, user.id) });
}

function validateSyncRecord(record: SyncRecord) {
  if (!record || !allowedEntityTypes.has(record.entity_type)) throw new HttpError(400, "invalid_entity_type", "同期対象の種類が不正です。");
  if (!record.entity_id || record.entity_id.length > 180) throw new HttpError(400, "invalid_entity_id", "同期対象のIDが不正です。");
  if (!isIsoDate(record.updated_at)) throw new HttpError(400, "invalid_updated_at", "更新日時が不正です。");
  if (record.payload && JSON.stringify(record.payload).length > 500_000) throw new HttpError(413, "record_too_large", "1件の記録が大きすぎます。");
}

async function latestCursor(db: D1Database, userId: string) {
  return Number(await db.prepare("SELECT COALESCE(MAX(id), 0) AS cursor FROM sync_changes WHERE user_id = ?")
    .bind(userId).first<number>("cursor") ?? 0);
}

async function handleMigrationRegister(context: PagesContext, user: AppUser) {
  const body = await readJson<{ file_hash?: string; record_count?: number }>(context.request);
  if (!/^[a-f0-9]{64}$/i.test(body.file_hash ?? "")) throw new HttpError(400, "invalid_file_hash", "バックアップ識別子が不正です。");
  const existing = await context.env.DB.prepare("SELECT imported_at FROM migration_runs WHERE user_id = ? AND file_hash = ?")
    .bind(user.id, body.file_hash).first<{ imported_at: string }>();
  if (existing) return json({ duplicate: true, imported_at: existing.imported_at }, 409);
  const importedAt = new Date().toISOString();
  await context.env.DB.prepare(`
    INSERT INTO migration_runs (user_id, file_hash, record_count, imported_at)
    VALUES (?, ?, ?, ?)
  `).bind(user.id, body.file_hash, Math.max(0, Number(body.record_count) || 0), importedAt).run();
  return json({ duplicate: false, imported_at: importedAt }, 201);
}

async function handleCatalog(context: PagesContext) {
  const since = new URL(context.request.url).searchParams.get("since") ?? "";
  const rows = await context.env.DB.prepare(`
    SELECT id, version, menu_payload_json, evidence_type, source_url, evidence_label, verified_at, updated_at
    FROM shared_menu_items
    WHERE archived_at IS NULL AND updated_at > ?
    ORDER BY updated_at ASC, id ASC
    LIMIT 500
  `).bind(since).all<Record<string, string | number>>();
  return json({
    items: (rows.results ?? []).map((row) => ({
      ...row,
      menu: JSON.parse(String(row.menu_payload_json)),
      menu_payload_json: undefined,
    })),
  });
}

async function handleCatalogSubmission(context: PagesContext, user: AppUser) {
  const body = await readJson<{
    menu?: Record<string, unknown>;
    evidence_type?: string;
    source_url?: string;
    evidence_image?: string;
  }>(context.request, 3_000_000);
  if (!body.menu || typeof body.menu !== "object") throw new HttpError(400, "invalid_menu", "メニュー情報がありません。");
  const evidenceType = body.evidence_type ?? "";
  if (!["official_url", "package_label", "official_document", "in_store_display"].includes(evidenceType)) {
    throw new HttpError(400, "invalid_evidence_type", "公式値の確認元を選んでください。");
  }
  let sourceUrl: string | null = null;
  if (body.source_url) {
    try {
      const url = new URL(body.source_url);
      if (!["https:", "http:"].includes(url.protocol)) throw new Error();
      sourceUrl = url.toString();
    } catch {
      throw new HttpError(400, "invalid_source_url", "公式URLが不正です。");
    }
  }
  let evidenceObjectKey: string | null = null;
  let evidenceSha: string | null = null;
  if (body.evidence_image) {
    const image = parseDataImage(body.evidence_image, 2_000_000);
    evidenceSha = await sha256Hex(image.bytes);
    evidenceObjectKey = `catalog-evidence/${crypto.randomUUID()}.${image.extension}`;
    await context.env.EVIDENCE.put(evidenceObjectKey, image.bytes, {
      httpMetadata: { contentType: image.contentType },
      customMetadata: { sha256: evidenceSha, evidenceType },
    });
  }
  if (!sourceUrl && !evidenceObjectKey) throw new HttpError(400, "evidence_required", "公式URLまたは確認できるラベル画像が必要です。");
  const id = `submission_${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  await context.env.DB.prepare(`
    INSERT INTO catalog_submissions (
      id, submitter_user_id, status, menu_payload_json, evidence_type,
      source_url, evidence_object_key, evidence_sha256, created_at, updated_at
    ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, user.id, JSON.stringify(body.menu), evidenceType, sourceUrl, evidenceObjectKey, evidenceSha, now, now).run();
  await audit(context.env.DB, user.id, "catalog_submission_created", "catalog_submission", id, { evidence_type: evidenceType });
  return json({ id, status: "pending" }, 201);
}

async function handleAdminSubmissions(context: PagesContext, user: AppUser) {
  requireAdmin(user);
  const rows = await context.env.DB.prepare(`
    SELECT id, status, menu_payload_json, evidence_type, source_url,
      evidence_object_key, review_note, created_at, updated_at
    FROM catalog_submissions
    WHERE status = 'pending'
    ORDER BY created_at ASC
    LIMIT 200
  `).all<Record<string, string | null>>();
  return json({
    submissions: (rows.results ?? []).map((row) => ({
      ...row,
      menu: JSON.parse(String(row.menu_payload_json)),
      menu_payload_json: undefined,
      has_evidence_image: Boolean(row.evidence_object_key),
      evidence_object_key: undefined,
    })),
  });
}

async function handleAdminReview(context: PagesContext, user: AppUser, id: string, status: "approved" | "rejected") {
  requireAdmin(user);
  const body = await readJson<{ note?: string }>(context.request);
  const submission = await context.env.DB.prepare(`
    SELECT id, status, menu_payload_json, evidence_type, source_url, evidence_object_key
    FROM catalog_submissions WHERE id = ?
  `).bind(id).first<{
    id: string;
    status: string;
    menu_payload_json: string;
    evidence_type: string;
    source_url: string | null;
    evidence_object_key: string | null;
  }>();
  if (!submission || submission.status !== "pending") throw new HttpError(404, "submission_not_pending", "審査対象が見つかりません。");
  const now = new Date().toISOString();
  await context.env.DB.prepare(`
    UPDATE catalog_submissions
    SET status = ?, review_note = ?, reviewed_by_user_id = ?, reviewed_at = ?, updated_at = ?
    WHERE id = ? AND status = 'pending'
  `).bind(status, cleanText(body.note, 500), user.id, now, now, id).run();
  if (status === "approved") {
    const menu = JSON.parse(submission.menu_payload_json) as { name?: string; brand?: string; serving_label?: string };
    const canonicalKey = [
      cleanText(menu.brand, 120).toLowerCase(),
      cleanText(menu.name, 160).toLowerCase(),
      cleanText(menu.serving_label, 80).toLowerCase(),
    ].join("\n");
    const menuId = `shared_${(await sha256Hex(canonicalKey)).slice(0, 32)}`;
    const evidenceLabel = submission.evidence_type === "package_label"
      ? "商品ラベル確認済み"
      : submission.evidence_type === "official_url"
        ? "公式URL確認済み"
        : "公式資料確認済み";
    await context.env.DB.prepare(`
      INSERT INTO shared_menu_items (
        id, version, menu_payload_json, evidence_type, source_url,
        evidence_label, verified_at, updated_at
      ) VALUES (?, 1, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        version = shared_menu_items.version + 1,
        menu_payload_json = excluded.menu_payload_json,
        evidence_type = excluded.evidence_type,
        source_url = excluded.source_url,
        evidence_label = excluded.evidence_label,
        verified_at = excluded.verified_at,
        updated_at = excluded.updated_at,
        archived_at = NULL
    `).bind(menuId, submission.menu_payload_json, submission.evidence_type, submission.source_url, evidenceLabel, now, now).run();
  } else if (submission.evidence_object_key) {
    context.waitUntil(deleteEvidenceAfterDelay(context.env, submission.evidence_object_key));
  }
  await audit(context.env.DB, user.id, `catalog_submission_${status}`, "catalog_submission", id, { note: cleanText(body.note, 200) });
  return json({ id, status });
}

async function deleteEvidenceAfterDelay(_env: Env, _key: string) {
  // R2 lifecycle rules delete rejected evidence after 30 days. This waitUntil
  // hook intentionally performs no immediate deletion so an appeal remains possible.
  return Promise.resolve();
}

async function handleEvidenceDownload(context: PagesContext, user: AppUser, id: string) {
  requireAdmin(user);
  const row = await context.env.DB.prepare("SELECT evidence_object_key FROM catalog_submissions WHERE id = ?")
    .bind(id).first<{ evidence_object_key: string | null }>();
  if (!row?.evidence_object_key) throw new HttpError(404, "evidence_not_found", "証拠画像がありません。");
  const object = await context.env.EVIDENCE.get(row.evidence_object_key);
  if (!object) throw new HttpError(404, "evidence_not_found", "証拠画像がありません。");
  return new Response(object.body, {
    headers: {
      "content-type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "cache-control": "private, no-store",
      "content-disposition": "inline",
      "x-content-type-options": "nosniff",
    },
  });
}

async function handleGeminiPhoto(context: PagesContext, user: AppUser) {
  const body = await readJson<{
    food_image?: string;
    evidence_image?: string;
    brand_hint?: string;
    use_fallback?: boolean;
  }>(context.request, 12_000_000);
  if (!body.food_image && !body.evidence_image) throw new HttpError(400, "image_required", "写真またはレシート・ラベルを選んでください。");
  if (!context.env.GEMINI_API_KEY) throw new HttpError(503, "gemini_not_configured", "アプリ内写真判定は準備中です。");
  const foodImage = body.food_image ? parseDataImage(body.food_image, 5_000_000) : null;
  const evidenceImage = body.evidence_image ? parseDataImage(body.evidence_image, 5_000_000) : null;
  const model = body.use_fallback
    ? context.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite"
    : context.env.GEMINI_PRIMARY_MODEL || "gemini-3.6-flash";
  const usageDate = pacificDate();
  await enforceAiLimit(context.env, user.id, usageDate, model);
  const hashInput = `${model}:${body.brand_hint ?? ""}:${body.food_image ?? ""}:${body.evidence_image ?? ""}`;
  const imageHash = await sha256Hex(hashInput);
  const cached = await context.env.DB.prepare(`
    SELECT response_json, model FROM ai_result_cache
    WHERE user_id = ? AND image_hash = ? AND expires_at > ?
  `).bind(user.id, imageHash, new Date().toISOString()).first<{ response_json: string; model: string }>();
  if (cached) return json({ result: JSON.parse(cached.response_json), model: cached.model, cached: true });

  const input: Array<Record<string, unknown>> = [{ type: "text", text: geminiFoodPrompt(body.brand_hint) }];
  if (foodImage) {
    input.push({
      type: "image",
      mime_type: foodImage.contentType,
      data: bytesToBase64(foodImage.bytes),
    });
  }
  if (evidenceImage) {
    input.push({
      type: "text",
      text: "次の画像は、補助情報となるレシートまたは商品パッケージ・栄養成分表示です。",
    });
    input.push({
      type: "image",
      mime_type: evidenceImage.contentType,
      data: bytesToBase64(evidenceImage.bytes),
    });
  }
  const response = await fetch("https://generativelanguage.googleapis.com/v1/interactions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": context.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      model,
      input,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: geminiResponseSchema,
      },
    }),
  });
  if (!response.ok) {
    const upstream = await readGeminiApiError(response);
    console.error("gemini_upstream_error", JSON.stringify({
      model,
      status: response.status,
      error_status: upstream.status,
      reason: upstream.reason,
      message: upstream.message,
    }));
    await recordAiUsage(context.env.DB, user.id, usageDate, model, false);
    await audit(
      context.env.DB,
      user.id,
      "gemini_upstream_error",
      "gemini_model",
      model,
      {
        status: response.status,
        error_status: upstream.status,
        reason: upstream.reason,
        message: upstream.message,
      },
    ).catch(() => undefined);
    if (response.status === 429) throw new HttpError(429, "gemini_quota_exhausted", "本日のアプリ内写真判定枠を使い切った可能性があります。");
    if (response.status === 400) throw new HttpError(502, "gemini_request_invalid", "Gemini APIへの送信形式を確認できませんでした。");
    if (response.status === 401) throw new HttpError(503, "gemini_key_invalid", "Gemini APIキーを確認できません。");
    if (response.status === 403) throw new HttpError(503, "gemini_permission_denied", "Gemini APIの設定を確認できません。");
    if (response.status === 404) throw new HttpError(503, "gemini_model_unavailable", "指定したGeminiモデルを利用できません。");
    throw new HttpError(502, "gemini_unavailable", "写真判定サービスへ接続できませんでした。");
  }
  const gemini = await response.json() as {
    steps?: Array<{
      type?: string;
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };
  const text = (gemini.steps ?? [])
    .filter((step) => step.type === "model_output")
    .flatMap((step) => step.content ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("")
    .trim();
  if (!text) {
    await recordAiUsage(context.env.DB, user.id, usageDate, model, false);
    throw new HttpError(502, "gemini_empty_response", "写真から候補を読み取れませんでした。");
  }
  let result: Record<string, unknown>;
  try {
    result = JSON.parse(text) as Record<string, unknown>;
  } catch {
    await recordAiUsage(context.env.DB, user.id, usageDate, model, false);
    throw new HttpError(502, "gemini_invalid_response", "写真判定結果の形式が不正です。");
  }
  validateGeminiResult(result);
  await recordAiUsage(context.env.DB, user.id, usageDate, model, true);
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
  await context.env.DB.prepare(`
    INSERT INTO ai_result_cache (user_id, image_hash, response_json, model, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, image_hash) DO UPDATE SET
      response_json = excluded.response_json,
      model = excluded.model,
      expires_at = excluded.expires_at,
      created_at = excluded.created_at
  `).bind(user.id, imageHash, JSON.stringify(result), model, expires, now.toISOString()).run();
  return json({ result, model, cached: false });
}

async function readGeminiApiError(response: Response) {
  try {
    const payload = await response.json() as {
      code?: number;
      status?: string;
      message?: string;
      error?: {
        code?: number;
        status?: string;
        message?: string;
        details?: Array<{
          reason?: string;
          metadata?: { reason?: string };
        }>;
      };
    };
    const details = payload.error?.details ?? [];
    const reason = details
      .map((detail) => detail.reason || detail.metadata?.reason)
      .find((value): value is string => Boolean(value));
    return {
      status: cleanText(payload.error?.status || payload.status, 80) || "unknown",
      reason: cleanText(reason, 120) || "unknown",
      message: cleanText(payload.error?.message || payload.message, 240) || "unknown",
    };
  } catch {
    return { status: "unknown", reason: "unparseable_response", message: "unparseable_response" };
  }
}

async function handleAiUsage(context: PagesContext, user: AppUser) {
  const usageDate = pacificDate();
  const rows = await context.env.DB.prepare(`
    SELECT feature, model, success_count, failure_count
    FROM ai_usage_daily WHERE user_id = ? AND usage_date = ?
  `).bind(user.id, usageDate).all<Record<string, string | number>>();
  const used = (rows.results ?? []).reduce((sum, row) => sum + Number(row.success_count) + Number(row.failure_count), 0);
  return json({
    usage_date: usageDate,
    used,
    per_user_limit: numericLimit(context.env.GEMINI_PER_USER_DAILY_LIMIT, 5),
    rows: rows.results ?? [],
  });
}

async function enforceAiLimit(env: Env, userId: string, usageDate: string, model: string) {
  const perUserLimit = numericLimit(env.GEMINI_PER_USER_DAILY_LIMIT, 5);
  const globalLimit = numericLimit(env.GEMINI_GLOBAL_DAILY_LIMIT, 40);
  const userUsed = Number(await env.DB.prepare(`
    SELECT COALESCE(SUM(success_count + failure_count), 0) AS used
    FROM ai_usage_daily WHERE user_id = ? AND usage_date = ? AND feature = 'photo'
  `).bind(userId, usageDate).first<number>("used") ?? 0);
  if (userUsed >= perUserLimit) throw new HttpError(429, "user_ai_limit", "本日のアプリ内写真判定回数を使い切りました。");
  const globalUsed = Number(await env.DB.prepare(`
    SELECT COALESCE(SUM(success_count + failure_count), 0) AS used
    FROM ai_usage_daily WHERE usage_date = ? AND feature = 'photo'
  `).bind(usageDate).first<number>("used") ?? 0);
  if (globalUsed >= globalLimit) throw new HttpError(429, "global_ai_limit", "本日のアプリ内写真判定枠を使い切りました。");
  void model;
}

async function recordAiUsage(db: D1Database, userId: string, usageDate: string, model: string, success: boolean) {
  const now = new Date().toISOString();
  await db.prepare(`
    INSERT INTO ai_usage_daily (
      user_id, usage_date, feature, model, success_count, failure_count, updated_at
    ) VALUES (?, ?, 'photo', ?, ?, ?, ?)
    ON CONFLICT(user_id, usage_date, feature, model) DO UPDATE SET
      success_count = success_count + excluded.success_count,
      failure_count = failure_count + excluded.failure_count,
      updated_at = excluded.updated_at
  `).bind(userId, usageDate, model, success ? 1 : 0, success ? 0 : 1, now).run();
}

const geminiResponseSchema = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["food_ai_bridge_v3"] },
    items: {
      type: "array",
      maxItems: 12,
      items: {
        type: "object",
        properties: {
          observed_name: { type: "string" },
          possible_brand: { type: "string" },
          possible_menu_name: { type: "string" },
          food_type: { type: "string" },
          quantity: { type: "string" },
          nutrition_candidate: {
            type: "object",
            properties: {
              calories: { type: "number" },
              protein_g: { type: "number" },
              fat_g: { type: "number" },
              carbs_g: { type: "number" },
              salt_g: { type: "number" },
            },
            required: ["calories", "protein_g", "fat_g", "carbs_g"],
          },
          confidence: { type: "string", enum: ["high", "medium", "low"] },
          match_keywords: { type: "array", items: { type: "string" } },
          needs_confirmation: { type: "array", items: { type: "string" } },
          note: { type: "string" },
          evidence_origin: {
            type: "string",
            enum: ["package_label", "receipt_read", "ai_photo_estimate", "brand_match", "unknown"],
          },
        },
        required: ["observed_name", "nutrition_candidate", "confidence", "match_keywords", "needs_confirmation", "evidence_origin"],
      },
    },
  },
  required: ["type", "items"],
};

function geminiFoodPrompt(brandHint?: string) {
  return `あなたは食事記録アプリ「100% トラッカー」の画像判定器です。
日本のチェーン店・コンビニ・市販食品を優先して、食事写真と任意のレシート／パッケージを照合してください。
${brandHint ? `ユーザーのブランド候補: ${cleanText(brandHint, 100)}` : "ブランド候補は指定されていません。"}

必須ルール:
- 写真内の食べ物を1品ずつ分ける。
- レシートは購入内容であり、実際に食べた量とは限らない。
- パッケージに明記された栄養値だけ evidence_origin=package_label とする。
- レシートに栄養値がなければ、栄養値の公式根拠にはしない。
- 写真推定は evidence_origin=ai_photo_estimate とする。
- 不明な商品を断定せず、候補名と確認事項を返す。
- kcal/P/F/Cは0以上の有限値にする。
- JSON Schemaに一致するJSONだけを返す。`;
}

function validateGeminiResult(result: Record<string, unknown>) {
  if (result.type !== "food_ai_bridge_v3" || !Array.isArray(result.items) || result.items.length > 12) {
    throw new HttpError(502, "gemini_invalid_response", "写真判定結果の構造が不正です。");
  }
  for (const raw of result.items) {
    if (!raw || typeof raw !== "object") throw new HttpError(502, "gemini_invalid_response", "写真判定結果に不正な品目があります。");
    const item = raw as Record<string, unknown>;
    const nutrition = item.nutrition_candidate as Record<string, unknown> | undefined;
    if (!cleanText(item.observed_name, 120) || !nutrition) throw new HttpError(502, "gemini_invalid_response", "写真判定結果に品目名または栄養値がありません。");
    for (const key of ["calories", "protein_g", "fat_g", "carbs_g"]) {
      const value = Number(nutrition[key]);
      if (!Number.isFinite(value) || value < 0 || value > (key === "calories" ? 10_000 : 2_000)) {
        throw new HttpError(502, "gemini_invalid_nutrition", "写真判定の栄養値が安全範囲外です。");
      }
    }
  }
}

function parseDataImage(dataUrl: string, maxBytes: number) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) throw new HttpError(400, "invalid_image", "JPEG、PNG、WebP画像を選んでください。");
  const bytes = Uint8Array.from(atob(match[2]), (character) => character.charCodeAt(0));
  if (!bytes.length || bytes.byteLength > maxBytes) throw new HttpError(413, "image_too_large", "画像サイズが上限を超えています。");
  const extension = match[1] === "image/jpeg" ? "jpg" : match[1].split("/")[1];
  return { bytes, contentType: match[1], extension };
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, Math.min(bytes.length, offset + 0x8000)));
  }
  return btoa(binary);
}

function pacificDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function numericLimit(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function requireAdmin(user: AppUser) {
  if (user.role !== "admin") throw new HttpError(403, "admin_required", "管理者権限が必要です。");
}

async function audit(db: D1Database, actorUserId: string, eventType: string, targetType?: string, targetId?: string, metadata?: unknown) {
  await db.prepare(`
    INSERT INTO audit_events (id, actor_user_id, event_type, target_type, target_id, metadata_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    `audit_${crypto.randomUUID()}`,
    actorUserId,
    eventType,
    targetType ?? null,
    targetId ?? null,
    metadata ? JSON.stringify(metadata) : null,
    new Date().toISOString(),
  ).run();
}

async function sha256Hex(value: string | ArrayBuffer | Uint8Array) {
  const input = typeof value === "string"
    ? new TextEncoder().encode(value)
    : value instanceof Uint8Array
      ? value
      : new Uint8Array(value);
  const normalized = new Uint8Array(input.byteLength);
  normalized.set(input);
  const digest = await crypto.subtle.digest("SHA-256", normalized.buffer);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function isIsoDate(value: string) {
  return typeof value === "string" && value.length <= 40 && Number.isFinite(Date.parse(value));
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength) : "";
}

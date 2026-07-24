import assert from "node:assert/strict";
import { onRequest } from "../functions/api/[[path]].ts";

const statements: Array<{ sql: string; values: unknown[] }> = [];
const fakeDb = {
  prepare(sql: string) {
    const entry = { sql, values: [] as unknown[] };
    statements.push(entry);
    const statement = {
      bind(...values: unknown[]) {
        entry.values = values;
        return statement;
      },
      async first<T>(column?: string) {
        if (sql.includes("SELECT id, role, disabled_at FROM users")) {
          return { id: "usr_test", role: "user" } as T;
        }
        if (sql.includes("SELECT response_json, model FROM ai_result_cache")) return null;
        if (column === "used") return 0 as T;
        return null;
      },
      async all<T>() {
        return { success: true, results: [] as T[] };
      },
      async run() {
        return { success: true };
      },
    };
    return statement;
  },
  async batch() {
    return [];
  },
};

const expectedResult = {
  type: "food_ai_bridge_v3",
  items: [{
    observed_name: "テスト食品",
    nutrition_candidate: {
      calories: 1,
      protein_g: 0,
      fat_g: 0,
      carbs_g: 0,
    },
    confidence: "low",
    match_keywords: [],
    needs_confirmation: [],
    evidence_origin: "ai_photo_estimate",
  }],
};

const originalFetch = globalThis.fetch;
const upstreamBodies: unknown[] = [];
globalThis.fetch = async (_input, init) => {
  upstreamBodies.push(JSON.parse(String(init?.body)));
  return Response.json({
    candidates: [{ content: { parts: [{ text: JSON.stringify(expectedResult) }] } }],
  });
};

try {
  const request = new Request("https://tracker.test/api/ai/photo-analyze", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://tracker.test",
      "x-dev-user-email": "tester@example.com",
    },
    body: JSON.stringify({
      food_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z2S8AAAAASUVORK5CYII=",
      brand_hint: "テスト店 テストメニュー",
    }),
  });
  const response = await onRequest({
    request,
    env: {
      DB: fakeDb,
      EVIDENCE: {
        async put() {},
        async get() { return null; },
        async delete() {},
      },
      ACCESS_TEAM_DOMAIN: "example.cloudflareaccess.com",
      ACCESS_AUD: "test-audience",
      GEMINI_API_KEY: "test-key",
      GEMINI_PRIMARY_MODEL: "gemini-primary",
      GEMINI_FALLBACK_MODEL: "gemini-fallback",
      GEMINI_PER_USER_DAILY_LIMIT: "3",
      GEMINI_GLOBAL_DAILY_LIMIT: "10",
      DEV_AUTH_BYPASS: "1",
    },
    params: { path: ["ai", "photo-analyze"] },
    waitUntil() {},
  });
  const payload = await response.json() as {
    result?: typeof expectedResult;
    model?: string;
    cached?: boolean;
  };

  assert.equal(response.status, 200);
  assert.deepEqual(payload.result, expectedResult);
  assert.equal(payload.model, "gemini-primary");
  assert.equal(payload.cached, false);
  assert.equal(upstreamBodies.length, 1);
  assert.ok(statements.some((entry) => entry.sql.includes("INSERT INTO ai_usage_daily")));
  assert.ok(statements.some((entry) => entry.sql.includes("INSERT INTO ai_result_cache")));
} finally {
  globalThis.fetch = originalFetch;
}

console.log("Gemini photo handler integration test passed");

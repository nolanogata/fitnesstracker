import assert from "node:assert/strict";
import { recordsUpdatedAfter } from "../src/lib/syncDelta.ts";
import { onRequest } from "../functions/api/[[path]].ts";

const records = [
  { id: "old", updated_at: "2026-07-23T00:00:00.000Z" },
  { id: "same", updated_at: "2026-07-24T00:00:00.000Z" },
  { id: "new", updated_at: "2026-07-24T00:00:00.001Z" },
];
assert.deepEqual(recordsUpdatedAfter(records).map((record) => record.id), ["old", "same", "new"]);
assert.deepEqual(
  recordsUpdatedAfter(records, "2026-07-24T00:00:00.000Z").map((record) => record.id),
  ["new"],
);
assert.deepEqual(recordsUpdatedAfter(records, "not-a-date").map((record) => record.id), ["old", "same", "new"]);

type Prepared = {
  sql: string;
  values: unknown[];
  bind: (...values: unknown[]) => Prepared;
  first: <T>(column?: string) => Promise<T | null>;
  all: <T>() => Promise<{ success: boolean; results: T[] }>;
  run: () => Promise<{ success: boolean; meta: { changes: number } }>;
};

const counters = new Map<string, number>();
const statements: Prepared[] = [];
const fakeDb = {
  prepare(sql: string): Prepared {
    const statement: Prepared = {
      sql,
      values: [],
      bind(...values) {
        statement.values = values;
        return statement;
      },
      async first<T>(column?: string) {
        if (sql.includes("SELECT id, role, disabled_at FROM users")) {
          return { id: "usr_test", role: "user" } as T;
        }
        if (sql.includes("SELECT usage_count FROM daily_usage_counters") && column === "usage_count") {
          return (counters.get(statement.values.slice(0, 3).join("|")) ?? null) as T | null;
        }
        return null;
      },
      async all<T>() {
        return { success: true, results: [] as T[] };
      },
      async run() {
        return { success: true, meta: { changes: 1 } };
      },
    };
    statements.push(statement);
    return statement;
  },
  async batch(batchStatements: Prepared[]) {
    return batchStatements.map((statement) => {
      if (!statement.sql.includes("INSERT INTO daily_usage_counters")) {
        return { success: true, meta: { changes: 1 } };
      }
      const key = statement.values.slice(0, 3).join("|");
      const limit = Number(statement.values[4]);
      const current = counters.get(key) ?? 0;
      if (current >= limit) return { success: true, meta: { changes: 0 } };
      counters.set(key, current + 1);
      return { success: true, meta: { changes: 1 } };
    });
  },
};

let r2Writes = 0;
const env = {
  DB: fakeDb,
  EVIDENCE: {
    async put() { r2Writes += 1; },
    async get() { return null; },
    async delete() {},
  },
  ACCESS_TEAM_DOMAIN: "example.cloudflareaccess.com",
  ACCESS_AUD: "test-audience",
  CATALOG_EVIDENCE_PER_USER_DAILY_LIMIT: "2",
  CATALOG_EVIDENCE_GLOBAL_DAILY_LIMIT: "4",
  DEV_AUTH_BYPASS: "1",
};
const image = "data:image/png;base64,iVBORw0KGgo=";

async function submit() {
  return onRequest({
    request: new Request("https://tracker.test/api/catalog/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://tracker.test",
        "x-dev-user-email": "tester@example.com",
      },
      body: JSON.stringify({
        menu: { name: "テスト食品", calories: 1 },
        evidence_type: "package_label",
        evidence_image: image,
      }),
    }),
    env,
    params: { path: ["catalog", "submissions"] },
    waitUntil() {},
  });
}

assert.equal((await submit()).status, 201);
assert.equal((await submit()).status, 201);
const limited = await submit();
assert.equal(limited.status, 429);
assert.equal((await limited.json() as { error: string }).error, "user_evidence_limit");
assert.equal(r2Writes, 2);
assert.ok(statements.some((statement) => statement.sql.includes("INSERT INTO catalog_submissions")));

console.log("Cloud safety tests passed");

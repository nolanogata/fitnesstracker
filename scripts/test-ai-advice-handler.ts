import assert from "node:assert/strict";
import { onRequest } from "../functions/api/[[path]].ts";

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
const aiInputs: Array<Record<string, unknown>> = [];
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
        if (sql.includes("SELECT response_json, model FROM ai_result_cache")) return null;
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
      const key = statement.values.slice(0, 3).join("|");
      const limit = Number(statement.values[4]);
      const current = counters.get(key) ?? 0;
      if (current >= limit) return { success: true, meta: { changes: 0 } };
      counters.set(key, current + 1);
      return { success: true, meta: { changes: 1 } };
    });
  },
};

const env = {
  DB: fakeDb,
  EVIDENCE: {
    async put() {},
    async get() { return null; },
    async delete() {},
  },
  AI: {
    async run(_model: string, input: Record<string, unknown>) {
      aiInputs.push(input);
      return {
        response: {
          headline: "今週は記録の安定を優先",
          summary: "記録できている日の傾向を基準に、小さく調整してください。",
          observations: ["7日間の食事記録は5日です。"],
          evidence: [{ label: "食事記録", value: "5/7日", period: "直近7日" }],
          actions: ["夕食だけでも記録を続ける"],
          cautions: ["未記録日を0kcalとして評価しない"],
          follow_up_question: "続けにくい曜日はありますか？",
          memory_updates: [{ category: "focus", text: "食事記録の継続を優先" }],
        },
      };
    },
  },
  ACCESS_TEAM_DOMAIN: "example.cloudflareaccess.com",
  ACCESS_AUD: "test-audience",
  WORKERS_AI_ADVICE_MODEL: "@cf/meta/llama-3.1-8b-instruct-fast",
  AI_ADVICE_PER_USER_DAILY_LIMIT: "3",
  AI_ADVICE_GLOBAL_DAILY_LIMIT: "30",
  DEV_AUTH_BYPASS: "1",
};

async function advise(index: number) {
  return onRequest({
    request: new Request("https://tracker.test/api/ai/advice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://tracker.test",
        "x-dev-user-email": "tester@example.com",
      },
      body: JSON.stringify({
        request_id: `request_${index}`,
        thread_id: `thread_${index}`,
        turn_index: 0,
        period_start: "2026-07-18",
        period_end: "2026-07-24",
        content_scope: "both",
        question: "今週の改善点は？",
        context: "# 匿名化された相談コンテキスト\n- 食事記録: 5/7日",
        presentation_style: "neutral",
      }),
    }),
    env,
    params: { path: ["ai", "advice"] },
    waitUntil() {},
  });
}

for (let index = 0; index < 3; index += 1) {
  const response = await advise(index);
  assert.equal(response.status, 200);
  const payload = await response.json() as { result: { headline: string }; model: string };
  assert.equal(payload.result.headline, "今週は記録の安定を優先");
  assert.equal(payload.model, "@cf/meta/llama-3.1-8b-instruct-fast");
}

const limited = await advise(4);
assert.equal(limited.status, 429);
assert.equal((await limited.json() as { error: string }).error, "user_advice_limit");
assert.equal(aiInputs.length, 3);
assert.ok(aiInputs.every((input) => !JSON.stringify(input).includes("tester@example.com")));
assert.ok(statements.some((statement) => statement.sql.includes("INSERT INTO ai_usage_daily")));
assert.ok(statements.some((statement) => statement.sql.includes("INSERT INTO ai_result_cache")));

console.log("Workers AI advice handler tests passed");

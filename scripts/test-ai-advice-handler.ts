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
const adviceResult = {
  headline: "今週は記録の安定を優先",
  summary: "記録できている日の傾向を基準に、小さく調整してください。",
  observations: ["7日間の食事記録は5日です。"],
  evidence: [{ label: "食事記録", value: "5/7日", period: "直近7日" }],
  actions: ["夕食だけでも記録を続ける"],
  cautions: ["未記録日を0kcalとして評価しない"],
  follow_up_question: "続けにくい曜日はありますか？",
  memory_updates: [{ category: "focus", text: "食事記録の継続を優先" }],
};
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
      if (aiInputs.length === 1) return { response: adviceResult };
      if (aiInputs.length === 2) return { response: JSON.stringify(adviceResult) };
      if (aiInputs.length === 3) return { choices: [{ message: { content: `\`\`\`json\n${JSON.stringify(adviceResult)}\n\`\`\`` } }] };
      if (aiInputs.length === 4) return {
        response: `【結論】
次回は下半身の回復を見ながら上半身を進めましょう。
【記録から見えること】
- 今週は3回ワークアウトを記録しています。
【根拠】
- 実施回数: 3回
【まず試すこと】
- 次回は上半身を中心にする
【注意】
- 痛みがある場合は中止する
【追加で確認】
- 筋肉痛が残っている部位はありますか？`,
      };
      if (aiInputs.length === 6) return {
        response: `【結論】
今週の改善点は？
【記録から見えること】
- ワークアウトは3回です。
- ワークアウトは3回です。
- 種目ごとの重量が均一ではありません。
【根拠】
- 実施回数: 3回
- 実施回数: 3回
【まず試すこと】
1. 種目ごとの重量を均一にする
2. 次回は上半身を中心にする
3. 次回は上半身を中心にする
【注意】
- 次回は上半身を中心にする
- セット数を一定にする必要があります。
- 痛みがある場合は中止する`,
      };
      return { response: "今週の記録を基準に、無理のない範囲で次回の負荷を調整してください。" };
    },
  },
  ACCESS_TEAM_DOMAIN: "example.cloudflareaccess.com",
  ACCESS_AUD: "test-audience",
  WORKERS_AI_ADVICE_MODEL: "@cf/meta/llama-3.1-8b-instruct-fast",
  AI_ADVICE_PER_USER_DAILY_LIMIT: "6",
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
        content_scope: index === 5 ? "workout" : "both",
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

for (let index = 0; index < 6; index += 1) {
  const response = await advise(index);
  assert.equal(response.status, 200);
  const payload = await response.json() as {
    result: { headline: string; observations: string[]; evidence: unknown[]; actions: string[]; cautions: string[] };
    model: string;
  };
  assert.equal(
    payload.result.headline,
    index === 3
      ? "次回は下半身の回復を見ながら上半身を進めましょう。"
      : index === 5
        ? "ワークアウト記録の振り返り"
      : index === 4
        ? "AIアドバイス"
        : "今週は記録の安定を優先",
  );
  if (index === 3) assert.deepEqual(payload.result.actions, ["次回は上半身を中心にする"]);
  if (index === 5) {
    assert.deepEqual(payload.result.observations, ["ワークアウトは3回です。"]);
    assert.equal(payload.result.evidence.length, 1);
    assert.deepEqual(payload.result.actions, ["次回は上半身を中心にする"]);
    assert.deepEqual(payload.result.cautions, ["痛みがある場合は中止する"]);
  }
  assert.equal(payload.model, "@cf/meta/llama-3.1-8b-instruct-fast");
}

const limited = await advise(7);
assert.equal(limited.status, 429);
assert.equal((await limited.json() as { error: string }).error, "user_advice_limit");
assert.equal(aiInputs.length, 6);
assert.ok(aiInputs.every((input) => !JSON.stringify(input).includes("tester@example.com")));
assert.ok(aiInputs.every((input) => !("response_format" in input)));
assert.ok(aiInputs.every((input) => JSON.stringify(input).includes("同じ内容を複数の節に繰り返さず")));
assert.match(JSON.stringify(aiInputs[5]), /異なる種目同士の重量・回数・セット数は比較せず/);
assert.ok(statements.some((statement) => statement.sql.includes("INSERT INTO ai_usage_daily")));
assert.ok(statements.some((statement) => statement.sql.includes("INSERT INTO ai_result_cache")));

console.log("Workers AI advice handler tests passed");

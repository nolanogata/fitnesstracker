import assert from "node:assert/strict";
import {
  GeminiGenerationError,
  generateGeminiContent,
  type GeminiContentPart,
} from "../functions/api/geminiGenerateContent.ts";

const parts: GeminiContentPart[] = [
  { text: "JSONで答えてください。" },
  { inlineData: { mimeType: "image/jpeg", data: "aGVsbG8=" } },
];

const validResult = {
  type: "food_ai_bridge_v3",
  items: [],
};

{
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const response = await generateGeminiContent({
    apiKey: "test-key",
    models: ["gemini-primary", "gemini-fallback"],
    parts,
    parse: JSON.parse,
    fetchImpl: async (url, init) => {
      requests.push({ url: String(url), init });
      return Response.json({
        candidates: [{ content: { parts: [{ text: JSON.stringify(validResult) }] } }],
      });
    },
  });

  assert.equal(response.model, "gemini-primary");
  assert.deepEqual(response.value, validResult);
  assert.equal(response.attempts.length, 0);
  assert.equal(requests.length, 1);
  const body = JSON.parse(String(requests[0].init?.body));
  assert.deepEqual(body.contents, [{ role: "user", parts }]);
  assert.deepEqual(body.generationConfig, {
    temperature: 0.1,
    maxOutputTokens: 4096,
    responseMimeType: "application/json",
  });
  assert.equal("responseSchema" in body.generationConfig, false);
}

{
  const models: string[] = [];
  const response = await generateGeminiContent({
    apiKey: "test-key",
    models: ["gemini-primary", "gemini-fallback"],
    parts,
    parse: JSON.parse,
    fetchImpl: async (url) => {
      const model = decodeURIComponent(String(url).split("/models/")[1].split(":")[0]);
      models.push(model);
      if (model === "gemini-primary") {
        return Response.json({
          error: {
            status: "INVALID_ARGUMENT",
            message: "Request contains an invalid argument.",
            details: [{ reason: "BAD_REQUEST" }],
          },
        }, { status: 400 });
      }
      return Response.json({
        candidates: [{ content: { parts: [{ text: `\`\`\`json\n${JSON.stringify(validResult)}\n\`\`\`` }] } }],
      });
    },
  });

  assert.deepEqual(models, ["gemini-primary", "gemini-fallback"]);
  assert.equal(response.model, "gemini-fallback");
  assert.equal(response.attempts.length, 1);
  assert.equal(response.attempts[0].status, 400);
  assert.equal(response.attempts[0].reason, "BAD_REQUEST");
  assert.deepEqual(response.value, validResult);
}

{
  let requestCount = 0;
  await assert.rejects(
    generateGeminiContent({
      apiKey: "test-key",
      models: ["gemini-primary", "gemini-fallback"],
      parts,
      parse: JSON.parse,
      fetchImpl: async () => {
        requestCount += 1;
        return Response.json({
          error: { status: "PERMISSION_DENIED", message: "API key not valid." },
        }, { status: 403 });
      },
    }),
    (error: unknown) => {
      assert.ok(error instanceof GeminiGenerationError);
      assert.equal(error.attempts.length, 1);
      return true;
    },
  );
  assert.equal(requestCount, 1);
}

{
  let requestCount = 0;
  const response = await generateGeminiContent({
    apiKey: "test-key",
    models: ["gemini-primary", "gemini-fallback"],
    parts,
    parse: JSON.parse,
    fetchImpl: async () => {
      requestCount += 1;
      return Response.json({
        candidates: [{
          content: {
            parts: [{ text: requestCount === 1 ? "not-json" : JSON.stringify(validResult) }],
          },
        }],
      });
    },
  });
  assert.equal(requestCount, 2);
  assert.equal(response.model, "gemini-fallback");
  assert.equal(response.attempts[0].reason, "invalid_model_output");
}

console.log("Gemini generateContent adapter tests passed");

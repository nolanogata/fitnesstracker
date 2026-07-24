export type GeminiContentPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

export type GeminiAttemptFailure = {
  model: string;
  status: number;
  errorStatus: string;
  reason: string;
  message: string;
  details: string;
};

export class GeminiGenerationError extends Error {
  readonly attempts: GeminiAttemptFailure[];

  constructor(attempts: GeminiAttemptFailure[]) {
    super("All Gemini model attempts failed.");
    this.attempts = attempts;
  }
}

export async function generateGeminiContent<T>(options: {
  apiKey: string;
  models: string[];
  parts: GeminiContentPart[];
  parse: (text: string) => T;
  fetchImpl?: typeof fetch;
}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const models = Array.from(new Set(options.models.map((model) => model.trim()).filter(Boolean)));
  const attempts: GeminiAttemptFailure[] = [];

  for (const model of models) {
    let response: Response;
    try {
      response = await fetchImpl(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-goog-api-key": options.apiKey,
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: options.parts }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 4096,
              responseMimeType: "application/json",
            },
          }),
        },
      );
    } catch (error) {
      attempts.push({
        model,
        status: 0,
        errorStatus: "network_error",
        reason: "fetch_failed",
        message: error instanceof Error ? error.message.slice(0, 240) : "Geminiへの接続に失敗しました。",
        details: "",
      });
      continue;
    }

    if (!response.ok) {
      attempts.push(await geminiFailure(response, model));
      if (response.status === 401 || response.status === 403) break;
      continue;
    }

    const payload = await response.json().catch(() => undefined) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    } | undefined;
    const text = payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();
    if (!text) {
      attempts.push({
        model,
        status: 502,
        errorStatus: "empty_response",
        reason: "empty_model_output",
        message: "Geminiからテキスト応答が返りませんでした。",
        details: "",
      });
      continue;
    }

    try {
      return { value: options.parse(stripJsonFence(text)), model, attempts };
    } catch (error) {
      attempts.push({
        model,
        status: 502,
        errorStatus: "invalid_response",
        reason: "invalid_model_output",
        message: error instanceof Error ? error.message.slice(0, 240) : "Geminiの応答を検証できませんでした。",
        details: "",
      });
    }
  }

  throw new GeminiGenerationError(attempts);
}

async function geminiFailure(response: Response, model: string): Promise<GeminiAttemptFailure> {
  const raw = await response.text().catch(() => "");
  let payload: {
    error?: {
      status?: string;
      message?: string;
      details?: Array<Record<string, unknown>>;
    };
  } = {};
  try {
    payload = JSON.parse(raw) as typeof payload;
  } catch {
    // Use the sanitized response text below when Google does not return JSON.
  }
  const details = payload.error?.details ?? [];
  const reason = details
    .map((detail) => detail.reason
      ?? (detail.metadata as { reason?: unknown } | undefined)?.reason)
    .find((value): value is string => typeof value === "string" && Boolean(value));

  return {
    model,
    status: response.status,
    errorStatus: oneLine(payload.error?.status, 80) || "unknown",
    reason: oneLine(reason, 120) || "unknown",
    message: oneLine(payload.error?.message || raw, 500) || "unknown",
    details: oneLine(details.length ? JSON.stringify(details) : "", 1_500),
  };
}

function stripJsonFence(text: string) {
  const trimmed = text.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  return fenced ? fenced[1].trim() : trimmed;
}

function oneLine(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, maxLength)
    : "";
}

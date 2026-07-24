export const geminiConsentVersion = "2026-07-24-v1";

export type GeminiPhotoAnalysis = {
  result: Record<string, unknown>;
  model: string;
  cached: boolean;
};

export type GeminiPhotoError = Error & {
  code?: string;
  fallbackAvailable?: boolean;
};

export async function prepareAiImage(file: File, maxLongEdge = 1280, quality = 0.82): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("JPEG、PNG、WebP画像を選んでください。");
  }
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxLongEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("画像を処理できませんでした。");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  if (dataUrl.length > 6_800_000) throw new Error("画像を5MB以下にしてください。");
  return dataUrl;
}

export async function analyzeWithGemini(input: {
  foodImage?: string;
  evidenceImage?: string;
  brandHint?: string;
  useFallback?: boolean;
}): Promise<GeminiPhotoAnalysis> {
  const response = await fetch("/api/ai/photo-analyze", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      food_image: input.foodImage,
      evidence_image: input.evidenceImage,
      brand_hint: input.brandHint?.trim() || undefined,
      use_fallback: input.useFallback,
    }),
  });
  const data = await response.json().catch(() => ({})) as {
    error?: string;
    message?: string;
    result?: Record<string, unknown>;
    model?: string;
    cached?: boolean;
  };
  if (!response.ok || !data.result || !data.model) {
    const error = new Error(data.message || "アプリ内写真判定に失敗しました。") as GeminiPhotoError;
    error.code = data.error;
    error.fallbackAvailable = ["gemini_quota_exhausted", "gemini_unavailable"].includes(data.error ?? "");
    throw error;
  }
  return { result: data.result, model: data.model, cached: Boolean(data.cached) };
}

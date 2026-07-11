// 브라우저에서 업로드 전에 이미지를 줄이고 다시 인코딩한다.
// 목적: 큰 폰 사진(수 MB)이 서버/호스팅 요청 크기 한도(Vercel ~4.5MB)에 걸리는 문제 해결.
// EXIF 회전도 바로잡아 세로/가로가 눕는 문제를 방지한다.

export interface PreparedImage {
  blob: Blob;
  name: string;
  previewUrl: string;
}

async function loadBitmap(
  file: File,
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, {
        imageOrientation: "from-image",
      } as ImageBitmapOptions);
    } catch {
      // 일부 포맷은 createImageBitmap 실패 → 아래 폴백
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("decode failed"));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** 이미지를 최대 변 길이 maxEdge 이하로 줄여 JPEG로 재인코딩. 실패 시 원본 그대로. */
export async function prepareImage(
  file: File,
  maxEdge = 1600,
  quality = 0.85,
): Promise<PreparedImage> {
  const asIs = (): PreparedImage => ({
    blob: file,
    name: file.name,
    previewUrl: URL.createObjectURL(file),
  });

  // 벡터·움짤은 래스터화하지 않고 원본 사용
  if (file.type === "image/svg+xml" || file.type === "image/gif") return asIs();

  try {
    const src = await loadBitmap(file);
    const w0 = "width" in src ? src.width : 0;
    const h0 = "height" in src ? src.height : 0;
    if (!w0 || !h0) return asIs();

    const scale = Math.min(1, maxEdge / Math.max(w0, h0));
    const w = Math.round(w0 * scale);
    const h = Math.round(h0 * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return asIs();
    ctx.drawImage(src as CanvasImageSource, 0, 0, w, h);
    if ("close" in src) (src as ImageBitmap).close();

    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", quality),
    );
    if (!blob) return asIs();

    // 줄인 게 원본보다 오히려 크면 원본 유지
    if (blob.size >= file.size && file.size < 4_000_000) return asIs();

    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return { blob, name: `${base}.jpg`, previewUrl: URL.createObjectURL(blob) };
  } catch {
    return asIs();
  }
}

// GET /api/media/{id}/{name} — data/ 아래 저장된 이미지를 서빙한다.
// (data/는 public이 아니라 정적으로 노출되지 않으므로 이 라우트로 읽어 내보낸다.)

import { readImage } from "@/lib/storage";

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

function mimeFor(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot !== -1 ? name.slice(dot).toLowerCase() : "";
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; name: string }> },
) {
  const { id, name } = await params;
  const data = await readImage(id, name);
  if (!data) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": mimeFor(name),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

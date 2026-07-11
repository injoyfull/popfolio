// POST /api/portfolios/{id}/works — 비밀 편집키로 기존 포트폴리오에 작품을 이어붙인다.
// multipart/form-data: key + image(여러 개), caption, category

import { getPortfolio, appendItems } from "@/lib/storage";
import { buildWorkItems } from "@/lib/works-upload";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const key = String(form.get("key") ?? "");
  if (!key) {
    return Response.json({ error: "편집 링크가 필요해요." }, { status: 403 });
  }

  // 이미지를 저장하기 전에 먼저 권한 확인 (잘못된 키로 파일이 쌓이지 않게)
  const existing = await getPortfolio(id);
  if (!existing) {
    return Response.json({ error: "포트폴리오를 찾을 수 없어요." }, { status: 404 });
  }
  if (!existing.editKey || existing.editKey !== key) {
    return Response.json({ error: "편집 권한이 없어요." }, { status: 403 });
  }

  // 기존 파일명과 겹치지 않도록 고유 접두어
  const prefix = `a${Date.now().toString(36)}-`;
  const items = await buildWorkItems(id, form, prefix);
  if (items.length === 0) {
    return Response.json({ error: "추가할 이미지가 없어요." }, { status: 400 });
  }

  const result = await appendItems(id, key, items);
  if (result === null) {
    return Response.json({ error: "포트폴리오를 찾을 수 없어요." }, { status: 404 });
  }
  if (result === "forbidden") {
    return Response.json({ error: "편집 권한이 없어요." }, { status: 403 });
  }

  return Response.json({ id, total: result.items.length }, { status: 200 });
}

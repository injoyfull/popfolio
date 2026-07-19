// POST /api/portfolios — 만들기 폼 제출을 받아 포트폴리오를 저장한다. (Plan.md §4)
// multipart/form-data:
//   name, tagline, about, mood  +  image(여러 개), caption, category(이미지와 같은 순서)
// 응답: { id, editKey } — editKey는 나중에 작품을 이어 올리기 위한 비밀 키.

import { generateId } from "@/lib/id";
import { savePortfolio, storageMode } from "@/lib/storage";
import { buildWorkItems } from "@/lib/works-upload";
import { MOODS, DEFAULT_MOOD } from "@/lib/moods";
import { hasStyle, DEFAULT_STYLE } from "@/lib/styles";
import type { MoodId, Portfolio, StyleId } from "@/lib/types";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const childName = String(form.get("childName") ?? "").trim();
  const tagline = String(form.get("tagline") ?? "").trim();
  const about = String(form.get("about") ?? "").trim();

  if (!name) {
    return Response.json({ error: "전시공간 이름은 필요해요." }, { status: 400 });
  }

  const moodRaw = String(form.get("mood") ?? "");
  const mood: MoodId = moodRaw in MOODS ? (moodRaw as MoodId) : DEFAULT_MOOD;

  const styleRaw = String(form.get("style") ?? "");
  const style: StyleId = hasStyle(styleRaw) ? styleRaw : DEFAULT_STYLE;

  const id = generateId();
  const editKey = generateId(24);

  // 업로드·저장은 실패 원인이 다양하다(스토리지 미설정, 버킷 없음, 권한 등).
  // 던져진 에러를 그대로 500 빈 응답으로 흘리면 원인을 알 수 없으므로
  // 메시지를 담아 돌려준다. (mode는 진단용 — 비밀값은 포함하지 않는다)
  try {
    const items = await buildWorkItems(id, form);

    const portfolio: Portfolio = {
      id,
      createdAt: new Date().toISOString(),
      brand: { name, childName: childName || undefined, tagline, about },
      mood,
      style,
      items,
      editKey,
    };

    await savePortfolio(portfolio);

    return Response.json({ id, editKey }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/portfolios] 저장 실패:", message);
    return Response.json(
      { error: `저장하지 못했어요: ${message}`, mode: storageMode() },
      { status: 500 },
    );
  }
}

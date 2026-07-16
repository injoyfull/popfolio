// POST /api/portfolios — 만들기 폼 제출을 받아 포트폴리오를 저장한다. (Plan.md §4)
// multipart/form-data:
//   name, tagline, about, mood  +  image(여러 개), caption, category(이미지와 같은 순서)
// 응답: { id, editKey } — editKey는 나중에 작품을 이어 올리기 위한 비밀 키.

import { generateId } from "@/lib/id";
import { savePortfolio } from "@/lib/storage";
import { buildWorkItems } from "@/lib/works-upload";
import { MOODS, DEFAULT_MOOD } from "@/lib/moods";
import type { MoodId, Portfolio } from "@/lib/types";

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
    return Response.json({ error: "전시명은 필요해요." }, { status: 400 });
  }

  const moodRaw = String(form.get("mood") ?? "");
  const mood: MoodId = moodRaw in MOODS ? (moodRaw as MoodId) : DEFAULT_MOOD;

  const id = generateId();
  const editKey = generateId(24);
  const items = await buildWorkItems(id, form);

  const portfolio: Portfolio = {
    id,
    createdAt: new Date().toISOString(),
    brand: { name, childName: childName || undefined, tagline, about },
    mood,
    items,
    editKey,
  };

  await savePortfolio(portfolio);

  return Response.json({ id, editKey }, { status: 201 });
}

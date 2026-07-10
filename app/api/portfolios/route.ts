// POST /api/portfolios — 만들기 폼 제출을 받아 포트폴리오를 저장한다. (Plan.md §4)
// multipart/form-data:
//   name, tagline, about, mood  +  image(여러 개), caption(이미지와 같은 순서)

import { generateId } from "@/lib/id";
import { saveImage, savePortfolio } from "@/lib/storage";
import { MOODS, DEFAULT_MOOD } from "@/lib/moods";
import type { MoodId, Portfolio, WorkItem } from "@/lib/types";

const EXT_BY_TYPE: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

function extFor(file: File): string {
  if (EXT_BY_TYPE[file.type]) return EXT_BY_TYPE[file.type];
  const dot = file.name.lastIndexOf(".");
  if (dot !== -1) {
    const e = file.name.slice(dot).toLowerCase();
    if (/^\.[a-z0-9]{1,5}$/.test(e)) return e;
  }
  return ".bin";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const tagline = String(form.get("tagline") ?? "").trim();
  const about = String(form.get("about") ?? "").trim();

  if (!name) {
    return Response.json({ error: "브랜드 이름은 필요해요." }, { status: 400 });
  }

  const moodRaw = String(form.get("mood") ?? "");
  const mood: MoodId = moodRaw in MOODS ? (moodRaw as MoodId) : DEFAULT_MOOD;

  const images = form.getAll("image").filter((v): v is File => v instanceof File);
  const captions = form.getAll("caption").map((v) => String(v));

  const id = generateId();
  const items: WorkItem[] = [];

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    if (file.size === 0) continue;
    const filename = `${String(i + 1).padStart(2, "0")}${extFor(file)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await saveImage(id, filename, buffer);
    const caption = (captions[i] ?? "").trim();
    items.push({
      id: `im_${i + 1}`,
      image,
      caption: caption || undefined,
      order: i,
    });
  }

  const portfolio: Portfolio = {
    id,
    createdAt: new Date().toISOString(),
    brand: { name, tagline, about },
    mood,
    items,
  };

  await savePortfolio(portfolio);

  return Response.json({ id }, { status: 201 });
}

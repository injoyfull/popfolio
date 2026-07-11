// 폼(multipart)의 image/caption/category 묶음을 받아 이미지를 저장하고
// WorkItem 배열을 만든다. 생성(POST)·추가(append) 라우트가 공유한다.

import { saveImage } from "./storage";
import type { WorkItem } from "./types";

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

/**
 * 폼에서 작품 아이템들을 만든다.
 * @param prefix 파일명·아이디 접두어. 이어붙이기 시 기존 파일과 겹치지 않게 고유값을 준다.
 */
export async function buildWorkItems(
  id: string,
  form: FormData,
  prefix = "",
): Promise<WorkItem[]> {
  const images = form.getAll("image").filter((v): v is File => v instanceof File);
  const captions = form.getAll("caption").map((v) => String(v));
  const categories = form.getAll("category").map((v) => String(v));

  const items: WorkItem[] = [];
  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    if (file.size === 0) continue;
    const filename = `${prefix}${String(i + 1).padStart(2, "0")}${extFor(file)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = await saveImage(id, filename, buffer, file.type || undefined);
    items.push({
      id: `im_${prefix}${i + 1}`,
      image,
      caption: (captions[i] ?? "").trim() || undefined,
      category: (categories[i] ?? "").trim() || undefined,
      order: i,
    });
  }
  return items;
}

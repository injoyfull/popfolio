// 저장 계층 (Plan.md §3) — 로컬 파일시스템.
// 모든 런타임 데이터는 data/ 아래에 두고, 이 파일이 유일한 접근 지점.
// 나중에 DB로 바꿀 때 이 모듈만 교체하면 된다.
//
//   data/portfolios/{id}/portfolio.json
//   data/portfolios/{id}/images/{file}

import { promises as fs } from "fs";
import path from "path";
import type { Portfolio } from "./types";

const ROOT = path.join(process.cwd(), "data", "portfolios");

function dirFor(id: string): string {
  return path.join(ROOT, id);
}

/** 저장된 이미지 파일명이 안전한지(경로 조작 방지) 검사 */
export function isSafeName(name: string): boolean {
  return /^[A-Za-z0-9._-]+$/.test(name) && !name.includes("..");
}

/** 이미지 버퍼를 저장하고 공개 접근용 경로를 돌려준다. */
export async function saveImage(
  id: string,
  filename: string,
  data: Buffer,
): Promise<string> {
  const safe = isSafeName(filename) ? filename : "file";
  const imagesDir = path.join(dirFor(id), "images");
  await fs.mkdir(imagesDir, { recursive: true });
  await fs.writeFile(path.join(imagesDir, safe), data);
  return `/api/media/${id}/${safe}`;
}

/** 이미지 원본 바이트를 읽는다 (미디어 서빙 라우트에서 사용). */
export async function readImage(
  id: string,
  filename: string,
): Promise<Buffer | null> {
  if (!isSafeName(id) || !isSafeName(filename)) return null;
  try {
    return await fs.readFile(path.join(dirFor(id), "images", filename));
  } catch {
    return null;
  }
}

/** 포트폴리오 메타데이터(JSON)를 저장한다. */
export async function savePortfolio(portfolio: Portfolio): Promise<void> {
  const dir = dirFor(portfolio.id);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, "portfolio.json"),
    JSON.stringify(portfolio, null, 2),
    "utf8",
  );
}

/** id로 포트폴리오를 읽는다. 없으면 null. */
export async function getPortfolio(id: string): Promise<Portfolio | null> {
  if (!isSafeName(id)) return null;
  try {
    const raw = await fs.readFile(
      path.join(dirFor(id), "portfolio.json"),
      "utf8",
    );
    return JSON.parse(raw) as Portfolio;
  } catch {
    return null;
  }
}

// 저장 계층 (Plan.md §3) — 이중 모드.
// 이 모듈이 데이터 접근의 유일한 지점(swap point).
//
//   • 로컬(기본): 파일시스템 data/portfolios/{id}/...
//   • 배포(Supabase 환경변수 있으면): Postgres 테이블 + Storage 버킷
//
// 어느 모드든 아래 4개 함수 시그니처는 동일하므로, 호출부(API·페이지)는 바뀌지 않는다.

import { promises as fs } from "fs";
import path from "path";
import type { Portfolio } from "./types";
import {
  getSupabase,
  usingSupabase,
  WORKS_BUCKET,
  PORTFOLIOS_TABLE,
} from "./supabase";

const ROOT = path.join(process.cwd(), "data", "portfolios");

function dirFor(id: string): string {
  return path.join(ROOT, id);
}

/** id·파일명이 안전한지(경로 조작 방지) 검사 */
export function isSafeName(name: string): boolean {
  return /^[A-Za-z0-9._-]+$/.test(name) && !name.includes("..");
}

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

function mimeFromName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot !== -1 ? name.slice(dot).toLowerCase() : "";
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

/** 이미지를 저장하고, 렌더에 쓸 공개 접근 경로/URL을 돌려준다. */
export async function saveImage(
  id: string,
  filename: string,
  data: Buffer,
  contentType?: string,
): Promise<string> {
  const safe = isSafeName(filename) ? filename : "file";
  const sb = getSupabase();

  if (sb) {
    const objectPath = `${id}/${safe}`;
    const { error } = await sb.storage
      .from(WORKS_BUCKET)
      .upload(objectPath, data, {
        contentType: contentType || mimeFromName(safe),
        upsert: true,
      });
    if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);
    return sb.storage.from(WORKS_BUCKET).getPublicUrl(objectPath).data
      .publicUrl;
  }

  // 로컬 파일 모드
  const imagesDir = path.join(dirFor(id), "images");
  await fs.mkdir(imagesDir, { recursive: true });
  await fs.writeFile(path.join(imagesDir, safe), data);
  return `/api/media/${id}/${safe}`;
}

/** 이미지 원본 바이트를 읽는다 (로컬 파일 모드의 /api/media 라우트용). */
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

/** 포트폴리오 메타데이터를 저장한다. */
export async function savePortfolio(portfolio: Portfolio): Promise<void> {
  const sb = getSupabase();

  if (sb) {
    const { error } = await sb.from(PORTFOLIOS_TABLE).upsert({
      id: portfolio.id,
      created_at: portfolio.createdAt,
      data: portfolio,
    });
    if (error) throw new Error(`포트폴리오 저장 실패: ${error.message}`);
    return;
  }

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
  const sb = getSupabase();

  if (sb) {
    const { data, error } = await sb
      .from(PORTFOLIOS_TABLE)
      .select("data")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return (data.data as Portfolio) ?? null;
  }

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

/** 진단용: 현재 저장 모드 문자열. */
export function storageMode(): "supabase" | "filesystem" {
  return usingSupabase() ? "supabase" : "filesystem";
}

// Supabase 클라이언트 (서버 전용).
// 환경변수가 없으면 null을 반환 → storage.ts가 로컬 파일 모드로 동작한다.
// 그래서 로컬 개발은 Supabase 없이도 그대로 돌아간다.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const WORKS_BUCKET = "works";
export const PORTFOLIOS_TABLE = "portfolios";

let cached: SupabaseClient | null = null;

/** 설정돼 있으면 Supabase 클라이언트, 아니면 null. */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

/** Supabase 저장소를 쓰는 환경인지 여부. */
export function usingSupabase(): boolean {
  return getSupabase() !== null;
}

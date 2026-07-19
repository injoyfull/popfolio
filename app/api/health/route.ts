// GET /api/health — 배포 환경 진단용.
// 저장 모드와 필요한 환경변수의 '존재 여부'만 알려준다. 값은 절대 노출하지 않는다.
// (Vercel은 파일시스템이 읽기 전용이라, mode가 filesystem이면 저장이 실패한다)

import { storageMode } from "@/lib/storage";

export async function GET() {
  const mode = storageMode();
  return Response.json({
    mode,
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    // 배포 환경에서 filesystem이면 저장이 불가능하다는 힌트
    writable: mode === "supabase" || process.env.NODE_ENV !== "production",
  });
}

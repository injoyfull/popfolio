// GET /api/health — 배포 환경 진단용.
// 저장 모드 + 환경변수 '존재 여부' + Supabase 실제 연결 가능 여부를 확인한다.
// 비밀값(서비스 키)은 절대 노출하지 않는다. 호스트명은 진단에 필요해 표시한다.

import { storageMode } from "@/lib/storage";
import { getSupabase, WORKS_BUCKET, PORTFOLIOS_TABLE } from "@/lib/supabase";

export async function GET() {
  const mode = storageMode();
  const url = process.env.SUPABASE_URL;

  const result: Record<string, unknown> = {
    mode,
    hasSupabaseUrl: !!url,
    hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    host: url ? safeHost(url) : null,
  };

  const sb = getSupabase();
  if (sb) {
    // 스토리지 연결 확인 — 버킷 목록 조회
    try {
      const { data, error } = await sb.storage.listBuckets();
      result.storage = error
        ? { ok: false, error: error.message }
        : {
            ok: true,
            buckets: (data ?? []).map((b) => b.name),
            hasWorksBucket: (data ?? []).some((b) => b.name === WORKS_BUCKET),
          };
    } catch (err) {
      result.storage = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }

    // 테이블 연결 확인 — 존재 여부만
    try {
      const { error } = await sb
        .from(PORTFOLIOS_TABLE)
        .select("id", { head: true, count: "exact" })
        .limit(1);
      result.table = error ? { ok: false, error: error.message } : { ok: true };
    } catch (err) {
      result.table = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  return Response.json(result);
}

/** URL에서 호스트만 뽑는다(경로·자격증명 제거). */
function safeHost(raw: string): string {
  try {
    return new URL(raw).host;
  } catch {
    return "invalid-url";
  }
}

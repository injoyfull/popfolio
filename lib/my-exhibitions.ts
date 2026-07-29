// "내 전시" 목록 — 로그인 없이 편집 링크를 잃어버리지 않게 하는 안전장치.
//
// 로그인이 없으므로 편집 링크(editKey)를 놓치면 다시 작품을 올릴 방법이 없다.
// 그래서 전시를 만들거나 편집 링크로 열 때마다 이 기기(localStorage)에 기록해 둔다.
// → 나중에 같은 기기·브라우저로 오면 /mine 에서 내 전시들을 찾을 수 있다.
//
// 한계(사용자에게도 그대로 안내한다): 브라우저 저장소라서 기기가 바뀌거나
// 방문 기록을 지우면 사라진다. 그러니 편집 링크 자체를 따로 보관하는 게 가장 확실하다.

const KEY = "popfolio.my-exhibitions.v1";

export interface MyExhibition {
  id: string;
  /** 전시공간 이름 */
  name: string;
  /** 비밀 편집키 — 이 기기에만 보관 */
  editKey: string;
  /** 저장·갱신 시각 (ISO) */
  savedAt: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

/** 저장된 내 전시 목록 (최근 저장 순) */
export function listMine(): MyExhibition[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as MyExhibition[])
      .filter((e) => e && typeof e.id === "string" && typeof e.editKey === "string")
      .sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
  } catch {
    return [];
  }
}

/** 전시를 이 기기에 기록한다. 같은 id면 이름·시각만 갱신. */
export function rememberMine(entry: {
  id: string;
  name: string;
  editKey: string;
}): void {
  if (!isBrowser()) return;
  if (!entry.id || !entry.editKey) return;
  try {
    const list = listMine().filter((e) => e.id !== entry.id);
    list.unshift({
      id: entry.id,
      name: entry.name || "제목 없는 전시",
      editKey: entry.editKey,
      savedAt: new Date().toISOString(),
    });
    // 너무 쌓이지 않게 상한
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30)));
  } catch {
    // 저장 실패(용량·프라이빗 모드)해도 앱 동작에는 영향 없게 조용히 넘어간다
  }
}

/** 목록에서 제거 (기기에서만 지움 — 전시 자체는 그대로) */
export function forgetMine(id: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify(listMine().filter((e) => e.id !== id)),
    );
  } catch {}
}

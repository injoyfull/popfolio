// Popfolio 핵심 데이터 모델 (Plan.md §3)
// 로그인 없는 MVP — 서버 파일로 저장되는 포트폴리오 한 건의 형태.

export type MoodId = "modern" | "warm" | "minimal" | "vivid" | "collage";

export interface WorkItem {
  id: string;
  /** public 경로 또는 저장된 이미지 경로 */
  image: string;
  /** 이미지 대체 텍스트 (없으면 제목 사용) */
  alt?: string;
  /** 작품 제목 — 전시 라벨의 큰 줄 */
  title?: string;
  /** 짧은 소개 — 제목 아래 한두 줄 (사용자 입력 그대로) */
  description?: string;
  /** @deprecated 예전 단일 설명 필드. title이 없으면 제목으로 쓴다(구 데이터 호환). */
  caption?: string;
  /** 카테고리(작품 묶음) 이름. 없으면 기본 묶음으로 취급 */
  category?: string;
  order: number;
}

/** 카테고리 없는 작품을 담는 기본 묶음 라벨 */
export const DEFAULT_CATEGORY = "작품";

/** 구 데이터 호환: title이 없으면 caption을 제목으로 쓴다. */
export function workTitle(w: WorkItem): string | undefined {
  return w.title?.trim() || w.caption?.trim() || undefined;
}

export interface Portfolio {
  id: string;
  createdAt: string;
  brand: {
    /** 전시명 — 결과 페이지의 큰 타이틀 */
    name: string;
    /** 아이 이름(작가). 전시명과 별개, 없을 수 있음 */
    childName?: string;
    /** 한 줄 소개 · 컨셉 */
    tagline: string;
    /** 뭐 하는 사람인지 (짧은 소개) */
    about: string;
  };
  mood: MoodId;
  items: WorkItem[];
  /**
   * 비밀 편집키 — 로그인 없이 나중에 작품을 이어 올리기 위한 소유 증명.
   * 공개 렌더 시에는 절대 노출하지 않는다(서버에서 제거 후 전달).
   */
  editKey?: string;
}

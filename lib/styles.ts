// 스타일(레이아웃) 시스템 — "작품이 한 화면에 어떻게 담기는가".
// 색감(lib/moods.ts)과 독립된 축이라 스타일 × 색감 조합으로 폭이 넓어진다.
// 이름은 한/영 병기 — 글로벌(영어) 사용자도 고를 수 있게.
//
// 전부 '에디토리얼(잡지·도록)' 계열로 결을 맞춘다. 정갈한 쪽 → 손맛 나는 쪽 순서.

import type { StyleId } from "./types";

export interface StyleMeta {
  id: StyleId;
  /** 한글 이름 */
  ko: string;
  /** 영문 이름 */
  en: string;
  /** 한 줄 설명 (한글) */
  desc: string;
  /** 한 줄 설명 (영문) */
  descEn: string;
}

export const STYLES: Record<StyleId, StyleMeta> = {
  gallery: {
    id: "gallery",
    ko: "지면",
    en: "Editorial",
    desc: "잡지 지면처럼 작품과 라벨이 한 페이지에 정갈하게.",
    descEn: "Works and labels laid out like an editorial spread.",
  },
  index: {
    id: "index",
    ko: "목차",
    en: "Index",
    desc: "잡지 표지 목차처럼 번호와 괘선으로 작품을 색인해요.",
    descEn: "A magazine table of contents — numbered and ruled.",
  },
  spotlight: {
    id: "spotlight",
    ko: "스포트라이트",
    en: "Spotlight",
    desc: "대표작 하나가 무대에. 나머지는 '더 보기'로 펼쳐져요.",
    descEn: "One hero work on stage — the rest behind “see more.”",
  },
  handwritten: {
    id: "handwritten",
    ko: "손글씨",
    en: "Handwritten",
    desc: "소개와 작품 목록을 손으로 쓴 노트처럼. 손맛이 살아요.",
    descEn: "Intro and list written by hand — like a personal note.",
  },
  feed: {
    id: "feed",
    ko: "피드",
    en: "Feed",
    desc: "인스타그램처럼 정사각형으로 차곡차곡.",
    descEn: "Square tiles stacked like an Instagram feed.",
  },
  wall: {
    id: "wall",
    ko: "핀보드",
    en: "Pinboard",
    desc: "테이프로 붙여둔 폴라로이드 보드처럼.",
    descEn: "Polaroids taped up on a board.",
  },
  pile: {
    id: "pile",
    ko: "겹겹이",
    en: "Pile",
    desc: "자유롭게 쌓인 작품들 — 마우스를 올리면 그 작품만 떠올라요.",
    descEn: "A free-form pile — hover to lift one piece out.",
  },
};

// 정갈한 → 손맛 나는 순서로.
export const STYLE_LIST: StyleMeta[] = [
  STYLES.gallery,
  STYLES.index,
  STYLES.spotlight,
  STYLES.handwritten,
  STYLES.feed,
  STYLES.wall,
  STYLES.pile,
];

/** 아직 준비 중인 스타일 — 선택 UI에 비활성으로 노출해 방향을 보여준다.
 *  (레퍼런스: 월별 폴더 / 빨랫줄 / 색상칩 도록) */
export const COMING_STYLES: { ko: string; en: string }[] = [
  { ko: "폴더", en: "Folder" },
  { ko: "빨랫줄", en: "Clothesline" },
  { ko: "색상칩", en: "Specimen" },
];

export const DEFAULT_STYLE: StyleId = "gallery";

export function hasStyle(value: string): value is StyleId {
  return value in STYLES;
}

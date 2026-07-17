// 스타일(레이아웃) 시스템 — "작품이 한 화면에 어떻게 담기는가".
// 색감(lib/moods.ts)과 독립된 축이라 스타일 × 색감 조합으로 폭이 넓어진다.
// 이름은 한/영 병기 — 글로벌(영어) 사용자도 고를 수 있게.

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
    ko: "원페이지 갤러리",
    en: "One-Page Gallery",
    desc: "에디토리얼 지면처럼 작품과 라벨이 한 페이지에 정갈하게.",
    descEn: "Works and labels laid out like an editorial spread.",
  },
  spotlight: {
    id: "spotlight",
    ko: "스포트라이트",
    en: "Spotlight",
    desc: "이름과 대표작 하나가 무대에. 나머지는 '더 보기'로.",
    descEn: "One hero work on stage — the rest behind “see more.”",
  },
  handwritten: {
    id: "handwritten",
    ko: "손글씨 목록",
    en: "Handwritten",
    desc: "아이가 직접 쓴 작품 목록장 같은 손글씨 인벤토리.",
    descEn: "An inventory list that looks handwritten by the artist.",
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
    ko: "스티커 월",
    en: "Sticker Wall",
    desc: "테이프로 벽에 붙여둔 폴라로이드 느낌.",
    descEn: "Polaroids taped to a wall.",
  },
  pile: {
    id: "pile",
    ko: "겹겹이",
    en: "Pile",
    desc: "자유롭게 쌓인 작품들 — 마우스를 올리면 그 작품만 떠올라요.",
    descEn: "A free-form pile — hover to lift one piece out.",
  },
};

export const STYLE_LIST: StyleMeta[] = [
  STYLES.gallery,
  STYLES.spotlight,
  STYLES.handwritten,
  STYLES.feed,
  STYLES.wall,
  STYLES.pile,
];

/** 아직 준비 중인 스타일 — 선택 UI에 비활성으로 노출해 방향을 보여준다. */
export const COMING_STYLES: { ko: string; en: string }[] = [
  { ko: "스케치북", en: "Sketchbook" },
  { ko: "조각 퍼즐", en: "Mosaic" },
];

export const DEFAULT_STYLE: StyleId = "gallery";

export function hasStyle(value: string): value is StyleId {
  return value in STYLES;
}

// 무드(Mood) 시스템 — Plan.md §2(a)
// 무드 = 팔레트 + 폰트 페어링 + 액센트 스타일. "알아서 근사하게"의 뼈대.
// 각 무드는 CSS 커스텀 프로퍼티(--pf-*)로 변환되어 브랜드 페이지에 주입된다.

import type { MoodId } from "./types";

export interface MoodTokens {
  /** 페이지 배경 */
  bg: string;
  /** 카드/섹션 표면 */
  surface: string;
  /** 본문/제목 잉크 */
  ink: string;
  /** 보조 텍스트 */
  inkSoft: string;
  /** 강조 색 */
  accent: string;
  /** 강조 색 위 텍스트 */
  accentInk: string;
  /** 구분선 */
  line: string;
  /** 디스플레이(제목) 폰트 스택 */
  displayFont: string;
  /** 본문 폰트 스택 */
  bodyFont: string;
  /** 모서리 둥글기 */
  radius: string;
  /** hero 이름 글자 두께 */
  heroWeight: number;
  /** hero 이름 자간 (em) */
  heroTracking: string;
  /** 디스플레이 텍스트 대문자화 여부 */
  displayUppercase: boolean;
}

export interface Mood {
  id: MoodId;
  /** 사용자에게 보이는 한글 라벨 */
  label: string;
  /** 한 줄 설명 */
  description: string;
  tokens: MoodTokens;
}

// 폰트 스택 (layout.tsx에서 정의한 CSS 변수 참조)
const F = {
  noto: "var(--font-noto), system-ui, sans-serif",
  notoBold: "var(--font-noto), system-ui, sans-serif",
  myeongjo: "var(--font-myeongjo), var(--font-noto), serif",
  grotesk: "var(--font-grotesk), var(--font-noto), sans-serif",
  jua: "var(--font-jua), var(--font-noto), sans-serif",
};

export const MOODS: Record<MoodId, Mood> = {
  modern: {
    id: "modern",
    label: "모던",
    description: "어두운 배경에 산뜻한 형광 액센트. 시크한 스튜디오 톤.",
    tokens: {
      bg: "#0E0E12",
      surface: "#17171E",
      ink: "#F3F3F5",
      inkSoft: "#9A9AA6",
      accent: "#C8FA4B",
      accentInk: "#0E0E12",
      line: "rgba(255,255,255,0.12)",
      displayFont: F.grotesk,
      bodyFont: F.noto,
      radius: "6px",
      heroWeight: 700,
      heroTracking: "-0.03em",
      displayUppercase: true,
    },
  },
  warm: {
    id: "warm",
    label: "따뜻",
    description: "크림빛 배경과 테라코타. 포근한 부티크 감성.",
    tokens: {
      bg: "#F3EBDC",
      surface: "#FBF6EC",
      ink: "#3A2A1E",
      inkSoft: "#7C6653",
      accent: "#C2543A",
      accentInk: "#FBF6EC",
      line: "rgba(58,42,30,0.16)",
      displayFont: F.myeongjo,
      bodyFont: F.noto,
      radius: "3px",
      heroWeight: 800,
      heroTracking: "-0.01em",
      displayUppercase: false,
    },
  },
  minimal: {
    id: "minimal",
    label: "미니멀",
    description: "흰 여백과 얇은 타이포. 조용하지만 또렷한 무드.",
    tokens: {
      bg: "#FFFFFF",
      surface: "#FAFAFA",
      ink: "#141414",
      inkSoft: "#8C8C8C",
      accent: "#141414",
      accentInk: "#FFFFFF",
      line: "#EAEAEA",
      displayFont: F.noto,
      bodyFont: F.noto,
      radius: "0px",
      heroWeight: 500,
      heroTracking: "-0.02em",
      displayUppercase: false,
    },
  },
  pop: {
    id: "pop",
    label: "팝",
    description: "동글동글 청키 타이포 + 스피치버블 + 스파클. 밝고 통통 튀는 브랜드.",
    tokens: {
      bg: "#DCD6F7",
      surface: "#FFFFFF",
      ink: "#1C1B22",
      inkSoft: "#6C6980",
      accent: "#17B26A",
      accentInk: "#FFFFFF",
      line: "rgba(28,27,34,0.12)",
      displayFont: F.jua,
      bodyFont: F.noto,
      radius: "24px",
      heroWeight: 400,
      heroTracking: "0em",
      displayUppercase: false,
    },
  },
  collage: {
    id: "collage",
    label: "콜라주",
    description: "색종이 오려 붙인 듯한 팝업. 파스텔 컷아웃과 종이 질감.",
    tokens: {
      bg: "#F5F1E6",
      surface: "#FFFFFF",
      ink: "#2B2A28",
      inkSoft: "#7A7568",
      accent: "#EE7752",
      accentInk: "#FFFFFF",
      line: "rgba(43,42,40,0.14)",
      displayFont: F.noto,
      bodyFont: F.noto,
      radius: "14px",
      heroWeight: 900,
      heroTracking: "-0.01em",
      displayUppercase: false,
    },
  },
  vivid: {
    id: "vivid",
    label: "비비드",
    description: "선명한 색 블록과 큼직한 타이포. 트렌디한 팝업 무드.",
    tokens: {
      bg: "#FDE24A",
      surface: "#FFFFFF",
      ink: "#141009",
      inkSoft: "#5A4E2E",
      accent: "#FF4A24",
      accentInk: "#FFFFFF",
      line: "rgba(20,16,9,0.18)",
      displayFont: F.noto,
      bodyFont: F.noto,
      radius: "2px",
      heroWeight: 800,
      heroTracking: "-0.01em",
      displayUppercase: false,
    },
  },
};

export const MOOD_LIST: Mood[] = [
  MOODS.modern,
  MOODS.warm,
  MOODS.minimal,
  MOODS.vivid,
  MOODS.collage,
  MOODS.pop,
];

export const DEFAULT_MOOD: MoodId = "modern";

/** 무드 토큰 → CSS 커스텀 프로퍼티 객체 (wrapper style에 주입) */
export function moodToCssVars(id: MoodId): Record<string, string> {
  const t = (MOODS[id] ?? MOODS[DEFAULT_MOOD]).tokens;
  return {
    "--pf-bg": t.bg,
    "--pf-surface": t.surface,
    "--pf-ink": t.ink,
    "--pf-ink-soft": t.inkSoft,
    "--pf-accent": t.accent,
    "--pf-accent-ink": t.accentInk,
    "--pf-line": t.line,
    "--pf-display": t.displayFont,
    "--pf-body": t.bodyFont,
    "--pf-radius": t.radius,
    "--pf-hero-weight": String(t.heroWeight),
    "--pf-hero-tracking": t.heroTracking,
    "--pf-display-transform": t.displayUppercase ? "uppercase" : "none",
  };
}

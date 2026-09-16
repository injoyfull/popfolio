// 랜딩 문구 — 한국어( / )와 영어( /en )가 같은 모양을 따른다.
// 페이지 구조와 스타일은 components/landing/Landing.tsx 하나에만 있다.

export type LandingLang = "ko" | "en";

export type LandingCopy = {
  htmlLang: string;
  nav: { sample: string; mine: string; create: string; switchLabel: string; switchHref: string; switchLang: string };
  hero: {
    kicker: string;
    line1: string;
    line2Before: string;
    line2Mark: string;
    line2After: string;
    sub: string;
    create: string;
    sample: string;
    trust: string;
  };
  s01: { title: string; sub: string; before: string; after: string; pieceTitle: string; pieceMeta: string };
  s02: {
    title: string;
    sub: string;
    start: string;
    sample: string;
    rows: { who: string; title: string; body: string }[];
  };
  s03: { title: string; sub: string; steps: { title: string; body: string }[] };
  exhibition: { titleLine1: string; titleLine2: string; sub: string; cta: string; pieceTitle: string; pieceCaption: string };
  s04: { title: (styles: number, colors: number) => string; sub: string };
  styleName: (s: { ko: string; en: string }) => { main: string; aside: string };
  moodName: (id: string, label: string) => string;
  final: { title: string; sub: string; cta: string; trust: string };
  footer: string;
  /** 영어 화면에서, 아직 한국어인 화면으로 넘어간다는 안내(없으면 표시 안 함) */
  note?: string;
};

export const landingKo: LandingCopy = {
  htmlLang: "ko",
  nav: { sample: "샘플 전시", mine: "내 전시", create: "전시 열기", switchLabel: "EN", switchHref: "/en", switchLang: "en" },
  hero: {
    kicker: "온라인 팝업 전시",
    line1: "흩어져 있던 작품이,",
    line2Before: "하나의 ",
    line2Mark: "전시",
    line2After: "가 됩니다.",
    sub: "아이가 그린 그림도, 퇴근 후 빚은 도자기도, 오래 해온 붓질도 — 사진 몇 장과 몇 마디면 전시장처럼 걸어드려요.",
    create: "전시 열기",
    sample: "샘플 전시 보기",
    trust: "로그인 없이 · 무료 · 60초",
  },
  s01: {
    title: "보관하지 말고, 전시하세요.",
    sub: "같은 작품도 어떻게 걸어주느냐가 전부입니다. 사진첩 속에서는 스크롤로 지나가지만, 벽에 걸리면 한 점씩 눈에 들어옵니다.",
    before: "수백 장 속에 묻혀, 다시 열어보지 않게 됩니다.",
    after: "한 점 한 점, 제목과 이야기를 달고 걸립니다.",
    pieceTitle: "파란 거인",
    pieceMeta: "찰흙 · 2026",
  },
  s02: {
    title: "누구의 전시인가요?",
    sub: "작품의 주인이 누구든 상관없습니다. 나에게 맞는 곳에서 시작하세요.",
    start: "시작하기",
    sample: "샘플",
    rows: [
      { who: "아이 작품", title: "우리 아이 첫 개인전", body: "냉장고와 서랍에 쌓이는 그림들. 아이가 ‘작가’가 되는 순간을 가족에게 보여주세요." },
      { who: "내 취미 작업", title: "퇴근 후 만든 것들, 흩어지기 전에", body: "드로잉·도예·사진. 폴더 속에만 있던 작업을 한 페이지에 정갈하게 걸어둡니다." },
      { who: "오래 해온 것들", title: "평생 해온 것들을 한자리에", body: "수십 년의 붓질과 손끝. 가족에게 링크 하나로 남기는 나의 기록." },
    ],
  },
  s03: {
    title: "어떻게 열리나요?",
    sub: "디자인도, 글도 몰라도 됩니다. 사진만 있으면 나머지는 Popfolio가 차립니다.",
    steps: [
      { title: "올리기", body: "작품 사진과 이름을 넣습니다. 큰 폰 사진도 알아서 알맞게 줄여드려요." },
      { title: "세워지기", body: "스타일과 색감을 고르면 레이아웃·타이포·여백까지 전시장이 차려집니다." },
      { title: "초대하기", body: "링크 하나로 보고 싶은 사람을 초대합니다. 새 작품이 생기면 이어서 걸어요." },
    ],
  },
  exhibition: {
    titleLine1: "작품을 누르면,",
    titleLine2: "조명이 켜집니다.",
    sub: "어두운 전시장 한가운데로 작품이 떠오르고, 벽 라벨처럼 제목과 이야기가 붙습니다. ◀▶로 넘기며 한 바퀴 — 관람하는 경험 그대로.",
    cta: "샘플 전시 열어보기",
    pieceTitle: "라켓 너머",
    pieceCaption: "라켓 사이로 보면 세상이 무지개 격자무늬가 돼요.",
  },
  s04: {
    title: (styles, colors) => `스타일 ${styles}가지 × 색감 ${colors}가지.`,
    sub: "작품이 화면에 담기는 방식과 색을 따로 고릅니다. 조합을 바꾸면 전시 전체가 다시 걸립니다.",
  },
  styleName: (s) => ({ main: s.ko, aside: s.en }),
  moodName: (_id, label) => label,
  final: {
    title: "지금, 첫 전시를 열어보세요.",
    sub: "사진 몇 장이면 충분합니다. 서랍과 폴더에만 있던 작품을, 사람들이 찾아오는 전시로.",
    cta: "전시 열기",
    trust: "로그인 없이 · 무료 · 60초",
  },
  footer: "작품이 걸리는 순간, 전시가 시작됩니다.",
};

const MOOD_EN: Record<string, string> = {
  modern: "Modern",
  warm: "Warm",
  minimal: "Minimal",
  pop: "Pop",
  collage: "Collage",
  vivid: "Vivid",
  ocean: "Ocean",
  mint: "Mint",
  candy: "Candy",
};

export const landingEn: LandingCopy = {
  htmlLang: "en",
  nav: { sample: "Sample show", mine: "My shows", create: "Open a show", switchLabel: "한국어", switchHref: "/", switchLang: "ko" },
  hero: {
    kicker: "ONLINE POP-UP EXHIBITION",
    line1: "Scattered works",
    line2Before: "become one ",
    line2Mark: "exhibition",
    line2After: ".",
    sub: "A child’s drawings, pottery made after work, a lifetime of brushstrokes — with a few photos and a few words, we hang them like a real gallery show.",
    create: "Open a show",
    sample: "See a sample show",
    trust: "No login · Free · 60 seconds",
  },
  s01: {
    title: "Don’t just store it. Show it.",
    sub: "The same work changes completely depending on how it’s hung. In a camera roll it scrolls past; on a wall, you see each piece one at a time.",
    before: "Buried among hundreds of photos, never opened again.",
    after: "Piece by piece, hung with a title and a story.",
    pieceTitle: "The Blue Giant",
    pieceMeta: "Clay · 2026",
  },
  s02: {
    title: "Whose exhibition is it?",
    sub: "It doesn’t matter whose work it is. Start wherever fits you.",
    start: "Start",
    sample: "Sample",
    rows: [
      { who: "A CHILD’S ART", title: "Your child’s first solo show", body: "Drawings piling up on the fridge and in drawers. Show the family the moment your child becomes an artist." },
      { who: "MY HOBBY WORK", title: "What you made after work, before it scatters", body: "Drawing, ceramics, photography. Hang the work that lives only in folders, neatly, on one page." },
      { who: "A LIFETIME OF WORK", title: "Everything you’ve made, in one place", body: "Decades of brushstrokes and handwork. A record of your own, left for family in a single link." },
    ],
  },
  s03: {
    title: "How does it work?",
    sub: "No design or writing skills needed. Bring the photos — Popfolio sets up the rest.",
    steps: [
      { title: "Upload", body: "Add photos of the work and a name. Large phone photos are resized automatically." },
      { title: "It’s hung", body: "Choose a style and a color palette, and the layout, type and spacing are set up for you." },
      { title: "Invite", body: "Invite anyone with one link. When new pieces come along, keep hanging them." },
    ],
  },
  exhibition: {
    titleLine1: "Tap a work,",
    titleLine2: "and the lights come on.",
    sub: "The piece rises to the center of a dark gallery, with its title and story attached like a wall label. Step through with ◀▶ and take the full tour — just like visiting a show.",
    cta: "Open the sample show",
    pieceTitle: "Beyond the Racket",
    pieceCaption: "Look through the racket and the world turns into a rainbow grid.",
  },
  s04: {
    title: (styles, colors) => `${styles} styles × ${colors} color palettes.`,
    sub: "Choose how the works sit on the screen and which colors frame them, separately. Change the combination and the whole show is rehung.",
  },
  styleName: (s) => ({ main: s.en, aside: "" }),
  moodName: (id, label) => MOOD_EN[id] ?? label,
  final: {
    title: "Open your first exhibition now.",
    sub: "A few photos are enough. Turn the works that lived only in drawers and folders into a show people come to see.",
    cta: "Open a show",
    trust: "No login · Free · 60 seconds",
  },
  footer: "The moment a work is hung, the exhibition begins.",
  note: "The show builder is in Korean for now. The steps are simple: add photos, add a name, choose a style.",
};

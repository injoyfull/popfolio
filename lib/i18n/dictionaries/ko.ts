// 한국어 사전 (소스 shape). 다른 로케일은 이 shape(Dictionary)을 따른다.
const ko = {
  nav: {
    sample: "샘플 전시 보기",
    create: "전시 열기",
  },
  hero: {
    eyebrow: "우리 아이 팝업 전시",
    titleLines: ["우리 아이 첫 개인전,", "60초 만에 열려요."],
    highlight: "60초",
    sub: "사진첩에 묻어두지 마세요. 아이 작품 사진 몇 장과 이름만 넣으면 — 냉장고에 붙어있던 그림이 전시장에 걸린 작품처럼 근사하게 세워져요. 링크 하나로 온 가족을 초대하세요.",
    ctaPrimary: "우리 아이 전시 열기 →",
    ctaSecondary: "샘플 전시 구경하기",
    trust: "로그인 없이 · 무료로 시작 · 60초면 완성",
  },
  how: {
    kicker: "HOW IT WORKS",
    title: "어떻게 열리나요?",
    sub: "디자인도, 글도 몰라도 돼요. 사진만 있으면 나머지는 Popfolio가 차려요.",
    steps: [
      {
        emoji: "📷",
        title: "올리기",
        body: "아이 작품 사진과 이름만 넣어요. 큰 폰 사진도 알아서 알맞게 줄여드려요.",
      },
      {
        emoji: "🎨",
        title: "세워지기",
        body: "무드를 고르면 색·글씨·레이아웃까지 전시장이 알아서 차려져요.",
      },
      {
        emoji: "💌",
        title: "초대하기",
        body: "링크 하나로 온 가족을 전시에 초대해요. 새 작품이 생기면 이어서 걸어요.",
      },
    ],
  },
  beforeAfter: {
    kicker: "BEFORE / AFTER",
    title: "사진첩이 아니라, 전시장.",
    sub: "같은 그림도 어떻게 걸어주느냐가 전부예요. 보관하지 말고, 전시하세요.",
    beforeLabel: "그냥 사진첩",
    beforeCaption: "수백 장 속에 묻히고, 결국 스크롤로 지나가요.",
    afterLabel: "우리 아이 전시",
    afterCaption: "한 점 한 점, 이름표를 달고 걸려요.",
  },
  exhibition: {
    kicker: "THE EXHIBITION",
    titleLines: ["진짜 전시장처럼,", "스포트라이트가 켜져요."],
    sub: "썸네일을 누르면 어두운 전시장에 작품이 중앙으로 떠오르고, 벽 라벨처럼 제목이 붙어요. ◀▶로 넘기며 우리 아이 전시를 한 바퀴 — “내 아이가 작가가 된” 그 느낌.",
    cta: "샘플 전시 열어보기 →",
    labelCategory: "그림",
    labelCaption: "오늘의 낙서 — 매일 한 장씩",
  },
  moods: {
    kicker: "MOODS",
    title: "분위기 4가지, 골라서 다시.",
    sub: "한 번의 클릭으로 전시 전체가 다른 무드로 리스킨돼요. 우리 아이에게 맞는 톤으로.",
    items: {
      modern: { label: "모던", desc: "어두운 배경에 산뜻한 형광 액센트. 시크한 스튜디오 톤." },
      warm: { label: "따뜻", desc: "크림빛 배경과 테라코타. 포근한 부티크 감성." },
      minimal: { label: "미니멀", desc: "흰 여백과 얇은 타이포. 조용하지만 또렷한 무드." },
      vivid: { label: "비비드", desc: "선명한 색 블록과 큼직한 타이포. 트렌디한 팝업 무드." },
      collage: { label: "콜라주", desc: "색종이 오려 붙인 듯한 팝업. 파스텔 컷아웃과 종이 질감." },
      pop: { label: "팝", desc: "동글동글 청키 타이포 + 스피치버블 + 스파클. 통통 튀는 브랜드." },
      ocean: { label: "바다", desc: "페일 블루 위에 코발트 포인트. 차분하고 시원한 바다빛." },
      mint: { label: "민트", desc: "산뜻한 민트 배경과 진초록 포인트. 싱그러운 무드." },
      candy: { label: "캔디", desc: "몽글몽글 분홍과 진한 딸기 포인트. 달콤한 캔디 톤." },
    },
  },
  finalCta: {
    titleLines: ["우리 아이 첫 개인전,", "지금 열어주세요."],
    sub: "사진 몇 장이면 충분해요. 서랍 속에만 있던 그림을, 온 가족이 찾아오는 전시로.",
    cta: "우리 아이 전시 열기 →",
    trust: "로그인 없이 · 무료 · 60초",
  },
  footer: {
    tagline: "아이의 작품이, 걸리는 순간. — Made with Popfolio",
  },
  metadata: {
    title: "Popfolio — 우리 아이 첫 개인전",
    description:
      "아이 작품 사진 몇 장과 이름만 넣으면, 트렌디한 팝업 전시로. 링크 하나로 온 가족을 초대하세요.",
  },
};

export type Dictionary = typeof ko;
export default ko;

// 결과 페이지(M2)를 입력·저장 없이 먼저 눈으로 확인하기 위한 샘플 데이터.
// 실제 저장 계층(M3)이 붙으면 이 자리를 파일에서 읽은 Portfolio가 대체한다.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "Studio Yeeun",
    tagline: "색과 형태로 감정을 번역하는 그래픽 스튜디오",
    about:
      "안녕하세요, 그래픽 디자이너 이예은입니다. 포스터와 타이포그래피를 주로 다루고, 브랜드가 가진 온도를 색으로 옮기는 작업을 좋아해요. 작은 팝업부터 브랜드 아이덴티티까지, 조용히 눈에 남는 것들을 만듭니다.",
  },
  mood: "modern",
  items: [
    {
      id: "im_1",
      image: "/sample/work-1.svg",
      alt: "노을 그라디언트 포스터",
      caption: "Sunset Series 001 — 그라디언트 포스터 연작",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/work-2.svg",
      alt: "타입 스페시멘",
      caption: "Type Specimen — 자체 제작 서체의 무게별 실험",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/work-3.svg",
      alt: "바우하우스 기하 구성",
      caption: "Bauhaus Study No.3 — 도형과 색면 구성 습작",
      order: 2,
    },
    {
      id: "im_4",
      image: "/sample/work-4.svg",
      alt: "유체 그라디언트",
      caption: "Fluid 04 — 흐르는 형태의 키 비주얼",
      order: 3,
    },
    {
      id: "im_5",
      image: "/sample/work-5.svg",
      alt: "그리드 시스템",
      caption: "Grid System 05 — 편집 레이아웃 기초 연구",
      order: 4,
    },
  ],
};

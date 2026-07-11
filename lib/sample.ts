// 결과 페이지를 입력·저장 없이 눈으로 확인하기 위한 샘플 데이터.
// 다양한 작품 종류(드로잉·만들기·사진·콜라주)를 카테고리로 묶은 "작업 아카이브" 예시.
// ※ 여기 이미지들은 플레이스홀더 — 실제 작품이 준비되면 교체 예정.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "Studio Yeeun",
    tagline: "그리고, 만들고, 찍고, 붙이며 쌓아가는 작업들",
    about:
      "안녕하세요, 이예은입니다. 버려질 작업도 사진으로 남기면 경험이 됩니다. 드로잉부터 오브제·사진·콜라주까지, 요즘 손대는 것들을 이곳에 차곡차곡 모아둬요.",
  },
  mood: "modern",
  items: [
    // 드로잉
    {
      id: "im_1",
      image: "/sample/draw-doodle.svg",
      caption: "Doodle Diary — 낙서처럼 매일 한 장",
      category: "드로잉",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/draw-emoji.svg",
      caption: "Emoji Set — 이모티콘 표정 연습",
      category: "드로잉",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/draw-paint.svg",
      caption: "Untitled — 아크릴 색면 드로잉",
      category: "드로잉",
      order: 2,
    },
    // 만들기
    {
      id: "im_4",
      image: "/sample/make-objet.svg",
      caption: "Vessel No.1 — 손으로 빚은 오브제",
      category: "만들기",
      order: 3,
    },
    {
      id: "im_5",
      image: "/sample/make-stack.svg",
      caption: "Balance — 돌을 쌓아 만든 오브제",
      category: "만들기",
      order: 4,
    },
    // 사진
    {
      id: "im_6",
      image: "/sample/photo-scape.svg",
      caption: "저녁의 능선 — 35mm 필름",
      category: "사진",
      order: 5,
    },
    {
      id: "im_7",
      image: "/sample/photo-still.svg",
      caption: "오후의 정물 — 창가에서",
      category: "사진",
      order: 6,
    },
    // 콜라주
    {
      id: "im_8",
      image: "/sample/collage-paper.svg",
      caption: "Cut & Paste — 찢은 종이 콜라주",
      category: "콜라주",
      order: 7,
    },
    {
      id: "im_9",
      image: "/sample/collage-cut.svg",
      caption: "Mixed Cut — 잡지 오려 붙이기",
      category: "콜라주",
      order: 8,
    },
  ],
};

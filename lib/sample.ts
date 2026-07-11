// 결과 페이지를 입력·저장 없이 눈으로 확인하기 위한 샘플 데이터.
// 부모가 아이 작품을 올린 "우리 아이 팝업 전시" 예시 (PRD: 첫 사용자 = 아이 작품이 있는 부모).
// 다양한 작품 종류(그림·만들기·사진·오려붙이기)를 카테고리로 묶어 보여준다.
// ※ 여기 이미지들은 플레이스홀더 — 실제 아이 작품이 준비되면 교체 예정.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "도윤이의 작업실",
    tagline: "일곱 살, 매일 그리고 만드는 중",
    about:
      "일곱 살 도윤이가 그리고 만든 것들을 모았어요. 냉장고에 붙여두기 아까운 그림들을 여기 전시로 걸어둡니다. 새 작품이 생길 때마다 한 점씩 늘어나요.",
  },
  mood: "vivid",
  items: [
    // 그림
    {
      id: "im_1",
      image: "/sample/draw-doodle.svg",
      caption: "오늘의 낙서 — 매일 한 장씩",
      category: "그림",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/draw-emoji.svg",
      caption: "표정 연습 — 웃는 얼굴 모으기",
      category: "그림",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/draw-paint.svg",
      caption: "물감으로 색칠한 날",
      category: "그림",
      order: 2,
    },
    // 만들기
    {
      id: "im_4",
      image: "/sample/make-objet.svg",
      caption: "찰흙으로 빚은 그릇",
      category: "만들기",
      order: 3,
    },
    {
      id: "im_5",
      image: "/sample/make-stack.svg",
      caption: "돌 쌓기 — 안 무너지게!",
      category: "만들기",
      order: 4,
    },
    // 사진
    {
      id: "im_6",
      image: "/sample/photo-scape.svg",
      caption: "산책하다 찍은 노을",
      category: "사진",
      order: 5,
    },
    {
      id: "im_7",
      image: "/sample/photo-still.svg",
      caption: "창가에 둔 내 물건들",
      category: "사진",
      order: 6,
    },
    // 오려붙이기
    {
      id: "im_8",
      image: "/sample/collage-paper.svg",
      caption: "색종이 찢어 붙이기",
      category: "오려붙이기",
      order: 7,
    },
    {
      id: "im_9",
      image: "/sample/collage-cut.svg",
      caption: "잡지 오려 붙이기",
      category: "오려붙이기",
      order: 8,
    },
  ],
};

// 결과 페이지를 입력·저장 없이 눈으로 확인하기 위한 샘플 데이터.
// 부모가 아이 작품을 올린 "우리 아이 팝업 전시" 예시 (PRD: 첫 사용자 = 아이 작품이 있는 부모).
// 각 작품에 제목 + 짧은 소개를 달아, 목록이 아니라 '전시'로 읽히게 한다.
// ※ 여기 이미지들은 플레이스홀더 — 실제 아이 작품이 준비되면 교체 예정.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "워니의 작업실",
    childName: "워니",
    tagline: "일곱 살, 매일 그리고 만드는 중",
    about:
      "일곱 살 워니가 그리고 만든 것들을 모았어요. 서랍 속에만 두기 아까운 그림들을 여기 전시로 걸어둡니다. 새 작품이 생길 때마다 한 점씩 늘어나요.",
  },
  mood: "vivid",
  items: [
    // 그림
    {
      id: "im_1",
      image: "/sample/draw-doodle.svg",
      title: "오늘의 낙서",
      description: "생각나는 대로 매일 한 장씩. 웃는 얼굴이 자주 나와요.",
      category: "그림",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/draw-emoji.svg",
      title: "표정 연습",
      description: "기분마다 얼굴이 어떻게 달라지는지 그려봤어요.",
      category: "그림",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/draw-paint.svg",
      title: "물감으로 색칠한 날",
      description: "붓으로 크게 쓱쓱. 색이 섞이는 게 제일 재밌었대요.",
      category: "그림",
      order: 2,
    },
    // 만들기
    {
      id: "im_4",
      image: "/sample/make-objet.svg",
      title: "찰흙으로 빚은 그릇",
      description: "손으로 조물조물. 엄마 주려고 만든 첫 그릇이에요.",
      category: "만들기",
      order: 3,
    },
    {
      id: "im_5",
      image: "/sample/make-stack.svg",
      title: "돌 쌓기",
      description: "안 무너지게 쌓는 게 목표. 다섯 개까지 성공했어요.",
      category: "만들기",
      order: 4,
    },
    // 사진
    {
      id: "im_6",
      image: "/sample/photo-scape.svg",
      title: "산책하다 찍은 노을",
      description: "해가 산 뒤로 넘어가던 저녁, 직접 찍었어요.",
      category: "사진",
      order: 5,
    },
    {
      id: "im_7",
      image: "/sample/photo-still.svg",
      title: "창가에 둔 내 물건들",
      description: "좋아하는 것만 골라서 창가에 줄 세우고 찰칵.",
      category: "사진",
      order: 6,
    },
    // 오려붙이기
    {
      id: "im_8",
      image: "/sample/collage-paper.svg",
      title: "색종이 찢어 붙이기",
      description: "가위 없이 손으로만 찢어서. 삐뚤빼뚤한 게 좋대요.",
      category: "오려붙이기",
      order: 7,
    },
    {
      id: "im_9",
      image: "/sample/collage-cut.svg",
      title: "잡지 오려 붙이기",
      description: "마음에 드는 그림만 오려서 새로 이어 붙였어요.",
      category: "오려붙이기",
      order: 8,
    },
  ],
};

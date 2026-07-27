// 결과 페이지를 입력·저장 없이 눈으로 확인하기 위한 샘플 데이터.
// 일곱 살 '워니'의 실제 활동 사진(찰흙·핑거페인팅·로봇·쿠키·낚시놀이·배드민턴)
// + 파란 펜 두들(상상 작품, 직접 그린 SVG)로 구성 — 그리고·만들고·노는 아이의
// 다양한 층위가 한 전시에 쌓이는 모습을 보여준다.
// 사진은 1600px 리사이즈 + EXIF(위치정보) 제거본.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "워니의 작업실",
    childName: "워니",
    tagline: "일곱 살, 매일 그리고 만드는 중",
    about:
      "그리기도, 만들기도, 몸으로 노는 것도 다 작품이 되는 일곱 살이에요. 손에 물감을 묻히는 날을 제일 좋아해요. 새 작품이 생길 때마다 여기에 한 점씩 걸어둡니다.",
  },
  mood: "vivid",
  items: [
    // 만들기
    {
      id: "im_1",
      image: "/sample/woni-clay.jpg",
      title: "파란 거인",
      description: "팔이 자꾸 떨어져서 세 번을 다시 붙였어요. 초록 모자는 마지막 선물.",
      category: "만들기",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/woni-robot.jpg",
      title: "큐브봇",
      description: "설명서 없이 마음대로 조립한 로봇. 완성하고 벽에 하트도 그려줬어요.",
      category: "만들기",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/woni-cookie.jpg",
      title: "미니 피자 쿠키",
      description: "빨간 아이싱을 케첩처럼 빙 둘렀어요. 아까웠지만 결국 먹었습니다.",
      category: "만들기",
      order: 2,
    },
    // 그림
    {
      id: "im_4",
      image: "/sample/woni-paint.jpg",
      title: "초록 손",
      description: "붓 대신 손으로 그리는 날. 초록은 여름 나무 냄새가 나는 색이래요.",
      category: "그림",
      order: 3,
    },
    {
      id: "im_5",
      image: "/sample/woni-doodle-house.svg",
      title: "우리 집",
      description: "파란 펜 하나로 그린 우리 집. 굴뚝 연기가 꼬불꼬불 올라가요.",
      category: "그림",
      order: 4,
    },
    {
      id: "im_6",
      image: "/sample/woni-doodle-bike.svg",
      title: "씽씽 자전거",
      description: "바퀴를 크게 그려야 더 빨리 달릴 것 같아서 아주 크게 그렸대요.",
      category: "그림",
      order: 5,
    },
    {
      id: "im_7",
      image: "/sample/woni-doodle-rocket.svg",
      title: "출발, 로켓!",
      description: "연기가 빙글빙글 꼬이면서 올라가는 게 이 그림의 포인트예요.",
      category: "그림",
      order: 6,
    },
    // 놀이
    {
      id: "im_8",
      image: "/sample/woni-play.jpg",
      title: "선물 낚시",
      description: "긴 장대로 벽에 매달린 선물 잡기. 숨을 참고 겨눠서 성공!",
      category: "놀이",
      order: 7,
    },
    {
      id: "im_9",
      image: "/sample/woni-racket.jpg",
      title: "라켓 너머의 나",
      description: "라켓 사이로 보면 세상이 무지개 격자무늬가 돼요.",
      category: "놀이",
      order: 8,
    },
  ],
};

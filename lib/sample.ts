// 결과 페이지를 입력·저장 없이 눈으로 확인하기 위한 샘플 데이터.
// 일곱 살 '워니'의 실제 활동 사진(찰흙·로봇·쿠키·실공예·양털·낚시놀이·배드민턴)
// + 파란 펜 두들(상상 작품, 직접 그린 SVG)로 구성 — 그리고·만들고·노는 아이의
// 다양한 층위가 한 전시에 쌓이는 모습을 보여준다.
// 사진은 1600px 리사이즈 + EXIF(위치정보) 제거본.
// 얼굴이 나오던 사진(로봇·쿠키·낚시·라켓)은 손·작품 클로즈업으로 크롭했다.

import type { Portfolio } from "./types";

export const SAMPLE_PORTFOLIO: Portfolio = {
  id: "sample",
  createdAt: "2026-07-10T00:00:00.000Z",
  brand: {
    name: "워니의 작업실",
    childName: "워니",
    tagline: "일곱 살, 매일 그리고 만드는 중",
    about:
      "그리기도, 만들기도, 몸으로 노는 것도 다 작품이 되는 일곱 살이에요. 손으로 조물조물 만드는 날을 제일 좋아해요. 새 작품이 생길 때마다 여기에 한 점씩 걸어둡니다.",
  },
  mood: "vivid",
  items: [
    // 만들기
    {
      id: "im_1",
      image: "/sample/woni-clay.jpg",
      title: "파란 거인",
      date: "2026-06-14",
      description: "팔이 자꾸 떨어져서 세 번을 다시 붙였어요. 초록 모자는 마지막 선물.",
      category: "만들기",
      order: 0,
    },
    {
      id: "im_2",
      image: "/sample/woni-robot.jpg",
      title: "큐브봇",
      date: "2026-05-02",
      description: "설명서 없이 마음대로 조립한 로봇. 완성하고 벽에 하트도 그려줬어요.",
      category: "만들기",
      order: 1,
    },
    {
      id: "im_3",
      image: "/sample/woni-cookie.jpg",
      title: "미니 피자 쿠키",
      date: "2025-12-20",
      description: "빨간 아이싱을 케첩처럼 빙 둘렀어요. 아까웠지만 결국 먹었습니다.",
      category: "만들기",
      order: 2,
    },
    {
      id: "im_4",
      image: "/sample/woni-heart.jpg",
      title: "실 하트 두 점",
      date: "2025-05-08",
      description: "실을 한 줄씩 돌려 붙여 만든 하트. 분홍은 나, 파랑은 동생 거예요.",
      category: "만들기",
      order: 3,
    },
    {
      id: "im_10",
      image: "/sample/woni-felt.jpg",
      title: "분홍 토끼",
      date: "2025-03-16",
      description: "양털을 콕콕 찔러 뭉치면 단단해져요. 손바닥에 딱 맞는 크기.",
      category: "만들기",
      order: 4,
    },
    {
      id: "im_5",
      image: "/sample/woni-doodle-house.svg",
      title: "우리 집",
      date: "2024-09-05",
      description: "파란 펜 하나로 그린 우리 집. 굴뚝 연기가 꼬불꼬불 올라가요.",
      category: "그림",
      order: 5,
    },
    {
      id: "im_6",
      image: "/sample/woni-doodle-bike.svg",
      title: "씽씽 자전거",
      date: "2024-07-21",
      description: "바퀴를 크게 그려야 더 빨리 달릴 것 같아서 아주 크게 그렸대요.",
      category: "그림",
      order: 6,
    },
    {
      id: "im_7",
      image: "/sample/woni-doodle-rocket.svg",
      title: "출발, 로켓!",
      date: "2026-03-11",
      description: "연기가 빙글빙글 꼬이면서 올라가는 게 이 그림의 포인트예요.",
      category: "그림",
      order: 7,
    },
    // 놀이
    {
      id: "im_8",
      image: "/sample/woni-play.jpg",
      title: "선물 낚시",
      date: "2025-12-24",
      description: "벽에 색테이프로 꾸민 낚시터. 긴 장대로 선물을 하나씩 낚았어요.",
      category: "놀이",
      order: 8,
    },
    {
      id: "im_9",
      image: "/sample/woni-racket.jpg",
      title: "라켓 너머",
      date: "2026-04-27",
      description: "라켓 사이로 보면 세상이 무지개 격자무늬가 돼요.",
      category: "놀이",
      order: 9,
    },
  ],
};

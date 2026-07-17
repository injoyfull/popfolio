import type { Metadata } from "next";
import {
  Noto_Sans_KR,
  Nanum_Myeongjo,
  Space_Grotesk,
  Jua,
  Gaegu,
} from "next/font/google";
import "./globals.css";

// 본문 + 디스플레이 · 기본 산세리프 (한글·라틴 지원, 다국어 확장 대비)
// 800 웨이트로 제목을 굵되 '초굵음(Black Han Sans)'보다 가독성 있게.
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

// 따뜻 무드 세리프
const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

// 모던 무드 라틴 디스플레이
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

// 팝 무드 디스플레이 — 동글동글 청키(한글 라운드)
const jua = Jua({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// 손글씨 스타일 — 아이가 직접 쓴 듯한 한글 손글씨
const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://popfolio-two.vercel.app"),
  title: {
    default: "Popfolio — 우리 아이 첫 개인전",
    template: "%s · Popfolio",
  },
  description:
    "사진첩에 묻어두지 마세요. 아이 작품 사진 몇 장과 이름만 넣으면, 트렌디한 팝업 전시로 세워드려요. 링크 하나로 온 가족을 초대하세요.",
  openGraph: {
    title: "Popfolio — 우리 아이 첫 개인전",
    description:
      "아이 작품 사진 몇 장과 이름만 넣으면, 트렌디한 팝업 전시로. 링크 하나로 온 가족을 초대하세요.",
    siteName: "Popfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Popfolio — 우리 아이 첫 개인전",
    description:
      "아이 작품 사진 몇 장과 이름만 넣으면, 트렌디한 팝업 전시로. 링크 하나로 온 가족을 초대하세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${nanumMyeongjo.variable} ${spaceGrotesk.variable} ${jua.variable} ${gaegu.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Noto_Sans_KR,
  Nanum_Myeongjo,
  Black_Han_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

// 본문 · 기본 산세리프 (한글 포함)
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

// 따뜻 무드 세리프
const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

// 비비드 무드 디스플레이 (굵은 한글)
const blackHanSans = Black_Han_Sans({
  variable: "--font-blackhan",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// 모던 무드 라틴 디스플레이
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Popfolio",
  description: "작업 몇 개와 몇 마디면, 나만의 팝업 브랜드처럼 세워드려요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${nanumMyeongjo.variable} ${blackHanSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

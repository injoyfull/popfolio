import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";
import { landingKo } from "@/lib/i18n/landing";

// 한국어 랜딩 — 구조는 components/landing/Landing.tsx, 문구는 lib/i18n/landing.ts
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { ko: "/", en: "/en" },
  },
};

export default function Home() {
  return <Landing t={landingKo} />;
}

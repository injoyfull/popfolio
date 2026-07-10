import { notFound } from "next/navigation";
import BrandPage from "@/components/brand/BrandPage";
import { SAMPLE_PORTFOLIO } from "@/lib/sample";
import { MOODS } from "@/lib/moods";
import { getPortfolio } from "@/lib/storage";
import type { MoodId } from "@/lib/types";

// /p/{id} — 저장된 포트폴리오를 파일에서 읽어 렌더한다.
// 특수 id "sample"은 샘플 데이터. ?mood=... 로 무드 미리보기 가능(샘플/실데이터 모두).
export default async function PortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mood?: string }>;
}) {
  const { id } = await params;
  const { mood } = await searchParams;

  const base =
    id === "sample" ? SAMPLE_PORTFOLIO : await getPortfolio(id);

  if (!base) notFound();

  const portfolio =
    mood && mood in MOODS
      ? { ...base, mood: mood as MoodId }
      : base;

  return <BrandPage portfolio={portfolio} />;
}

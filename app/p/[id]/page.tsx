import BrandPage from "@/components/brand/BrandPage";
import { SAMPLE_PORTFOLIO } from "@/lib/sample";
import { MOODS } from "@/lib/moods";
import type { MoodId } from "@/lib/types";

// M2: 저장 계층(M3) 전까지는 샘플 포트폴리오를 렌더한다.
// ?mood=modern|warm|minimal|vivid 로 무드를 즉석 미리보기할 수 있다.
export default async function PortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mood?: string }>;
}) {
  await params; // id는 M3에서 파일 조회에 사용 예정
  const { mood } = await searchParams;

  const portfolio =
    mood && mood in MOODS
      ? { ...SAMPLE_PORTFOLIO, mood: mood as MoodId }
      : SAMPLE_PORTFOLIO;

  return <BrandPage portfolio={portfolio} />;
}

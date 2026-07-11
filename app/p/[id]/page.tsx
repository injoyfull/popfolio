import { notFound } from "next/navigation";
import BrandPage from "@/components/brand/BrandPage";
import OwnerBar from "@/components/brand/OwnerBar";
import { SAMPLE_PORTFOLIO } from "@/lib/sample";
import { MOODS } from "@/lib/moods";
import { getPortfolio } from "@/lib/storage";
import type { MoodId } from "@/lib/types";

// /p/{id} — 저장된 포트폴리오를 렌더한다.
// ?k=... 가 편집키와 일치하면 소유자 관리 UI(작품 추가·링크 복사)를 덧붙인다.
// ?mood=... 로 무드 미리보기 가능.
export default async function PortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mood?: string; k?: string; created?: string }>;
}) {
  const { id } = await params;
  const { mood, k, created } = await searchParams;

  const base = id === "sample" ? SAMPLE_PORTFOLIO : await getPortfolio(id);
  if (!base) notFound();

  const isOwner = !!(k && base.editKey && k === base.editKey);

  // 클라이언트로 넘어가는 데이터에는 편집키를 절대 포함하지 않는다.
  const publicPortfolio = { ...base, editKey: undefined };
  const portfolio =
    mood && mood in MOODS
      ? { ...publicPortfolio, mood: mood as MoodId }
      : publicPortfolio;

  return (
    <>
      <BrandPage portfolio={portfolio} />
      {isOwner && (
        <OwnerBar id={id} editKey={k!} justCreated={created === "1"} />
      )}
    </>
  );
}

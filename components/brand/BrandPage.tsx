import type { CSSProperties } from "react";
import type { Portfolio } from "@/lib/types";
import { moodToCssVars } from "@/lib/moods";
import ShareButton from "./ShareButton";
import Gallery from "./Gallery";
import CutoutText from "./CutoutText";
import PaperStickers, { PaperGrain } from "./PaperStickers";
import PopDecor from "./PopDecor";
import StyleSpotlight from "./styles/StyleSpotlight";
import StyleHandwritten from "./styles/StyleHandwritten";
import StyleFeed from "./styles/StyleFeed";
import StyleWall from "./styles/StyleWall";
import StylePile from "./styles/StylePile";

// 결과 페이지 — "내 작업 아카이브" (Plan.md §9).
// 압축된 헤더 + 카테고리 파노라마 갤러리(+전시 라이트박스).
// 무드 토큰을 .pf-root에 주입하면 하위 요소가 var(--pf-*)로 반응한다.
export default function BrandPage({ portfolio }: { portfolio: Portfolio }) {
  const { brand, items, createdAt } = portfolio;
  const year = new Date(createdAt).getFullYear();
  const works = [...items].sort((a, b) => a.order - b.order);
  const style = moodToCssVars(portfolio.mood) as CSSProperties;
  // 두 축: 스타일(레이아웃) × 색감(팔레트). 스타일이 작품 배치를 결정한다.
  const styleId = portfolio.style ?? "gallery";
  // 색감별 히어로 연출(콜라주·팝)은 기본 갤러리 스타일에서만 켠다 —
  // 다른 스타일에서는 색감이 팔레트로만 작동해 조합이 깨지지 않는다.
  const isCollage = styleId === "gallery" && portfolio.mood === "collage";
  const isPop = styleId === "gallery" && portfolio.mood === "pop";

  return (
    <main className="pf-root relative min-h-screen" style={style}>
      {isCollage && <PaperGrain />}
      {/* 상단 바 */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="pf-display text-sm font-bold tracking-wide">
          {brand.name}
        </span>
        <ShareButton className="bg-[var(--pf-accent)] text-[var(--pf-accent-ink)]" />
      </header>

      {/* HERO */}
      {isPop ? (
        <section className="relative overflow-hidden px-6 pb-12 pt-6 sm:px-10 sm:pb-16">
          <PopDecor />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em]"
              style={{ background: "var(--pf-accent)", color: "var(--pf-accent-ink)" }}
            >
              ARCHIVE · {year}
            </span>

            {/* 스피치버블 — 청키 타이틀 */}
            <div className="mt-5 rounded-[2.2rem] bg-[var(--pf-surface)] px-7 py-8 shadow-[0_18px_44px_rgba(28,27,34,0.12)] sm:px-10 sm:py-10">
              <h1 className="pf-display break-keep text-4xl leading-[1.08] text-[var(--pf-ink)] sm:text-6xl">
                {brand.name}
              </h1>
              {brand.tagline && (
                <p className="mt-4 break-keep text-lg leading-snug text-[var(--pf-ink-soft)] sm:text-2xl">
                  {brand.tagline}
                </p>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {brand.childName && (
                <span className="rounded-full bg-[var(--pf-surface)] px-4 py-1.5 text-sm font-bold text-[var(--pf-ink)] shadow-sm">
                  작가 · {brand.childName}
                </span>
              )}
            </div>

            {brand.about && (
              <p className="mt-5 max-w-[52ch] break-keep text-sm leading-relaxed text-[var(--pf-ink)] sm:text-base">
                {brand.about}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section
          className={`px-6 pt-8 sm:px-10 sm:pt-12 ${
            isCollage
              ? "relative overflow-hidden pb-32 sm:pb-8" // 모바일 하단에 스티커 띠 자리
              : "pb-8"
          }`}
        >
          {isCollage && <PaperStickers />}

          <div className="relative z-10 flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
            <span className="pf-display">ARCHIVE</span>
            <span className="h-px flex-1 bg-[var(--pf-line)]" />
            <span>{year}</span>
          </div>

          <h1 className="pf-display relative z-10 mt-6 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            {isCollage ? (
              <CutoutText text={brand.name} className="font-black" />
            ) : (
              brand.name
            )}
          </h1>

          {brand.childName && (
            <p className="relative z-10 mt-3 text-sm font-medium tracking-[0.15em] text-[var(--pf-ink-soft)]">
              작가 · {brand.childName}
            </p>
          )}

          {brand.tagline && (
            <p className="relative z-10 mt-4 max-w-[34ch] break-keep text-lg font-medium leading-snug text-[var(--pf-ink)] sm:text-2xl">
              {brand.tagline}
            </p>
          )}

          {brand.about && (
            <p className="relative z-10 mt-5 max-w-[52ch] break-keep text-sm leading-relaxed text-[var(--pf-ink-soft)] sm:text-base">
              {brand.about}
            </p>
          )}
        </section>
      )}

      <div className="border-t border-[var(--pf-line)]" />

      {/* 작품 영역 — 선택한 스타일(레이아웃)로 렌더 */}
      {styleId === "spotlight" ? (
        <StyleSpotlight works={works} />
      ) : styleId === "handwritten" ? (
        <StyleHandwritten works={works} />
      ) : styleId === "feed" ? (
        <StyleFeed works={works} />
      ) : styleId === "wall" ? (
        <StyleWall works={works} />
      ) : styleId === "pile" ? (
        <StylePile works={works} />
      ) : (
        <Gallery works={works} />
      )}

      {/* FOOTER */}
      <footer className="border-t border-[var(--pf-line)] px-6 py-14 sm:px-10 sm:py-20">
        <p className="pf-display text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
          아이의 작품이, 걸리는 순간
        </p>
        <p className="pf-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {brand.name}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--pf-line)] pt-6">
          <span className="text-sm text-[var(--pf-ink-soft)]">
            Made with{" "}
            <span className="pf-display font-bold text-[var(--pf-ink)]">
              Popfolio
            </span>
          </span>
          <ShareButton className="border border-[var(--pf-line)] text-[var(--pf-ink)]" />
        </div>
      </footer>
    </main>
  );
}

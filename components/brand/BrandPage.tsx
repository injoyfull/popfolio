import type { CSSProperties } from "react";
import type { Portfolio } from "@/lib/types";
import { moodToCssVars } from "@/lib/moods";
import ShareButton from "./ShareButton";
import Gallery from "./Gallery";

// 결과 페이지 — "내 작업 아카이브" (Plan.md §9).
// 압축된 헤더 + 카테고리 파노라마 갤러리(+전시 라이트박스).
// 무드 토큰을 .pf-root에 주입하면 하위 요소가 var(--pf-*)로 반응한다.
export default function BrandPage({ portfolio }: { portfolio: Portfolio }) {
  const { brand, items, createdAt } = portfolio;
  const year = new Date(createdAt).getFullYear();
  const works = [...items].sort((a, b) => a.order - b.order);
  const style = moodToCssVars(portfolio.mood) as CSSProperties;

  return (
    <main className="pf-root min-h-screen" style={style}>
      {/* 상단 바 */}
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="pf-display text-sm font-bold tracking-wide">
          {brand.name}
        </span>
        <ShareButton className="bg-[var(--pf-accent)] text-[var(--pf-accent-ink)]" />
      </header>

      {/* HERO (압축) */}
      <section className="px-6 pb-8 pt-8 sm:px-10 sm:pt-12">
        <div className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
          <span className="pf-display">ARCHIVE</span>
          <span className="h-px flex-1 bg-[var(--pf-line)]" />
          <span>{year}</span>
        </div>

        <h1 className="pf-display mt-6 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
          {brand.name}
        </h1>

        {brand.tagline && (
          <p className="mt-4 max-w-[34ch] text-lg font-medium leading-snug text-[var(--pf-ink)] sm:text-2xl">
            {brand.tagline}
          </p>
        )}

        {brand.about && (
          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-[var(--pf-ink-soft)] sm:text-base">
            {brand.about}
          </p>
        )}
      </section>

      <div className="border-t border-[var(--pf-line)]" />

      {/* 아카이브 갤러리 + 라이트박스 */}
      <Gallery works={works} />

      {/* FOOTER */}
      <footer className="border-t border-[var(--pf-line)] px-6 py-14 sm:px-10 sm:py-20">
        <p className="pf-display text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
          작품은 버려져도, 경험은 쌓입니다
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

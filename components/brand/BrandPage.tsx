import type { CSSProperties } from "react";
import type { Portfolio } from "@/lib/types";
import { moodToCssVars } from "@/lib/moods";
import ShareButton from "./ShareButton";

// 팝업 브랜드처럼 세워진 결과 페이지 (Plan.md §2 템플릿).
// 무드 토큰을 .pf-root에 주입하면, 아래 요소들이 var(--pf-*)로 반응한다.
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

      {/* HERO */}
      <section className="px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <div className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
          <span className="pf-display">PORTFOLIO</span>
          <span className="h-px flex-1 bg-[var(--pf-line)]" />
          <span>{year}</span>
        </div>

        <h1 className="pf-hero-name mt-8 max-w-[14ch]">{brand.name}</h1>

        <p className="pf-display mt-8 max-w-[24ch] text-2xl font-medium leading-tight sm:text-4xl">
          {brand.tagline}
        </p>

        <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-[var(--pf-ink-soft)] sm:text-lg">
          {brand.about}
        </p>
      </section>

      {/* 흐르는 브랜드 이름 마퀴 */}
      <div className="overflow-hidden border-y border-[var(--pf-line)] bg-[var(--pf-accent)] py-4 text-[var(--pf-accent-ink)]">
        <div className="pf-marquee">
          {[0, 1].map((g) => (
            <div key={g} className="flex shrink-0 items-center" aria-hidden={g === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="pf-display px-6 text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {brand.name} <span className="opacity-60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WORKS */}
      <section className="px-6 py-16 sm:px-10 sm:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="pf-display text-sm font-bold tracking-[0.3em]">
            SELECTED WORKS
          </h2>
          <span className="text-sm text-[var(--pf-ink-soft)]">
            {String(works.length).padStart(2, "0")} 작업
          </span>
        </div>

        <div className="flex flex-col gap-16 sm:gap-24">
          {works.map((w, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={w.id}
                className={`pf-work group grid items-center gap-6 sm:grid-cols-12 sm:gap-10 ${
                  flip ? "" : ""
                }`}
              >
                <div
                  className={`overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-line)] sm:col-span-8 ${
                    flip ? "sm:order-2 sm:col-start-5" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt={w.alt ?? w.caption ?? brand.name}
                    className="pf-work-img block h-full w-full object-cover"
                  />
                </div>
                <div
                  className={`sm:col-span-4 ${flip ? "sm:order-1 sm:row-start-1" : ""}`}
                >
                  <span className="pf-display text-5xl font-bold text-[var(--pf-accent)] sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {w.caption && (
                    <p className="mt-4 text-base leading-relaxed text-[var(--pf-ink)] sm:text-lg">
                      {w.caption}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--pf-line)] px-6 py-16 sm:px-10 sm:py-24">
        <p className="pf-display text-xs font-medium tracking-[0.3em] text-[var(--pf-ink-soft)]">
          THANKS FOR VISITING
        </p>
        <p className="pf-hero-name mt-6">{brand.name}</p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--pf-line)] pt-8">
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

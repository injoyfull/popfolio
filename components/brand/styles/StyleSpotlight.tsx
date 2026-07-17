"use client";

import { useMemo, useState } from "react";
import { workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

// 스포트라이트 / Spotlight — 대표작 하나가 무대 중앙에.
// 나머지는 "작품 더 보기"를 눌러야 그리드로 펼쳐진다. (이름 + 작품 하나 + 더 보기)
export default function StyleSpotlight({ works }: { works: WorkItem[] }) {
  const sorted = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  if (sorted.length === 0) return null;
  const hero = sorted[0];
  const rest = sorted.slice(1);

  return (
    <section className="px-6 py-14 text-center sm:px-10 sm:py-20">
      {/* 대표작 — 무대 중앙 스포트라이트 */}
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group mx-auto block max-w-md"
        aria-label={workTitle(hero) ?? "대표 작품 보기"}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.image}
          alt={hero.alt ?? workTitle(hero) ?? ""}
          className="mx-auto max-h-[52vh] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ filter: "drop-shadow(0 28px 40px rgba(0,0,0,0.28))" }}
        />
      </button>

      <div className="mx-auto mt-8 max-w-md">
        <p className="pf-display break-keep text-2xl font-bold sm:text-3xl">
          {workTitle(hero) ?? "무제"}
        </p>
        {hero.description && (
          <p className="mt-2 text-balance break-keep text-sm leading-relaxed text-[var(--pf-ink-soft)] sm:text-base">
            {hero.description}
          </p>
        )}
      </div>

      {/* 더 보기 */}
      {rest.length > 0 && (
        <div className="mt-12">
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-full border border-[var(--pf-line)] px-7 py-3 text-sm font-semibold transition hover:bg-[var(--pf-accent)] hover:text-[var(--pf-accent-ink)]"
            >
              작품 더 보기 · More works ({rest.length}) ↓
            </button>
          ) : (
            <ul className="mx-auto mt-4 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-10 text-left sm:grid-cols-3">
              {rest.map((w, i) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(i + 1)}
                    className="group block w-full text-left"
                    aria-label={workTitle(w) ?? "작품 보기"}
                  >
                    <span className="flex h-[150px] items-end justify-center sm:h-[190px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.image}
                        alt={w.alt ?? workTitle(w) ?? ""}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:-translate-y-1"
                        style={{ filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.16))" }}
                      />
                    </span>
                    <span className="mt-3 block break-keep text-center text-sm font-semibold">
                      {workTitle(w) ?? "무제"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <WorkLightbox works={sorted} index={open} onChange={setOpen} />
    </section>
  );
}

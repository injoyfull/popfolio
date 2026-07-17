"use client";

import { useMemo, useState } from "react";
import { workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

// 피드 / Feed — 인스타그램처럼 정사각 타일이 차곡차곡.
// 유일하게 크롭(cover)을 쓰는 스타일 — 그게 '피드'라는 형식의 정체성이다.
export default function StyleFeed({ works }: { works: WorkItem[] }) {
  const sorted = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );
  const [open, setOpen] = useState<number | null>(null);

  if (sorted.length === 0) return null;

  return (
    <section className="mx-auto max-w-3xl px-0 py-10 sm:px-6 sm:py-16">
      {/* 피드 상단 — 프로필 통계줄 느낌 */}
      <div className="mb-4 flex items-center justify-center gap-8 px-6 text-center sm:px-0">
        <Stat n={sorted.length} label="작품 · works" />
        <Stat
          n={new Set(sorted.map((w) => w.category?.trim() || "")).size}
          label="묶음 · series"
        />
      </div>

      <ul className="grid grid-cols-3 gap-[3px]">
        {sorted.map((w, i) => (
          <li key={w.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full"
              aria-label={workTitle(w) ?? "작품 보기"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.image}
                alt={w.alt ?? workTitle(w) ?? ""}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              {/* 호버 오버레이 — 제목 */}
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 p-2 opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100">
                <span className="break-keep text-center text-xs font-semibold text-white sm:text-sm">
                  {workTitle(w) ?? "무제"}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <WorkLightbox works={sorted} index={open} onChange={setOpen} />
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="pf-display text-2xl font-bold leading-none">{n}</p>
      <p className="mt-1 text-xs text-[var(--pf-ink-soft)]">{label}</p>
    </div>
  );
}

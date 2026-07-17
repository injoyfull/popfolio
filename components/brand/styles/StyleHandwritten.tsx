"use client";

import { useMemo, useState } from "react";
import { DEFAULT_CATEGORY, workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

const HAND = "var(--font-gaegu), var(--font-noto), sans-serif";
const ROT = [-2, 1.5, -1, 2, -1.5, 1];

// 손글씨 목록 / Handwritten — 아이가 직접 쓴 작품 목록장(인벤토리) 느낌.
// 손글씨 폰트 + 밑줄 + 살짝 비뚤어진 썸네일로 "종이에 적어 둔 목록"을 만든다.
export default function StyleHandwritten({ works }: { works: WorkItem[] }) {
  const sorted = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );
  const [open, setOpen] = useState<number | null>(null);

  if (sorted.length === 0) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      {/* 목록 머리 — 자로 그은 이중 밑줄 */}
      <div style={{ fontFamily: HAND }}>
        <h2 className="text-3xl font-bold tracking-[0.2em] sm:text-4xl">
          작품 목록
        </h2>
        <p className="mt-1 text-lg tracking-[0.35em] text-[var(--pf-ink-soft)]">
          INVENTORY · {sorted.length}
        </p>
        <div className="mt-3 border-b-2 border-[var(--pf-ink)]" />
        <div className="mt-[3px] border-b border-[var(--pf-ink)]" />
      </div>

      <ul>
        {sorted.map((w, i) => (
          <li key={w.id} className="border-b border-dashed border-[var(--pf-line)]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex w-full items-start gap-5 py-6 text-left"
              aria-label={workTitle(w) ?? "작품 보기"}
            >
              {/* 번호 */}
              <span
                className="pt-1 text-lg text-[var(--pf-ink-soft)]"
                style={{ fontFamily: HAND }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* 썸네일 — 풀로 붙인 듯 살짝 비뚤게 */}
              <span
                className="block w-20 shrink-0 overflow-hidden bg-[var(--pf-surface)] shadow-sm transition-transform duration-300 group-hover:rotate-0 sm:w-24"
                style={{ transform: `rotate(${ROT[i % ROT.length]}deg)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.alt ?? workTitle(w) ?? ""}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </span>

              {/* 손글씨 설명 */}
              <span className="min-w-0 flex-1" style={{ fontFamily: HAND }}>
                <span className="inline-block break-keep border-b-2 border-[var(--pf-ink)] pb-0.5 text-2xl leading-tight">
                  {workTitle(w) ?? "무제"}
                </span>
                {w.description && (
                  <span className="mt-1.5 block break-keep text-lg leading-snug text-[var(--pf-ink-soft)]">
                    {w.description}
                  </span>
                )}
                <span className="mt-1.5 block text-base tracking-wide text-[var(--pf-accent)]">
                  [ {w.category?.trim() || DEFAULT_CATEGORY} ]
                </span>
              </span>

              {/* 수량 칸 — 인벤토리 장부 디테일 */}
              <span
                className="hidden pt-1 text-xl text-[var(--pf-ink-soft)] underline sm:block"
                style={{ fontFamily: HAND }}
              >
                1
              </span>
            </button>
          </li>
        ))}
      </ul>

      <WorkLightbox works={sorted} index={open} onChange={setOpen} />
    </section>
  );
}

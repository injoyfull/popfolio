"use client";

import { useMemo, useState } from "react";
import { DEFAULT_CATEGORY, workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

const MONO = "var(--font-grotesk), var(--font-noto), sans-serif";

// 목차 / Index — 잡지 표지의 'Table of Contents' 처럼.
// 카테고리마다 큰 번호 + 괘선, 각 작품은 제목·점선 리더·색인 번호로 나열한다.
// 색인 번호(01..N)는 전체 통틀어 매겨 '페이지 번호'처럼 읽힌다. 클릭 → 라이트박스.
export default function StyleIndex({ works }: { works: WorkItem[] }) {
  const { groups, flat, indexById } = useMemo(() => {
    const sorted = [...works].sort((a, b) => a.order - b.order);
    const out: { name: string; items: WorkItem[] }[] = [];
    const idx = new Map<string, number>();
    for (const w of sorted) {
      const cat = w.category?.trim() || DEFAULT_CATEGORY;
      if (!idx.has(cat)) {
        idx.set(cat, out.length);
        out.push({ name: cat, items: [] });
      }
      out[idx.get(cat)!].items.push(w);
    }
    const flat = out.flatMap((g) => g.items);
    const indexById = new Map<string, number>();
    flat.forEach((w, i) => indexById.set(w.id, i));
    return { groups: out, flat, indexById };
  }, [works]);

  const [open, setOpen] = useState<number | null>(null);

  if (flat.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      {/* 머리글 */}
      <div className="flex items-end justify-between border-b-2 border-[var(--pf-ink)] pb-4">
        <h2
          className="pf-display text-3xl leading-none tracking-tight sm:text-5xl"
          style={{ fontWeight: 800 }}
        >
          목차
        </h2>
        <span
          className="text-xs tracking-[0.3em] text-[var(--pf-ink-soft)]"
          style={{ fontFamily: MONO }}
        >
          CONTENTS · {String(flat.length).padStart(2, "0")}
        </span>
      </div>

      {/* 카테고리 색인 */}
      <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {groups.map((g, gi) => (
          <div key={g.name}>
            {/* 큰 번호 + 카테고리 */}
            <div className="flex items-baseline gap-4 border-b border-[var(--pf-line)] pb-3">
              <span
                className="text-4xl leading-none text-[var(--pf-accent)] sm:text-5xl"
                style={{ fontFamily: MONO, fontWeight: 700 }}
              >
                {gi + 1}
              </span>
              <span
                className="pf-display break-keep text-xl leading-none sm:text-2xl"
                style={{ fontWeight: 700 }}
              >
                {g.name}
              </span>
              <span
                className="ml-auto text-xs tracking-widest text-[var(--pf-ink-soft)]"
                style={{ fontFamily: MONO }}
              >
                {String(g.items.length).padStart(2, "0")}
              </span>
            </div>

            {/* 작품 색인 항목 — 제목 · 점선 리더 · 번호 */}
            <ul className="mt-1">
              {g.items.map((w) => {
                const idx = indexById.get(w.id) ?? 0;
                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setOpen(idx)}
                      className="group flex w-full items-baseline gap-3 py-3 text-left"
                      aria-label={workTitle(w) ?? "작품 보기"}
                    >
                      <span className="break-keep text-[0.98rem] leading-snug transition group-hover:text-[var(--pf-accent)]">
                        {workTitle(w) ?? "무제"}
                      </span>
                      <span className="mt-[-4px] flex-1 border-b border-dotted border-[var(--pf-line)]" />
                      <span
                        className="shrink-0 text-xs tabular-nums tracking-widest text-[var(--pf-ink-soft)]"
                        style={{ fontFamily: MONO }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <WorkLightbox works={flat} index={open} onChange={setOpen} />
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  formatWorkDate,
  workTitle,
  workYear,
  type WorkItem,
} from "@/lib/types";
import WorkLightbox from "../Lightbox";

const MONO = "var(--font-grotesk), var(--font-noto), sans-serif";

// 연대기 / Timeline — "계속 쌓여가는 포트폴리오"의 중심 뷰.
// 최신 해가 위로, 해마다 세로선을 따라 작품이 쌓인다. 몇 년이 지나 다시 열었을 때
// "이때 이런 걸 그렸구나"를 시간 순으로 되짚게 하는 것이 목적.
// 날짜가 없는 작품은 맨 아래 '날짜 미상'으로 모은다(구 데이터·직접 올린 스캔 등).
export default function StyleTimeline({ works }: { works: WorkItem[] }) {
  const { groups, flat, indexById } = useMemo(() => {
    const sorted = [...works].sort((a, b) => {
      const da = a.date ?? "";
      const db = b.date ?? "";
      if (da && db && da !== db) return db.localeCompare(da); // 최신 먼저
      if (da && !db) return -1;
      if (!da && db) return 1;
      return a.order - b.order;
    });

    const map = new Map<string, WorkItem[]>();
    for (const w of sorted) {
      const y = workYear(w);
      const key = y ? String(y) : "unknown";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(w);
    }
    // 연도 내림차순, '날짜 미상'은 마지막
    const keys = [...map.keys()].sort((a, b) => {
      if (a === "unknown") return 1;
      if (b === "unknown") return -1;
      return Number(b) - Number(a);
    });

    const groups = keys.map((k) => ({ year: k, items: map.get(k)! }));
    const flat = groups.flatMap((g) => g.items);
    const indexById = new Map<string, number>();
    flat.forEach((w, i) => indexById.set(w.id, i));
    return { groups, flat, indexById };
  }, [works]);

  const [open, setOpen] = useState<number | null>(null);

  if (flat.length === 0) return null;

  const years = groups.filter((g) => g.year !== "unknown").map((g) => Number(g.year));
  const span = years.length ? Math.max(...years) - Math.min(...years) + 1 : 0;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      {/* 머리글 — 얼마나 쌓였는지 */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[var(--pf-ink)] pb-4">
        <h2
          className="pf-display text-3xl leading-none tracking-tight sm:text-5xl"
          style={{ fontWeight: 800 }}
        >
          연대기
        </h2>
        <span
          className="text-xs tracking-[0.25em] text-[var(--pf-ink-soft)]"
          style={{ fontFamily: MONO }}
        >
          {flat.length} WORKS
          {span > 1 ? ` · ${span} YEARS` : ""}
        </span>
      </div>

      <div className="mt-12">
        {groups.map((g) => (
          <section key={g.year} className="relative pb-14 pl-16 sm:pl-24">
            {/* 세로선 — 시간의 축 */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[4.1rem] top-3 w-px bg-[var(--pf-line)] sm:left-[6.1rem]"
            />

            {/* 연도 */}
            <div className="absolute left-0 top-0 w-14 text-right sm:w-24">
              <span
                className="pf-display text-2xl leading-none sm:text-3xl"
                style={{ fontWeight: 800 }}
              >
                {g.year === "unknown" ? "—" : g.year}
              </span>
              <span
                className="mt-1.5 block text-[0.68rem] tracking-widest text-[var(--pf-ink-soft)]"
                style={{ fontFamily: MONO }}
              >
                {g.year === "unknown" ? "날짜 미상" : `${g.items.length}점`}
              </span>
            </div>

            {/* 그 해의 작품들 */}
            <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
              {g.items.map((w) => {
                const idx = indexById.get(w.id) ?? 0;
                const when = formatWorkDate(w.date);
                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setOpen(idx)}
                      className="group block w-full text-left"
                      aria-label={workTitle(w) ?? "작품 보기"}
                    >
                      <span className="flex h-[140px] items-end justify-center sm:h-[170px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={w.image}
                          alt={w.alt ?? workTitle(w) ?? ""}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:-translate-y-1"
                          style={{
                            filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.16))",
                          }}
                        />
                      </span>
                      <span className="mt-3 block border-t border-[var(--pf-line)] pt-2.5">
                        {when && (
                          <span
                            className="block text-[0.68rem] tracking-wider text-[var(--pf-accent)]"
                            style={{ fontFamily: MONO }}
                          >
                            {when}
                          </span>
                        )}
                        <span className="mt-0.5 block break-keep text-sm font-bold leading-snug">
                          {workTitle(w) ?? "무제"}
                        </span>
                        {w.description && (
                          <span className="mt-1 block break-keep text-xs leading-relaxed text-[var(--pf-ink-soft)]">
                            {w.description}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <WorkLightbox works={flat} index={open} onChange={setOpen} />
    </section>
  );
}

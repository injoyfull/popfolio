"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_CATEGORY, workTitle, type WorkItem } from "@/lib/types";

// 에디토리얼 전시 갤러리.
// 잡지 지면처럼 — 작품을 크롭하지 않고 '누끼'로 띄우고(그림자), 아래에 제목 + 짧은 소개.
// 그리드 사이사이에 카테고리 큐레이션 블록을 끼워 리듬을 만든다. (목록이 아니라 전시로 읽히게)
// 작품을 누르면 어두운 전시장 라이트박스에서 상세를 본다.

type Cell =
  | { kind: "note"; key: string; category: string; count: number; index: number }
  | { kind: "work"; key: string; work: WorkItem };

export default function Gallery({ works }: { works: WorkItem[] }) {
  // 카테고리별 그룹핑 (등장 순서 유지)
  const groups = useMemo(() => {
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
    return out;
  }, [works]);

  // 라이트박스용 평탄화 목록 + id→index
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const indexById = useMemo(() => {
    const m = new Map<string, number>();
    flat.forEach((w, i) => m.set(w.id, i));
    return m;
  }, [flat]);

  // 큐레이션 블록 + 작품을 한 흐름으로 배치
  const cells = useMemo<Cell[]>(() => {
    const out: Cell[] = [];
    groups.forEach((g, gi) => {
      out.push({
        kind: "note",
        key: `note-${g.name}`,
        category: g.name,
        count: g.items.length,
        index: gi + 1,
      });
      for (const w of g.items) out.push({ kind: "work", key: w.id, work: w });
    });
    return out;
  }, [groups]);

  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : flat[open];

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i + flat.length - 1) % flat.length)),
    [flat.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % flat.length)),
    [flat.length],
  );

  // 키보드: ←/→ 넘기기, Esc 닫기
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  if (works.length === 0) return null;

  return (
    <section className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mb-12 flex items-end justify-between border-b border-[var(--pf-line)] pb-4">
        <h2 className="pf-display text-sm font-bold tracking-[0.3em]">
          EXHIBITION
        </h2>
        <span className="text-sm text-[var(--pf-ink-soft)]">
          {flat.length}점 · {groups.length}개 묶음
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {cells.map((c) =>
          c.kind === "note" ? (
            <li
              key={c.key}
              className="col-span-2 flex flex-col justify-center md:col-span-1"
            >
              <div className="border-y border-[var(--pf-line)] py-5">
                <span className="text-xs font-medium tracking-[0.25em] text-[var(--pf-ink-soft)]">
                  {String(c.index).padStart(2, "0")}
                </span>
                <h3 className="pf-display mt-2 break-keep text-2xl font-bold leading-tight sm:text-3xl">
                  {c.category}
                </h3>
                <p className="mt-2 text-sm text-[var(--pf-ink-soft)]">
                  작품 {c.count}점
                </p>
              </div>
            </li>
          ) : (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => setOpen(indexById.get(c.work.id) ?? 0)}
                className="group block w-full text-left"
                aria-label={workTitle(c.work) ?? "작품 보기"}
              >
                {/* 작품 — 크롭 없이 누끼로 띄운다 */}
                <span className="flex h-[190px] items-end justify-center sm:h-[250px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.work.image}
                    alt={c.work.alt ?? workTitle(c.work) ?? ""}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                    style={{
                      filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.18))",
                    }}
                  />
                </span>

                {/* 벽 라벨 — 제목 + 짧은 소개 */}
                <span className="mt-5 block border-t border-[var(--pf-line)] pt-3">
                  <span className="block break-keep text-sm font-bold leading-snug">
                    {workTitle(c.work) ?? "무제"}
                  </span>
                  {c.work.description && (
                    <span className="mt-1 block break-keep text-xs leading-relaxed text-[var(--pf-ink-soft)]">
                      {c.work.description}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ),
        )}
      </ul>

      {/* 라이트박스 (전시 상세) */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* 상단 바 */}
          <div className="flex items-center justify-between px-5 py-4 text-neutral-400">
            <span className="text-sm tabular-nums">
              {open! + 1} / {flat.length}
            </span>
            <button
              type="button"
              onClick={close}
              className="text-2xl leading-none text-neutral-300 hover:text-white"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          {/* 작품 (스포트라이트) */}
          <div
            className="flex flex-1 items-center justify-center gap-2 px-3 sm:gap-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <NavBtn dir="prev" onClick={prev} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.alt ?? workTitle(current) ?? ""}
              className="max-h-[64vh] max-w-full rounded object-contain shadow-2xl"
            />
            <NavBtn dir="next" onClick={next} />
          </div>

          {/* 벽 라벨 — 카테고리 · 제목 · 소개 */}
          <div
            className="px-6 pb-10 pt-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-medium tracking-[0.25em] text-neutral-500">
              {(current.category?.trim() || DEFAULT_CATEGORY).toUpperCase()}
            </p>
            <p className="mx-auto mt-2 max-w-[46ch] break-keep text-lg font-semibold text-neutral-100 sm:text-xl">
              {workTitle(current) ?? "무제"}
            </p>
            {current.description && (
              <p className="mx-auto mt-2 max-w-[52ch] text-balance break-keep text-sm leading-relaxed text-neutral-400">
                {current.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "이전" : "다음"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-xl text-neutral-200 transition hover:bg-white/10"
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}

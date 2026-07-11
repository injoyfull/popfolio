"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_CATEGORY, type WorkItem } from "@/lib/types";

// 카테고리로 묶인 압축 파노라마 갤러리 + 전시 라이트박스.
// 썸네일을 사진첩처럼 쫙 깔고, 클릭하면 어두운 배경에 작품이 스포트라이트로 뜬다.
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
      <div className="mb-10 flex items-end justify-between">
        <h2 className="pf-display text-sm font-bold tracking-[0.3em]">
          ARCHIVE
        </h2>
        <span className="text-sm text-[var(--pf-ink-soft)]">
          {flat.length}점 · {groups.length}개 묶음
        </span>
      </div>

      <div className="space-y-12">
        {groups.map((g) => (
          <div key={g.name}>
            <div className="mb-4 flex items-baseline gap-3">
              <h3 className="pf-display text-lg font-bold">{g.name}</h3>
              <span className="text-xs text-[var(--pf-ink-soft)]">
                {String(g.items.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-[var(--pf-line)]" />
            </div>

            {/* 파노라마: 압축 썸네일 사진첩 */}
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6">
              {g.items.map((w) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(indexById.get(w.id) ?? 0)}
                    className="pf-thumb group block w-full overflow-hidden rounded-[var(--pf-radius)] border border-[var(--pf-line)]"
                    aria-label={w.caption ?? "작품 보기"}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.image}
                      alt={w.alt ?? w.caption ?? ""}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 라이트박스 (전시) */}
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
              alt={current.alt ?? current.caption ?? ""}
              className="max-h-[70vh] max-w-full rounded object-contain shadow-2xl"
            />
            <NavBtn dir="next" onClick={next} />
          </div>

          {/* 벽 라벨 */}
          <div
            className="px-6 pb-10 pt-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-medium tracking-[0.25em] text-neutral-500">
              {(current.category?.trim() || DEFAULT_CATEGORY).toUpperCase()}
            </p>
            {current.caption && (
              <p className="mx-auto mt-2 max-w-[46ch] text-base text-neutral-100 sm:text-lg">
                {current.caption}
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

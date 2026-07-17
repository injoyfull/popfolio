"use client";

import { useMemo, useState } from "react";
import { workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

// 겹겹이 / Pile — 책상 위에 자유롭게 쌓인 작품 더미.
// 마우스를 올리면 그 작품만 앞으로 떠오르고 나머지는 흐려진다(.pf-pile CSS — AI 불필요).
// 배치는 인덱스 기반 결정론적이라 SSR과 어긋나지 않는다.
const ROT = [-8, 5, -3, 9, -6, 4, 7, -5, 3, -9];

function posFor(i: number, total: number) {
  // 골든앵글 비슷한 산포 — 겹치되 뭉치지 않게
  const left = 4 + ((i * 37) % 58); // 4% ~ 62%
  const top = 3 + ((i * 29 + (i % 3) * 11) % 52); // 3% ~ 55%
  const width = 30 + ((i * 13) % 12); // 30% ~ 42%
  const z = (i % total) + 1;
  return { left: `${left}%`, top: `${top}%`, width: `${width}%`, zIndex: z };
}

export default function StylePile({ works }: { works: WorkItem[] }) {
  const sorted = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );
  const [open, setOpen] = useState<number | null>(null);

  if (sorted.length === 0) return null;

  return (
    <section className="px-4 py-10 sm:px-10 sm:py-16">
      <p className="mb-3 text-center text-xs tracking-[0.25em] text-[var(--pf-ink-soft)]">
        작품에 마우스를 올려보세요 · HOVER TO PICK ONE
      </p>

      <div className="pf-pile relative mx-auto h-[58vh] min-h-[420px] max-w-4xl sm:h-[66vh]">
        {sorted.map((w, i) => {
          const p = posFor(i, sorted.length);
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => setOpen(i)}
              className="pf-pile-item group absolute"
              style={{
                left: p.left,
                top: p.top,
                width: p.width,
                zIndex: p.zIndex,
                transform: `rotate(${ROT[i % ROT.length]}deg)`,
              }}
              aria-label={workTitle(w) ?? "작품 보기"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.image}
                alt={w.alt ?? workTitle(w) ?? ""}
                loading="lazy"
                className="w-full bg-[var(--pf-surface)] object-contain shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:scale-[1.06]"
              />
              {/* 호버 시 제목 태그 */}
              <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--pf-ink)] px-3 py-1 text-xs font-semibold text-[var(--pf-bg)] opacity-0 shadow transition group-hover:opacity-100">
                {workTitle(w) ?? "무제"}
              </span>
            </button>
          );
        })}
      </div>

      <WorkLightbox works={sorted} index={open} onChange={setOpen} />
    </section>
  );
}

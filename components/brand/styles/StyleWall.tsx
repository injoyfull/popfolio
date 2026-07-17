"use client";

import { useMemo, useState } from "react";
import { workTitle, type WorkItem } from "@/lib/types";
import WorkLightbox from "../Lightbox";

const ROT = [-3, 2, -1.5, 3, -2, 1.5, 2.5, -2.5];
const LIFT = ["mt-0", "mt-6", "mt-2", "mt-8", "mt-4", "mt-1"];

// 스티커 월 / Sticker Wall — 테이프로 벽에 붙여둔 폴라로이드.
// 흰 여백 카드 + 마스킹테이프 조각 + 제각각 기운 각도로 "붙여놓은 벽"을 만든다.
export default function StyleWall({ works }: { works: WorkItem[] }) {
  const sorted = useMemo(
    () => [...works].sort((a, b) => a.order - b.order),
    [works],
  );
  const [open, setOpen] = useState<number | null>(null);

  if (sorted.length === 0) return null;

  return (
    <section className="px-6 py-16 sm:px-10 sm:py-24">
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-10">
        {sorted.map((w, i) => (
          <li key={w.id} className={LIFT[i % LIFT.length]}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.04]"
              style={{ transform: `rotate(${ROT[i % ROT.length]}deg)` }}
              aria-label={workTitle(w) ?? "작품 보기"}
            >
              {/* 마스킹테이프 */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-[var(--pf-accent)]/55"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.12)" }}
              />
              {/* 폴라로이드 카드 */}
              <span className="block bg-white p-2.5 pb-3 shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.alt ?? workTitle(w) ?? ""}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <span className="mt-2 block break-keep text-center text-xs font-semibold text-neutral-800 sm:text-sm">
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

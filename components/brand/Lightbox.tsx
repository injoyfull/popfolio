"use client";

import { useEffect } from "react";
import { DEFAULT_CATEGORY, workTitle, type WorkItem } from "@/lib/types";

// 전시 라이트박스 — 어두운 전시장에 작품을 스포트라이트로 띄우고 벽 라벨을 붙인다.
// 모든 스타일(갤러리·피드·스티커 월·겹겹이…)이 "클릭 → 확대"를 이 컴포넌트로 공유한다.
// index === null 이면 닫힘. onChange(null)로 닫고, onChange(i)로 넘긴다.
export default function WorkLightbox({
  works,
  index,
  onChange,
}: {
  works: WorkItem[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const count = works.length;
  const current = index === null ? null : works[index];

  // 키보드: ←/→ 넘기기, Esc 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (index === null || count === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowLeft") onChange((index + count - 1) % count);
      else if (e.key === "ArrowRight") onChange((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, count, onChange]);

  if (!current || index === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={() => onChange(null)}
    >
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-5 py-4 text-neutral-400">
        <span className="text-sm tabular-nums">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={() => onChange(null)}
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
        <NavBtn dir="prev" onClick={() => onChange((index + count - 1) % count)} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.image}
          alt={current.alt ?? workTitle(current) ?? ""}
          className="max-h-[64vh] max-w-full rounded object-contain shadow-2xl"
        />
        <NavBtn dir="next" onClick={() => onChange((index + 1) % count)} />
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

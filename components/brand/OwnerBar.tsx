"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 소유자(편집키 보유)에게만 보이는 관리 UI.
// - 방금 만든 경우: 공유/편집 링크를 저장하라는 안내 카드
// - 항상: 하단에 작품 추가 · 링크 복사 바
export default function OwnerBar({
  id,
  editKey,
  justCreated,
}: {
  id: string;
  editKey: string;
  justCreated: boolean;
}) {
  const [showCard, setShowCard] = useState(justCreated);

  // origin은 마운트 후에 채운다 (SSR/클라이언트 hydration 불일치 방지)
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  const shareUrl = `${origin}/p/${id}`;
  const editUrl = `${origin}/p/${id}?k=${editKey}`;
  const addHref = `/p/${id}/edit?k=${editKey}`;

  return (
    <>
      {/* 하단 소유자 바 */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center p-3">
        <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 p-1.5 shadow-lg backdrop-blur">
          <Link
            href={addHref}
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
          >
            ＋ 작품 추가
          </Link>
          <CopyBtn label="공유 링크" value={shareUrl} />
          <CopyBtn label="편집 링크" value={editUrl} />
        </div>
      </div>

      {/* 완성 안내 카드 */}
      {showCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          onClick={() => setShowCard(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg font-bold">완성됐어요! 🎉</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              두 개의 링크가 있어요. <b>공유 링크</b>는 가족·지인에게 보내고,{" "}
              <b>편집 링크</b>는 나만 저장해 두세요 — 나중에 작품을 이어 올릴 때 써요.
            </p>

            <div className="mt-5 space-y-3">
              <LinkRow label="공유 링크 (남에게 보내기)" value={shareUrl} />
              <LinkRow
                label="편집 링크 (나만 보관 — 작품 추가용)"
                value={editUrl}
                warn
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link
                href={addHref}
                className="text-sm font-semibold text-neutral-900 underline"
              >
                지금 작품 더 추가하기 →
              </Link>
              <button
                type="button"
                onClick={() => setShowCard(false)}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
              >
                내 페이지 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CopyBtn({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className="rounded-full px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
    >
      {copied ? "복사됨 ✓" : label}
    </button>
  );
}

function LinkRow({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p
        className={`mb-1 text-xs font-medium ${
          warn ? "text-amber-600" : "text-neutral-500"
        }`}
      >
        {label}
      </p>
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
        <span className="flex-1 truncate text-sm text-neutral-700">{value}</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            } catch {}
          }}
          className="shrink-0 rounded-md bg-neutral-900 px-3 py-1 text-xs font-semibold text-white hover:bg-neutral-700"
        >
          {copied ? "복사됨 ✓" : "복사"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

// ✨ 다듬기 — 쓴 글을 AI가 "대신 쓰지 않고" 조심스럽게 정리해 주는 버튼.
// 원문은 버튼 안에 보관해 두고, 마음에 안 들면 "원래대로"로 즉시 되돌린다.
// 서버에 ANTHROPIC_API_KEY가 없으면(GET /api/refine → enabled:false) 아예 렌더하지 않는다.

let enabledCache: boolean | null = null;
let enabledPromise: Promise<boolean> | null = null;

function checkEnabled(): Promise<boolean> {
  if (enabledCache !== null) return Promise.resolve(enabledCache);
  if (!enabledPromise) {
    enabledPromise = fetch("/api/refine")
      .then((r) => r.json())
      .then((d) => {
        enabledCache = Boolean(d?.enabled);
        return enabledCache;
      })
      .catch(() => {
        enabledCache = false;
        return false;
      });
  }
  return enabledPromise;
}

export default function RefineButton({
  value,
  onChange,
  kind,
}: {
  value: string;
  onChange: (next: string) => void;
  kind: "work" | "about" | "tagline";
}) {
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [original, setOriginal] = useState<string | null>(null);
  const [refinedOut, setRefinedOut] = useState<string | null>(null);
  const [unchanged, setUnchanged] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    checkEnabled().then((ok) => alive && setEnabled(ok));
    return () => {
      alive = false;
    };
  }, []);

  // 다듬은 결과를 사용자가 직접 고치기 시작하면 원문 비교·되돌리기는 접는다
  // (그때부터는 '원래대로'가 방금 쓴 손질까지 날려버리므로).
  useEffect(() => {
    setFailed(false);
    setUnchanged(false);
    if (refinedOut !== null && value !== refinedOut) {
      setOriginal(null);
      setRefinedOut(null);
    }
  }, [value, refinedOut]);

  if (!enabled) return null;

  const canRefine = value.trim().length >= 4 && !busy;
  const canUndo = original !== null && !busy;

  async function refine() {
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value, kind }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.refined) throw new Error();
      // 고칠 게 없으면 억지로 바꾸지 않는다 — 그대로 두었다고 알려준다.
      if (data.refined.trim() === value.trim()) {
        setUnchanged(true);
        return;
      }
      setOriginal(value);
      setRefinedOut(data.refined);
      onChange(data.refined);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  function undo() {
    if (original === null) return;
    onChange(original);
    setOriginal(null);
    setRefinedOut(null);
  }

  return (
    <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={refine}
        disabled={!canRefine}
        className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-800 disabled:cursor-default disabled:opacity-40"
        title="쓴 글은 그대로 두고 문장만 살짝 정리해요"
      >
        {busy ? "다듬는 중…" : "✨ 문장 다듬기"}
      </button>
      {canUndo && (
        <button
          type="button"
          onClick={undo}
          className="rounded-full border border-dashed border-neutral-300 px-2.5 py-1 text-xs text-neutral-400 transition hover:border-neutral-400 hover:text-neutral-700"
        >
          ↩ 원래대로
        </button>
      )}
      {failed && (
        <span className="text-[0.68rem] text-neutral-400">
          지금은 다듬기가 어려워요 — 잠시 후 다시 눌러 주세요.
        </span>
      )}
      {unchanged && (
        <span className="text-[0.68rem] text-neutral-400">
          이미 자연스러워요 — 그대로 두었어요.
        </span>
      )}
      {!failed && !unchanged && original === null && (
        <span className="hidden text-[0.68rem] text-neutral-400 sm:inline">
          내 글은 그대로, 문장만 정돈해요
        </span>
      )}

      {/* 무엇이 바뀌었는지 눈으로 확인할 수 있게 원문을 남겨둔다.
          "AI가 내 아이 말을 바꿔놨을까" 하는 불안이 버튼을 못 누르게 하므로. */}
      {original !== null && (
        <span className="mt-0.5 block w-full basis-full break-keep text-[0.68rem] leading-relaxed text-neutral-400">
          원래 쓴 글 <span className="text-neutral-500">{original}</span>
        </span>
      )}
    </span>
  );
}

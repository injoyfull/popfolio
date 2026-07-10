"use client";

import { useState } from "react";

export default function ShareButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 접근 실패 시 조용히 무시 (데모)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-[var(--pf-radius)] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${className}`}
    >
      {copied ? "링크 복사됨 ✓" : "링크 공유"}
    </button>
  );
}

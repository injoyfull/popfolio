"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listMine, forgetMine, type MyExhibition } from "@/lib/my-exhibitions";

// /mine — 이 기기에 저장된 "내 전시" 목록.
// 로그인이 없으므로 편집 링크를 잃으면 복구할 수 없다는 문제의 안전장치.
// 목록 자체가 편집 링크를 품고 있어, 여기서 바로 작품을 이어 올릴 수 있다.

const PAPER = "#FAF9F6";
const INK = "#14120F";
const INK_SOFT = "#77726A";
const LINE = "#E3DFD8";
const ACCENT = "#E8542F";

const serif = "var(--font-myeongjo), var(--font-noto), serif";
const mono = "var(--font-grotesk), var(--font-noto), sans-serif";

export default function MinePage() {
  // localStorage는 클라이언트에만 있으므로 마운트 후 읽는다(하이드레이션 불일치 방지)
  const [items, setItems] = useState<MyExhibition[] | null>(null);
  useEffect(() => setItems(listMine()), []);

  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK }}>
      <header className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg tracking-tight"
            style={{ fontFamily: serif, fontWeight: 800 }}
          >
            Popfolio
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 text-sm font-medium text-white transition hover:opacity-85"
            style={{ background: INK }}
          >
            새 전시 열기
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <span
          className="text-xs tracking-[0.3em]"
          style={{ fontFamily: mono, color: ACCENT }}
        >
          MY EXHIBITIONS
        </span>
        <h1
          className="mt-5 text-3xl leading-tight sm:text-4xl"
          style={{ fontFamily: serif, fontWeight: 800 }}
        >
          내 전시
        </h1>
        <p
          className="mt-5 text-pretty break-keep leading-[1.8]"
          style={{ color: INK_SOFT }}
        >
          이 기기에서 만든 전시들이에요. 눌러서 작품을 이어 올릴 수 있어요.
        </p>

        {items === null ? (
          <p className="mt-12 text-sm" style={{ color: INK_SOFT }}>
            불러오는 중…
          </p>
        ) : items.length === 0 ? (
          <div
            className="mt-12 border border-dashed px-6 py-14 text-center"
            style={{ borderColor: LINE }}
          >
            <p className="break-keep" style={{ color: INK_SOFT }}>
              이 기기에 저장된 전시가 없어요.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white transition hover:opacity-85"
              style={{ background: ACCENT }}
            >
              첫 전시 열기
            </Link>
            <p className="mt-6 text-xs leading-relaxed" style={{ color: INK_SOFT }}>
              전에 만든 전시가 있다면, 그때 받은 <b>편집 링크</b>를 주소창에
              붙여넣어 열어보세요. 열리는 순간 여기 목록에 다시 추가돼요.
            </p>
          </div>
        ) : (
          <ul className="mt-12">
            {items.map((e) => (
              <li
                key={e.id}
                className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t py-5"
                style={{ borderColor: LINE }}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="break-keep text-lg"
                    style={{ fontFamily: serif, fontWeight: 700 }}
                  >
                    {e.name}
                  </p>
                  <p
                    className="mt-1 text-xs tracking-wide"
                    style={{ fontFamily: mono, color: INK_SOFT }}
                  >
                    /p/{e.id} · {new Date(e.savedAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 text-sm">
                  <Link
                    href={`/p/${e.id}/edit?k=${encodeURIComponent(e.editKey)}`}
                    className="px-4 py-2 font-medium text-white transition hover:opacity-85"
                    style={{ background: INK }}
                  >
                    작품 추가
                  </Link>
                  <Link
                    href={`/p/${e.id}?k=${encodeURIComponent(e.editKey)}`}
                    className="underline underline-offset-4 transition hover:opacity-70"
                    style={{ color: INK_SOFT }}
                  >
                    열기
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      forgetMine(e.id);
                      setItems(listMine());
                    }}
                    className="text-xs transition hover:opacity-70"
                    style={{ color: INK_SOFT }}
                    title="이 기기의 목록에서만 지웁니다. 전시 자체는 그대로 남아요."
                  >
                    목록에서 숨기기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p
          className="mt-14 border-t pt-6 text-xs leading-relaxed"
          style={{ borderColor: LINE, color: INK_SOFT }}
        >
          이 목록은 <b>이 브라우저에만</b> 저장돼요. 기기를 바꾸거나 방문 기록을
          지우면 사라지니, 편집 링크는 따로 보관해 두시는 게 가장 확실해요.
        </p>
      </main>
    </div>
  );
}

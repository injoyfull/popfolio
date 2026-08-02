import type { Metadata } from "next";
import Link from "next/link";

// 인조이풀 가족 전용 안내 페이지 — 어머니들께 카톡으로 공유하는 입구.
// 랜딩과 같은 화이트 큐브 톤이되, 읽는 사람이 "어머니 한 분"이므로
// 설명은 존댓말 안내문으로, 모바일(카톡 인앱 브라우저) 기준으로 짠다.
// 랜딩 내비에는 걸지 않는다 — 링크를 받은 인조이풀 가족만 들어오는 문.

const PAPER = "#FAF9F6";
const SURFACE = "#FFFFFF";
const INK = "#14120F";
const INK_SOFT = "#77726A";
const LINE = "#E3DFD8";
const ACCENT = "#E8542F";
const MARKER = "#FFDE55";

const serif = "var(--font-myeongjo), var(--font-noto), serif";
const mono = "var(--font-grotesk), var(--font-noto), sans-serif";

export const metadata: Metadata = {
  title: "인조이풀 친구들을 위한 Popfolio — 우리 아이 첫 온라인 전시",
  description:
    "인조이풀에서 만든 작품들, 사진만 있으면 아이만의 전시 링크가 생겨요. 인조이풀 가족들에게 먼저 열어드립니다.",
  openGraph: {
    title: "인조이풀 친구들을 위한 Popfolio",
    description:
      "우리 아이 작품이 하나의 전시가 됩니다. 인조이풀 가족들에게 먼저 열어드려요.",
  },
};

export default function InjoyfullPage() {
  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK }}>
      {/* 헤더 */}
      <header className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <span
            className="text-lg tracking-tight"
            style={{ fontFamily: serif, fontWeight: 800 }}
          >
            Popfolio
          </span>
          <span
            className="px-3 py-1 text-xs font-semibold tracking-wide"
            style={{ background: MARKER, color: INK }}
          >
            인조이풀 친구들 먼저
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-12 sm:pt-16">
        {/* 인사 */}
        <p
          className="text-xs font-medium tracking-[0.3em]"
          style={{ fontFamily: mono, color: INK_SOFT }}
        >
          inJOYFULL × POPFOLIO
        </p>
        <h1
          className="mt-5 text-balance break-keep text-[1.9rem] leading-[1.25] sm:text-[2.4rem]"
          style={{ fontFamily: serif, fontWeight: 800 }}
        >
          인조이풀 친구들의 작품이,
          <br />
          하나의{" "}
          <span
            style={{
              background: `linear-gradient(transparent 58%, ${MARKER} 58%)`,
            }}
          >
            전시
          </span>
          가 됩니다.
        </h1>
        <p
          className="mt-6 break-keep text-[0.95rem] leading-relaxed"
          style={{ color: INK_SOFT }}
        >
          안녕하세요, 인조이풀입니다. 수업에서 아이들이 만든 작품, 집에 쌓여
          가는 그림들 — 사진만 있으면 아이만의 온라인 전시장이 생기는{" "}
          <b style={{ color: INK }}>Popfolio</b>를 인조이풀 가족들께 가장 먼저
          열어드려요. 지금은 <b style={{ color: INK }}>전부 무료</b>이고,
          회원가입도 앱 설치도 필요 없습니다.
        </p>

        {/* 샘플 작품 스트립 — 말보다 눈으로 */}
        <Link
          href="/p/sample"
          className="mt-8 block border p-3 transition hover:opacity-90"
          style={{ background: SURFACE, borderColor: LINE }}
        >
          <span className="grid grid-cols-3 gap-2">
            {["woni-garden.jpg", "woni-clay.jpg", "woni-village.jpg"].map(
              (f) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={f}
                  src={`/sample/${f}`}
                  alt=""
                  className="aspect-square w-full object-cover"
                />
              ),
            )}
          </span>
          <span
            className="mt-3 flex items-center justify-between text-xs"
            style={{ fontFamily: mono, color: INK_SOFT }}
          >
            <span>워니의 작업실 · 12 WORKS · 2024–2026</span>
            <span style={{ color: ACCENT }}>샘플 전시 보기 →</span>
          </span>
        </Link>

        {/* 어떻게 하나요 */}
        <SectionTitle no="01" title="이렇게 하시면 돼요" />
        <ol className="mt-6 space-y-6">
          <Step n="1" title="작품 사진을 준비해요">
            휴대폰으로 찍은 사진 그대로 괜찮아요. 큰 사진도 자동으로 알맞게
            줄여드리고, 사진의 위치 정보는 저장하지 않아요.
          </Step>
          <Step n="2" title="전시를 열어요">
            <Link
              href="/create"
              className="font-semibold underline underline-offset-2"
              style={{ color: ACCENT }}
            >
              전시 열기
            </Link>
            에서 아이 이름과 전시 이름, 작품 사진을 올리면 끝. 작품마다 아이가
            한 말을 그대로 적어보세요 — &ldquo;이건 화산폭발이 일어난
            거야!&rdquo; 같은 말도 ✨문장 다듬기를 누르면 도슨트의 소개처럼
            정리돼요. 아이의 말은 절대 바꾸지 않아요.
          </Step>
          <Step n="3" title="링크를 받아요">
            전시가 열리면 우리 아이만의 링크가 생겨요. 할머니·할아버지, 가족
            단톡방에 카톡으로 보내면 누구나 바로 관람할 수 있어요.
          </Step>
        </ol>

        {/* 링크 두 가지 */}
        <SectionTitle no="02" title="링크는 두 가지가 나와요" />
        <div className="mt-6 space-y-3">
          <div className="border p-5" style={{ background: SURFACE, borderColor: LINE }}>
            <p className="text-sm font-bold">🔗 공유 링크 — 관람용</p>
            <p className="mt-1.5 break-keep text-sm leading-relaxed" style={{ color: INK_SOFT }}>
              누구에게나 보내도 되는 링크예요. 받은 사람은 보기만 할 수 있어요.
            </p>
          </div>
          <div
            className="border p-5"
            style={{ background: SURFACE, borderColor: ACCENT }}
          >
            <p className="text-sm font-bold" style={{ color: ACCENT }}>
              🔑 편집 링크 — 나만 보관
            </p>
            <p className="mt-1.5 break-keep text-sm leading-relaxed" style={{ color: INK_SOFT }}>
              새 작품을 계속 추가할 수 있는 어머니 전용 링크예요.{" "}
              <b style={{ color: INK }}>
                카톡 &lsquo;나에게 보내기&rsquo;나 메모장에 꼭 저장해 두세요.
              </b>{" "}
              이 링크만 있으면 아이가 자랄수록 전시도 함께 자라요.
            </p>
          </div>
        </div>

        {/* 자주 묻는 질문 */}
        <SectionTitle no="03" title="자주 묻는 질문" />
        <dl className="mt-6 space-y-5">
          <Faq q="비용이 드나요?">
            아니요, 인조이풀 가족들께 먼저 열어드리는 지금은 전부 무료예요.
          </Faq>
          <Faq q="앱을 설치해야 하나요?">
            아니요. 카톡으로 받은 링크를 누르면 브라우저에서 바로 열려요.
            만들 때도 휴대폰 브라우저면 충분해요.
          </Faq>
          <Faq q="사진은 아무나 볼 수 있게 되나요?">
            링크를 아는 사람만 볼 수 있어요. 검색으로는 노출되지 않아요. 그래도
            얼굴이 크게 나온 사진보다는 작품 위주의 사진을 권해드려요.
          </Faq>
          <Faq q="올린 걸 지우고 싶으면요?">
            인조이풀 선생님께 말씀해 주세요. 바로 정리해 드릴게요.
          </Faq>
        </dl>

        {/* CTA */}
        <div className="mt-14 space-y-3">
          <Link
            href="/create"
            className="block px-6 py-4 text-center text-base font-bold text-white transition hover:opacity-85"
            style={{ background: ACCENT }}
          >
            우리 아이 전시 열기 →
          </Link>
          <Link
            href="/p/sample"
            className="block border px-6 py-4 text-center text-sm font-semibold transition hover:opacity-70"
            style={{ borderColor: INK, color: INK }}
          >
            샘플 전시 먼저 구경하기
          </Link>
        </div>

        <p
          className="mt-10 break-keep text-center text-xs leading-relaxed"
          style={{ color: INK_SOFT }}
        >
          만들다 막히는 부분이 있으면 언제든 인조이풀에 편하게 물어봐 주세요.
          <br />
          어머니들의 솔직한 피드백이 Popfolio를 자라게 합니다 :)
        </p>
      </main>

      {/* 푸터 */}
      <footer className="border-t" style={{ borderColor: LINE }}>
        <div
          className="mx-auto flex max-w-2xl items-center justify-between px-6 py-6 text-xs"
          style={{ color: INK_SOFT }}
        >
          <span style={{ fontFamily: mono }}>inJOYFULL</span>
          <span>
            Made with{" "}
            <span style={{ fontFamily: serif, fontWeight: 800, color: INK }}>
              Popfolio
            </span>
          </span>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ no, title }: { no: string; title: string }) {
  return (
    <div className="mt-14 flex items-baseline gap-3 border-t pt-8" style={{ borderColor: LINE }}>
      <span
        className="text-xs font-medium tracking-[0.2em]"
        style={{ fontFamily: mono, color: ACCENT }}
      >
        {no}
      </span>
      <h2
        className="text-xl tracking-tight sm:text-2xl"
        style={{ fontFamily: serif, fontWeight: 800 }}
      >
        {title}
      </h2>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold text-white"
        style={{ background: INK, fontFamily: mono }}
      >
        {n}
      </span>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 break-keep text-sm leading-relaxed" style={{ color: INK_SOFT }}>
          {children}
        </p>
      </div>
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-bold">Q. {q}</dt>
      <dd className="mt-1 break-keep text-sm leading-relaxed" style={{ color: INK_SOFT }}>
        {children}
      </dd>
    </div>
  );
}

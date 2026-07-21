import Link from "next/link";
import { MOOD_LIST } from "@/lib/moods";
import { STYLE_LIST } from "@/lib/styles";

// 랜딩 = 화이트 큐브(전시장 벽). 이 원칙을 문자 그대로 지킨다:
//   벽은 조용하게 — 종이 흰색 + 먹색 + 절제된 악센트 하나.
//   색은 작품이 칠한다 — 페이지의 유일한 색은 걸린 작품에서 나온다.
// 대상이 아이 부모 → 3040 취미 → 시니어로 넓어졌으므로, 어른이 자기
// 도자기·사진을 올려도 부끄럽지 않은 톤이어야 한다. (이모지·캔디컬러 금지)

const PAPER = "#FAF9F6"; // 종이 흰색 (벽)
const SURFACE = "#FFFFFF";
const INK = "#14120F";
const INK_SOFT = "#77726A";
const LINE = "#E3DFD8";
const ACCENT = "#A6553F"; // 절제된 테라코타 — 강조는 여기까지만

const serif = "var(--font-myeongjo), var(--font-noto), serif";
const mono = "var(--font-grotesk), var(--font-noto), sans-serif";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK }}>
      {/* 헤더 — 얇은 괘선 하나 */}
      <header
        className="border-b"
        style={{ borderColor: LINE, background: PAPER }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <span
            className="text-lg tracking-tight"
            style={{ fontFamily: serif, fontWeight: 800 }}
          >
            Popfolio
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/p/sample"
              className="underline-offset-4 transition hover:underline"
              style={{ color: INK_SOFT }}
            >
              샘플 전시
            </Link>
            <Link
              href="/create"
              className="px-4 py-2 text-sm font-medium text-white transition hover:opacity-85"
              style={{ background: INK }}
            >
              전시 열기
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 — 여백을 크게, 문장은 조용하게 */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Kicker>온라인 팝업 전시</Kicker>

            <h1
              className="mt-7 text-balance break-keep text-[2.4rem] leading-[1.2] tracking-[-0.01em] sm:text-[3.1rem]"
              style={{ fontFamily: serif, fontWeight: 800 }}
            >
              흩어져 있던 작품이,
              <br />
              하나의 전시가 됩니다.
            </h1>

            <p
              className="mt-7 max-w-[44ch] text-pretty break-keep text-[1.05rem] leading-[1.8]"
              style={{ color: INK_SOFT }}
            >
              아이가 그린 그림도, 퇴근 후 빚은 도자기도, 오래 해온 붓질도 —
              사진 몇 장과 몇 마디면 전시장처럼 걸어드려요.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/create"
                className="px-7 py-3.5 text-base font-medium text-white transition hover:opacity-85"
                style={{ background: INK }}
              >
                전시 열기
              </Link>
              <Link
                href="/p/sample"
                className="text-base underline underline-offset-4 transition hover:opacity-70"
                style={{ color: INK }}
              >
                샘플 전시 보기
              </Link>
            </div>

            <p
              className="mt-7 text-sm tracking-wide"
              style={{ color: INK_SOFT, fontFamily: mono }}
            >
              로그인 없이 · 무료 · 60초
            </p>
          </div>

          {/* 히어로 — 벽에 걸린 작품 */}
          <div className="mx-auto w-full max-w-sm">
            <FramedWall />
          </div>
        </div>
      </section>

      {/* 사진첩 vs 전시장 */}
      <Section>
        <SectionHead
          index="01"
          title="보관하지 말고, 전시하세요."
          sub="같은 작품도 어떻게 걸어주느냐가 전부입니다. 사진첩 속에서는 스크롤로 지나가지만, 벽에 걸리면 한 점씩 눈에 들어옵니다."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {/* Before */}
          <figure>
            <div
              className="grid grid-cols-3 gap-1.5 p-5"
              style={{ background: "#F0EEE9", border: `1px solid ${LINE}` }}
            >
              {[
                "draw-doodle",
                "make-objet",
                "photo-scape",
                "draw-emoji",
                "collage-paper",
                "photo-still",
              ].map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s}
                  src={`/sample/${s}.svg`}
                  alt=""
                  className="aspect-square w-full object-cover opacity-45 grayscale"
                />
              ))}
            </div>
            <figcaption
              className="mt-4 text-sm leading-relaxed"
              style={{ color: INK_SOFT }}
            >
              <span style={{ fontFamily: mono }}>BEFORE</span> · 수백 장 속에
              묻혀, 다시 열어보지 않게 됩니다.
            </figcaption>
          </figure>

          {/* After */}
          <figure>
            <div
              className="flex items-center justify-center px-8 py-10"
              style={{ background: SURFACE, border: `1px solid ${LINE}` }}
            >
              <FramedPiece
                src="/sample/make-objet.svg"
                title="Vessel No.1"
                meta="도자 · 2026"
              />
            </div>
            <figcaption
              className="mt-4 text-sm leading-relaxed"
              style={{ color: INK }}
            >
              <span style={{ fontFamily: mono, color: ACCENT }}>AFTER</span> ·
              한 점 한 점, 제목과 이야기를 달고 걸립니다.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 누구의 전시인가요 — 이모지 없이, 번호와 괘선으로 */}
      <Section bordered>
        <SectionHead
          index="02"
          title="누구의 전시인가요?"
          sub="작품의 주인이 누구든 상관없습니다. 나에게 맞는 곳에서 시작하세요."
        />
        <div className="mt-16 grid gap-px" style={{ background: LINE }}>
          <PersonaRow
            no="Ⅰ"
            who="아이 작품"
            title="우리 아이 첫 개인전"
            body="냉장고와 서랍에 쌓이는 그림들. 아이가 ‘작가’가 되는 순간을 가족에게 보여주세요."
            styleId="wall"
            mood="pop"
          />
          <PersonaRow
            no="Ⅱ"
            who="내 취미 작업"
            title="퇴근 후 만든 것들, 흩어지기 전에"
            body="드로잉·도예·사진. 폴더 속에만 있던 작업을 한 페이지에 정갈하게 걸어둡니다."
            styleId="gallery"
            mood="minimal"
          />
          <PersonaRow
            no="Ⅲ"
            who="오래 해온 것들"
            title="평생 해온 것들을 한자리에"
            body="수십 년의 붓질과 손끝. 가족에게 링크 하나로 남기는 나의 기록."
            styleId="handwritten"
            mood="warm"
          />
        </div>
      </Section>

      {/* 어떻게 열리나요 */}
      <Section>
        <SectionHead
          index="03"
          title="어떻게 열리나요?"
          sub="디자인도, 글도 몰라도 됩니다. 사진만 있으면 나머지는 Popfolio가 차립니다."
        />
        <ol className="mt-16 grid gap-12 md:grid-cols-3">
          <Step
            n="01"
            title="올리기"
            body="작품 사진과 이름을 넣습니다. 큰 폰 사진도 알아서 알맞게 줄여드려요."
          />
          <Step
            n="02"
            title="세워지기"
            body="스타일과 색감을 고르면 레이아웃·타이포·여백까지 전시장이 차려집니다."
          />
          <Step
            n="03"
            title="초대하기"
            body="링크 하나로 보고 싶은 사람을 초대합니다. 새 작품이 생기면 이어서 걸어요."
          />
        </ol>
      </Section>

      {/* 전시 경험 — 어두운 전시장 */}
      <section style={{ background: INK, color: PAPER }}>
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
          <div>
            <span
              className="text-xs tracking-[0.3em]"
              style={{ fontFamily: mono, color: "#9C948A" }}
            >
              THE EXHIBITION
            </span>
            <h2
              className="mt-6 text-balance break-keep text-4xl leading-[1.25] sm:text-5xl"
              style={{ fontFamily: serif, fontWeight: 800 }}
            >
              작품을 누르면,
              <br />
              조명이 켜집니다.
            </h2>
            <p className="mt-7 max-w-[42ch] text-pretty break-keep text-[1.05rem] leading-[1.8] text-white/60">
              어두운 전시장 한가운데로 작품이 떠오르고, 벽 라벨처럼 제목과
              이야기가 붙습니다. ◀▶로 넘기며 한 바퀴 — 관람하는 경험 그대로.
            </p>
            <Link
              href="/p/sample"
              className="mt-10 inline-block px-7 py-3.5 text-base font-medium transition hover:opacity-85"
              style={{ background: PAPER, color: INK }}
            >
              샘플 전시 열어보기
            </Link>
          </div>

          {/* 라이트박스 목업 */}
          <div className="mx-auto w-full max-w-sm">
            <div className="border border-white/10 bg-black/30 p-7">
              <p
                className="text-xs tracking-[0.2em] text-white/35"
                style={{ fontFamily: mono }}
              >
                01 / 09
              </p>
              <figure className="mt-5 bg-[#F3EFE6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sample/photo-still.svg"
                  alt="오후의 정물"
                  className="aspect-[4/5] w-full object-contain p-5"
                />
              </figure>
              <div className="mt-6 text-center">
                <p
                  className="text-[0.7rem] tracking-[0.25em] text-white/35"
                  style={{ fontFamily: mono }}
                >
                  STILL LIFE
                </p>
                <p
                  className="mt-2.5 text-lg"
                  style={{ fontFamily: serif, fontWeight: 700 }}
                >
                  오후의 정물
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                  창가에 둔 것들을 오래 들여다본 날.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 스타일 × 색감 */}
      <Section>
        <SectionHead
          index="04"
          title={`스타일 ${STYLE_LIST.length}가지 × 색감 ${MOOD_LIST.length}가지.`}
          sub="작품이 화면에 담기는 방식과 색을 따로 고릅니다. 조합을 바꾸면 전시 전체가 다시 걸립니다."
        />

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* 스타일 — 괘선 목록 */}
          <div>
            <p
              className="text-xs tracking-[0.3em]"
              style={{ fontFamily: mono, color: INK_SOFT }}
            >
              STYLE
            </p>
            <ul className="mt-6">
              {STYLE_LIST.map((s) => (
                <li
                  key={s.id}
                  className="flex items-baseline justify-between gap-4 border-t py-4"
                  style={{ borderColor: LINE }}
                >
                  <span
                    className="text-base"
                    style={{ fontFamily: serif, fontWeight: 700 }}
                  >
                    {s.ko}
                  </span>
                  <span
                    className="text-xs tracking-wide"
                    style={{ fontFamily: mono, color: INK_SOFT }}
                  >
                    {s.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 색감 — 조용한 스와치 */}
          <div>
            <p
              className="text-xs tracking-[0.3em]"
              style={{ fontFamily: mono, color: INK_SOFT }}
            >
              COLOR
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-x-5 gap-y-6">
              {MOOD_LIST.map((m) => (
                <li key={m.id}>
                  <span
                    className="block h-14 w-full"
                    style={{
                      background: m.tokens.bg,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <span
                      className="block h-full w-1/3"
                      style={{ background: m.tokens.accent }}
                    />
                  </span>
                  <span className="mt-2 block text-sm">{m.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 최종 — 조용한 마무리 */}
      <section
        className="border-t"
        style={{ borderColor: LINE, background: SURFACE }}
      >
        <div className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-8 sm:py-36">
          <h2
            className="text-balance break-keep text-4xl leading-[1.25] sm:text-5xl"
            style={{ fontFamily: serif, fontWeight: 800 }}
          >
            지금, 첫 전시를 열어보세요.
          </h2>
          <p
            className="mx-auto mt-7 max-w-[38ch] text-pretty break-keep text-[1.05rem] leading-[1.8]"
            style={{ color: INK_SOFT }}
          >
            사진 몇 장이면 충분합니다. 서랍과 폴더에만 있던 작품을, 사람들이
            찾아오는 전시로.
          </p>
          <div className="mt-11">
            <Link
              href="/create"
              className="inline-block px-9 py-4 text-base font-medium text-white transition hover:opacity-85"
              style={{ background: INK }}
            >
              전시 열기
            </Link>
          </div>
          <p
            className="mt-7 text-sm tracking-wide"
            style={{ color: INK_SOFT, fontFamily: mono }}
          >
            로그인 없이 · 무료 · 60초
          </p>
        </div>
      </section>

      <footer
        className="border-t"
        style={{ borderColor: LINE, background: PAPER }}
      >
        <div
          className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8"
          style={{ color: INK_SOFT }}
        >
          <span style={{ fontFamily: mono }}>© 2026 Popfolio</span>
          <span>작품이 걸리는 순간, 전시가 시작됩니다.</span>
        </div>
      </footer>
    </div>
  );
}

/* ── 조각들 ───────────────────────────── */

function Section({
  children,
  bordered,
}: {
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section
      className={bordered ? "border-y" : ""}
      style={
        bordered
          ? { borderColor: LINE, background: SURFACE }
          : { background: PAPER }
      }
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        {children}
      </div>
    </section>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs tracking-[0.3em]"
      style={{ fontFamily: mono, color: ACCENT }}
    >
      {children}
    </span>
  );
}

function SectionHead({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="max-w-2xl">
      <span
        className="text-xs tracking-[0.3em]"
        style={{ fontFamily: mono, color: INK_SOFT }}
      >
        {index}
      </span>
      <h2
        className="mt-5 text-balance break-keep text-3xl leading-[1.3] sm:text-[2.6rem]"
        style={{ fontFamily: serif, fontWeight: 800 }}
      >
        {title}
      </h2>
      <p
        className="mt-6 text-pretty break-keep text-[1.02rem] leading-[1.8]"
        style={{ color: INK_SOFT }}
      >
        {sub}
      </p>
    </div>
  );
}

// 분기 — 카드가 아니라 괘선으로 나뉜 목록. 훨씬 차분하다.
function PersonaRow({
  no,
  who,
  title,
  body,
  styleId,
  mood,
}: {
  no: string;
  who: string;
  title: string;
  body: string;
  styleId: string;
  mood: string;
}) {
  const preset = `style=${styleId}&mood=${mood}`;
  return (
    <div
      className="grid items-start gap-6 px-1 py-9 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
      style={{ background: SURFACE }}
    >
      <span
        className="text-sm tracking-[0.2em]"
        style={{ fontFamily: mono, color: ACCENT }}
      >
        {no}
      </span>

      <div>
        <span
          className="text-xs tracking-[0.2em]"
          style={{ fontFamily: mono, color: INK_SOFT }}
        >
          {who}
        </span>
        <p
          className="mt-2.5 break-keep text-xl leading-snug sm:text-2xl"
          style={{ fontFamily: serif, fontWeight: 700 }}
        >
          {title}
        </p>
        <p
          className="mt-3 max-w-[52ch] text-pretty break-keep text-[0.98rem] leading-[1.75]"
          style={{ color: INK_SOFT }}
        >
          {body}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-5 text-sm">
        <Link
          href={`/create?${preset}`}
          className="whitespace-nowrap px-5 py-2.5 font-medium text-white transition hover:opacity-85"
          style={{ background: INK }}
        >
          시작하기
        </Link>
        <Link
          href={`/p/sample?${preset}`}
          className="whitespace-nowrap underline underline-offset-4 transition hover:opacity-70"
          style={{ color: INK_SOFT }}
        >
          샘플
        </Link>
      </div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="border-t pt-6" style={{ borderColor: LINE }}>
      <span
        className="text-xs tracking-[0.3em]"
        style={{ fontFamily: mono, color: ACCENT }}
      >
        {n}
      </span>
      <p
        className="mt-4 text-xl"
        style={{ fontFamily: serif, fontWeight: 700 }}
      >
        {title}
      </p>
      <p
        className="mt-3 text-pretty break-keep text-[0.98rem] leading-[1.75]"
        style={{ color: INK_SOFT }}
      >
        {body}
      </p>
    </li>
  );
}

/** 액자에 걸린 한 점 — 흰 매트 + 얇은 테두리 + 벽 라벨 */
function FramedPiece({
  src,
  title,
  meta,
}: {
  src: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="w-full max-w-[15rem]">
      <div
        className="bg-white p-4"
        style={{
          border: `1px solid ${LINE}`,
          boxShadow: "0 18px 34px rgba(20,18,15,0.10)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="aspect-[4/5] w-full object-contain"
        />
      </div>
      <div className="mt-4">
        <p className="text-sm" style={{ fontFamily: serif, fontWeight: 700 }}>
          {title}
        </p>
        <p
          className="mt-0.5 text-xs tracking-wide"
          style={{ fontFamily: mono, color: INK_SOFT }}
        >
          {meta}
        </p>
      </div>
    </div>
  );
}

/** 히어로 — 벽에 두 점이 걸린 모습 */
function FramedWall() {
  return (
    <div className="relative pb-10 pl-10">
      {/* 뒤쪽 작은 액자 */}
      <div
        className="absolute bottom-0 left-0 w-[45%] bg-white p-2.5"
        style={{
          border: `1px solid ${LINE}`,
          boxShadow: "0 14px 28px rgba(20,18,15,0.10)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sample/photo-scape.svg"
          alt=""
          className="aspect-square w-full object-cover"
        />
      </div>

      {/* 앞쪽 큰 액자 */}
      <div
        className="relative bg-white p-5"
        style={{
          border: `1px solid ${LINE}`,
          boxShadow: "0 26px 50px rgba(20,18,15,0.12)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sample/photo-still.svg"
          alt="오후의 정물"
          className="aspect-[4/5] w-full object-contain"
        />
      </div>

      {/* 벽 라벨 */}
      <div className="mt-5 pl-1">
        <p className="text-sm" style={{ fontFamily: serif, fontWeight: 700 }}>
          오후의 정물
        </p>
        <p
          className="mt-0.5 text-xs tracking-wide"
          style={{ fontFamily: mono, color: INK_SOFT }}
        >
          사진 · 2026
        </p>
      </div>
    </div>
  );
}

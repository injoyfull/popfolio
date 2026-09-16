import Link from "next/link";
import { MOOD_LIST } from "@/lib/moods";
import { STYLE_LIST } from "@/lib/styles";
import type { LandingCopy } from "@/lib/i18n/landing";

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
const ACCENT = "#E8542F"; // 밝은 감빛 — 벽은 조용하되 포인트는 생기 있게
const MARKER = "#FFDE55"; // 형광펜 하이라이트 (제목 한 단어에만)

const serif = "var(--font-myeongjo), var(--font-noto), serif";
const mono = "var(--font-grotesk), var(--font-noto), sans-serif";

export default function Landing({ t }: { t: LandingCopy }) {
  return (
    <div lang={t.htmlLang} className="min-h-screen" style={{ background: PAPER, color: INK }}>
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
          <nav className="flex items-center gap-5 text-sm sm:gap-6">
            <Link
              href="/p/sample"
              className="underline-offset-4 transition hover:underline"
              style={{ color: INK_SOFT }}
            >
              {t.nav.sample}
            </Link>
            <Link
              href="/mine"
              className="underline-offset-4 transition hover:underline"
              style={{ color: INK_SOFT }}
            >
              {t.nav.mine}
            </Link>
            <Link
              href={t.nav.switchHref}
              hrefLang={t.nav.switchLang}
              lang={t.nav.switchLang}
              className="underline-offset-4 transition hover:underline"
              style={{ color: INK_SOFT, fontFamily: mono }}
            >
              {t.nav.switchLabel}
            </Link>
            <Link
              href="/create"
              className="px-4 py-2 text-sm font-medium text-white transition hover:opacity-85"
              style={{ background: INK }}
            >
              {t.nav.create}
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 — 여백을 크게, 문장은 조용하게 */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Kicker>{t.hero.kicker}</Kicker>

            <h1
              className="mt-7 text-balance break-keep text-[2.4rem] leading-[1.2] tracking-[-0.01em] sm:text-[3.1rem]"
              style={{ fontFamily: serif, fontWeight: 800 }}
            >
              {t.hero.line1}
              <br />
              {t.hero.line2Before}
              <span
                style={{
                  background: `linear-gradient(transparent 58%, ${MARKER} 58%)`,
                }}
              >
                {t.hero.line2Mark}
              </span>
              {t.hero.line2After}
            </h1>

            <p
              className="mt-7 max-w-[44ch] text-pretty break-keep text-[1.05rem] leading-[1.8]"
              style={{ color: INK_SOFT }}
            >
              {t.hero.sub}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/create"
                className="px-7 py-3.5 text-base font-medium text-white transition hover:opacity-85"
                style={{ background: ACCENT }}
              >
                {t.hero.create}
              </Link>
              <Link
                href="/p/sample"
                className="text-base underline underline-offset-4 transition hover:opacity-70"
                style={{ color: INK }}
              >
                {t.hero.sample}
              </Link>
            </div>

            <p
              className="mt-7 text-sm tracking-wide"
              style={{ color: INK_SOFT, fontFamily: mono }}
            >
              {t.hero.trust}
            </p>
            {t.note ? (
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed" style={{ color: INK_SOFT }}>
                {t.note}
              </p>
            ) : null}
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
          title={t.s01.title}
          sub={t.s01.sub}
        />
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {/* Before */}
          <figure>
            <div
              className="grid grid-cols-3 gap-1.5 p-5"
              style={{ background: "#F0EEE9", border: `1px solid ${LINE}` }}
            >
              {[
                "joy-clay.jpg",
                "joy-robot.jpg",
                "joy-heart.jpg",
                "joy-cookie.jpg",
                "joy-felt.jpg",
                "joy-racket.jpg",
              ].map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s}
                  src={`/sample/${s}`}
                  alt=""
                  className="aspect-square w-full object-cover opacity-45 grayscale"
                />
              ))}
            </div>
            <figcaption
              className="mt-4 text-sm leading-relaxed"
              style={{ color: INK_SOFT }}
            >
              <span style={{ fontFamily: mono }}>BEFORE</span> · {t.s01.before}
            </figcaption>
          </figure>

          {/* After */}
          <figure>
            <div
              className="flex items-center justify-center px-8 py-10"
              style={{ background: SURFACE, border: `1px solid ${LINE}` }}
            >
              <FramedPiece
                src="/sample/joy-clay.jpg"
                title={t.s01.pieceTitle}
                meta={t.s01.pieceMeta}
              />
            </div>
            <figcaption
              className="mt-4 text-sm leading-relaxed"
              style={{ color: INK }}
            >
              <span style={{ fontFamily: mono, color: ACCENT }}>AFTER</span> ·{" "}
              {t.s01.after}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 누구의 전시인가요 — 이모지 없이, 번호와 괘선으로 */}
      <Section bordered>
        <SectionHead
          index="02"
          title={t.s02.title}
          sub={t.s02.sub}
        />
        <div className="mt-16 grid gap-px" style={{ background: LINE }}>
          <PersonaRow
            no="Ⅰ"
            who={t.s02.rows[0].who}
            title={t.s02.rows[0].title}
            body={t.s02.rows[0].body}
            start={t.s02.start}
            sampleLabel={t.s02.sample}
            styleId="wall"
            mood="pop"
          />
          <PersonaRow
            no="Ⅱ"
            who={t.s02.rows[1].who}
            title={t.s02.rows[1].title}
            body={t.s02.rows[1].body}
            start={t.s02.start}
            sampleLabel={t.s02.sample}
            styleId="gallery"
            mood="minimal"
          />
          <PersonaRow
            no="Ⅲ"
            who={t.s02.rows[2].who}
            title={t.s02.rows[2].title}
            body={t.s02.rows[2].body}
            start={t.s02.start}
            sampleLabel={t.s02.sample}
            styleId="handwritten"
            mood="warm"
          />
        </div>
      </Section>

      {/* 어떻게 열리나요 */}
      <Section>
        <SectionHead
          index="03"
          title={t.s03.title}
          sub={t.s03.sub}
        />
        <ol className="mt-16 grid gap-12 md:grid-cols-3">
          <Step
            n="01"
            title={t.s03.steps[0].title}
            body={t.s03.steps[0].body}
          />
          <Step
            n="02"
            title={t.s03.steps[1].title}
            body={t.s03.steps[1].body}
          />
          <Step
            n="03"
            title={t.s03.steps[2].title}
            body={t.s03.steps[2].body}
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
              {t.exhibition.titleLine1}
              <br />
              {t.exhibition.titleLine2}
            </h2>
            <p className="mt-7 max-w-[42ch] text-pretty break-keep text-[1.05rem] leading-[1.8] text-white/60">
              {t.exhibition.sub}
            </p>
            <Link
              href="/p/sample"
              className="mt-10 inline-block px-7 py-3.5 text-base font-medium transition hover:opacity-85"
              style={{ background: PAPER, color: INK }}
            >
              {t.exhibition.cta}
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
              <figure className="mt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sample/joy-racket.jpg"
                  alt={t.exhibition.pieceTitle}
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>
              <div className="mt-6 text-center">
                <p
                  className="text-[0.7rem] tracking-[0.25em] text-white/35"
                  style={{ fontFamily: mono }}
                >
                  PLAY
                </p>
                <p
                  className="mt-2.5 text-lg"
                  style={{ fontFamily: serif, fontWeight: 700 }}
                >
                  {t.exhibition.pieceTitle}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                  {t.exhibition.pieceCaption}
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
          title={t.s04.title(STYLE_LIST.length, MOOD_LIST.length)}
          sub={t.s04.sub}
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
                    {t.styleName(s).main}
                  </span>
                  <span
                    className="text-xs tracking-wide"
                    style={{ fontFamily: mono, color: INK_SOFT }}
                  >
                    {t.styleName(s).aside}
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
                  <span className="mt-2 block text-sm">{t.moodName(m.id, m.label)}</span>
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
            {t.final.title}
          </h2>
          <p
            className="mx-auto mt-7 max-w-[38ch] text-pretty break-keep text-[1.05rem] leading-[1.8]"
            style={{ color: INK_SOFT }}
          >
            {t.final.sub}
          </p>
          <div className="mt-11">
            <Link
              href="/create"
              className="inline-block px-9 py-4 text-base font-medium text-white transition hover:opacity-85"
              style={{ background: ACCENT }}
            >
              {t.final.cta}
            </Link>
          </div>
          <p
            className="mt-7 text-sm tracking-wide"
            style={{ color: INK_SOFT, fontFamily: mono }}
          >
            {t.final.trust}
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
          <span>{t.footer}</span>
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
  start,
  sampleLabel,
}: {
  no: string;
  who: string;
  title: string;
  body: string;
  styleId: string;
  mood: string;
  start: string;
  sampleLabel: string;
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
          {start}
        </Link>
        <Link
          href={`/p/sample?${preset}`}
          className="whitespace-nowrap underline underline-offset-4 transition hover:opacity-70"
          style={{ color: INK_SOFT }}
        >
          {sampleLabel}
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
          className="aspect-[4/5] w-full object-cover"
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

/**
 * 히어로 — 살롱 행잉(갤러리 월).
 * 크기가 제각각인 여섯 점을 벽에 나란히 건 모습. 한 점씩 보여주는 대신
 * "전시가 이렇게 걸린다"를 한눈에 보여준다.
 */
// 크기가 제각각인 여섯 점 — 매스너리 컬럼으로 흘려 액자 아래 빈틈이 생기지 않게 한다.
const WALL_PIECES = [
  { src: "joy-heart.jpg", ratio: "aspect-[5/4]" },
  { src: "joy-cookie.jpg", ratio: "aspect-square" },
  { src: "joy-racket.jpg", ratio: "aspect-[4/5]" },
  { src: "joy-clay.jpg", ratio: "aspect-[4/5]" },
  { src: "joy-felt.jpg", ratio: "aspect-[4/3]" },
  { src: "joy-robot.jpg", ratio: "aspect-square" },
];

function FramedWall() {
  return (
    <div>
      {/* 걸이 레일 — 전시장 벽 느낌의 얇은 선 */}
      <div className="mb-5 h-px w-full" style={{ background: LINE }} />

      <div className="columns-2 gap-3 sm:gap-4 [column-fill:balance]">
        {WALL_PIECES.map((p, i) => (
          <figure
            key={p.src}
            className="mb-3 break-inside-avoid bg-white p-1.5 sm:mb-4 sm:p-2"
            style={{
              border: `1px solid ${LINE}`,
              boxShadow:
                i === 0
                  ? "0 18px 34px rgba(20,18,15,0.12)"
                  : "0 10px 20px rgba(20,18,15,0.08)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/sample/${p.src}`}
              alt=""
              className={`${p.ratio} w-full object-cover`}
            />
          </figure>
        ))}
      </div>

      {/* 벽 라벨 — 전시 전체를 가리키는 한 줄 */}
      <div className="mt-5 flex items-baseline justify-between">
        <p className="text-sm" style={{ fontFamily: serif, fontWeight: 700 }}>
          JOY's World
        </p>
        <p
          className="text-xs tracking-wide"
          style={{ fontFamily: mono, color: INK_SOFT }}
        >
          12 WORKS · 2026
        </p>
      </div>
    </div>
  );
}

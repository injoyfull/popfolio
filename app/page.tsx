import Link from "next/link";
import { MOOD_LIST } from "@/lib/moods";

// 랜딩 = "화이트 큐브(전시장 벽)". 벽은 중립·고급, 색은 아이 작품과 무드가 칠한다.
// 톤: 오프화이트 배경 + 결과 페이지와 같은 액센트(비비드 레드)·폰트로 랜딩→결과 연속성.
const WALL = "#F7F3EA";
const INK = "#1A1712";
const INK_SOFT = "#6B6256";
const ACCENT = "#FF4A24";
const YELLOW = "#FDE24A";
const LINE = "#E7E0D2";

const display = "var(--font-noto), system-ui, sans-serif";
const grotesk = "var(--font-grotesk), var(--font-noto), sans-serif";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: WALL, color: INK }}
    >
      {/* 헤더 */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <span className="text-lg font-bold tracking-tight">Popfolio</span>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/p/sample"
            className="font-medium text-[color:var(--soft)] hover:text-[color:var(--ink)]"
            style={{ ["--soft" as string]: INK_SOFT, ["--ink" as string]: INK }}
          >
            샘플 전시 보기
          </Link>
          <Link
            href="/create"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: INK }}
          >
            전시 열기
          </Link>
        </nav>
      </header>

      {/* 히어로 */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20 sm:px-8 sm:pt-16 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ background: "#fff", color: ACCENT, border: `1px solid ${LINE}` }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: ACCENT }}
              />
              나만의 팝업 전시
            </span>

            <h1
              className="mt-6 text-5xl leading-[1.05] tracking-tight sm:text-6xl"
              style={{ fontFamily: display, fontWeight: 800 }}
            >
              사진첩 속 작품이,
              <br />
              <span style={{ color: ACCENT }}>60초</span> 만에 전시가 됩니다.
            </h1>

            <p
              className="mt-6 max-w-[46ch] text-balance break-keep text-lg leading-relaxed"
              style={{ color: INK_SOFT }}
            >
              아이가 그린 그림이든, 퇴근 후 만든 작업이든 — 사진 몇 장과 몇
              마디면 진짜 전시장처럼 세워드려요. 링크 하나로 초대하세요.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/create"
                className="rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:opacity-90"
                style={{ background: ACCENT }}
              >
                내 전시 열기 →
              </Link>
              <Link
                href="/p/sample"
                className="rounded-full px-6 py-3.5 text-base font-medium transition hover:bg-black/5"
                style={{ border: `1px solid ${LINE}`, color: INK }}
              >
                샘플 전시 구경하기
              </Link>
            </div>

            <p className="mt-5 text-sm" style={{ color: INK_SOFT }}>
              로그인 없이 · 무료로 시작 · 60초면 완성
            </p>
          </div>

          {/* 히어로 목업 — "이게 나온다" */}
          <div className="relative mx-auto w-full max-w-md">
            <ExhibitionMock />
          </div>
        </div>
      </section>

      {/* 어떻게 열리나요 — 3단계 */}
      <section
        className="border-y"
        style={{ borderColor: LINE, background: "#fff" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <SectionHead
            kicker="HOW IT WORKS"
            title="어떻게 열리나요?"
            sub="디자인도, 글도 몰라도 돼요. 사진만 있으면 나머지는 Popfolio가 차려요."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <StepCard
              n="01"
              emoji="📷"
              title="올리기"
              body="작품 사진과 이름만 넣어요. 큰 폰 사진도 알아서 알맞게 줄여드려요."
            />
            <StepCard
              n="02"
              emoji="🎨"
              title="세워지기"
              body="무드를 고르면 색·글씨·레이아웃까지 전시장이 알아서 차려져요."
            />
            <StepCard
              n="03"
              emoji="💌"
              title="초대하기"
              body="링크 하나로 보고 싶은 사람을 초대해요. 새 작품이 생기면 이어서 걸어요."
            />
          </div>
        </div>
      </section>

      {/* 사진첩 vs 전시장 */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker="BEFORE / AFTER"
          title="사진첩이 아니라, 전시장."
          sub="같은 그림도 어떻게 걸어주느냐가 전부예요. 보관하지 말고, 전시하세요."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Before */}
          <div
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "#EFEADE", border: `1px solid ${LINE}` }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: INK_SOFT }}
            >
              그냥 사진첩
            </span>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                "draw-doodle",
                "make-objet",
                "photo-scape",
                "draw-emoji",
                "collage-paper",
                "make-stack",
              ].map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s}
                  src={`/sample/${s}.svg`}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover opacity-70 grayscale"
                />
              ))}
            </div>
            <p className="mt-4 text-sm" style={{ color: INK_SOFT }}>
              수백 장 속에 묻히고, 결국 스크롤로 지나가요.
            </p>
          </div>

          {/* After */}
          <div
            className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
            style={{ background: YELLOW, color: "#141009" }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
              우리 아이 전시
            </span>
            <p
              className="mt-3 text-3xl leading-none"
              style={{ fontFamily: display, fontWeight: 800 }}
            >
              워니의 작업실
            </p>
            <p className="mt-1 text-sm opacity-70">일곱 살, 매일 그리고 만드는 중</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["draw-doodle", "make-objet", "photo-scape"].map((s) => (
                <figure
                  key={s}
                  className="overflow-hidden rounded-lg bg-white shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/sample/${s}.svg`}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                </figure>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium">
              한 점 한 점, 이름표를 달고 걸려요.
            </p>
          </div>
        </div>
      </section>

      {/* 누구의 전시인가요 — 엔진은 하나, 이야기는 사람마다 다르다.
          각 갈래는 그 사람에게 어울리는 스타일×색감 프리셋을 들고 /create로 간다. */}
      <section
        className="border-y"
        style={{ borderColor: LINE, background: "#fff" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <SectionHead
            kicker="WHO'S SHOWING"
            title="누구의 전시인가요?"
            sub="작품의 주인이 누구든 상관없어요. 나에게 맞는 곳에서 시작하세요."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <PersonaCard
              emoji="🎨"
              who="아이 작품"
              title="우리 아이 첫 개인전"
              body="냉장고와 서랍에 쌓이는 그림들. 아이가 '작가'가 되는 순간을 온 가족에게 보여주세요."
              styleId="wall"
              mood="pop"
            />
            <PersonaCard
              emoji="🌙"
              who="내 취미 작업"
              title="퇴근 후 만든 것들, 흩어지기 전에"
              body="드로잉·도예·사진… 폴더 속에만 있던 작업을 한 페이지에 정갈하게 걸어둬요."
              styleId="gallery"
              mood="minimal"
            />
            <PersonaCard
              emoji="🌳"
              who="오래 해온 것들"
              title="평생 해온 것들을 한자리에"
              body="수십 년의 붓질과 손끝. 가족에게 링크 하나로 남기는 나의 기록."
              styleId="handwritten"
              mood="warm"
            />
          </div>
        </div>
      </section>

      {/* 전시처럼, 진짜로 — 라이트박스 체험 */}
      <section style={{ background: INK, color: "#fff" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: YELLOW }}
            >
              THE EXHIBITION
            </span>
            <h2
              className="mt-4 text-4xl leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: display, fontWeight: 800 }}
            >
              진짜 전시장처럼,
              <br />
              스포트라이트가 켜져요.
            </h2>
            <p className="mt-6 max-w-[42ch] text-balance break-keep text-lg leading-relaxed text-white/70">
              썸네일을 누르면 어두운 전시장에 작품이 중앙으로 떠오르고, 벽 라벨처럼
              제목이 붙어요. ◀▶로 넘기며 전시를 한 바퀴 — “내가
              작가가 된” 그 느낌.
            </p>
            <Link
              href="/p/sample"
              className="mt-8 inline-flex rounded-full px-6 py-3.5 text-base font-semibold transition hover:opacity-90"
              style={{ background: YELLOW, color: "#141009" }}
            >
              샘플 전시 열어보기 →
            </Link>
          </div>

          {/* 라이트박스 목업 */}
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-xs text-white/40">1 / 9</p>
              <figure className="mt-3 overflow-hidden rounded-xl bg-[#F3EFE6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sample/draw-doodle.svg"
                  alt="워니의 작품 — 오늘의 낙서"
                  className="aspect-[4/5] w-full object-contain p-4"
                />
              </figure>
              <div className="mt-4 text-center">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  그림
                </p>
                <p className="mt-1 text-lg">오늘의 낙서 — 매일 한 장씩</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 무드 4종 */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
        <SectionHead
          kicker="MOODS"
          title="분위기 4가지, 골라서 다시."
          sub="한 번의 클릭으로 전시 전체가 다른 무드로 리스킨돼요. 작품에 맞는 톤으로."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOOD_LIST.map((m) => (
            <div
              key={m.id}
              className="overflow-hidden rounded-2xl"
              style={{ border: `1px solid ${LINE}` }}
            >
              <div
                className="flex h-28 items-center justify-center"
                style={{ background: m.tokens.bg }}
              >
                <span className="flex gap-2">
                  <Dot c={m.tokens.accent} />
                  <Dot c={m.tokens.ink} />
                  <Dot c={m.tokens.surface} ring />
                </span>
              </div>
              <div className="px-5 py-4" style={{ background: "#fff" }}>
                <p className="text-base font-bold">{m.label}</p>
                <p
                  className="mt-1 text-pretty break-keep text-sm"
                  style={{ color: INK_SOFT }}
                >
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 최종 CTA */}
      <section style={{ background: ACCENT, color: "#fff" }}>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8">
          <h2
            className="text-4xl leading-tight tracking-tight sm:text-6xl"
            style={{ fontFamily: display, fontWeight: 800 }}
          >
            내 전시,
            <br />
            지금 열어주세요.
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-balance break-keep text-lg text-white/85">
            사진 몇 장이면 충분해요. 서랍과 폴더에만 있던 작품을, 사람들이
            찾아오는 전시로.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3">
            <Link
              href="/create"
              className="rounded-full bg-white px-8 py-4 text-lg font-bold shadow-sm transition hover:opacity-90"
              style={{ color: ACCENT }}
            >
              내 전시 열기 →
            </Link>
            <span className="text-sm text-white/80">로그인 없이 · 무료 · 60초</span>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm sm:flex-row sm:px-8"
        style={{ color: INK_SOFT }}
      >
        <span>© {new Date().getFullYear()} Popfolio</span>
        <span>아이의 작품이, 걸리는 순간. — Made with Popfolio</span>
      </footer>
    </div>
  );
}

/* ---------- 조각들 ---------- */

function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="max-w-2xl">
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: ACCENT }}
      >
        {kicker}
      </span>
      <h2
        className="mt-3 text-3xl leading-tight tracking-tight sm:text-4xl"
        style={{ fontFamily: grotesk }}
      >
        {title}
      </h2>
      <p
        className="mt-4 text-balance break-keep text-lg leading-relaxed"
        style={{ color: INK_SOFT }}
      >
        {sub}
      </p>
    </div>
  );
}

// 분기 카드 — 사람마다 다른 이야기로 말을 걸고, 그에 맞는 프리셋으로 시작시킨다.
function PersonaCard({
  emoji,
  who,
  title,
  body,
  styleId,
  mood,
}: {
  emoji: string;
  who: string;
  title: string;
  body: string;
  styleId: string;
  mood: string;
}) {
  const preset = `style=${styleId}&mood=${mood}`;
  return (
    <div
      className="flex flex-col rounded-2xl p-7"
      style={{ background: WALL, border: `1px solid ${LINE}` }}
    >
      <span className="text-3xl">{emoji}</span>
      <span
        className="mt-3 text-xs font-semibold uppercase tracking-widest"
        style={{ color: ACCENT }}
      >
        {who}
      </span>
      <p className="mt-2 break-keep text-xl font-bold leading-snug">{title}</p>
      <p
        className="mt-2 flex-1 text-pretty break-keep text-[15px] leading-relaxed"
        style={{ color: INK_SOFT }}
      >
        {body}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/create?${preset}`}
          className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: INK }}
        >
          이걸로 시작하기
        </Link>
        <Link
          href={`/p/sample?${preset}`}
          className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-black/5"
          style={{ border: `1px solid ${LINE}` }}
        >
          샘플 보기
        </Link>
      </div>
    </div>
  );
}

function StepCard({
  n,
  emoji,
  title,
  body,
}: {
  n: string;
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div
      className="relative rounded-2xl p-7"
      style={{ background: WALL, border: `1px solid ${LINE}` }}
    >
      <span
        className="text-5xl font-black leading-none"
        style={{ color: ACCENT, opacity: 0.18, fontFamily: grotesk }}
      >
        {n}
      </span>
      <div className="mt-4 text-3xl">{emoji}</div>
      <p className="mt-3 text-xl font-bold">{title}</p>
      <p
        className="mt-2 text-pretty break-keep text-[15px] leading-relaxed"
        style={{ color: INK_SOFT }}
      >
        {body}
      </p>
    </div>
  );
}

function ExhibitionMock() {
  const thumbs = ["draw-doodle", "draw-emoji", "make-objet", "photo-scape"];
  return (
    <div
      className="rotate-2 rounded-3xl p-6 shadow-xl transition-transform"
      style={{ background: YELLOW, color: "#141009" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
          Archive · 2026
        </span>
        <span
          className="rounded-full px-3 py-1 text-[11px] font-bold text-white"
          style={{ background: ACCENT }}
        >
          링크 공유
        </span>
      </div>
      <p className="mt-4 text-4xl leading-none" style={{ fontFamily: display, fontWeight: 800 }}>
        워니의 작업실
      </p>
      <p className="mt-2 text-sm opacity-70">일곱 살, 매일 그리고 만드는 중</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {thumbs.map((s) => (
          <figure
            key={s}
            className="overflow-hidden rounded-xl bg-white shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/sample/${s}.svg`}
              alt=""
              className="aspect-square w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

function Dot({ c, ring }: { c: string; ring?: boolean }) {
  return (
    <span
      className="h-6 w-6 rounded-full"
      style={{ background: c, boxShadow: ring ? "inset 0 0 0 1px rgba(0,0,0,0.15)" : "none" }}
    />
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-bold tracking-tight">Popfolio</span>
        <Link
          href="/p/sample"
          className="text-sm text-neutral-400 hover:text-neutral-100"
        >
          샘플 보기
        </Link>
      </header>

      <main className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <p className="text-xs font-medium tracking-[0.3em] text-[#c8fa4b]">
          POP-UP BRAND PORTFOLIO
        </p>
        <h1 className="mt-6 max-w-[16ch] text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          작업 몇 개면,
          <br />
          나만의 브랜드.
        </h1>
        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-neutral-400">
          미술관도, 이력서도 아닌 &mdash; 트렌디한 팝업스토어처럼. 작업과 몇
          마디만 넣으면 근사하게 세워드리고, 링크로 바로 공유해요.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/create"
            className="rounded-full bg-[#c8fa4b] px-7 py-3.5 font-semibold text-neutral-950 transition hover:opacity-90"
          >
            내 팝업 브랜드 만들기 →
          </Link>
          <Link
            href="/p/sample"
            className="rounded-full border border-neutral-700 px-7 py-3.5 font-medium text-neutral-200 transition hover:border-neutral-400"
          >
            예시 먼저 보기
          </Link>
        </div>
      </main>

      <footer className="px-6 py-6 text-sm text-neutral-600 sm:px-10">
        Made with Popfolio
      </footer>
    </div>
  );
}

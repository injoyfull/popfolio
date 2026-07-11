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
          우리 아이 팝업 전시
        </p>
        <h1 className="mt-6 max-w-[16ch] text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          냉장고 속 그림이,
          <br />
          진짜 전시가 돼요.
        </h1>
        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-neutral-400">
          아이 작품 사진 몇 장과 몇 마디만 넣으면 &mdash; 냉장고에 붙어있던
          그림이 전시장에 걸린 작품처럼 근사하게 세워져요. 링크로 가족에게 바로
          자랑하세요.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/create"
            className="rounded-full bg-[#c8fa4b] px-7 py-3.5 font-semibold text-neutral-950 transition hover:opacity-90"
          >
            우리 아이 전시 열어주기 →
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

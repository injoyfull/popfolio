// 팝(Pop) 공간의 장식 — 스파클(4각 별)·스마일·꽃·블롭.
// 흰 스피치버블(불투명) 뒤에 깔려서 버블 가장자리로 삐죽 보이는 구성 → 텍스트를 안 가린다.
// 전부 손으로 그린 SVG, 장식이므로 aria-hidden + pointer-events-none.

export default function PopDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/*
        배치 원칙: 본문(스피치버블·소개 글)은 가운데 max-w-3xl 컬럼에 있다.
        스티커는 그 컬럼 '바깥 여백'에만 두어 글자를 덮지 않게 한다.
        모바일은 여백이 거의 없으므로 최소 개수만, 그것도 상단 모서리에만.
      */}

      {/* 상단 — 버블 어깨 옆 (버블이 불투명해 자연스럽게 가려짐) */}
      <Sparkle
        color="#17B26A"
        className="absolute left-1 top-[14%] h-9 w-9 sm:left-[2%] sm:h-14 sm:w-14"
      />
      <Sparkle
        color="#F6E24B"
        className="absolute right-1 top-[9%] h-10 w-10 sm:right-[3%] sm:h-16 sm:w-16"
      />

      {/* 이하 데스크톱 전용 — 가운데 컬럼 바깥 여백에만 배치 */}
      <Blob className="absolute left-[6%] top-[2%] hidden h-10 w-14 lg:block" />
      <Flower className="absolute right-[4%] top-[46%] hidden h-12 w-12 rotate-6 lg:block" />
      <Smiley className="absolute left-[3%] bottom-[12%] hidden h-14 w-14 lg:block" />
      <Sparkle
        color="#F4A6C0"
        className="absolute right-[7%] bottom-[18%] hidden h-11 w-11 lg:block"
      />
    </div>
  );
}

function Sparkle({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path
        d="M50 4 C54 30 70 46 96 50 C70 54 54 70 50 96 C46 70 30 54 4 50 C30 46 46 30 50 4 Z"
        fill={color}
      />
    </svg>
  );
}

function Smiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="46" fill="#F6E24B" />
      <circle cx="37" cy="43" r="5" fill="#1C1B22" />
      <circle cx="63" cy="43" r="5" fill="#1C1B22" />
      <path
        d="M34 60 q16 18 32 0"
        stroke="#1C1B22"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Flower({ className }: { className?: string }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="50"
          cy="26"
          rx="15"
          ry="22"
          fill="#B79CE0"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="13" fill="#F6E24B" />
    </svg>
  );
}

function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <path
        d="M18 46 C10 22 34 4 58 10 C86 17 116 26 112 52 C108 80 82 96 56 92 C30 88 26 70 18 46 Z"
        fill="#9CC9F0"
      />
    </svg>
  );
}

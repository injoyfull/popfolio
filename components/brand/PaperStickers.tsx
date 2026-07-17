// 콜라주 공간의 종이 스티커 & 종이 질감.
// 전부 손으로 그린 SVG — 이미지 에셋 없이 CSS/SVG만으로 '오려붙인' 팝업 느낌을 낸다.
// 장식이므로 aria-hidden + pointer-events-none (클릭 방해 금지).

/** 종이 결(그레인) 오버레이 — feTurbulence 노이즈를 곱하기 블렌드로 아주 옅게 */
export function PaperGrain() {
  const noise =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        backgroundImage: `url("${noise}")`,
        opacity: 0.14,
        mixBlendMode: "multiply",
      }}
    />
  );
}

/**
 * 히어로 주변에 흩뿌리는 종이 스티커들.
 * 모바일은 본문이 화면 폭을 다 쓰므로 스티커를 텍스트 위에 얹으면 지저분해진다.
 * → 모바일: 텍스트 아래 장식 띠 / 데스크톱: 오른쪽 여백에 흩뿌림.
 */
export default function PaperStickers() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 데스크톱 — 본문(max-w) 바깥 오른쪽 여백 */}
      <div className="hidden sm:block">
        <Sun className="absolute right-[5%] top-[10%] h-28 w-28" />
        <Flower className="absolute right-[22%] top-[46%] h-14 w-14 rotate-12" />
        <SmileyCloud className="absolute bottom-[10%] right-[8%] h-24 w-28" />
        <Drop className="absolute right-[34%] top-[18%] h-11 w-8 -rotate-12" />
        <Blob className="absolute bottom-[16%] right-[30%] h-14 w-16" />
      </div>

      {/* 모바일 — 텍스트 아래 장식 띠 (히어로 하단 pb-32 = 128px 안에만 놓는다) */}
      <div className="sm:hidden">
        <Sun className="absolute bottom-2 right-3 h-14 w-14" />
        <SmileyCloud className="absolute bottom-2 left-2 h-10 w-14" />
        <Flower className="absolute bottom-4 left-[5.5rem] h-7 w-7 rotate-12" />
        <Drop className="absolute bottom-3 right-[5.5rem] h-6 w-4 -rotate-12" />
        <Blob className="absolute bottom-5 right-[9rem] h-7 w-9" />
      </div>
    </div>
  );
}

function Sun({ className }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <g>
        {rays.map((deg) => (
          <rect
            key={deg}
            x="47"
            y="2"
            width="6"
            height="16"
            rx="3"
            fill="#F2C94C"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="28" fill="#EE7752" />
        <circle cx="50" cy="50" r="18" fill="#F2C94C" />
      </g>
    </svg>
  );
}

function SmileyCloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className}>
      {/* 구름 몸통 — 원 몇 개를 겹쳐 오린 종이처럼 */}
      <g fill="#9CC9F0">
        <circle cx="35" cy="52" r="26" />
        <circle cx="62" cy="38" r="30" />
        <circle cx="90" cy="54" r="24" />
        <rect x="30" y="52" width="62" height="26" rx="13" />
      </g>
      {/* 얼굴 */}
      <circle cx="52" cy="46" r="3.4" fill="#2B2A28" />
      <circle cx="74" cy="46" r="3.4" fill="#2B2A28" />
      <path
        d="M52 58 q11 11 22 0"
        stroke="#2B2A28"
        strokeWidth="3.4"
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
          fill="#F4A6C0"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="13" fill="#F2C94C" />
    </svg>
  );
}

function Drop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className}>
      <path d="M30 4 C30 4 56 38 56 52 A26 26 0 1 1 4 52 C4 38 30 4 30 4 Z" fill="#6FB8E8" />
    </svg>
  );
}

function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <path
        d="M18 46 C10 22 34 4 58 10 C86 17 116 26 112 52 C108 80 82 96 56 92 C30 88 26 70 18 46 Z"
        fill="#B79CE0"
      />
    </svg>
  );
}

// 컷아웃(색종이) 텍스트 — 글자를 한 자씩 감싸 플랫 색 · 회전 · 미세 오프셋을 준다.
// '폰트'가 아니라 '배치'로 오려붙인 느낌을 내므로 한글·中文·Español 어디서나 작동한다.
// (손으로 오린 레터폼 폰트는 다국어를 커버하지 못해서 이 방식을 택함)
// 모든 값은 인덱스 기반 결정론적 — SSR/CSR 하이드레이션 불일치가 없다.

const CUT_COLORS = [
  "#6FB8E8", // 스카이
  "#B79CE0", // 라벤더
  "#8FBF6A", // 민트그린
  "#F2C94C", // 머스터드
  "#F4A6C0", // 핑크
  "#EE7752", // 코랄
];

const ROT = [-5, 3, -2, 6, -4, 2, 5, -3, 4, -6];
const DY = [0, -4, 3, -2, 4, -3, 1, -1];

export default function CutoutText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const chars = [...text];
  return (
    <span className={className}>
      {/* 스크린리더용 원문 (장식 글자는 aria-hidden) */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((ch, i) =>
          ch === " " ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span
              key={i}
              className="inline-block"
              style={{
                color: CUT_COLORS[(i * 5 + 2) % CUT_COLORS.length],
                transform: `rotate(${ROT[i % ROT.length]}deg) translateY(${DY[i % DY.length]}px)`,
                // 종이가 살짝 들린 느낌
                filter: "drop-shadow(0 3px 0 rgba(43,42,40,0.18))",
              }}
            >
              {ch}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

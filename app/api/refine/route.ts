// POST /api/refine — 사용자가 쓴 글을 "대신 쓰지 않고" 조심스럽게 다듬는다.
// 철학: AI가 지어내는 게 아니라, 아이의 말·작가의 생각을 그대로 보존한 채
// 맞춤법과 문장 호흡만 도록 편집자처럼 정리한다. (원문에 없는 사실 추가 금지)
// GET  — { enabled }: 키가 설정돼 있는지. 클라이언트는 이걸로 버튼 노출을 결정한다.
// 요청: { text, kind: "work" | "about" | "tagline" }  응답: { refined }

import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const enabled = () => Boolean(process.env.ANTHROPIC_API_KEY);

export async function GET() {
  return Response.json({ enabled: enabled() });
}

// kind별 맥락 — 어떤 자리에 걸릴 글인지 알려줘 다듬는 결이 달라지게 한다.
const KIND_CONTEXT: Record<string, string> = {
  work: "작품 옆에 걸리는 작품 소개입니다. 아이가 한 말이 담겨 있다면 그 말이 이 글의 중심입니다.",
  about:
    "전시 페이지의 작가 소개입니다. 원문이 여러 문장이면 문장 수를 그대로 유지하세요. 절대 요약하지 마세요.",
  tagline: "전시를 여는 한 줄 소개입니다. 반드시 한 문장으로 유지하세요.",
};

const SYSTEM = `당신은 어린이와 아마추어 작가의 전시 도록을 만드는 편집자입니다.
글쓴이가 직접 쓴 문장을 전시에 걸 수 있도록, 아주 조심스럽게만 손봅니다.

가장 중요한 원칙: 이 글의 주인은 글쓴이입니다. 당신은 대신 쓰지 않습니다.

반드시 지킬 것:
- 아이가 한 말은 단어 하나도 바꾸지 않고 그대로 둡니다. 따옴표로 묶인 말, 그리고 '~대요 / ~래요 / ~다고 해요'처럼 아이의 말을 전한 부분이 여기 해당합니다. 이 부분이 글에서 가장 소중합니다.
- 아이가 지은 이름과 아이다운 표현(꼬불꼬불, 씽씽, 아주아주)은 고치지 않습니다. 더 근사한 낱말로 바꾸지 않습니다.
- 글쓴이가 고른 단어를 유의어로 바꾸지 않습니다. 원문에 없던 문학적·전시 도록투 표현을 새로 넣지 않습니다.
- 원문에 없는 사실·감정·장면을 지어내지 않습니다.
- 문장 수와 길이를 원문 그대로 유지합니다. 요약하지도, 늘리지도 않습니다.
- 말투는 원문을 따릅니다. 판단이 어려우면 부드러운 '~해요'체.

할 일은 이것뿐입니다:
- 맞춤법과 띄어쓰기를 바로잡습니다.
- 한 문장이 너무 길면 마침표로 끊고, 조사와 연결어미를 자연스럽게 다듬습니다.
- 이미 자연스러운 글이면 손대지 말고 그대로 돌려줍니다. 바꿀 것이 없는데 억지로 바꾸지 마세요.

출력: 다듬은 문장만. 따옴표·설명·인사말을 붙이지 않습니다.`;

export async function POST(request: Request) {
  if (!enabled()) {
    return Response.json(
      { error: "다듬기 기능이 아직 설정되지 않았어요." },
      { status: 503 },
    );
  }

  let body: { text?: string; kind?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (text.length < 2) {
    return Response.json({ error: "다듬을 글이 너무 짧아요." }, { status: 400 });
  }
  if (text.length > 600) {
    return Response.json({ error: "글이 너무 길어요. (600자까지)" }, { status: 400 });
  }
  const context = KIND_CONTEXT[body.kind ?? ""] ?? KIND_CONTEXT.work;

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-5",
      // 문장 수를 보존하므로 긴 작가 소개도 잘리지 않게 넉넉히
      max_tokens: 1000,
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: [
        { role: "user", content: `${context}\n\n원문:\n${text}` },
      ],
    });

    const refined = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!refined) {
      return Response.json(
        { error: "다듬은 결과를 받지 못했어요. 다시 시도해 주세요." },
        { status: 502 },
      );
    }
    return Response.json({ refined });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/refine] 실패:", message);
    return Response.json(
      { error: "지금은 다듬기를 쓸 수 없어요. 잠시 후 다시 시도해 주세요." },
      { status: 502 },
    );
  }
}

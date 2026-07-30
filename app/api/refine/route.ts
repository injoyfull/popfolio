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
  work: "작품 옆에 걸리는 짧은 작품 소개(작가의 말)입니다.",
  about: "전시 페이지의 작가 소개입니다.",
  tagline: "전시를 여는 한 줄 소개입니다. 반드시 한 문장으로 유지하세요.",
};

const SYSTEM = `당신은 어린이·아마추어 작가의 전시 도록을 만드는 편집자입니다.
사용자가 쓴 글을 전시에 걸 수 있도록 아주 조심스럽게만 다듬습니다.

규칙:
- 원문에 없는 사실·감정·꾸밈을 새로 지어내지 않습니다.
- 글쓴이(특히 아이)의 단어와 시선을 최대한 그대로 살립니다. 아이다운 표현("꼬불꼬불", 아이가 지은 이름 등)은 고치지 말고 남깁니다.
- 맞춤법, 띄어쓰기, 문장 호흡만 자연스럽게 정리합니다.
- 길이는 원문과 비슷하게. 최대 2문장.
- 말투는 원문을 따르되, 애매하면 부드러운 '~해요'체.
- 이미 자연스러운 글이라면 거의 그대로 돌려줍니다.
- 다듬은 문장만 출력합니다. 따옴표·설명·인사말을 붙이지 않습니다.`;

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
      max_tokens: 300,
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

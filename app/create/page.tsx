"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MOOD_LIST, COMING_MOODS, DEFAULT_MOOD } from "@/lib/moods";
import { STYLE_LIST, COMING_STYLES, DEFAULT_STYLE } from "@/lib/styles";
import { prepareImage } from "@/lib/image-client";
import BrandPage from "@/components/brand/BrandPage";
import type { MoodId, StyleId, Portfolio } from "@/lib/types";

interface Draft {
  key: string;
  blob: Blob;
  name: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

let draftSeq = 0;

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(""); // 전시명 (큰 타이틀)
  const [childName, setChildName] = useState(""); // 아이 이름 (작가)
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [mood, setMood] = useState<MoodId>(DEFAULT_MOOD);
  const [styleId, setStyleId] = useState<StyleId>(DEFAULT_STYLE);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const [preparing, setPreparing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [dragging, setDragging] = useState(false);

  // 드래그 앤 드롭 — 파일 대화상자(사진 보관함에서 Open 비활성 이슈)를 우회해
  // 사진 앱·폴더에서 바로 끌어다 놓을 수 있게 한다.
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }
  function onDragLeave() {
    setDragging(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  // 미리보기 — 지금 입력·업로드한 것들로 결과 페이지(Portfolio)를 임시 조립.
  // 이미지 blob의 objectURL을 그대로 쓰므로 서버 없이 즉시 렌더된다.
  const previewPortfolio: Portfolio | null = useMemo(() => {
    if (!preview) return null;
    return {
      id: "preview",
      createdAt: new Date().toISOString(),
      brand: {
        name: name.trim() || "우리 아이 전시",
        childName: childName.trim() || undefined,
        tagline: tagline.trim(),
        about: about.trim(),
      },
      mood,
      style: styleId,
      items: drafts.map((d, i) => ({
        id: d.key,
        image: d.url,
        title: d.title.trim() || undefined,
        description: d.description.trim() || undefined,
        category: d.category.trim() || undefined,
        order: i,
      })),
    };
  }, [preview, name, childName, tagline, about, mood, styleId, drafts]);

  // 미리보기 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = preview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preview]);

  // 예시 칩에 작가 이름을 끼워 넣어 "내 이야기"처럼 보이게
  const exBase = childName.trim() || "워니";

  // 이미 입력된 카테고리들 (빠른 재사용용 datalist)
  const usedCategories = useMemo(() => {
    const set = new Set<string>();
    for (const d of drafts) {
      const c = d.category.trim();
      if (c) set.add(c);
    }
    return [...set];
  }, [drafts]);

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (imageFiles.length === 0) return;

    setError(null);
    setPreparing(true);
    try {
      const prepared = await Promise.all(
        imageFiles.map(async (file) => {
          const p = await prepareImage(file);
          return {
            key: `d${draftSeq++}`,
            blob: p.blob,
            name: p.name,
            url: p.previewUrl,
            title: "",
            description: "",
            category: "",
          } satisfies Draft;
        }),
      );
      setDrafts((prev) => [...prev, ...prepared]);
    } catch {
      setError("이미지를 처리하지 못했어요. 다른 파일로 시도해 주세요.");
    } finally {
      setPreparing(false);
    }
  }

  function removeDraft(key: string) {
    setDrafts((prev) => {
      const target = prev.find((d) => d.key === key);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((d) => d.key !== key);
    });
  }

  function move(key: string, dir: -1 | 1) {
    setDrafts((prev) => {
      const i = prev.findIndex((d) => d.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  function patch(
    key: string,
    field: "title" | "description" | "category",
    value: string,
  ) {
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, [field]: value } : d)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("전시공간 이름을 적어주세요.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("childName", childName.trim());
      fd.append("tagline", tagline.trim());
      fd.append("about", about.trim());
      fd.append("mood", mood);
      fd.append("style", styleId);
      for (const d of drafts) {
        fd.append("image", d.blob, d.name);
        fd.append("title", d.title);
        fd.append("description", d.description);
        fd.append("category", d.category);
      }
      const res = await fetch("/api/portfolios", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "저장에 실패했어요. 다시 시도해 주세요.");
      }
      const { id, editKey } = await res.json();
      const suffix = editKey ? `?created=1&k=${encodeURIComponent(editKey)}` : "";
      router.push(`/p/${id}${suffix}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류예요.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <Link href="/" className="font-bold tracking-tight">
          Popfolio
        </Link>
        <span className="text-sm text-neutral-400">우리 아이 전시 만들기</span>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl px-6 py-10 sm:py-14"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          작품 몇 개랑, 몇 마디만.
        </h1>
        <p className="mt-2 text-neutral-500">
          나머지 근사하게 세우는 건 Popfolio가 알아서 할게요.
        </p>

        {/* 기본 정보 */}
        <section className="mt-10 space-y-6">
          <Field label="작가 이름 · Artist">
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="예: 워니 — 우리 아이가 이 전시의 작가예요"
              className="pf-input"
            />
          </Field>

          <Field label="전시공간 · Space" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 거꾸로방 · 꼬마 미술관"
              className="pf-input"
            />
            <span className="mt-1.5 block text-xs text-neutral-400">
              우리 아이 전시가 열리는 공간의 이름 — 페이지 맨 위에 큰 제목으로
              걸려요.
            </span>
            <ExampleChips
              examples={[
                `${exBase}의 아트룸`,
                `${exBase}의 그림창고`,
                "꼬마 미술관",
                "우리집 거실 갤러리",
              ]}
              onPick={setName}
            />
          </Field>

          <Field label="한 줄 소개 · 컨셉">
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="예: 여섯 살의 눈으로 본 세상"
              className="pf-input"
            />
            <ExampleChips
              examples={[
                "여섯 살의 눈으로 본 세상",
                "공룡을 사랑하는 꼬마 화가의 기록",
                "냉장고 문에서 옮겨 온 첫 전시",
                "매일 조금씩 자라는 그림들",
              ]}
              onPick={setTagline}
            />
          </Field>

          <Field label="작가 소개 · About (몇 살, 뭘 좋아하는지)">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="예: 말보다 그림이 빠른 아이예요. 색칠과 찰흙놀이를 제일 좋아해요."
              className="pf-input resize-y"
            />
            <ExampleChips
              examples={[
                `안녕하세요, ${exBase}의 작품 전시예요. 색칠과 찰흙놀이를 제일 좋아해요.`,
                "말보다 그림이 빠른 아이. 매일 식탁에서 한 점씩 자라요.",
                "요즘은 온통 공룡 그리기. 다섯 살부터의 그림을 모았어요.",
              ]}
              onPick={setAbout}
            />
          </Field>
        </section>

        {/* 스타일(레이아웃) — 작품이 한 화면에 어떻게 담기는가 */}
        <section className="mt-10">
          <p className="text-sm font-medium text-neutral-700">
            스타일 · Style
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            작품이 화면에 어떻게 담길지 골라요. 색감과 자유롭게 조합돼요.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {STYLE_LIST.map((s) => {
              const selected = s.id === styleId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyleId(s.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-neutral-900 ring-2 ring-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span className="block text-sm font-bold">{s.ko}</span>
                  <span className="block text-xs font-medium text-neutral-400">
                    {s.en}
                  </span>
                  <span className="mt-1.5 block break-keep text-xs leading-snug text-neutral-500">
                    {s.desc}
                  </span>
                </button>
              );
            })}
            {COMING_STYLES.map((s) => (
              <div
                key={s.en}
                className="rounded-xl border border-dashed border-neutral-200 p-3 opacity-55"
              >
                <span className="block text-sm font-bold">{s.ko}</span>
                <span className="block text-xs font-medium text-neutral-400">
                  {s.en}
                </span>
                <span className="mt-1.5 block text-xs text-neutral-400">
                  준비 중 · Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 색감(팔레트) */}
        <section className="mt-10">
          <p className="text-sm font-medium text-neutral-700">색감 · Color</p>
          <p className="mt-1 text-sm text-neutral-400">
            언제든 바꿀 수 있어요. 기본은 모던.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MOOD_LIST.map((m) => {
              const selected = m.id === mood;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-neutral-900 ring-2 ring-neutral-900"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span className="flex gap-1">
                    <Swatch color={m.tokens.bg} />
                    <Swatch color={m.tokens.accent} />
                    <Swatch color={m.tokens.ink} />
                  </span>
                  <span className="mt-2 block text-sm font-semibold">
                    {m.label}
                  </span>
                </button>
              );
            })}
            {COMING_MOODS.map((c) => (
              <div
                key={c.en}
                className="rounded-xl border border-dashed border-neutral-200 p-3 opacity-55"
              >
                <span className="flex gap-1">
                  {c.dots.map((d) => (
                    <Swatch key={d} color={d} />
                  ))}
                </span>
                <span className="mt-2 block text-sm font-semibold">
                  {c.ko}{" "}
                  <span className="font-medium text-neutral-400">{c.en}</span>
                </span>
                <span className="mt-0.5 block text-xs text-neutral-400">
                  준비 중 · Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 작업 */}
        <section
          className="mt-10"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700">
              작품 ({drafts.length})
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={preparing}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50"
            >
              {preparing ? "처리 중…" : "+ 이미지 추가"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            큰 사진도 괜찮아요 — 올리기 전에 자동으로 알맞게 줄여요. 사진 앱이나
            폴더에서 <span className="font-medium">끌어다 놓아도</span> 돼요.
          </p>

          {drafts.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={preparing}
              className={`mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition disabled:opacity-60 ${
                dragging
                  ? "border-neutral-700 bg-neutral-100 text-neutral-600"
                  : "border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500"
              }`}
            >
              <span className="text-3xl">＋</span>
              <span className="mt-2 text-sm">
                {preparing
                  ? "이미지 처리 중…"
                  : dragging
                    ? "여기에 놓으면 올라가요!"
                    : "아이 작품 사진을 올리거나, 여기로 끌어다 놓으세요"}
              </span>
            </button>
          ) : (
            <ul className="mt-4 space-y-3">
              {drafts.map((d, i) => (
                <li
                  key={d.key}
                  className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.url}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-2">
                    <input
                      value={d.title}
                      onChange={(e) => patch(d.key, "title", e.target.value)}
                      placeholder="작품 제목 (예: 오늘의 낙서)"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm font-semibold outline-none focus:border-neutral-500"
                    />
                    <input
                      value={d.description}
                      onChange={(e) =>
                        patch(d.key, "description", e.target.value)
                      }
                      placeholder="짧은 소개 (예: 매일 한 장씩 그려요)"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
                    />
                    <input
                      value={d.category}
                      onChange={(e) => patch(d.key, "category", e.target.value)}
                      placeholder="카테고리 (예: 그림 · 만들기 · 사진)"
                      list="pf-cats"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
                    />
                    <div className="flex items-center gap-1 text-neutral-400">
                      <IconBtn
                        label="위로"
                        disabled={i === 0}
                        onClick={() => move(d.key, -1)}
                      >
                        ↑
                      </IconBtn>
                      <IconBtn
                        label="아래로"
                        disabled={i === drafts.length - 1}
                        onClick={() => move(d.key, 1)}
                      >
                        ↓
                      </IconBtn>
                      <button
                        type="button"
                        onClick={() => removeDraft(d.key)}
                        className="ml-auto text-sm text-neutral-400 hover:text-red-500"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <datalist id="pf-cats">
            {usedCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </section>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={submitting || preparing}
            className="rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
          >
            {submitting ? "전시 여는 중…" : "전시 열기 →"}
          </button>
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-500"
          >
            내 전시 미리보기
          </button>
          <Link
            href={`/p/sample?style=${styleId}&mood=${mood}`}
            className="text-sm text-neutral-400 hover:text-neutral-600"
          >
            이 조합을 샘플로 구경하기
          </Link>
        </div>
      </form>

      {/* 내 전시 미리보기 — 지금 입력·업로드한 것들로 결과 페이지를 그대로 렌더 */}
      {preview && previewPortfolio && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-white">
          <div className="sticky top-0 z-[70] flex items-center justify-between gap-3 bg-neutral-900 px-4 py-2.5 text-white">
            <span className="truncate text-sm">
              미리보기 — 지금 고른 스타일·색감·작품으로 보는 내 전시예요.
              {drafts.length === 0 && " (작품을 올리면 여기서 함께 보여요)"}
            </span>
            <button
              type="button"
              onClick={() => setPreview(false)}
              className="shrink-0 rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold hover:bg-white/10"
            >
              닫고 이어서 만들기 ×
            </button>
          </div>
          <BrandPage portfolio={previewPortfolio} />
        </div>
      )}

      <style jsx global>{`
        .pf-input {
          width: 100%;
          border-radius: 0.6rem;
          border: 1px solid #e5e5e5;
          background: #fff;
          padding: 0.7rem 0.85rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .pf-input:focus {
          border-color: #171717;
        }
        .pf-input::placeholder {
          color: #b5b5b5;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

// 예시 칩 — 누르면 해당 필드가 그 문구로 채워진다("빈칸 공포" 해소용).
// 채운 뒤 자유롭게 고치면 되므로 덮어쓰기로 동작한다.
function ExampleChips({
  examples,
  onPick,
}: {
  examples: string[];
  onPick: (value: string) => void;
}) {
  return (
    <span className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-neutral-400">눌러서 채우기:</span>
      {examples.map((ex) => (
        <button
          key={ex}
          type="button"
          onClick={() => onPick(ex)}
          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-left text-xs leading-snug text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-800"
        >
          {ex}
        </button>
      ))}
    </span>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="h-5 w-5 rounded-full border border-black/10"
      style={{ background: color }}
    />
  );
}

function IconBtn({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

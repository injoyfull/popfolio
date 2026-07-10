"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MOOD_LIST, DEFAULT_MOOD } from "@/lib/moods";
import type { MoodId } from "@/lib/types";

interface Draft {
  key: string;
  file: File;
  url: string;
  caption: string;
}

let draftSeq = 0;

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [mood, setMood] = useState<MoodId>(DEFAULT_MOOD);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const next: Draft[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      next.push({
        key: `d${draftSeq++}`,
        file,
        url: URL.createObjectURL(file),
        caption: "",
      });
    }
    if (next.length) setDrafts((prev) => [...prev, ...next]);
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

  function setCaption(key: string, value: string) {
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, caption: value } : d)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("브랜드(또는 작가) 이름을 적어주세요.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", name.trim());
      fd.append("tagline", tagline.trim());
      fd.append("about", about.trim());
      fd.append("mood", mood);
      for (const d of drafts) {
        fd.append("image", d.file);
        fd.append("caption", d.caption);
      }
      const res = await fetch("/api/portfolios", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "저장에 실패했어요. 다시 시도해 주세요.");
      }
      const { id } = await res.json();
      router.push(`/p/${id}`);
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
        <span className="text-sm text-neutral-400">내 팝업 브랜드 만들기</span>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl px-6 py-10 sm:py-14"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          작업 몇 개랑, 몇 마디만.
        </h1>
        <p className="mt-2 text-neutral-500">
          나머지 근사하게 세우는 건 Popfolio가 알아서 할게요.
        </p>

        {/* 브랜드 정보 */}
        <section className="mt-10 space-y-6">
          <Field label="브랜드 · 작가 이름" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: Studio Yeeun"
              className="pf-input"
            />
          </Field>

          <Field label="한 줄 소개 · 컨셉">
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="예: 색과 형태로 감정을 번역하는 그래픽 스튜디오"
              className="pf-input"
            />
          </Field>

          <Field label="뭐 하는 사람인지 (짧은 소개)">
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="안녕하세요, 그래픽 디자이너 이예은입니다. 포스터와 타이포그래피를 주로 다뤄요."
              className="pf-input resize-y"
            />
          </Field>
        </section>

        {/* 무드 */}
        <section className="mt-10">
          <p className="text-sm font-medium text-neutral-700">분위기</p>
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
          </div>
        </section>

        {/* 작업 */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700">
              작업 ({drafts.length})
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100"
            >
              + 이미지 추가
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

          {drafts.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 py-12 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500"
            >
              <span className="text-3xl">＋</span>
              <span className="mt-2 text-sm">작업 이미지를 올려보세요</span>
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
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <input
                      value={d.caption}
                      onChange={(e) => setCaption(d.key, e.target.value)}
                      placeholder="이 작업 설명 (선택)"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
                    />
                    <div className="mt-2 flex items-center gap-1 text-neutral-400">
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
        </section>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-10 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
          >
            {submitting ? "세우는 중…" : "내 브랜드 세우기 →"}
          </button>
          <Link
            href="/p/sample"
            className="text-sm text-neutral-400 hover:text-neutral-600"
          >
            샘플 먼저 보기
          </Link>
        </div>
      </form>

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

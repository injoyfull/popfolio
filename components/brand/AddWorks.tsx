"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { prepareImage } from "@/lib/image-client";

interface Draft {
  key: string;
  blob: Blob;
  name: string;
  url: string;
  caption: string;
  category: string;
}

let seq = 0;

// 편집키로 기존 아카이브에 작품을 이어 올리는 폼.
export default function AddWorks({
  id,
  editKey,
  brandName,
  existingCategories,
}: {
  id: string;
  editKey: string;
  brandName: string;
  existingCategories: string[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [preparing, setPreparing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(existingCategories);
    for (const d of drafts) if (d.category.trim()) set.add(d.category.trim());
    return [...set];
  }, [drafts, existingCategories]);

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imgs.length) return;
    setError(null);
    setPreparing(true);
    try {
      const prepared = await Promise.all(
        imgs.map(async (file) => {
          const p = await prepareImage(file);
          return {
            key: `d${seq++}`,
            blob: p.blob,
            name: p.name,
            url: p.previewUrl,
            caption: "",
            category: "",
          } satisfies Draft;
        }),
      );
      setDrafts((prev) => [...prev, ...prepared]);
    } catch {
      setError("이미지를 처리하지 못했어요.");
    } finally {
      setPreparing(false);
    }
  }

  function patch(key: string, field: "caption" | "category", value: string) {
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, [field]: value } : d)),
    );
  }

  function remove(key: string) {
    setDrafts((prev) => {
      const t = prev.find((d) => d.key === key);
      if (t) URL.revokeObjectURL(t.url);
      return prev.filter((d) => d.key !== key);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (drafts.length === 0) {
      setError("추가할 작품을 한 개 이상 올려주세요.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("key", editKey);
      for (const d of drafts) {
        fd.append("image", d.blob, d.name);
        fd.append("caption", d.caption);
        fd.append("category", d.category);
      }
      const res = await fetch(`/api/portfolios/${id}/works`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "추가에 실패했어요.");
      }
      router.push(`/p/${id}?k=${encodeURIComponent(editKey)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류예요.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <Link href={`/p/${id}?k=${encodeURIComponent(editKey)}`} className="font-bold tracking-tight">
          ← {brandName}
        </Link>
        <span className="text-sm text-neutral-400">작품 이어 올리기</span>
      </header>

      <form onSubmit={submit} className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          작품을 이어서 쌓아요.
        </h1>
        <p className="mt-2 text-neutral-500">
          오늘의 작업을 올리면 아카이브에 더해져요.
        </p>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-700">
              추가할 작품 ({drafts.length})
            </p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={preparing}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 disabled:opacity-50"
            >
              {preparing ? "처리 중…" : "+ 이미지 추가"}
            </button>
            <input
              ref={fileRef}
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
            큰 사진도 괜찮아요 — 올리기 전에 자동으로 알맞게 줄여요.
          </p>

          {drafts.length === 0 ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={preparing}
              className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 py-12 text-neutral-400 hover:border-neutral-400 disabled:opacity-60"
            >
              <span className="text-3xl">＋</span>
              <span className="mt-2 text-sm">
                {preparing ? "이미지 처리 중…" : "작업 사진을 올려보세요"}
              </span>
            </button>
          ) : (
            <ul className="mt-4 space-y-3">
              {drafts.map((d) => (
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
                      value={d.category}
                      onChange={(e) => patch(d.key, "category", e.target.value)}
                      placeholder="카테고리 (예: 드로잉 · 만들기 · 사진)"
                      list="pf-cats-add"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm font-medium outline-none focus:border-neutral-500"
                    />
                    <input
                      value={d.caption}
                      onChange={(e) => patch(d.key, "caption", e.target.value)}
                      placeholder="이 작업 설명 (선택)"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
                    />
                    <button
                      type="button"
                      onClick={() => remove(d.key)}
                      className="self-start text-sm text-neutral-400 hover:text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <datalist id="pf-cats-add">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </section>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-10 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || preparing}
            className="rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700 disabled:opacity-50"
          >
            {submitting ? "올리는 중…" : "아카이브에 더하기 →"}
          </button>
          <Link
            href={`/p/${id}?k=${encodeURIComponent(editKey)}`}
            className="text-sm text-neutral-400 hover:text-neutral-600"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

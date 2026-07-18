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
  title: string;
  description: string;
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
  const [dragging, setDragging] = useState(false);

  // 드래그 앤 드롭 — 사진 앱·폴더에서 바로 끌어다 놓기 (파일 대화상자 우회)
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

  const categories = useMemo(() => {
    const set = new Set(existingCategories);
    for (const d of drafts) if (d.category.trim()) set.add(d.category.trim());
    return [...set];
  }, [drafts, existingCategories]);

  // 눌러서 고르는 묶음 — 이 전시에 이미 있는 묶음을 앞에, 없으면 기본 묶음을 채운다.
  const categoryOptions = useMemo(() => {
    const base = ["그림", "만들기", "사진", "오려붙이기", "글씨"];
    const merged = [...existingCategories];
    for (const b of base) if (!merged.includes(b)) merged.push(b);
    return merged.slice(0, 6);
  }, [existingCategories]);

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
            title: "",
            description: "",
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

  function patch(
    key: string,
    field: "title" | "description" | "category",
    value: string,
  ) {
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
        fd.append("title", d.title);
        fd.append("description", d.description);
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

        <section
          className="mt-8"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
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
            큰 사진도 괜찮아요 — 올리기 전에 자동으로 알맞게 줄여요. 사진 앱이나
            폴더에서 끌어다 놓아도 돼요.
          </p>

          {drafts.length === 0 ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={preparing}
              className={`mt-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition disabled:opacity-60 ${
                dragging
                  ? "border-neutral-700 bg-neutral-100 text-neutral-600"
                  : "border-neutral-300 text-neutral-400 hover:border-neutral-400"
              }`}
            >
              <span className="text-3xl">＋</span>
              <span className="mt-2 text-sm">
                {preparing
                  ? "이미지 처리 중…"
                  : dragging
                    ? "여기에 놓으면 올라가요!"
                    : "작품 사진을 올리거나, 여기로 끌어다 놓으세요"}
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
                      placeholder="이 작품에 담긴 이야기 (예: 비 온 뒤 숲이 제일 예쁘대요)"
                      className="w-full rounded-md border border-neutral-200 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
                    />

                    {/* 카테고리 — 눌러서 고르기. 기존 묶음이 있으면 그것부터 보여준다. */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-neutral-400">묶음:</span>
                      {categoryOptions.map((c) => {
                        const on = d.category.trim() === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() =>
                              patch(d.key, "category", on ? "" : c)
                            }
                            className={`rounded-full border px-2.5 py-1 text-xs transition ${
                              on
                                ? "border-neutral-900 bg-neutral-900 font-semibold text-white"
                                : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-400"
                            }`}
                          >
                            {c}
                          </button>
                        );
                      })}
                      <input
                        value={
                          categoryOptions.includes(d.category.trim())
                            ? ""
                            : d.category
                        }
                        onChange={(e) =>
                          patch(d.key, "category", e.target.value)
                        }
                        placeholder="직접 입력"
                        list="pf-cats-add"
                        className="w-24 rounded-full border border-dashed border-neutral-300 px-2.5 py-1 text-xs outline-none focus:border-neutral-500"
                      />
                    </div>
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

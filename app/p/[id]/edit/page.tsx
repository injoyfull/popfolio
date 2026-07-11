import Link from "next/link";
import { notFound } from "next/navigation";
import AddWorks from "@/components/brand/AddWorks";
import { getPortfolio } from "@/lib/storage";
import { DEFAULT_CATEGORY } from "@/lib/types";

// /p/{id}/edit?k=... — 편집키가 맞아야 '작품 이어 올리기' 폼을 보여준다.
export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const { id } = await params;
  const { k } = await searchParams;

  const portfolio = await getPortfolio(id);
  if (!portfolio) notFound();

  const authorized = !!(k && portfolio.editKey && k === portfolio.editKey);
  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50 px-6 text-center text-neutral-900">
        <p className="text-lg font-bold">편집 링크가 올바르지 않아요</p>
        <p className="max-w-sm text-sm text-neutral-500">
          작품을 이어 올리려면 만들 때 받은 <b>편집 링크</b>가 필요해요. 링크를
          다시 확인해 주세요.
        </p>
        <Link
          href={`/p/${id}`}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
        >
          아카이브 보기
        </Link>
      </div>
    );
  }

  const existingCategories = [
    ...new Set(
      portfolio.items.map((it) => it.category?.trim() || DEFAULT_CATEGORY),
    ),
  ];

  return (
    <AddWorks
      id={id}
      editKey={k!}
      brandName={portfolio.brand.name}
      existingCategories={existingCategories}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { toBn } from "@/lib/format";
import type { Category } from "@/lib/types";
import { ProductGridSkeleton } from "@/components/ProductGrid";
import SortableProducts from "@/components/SortableProducts";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

async function findCategory(slug: string): Promise<Category | undefined> {
  return CATEGORIES.find((c) => c.slug === slug) ?? (await getCategories()).find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(slug);
  return { title: category ? `${category.nameBn} — আজকের দাম` : "পেজ পাওয়া যায়নি" };
}

function CategoryHeader({ category, count }: { category: Category; count?: number }) {
  return (
    <header className="surface flex items-center gap-4 p-5 sm:p-6">
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-slate-100 text-3xl" aria-hidden="true">
        {category.icon}
      </span>
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{category.nameBn}</h1>
        {count === undefined ? (
          <div className="skeleton mt-2 h-4 w-52" />
        ) : (
          <p className="text-sm text-slate-500">{toBn(count)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        )}
      </div>
    </header>
  );
}

async function CategoryContent({ category }: { category: Category }) {
  const all = await getProducts();
  const products = all.filter((p) => p.category === category.slug);
  return (
    <>
      <CategoryHeader category={category} count={products.length} />
      <SortableProducts products={products} />
    </>
  );
}

function CategorySkeleton({ category }: { category: Category }) {
  return (
    <div role="status" aria-label="পণ্যের তালিকা লোড হচ্ছে">
      <CategoryHeader category={category} />
      <div className="surface mt-4 flex items-center justify-end gap-3 p-4">
        <div className="skeleton h-4 w-14" />
        <div className="skeleton h-10 w-40 rounded-lg" />
      </div>
      <div className="skeleton mb-3 mt-4 h-4 w-48" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = await findCategory(slug);
  if (!category) notFound();

  return (
    <Suspense fallback={<CategorySkeleton category={category} />}>
      <CategoryContent category={category} />
    </Suspense>
  );
}

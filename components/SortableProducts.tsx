"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/format";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";
import StateMessage from "./StateMessage";

type SortKey = "default" | "asc" | "desc";

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  // Prices are numbers, so the sort is numeric (never string based on Bengali digits).
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const copy = [...products];
    copy.sort((a, b) => (sort === "asc" ? a.today - b.today : b.today - a.today));
    return copy;
  }, [products, sort]);

  if (!products.length) {
    return (
      <StateMessage
        code="০"
        title="এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই"
        message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <>
      <div className="surface mt-4 flex items-center justify-end gap-3 p-3 sm:p-4">
        <label htmlFor="sort" className="text-sm font-medium text-base-content/70">
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 min-w-40 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 py-0 pl-3 pr-9 text-sm font-medium text-base-content outline-none transition hover:border-base-content/30 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-base-content/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 8 5 5 5-5" />
          </svg>
        </div>
      </div>

      <p className="mb-3 mt-4 text-sm text-base-content/60" aria-live="polite">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sorted} />
    </>
  );
}

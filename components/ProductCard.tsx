import Link from "next/link";
import { formatPrice, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="surface group block p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl transition group-hover:bg-brand-50"
          aria-hidden="true"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="break-words font-bold leading-snug text-base-content">{product.nameBn}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(product.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-extrabold text-base-content">{formatPrice(product.today)}</p>
        </div>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="surface p-4" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-5 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

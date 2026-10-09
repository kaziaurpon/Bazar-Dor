import { getProducts } from "@/lib/api";
import { changeText, changeTone, formatNumber, unitShort } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerRow({ products, hidden = false }: { products: Product[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {products.map((p) => (
        <li
          key={p.id}
          className="flex items-center gap-1.5 whitespace-nowrap border-r border-slate-200 px-5 text-[13px] text-slate-700"
        >
          <span aria-hidden="true">{p.image}</span>
          <span className="font-semibold text-slate-900">{p.nameBn}</span>
          <span>
            {formatNumber(p.today)} টাকা/{unitShort(p.unit)}
          </span>
          <span className={`font-bold ${changeTone(p.change.dir).text}`}>
            {changeText(p.change.dir, p.change.pct)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function Ticker() {
  let products: Product[];
  try {
    products = await getProducts();
  } catch {
    return null; // the strip is decorative — never break the page because of it
  }
  if (!products.length) return null;

  return (
    <div className="ticker overflow-hidden border-b border-slate-200/80 bg-white/70 py-2" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track">
        <TickerRow products={products} />
        <TickerRow products={products} hidden />
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="border-b border-slate-200/80 bg-white/70 py-2" aria-hidden="true">
      <div className="skeleton mx-4 h-5 rounded-full" />
    </div>
  );
}

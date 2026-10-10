import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import {
  formatAvg,
  formatNumber,
  formatPrice,
  marketAvg,
  priceStats,
  toBn,
  unitLabel,
  unitShort,
} from "@/lib/format";
import { requireUser } from "@/lib/session";
import ChangeBadge from "@/components/ChangeBadge";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  return { title: product ? `${product.nameBn} — আজকের দাম` : "পেজ পাওয়া যায়নি" };
}

function summaryLine(today: number, yesterday: number) {
  const diff = today - yesterday;
  if (diff > 0) return { before: "গতকালের তুলনায় আজ দাম ", amount: `${formatNumber(diff)} টাকা`, after: " বেড়েছে" };
  if (diff < 0) return { before: "গতকালের তুলনায় আজ দাম ", amount: `${formatNumber(Math.abs(diff))} টাকা`, after: " কমেছে" };
  return { before: "গতকালের তুলনায় আজ দামে ", amount: "কোনো পরিবর্তন", after: " নেই" };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  // Protected route: signed-out visitors are sent to /signin (with a toast).
  await requireUser(`/product/${slug}`);

  const stats = priceStats(product);
  const line = summaryLine(product.today, product.yesterday);
  const unit = unitLabel(product.unit);

  return (
    <div className="mx-auto max-w-4xl">
      <nav aria-label="breadcrumb" className="mb-4 text-sm text-base-content/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-brand-700 hover:underline">হোম</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href={`/category/${product.category}`} className="hover:text-brand-700 hover:underline">
              {product.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-base-content/80">{product.nameBn}</li>
        </ol>
      </nav>

      {/* Top summary */}
      <section className="surface p-5 sm:p-6" aria-labelledby="product-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl sm:size-20 sm:text-5xl" aria-hidden="true">
              {product.image}
            </span>
            <div className="min-w-0">
              <h1 id="product-title" className="text-2xl font-extrabold leading-tight text-base-content sm:text-3xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm text-base-content/60">
                {unit} · {product.categoryNameBn}
              </p>
              <p className="mt-2 text-sm text-base-content/70">
                {line.before}
                <strong className="text-base-content">{line.amount}</strong>
                {line.after}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content/70">{unit}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-brand-50/60 px-6 py-4 text-center sm:min-w-44">
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-4xl font-extrabold leading-tight text-base-content">{formatNumber(product.today)}</p>
            <p className="text-xs text-base-content/60">টাকা / {unitShort(product.unit)}</p>
            <ChangeBadge dir={product.change.dir} pct={product.change.pct} className="mt-2" />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="surface mt-5 p-5 sm:p-6" aria-labelledby="price-summary">
        <h2 id="price-summary" className="text-lg font-bold text-base-content">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-success">{formatPrice(stats.min)}</p>
            <p className="mt-1 text-xs text-base-content/60">
              {stats.lowest ? `সবচেয়ে কম দাম: ${stats.lowest.market}` : "সবচেয়ে কম দাম"}
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs text-base-content/60">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-error">{formatPrice(stats.max)}</p>
            <p className="mt-1 text-xs text-base-content/60">
              {stats.highest ? `সবচেয়ে বেশি দাম: ${stats.highest.market}` : "সবচেয়ে বেশি দাম"}
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs text-base-content/60">গড় দাম</p>
            <p className="mt-1 text-2xl font-extrabold text-base-content">{formatPrice(stats.avg)}</p>
            <p className="mt-1 text-xs text-base-content/60">
              {unit}, {toBn(product.markets.length)}টি বাজারের গড়
            </p>
          </div>
        </div>
      </section>

      {/* Market wise prices */}
      <section className="surface mt-5 p-5 sm:p-6" aria-labelledby="market-prices">
        <h2 id="market-prices" className="text-lg font-bold text-base-content">বাজারভিত্তিক আজকের দাম</h2>

        {product.markets.length === 0 ? (
          <p className="mt-4 text-sm text-base-content/60">এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।</p>
        ) : (
          <>
            {/* Tablet / desktop: table */}
            <div className="mt-4 hidden overflow-hidden rounded-xl border border-base-300 sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-base-200/70 text-xs font-semibold text-base-content/60">
                  <tr>
                    <th scope="col" className="px-4 py-3">বাজার</th>
                    <th scope="col" className="px-4 py-3">বিভাগ</th>
                    <th scope="col" className="px-4 py-3 text-right">সর্বনিম্ন</th>
                    <th scope="col" className="px-4 py-3 text-right">সর্বোচ্চ</th>
                    <th scope="col" className="px-4 py-3 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300/60">
                  {product.markets.map((m, i) => (
                    <tr key={`${m.market}-${m.division}-${i}`} className={i % 2 ? "bg-base-200/60" : "bg-base-100"}>
                      <th scope="row" className="px-4 py-3 font-semibold text-base-content">{m.market}</th>
                      <td className="px-4 py-3 text-base-content/70">{m.division}</td>
                      <td className={`px-4 py-3 text-right ${m.min === stats.min ? "font-bold text-success" : "text-base-content/80"}`}>
                        {formatPrice(m.min)}
                      </td>
                      <td className={`px-4 py-3 text-right ${m.max === stats.max ? "font-bold text-error" : "text-base-content/80"}`}>
                        {formatPrice(m.max)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-base-content">{formatAvg(marketAvg(m))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <ul className="mt-4 space-y-3 sm:hidden">
              {product.markets.map((m, i) => (
                <li key={`${m.market}-${m.division}-${i}`} className="rounded-xl border border-base-300 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-base-content">{m.market}</p>
                      <p className="text-xs text-base-content/60">{m.division}</p>
                    </div>
                    <p className="text-sm font-bold text-base-content">{formatAvg(marketAvg(m))}</p>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-base-content/60">সর্বনিম্ন <b className="text-success">{formatPrice(m.min)}</b></span>
                    <span className="text-base-content/60">সর্বোচ্চ <b className="text-error">{formatPrice(m.max)}</b></span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

import { Suspense } from "react";
import { getProducts, topFallers, topRisers } from "@/lib/api";
import { ALL_PRODUCTS_ANCHOR } from "@/lib/constants";
import { changeTone, toBn } from "@/lib/format";
import Hero from "@/components/Hero";
import ProductGrid, { ProductGridSkeleton } from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

async function HomeSections() {
  const products = await getProducts();
  const risers = topRisers(products, 6);
  const fallers = topFallers(products, 6);

  return (
    <>
      <section aria-labelledby="risers" className="mt-10">
        <SectionHeading id="risers" title="আজ দাম বেড়েছে" marker="▲" markerClass={changeTone("up").text} />
        <ProductGrid products={risers} />
      </section>

      <section aria-labelledby="fallers" className="mt-10">
        <SectionHeading id="fallers" title="আজ দাম কমেছে" marker="▼" markerClass={changeTone("down").text} />
        <ProductGrid products={fallers} />
      </section>

      <section id={ALL_PRODUCTS_ANCHOR} aria-labelledby="all-products" className="mt-10 scroll-mt-4">
        <SectionHeading
          id="all-products"
          title="সব পণ্য"
          subtitle={`সব ক্যাটাগরির মোট ${toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
        />
        <ProductGrid products={products} />
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <div className="mt-10 space-y-10" role="status" aria-label="পণ্যের তালিকা লোড হচ্ছে">
      {[0, 1, 2].map((i) => (
        <section key={i}>
          <div className="mb-4 space-y-2">
            <div className="skeleton h-6 w-44" />
            {i === 2 && <div className="skeleton h-4 w-64" />}
          </div>
          <ProductGridSkeleton count={i === 2 ? 9 : 6} />
        </section>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </>
  );
}

import { ALL_PRODUCTS_ANCHOR } from "@/lib/constants";
import { banglaDate } from "@/lib/format";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-50 p-6 sm:p-8 md:p-10"
    >
      <div className="grid items-center gap-6 md:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-700 sm:text-sm">
            {banglaDate()}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-[2.6rem]"
          >
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিশ্লেষণ, গত সপ্তাহের তুলনায়
            পরিবর্তন এবং সহজ তুলনা এক জায়গায়।
          </p>
          <a href={`#${ALL_PRODUCTS_ANCHOR}`} className="btn btn-primary mt-6 px-6 font-semibold shadow-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <HeroIllustration className="w-full max-w-[19rem] md:max-w-sm" />
        </div>
      </div>
    </section>
  );
}

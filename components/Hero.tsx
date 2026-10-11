import { ALL_PRODUCTS_ANCHOR } from "@/lib/constants";
import { banglaDate } from "@/lib/format";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="surface relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-50 px-6 py-8 sm:px-8 sm:py-10 md:min-h-[320px] md:px-12 md:py-10"
    >
      <div className="grid items-center gap-6 md:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="inline-flex rounded-full bg-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-700 sm:text-sm">
            {banglaDate()}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-3xl font-extrabold leading-tight text-base-content sm:text-4xl md:text-[2.25rem] lg:text-[2.5rem]"
          >
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/70 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href={`#${ALL_PRODUCTS_ANCHOR}`} className="btn btn-primary mt-7 px-6 font-semibold shadow-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bazar-hero.png"
            alt="তাজা সবজি ও ফলে ভরা ঝুড়ি"
            width={315}
            height={263}
            className="h-auto w-full max-w-[17rem] md:h-[263px] md:w-[315px] md:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}

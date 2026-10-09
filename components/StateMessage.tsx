import Link from "next/link";

/** 404-style message with a CTA back to the home page. */
export default function StateMessage({
  code = "৪০৪",
  title,
  message,
  ctaHref = "/",
  ctaLabel = "হোম পেজে ফিরে যান",
}: {
  code?: string;
  title: string;
  message: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="surface mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center">
      <p className="text-6xl font-extrabold tracking-tight text-brand-600">{code}</p>
      <h1 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">{message}</p>
      <Link href={ctaHref} className="btn btn-primary mt-6 font-semibold">
        {ctaLabel}
      </Link>
    </div>
  );
}

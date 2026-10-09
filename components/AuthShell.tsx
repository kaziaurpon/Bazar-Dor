import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md py-4 sm:py-8">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="surface p-5 sm:p-7">{children}</div>
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-slate-500 hover:text-brand-700 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export function AuthShellSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md py-8" role="status" aria-label="লোড হচ্ছে">
      <div className="mb-5 flex flex-col items-center gap-2">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-4 w-64" />
      </div>
      <div className="surface space-y-4 p-7">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-11 w-full" />
        <div className="skeleton h-4 w-20" />
        <div className="skeleton h-11 w-full" />
        <div className="skeleton h-11 w-full" />
      </div>
    </div>
  );
}

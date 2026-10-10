"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="surface mx-auto my-6 flex max-w-lg flex-col items-center px-6 py-14 text-center">
      <p className="text-5xl" aria-hidden="true">⚠️</p>
      <h1 className="mt-3 text-xl font-bold text-base-content sm:text-2xl">ডাটা লোড করা যায়নি</h1>
      <p className="mt-2 text-sm text-base-content/60 sm:text-base">
        ইন্টারনেট সংযোগ বা সার্ভারে সাময়িক সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary font-semibold">
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="btn btn-outline font-semibold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

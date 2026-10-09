import type { Metadata } from "next";
import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };
export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const user = await requireUser("/profile/update");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-slate-500">আপনার নাম পরিবর্তন করে সেভ করুন।</p>

      <section className="surface mt-5 p-5 sm:p-6">
        <UpdateProfileForm initialName={user.name} initialImage={user.image ?? ""} />
      </section>

      <p className="mt-5 text-sm">
        <Link href="/profile" className="text-slate-500 hover:text-brand-700 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

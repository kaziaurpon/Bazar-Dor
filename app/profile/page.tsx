import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/Navbar";
import { toBn } from "@/lib/format";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };
export const dynamic = "force-dynamic";

function joinedDate(value: Date | string) {
  const d = new Date(value);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return toBn(`${get("day")}/${get("month")}/${get("year")}`);
}

export default async function ProfilePage() {
  const user = await requireUser("/profile");

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold text-base-content sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য দেখুন ও পরিবর্তন করুন।</p>

      <section className="surface mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={user.name} image={user.image} className="size-16 text-2xl" />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-base-content">{user.name}</p>
            <p className="truncate text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <Link
          href="/profile/update"
          className="btn btn-outline btn-sm sm:btn-md border-error/40 font-semibold text-error hover:border-error hover:bg-error/10 hover:text-error"
        >
          ✎ তথ্য আপডেট করুন
        </Link>
      </section>

      <section className="surface mt-5 p-5">
        <h2 className="text-base font-bold text-base-content">তথ্য</h2>
        <dl className="mt-4 divide-y divide-base-300/60 text-sm">
          <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between">
            <dt className="text-base-content/60">নাম</dt>
            <dd className="font-semibold text-base-content">{user.name}</dd>
          </div>
          <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd className="break-all font-semibold text-base-content">{user.email}</dd>
          </div>
          <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between">
            <dt className="text-base-content/60">যোগদানের তারিখ</dt>
            <dd className="font-semibold text-base-content">{joinedDate(user.createdAt)}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/lib/constants";
import { banglaDate } from "@/lib/format";
import { signOut, useSession } from "@/lib/auth-client";
import LogoMark from "./Logo";

const NAV_ITEMS = CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.nameBn, icon: c.icon }));

function initials(name?: string | null) {
  const trimmed = (name ?? "").trim();
  return trimmed ? Array.from(trimmed)[0].toUpperCase() : "?";
}

export function Avatar({
  name,
  image,
  className = "size-8 text-sm",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={name ?? "প্রোফাইল"} referrerPolicy="no-referrer" className={`${className} rounded-full object-cover`} />;
  }
  return (
    <span className={`${className} grid place-items-center rounded-full bg-brand-100 font-bold text-brand-700`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

function UserMenu({ user }: { user: { name: string; email: string; image?: string | null } }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSignOut() {
    setBusy(true);
    const { error } = await signOut();
    setBusy(false);
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-base-200"
      >
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-[9rem] truncate text-sm font-semibold text-base-content sm:inline">{user.name}</span>
        <svg viewBox="0 0 20 20" className={`size-3.5 text-base-content/45 transition ${open ? "rotate-180" : ""}`} fill="currentColor" aria-hidden="true">
          <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div role="menu" className="surface absolute right-0 z-50 mt-2 w-64 p-3 shadow-xl">
          <div className="px-2 pb-2">
            <p className="truncate text-sm font-bold text-base-content">{user.name}</p>
            <p className="truncate text-xs text-base-content/60">{user.email}</p>
          </div>
          <div className="my-1 border-t border-base-300/60" />
          <Link
            href="/profile"
            role="menuitem"
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-base-content/80 hover:bg-base-200/70"
          >
            <svg viewBox="0 0 24 24" className="size-4 text-base-content/60" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="3.6" />
              <path d="M4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
            </svg>
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={busy}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-error hover:bg-error/10 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
              <path d="M16 8l4 4-4 4M20 12H9" />
            </svg>
            <span>{busy ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function AuthArea() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-full sm:w-40" aria-label="লোড হচ্ছে" />;
  }
  if (data?.user) {
    return <UserMenu user={data.user} />;
  }
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold text-base-content">
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md font-semibold shadow-sm">
        সাইন আপ
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="বাজার দর — হোম পেজ">
            <LogoMark />
            <span className="min-w-0">
  <span className="block text-[18px] font-bold leading-7 tracking-[-0.5px] text-base-content sm:text-[20px]">বাজার দর</span>
  <span className="block truncate text-[11px] leading-4 text-base-content/90 sm:text-xs" suppressHydrationWarning>
                {banglaDate()}
              </span>
            </span>
          </Link>
          <AuthArea />
        </div>

        <nav aria-label="ক্যাটাগরি" className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-3">
          <ul className="flex w-max min-w-full items-center gap-1.5 text-sm">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium transition ${
                      active
                        ? "bg-brand-600 text-white shadow-sm"
                        : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
                    }`}
                  >
                    <span aria-hidden="true" className="text-[13px] leading-none">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

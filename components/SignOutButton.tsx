"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    setBusy(true);
    const { error } = await signOut();
    setBusy(false);
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className="btn btn-outline btn-sm sm:btn-md border-error/40 font-semibold text-error hover:border-error hover:bg-error/10 hover:text-error disabled:opacity-60"
    >
      ↩ {busy ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
    </button>
  );
}

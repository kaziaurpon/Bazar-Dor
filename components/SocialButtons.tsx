"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-3.9 7.2-9.7 7.2-17.4z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [busy, setBusy] = useState<Provider | null>(null);

  async function handle(provider: Provider) {
    setBusy(provider);
    try {
      const { error } = await signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(authErrorMessage(error, "সোশ্যাল লগইন করা যায়নি।"));
        setBusy(null);
      }
      // on success the browser is redirected to the provider
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।");
      setBusy(null);
    }
  }

  const base =
    "btn btn-outline h-11 min-h-11 flex-1 gap-2 border-base-300 bg-base-100 px-3 text-[13px] font-semibold text-base-content hover:border-base-content/30 hover:bg-base-200/70 sm:text-sm";

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <button type="button" className={base} onClick={() => handle("google")} disabled={busy !== null}>
        {busy === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
        <span>Google দিয়ে চালিয়ে যান</span>
      </button>
      <button type="button" className={base} onClick={() => handle("github")} disabled={busy !== null}>
        {busy === "github" ? <span className="loading loading-spinner loading-xs" /> : <GitHubIcon />}
        <span>GitHub দিয়ে চালিয়ে যান</span>
      </button>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs text-base-content/45" aria-hidden="true">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}

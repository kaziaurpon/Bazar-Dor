"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signIn } from "@/lib/auth-client";
import { EMAIL_RE, safeCallback } from "@/lib/validation";
import PasswordInput from "./PasswordInput";
import SocialButtons, { OrDivider } from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackURL = safeCallback(params.get("callbackURL"));
  const redirected = params.get("redirected") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  useEffect(() => {
    if (redirected && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।", { id: "protected-redirect" });
    }
  }, [redirected]);

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email.trim())) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");

    setLoading(true);
    try {
      const { error: authError } = await signIn.email({ email: email.trim(), password });
      if (authError) {
        fail(authErrorMessage(authError));
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে। স্বাগতম!");
      router.push(callbackURL);
      router.refresh();
    } catch {
      fail("সার্ভারের সাথে যোগাযোগ করা যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-base-content/80">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input h-11 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-base-content/80">
            পাসওয়ার্ড
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="কমপক্ষে ৬ অক্ষর"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary h-11 min-h-11 w-full text-base font-semibold shadow-sm">
          {loading && <span className="loading loading-spinner loading-sm" />}
          {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <OrDivider />
      <SocialButtons callbackURL={callbackURL} />

      <p className="mt-5 text-center text-sm text-base-content/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-brand-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}

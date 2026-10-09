"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signUp } from "@/lib/auth-client";
import { EMAIL_RE } from "@/lib/validation";
import PasswordInput from "./PasswordInput";
import SocialButtons, { OrDivider } from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return fail("আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।");
    if (!EMAIL_RE.test(email.trim())) return fail("সঠিক ইমেইল ঠিকানা দিন।");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    try {
      const { error: authError } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (authError) {
        fail(authErrorMessage(authError));
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
      router.push("/signin");
    } catch {
      fail("সার্ভারের সাথে যোগাযোগ করা যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  const label = "mb-1.5 block text-sm font-semibold text-slate-700";

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className={label}>নাম</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার পূর্ণ নাম"
            className="input h-11 w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>ইমেইল</label>
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
          <label htmlFor="password" className={label}>পাসওয়ার্ড</label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="কমপক্ষে ৬ অক্ষর"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirm" className={label}>পাসওয়ার্ড নিশ্চিত করুন</label>
          <PasswordInput
            id="confirm"
            value={confirm}
            onChange={setConfirm}
            placeholder="আবার লিখুন"
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary h-11 min-h-11 w-full text-base font-semibold shadow-sm">
          {loading && <span className="loading loading-spinner loading-sm" />}
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <OrDivider />
      <SocialButtons callbackURL="/" />

      <p className="mt-5 text-center text-sm text-slate-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-brand-700 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}

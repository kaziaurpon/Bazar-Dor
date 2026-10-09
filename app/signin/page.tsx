import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell, { AuthShellSkeleton } from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজারের তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।">
        <SignInForm />
      </AuthShell>
    </Suspense>
  );
}

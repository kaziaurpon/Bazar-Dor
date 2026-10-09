import type { Metadata } from "next";
import AuthShell from "@/components/AuthShell";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="নিচের ফর্মটি পূরণ করে সাইন আপ করুন এবং সব পণ্যের বিস্তারিত দেখুন।">
      <SignUpForm />
    </AuthShell>
  );
}

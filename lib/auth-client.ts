"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;

/** Turn Better Auth error codes into friendly Bangla messages. */
export function authErrorMessage(
  error: { code?: string; message?: string; status?: number } | null | undefined,
  fallback = "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।",
) {
  if (!error) return fallback;
  const code = (error.code ?? "").toUpperCase();
  const map: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।",
    INVALID_PASSWORD: "পাসওয়ার্ড সঠিক নয়।",
    INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
    USER_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি।",
    USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
    PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
    PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
    PROVIDER_NOT_FOUND: "এই সোশ্যাল লগইন এখনো কনফিগার করা হয়নি (.env ফাইলে Client ID/Secret দিন)।",
    SOCIAL_ACCOUNT_ALREADY_LINKED: "এই সোশ্যাল অ্যাকাউন্ট আগেই যুক্ত করা আছে।",
  };
  if (map[code]) return map[code];
  if (error.status === 429) return "অনেকবার চেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন।";
  const msg = (error.message ?? "").toLowerCase();
  if (msg.includes("provider") && msg.includes("not")) return map.PROVIDER_NOT_FOUND;
  return error.message || fallback;
}

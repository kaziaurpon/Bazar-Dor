"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({
  initialName,
  initialImage,
}: {
  initialName: string;
  initialImage: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const trimmed = name.trim();
    const img = image.trim();
    if (trimmed.length < 2) return fail("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (img && !/^https?:\/\/\S+$/i.test(img)) return fail("ছবির লিঙ্কটি http:// বা https:// দিয়ে শুরু হতে হবে।");

    setLoading(true);
    try {
      const { error: updateError } = await updateUser({ name: trimmed, ...(img ? { image: img } : {}) });
      if (updateError) {
        fail(authErrorMessage(updateError, "তথ্য আপডেট করা যায়নি।"));
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      fail("সার্ভারের সাথে যোগাযোগ করা যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
          নাম
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="input h-11 w-full"
        />
      </div>
      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-semibold text-slate-700">
          ছবির লিঙ্ক <span className="font-normal text-slate-400">(ঐচ্ছিক)</span>
        </label>
        <input
          id="image"
          type="url"
          inputMode="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="input h-11 w-full"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary h-11 min-h-11 w-full text-base font-semibold shadow-sm">
        {loading && <span className="loading loading-spinner loading-sm" />}
        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}

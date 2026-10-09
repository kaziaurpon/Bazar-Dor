import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, ensureAuthReady } from "./auth";

/** Current session on the server (null when signed out). */
export const getSession = cache(async () => {
  await ensureAuthReady();
  return auth.api.getSession({ headers: await headers() });
});

/** Protected-route guard: redirects to /signin (with a toast hint) when signed out. */
export async function requireUser(nextPath: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirected=1&callbackURL=${encodeURIComponent(nextPath)}`);
  }
  return session.user;
}

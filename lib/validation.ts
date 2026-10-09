export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Only allow same-site relative paths as post-login redirect targets. */
export function safeCallback(value: string | null | undefined, fallback = "/") {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : fallback;
}

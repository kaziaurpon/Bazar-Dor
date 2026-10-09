import type { Category } from "./types";

/** Live data comes from this API (can be overridden with BAZARDOR_API). */
export const API_BASE =
  process.env.BAZARDOR_API?.replace(/\/$/, "") ??
  "https://api.api-store.workers.dev/api/bazardor";

/** Static copy of the category list — used for the navbar and as an API fallback. */
export const CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

/**
 * In the Figma a rising price is shown in red and a falling price in green
 * (rising prices are bad news for buyers). Set this to `false` to flip it
 * to "green = up, red = down".
 */
export const PRICE_UP_IS_RED = true;

export const ALL_PRODUCTS_ANCHOR = "সব-পণ্য";

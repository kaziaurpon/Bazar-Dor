import type { Category } from "./types";

/**
 * Live data comes from these APIs, tried in order (first one that answers wins).
 * Set BAZARDOR_API to put your own endpoint first.
 */
export const API_BASES: string[] = [
  process.env.BAZARDOR_API?.replace(/\/$/, ""),
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((v, i, all): v is string => Boolean(v) && all.indexOf(v) === i);
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

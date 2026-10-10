import { PRICE_UP_IS_RED } from "./constants";
import type { ChangeDir, MarketPrice, Product } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any digits in a number/string to Bengali digits. */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Group digits the Bangladeshi way (1,00,000) and convert to Bengali digits. */
export function formatNumber(value: number, maxDecimals = 2): string {
  const rounded = Number(value.toFixed(maxDecimals));
  const negative = rounded < 0;
  const [intPart, decPart] = Math.abs(rounded).toString().split(".");
  let grouped = intPart;
  if (intPart.length > 3) {
    const last3 = intPart.slice(-3);
    const rest = intPart.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    grouped = `${rest},${last3}`;
  }
  return toBn(`${negative ? "-" : ""}${grouped}${decPart ? `.${decPart}` : ""}`);
}

export function formatPrice(value: number): string {
  return `${formatNumber(value)} টাকা`;
}

/** Average columns keep two decimals only when needed (৬৭.৫০). */
export function formatAvg(value: number): string {
  const isInt = Number.isInteger(value);
  return `${isInt ? formatNumber(value, 0) : toBn(value.toFixed(2))} টাকা`;
}

export function formatPct(pct: number): string {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};
const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export const unitLabel = (unit: string) => UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
export const unitShort = (unit: string) => UNIT_SHORT[unit] ?? unit;

/** Tailwind classes for a change direction (see PRICE_UP_IS_RED). */
export function changeTone(dir: ChangeDir) {
  if (dir === "flat")
    return { text: "text-base-content/60", badge: "bg-base-200 text-base-content/70" };
  const bad = { text: "text-error", badge: "bg-error/10 text-error" };
  const good = { text: "text-success", badge: "bg-success/10 text-success" };
  const isUp = dir === "up";
  return isUp === PRICE_UP_IS_RED ? bad : good;
}

export function changeSymbol(dir: ChangeDir) {
  return dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
}

/** "▲ ২.১%", "▼ ২.৯%", "—০.০%" */
export function changeText(dir: ChangeDir, pct: number) {
  return dir === "flat" ? `—${formatPct(0)}` : `${changeSymbol(dir)} ${formatPct(pct)}`;
}

const WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** e.g. "শনিবার, ১০ অক্টোবর, ২০২৬" (Bangladesh time). */
export function banglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekdayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return `${WEEKDAYS[weekdayIdx]}, ${toBn(get("day"))} ${MONTHS[Number(get("month")) - 1]}, ${toBn(get("year"))}`;
}

/* ----- market statistics for the product details page ----- */

export const marketAvg = (m: MarketPrice) => (m.min + m.max) / 2;

export function priceStats(product: Product) {
  const markets = product.markets ?? [];
  if (!markets.length) {
    return { min: product.today, max: product.today, avg: product.today, lowest: null, highest: null };
  }
  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const avg = markets.reduce((sum, m) => sum + marketAvg(m), 0) / markets.length;
  return { min: lowest.min, max: highest.max, avg: Math.round(avg), lowest, highest };
}

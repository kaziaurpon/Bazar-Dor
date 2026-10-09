import { cache } from "react";
import { API_BASE, CATEGORIES } from "./constants";
import type { Category, Product } from "./types";

const REVALIDATE_SECONDS = 300;

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`API request failed (${res.status}): ${path}`);
  return (await res.json()) as T;
}

function pctChange(today: number, yesterday: number) {
  return yesterday ? Number((((today - yesterday) / yesterday) * 100).toFixed(1)) : 0;
}

function normalize(p: Product): Product {
  const pct = typeof p.change?.pct === "number" ? p.change.pct : pctChange(p.today, p.yesterday);
  const dir = p.change?.dir ?? (pct > 0 ? "up" : pct < 0 ? "down" : "flat");
  return { ...p, markets: p.markets ?? [], change: { dir, pct } };
}

/** All products (cached per request + revalidated every 5 minutes). */
export const getProducts = cache(async (): Promise<Product[]> => {
  const data = await getJson<Product[] | { products: Product[] }>("/products");
  const list = Array.isArray(data) ? data : data.products;
  return list.map(normalize);
});

export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const data = await getJson<Category[]>("/categories");
    return Array.isArray(data) && data.length ? data : CATEGORIES;
  } catch {
    return CATEGORIES;
  }
});

export function topRisers(products: Product[], limit = 6) {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export function topFallers(products: Product[], limit = 6) {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

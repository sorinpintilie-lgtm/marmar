import productsRaw from "@/data/products.json";
import collectionsRaw from "@/data/collections.json";
import archiveRaw from "@/data/archive.json";
import type { Product, Collection, Season } from "@/lib/types";

export const products = productsRaw as Product[];
export const collections = collectionsRaw as Collection[];
export const seasons = archiveRaw as Season[];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug) ?? null;
}

export function getProductsForCollection(collectionSlug: string) {
  return products.filter((p) => p.collections.includes(collectionSlug));
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

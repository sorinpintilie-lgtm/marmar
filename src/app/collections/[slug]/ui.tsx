"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FiltersPanel, { FiltersState } from "@/components/FiltersPanel";
import SortBar, { SortKey } from "@/components/SortBar";
import Chip from "@/components/Chip";
import GrainOverlay from "@/components/GrainOverlay";
import SmartImage from "@/components/SmartImage";
import type { Product } from "@/lib/types";

export default function CollectionClient({
  title,
  description,
  heroImage,
  items,
}: {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  items: Product[];
}) {
  const colors = useMemo(() => items.flatMap((p) => p.options.colors), [items]);
  const sizes = useMemo(() => items.flatMap((p) => p.options.sizes), [items]);
  const tags = useMemo(() => items.flatMap((p) => p.tags), [items]);

  const [filters, setFilters] = useState<FiltersState>({
    color: null,
    size: null,
    inStockOnly: false,
    tag: null,
  });

  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const out = items.filter((p) => {
      if (filters.inStockOnly && !p.variants.some((v) => v.inStock)) return false;
      if (filters.color && !p.options.colors.includes(filters.color)) return false;
      if (filters.size && !p.options.sizes.includes(filters.size)) return false;
      if (filters.tag && !p.tags.includes(filters.tag)) return false;
      return true;
    });

    const sorted = [...out];
    if (sort === "newest") {
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (sort === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured: keep original order
    }
    return sorted;
  }, [items, filters, sort]);

  const activeChips = [
    filters.inStockOnly ? { label: "In stock", clear: () => setFilters((s) => ({ ...s, inStockOnly: false })) } : null,
    filters.color ? { label: `Color: ${filters.color}`, clear: () => setFilters((s) => ({ ...s, color: null })) } : null,
    filters.size ? { label: `Size: ${filters.size}`, clear: () => setFilters((s) => ({ ...s, size: null })) } : null,
    filters.tag ? { label: `Tag: ${filters.tag}`, clear: () => setFilters((s) => ({ ...s, tag: null })) } : null,
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="space-y-8">
      {/* Collection header */}
      <section className="relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft">
        <div className="relative aspect-[16/6] min-h-[220px] md:min-h-[280px]">
          <SmartImage
            src={heroImage || "/images/placeholders/placeholder-4.jpg"}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/15 to-transparent" />
          <GrainOverlay />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="text-xs tracking-[0.22em] uppercase text-paper/80">
              Collection
            </div>
            <h1 className="mt-2 font-editorial text-4xl tracking-tight text-paper md:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-[720px] text-paper/85">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Sort + active filters */}
      <SortBar value={sort} onChange={setSort} count={filtered.length} />

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map((c) => (
            <Chip key={c.label} active onClick={c.clear}>
              {c.label} ×
            </Chip>
          ))}
        </div>
      )}

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
        <div className="md:sticky md:top-[120px] md:self-start">
          <FiltersPanel
            colors={colors}
            sizes={sizes}
            tags={tags}
            value={filters}
            onChange={setFilters}
            onReset={() =>
              setFilters({ color: null, size: null, inStockOnly: false, tag: null })
            }
          />
        </div>

        <div className="space-y-6">
          {/* Editorial insert */}
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
                <SmartImage
                  src="https://source.unsplash.com/1600x1200/?fashion,editorial,neutral,warm&sig=902"
                  alt="Editorial insert"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <GrainOverlay />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs tracking-[0.22em] uppercase text-muted">
                  Editorial note
                </div>
                <div className="mt-2 font-editorial text-3xl tracking-tight">
                  Warm light, quiet confidence.
                </div>
                <p className="mt-3 text-sm text-muted">
                  Keep the grid clean. Let texture do the talking. The best catalogs feel
                  like magazines — fewer words, better rhythm.
                </p>
              </div>
            </div>
          </div>

          <ProductGrid items={filtered} />
        </div>
      </div>
    </div>
  );
}

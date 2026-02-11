"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { products } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

export default function SearchPage() {
  const [q, setQ] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: ["title", "description", "tags", "collections", "season"],
        threshold: 0.35,
      }),
    []
  );

  const results = useMemo(() => {
    const query = q.trim();
    if (!query) return products.slice(0, 12);
    return fuse.search(query).map((r) => r.item).slice(0, 24);
  }, [q, fuse]);

  return (
    <div className="space-y-8">
      <div className="rounded-xl2 border border-line bg-card p-6 shadow-soft">
        <div className="text-xs tracking-[0.22em] uppercase text-muted">Search</div>
        <h1 className="mt-2 font-editorial text-4xl tracking-tight">Find pieces</h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: silk, amber, olive, evening…"
          className="mt-5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
        />

        <p className="mt-3 text-sm text-muted">
          {q.trim() ? `Results for "${q.trim()}"` : "Showing a curated selection"}
        </p>
      </div>

      <ProductGrid items={results} />
    </div>
  );
}

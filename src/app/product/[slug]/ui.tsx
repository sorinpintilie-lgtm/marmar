"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import GrainOverlay from "@/components/GrainOverlay";
import Chip from "@/components/Chip";
import { readFavorites, toggleFavorite } from "@/lib/favorites";
import { products } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import SmartImage from "@/components/SmartImage";
import { cn } from "@/lib/cn";

export default function ProductClient({ product }: { product: Product }) {
  const [color, setColor] = useState(product.options.colors[0] ?? "");
  const [size, setSize] = useState(product.options.sizes[0] ?? "");
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(readFavorites().includes(product.slug));
  }, [product.slug]);

  const availableSizesForColor = useMemo(() => {
    const set = new Set(
      product.variants.filter((v) => v.color === color).map((v) => v.size)
    );
    return product.options.sizes.filter((s) => set.has(s));
  }, [product, color]);

  const variant = useMemo(() => {
    return product.variants.find((v) => v.color === color && v.size === size) || null;
  }, [product, color, size]);

  const isInStock = variant?.inStock ?? product.variants.some((v) => v.inStock);

  const related = useMemo(() => {
    const set = new Set(product.collections);
    return products
      .filter((p) => p.slug !== product.slug && p.collections.some((c) => set.has(c)))
      .slice(0, 8);
  }, [product]);

  return (
    <div className="space-y-10">
      <div className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">Home</Link>{" "}
        <span className="mx-2">/</span>
        <Link href={`/collections/${product.collections[0] ?? "new-in"}`} className="hover:text-ink">
          {product.collections[0] ?? "collection"}
        </Link>{" "}
        <span className="mx-2">/</span>
        <span className="text-ink">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft">
            <div className="relative aspect-[4/5]">
              <SmartImage
                src={product.images?.[0]?.src || "/images/placeholders/placeholder-1.jpg"}
                alt={product.images?.[0]?.alt || product.title}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 60vw"
              />
              <GrainOverlay />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {product.images.slice(1, 7).map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line bg-card shadow-soft"
              >
                <SmartImage
                  src={img.src}
                  alt={img.alt || product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:sticky lg:top-[120px] lg:self-start"
        >
          <div className="rounded-xl2 border border-line bg-card p-6 shadow-soft">
            <div className="text-xs tracking-[0.22em] uppercase text-muted">
              {product.season?.toUpperCase() ?? "Editorial"}
            </div>

            <h1 className="mt-2 font-editorial text-4xl tracking-tight">
              {product.title}
            </h1>

            <p className="mt-3 text-sm text-muted">{product.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] tracking-wide text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {/* Color */}
              <div>
                <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
                  Color
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.options.colors.map((c) => (
                    <Chip
                      key={c}
                      active={color === c}
                      onClick={() => {
                        setColor(c);
                        // auto-adjust size if current is invalid for new color
                        const sizesFor = product.variants
                          .filter((v) => v.color === c)
                          .map((v) => v.size);
                        if (!sizesFor.includes(size)) setSize(sizesFor[0] ?? "");
                      }}
                    >
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
                  Size
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((s) => {
                    const enabled = availableSizesForColor.includes(s);
                    const active = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => enabled && setSize(s)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs tracking-wide transition-colors",
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-line bg-card text-muted hover:text-ink",
                          !enabled && "opacity-40 cursor-not-allowed"
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status + actions */}
              <div className="rounded-xl border border-line bg-paper p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted">Status:</span>{" "}
                    <span className={isInStock ? "text-ink" : "text-muted"}>
                      {isInStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = toggleFavorite(product.slug);
                      setFav(next.includes(product.slug));
                      window.dispatchEvent(new CustomEvent("favorites:updated"));
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-muted hover:text-ink",
                      fav && "text-clay"
                    )}
                  >
                    <Heart size={16} className={cn(fav && "fill-clay")} />
                    {fav ? "Saved" : "Save"}
                  </button>
                </div>

                <div className="mt-3 text-xs text-muted">
                  Variant: <span className="text-ink">{color}</span> /{" "}
                  <span className="text-ink">{size}</span>
                </div>
              </div>

              <div className="text-xs text-muted">
                Tip: Replace the demo images with Envato editorial sets for a consistent vibe.
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-muted">
              Suggested
            </div>
            <h2 className="mt-2 font-editorial text-3xl tracking-tight">
              Styled with
            </h2>
          </div>
          <ProductGrid items={related} />
        </div>
      )}
    </div>
  );
}

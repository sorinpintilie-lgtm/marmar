"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { readFavorites, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { cn } from "@/lib/cn";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(readFavorites().includes(product.slug));
  }, [product.slug]);

  const inStock = product.variants.some((v) => v.inStock);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-xl2 border border-line bg-card shadow-soft overflow-hidden"
    >
      <div className="relative aspect-[4/5]">
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <SmartImage
              src={image?.src || "/images/placeholders/placeholder-1.jpg"}
              alt={image?.alt || product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </Link>

        <div className="absolute left-3 top-3 flex gap-2">
          {!inStock && (
            <span className="rounded-full border border-line bg-paper/90 px-2.5 py-1 text-[11px] tracking-wide text-muted">
              Out of stock
            </span>
          )}
          {product.collections.includes("new-in") && (
            <span className="rounded-full border border-line bg-paper/90 px-2.5 py-1 text-[11px] tracking-wide text-muted">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            const next = toggleFavorite(product.slug);
            setFav(next.includes(product.slug));
            window.dispatchEvent(new CustomEvent("favorites:updated"));
          }}
          className={cn(
            "absolute right-3 top-3 rounded-full border border-line bg-paper/90 p-2 text-muted hover:text-ink",
            fav && "text-clay"
          )}
          aria-label="Toggle favorite"
        >
          <Heart size={16} className={cn(fav && "fill-clay")} />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-editorial text-lg leading-snug tracking-tight">
            {product.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {product.description}
          </p>
        </Link>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] tracking-wide text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

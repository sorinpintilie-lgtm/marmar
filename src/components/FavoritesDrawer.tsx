"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { products } from "@/lib/data";
import { readFavorites, toggleFavorite } from "@/lib/favorites";
import SmartImage from "@/components/SmartImage";

export default function FavoritesDrawer() {
  const [open, setOpen] = useState(false);
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setSlugs(readFavorites());
    refresh();

    const onOpen = () => setOpen(true);
    const onUpdated = () => refresh();

    window.addEventListener("favorites:open", onOpen);
    window.addEventListener("favorites:updated", onUpdated);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("favorites:open", onOpen);
      window.removeEventListener("favorites:updated", onUpdated);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const favProducts = useMemo(() => {
    const set = new Set(slugs);
    return products.filter((p) => set.has(p.slug));
  }, [slugs]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed right-0 top-0 z-[60] h-dvh w-[92vw] max-w-[420px] border-l border-line bg-paper shadow-soft transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-muted">
              Favorites
            </div>
            <div className="font-editorial text-xl tracking-tight">
              Saved pieces
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-line bg-card p-2 text-muted hover:text-ink"
            onClick={() => setOpen(false)}
            aria-label="Close favorites"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-[calc(100dvh-72px)] overflow-auto p-5">
          {favProducts.length === 0 ? (
            <div className="rounded-xl2 border border-line bg-card p-5 text-sm text-muted">
              Nothing saved yet. Tap the heart on any product.
            </div>
          ) : (
            <div className="space-y-4">
              {favProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 rounded-xl2 border border-line bg-card p-3"
                >
                  <div className="relative h-[92px] w-[74px] overflow-hidden rounded-xl border border-line">
                    <SmartImage
                      src={p.images?.[0]?.src || "/images/placeholders/placeholder-2.jpg"}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${p.slug}`}
                      className="font-editorial block text-lg leading-snug"
                      onClick={() => setOpen(false)}
                    >
                      {p.title}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {p.description}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const next = toggleFavorite(p.slug);
                          setSlugs(next);
                          window.dispatchEvent(new CustomEvent("favorites:updated"));
                        }}
                        className="text-xs text-muted underline underline-offset-4 hover:text-ink"
                      >
                        Remove
                      </button>
                      <span className="text-xs text-muted">·</span>
                      <Link
                        href={`/collections/${p.collections[0] ?? "new-in"}`}
                        className="text-xs text-muted underline underline-offset-4 hover:text-ink"
                        onClick={() => setOpen(false)}
                      >
                        View collection
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

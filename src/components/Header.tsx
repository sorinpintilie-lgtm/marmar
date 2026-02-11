"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/collections/new-in", label: "New In" },
    { href: "/collections/dresses", label: "Dresses" },
    { href: "/collections/essentials", label: "Essentials" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-editorial text-xl tracking-tight md:text-2xl">
            Warm Editorial
          </span>
          <span className="text-xs tracking-[0.18em] text-muted uppercase">
            catalog
          </span>
          <span className="ml-2 hidden text-xs text-muted md:inline">
            (no checkout)
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-ink",
                pathname === item.href ? "text-ink" : "text-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-sm text-muted shadow-soft hover:text-ink"
          >
            <Search size={16} />
            <span className="hidden md:inline">Search</span>
          </Link>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("favorites:open"))}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-sm text-muted shadow-soft hover:text-ink"
          >
            <Heart size={16} />
            <span className="hidden md:inline">Favorites</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pb-3 md:hidden">
        <div className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border border-line bg-card px-3 py-1.5 text-xs tracking-wide",
                pathname === item.href ? "text-ink" : "text-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

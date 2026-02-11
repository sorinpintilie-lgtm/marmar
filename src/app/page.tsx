import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import ProductGrid from "@/components/ProductGrid";
import GrainOverlay from "@/components/GrainOverlay";
import SmartImage from "@/components/SmartImage";
import { collections, products } from "@/lib/data";

export default function HomePage() {
  const featuredCollections = collections.filter((c) => c.featured);
  const newIn = products
    .filter((p) => p.collections.includes("new-in"))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft">
        <div className="relative aspect-[16/9] min-h-[380px] md:min-h-[520px]">
          <SmartImage
            src="https://source.unsplash.com/2400x1350/?fashion,editorial,warm&sig=901"
            alt="Warm editorial hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <GrainOverlay />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-[720px]">
              <div className="text-xs tracking-[0.22em] uppercase text-paper/80">
                Warm editorial / personal catalog
              </div>
              <h1 className="mt-3 font-editorial text-4xl tracking-tight text-paper md:text-6xl">
                Quiet silhouettes, warm light, clean lines.
              </h1>
              <p className="mt-3 max-w-[560px] text-paper/85 md:text-lg">
                A curated catalog demo inspired by minimal luxury e-com — built
                for browsing, collecting, and storytelling.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/collections/new-in"
                  className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink shadow-soft hover:opacity-90"
                >
                  Explore New In
                </Link>
                <Link
                  href="/archive"
                  className="rounded-full border border-paper/50 bg-transparent px-5 py-2.5 text-sm text-paper hover:bg-paper/10"
                >
                  View Archive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <Section eyebrow="Curated" title="Featured collections">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {featuredCollections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft"
            >
              <div className="relative aspect-[4/3]">
                <SmartImage
                  src={c.heroImage || "/images/placeholders/placeholder-3.jpg"}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
                <GrainOverlay />
              </div>
              <div className="p-5">
                <div className="text-xs tracking-[0.22em] uppercase text-muted">
                  Collection
                </div>
                <div className="mt-1 font-editorial text-2xl tracking-tight">
                  {c.title}
                </div>
                {c.description && (
                  <p className="mt-2 text-sm text-muted">{c.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* NEW IN */}
      <Section eyebrow="Fresh" title="New in">
        <ProductGrid items={newIn} />
        <div className="mt-8">
          <Link
            href="/collections/new-in"
            className="inline-flex rounded-full border border-line bg-card px-5 py-2.5 text-sm text-muted shadow-soft hover:text-ink"
          >
            View all New In
          </Link>
        </div>
      </Section>
    </div>
  );
}

import Image from "next/image";
import GrainOverlay from "@/components/GrainOverlay";
import ProductGrid from "@/components/ProductGrid";
import { seasons, getProductBySlug } from "@/lib/data";

export function generateStaticParams() {
  return seasons.map((s) => ({ season: s.slug }));
}

export default function SeasonPage({ params }: { params: { season: string } }) {
  const season = seasons.find((s) => s.slug === params.season);
  if (!season) {
    return (
      <div className="rounded-xl2 border border-line bg-card p-8 shadow-soft">
        <h1 className="font-editorial text-3xl">Not found</h1>
        <p className="mt-2 text-muted">This season does not exist.</p>
      </div>
    );
  }

  const seasonProducts = season.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean) as any[];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft">
        <div className="relative aspect-[16/7] min-h-[240px] md:min-h-[320px]">
          <Image
            src={season.heroImage || "/images/placeholders/placeholder-6.jpg"}
            alt={season.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent" />
          <GrainOverlay />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="text-xs tracking-[0.22em] uppercase text-paper/80">
              Archive
            </div>
            <h1 className="mt-2 font-editorial text-4xl tracking-tight text-paper md:text-5xl">
              {season.title}
            </h1>
            {season.subtitle && (
              <p className="mt-2 text-paper/85 md:text-lg">{season.subtitle}</p>
            )}
          </div>
        </div>
      </section>

      {season.body && (
        <div className="rounded-xl2 border border-line bg-card p-6 text-sm text-muted shadow-soft md:p-8 md:text-base">
          {season.body}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-muted">
            Shop the story
          </div>
          <h2 className="mt-2 font-editorial text-3xl tracking-tight">
            Featured pieces
          </h2>
        </div>
        <ProductGrid items={seasonProducts} />
      </div>
    </div>
  );
}

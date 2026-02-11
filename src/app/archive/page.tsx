import Image from "next/image";
import Link from "next/link";
import GrainOverlay from "@/components/GrainOverlay";
import { seasons } from "@/lib/data";

export default function ArchivePage() {
  return (
    <div className="space-y-10">
      <div className="rounded-xl2 border border-line bg-card p-6 shadow-soft md:p-8">
        <div className="text-xs tracking-[0.22em] uppercase text-muted">Archive</div>
        <h1 className="mt-2 font-editorial text-4xl tracking-tight md:text-5xl">
          Seasons & stories
        </h1>
        <p className="mt-3 max-w-[720px] text-sm text-muted md:text-base">
          Editorial pages that feel like a lookbook. Each season can link back to products.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {seasons.map((s) => (
          <Link
            key={s.slug}
            href={`/archive/${s.slug}`}
            className="group relative overflow-hidden rounded-xl2 border border-line bg-card shadow-soft"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={s.heroImage || "/images/placeholders/placeholder-5.jpg"}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent" />
              <GrainOverlay />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs tracking-[0.22em] uppercase text-paper/80">
                  Season
                </div>
                <div className="mt-1 font-editorial text-3xl tracking-tight text-paper">
                  {s.title}
                </div>
                {s.subtitle && (
                  <div className="mt-1 text-sm text-paper/85">{s.subtitle}</div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

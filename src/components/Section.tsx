import { cn } from "@/lib/cn";

export default function Section({
  title,
  eyebrow,
  children,
  className,
}: {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      {(title || eyebrow) && (
        <div className="mb-6 md:mb-8">
          {eyebrow && (
            <div className="text-xs tracking-[0.22em] uppercase text-muted">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-editorial text-3xl tracking-tight md:text-4xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

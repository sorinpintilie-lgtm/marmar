export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1280px] px-4 py-10 text-sm text-muted md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>
            Warm Editorial Catalog · Personal demo · No payments, no shipping.
          </p>
          <p className="text-xs tracking-[0.18em] uppercase">
            Built with Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

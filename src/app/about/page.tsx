export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl2 border border-line bg-card p-6 shadow-soft md:p-8">
        <div className="text-xs tracking-[0.22em] uppercase text-muted">About</div>
        <h1 className="mt-2 font-editorial text-4xl tracking-tight md:text-5xl">
          Warm editorial, minimal interface.
        </h1>
        <p className="mt-4 max-w-[820px] text-sm text-muted md:text-base">
          This is a personal demo project: no checkout, no payments, no shipping.
          It's designed to feel like a fashion magazine that happens to be shoppable.
        </p>

        <div className="mt-6 space-y-3 text-sm text-muted">
          <p>• Use Envato photo sets for consistent model/lighting.</p>
          <p>• Keep grids clean. Insert editorial blocks for rhythm.</p>
          <p>• Let typography + spacing carry the luxury feel.</p>
        </div>
      </div>
    </div>
  );
}

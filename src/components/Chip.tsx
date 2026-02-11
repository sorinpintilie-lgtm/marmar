import { cn } from "@/lib/cn";

export default function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs tracking-wide transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-card text-muted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

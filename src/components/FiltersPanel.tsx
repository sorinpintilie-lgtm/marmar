"use client";

import { uniqueSorted } from "@/lib/data";
import Chip from "@/components/Chip";

export type FiltersState = {
  color: string | null;
  size: string | null;
  inStockOnly: boolean;
  tag: string | null;
};

export default function FiltersPanel({
  colors,
  sizes,
  tags,
  value,
  onChange,
  onReset,
}: {
  colors: string[];
  sizes: string[];
  tags: string[];
  value: FiltersState;
  onChange: (next: FiltersState) => void;
  onReset: () => void;
}) {
  const allColors = uniqueSorted(colors);
  const allSizes = uniqueSorted(sizes);
  const allTags = uniqueSorted(tags);

  return (
    <div className="rounded-xl2 border border-line bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-xs tracking-[0.22em] uppercase text-muted">
          Filters
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted underline underline-offset-4 hover:text-ink"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-5">
        <div>
          <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
            Availability
          </div>
          <Chip
            active={value.inStockOnly}
            onClick={() => onChange({ ...value, inStockOnly: !value.inStockOnly })}
          >
            In stock only
          </Chip>
        </div>

        <div>
          <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
            Color
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={!value.color} onClick={() => onChange({ ...value, color: null })}>
              Any
            </Chip>
            {allColors.map((c) => (
              <Chip
                key={c}
                active={value.color === c}
                onClick={() => onChange({ ...value, color: c })}
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
            Size
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={!value.size} onClick={() => onChange({ ...value, size: null })}>
              Any
            </Chip>
            {allSizes.map((s) => (
              <Chip
                key={s}
                active={value.size === s}
                onClick={() => onChange({ ...value, size: s })}
              >
                {s}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs tracking-[0.22em] uppercase text-muted">
            Tag
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={!value.tag} onClick={() => onChange({ ...value, tag: null })}>
              Any
            </Chip>
            {allTags.map((t) => (
              <Chip
                key={t}
                active={value.tag === t}
                onClick={() => onChange({ ...value, tag: t })}
              >
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

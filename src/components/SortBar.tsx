"use client";

import Chip from "@/components/Chip";

export type SortKey = "featured" | "newest" | "title";

export default function SortBar({
  value,
  onChange,
  count,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
  count: number;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-muted">{count} items</div>
      <div className="flex flex-wrap gap-2">
        <Chip active={value === "featured"} onClick={() => onChange("featured")}>
          Featured
        </Chip>
        <Chip active={value === "newest"} onClick={() => onChange("newest")}>
          Newest
        </Chip>
        <Chip active={value === "title"} onClick={() => onChange("title")}>
          A–Z
        </Chip>
      </div>
    </div>
  );
}

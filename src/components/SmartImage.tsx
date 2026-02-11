"use client";

import React from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt?: string;          // optional, we default to ""
  fill?: boolean;        // mimic next/image fill
  className?: string;
  sizes?: string;        // ignored (kept so you don't need to edit callers)
  priority?: boolean;     // ignored (Next.js Image specific)
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "priority">;

export default function SmartImage({
  src,
  alt = "",
  fill,
  className,
  priority, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...rest
}: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading={rest.loading ?? "lazy"}
      decoding={rest.decoding ?? "async"}
      className={cn(
        fill ? "absolute inset-0 h-full w-full" : "",
        "object-cover",
        className
      )}
      {...rest}
    />
  );
}

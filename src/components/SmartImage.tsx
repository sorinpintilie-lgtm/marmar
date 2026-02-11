import NextImage, { ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export default function SmartImage({ src, alt, fill, className, ...rest }: Props) {
  const isRemote = /^https?:\/\//i.test(src);

  // For remote URLs, use <img> so ANY host works (no Next image config needed).
  if (isRemote) {
    // eslint-disable-next-line @next/next/no-img-element
    return fill ? (
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full", className)}
        loading="lazy"
        decoding="async"
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // For local images, keep Next/Image benefits.
  return (
    <NextImage
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      {...rest}
    />
  );
}

export type ProductImage = {
  src: string;
  alt?: string;
  type?: "editorial" | "detail";
};

export type Variant = {
  color: string;
  size: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string; // ISO date
  collections: string[];
  season?: string; // e.g. "ss25"
  tags: string[];
  options: {
    colors: string[];
    sizes: string[];
  };
  variants: Variant[];
  images: ProductImage[];
};

export type Collection = {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  featured?: boolean;
};

export type Season = {
  slug: string; // "ss25"
  title: string; // "SS25"
  subtitle?: string;
  heroImage?: string;
  body?: string;
  productSlugs: string[];
};

import type { Metadata } from "next";
import { getCollectionBySlug, getProductsForCollection, products as allProducts } from "@/lib/data";
import CollectionClient from "./ui";

export function generateStaticParams() {
  // build static pages for known collection slugs
  const unique = new Set<string>();
  allProducts.forEach((p) => p.collections.forEach((c) => unique.add(c)));
  return Array.from(unique).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const col = getCollectionBySlug(params.slug);
  return {
    title: col?.title ?? params.slug,
    description: col?.description ?? "Collection",
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const col = getCollectionBySlug(params.slug);
  const items = getProductsForCollection(params.slug);

  return (
    <CollectionClient
      slug={params.slug}
      title={col?.title ?? params.slug}
      description={col?.description}
      heroImage={col?.heroImage}
      items={items}
    />
  );
}

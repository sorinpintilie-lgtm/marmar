import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/data";
import ProductClient from "./ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  return {
    title: product?.title ?? "Product",
    description: product?.description ?? "Product detail",
    openGraph: {
      title: product?.title ?? "Product",
      description: product?.description ?? "",
      images: product?.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return (
      <div className="rounded-xl2 border border-line bg-card p-8 shadow-soft">
        <h1 className="font-editorial text-3xl">Not found</h1>
        <p className="mt-2 text-muted">This product does not exist.</p>
      </div>
    );
  }
  return <ProductClient product={product} />;
}

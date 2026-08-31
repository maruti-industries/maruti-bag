import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getInventoryProduct,
  getInventoryProducts,
} from "@/lib/inventory";

import ProductDetailsClient from "./ProductDetailsClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getInventoryProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description:
      product.seo.description ||
      product.shortDescription ||
      product.detailedDescription ||
      `Explore ${product.name} in the ${product.category} range from Maruti Bag Multipack and view available product options.`,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const [product, allProducts] = await Promise.all([
    getInventoryProduct(slug),
    getInventoryProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((item) => item.slug !== product.slug)
    .sort(
      (firstProduct, secondProduct) =>
        firstProduct.displayPriority -
        secondProduct.displayPriority,
    )
    .slice(0, 3);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

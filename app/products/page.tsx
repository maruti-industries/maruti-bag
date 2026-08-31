import type { Metadata } from "next";

import { getInventoryProducts } from "@/lib/inventory";
import ProductsCatalog from "./ProductsCatalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore BOPP laminated, metallic laminated, matt metallic and non-woven bags manufactured by Maruti Bag Multipack with bulk ordering, custom printing and PAN-India delivery.",
};

export default async function ProductsPage() {
  const products = await getInventoryProducts();

  const sortedProducts = [...products].sort(
    (firstProduct, secondProduct) =>
      firstProduct.displayPriority - secondProduct.displayPriority,
  );

  return <ProductsCatalog products={sortedProducts} />;
}

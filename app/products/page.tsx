import { getInventoryProducts } from "@/lib/inventory";
import ProductsCatalog from "./ProductsCatalog";

export default async function ProductsPage() {
  const products = await getInventoryProducts();

  const sortedProducts = [...products].sort(
    (firstProduct, secondProduct) =>
      firstProduct.displayPriority - secondProduct.displayPriority,
  );

  return <ProductsCatalog products={sortedProducts} />;
}
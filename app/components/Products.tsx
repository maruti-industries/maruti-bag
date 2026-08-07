import ProductCard from "./ProductCard";
import { getInventoryProducts } from "@/lib/inventory";

export default async function Products() {
  const products = await getInventoryProducts();

  return (
    <section className="products-section" id="products">
      <div className="products-heading">
        <p>OUR PRODUCT RANGE</p>

        <h2>Packaging Solutions Built for Your Business</h2>

        <span>
          Choose from ready-stock and custom-printed bags manufactured for
          retailers, wholesalers and brands across India.
        </span>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => {
            const uniqueSizes = Array.from(
              new Set(product.variants.map((variant) => variant.size)),
            );

            const sizeOptions = uniqueSizes.map((size) => {
              const matchingVariants = product.variants.filter(
                (variant) => variant.size === size,
              );

              return {
                size,

                quotations: matchingVariants.map((variant) => ({
                  gsm: variant.gsm,
                  quantity: null,
                  capacity: variant.availability,
                  pricePerBag:
                    variant.rate > 0 ? variant.rate : null,
                })),
              };
            });

            const description =
              product.shortDescription ||
              product.detailedDescription ||
              `${product.name} available in multiple sizes, colours and customization options.`;

            return (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                title={product.name}
                description={description}
                image={product.media.mainImage || undefined}
                sizeOptions={sizeOptions}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
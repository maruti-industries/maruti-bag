import Image from "next/image";
import Link from "next/link";

type RelatedProduct = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  sizeOptions: {
    size: string;
    availableColors?: {
      colorId: string;
      image: string;
    }[];
    quotations: {
      gsm: number;
      quantity: number | null;
      capacity: string;
      pricePerBag: number | null;
    }[];
  }[];
};

type RelatedProductsProps = {
  products: RelatedProduct[];
};

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="related-products-section">
      <div className="related-products-heading">
        <p>EXPLORE MORE PRODUCTS</p>

        <h2>You May Also Need</h2>

        <span>
          Explore other ready-stock and custom-printed bag options for your
          business.
        </span>
      </div>

      <div className="related-products-grid">
        {products.map((product) => {
          const gsmOptions = Array.from(
            new Set(
              product.sizeOptions.flatMap((sizeOption) =>
                sizeOption.quotations.map(
                  (quotation) => quotation.gsm,
                ),
              ),
            ),
          );

          const colourCount =
            product.sizeOptions[0]?.availableColors?.length ?? 0;

          return (
            <article
              className="related-product-card"
              key={product.slug}
            >
              <Link
                href={`/products/${product.slug}`}
                className="related-product-image-link"
                aria-label={`View ${product.title}`}
              >
                <div className="related-product-image">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={620}
                      height={460}
                    />
                  ) : (
                    <div className="related-product-placeholder">
                      Product photo coming soon
                    </div>
                  )}

                  {gsmOptions.length > 0 && (
                    <span className="related-product-gsm">
                      {gsmOptions
                        .map((gsm) => `${gsm} GSM`)
                        .join(" • ")}
                    </span>
                  )}
                </div>
              </Link>

              <div className="related-product-content">
                <h3>{product.title}</h3>

                <p>{product.description}</p>

                <div className="related-product-meta">
                  <span>
                    {product.sizeOptions.length} sizes
                  </span>

                  {colourCount > 0 && (
                    <span>{colourCount} colours</span>
                  )}
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="related-product-button"
                >
                  View Product
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
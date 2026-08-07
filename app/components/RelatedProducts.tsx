import Image from "next/image";
import Link from "next/link";

type RelatedProduct = {
  slug: string;
  title: string;
  description: string;
  image?: string;

  availabilityLabel: string;
  hasReadyStock: boolean;
  minimumMoq: number | null;
  startingPrice: number | null;
  rateUnit: string;

  sizeOptions: {
    size: string;
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
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="related-products-section"
      aria-labelledby="related-products-title"
    >
      <div className="related-products-heading">
        <div className="related-products-heading-content">
          <p>EXPLORE MORE PRODUCTS</p>
          <h2 id="related-products-title">You May Also Need</h2>
          <span>Explore other premium packaging solutions for your business.</span>
        </div>

        <Link href="/products" className="related-products-view-all">
          <span>View All Products</span>
          <span className="related-products-view-all-icon" aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className="related-products-grid">
        {products.map((product) => (
          <article className="related-product-card" key={product.slug}>
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
                    fill
                    sizes="(max-width: 700px) 88vw, (max-width: 1100px) 44vw, 30vw"
                    className="related-product-image-element"
                  />
                ) : (
                  <div className="related-product-placeholder" aria-hidden="true">
                    <div className="related-product-placeholder-mark">MB</div>
                    <strong>MARUTI BAG</strong>
                  </div>
                )}
              </div>
            </Link>

            <div className="related-product-content">
              <h3>{product.title}</h3>
              <p className="related-product-description">{product.description}</p>
              <Link
                href={`/products/${product.slug}`}
                className="related-product-button"
                aria-label={`Explore ${product.title}`}
              >
                <span>Explore Product</span>
                <span className="related-product-button-icon" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
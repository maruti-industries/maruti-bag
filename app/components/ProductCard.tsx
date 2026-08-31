import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  description: string;
  image?: string;
  slug: string;

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

export default function ProductCard({
  title,
  description,
  image,
  slug,
  sizeOptions,
}: ProductCardProps) {
  const gsmOptions = Array.from(
    new Set(
      sizeOptions.flatMap((sizeOption) =>
        sizeOption.quotations.map((quotation) => quotation.gsm),
      ),
    ),
  );

  const colourCount = sizeOptions[0]?.availableColors?.length ?? 0;

  return (
    <article className="product-card">
      <Link
        href={`/products/${slug}`}
        className="product-card-image-link"
        aria-label={`View ${title}`}
      >
        <div className="product-card-image">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={760}
              height={620}
              className="product-image"
            />
          ) : (
            <div className="product-placeholder">
              <span>MARUTI BAG MULTIPACK</span>
              <strong>Product Photo Coming Soon</strong>
            </div>
          )}

          {gsmOptions.length > 0 && (
            <div className="product-card-gsm">
              {gsmOptions.map((gsm) => `${gsm} GSM`).join(" • ")}
            </div>
          )}

          <div className="product-card-image-action" aria-hidden="true">
            View Product
            <span>↗</span>
          </div>
        </div>
      </Link>

      <div className="product-card-content">
        <div className="product-card-heading">
  <h3>{title}</h3>
</div>

        <p className="product-card-description">{description}</p>

        <div className="product-card-specifications">
          <div className="product-sizes">
            <p>Available Sizes</p>

            <div className="size-list">
              {sizeOptions.map((item) => (
                <span key={item.size}>{item.size}</span>
              ))}
            </div>
          </div>

          {colourCount > 0 && (
  <div className="product-card-colour-count">
    <span className="product-card-availability-dot" />
    Available in {colourCount} colours
  </div>
)}
        </div>

        <div className="product-card-footer">
          <span>Ready stock and custom printing available</span>

          <Link href={`/products/${slug}`} className="product-button">
            View Details
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

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
      <div className="product-card-image">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={700}
            height={500}
            className="product-image"
          />
        ) : (
          <div className="product-placeholder">
            <span>MARUTI BAG</span>
            <strong>Product Photo Coming Soon</strong>
          </div>
        )}
      </div>

      <div className="product-card-content">
        {gsmOptions.length > 0 && (
          <span className="product-gsm">
            {gsmOptions.map((gsm) => `${gsm} GSM`).join(" • ")}
          </span>
        )}

        <h3>{title}</h3>

        <p>{description}</p>

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
            {colourCount} colours available in every size
          </div>
        )}

        <Link href={`/products/${slug}`} className="product-button">
          View Details <span>→</span>
        </Link>
      </div>
    </article>
  );
}
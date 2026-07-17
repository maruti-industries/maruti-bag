import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  description: string;
  image?: string;
  slug: string;
  sizeOptions: {
    size: string;
    quotations: {
      gsm: number;
      quantity: number;
      capacity: string;
      pricePerBag: number;
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

        <Link href={`/products/${slug}`} className="product-button">
          View Details <span>→</span>
        </Link>
      </div>
    </article>
  );
}
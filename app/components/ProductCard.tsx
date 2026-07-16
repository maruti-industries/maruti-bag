import Image from "next/image";

type ProductCardProps = {
  title: string;
  description: string;
  image?: string;
};

export default function ProductCard({
  title,
  description,
  image,
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

        <button type="button" className="product-button">
          View Details <span>→</span>
        </button>
      </div>
    </article>
  );
}
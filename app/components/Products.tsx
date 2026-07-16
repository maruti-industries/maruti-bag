import ProductCard from "./ProductCard";

export default function Products() {
  const products = [

  {
    title: "Non-Woven Loop Handle Bag",

    description:
      "Premium reusable shopping bags with strong stitched loop handles for retail stores and branding.",

    image: "/images/maroon-bag.jpeg",
  },

  {
    title: "Metallic Laminated Bag",

    description:
      "Luxury metallic laminated bags with premium finish for boutiques, garments and gift packaging.",

    image: "/images/golden-metallic-bag.jpeg",
  },


];

  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <p>OUR PRODUCT RANGE</p>
        <h2>Packaging Solutions Built for Your Business</h2>
        <span>
          Choose from ready-stock and custom-printed bags manufactured for
          retailers, wholesalers and brands across India.
        </span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
  key={product.title}
  title={product.title}
  description={product.description}
  image={product.image}
/>
        ))}
      </div>
    </section>
  );
}
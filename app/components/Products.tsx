import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function Products() {


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
  key={product.slug}
  slug={product.slug}
  title={product.title}
  description={product.description}
  image={product.image}
  sizeOptions={product.sizeOptions}
/>
        ))}
      </div>
    </section>
  );
}
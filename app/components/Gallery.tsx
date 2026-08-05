import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "/images/bopp-matt-laminated-bag-bottle-green.jpeg",
    alt: "Maroon non-woven box bag manufactured by Maruti Bag",
    title: "Non-Woven Box Bag",
    category: "Real Product",
    href: "/products/bopp-matt-laminated-bag-bottle-green",
    imageFit: "contain",
  },
  {
    src: "/images/golden-metallic-bag.jpeg",
    alt: "Golden metallic laminated bag manufactured by Maruti Bag",
    title: "Metallic Laminated Bag",
    category: "Real Product",
    href: "/products/metallic-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "/images/sample-designs/matt-metallic-jewellery-brand-design.png",
    alt: "Matt metallic jewellery brand bag design",
    title: "Jewellery Brand Design",
    category: "Design Inspiration",
    href: "/products/matt-metallic-bag",
    imageFit: "contain",
  },
  {
    src: "/images/sample-designs/bopp-matt-footwear-brand-design.png",
    alt: "BOPP matt footwear brand bag design",
    title: "Footwear Brand Design",
    category: "Design Inspiration",
    href: "/products/bopp-matt-laminated-bag",
    imageFit: "contain",
  },
  {
    src: "/images/sample-designs/bopp-matt-fashion-brand-design.png",
    alt: "BOPP matt fashion brand bag design",
    title: "Fashion Brand Design",
    category: "Design Inspiration",
    href: "/products/bopp-matt-laminated-bag",
    imageFit: "contain",
  },
  {
    src: "/images/sample-designs/matt-metallic-luxury-boutique-design.png",
    alt: "Matt metallic luxury boutique bag design",
    title: "Luxury Boutique Design",
    category: "Design Inspiration",
    href: "/products/matt-metallic-bag",
    imageFit: "contain",
  },
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <p>PRODUCT GALLERY</p>

        <h2>Real Products. Premium Possibilities.</h2>

        <span>
          Explore real Maruti Bag products and custom branding ideas created
          for retail, jewellery, gifting, fashion and growing businesses.
        </span>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <article className="gallery-card" key={image.src}>
            <Link
              href={image.href}
              className="gallery-card-link"
              aria-label={`View ${image.title}`}
            >
              <Image
                src={image.src}
                  alt={image.alt}
                    width={900}
                    height={700}
                    className={`gallery-image ${
                      image.imageFit === "contain" ? "gallery-image-contain" : ""
              }`}
            />

              <div className="gallery-card-overlay">
                <div>
                  <span>{image.category}</span>
                  <h3>{image.title}</h3>
                </div>

                <strong aria-hidden="true">View Product →</strong>
              </div>
            </Link>
          </article>
        ))}
      </div>

    <div className="gallery-footer">
  <Link href="/gallery" className="gallery-view-all">
    View Complete Gallery
    <span aria-hidden="true">→</span>
  </Link>
</div>
    </section>
  );
}
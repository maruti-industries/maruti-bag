import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786101625/NA_bottol_green_pxanfz.jpg",
    alt: "Bottle green BOPP matt laminated bag manufactured by Maruti Bag Multipack",
    title: "BOPP Matt Laminated Bag",
    detail: "Bottle Green",
    category: "Real Product",
    href: "/products/bopp-matt-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786101629/NA_golden_ovnxdm.jpg",
    alt: "Golden metallic laminated bag manufactured by Maruti Bag Multipack",
    title: "Metallic Laminated Bag",
    detail: "Golden",
    category: "Real Product",
    href: "/products/metallic-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786101628/NF_grey_jvglap.jpg",
    alt: "Grey BOPP matt laminated bag manufactured by Maruti Bag Multipack",
    title: "BOPP Matt Laminated Bag",
    detail: "Grey",
    category: "Real Product",
    href: "/products/bopp-matt-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786351514/NA_dark_blue_oswy1l.jpg",
    alt: "Dark blue BOPP matt laminated bag manufactured by Maruti Bag Multipack",
    title: "BOPP Matt Laminated Bag",
    detail: "Dark Blue",
    category: "Real Product",
    href: "/products/bopp-matt-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786101628/NF_rose_gold_cyzjxy.jpg",
    alt: "Rose gold metallic laminated bag manufactured by Maruti Bag Multipack",
    title: "Metallic Laminated Bag",
    detail: "Rose Gold",
    category: "Real Product",
    href: "/products/metallic-laminated-bag",
    imageFit: "cover",
  },
  {
    src: "https://res.cloudinary.com/gzexzrta/image/upload/v1786380555/MF_red_tgycnt.jpg",
    alt: "Red matt metallic bag manufactured by Maruti Bag Multipack",
    title: "Matt Metallic Bag",
    detail: "Red",
    category: "Real Product",
    href: "/products/matt-metallic-bag",
    imageFit: "cover",
  },
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <p>REAL PRODUCT GALLERY</p>

        <h2>Real Products. Real Finishes.</h2>

        <span>
          Explore actual Maruti Bag Multipack products across BOPP matt laminated,
          metallic laminated and matt metallic finishes.
        </span>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <article className="gallery-card" key={image.src}>
            <Link
              href={image.href}
              className="gallery-card-link"
              aria-label={`View ${image.title} in ${image.detail}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={700}
                className={`gallery-image ${
                  image.imageFit === "contain"
                    ? "gallery-image-contain"
                    : ""
                }`}
              />

              <div className="gallery-card-overlay">
                <div>
                  <span>
                    {image.category} • {image.detail}
                  </span>

                  <h3>{image.title}</h3>
                </div>

                <strong aria-hidden="true">
                  View Product →
                </strong>
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

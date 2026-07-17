import Image from "next/image";

export default function Gallery() {
  const galleryImages = [
    {
      src: "/images/maroon-bag.jpeg",
      alt: "Maroon non-woven loop handle bag",
    },
    {
      src: "/images/golden-metallic-bag.jpeg",
      alt: "Golden metallic laminated bag",
    },
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <p>PRODUCT GALLERY</p>
        <h2>Real Products. Real Quality.</h2>
        <span>
          Explore a preview of our ready-stock bags. More product photography
          will be added soon.
        </span>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <article className="gallery-card" key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={900}
              height={700}
              className="gallery-image"
            />
          </article>
        ))}

        <article className="gallery-coming-soon">
          <span>MARUTI BAG</span>
          <h3>More Product Photos Coming Soon</h3>
          <p>Full product range photoshoot in progress.</p>
        </article>
      </div>
    </section>
  );
}
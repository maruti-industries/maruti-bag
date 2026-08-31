import Link from "next/link";

const aboutPoints = [
  {
    number: "01",
    title: "Direct Manufacturing",
    description: "Source your bags directly from our manufacturing team.",
  },
  {
    number: "02",
    title: "Ready Stock",
    description: "Selected products are available for faster dispatch.",
  },
  {
    number: "03",
    title: "Custom Printing",
    description: "Logo printing and customized production from 1,000 pieces.",
  },
  {
    number: "04",
    title: "Pan-India Delivery",
    description: "Reliable supply for retailers, wholesalers and brands.",
  },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-main">
          <div className="about-copy">
            <p className="about-label">ABOUT MARUTI BAG MULTIPACK</p>

            <h2>
              Reliable Packaging, Manufactured for Growing Businesses
            </h2>

            <p className="about-description">
              Maruti Bag Multipack is a Surat-based manufacturer of non-woven box bags,
              laminated BOPP bags, metallic bags and custom-printed packaging
              solutions.
            </p>

            <p className="about-description">
              We help retailers, wholesalers and growing brands source
              dependable bags with ready-stock options, bulk order quantities,
              custom printing and delivery across India.
            </p>

            <div className="about-actions">
              <Link href="/products" className="about-primary-link">
                Explore Products
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/#contact" className="about-secondary-link">
                Discuss Your Requirement
              </Link>
            </div>
          </div>

          <aside className="about-highlight">
            <span className="about-highlight-label">
              DIRECT FROM THE MANUFACTURER
            </span>

            <h3>Built for Quality. Ready for Business.</h3>

            <p>
              From ready-stock requirements to customized bulk orders,
              our team helps you select the right bag, size, GSM and printing
              option.
            </p>

            <div className="about-highlight-footer">
              <strong>Surat, Gujarat</strong>
              <span>Supplying across India</span>
            </div>
          </aside>
        </div>

        <div className="about-points">
          {aboutPoints.map((point) => (
            <article className="about-point" key={point.number}>
              <span className="about-point-number">{point.number}</span>

              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

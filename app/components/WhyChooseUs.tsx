const reasons = [
  {
    title: "Premium Quality",
    text: "Strong materials and reliable finishing.",
  },
  {
    title: "Ready Stock",
    text: "Selected bags available for faster dispatch.",
  },
  {
    title: "Custom Printing",
    text: "Logo printing from 1000 pieces.",
  },
  {
    title: "Flexible MOQ",
    text: "Plain bags available from 500 pieces.",
  },
  {
    title: "Pan-India Delivery",
    text: "Dependable supply across India.",
  },
  {
    title: "Direct Manufacturer",
    text: "Clear communication and dependable service.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why-maruti-bag">
      <div className="why-container">
        <div className="why-heading">
          <p>WHY MARUTI BAG</p>

          <h2>Reliable Packaging. Professional Service.</h2>

          <span>
            Practical packaging solutions backed by ready stock, custom
            manufacturing and dependable delivery.
          </span>
        </div>

        <div className="why-strip">
          {reasons.map((reason) => (
            <article className="why-item" key={reason.title}>
              <span className="why-check" aria-hidden="true">
                ✓
              </span>

              <div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
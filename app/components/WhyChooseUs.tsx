export default function WhyChooseUs() {
  const reasons = [
    {
      number: "01",
      title: "Premium Quality",
      text: "Strong materials, reliable finishing and consistent quality for every order.",
    },
    {
      number: "02",
      title: "Ready Stock",
      text: "Selected bags are available in stock for faster dispatch and urgent requirements.",
    },
    {
      number: "03",
      title: "Custom Printing",
      text: "Logo printing and customized bag production available from 500 pieces.",
    },
    {
      number: "04",
      title: "Flexible Quantities",
      text: "Plain ready-stock bags are available from approximately 100–200 pieces.",
    },
    {
      number: "05",
      title: "Pan-India Delivery",
      text: "We supply retailers, wholesalers and businesses across India.",
    },
    {
      number: "06",
      title: "Direct Manufacturer",
      text: "Work directly with the manufacturer for better communication and dependable service.",
    },
  ];

  return (
    <section className="why-section" id="about">
      <div className="why-heading">
        <p>WHY MARUTI BAG</p>
        <h2>Reliable Packaging. Professional Service.</h2>
        <span>
          We combine ready stock, custom manufacturing and dependable delivery
          to make bag sourcing simple for businesses across India.
        </span>
      </div>

      <div className="why-grid">
        {reasons.map((reason) => (
          <article className="why-card" key={reason.number}>
            <span className="why-number">{reason.number}</span>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
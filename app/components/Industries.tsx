import Reveal from "./Reveal";
export default function Industries() {
  const industries = [
    "Garment Stores",
    "Textile Businesses",
    "Jewellery Shops",
    "Gift Stores",
    "Footwear Stores",
    "Sweet & Bakery Shops",
    "Medical & Pharmacy",
    "Corporate Gifting",
  ];

  const scrollingIndustries = [...industries, ...industries];

  return (
    <section className="industries-section" id="industries">
      <Reveal>
      <div className="industries-heading">
        <p>INDUSTRIES WE SERVE</p>

        <h2>Packaging Solutions for Every Business</h2>

        <span>
          Durable and customized bags for retailers, wholesalers and growing
          brands across India.
        </span>
      </div>
      </Reveal>

      <Reveal delay={180}>
      <div className="industries-marquee" aria-label="Industries we serve">
        <div className="industries-marquee-track">
          {scrollingIndustries.map((industry, index) => (
            <div className="industry-pill" key={`${industry}-${index}`}>
              <span className="industry-dot" aria-hidden="true" />
              <span>{industry}</span>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
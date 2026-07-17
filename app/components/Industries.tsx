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

  return (
    <section className="industries-section" id="industries">
      <div className="industries-heading">
        <p>INDUSTRIES WE SERVE</p>
        <h2>Packaging Solutions for Every Business</h2>
        <span>
          We manufacture durable and customized bags for retailers, wholesalers
          and businesses across multiple industries.
        </span>
      </div>

      <div className="industries-grid">
        {industries.map((industry, index) => (
          <article className="industry-card" key={industry}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{industry}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
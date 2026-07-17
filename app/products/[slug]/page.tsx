import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.title}
            width={900}
            height={700}
            priority
          />
        </div>

        <div className="product-detail-content">
          <div className="product-detail-header">
            <span className="product-category-label">
              Custom Printed Packaging
            </span>

            <h1>{product.title}</h1>
          </div>

          <p className="product-detail-description">
            {product.description}
          </p>

          <section className="product-size-section">
            <div className="product-section-heading">
              <span>Size-Wise Details</span>
              <h2>Available Sizes and Quotations</h2>
              <p>
                Select the required bag size and compare available GSM,
                quantity, capacity and estimated price options.
              </p>
            </div>

            <div className="size-options-list">
              {product.sizeOptions.map((sizeOption) => (
                <article
                  className="size-option-card"
                  key={sizeOption.size}
                >
                  <div className="size-option-header">
                    <div>
                      <span>Bag Size</span>
                      <h3>{sizeOption.size}</h3>
                    </div>

                    <span className="quotation-count">
                      {sizeOption.quotations.length}{" "}
                      {sizeOption.quotations.length === 1
                        ? "option"
                        : "options"}
                    </span>
                  </div>

                  <div className="size-table-wrapper">
                    <table className="size-details-table">
                      <thead>
                        <tr>
                          <th>GSM</th>
                          <th>Quantity</th>
                          <th>Capacity</th>
                          <th>Price Per Bag</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sizeOption.quotations.map(
                          (quotation, index) => (
                            <tr
                              key={`${sizeOption.size}-${quotation.gsm}-${quotation.quantity}-${index}`}
                            >
                              <td>{quotation.gsm} GSM</td>

                              <td>
                                {quotation.quantity.toLocaleString(
                                  "en-IN"
                                )}{" "}
                                pieces
                              </td>

                              <td>{quotation.capacity}</td>

                              <td>
                                ₹{quotation.pricePerBag}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>

            <p className="pricing-note">
              Prices shown are estimated and may change according to
              printing, artwork, material, colour, order quantity and
              delivery location.
            </p>
          </section>

          <div className="product-information-grid">
            <section className="product-info-box">
              <h2>Key Features</h2>

              <ul>
                {product.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="product-info-box">
              <h2>Applications</h2>

              <ul>
                {product.applications.map((application) => (
                  <li key={application}>
                    <span aria-hidden="true">✓</span>
                    {application}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {product.sampleDesigns.length > 0 && (
            <section className="product-section">
              <div className="product-section-heading">
                <span>Design Inspiration</span>
                <h2>Explore Sample Printed Bag Designs</h2>
                <p>
                  These designs are shown for inspiration. Your bag
                  can be customized with your own logo, colours and
                  artwork.
                </p>
              </div>

              <div className="sample-design-grid">
                {product.sampleDesigns.map((design) => (
                  <article
                    className="sample-design-card"
                    key={design.title}
                  >
                    <div className="sample-design-image">
                      <Image
                        src={design.image}
                        alt={design.title}
                        width={500}
                        height={500}
                      />
                    </div>

                    <h3>{design.title}</h3>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="product-information-grid">
            {product.customizationOptions.length > 0 && (
              <section className="product-info-box">
                <h2>Customization Options</h2>

                <ul>
                  {product.customizationOptions.map((option) => (
                    <li key={option}>
                      <span aria-hidden="true">✓</span>
                      {option}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.industries.length > 0 && (
              <section className="product-info-box">
                <h2>Industries We Serve</h2>

                <ul>
                  {product.industries.map((industry) => (
                    <li key={industry}>
                      <span aria-hidden="true">✓</span>
                      {industry}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <a href="#contact" className="product-button">
            Request Quote <span>→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
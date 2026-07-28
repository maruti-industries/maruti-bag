"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { products } from "../../data/products";

const WHATSAPP_NUMBER = "919427152052";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

type ProductImageValue = (typeof products)[number]["image"];

type GalleryItem = {
  id: string;
  label: string;
  image: ProductImageValue | null;
  isAvailable: boolean;
  ariaLabel: string;
};

type ProductGalleryProps = {
  product: (typeof products)[number];
};

function ProductGallery({ product }: ProductGalleryProps) {
  const [activeGalleryId, setActiveGalleryId] = useState("front-view");
  const [activeImage, setActiveImage] = useState<ProductImageValue | null>(product.image);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const imageTransitionTimer = useRef<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "front-view",
      label: "Front View",
      image: product.image,
      isAvailable: true,
      ariaLabel: `Show ${product.title} front view`,
    },
    {
      id: "side-view",
      label: "Side View",
      image: null,
      isAvailable: false,
      ariaLabel: `${product.title} side view is coming soon`,
    },
    {
      id: "handle-close-up",
      label: "Handle Close-up",
      image: null,
      isAvailable: false,
      ariaLabel: `${product.title} handle close-up is coming soon`,
    },
    {
      id: "printing-close-up",
      label: "Printing Close-up",
      image: null,
      isAvailable: false,
      ariaLabel: `${product.title} printing close-up is coming soon`,
    },
  ];

  const handleThumbnailSelect = (item: GalleryItem) => {
    if (!item.isAvailable || !item.image || item.id === activeGalleryId) {
      return;
    }

    setIsImageVisible(false);

    if (imageTransitionTimer.current) {
      window.clearTimeout(imageTransitionTimer.current);
    }

    imageTransitionTimer.current = window.setTimeout(() => {
      setActiveImage(item.image);
      setActiveGalleryId(item.id);
      setIsImageVisible(true);
    }, 140);
  };

  const activeGalleryLabel =
    galleryItems.find((item) => item.id === activeGalleryId)?.label ?? "Featured view";

  return (
    <section className="product-gallery-section" aria-label="Product gallery">
      <div className="product-gallery-featured">
        <div className="product-gallery-image">
          <Image
            src={activeImage ?? product.image}
            alt={
              activeGalleryId === "front-view"
                ? `${product.title} featured view`
                : `${product.title} ${activeGalleryLabel.toLowerCase()} preview`
            }
            width={900}
            height={700}
            priority={false}
            className={`product-gallery-main-image ${isImageVisible ? "is-visible" : ""}`}
          />
        </div>
        <div className="product-gallery-sidebar" role="list" aria-label="Product gallery preview options">
          {galleryItems.map((item) => {
            const isActive = activeGalleryId === item.id;
            const isDisabled = !item.isAvailable || !item.image;

            return (
              <button
                key={item.id}
                type="button"
                className={`product-gallery-thumb ${isActive ? "is-active" : ""} ${isDisabled ? "is-disabled" : ""}`}
                onClick={() => handleThumbnailSelect(item)}
                disabled={isDisabled}
                aria-label={item.ariaLabel}
                aria-pressed={isActive}
              >
                <span className="product-gallery-thumb-content">
                  <span className="product-gallery-thumb-label">{item.label}</span>
                  <span className="product-gallery-thumb-status">
                    {item.isAvailable ? "Preview" : "Photo Coming Soon"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="product-gallery-note">
        More product photos will be added after the product photoshoot.
      </p>
    </section>
  );
}

export default function ProductPage() {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;

  if (!slug) {
    notFound();
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const quotationGsmValues = Array.from(
    new Set(
      product.sizeOptions.flatMap((sizeOption) =>
        sizeOption.quotations.map((quotation) => quotation.gsm),
      ),
    ),
  ).sort((a, b) => a - b);

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

          <p className="product-detail-description">{product.description}</p>

          <div className="product-highlights">
            <div className="product-highlight-item">
              <strong>Ready Stock</strong>
              <span>Available for quick inquiry and dispatch.</span>
            </div>
            <div className="product-highlight-item">
              <strong>Custom Printing</strong>
              <span>Branding and logo support available.</span>
            </div>
            <div className="product-highlight-item">
              <strong>Pan-India Delivery</strong>
              <span>Reliable dispatch across India.</span>
            </div>
          </div>

          <a
            href={`${WHATSAPP_BASE_URL}${encodeURIComponent(`Hello Maruti Bag,\n\nI want a quotation for:\n\nProduct: ${product.title}\n\nRequired Size:\nQuantity:\nPlain or Printed:\nDelivery City:\n\nPlease share availability and quotation.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="product-button product-button-whatsapp"
          >
            Get Quote on WhatsApp <span>→</span>
          </a>

          <div className="product-summary-grid">
            <div className="product-summary-card">
              <span>Available Sizes</span>
              <strong>{product.sizeOptions.map((item) => item.size).join(" • ")}</strong>
            </div>
            <div className="product-summary-card">
              <span>GSM Options</span>
              <strong>{Array.from(new Set(product.sizeOptions.flatMap((item) => item.quotations.map((quote) => `${quote.gsm} GSM`)))).join(" • ")}</strong>
            </div>
            <div className="product-summary-card">
              <span>Carrying Capacity</span>
              <strong>{product.sizeOptions[0]?.quotations[0]?.capacity ?? "Available on request"}</strong>
            </div>
            <div className="product-summary-card">
              <span>Printing / Customization</span>
              <strong>{product.customizationOptions[0] ?? "Available on request"}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="product-detail-full-width">
        <div className="product-trust-strip" aria-label="Product trust highlights">
          <div className="product-trust-item">
            <span className="product-trust-icon">✓</span>
            <span>Direct Manufacturer</span>
          </div>
          <div className="product-trust-item">
            <span className="product-trust-icon">✓</span>
            <span>Ready Stock Available</span>
          </div>
          <div className="product-trust-item">
            <span className="product-trust-icon">✓</span>
            <span>Custom Printing</span>
          </div>
          <div className="product-trust-item">
            <span className="product-trust-icon">✓</span>
            <span>Pan-India Delivery</span>
          </div>
        </div>
        <section className="product-size-section">
          <div className="product-section-heading">
            <span>Quotation Matrix</span>
            <h2>Size-wise pricing overview</h2>
            <p>
              Compare capacity, quantity and estimated pricing across the available GSM options.
            </p>
          </div>

          <div className="quotation-matrix-wrapper">
            <div className="quotation-matrix-table-wrapper">
              <table className="quotation-matrix-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Cap.</th>
                    {quotationGsmValues.map((gsm) => (
                      <Fragment key={`${gsm}-group`}>
                        <th>{gsm} GSM Qty</th>
                        <th>{gsm} GSM Price</th>
                      </Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.sizeOptions.map((sizeOption) => (
                    <tr key={sizeOption.size}>
                      <td className="matrix-size-cell">{sizeOption.size}</td>
                      <td className="matrix-capacity-cell">
                        {sizeOption.quotations[0]?.capacity ?? "Available on request"}
                      </td>
                      {quotationGsmValues.map((gsm) => {
                        const quotation = sizeOption.quotations.find(
                          (item) => item.gsm === gsm,
                        );

                        return (
                          <Fragment key={`${sizeOption.size}-${gsm}-group`}>
                            <td className="matrix-quantity-cell">
                              {quotation ? `${quotation.quantity.toLocaleString("en-IN")} pcs` : "—"}
                            </td>
                            <td className="matrix-price-cell">
                              {quotation ? `₹${quotation.pricePerBag}` : "—"}
                            </td>
                          </Fragment>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="quotation-matrix-mobile-list">
              {product.sizeOptions.map((sizeOption) => (
                <article className="quotation-matrix-card" key={sizeOption.size}>
                  <div className="quotation-matrix-card-header">
                    <div>
                      <span>Size</span>
                      <h3>{sizeOption.size}</h3>
                    </div>
                    <div className="quotation-matrix-capacity">
                      {sizeOption.quotations[0]?.capacity ?? "Available on request"}
                    </div>
                  </div>

                  <div className="quotation-matrix-card-body">
                    {quotationGsmValues.map((gsm) => {
                      const quotation = sizeOption.quotations.find(
                        (item) => item.gsm === gsm,
                      );

                      return (
                        <div
                          className="quotation-matrix-card-item"
                          key={`${sizeOption.size}-${gsm}`}
                        >
                          <span className="quotation-matrix-card-label">{gsm} GSM</span>
                          <strong>
                            {quotation ? `${quotation.quantity.toLocaleString("en-IN")} pcs` : "—"}
                          </strong>
                          <span className="quotation-matrix-card-price">
                            {quotation ? `₹${quotation.pricePerBag}` : "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="pricing-note">
            Prices shown are estimated and may change according to printing, artwork, material, colour, order quantity and delivery location.
          </p>
        </section>

        <ProductGallery key={product.slug} product={product} />

        <section className="product-why-choose-section">
          <div className="product-section-heading compact-heading">
            <span>Why Choose This Bag</span>
            <h2>Why Businesses Choose This Bag</h2>
            <p>
              Built for businesses that need premium presentation, dependable quality and flexible customization.
            </p>
          </div>

          <div className="product-why-choose-grid">
            <article className="product-why-choose-card">
              <span className="product-why-choose-icon">✓</span>
              <h3>Premium Finish</h3>
              <p>Designed to give products a polished and high-value presentation.</p>
            </article>
            <article className="product-why-choose-card">
              <span className="product-why-choose-icon">✓</span>
              <h3>Strong &amp; Durable</h3>
              <p>Made for dependable everyday use and professional packaging.</p>
            </article>
            <article className="product-why-choose-card">
              <span className="product-why-choose-icon">✓</span>
              <h3>Custom Branding</h3>
              <p>Logo printing and customized artwork are available based on your requirement.</p>
            </article>
            <article className="product-why-choose-card">
              <span className="product-why-choose-icon">✓</span>
              <h3>Pan-India Supply</h3>
              <p>Ready stock and custom orders can be delivered across India.</p>
            </article>
          </div>
        </section>

        <section className="product-detail-grid">
          <div className="product-info-box">
            <h2>Key Features</h2>
            <ul>
              {product.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-info-box">
            <h2>Applications</h2>
            <ul>
              {product.applications.map((application) => (
                <li key={application}>
                  <span aria-hidden="true">✓</span>
                  {application}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-info-box">
            <h2>Customization Options</h2>
            <ul>
              {product.customizationOptions.map((option) => (
                <li key={option}>
                  <span aria-hidden="true">✓</span>
                  {option}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-info-box">
            <h2>Industries We Serve</h2>
            <ul>
              {product.industries.map((industry) => (
                <li key={industry}>
                  <span aria-hidden="true">✓</span>
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {product.sampleDesigns.length > 0 && (
          <section className="product-section">
            <div className="product-section-heading compact-heading">
              <span>Design Inspiration</span>
              <h2>Explore Sample Bag Concepts</h2>
              <p>
                These are shown for inspiration. Your final bag can be customized with your own branding and artwork.
              </p>
            </div>

            <div className="sample-design-grid">
              {product.sampleDesigns.map((design) => (
                <article className="sample-design-card" key={design.title}>
                  <div className="sample-design-placeholder">
                    <span>{design.title}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="product-cta-block">
          <h2>Need this bag in your size and quantity?</h2>
          <p>Share your requirement and we will help you with availability and quotation.</p>
          <a
            href={`${WHATSAPP_BASE_URL}${encodeURIComponent(`Hello Maruti Bag,\n\nI want a quotation for:\n\nProduct: ${product.title}\n\nRequired Size:\nQuantity:\nPlain or Printed:\nDelivery City:\n\nPlease share availability and quotation.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="product-button product-button-whatsapp"
          >
            Get Quote on WhatsApp <span>→</span>
          </a>
        </section>
      </div>
    </main>
  );
}
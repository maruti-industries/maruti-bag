"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { products } from "../../data/products";

const WHATSAPP_NUMBER = "919427152052";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

type Product = (typeof products)[number];
type ProductImageValue = Product["image"];

type VariantColor = {
  id: string;
  label: string;
  hex: string;
};

type AvailableColor = {
  colorId: string;
  image: ProductImageValue;
};

type VariantSizeOption = Product["sizeOptions"][number] & {
  availableColors?: AvailableColor[];
};

type VariantProduct = Product & {
  colorCatalog?: Record<string, VariantColor>;
  sizeOptions: VariantSizeOption[];
};

type GalleryItem = {
  id: string;
  label: string;
  image: ProductImageValue | null;
  isAvailable: boolean;
  ariaLabel: string;
};

type ProductGalleryProps = {
  product: Product;
  featuredImage: ProductImageValue;
  featuredLabel: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

function ProductGallery({ product, featuredImage, featuredLabel }: ProductGalleryProps) {
  const [activeGalleryId, setActiveGalleryId] = useState("front-view");
  const [activeImage, setActiveImage] = useState<ProductImageValue | null>(featuredImage);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const imageTransitionTimer = useRef<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "front-view",
      label: "Front View",
      image: featuredImage,
      isAvailable: true,
      ariaLabel: `Show ${product.title} in ${featuredLabel}`,
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
            src={activeImage ?? featuredImage}
            alt={
              activeGalleryId === "front-view"
                ? `${product.title} - ${featuredLabel}`
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

function ProductFaqAccordion() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqItems: FaqItem[] = [
    {
      question: "What is the minimum order quantity?",
      answer:
        "For custom printed bags, the minimum order quantity is generally 1000 pieces. Plain or unprinted bags may be available in smaller quantities depending on ready stock.",
    },
    {
      question: "Can I print my company logo on the bags?",
      answer:
        "Yes. We provide custom logo printing and artwork support based on your bag type, size, quantity and design requirement.",
    },
    {
      question: "Which sizes and GSM options are available?",
      answer:
        "Available sizes and GSM options vary by product. Share your requirement with us and we will recommend the most suitable combination.",
    },
    {
      question: "Do you provide ready stock?",
      answer:
        "Yes, selected products, sizes and colours may be available in ready stock. Availability should be confirmed before placing the order.",
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes. We supply ready stock and custom orders to customers across India.",
    },
    {
      question: "How is the final price calculated?",
      answer:
        "The final quotation depends on bag type, size, GSM, quantity, printing, finishing and delivery location.",
    },
    {
      question: "How long does manufacturing and delivery take?",
      answer:
        "Production and delivery time depend on order quantity, customization and destination. The expected timeline will be confirmed with the quotation.",
    },
    {
      question: "Can I request a sample before placing a bulk order?",
      answer:
        "Sample availability depends on the selected product and customization requirement. Customers can contact us to discuss suitable sample options.",
    },
  ];

  return (
    <section className="product-faq-section" aria-labelledby="product-faq-title">
      <div className="product-section-heading compact-heading">
        <span>Frequently Asked Questions</span>
        <h2 id="product-faq-title">Common Questions Before Ordering</h2>
        <p>
          Quick answers about minimum order quantity, customization, delivery and the quotation process.
        </p>
      </div>

      <div className="product-faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openFaqIndex === index;
          const panelId = `faq-panel-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <article className={`product-faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  className="product-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="product-faq-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                <p className="product-faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
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

  const variantProduct = product as VariantProduct;
  const firstSizeOption = variantProduct.sizeOptions[0];
  const firstColorId = firstSizeOption?.availableColors?.[0]?.colorId ?? "";

  const [selectedSize, setSelectedSize] = useState(firstSizeOption?.size ?? "");
  const [selectedColorId, setSelectedColorId] = useState(firstColorId);

  const selectedSizeOption =
    variantProduct.sizeOptions.find((item) => item.size === selectedSize) ??
    firstSizeOption;

  const availableColors = selectedSizeOption?.availableColors ?? [];
  const selectedAvailableColor =
    availableColors.find((item) => item.colorId === selectedColorId) ??
    availableColors[0];

  const selectedColor =
    selectedAvailableColor && variantProduct.colorCatalog
      ? variantProduct.colorCatalog[selectedAvailableColor.colorId]
      : undefined;

  const selectedImage = selectedAvailableColor?.image ?? product.image;
  const selectedGsm = selectedSizeOption?.quotations[0]?.gsm;
  const hasVariantSelector =
    Boolean(variantProduct.colorCatalog) && availableColors.length > 0;

  const handleSizeSelect = (size: string) => {
    const nextSizeOption = variantProduct.sizeOptions.find(
      (item) => item.size === size,
    );

    if (!nextSizeOption) {
      return;
    }

    setSelectedSize(size);

    const nextColors = nextSizeOption.availableColors ?? [];
    const currentColorStillAvailable = nextColors.some(
      (item) => item.colorId === selectedColorId,
    );

    if (!currentColorStillAvailable) {
      setSelectedColorId(nextColors[0]?.colorId ?? "");
    }
  };

  const quotationMessage = `Hello Maruti Bag,

I want a quotation for:

Product: ${product.title}
Required Size: ${selectedSize || ""}
Selected Colour: ${selectedColor?.label ?? ""}
GSM: ${selectedGsm ? `${selectedGsm} GSM` : ""}

Quantity:
Plain or Printed:
Delivery City:

Please share availability and quotation.`;

  const formatQuantity = (quantity: number | null) =>
    quantity ? `${quantity.toLocaleString("en-IN")} pcs` : "On request";

  const formatPrice = (price: number | null) =>
    typeof price === "number" ? `₹${price}` : "On request";

  const quotationGsmValues = Array.from(
    new Set(
      product.sizeOptions.flatMap((sizeOption) =>
        sizeOption.quotations.map((quotation) => quotation.gsm),
      ),
    ),
  ).sort((a, b) => a - b);

  const manufacturingSteps = [
    {
      title: "Share Your Requirement",
      description: "Customer shares bag type, size, quantity and customization requirements.",
      icon: "✉",
    },
    {
      title: "Choose Size & Specifications",
      description: "We finalize the size, colour, GSM and other specifications based on your requirement.",
      icon: "📏",
    },
    {
      title: "Design Approval",
      description: "If printing is required, artwork is finalized before production.",
      icon: "🎨",
    },
    {
      title: "Manufacturing",
      description: "Production begins using our manufacturing process.",
      icon: "⚙",
    },
    {
      title: "Quality Inspection",
      description: "Every order goes through quality inspection before packing.",
      icon: "✓",
    },
    {
      title: "Packing & Dispatch",
      description: "Orders are packed securely and dispatched across India.",
      icon: "📦",
    },
  ];

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-image">
          <Image
            key={`${selectedSize}-${selectedColorId}`}
            src={selectedImage}
            alt={
              selectedColor
                ? `${product.title} in ${selectedColor.label}, size ${selectedSize}`
                : product.title
            }
            width={900}
            height={700}
            priority
            className="product-variant-main-image"
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

          {hasVariantSelector && (
            <section className="product-variant-selector" aria-label="Choose product size and colour">
              <div className="product-variant-group">
                <div className="product-variant-heading">
                  <span>Choose Size</span>
                  <strong>{selectedSize}</strong>
                </div>

                <div className="product-size-selector" role="group" aria-label="Available sizes">
                  {variantProduct.sizeOptions.map((sizeOption) => {
                    const isSelected = sizeOption.size === selectedSize;

                    return (
                      <button
                        key={sizeOption.size}
                        type="button"
                        className={`product-size-option ${isSelected ? "is-selected" : ""}`}
                        onClick={() => handleSizeSelect(sizeOption.size)}
                        aria-pressed={isSelected}
                      >
                        {sizeOption.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="product-variant-group">
                <div className="product-variant-heading">
                  <span>Choose Colour</span>
                  <strong>{selectedColor?.label ?? "Select a colour"}</strong>
                </div>

                <div className="product-colour-selector" role="group" aria-label="Available colours">
                  {availableColors.map((availableColor) => {
                    const colour = variantProduct.colorCatalog?.[availableColor.colorId];

                    if (!colour) {
                      return null;
                    }

                    const isSelected = availableColor.colorId === selectedColorId;

                    return (
                      <button
                        key={availableColor.colorId}
                        type="button"
                        className={`product-colour-option ${isSelected ? "is-selected" : ""}`}
                        onClick={() => setSelectedColorId(availableColor.colorId)}
                        aria-label={`Select ${colour.label}`}
                        aria-pressed={isSelected}
                        title={colour.label}
                      >
                        <span
                          className="product-colour-swatch"
                          style={{ backgroundColor: colour.hex }}
                          aria-hidden="true"
                        />
                        <span>{colour.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="product-selected-variant" aria-live="polite">
                <span>Your Selection</span>
                <strong>
                  {selectedSize} • {selectedColor?.label} • {selectedGsm} GSM
                </strong>
              </div>
            </section>
          )}

          <a
            href={`${WHATSAPP_BASE_URL}${encodeURIComponent(quotationMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="product-button product-button-whatsapp"
          >
            Get Quote on WhatsApp <span>→</span>
          </a>


        </div>
      </div>

      <div className="product-detail-full-width">
        <div className="product-summary-grid">
          <div className="product-summary-card">
            <span>Available Sizes</span>
            <strong>{product.sizeOptions.map((item) => item.size).join(" • ")}</strong>
          </div>
          <div className="product-summary-card">
            <span>GSM Options</span>
            <strong>{Array.from(new Set(product.sizeOptions.flatMap((item) => item.quotations.map((quote) => `${quote.gsm} GSM`)))).join(" • ")}</strong>
          </div>
          {hasVariantSelector && (
            <div className="product-summary-card">
              <span>Available Colours</span>
              <strong>{availableColors.length} colours in every size</strong>
            </div>
          )}
          <div className="product-summary-card">
            <span>Carrying Capacity</span>
            <strong>{product.sizeOptions[0]?.quotations[0]?.capacity ?? "Available on request"}</strong>
          </div>
          <div className="product-summary-card">
            <span>Printing / Customization</span>
            <strong>{product.customizationOptions[0] ?? "Available on request"}</strong>
          </div>
        </div>

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
            <span>Bulk Order Pricing</span>
<h2>Estimated Pricing Guide</h2>
<p>
  Compare size, carrying capacity, order quantity and reference pricing before requesting your final quotation.
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
                              {quotation ? formatQuantity(quotation.quantity) : "—"}
                            </td>
                            <td className="matrix-price-cell">
                              {quotation ? formatPrice(quotation.pricePerBag) : "—"}
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
                            {quotation ? formatQuantity(quotation.quantity) : "—"}
                          </strong>
                          <span className="quotation-matrix-card-price">
                            {quotation ? formatPrice(quotation.pricePerBag) : "—"}
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

        <ProductGallery
          key={`${product.slug}-${selectedSize}-${selectedColorId}`}
          product={product}
          featuredImage={selectedImage}
          featuredLabel={`${selectedSize}, ${selectedColor?.label ?? "selected colour"}`}
        />

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

        <section className="product-manufacturing-section" aria-label="Manufacturing process timeline">
          <div className="product-section-heading compact-heading">
            <span>Manufacturing Process</span>
            <h2>How We Manufacture Your Bags</h2>
            <p>
              From your inquiry to final delivery, every order follows a professional manufacturing process focused on quality and timely dispatch.
            </p>
          </div>

          <div className="product-manufacturing-timeline">
            {manufacturingSteps.map((step, index) => (
              <article className="product-manufacturing-step" key={step.title}>
                <div className="product-manufacturing-step-marker">
                  <span className="product-manufacturing-step-number">{index + 1}</span>
                  <span className="product-manufacturing-step-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <div className="product-manufacturing-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
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
          <section className="product-section sample-design-section">
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
    <div className="sample-design-image-wrapper">
      <Image
        src={design.image}
        alt={design.title}
        width={700}
        height={700}
        className="sample-design-image"
      />
    </div>

    <div className="sample-design-content">
      <h3>{design.title}</h3>
      <p>Custom branding and artwork can be created for your business.</p>
    </div>
  </article>
))}
            </div>
          </section>
        )}

        <ProductFaqAccordion />

        <section className="product-cta-block">
          <h2>Need this bag in your size and quantity?</h2>
          <p>Share your requirement and we will help you with availability and quotation.</p>
          <a
            href={`${WHATSAPP_BASE_URL}${encodeURIComponent(quotationMessage)}`}
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
"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RelatedProducts from "../../components/RelatedProducts";
import { InventoryProduct, InventoryVariant } from "@/lib/inventory";
import { formatMoqCompact } from "@/lib/businessRules";

const WHATSAPP_NUMBER = "919427152052";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

type ProductMediaItem =
  | {
      type: "image";
      url: string;
      label: string;
    }
  | {
      type: "video";
      url: string;
      label: string;
    };

type ProductGalleryProps = {
  mediaItems: ProductMediaItem[];
  productName: string;
  featuredLabel: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

function normalizeMediaItems(product: InventoryProduct, selectedVariant: InventoryVariant | null): ProductMediaItem[] {
  const seenUrls = new Set<string>();
  const items: ProductMediaItem[] = [];

  const addItem = (item: ProductMediaItem) => {
    if (!item.url.trim()) {
      return;
    }

    const normalizedUrl = item.url.trim();
    if (seenUrls.has(normalizedUrl)) {
      return;
    }

    seenUrls.add(normalizedUrl);
    items.push(item);
  };

  const variantMainImage = selectedVariant?.media.mainImage?.trim() ?? "";
  const variantGalleryImages = selectedVariant?.media.galleryImages ?? [];
  const variantVideoUrl = selectedVariant?.media.videoUrl?.trim() ?? "";

  const fallbackMainImage = product.media.mainImage?.trim() ?? "";
  const fallbackGalleryImages = product.media.galleryImages ?? [];
  const fallbackVideoUrl = product.media.videoUrl?.trim() ?? "";

  const mainImage = variantMainImage || fallbackMainImage;
  if (mainImage) {
    addItem({ type: "image", url: mainImage, label: "Main view" });
  }

  for (const imageUrl of variantGalleryImages.length > 0 ? variantGalleryImages : fallbackGalleryImages) {
    if (imageUrl?.trim()) {
      addItem({ type: "image", url: imageUrl.trim(), label: "Gallery view" });
    }
  }

  const videoUrl = variantVideoUrl || fallbackVideoUrl;
  if (videoUrl) {
    addItem({ type: "video", url: videoUrl, label: "Product video" });
  }

  return items;
}

function ProductGallery({ mediaItems, productName, featuredLabel }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia = mediaItems[activeIndex] ?? mediaItems[0];
  const hasMedia = mediaItems.length > 0 && Boolean(activeMedia);

  return (
    <section className="product-media-gallery" aria-label="Product gallery">
      <div className="product-media-stage">
        {hasMedia && activeMedia ? (
          activeMedia.type === "video" ? (
            <div className="product-media-video-shell">
              <span className="product-media-badge">Product Video</span>
              <video
                src={activeMedia.url}
                controls
                playsInline
                preload="metadata"
                className="product-media-video"
              />
            </div>
          ) : (
            <div className="product-media-image-shell">
              <Image
                src={activeMedia.url}
                alt={`${productName} - ${featuredLabel}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="product-media-image"
                priority={false}
              />
            </div>
          )
        ) : (
          <div className="product-media-placeholder">
            <span className="product-media-placeholder-icon">📦</span>
            <p>Premium product photo coming soon</p>
            <span>High-resolution imagery will be shared soon.</span>
          </div>
        )}
      </div>

      {mediaItems.length > 1 && (
        <div className="product-media-thumbnails" role="list" aria-label="Product media thumbnails">
          {mediaItems.map((item, index) => {
            const isActive = activeIndex === index;
            const isVideo = item.type === "video";

            return (
              <button
                key={`${item.type}-${item.url}`}
                type="button"
                className={`product-media-thumb ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={isVideo ? `Show video preview` : `Show ${item.label}`}
                aria-pressed={isActive}
              >
                {isVideo ? (
                  <span className="product-media-thumb-video">
                    <span className="product-media-thumb-icon">▶</span>
                    <span>Video</span>
                  </span>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.label}
                    fill
                    sizes="88px"
                    className="product-media-thumb-image"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ProductFaqAccordion() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqItems: FaqItem[] = [
    {
      question: "What is the minimum order quantity?",
      answer:
        "The minimum order quantity is 1,000 pieces for custom-printed, plain and ready-stock orders.",
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

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: InventoryProduct;
  relatedProducts: InventoryProduct[];
}) {
  const sizeGroups = Object.entries(
    product.variants.reduce<Record<string, InventoryVariant[]>>((groups, variant) => {
      const size = variant.size.trim() || "Default";
      if (!groups[size]) {
        groups[size] = [];
      }
      groups[size].push(variant);
      return groups;
    }, {}),
  );

  const initialSize = sizeGroups[0]?.[0] ?? "";
  const initialSizeVariants = sizeGroups[0]?.[1] ?? [];
  const initialColour = initialSizeVariants[0]?.colour?.trim() ?? "";

  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [selectedColour, setSelectedColour] = useState(initialColour);

  const selectedSizeVariants = sizeGroups.find(([size]) => size === selectedSize)?.[1] ?? initialSizeVariants;

  const colourOptions = selectedSizeVariants.reduce<Array<{ label: string; variant: InventoryVariant }>>(
    (options, variant) => {
      const label = variant.colour.trim() || "Default";
      if (!options.some((option) => option.label === label)) {
        options.push({ label, variant });
      }
      return options;
    },
    [],
  );

  const selectedVariant =
    selectedSizeVariants.find((variant) => variant.colour === selectedColour) ?? selectedSizeVariants[0] ?? null;

  const mediaItems = normalizeMediaItems(product, selectedVariant);
  const galleryKey = selectedVariant ? `${product.slug}-${selectedVariant.sku}` : `${product.slug}-product`;
  const hasVariantSelector = colourOptions.length > 0;

  const handleSizeSelect = (size: string) => {
    const nextSizeVariants = sizeGroups.find(([groupSize]) => groupSize === size)?.[1] ?? [];

    if (nextSizeVariants.length === 0) {
      return;
    }

    setSelectedSize(size);

    const nextColourOptions = nextSizeVariants.reduce<Array<string>>((options, variant) => {
      const label = variant.colour.trim() || "Default";
      if (!options.includes(label)) {
        options.push(label);
      }
      return options;
    }, []);

    const currentColourStillAvailable = nextColourOptions.includes(selectedColour);
    setSelectedColour(currentColourStillAvailable ? selectedColour : nextColourOptions[0] ?? "");
  };

  const quotationMessage = `Hello Maruti Bag,

I want a quotation for:

Product: ${product.name}
SKU: ${selectedVariant?.sku ?? ""}
Required Size: ${selectedSize || ""}
Selected Colour: ${selectedColour || ""}
GSM: ${selectedVariant?.gsm ? `${selectedVariant.gsm} GSM` : ""}
MOQ: ${formatMoqCompact()}
Availability: ${selectedVariant?.availability || product.availabilitySummary.publicLabel}
Production Time: ${selectedVariant?.productionTime || ""}
Dispatch Time: ${selectedVariant?.dispatchTime || ""}

Quantity:
Plain or Printed:
Delivery City:

Please share availability and quotation.`;

  const formatPrice = (price: number | null) =>
    typeof price === "number" && price > 0
      ? `₹${price.toLocaleString("en-IN")}`
      : "Get Quote";

  const quotationGsmValues = Array.from(new Set(product.variants.map((variant) => variant.gsm))).sort(
    (a, b) => a - b,
  );

  const pricingRows = sizeGroups.flatMap(([size, variants]) =>
    quotationGsmValues.flatMap((gsm) => {
      const matchingVariants = variants.filter((variant) => variant.gsm === gsm);

      if (matchingVariants.length === 0) {
        return [];
      }

      const hasReadyStock = matchingVariants.some((variant) =>
        variant.availability.toLowerCase().includes("ready stock"),
      );

      const positiveRates = matchingVariants
        .map((variant) => variant.rate)
        .filter((rate) => typeof rate === "number" && rate > 0);

      const referenceRate =
        positiveRates.length > 0 ? Math.min(...positiveRates) : null;

      const rateUnit =
        matchingVariants.find((variant) => variant.rate > 0)?.rateUnit ||
        matchingVariants[0]?.rateUnit ||
        "Per Piece";

      return [
        {
          size,
          gsm,
          availability: hasReadyStock
            ? "Ready Stock Available"
            : "Enquire for Current Availability",
          rate: referenceRate,
          rateUnit,
        },
      ];
    }),
  );
 
  const formattedRelatedProducts = relatedProducts.map(
  (relatedProduct) => {
    const uniqueSizes = Array.from(
      new Set(
        relatedProduct.variants
          .map((variant) => variant.size.trim())
          .filter(Boolean),
      ),
    );

    const sizeOptions = uniqueSizes.map((size) => {
      const matchingVariants =
        relatedProduct.variants.filter(
          (variant) => variant.size.trim() === size,
        );

      return {
        size,
        quotations: matchingVariants.map((variant) => ({
          gsm: variant.gsm,
          quantity: null,
          capacity: variant.availability,
          pricePerBag:
            variant.rate > 0 ? variant.rate : null,
        })),
      };
    });

    const validRates = relatedProduct.variants
      .map((variant) => variant.rate)
      .filter((rate) => rate > 0);

    const validMoqValues = relatedProduct.variants
      .map((variant) => variant.moq)
      .filter((moq) => moq > 0);

    const firstVariant = relatedProduct.variants[0];

    return {
      slug: relatedProduct.slug,
      title: relatedProduct.name,

      description:
        relatedProduct.shortDescription ||
        relatedProduct.detailedDescription ||
        `${relatedProduct.name} available in multiple sizes, colours and customization options.`,

      image:
        relatedProduct.media.mainImage || undefined,

      availabilityLabel:
        relatedProduct.availabilitySummary.publicLabel,

      hasReadyStock:
        relatedProduct.availabilitySummary.hasReadyStock,

      minimumMoq:
        validMoqValues.length > 0
          ? Math.min(...validMoqValues)
          : null,

      startingPrice:
        validRates.length > 0
          ? Math.min(...validRates)
          : null,

      rateUnit:
        firstVariant?.rateUnit || "",

      sizeOptions,
    };
  },
);

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
    <>
      <Navbar />

      <main className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-detail-image">
            <ProductGallery
              key={galleryKey}
              mediaItems={mediaItems}
              productName={product.name}
              featuredLabel={selectedVariant ? `${selectedVariant.size}, ${selectedVariant.colour}` : product.name}
            />
          </div>

          <div className="product-detail-content">
            <div className="product-detail-header">
              <span className="product-category-label">{product.category}</span>
              <h1>{product.name}</h1>
            </div>

            <p className="product-detail-description">{product.detailedDescription}</p>

            <div className="product-highlights">
              <div className="product-highlight-item">
                <strong>{product.availabilitySummary.publicLabel}</strong>
                <span>Reference availability for planning and quotation.</span>
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
                    {sizeGroups.map(([size]) => {
                      const isSelected = size === selectedSize;

                      return (
                        <button
                          key={size}
                          type="button"
                          className={`product-size-option ${isSelected ? "is-selected" : ""}`}
                          onClick={() => handleSizeSelect(size)}
                          aria-pressed={isSelected}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="product-variant-group">
                  <div className="product-variant-heading">
                    <span>Choose Colour</span>
                    <strong>{selectedColour || "Select a colour"}</strong>
                  </div>

                  <div className="product-colour-selector" role="group" aria-label="Available colours">
                    {colourOptions.map((option) => {
                      const isSelected = option.label === selectedColour;

                      return (
                        <button
                          key={option.label}
                          type="button"
                          className={`product-colour-option ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedColour(option.label)}
                          aria-label={`Select ${option.label}`}
                          aria-pressed={isSelected}
                          title={option.label}
                        >
                          <span className="product-colour-swatch" aria-hidden="true" />
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="product-selected-variant" aria-live="polite">
                  <span>Current Selection</span>
                  <strong>
                    {selectedSize} • {selectedColour || "Select a colour"} • {selectedVariant?.gsm ?? "—"} GSM
                  </strong>
                </div>
              </section>
            )}

            <div className="product-variant-spec-grid" aria-label="Selected variant details">
              <div className="product-variant-spec-card">
                <span>Size</span>
                <strong>{selectedVariant?.size ?? (selectedSize || "—")}</strong>
              </div>
              <div className="product-variant-spec-card">
                <span>Colour</span>
                <strong>{selectedVariant?.colour ?? (selectedColour || "—")}</strong>
              </div>
              <div className="product-variant-spec-card">
                <span>GSM</span>
                <strong>{selectedVariant?.gsm ? `${selectedVariant.gsm} GSM` : "—"}</strong>
              </div>
              <div className="product-variant-spec-card">
                <span>MOQ</span>
                <strong>{formatMoqCompact()}</strong>
              </div>
              <div className="product-variant-spec-card">
                <span>Availability</span>
                <strong>{selectedVariant?.availability || product.availabilitySummary.publicLabel}</strong>
              </div>
              <div className="product-variant-spec-card">
                <span>Reference Price</span>
                <strong>{selectedVariant ? `${formatPrice(selectedVariant.rate)} / ${selectedVariant.rateUnit}` : "—"}</strong>
              </div>
            </div>

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
              <span>Bulk Order Guide</span>
              <h2>Size &amp; Availability Guide</h2>
              <p>
                Compare available sizes, GSM and current availability before requesting your final quotation.
              </p>
            </div>

            <div className="quotation-matrix-wrapper">
              <div className="quotation-matrix-table-wrapper">
                <table className="quotation-matrix-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>GSM</th>
                      <th>Availability</th>
                      <th>Rate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pricingRows.map((row) => (
                      <tr key={`${row.size}-${row.gsm}`}>
                        <td className="matrix-size-cell">{row.size}</td>
                        <td className="matrix-quantity-cell">{row.gsm} GSM</td>
                        <td className="matrix-quantity-cell">{row.availability}</td>
                        <td className="matrix-price-cell">
                          {row.rate
                            ? `${formatPrice(row.rate)} / ${row.rateUnit}`
                            : "Get Quote"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="quotation-matrix-mobile-list">
                {pricingRows.map((row) => (
                  <article
                    className="quotation-matrix-card"
                    key={`${row.size}-${row.gsm}`}
                  >
                    <div className="quotation-matrix-card-header">
                      <div>
                        <span>Size</span>
                        <h3>{row.size}</h3>
                      </div>

                      <div className="quotation-matrix-capacity">
                        {row.gsm} GSM
                      </div>
                    </div>

                    <div className="quotation-matrix-card-body">
                      <div className="quotation-matrix-card-item">
                        <span className="quotation-matrix-card-label">
                          Availability
                        </span>
                        <strong>{row.availability}</strong>

                        <span className="quotation-matrix-card-price">
                          {row.rate
                            ? `${formatPrice(row.rate)} / ${row.rateUnit}`
                            : "Get Quote"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="pricing-note">
  <div className="pricing-note-icon" aria-hidden="true">i</div>

  <div className="pricing-note-content">
    <strong>Pricing &amp; Order Note</strong>
    <p>
      Final pricing depends on order quantity, bag specifications,
      printing/artwork and delivery location. GST @18% and applicable
      freight charges are additional.
    </p>
  </div>
</div>
          </section>

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

          <RelatedProducts products={formattedRelatedProducts} />

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

      <Footer />
    </>
  );
}

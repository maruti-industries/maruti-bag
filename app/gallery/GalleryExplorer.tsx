"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import type { GalleryItem } from "@/lib/gallery";

type GalleryFilter = "All" | "Real Products" | string;

const WHATSAPP_NUMBER = "919427152052";

type GalleryExplorerProps = {
  items: GalleryItem[];
};

export default function GalleryExplorer({
  items,
}: GalleryExplorerProps) {
  const [activeCategory, setActiveCategory] =
    useState<GalleryFilter>("All");

  const galleryCategories = useMemo<GalleryFilter[]>(() => {
    const categories = Array.from(
      new Set(
        items
          .map((item) => item.category.trim())
          .filter(Boolean),
      ),
    );

    const hasRealProducts = items.some(
      (item) => item.isRealProduct || item.type === "product",
    );

    return [
      "All",
      ...(hasRealProducts ? ["Real Products"] : []),
      ...categories,
    ];
  }, [items]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] =
    useState<number | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Real Products"
          ? item.isRealProduct || item.type === "product"
          : item.category === activeCategory);

      const searchableText = [
        item.title,
        item.category,
        item.productSlug ?? "",
        item.description,
        item.type,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, items, searchQuery]);

  const selectedItem =
    selectedItemIndex !== null
      ? filteredItems[selectedItemIndex]
      : null;

  const relatedItems = useMemo(() => {
    if (!selectedItem) {
      return [];
    }

    const sameCategoryItems = filteredItems.filter(
      (item) =>
        item.id !== selectedItem.id &&
        item.category === selectedItem.category,
    );

    const fallbackItems = filteredItems.filter(
      (item) =>
        item.id !== selectedItem.id &&
        !sameCategoryItems.some(
          (relatedItem) => relatedItem.id === item.id,
        ),
    );

    return [...sameCategoryItems, ...fallbackItems].slice(0, 3);
  }, [filteredItems, selectedItem]);

  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItemIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setSelectedItemIndex((currentIndex) => {
          if (currentIndex === null || filteredItems.length === 0) {
            return null;
          }

          return currentIndex === 0
            ? filteredItems.length - 1
            : currentIndex - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setSelectedItemIndex((currentIndex) => {
          if (currentIndex === null || filteredItems.length === 0) {
            return null;
          }

          return currentIndex === filteredItems.length - 1
            ? 0
            : currentIndex + 1;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem, filteredItems.length]);

  const showPreviousItem = () => {
    if (selectedItemIndex === null || filteredItems.length === 0) {
      return;
    }

    setSelectedItemIndex(
      selectedItemIndex === 0
        ? filteredItems.length - 1
        : selectedItemIndex - 1,
    );
  };

  const showNextItem = () => {
    if (selectedItemIndex === null || filteredItems.length === 0) {
      return;
    }

    setSelectedItemIndex(
      selectedItemIndex === filteredItems.length - 1
        ? 0
        : selectedItemIndex + 1,
    );
  };


  const openRelatedItem = (itemId: string) => {
    const nextIndex = filteredItems.findIndex(
      (item) => item.id === itemId,
    );

    if (nextIndex !== -1) {
      setSelectedItemIndex(nextIndex);
    }
  };

  const createWhatsAppLink = (item: GalleryItem) => {
    const fallbackMessage = `Hello Maruti Bag,

I am interested in this gallery design:

Design: ${item.title}
Category: ${item.category}${
      item.productSlug ? `\nProduct: ${item.productSlug}` : ""
    }

Please share suitable sizes, GSM options, minimum order quantity, printing details and quotation.`;

    const message = item.whatsappMessage || fallbackMessage;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
  };

  return (
    <section className="gallery-explorer">
      <div className="gallery-toolbar">
        <div className="gallery-search">
          <Search aria-hidden="true" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setSelectedItemIndex(null);
            }}
            placeholder="Search jewellery, fashion, footwear..."
            aria-label="Search gallery designs"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedItemIndex(null);
              }}
              aria-label="Clear gallery search"
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>

        <div
  className="gallery-filter-list"
  role="group"
  aria-label="Filter gallery by category"
  onWheel={(event) => {
    
    const container = event.currentTarget;

    if (container.scrollWidth > container.clientWidth) {
      container.scrollLeft += event.deltaY;
    }
  }}
>
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`gallery-filter-button ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedItemIndex(null);
                }}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="gallery-results-header">
        <p>
          Showing <strong>{filteredItems.length}</strong>{" "}
          {filteredItems.length === 1 ? "design" : "designs"}
        </p>

        {(activeCategory !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
              setSelectedItemIndex(null);
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className="gallery-explorer-grid">
          {filteredItems.map((item, index) => {
            const whatsappLink = createWhatsAppLink(item);

            return (
              <article
                className="gallery-explorer-card"
                key={item.id}
                style={{
                  animationDelay: `${Math.min(index * 55, 440)}ms`,
                }}
              >
                <button
                  type="button"
                  className="gallery-explorer-image-button"
                  onClick={() => setSelectedItemIndex(index)}
                  aria-label={`Open larger preview of ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={760}
                    height={580}
                    className="gallery-explorer-image"
                  />

                  <span className="gallery-explorer-category">
                    {item.type === "product"
                      ? "Real Product"
                      : item.category}
                  </span>

                  <span className="gallery-explorer-preview">
                    View Larger
                  </span>
                </button>

                <div className="gallery-explorer-card-content">
                  <div className="gallery-explorer-card-heading">
                    <div>
                      <span>{item.productSlug ?? item.category}</span>
                      <h2>{item.title}</h2>
                    </div>

                    <span
                      className={`gallery-type-badge gallery-type-${item.type}`}
                    >
                      {item.type === "product"
                        ? "Product"
                        : "Inspiration"}
                    </span>
                  </div>

                  <p>{item.description}</p>

                  <div className="gallery-explorer-actions">
                    {item.type === "product" &&
                    item.productSlug ? (
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="gallery-view-product"
                      >
                        View Product
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gallery-whatsapp-enquiry"
                    >
                      <FaWhatsapp aria-hidden="true" />
                      <span>Enquire on WhatsApp</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="gallery-empty-state">
          <Search aria-hidden="true" />
          <h2>No matching designs found</h2>
          <p>
            Try another search term or clear the selected
            category.
          </p>

          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
              setSelectedItemIndex(null);
            }}
          >
            View All Designs
          </button>
        </div>
      )}

      <section className="gallery-conversion-cta">
  <div className="gallery-conversion-content">
    <div className="gallery-conversion-copy">
      <span className="gallery-conversion-label">
        CUSTOM MANUFACTURING
      </span>

      <h2>Found a Design That Fits Your Brand?</h2>

      <p>
        We can manufacture a similar bag with your logo, preferred colour,
        required size and printing specifications. Share your requirement
        directly with our team for suitable options and quotation.
      </p>

      <div className="gallery-conversion-points">
        <span>MOQ: 1,000 Pieces</span>
        <span>Ready Stock Options Available</span>
        <span>Multiple Sizes and GSM Options</span>
        <span>PAN India Delivery</span>
      </div>
    </div>

    <div className="gallery-conversion-action">
      <span>START YOUR ENQUIRY</span>

      <h3>Get the right bag for your business.</h3>

      <p>
        Tell us the bag type, quantity, size and printing requirement. Our team
        will help you choose a suitable option.
      </p>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hello Maruti Bag,

I viewed your gallery and would like a quotation for a customized bag.

Please help me with suitable bag type, size, GSM, printing options, minimum order quantity and delivery details.`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="gallery-conversion-button"
      >
        <FaWhatsapp aria-hidden="true" />
        <span>Get Quotation on WhatsApp</span>
        <span aria-hidden="true">→</span>
      </a>

      <small>
        Ready-stock and customized bulk enquiries are welcome.
      </small>
    </div>
  </div>
</section>

      {selectedItem && selectedItemIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} image preview`}
          onClick={() => setSelectedItemIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedItemIndex(null)}
            aria-label="Close image preview"
          >
            <X aria-hidden="true" />
          </button>


          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-lightbox-image-wrap">
  <Image
    src={selectedItem.image}
    alt={selectedItem.title}
    width={1200}
    height={900}
    className="gallery-lightbox-image"
  />

  {filteredItems.length > 1 && (
    <>
      <button
        type="button"
        className="gallery-lightbox-navigation gallery-lightbox-previous"
        onClick={(event) => {
          event.stopPropagation();
          showPreviousItem();
        }}
        aria-label="Show previous gallery image"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <button
        type="button"
        className="gallery-lightbox-navigation gallery-lightbox-next"
        onClick={(event) => {
          event.stopPropagation();
          showNextItem();
        }}
        aria-label="Show next gallery image"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </>
  )}

  <div className="gallery-lightbox-counter">
    {String(selectedItemIndex + 1).padStart(2, "0")} of{" "}
    {String(filteredItems.length).padStart(2, "0")}
  </div>
</div>

            <div className="gallery-lightbox-details">
              <span>
                {selectedItem.type === "product"
                  ? "Real Product"
                  : selectedItem.category}
              </span>

              <h2>{selectedItem.title}</h2>

              <p>{selectedItem.description}</p>

              <strong>
                Suitable for: {selectedItem.productSlug ?? selectedItem.category}
              </strong>

              <div className="gallery-lightbox-actions">
                {selectedItem.type === "product" &&
                selectedItem.productSlug ? (
                  <Link href={`/products/${selectedItem.productSlug}`}>
                    View Product
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}

                <a
                  href={createWhatsAppLink(selectedItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp aria-hidden="true" />
                  Enquire About This Design
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              {relatedItems.length > 0 && (
                <div className="gallery-related">
                  <div className="gallery-related-heading">
                    <span>You may also like</span>
                    <small>Explore similar designs</small>
                  </div>

                  <div className="gallery-related-list">
                    {relatedItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="gallery-related-item"
                        onClick={() => openRelatedItem(item.id)}
                        aria-label={`Open ${item.title}`}
                      >
                        <span className="gallery-related-image-wrap">
                          <Image
                            src={item.image}
                            alt=""
                            width={180}
                            height={140}
                            className="gallery-related-image"
                          />
                        </span>

                        <span className="gallery-related-copy">
                          <strong>{item.title}</strong>
                          <small>{item.category}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

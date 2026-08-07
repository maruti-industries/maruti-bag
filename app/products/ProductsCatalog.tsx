"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { InventoryProduct } from "@/lib/inventory";

type ProductsCatalogProps = {
  products: InventoryProduct[];
};

export default function ProductsCatalog({
  products,
}: ProductsCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = useMemo(() => {
    return [
      "ALL",
      ...Array.from(
        new Set(
          products
            .map((product) => product.category.trim())
            .filter(Boolean),
        ),
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        product.category === selectedCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.shortDescription
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <p>OUR PRODUCT CATALOGUE</p>

        <h1>Premium Packaging Solutions for Growing Businesses</h1>

        <span>
          Explore ready-stock and custom-manufactured bags available in
          multiple sizes, colours and GSM options.
        </span>
      </section>

      <section className="catalog-controls">
        <label className="catalog-search">
          <span className="sr-only">Search products</span>

          <input
            type="search"
            placeholder="Search by product or category"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div
          className="catalog-category-filters"
          aria-label="Filter products by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category ? "is-active" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category === "ALL" ? "All Products" : category}
            </button>
          ))}
        </div>
      </section>

      <section className="catalog-results">
        <div className="catalog-results-header">
          <h2>Explore Our Range</h2>

          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-state">
            <h3>No matching products found</h3>

            <p>
              Try another product name or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredProducts.map((product) => {
              const uniqueSizes = Array.from(
                new Set(
                  product.variants
                    .map((variant) => variant.size.trim())
                    .filter(Boolean),
                ),
              );

              const gsmValues = Array.from(
                new Set(
                  product.variants
                    .map((variant) => variant.gsm)
                    .filter((gsm) => gsm > 0),
                ),
              ).sort((first, second) => first - second);

              return (
                <article
                  className="catalog-card"
                  key={product.slug}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="catalog-card-image-link"
                    aria-label={`View ${product.name}`}
                  >
                    <div className="catalog-card-image">
                      {product.media.mainImage ? (
                        <Image
                          src={product.media.mainImage}
                          alt={product.name}
                          fill
                          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          className="catalog-card-image-element"
                        />
                      ) : (
                        <div className="catalog-card-placeholder">
                          <span>MARUTI BAG</span>
                          <strong>Premium Bag Collection</strong>
                        </div>
                      )}

                      {gsmValues.length > 0 && (
                        <span className="catalog-card-gsm">
                          {gsmValues
                            .map((gsm) => `${gsm} GSM`)
                            .join(" • ")}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="catalog-card-content">
                    <p className="catalog-card-category">
                      {product.category}
                    </p>

                    <h3>{product.name}</h3>

                    <p className="catalog-card-description">
                      {product.shortDescription ||
                        product.detailedDescription ||
                        `${product.name} available in multiple sizes, colours and customization options.`}
                    </p>

                    {uniqueSizes.length > 0 && (
                      <div className="catalog-card-sizes">
                        <span>Available Sizes</span>

                        <div>
                          {uniqueSizes.slice(0, 3).map((size) => (
                            <span key={size}>{size}</span>
                          ))}

                          {uniqueSizes.length > 3 && (
                            <span>+{uniqueSizes.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/products/${product.slug}`}
                      className="catalog-card-button"
                    >
                      Explore Product
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
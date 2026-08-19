"use client";

import Image from "next/image";
import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type HeroProductShowcaseProps = {
  children: ReactNode;
};

const heroProducts = [
  {
    title: "Non-Woven Box Bag",
    subtitle: "75 GSM • Custom Printed",
    image:
      "/images/sample-designs/non-woven-box-agriculture-bag-design.png",
  },
  {
    title: "Metallic Laminated Bag",
    subtitle: "110 GSM • Premium Finish",
    image:
      "/images/sample-designs/metallic-laminated-luxury-boutique-design.png",
  },
  {
    title: "BOPP Matt Laminated Bag",
    subtitle: "100 GSM • 18 Colours",
    image:
      "/images/sample-designs/bopp-matt-footwear-brand-design.png",
  },
  {
    title: "Matt Metallic Bag",
    subtitle: "110 GSM • 8 Colours",
    image:
      "/images/sample-designs/matt-metallic-corporate-premium-design.png",
  },
];

export default function HeroProductShowcase({
  children,
}: HeroProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const showNextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroProducts.length);
  }, []);

  const showPreviousSlide = useCallback(() => {
    setActiveIndex(
      (current) =>
        (current - 1 + heroProducts.length) % heroProducts.length,
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(showNextSlide, 5200);

    return () => window.clearInterval(interval);
  }, [isPaused, showNextSlide]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    if (Math.abs(swipeDistance) > 55) {
      if (swipeDistance > 0) {
        showPreviousSlide();
      } else {
        showNextSlide();
      }
    }

    touchStartX.current = null;
  };

  const activeProduct = heroProducts[activeIndex];

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-slider-backgrounds" aria-hidden="true">
        {heroProducts.map((product, index) => (
          <div
            className={`hero-background-slide ${
              index === activeIndex ? "is-active" : ""
            }`}
            key={product.title}
          >
            {/* Cinematic background layer */}
<Image
  src={product.image}
  alt=""
  fill
  priority={index === 0}
  sizes="100vw"
  className="hero-background-image hero-background-image-blur"
/>

{/* Complete product layer */}
<Image
  src={product.image}
  alt=""
  fill
  priority={index === 0}
  sizes="100vw"
  className="hero-background-image hero-background-image-product"
/>
          </div>
        ))}
      </div>

      <div className="hero-slider-overlay" aria-hidden="true" />

      <div className="hero-slider-content">
        {children}
      </div>

      <button
        type="button"
        className="hero-slider-arrow hero-slider-arrow-left"
        onClick={showPreviousSlide}
        aria-label="Show previous product"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <button
        type="button"
        className="hero-slider-arrow hero-slider-arrow-right"
        onClick={showNextSlide}
        aria-label="Show next product"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="hero-slider-bottom">
        <div className="hero-slider-product">
  <strong>{activeProduct.title}</strong>
  <small>{activeProduct.subtitle}</small>
</div>

        <div className="hero-slider-dots" aria-label="Featured products">
          {heroProducts.map((product, index) => (
            <button
              key={product.title}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${product.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  {
    value: 350,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    value: 40,
    suffix: "+",
    label: "Cities Reached",
  },
  {
    value: 7,
    suffix: "+",
    label: "States Supplied",
  },
  {
    value: 4,
    suffix: "",
    label: "Product Categories",
  },
];

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = numberRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;

        const duration = 4000;
        const startTime = performance.now();

        const updateCount = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(value * easedProgress));

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        };

        requestAnimationFrame(updateCount);
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={numberRef} className="business-stat-number">
      {count}
      {suffix}
    </span>
  );
}

export default function BusinessStats() {
  return (
    <section className="business-stats-section" id="business-reach">
      <div className="business-stats-container">
        <div className="business-stats-heading">
          <p className="business-stats-label">OUR BUSINESS REACH</p>

          <h2>Trusted by Businesses Across India</h2>

          <span>
            Supplying ready-stock and custom-printed bags to growing businesses,
            retailers and brands.
          </span>
        </div>

        <div className="business-stats-grid">
          {stats.map((stat) => (
            <article className="business-stat-card" key={stat.label}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
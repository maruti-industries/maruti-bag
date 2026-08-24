import Link from "next/link";

export default function NotFound() {
  return (
      <main className="not-found-page">
        <section className="not-found-content" aria-labelledby="not-found-title">
          <p className="not-found-code">404</p>
          <p className="not-found-label">PAGE NOT FOUND</p>

          <h1 id="not-found-title">Page Not Found</h1>

          <p className="not-found-description">
            The page you are looking for may have moved or is no longer
            available. You can return home or continue browsing our bags.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="not-found-primary-link">
              Return Home
            </Link>

            <Link href="/products" className="not-found-secondary-link">
              Explore Products
            </Link>
          </div>
        </section>
      </main>
  );
}

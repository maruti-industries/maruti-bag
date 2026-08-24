const galleryLoadingCards = Array.from({ length: 6 }, (_, index) => index);

export default function GalleryLoading() {
  return (
    <main className="gallery-loading-page" aria-busy="true">
      <p
        className="gallery-loading-status"
        role="status"
        aria-live="polite"
      >
        Loading gallery…
      </p>

      <section className="gallery-loading-hero" aria-hidden="true">
        <span className="gallery-loading-kicker" />
        <div className="gallery-loading-heading" />
        <div className="gallery-loading-heading gallery-loading-heading-short" />
        <div className="gallery-loading-description" />
      </section>

      <section className="gallery-loading-content" aria-hidden="true">
        <div className="gallery-loading-toolbar">
          <div className="gallery-loading-search" />

          <div className="gallery-loading-filters">
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        <div className="gallery-loading-results" />

        <div className="gallery-loading-grid">
          {galleryLoadingCards.map((card) => (
            <article className="gallery-loading-card" key={card}>
              <div className="gallery-loading-card-image" />
              <div className="gallery-loading-card-content">
                <span className="gallery-loading-card-label" />
                <div className="gallery-loading-card-title" />
                <div className="gallery-loading-card-copy" />
                <div className="gallery-loading-card-copy gallery-loading-card-copy-short" />
                <div className="gallery-loading-card-action" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

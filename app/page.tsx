import Navbar from "./components/Navbar";
import TrustBar from "./components/TrustBar";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Industries from "./components/Industries";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>

      <Navbar />


      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">PREMIUM PACKAGING SOLUTIONS</p>

          <h1>
            Premium BOPP, Metallic &amp; Non-Woven Bags for Bulk Buyers Across India
          </h1>

          <p className="hero-description">
            Maruti Bag supports brands, retailers, wholesalers and export-focused buyers with ready stock, custom printing, pan-India delivery and export inquiries.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="primary-button">
              Request a Quote
            </a>

            <a href="https://wa.me/919427152052" className="whatsapp-button">
              WhatsApp Inquiry
            </a>
          </div>

          <div className="hero-points" aria-label="Key service highlights">
            <span>Ready Stock</span>
            <span>Custom Printing</span>
            <span>Pan-India Delivery</span>
            <span>Export Inquiries</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="image-placeholder">
            <div className="image-placeholder-inner">
              <span>PRODUCT PHOTOS</span>
              <strong>Product Photos Coming Soon</strong>
              <p>Premium packaging visuals will be added soon.</p>
            </div>
          </div>
        </div>
      </section>
<TrustBar />
<Products />
<Gallery />
<Industries />
<About />
<WhyChooseUs />
<Contact />
<Footer />
    </main>
  );
}
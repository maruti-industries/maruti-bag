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
      India&apos;s Trusted BOPP & Non-Woven Bag Manufacturer
    </h1>

    <p className="hero-description">
      Premium Laminated BOPP Bags, Metallic Bags, Metallic Matt Bags and
      Non-Woven Box Bags with Ready Stock, Custom Printing and PAN India
      Delivery.
    </p>

    <div className="hero-buttons">
      <button>Get Free Quote</button>

      <a
        href="https://wa.me/919574624260"
        className="whatsapp-button"
      >
        WhatsApp Us
      </a>
    </div>

    <div className="hero-points">
      <span>✔ Ready Stock</span>
      <span>✔ MOQ from 100 Bags</span>
      <span>✔ Custom Printing</span>
      <span>✔ PAN India Delivery</span>
    </div>
  </div>

  <div className="hero-visual">
    <div className="image-placeholder">
      Product Images Coming Soon
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
import Link from "next/link";

import ReusableBopp from "./components/ReusableBopp";
import BusinessStats from "./components/BusinessStats";
import Navbar from "./components/Navbar";
import TrustBar from "./components/TrustBar";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import Industries from "./components/Industries";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeroProductShowcase from "./components/HeroProductShowcase";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="hero">
        <HeroProductShowcase>
          <div className="hero-content">
            <p className="hero-label">PREMIUM PACKAGING SOLUTIONS</p>

            <h1>
              Packaging That Makes
              <span>Your Brand Stand Out.</span>
            </h1>

            <p className="hero-description">
              Premium BOPP, metallic and non-woven bags manufactured for
              retailers, wholesalers and growing brands across India.
            </p>

            <div className="hero-buttons">
              <Link href="/products" className="primary-button">
                Explore Products
              </Link>

              <Link href="/#contact" className="whatsapp-button">
                Request a Quote
              </Link>
            </div>

            <div
              className="hero-trust-line"
              aria-label="Business service highlights"
            >
              <span>Ready Stock</span>
              <i aria-hidden="true" />
              <span>Custom Printing</span>
              <i aria-hidden="true" />
              <span>Pan-India Delivery</span>
            </div>
          </div>
        </HeroProductShowcase>
      </section>

      <TrustBar />
      <Products />
      <ReusableBopp />
      <Gallery />
      <Industries />
      <About />
      <WhyChooseUs />
      <BusinessStats />
      <Contact />
      <Footer />
    </main>
  );
} 

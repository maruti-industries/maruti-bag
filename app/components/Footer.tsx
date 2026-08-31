import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/919427152052";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link
              href="/"
              className="footer-logo"
              aria-label="Go to Maruti Bag Multipack homepage"
            >
              <Image
                src="/images/Maruti Bag Multipack Orange Logo.png"
                alt="Maruti Bag Multipack"
                width={517}
                height={190}
              />
            </Link>

            <p>
              Surat-based manufacturer of non-woven, laminated BOPP, metallic
              and custom-printed bags for retailers, wholesalers and growing
              brands across India.
            </p>

            <div className="footer-badges">
              <span>Direct Manufacturer</span>
              <span>Ready Stock</span>
              <span>Pan-India Delivery</span>
            </div>
          </div>

          <div className="footer-links">
            <p className="footer-column-label">EXPLORE</p>
            <h3>Quick Links</h3>

            <nav aria-label="Footer navigation">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/#industries">Industries</Link>
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>

          <div className="footer-contact">
            <p className="footer-column-label">CONTACT</p>
            <h3>Connect With Us</h3>

            <div className="footer-contact-list">
              <a href="tel:+919427171799" aria-label="Call Maruti Bag Multipack">
                <span className="footer-contact-icon">
                  <Phone aria-hidden="true" />
                </span>

                <span>
                  <small>Call Us</small>
                  <strong>+91 94271 71799</strong>
                </span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Maruti Bag Multipack on WhatsApp"
              >
                <span className="footer-contact-icon footer-whatsapp-icon">
                  <FaWhatsapp aria-hidden="true" />
                </span>

                <span>
                  <small>WhatsApp</small>
                  <strong>+91 94271 52052</strong>
                </span>
              </a>

              <a
                href="mailto:marutibagd@gmail.com"
                aria-label="Email Maruti Bag Multipack"
              >
                <span className="footer-contact-icon">
                  <Mail aria-hidden="true" />
                </span>

                <span>
                  <small>Email</small>
                  <strong>marutibagd@gmail.com</strong>
                </span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=17-18%2C+Janta+Bazar%2C+Near+By+Krishna+Circle%2C+Parvat+Patiya%2C+Surat%2C+Gujarat%2C+395010"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Maruti Bag Multipack location in Google Maps"
              >
                <span className="footer-contact-icon">
                  <MapPin aria-hidden="true" />
                </span>

                <span>
                  <small>Manufacturing Location</small>
                  <strong>
                      17-18, Janta Bazar, Near By Krishna Circle,
                  <br />
                      Parvat Patiya, Surat, Gujarat 395010
                  </strong>
                  <small className="footer-gstin">
    GSTIN: 24BXCPH1217E1Z7
  </small>
                </span>
              </a>
            </div>
          </div>

          <div className="footer-cta">
            <p className="footer-column-label">START YOUR ENQUIRY</p>

            <h3>Need bags for your business?</h3>

            <p>
              Share your required bag type, size, quantity and printing details
              with our team.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp-button"
              aria-label="Get a quote from Maruti Bag Multipack on WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>Get Quote on WhatsApp</span>
              <span aria-hidden="true">→</span>
            </a>

            <small>
              Ready-stock and customized bulk enquiries are welcome.
            </small>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Maruti Bag Multipack. All rights reserved.</p>

          <div className="footer-bottom-links">
            <span>Surat, Gujarat</span>
            <span aria-hidden="true">•</span>
            <span>Supplying Across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

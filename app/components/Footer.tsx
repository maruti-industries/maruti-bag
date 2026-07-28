export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>MARUTI BAG</h2>
          <p>
            Surat-based manufacturer of non-woven, laminated BOPP and custom
            printed bags with PAN India delivery.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#products">Products</a>
          <a href="#gallery">Gallery</a>
          <a href="#industries">Industries</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Surat, Gujarat, India</p>
          <p>+91 9427171799</p>
          <p>info@marutibag.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Maruti Bag. All rights reserved.</p>
      </div>
    </footer>
  );
}
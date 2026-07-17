export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-heading">
        <p>CONTACT US</p>
        <h2>Let&apos;s Discuss Your Packaging Requirements</h2>
        <span> 
          Whether you need ready stock or custom printed bags, our team is
          ready to help you with the right solution.
        </span>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+91 XXXXXXXXXX</p>
          </div>

          <div className="contact-card">
            <h3>💬 WhatsApp</h3>
            <p>+91 XXXXXXXXXX</p>
          </div>

          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>info@marutibag.com</p>
          </div>

          <div className="contact-card">
            <h3>📍 Location</h3>
            <p>Surat, Gujarat, India</p>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <textarea
            rows={5}
            placeholder="Tell us about your bag requirement..."
          ></textarea>

          <button type="submit">Send Inquiry</button>
        </form>
      </div>
    </section>
  );
}
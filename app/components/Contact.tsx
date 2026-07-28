"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const BUSINESS_WHATSAPP_URL = "https://wa.me/919427152052?text=";

type FormState = {
  name: string;
  company: string;
  phone: string;
  city: string;
  productType: string;
  size: string;
  quantity: string;
  requirement: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  company: "",
  phone: "",
  city: "",
  productType: "",
  size: "",
  quantity: "",
  requirement: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const requiredFields: Array<keyof FormState> = [
      "name",
      "phone",
      "city",
      "productType",
      "size",
      "quantity",
      "requirement",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field].trim();

      if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (formData.phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const message = [
      "New inquiry from Maruti Bag website",
      `Customer Name: ${formData.name.trim()}`,
      `Business/Company: ${formData.company.trim() || "Not provided"}`,
      `Phone Number: ${formData.phone.trim()}`,
      `City: ${formData.city.trim()}`,
      `Product/Bag Type: ${formData.productType.trim()}`,
      `Required Size: ${formData.size.trim()}`,
      `Quantity: ${formData.quantity.trim()}`,
      `Plain/Printed Requirement: ${formData.requirement.trim()}`,
      `Additional Message: ${formData.message.trim() || "Not provided"}`,
    ].join("\n");

    const waUrl = `${BUSINESS_WHATSAPP_URL}${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

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
            <p>+91 9427171799</p>
          </div>

          <div className="contact-card">
            <h3>💬 WhatsApp</h3>
            <p>+91 94271 52052</p>
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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="name">Customer Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="field-error">{errors.name}</p> : null}
            </div>

            <div className="field-group">
              <label htmlFor="company">Business or Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
            </div>

            <div className="field-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                aria-invalid={Boolean(errors.city)}
              />
              {errors.city ? <p className="field-error">{errors.city}</p> : null}
            </div>

            <div className="field-group">
              <label htmlFor="productType">Product or Bag Type</label>
              <input
                id="productType"
                name="productType"
                type="text"
                value={formData.productType}
                onChange={handleChange}
                placeholder="e.g. Non-woven loop handle bag"
                aria-invalid={Boolean(errors.productType)}
              />
              {errors.productType ? (
                <p className="field-error">{errors.productType}</p>
              ) : null}
            </div>

            <div className="field-group">
              <label htmlFor="size">Required Size</label>
              <input
                id="size"
                name="size"
                type="text"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. 12x14+4"
                aria-invalid={Boolean(errors.size)}
              />
              {errors.size ? <p className="field-error">{errors.size}</p> : null}
            </div>

            <div className="field-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 5000 pieces"
                aria-invalid={Boolean(errors.quantity)}
              />
              {errors.quantity ? (
                <p className="field-error">{errors.quantity}</p>
              ) : null}
            </div>

            <div className="field-group">
              <label htmlFor="requirement">Plain or Printed Requirement</label>
              <select
                id="requirement"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                aria-invalid={Boolean(errors.requirement)}
              >
                <option value="">Select an option</option>
                <option value="Plain Bags">Plain Bags</option>
                <option value="Printed Bags">Printed Bags</option>
                <option value="Both Plain and Printed">Both Plain and Printed</option>
              </select>
              {errors.requirement ? (
                <p className="field-error">{errors.requirement}</p>
              ) : null}
            </div>
          </div>

          <div className="field-group field-group-full">
            <label htmlFor="message">Additional Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your bag requirement..."
            ></textarea>
          </div>

          <p className="form-note">
            This will open WhatsApp with your inquiry details so our team can respond quickly.
          </p>

          <button type="submit">Send Inquiry</button>
        </form>
      </div>
    </section>
  );
}
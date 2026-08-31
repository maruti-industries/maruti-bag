"use client";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useState,
} from "react";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

const BUSINESS_WHATSAPP_NUMBER = "919427152052";
const BUSINESS_WHATSAPP_URL =
  `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=`;

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

type FormErrors = Partial<
  Record<keyof FormState, string>
>;

type ContactItem = {
  title: string;
  value: string;
  helper: string;
  href: string;
  icon: ReactNode;
  iconClassName: string;
  external?: boolean;
};

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

const contactItems: ContactItem[] = [
  {
    title: "Call Us",
    value: "+91 94271 71799",
    helper:
      "Discuss availability and bulk requirements.",
    href: "tel:+919427171799",
    icon: <Phone aria-hidden="true" />,
    iconClassName: "contact-icon-phone",
  },
  {
    title: "WhatsApp",
    value: "+91 94271 52052",
    helper:
      "Send your complete requirement directly.",
    href: `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`,
    icon: <FaWhatsapp aria-hidden="true" />,
    iconClassName: "contact-icon-whatsapp",
    external: true,
  },
  {
    title: "Email",
    value: "marutibagd@gmail.com",
    helper:
      "Share artwork or detailed specifications.",
    href: "mailto:marutibagd@gmail.com",
    icon: <Mail aria-hidden="true" />,
    iconClassName: "contact-icon-email",
  },
  {
    title: "Manufacturing Location",
    value: "Surat, Gujarat, India",
    helper:
      "Supplying ready-stock and custom orders across India.",
    href:
      "https://www.google.com/maps/search/?api=1&query=Surat%2C+Gujarat%2C+India",
    icon: <MapPin aria-hidden="true" />,
    iconClassName: "contact-icon-location",
    external: true,
  },
];

export default function Contact() {
  const [formData, setFormData] =
    useState<FormState>(initialFormState);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const handleChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    const requiredFields: Array<
      keyof FormState
    > = [
      "name",
      "phone",
      "city",
      "productType",
      "size",
      "quantity",
      "requirement",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] =
          "This field is required.";
      }
    });

    const normalizedPhone =
      formData.phone.replace(/[\s-]/g, "");

    if (
      normalizedPhone &&
      !/^\+?[0-9]{7,15}$/.test(
        normalizedPhone,
      )
    ) {
      nextErrors.phone =
        "Please enter a valid phone number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const enquiryMessage = [
      "New Maruti Bag Multipack Website Enquiry",
      "",
      `Customer Name: ${formData.name.trim()}`,
      `Business/Company: ${
        formData.company.trim() ||
        "Not provided"
      }`,
      `Phone Number: ${formData.phone.trim()}`,
      `City: ${formData.city.trim()}`,
      `Product/Bag Type: ${formData.productType.trim()}`,
      `Required Size: ${formData.size.trim()}`,
      `Quantity: ${formData.quantity.trim()} pieces`,
      `Requirement: ${formData.requirement.trim()}`,
      `Additional Message: ${
        formData.message.trim() ||
        "Not provided"
      }`,
      "",
      "Please confirm availability and quotation.",
    ].join("\n");

    const whatsappUrl =
      `${BUSINESS_WHATSAPP_URL}` +
      encodeURIComponent(enquiryMessage);

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-container">
        <div className="contact-heading">
          <p>CONTACT MARUTI BAG MULTIPACK</p>

          <h2>
            Tell Us What Your Business Needs
          </h2>

          <span>
            Share your preferred bag, size,
            quantity and printing requirement. We
            will help you confirm the suitable
            option and quotation.
          </span>
        </div>

        <div className="contact-content">
          <aside className="contact-info">
            <div className="contact-intro-card">
              <span>
                DIRECT MANUFACTURER SUPPORT
              </span>

              <h3>
                Clear answers before you place
                your order.
              </h3>

              <p>
                Connect directly with our team for
                product availability,
                customization, quantities and
                delivery information.
              </p>

              <div className="contact-response">
                <span
                  className="contact-response-dot"
                  aria-hidden="true"
                />

                <span>
                  WhatsApp enquiry ready
                </span>
              </div>
            </div>

            <div className="contact-list">
              {contactItems.map((item) => (
                <a
                  className="contact-card"
                  href={item.href}
                  key={item.title}
                  target={
                    item.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={`${item.title}: ${item.value}`}
                >
                  <span
                    className={`contact-card-icon ${item.iconClassName}`}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>

                  <div className="contact-card-content">
                    <h3>{item.title}</h3>
                    <strong>
                      {item.value}
                    </strong>
                    <p>{item.helper}</p>
                  </div>

                  <span
                    className="contact-card-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </aside>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="contact-form-heading">
              <div>
                <span>
                  QUICK REQUIREMENT FORM
                </span>

                <h3>
                  Prepare Your Enquiry
                </h3>
              </div>

              <p>
                Fields marked{" "}
                <strong>*</strong> are required.
              </p>
            </div>

            <div className="form-grid">
              <div className="field-group">
                <label htmlFor="name">
                  Customer Name{" "}
                  <span>*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  aria-invalid={
                    Boolean(errors.name)
                  }
                  aria-describedby={
                    errors.name
                      ? "name-error"
                      : undefined
                  }
                />

                {errors.name ? (
                  <p
                    className="field-error"
                    id="name-error"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="company">
                  Business or Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="field-group">
                <label htmlFor="phone">
                  Phone Number{" "}
                  <span>*</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  aria-invalid={
                    Boolean(errors.phone)
                  }
                  aria-describedby={
                    errors.phone
                      ? "phone-error"
                      : undefined
                  }
                />

                {errors.phone ? (
                  <p
                    className="field-error"
                    id="phone-error"
                  >
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="city">
                  City <span>*</span>
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  aria-invalid={
                    Boolean(errors.city)
                  }
                  aria-describedby={
                    errors.city
                      ? "city-error"
                      : undefined
                  }
                />

                {errors.city ? (
                  <p
                    className="field-error"
                    id="city-error"
                  >
                    {errors.city}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="productType">
                  Product or Bag Type{" "}
                  <span>*</span>
                </label>

                <select
                  id="productType"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  aria-invalid={Boolean(
                    errors.productType,
                  )}
                  aria-describedby={
                    errors.productType
                      ? "productType-error"
                      : undefined
                  }
                >
                  <option value="">
                    Select a bag type
                  </option>

                  <option value="Non-Woven Box Bag">
                    Non-Woven Box Bag
                  </option>

                  <option value="Metallic Laminated Bag">
                    Metallic Laminated Bag
                  </option>

                  <option value="BOPP Matt Laminated Bag">
                    BOPP Matt Laminated Bag
                  </option>

                  <option value="Matt Metallic Bag">
                    Matt Metallic Bag
                  </option>

                  <option value="Need Product Guidance">
                    I need product guidance
                  </option>
                </select>

                {errors.productType ? (
                  <p
                    className="field-error"
                    id="productType-error"
                  >
                    {errors.productType}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="size">
                  Required Size{" "}
                  <span>*</span>
                </label>

                <input
                  id="size"
                  name="size"
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 12×14+4"
                  aria-invalid={
                    Boolean(errors.size)
                  }
                  aria-describedby={
                    errors.size
                      ? "size-error"
                      : undefined
                  }
                />

                {errors.size ? (
                  <p
                    className="field-error"
                    id="size-error"
                  >
                    {errors.size}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="quantity">
                  Quantity <span>*</span>
                </label>

                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  aria-invalid={Boolean(
                    errors.quantity,
                  )}
                  aria-describedby={
                    errors.quantity
                      ? "quantity-error"
                      : undefined
                  }
                />

                {errors.quantity ? (
                  <p
                    className="field-error"
                    id="quantity-error"
                  >
                    {errors.quantity}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="requirement">
                  Plain or Printed{" "}
                  <span>*</span>
                </label>

                <select
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  aria-invalid={Boolean(
                    errors.requirement,
                  )}
                  aria-describedby={
                    errors.requirement
                      ? "requirement-error"
                      : undefined
                  }
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Plain Bags">
                    Plain Bags
                  </option>

                  <option value="Custom Printed Bags">
                    Custom Printed Bags
                  </option>

                  <option value="Both Plain and Printed">
                    Both Plain and Printed
                  </option>

                  <option value="Need Guidance">
                    Not sure — need guidance
                  </option>
                </select>

                {errors.requirement ? (
                  <p
                    className="field-error"
                    id="requirement-error"
                  >
                    {errors.requirement}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="field-group field-group-full">
              <label htmlFor="message">
                Additional Requirement
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention preferred colour, printing details, delivery city or any other requirement."
              />
            </div>

            <div className="contact-form-footer">
              <p className="form-note">
                Your information will open
                securely in WhatsApp as a
                prepared enquiry message.
              </p>

              <button type="submit">
                <span>
                  Send Enquiry on WhatsApp
                </span>

                <span aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

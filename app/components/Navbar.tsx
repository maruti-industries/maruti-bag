"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      
      {/* MARUTI BAG MULTIPACK LOGO */}
      <Link
        href="/"
        className="navbar-logo"
        onClick={closeMenu}
        aria-label="Maruti Bag Multipack home"
      >
        <Image
          src="/images/Maruti Bag Multipack Orange Logo.png"
          alt="Maruti Bag Multipack"
          width={517}
          height={190}
          priority
          className="navbar-logo-image"
        />
      </Link>

      {/* NAVIGATION */}
      <nav
        id="primary-navigation"
        className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}
        aria-label="Primary navigation"
      >
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>

        <Link href="/products" onClick={closeMenu}>
          Products
        </Link>

        <Link href="/#industries" onClick={closeMenu}>
          Industries
        </Link>

        <Link href="/gallery" onClick={closeMenu}>
          Gallery
        </Link>

        <Link href="/#about" onClick={closeMenu}>
          About
        </Link>

        <Link href="/#contact" onClick={closeMenu}>
          Contact
        </Link>
      </nav>

      {/* RIGHT SIDE */}
      <div className="navbar-actions">
        <Link
          href="/#contact"
          className="quote-btn"
          onClick={closeMenu}
        >
          Get Quote
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className={`navbar-menu-button ${
            isMenuOpen ? "navbar-menu-button-open" : ""
          }`}
          onClick={() => {
            setIsMenuOpen((current) => !current);
          }}
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

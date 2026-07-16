import Image from "next/image";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        <Image
          src="/images/Latest Logo.png"
          alt="Maruti Bag"
          width={170}
          height={60}
          priority
        />
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#products">Products</a>
        <a href="#industries">Industries</a>
        <a href="#gallery">Gallery</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <a
        href="https://wa.me/919574624260"
        className="quote-btn"
        target="_blank"
      >
        Get Quote
      </a>

    </header>
  );
}
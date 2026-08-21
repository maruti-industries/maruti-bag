import type { Metadata } from "next";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryExplorer from "./GalleryExplorer";

import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title:
    "Gallery | Non Woven Bag Designs & Custom Printed Bag Ideas",

  description:
    "Explore Maruti Bag's premium gallery featuring non-woven bags, BOPP laminated bags, metallic laminated bags and custom printed packaging designs for jewellery, fashion, retail, gifting, footwear, cosmetics and corporate brands.",

  keywords: [
    "Non Woven Bag Gallery",
    "BOPP Laminated Bag",
    "Matt Laminated Bag",
    "Metallic Laminated Bag",
    "Custom Printed Bags",
    "Bag Design Gallery",
    "Jewellery Bag Design",
    "Corporate Gift Bag",
    "Retail Packaging",
    "Garment Bag",
    "Shopping Bag Manufacturer",
    "Maruti Bag",
    "Surat Bag Manufacturer",
  ],

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title: "Maruti Bag Gallery",
    description:
      "Browse premium bag designs and real manufactured products from Maruti Bag.",
    url: "https://www.marutibag.com/gallery",
    siteName: "Maruti Bag",
    images: [
      {
        url: "/images/bopp-matt-laminated-bag-bottle-green.png",
        width: 1200,
        height: 630,
        alt: "Maruti Bag Gallery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Maruti Bag Gallery",
    description:
      "Premium non-woven and laminated bag gallery with custom branding inspiration.",
    images: ["/images/bopp-matt-laminated-bag-bottle-green.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      {/* SAME NAVBAR AS HOME PAGE */}
      <Navbar />

      <main className="gallery-page">
        <section className="gallery-page-hero">
          <p>MARUTI BAG GALLERY</p>

          <h1>Explore Products and Custom Branding Ideas</h1>

          <span>
            Browse real manufactured bags and premium branding concepts
            created for jewellery, fashion, footwear, gifting, retail and
            growing businesses.
          </span>
        </section>

        <GalleryExplorer items={galleryItems} />
      </main>

      <Footer />
    </>
  );
}

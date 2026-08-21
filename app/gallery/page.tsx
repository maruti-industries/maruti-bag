import type { Metadata } from "next";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryExplorer from "./GalleryExplorer";

import { getGalleryItems } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Product Gallery",
  description:
    "Browse real Maruti Bag product photos and custom branding ideas for jewellery, fashion, footwear, gifting, retail and other businesses.",
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

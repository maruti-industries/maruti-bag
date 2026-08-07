import "server-only";

import { readSheetRows } from "@/lib/googleSheets";

export type GalleryItemType =
  | "product"
  | "inspiration"
  | "custom-design"
  | "factory"
  | "video";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  type: GalleryItemType;
  productSlug?: string;
  description: string;
  image: string;
  galleryImages: string[];
  videoUrl?: string;
  isRealProduct: boolean;
  featured: boolean;
  displayPriority: number;
  whatsappMessage?: string;
};

function normalizeText(value: string | undefined) {
  return String(value ?? "").trim();
}

function normalizeUpper(value: string | undefined) {
  return normalizeText(value).toUpperCase();
}

function splitList(value: string | undefined) {
  return normalizeText(value)
    .split(/[\n,|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseItemType(value: string | undefined): GalleryItemType {
  const type = normalizeUpper(value);

  if (type === "PRODUCT") return "product";
  if (type === "CUSTOM DESIGN") return "custom-design";
  if (type === "FACTORY") return "factory";
  if (type === "VIDEO") return "video";

  return "inspiration";
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const rows = await readSheetRows("Gallery");

  return rows
    .filter((row) => {
  const visibility = normalizeUpper(
    row["Website Visibility"],
  );

  return visibility === "SHOW" || visibility === "YES";
})
    .map((row) => ({
      id: normalizeText(row["Gallery ID"]),
      title: normalizeText(row["Title"]),
      category: normalizeText(row["Category"]),
      type: parseItemType(row["Item Type"]),
      productSlug:
        normalizeText(row["Product Slug"]) || undefined,
      description: normalizeText(row["Short Description"]),
      image: normalizeText(row["Main Image"]),
      galleryImages: splitList(row["Gallery Images"]),
      videoUrl: normalizeText(row["Video URL"]) || undefined,
      isRealProduct:
        normalizeUpper(row["Real Product"]) === "YES",
      featured: normalizeUpper(row["Featured"]) === "YES",
      displayPriority:
        Number(row["Display Priority"]) || 9999,
      whatsappMessage:
        normalizeText(row["WhatsApp Message"]) || undefined,
    }))
    .filter(
      (item) =>
        item.id &&
        item.title &&
        item.category &&
        item.image,
    )
    .sort(
      (firstItem, secondItem) =>
        firstItem.displayPriority -
        secondItem.displayPriority,
    );
}
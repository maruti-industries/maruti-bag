import "server-only";

import {
  MINIMUM_ORDER_QUANTITY,
  normalizeInventoryColour,
} from "@/lib/businessRules";

export interface InventoryVariant {
  sku: string;
  colour: string;
  gsm: number;
  size: string;
  rate: number;
  rateUnit: string;
  moq: number;
  availability: string;
  availabilityType: "ready" | "manufacturing";
  productionTime: string;
  dispatchTime: string;
  featured: boolean;

    media: {
    mainImage: string;
    galleryImages: string[];
    videoUrl: string;
  };
}

export interface AvailabilitySummary {
  hasReadyStock: boolean;
  readyStockVariants: number;
  manufacturingVariants: number;
  totalVisibleVariants: number;
  publicLabel: string;
}

export interface InventoryProduct {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  defaultGsm: number;
  defaultMoq: number;
  featured: boolean;
  displayPriority: number;
  media: {
    mainImage: string;
    galleryImages: string[];
    videoUrl: string;
  };
  seo: {
    title: string;
    description: string;
  };
  availabilitySummary: AvailabilitySummary;
  variants: InventoryVariant[];
}

export interface ProductsApiResponse {
  success: boolean;
  count: number;
  products: InventoryProduct[];
  generatedAt: string;
}

export interface ProductApiResponse {
  success: boolean;
  product: InventoryProduct;
  generatedAt: string;
}

function getInventoryApiBaseUrl(): string {
  const baseUrl = process.env.INVENTORY_API_URL;

  if (!baseUrl) {
    throw new Error("Missing INVENTORY_API_URL environment variable for inventory API.");
  }

  return baseUrl;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => isString(item));
}

function isInventoryVariant(value: unknown): value is InventoryVariant {
  if (!isRecord(value)) {
    return false;
  }
  const media = value.media;
  return (
    isString(value.sku) &&
    isString(value.colour) &&
    isNumber(value.gsm) &&
    isString(value.size) &&
    isNumber(value.rate) &&
    isString(value.rateUnit) &&
    isNumber(value.moq) &&
    isString(value.availability) &&
    (value.availabilityType === "ready" || value.availabilityType === "manufacturing") &&
    isString(value.productionTime) &&
    isString(value.dispatchTime) &&
    isBoolean(value.featured) &&
isRecord(media) &&
isString(media.mainImage) &&
isStringArray(media.galleryImages) &&
isString(media.videoUrl)
  );
}

function isAvailabilitySummary(value: unknown): value is AvailabilitySummary {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isBoolean(value.hasReadyStock) &&
    isNumber(value.readyStockVariants) &&
    isNumber(value.manufacturingVariants) &&
    isNumber(value.totalVisibleVariants) &&
    isString(value.publicLabel)
  );
}

function isInventoryProduct(value: unknown): value is InventoryProduct {
  if (!isRecord(value)) {
    return false;
  }

  const media = value.media;
  const seo = value.seo;

  return (
    isString(value.slug) &&
    isString(value.name) &&
    isString(value.category) &&
    isString(value.shortDescription) &&
    isString(value.detailedDescription) &&
    isNumber(value.defaultGsm) &&
    isNumber(value.defaultMoq) &&
    isBoolean(value.featured) &&
    isNumber(value.displayPriority) &&
    isRecord(media) &&
    isString(media.mainImage) &&
    isStringArray(media.galleryImages) &&
    isString(media.videoUrl) &&
    isRecord(seo) &&
    isString(seo.title) &&
    isString(seo.description) &&
    isAvailabilitySummary(value.availabilitySummary) &&
    Array.isArray(value.variants) &&
    value.variants.every((item) => isInventoryVariant(item))
  );
}

function isProductsApiResponse(value: unknown): value is ProductsApiResponse {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isBoolean(value.success) &&
    isNumber(value.count) &&
    Array.isArray(value.products) &&
    value.products.every((item) => isInventoryProduct(item)) &&
    isString(value.generatedAt)
  );
}

function isProductApiResponse(value: unknown): value is ProductApiResponse {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isBoolean(value.success) &&
    isInventoryProduct(value.product) &&
    isString(value.generatedAt)
  );
}

function applyWebsiteBusinessRules(product: InventoryProduct): InventoryProduct {
  return {
    ...product,
    defaultMoq: MINIMUM_ORDER_QUANTITY,
    variants: product.variants.map((variant) => ({
      ...variant,
      colour: normalizeInventoryColour(variant.colour),
      moq: MINIMUM_ORDER_QUANTITY,
    })),
  };
}

export async function getInventoryProducts(): Promise<InventoryProduct[]> {
  try {
    const baseUrl = getInventoryApiBaseUrl();
    const response = await fetch(`${baseUrl}?action=products`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Inventory products request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isProductsApiResponse(data) || !data.success || !Array.isArray(data.products)) {
      throw new Error("Inventory products response payload was invalid.");
    }

    return data.products.map(applyWebsiteBusinessRules);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[inventory] Failed to load inventory products: ${message}`);
    return [];
  }
}

export async function getInventoryProduct(slug: string): Promise<InventoryProduct | null> {
  try {
    const baseUrl = getInventoryApiBaseUrl();
    const encodedSlug = encodeURIComponent(slug);
    const response = await fetch(`${baseUrl}?action=product&slug=${encodedSlug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Inventory product request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isProductApiResponse(data) || !data.success || !data.product) {
      throw new Error("Inventory product response payload was invalid.");
    }

    return applyWebsiteBusinessRules(data.product);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[inventory] Failed to load inventory product for slug "${slug}": ${message}`);
    return null;
  }
}

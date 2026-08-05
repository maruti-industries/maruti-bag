export type GalleryItemType = "product" | "inspiration";

export type GalleryCategory =
  | "Real Products"
  | "Jewellery"
  | "Fashion"
  | "Footwear"
  | "Corporate"
  | "Retail"
  | "Gifting"
  | "Agriculture"
  | "Wedding"
  | "Cosmetics"
  | "Sweet Shops";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  type: GalleryItemType;
  image: string;
  relatedProduct: string;
  description: string;
  productLink?: string;
  keywords: string[];
};

export const galleryItems: GalleryItem[] = [
  /* =====================================================
     REAL PRODUCTS
  ===================================================== */

  {
  id: "real-bopp-matt-laminated-bag",
  title: "BOPP Matt Laminated Bag",
  category: "Real Products",
  type: "product",
  image:
    "/images/bopp-matt-bag/bopp-matt-laminated-bag-bottle-green.png",
  relatedProduct: "BOPP Matt Laminated Bag",
  description:
    "Real BOPP matt laminated bag in bottle green, suitable for retail stores, garments, gifting and custom branded packaging.",
  productLink: "/products/bopp-matt-laminated-bag",
  keywords: [
    "bopp",
    "matt laminated",
    "bottle green",
    "retail",
    "garment",
    "gift",
    "printed bag",
    "custom branding",
  ],
},
  {
    id: "real-metallic-laminated-bag",
    title: "Metallic Laminated Bag",
    category: "Real Products",
    type: "product",
    image: "/images/golden-metallic-bag.jpeg",
    relatedProduct: "Metallic Laminated Bag",
    description:
      "Real metallic laminated bag with a premium finish for jewellery, gifting, boutiques and luxury retail.",
    productLink: "/products/metallic-laminated-bag",
    keywords: [
      "metallic",
      "laminated",
      "golden",
      "luxury",
      "jewellery",
      "gift",
      "boutique",
    ],
  },

  /* =====================================================
     BOPP MATT DESIGNS
  ===================================================== */

  {
    id: "bopp-corporate-gift",
    title: "Corporate Gift Packaging Design",
    category: "Corporate",
    type: "inspiration",
    image: "/images/sample-designs/bopp-matt-corporate-gift-design.png",
    relatedProduct: "BOPP Matt Laminated Bag",
    description:
      "Professional corporate gifting concept suitable for employee gifts, events and premium business packaging.",
    keywords: [
      "corporate",
      "gift",
      "employee gifting",
      "business",
      "bopp",
      "premium",
    ],
  },
  {
    id: "bopp-fashion-brand",
    title: "Fashion Brand Packaging Design",
    category: "Fashion",
    type: "inspiration",
    image: "/images/sample-designs/bopp-matt-fashion-brand-design.png",
    relatedProduct: "BOPP Matt Laminated Bag",
    description:
      "Elegant custom bag concept designed for fashion labels, garment stores and designer collections.",
    keywords: [
      "fashion",
      "garment",
      "clothing",
      "boutique",
      "designer",
      "bopp",
    ],
  },
  {
    id: "bopp-footwear-brand",
    title: "Footwear Brand Packaging Design",
    category: "Footwear",
    type: "inspiration",
    image: "/images/sample-designs/bopp-matt-footwear-brand-design.png",
    relatedProduct: "BOPP Matt Laminated Bag",
    description:
      "Premium footwear packaging concept for shoe stores, sports brands and retail footwear businesses.",
    keywords: [
      "footwear",
      "shoe",
      "sports",
      "retail",
      "bopp",
      "brand",
    ],
  },
  {
    id: "bopp-retail-store",
    title: "Retail Store Packaging Design",
    category: "Retail",
    type: "inspiration",
    image: "/images/sample-designs/bopp-matt-retail-store-design.png",
    relatedProduct: "BOPP Matt Laminated Bag",
    description:
      "Clean branded packaging concept created for modern retail stores and growing consumer businesses.",
    keywords: [
      "retail",
      "store",
      "shopping",
      "consumer",
      "brand",
      "bopp",
    ],
  },

  /* =====================================================
     MATT METALLIC DESIGNS
  ===================================================== */

  {
    id: "matt-metallic-corporate-premium",
    title: "Corporate Premium Packaging Design",
    category: "Corporate",
    type: "inspiration",
    image:
      "/images/sample-designs/matt-metallic-corporate-premium-design.png",
    relatedProduct: "Matt Metallic Bag",
    description:
      "Premium corporate packaging concept suitable for executive gifts and high-value business presentations.",
    keywords: [
      "corporate",
      "premium",
      "executive",
      "business gift",
      "metallic",
    ],
  },
  {
    id: "matt-metallic-jewellery",
    title: "Jewellery Brand Packaging Design",
    category: "Jewellery",
    type: "inspiration",
    image:
      "/images/sample-designs/matt-metallic-jewellery-brand-design.png",
    relatedProduct: "Matt Metallic Bag",
    description:
      "Luxury metallic packaging concept for jewellery stores, wedding collections and premium gifting.",
    keywords: [
      "jewellery",
      "gold",
      "wedding",
      "luxury",
      "metallic",
      "ornament",
    ],
  },
  {
    id: "matt-metallic-luxury-boutique",
    title: "Luxury Boutique Packaging Design",
    category: "Fashion",
    type: "inspiration",
    image:
      "/images/sample-designs/matt-metallic-luxury-boutique-design.png",
    relatedProduct: "Matt Metallic Bag",
    description:
      "Sophisticated metallic bag concept for luxury boutiques and premium fashion businesses.",
    keywords: [
      "luxury",
      "boutique",
      "fashion",
      "designer",
      "metallic",
    ],
  },
  {
    id: "matt-metallic-wedding",
    title: "Wedding Collection Packaging Design",
    category: "Wedding",
    type: "inspiration",
    image:
      "/images/sample-designs/matt-metallic-wedding-collection-design.png",
    relatedProduct: "Matt Metallic Bag",
    description:
      "Elegant wedding packaging concept for bridal collections, return gifts and celebration businesses.",
    keywords: [
      "wedding",
      "bridal",
      "marriage",
      "return gift",
      "collection",
      "metallic",
    ],
  },

  /* =====================================================
     METALLIC LAMINATED DESIGNS
  ===================================================== */

  {
    id: "metallic-cosmetics",
    title: "Cosmetics Brand Packaging Design",
    category: "Cosmetics",
    type: "inspiration",
    image:
      "/images/sample-designs/metallic-laminated-cosmetics-brand-design.png",
    relatedProduct: "Metallic Laminated Bag",
    description:
      "Modern metallic packaging concept for cosmetics, skincare, beauty stores and premium personal-care brands.",
    keywords: [
      "cosmetics",
      "beauty",
      "skincare",
      "makeup",
      "personal care",
      "metallic",
    ],
  },
  {
    id: "metallic-gift-shop",
    title: "Gift Shop Packaging Design",
    category: "Gifting",
    type: "inspiration",
    image:
      "/images/sample-designs/metallic-laminated-gift-shop-design.png",
    relatedProduct: "Metallic Laminated Bag",
    description:
      "Attractive metallic packaging concept for gift shops, festive collections and celebration products.",
    keywords: [
      "gift shop",
      "gifting",
      "festival",
      "celebration",
      "metallic",
    ],
  },
  {
    id: "metallic-jewellery-store",
    title: "Jewellery Store Packaging Design",
    category: "Jewellery",
    type: "inspiration",
    image:
      "/images/sample-designs/metallic-laminated-jewellery-store-design.png",
    relatedProduct: "Metallic Laminated Bag",
    description:
      "Premium jewellery-store bag concept created for elegant branding and luxury product presentation.",
    keywords: [
      "jewellery",
      "jewelry store",
      "luxury",
      "gold",
      "ornament",
      "metallic",
    ],
  },
  {
    id: "metallic-luxury-boutique",
    title: "Metallic Luxury Boutique Design",
    category: "Fashion",
    type: "inspiration",
    image:
      "/images/sample-designs/metallic-laminated-luxury-boutique-design.png",
    relatedProduct: "Metallic Laminated Bag",
    description:
      "Luxury retail concept designed for boutiques, designer fashion and premium customer packaging.",
    keywords: [
      "boutique",
      "fashion",
      "luxury",
      "designer",
      "metallic",
      "retail",
    ],
  },

  /* =====================================================
     NON-WOVEN BOX DESIGNS
  ===================================================== */

  {
    id: "non-woven-agriculture",
    title: "Agriculture Business Packaging Design",
    category: "Agriculture",
    type: "inspiration",
    image:
      "/images/sample-designs/non-woven-box-agriculture-bag-design.png",
    relatedProduct: "Non-Woven Box Bag",
    description:
      "Professional non-woven packaging idea for agriculture businesses, seeds, organic products and farm brands.",
    keywords: [
      "agriculture",
      "farm",
      "organic",
      "seeds",
      "farmer",
      "non woven",
    ],
  },
  {
    id: "non-woven-garment-store",
    title: "Garment Store Packaging Design",
    category: "Fashion",
    type: "inspiration",
    image:
      "/images/sample-designs/non-woven-box-garment-store-bag-design.png",
    relatedProduct: "Non-Woven Box Bag",
    description:
      "Practical branded packaging concept for garment stores, clothing retailers and everyday fashion businesses.",
    keywords: [
      "garment",
      "clothing",
      "fashion",
      "retail",
      "non woven",
    ],
  },
  {
    id: "non-woven-jewellery",
    title: "Non-Woven Jewellery Packaging Design",
    category: "Jewellery",
    type: "inspiration",
    image:
      "/images/sample-designs/non-woven-box-jewellery-bag-design.png",
    relatedProduct: "Non-Woven Box Bag",
    description:
      "Reusable jewellery-store packaging concept combining practical construction with branded presentation.",
    keywords: [
      "jewellery",
      "store",
      "reusable",
      "non woven",
      "branding",
    ],
  },
  {
    id: "non-woven-sweet-shop",
    title: "Sweet Shop Packaging Design",
    category: "Sweet Shops",
    type: "inspiration",
    image:
      "/images/sample-designs/non-woven-box-sweet-shop-bag-design.png",
    relatedProduct: "Non-Woven Box Bag",
    description:
      "Reusable branded bag concept for sweet shops, bakeries, festive gifting and food businesses.",
    keywords: [
      "sweet shop",
      "bakery",
      "mithai",
      "food",
      "festival",
      "non woven",
    ],
  },
];

export const galleryCategories = [
  "All",
  "Real Products",
  "Jewellery",
  "Fashion",
  "Footwear",
  "Corporate",
  "Retail",
  "Gifting",
  "Agriculture",
  "Wedding",
  "Cosmetics",
  "Sweet Shops",
] as const;

export type GalleryFilter = (typeof galleryCategories)[number];
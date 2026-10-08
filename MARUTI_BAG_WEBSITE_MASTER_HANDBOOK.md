# Maruti Bag Multipack Website — Permanent Master Handbook

**Purpose:** This is the permanent A-to-Z handover file for the Maruti Bag Multipack website. Keep it with the project and give it to any future developer, AI assistant, hosting technician, or SEO specialist **before they make changes**.

**Project location (owner’s Windows computer):** `D:\Development\maruti-bag`

**Live website:** `https://www.marutibagmultipack.com/`

**Last consolidated:** 8 October 2026

**Source history:** Consolidated from the complete working decisions in the chats **Website Competitor Analysis** and **Continue responsive testing**, plus the earlier codebase audit and later Hostinger/security work.

---

## 1. How to use this file for life

When asking any AI or developer for help, attach this file and say:

> Read `MARUTI_BAG_WEBSITE_MASTER_HANDBOOK.md` completely before changing anything. Inspect the current code because the code is the final truth when it is newer than this handbook. Preserve approved design, routes, business logic, product data, SEO, and security. Make the smallest safe change, test it, and update the handbook change log.

This file is independent of any ChatGPT subscription. It is ordinary Markdown text and can be opened in VS Code, Notepad, GitHub, or any AI tool.

### Rules for future helpers

1. Read this entire file first.
2. Inspect the current Git status and relevant files before editing.
3. Never expose, paste, screenshot, commit, or upload secret environment-variable values.
4. Back up or commit before major work.
5. Preserve approved design, routes, slugs, business rules, and data sources.
6. Make focused changes; do not redesign or rewrite unrelated areas.
7. Run lint and a production build after code changes.
8. Test the affected pages on desktop, tablet, and mobile.
9. Update the change log at the bottom of this file.

---

## 2. Business identity and long-term goal

### Brand

- Business: **Maruti Bag Multipack**
- Location: Surat, Gujarat, India
- Positioning: premium manufacturer and supplier of retail and wholesale packaging bags
- Official brand direction: geometric **M** symbol with the complete **“Maruti Bag Multipack”** lockup on a clean/light background
- Website must feel premium, trustworthy, fast, practical, and manufacturer-led—not like a generic marketplace template.

### Main products

- BOPP matt laminated bags
- Metallic laminated bags
- Matt metallic bags
- Non-woven bags, including box and loop-handle formats
- Ready-stock and custom-printed packaging solutions in multiple sizes, colours, and GSM options

### Target customers

- Retailers
- Wholesalers
- Distributors
- Businesses needing ready-stock or custom-printed packaging
- Buyers across Surat, Gujarat, and India

### Main business objective

The site must generate genuine wholesale enquiries and orders. A successful visitor should be able to:

1. Discover Maruti Bag Multipack through Google.
2. Trust the company and understand its manufacturing/supply capability.
3. Inspect products, sizes, colours, GSM, stock, MOQ, and product media.
4. Send a clear WhatsApp quotation enquiry or call/email the business.

### Search-growth goal

The goal is to grow from strong local visibility in **Surat** to relevant searches across **India**. Priority themes include:

- BOPP bag manufacturer
- BOPP laminated bag manufacturer
- Non-woven bag manufacturer
- Printed BOPP bags
- Packaging bag manufacturer
- Wholesale packaging bags
- Relevant Surat, Gujarat, and India variations

Google ranking cannot be guaranteed. Sustainable growth depends on technically healthy pages, useful product content, strong Google Business Profile activity, genuine reviews, Search Console data, and consistent authority—not keyword stuffing.

---

## 3. Non-negotiable project principles

- Permanent, independent website usable for years.
- Reliability, speed, security, SEO, and maintainability come before unnecessary visual experiments.
- Responsive support target: **320px through 2560px**.
- Preserve approved design, data, routes, slugs, and enquiry flows.
- Avoid unnecessary dependency or configuration changes.
- Avoid large rewrites of `globals.css` without controlled visual regression testing.
- Use one authoritative source for each business fact.
- Keep product and sitemap sources synchronized.
- Keep one consistent public contact identity across the site, Google Business Profile, WhatsApp, and other channels.
- The approved MOQ used during responsive work is **1,000 pieces**. Search the code for stale `500 pieces` claims before publishing business-content changes.
- Never publish unverified claims about client counts, states/cities served, dispatch, pricing, GST/freight, manufacturing capacity, or quality processes.

---

## 4. Current technology and project commands

### Core stack

- Next.js App Router
- Current known Next.js version after security update: **16.3.6**
- React / React DOM: **19.2.4**
- TypeScript strict mode
- Tailwind CSS 4 through PostCSS
- `lucide-react` and `react-icons`
- Google authentication/Sheets utilities
- Next Image with Cloudinary remote-image support
- Hostinger Business Web Hosting, yearly plan
- Production Node version selected in Hostinger: **22.x**

### Important npm scripts

The production build must use Webpack because Hostinger’s Turbopack build previously failed internally:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

Always inspect the current `package.json`; it wins if intentionally updated later.

### Standard local checks

Run from `D:\Development\maruti-bag`:

```bat
npm install
npm run lint
npm run build
```

Expected production-build routes include:

- `/`
- `/_not-found`
- `/gallery`
- `/products`
- `/products/[slug]`
- `/robots.txt`
- `/sitemap.xml`

---

## 5. Architecture and important files

Always use `rg` or VS Code search to confirm current locations before editing.

| Area | Important file/location | Purpose |
|---|---|---|
| Root layout/metadata | `app/layout.tsx` | Global metadata, layout, shared site shell |
| Homepage | `app/page.tsx` and `app/components/*` | Hero, products, industries, gallery, about, contact |
| Products catalogue | `app/products/page.tsx`, `app/products/ProductsCatalog.tsx` | Live catalogue, search, category filters |
| Product route | `app/products/[slug]/page.tsx` | Fetches one product and related products |
| Product UI | `app/products/[slug]/ProductDetailsClient.tsx` | Variants, media, pricing, MOQ, WhatsApp, FAQs |
| Inventory | `lib/inventory.ts` | Server-only live product API and validation |
| Gallery route | `app/gallery/page.tsx` | Live gallery page |
| Gallery data | `lib/googleSheets.ts`, `lib/gallery.ts` | Google Sheets authentication, fetch, parsing |
| Legacy products | `app/data/products.ts` | Historical product data; previously used by sitemap |
| Legacy gallery | `app/data/galleryItems.ts` | Historical/static gallery data |
| Global styles | `app/globals.css` | Large accumulated responsive and component CSS |
| Sitemap | `app/sitemap.ts` | Search-engine URLs |
| Robots | `app/robots.ts` | Crawler rules |
| Next config | `next.config.ts` | Image-host and framework configuration |
| TypeScript | `tsconfig.json` | Compiler and path configuration |
| Static assets | `public/images` | Logos and local product/design images |

### Main navigation and conversion structure

The approved information architecture includes:

- Home
- Products
- Industries
- Gallery
- About
- Contact
- Get Quote / WhatsApp quotation

Some sections are homepage anchors rather than dedicated routes. Check each link from non-home pages so `#contact` is not mistakenly used where `/#contact` is required.

---

## 6. Product and inventory system

### Live data flow

```text
INVENTORY_API_URL
  -> ?action=products or ?action=product&slug=...
  -> server-side fetch with 60-second revalidation
  -> runtime validation in lib/inventory.ts
  -> InventoryProduct[]
  -> homepage, catalogue, and product details
```

Known environment-variable name: `INVENTORY_API_URL`.

Other secret/config names must be discovered from the current source. Never invent, rename, or reveal their values.

### Inventory-row rules

- Product Slug and SKU identify usable rows.
- Blank separator rows must be ignored.
- Quantity `0` displays **Enquire for Current Availability**.
- Quantity greater than `0` displays **Ready Stock Available**.
- Rate, images, and video may be blank if the UI handles them gracefully.
- Product fields may include slug, SKU, category, colour, GSM, size, quantity, rate unit, MOQ, public status, production/dispatch timing, and website visibility.
- Historic inventory displays included a `5–7 Days` dispatch value. Treat dispatch time as business data; do not hard-code it everywhere.
- Earlier data correction checkpoints included `Coffee/Brown`, `Navy Blue`, and a first three-layer size inferred as `9x10x3`. Verify against the live Sheet before changing.

### Product-detail behavior

The product page groups variants by size, supports colour and variant selection, builds media with product fallbacks, deduplicates media, shows images/video/thumbnails, displays specifications/MOQ/availability/reference price, builds a size/GSM matrix, includes related products and FAQs, and prepares a variant-aware WhatsApp message.

### Critical data risks

1. Strict validation can reject the whole API payload if one required field changes type.
2. Inventory failures historically returned `[]` or `null`; a temporary API problem could empty the catalogue or appear as a 404.
3. Remote images must match allowed hosts in `next.config.ts`.
4. `app/data/products.ts` was once separate from live inventory and still influenced the sitemap. This can create stale or nonexistent URLs.
5. Related products were selected by global display priority rather than category relevance.

### Required long-term rule

The visible catalogue, product routes, structured data, and sitemap should use the same authoritative product/slugs source, or an explicitly documented synchronized fallback. Never leave accidental split sources.

---

## 7. Gallery system

- Homepage gallery historically used selected Cloudinary images.
- Full `/gallery` uses live Google Sheets data through `lib/googleSheets.ts` and `lib/gallery.ts`.
- Features include category filters, search, lightbox, keyboard arrows/Escape, counter, related items, product links, and item-specific WhatsApp messages.
- The gallery was intentionally dynamic/uncached at the audit point.
- Google credentials or network failure can break the route unless graceful fallback handling is present.
- Parsed extra `galleryImages`/`videoUrl` fields must be checked to ensure the UI actually renders them.
- Legacy `app/data/galleryItems.ts` should be treated as a documented fallback/test fixture or removed once no longer needed.

### Gallery responsive approval checkpoints

- Approved at 912px.
- Approved at 768×1024 with stacked tablet lightbox.
- Controls and buttons readable.
- No horizontal overflow.
- Keyboard and body-scroll cleanup behavior must remain intact.

---

## 8. WhatsApp, contact, and lead flow

The website is deliberately WhatsApp-first. Existing enquiry paths include header, hero/contact anchors, product cards, contact cards, contact form, footer, product variant quote, gallery item quote, and direct phone/email/map links.

The homepage contact form does not historically submit to a backend. It validates input, formats a WhatsApp message, and opens WhatsApp.

### Contact-data rule

Contact numbers and messages have historically been duplicated in multiple components. A previous code value used WhatsApp number `919427152052`, while later Google Business work showed more than one business number. **Do not assume which is current.** Before any contact change:

1. Ask the business owner which phone/WhatsApp number is authoritative.
2. Search the entire repository for every old number.
3. Update one centralized config if present; otherwise update every occurrence carefully.
4. Test `tel:`, `sms:`, WhatsApp, footer, contact form, product quote, gallery quote, and structured data.
5. Keep Google Business Profile and website consistent.

### Current limitations to remember

- No lead database or CRM is inherent in the WhatsApp form.
- No server-side email notification unless added later.
- No spam handling is needed for a pure WhatsApp redirect, but browser popup behavior must be tested.
- Conversion events should be tracked through GA4 once configured.

---

## 9. Responsive-design rules

### Approved test range

Support 320px–2560px. High-value checkpoints:

- 320/360px small mobile
- 390px common mobile
- 480/640px large mobile
- 768px tablet portrait
- 860/912px header and tablet transitions
- 1024px tablet/desktop boundary
- 1280/1440px desktop
- 1600/1920/2560px large desktop

### Approved responsive status from earlier work

- Products page approved at 390px and 768px.
- Product-detail tablet view approved.
- Gallery approved at 768×1024 and 912px.
- Desktop scrollbar behavior was corrected.
- No horizontal overflow is allowed.

### CSS warning

At the audit point, `app/globals.css` had roughly 14,203 lines, 100 media-query blocks, and 453 `!important` declarations. Many selectors and breakpoint families were repeated. This means cascade order matters and a seemingly correct change may be overridden later.

Future CSS work must:

1. Inspect all definitions of the target selector.
2. Identify the final winning rule at every relevant breakpoint.
3. Add the smallest controlled fix.
4. Test neighboring widths, not only the reported width.
5. Avoid adding another broad “final fix” section unless unavoidable.
6. Consolidate CSS only in small passes with before/after screenshots.

Pay special attention to navbar/mobile overlay and focus behavior, hero height/framing, catalogue cards, product media/pricing matrix, gallery lightbox, contact form, and footer.

---

## 10. SEO and discoverability

### SEO objective

Win relevant manufacturer/wholesale queries by combining local relevance, technically clean pages, detailed product content, genuine authority, and conversion-friendly presentation.

### Recommended workflow

1. Google Search Console: indexing, queries, clicks, impressions, CTR, page coverage.
2. GA4: traffic and meaningful conversions.
3. Screaming Frog: titles, descriptions, status codes, canonicals, headings, broken links, sitemap/robots checks.
4. PageSpeed Insights/Core Web Vitals.
5. Google Keyword Planner and live SERP research.
6. Google Business Profile/local SEO.
7. Ahrefs/Semrush only when the value justifies the cost.
8. Prioritized monthly action plan based on evidence.

### Pages that deserve specific checks

- Homepage
- `/products`
- `/products/bopp-matt-laminated-bag`
- Other live product slugs
- `/gallery`
- About and Contact sections/anchors

### Historical audit problems that were later worked on

The first audit found default Create Next App metadata, no metadata base, missing product metadata/canonicals, missing `/products` in the sitemap, a missing gallery social image, no dedicated 404, no structured data, indexable diagnostics, and an unnecessary `/_next/` robots block. Later work reportedly addressed multiple items including `/products` in the sitemap, a dedicated 404, favicon, focus outlines, and gallery fallback.

**Do not assume every fix is still present.** Verify the current files and live rendered HTML.

### SEO rules

- Each indexable page needs a unique useful title and description.
- Product pages need canonical URLs and product-specific metadata.
- Use Organization/LocalBusiness, Breadcrumb, Product, and FAQ structured data only with verified values.
- Keep diagnostics/test pages private or `noindex`.
- Sitemap URLs must match real live routes.
- Do not fabricate `lastModified` dates.
- Avoid keyword stuffing in the business name, headings, alt text, or descriptions.
- Keep business name/address/phone consistent across the website and Google Business Profile.

---

## 11. Accessibility and usability

Preserve and verify:

- Semantic headings and landmarks.
- Meaningful labels for search/filter controls.
- Keyboard-accessible navigation and lightboxes.
- Escape and arrow-key behavior in gallery media.
- Visible focus outlines.
- Body-scroll restoration after overlays close.
- Reduced-motion support for users who request it.
- Alt text that describes the image instead of stuffing keywords.
- Sufficient contrast and readable tap targets.

Known improvement area: mobile-menu focus trap, Escape/outside-click behavior, and small-landscape overlays.

---

## 12. Performance and reliability risks

- Hero historically mounted eight full-screen Next Images.
- Many source PNGs were roughly 1.8–2.4 MB; optimize originals where quality permits.
- `ProductDetailsClient.tsx` and the full gallery were large client components.
- Two icon libraries increase dependency surface.
- The gallery previously made uncached authentication/Sheets requests.
- External fetches need sensible timeouts, graceful error states, and preferably a last-known-good fallback.
- Entire product arrays crossing client boundaries increase JavaScript.
- Navbar/Footer should live in a shared layout if currently remounted on pages.

Optimize only with measurement. Use PageSpeed/Lighthouse, browser Network, and bundle/build output before and after changes.

---

## 13. Security and secret handling

### Permanent rules

- `.env.local` stays local and must never be committed or included in deployment ZIP files.
- Do not send environment-variable values in chat, email, screenshots, or tickets.
- Hostinger environment values must be entered directly in Hostinger.
- Commit only example names/placeholders if an `.env.example` is created.
- Treat Google service-account credentials, API URLs/tokens, analytics secrets, and deployment credentials as private.
- Run a secret scan or at least inspect `git diff --cached` before pushing.

### Dependency-security history

Hostinger initially reported 31 vulnerabilities: 3 critical, 15 high, 12 moderate, and 1 low.

The safe update used:

```bat
npm install next@16.3.6 eslint-config-next@16.3.6 @next/third-parties@16.3.6 --save-exact
npm audit fix
```

This removed the critical findings and left five high findings associated with an ESLint development-tool dependency chain (`braces`/`micromatch`).

**Do not run `npm audit fix --force` blindly.** It previously proposed a breaking downgrade to `eslint-config-next@14.2.35`.

After dependency changes, always run:

```bat
npm run lint
npm run build
```

---

## 14. Git and backup workflow

### Before a significant change

```bat
git status
git add .
git commit -m "backup before <short description>"
```

Historical backup command used before the responsive audit:

```bat
git add . && git commit -m "backup before final responsive audit"
```

Known published checkpoint:

```text
f10816195f7e02b8708b9b3e01dc323521ee18bb
```

That checkpoint had a clean status and passed lint, TypeScript, production build, diff check, and secret scan at the time. It is a historical reference, not necessarily the latest version.

### Before committing

```bat
git status
git diff
git diff --cached
npm run lint
npm run build
```

Never delete or overwrite unknown user changes. Never use destructive Git reset commands unless the owner explicitly requests them and a recoverable backup exists.

---

## 15. Hostinger deployment runbook

### Hostinger application settings

- Framework: Next.js
- Node: 22.x
- Root directory: `./`
- Package manager: npm
- Build command: `npm run build`
- Output: `.next`
- Environment variables: enter privately in Hostinger; never upload `.env.local`

### Clean Windows deployment ZIP

From `D:\Development\maruti-bag`:

```bat
tar -a -c -f ..\maruti-bag-hostinger-secure.zip --exclude=node_modules --exclude=.next --exclude=.git --exclude=.env.local --exclude=build.log --exclude=*.zip .
```

Verify excluded sensitive/generated content:

```bat
tar -tf ..\maruti-bag-hostinger-secure.zip | findstr /i /c:"node_modules" /c:".next" /c:".git" /c:".env.local"
```

`.gitignore` may appear because the search term `.git` matches its filename. The ZIP must not contain the `.git/` directory or `.env.local`.

### Hostinger build failure already solved

Observed error:

```text
TurbopackInternalError: Failed to write app endpoint /page
```

Resolution: change the build script from `next build` to:

```text
next build --webpack
```

The local Webpack production build passed fully on Next.js 16.3.6. Keep the Webpack build unless a future controlled test proves Hostinger’s Turbopack path is stable.

### Post-deployment smoke test

Test in an incognito window and on a phone:

1. Homepage loads without console errors.
2. Products catalogue loads live data.
3. At least one product detail page loads and variants/media work.
4. Gallery loads and lightbox works.
5. WhatsApp quote contains the correct selected data and opens the right number.
6. Phone, email, map, and website links work.
7. Logo, favicon, and images load.
8. `/robots.txt` and `/sitemap.xml` load.
9. No horizontal overflow at mobile/tablet widths.
10. Search Console inspection can fetch the public pages.

---

## 16. Common change playbooks

### A. Change text or business claims

1. Confirm the exact approved wording with the owner.
2. Search globally for the old wording and related contradictory claims.
3. Update only the relevant sources.
4. Check mobile wrapping and SEO metadata where applicable.
5. Lint, build, and inspect affected pages.

### B. Add or edit a product

1. Update the authoritative inventory source/Google Sheet.
2. Use a stable unique slug and SKU.
3. Complete category, colour, GSM, sizes, quantity, MOQ, rate unit, availability, timing, visibility, media, and SEO fields.
4. Confirm image hostname is allowed.
5. Wait for the 60-second revalidation or redeploy if required.
6. Test catalogue search/filter, product route, variants, media, WhatsApp, related products, structured data, and sitemap.

### C. Change phone or WhatsApp number

Follow the full contact-data rule in Section 8. Global-search every old number before publishing.

### D. Add an image

1. Use a descriptive filename.
2. Optimize dimensions and compression.
3. Prefer correct aspect ratio rather than CSS cropping.
4. Add meaningful alt text.
5. Verify Cloudinary/local path and Next Image configuration.
6. Test mobile, tablet, desktop, and social-preview use if relevant.

### E. Fix a responsive issue

1. Reproduce at the exact width and adjacent widths.
2. Inspect all CSS definitions for the selector.
3. Find the winning cascade rule.
4. Apply the smallest scoped fix.
5. Test 320, 390, 768, 912, 1024, and desktop—or a more relevant set.
6. Confirm no horizontal overflow and no regression elsewhere.

### F. Update dependencies

1. Commit/backup first.
2. Read release notes for framework-major changes.
3. Prefer targeted exact-version upgrades.
4. Do not use `--force` without understanding every breaking change.
5. Run audit, lint, build, and representative route tests.
6. Recreate a clean deployment ZIP.

### G. Diagnose missing products/gallery

1. Check Hostinger environment-variable names exist—without revealing values.
2. Check external API/Google Sheet availability and permissions.
3. Inspect server logs for validation/auth/network errors.
4. Check payload schema and image hostnames.
5. Do not change a product slug casually; links and sitemap may depend on it.
6. Prefer a graceful unavailable state over false 404s.

---

## 17. Full QA checklist

### Code quality

- [ ] `git status` understood
- [ ] No secrets in tracked files or deployment archive
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] No unintended dependency/config changes
- [ ] Build uses Webpack on Hostinger

### Routes and features

- [ ] Homepage
- [ ] Products catalogue
- [ ] Representative product detail for each major product family
- [ ] Gallery and lightbox
- [ ] Industries/About/Contact anchors
- [ ] Navbar and footer
- [ ] WhatsApp quote flows
- [ ] Phone/email/map links
- [ ] Custom not-found page
- [ ] Robots and sitemap

### Responsive

- [ ] 320/360px
- [ ] 390px
- [ ] 768px
- [ ] 860/912px
- [ ] 1024px
- [ ] 1280/1440px
- [ ] 1600px+
- [ ] No horizontal overflow
- [ ] Mobile menu usable in portrait and landscape

### Content/data

- [ ] MOQ is consistent and approved
- [ ] Phone/WhatsApp/email/address consistent
- [ ] Product colours, GSM, sizes, prices, stock, timing accurate
- [ ] No stale `500 pieces` or contradictory claims
- [ ] Product slugs match sitemap/gallery links
- [ ] Images and video work

### SEO/accessibility/performance

- [ ] Unique metadata and canonicals
- [ ] Valid structured data using verified facts
- [ ] Sitemap contains only real indexable URLs
- [ ] Diagnostics are private or `noindex`
- [ ] Keyboard navigation and visible focus work
- [ ] Reduced motion respected
- [ ] Alt text meaningful
- [ ] PageSpeed/Core Web Vitals checked
- [ ] Search Console URL inspection completed after major launch changes

---

## 18. Known technical debt and recommended order

1. Keep production/indexing safe: metadata, canonicals, sitemap, diagnostics, social images.
2. Stabilize external inventory and gallery with timeouts, graceful errors, and a documented fallback.
3. Maintain one source of truth for product and contact data.
4. Verify every business claim, MOQ, timing, and pricing rule.
5. Consolidate contact/WhatsApp configuration.
6. Improve related-product relevance.
7. Optimize heavy images and reduce unnecessary client JavaScript.
8. Gradually consolidate `globals.css` after documenting winning rules.
9. Move shared Navbar/Footer into a common layout if still duplicated.
10. Add conversion tracking and a documented analytics event map.

Do not attempt all technical debt in one risky rewrite.

---

## 19. Google Business Profile and website consistency

The verified profile should remain the one true business listing. A duplicate profile was previously identified; avoid creating another listing for the same location. Website, Google Business Profile, logo, name, primary category, phone, WhatsApp, address, hours, products, and photos must be consistent.

The profile work established:

- Primary category: Manufacturer
- Additional relevant category: Packaging company
- Website linked to `marutibagmultipack.com`
- Business description focused on BOPP matt laminated, metallic/matt metallic, and non-woven bags for retailers, wholesalers, distributors, and businesses

Profile edits may remain under Google review for hours or days. Repeated refreshes do not accelerate approval.

---

## 20. Ownership and future-proofing

The owner must retain control of:

- Domain registration/DNS
- Hostinger account
- Git repository and backups
- Google Business Profile
- Google Search Console and GA4
- Google Sheet/inventory source
- Cloudinary/media account
- Business email
- WhatsApp Business account

Never hand exclusive ownership to a marketing platform or agency. Avoid paying for unverified tools based only on advertisements or reels. Confirm compatibility with the existing Next.js site, full pricing, cancellation/refunds, Indian B2B evidence, and ownership of content/accounts first.

---

## 21. Change log

Future helpers must add concise entries here.

### 2026-10-08 — Permanent handbook created

- Consolidated business, design, architecture, responsive, inventory, SEO, security, Git, and Hostinger decisions from the two main project chats and the earlier audit.
- Recorded Next.js 16.3.6 security upgrade and Webpack Hostinger build requirement.
- Excluded all environment-variable secret values.

### Historical checkpoints

- **2026-09-01:** Commit `f10816195f7e02b8708b9b3e01dc323521ee18bb` published to `origin/main`; checks passed at that point.
- **2026-10-05:** Local `npm run lint` and `npm run build` passed after the security upgrade; clean Hostinger ZIP was created and checked.
- **2026-10-05:** Hostinger Turbopack failure isolated; `next build --webpack` passed locally and became the deployment build command.

---

## Final instruction to every future developer or AI

This business and website were built carefully through many small decisions. Do not treat the project as a blank template. Preserve what already works, verify current reality, make the smallest safe improvement, test it thoroughly, and document what changed.

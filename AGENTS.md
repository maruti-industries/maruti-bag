<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Maruti Bag Project AGENTS.md v1

## 1. Project Overview
- This project builds the official website for Maruti Bag, a premium manufacturer of BOPP laminated and non-woven bags based in Surat, India.
- The website should feel professional, trustworthy, and export-ready.
- It is a marketing and lead-generation site, not an ecommerce storefront.

## 2. Business Goal
- Prioritize inquiries, quotation requests, and direct contact from potential buyers.
- Highlight product categories, manufacturing capability, quality, and business credibility.
- Make it easy for customers to request a quote or start a conversation before placing an order.

## 3. Technology Stack
- Next.js App Router with TypeScript.
- React and server/client components where appropriate.
- Tailwind CSS for styling.
- Content lives primarily in the app directory and data files.
- Keep dependencies minimal and stable.

## 4. Folder Structure
- app/page.tsx is the main homepage entry point.
- app/components/ contains reusable page sections and UI blocks.
- app/products/[slug]/page.tsx handles product detail routes.
- app/data/products.ts is the source of product content.
- public/images/ stores brand and product images.
- Avoid introducing unnecessary top-level structure unless truly needed.

## 5. Coding Standards
- Use TypeScript strictly and prefer clear interfaces and types.
- Keep components small, readable, and easy to reuse.
- Follow existing naming conventions: PascalCase for components and camelCase for functions and variables.
- Write simple, maintainable code rather than clever abstractions.
- Add comments only when logic is non-obvious.
- Keep imports clean and organized.

## 6. UI Standards
- Use a premium, clean, industrial visual style.
- Favor strong typography, generous spacing, and clear calls to action.
- Make the experience feel credible for B2B buyers and procurement teams.
- Emphasize trust signals such as product quality, manufacturing strength, and contact ease.
- Use polished product photography and avoid visual clutter.
- Ensure the design works well on desktop and mobile.

## 7. Product Data Rules
- Keep product information centralized in app/data/products.ts.
- Write descriptions that are factual, concise, and business-friendly.
- Do not invent specifications, certifications, or claims.
- If a detail is uncertain, leave it pending rather than guessing.
- Product pages should support category, material, use case, and quote intent.

## 8. SEO Rules
- Use descriptive titles, meta descriptions, and H1 headings for all important pages.
- Include location-based keywords naturally where appropriate, such as Surat, Gujarat, India, BOPP bags, and non-woven bags.
- Write for both search engines and procurement buyers.
- Keep URLs clean and descriptive.
- Avoid keyword stuffing and duplicate content.

## 9. Things Never To Do
- Do not turn the site into an ecommerce store with cart or checkout flows.
- Do not add unnecessary animations, heavy scripts, or bloated dependencies.
- Do not use placeholder lorem ipsum or fake product information.
- Do not remove or weaken lead-generation calls to action.
- Do not hardcode business claims without verification.
- Do not modify unrelated files outside AGENTS.md.

## 10. Current Roadmap
- Continue polishing the homepage for stronger conversion.
- Expand product pages with better SEO and clearer quote calls to action.
- Improve trust elements such as certifications, process explanation, and factory credibility.
- Strengthen inquiry paths through phone, WhatsApp, email, and contact form.
- Keep refining messaging for industrial and bulk buyers.

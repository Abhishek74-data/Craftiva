# Craftiva Furniture

A factory-direct **custom furniture** website for a Kirti Nagar (Delhi) workshop. Customers browse a 562-piece catalogue, configure size / wood / finish, and request a made-to-order quote — the conversion model is lead generation via a quote form + WhatsApp rather than online checkout.

**Live:** https://craftivafurniture.vercel.app

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS 4 |
| Icons / motion | lucide-react, motion |
| Analytics | Vercel Web Analytics |
| Lead capture | Web3Forms (email, no backend) |
| Hosting | Vercel |

## Key features

- **562-piece catalogue** with search, category/type filters, sort and "load more" pagination (`/collections`).
- **Made-to-order product pages** with a multi-photo gallery, size & finish selectors, technical specs and a dynamic WhatsApp quote (`/product/[slug]`).
- **Quote configurator** (`/quote`) that captures the lead by email *and* opens a pre-filled WhatsApp message.
- **Wishlist** (localStorage) with a one-tap "quote all saved pieces" bundle message.
- **Contact page** with a callback form, click-to-call/WhatsApp/email and an embedded map.
- Full **SEO**: per-page metadata, `sitemap.xml`, `robots.txt`, LocalBusiness + Product JSON-LD, and a generated Open Graph / Twitter share image.
- **Policy pages**: Privacy, Terms, Shipping, Returns & Cancellation, Warranty.

## Project structure

```
app/                 # App Router pages, routes, sitemap/robots/manifest, OG image
  product/[slug]/    # Product detail (SSG for all catalogue pieces)
  collections/       # Full catalogue browser
  quote/             # Quote configurator (email lead capture)
  contact/ about/ …  # Content pages
  privacy/ terms/ …  # Policy pages
components/           # Header, Footer, ProductView, QuoteForm, ContactForm, …
lib/                 # site config (lib/site.ts), data access, types, utils
public/              # Logo + static assets
```

`lib/site.ts` is the **single source of truth** for the site URL, contact details and brand info — change it there and it flows to metadata, canonical tags, sitemap, robots and JSON-LD.

## Running locally

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Production build / preview:

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` (and set the same values in Vercel → Settings → Environment Variables):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Live site URL — drives canonical tags, sitemap, robots, OG. Set to the Vercel URL (or a custom domain). |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Free key from [web3forms.com](https://web3forms.com) — every quote/callback submission is emailed to you. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` / `_DISPLAY` | WhatsApp number used across the site. |
| `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_ADDRESS` | Contact details. |

> ⚠️ If `NEXT_PUBLIC_SITE_URL` is set in Vercel, it overrides the code default — make sure it points to the live domain, not an unused one.

## Deployment

Hosted on **Vercel** with automatic deploys from the `main` branch. Pushing to `main` triggers a production deploy; other branches get preview deployments.

## Roadmap / next steps

- **Image optimization** — the catalogue images are committed as full-size JPEGs, which makes the repo large and slows first paint. Re-encoding to WebP at responsive sizes (and moving them out of git into an asset host) is the biggest remaining performance win.
- Indicative "starting from" price bands per category.
- Google Business Profile + review integration.

---

*Custom furniture, crafted to order — Kirti Nagar, New Delhi.*

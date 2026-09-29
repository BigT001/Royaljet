# RoyalJet Int'l Shipping and Logistics — Website

Marketing website for **RoyalJet Int'l Shipping and Logistics Ltd**, your trusted logistics partner from China to Nigeria.

Built with **React + TypeScript + Vite**, **Tailwind CSS v4** and **Framer Motion** animations.

## Features

- **Hero photo slider** using RoyalJet's own photos: crossfade with slow zoom, animated headlines, progress bars, autoplay that pauses on hover or when off-screen, swipe and keyboard support.
- **Tracking field** in the hero and on the Track page. Online tracking isn't live yet, so any code shows a "Tracking system under maintenance" notice with a WhatsApp link for a manual update (see `src/components/TrackingForm.tsx`).
- **Layered photo compositions** with scroll parallax, and a photo gallery with a full-screen viewer.
- **Warehouse address card** showing the exact Chinese address with one-click **copy to clipboard** (to paste straight to suppliers) and an English translation.
- **Quote request form** that opens WhatsApp pre-filled with the customer's details. No backend is needed.
- Floating WhatsApp button, sticky header, animated mobile menu, FAQ accordion, scroll-reveal animations and a service marquee.
- Pages: Home, About, Services, How It Works, Track Shipment, Contact and 404.
- SEO: per-page titles and descriptions, Open Graph image, JSON-LD organisation data, and a `sitemap.xml` and `robots.txt` generated at build time.
- Performance: route-level code splitting, lazy-loaded images, and self-hosted fonts with no external font requests.
- Accessibility: skip link, keyboard-friendly menu (Esc closes it), ARIA on interactive controls, and support for `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

Requires Node.js 20+.

## Editing content

| What | Where |
| --- | --- |
| Phone, WhatsApp, Instagram, addresses, warehouse code | `src/data/site.ts` |
| Services, steps, FAQs, values | `src/data/site.ts` |
| Photos | `src/data/images.ts` |
| Logo / favicons / social image | `public/brand/` |
| Colours and fonts | `src/index.css` (`@theme` block) |

### Photos
RoyalJet's own photos are in `public/images/` and power the hero slider (`heroSlides` in `src/data/images.ts`), the gallery and several page headers. A few remaining images are free-licence Unsplash photos. To use real photos of your warehouse, team or shipments, put them in `public/images/` and change the URLs in `src/data/images.ts`, for example `warehouse: '/images/warehouse.jpg'`. If a photo fails to load, a branded gradient shows in its place.

## Deployment

Set `VITE_SITE_URL` to your real domain (see `.env.example`). It is used for canonical links, Open Graph and the sitemap.

- **Vercel**: import the repo. `vercel.json` already handles SPA routing and asset caching.
- **Netlify**: import the repo. `netlify.toml` already configures the build and redirects.
- **Any static host**: upload `dist/` and route unknown paths to `index.html`.

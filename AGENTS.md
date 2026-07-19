# MechitaSparks Repository Guide

## Product

MechitaSparks is a conversion-first Spanish landing page for a mobile beauty bar in Lima, Peru. Every change should protect three priorities: fast loading, strong local SEO, and a short path from interest to a pre-filled WhatsApp conversation.

## Stack

- Astro static output with strict TypeScript.
- Plain Astro components and global CSS. Avoid adding a frontend framework unless interaction complexity genuinely requires it.
- GSAP is loaded only for progressive motion. The full page must remain visible and usable if JavaScript or the CDN fails.
- Business and repeated marketing content lives in `src/data/site.data.ts`.

## Commands

- `npm run dev` starts the local development server.
- `npm run check` runs Astro and TypeScript validation.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the production build locally.

## Implementation Rules

- Keep the visual language Y2K Pop Glam / Soft Brutalism: ink borders, hard offset shadows, hot pink, lilac, cyan, cream, editorial collage layouts.
- Keep cards at 8px radius or less. Avoid soft shadows, generic gradients, nested cards, and decorative blob backgrounds.
- Use semantic HTML, one `h1`, logical heading order, descriptive image alt text, visible focus states, and keyboard-operable controls.
- Respect `prefers-reduced-motion`; never hide core content before animation code is ready.
- All conversion links must use `whatsappUrl()` from `src/utils/whatsapp.ts`.
- Do not invent prices, customer quotes, awards, event counts, contact details, or social handles. Placeholder commercial data is centralized in `site.data.ts` and must be replaced when the client confirms it.
- Remote Stitch image URLs are intentional source assets. Preserve their descriptive alt text and lazy-load images below the fold.
- Update JSON-LD and visible copy together whenever services, FAQs, geography, or brand details change.

## SEO Checklist

- Preserve canonical, Open Graph, Twitter card, LocalBusiness, Service, and FAQPage metadata.
- Keep `public/robots.txt`, `public/sitemap.xml`, and the production `site` value in `astro.config.mjs` aligned.
- New images need explicit dimensions or a stable `aspect-ratio` to prevent layout shift.
- Spanish copy should target real user intent naturally; do not add keyword stuffing or a meta keywords tag.

## Verification

Before finishing a UI change, run `npm run build` and inspect at least 1440x900, 768x1024, and 390x844 viewports. Confirm there is no horizontal overflow, clipped text, broken remote media, inaccessible drawer state, or nonfunctional WhatsApp form.

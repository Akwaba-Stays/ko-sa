# KO-SA Beach Resort · ko-sa.com

Eco-luxury beach resort website — Next.js 14, TypeScript, Tailwind, Framer Motion, Prisma + Supabase Postgres, Supabase Storage, Cloudbeds PMS, OpenRouter (Gemma + multi-model fallback) AI concierge.

**Brand:** Kosa Palms · *Simply, Belong.*

---

## Stack

- **Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lenis (smooth scroll) · @photo-sphere-viewer/core (virtual tour)
- **Backend:** Next.js API routes · Prisma + Supabase Postgres · Supabase Storage · Resend (email)
- **Booking:** Cloudbeds OAuth 2.0 PMS — availability, room types, reservations, guest creation, cancellation
- **AI Concierge ("Abena"):** OpenRouter (Gemma → Qwen → GPT-OSS fallback chain) with in-memory keyword-scored knowledge retrieval — zero infra, deterministic, ~50 docs covering rooms, experiences, policies, FAQs, location
- **Virtual tour:** Google Drive service-account-backed scene fetch with fallback Unsplash scenes for dev
- **SEO:** Metadata API, sitemap.ts, schema.org JSON-LD (LodgingBusiness, HotelRoom, Article), OG images
- **Auth:** NextAuth (admin only; routes scaffolded)
- **Analytics:** Vercel Analytics + GTM hook

## Quick start

```bash
cp .env.example .env.local        # fill what you have — site runs with all integrations stubbed
npm install
npm run db:push                   # if DATABASE_URL set
npm run dev                       # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Generate Prisma client + production build |
| `npm run start` | Run production build |
| `npm run typecheck` | Strict TS pass |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:migrate` | Create a migration |
| `npm run sync:rooms` | Pull room types from Cloudbeds (cron candidate) |
| `npm run sitemap` | Generate sitemap.xml + robots.txt at build time |

## Environment

See `.env.example` for the full list. The site is built to **degrade gracefully** when an integration is not configured:

| Missing | Behaviour |
|---|---|
| `DATABASE_URL` | DB writes log a warning; forms still respond |
| `OPENROUTER_API_KEY` | Chat uses a static knowledge fallback, streamed word-by-word |
| `RESEND_API_KEY` | Emails are logged, not sent |
| `CLOUDBEDS_*` | Availability/reservation endpoints return `{ configured: false }` and the booking flow records the request locally |
| `GOOGLE_DRIVE_SERVICE_ACCOUNT` | Virtual tour uses 6 high-res fallback scenes |

This means the dev experience is **zero-config** — just `npm install && npm run dev`.

## Page map

```
/                    Home (10 sections)
/rooms               Listing of rooms
/rooms/[slug]        Room detail w/ JSON-LD
/experiences         Experiences listing
/experiences/[slug]  Experience detail
/virtual-tour        360° tour (photo-sphere-viewer + WebGL fallback)
/dining              Three dining concepts
/wellness            Spa + treatments
/about               Story + sustainability
/gallery             Lightbox gallery (masonry)
/blog                Journal index
/blog/[slug]         Long-form post
/contact             Form + Google Maps embed
/book                4-step booking flow → Cloudbeds POST /reservation
/admin               Console (NextAuth-protected when secret set)
```

## API routes

```
POST  /api/newsletter
POST  /api/contact
POST  /api/chat                          (Anthropic streaming + ES RAG)
GET   /api/virtual-tour/scenes           (Google Drive)
GET   /api/cloudbeds/callback            (OAuth)
GET   /api/cloudbeds/availability
GET   /api/cloudbeds/rooms
GET   /api/cloudbeds/rates
POST  /api/cloudbeds/reservation
GET   /api/cloudbeds/reservation/[id]
PUT   /api/cloudbeds/reservation/[id]
DELETE /api/cloudbeds/reservation/[id]
```

## Brand tokens (Tailwind)

```
umber       #64554A  — primary dark, text, strong UI
brown       #8B6D53
gold        #B4A26D  — accents, CTAs
sand-light  #E1D9CA  — section backgrounds
cream       #FAF9F6
bg-orange   #F3F0EB  — page base
```

Fonts (via `next/font`): **Belleza** (headings) · **Raleway** (body, UI) · **Beth Ellen** (script taglines) · **Poppins** (digital UI).

## Deployment

- **Primary:** Vercel — `vercel deploy`. All API routes are Node runtime.
- **Database:** Supabase Postgres (set `DATABASE_URL` + `DIRECT_URL`).
- **Domain:** `ko-sa.com` — set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` accordingly.
- **Cloudbeds:** Add `https://ko-sa.com/api/cloudbeds/callback` to your OAuth redirect URIs.
- **Elasticsearch:** Elastic Cloud (recommended) — set `ELASTICSEARCH_URL` + `ELASTICSEARCH_API_KEY`, then `npm run seed:kb`.

## Production checklist (Quality Gates)

- [ ] All env vars set in Vercel → integrations live
- [ ] `npm run db:migrate deploy`
- [ ] `npm run seed:kb`
- [ ] Cloudbeds OAuth completed → token stored
- [ ] Lighthouse: Perf ≥ 90, SEO = 100, A11y ≥ 95
- [ ] `next build` clean (no errors, no warnings)
- [ ] Schema.org validation (Google Rich Results)
- [ ] Submit sitemap to Google Search Console
- [ ] Test booking flow end-to-end against Cloudbeds sandbox

See `progress.md` for current status and what remains.

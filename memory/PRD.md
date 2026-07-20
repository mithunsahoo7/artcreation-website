# Art Creation — PRD

## Original problem statement
Corporate marketing website for **Art Creation**, a Kolkata-based printing &
signage execution vendor for retail brands. Pages: Home, About, Services,
Portfolio, Infrastructure, Contact. Style: white + light-grey + red accent,
bold typography, professional/vendor tone (not e-commerce). Feature
requirements: client logo strip, portfolio/gallery, "Our Infrastructure"
section (Latex/Solvent/UV), case studies, WhatsApp + Call buttons.

## Art direction (agreed with design_agent)
Swiss brutalist / editorial. Cabinet Grotesk display + Inter body. Red
`#e5261f` accent used sparingly. Sharp edges, generous negative space,
kinetic hero, numbered manifesto chapters, editorial ticker, framer-motion
scroll reveals, Lenis smooth momentum scrolling.

## User personas
1. **Retail brand ops / vendor managers** — evaluating a signage & print
   vendor for a rollout. Needs to see scope, infrastructure, past work,
   and reach WhatsApp/Call quickly.
2. **Marketing / VM heads** — evaluating creative & production quality.
3. **Prospective enquirers** — filling the "Get a Quote" form.

## Core requirements (static)
- 6 pages (Home / About / Services / Portfolio / Infrastructure / Contact)
- Persistent Navbar + Footer + Floating WhatsApp/Call
- Contact form → MongoDB → viewable at `/admin/enquiries`
- Real product photography treatment, editorial marquee, kinetic hero
- data-testid on every interactive element

## What's been implemented (2026-07-20)
- FastAPI backend: `POST /api/enquiries`, `GET /api/enquiries` (auth-gated), `GET /api/stats`, `GET /api/`
- **Emergent Google Auth**: `POST /api/auth/session`, `GET /api/auth/me`, `POST /api/auth/logout`. Cookie `session_token` (httpOnly, secure, samesite=None, 7 days). Users stored with custom `user_id` (UUID), no `_id` leakage.
- MongoDB collections: `enquiries`, `users`, `user_sessions`
- React frontend with framer-motion + Lenis smooth scrolling
- Pages: Home (kinetic hero, client marquee, manifesto, services bento,
  editorial ticker, infra teaser, case studies, red CTA), About (timeline
  + pillars), Services (row list with alternating shades), Portfolio
  (masonry-ish grid + filters), Infrastructure (Latex/Solvent/UV blocks with
  spec tables), Contact (split layout + form), **Login (Sign in with Google), Admin (protected, with user card + logout)**
- Floating WhatsApp (green) + Call (red) buttons
- Sticky glass navbar with kinetic mobile menu
- **All auth tests pass (18/18)** on the second testing agent iteration

## Prioritized backlog
- **P1**: Replace placeholder phone/WhatsApp/email/address in
  `/app/frontend/src/data/content.js` with real details
- **P1**: Upload real project photography (replace stock Unsplash URLs in
  `/app/frontend/src/data/content.js` → `PORTFOLIO`, `SERVICES`, `INFRA`,
  and Home hero image)
- **P2**: Add password/auth gate to `/admin/enquiries` and `GET
  /api/enquiries` before production
- **P2**: Switch `Enquiry.email` to `EmailStr` for stronger validation
- **P2**: Individual portfolio detail pages (`/portfolio/:slug`)
- **P3**: Add a "Downloadable capabilities deck (PDF)" link
- **P3**: Case-study filtering by industry/scope
- **P3**: Migrate FastAPI `on_event('shutdown')` → lifespan handler

## Next tasks
- Provide real content (numbers, photos, brand list) to swap out
  placeholders
- Decide auth strategy for the admin panel

# Clarity Labs - Product Requirements Document

## Original Problem Statement
Build a modern, minimal, high-conversion website for "Clarity Labs" - a premium video production agency for SaaS & AI brands. Ultra-modern premium design inspired by Linear/Stripe/Vercel.

## User Personas
1. **SaaS Founders** - Need clear product explainer videos for homepage and launches
2. **Growth Teams** - Looking for video content for distribution across social channels
3. **Product Marketers** - Need feature spotlights and onboarding videos

## Core Requirements (Static)
- 3 pages: Home, Pricing, About
- Newsletter subscription (store in database)
- CTAs for video audit and consultation (placeholder for Calendly)
- Premium editorial design
- Mobile-responsive layout
- Smooth Framer Motion animations

---

## What's Been Implemented ✅

### Phase 1 - MVP (January 30, 2025)

**Design System:**
- ✅ Premium light theme with editorial feel
- ✅ Playfair Display (serif headings) + Manrope (body) typography
- ✅ Floating glass navbar with backdrop blur
- ✅ Aurora gradient backgrounds
- ✅ Bento grid layouts for services
- ✅ Rounded 3xl cards with hover lift effects
- ✅ Color-coded service icons (blue, amber, purple, emerald)

**Pages:**
- ✅ Homepage: Hero with video card + floating stats, client logos, bento services, process steps, testimonials, dark CTA
- ✅ Pricing: 3 tiers (Starter $1,499 / Growth $2,999 highlighted / Agency Custom), FAQ accordion
- ✅ About: Editorial hero, values cards, story section with image

**Backend:**
- ✅ Newsletter subscription API (`POST /api/newsletter/subscribe`)
- ✅ Contact request API (`POST /api/contact`)
- ✅ Health check endpoint (`GET /api/health`)

**Frontend Features:**
- ✅ Floating glass navbar
- ✅ Full-screen mobile menu
- ✅ Newsletter signup with toast notifications
- ✅ Framer Motion scroll animations
- ✅ Shadcn UI Accordion for FAQ

---

## Prioritized Backlog

### P0 - Pending (User to provide)
- [ ] Calendly/Cal.com integration for CTAs
- [ ] Actual client logos (currently text placeholders)

### P1 - Nice to Have
- [ ] Contact form modal for video audit requests
- [ ] Video showreel integration

### P2 - Future Enhancements
- [ ] CRM integration (HubSpot, etc.)
- [ ] Analytics integration (GA4, Mixpanel)

---

## Next Tasks
1. Integrate Calendly link when provided
2. Add actual client logos
3. Consider video showreel modal for "Watch Showreel" button

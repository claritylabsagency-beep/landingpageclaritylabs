# Clarity Labs - Product Requirements Document

## Original Problem Statement
Build a modern, minimal, high-conversion website for "Clarity Labs" - a premium video production agency for SaaS & AI brands. The website should feature a clean SaaS aesthetic with white background, black text, and sky-blue accents.

## User Personas
1. **SaaS Founders** - Need clear product explainer videos for homepage and launches
2. **Growth Teams** - Looking for video content for distribution across social channels
3. **Product Marketers** - Need feature spotlights and onboarding videos

## Core Requirements (Static)
- 3 pages: Home, Pricing, About
- Newsletter subscription (store in database)
- CTAs for video audit and consultation (placeholder for Calendly)
- Premium, minimal design with Syne + DM Sans fonts
- Mobile-responsive layout
- Smooth animations with Framer Motion

---

## What's Been Implemented ✅

### Phase 1 - MVP (January 30, 2025)

**Pages:**
- ✅ Homepage with Hero, Client Logos Marquee, Services (6 cards), Video Styles (8 cards), Testimonials (3), Process (5 steps), Final CTA
- ✅ Pricing page with 4 pricing tiers, included features, FAQ accordion (5 questions)
- ✅ About page with values section and story

**Backend:**
- ✅ Newsletter subscription API (`POST /api/newsletter/subscribe`)
- ✅ Contact request API (`POST /api/contact`)
- ✅ Health check endpoint (`GET /api/health`)

**Frontend:**
- ✅ Responsive Navbar with navigation and "Book a Call" CTA
- ✅ Footer with newsletter signup form
- ✅ Framer Motion animations
- ✅ React Fast Marquee for client logos
- ✅ Shadcn UI Accordion for FAQ
- ✅ Sonner toast notifications

**Design:**
- ✅ White background, slate-900 text, sky-500 accent
- ✅ Syne font for headings, DM Sans for body
- ✅ Pill-shaped buttons, rounded-2xl cards
- ✅ Subtle shadows and hover effects

---

## Prioritized Backlog

### P0 - Pending (User to provide)
- [ ] Calendly/Cal.com integration for CTAs
- [ ] Actual client logos (currently text placeholders)

### P1 - Nice to Have
- [ ] Contact form modal for video audit requests
- [ ] Case studies/portfolio section (if needed later)
- [ ] Blog section for SEO

### P2 - Future Enhancements
- [ ] Calendly embedded booking widget
- [ ] CRM integration (HubSpot, etc.)
- [ ] Analytics integration (GA4, Mixpanel)
- [ ] A/B testing for landing page

---

## Next Tasks
1. Integrate Calendly link when provided by user
2. Add actual client logos when available
3. Consider adding a contact form modal for immediate lead capture

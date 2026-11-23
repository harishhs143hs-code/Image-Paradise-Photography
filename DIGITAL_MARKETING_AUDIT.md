# Image Paradise Photography — Digital Marketing Improvement Log

Preview branch: `feature/agency-digital-marketing-audit-2026`

This branch contains review-stage changes only. Do not merge into `main` or promote any deployment without the owner's explicit approval.

## Completed in this preview work

- Standardised the homepage title, description and social-sharing image.
- Updated the main ProfessionalService entity and connected the service pages to its stable business identifier.
- Replaced location-page LocalBusiness markup that incorrectly represented service locations as business addresses with Service markup and areaServed.
- Removed unsupported experience, booking-count, rating, package-price, delivery and travel claims found in legacy location pages.
- Replaced old wedding package prices with the current published qualifying photography session price (from ₹8,000 for up to 3 hours), separate videography quotation, and the current album options.
- Removed the unverified homepage testimonial carousel pending verification and customer permission.
- Replaced the Ambattur testimonials block with a portfolio link.
- Updated the pre-wedding page to request a tailored quotation instead of displaying unconfirmed package prices.
- Rebuilt the wedding budget guide around current published prices and removed obsolete ₹35,000/₹75,000 package claims.
- Corrected budget-page Offer structured data to match the qualifying ₹8,000 photography session and the ₹8,000 / ₹15,000 album options; removed outdated ₹35,000 / ₹75,000 / ₹1,50,000 Offer values.
- Repaired malformed nested JSON-LD on the Chennai wedding videography page.
- Removed retired wedding-package links from the homepage and pointed them directly to the current packages page.
- Standardised the blog index canonical to `/blog` and aligned the sitemap; removed the generic dynamic blog-post template from the sitemap.
- Kept the dynamic blog-post template `noindex` until individual articles can be generated as stable, crawlable pages. Added DOMPurify sanitisation for CMS rich text and related-card markup, and dynamic Article schema for loaded posts.
- Added `/admin.html` to the served `public/robots.txt` disallow list.
- Aligned homepage Open Graph title and SEO description in the build-time metadata fixer.
- Retired the old under-₹40,000 and under-₹50,000 wedding package pages; redirect those old URLs to the current packages page.
- Removed a public street-address disclosure from the budget page and removed the old pages that exposed it in their content/schema.
- Normalised service-page URLs in the XML sitemap and removed retired budget URLs.
- Added privacy wording for referral programme information and linked the privacy policy from Refer & Earn.
- Added privacy-conscious browser event hooks for WhatsApp, telephone, email and form-submission attempts.
- Added analytics activation instructions. No fake GA4 or Meta Pixel identifier has been added.

## Items that still require owner input or external account access

1. Provide a real GA4 Measurement ID or GTM container ID and configure consent-aware analytics. Current browser events are queued in `window.dataLayer`; they are not transmitted until a real analytics tag is installed.
2. Confirm Google Search Console and Bing Webmaster Tools access, submit the final sitemap and inspect indexing/canonical coverage.
3. Build static/server-rendered article URLs and per-article metadata before enabling blog-post indexing; the current dynamic template is intentionally noindex.
4. Confirm whether a Google Business Profile exists, whether it is verified, and which service areas it genuinely serves. Keep any residential street address hidden if customers are not served at that address.
5. Supply genuine, permissioned customer reviews if the owner wants a testimonial section restored.
6. Confirm current pre-wedding and videography rates if public fixed prices are desired.
7. Configure and test Supabase environment variables and migration before enabling the booking lead dashboard.
8. For reliable referral attribution, add a dedicated referrals table, partner/referral IDs, server-side agreement-version and consent records, eligibility status and reward/payout ledger. The present Refer & Earn form still hands the user to WhatsApp and does not create a durable server-side referral record.
9. Confirm the final legal terms for reward eligibility, cancellation, payout date/method and taxes with an appropriate legal/accounting adviser before treating the web agreement as a formal contract.

## QA required before production

- Check all important pages on mobile and desktop.
- Test WhatsApp links and the lead form.
- Verify all local landing page canonical URLs and redirects.
- Validate JSON-LD with Google's Rich Results Test / Schema Markup Validator.
- Check sitemap and robots.txt in Search Console.
- Run Lighthouse or PageSpeed Insights on homepage, packages, local pages and Refer & Earn.
- Verify GA4 events only after a real tag and consent configuration are added.
- Test all Supabase-dependent functions only after environment variables are configured.
- Review the preview branch and PR diff before any production merge.

## Business facts used

- Business base: Veppampattu, near Avadi, Tiruvallur, Tamil Nadu.
- Primary service areas: Veppampattu, Tiruvallur, Avadi, Ambattur, Chennai and nearby Tamil Nadu locations.
- Destination assignments: by prior arrangement and availability.
- Qualifying photography session: starts at ₹8,000 for up to 3 hours.
- Videography: quoted separately.
- Album options: 100 selected photos ₹8,000; 200 selected photos ₹15,000.
- Travel/location costs: included in the final agreed quotation.

 
## Corporate conversion rebuild — 24 November 2026

The three external audits supplied by the business owner were reviewed as a combined evidence set:

- WebEnture Website Grader: 89/100 across 21 crawled pages; 177 findings reported, 0 critical. The PDF groups findings by category and page but does not expose the complete 177-item evidence list, so it cannot support a claim that every individual finding has been cleared.
- SEOmator: 91/100, with 3 failed checks, 23 warnings and 149 passed checks. Main actionable items included keyword repetition, long meta description, multiple CSS requests, missing LCP preload, image delivery/responsive-image opportunities, and accessibility labels/skip navigation.
- The HOTH: A− overall; on-page SEO A−, GEO A+, links A+, usability A, performance A−. It flagged a long title/description, keyword consistency, CSS requests, and external trust/technical items.

The reports were generated on 23 November 2026. Some findings conflict with the repository state inspected on 24 November (for example, viewport metadata and the Indian phone number), so the reports should be treated as dated snapshots rather than a live test of the current branch.

### Changes prepared on the preview branch

- Reworked the homepage hero around a real portfolio image, clearer local positioning and an accurate qualifying-session price statement.
- Removed the autoplay hero video, reduced motion-heavy decoration, consolidated the homepage CSS into one stylesheet request, and added an LCP image preload.
- Added skip navigation, accessible lightbox button names, direct telephone links and a persistent mobile call/WhatsApp bar.
- Rebuilt the enquiry form layout so only name, phone, event location and service are required; optional fields remain available for a more accurate quote.
- Connected the form to the public lead intake API, then prepares a service-specific WhatsApp message. The browser event stream distinguishes a confirmed database save from a storage-unavailable fallback and does not send personal data to analytics.
- Removed unverified testimonials, unsupported claims about years/volume of experience, and unverified delivery promises from the affected service pages.
- Aligned service-page pricing language with the published qualifying-session and album prices; removed a redirected URL from the sitemap.

### Items requiring owner or external account setup

1. **Supabase lead storage:** The Vercel project currently has no environment variables. Follow LEAD_DASHBOARD_SETUP.md, apply supabase/migrations/20261124090000_create_photography_leads.sql, and add SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (server-side only), and DASHBOARD_ADMIN_EMAILS in Vercel. Never place the service-role key in frontend code or GitHub.
2. **Analytics:** No real GA4 Measurement ID or GTM container is configured. Events are queued in window.dataLayer but are not transmitted until a real consent-aware analytics tag is configured. Follow ANALYTICS_SETUP.md.
3. **Google Business Profile:** Verify/optimise the business profile using the owner's Google account. Use the correct service-area configuration and do not publish a private residential street address if customers are not received there.
4. **Email DNS:** The HOTH report flags SPF. The correct SPF record depends on the actual email provider; do not publish a guessed SPF record. Confirm the sending provider before changing DNS.
5. **Visual verification:** Desktop/mobile visual QA, Core Web Vitals and a fresh crawl must be performed on the latest preview deployment before production approval.

### Deployment safety

All changes are on feature/corporate-conversion-rebuild-2026 and PR #8. No production branch merge or production deployment has been made. The latest preview build could not be triggered during this session because Vercel returned its daily API deployment quota limit; do not treat the existing older preview deployment as the latest code.

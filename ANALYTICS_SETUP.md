# Analytics and Conversion Tracking Setup

The website now queues privacy-conscious conversion events in `window.dataLayer` without transmitting personal form data. Events include:
- `whatsapp_click`
- `phone_click`
- `email_click`
- `lead_form_submit_attempt`
- `lead_saved` (only when the Supabase API returns a successful save)
- `lead_storage_unavailable` (when server-side lead storage is not configured or unavailable)
- `referral_form_submit_attempt`

## Activate GA4 or Google Tag Manager
1. Create or select the business's Google Analytics 4 property.
2. Copy the real Measurement ID (format `G-XXXXXXXXXX`) or create a Google Tag Manager container (format `GTM-XXXXXXX`).
3. Add the real tag through a reviewed, consent-aware configuration. Do not publish a placeholder ID.
4. In GA4, mark `whatsapp_click`, `lead_saved` and `referral_form_submit_attempt` as key events only after confirming the conversion definitions after verifying the desired conversion definitions.
5. Test with GA4 DebugView and Tag Assistant on the Vercel preview before considering production.
6. Add an appropriate cookie/analytics notice and consent handling before enabling non-essential tracking where required.

## Important limitations
- Events are queued in the browser; they are not sent to Google until a real GA4 or GTM tag is configured.
- `lead_form_submit_attempt` indicates an attempt; `lead_saved` confirms a database write, not a qualified enquiry or booking.
- `lead_storage_unavailable` means the form could not confirm a database write; WhatsApp may still open for the visitor.
- Do not send names, phone numbers, email addresses, event details, or other personal information to analytics.
- WhatsApp click tracking does not prove that a message was sent or a booking was made.

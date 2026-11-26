# Lead generation deployment checklist

The homepage booking enquiry now submits to `POST /api/leads` and then opens a prefilled WhatsApp chat. Customer details are stored only after the customer checks the consent box.

## Required before database capture is live

1. In Supabase SQL Editor, run `supabase/migrations/20261124090000_create_photography_leads.sql`.
2. In Vercel Project Settings → Environment Variables, set the following for Production (and Preview if testing there):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side secret; do not expose it with a VITE_ prefix)
   - `DASHBOARD_ADMIN_EMAILS` (comma-separated authorised dashboard emails)
3. Redeploy the Vercel project after setting variables.
4. Test with a clearly marked enquiry, confirm it appears at `/admin.html`, then remove the test record.

## Enquiry journey

- User completes the current homepage form and explicitly consents to storage.
- Browser posts the fields to `/api/leads`; it does not send the service-role key.
- On successful submission, the website opens WhatsApp with the enquiry text. The customer must press Send in WhatsApp.
- A WhatsApp click is not proof of a message sent or a confirmed booking.

## Visual-change scope

Only `whatsapp-lead.js` is changed for the new flow. Do not change theme colors, CSS, images, logos, or layout as part of this lead-capture task.

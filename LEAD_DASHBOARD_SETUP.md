# Image Paradise Photography — Lead Dashboard Setup

The booking form is designed to save a consented enquiry to Supabase and then open WhatsApp with the same details. The service-role key is used only by Vercel server-side API routes; never place it in HTML, JavaScript, GitHub, or a public environment variable.

## 1. Create the Supabase database table

1. Open the Supabase project you want to use.
2. Open **SQL Editor**.
3. Run the SQL in `supabase/migrations/20261124090000_create_photography_leads.sql`.
4. Confirm that `public.photography_leads` exists and Row Level Security is enabled. Do not add public read/write policies.

## 2. Prepare dashboard authentication

1. In Supabase Authentication, enable email sign-in / magic links.
2. Add the authorised staff account(s) to Supabase Auth (invite the account; public self-registration is not needed).
3. Add these redirect URLs to Supabase Auth URL configuration:
   - `https://www.imageparadisephotography.online/admin.html`
   - The Vercel preview URL used for testing, if preview sign-in is required.
4. The dashboard only accepts email addresses included in `DASHBOARD_ADMIN_EMAILS`.

## 3. Add Vercel environment variables

In Vercel → Project → Settings → Environment Variables, add the following to **Production** and **Preview** as appropriate:

| Variable | Value / handling |
|---|---|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role secret; mark sensitive and keep server-side only |
| `DASHBOARD_ADMIN_EMAILS` | Comma-separated authorised staff email addresses |

Do not share or commit the service-role key. Do not prefix it with `VITE_`.

## 4. Deploy and verify

After the migration and environment variables are in place, redeploy the Vercel Preview. Test:
- Submit a clearly labelled test enquiry with consent.
- Confirm the prepared WhatsApp message opens.
- Confirm one row appears in `photography_leads`.
- Sign in at `/admin.html` using an invited admin email.
- Confirm an unauthorised account receives an access-denied response.
- Update a test lead's status and internal notes.
- Delete the test row from Supabase after verification.
- Repeat on Production after approval.

## Endpoints

- Public enquiry intake: `POST /api/leads`
- Dashboard public auth configuration: `GET /api/dashboard-config`
- Authenticated lead list/update: `GET/PATCH /api/admin/leads`
- Staff dashboard: `/admin.html`

If the database environment is missing, the form still opens WhatsApp and displays that the lead could not be saved. The dashboard will show a configuration message rather than exposing any secret.

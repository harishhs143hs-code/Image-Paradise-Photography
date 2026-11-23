-- Private enquiry storage for Image Paradise Photography.
-- The browser never receives the service-role key. All database access is mediated by Vercel API routes.
create extension if not exists pgcrypto;
create table if not exists public.photography_leads (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 phone text not null,
 email text,
 location text not null,
 service text not null,
 event_date date,
 date_flexibility text,
 coverage text,
 budget text,
 requirements text,
 consent_at timestamptz not null,
 source_page text,
 status text not null default 'new' check (status in ('new','contacted','quoted','booked','closed')),
 notes text not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists photography_leads_created_at_idx on public.photography_leads(created_at desc);
create index if not exists photography_leads_status_idx on public.photography_leads(status);
alter table public.photography_leads enable row level security;
-- Intentionally create no anon/authenticated SELECT, INSERT, UPDATE or DELETE policies.
-- The Vercel API uses SUPABASE_SERVICE_ROLE_KEY server-side and checks the dashboard
-- user's JWT plus DASHBOARD_ADMIN_EMAILS allowlist before returning or updating leads.

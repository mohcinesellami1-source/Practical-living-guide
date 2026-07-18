-- EcoPet — initial schema
-- Execute this in the Supabase dashboard (SQL Editor) or via the Supabase CLI.

create extension if not exists "pgcrypto";

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text default '',
  content text default '',
  category text default '',
  author text default 'Editorial Team',
  status text not null default 'draft'
    check (status in ('draft', 'published', 'rejected')),
  seo_title text default '',
  seo_description text default '',
  featured boolean not null default false,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_slug_idx on public.articles (slug);

-- Row Level Security
alter table public.articles enable row level security;

-- Public read: only published articles (used if you read with the anon key).
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles for select
  using (status = 'published');

-- The application uses the SERVICE ROLE key server-side, which bypasses RLS,
-- so admin writes/reads of all statuses work without extra policies.

-- Optional helper to keep updated_at fresh on every update.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

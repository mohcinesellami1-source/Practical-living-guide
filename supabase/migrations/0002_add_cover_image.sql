-- Migration 0002: add a nullable cover image URL to articles.
-- Stores a public, directly-served image URL (e.g. Unsplash / Pexels CDN).

alter table public.articles
  add column if not exists cover_image_url text;

comment on column public.articles.cover_image_url is
  'Public direct URL of the article cover image (Unsplash/Pexels CDN or similar).';

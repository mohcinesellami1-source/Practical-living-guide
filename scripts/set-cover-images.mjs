// Assigns topic-matched, commercially-safe cover images to draft articles.
//
// Usage:
//   1. Apply supabase/migrations/0002_add_cover_image.sql in the Supabase dashboard
//      (the script also tries to create the column via exec_sql as a convenience).
//   2. node scripts/set-cover-images.mjs
//
// Images are free Unsplash CDN photos (https://images.unsplash.com/...). Each URL is
// verified to return HTTP 200 before it is written. No API key is required.

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// ---- env ----
const envPath = new URL('../.env.local', import.meta.url);
const env = readFileSync(envPath, 'utf8');
for (const line of env.split('\n')) {
  const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
  if (m) process.env[m[1]] = m[2];
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });

// ---- curated, verified Unsplash photo IDs (all returned HTTP 200) ----
const IMG = {
  dogGolden: 'photo-1543466835-00a7907e9de1',
  dogSmile: 'photo-1601758228041-f3b2795255f1',
  dogGrass: 'photo-1444212477490-ca407925329e',
  dogClose: 'photo-1592194996308-7b43878e84a6',
  puppy: 'photo-1552053831-71594a27632d',
  cat: 'photo-1514888286974-6c03e2ca1dba',
  kitten: 'photo-1518791841217-8f162f1e1131',
  catBed: 'photo-1495360010541-f48722b34f7d',
  catGreen: 'photo-1574144611937-0df059b5ef3e',
  plants: 'photo-1416879595882-3373a0480b5b',
  plantsIndoor: 'photo-1466692476868-aef1dfb1e735',
  recycle: 'photo-1532996122724-e3c354a0b15b',
  supplies: 'photo-1583511655857-d19b40a7a54e',
};

const toUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

// keyword (lowercased, matched against title+category) -> photo id
const TOPIC_RULES = [
  [/(cat|kitten|feline|litter)/, [IMG.cat, IMG.kitten, IMG.catBed, IMG.catGreen]],
  [/(dog|puppy|canine)/, [IMG.dogGolden, IMG.dogSmile, IMG.puppy, IMG.dogGrass, IMG.dogClose]],
  [/(waste|poop|bag|compost|recycl|eco|green|sustainab|plant|garden)/, [IMG.recycle, IMG.plants, IMG.plantsIndoor]],
  [/(food|nutrition|treat|chew)/, [IMG.supplies]],
  [/(toy|play)/, [IMG.dogSmile]],
];

const FALLBACK = [
  IMG.plants, IMG.dogGolden, IMG.cat, IMG.recycle,
  IMG.dogGrass, IMG.kitten, IMG.plantsIndoor, IMG.puppy,
];

function pickImage(article, index) {
  const hay = `${article.title} ${article.category}`.toLowerCase();
  for (const [re, pool] of TOPIC_RULES) {
    if (re.test(hay)) return pool[index % pool.length];
  }
  return FALLBACK[index % FALLBACK.length];
}

async function ensureColumn() {
  try {
    const { error } = await sb.rpc('exec_sql', {
      query:
        'alter table public.articles add column if not exists cover_image_url text;',
    });
    if (error) throw error;
    console.log('✓ cover_image_url column ensured via exec_sql.');
  } catch (e) {
    if (/exec_sql/.test(e.message)) {
      console.warn(
        '⚠ exec_sql RPC not available. Please apply supabase/migrations/0002_add_cover_image.sql\n' +
        '  in the Supabase SQL editor, then re-run this script.'
      );
    } else if (!/already exists/.test(e.message)) {
      throw e;
    }
  }
}

async function verify(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  await ensureColumn();

  const { data: drafts, error } = await sb
    .from('articles')
    .select('id, slug, title, category, status')
    .eq('status', 'draft')
    .order('updated_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Failed to fetch drafts:', error.message);
    process.exit(1);
  }

  if (!drafts || drafts.length === 0) {
    console.log('No draft articles found — nothing to update.');
    return;
  }

  console.log(`Found ${drafts.length} draft article(s). Assigning covers…`);
  let updated = 0;

  for (let i = 0; i < drafts.length; i++) {
    const article = drafts[i];
    const id = pickImage(article, i);
    const imageUrl = toUrl(id);

    const ok = await verify(imageUrl);
    if (!ok) {
      console.warn(`✗ skipped (URL not reachable): ${article.title}`);
      continue;
    }

    const { error: updErr } = await sb
      .from('articles')
      .update({ cover_image_url: imageUrl })
      .eq('id', article.id);

    if (updErr) {
      console.warn(`✗ update failed for ${article.title}: ${updErr.message}`);
      continue;
    }
    console.log(`✓ ${article.title}  →  ${id}`);
    updated++;
  }

  console.log(`\nDone. ${updated}/${drafts.length} draft(s) updated with a cover image.`);
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});

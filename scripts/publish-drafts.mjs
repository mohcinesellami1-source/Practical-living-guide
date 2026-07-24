// Lists or publishes draft articles.
//   node scripts/publish-drafts.mjs list     -> print all drafts (review)
//   node scripts/publish-drafts.mjs publish  -> set all drafts to 'published'
//
// Publishing is a deliberate admin action invoked here at the operator's request.
// Uses the service-role key server-side only (never exposed to the client).

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

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

const mode = process.argv[2] ?? 'list';

if (mode === 'fetch-all') {
  const { data: all, error: fe } = await sb
    .from('articles')
    .select('id, slug, title, category, status, excerpt, content')
    .order('updated_at', { ascending: false });
  if (fe) {
    console.error('Fetch failed:', fe.message);
    process.exit(1);
  }
  for (const a of all) {
    console.log('---');
    console.log(`SLUG: ${a.slug}`);
    console.log(`TITLE: ${a.title}`);
    console.log(`CATEGORY: ${a.category}`);
    console.log(`EXCERPT: ${a.excerpt}`);
    console.log(`CONTENT:\n${a.content}`);
    console.log('---\n');
  }
  process.exit(0);
}

if (mode === 'remap') {
  const TARGET = 'Pet Care';
  const { data: all, error: fe } = await sb
    .from('articles')
    .select('id, category')
    .in('category', ['Dogs', 'Cats', 'Small Pets']);
  if (fe) {
    console.error('Fetch failed:', fe.message);
    process.exit(1);
  }
  console.log(`Remapping ${all.length} pet-subcategory article(s) -> "${TARGET}"...\n`);
  let ok = 0;
  for (const a of all) {
    const { error: upd } = await sb.from('articles').update({ category: TARGET }).eq('id', a.id);
    if (upd) {
      console.log(`✗ ${a.id}: ${upd.message}`);
    } else {
      ok++;
      console.log(`✓ ${a.id} (${a.category} -> ${TARGET})`);
    }
  }
  console.log(`\nRemapped ${ok}/${all.length}.`);
  process.exit(0);
}

const { data: drafts, error } = await sb
  .from('articles')
  .select('id, slug, title, category, status, featured, cover_image_url, excerpt, content')
  .eq('status', 'draft')
  .order('updated_at', { ascending: false });

if (error) {
  console.error('Failed to fetch drafts:', error.message);
  process.exit(1);
}

if (drafts.length === 0) {
  console.log('No draft articles found.');
  process.exit(0);
}

console.log(`\n${drafts.length} draft article(s):\n`);
for (const a of drafts) {
  console.log(`- [${a.category}] ${a.title}`);
  console.log(`    slug:   ${a.slug}`);
  console.log(`    cover:  ${a.cover_image_url ? 'yes' : 'NO'}`);
  console.log(`    chars:  ${a.content?.length ?? 0}`);
  console.log(`    excerpt: ${a.excerpt?.slice(0, 110)}`);
  console.log('');
}

if (mode === 'list') {
  console.log('Run with "publish" to set all drafts to published.');
  process.exit(0);
}

if (mode === 'publish') {
  console.log(`Publishing ${drafts.length} draft(s)...\n`);
  let ok = 0;
  for (const a of drafts) {
    const { error: upd } = await sb.from('articles').update({ status: 'published' }).eq('id', a.id);
    if (upd) {
      console.log(`✗ FAILED: ${a.title} — ${upd.message}`);
    } else {
      ok++;
      console.log(`✓ published: ${a.title}`);
    }
  }
  console.log(`\nPublished ${ok}/${drafts.length} draft article(s).`);
}

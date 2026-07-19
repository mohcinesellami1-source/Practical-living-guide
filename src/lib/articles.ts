import 'server-only';
import { createServiceSupabase } from './supabase/server';
import { mapRowToArticle, toSlug } from './article-utils';
import type { Article, ArticleInput, ArticleStatus } from '../types/article';

export async function getPublishedArticles(): Promise<Article[]> {
  const sb = createServiceSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const sb = createServiceSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sb = createServiceSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw error;
  return data ? mapRowToArticle(data) : null;
}

export async function getAllArticles(): Promise<Article[]> {
  const sb = createServiceSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRowToArticle);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const sb = createServiceSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRowToArticle(data) : null;
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const sb = createServiceSupabase();
  const slug = input.slug?.trim() || toSlug(input.title);

  const { data, error } = await sb
    .from('articles')
    .insert({
      slug,
      title: input.title,
      excerpt: input.excerpt ?? '',
      content: input.content ?? '',
      category: input.category ?? '',
      author: input.author ?? 'Editorial Team',
      status: input.status ?? 'draft',
      seo_title: input.seoTitle ?? '',
      seo_description: input.seoDescription ?? '',
      featured: input.featured ?? false,
      cover_image_url: input.coverImageUrl ?? null,
      rejection_reason: null,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRowToArticle(data);
}

export async function updateArticle(id: string, input: ArticleInput): Promise<void> {
  const sb = createServiceSupabase();
  const slug = input.slug?.trim() || toSlug(input.title);

  const { error } = await sb
    .from('articles')
    .update({
      slug,
      title: input.title,
      excerpt: input.excerpt ?? '',
      content: input.content ?? '',
      category: input.category ?? '',
      author: input.author ?? 'Editorial Team',
      status: input.status ?? 'draft',
      seo_title: input.seoTitle ?? '',
      seo_description: input.seoDescription ?? '',
      featured: input.featured ?? false,
      cover_image_url: input.coverImageUrl ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

export async function setStatus(
  id: string,
  status: ArticleStatus,
  reason: string | null = null
): Promise<void> {
  const sb = createServiceSupabase();
  const { error } = await sb
    .from('articles')
    .update({
      status,
      rejection_reason: status === 'rejected' ? reason : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const sb = createServiceSupabase();
  const { error } = await sb.from('articles').delete().eq('id', id);
  if (error) throw error;
}

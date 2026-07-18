import type { Article } from '../types/article';

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function mapRowToArticle(row: Record<string, unknown>): Article {
  return {
    id: String(row.id),
    slug: String(row.slug ?? ''),
    title: String(row.title ?? ''),
    excerpt: String(row.excerpt ?? ''),
    content: String(row.content ?? ''),
    category: String(row.category ?? ''),
    author: String(row.author ?? ''),
    status: (row.status as Article['status']) ?? 'draft',
    seoTitle: String(row.seo_title ?? ''),
    seoDescription: String(row.seo_description ?? ''),
    featured: Boolean(row.featured),
    rejectionReason: row.rejection_reason ? String(row.rejection_reason) : null,
    createdAt: String(row.created_at ?? ''),
    updatedAt: String(row.updated_at ?? ''),
  };
}

export function filterPublished(articles: Article[]): Article[] {
  return articles.filter((a) => a.status === 'published');
}

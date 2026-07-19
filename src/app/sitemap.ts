import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';
import { getPublishedArticles } from '../lib/articles';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['/', '/about', '/editorial-policy', '/affiliate-disclosure', '/privacy', '/contact'];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.6,
  }));

  const articles = await getPublishedArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/article/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries];
}

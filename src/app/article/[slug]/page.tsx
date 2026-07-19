import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles } from '../../../lib/articles';
import { extractHeadings, readingTimeMinutes } from '../../../lib/article-utils';
import { SiteHeader } from '../../../components/SiteHeader';
import { SiteFooter } from '../../../components/SiteFooter';
import { ArticleCard } from '../../../components/ArticleCard';
import { MarkdownContent } from '../../../components/MarkdownContent';
import { AffiliateDisclosure } from '../../../components/AffiliateDisclosure';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { Clock, User } from 'lucide-react';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../../../lib/site';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  const url = `${SITE_URL}/article/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt || SITE_DESCRIPTION,
    alternates: { canonical: `/article/${article.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt || SITE_DESCRIPTION,
      siteName: SITE_NAME,
      publishedTime: article.createdAt || undefined,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || SITE_DESCRIPTION,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const headings = extractHeadings(article.content);
  const reading = readingTimeMinutes(article.content);

  const related = (await getPublishedArticles())
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => (a.category === article.category ? -1 : 0) - (b.category === article.category ? -1 : 0))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.createdAt,
            dateModified: article.updatedAt,
            author: { '@type': 'Organization', name: article.author },
            publisher: { '@type': 'Organization', name: SITE_NAME },
            image: article.coverImageUrl || undefined,
            mainEntityOfPage: `${SITE_URL}/article/${article.slug}`,
          }),
        }}
      />
      <SiteHeader />

      <main className="bg-cream">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/#latest"
            className="inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline"
          >
            ← Back to guides
          </Link>

          <header className="mt-6 border-b border-gray-200 pb-8">
            {article.category && (
              <span className="text-xs font-medium uppercase tracking-wider text-forest">{article.category}</span>
            )}
            <h1 className="mt-2 text-4xl font-serif leading-tight text-charcoal sm:text-5xl">{article.title}</h1>
            {article.excerpt && <p className="mt-4 text-lg text-gray-600">{article.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {article.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" /> {article.author}
                </span>
              )}
              {article.createdAt && (
                <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
              )}
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {reading} min read
              </span>
            </div>
          </header>

          {article.coverImageUrl && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={article.coverImageUrl}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 768px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {headings.length > 0 && (
            <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-sage bg-sage-light/40 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-forest">On this page</p>
              <ul className="space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? 'pl-4' : undefined}>
                    <a href={`#${h.id}`} className="text-forest hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-10">
            <MarkdownContent content={article.content} />
          </div>

          <div className="mt-12">
            <AffiliateDisclosure />
          </div>
        </article>

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-serif text-forest">Related guides</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

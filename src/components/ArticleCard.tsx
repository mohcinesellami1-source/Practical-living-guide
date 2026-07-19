import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '../types/article';
import { readingTimeMinutes } from '../lib/article-utils';
import { Clock, Leaf } from 'lucide-react';

type Props = {
  article: Article;
  variant?: 'featured' | 'standard';
};

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function ArticleCard({ article, variant = 'standard' }: Props) {
  const href = `/article/${article.slug}`;
  const reading = readingTimeMinutes(article.content);

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sage-light to-cream-dark">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Leaf className="h-12 w-12 text-sage" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="p-6">
          <span className="text-xs font-medium uppercase tracking-wider text-forest">{article.category}</span>
          <h3 className="mt-2 text-2xl font-serif leading-tight text-charcoal">
            <Link href={href} className="hover:text-forest transition-colors">
              {article.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-gray-600">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" /> {reading} min read
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-sage-light to-cream-dark">
        {article.coverImageUrl ? (
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Leaf className="h-9 w-9 text-sage" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-forest">{article.category}</span>
        <h3 className="mt-2 text-lg font-serif leading-snug text-charcoal">
          <Link href={href} className="hover:text-forest transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {reading} min
          </span>
        </div>
      </div>
    </article>
  );
}
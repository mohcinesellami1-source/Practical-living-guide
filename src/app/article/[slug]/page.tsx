import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '../../../lib/articles';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
          <Link href="/" className="text-xl font-bold text-primary" aria-label="EcoPet Home">
            EcoPet
          </Link>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link href="/admin/login" className="hover:text-primary transition-colors">Admin</Link></li>
          </ul>
        </nav>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <nav className="mb-6">
          <Link href="/" className="text-primary hover:underline text-sm">← Back to articles</Link>
        </nav>

        <header className="mb-8">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            <span>•</span>
            <span>{article.author}</span>
          </div>
        </header>

        <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.content }} />

        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EcoPet. All rights reserved.
        </footer>
      </article>
    </main>
  );
}

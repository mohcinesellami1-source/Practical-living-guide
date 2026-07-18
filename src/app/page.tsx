import Link from 'next/link';
import { getPublishedArticles, getFeaturedArticles } from '../lib/articles';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featured = await getFeaturedArticles();
  const all = await getPublishedArticles();

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

      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Sustainable Pet Supplies
            <span className="text-primary"> for Conscious Owners</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Expert-tested eco-friendly products for dogs and cats. No greenwashing—just honest reviews and guides.
          </p>
          <Link
            href="#articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <section id="articles" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Latest Articles</h2>
        </div>

        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-4">Featured</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((article) => (
                <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
                    <h3 className="mt-2 text-xl font-bold group-hover:text-primary transition-colors">
                      <Link href={`/article/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{article.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {all.map((article) => (
            <article key={article.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.category}</span>
                <h3 className="mt-2 text-lg font-bold group-hover:text-primary transition-colors">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{article.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {all.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No articles published yet.
          </div>
        )}
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EcoPet. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

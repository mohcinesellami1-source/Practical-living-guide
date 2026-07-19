import Link from 'next/link';
import { getPublishedArticles, getFeaturedArticles } from '../lib/articles';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { ArticleCard } from '../components/ArticleCard';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Leaf, ShieldCheck, Sparkles, Recycle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const featured = await getFeaturedArticles();
  const all = await getPublishedArticles();
  const activeCategory = searchParams?.category;

  const visible = activeCategory ? all.filter((a) => a.category === activeCategory) : all;
  const categories = Array.from(new Set(all.map((a) => a.category).filter(Boolean)));

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-light/50 to-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-forest shadow-sm">
              <Leaf className="h-4 w-4" aria-hidden="true" /> Eco-friendly pet guides
            </p>
            <h1 className="text-4xl font-serif leading-tight text-forest sm:text-5xl lg:text-6xl">
              Smarter, greener choices for the pets you love.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-700">
              Independent, hands-on reviews of sustainable pet products — from compostable waste bags to
              plant-based litter. No greenwashing, just honest testing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#latest"
                className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 font-medium text-cream hover:bg-forest-dark transition-colors"
              >
                Explore guides
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-forest px-6 py-3 font-medium text-forest hover:bg-forest hover:text-cream transition-colors"
              >
                Our editorial standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Editor's pick" title="Featured guide" />
          <div className="grid gap-8 md:grid-cols-2">
            {featured.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Latest guides */}
      <section id="latest" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif text-forest">Latest guides</h2>
            {activeCategory && (
              <p className="mt-1 text-sm text-gray-600">
                Filtered by <span className="font-medium text-forest">{activeCategory}</span>.{' '}
                <Link href="/" className="text-forest underline">
                  Clear filter
                </Link>
              </p>
            )}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
            No published guides yet. Check back soon.
          </div>
        )}
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section id="categories" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Browse by topic" title="Find your pet's category" />
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-sage bg-white px-5 py-2 text-sm font-medium text-forest shadow-sm transition-colors hover:bg-sage-light"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Editorial standard */}
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-sage">Why trust EcoPet</p>
            <h2 className="text-3xl font-serif leading-tight text-cream sm:text-4xl">Our editorial standard</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Independently tested', text: 'We buy and test products ourselves — no manufacturer-supplied samples for review.' },
              { icon: Recycle, title: 'Sustainability first', text: 'We prioritize verified certifications like compostable or FSC over vague “eco” claims.' },
              { icon: Sparkles, title: 'Honest recommendations', text: 'Affiliate links are disclosed and never influence our ratings or conclusions.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <Icon className="mx-auto h-10 w-10 text-sage" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-medium text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-cream/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <NewsletterSignup />
      </section>

      <SiteFooter />
    </>
  );
}
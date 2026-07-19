import Link from 'next/link';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { AffiliateDisclosure } from '../../components/AffiliateDisclosure';
import { ShieldCheck, Recycle, Sparkles, Leaf } from 'lucide-react';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'About — Practical Living Guide',
  description: 'How Practical Living Guide researches, tests, and reviews practical, sustainable products for everyday life.',
  path: '/about',
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Independently tested',
    text: 'We buy and use the products we review ourselves — no manufacturer-supplied samples, no pay-to-play.',
  },
  {
    icon: Recycle,
    title: 'Sustainability first',
    text: 'We favour verified certifications like compostable, FSC, or recognised cruelty-free standards over vague “eco” claims.',
  },
  {
    icon: Sparkles,
    title: 'Honest recommendations',
    text: 'Affiliate links are disclosed and never influence our ratings, rankings, or conclusions.',
  },
  {
    icon: Leaf,
    title: 'Practical by design',
    text: 'Every guide solves a real, everyday problem — we skip theory in favour of what actually works at home.',
  },
];

const COVERS = [
  'Home & Cleaning',
  'Organization & Storage',
  'Pet Care',
  'Garden & Outdoor',
  'DIY & Simple Repairs',
  'Product Guides',
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-cream">
        <section className="bg-gradient-to-b from-sage-light/50 to-cream">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif leading-tight text-forest sm:text-5xl">About Practical Living Guide</h1>
            <p className="mt-6 text-lg text-gray-700">
              We are a small, independent team helping people make practical, sustainable choices across everyday
              life — from the products they buy to the way they care for their homes, gardens, and pets.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Our mission</h2>
            <p>
              Our mission is simple: reduce the everyday environmental impact of modern living through informed
              choices and honest, hands-on guidance. We test products ourselves, research the sustainability
              credentials of each brand, and explain — in plain language — what is worth buying and what is not.
            </p>

            <h2>What we cover</h2>
            <p>
              Practical Living Guide spans the parts of daily life where small, repeatable choices add up. Our
              guides are organised into six areas:
            </p>
            <ul>
              {COVERS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>
              Whether you are composting pet waste, cutting plastic in your cleaning routine, or fixing something
              instead of replacing it, we aim to give you a clear, trustworthy answer.
            </p>

            <h2>How we work</h2>
            <p>
              We are not a content farm. Each guide starts with a real question and ends with a recommendation we
              would give a friend. We buy the products, use them in real homes, and only publish once we have
              something genuinely useful to say — including when the honest answer is “skip it.”
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <Icon className="mx-auto h-10 w-10 text-sage" aria-hidden="true" />
                  <h3 className="mt-3 text-lg font-medium text-forest">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <AffiliateDisclosure />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#latest"
              className="inline-flex items-center gap-2 rounded-md bg-forest px-6 py-3 font-medium text-cream transition-colors hover:bg-forest-dark"
            >
              Explore our guides
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

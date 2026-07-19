import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'Editorial Policy — Practical Living Guide',
  description: 'How Practical Living Guide researches, tests, and reviews products, and keeps its recommendations independent.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Editorial Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Our commitment to independent, honest, and practical guidance.
          </p>

          <div className="prose prose-lg mt-8 max-w-none">
            <h2>How we research</h2>
            <p>
              Every guide begins with a real, specific question — not a generic topic. We review manufacturer
              specifications, independent certifications, and published standards before we ever touch a product.
            </p>

            <h2>How we test</h2>
            <p>
              We buy the products we review with our own funds and use them in real homes, gardens, and with real
              pets. We do not accept manufacturer-supplied samples for review, and we never let a brand influence a
              rating or outcome.
            </p>

            <h2>How we choose what to recommend</h2>
            <p>
              We prioritise verified sustainability credentials — certifications such as compostable, FSC, or
              recognised cruelty-free standards — over vague or unverifiable “eco” marketing language. When a claim
              cannot be substantiated, we say so, and when the honest answer is “skip it,” we say that too.
            </p>

            <h2>Independence</h2>
            <p>
              Affiliate links may appear on our pages, but they never affect what we recommend or how we score a
              product. Our editorial team makes all decisions independently of commercial relationships, and no one
              outside the editorial team can edit a conclusion for commercial reasons.
            </p>

            <h2>Corrections</h2>
            <p>
              If we get something wrong, we correct it promptly and transparently, noting what changed. You can
              reach us any time via our <a href="/contact">contact page</a>.
            </p>

            <h2>Suggest a topic</h2>
            <p>
              We welcome suggestions for products and topics to cover. Send us a note and tell us what you would
              like tested next.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

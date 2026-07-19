import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';

export const metadata = {
  title: 'Editorial Policy — Practical Living Guide',
  description: 'How Practical Living Guide tests products and maintains independent, honest reviews.',
};

export default function EditorialPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Editorial Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Our commitment to independent, honest, and sustainable product guidance.
          </p>

          <div className="prose prose-lg mt-8 max-w-none">
            <h2>How we test</h2>
            <p>
              We buy the products we review with our own funds and test them in real homes with real pets. We do
              not accept manufacturer-supplied samples for review, and we never let a brand influence a rating.
            </p>

            <h2>How we choose what to recommend</h2>
            <p>
              We prioritise verified sustainability credentials — certifications such as compostable, FSC, or
              recognised cruelty-free standards — over vague or unverifiable “eco” marketing language. When a
              claim can’t be substantiated, we say so.
            </p>

            <h2>Independence</h2>
            <p>
              Affiliate links may appear on our pages, but they never affect what we recommend or how we score a
              product. Our editorial team makes all decisions independently of commercial relationships.
            </p>

            <h2>Corrections</h2>
            <p>
              If we get something wrong, we correct it promptly and transparently. You can reach us any time via
              our contact page.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

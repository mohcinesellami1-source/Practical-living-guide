import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { AffiliateDisclosure } from '../../components/AffiliateDisclosure';

export const metadata = {
  title: 'Affiliate Disclosure — Practical Living Guide',
  description: 'How Practical Living Guide uses affiliate links and how they affect our recommendations.',
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Affiliate Disclosure</h1>
          <p className="mt-4 text-lg text-gray-600">
            Transparency about how Practical Living Guide is funded and how that affects our content.
          </p>

          <div className="prose prose-lg mt-8 max-w-none">
            <p>
              Practical Living Guide is a reader-supported publication. Some links on our site are affiliate links, which means
              we may earn a commission if you purchase a product after clicking through — at no additional cost to
              you.
            </p>
            <p>
              Commissions help us buy and test more products independently. They do not influence our reviews,
              ratings, or the products we choose to recommend. Our editorial standards come first, always.
            </p>
          </div>

          <div className="mt-8">
            <AffiliateDisclosure />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

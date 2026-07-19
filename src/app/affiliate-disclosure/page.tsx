import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { AffiliateDisclosure } from '../../components/AffiliateDisclosure';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'Affiliate Disclosure — Practical Living Guide',
  description: 'How Practical Living Guide uses affiliate links and how they affect our recommendations.',
  path: '/affiliate-disclosure',
});

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
            <h2>What affiliate links are</h2>
            <p>
              Some links on our site are affiliate links. If you click one and later buy a product, we may earn a
              commission — at no extra cost to you. The price you pay is the same whether or not you use our link.
            </p>

            <h2>How commissions work</h2>
            <p>
              Commissions help us buy and test more products independently. They are paid by retailers and brands
              through affiliate networks; we never charge readers, and we never accept payment to feature or rank a
              product.
            </p>

            <h2>They don’t influence our recommendations</h2>
            <p>
              Our reviews, ratings, and recommendations are decided by our editorial team based on hands-on testing
              and research. Affiliate relationships do not affect what we choose to cover or how we score it. If a
              product isn’t worth buying, we’ll say so — even if it pays a commission.
            </p>

            <h2>How to spot an affiliate link</h2>
            <p>
              Affiliate links may include tracking parameters and are disclosed on every article through the notice
              shown below. This page and that notice are provided in line with guidance that endorsements be clear
              and conspicuous.
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

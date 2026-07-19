import Link from 'next/link';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { AffiliateDisclosure } from '../../components/AffiliateDisclosure';
import { ShieldCheck, Recycle, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About — EcoPet',
  description: 'How EcoPet tests products and keeps its reviews independent and honest.',
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Independently tested',
    text: 'We buy and test the products we review ourselves — no manufacturer-supplied samples.',
  },
  {
    icon: Recycle,
    title: 'Sustainability first',
    text: 'We favour verified certifications like compostable or FSC over vague “eco” claims.',
  },
  {
    icon: Sparkles,
    title: 'Honest recommendations',
    text: 'Affiliate links are disclosed and never influence our ratings or conclusions.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-cream">
        <section className="bg-gradient-to-b from-sage-light/50 to-cream">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif leading-tight text-forest sm:text-5xl">About EcoPet</h1>
            <p className="mt-6 text-lg text-gray-700">
              We are pet owners and environmental advocates helping you make sustainable choices for the animals
              you love — without compromising on quality or safety.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>Our mission</h2>
            <p>
              Our mission is simple: reduce the environmental impact of pet ownership through informed product
              choices and honest reviews. We test products ourselves and research the sustainability credentials
              of each brand before recommending anything.
            </p>

            <h2>Why sustainable pet products?</h2>
            <p>
              Conventional pet supplies often rely on single-use plastics, non-renewable resources, and harmful
              chemicals. Choosing eco-friendly alternatives reduces our collective footprint while often being
              better for our pets, too.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
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

import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { ContactForm } from '../../components/ContactForm';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'Contact — Practical Living Guide',
  description: 'Get in touch with the Practical Living Guide editorial team.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Contact</h1>
          <p className="mt-4 text-lg text-gray-600">
            Questions, corrections, or product suggestions? We’d love to hear from you.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <ContactForm />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-lg font-serif text-forest">Other ways to reach us</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-charcoal">Email</dt>
                  <dd className="mt-1 text-gray-600">
                    <a href="mailto:hello@practicallivingguide.com" className="font-medium text-forest underline">
                      hello@practicallivingguide.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal">Response time</dt>
                  <dd className="mt-1 text-gray-600">We aim to reply within 2–3 business days.</dd>
                </div>
                <div>
                  <dt className="font-medium text-charcoal">Editorial tips</dt>
                  <dd className="mt-1 text-gray-600">
                    Know a product we should test? Send the details and tell us why it matters.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

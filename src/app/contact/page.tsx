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
            Questions, corrections, or product suggestions? Send us a note.
          </p>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Prefer email? Write to us at{' '}
            <a href="mailto:hello@practicallivingguide.example" className="font-medium text-forest underline">
              hello@practicallivingguide.example
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

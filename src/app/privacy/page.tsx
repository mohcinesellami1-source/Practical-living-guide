import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'Privacy Policy — Practical Living Guide',
  description: 'How Practical Living Guide handles your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            We keep things simple and respect your privacy.
          </p>

          <div className="prose prose-lg mt-8 max-w-none">
            <h2>What we collect</h2>
            <p>
              When you sign in to the admin area, we store only the account information provided by our
              authentication provider (Supabase Auth). We do not sell or share personal data with third parties
              for advertising.
            </p>

            <h2>Cookies</h2>
            <p>
              We use essential cookies solely to keep you signed in to the admin area. We do not use advertising
              or tracking cookies on the public site.
            </p>

            <h2>Your data</h2>
            <p>
              You can request access to or deletion of your account data at any time by contacting us. We will
              respond as soon as reasonably possible.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, we will update this page. This is a demonstration policy and should be
              reviewed by legal counsel before launch.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

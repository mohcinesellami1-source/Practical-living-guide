import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { pageMetadata } from '../../lib/site';

export const metadata = pageMetadata({
  title: 'Privacy Policy — Practical Living Guide',
  description: 'How Practical Living Guide collects, uses, and protects your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif leading-tight text-forest">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
          <p className="mt-4 text-lg text-gray-600">
            Practical Living Guide (“we”, “us”) respects your privacy. This policy explains what information we
            collect, how we use it, and the choices you have.
          </p>

          <div className="prose prose-lg mt-8 max-w-none">
            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Account information.</strong> If you sign in to our admin area, we store only the account
                details provided by our authentication provider (Supabase Auth) — typically your email address and
                sign-in metadata.
              </li>
              <li>
                <strong>Contact information.</strong> If you contact us through the form or by email, we collect
                the details you provide, such as your name, email address, and message, so we can respond.
              </li>
              <li>
                <strong>Usage data.</strong> Like most websites, we may collect basic, aggregated information such
                as the pages visited and approximate region, to understand which guides are useful.
              </li>
            </ul>

            <h2>How we use your information</h2>
            <p>
              We use your information to operate the site, respond to enquiries, maintain security, and improve our
              guides. We do not sell your personal information.
            </p>

            <h2>Cookies</h2>
            <p>
              We use essential cookies solely to keep you signed in to the admin area. The public site does not use
              advertising or cross-site tracking cookies. You can disable cookies in your browser; some admin
              features may not work without them.
            </p>

            <h2>Third parties</h2>
            <p>
              We rely on a small number of service providers: Supabase (hosting and authentication) and affiliate
              networks that pay us a commission when you buy through our links. These providers process data under
              their own privacy policies. We do not share personal information with advertisers.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep account and contact information only as long as necessary to provide the service and meet
              legal obligations, after which we delete or anonymise it.
            </p>

            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time. To make a
              request, email us using the address on our <a href="/contact">contact page</a>. We will respond as
              soon as reasonably possible.
            </p>

            <h2>Children’s privacy</h2>
            <p>
              This site is not directed to children under 13, and we do not knowingly collect personal information
              from them.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, we will update this page. We encourage you to review it periodically.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

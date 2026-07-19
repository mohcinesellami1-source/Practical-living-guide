import { AdminLayout } from '../../../components/AdminLayout';
import { AffiliateDisclosure } from '../../../components/AffiliateDisclosure';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-forest">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Site configuration and editorial references.</p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-serif text-forest">Site configuration</h2>
          <p className="mt-2 text-sm text-gray-600">
            Practical Living Guide is configured through environment variables set in your hosting provider (Supabase URL,
            publishable key, and service-role key). These are read at runtime and are never exposed to the
            browser beyond the public publishable key.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-serif text-forest">Affiliate disclosure</h2>
          <p className="mt-2 text-sm text-gray-600">
            Shown on every published article so readers always know how we handle affiliate links.
          </p>
          <div className="mt-4">
            <AffiliateDisclosure />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-serif text-forest">Content statuses</h2>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><strong className="text-charcoal">Draft</strong> — saved but not visible to the public.</li>
            <li><strong className="text-charcoal">Published</strong> — live on the site.</li>
            <li><strong className="text-charcoal">Rejected</strong> — returned to the author with a reason.</li>
          </ul>
        </section>
      </div>
    </AdminLayout>
  );
}

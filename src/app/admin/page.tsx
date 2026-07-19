import Link from 'next/link';
import { FileText, CheckCircle2, FileEdit, XCircle, Plus, ExternalLink } from 'lucide-react';
import { getAllArticles } from '../../lib/articles';
import { AdminLayout } from '../../components/AdminLayout';

export const dynamic = 'force-dynamic';

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function AdminDashboardPage() {
  const articles = await getAllArticles();
  const published = articles.filter((a) => a.status === 'published').length;
  const drafts = articles.filter((a) => a.status === 'draft').length;
  const rejected = articles.filter((a) => a.status === 'rejected').length;
  const recent = articles.slice(0, 5);

  const cards = [
    { label: 'Published', value: published, icon: CheckCircle2, tone: 'text-green-700 bg-green-50' },
    { label: 'Drafts', value: drafts, icon: FileEdit, tone: 'text-amber-700 bg-amber-50' },
    { label: 'Rejected', value: rejected, icon: XCircle, tone: 'text-red-700 bg-red-50' },
    { label: 'Total', value: articles.length, icon: FileText, tone: 'text-forest bg-sage-light/50' },
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Overview of your editorial content.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> New Article
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-forest px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> View Site
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${c.tone}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-3xl font-serif text-charcoal">{c.value}</p>
              <p className="text-sm text-gray-600">{c.label}</p>
            </div>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-serif text-forest">Recent articles</h2>
        {recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center text-gray-500">
            No articles yet.{' '}
            <Link href="/admin/new" className="font-medium text-forest underline">
              Create your first guide
            </Link>
            .
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {recent.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <Link href={`/admin/articles/${a.id}`} className="font-medium text-charcoal hover:text-forest">
                    {a.title}
                  </Link>
                  <p className="truncate text-sm text-gray-500">
                    {a.category || 'Uncategorised'} · Updated {formatDate(a.updatedAt)}
                  </p>
                </div>
                <Link
                  href={`/admin/articles/${a.id}`}
                  className="shrink-0 text-sm font-medium text-forest hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AdminLayout>
  );
}

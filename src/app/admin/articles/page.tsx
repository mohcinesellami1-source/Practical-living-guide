import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllArticles } from '../../../lib/articles';
import { AdminLayout } from '../../../components/AdminLayout';
import { ArticlesManager } from '../../../components/ArticlesManager';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const rejectedCount = articles.filter((a) => a.status === 'rejected').length;

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-forest">Articles</h1>
          <p className="mt-1 text-sm text-gray-600">
            {publishedCount} published · {draftCount} drafts · {rejectedCount} rejected · {articles.length} total
          </p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-forest-dark"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> New Article
        </Link>
      </div>

      <ArticlesManager articles={articles} />
    </AdminLayout>
  );
}

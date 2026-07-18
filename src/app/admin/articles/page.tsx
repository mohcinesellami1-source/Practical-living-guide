import Link from 'next/link';
import { getAllArticles } from '../../../lib/articles';
import { logoutAction, setStatusAction, deleteArticleAction } from '../actions';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  rejected: 'Rejected',
};

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const rejectedCount = articles.filter((a) => a.status === 'rejected').length;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
              ← Back to Site
            </Link>
            <form action={logoutAction}>
              <button className="text-sm text-gray-600 hover:text-primary" type="submit">Logout</button>
            </form>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Articles</h2>
            <p className="text-sm text-gray-600">
              Published: {publishedCount} · Drafts: {draftCount} · Rejected: {rejectedCount}
            </p>
          </div>
          <Link
            href="/admin/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            + New Article
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{article.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{article.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : article.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {STATUS_LABEL[article.status]}
                    </span>
                    {article.status === 'rejected' && article.rejectionReason && (
                      <p className="mt-1 text-xs text-red-600">{article.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {article.updatedAt
                      ? new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-sm text-gray-600 hover:text-primary"
                        target="_blank"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        Edit
                      </Link>

                      {article.status !== 'published' && (
                        <form action={setStatusAction}>
                          <input type="hidden" name="id" value={article.id} />
                          <input type="hidden" name="status" value="published" />
                          <button className="text-sm text-green-600 hover:underline font-medium" type="submit">Publish</button>
                        </form>
                      )}

                      {article.status === 'published' && (
                        <form action={setStatusAction}>
                          <input type="hidden" name="id" value={article.id} />
                          <input type="hidden" name="status" value="draft" />
                          <button className="text-sm text-gray-600 hover:underline font-medium" type="submit">Unpublish</button>
                        </form>
                      )}

                      <form action={setStatusAction} className="flex items-center gap-1">
                        <input type="hidden" name="id" value={article.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <input
                          type="text"
                          name="reason"
                          placeholder="Reason"
                          className="w-24 text-xs border border-gray-300 rounded px-1 py-1"
                        />
                        <button className="text-sm text-red-600 hover:underline font-medium" type="submit">Reject</button>
                      </form>

                      <form action={deleteArticleAction}>
                        <input type="hidden" name="id" value={article.id} />
                        <button className="text-sm text-red-600 hover:underline font-medium" type="submit">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

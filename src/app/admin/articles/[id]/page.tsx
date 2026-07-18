import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleById } from '../../../../lib/articles';
import { updateArticleAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const article = await getArticleById(params.id);
  if (!article) notFound();

  const hasError = searchParams?.error === '1';
  const action = updateArticleAction.bind(null, article.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
          <Link href="/admin/articles" className="text-sm text-gray-600 hover:text-primary transition-colors">
            ← Back to Articles
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-8">
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6 text-sm text-red-800">
            Validation échouée : le titre (min 3 car.) et le contenu (min 10 car.) sont requis.
          </div>
        )}

        <form action={action} className="space-y-6 bg-white rounded-lg shadow p-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input name="title" required defaultValue={article.title} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Slug</label>
              <input name="slug" defaultValue={article.slug} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <input name="category" defaultValue={article.category} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Author</label>
              <input name="author" defaultValue={article.author} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select name="status" defaultValue={article.status} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Excerpt</label>
            <textarea name="excerpt" rows={2} defaultValue={article.excerpt} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Content (Markdown)</label>
            <textarea name="content" required rows={12} defaultValue={article.content} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">SEO Title</label>
            <input name="seoTitle" defaultValue={article.seoTitle} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">SEO Description</label>
            <input name="seoDescription" defaultValue={article.seoDescription} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="featured" defaultChecked={article.featured} /> Featured
          </label>

          {article.status === 'rejected' && article.rejectionReason && (
            <p className="text-sm text-red-600">Rejeté : {article.rejectionReason}</p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Update Article
          </button>
        </form>
      </section>
    </main>
  );
}

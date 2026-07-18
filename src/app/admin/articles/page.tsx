'use client';

import Link from 'next/link';
import { articles as seedArticles, Article } from '../../../data/articles';
import { useState } from 'react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AdminArticlesPage() {
  const [allArticles, setAllArticles] = useState<Article[]>(() =>
    seedArticles.map((a) => ({ ...a }))
  );
  const published = allArticles.filter((a) => a.status === 'published');

  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Article>>({});

  const startEdit = (article: Article) => {
    setEditingSlug(article.slug);
    setEditForm({ ...article });
  };

  const saveEdit = (slug: string) => {
    setAllArticles((prev) =>
      prev.map((a) =>
        a.slug === slug
          ? { ...a, ...editForm, updatedAt: new Date().toISOString() }
          : a
      )
    );
    setEditingSlug(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingSlug(null);
    setEditForm({});
  };

  const deleteArticle = (slug: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setAllArticles((prev) => prev.filter((a) => a.slug !== slug));
    }
  };

  const publishDraft = (slug: string) => {
    setAllArticles((prev) =>
      prev.map((a) =>
        a.slug === slug
          ? { ...a, status: 'published', updatedAt: new Date().toISOString() }
          : a
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
            ← Back to Site
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">All Articles</h2>
            <p className="text-sm text-gray-600">Published: {published.length} / Drafts: {allArticles.filter(a => a.status === 'draft').length}</p>
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
              {allArticles.map((article) => (
                <tr key={article.slug} className={editingSlug === article.slug ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4">
                    {editingSlug === article.slug ? (
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{article.title}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingSlug === article.slug ? (
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      >
                        <option>Dogs</option>
                        <option>Cats</option>
                        <option>Small Pets</option>
                      </select>
                    ) : (
                      <span className="text-sm text-gray-600">{article.category}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(article.updatedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingSlug === article.slug ? (
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={cancelEdit}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(article.slug)}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          href={`/article/${article.slug}`}
                          className="text-sm text-gray-600 hover:text-primary"
                          target="_blank"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => startEdit(article)}
                          className="text-sm text-primary hover:underline font-medium"
                        >
                          Edit
                        </button>
                        {article.status === 'draft' && (
                          <button
                            onClick={() => publishDraft(article.slug)}
                            className="text-sm text-green-600 hover:underline font-medium"
                          >
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => deleteArticle(article.slug)}
                          className="text-sm text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FileText, Search, Eye, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import type { Article, ArticleStatus } from '../types/article';
import { setStatusAction, deleteArticleAction } from '../app/admin/actions';
import { Badge } from './ui/Badge';
import { EmptyState } from './ui/EmptyState';

const STATUS_VARIANT: Record<ArticleStatus, 'success' | 'warning' | 'danger' | 'default'> = {
  published: 'success',
  draft: 'warning',
  rejected: 'danger',
};

const STATUS_LABEL: Record<ArticleStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  rejected: 'Rejected',
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ArticlesManager({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | ArticleStatus>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesQuery =
        !q || a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      const matchesStatus = status === 'all' || a.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [articles, query, status]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or category"
            aria-label="Search articles"
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft', 'rejected'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                status === s ? 'bg-forest text-cream' : 'bg-white text-gray-600 hover:bg-sage-light'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-10 w-10" aria-hidden="true" />}
          title={articles.length === 0 ? 'No articles yet' : 'No matching articles'}
          description={
            articles.length === 0
              ? 'Create your first guide to get started.'
              : 'Try a different search term or status filter.'
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((article) => (
                  <tr key={article.id} className="hover:bg-sage-light/30">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-charcoal">{article.title}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.category || '—'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={STATUS_VARIANT[article.status]}>{STATUS_LABEL[article.status]}</Badge>
                      {article.status === 'rejected' && article.rejectionReason && (
                        <p className="mt-1 text-xs text-red-600">{article.rejectionReason}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(article.updatedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-sm">
                        {article.status === 'published' && (
                          <Link href={`/article/${article.slug}`} target="_blank" className="inline-flex items-center gap-1 text-gray-600 hover:text-forest">
                            <Eye className="h-4 w-4" aria-hidden="true" /> View
                          </Link>
                        )}
                        <Link href={`/admin/articles/${article.id}`} className="inline-flex items-center gap-1 font-medium text-forest hover:underline">
                          <Pencil className="h-4 w-4" aria-hidden="true" /> Edit
                        </Link>

                        {article.status !== 'published' && (
                          <form action={setStatusAction}>
                            <input type="hidden" name="id" value={article.id} />
                            <input type="hidden" name="status" value="published" />
                            <button type="submit" className="inline-flex items-center gap-1 font-medium text-green-700 hover:underline">
                              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Publish
                            </button>
                          </form>
                        )}

                        {article.status === 'published' && (
                          <form action={setStatusAction}>
                            <input type="hidden" name="id" value={article.id} />
                            <input type="hidden" name="status" value="draft" />
                            <button type="submit" className="inline-flex items-center gap-1 font-medium text-gray-600 hover:underline">
                              <XCircle className="h-4 w-4" aria-hidden="true" /> Unpublish
                            </button>
                          </form>
                        )}

                        <form
                          action={deleteArticleAction}
                          onSubmit={(e) => {
                            if (!window.confirm(`Delete “${article.title}”? This cannot be undone.`)) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <input type="hidden" name="id" value={article.id} />
                          <button type="submit" className="inline-flex items-center gap-1 font-medium text-red-600 hover:underline" aria-label={`Delete ${article.title}`}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-4 md:hidden">
            {filtered.map((article) => (
              <li key={article.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium text-charcoal">{article.title}</span>
                  <Badge variant={STATUS_VARIANT[article.status]}>{STATUS_LABEL[article.status]}</Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600">{article.category || '—'} · {formatDate(article.updatedAt)}</p>
                {article.status === 'rejected' && article.rejectionReason && (
                  <p className="mt-1 text-xs text-red-600">{article.rejectionReason}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 border-t border-gray-100 pt-3 text-sm">
                  {article.status === 'published' && (
                    <Link href={`/article/${article.slug}`} target="_blank" className="inline-flex items-center gap-1 text-gray-600 hover:text-forest">
                      <Eye className="h-4 w-4" aria-hidden="true" /> View
                    </Link>
                  )}
                  <Link href={`/admin/articles/${article.id}`} className="inline-flex items-center gap-1 font-medium text-forest hover:underline">
                    <Pencil className="h-4 w-4" aria-hidden="true" /> Edit
                  </Link>
                  {article.status !== 'published' && (
                    <form action={setStatusAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <input type="hidden" name="status" value="published" />
                      <button type="submit" className="inline-flex items-center gap-1 font-medium text-green-700 hover:underline">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Publish
                      </button>
                    </form>
                  )}
                  {article.status === 'published' && (
                    <form action={setStatusAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <input type="hidden" name="status" value="draft" />
                      <button type="submit" className="inline-flex items-center gap-1 font-medium text-gray-600 hover:underline">
                        <XCircle className="h-4 w-4" aria-hidden="true" /> Unpublish
                      </button>
                    </form>
                  )}
                  <form
                    action={deleteArticleAction}
                    onSubmit={(e) => {
                      if (!window.confirm(`Delete “${article.title}”? This cannot be undone.`)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={article.id} />
                    <button type="submit" className="inline-flex items-center gap-1 font-medium text-red-600 hover:underline" aria-label={`Delete ${article.title}`}>
                      <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

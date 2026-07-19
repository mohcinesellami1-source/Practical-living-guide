'use client';

import { FileWarning, Trash2 } from 'lucide-react';
import type { Article } from '../types/article';
import { setStatusAction, deleteArticleAction } from '../app/admin/actions';
import { Alert } from './ui/Alert';
import { SubmitButton } from './ui/SubmitButton';

const FIELD =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest';
const LABEL = 'mb-2 block text-sm font-medium text-charcoal';

type ServerAction = (formData: FormData) => Promise<void>;

type Props = {
  mode: 'new' | 'edit';
  action: ServerAction;
  article?: Article;
  hasError?: boolean;
};

export function ArticleEditor({ mode, action, article, hasError }: Props) {
  const isPublished = article?.status === 'published';

  return (
    <div className="space-y-6">
      {hasError && (
        <Alert variant="error">
          Validation failed: a title (min 3 chars) and content (min 10 chars) are required.
        </Alert>
      )}

      {mode === 'edit' && article?.status === 'rejected' && article.rejectionReason && (
        <Alert variant="warning">Previously rejected: {article.rejectionReason}</Alert>
      )}

      <form action={action} className="space-y-8">
        {/* Basic */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-serif text-forest">Basic details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className={LABEL}>Title *</label>
              <input id="title" name="title" required defaultValue={article?.title} className={FIELD} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="slug" className={LABEL}>Slug (auto if empty)</label>
                <input id="slug" name="slug" placeholder="my-guide" defaultValue={article?.slug} className={FIELD} />
              </div>
              <div>
                <label htmlFor="category" className={LABEL}>Category</label>
                <input id="category" name="category" defaultValue={article?.category} className={FIELD} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="author" className={LABEL}>Author</label>
                <input id="author" name="author" defaultValue={article?.author ?? 'Editorial Team'} className={FIELD} />
              </div>
              <div>
                <label htmlFor="excerpt" className={LABEL}>Excerpt</label>
                <input id="excerpt" name="excerpt" defaultValue={article?.excerpt} className={FIELD} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input type="checkbox" name="featured" defaultChecked={article?.featured} className="h-4 w-4 rounded border-gray-300" />
              Feature this article on the home page
            </label>
          </div>
        </section>

        {/* Content */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-serif text-forest">Content</h2>
          <div>
            <label htmlFor="content" className={LABEL}>Body (Markdown) *</label>
            <textarea
              id="content"
              name="content"
              required
              rows={14}
              defaultValue={article?.content}
              className={`${FIELD} font-mono text-sm`}
            />
            <p className="mt-1 text-xs text-gray-500">Supports Markdown: ## headings, **bold**, lists, links.</p>
          </div>
        </section>

        {/* Publication */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-serif text-forest">Publication & SEO</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="seoTitle" className={LABEL}>SEO title</label>
              <input id="seoTitle" name="seoTitle" defaultValue={article?.seoTitle} className={FIELD} />
            </div>
            <div>
              <label htmlFor="seoDescription" className={LABEL}>SEO description</label>
              <input id="seoDescription" name="seoDescription" defaultValue={article?.seoDescription} className={FIELD} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
            {isPublished ? (
              <SubmitButton variant="outline" name="status" value="draft">
                Unpublish
              </SubmitButton>
            ) : (
              <SubmitButton variant="outline" name="status" value="draft">
                Save Draft
              </SubmitButton>
            )}
            <SubmitButton variant="primary" name="status" value="published">
              {isPublished ? 'Save & Keep Published' : 'Publish'}
            </SubmitButton>
          </div>
        </section>
      </form>

      {mode === 'edit' && article && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Reject */}
          <form action={setStatusAction} className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-serif text-amber-800">
              <FileWarning className="h-5 w-5" aria-hidden="true" /> Reject
            </h2>
            <p className="mb-4 text-sm text-amber-800">
              Move this article back to rejected with a reason for the author.
            </p>
            <input type="hidden" name="id" value={article.id} />
            <input type="hidden" name="status" value="rejected" />
            <input
              name="reason"
              placeholder="Reason for rejection"
              className={`${FIELD} bg-white`}
            />
            <div className="mt-4">
              <SubmitButton variant="danger" pendingLabel="Rejecting…">Reject article</SubmitButton>
            </div>
          </form>

          {/* Delete */}
          <form
            action={deleteArticleAction}
            onSubmit={(e) => {
              if (!window.confirm(`Delete “${article.title}”? This cannot be undone.`)) {
                e.preventDefault();
              }
            }}
            className="rounded-xl border border-red-200 bg-red-50 p-6"
          >
            <h2 className="mb-2 flex items-center gap-2 text-lg font-serif text-red-800">
              <Trash2 className="h-5 w-5" aria-hidden="true" /> Delete
            </h2>
            <p className="mb-4 text-sm text-red-800">
              Permanently remove this article from the database.
            </p>
            <input type="hidden" name="id" value={article.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete article
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

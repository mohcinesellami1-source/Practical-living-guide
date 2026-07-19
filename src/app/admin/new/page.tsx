import { createArticleAction } from '../actions';
import { AdminLayout } from '../../../components/AdminLayout';
import { ArticleEditor } from '../../../components/ArticleEditor';

export const dynamic = 'force-dynamic';

export default function NewArticlePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasError = searchParams?.error === '1';

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-forest">New Article</h1>
        <p className="mt-1 text-sm text-gray-600">Write a guide, then save it as a draft or publish it.</p>
      </div>

      <ArticleEditor mode="new" action={createArticleAction} hasError={hasError} />
    </AdminLayout>
  );
}

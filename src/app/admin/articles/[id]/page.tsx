import { notFound } from 'next/navigation';
import { getArticleById } from '../../../../lib/articles';
import { updateArticleAction } from '../../actions';
import { AdminLayout } from '../../../../components/AdminLayout';
import { ArticleEditor } from '../../../../components/ArticleEditor';

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
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-forest">Edit Article</h1>
        <p className="mt-1 text-sm text-gray-600 truncate" title={article.title}>
          {article.title}
        </p>
      </div>

      <ArticleEditor mode="edit" action={action} article={article} hasError={hasError} />
    </AdminLayout>
  );
}

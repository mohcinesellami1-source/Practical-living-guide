import type { ArticleInput, ArticleStatus } from '../types/article';

const VALID_STATUSES: ArticleStatus[] = ['draft', 'published', 'rejected'];

export function validateArticleInput(input: Partial<ArticleInput>): string[] {
  const errors: string[] = [];

  if (!input.title || input.title.trim().length < 3) {
    errors.push('Le titre est requis (minimum 3 caractères).');
  }
  if (!input.content || input.content.trim().length < 10) {
    errors.push('Le contenu est trop court (minimum 10 caractères).');
  }
  if (input.slug && !/^[a-z0-9-]+$/.test(input.slug)) {
    errors.push('Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets.');
  }
  if (input.status && !VALID_STATUSES.includes(input.status)) {
    errors.push('Le statut est invalide.');
  }

  return errors;
}

export function parseArticleForm(formData: FormData): ArticleInput {
  const slugRaw = formData.get('slug') ? String(formData.get('slug')) : '';
  const statusRaw = String(formData.get('status') ?? 'draft') as ArticleStatus;

  return {
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? ''),
    content: String(formData.get('content') ?? ''),
    category: String(formData.get('category') ?? ''),
    author: String(formData.get('author') ?? '') || 'Editorial Team',
    slug: slugRaw ? slugRaw.trim() : undefined,
    seoTitle: String(formData.get('seoTitle') ?? '') || undefined,
    seoDescription: String(formData.get('seoDescription') ?? '') || undefined,
    featured: formData.get('featured') === 'on',
    status: statusRaw,
  };
}

import { describe, it, expect } from 'vitest';
import { toSlug, mapRowToArticle, filterPublished } from '../article-utils';
import { validateArticleInput } from '../validation';
import type { Article } from '../../types/article';

describe('toSlug', () => {
  it('lowercases and hyphenates', () => {
    expect(toSlug('Best Dog Bags 2026')).toBe('best-dog-bags-2026');
  });
  it('strips punctuation', () => {
    expect(toSlug('Cats & Dogs: A Guide!')).toBe('cats-dogs-a-guide');
  });
  it('collapses repeated separators', () => {
    expect(toSlug('a   b---c')).toBe('a-b-c');
  });
});

describe('mapRowToArticle', () => {
  it('maps snake_case db row to camelCase', () => {
    const row = {
      id: 1,
      slug: 'x',
      title: 'T',
      status: 'published',
      seo_title: 'S',
      rejection_reason: null,
      featured: true,
      created_at: '2026-01-01',
      updated_at: '2026-01-02',
    };
    const a = mapRowToArticle(row);
    expect(a.id).toBe('1');
    expect(a.seoTitle).toBe('S');
    expect(a.featured).toBe(true);
    expect(a.rejectionReason).toBeNull();
  });
});

describe('filterPublished', () => {
  it('returns only published articles', () => {
    const list = [
      { status: 'published' },
      { status: 'draft' },
      { status: 'rejected' },
    ] as Article[];
    expect(filterPublished(list)).toHaveLength(1);
  });
});

describe('validateArticleInput', () => {
  it('rejects short title', () => {
    const errors = validateArticleInput({ title: 'ab', content: 'x'.repeat(20) });
    expect(errors.length).toBeGreaterThan(0);
  });
  it('accepts a valid article', () => {
    const errors = validateArticleInput({
      title: 'A valid title',
      content: 'Some sufficiently long content.',
      slug: 'a-valid-title',
      status: 'draft',
    });
    expect(errors).toHaveLength(0);
  });
  it('rejects invalid slug', () => {
    const errors = validateArticleInput({
      title: 'A valid title',
      content: 'Some sufficiently long content.',
      slug: 'Invalid Slug!',
    });
    expect(errors.some((e) => e.includes('slug'))).toBe(true);
  });
  it('rejects invalid status', () => {
    const errors = validateArticleInput({
      title: 'A valid title',
      content: 'Some sufficiently long content.',
      status: 'archived' as never,
    });
    expect(errors.some((e) => e.includes('statut'))).toBe(true);
  });
});

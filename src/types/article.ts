export type ArticleStatus = 'draft' | 'published' | 'rejected';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: ArticleStatus;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  rejectionReason: string | null;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleInput {
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  status?: ArticleStatus;
  rejectionReason?: string | null;
  coverImageUrl?: string;
}

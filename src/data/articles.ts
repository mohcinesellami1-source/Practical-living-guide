export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
};

export const articles: Article[] = [
  {
    slug: 'best-biodegradable-dog-waste-bags',
    title: 'The 7 Best Biodegradable Dog Waste Bags in 2026',
    excerpt:
      'Tired of plastic poop bags that outlive your dog? We tested the top compostable and biodegradable options so you don’t have to.',
    content:
      'Every dog owner picks up after their pet, but most bags are conventional plastic that lingers for centuries. In this guide we review seven leading biodegradable dog waste bags based on compostability certification, thickness, scent, and price per roll.\n\n## What makes a bag truly biodegradable?\n\nLook for third-party certifications such as OK Compost HOME or Seedling. Avoid vague "eco" claims without certification.\n\n## Our top picks\n\n1. **Brand A** — strongest tear resistance...\n2. **Brand B** — best value bulk box...\n3. **Brand C** — fully home-compostable...\n\n## How to dispose of them\n\nEven compostable bags need the right conditions. Never place them in regular recycling.',
    category: 'Dogs',
    author: 'Editorial Team',
    status: 'published',
    createdAt: '2026-07-10T10:00:00.000Z',
    updatedAt: '2026-07-12T09:00:00.000Z',
    seoTitle: 'Best Biodegradable Dog Waste Bags 2026 (Tested & Ranked)',
    seoDescription:
      'We tested 7 compostable dog waste bags for strength, scent, and price. Find the most eco-friendly option for your walks.',
    featured: true,
  },
  {
    slug: 'sustainable-cat-litter-guide',
    title: 'Switching to Sustainable Cat Litter: A Complete Guide',
    excerpt:
      'Clay litter is mined and non-renewable. Here are plant-based and recycled alternatives that are better for your cat and the planet.',
    content:
      'Conventional clay litter is strip-mined and not renewable. This guide covers pine, wheat, corn, and recycled-paper litters, with tips for a smooth transition.\n\n## Why switch?\n\nLower dust, renewable materials, and often better odor control.\n\n## Transition tips\n\nMix old and new litter gradually over 7–10 days.',
    category: 'Cats',
    author: 'Editorial Team',
    status: 'published',
    createdAt: '2026-07-08T10:00:00.000Z',
    updatedAt: '2026-07-08T10:00:00.000Z',
    seoTitle: 'Sustainable Cat Litter Guide 2026: Pine, Wheat & Paper',
    seoDescription:
      'A practical guide to switching your cat to eco-friendly litter with less dust and lower environmental impact.',
    featured: true,
  },
  {
    slug: 'recycled-dog-toys-that-last',
    title: 'Recycled Dog Toys That Actually Last',
    excerpt:
      'Plush toys fall apart in minutes. These recycled-material toys survived our toughest tug testers.',
    content:
      'We put recycled-rubber and reclaimed-rope toys through a brutal testing protocol with power chewers. Here are the survivors.\n\n## Why recycled materials?\n\nThey divert waste from landfills and often prove more durable than virgin plastic.',
    category: 'Dogs',
    author: 'Editorial Team',
    status: 'draft',
    createdAt: '2026-07-15T10:00:00.000Z',
    updatedAt: '2026-07-15T10:00:00.000Z',
    seoTitle: 'Recycled Dog Toys That Last (2026 Durability Test)',
    seoDescription:
      'We destroyed dozens of toys so you don’t have to. The recycled dog toys that survived our toughest chewers.',
    featured: false,
  },
];

export function getPublishedArticles(): Article[] {
  return articles.filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.status === 'published' && a.featured);
}
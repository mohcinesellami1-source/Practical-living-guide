import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://practical-living-guide.example').replace(
  /\/$/,
  '',
);

export const SITE_NAME = 'Practical Living Guide';

export const SITE_DESCRIPTION =
  'Honest, hands-on guides and reviews to help you make practical, sustainable everyday choices.';

export function pageMetadata({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

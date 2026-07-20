// Centralized affiliate link tagging.
// All functions read NEXT_PUBLIC_* env vars, which are safe to expose in the
// browser bundle. These are tracking tags (intended to be public), never secrets.

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? '';
const SHAREASALE_AFFILIATE_ID = process.env.NEXT_PUBLIC_SHAREASALE_AFFILIATE_ID ?? '';

// Builds an Amazon product URL for an ASIN, tagged with the Associates Tracking ID.
export function amazonUrl(asin: string, tag: string = AMAZON_TAG): string {
  if (!tag) return `https://www.amazon.com/dp/${asin}`;
  return `https://www.amazon.com/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

// Appends the Associates tag to an existing amazon.com URL if it is missing.
export function withAmazonTag(url: string, tag: string = AMAZON_TAG): string {
  if (!tag) return url;
  try {
    const u = new URL(url);
    if (u.hostname.includes('amazon.') && !u.searchParams.has('tag')) {
      u.searchParams.set('tag', tag);
      return u.toString();
    }
  } catch {
    // Not a valid URL — return unchanged.
  }
  return url;
}

// Builds a ShareASale affiliate link for a given merchant.
// `merchantId` and `affiliateId` come from ShareASale; `path` is the
// destination page on the merchant site (optional).
export function shareasaleUrl(
  merchantId: string,
  affiliateId: string = SHAREASALE_AFFILIATE_ID,
  path = '',
): string {
  const params = new URLSearchParams({ b: merchantId, u: affiliateId, m: merchantId });
  if (path) params.set('urllink', path);
  return `https://www.shareasale.com/r.cfm?${params.toString()}`;
}

export function isAffiliateConfigured(): boolean {
  return Boolean(AMAZON_TAG || SHAREASALE_AFFILIATE_ID);
}

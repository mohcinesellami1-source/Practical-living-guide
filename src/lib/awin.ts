// Helper pour générer les liens affiliés via l'API Awin
// Variables d'environnement requises : NEXT_PUBLIC_AWIN_PUBLISHER_ID, AWIN_API_TOKEN

const AWIN_PUBLISHER_ID = process.env.NEXT_PUBLIC_AWIN_PUBLISHER_ID;
const AWIN_API_TOKEN = process.env.AWIN_API_TOKEN;

// Mapping produit → programme Awin (ID à compléter)
const productToProgramId: Record<string, string> = {
  'fukumaru-tofu-cat-litter': '12345',
  'tranquille-tofu-cat-litter': '12346',
  'worlds-best-cat-litter': '12347',
};

export async function getAwinAffiliateLink(
  productName: string,
  fallbackAmazonLink: string
): Promise<string> {
  const programId = productToProgramId[productName.toLowerCase().replace(/[-\s]/g, '')];
  if (!programId) return fallbackAmazonLink;

  const endpoint = new URL('https://api.awin.com/v1/links');
  endpoint.searchParams.set('publisher_id', AWIN_PUBLISHER_ID!);
  endpoint.searchParams.set('token', AWIN_API_TOKEN!);
  endpoint.searchParams.set('program_id', programId);

  try {
    const res = await fetch(endpoint.toString(), { headers: { Accept: 'application/json' } });
    const data = await res.json();
    return data?.link || fallbackAmazonLink;
  } catch {
    return fallbackAmazonLink;
  }
}
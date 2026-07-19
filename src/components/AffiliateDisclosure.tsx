import { Info } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <aside className="flex items-start gap-3 rounded-lg border border-sage bg-sage-light/40 p-4 text-sm text-charcoal" aria-label="Affiliate disclosure">
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest" aria-hidden="true" />
      <p>
        <strong className="font-medium">Affiliate disclosure:</strong> EcoPet may earn a commission from
        qualifying purchases made through links on this page, at no extra cost to you. This never influences
        our editorial reviews or recommendations.
      </p>
    </aside>
  );
}
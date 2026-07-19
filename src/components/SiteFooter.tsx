import Link from 'next/link';
import { Leaf } from 'lucide-react';

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-forest-dark text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Link href="/" className="flex items-center gap-2 text-cream font-bold text-lg" aria-label="Practical Living Guide home">
              <Leaf className="h-5 w-5 text-sage" aria-hidden="true" />
              <span className="font-serif">Practical Living Guide</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-cream/70">
              Independent, eco-friendly pet product guides and reviews. Tested by us, chosen for the planet.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-cream/80">Practical Living Guide</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-cream/10 pt-6 text-center text-sm text-cream/60">
          © {new Date().getFullYear()} Practical Living Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
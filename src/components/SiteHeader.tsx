'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/#latest', label: 'Guides' },
  { href: '/#categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-cream/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 text-forest font-bold text-xl" aria-label="EcoPet home">
          <Leaf className="h-6 w-6 text-sage" aria-hidden="true" />
          <span className="font-serif">EcoPet</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/#latest"
            className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-cream hover:bg-forest-dark transition-colors"
          >
            Explore guides
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-cream">
          <ul className="px-4 py-4 space-y-3 text-sm font-medium text-charcoal">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block hover:text-forest" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#latest"
                className="inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-sm font-medium text-cream hover:bg-forest-dark"
                onClick={() => setIsOpen(false)}
              >
                Explore guides
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
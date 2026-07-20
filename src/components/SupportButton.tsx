'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

// Inlined at build time; undefined until NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set.
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Renders nothing until the publishable key is configured (set in Vercel / .env.local
// and redeployed). This keeps the live site unchanged until Stripe is wired up.
export function SupportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!PUBLISHABLE_KEY) return null;

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500 }), // $5 default
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? 'Could not start checkout.');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-2 font-medium text-cream transition-colors hover:bg-forest-dark disabled:opacity-60"
      >
        <Heart className="h-4 w-4" aria-hidden="true" />
        {loading ? 'Redirecting…' : 'Support us'}
      </button>
      {error && <p className="text-xs text-red-100/90">{error}</p>}
    </div>
  );
}

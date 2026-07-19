'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');

  return (
    <section className="rounded-2xl border border-sage bg-sage-light/40 p-8 text-center" aria-labelledby="newsletter-heading">
      <Mail className="mx-auto h-8 w-8 text-forest" aria-hidden="true" />
      <h2 id="newsletter-heading" className="mt-3 text-2xl font-serif text-forest">
        Get our latest eco-guides
      </h2>
      <p className="mx-auto mt-2 max-w-md text-gray-600">
        Occasional, useful guides for greener pet parenting. No spam, unsubscribe anytime.
      </p>
      <form
        className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setEmail('');
          alert('Thanks! This is a demo signup form — wire it to your provider later.');
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest"
        />
        <button
          type="submit"
          className="rounded-md bg-forest px-5 py-2 font-medium text-cream hover:bg-forest-dark transition-colors"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-xs text-gray-500">
        We respect your privacy. We never sell your email.
      </p>
    </section>
  );
}
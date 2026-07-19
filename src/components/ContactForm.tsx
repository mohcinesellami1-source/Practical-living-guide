'use client';

import { useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-sage bg-sage-light/40 p-4 text-sm text-charcoal" role="status">
        Thanks for reaching out. This is a demo form — please use the email below for now and we’ll get back to
        you.
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-charcoal">Name</label>
        <input id="contact-name" name="name" required className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest" />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-charcoal">Email</label>
        <input id="contact-email" name="email" type="email" required className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest" />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-charcoal">Message</label>
        <textarea id="contact-message" name="message" rows={4} required className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest" />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-forest px-6 py-2.5 text-base font-medium text-cream transition-colors hover:bg-forest-dark focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
      >
        Send message
      </button>
      <p className="text-xs text-gray-500">Demo form — messages aren’t stored or emailed yet.</p>
    </form>
  );
}

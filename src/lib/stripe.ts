import 'server-only';
import Stripe from 'stripe';

let cached: Stripe | null = null;

// Lazily construct the Stripe client so this module can be imported (and built)
// even before STRIPE_SECRET_KEY is set. It only throws when actually used.
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Stripe is not configured: set STRIPE_SECRET_KEY (server-only).');
  }
  if (!cached) cached = new Stripe(key);
  return cached;
}

export interface DonationSessionInput {
  amount: number; // smallest currency unit, e.g. cents
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  name?: string;
}

// Creates a one-time "support us" Checkout Session.
export async function createDonationSession(
  input: DonationSessionInput,
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: input.currency ?? 'usd',
          unit_amount: input.amount,
          product_data: { name: input.name ?? 'Support Practical Living Guide' },
        },
      },
    ],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { createDonationSession } from '@/lib/stripe';
import { SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { amount?: number; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Default to a $5 "support us" donation (amounts are in cents).
  const amount =
    Number.isFinite(body.amount) && (body.amount as number) > 0
      ? Math.round(body.amount as number)
      : 500;

  if (amount < 50) {
    return NextResponse.json({ error: 'Minimum donation is $0.50.' }, { status: 400 });
  }

  try {
    const session = await createDonationSession({
      amount,
      successUrl: `${SITE_URL}/?support=success`,
      cancelUrl: `${SITE_URL}/?support=cancelled`,
      name: body.name,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create checkout session.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

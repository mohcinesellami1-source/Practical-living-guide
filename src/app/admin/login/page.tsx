import Link from 'next/link';
import { loginAction } from '../actions';
import { Leaf } from 'lucide-react';
import { Alert } from '../../../components/ui/Alert';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasError = searchParams?.error === '1';

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sage-light/40 to-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-forest" aria-label="Practical Living Guide home">
            <Leaf className="h-8 w-8 text-sage" aria-hidden="true" />
            <span className="font-serif text-2xl font-bold">Practical Living Guide</span>
          </Link>
          <p className="mt-2 text-sm text-gray-600">Admin sign in</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-serif text-forest">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-600">Sign in with your Supabase account.</p>

          {hasError && (
            <div className="mt-4">
              <Alert variant="error">
                Invalid email or password. Check your credentials, or create the account in Supabase Auth.
              </Alert>
            </div>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-charcoal">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-forest px-4 py-2.5 text-base font-medium text-cream transition-colors hover:bg-forest-dark focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-forest hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}

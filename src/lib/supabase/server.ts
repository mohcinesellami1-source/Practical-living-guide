import 'server-only';
import { createClient } from '@supabase/supabase-js';

// SERVICE ROLE client — server only, never shipped to the browser.
// Bypasses Row Level Security. Imported exclusively from server components,
// route handlers and server actions.
export function createServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Variables manquantes : NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

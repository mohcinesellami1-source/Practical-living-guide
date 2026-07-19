import 'server-only';
import { createCookieSupabase } from './supabase/auth-server';

export async function getCurrentUserEmail(): Promise<string | null> {
  const supabase = createCookieSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}

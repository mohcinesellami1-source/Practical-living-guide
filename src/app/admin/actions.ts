'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createCookieSupabase } from '../../lib/supabase/auth-server';
import {
  createArticle,
  updateArticle,
  setStatus,
  deleteArticle,
} from '../../lib/articles';
import { validateArticleInput, parseArticleForm } from '../../lib/validation';
import type { ArticleStatus } from '../../types/article';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const supabase = createCookieSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect('/admin/login?error=1');
  redirect('/admin/articles');
}

export async function logoutAction() {
  const supabase = createCookieSupabase();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function createArticleAction(formData: FormData) {
  const input = parseArticleForm(formData);
  const errors = validateArticleInput(input);
  if (errors.length) redirect('/admin/new?error=1');

  await createArticle(input);
  revalidatePath('/');
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function updateArticleAction(id: string, formData: FormData) {
  const input = parseArticleForm(formData);
  const errors = validateArticleInput(input);
  if (errors.length) redirect(`/admin/articles/${id}?error=1`);

  await updateArticle(id, input);
  revalidatePath('/');
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function setStatusAction(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as ArticleStatus;
  const reason = formData.get('reason') ? String(formData.get('reason')) : null;

  await setStatus(id, status, reason);
  revalidatePath('/');
  revalidatePath('/admin/articles');
}

export async function deleteArticleAction(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  await deleteArticle(id);
  revalidatePath('/');
  revalidatePath('/admin/articles');
}

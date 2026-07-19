import { type ReactNode } from 'react';
import { getCurrentUserEmail } from '../lib/auth';
import { AdminShell } from './AdminShell';

export async function AdminLayout({ children }: { children: ReactNode }) {
  const email = await getCurrentUserEmail();
  return <AdminShell email={email}>{children}</AdminShell>;
}

export default AdminLayout;
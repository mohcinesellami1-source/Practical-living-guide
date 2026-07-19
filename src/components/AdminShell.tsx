'use client';

import { useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

type Props = {
  email?: string | null;
  children: ReactNode;
};

export function AdminShell({ email, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:block">
        <AdminSidebar email={email} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1 text-gray-500 hover:bg-sage-light"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <AdminSidebar email={email} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <AdminTopbar email={email} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
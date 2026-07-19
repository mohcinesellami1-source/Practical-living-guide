'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Plus, Settings, ExternalLink, Leaf, LogOut } from 'lucide-react';
import { logoutAction } from '../app/admin/actions';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/new', label: 'New Article', icon: Plus },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

type Props = {
  email?: string | null;
  onNavigate?: () => void;
};

export function AdminSidebar({ email, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-5 text-forest">
        <Leaf className="h-6 w-6 text-sage" aria-hidden="true" />
        <span className="font-serif text-lg font-bold">EcoPet Admin</span>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin navigation">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-forest text-cream' : 'text-gray-700 hover:bg-sage-light'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-sage-light"
        >
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
          View Site
        </Link>
      </nav>

      <div className="border-t border-gray-200 p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-sage-light"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Logout
          </button>
        </form>
        {email && (
          <p className="mt-3 truncate px-3 text-xs text-gray-500" title={email}>
            {email}
          </p>
        )}
      </div>
    </div>
  );
}
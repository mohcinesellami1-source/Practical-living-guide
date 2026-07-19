'use client';

import { Menu } from 'lucide-react';

type Props = {
  email?: string | null;
  onMenuClick: () => void;
};

export function AdminTopbar({ email, onMenuClick }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-gray-700 hover:bg-sage-light"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <span className="text-sm font-medium text-forest">Practical Living Guide Admin</span>
      {email ? <span className="max-w-[40%] truncate text-xs text-gray-500">{email}</span> : <span />}
    </header>
  );
}

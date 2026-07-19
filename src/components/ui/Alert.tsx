import { type ReactNode } from 'react';

type Props = {
  variant: 'error' | 'success' | 'info' | 'warning';
  children: ReactNode;
};

export function Alert({ variant, children }: Props) {
  const variantStyles = {
    error: 'bg-red-50 text-red-800 border border-red-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    info: 'bg-sage-light text-forest border border-sage-light',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  }[variant];

  return (
    <div className={`p-3 rounded border ${variantStyles} mb-4 flex items-center`}>
      {children}
    </div>
  );
}
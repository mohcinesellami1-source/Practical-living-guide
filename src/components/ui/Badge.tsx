import { type ReactNode } from 'react';

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info';

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = 'default', className = '', children }: Props) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-amber-50 text-amber-800',
    danger: 'bg-red-50 text-red-800',
    info: 'bg-sage-light text-forest',
  }[variant];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantStyles} ${className}`}>
      {children}
    </span>
  );
}
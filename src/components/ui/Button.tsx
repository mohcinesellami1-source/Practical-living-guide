'use client';

import { type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  value?: string;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  type = 'button',
  name,
  value,
  className = '',
  children,
}: Props) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }[size];

  const variantStyles = {
    primary: 'bg-forest text-cream hover:bg-forest-dark',
    secondary: 'bg-sage text-charcoal hover:bg-sage-light',
    outline: 'border border-forest text-forest hover:bg-forest hover:text-cream',
    ghost: 'text-forest hover:bg-sage-light',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }[variant];

  return (
    <button
      type={type}
      name={name}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}
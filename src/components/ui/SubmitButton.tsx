'use client';

import { useFormStatus } from 'react-dom';
import type { ReactNode } from 'react';
import { Button } from './Button';

type Props = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  value?: string;
  pendingLabel?: string;
  className?: string;
  children: ReactNode;
};

export function SubmitButton({
  variant = 'primary',
  size = 'md',
  name,
  value,
  pendingLabel = 'Working…',
  className = '',
  children,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size} name={name} value={value} disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </Button>
  );
}

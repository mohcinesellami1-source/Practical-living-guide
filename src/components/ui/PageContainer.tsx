import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = '' }: Props) {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}
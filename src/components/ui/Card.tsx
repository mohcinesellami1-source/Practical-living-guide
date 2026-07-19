import { type ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export function Card({ className = '', children }: Props) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
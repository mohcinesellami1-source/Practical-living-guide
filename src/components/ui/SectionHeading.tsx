import { type ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className = '' }: Props) {
  return (
    <div className={`max-w-2xl mx-auto mb-8 text-center ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium text-sage uppercase tracking-wider">{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl font-serif text-forest leading-tight">{title}</h2>
      {description && (
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
}
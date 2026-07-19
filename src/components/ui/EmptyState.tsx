import { type ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-12 text-center">
      {icon && <div className="mb-4 text-sage">{icon}</div>}
      <h3 className="text-lg font-medium text-charcoal">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
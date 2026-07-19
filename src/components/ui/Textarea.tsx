import { type ChangeEvent } from 'react';

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
};

export function Textarea({ label, placeholder, value, onChange, rows = 4, disabled, required, className = '', id }: Props) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        id={id}
        className={`block w-full rounded border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest focus:ring-offset-0 disabled:opacity-50 ${className}`}
      />
    </div>
  );
}
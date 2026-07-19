import { type ChangeEvent, type ReactNode } from 'react';

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
};

export function Input({ label, type = 'text', placeholder, value, onChange, disabled, required, className = '', id }: Props) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
        className={`block w-full rounded border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-forest focus:ring-2 focus:ring-forest focus:ring-offset-0 disabled:opacity-50 ${className}`}
      />
    </div>
  );
}
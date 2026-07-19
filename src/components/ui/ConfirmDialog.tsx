'use client';

import { useState } from 'react';

type Props = {
  label: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmDialog({ label, onConfirm, onCancel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      {open && (
        <div className="bg-white rounded-md shadow-lg p-6 mx-4 mx-md-8 w-full max-w-md">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium text-charcoal">Are you sure?</h3>
            {onCancel && (
              <button
                onClick={onCancel}
                className="self-cancel mx-auto px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onConfirm}
              className="self-cancel mx-auto px-4 py-1 bg-forest text-cream font-medium rounded hover:bg-forest-dark transition-colors"
              aria-label="Confirm action">
              {label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
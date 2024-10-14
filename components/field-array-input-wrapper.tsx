import * as React from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';

interface FieldArrayInputWrapperProps {
  label?: string;
  className?: string;
  onAddField: () => void;
  children: React.ReactNode;
}

export function FieldArrayInputWrapper({
  label,
  className,
  onAddField,
  children
}: FieldArrayInputWrapperProps) {
  return (
    <div className={className}>
      {label && (
        <h3 className="mb-6 text-base font-semibold text-gray-900">{label}</h3>
      )}
      <div className="space-y-6">
        {children}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <button
              type="button"
              className="bg-white px-2 text-sm font-medium text-gray-400 hover:text-gray-500"
              onClick={onAddField}>
              <PlusIcon className="size-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

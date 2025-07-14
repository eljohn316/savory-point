import * as React from 'react';
import { PlusIcon } from 'lucide-react';

type FieldListWrapperProps = {
  onAddField: () => void;
  children: React.ReactNode;
};

export function FieldListWrapper({
  onAddField,
  children,
}: FieldListWrapperProps) {
  return (
    <div className="space-y-6">
      {children}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="flex-1 border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            className="bg-white px-2 text-gray-400 hover:text-gray-500"
            onClick={onAddField}>
            <PlusIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

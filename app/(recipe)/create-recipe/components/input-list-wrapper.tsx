import { Button } from '@/components/ui/button';
import React from 'react';

interface InputListWrapperProps {
  className?: string;
  onAddField: () => void;
  children: React.ReactNode;
}

export function InputListWrapper({
  className,
  onAddField,
  children
}: InputListWrapperProps) {
  return (
    <div className={className}>
      <div className="space-y-4">{children}</div>
      <div className="mt-8">
        <Button
          type="button"
          variant={'secondary'}
          className="w-full text-emerald-700 border-2 border-emerald-600 border-dashed"
          onClick={onAddField}>
          Add item
        </Button>
      </div>
    </div>
  );
}

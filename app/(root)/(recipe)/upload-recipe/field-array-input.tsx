import * as React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Input } from '@/components/ui/input';

interface FieldArrayInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  onRemove: () => void;
}

export const FieldArrayInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  FieldArrayInputProps
>(function FieldArrayInput({ onRemove, className, type, ...props }, ref) {
  return (
    <div className="relative">
      <Input type={type} className={className} ref={ref} {...props} />
      <div className="absolute inset-y-0 right-0 my-2 border-l border-gray-300 px-2">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onRemove}>
          <span className="sr-only">Remove field</span>
          <XMarkIcon className="size-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

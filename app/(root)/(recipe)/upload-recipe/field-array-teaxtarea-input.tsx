import * as React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Textarea } from '@/components/ui/textarea';

interface FieldArrayTextareaInputProps
  extends React.ComponentPropsWithoutRef<typeof Textarea> {
  onRemove: () => void;
}

export const FieldArrayTextareaInput = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  FieldArrayTextareaInputProps
>(function FieldArrayInput({ onRemove, className, ...props }, ref) {
  return (
    <div className="relative">
      <Textarea className={className} ref={ref} {...props} />
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

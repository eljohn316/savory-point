import React from 'react';
import { XIcon } from 'lucide-react';
import { TextareaInput } from '@/components/ui/textarea-input';
import { cn } from '@/lib/utils';

interface TextInputWithActionProps
  extends React.ComponentPropsWithoutRef<typeof TextareaInput> {
  onAction: () => void;
  showAction: boolean;
}

export const TextInputWithAction = React.forwardRef<
  HTMLTextAreaElement,
  TextInputWithActionProps
>(function TextInputWithAction({ onAction, showAction, error, ...props }, ref) {
  return (
    <div className="relative">
      <TextareaInput
        className={cn(showAction && 'pr-8')}
        error={error}
        ref={ref}
        {...props}
      />
      {showAction && (
        <div
          className={cn(
            error ? 'border-red-600' : 'border-gray-300',
            'absolute inset-y-0 right-0 px-2 my-1 flex items-center border-l'
          )}>
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={onAction}>
            <span className="sr-only">Remove</span>
            <XIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
});

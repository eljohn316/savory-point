import React from 'react';
import { XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface InputWithActionProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  onAction: () => void;
  showAction: boolean;
}

export const InputWithAction = React.forwardRef<
  HTMLInputElement,
  InputWithActionProps
>(function InputWithAction(
  { onAction, showAction, error, type, className, ...props },
  ref
) {
  return (
    <div className="relative">
      <Input
        type="text"
        className={cn(showAction && 'pr-12')}
        error={error}
        ref={ref}
        {...props}
      />
      {showAction && (
        <div
          className={cn(
            error ? 'border-red-600' : 'border-gray-300',
            'absolute inset-y-0 right-0 my-1 flex items-center border-l'
          )}>
          <Button
            type="button"
            variant={'ghost'}
            size={'icon'}
            onClick={onAction}
            className="text-gray-400 hover:bg-transparent hover:text-gray-500">
            <span className="sr-only">Remove</span>
            <XIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
});

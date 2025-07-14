import * as React from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { NumberField as NumberFieldBase } from '@base-ui-components/react/number-field';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function NumInputField({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldBase.Root>) {
  return (
    <NumberFieldBase.Root
      className={cn('flex rounded-md shadow-sm', className)}
      {...props}
    />
  );
}

export function NumInput(
  props: React.ComponentProps<typeof NumberFieldBase.Input>,
) {
  return (
    <>
      <NumberFieldBase.Decrement className="flex-none rounded-tl-md rounded-bl-md border-y border-l border-gray-300 px-3 py-2 text-gray-400 hover:text-gray-500">
        <MinusIcon className="size-4" />
      </NumberFieldBase.Decrement>
      <NumberFieldBase.Input render={BaseInput} {...props} />
      <NumberFieldBase.Increment className="flex-none rounded-tr-md rounded-br-md border-t border-r border-b border-gray-300 px-3 py-2 text-gray-400 hover:text-gray-500">
        <PlusIcon className="size-4" />
      </NumberFieldBase.Increment>
    </>
  );
}

function BaseInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn(
        'relative z-10 rounded-none text-center font-semibold shadow-none',
        className,
      )}
      {...props}
    />
  );
}

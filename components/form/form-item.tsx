import * as React from 'react';
import { FormItemContext } from './form-field';
import { cn } from '@/lib/utils';

export function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('space-y-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

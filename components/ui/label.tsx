import * as React from 'react';
import { cn } from '@/lib/utils';

export function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn('block text-sm font-medium text-gray-900', className)}
      {...props}
    />
  );
}

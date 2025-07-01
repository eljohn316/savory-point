import React from 'react';
import { cn } from '@/lib/utils';

export function Heading({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('font-serif text-4xl font-bold text-gray-900', className)}
      {...props}
    />
  );
}

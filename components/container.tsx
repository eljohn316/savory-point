import { cn } from '@/lib/utils';
import React from 'react';

export function Container({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto px-5 py-10 sm:px-6', className)} {...props} />
  );
}

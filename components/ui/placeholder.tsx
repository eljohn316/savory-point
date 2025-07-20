import * as React from 'react';
import { cn } from '@/lib/utils';

export function Placeholder({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-center', className)} {...props} />;
}

export function PlaceholderTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 className={cn('text-2xl font-bold text-gray-900', className)} {...props} />;
}

export function PlaceholderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <h3 className={cn('mt-2 text-gray-600', className)} {...props} />;
}

export function PlaceholderActions({ className, ...props }: React.ComponentProps<'div'>) {
  return <h3 className={cn('mt-8 flex justify-center', className)} {...props} />;
}

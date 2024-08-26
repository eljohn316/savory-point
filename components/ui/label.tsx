'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'block text-sm font-medium leading-6 text-gray-900',
        className
      )}
      {...props}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

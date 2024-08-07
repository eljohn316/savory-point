import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextareaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>(function TextareaInput({ error, className, ...props }, ref) {
  return (
    <textarea
      rows={5}
      className={cn(
        error
          ? 'text-red-600 ring-red-600 placeholder:text-red-600 focus:ring-red-600'
          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-emerald-600',
        className,
        'block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200'
      )}
      ref={ref}
      defaultValue={''}
      {...props}
    />
  );
});

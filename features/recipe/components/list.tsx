import React from 'react';
import { cn } from '@/lib/utils';

type ListProps =
  | ({ as: 'ul' } & React.ComponentProps<'ul'>)
  | ({ as: 'ol' } & React.ComponentProps<'ol'>);

export function List({ as, className, ...props }: ListProps) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        as === 'ul' ? 'list-disc' : 'list-decimal',
        'list-inside space-y-2',
        className,
      )}
      {...(props as any)}
    />
  );
}

export function ListItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('text-gray-700', className)} {...props} />;
}

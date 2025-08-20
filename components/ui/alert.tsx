import * as React from 'react';
import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertProps = { variant: 'success' | 'error' } & React.ComponentProps<'div'>;

export function Alert({ variant, className, children, ...props }: AlertProps) {
  const Icon = variant === 'success' ? CircleCheckIcon : CircleAlertIcon;

  return (
    <div
      className={cn(
        variant === 'success'
          ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
          : 'border-red-700 bg-red-50 text-red-800',
        'flex items-center gap-x-2 rounded-md border p-4 [&_svg]:size-4',
        className,
      )}
      {...props}>
      <Icon />
      <p className="text-sm">{children}</p>
    </div>
  );
}

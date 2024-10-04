import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border border-transparent bg-emerald-600 text-white focus:ring-emerald-600 hover:bg-emerald-700/90',
        outline:
          'border border-gray-300 bg-white text-gray-700 focus:ring-emerald-600 hover:bg-gray-100/90',
        danger:
          'border border-transparent bg-red-600 text-white focus:ring-red-600 hover:bg-red-700/90',
        ghost:
          'border border-transparent bg-white text-gray-700 focus:ring-emerald-600 hover:bg-gray-100/90'
      },
      size: {
        md: 'px-4 py-2'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

export { Button, buttonVariants };

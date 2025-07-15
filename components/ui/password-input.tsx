import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = React.useState(false);

  const buttonContent = showPassword ? (
    <>
      <EyeOffIcon className="size-4" aria-hidden="true" />
      <span className="sr-only">Hide password</span>{' '}
    </>
  ) : (
    <>
      <EyeIcon className="size-4" aria-hidden="true" />
      <span className="sr-only">Show password</span>
    </>
  );

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'block w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm focus:ring-1 focus:ring-green-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          className,
        )}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}>
          {buttonContent}
        </button>
      </div>
    </div>
  );
}

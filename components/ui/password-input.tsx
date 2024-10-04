import * as React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { Input } from '@/components/ui/input';

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(function PasswordInput({ className, ...props }, ref) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  function handleClick() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={className}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-500"
          onClick={handleClick}
          tabIndex={-1}>
          {showPassword ? (
            <>
              <EyeSlashIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Hide password</span>
            </>
          ) : (
            <>
              <EyeIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Show password</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

export { PasswordInput };

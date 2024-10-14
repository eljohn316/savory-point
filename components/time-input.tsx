import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TimeInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  input: 'hours' | 'minutes';
}

export const TimeInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  TimeInputProps
>(function TimeInput({ input, ...props }, ref) {
  return (
    <div className="relative">
      <Input
        type="number"
        className={cn(input === 'hours' ? 'pr-16' : 'pr-12')}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 my-2 flex items-center border-l border-gray-300 px-2">
        <span className="text-xs text-gray-700">
          {input === 'hours' ? 'hour/s' : 'mins'}
        </span>
      </div>
    </div>
  );
});

import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 aria-[invalid=true]:text-red-600 aria-[invalid=true]:ring-red-500 aria-[invalid=true]:placeholder:text-red-300 aria-[invalid=true]:focus:ring-red-600 sm:text-sm sm:leading-6",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export { Input };

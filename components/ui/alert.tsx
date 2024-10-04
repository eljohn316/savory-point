"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-md border p-4", {
  variants: {
    variant: {
      success:
        "bg-emerald-50 border-emerald-500 [&_h3]:text-emerald-800 [&_p]:text-emerald-800 [&_svg]:text-emerald-600",
      danger:
        "bg-red-50 border-red-500 [&_h3]:text-red-800 [&_p]:text-red-800 [&_svg]:text-red-600"
    }
  }
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(function Alert({ className, variant, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function AlertTitle({ className, ...props }, ref) {
  return (
    <h3 ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  );
});

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function AlertDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm", className)} {...props} />;
});

interface AlertIconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const AlertIcon = ({ icon: Icon, className, ...props }: AlertIconProps) => {
  return <Icon className={cn("size-5", className)} {...props} />;
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };

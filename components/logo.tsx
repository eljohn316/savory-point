import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        "font-logo whitespace-nowrap text-[32px] leading-none text-emerald-700 lg:text-[38px]",
        className
      )}>
      Savory Point
    </div>
  );
}

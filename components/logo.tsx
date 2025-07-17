import * as React from 'react';
import Link from 'next/link';
import { DynaPuff } from 'next/font/google';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

const fontLogo = DynaPuff({ display: 'swap', subsets: ['latin'] });

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'text-2xl leading-none tracking-tighter text-emerald-800',
        fontLogo.className,
        className,
      )}>
      Savory Point
    </Link>
  );
}

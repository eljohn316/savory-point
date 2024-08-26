'use client';

import React from 'react';
import * as Headless from '@headlessui/react';
import { cn } from '@/lib/utils';

const Dropdown = Headless.Menu;

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  Headless.MenuButtonProps
>(function DropdownTrigger({ children, ...props }, ref) {
  return (
    <Headless.MenuButton {...props} ref={ref}>
      {children}
    </Headless.MenuButton>
  );
});

function DropdownItems({
  children,
  className,
  transition,
  ...props
}: Headless.MenuItemsProps) {
  return (
    <Headless.MenuItems
      {...props}
      transition
      className={cn(
        'absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition data-[closed]:scale-95 data-[closed]:opacity-0',
        className
      )}>
      {children}
    </Headless.MenuItems>
  );
}

function DropdownItem({ children, ...props }: Headless.MenuItemProps) {
  return <Headless.MenuItem {...props}>{children}</Headless.MenuItem>;
}

export { Dropdown, DropdownTrigger, DropdownItems, DropdownItem };

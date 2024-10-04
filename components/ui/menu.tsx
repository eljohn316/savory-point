"use client";

import * as React from "react";
import * as Headless from "@headlessui/react";
import { cn } from "@/lib/utils";

const Menu = Headless.Menu;
const MenuButton = Headless.MenuButton;
const MenuItem = Headless.MenuItem;
const MenuSection = Headless.MenuSection;

const MenuItems = ({
  className,
  children,
  ...props
}: Headless.MenuItemsProps<"div">) => {
  return (
    <Headless.MenuItems
      transition
      anchor="bottom end"
      className={cn(
        "mt-2 w-52 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg transition ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0",
        className,
      )}
      {...props}>
      {children}
    </Headless.MenuItems>
  );
};

export { Menu, MenuButton, MenuItems, MenuItem, MenuSection };

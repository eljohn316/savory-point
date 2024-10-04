"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
}

export function SearchInput({ className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon
          className="size-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <Input
        type="text"
        name="search"
        placeholder="Search"
        className="py-2 pl-10"
      />
    </div>
  );
}

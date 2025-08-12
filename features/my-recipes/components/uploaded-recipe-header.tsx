'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type UploadRecipeHeaderProps = {
  children: React.ReactNode;
  recipeId: string;
};

export function UploadRecipeHeader({ recipeId, children }: UploadRecipeHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative border-b border-gray-200 pb-4">
      <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-0 -m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
          <EllipsisVerticalIcon className="size-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40 p-2">
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem
              onSelect={() => router.push(`/my-recipes/uploads/${recipeId}/update`)}
              className="text-base text-gray-600">
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => console.log('Delete')}
              className="text-base text-gray-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

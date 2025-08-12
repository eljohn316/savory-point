'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { CircleAlertIcon, EllipsisVerticalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteRecipe } from '@/features/my-recipes/actions/delete-recipe';

type UploadRecipeHeaderProps = {
  children: React.ReactNode;
  recipeId: string;
};

export function UploadRecipeHeader({ recipeId, children }: UploadRecipeHeaderProps) {
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="gap-4">
            <DialogTitle>Confirm delete recipe</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to delete this recipe?
            </DialogDescription>
            <div className="flex items-center gap-x-4 rounded-md border border-red-700 bg-red-50 p-4">
              <CircleAlertIcon className="size-4 text-red-800" />
              <p className="text-sm text-red-800">Warning! This action cannot be undone</p>
            </div>
          </DialogHeader>
          <DialogFooter>
            <form action={deleteRecipe.bind(null, recipeId)} className="flex gap-x-3">
              <CancelButton onClick={() => setShow(false)} />
              <DeleteButton />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
              <DropdownMenuItem onSelect={() => setShow(true)} className="text-base text-gray-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

function CancelButton(props: React.ComponentProps<'button'>) {
  const { pending } = useFormStatus();

  return (
    <Button type="button" variant="ghost" disabled={pending} {...props}>
      Cancel
    </Button>
  );
}
function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="danger" type="submit" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

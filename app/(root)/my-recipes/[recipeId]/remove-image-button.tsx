'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';

export function RemoveImageButton() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange() {}

  function handleClick() {}

  return (
    <>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => setOpen(true)}>
        Remove
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-6 space-y-3">
          <h3 className="text-center text-gray-700 font-semibold">
            Remove recipe image
          </h3>
          <p className="text-gray-500 text-sm">
            Are you sure you want to remove this recipe&apos;s image?
          </p>
        </div>
        <div className="flex gap-x-4 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClick} disabled={loading}>
            {loading ? 'Deleting' : 'Delete'}
            {loading && <Spinner className="ml-2 size-4" />}
          </Button>
        </div>
      </Modal>
    </>
  );
}

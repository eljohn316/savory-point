'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose(value: boolean): void;
}

export const ModalTitle = DialogTitle;

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog
      as="div"
      className="relative z-10 focus:outline-none"
      open={open}
      onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-200 ease-out transition-opacity data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

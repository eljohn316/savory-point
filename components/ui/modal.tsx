"use client";

import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogProps,
  DialogTitle,
} from "@headlessui/react";
import { cn } from "@/lib/utils";

const Modal = ({ children, className, ...props }: DialogProps) => {
  return (
    <Dialog as="div" className="relative z-50 focus:outline-none" {...props}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-start justify-center p-4">
        <DialogPanel
          transition
          className={cn(
            "mt-32 w-full max-w-md rounded-lg bg-white p-6 duration-300 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0",
            className,
          )}>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const ModalTitle = DialogTitle;

const ModalCloseButton = CloseButton;

export { Modal, ModalTitle, ModalCloseButton };

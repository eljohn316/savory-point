'use client';

import { CircleCheckIcon, CircleXIcon, XIcon } from 'lucide-react';
import { toast as sonnerToast, Toaster as Sonner } from 'sonner';

export const Toaster = Sonner;

type SuccessToastProps = {
  id: string | number;
  message: string;
};

export function successToast(message: string) {
  return sonnerToast.custom((id) => <SuccessToast id={id} message={message} />);
}

function SuccessToast({ id, message }: SuccessToastProps) {
  return (
    <div className="flex w-full items-center rounded-lg bg-white p-4 shadow-xl ring-1 ring-black/10 sm:max-w-sm">
      <CircleCheckIcon className="size-[18px] flex-none text-emerald-700" aria-hidden="true" />
      <div className="mr-6 ml-3 flex-1">
        <p className="text-sm leading-none font-medium text-gray-900">{message}</p>
      </div>
      <button
        className="flex-none text-gray-400 hover:text-gray-500 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none"
        onClick={() => sonnerToast.dismiss(id)}>
        <span className="sr-only">Dismiss</span>
        <XIcon className="size-[18px]" />
      </button>
    </div>
  );
}

type ErrorToastProps = {
  id: string | number;
  message: string;
};

export function errorToast(message: string) {
  return sonnerToast.custom((id) => <ErrorToast id={id} message={message} />);
}

function ErrorToast({ id, message }: ErrorToastProps) {
  return (
    <div className="flex w-full items-center rounded-lg bg-white p-4 shadow-xl ring-1 ring-black/10 sm:max-w-sm">
      <CircleXIcon className="size-[18px] flex-none text-red-700" aria-hidden="true" />
      <div className="mr-6 ml-3 flex-1">
        <p className="text-sm leading-none font-medium text-gray-900">{message}</p>
      </div>
      <button
        className="flex-none text-gray-400 hover:text-gray-500 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none"
        onClick={() => sonnerToast.dismiss(id)}>
        <span className="sr-only">Dismiss</span>
        <XIcon className="size-[18px]" />
      </button>
    </div>
  );
}

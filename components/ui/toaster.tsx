'use client';

import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

type ToastParsed = {
  variant: string;
  message: string;
};

export function Toaster() {
  const { toasts, toast } = useToast();
  const cookies = useCookies();

  const newToast = cookies.get('toast');

  useEffect(() => {
    if (!newToast) return;

    const toastParsed: ToastParsed = JSON.parse(newToast);

    toast({ title: toastParsed.message });

    cookies.remove('toast');
  }, [newToast, cookies, toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

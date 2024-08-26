'use client';

import { useEffect } from 'react';
import { useCookies } from '@/hooks/use-cookies';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
  const { toasts, toast } = useToast();
  const { getCookie, deleteCookie } = useCookies();

  const toastMessage = getCookie('toast-message');

  useEffect(() => {
    if (!toastMessage) return;

    toast({ description: toastMessage });

    deleteCookie('toast-message');
  }, [toastMessage, deleteCookie, toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription className="font-medium">
                  {description}
                </ToastDescription>
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

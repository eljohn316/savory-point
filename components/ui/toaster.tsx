'use client';

import { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts, toast } = useToast();

  const getCookie = useCallback((name: string) => Cookies.get(name), []);

  const deleteCookie = useCallback(
    (name: string, options?: Cookies.CookieAttributes) =>
      Cookies.remove(name, options),
    []
  );

  const toastMessage = getCookie('toast-message');

  useEffect(() => {
    if (!toastMessage) return;

    const parsedToastMessage = JSON.parse(toastMessage);

    toast({
      title: parsedToastMessage.title,
      description: parsedToastMessage.description,
      variant: parsedToastMessage.variant
    });

    deleteCookie('toast-message');
  }, [toastMessage, toast, deleteCookie]);

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            {variant &&
              (variant === 'success' ? (
                <div className="mr-2.5 flex-none">
                  <CheckCircleIcon
                    className="size-5 text-emerald-600"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="mr-2.5 flex-none">
                  <XCircleIcon
                    className="size-5 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              ))}
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

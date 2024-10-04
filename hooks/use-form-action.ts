import * as React from "react";
import { useFormState } from "react-dom";

export interface UseFormAction<FormState> {
  formState: FormState;
  isPending: boolean;
  formAction: (payload: FormData) => void;
  onSubmit: (submitCallback: () => void) => void;
}

export function useFormAction<FormState>(
  action: (
    formState: Awaited<FormState>,
    formData: FormData,
  ) => Promise<FormState>,
  initialState: Awaited<FormState>,
): UseFormAction<FormState> {
  const [isPending, startTransition] = React.useTransition();
  const [formState, formAction] = useFormState(action, initialState);

  function onSubmit(submitCallback: () => void) {
    startTransition(submitCallback);
  }

  return {
    isPending,
    formState,
    formAction,
    onSubmit,
  };
}

import { useEffect, useRef } from 'react';
import { ActionState } from '@/components/form/utils/action-state-utils';

type ActionOptions = {
  onSuccess?: (actionState: ActionState) => void;
  onFail?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export function useActionFeedback(
  actionState: ActionState,
  { onSuccess, onError, onFail }: ActionOptions,
) {
  const prevActionState = useRef(actionState.timestamp);
  const isUpdated = prevActionState.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdated) return;

    if (actionState.status === 'success' && onSuccess) {
      onSuccess(actionState);
    }
    if (actionState.status === 'error' && onError) {
      onError(actionState);
    }
    if (actionState.status === 'fail' && onFail) {
      onFail(actionState);
    }

    prevActionState.current = actionState.timestamp;
  }, [actionState, onError, onFail, onSuccess, isUpdated]);
}

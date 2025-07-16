import { useEffect } from 'react';
import { ActionState } from '../utils/action-state-utils';

type ActionOptions = {
  onSuccess?: (actionState: ActionState) => void;
  onFail?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export function useActionFeedback(
  actionState: ActionState,
  { onSuccess, onError, onFail }: ActionOptions,
) {
  useEffect(() => {
    if (actionState.status === 'success' && onSuccess) {
      return onSuccess(actionState);
    }
    if (actionState.status === 'error' && onError) {
      return onError(actionState);
    }
    if (actionState.status === 'fail' && onFail) {
      return onFail(actionState);
    }
  }, [actionState, onError, onFail, onSuccess]);
}

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
      onSuccess(actionState);
    }
    if (actionState.status === 'error' && onError) {
      onError(actionState);
    }
    if (actionState.status === 'fail' && onFail) {
      onFail(actionState);
    }
  }, [actionState, onError, onFail, onSuccess]);
}

import { ZodError } from 'zod';

export type ActionState = {
  status: 'success' | 'error' | 'fail' | 'idle';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const INITIAL_ACTION_STATE: ActionState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export function fromErrorToActionState(error: unknown): ActionState {
  if (error instanceof ZodError) {
    return {
      message: '',
      status: 'fail',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: 'error',
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: 'error',
      message: 'An unknown error occurred.',
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
}

export function actionStateError(message: string): ActionState {
  return {
    status: 'error',
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}

export function actionStateSuccess(message: string): ActionState {
  return {
    status: 'success',
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
}

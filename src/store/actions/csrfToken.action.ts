import { CSRFTokenActionType } from './actions.constants';

export const fetchCSRFToken = () => ({
  type: CSRFTokenActionType.FETCH_CSRF_TOKEN,
});

export const fetchCSRFTokenCompleted = (token: string) => ({
  type: CSRFTokenActionType.FETCH_CSRF_TOKEN_COMPLETED,
  payload: token,
});

export const fetchCSRFTokenFailed = (error: string) => ({
  type: CSRFTokenActionType.FETCH_CSRF_TOKEN_ERROR,
  payload: error,
});

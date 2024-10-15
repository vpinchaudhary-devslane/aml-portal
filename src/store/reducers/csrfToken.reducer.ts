import produce from 'immer';
import { Reducer } from 'redux';
import { CSRFTokenActionType } from 'store/actions/actions.constants';

export interface CSRFTokenState {
  token: string;
  loading?: boolean;
  error?: string;
}

const initialState: CSRFTokenState = {
  token: '',
  loading: false,
};

export const csrfTokenReducer: Reducer<CSRFTokenState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: CSRFTokenState = initialState,
  action
) =>
  produce(state, (draft: CSRFTokenState) => {
    switch (action.type) {
      case CSRFTokenActionType.FETCH_CSRF_TOKEN: {
        draft.loading = true;
        break;
      }
      case CSRFTokenActionType.FETCH_CSRF_TOKEN_COMPLETED: {
        const csrfToken: string = action.payload as string;
        draft.token = csrfToken;
        draft.loading = false;
        break;
      }
      case CSRFTokenActionType.FETCH_CSRF_TOKEN_ERROR: {
        const error = action.payload as string;
        draft.loading = false;
        draft.error = error;
        break;
      }
      default: {
        break;
      }
    }
  });

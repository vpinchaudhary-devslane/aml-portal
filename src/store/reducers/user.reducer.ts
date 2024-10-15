import produce from 'immer';
import { Reducer } from 'redux';
import { AuthActionType } from 'store/actions/actions.constants';

export interface UserState {
  learnerId: string;
}

const initialState: UserState = {
  learnerId: '',
};

export const userReducer: Reducer<UserState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: UserState = initialState,
  action
) =>
  produce(state, (draft: UserState) => {
    switch (action.type) {
      case AuthActionType.LOGIN_COMPLETED: {
        const learnerId = action.payload.identifier as string;
        draft.learnerId = learnerId;
        break;
      }
      default: {
        break;
      }
    }
  });

import produce from 'immer';
import { Reducer } from 'redux';
import { QuestionSetActionType } from 'store/actions/actions.constants';
import { QuestionSet } from 'models/entities/QuestionSet';
import { EntityState } from '../base/EntityState';

export interface QuestionSetState {
  loading?: boolean;
  error?: string;
  questionSet: QuestionSet | undefined;
}

const initialState: QuestionSetState = {
  questionSet: undefined,
  loading: false,
};

export const questionSetReducer: Reducer<QuestionSetState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: QuestionSetState = initialState,
  action
) =>
  produce(state, (draft: QuestionSetState) => {
    switch (action.type) {
      case QuestionSetActionType.FETCH_QUESTION_SET: {
        draft.loading = true;
        break;
      }
      case QuestionSetActionType.FETCH_QUESTION_SET_COMPLETED: {
        const questoinSet: QuestionSet = action.payload as QuestionSet;
        draft.questionSet = { ...questoinSet };
        draft.loading = false;
        break;
      }
      case QuestionSetActionType.FETCH_QUESTION_SET_ERROR: {
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

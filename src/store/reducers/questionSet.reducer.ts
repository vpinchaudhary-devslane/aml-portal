import produce from 'immer';
import { Reducer } from 'redux';
import { QuestionSetActionType } from 'store/actions/actions.constants';
import { QuestionSet } from 'models/entities/QuestionSet';
import { EntityState } from '../base/EntityState';

export interface QuestionSetState extends EntityState<QuestionSet> {
  ids?: string[];
}

const initialState: QuestionSetState = {
  entities: {},
  ids: [],
};

export const questionSetReducer: Reducer<QuestionSetState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: QuestionSetState = initialState,
  action
) =>
  produce(state, (draft: QuestionSetState) => {
    switch (action.type) {
      case QuestionSetActionType.FETCH_QUESTION_SET: {
        draft.loadingOne = true;
        break;
      }
      case QuestionSetActionType.FETCH_QUESTION_SET_COMPLETED: {
        const questoinSet: QuestionSet = action.payload as QuestionSet;
        draft.entities[questoinSet.identifier] = {
          ...draft.entities[questoinSet.identifier],
          ...questoinSet,
        };
        draft.ids = [...(draft.ids || []), questoinSet.identifier];
        draft.loadingOne = false;
        break;
      }
      case QuestionSetActionType.FETCH_QUESTION_SET_ERROR: {
        draft.loadingOne = false;
        break;
      }
      default: {
        break;
      }
    }
  });

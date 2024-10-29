import produce from 'immer';
import { Content } from 'models/entities/Content';
import { Reducer } from 'redux';
import { FetchContentActionType } from 'store/actions/actions.constants';

export interface ContentState {
  loading?: boolean;
  error?: string;
  contents: { [key: string]: Content };
}

const initialState: ContentState = {
  loading: false,
  contents: {},
};

export const contentReducer: Reducer<ContentState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: ContentState = initialState,
  action
) =>
  produce(state, (draft: ContentState) => {
    switch (action.type) {
      case FetchContentActionType.FETCH_CONTENT: {
        draft.loading = true;
        break;
      }
      case FetchContentActionType.FETCH_CONTENT_COMPLETED: {
        const content: Content = action.payload as Content;
        draft.contents[content.identifier] = content;
        draft.loading = false;
        break;
      }
      case FetchContentActionType.FETCH_CONTENT_ERROR: {
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

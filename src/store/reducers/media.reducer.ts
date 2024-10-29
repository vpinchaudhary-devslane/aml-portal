import produce from 'immer';
import { Reducer } from 'redux';
import { FetchContentMediaActionType } from 'store/actions/actions.constants';

export interface MediaState {
  loading?: boolean;
  error?: string;
  media: { [key: string]: any };
}

const initialState: MediaState = {
  loading: false,
  media: {},
};

export const mediaReducer: Reducer<MediaState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: MediaState = initialState,
  action
) =>
  produce(state, (draft: MediaState) => {
    switch (action.type) {
      case FetchContentMediaActionType.FETCH_MEDIA: {
        draft.loading = true;
        break;
      }
      case FetchContentMediaActionType.FETCH_MEDIA_COMPLETED: {
        const media: any = action.payload as { contentId: string; media: any };
        draft.media[media.contentId] = media;
        draft.loading = false;
        break;
      }
      case FetchContentMediaActionType.FETCH_MEDIA_ERROR: {
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

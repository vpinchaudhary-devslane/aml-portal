import produce from 'immer';
import { AudioDataActionType } from 'store/actions/actions.constants';

export type AudioState = {
  entities: {
    [key: string]: any;
  };
  isLoading: boolean;
  error?: string;
};

const initialState: AudioState = {
  entities: {},
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export const audioReducer = (state: AudioState = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AudioDataActionType.GET_AUDIO:
        draft.isLoading = true;
        break;
      case AudioDataActionType.GET_AUDIO_COMPLETED:
        draft.isLoading = false;
        draft.entities[action.payload.question_id] =
          action.payload.audioRecords.reduce((prev: any, curr: any) => {
            prev[curr.language] = curr;
            return prev;
          }, {});
        break;
      case AudioDataActionType.GET_AUDIO_ERROR:
        draft.isLoading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });

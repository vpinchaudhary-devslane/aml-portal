import { FetchContentMediaActionType } from './actions.constants';

export const fetchContentMedia = (contentId: string) => ({
  type: FetchContentMediaActionType.FETCH_MEDIA,
  payload: contentId,
});

export const fetchContentMediaCompleted = (payload: {
  contentId: string;
  media: any;
}) => ({
  type: FetchContentMediaActionType.FETCH_MEDIA_COMPLETED,
  payload,
});

export const fetchContentMediaError = (error: string) => ({
  type: FetchContentMediaActionType.FETCH_MEDIA_ERROR,
  payload: error,
});

import { Content } from 'models/entities/Content';
import { FetchContentActionType } from './actions.constants';

export const fetchContent = (contentId: string) => ({
  type: FetchContentActionType.FETCH_CONTENT,
  payload: contentId,
});

export const fetchContentCompleted = (content: Content) => ({
  type: FetchContentActionType.FETCH_CONTENT_COMPLETED,
  payload: content,
});

export const fetchContentError = (error: string) => ({
  type: FetchContentActionType.FETCH_CONTENT_ERROR,
  payload: error,
});

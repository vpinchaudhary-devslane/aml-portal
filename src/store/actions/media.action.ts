import {
  FetchContentMediaActionType,
  FetchQuestionImageActionType,
} from './actions.constants';

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

// for question images

export const fetchQuestionImage = (mediaObj: any) => ({
  type: FetchQuestionImageActionType.FETCH_QUESTION_IMAGE,
  payload: mediaObj,
});

export const fetchQuestionImageCompleted = (payload: {
  currentImageURL: string;
}) => ({
  type: FetchQuestionImageActionType.FETCH_QUESTION_IMAGE_COMPLETED,
  payload,
});

export const fetchQuestionImageError = (error: string) => ({
  type: FetchQuestionImageActionType.FETCH_QUESTION_IMAGE_ERROR,
  payload: error,
});

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  FetchContentMediaActionType,
  FetchQuestionImageActionType,
} from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import { mediaService } from 'services/api-services/mediaService';
import {
  fetchContentMediaCompleted,
  fetchContentMediaError,
  fetchQuestionImageCompleted,
  fetchQuestionImageError,
} from 'store/actions/media.action';
import { convertToCamelCase } from 'shared-resources/utils/helpers';

function* MediaFetchSaga({
  payload,
}: StoreAction<FetchContentMediaActionType>): any {
  try {
    const response = yield call(mediaService.fetchContentMedia, {
      data: { contentId: payload },
    });
    if (response?.result?.message === 'success') {
      yield put(
        fetchContentMediaCompleted({
          contentId: payload,
          media: response.result,
        })
      );
    }
  } catch (e: any) {
    yield put(
      fetchContentMediaError((e?.errors && e.errors[0]?.message) || e?.message)
    );
  }
}

function* FetchQuestionImageSaga({
  payload,
}: StoreAction<FetchQuestionImageActionType>): any {
  try {
    const response = yield call(mediaService.fetchQuestionImage, {
      data: { ...convertToCamelCase(payload) },
    });

    if (response?.result?.message === 'success') {
      yield put(
        fetchQuestionImageCompleted({
          currentImageURL: response.result?.signedUrls?.[0]?.url,
        })
      );
    }
  } catch (e: any) {
    yield put(
      fetchQuestionImageError((e?.errors && e.errors[0]?.message) || e?.message)
    );
  }
}

function* mediaSaga() {
  yield all([
    takeEvery(FetchContentMediaActionType.FETCH_MEDIA, MediaFetchSaga),
    takeEvery(
      FetchQuestionImageActionType.FETCH_QUESTION_IMAGE,
      FetchQuestionImageSaga
    ),
  ]);
}

export default mediaSaga;

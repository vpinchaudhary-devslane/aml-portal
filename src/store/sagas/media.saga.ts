import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { FetchContentMediaActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import { mediaService } from 'services/api-services/mediaService';
import {
  fetchContentMediaCompleted,
  fetchContentMediaError,
} from 'store/actions/media.action';

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

function* mediaSaga() {
  yield all([
    takeEvery(FetchContentMediaActionType.FETCH_MEDIA, MediaFetchSaga),
  ]);
}

export default mediaSaga;

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FetchContentActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import {
  fetchContentCompleted,
  fetchContentError,
} from 'store/actions/content.action';
import { contentService } from 'services/api-services/contentService';
import { fetchContentMedia } from 'store/actions/media.action';

function* ContentFetchSaga({
  payload,
}: StoreAction<FetchContentActionType>): any {
  try {
    const response = yield call(contentService.fetchContentbyContentId, {
      content_id: payload,
    });
    yield put(fetchContentCompleted(response.result));
    if (response?.result?.identifier) {
      yield put(fetchContentMedia(response?.result?.identifier));
    }
  } catch (e: any) {
    yield put(
      fetchContentError((e?.errors && e.errors[0]?.message) || e?.message)
    );
  }
}

function* contentSaga() {
  yield all([
    takeEvery(FetchContentActionType.FETCH_CONTENT, ContentFetchSaga),
  ]);
}

export default contentSaga;

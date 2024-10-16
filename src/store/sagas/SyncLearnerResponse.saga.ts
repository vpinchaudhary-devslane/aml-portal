import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SyncLearnerResponseActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import { syncLearnerResponseError } from 'store/actions/syncLearnerResponse.action';
import { syncLearnerResponseService } from 'services/api-services/syncLearnerResponse';

function* SyncLearnerResponseSaga({
  payload,
}: StoreAction<SyncLearnerResponseActionType>): any {
  try {
    const response = yield call(
      syncLearnerResponseService.syncLearnerResponse,
      {
        data: [],
      }
    );
    // not needed
    // yield put(syncLearnerResponseCompleted(response.result?.data?.message));
    if (response?.result?.data?.message) {
      // clear local storage now
    }
  } catch (e: any) {
    yield put(
      syncLearnerResponseError(
        (e?.errors && e.errors[0]?.message) || e?.message
      )
    );
  }
}

function* syncLearnerResponseSaga() {
  yield all([
    takeLatest(
      SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE,
      SyncLearnerResponseSaga
    ),
  ]);
}

export default syncLearnerResponseSaga;

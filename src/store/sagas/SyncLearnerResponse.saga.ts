import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SyncLearnerResponseActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import { syncLearnerResponseError } from 'store/actions/syncLearnerResponse.action';
import { syncLearnerResponseService } from 'services/api-services/syncLearnerResponse';
import { localStorageService } from 'services/LocalStorageService';
import { fetchLogicEngineEvaluation } from 'store/actions/logicEngineEvaluation.action';

function* SyncLearnerResponseSaga({
  payload,
}: StoreAction<SyncLearnerResponseActionType>): any {
  try {
    const response = yield call(
      syncLearnerResponseService.syncLearnerResponse,
      payload
    );
    console.log('DATA saved successfully', response);
    // not needed
    // yield put(syncLearnerResponseCompleted(response.result?.data?.message));
    if (response?.responseCode === 'OK') {
      // clearing local storage now as data sync completed
      localStorageService.deleteLearnerResponseData(payload.learner_id);
      yield put(fetchLogicEngineEvaluation(payload.learner_id));
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

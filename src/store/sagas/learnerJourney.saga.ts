import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LearnerJourneyActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import {
  fetchLearnerJourneyCompleted,
  fetchLearnerJourneyFailed,
} from 'store/actions/learnerJourney.actions';
import { learnerJourneyService } from 'services/api-services/learnerJourneyService';
import { questionSetFetchAction } from 'store/actions/questionSet.actions';

function* LearnerJourneyFetchSaga({
  payload,
}: StoreAction<LearnerJourneyActionType>): any {
  try {
    const response = yield call(learnerJourneyService.fetchLearnerjourney, {
      learner_id: payload,
    });
    yield put(fetchLearnerJourneyCompleted(response.result?.data));
    if (response?.result?.data?.question_set_id) {
      yield put(questionSetFetchAction(response.result.data.question_set_id));
    }
  } catch (e: any) {
    yield put(
      fetchLearnerJourneyFailed(
        (e?.errors && e.errors[0]?.message) || e?.message
      )
    );
  }
}

function* learnerJourneySaga() {
  yield all([
    takeLatest(
      LearnerJourneyActionType.FETCH_LEARNER_JOURNEY,
      LearnerJourneyFetchSaga
    ),
  ]);
}

export default learnerJourneySaga;

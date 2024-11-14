import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LogicEngineActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';

import { questionSetFetchAction } from 'store/actions/questionSet.actions';
import { navigateTo } from 'store/actions/navigation.action';
import { fetchLogicEngineEvaluationError } from 'store/actions/logicEngineEvaluation.action';
import { logicEngineEvalutionService } from 'services/api-services/logicEngineEvaluationService';
import { indexedDBService } from '../../services/IndexedDBService';

function* LogicEngineEvaluationFetchSaga({
  payload,
}: StoreAction<LogicEngineActionType>): any {
  try {
    const { learnerId, goToInstructions } = payload;
    const response = yield call(
      logicEngineEvalutionService.fetchLogicEngineEvaluation,
      {
        learner_id: learnerId,
      }
    );
    // not needed
    // yield put(fetchLogicEngineEvaluationCompleted(response.result?.data));
    if (response?.result?.data?.question_set_id) {
      const newQSID = response?.result?.data?.question_set_id;
      const criteria = {
        learner_id: learnerId,
        question_set_id: newQSID,
      };

      const hasLocalData = yield call(
        indexedDBService.queryObjectsByKeys,
        criteria
      );
      if (hasLocalData.length) {
        yield put(navigateTo('/continue-journey'));
      } else if (goToInstructions) {
        yield put(navigateTo('/instructions'));
      } else {
        yield put(navigateTo('/welcome'));
      }
      yield put(questionSetFetchAction(newQSID));
    } else {
      yield put(navigateTo('/completed'));
    }
  } catch (e: any) {
    yield put(
      fetchLogicEngineEvaluationError(
        (e?.errors && e.errors[0]?.message) || e?.message
      )
    );
  }
}

function* logicEngineEvaluationSaga() {
  yield all([
    takeLatest(
      LogicEngineActionType.FETCH_LOGIC_ENGINE_EVALUATION,
      LogicEngineEvaluationFetchSaga
    ),
  ]);
}

export default logicEngineEvaluationSaga;

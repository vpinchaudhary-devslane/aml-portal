import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SyncLearnerResponseActionType } from 'store/actions/actions.constants';
import { StoreAction } from 'models/StoreAction';
import {
  syncLearnerResponseCompleted,
  syncLearnerResponseError,
} from 'store/actions/syncLearnerResponse.action';
import { syncLearnerResponseService } from 'services/api-services/syncLearnerResponse';
import _ from 'lodash';
import { IDBDataStatus } from '../../types/enum';
import { indexedDBService } from '../../services/IndexedDBService';
import { LearnerJourneyStatus } from '../../models/enums/learnerJourney.enum';

function* SyncLearnerResponseSaga({
  payload,
}: StoreAction<SyncLearnerResponseActionType>): any {
  try {
    const { learnerId } = payload;
    const criteria = {
      status: IDBDataStatus.NOOP,
      learner_id: learnerId,
    };
    const learnerResponseData = yield call(
      indexedDBService.queryObjectsByKeys,
      criteria
    );

    if (!learnerResponseData.length) {
      console.log('No data for sync');
      yield put(syncLearnerResponseCompleted());
      return;
    }

    const objIds = learnerResponseData.map((data: any) => data.id) as number[];

    yield call(
      indexedDBService.updateStatusByIds,
      objIds,
      IDBDataStatus.SYNCING
    );

    const response = yield call(
      syncLearnerResponseService.syncLearnerResponse,
      {
        learner_id: learnerId,
        questions_data: learnerResponseData,
      }
    );

    if (response?.responseCode === 'OK') {
      const learnerJourney = response?.result?.data;
      const {
        status,
        question_set_id: completedQuestionSetId,
        completed_question_ids: completedQuestionIds,
      } = learnerJourney;

      const syncedIds = _.intersection(objIds, completedQuestionIds);
      // updating status of data entries
      yield call(
        indexedDBService.updateStatusByIds,
        syncedIds,
        IDBDataStatus.SYNCED
      );

      if (syncedIds.length !== objIds.length) {
        const unsyncedIds = _.difference(objIds, syncedIds);
        yield call(
          indexedDBService.updateStatusByIds,
          unsyncedIds,
          IDBDataStatus.NOOP
        );
      }

      if (status === LearnerJourneyStatus.COMPLETED) {
        /**
         * Delete all entries of completed QS for loggedInUser
         */
        const hasLocalDataForOldQS = yield call(
          indexedDBService.queryObjectsByKeys,
          {
            learner_id: learnerId,
            question_set_id: completedQuestionSetId,
            status: IDBDataStatus.SYNCED,
          }
        );

        if (
          hasLocalDataForOldQS.length &&
          hasLocalDataForOldQS.length === completedQuestionIds.length
        ) {
          const ids = hasLocalDataForOldQS.map(
            (data: any) => data.id
          ) as number[];
          yield call(indexedDBService.deleteObjectsByIds, ids);
        }
      }

      yield put(syncLearnerResponseCompleted());
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
    takeLatest(
      SyncLearnerResponseActionType.SYNC_FINAL_LEARNER_RESPONSE,
      SyncLearnerResponseSaga
    ),
  ]);
}

export default syncLearnerResponseSaga;

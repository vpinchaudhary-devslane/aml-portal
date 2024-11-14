import { SyncLearnerResponseActionType } from './actions.constants';

export const syncLearnerResponse = (learnerId: string) => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE,
  payload: { learnerId },
});

export const syncFinalLearnerResponse = (learnerId: string) => ({
  type: SyncLearnerResponseActionType.SYNC_FINAL_LEARNER_RESPONSE,
  payload: { learnerId },
});

export const syncLearnerResponseCompleted = () => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE_COMPLETED,
});

export const syncLearnerResponseError = (error: string) => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE_ERROR,
  payload: error,
});

import { SyncLearnerResponseActionType } from './actions.constants';

export const syncLearnerResponse = (learnerId: string) => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE,
  payload: learnerId,
});

export const syncLearnerResponseCompleted = (message: string) => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE_COMPLETED,
  payload: message,
});

export const syncLearnerResponseError = (error: string) => ({
  type: SyncLearnerResponseActionType.SYNC_LEARNER_RESPONSE_ERROR,
  payload: error,
});

import { LearnerJourney } from 'models/entities/LearnerJourney';
import { LearnerJourneyActionType } from './actions.constants';

export const fetchLearnerJourney = (learnerId: string) => ({
  type: LearnerJourneyActionType.FETCH_LEARNER_JOURNEY,
  payload: learnerId,
});

export const fetchLearnerJourneyCompleted = (journeyData: LearnerJourney) => ({
  type: LearnerJourneyActionType.FETCH_LEARNER_JOURNEY_COMPLETED,
  payload: journeyData,
});

export const fetchLearnerJourneyFailed = (error: string) => ({
  type: LearnerJourneyActionType.FETCH_LEARNER_JOURNEY_FAILED,
  payload: error,
});

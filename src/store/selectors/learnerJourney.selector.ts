import { createSelector } from 'reselect';
import { LearnerJourneyState } from 'store/reducers/learnerJourney.reducer';
import { AppState } from '../reducers';

const learnerJourneyState = (state: AppState) => state.learnerJourney;

export const isLearnerJourneyLoadingSelector = createSelector(
  [learnerJourneyState],
  (state: LearnerJourneyState) => Boolean(state.loading)
);

export const learnerJourneySelector = createSelector(
  [learnerJourneyState],
  (state: LearnerJourneyState) => state.learnerJourney
);

export const learnerJourneyErrorSelector = createSelector(
  [learnerJourneyState],
  (state: LearnerJourneyState) => state.error
);

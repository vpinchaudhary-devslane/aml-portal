import produce from 'immer';
import { Reducer } from 'redux';
import { LearnerJourney } from 'models/entities/LearnerJourney';
import { LearnerJourneyActionType } from 'store/actions/actions.constants';

export interface LearnerJourneyState {
  learnerJourney?: LearnerJourney;
  loading?: boolean;
  error?: string;
}

const initialState: LearnerJourneyState = {
  loading: false,
};

export const learnerJourneyReducer: Reducer<LearnerJourneyState> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: LearnerJourneyState = initialState,
  action
) =>
  produce(state, (draft: LearnerJourneyState) => {
    switch (action.type) {
      case LearnerJourneyActionType.FETCH_LEARNER_JOURNEY: {
        draft.loading = true;
        break;
      }
      case LearnerJourneyActionType.FETCH_LEARNER_JOURNEY_COMPLETED: {
        const learnerJourney: LearnerJourney = action.payload as LearnerJourney;
        draft.learnerJourney = learnerJourney;
        draft.loading = false;
        break;
      }
      case LearnerJourneyActionType.FETCH_LEARNER_JOURNEY_FAILED: {
        const error = action.payload as string;
        draft.loading = false;
        draft.error = error;
        break;
      }
      default: {
        break;
      }
    }
  });

import { createSelector } from 'reselect';
import { QuestionSetState } from 'store/reducers/questionSet.reducer';
import { AppState } from '../reducers';

const questionSetState = (state: AppState) => state.questionSet;

export const isQuestionSetLoadingSelector = createSelector(
  [questionSetState],
  (state: QuestionSetState) => Boolean(state.loading)
);

export const questionsSetSelector = createSelector(
  [questionSetState],
  (state: QuestionSetState) => state.questionSet
);

export const questionSetErrorSelector = createSelector(
  [questionSetState],
  (state: QuestionSetState) => state.error
);

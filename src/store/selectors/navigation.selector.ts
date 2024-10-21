import { createSelector } from 'reselect';
import { QuestionSetState } from 'store/reducers/questionSet.reducer';
import { NavigationState } from 'store/reducers/NavigationReducer';
import { AppState } from '../reducers';

const navigationState = (state: AppState) => state.navigationReducer;

export const navigationPathSelector = createSelector(
  [navigationState],
  (state: NavigationState) => state.path
);

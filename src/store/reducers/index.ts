import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { userReducer } from './user.reducer';
import { questionSetReducer } from './questionSet.reducer';
import { learnerJourneyReducer } from './learnerJourney.reducer';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  questionSetReducer,
  learnerJourneyReducer,
});

export const rootReducer = (state: any, action: any) =>
  appReducer(state, action);

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

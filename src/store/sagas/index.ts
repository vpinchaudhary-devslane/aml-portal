import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import questionSetSaga from './QuestionSet.saga';
import learnerJourneySaga from './learnerJourney.saga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(questionSetSaga), fork(learnerJourneySaga)]);
}

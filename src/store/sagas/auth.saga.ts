import { SagaPayloadType } from 'types/SagaPayload.type';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthActionType,
  CSRFTokenActionType,
} from 'store/actions/actions.constants';
import {
  authFetchMeCompletedAction,
  authFetchMeErrorAction,
  AuthLoginActionPayloadType,
  authLoginCompletedAction,
  authLoginErrorAction,
  authLogoutAction,
} from 'store/actions/auth.action';
import { authService } from 'services/api-services/AuthService';
import { localStorageService } from 'services/LocalStorageService';
import { fetchLearnerJourney } from 'store/actions/learnerJourney.actions';
import { navigateTo } from 'store/actions/navigation.action';
import {
  fetchCSRFTokenCompleted,
  fetchCSRFTokenFailed,
} from 'store/actions/csrfToken.action';

interface LoginSagaPayloadType extends SagaPayloadType {
  payload: AuthLoginActionPayloadType;
}
function* loginSaga(data: LoginSagaPayloadType): any {
  try {
    const response = yield call(authService.login, data.payload);
    if (response.responseCode === 'OK' && response?.result?.data) {
      yield put(authLoginCompletedAction(response?.result?.data));
      yield put(fetchLearnerJourney(response?.result?.data?.identifier));
      yield put(navigateTo('/continue-journey'));
    } else if (response.responseCode === 'OK' && !response?.result?.data) {
      yield put(navigateTo('/welcome'));
    }
    // localStorageService.setAuthToken(response?.token?.token);
  } catch (e: any) {
    yield put(
      authLoginErrorAction((e?.errors && e.errors[0]?.message) || e?.message)
    );
  }
}

function* fetchLoggedInUserSaga(): any {
  try {
    const response = yield call(authService.fetchMe);
    yield put(authFetchMeCompletedAction(response?.result?.data));
    if (response.responseCode === 'OK' && response?.result?.data) {
      yield put(fetchLearnerJourney(response?.result?.data?.identifier));
      yield put(navigateTo('/continue-journey'));
    } else if (response.responseCode === 'OK' && !response?.result?.data) {
      yield put(navigateTo('/welcome'));
    }
  } catch (e: any) {
    localStorageService.removeAuthToken();
    yield put(authFetchMeErrorAction(e?.message));
  }
}

function* fetchCSRFTokenSaga(): any {
  try {
    const response = yield call(authService.fetchCSRFToken);
    yield put(fetchCSRFTokenCompleted(response.csrfToken));
    localStorageService.setCSRFToken(response.csrfToken);
  } catch (e: any) {
    localStorageService.removeCSRFToken();
    yield put(fetchCSRFTokenFailed(e?.message));
  }
}

function* logoutSaga(): any {
  try {
    const response = yield call(authService.logout);
    if (response) {
      localStorageService.removeCSRFToken();
      yield put(navigateTo('/login'));
    }
  } catch (e: any) {
    localStorageService.removeCSRFToken();
    yield put(authFetchMeErrorAction(e?.message));
  }
}
function* authSaga() {
  yield all([
    takeLatest(AuthActionType.LOGIN, loginSaga),
    takeLatest(AuthActionType.FETCH_ME, fetchLoggedInUserSaga),
    takeLatest(AuthActionType.LOGOUT, logoutSaga),
    takeLatest(CSRFTokenActionType.FETCH_CSRF_TOKEN, fetchCSRFTokenSaga),
  ]);
}

export default authSaga;

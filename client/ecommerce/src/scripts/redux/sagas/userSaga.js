//@ts-check
import axios from 'axios';
import LocalStorage from '../../../api/localStroage';
import {
  put,
  takeEvery,
  all,
  takeLeading,
  takeLatest,
  fork,
} from 'redux-saga/effects';
import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';
import {userApi, AddToken} from '../../../api/api';
const actions = userReducer.actions;
const errorActions = errorReducer.actions;

function* loginAsync({payload}) {
  try {
    const user = yield userApi.login(payload).then((x) => x.data);
    yield LocalStorage.storeData(LocalStorage.keys.user, user);
    AddToken(user.token);
    yield put(actions.auth_success(user));
    yield put(errorActions.remove(actions.login.type));
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.login.type,
        message: e.response.data.detail,
        status: e.response.status,
      }),
    );
    yield put(actions.setLoading(false));
  }
}

function* getProfile() {
  try {
    const user = yield userApi.get().then((x) => x.data);
    yield put(actions.getProfileSuccess(user));
    yield put(errorActions.remove(actions.getProfile.type));
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.getProfile.type,
        message: e.response.data.detail,
        status: e.response.status,
      }),
    );
    yield put(actions.setLoading(false));
  }
}

function* signupAsync({payload}) {
  try {
    yield userApi.signup(payload).then((x) => x.data);
    yield put(
      actions.login({email: payload.email, password: payload.password}),
    );
    yield put(errorActions.remove(actions.signup.type));
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.signup.type,
        message: e.response.data.detail,
        status: e.response.status,
      }),
    );
    yield put(actions.setLoading(false));
  }
}

function* logoutAsync() {
  try {
    yield LocalStorage.clear();
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.signup.type,
        message: e,
      }),
    );
  }
}

export function* watchLoginAsync() {
  yield takeLatest(actions.login.type, loginAsync);
}

export function* watchSignupAsync() {
  yield takeLatest(actions.signup.type, signupAsync);
}

export function* watchLogoutAsync() {
  yield takeLatest(actions.logout.type, logoutAsync);
}

export function* watchGetProfileAsync() {
  yield takeLatest(actions.getProfile.type, getProfile);
}

export default function* watchUserSaga() {
  yield all([
    fork(watchLoginAsync),
    fork(watchSignupAsync),
    fork(watchLogoutAsync),
    fork(watchGetProfileAsync),
  ]);
}

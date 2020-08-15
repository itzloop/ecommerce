//@ts-check
import axios from 'axios';
import Utils from '../../utils';
import {put, takeEvery, all, takeLeading, takeLatest} from 'redux-saga/effects';
import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';
import {userApi} from '../../../api/api';
const actions = userReducer.actions;
const errorActions = errorReducer.actions;

function* loginAsync({payload}) {
  try {
    const user = yield userApi.login(payload).then((x) => x.data);
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

export function* watchLoginAsync() {
  console.log('watching for login');
  yield takeLatest(actions.login.type, loginAsync);
}

export function* watchSignupAsync() {
  console.log('watching for signup');
  yield takeLatest(actions.signup.type, signupAsync);
}

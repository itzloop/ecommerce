//@ts-check

import Utils from '../utils';
import {
  put,
  takeEvery,
  all,
  takeLeading,
  takeLatest,
  call,
} from 'redux-saga/effects';
import settingsSlice from './reducers/settingsReducer';
import userSaga from './sagas/userSaga';
import errorSagaWatcher from './sagas/errorSaga';
import categoryWatcher from './sagas/categoriesSaga';
import productWatcher from './sagas/productSaga';
import {actions as userActions} from './reducers/userReducer';
import {actions as appActions} from './reducers/appReducer';
import localStorage from './../../api/localStroage';
import {AddToken} from './../../api/api';
export function* helloSaga() {
  console.log('Hello Sagas!');
}

export function* loadSettingsAsync() {
  const settings = yield Utils.getData('settings', true).then((val) => {
    return val;
  });
  yield put(settingsSlice.actions.load(settings));
}

function* watchloadSettingsAsync() {
  const action = settingsSlice.actions.reques_load();
  yield takeLatest(action.type, loadSettingsAsync);
}

export default function* rootSaga() {
  const user = yield localStorage.wrappers.getUser();
  if (user) {
    AddToken(user.token);
    yield put(userActions.initialize(user));
    yield put(appActions.appReady());
  }

  yield all([
    watchloadSettingsAsync(),
    userSaga(),
    errorSagaWatcher(),
    categoryWatcher(),
    productWatcher(),
  ]);
}

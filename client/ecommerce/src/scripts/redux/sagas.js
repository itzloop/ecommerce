import Utils from '../utils';
import {put, takeEvery, all, takeLeading, takeLatest} from 'redux-saga/effects';
import settingsSlice from './reducers/settingsReducer';
import {watchLoginAsync, watchSignupAsync} from './sagas/userSaga';
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
  console.log('rootSaga');
  yield all([watchloadSettingsAsync(), watchLoginAsync(), watchSignupAsync()]);
}

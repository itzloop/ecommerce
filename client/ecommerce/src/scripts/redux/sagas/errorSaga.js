import {ToastAndroid} from 'react-native';
import {takeEvery, put} from 'redux-saga/effects';
import {actions} from '../reducers/errorReducer';

function* prompt({payload}) {
  ToastAndroid.showWithGravity(
    payload.message,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
  yield put(actions.remove(payload));
}

export default function* promptWatcher() {
  yield takeEvery(actions.add.type, prompt);
}

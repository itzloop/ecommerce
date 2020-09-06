import {takeEvery, put, takeLatest} from 'redux-saga/effects';
import {actions} from '../reducers/categoryReducer.js';
import {categoryApi} from '../../../api/api';

function* getCategory() {
  try {
    const categories = yield categoryApi.get().then((res) => res);
    yield put(actions.get_success(categories.data));
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.signup.type,
        message: e,
      }),
    );
  }
}

export default function* categoryWatcher() {
  yield takeLatest(actions.get.type, getCategory);
}

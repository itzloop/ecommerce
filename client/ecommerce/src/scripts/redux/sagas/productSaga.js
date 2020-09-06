import {put, takeLatest} from 'redux-saga/effects';
import {actions} from '../reducers/productsReducer.js';
import {productApi} from '../../../api/api';

function* getProduct() {
  try {
    const products = yield productApi.get().then((res) => res);
    yield put(actions.prodcutGetSuccess(products.data));
  } catch (e) {
    yield put(
      errorActions.add({
        type: actions.getProduct.type,
        message: e,
      }),
    );
  }
}

export default function* productWatcher() {
  yield takeLatest(actions.getProduct.type, getProduct);
}

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import settingsSlice from './reducers/settingsReducer';
import userSlice from './reducers/userReducer';
import errorSlice from './reducers/errorReducer';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

const reducer = combineReducers({
  settings: settingsSlice.reducer,
  user: userSlice.reducer,
  error: errorSlice.reducer,
});

// const devTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleware = [...getDefaultMiddleware(), sagaMiddleWare];

export default store = configureStore({
  reducer,
  middleware,
});

sagaMiddleWare.run(rootSaga);

import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];
const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
  },
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

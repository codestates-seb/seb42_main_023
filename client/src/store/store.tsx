import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];
const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
    postInput: postInputSlice.reducer,
    validation: validationSlice.reducer,
  },
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

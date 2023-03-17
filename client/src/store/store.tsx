import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';
import headerSlice from '../slices/headerSlice';
import mainSlice from '../slices/mainSlice';
// import commentSlice from '../slices/commentSlice';

const middlewares = [logger];
const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
    postInput: postInputSlice.reducer,
    // comment: commentSlice.reducer,
    validation: validationSlice.reducer,
    header: headerSlice.reducer,
    main: mainSlice.reducer,
  },
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

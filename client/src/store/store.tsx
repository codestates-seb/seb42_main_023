import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';
import {
  postsApi,
  commentsApi,
  repliesApi,
  recomendedPostsApi,
} from '../api/api';
import headerSlice from '../slices/headerSlice';
import commentSlice from '../slices/commentSlice';
import surveySlice from '../slices/surveySlice';

const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
    postInput: postInputSlice.reducer,
    comment: commentSlice.reducer,
    validation: validationSlice.reducer,
    header: headerSlice.reducer,
    survey: surveySlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [recomendedPostsApi.reducerPath]: recomendedPostsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware)
      .concat(repliesApi.middleware)
      .concat(recomendedPostsApi.middleware)
      .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

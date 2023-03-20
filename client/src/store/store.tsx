import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import commentSlice from '../slices/commentSlice';
import replySlice from '../slices/replySlice';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';
import headerSlice from '../slices/headerSlice';
import mainSlice from '../slices/mainSlice';
import mypageSlice from '../slices/mypageSlice';
import nicknameSlice from '../slices/nicknameSlice';
import {
  postsApi,
  commentsApi,
  repliesApi,
  recomendedPostsApi,
  reportApi,
} from '../api/api';
import { postListApi, weeklyPopularApi } from '../api/postListapi';
import surveySlice from '../slices/surveySlice';

const store = configureStore({
  reducer: {
    postInput: postInputSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    reply: replySlice.reducer,
    validation: validationSlice.reducer,
    header: headerSlice.reducer,
    main: mainSlice.reducer,
    mypage: mypageSlice.reducer,
    survey: surveySlice.reducer,
    nickname: nicknameSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [recomendedPostsApi.reducerPath]: recomendedPostsApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [postListApi.reducerPath]: postListApi.reducer,
    [weeklyPopularApi.reducerPath]: weeklyPopularApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware)
      .concat(repliesApi.middleware)
      .concat(recomendedPostsApi.middleware)
      .concat(reportApi.middleware)
      .concat(postListApi.middleware)
      .concat(weeklyPopularApi.middleware)

      .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

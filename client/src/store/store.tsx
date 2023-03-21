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
import { repliesApi } from '../api/replyApi';
import { postListApi, weeklyPopularApi } from '../api/postListapi';
import surveySlice from '../slices/surveySlice';
import { postsApi, recomendedPostsApi } from '../api/postApi';
import { commentsApi } from '../api/commentApi';
import { reportApi } from '../api/reportApi';
// import { apiSlice } from '../api/apiSlice';
import { nicknameApi } from '../api/nicknameApi';

const store = configureStore({
  reducer: {
    // general Reducer
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

    // api Reducer
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [recomendedPostsApi.reducerPath]: recomendedPostsApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [postListApi.reducerPath]: postListApi.reducer,
    [weeklyPopularApi.reducerPath]: weeklyPopularApi.reducer,
    [nicknameApi.reducerPath]: nicknameApi.reducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
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
      .concat(apiSlice.middleware)

      .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

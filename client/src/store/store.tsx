import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import commentSlice from '../slices/commentSlice';
import replySlice from '../slices/replySlice';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';
import {
  membersApi,
  membersPostListApi,
  membersCommentsListApi,
} from '../api/memberapi';
import headerSlice from '../slices/headerSlice';
import mainSlice from '../slices/mainSlice';
import mypageSlice from '../slices/mypageSlice';
import nicknameSlice from '../slices/nicknameSlice';
import { repliesApi } from '../api/replyApi';
import { postListApi, weeklyPopularApi, SearchApi } from '../api/postListapi';
import surveySlice from '../slices/surveySlice';
import { postsApi, recomendedPostsApi } from '../api/postApi';
import { commentsApi } from '../api/commentApi';
import { reportApi } from '../api/reportApi';
import { nicknameApi } from '../api/nicknameApi';
import { tempTokenApi } from '../api/tempTokenAPi';
import reportSlice from '../slices/reportSlice';
import authSlice from '../slices/authSlice';

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
    report: reportSlice.reducer,
    auth: authSlice.reducer,

    // api Reducer
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [recomendedPostsApi.reducerPath]: recomendedPostsApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [postListApi.reducerPath]: postListApi.reducer,
    [weeklyPopularApi.reducerPath]: weeklyPopularApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    [membersPostListApi.reducerPath]: membersPostListApi.reducer,
    [membersCommentsListApi.reducerPath]: membersCommentsListApi.reducer,
    [nicknameApi.reducerPath]: nicknameApi.reducer,
    [tempTokenApi.reducerPath]: tempTokenApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
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
      .concat(membersApi.middleware)
      .concat(membersPostListApi.middleware)
      .concat(membersCommentsListApi.middleware)
      .concat(nicknameApi.middleware)
      .concat(tempTokenApi.middleware)
      .concat(SearchApi.middleware)

      .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

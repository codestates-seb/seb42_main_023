import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../slices/postSlice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';
import logger from 'redux-logger';
import postInputSlice from '../slices/postInputSlice';
import validationSlice from '../slices/validationSlice';
<<<<<<< HEAD
import headerSlice from '../slices/headerSlice';
import mainSlice from '../slices/mainSlice';
import mypageSlice from '../slices/mypageSlice';
import surveySlice from '../slices/surveySlice';
import { postsApi, recommendedPostsApi } from '../api/postApi';
import { commentsApi } from '../api/commentApi';
import { nicknameApi } from '../api/nicknameApi';
import { tempTokenApi } from '../api/tempTokenAPi';
import reportSlice from '../slices/reportSlice';
import { apiSlice } from '../api/apiSlice';
import { repliesApi } from '../api/replyApi';
=======
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];
const store = configureStore({
  reducer: {
    postSlice: postSlice.reducer,
    postInput: postInputSlice.reducer,
    validation: validationSlice.reducer,
<<<<<<< HEAD
    header: headerSlice.reducer,
    main: mainSlice.reducer,
    mypage: mypageSlice.reducer,
    survey: surveySlice.reducer,
    report: reportSlice.reducer,

    // api Reducer
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [recommendedPostsApi.reducerPath]: recommendedPostsApi.reducer,
    [nicknameApi.reducerPath]: nicknameApi.reducer,
    [tempTokenApi.reducerPath]: tempTokenApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware)
      .concat(repliesApi.middleware)
      .concat(recommendedPostsApi.middleware)
      .concat(nicknameApi.middleware)
      .concat(tempTokenApi.middleware)
      .concat(apiSlice.middleware), // TODO: 이거빼고 위에 concat은 다 지워도됌.
  // .concat(logger),
=======
  },
  middleware: middlewares,
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

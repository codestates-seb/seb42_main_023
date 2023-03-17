import { all } from 'redux-saga/effects';
import postSaga from './post/postSaga';

// 배열 안의 여러 사가를 동시에 실행시켜줍니다.
export function* rootSaga() {
  yield all([postSaga()]);
}

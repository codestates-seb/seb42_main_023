import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { postSagaActions } from './postSagaActions';
interface Response {
  config: object;
  data: Array<object>;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

const getPost = async () => {
  const response = await axios.get(
    'https://main-project-d9049-default-rtdb.asia-southeast1.firebasedatabase.app/BEST_AWARDS_POST.json',
  );
  return response.data;
};

function* fetchPost(action: any) {
  try {
    const result: Response = yield call(getPost);
    console.log('result', result);
    yield put({
      type: postSagaActions.SUCCESS_GET_POPULAR_POST,
      payload: result,
    });
  } catch (err) {
    console.log(err);
  }
}

function* handleToggle(action: any) {
  // 미들웨어 동작 로직
}

function* postSaga() {
  yield takeLatest(postSagaActions.TOGGLE_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_BOOKMARK, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_COMMENT_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_COMMENT_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_REPLY_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_REPLY_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_REPLY_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.GET_POPULAR_POST, fetchPost);
}

export default postSaga;

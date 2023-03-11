import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { postSagaActions } from './postSagaActions';
//
console.log(postSagaActions);

function* handleToggle(action: any) {
  console.log('action : ', action);
}

function* postSaga() {
  yield takeLatest(postSagaActions.TOGGLE_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_BOOKMARK, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_COMMENT_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_COMMENT_DISLIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_REPLY_LIKE, handleToggle);
  yield takeLatest(postSagaActions.TOGGLE_REPLY_DISLIKE, handleToggle);
}

export default postSaga;

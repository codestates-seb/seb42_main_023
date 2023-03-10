import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { access } from 'fs';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLike: false,
    isDislike: false,
    isBookmark: false,
    isCommentLike: false,
    isCommentDislike: false,
    isReplyLike: false,
    isReplyDislike: false,
  },
  reducers: {
    // 게시물 좋아요
    setLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isLike = !state.isLike;
    },
    // 게시물 싫어요
    setDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isDislike = !state.isDislike;
    },
    // 게시물 북마크
    setBookmark: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isBookmark = !state.isBookmark;
    },
    // 댓글 좋아요
    setCommentLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isCommentLike = !state.isCommentLike;
    },
    // 댓글 싫어요
    setCommentDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isCommentDislike = !state.isCommentDislike;
    },
    // 답글 좋아요
    setReplyLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isReplyLike = !state.isReplyLike;
    },
    // 답글 싫어요
    setReplyDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isReplyDislike = !state.isReplyDislike;
    },
  },
});

export default postSlice;
export const {
  setLike,
  setDislike,
  setBookmark,
  setCommentLike,
  setCommentDislike,
  setReplyLike,
  setReplyDislike,
} = postSlice.actions;

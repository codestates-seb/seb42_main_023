import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCommentLike: false,
    isCommentDislike: false,
    commentValue: '',
    currentComment: undefined,
    isEdit: false,
    commentId: undefined,
  },
  reducers: {
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
    // 댓글 내용
    setComment: (state, action: PayloadAction<string>) => {
      (state.commentValue as unknown) = action.payload;
    },
    // 댓글 수정가능 상태
    eidtComment: (state, action: PayloadAction<boolean>) => {
      state.isEdit = !state.isEdit;
    },
    // 댓글 삭제
    deleteComment: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
    },
    // 댓글 ID
    setCommentId: (state, action: PayloadAction<object>): void => {
      (state.commentId as unknown) = action.payload;
    },
  },
});

export default commentSlice;
export const {
  setCommentLike,
  setCommentDislike,
  setComment,
  eidtComment,
  deleteComment,
  setCommentId,
} = commentSlice.actions;

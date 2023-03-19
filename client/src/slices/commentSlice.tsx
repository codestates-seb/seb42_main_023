import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCommentLike: false,
    isCommentDislike: false,
    commentValue: '',
    editValue: '',
    currentComment: undefined,
    commentId: undefined,
    isEdit: undefined,
    isOpenDelete: false,
  },
  reducers: {
    // 댓글 좋아요
    setCommentLike: (state, action: PayloadAction<boolean>): void => {
      state.isCommentLike = !state.isCommentLike;
    },
    // 댓글 싫어요
    setCommentDislike: (state, action: PayloadAction<boolean>): void => {
      state.isCommentDislike = !state.isCommentDislike;
    },
    // 댓글 내용
    setComment: (state, action: PayloadAction<string>) => {
      (state.commentValue as unknown) = action.payload;
    },
    // 댓글 수정 내용
    editComment: (state, action: PayloadAction<string>) => {
      (state.commentValue as unknown) = action.payload;
    },
    // 댓글 삭제
    deleteComment: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
    },
    // 댓글 ID
    setCommentId: (state, action: PayloadAction<object>): void => {
      (state.commentId as unknown) = action.payload;
    },
    // 댓글 수정 여부
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    // 답글 수정 상태 변경
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    // edit 댓글 추가
    addCommentEdit: (state, action: PayloadAction<boolean>): void => {
      (state.isEdit! as Array<boolean>).push(action.payload);
    },
    // edit 댓글 추가
    isOpenDelete: (state, action: PayloadAction<boolean>): void => {
      state.isOpenDelete = !state.isOpenDelete;
    },
  },
});

export default commentSlice;
export const {
  setCommentLike,
  setCommentDislike,
  setComment,
  editComment,
  deleteComment,
  setCommentId,
  isEdit,
  setIsEdit,
  addCommentEdit,
  isOpenDelete,
} = commentSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCommentLike: false,
    isCommentDislike: false,
    commentValue: '',
    commentId: undefined,
    isEdit: undefined,
    isOpeneIntro: false,
    page: 1,
    commentCnt: undefined,
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
    // 댓글 ID
    setCommentId: (state, action: PayloadAction<number>): void => {
      (state.commentId as unknown) = action.payload;
    },
    // 댓글 수정 여부
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    // 댓글 수정 상태 변경
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    // edit 댓글 추가
    addCommentEdit: (state, action: PayloadAction<boolean>): void => {
      (state.isEdit! as Array<boolean>).push(action.payload);
    },
    // 소개 페이지 오픈
    setIsOpenIntro: (state, action: PayloadAction<boolean>): void => {
      state.isOpeneIntro = !state.isOpeneIntro;
    },
    // 댓글 페이지 번호 증가
    setCommentPage: (state, action: PayloadAction<number>): void => {
      (state.page as unknown) = action.payload;
    },
    // edit 댓글 추가
    setCommentCnt: (state, action: PayloadAction<number>): void => {
      (state.commentCnt as unknown) = action.payload;
    },
  },
});

export default commentSlice;
export const {
  setCommentLike,
  setCommentDislike,
  setComment,
  setCommentId,
  isEdit,
  setIsEdit,
  addCommentEdit,
  setIsOpenIntro,
  setCommentPage,
  setCommentCnt,
} = commentSlice.actions;

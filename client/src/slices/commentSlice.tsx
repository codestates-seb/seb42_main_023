import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentVal: '',
    replyVal: '',
    currentComment: undefined,
    isEdit: undefined,
  },
  reducers: {
    // 댓글 내용
    setComment: (state, action: PayloadAction<string>) => {
      (state.commentVal as unknown) = action.payload;
    },
    // 답글 내용
    setReply: (state, action: PayloadAction<string>) => {
      (state.replyVal as unknown) = action.payload;
    },
    // 댓글 생성
    createComment: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
    },
    // 댓글 수정
    updateComment: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
    },
    // 댓글 삭제
    deleteComment: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
    },
  },
});

export default commentSlice;
export const {
  setComment,
  setReply,
  createComment,
  updateComment,
  deleteComment,
} = commentSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const replySlice = createSlice({
  name: 'reply',
  initialState: {
    isReplyLike: false,
    isReplyDislike: false,
    replyValue: '',
    totalReplies: [],
    isOpened: undefined,
  },
  reducers: {
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
    // 답글 내용
    setReply: (state, action: PayloadAction<string>) => {
      (state.replyValue as unknown) = action.payload;
    },
    // 렌더링 답글
    setTotalReplies: (state, action: PayloadAction<Array<object>>): void => {
      (state.totalReplies as Array<object>).push(...action.payload);
    },
    // 답글 클릭 여부
    isOpened: (state, action: PayloadAction<object>): void => {
      (state.isOpened as unknown) = action.payload;
    },
    // 답글 클릭 상태 변경
    setIsOpened: (state, action: PayloadAction<number>): void => {
      (state.isOpened! as Array<boolean>)[action.payload] = !(
        state.isOpened! as Array<boolean>
      )[action.payload];
    },
  },
});

export default replySlice;
export const {
  setReplyLike,
  setReplyDislike,
  setReply,
  setTotalReplies,
  isOpened,
  setIsOpened,
} = replySlice.actions;

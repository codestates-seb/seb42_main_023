import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const replySlice = createSlice({
  name: 'reply',
  initialState: {
    replyValue: '',
    replyId: undefined,
    isEdit: undefined,
    isOpened: undefined,
    totalReplies: undefined,
    isOpeneIntro: false,
    page: 1,
  },
  reducers: {
    setReply: (state, action: PayloadAction<string>) => {
      (state.replyValue as unknown) = action.payload;
    },
    setReplyId: (state, action: PayloadAction<number>): void => {
      (state.replyId as unknown) = action.payload;
    },
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    setTotalReplies: (state, action: PayloadAction<Array<object>>): void => {
      (state.totalReplies as unknown) = action.payload;
    },
    isOpened: (state, action: PayloadAction<object>): void => {
      (state.isOpened as unknown) = action.payload;
    },
    setIsOpened: (state, action: PayloadAction<number>): void => {
      (state.isOpened! as Array<boolean>)[action.payload] = !(
        state.isOpened! as Array<boolean>
      )[action.payload];
    },
  },
});

export default replySlice;
export const {
  setReply,
  setReplyId,
  isEdit,
  setIsEdit,
  setTotalReplies,
  isOpened,
  setIsOpened,
} = replySlice.actions;

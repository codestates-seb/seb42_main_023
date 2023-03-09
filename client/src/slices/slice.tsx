import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (state, action) => state + action.payload,
  },
});

export default slice;
export const { increment } = slice.actions;

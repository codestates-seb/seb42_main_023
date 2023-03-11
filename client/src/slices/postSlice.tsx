import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'test',
  initialState: {},
  reducers: {
    getlist: (state, action) => action.payload,
  },
});

export default postSlice;
export const { getlist } = postSlice.actions;

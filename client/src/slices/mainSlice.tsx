import { createSlice } from '@reduxjs/toolkit';

interface postCategory {
  type: string;
  payload: '' | '/best-awards' | '/search';
}

interface Orderby {
  type: string;
  payload: 'latest' | 'thumbup' | 'view-count';
}
interface Page {
  type: string;
  payload: number;
}

const mainSlice = createSlice({
  name: 'mainstates',
  initialState: {
    postCategory: '',
    orderby: 'latest',
    currentPage: 1,
  },
  reducers: {
    setPostCategory: (state, action: postCategory): void => {
      state.postCategory = action.payload;
    },
    setOrderby: (state, action: Orderby): void => {
      state.orderby = action.payload;
    },
  },
});

export default mainSlice;
export const { setPostCategory, setOrderby } = mainSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

interface Header {
  type: string;
  payload: boolean;
}
interface Tag {
  type: string;
  payload: string;
}

const headerSlice = createSlice({
  name: 'headerstate',
  initialState: {
    search: false,
    input: '',
    tag: [],
    memberImg: '',
  },
  reducers: {
    setSearch: (state, action: Header): void => {
      state.search = action.payload;
    },
    setInput: (state, action: Tag): void => {
      state.input = action.payload;
    },
    setSearchTag: (state, action: Tag): void => {
      (state.tag as Array<string>).push(action.payload);
    },
    deleteSarchTag: (state, action: Tag): void => {
      (state.tag as Array<string>) = (state.tag as Array<string>).filter(
        (tag) => tag !== action.payload,
      );
    },
    deleteAllSarchTag: (state): void => {
      (state.tag as Array<string>) = [];
    },
  },
});

export default headerSlice;
export const {
  setSearch,
  setInput,
  setSearchTag,
  deleteSarchTag,
  deleteAllSarchTag,
} = headerSlice.actions;

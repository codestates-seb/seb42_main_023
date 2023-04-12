import { createSlice } from '@reduxjs/toolkit';

interface Header {
  type: string;
  payload: boolean;
}
interface Tag {
  type: string;
  payload: string;
}
interface UserState {
  type: string;
  payload: '' | 'login' | 'admin';
}

const headerSlice = createSlice({
  name: 'headerstate',
  initialState: {
    search: false,
    login: '',
    input: '',
    tag: [],
    memberName: '',
    memberImg: '',
    searchQuery: '',
  },
  reducers: {
    setSearch: (state, action: Header): void => {
      state.search = action.payload;
    },
    setLogin: (state, action: UserState): void => {
      state.login = action.payload;
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
    setMemberName: (state, action: Tag): void => {
      state.memberName = action.payload;
    },
    setMemberImg: (state, action: Tag): void => {
      state.memberImg = action.payload;
    },
    setSearchQuery: (state, action: Tag): void => {
      state.searchQuery = action.payload;
    },
  },
});

export default headerSlice;
export const {
  setSearch,
  setLogin,
  setInput,
  setSearchTag,
  deleteSarchTag,
  deleteAllSarchTag,
  setMemberName,
  setMemberImg,
  setSearchQuery,
} = headerSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Header {
  type: string;
  payload: boolean;
}

const headerSlice = createSlice({
  name: 'headerstate',
  initialState: {
    search: false,
    login: true,
    tag: false,
  },
  reducers: {
    // 검색창 헤더 토글
    setSearch: (state, action: Header): void => {
      state.search = action.payload;
    },
    // 로그인시 유저이미지와 글쓰기버튼 출력
    setLogin: (state, action: Header): void => {
      state.login = action.payload;
    },
    // 로그인시 유저이미지와 글쓰기버튼 출력
    setTag: (state, action: Header): void => {
      state.login = action.payload;
    },
  },
});

export default headerSlice;
export const { setSearch, setLogin, setTag } = headerSlice.actions;

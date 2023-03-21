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
    login: true,
    input: '',
    tag: [],
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
    // 검색창 상태
    setInput: (state, action: Tag): void => {
      state.input = action.payload;
    },
    // 검색 태그 리스트
    setSearchTag: (state, action: Tag): void => {
      (state.tag as Array<string>).push(action.payload);
    },
    //검색 태그 삭제
    deleteSarchTag: (state, action: Tag): void => {
      (state.tag as Array<string>) = (state.tag as Array<string>).filter(
        (tag) => tag !== action.payload,
      );
    },
  },
});

export default headerSlice;
export const { setSearch, setLogin, setInput, setSearchTag, deleteSarchTag } =
  headerSlice.actions;
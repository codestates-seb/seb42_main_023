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
    // 검색창 헤더 토글
    setSearch: (state, action: Header): void => {
      state.search = action.payload;
    },
    // 로그인시 유저이미지와 글쓰기버튼 출력
    setLogin: (state, action: UserState): void => {
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
    //검색 태그 초기화
    deleteAllSarchTag: (state): void => {
      (state.tag as Array<string>) = [];
    },
    // 회원명 지정
    setMemberName: (state, action: Tag): void => {
      state.memberName = action.payload;
    },
    // 회원이미지 지정
    setMemberImg: (state, action: Tag): void => {
      state.memberImg = action.payload;
    },

    // 검색 요청 핸들러
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

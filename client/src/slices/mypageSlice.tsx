import { createSlice } from '@reduxjs/toolkit';

interface MemberPost {
  type: string;
  payload:
    | '작성한 글'
    | '작성한 댓글'
    | '좋아요한 글'
    | '좋아요한 댓글'
    | '북마크';
}
interface Open {
  type: string;
  payload: boolean;
}
interface Width {
  type: string;
  payload: number;
}
interface Intro {
  type: string;
  payload: string;
}
interface Query {
  type: string;
  payload: string;
}
const mypageSlice = createSlice({
  name: 'mypagestates',
  initialState: {
    filter: '작성한 댓글',
    dropOpen: false,
    EditOpen: false,
    EditWidth: 1,
    content: '',
    query: '',
  },
  reducers: {
    // 정렬필터
    setFilter: (state, action: MemberPost): void => {
      state.filter = action.payload;
    },
    // 정렬옵션 선택창
    setFilterOpen: (state, action: Open): void => {
      state.dropOpen = action.payload;
    },
    // 자기소개 입력창
    setEditOpen: (state, action: Open): void => {
      state.EditOpen = action.payload;
    },
    // 자기소개 div width
    setEditWidth: (state, action: Width): void => {
      state.EditWidth = action.payload;
    },
    // 자기소개
    setContent: (state, action: Intro): void => {
      state.content = action.payload;
    },
    // api쿼리 지정
    setQuery: (state, action: Intro): void => {
      state.query = action.payload;
    },
  },
});

export default mypageSlice;
export const {
  setFilter,
  setFilterOpen,
  setEditOpen,
  setEditWidth,
  setContent,
  setQuery,
} = mypageSlice.actions;

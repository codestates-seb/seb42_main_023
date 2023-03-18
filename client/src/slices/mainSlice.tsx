import { createSlice } from '@reduxjs/toolkit';

interface Comunity {
  type: string;
  payload: boolean;
}
interface Filter {
  type: string;
  payload: '최신순' | '좋아요순' | '조회순';
}
interface Page {
  type: string;
  payload: number;
}

const mainSlice = createSlice({
  name: 'mainstates',
  initialState: {
    community: true,
    filter: '최신순',
    filterOpen: false,
    page: 1,
  },
  reducers: {
    // 커뮤니티 명예의 전당 토글
    setCommunity: (state, action: Comunity): void => {
      state.community = action.payload;
    },
    // 정렬필터
    setFilter: (state, action: Filter): void => {
      state.filter = action.payload;
    },
    // 정렬옵션 선택창
    setFilterOpen: (state, action: Comunity): void => {
      state.filterOpen = action.payload;
    },
    // 페이지네이션
    setPage: (state, action: Page): void => {
      state.page = action.payload;
    },
  },
});

export default mainSlice;
export const { setCommunity, setFilter, setFilterOpen, setPage } =
  mainSlice.actions;

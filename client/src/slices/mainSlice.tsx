import { createSlice } from '@reduxjs/toolkit';

interface Comunity {
  type: string;
  payload: '' | 'best-awards';
}
interface Filter {
  type: string;
  payload: '최신순' | '좋아요순' | '조회순';
}
interface Open {
  type: string;
  payload: boolean;
}
export interface Page {
  page: number;
  size: number;
  totalPage: number;
}
const mainSlice = createSlice({
  name: 'mainstates',
  initialState: {
    community: '',
    filter: '최신순',
    filterOpen: false,
    currentPage: 1,
    pageOffset: 0,
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
    setFilterOpen: (state, action: Open): void => {
      state.filterOpen = action.payload;
    },
    // 페이지 next버튼
    setPageOffsetNext: (state): void => {
      state.pageOffset = state.pageOffset + 5;
    },
    // 페이지 prev버튼
    setPageOffsetPrev: (state): void => {
      state.pageOffset = state.pageOffset - 5;
    },
  },
});

export default mainSlice;
export const {
  setCommunity,
  setFilter,
  setFilterOpen,
  setPageOffsetNext,
  setPageOffsetPrev,
} = mainSlice.actions;

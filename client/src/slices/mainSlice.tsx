import { createSlice } from '@reduxjs/toolkit';

interface Comunity {
  type: string;
  payload: '' | '/best-awards';
}
interface Filter {
  type: string;
  payload: '최신순' | '좋아요순' | '조회순';
}
interface Open {
  type: string;
  payload: boolean;
}
interface Orderby {
  type: string;
  payload: 'latest' | 'thumbup' | 'view-count';
}

const mainSlice = createSlice({
  name: 'mainstates',
  initialState: {
    community: '',
    filter: '최신순',
    filterOpen: false,
    orderby: 'latest',
    currentPage: 1,
    pageOffset: 0,
    searchOn: false,
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
    // 정렬옵션 선택창
    setOrderby: (state, action: Orderby): void => {
      state.orderby = action.payload;
    },
    // 페이지 next버튼
    setPageOffsetNext: (state): void => {
      state.pageOffset = state.pageOffset + 5;
    },
    // 페이지 prev버튼
    setPageOffsetPrev: (state): void => {
      state.pageOffset = state.pageOffset - 5;
    },
    // 현재 페이지 선택
    setCurrentPage: (state, action): void => {
      state.currentPage = action.payload;
    },
    // 서치페이지
    setSearchOn: (state, action): void => {
      state.searchOn = action.payload;
    },
  },
});

export default mainSlice;
export const {
  setCommunity,
  setFilter,
  setFilterOpen,
  setOrderby,
  setPageOffsetNext,
  setPageOffsetPrev,
  setCurrentPage,
  setSearchOn,
} = mainSlice.actions;

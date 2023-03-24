import { createSlice } from '@reduxjs/toolkit';

interface postSetting {
  type: string;
  payload: '' | '/best-awards' | '/search';
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
    postSetting: '',
    filter: '최신순',
    filterOpen: false,
    orderby: 'latest',
  },
  reducers: {
    // 커뮤니티, 명예의전당, 검색
    setPostSetting: (state, action: postSetting): void => {
      state.postSetting = action.payload;
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
  },
});

export default mainSlice;
export const { setPostSetting, setFilter, setFilterOpen, setOrderby } =
  mainSlice.actions;

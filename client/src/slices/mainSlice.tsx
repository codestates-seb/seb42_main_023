import { createSlice } from '@reduxjs/toolkit';

interface Comunity {
  type: string;
  payload: boolean;
}
interface Filter {
  type: string;
  payload: 'new' | 'like' | 'view';
}

const mainSlice = createSlice({
  name: 'mainstates',
  initialState: {
    community: true,
    filter: '',
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
  },
});

export default mainSlice;
export const { setCommunity, setFilter } = mainSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

interface Filter {
  type: string;
  payload: string;
}
interface Open {
  type: string;
  payload: boolean;
}
const mypageSlice = createSlice({
  name: 'mypagestates',
  initialState: {
    filter: '작성한 글',
    dropOpen: false,
    EditOpen: false,
  },
  reducers: {
    // 정렬필터
    setFilter: (state, action: Filter): void => {
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
  },
});

export default mypageSlice;
export const { setFilter, setFilterOpen, setEditOpen } = mypageSlice.actions;

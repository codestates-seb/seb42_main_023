import { createSlice } from '@reduxjs/toolkit';

interface Filter {
  type: string;
  payload: string;
}
interface Open {
  type: string;
  payload: boolean;
}
interface Width {
  type: string;
  payload: number;
}
const mypageSlice = createSlice({
  name: 'mypagestates',
  initialState: {
    filter: '작성한 글',
    dropOpen: false,
    EditOpen: false,
    EditWidth: 1,
    content: '안녕하세요.저는 돈버는 토끼입니다.모두 부자되세요.',
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
    // 자기소개 div width
    setEditWidth: (state, action: Width): void => {
      state.EditWidth = action.payload;
    },
    // 자기소개
    setContent: (state, action: Filter): void => {
      state.content = action.payload;
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
} = mypageSlice.actions;

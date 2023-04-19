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
const mypageSlice = createSlice({
  name: 'mypagestates',
  initialState: {
    filter: '작성한 글',
    EditOpen: false,
    deleteAccountOpen: false,
    EditWidth: 1,
    content: '',
    query: '',
  },
  reducers: {
    setFilter: (state, action: MemberPost): void => {
      state.filter = action.payload;
    },
    setEditOpen: (state, action: Open): void => {
      state.EditOpen = action.payload;
    },
    setEditWidth: (state, action: Width): void => {
      state.EditWidth = action.payload;
    },
    setContent: (state, action: Intro): void => {
      state.content = action.payload;
    },
    setDeleteAccountOpen: (state, action: Open): void => {
      state.deleteAccountOpen = action.payload;
    },
  },
});

export default mypageSlice;
export const {
  setFilter,
  setEditOpen,
  setEditWidth,
  setContent,
  setDeleteAccountOpen,
} = mypageSlice.actions;

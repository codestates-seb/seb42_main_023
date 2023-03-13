import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tag {
  type: string;
  payload: string;
}

const postInputSlice = createSlice({
  name: 'postInput',
  initialState: {
    title: '',
    body: '',
    tagContent: '',
    tag: [],
  },
  reducers: {
    // 게시글 제목
    setTitle: (state, action: PayloadAction<string>): void => {
      state.title = action.payload;
    },
    // 게시글 본문
    setBody: (state, action: PayloadAction<string>): void => {
      state.body = action.payload;
    },
    // 게시글 태그 내용
    setTagContent: (state, action: PayloadAction<string>): void => {
      state.tagContent = action.payload;
    },

    // 게시글 태그
    setTag: (state, action: Tag): void => {
      (state.tag as Array<string>).push(action.payload);
    },
  },
});

export default postInputSlice;
export const { setTitle, setBody, setTagContent, setTag } =
  postInputSlice.actions;

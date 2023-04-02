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
    isEdit: false,
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
    // 태그 삭제
    deleteTag: (state, action: Tag): void => {
      (state.tag as Array<string>) = (state.tag as Array<string>).filter(
        (tag) => tag !== action.payload,
      );
    },
    // 내용 수정 여부
    setIsEdit: (state, action: PayloadAction<boolean>): void => {
      state.isEdit = action.payload;
    },
  },
});

export default postInputSlice;
export const {
  setTitle,
  setBody,
  setTagContent,
  setTag,
  deleteTag,
  setIsEdit,
} = postInputSlice.actions;

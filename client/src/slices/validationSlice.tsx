import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const validationSlice = createSlice({
  name: 'vaildation',
  initialState: {
    titleErr: '',
    bodyErr: '',
    tagErr: '',
  },
  reducers: {
    // 제목 유효성 검사 에러
    setTitleErr: (state, action: PayloadAction<string>): void => {
      state.titleErr = action.payload;
    },
    // 본문 유효성 검사 에러
    setBodyErr: (state, action: PayloadAction<string>): void => {
      state.bodyErr = action.payload;
    },
    // 본문 유효성 검사 에러
    setTagErr: (state, action: PayloadAction<string>): void => {
      state.tagErr = action.payload;
    },
  },
});

export default validationSlice;
export const { setTitleErr, setBodyErr, setTagErr } = validationSlice.actions;

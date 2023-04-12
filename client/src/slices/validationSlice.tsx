import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const validationSlice = createSlice({
  name: 'vaildation',
  initialState: {
    titleErr: '',
    bodyErr: '',
    tagErr: '',
    reportErr: '',
  },
  reducers: {
    setTitleErr: (state, action: PayloadAction<string>): void => {
      state.titleErr = action.payload;
    },
    setBodyErr: (state, action: PayloadAction<string>): void => {
      state.bodyErr = action.payload;
    },
    setTagErr: (state, action: PayloadAction<string>): void => {
      state.tagErr = action.payload;
    },
    setReportErr: (state, action: PayloadAction<string>): void => {
      state.reportErr = action.payload;
    },
  },
});

export default validationSlice;
export const { setTitleErr, setBodyErr, setTagErr, setReportErr } =
  validationSlice.actions;

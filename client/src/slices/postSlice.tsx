import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isOpenFilter: false,
    reportOption: undefined,
    reportType: undefined,
    currentImg: undefined,
    removedImg: undefined,
    remainImg: undefined,
    addedImg: [],
    totalImg: [],
    selectedMember: undefined,
  },
  reducers: {
    setIsOpenFilter: (state, action: PayloadAction<boolean>): void => {
      state.isOpenFilter = !action.payload;
    },
    setReportOption: (state, action: PayloadAction<string>): void => {
      (state.reportOption as unknown) = action.payload;
    },
    setReportType: (state, action: PayloadAction<string>): void => {
      (state.reportType as unknown) = action.payload;
    },
    setCurrentImg: (state, action: PayloadAction<Array<string>>): void => {
      (state.currentImg as unknown) = action.payload;
    },
    setRemovedImg: (state, action: PayloadAction<Array<string>>): void => {
      (state.removedImg as unknown) = action.payload;
    },
    setRemaindImg: (state, action: PayloadAction<Array<object>>): void => {
      (state.remainImg as unknown) = action.payload;
    },
    setTotalmg: (state, action: PayloadAction<object>): void => {
      (state.totalImg! as Array<object>).push(action.payload);
    },
    setAddedImg: (state, action: PayloadAction<object>): void => {
      (state.addedImg! as Array<object>).push(action.payload);
    },
    setSelectedMember: (state, action: PayloadAction<string>): void => {
      (state.selectedMember as unknown) = action.payload;
    },
  },
});
export default postSlice;
export const {
  setIsOpenFilter,
  setReportOption,
  setReportType,
  setCurrentImg,
  setRemovedImg,
  setRemaindImg,
  setAddedImg,
  setTotalmg,
  setSelectedMember,
} = postSlice.actions;

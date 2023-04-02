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
    // 필터 오픈
    setIsOpenFilter: (state, action: PayloadAction<boolean>): void => {
      state.isOpenFilter = !action.payload;
    },

    // 신고 옵션
    setReportOption: (state, action: PayloadAction<string>): void => {
      (state.reportOption as unknown) = action.payload;
    },
    // 신고 카테고리(게시글, 댓글, 답글)
    setReportType: (state, action: PayloadAction<string>): void => {
      (state.reportType as unknown) = action.payload;
    },
    // 게시물에 포함된 이미지
    setCurrentImg: (state, action: PayloadAction<Array<string>>): void => {
      (state.currentImg as unknown) = action.payload;
    },
    // 삭제된 이미지
    setRemovedImg: (state, action: PayloadAction<Array<string>>): void => {
      (state.removedImg as unknown) = action.payload;
    },
    // 남아있는 이미지
    setRemaindImg: (state, action: PayloadAction<Array<object>>): void => {
      (state.remainImg as unknown) = action.payload;
    },
    // 전체 이미지
    setTotalmg: (state, action: PayloadAction<object>): void => {
      (state.totalImg! as Array<object>).push(action.payload);
    },
    //추가된 게시물 이미지(삭제된 이미지 포함)
    setAddedImg: (state, action: PayloadAction<object>): void => {
      (state.addedImg! as Array<object>).push(action.payload);
    },
    // 선택한 멤버
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

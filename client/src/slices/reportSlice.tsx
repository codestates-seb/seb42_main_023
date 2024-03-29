import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportState {
  // page: number;
  // orderby: string;
  // pageOffset: number;
  // isReviewOpen: boolean;
  selectedReport: number | null;
}

const initialState: ReportState = {
  // page: 1,
  // orderby: 'all',
  // pageOffset: 0,
  // isReviewOpen: false,
  selectedReport: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    // 현재 페이지
    // setPage: (state, action: PayloadAction<number>): void => {
    //   state.page = action.payload;
    // },
    // 신고대상 필터링
    // setOrderby: (state, action: PayloadAction<string>): void => {
    //   state.orderby = action.payload;
    // },
    // 페이지 next버튼
    // setPageOffsetNext: (state): void => {
    //   state.pageOffset = state.pageOffset + 5;
    // },
    // // 페이지 prev버튼
    // setPageOffsetPrev: (state): void => {
    //   state.pageOffset = state.pageOffset - 5;
    // },
    // 검토하기 버튼
    // setIsReviewOpen: (state, action: PayloadAction<boolean>): void => {
    //   state.isReviewOpen = action.payload;
    // },
    // 선택된 신고글
    setSelectedReport: (state, action: PayloadAction<number | null>): void => {
      state.selectedReport = action.payload;
    },
  },
});

export default reportSlice;
export const {
  // setPage,
  // setOrderby,
  // setPageOffsetNext,
  // setPageOffsetPrev,
  // setIsReviewOpen,
  setSelectedReport,
} = reportSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLike: false,
    isDislike: false,
    isBookmark: false,
    reommendPosts: undefined,
    postDetail: undefined,
    deleteType: undefined,
    isOpenDelete: false,
    isOpenFilter: false,
    isOpenReport: false,
    reportOption: undefined,
    reportType: undefined,
  },
  reducers: {
    // 게시물 좋아요
    setLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isLike = !state.isLike;
    },
    // 게시물 싫어요
    setDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isDislike = !state.isDislike;
    },
    // 게시물 북마크
    setBookmark: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isBookmark = !state.isBookmark;
    },
    // 추천 게시물
    setRecommendPosts: (state, action: PayloadAction<object>): void => {
      (state.reommendPosts as unknown) = action.payload;
    },
    // 게시글
    setPostDetail: (state, action: PayloadAction<object>): void => {
      (state.postDetail as unknown) = action.payload;
    },
    // 현재 선택한 삭제 버튼 종류 지정(게시글, 댓글, 답글)
    setDeleteType: (state, action: PayloadAction<string>): void => {
      (state.deleteType as unknown) = action.payload;
    },
    // 삭제창 오픈
    setIsOpenDelete: (state, action: PayloadAction<boolean>): void => {
      state.isOpenDelete = !state.isOpenDelete;
    },
    // 필터 오픈
    setIsOpenFilter: (state, action: PayloadAction<boolean>): void => {
      state.isOpenFilter = !state.isOpenFilter;
    },
    // 신고창 오픈
    setIsOpenReport: (state, action: PayloadAction<boolean>): void => {
      state.isOpenReport = !state.isOpenReport;
    },
    // 신고 옵션
    setReportOption: (state, action: PayloadAction<string>): void => {
      (state.reportOption as unknown) = action.payload;
    },
    // 신고 카테고리(게시글, 댓글, 답글)
    setReportType: (state, action: PayloadAction<string>): void => {
      (state.reportType as unknown) = action.payload;
    },
  },
});

export default postSlice;
export const {
  setLike,
  setDislike,
  setBookmark,
  setRecommendPosts,
  setPostDetail,
  setDeleteType,
  setIsOpenDelete,
  setIsOpenFilter,
  setIsOpenReport,
  setReportOption,
  setReportType,
} = postSlice.actions;

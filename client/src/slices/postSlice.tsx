import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLike: false,
    isDislike: false,
    isBookmark: false,
    views: undefined,
    reommendPosts: undefined,
    postDetail: undefined,
    deleteType: undefined,
    isOpenDelete: false,
    isOpenFilter: false,
    isOpenReport: false,
    reportOption: undefined,
    reportType: undefined,
    currentImg: undefined,
    removedImg: undefined,
    totalImg: [],
    remainImg: undefined,
    addedImg: [],
    isOpeneIntro: false,
    selectedMember: undefined,
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
    // 게시물 조회수
    setViews: (state, action: PayloadAction<number>): void => {
      console.log(action.payload);
      (state.views as unknown) = action.payload;
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
    // 소개 페이지 오픈
    setIsOpenIntro: (state, action: PayloadAction<boolean>): void => {
      state.isOpeneIntro = !state.isOpeneIntro;
    },
    // 남아있는 이미지
    setSelectedMember: (state, action: PayloadAction<string>): void => {
      (state.selectedMember as unknown) = action.payload;
    },
  },
});
export default postSlice;
export const {
  setLike,
  setDislike,
  setBookmark,
  setViews,
  setRecommendPosts,
  setPostDetail,
  setDeleteType,
  setIsOpenDelete,
  setIsOpenFilter,
  setIsOpenReport,
  setReportOption,
  setReportType,
  setCurrentImg,
  setRemovedImg,
  setRemaindImg,
  setTotalmg,
  setAddedImg,
  setIsOpenIntro,
  setSelectedMember,
} = postSlice.actions;

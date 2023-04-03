import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
<<<<<<< HEAD
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
=======
    isLike: false,
    isDislike: false,
    isBookmark: false,
    isCommentLike: false,
    isCommentDislike: false,
    isReplyLike: false,
    isReplyDislike: false,
    popularPosts: undefined,
    postDetail: undefined,
    comments: undefined,
    replies: undefined,
    isOpend: undefined,
    totalReplies: [],
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
    // 댓글 좋아요
    setCommentLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isCommentLike = !state.isCommentLike;
    },
    // 댓글 싫어요
    setCommentDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isCommentDislike = !state.isCommentDislike;
    },
    // 답글 좋아요
    setReplyLike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isReplyLike = !state.isReplyLike;
    },
    // 답글 싫어요
    setReplyDislike: (state, action: PayloadAction<boolean>): void => {
      console.log(action.payload);
      state.isReplyDislike = !state.isReplyDislike;
    },
    getPopularPost: (state, action: PayloadAction<object>): void => {
      console.log('getPopularPost');
    },
    setPopularPosts: (state, action: PayloadAction<object>): void => {
      (state.popularPosts as unknown) = action.payload;
    },
    // 게시글
    setPostDetail: (state, action: PayloadAction<object>): void => {
      (state.postDetail as unknown) = action.payload;
    },
    // 댓글
    setComments: (state, action: PayloadAction<object>): void => {
      (state.comments as unknown) = action.payload;
    },
    // 답글
    setReplies: (state, action: PayloadAction<object>): void => {
      (state.replies as unknown) = action.payload;
    },
    // 렌더링 답글
    setTotalReplies: (state, action: PayloadAction<Array<object>>): void => {
      (state.totalReplies as Array<object>).push(...action.payload);
    },
    // 답글 클릭 여부
    isOpened: (state, action: PayloadAction<object>): void => {
      (state.isOpend as unknown) = action.payload;
    },
    // 답글 클릭 상태 변경
    setIsOpened: (state, action: PayloadAction<number>): void => {
      console.log(action.payload);
      (state.isOpend! as Array<boolean>)[action.payload] = !(
        state.isOpend! as Array<boolean>
      )[action.payload];
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
    },
  },
});
export default postSlice;
export const {
<<<<<<< HEAD
  setIsOpenFilter,
  setReportOption,
  setReportType,
  setCurrentImg,
  setRemovedImg,
  setRemaindImg,
  setAddedImg,
  setTotalmg,
  setSelectedMember,
=======
  setLike,
  setDislike,
  setBookmark,
  setCommentLike,
  setCommentDislike,
  setReplyLike,
  setReplyDislike,
  getPopularPost,
  setPopularPosts,
  setPostDetail,
  setComments,
  setReplies,
  setTotalReplies,
  isOpened,
  setIsOpened,
>>>>>>> 6038065ce9f8ca42c1f373aae8d2621ff9d4483d
} = postSlice.actions;

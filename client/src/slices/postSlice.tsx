import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLike: false,
    isDislike: false,
    isBookmark: false,
    isCommentLike: false,
    isCommentDislike: false,
    isReplyLike: false,
    isReplyDislike: false,
    reommendPosts: undefined,
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
    // 추천 게시물
    setRecommendPosts: (state, action: PayloadAction<object>): void => {
      (state.reommendPosts as unknown) = action.payload;
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
    },
  },
});

export default postSlice;
export const {
  setLike,
  setDislike,
  setBookmark,
  setCommentLike,
  setCommentDislike,
  setReplyLike,
  setReplyDislike,
  setRecommendPosts,
  setPostDetail,
  setComments,
  setReplies,
  setTotalReplies,
  isOpened,
  setIsOpened,
} = postSlice.actions;

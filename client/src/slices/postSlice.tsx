import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comunity {
  type: string;
  payload: boolean;
}

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLike: false,
    isDislike: false,
    isBookmark: false,
    reommendPosts: undefined,
    postDetail: undefined,
    type: undefined,
    isOpenDelete: false,
    isOpenFilter: false,
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
    setType: (state, action: PayloadAction<string>): void => {
      (state.type as unknown) = action.payload;
    },
    // 삭제창 오픈
    setIsOpenDelete: (state, action: PayloadAction<boolean>): void => {
      state.isOpenDelete = !state.isOpenDelete;
    },
    // 필터 오픈
    setIsOpenFilter: (state, action: Comunity): void => {
      state.isOpenFilter = action.payload;
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
  setType,
  setIsOpenDelete,
  setIsOpenFilter,
} = postSlice.actions;

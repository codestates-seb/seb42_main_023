import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filter {
  type: string;
  payload: '최신순' | '좋아요순' | '조회순';
}
interface Open {
  type: string;
  payload: boolean;
}
interface Orderby {
  type: string;
  payload: 'latest' | 'thumbup' | 'view-count';
}

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    commentValue: '',
    commentId: undefined,
    isEdit: undefined,
    page: 1,
    filter: '최신순',
    filterOpen: false,
    orderby: 'latest',
  },
  reducers: {
    // 댓글 내용
    setComment: (state, action: PayloadAction<string>) => {
      (state.commentValue as unknown) = action.payload;
    },
    // 댓글 ID
    setCommentId: (state, action: PayloadAction<number>): void => {
      (state.commentId as unknown) = action.payload;
    },
    // 댓글 수정 여부
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    // 댓글 수정 상태 변경
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    // edit 댓글 추가
    addCommentEdit: (state, action: PayloadAction<boolean>): void => {
      (state.isEdit! as Array<boolean>).push(action.payload);
    },
    // 댓글 페이지 번호 증가
    setCommentPage: (state, action: PayloadAction<number>): void => {
      (state.page as unknown) = action.payload;
    },
    // 정렬필터
    setFilter: (state, action: Filter): void => {
      state.filter = action.payload;
    },
    // 정렬옵션 선택창
    setFilterOpen: (state, action: Open): void => {
      state.filterOpen = action.payload;
    },
    // 정렬옵션 선택창
    setOrderby: (state, action: Orderby): void => {
      state.orderby = action.payload;
    },
  },
});

export default commentSlice;
export const {
  setComment,
  setCommentId,
  isEdit,
  setIsEdit,
  addCommentEdit,
  setCommentPage,
  setFilter,
  setFilterOpen,
  setOrderby,
} = commentSlice.actions;

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
    filter: '최신순',
    filterOpen: false,
    orderby: 'latest',
    page: 1,
  },
  reducers: {
    setComment: (state, action: PayloadAction<string>) => {
      (state.commentValue as unknown) = action.payload;
    },
    setCommentId: (state, action: PayloadAction<number>): void => {
      (state.commentId as unknown) = action.payload;
    },
    isEdit: (state, action: PayloadAction<object>): void => {
      (state.isEdit as unknown) = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<number>): void => {
      (state.isEdit! as Array<boolean>)[action.payload] = !(
        state.isEdit! as Array<boolean>
      )[action.payload];
    },
    addCommentEdit: (state, action: PayloadAction<boolean>): void => {
      (state.isEdit! as Array<boolean>)!.push(action.payload!);
    },
    setCommentPage: (state, action: PayloadAction<number>): void => {
      (state.page as unknown) = action.payload;
    },
    setFilter: (state, action: Filter): void => {
      state.filter = action.payload;
    },
    setFilterOpen: (state, action: Open): void => {
      state.filterOpen = action.payload;
    },
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

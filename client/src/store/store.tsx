import { configureStore } from '@reduxjs/toolkit';
import slice from '../slices/slice';
import postSlice from '../slices/postSlice';

const store = configureStore({
  reducer: {
    slice: slice.reducer,
    postlist: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

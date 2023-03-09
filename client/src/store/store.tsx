import { configureStore } from '@reduxjs/toolkit';
import slice from '../slices/slice';

const store = configureStore({
  reducer: {
    slice: slice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

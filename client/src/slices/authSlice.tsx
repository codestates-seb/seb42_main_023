import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store/store';
import { tempTokenApi } from '../api/tempTokenAPi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: null,
    picture: null,
    role: null,
    Authorization: null,
    Refresh: null,
  } as {
    name: null | string;
    picture: null | string;
    role: null | string;
    Authorization: null | string;
    Refresh: null | string;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      tempTokenApi.endpoints.postTempToken.matchFulfilled,
      (state, { payload, meta }) => {
        console.log('meta:', meta);
        console.log('meta.baseQueryMeta:', meta.baseQueryMeta);
        state.name = payload.result.name;
        state.picture = payload.result.picture;
        state.role = payload.result.role;
        state.Authorization = payload.result.Authorization;
        state.Refresh = payload.result.Refresh;
      },
    );
  },
});

export default authSlice;

// export const selectCurrentUser = (state: RootState) => state.auth.user;

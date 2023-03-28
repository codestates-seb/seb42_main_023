import { apiSlice } from './apiSlice';

// 행복주택 리스트 get 요청 (WIP)
export const happyHouseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHappyHouse: builder.query({
      query: ({ page, state, location }) =>
        `recruit/happy-house?page=${page}&state=${state}&location=${location}`,
    }),
  }),
});

export const { useGetHappyHouseQuery } = happyHouseApi;

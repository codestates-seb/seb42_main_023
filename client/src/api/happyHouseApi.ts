import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 행복주택 리스트 get 요청 (WIP)
export const happyHouseApi = createApi({
  reducerPath: 'happyHouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  endpoints: (builder) => ({
    getHappyHouse: builder.query({
      query: ({ page, state, location }) =>
        `recruit/happy-house?page=${page}&state=${state}&location=${location}`,
    }),
  }),
});

export const { useGetHappyHouseQuery } = happyHouseApi;

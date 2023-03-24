import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 행복주택 리스트 get 요청 (WIP)
export const happyHouseApi = createApi({
  reducerPath: 'happyHouseApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  endpoints: (builder) => ({
    getHappyHouse: builder.query({
      query: ({ page, status, location }) =>
        `recruit/happy-house?page=${page}&status=${status}&location=${location}`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetHappyHouseQuery } = happyHouseApi;

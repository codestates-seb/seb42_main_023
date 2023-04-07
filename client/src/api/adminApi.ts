import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['Standby'],
  endpoints: (builder) => ({
    getReportsStandBy: builder.query({
      query: () => '/reports/standby',
      providesTags: ['Standby'],
    }),
  }),
});

export const { useGetReportsStandByQuery } = adminApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// tempToken post
export const tempTokenApi = createApi({
  reducerPath: 'tempTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SERVER_ADDRESS }),
  tagTypes: ['nickname'],
  endpoints: (builder) => ({
    postTempToken: builder.mutation({
      query: ({ tempAccessToken }) => ({
        url: '/auth/callback/google',
        method: 'POST',
        body: { tempAccessToken },
      }),
      transformResponse: (response, meta) => {
        console.log('this is header', meta?.response?.headers);
        return response;
      },
    }),
  }),
});

export const { usePostTempTokenMutation } = tempTokenApi;
